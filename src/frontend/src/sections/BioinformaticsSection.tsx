import {
  AnimatedEntrance,
  StaggerContainer,
  StaggerItem,
} from "@/components/AnimatedEntrance";
import { QuizEngine } from "@/components/QuizEngine";
import { SectionHeader } from "@/components/SectionHeader";
import type { QuizQuestion } from "@/types/biology";
import { motion } from "motion/react";
import { useState } from "react";

// ─── Base color codes ──────────────────────────────────────────────────────────

const BASE_COLORS: Record<string, { bg: string; text: string; label: string }> =
  {
    A: {
      bg: "oklch(0.35 0.12 142)",
      text: "oklch(0.85 0.18 142)",
      label: "Adenine",
    },
    T: {
      bg: "oklch(0.30 0.12 27)",
      text: "oklch(0.85 0.18 27)",
      label: "Thymine",
    },
    G: {
      bg: "oklch(0.28 0.12 290)",
      text: "oklch(0.80 0.18 290)",
      label: "Guanine",
    },
    C: {
      bg: "oklch(0.32 0.12 55)",
      text: "oklch(0.85 0.18 55)",
      label: "Cytosine",
    },
    "-": {
      bg: "oklch(0.22 0 0)",
      text: "oklch(0.50 0 0)",
      label: "Gap",
    },
  };

// ─── Sequence Alignment Demo ──────────────────────────────────────────────────

const SEQ1 = "ATGCTAGC";
const SEQ2 = "ATGCAAGC";

// Simple global alignment (Needleman-Wunsch style result pre-computed for clarity)
const ALIGNED1 = "ATGCTAGC";
const ALIGNED2 = "ATGCAAGC";

interface BaseProps {
  base: string;
  idx: number;
  showMatch?: boolean;
  matched?: boolean;
}

function Base({ base, idx, showMatch, matched }: BaseProps) {
  const color = BASE_COLORS[base] ?? BASE_COLORS.A;
  const isMatch = showMatch && matched;
  const isMismatch = showMatch && !matched && base !== "-";

  return (
    <motion.div
      key={`base-${idx}`}
      className="flex flex-col items-center gap-0.5"
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: idx * 0.06, duration: 0.35 }}
    >
      <div
        className="w-8 h-8 md:w-10 md:h-10 rounded-md flex items-center justify-center font-mono font-bold text-sm md:text-base relative"
        style={{
          background: color.bg,
          color: color.text,
          border: `2px solid ${isMatch ? "oklch(0.72 0.20 142)" : isMismatch ? "oklch(0.72 0.18 27)" : `${color.text}55`}`,
          boxShadow: isMatch
            ? "0 0 10px oklch(0.72 0.20 142 / 0.6)"
            : isMismatch
              ? "0 0 10px oklch(0.72 0.18 27 / 0.6)"
              : "none",
        }}
        aria-label={`Base ${base}: ${color.label}`}
        role="img"
      >
        {base}
      </div>
    </motion.div>
  );
}

function SequenceAlignmentDemo() {
  const [aligned, setAligned] = useState(false);
  const [animating, setAnimating] = useState(false);

  const handleAlign = () => {
    if (animating) return;
    setAnimating(true);
    setAligned(false);
    setTimeout(() => {
      setAligned(true);
      setAnimating(false);
    }, 600);
  };

  const matches = ALIGNED1.split("").map((b, i) => b === ALIGNED2[i]);
  const matchCount = matches.filter(Boolean).length;
  const similarity = Math.round((matchCount / ALIGNED1.length) * 100);

  return (
    <div
      className="rounded-2xl p-5 md:p-7 flex flex-col gap-6"
      style={{
        background: "oklch(0.16 0.04 220)",
        border: "1px solid oklch(0.60 0.16 220 / 0.35)",
        boxShadow: "0 0 28px oklch(0.60 0.16 220 / 0.12)",
      }}
      aria-label="Sequence alignment interactive demo"
    >
      {/* Legend */}
      <div className="flex flex-wrap gap-3 mb-1" aria-label="Base color legend">
        {Object.entries(BASE_COLORS)
          .filter(([k]) => k !== "-")
          .map(([base, c]) => (
            <div key={base} className="flex items-center gap-1.5">
              <div
                className="w-5 h-5 rounded flex items-center justify-center font-mono text-xs font-bold"
                style={{ background: c.bg, color: c.text }}
              >
                {base}
              </div>
              <span className="text-xs" style={{ color: c.text }}>
                {c.label}
              </span>
            </div>
          ))}
        <div className="flex items-center gap-1.5">
          <div
            className="w-5 h-5 rounded border-2"
            style={{
              background: "oklch(0.22 0.06 142)",
              borderColor: "oklch(0.72 0.20 142)",
              boxShadow: "0 0 6px oklch(0.72 0.20 142 / 0.5)",
            }}
          />
          <span className="text-xs" style={{ color: "oklch(0.72 0.20 142)" }}>
            Match
          </span>
        </div>
        <div className="flex items-center gap-1.5">
          <div
            className="w-5 h-5 rounded border-2"
            style={{
              background: "oklch(0.22 0.06 27)",
              borderColor: "oklch(0.72 0.18 27)",
              boxShadow: "0 0 6px oklch(0.72 0.18 27 / 0.5)",
            }}
          />
          <span className="text-xs" style={{ color: "oklch(0.72 0.18 27)" }}>
            Mismatch
          </span>
        </div>
      </div>

      {/* Sequence 1 */}
      <section
        className="flex flex-col gap-2"
        aria-label="Sequence 1: ATGCTAGC"
      >
        <span
          className="text-xs font-semibold tracking-widest uppercase"
          style={{ color: "oklch(0.70 0.16 220)" }}
        >
          Sequence 1
        </span>
        <div className="flex gap-1.5 flex-wrap">
          {SEQ1.split("").map((base, i) => (
            <Base
              key={`s1-pos${i}-${base}`}
              base={base}
              idx={i}
              showMatch={aligned}
              matched={matches[i]}
            />
          ))}
        </div>
      </section>

      {/* Match indicators */}
      {aligned && (
        <motion.div
          className="flex gap-1.5 flex-wrap"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4 }}
          aria-label="Match indicators between sequences"
        >
          {matches.map((m, i) => (
            <div
              key={`match-pos${i}-${m ? "y" : "n"}`}
              className="w-8 md:w-10 flex items-center justify-center"
            >
              <span
                className="text-sm font-bold"
                style={{
                  color: m ? "oklch(0.72 0.20 142)" : "oklch(0.72 0.18 27)",
                }}
                aria-label={m ? "match" : "mismatch"}
              >
                {m ? "|" : "✕"}
              </span>
            </div>
          ))}
        </motion.div>
      )}

      {/* Sequence 2 */}
      <section
        className="flex flex-col gap-2"
        aria-label="Sequence 2: ATGCAAGC"
      >
        <span
          className="text-xs font-semibold tracking-widest uppercase"
          style={{ color: "oklch(0.70 0.16 220)" }}
        >
          Sequence 2
        </span>
        <div className="flex gap-1.5 flex-wrap">
          {SEQ2.split("").map((base, i) => (
            <Base
              key={`s2-pos${i}-${base}`}
              base={base}
              idx={i}
              showMatch={aligned}
              matched={matches[i]}
            />
          ))}
        </div>
      </section>

      {/* Similarity score */}
      {aligned && (
        <motion.div
          className="flex items-center gap-4 rounded-xl px-4 py-3"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.5 }}
          style={{
            background: "oklch(0.20 0.06 220)",
            border: "1px solid oklch(0.60 0.16 220 / 0.4)",
          }}
          aria-live="polite"
          aria-label={`Alignment complete. Similarity score: ${similarity} percent. ${matchCount} of ${ALIGNED1.length} bases match.`}
        >
          <div className="flex-1">
            <div
              className="text-xs font-semibold mb-1"
              style={{ color: "oklch(0.70 0.16 220)" }}
            >
              Similarity Score
            </div>
            <div className="h-2 rounded-full overflow-hidden bg-muted">
              <motion.div
                className="h-full rounded-full"
                style={{
                  background:
                    "linear-gradient(90deg, oklch(0.60 0.18 220), oklch(0.72 0.20 142))",
                }}
                initial={{ width: 0 }}
                animate={{ width: `${similarity}%` }}
                transition={{ delay: 0.5, duration: 0.8, ease: "easeOut" }}
              />
            </div>
          </div>
          <div
            className="text-2xl font-bold font-mono"
            style={{ color: "oklch(0.72 0.20 142)" }}
          >
            {similarity}%
          </div>
          <div className="text-xs text-muted-foreground">
            {matchCount}/{ALIGNED1.length} bases match
          </div>
        </motion.div>
      )}

      {/* Align button */}
      <button
        type="button"
        onClick={handleAlign}
        disabled={animating}
        className="self-start rounded-xl px-6 py-2.5 font-semibold text-sm transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed hover:scale-105 active:scale-95"
        style={{
          background: "oklch(0.55 0.18 220)",
          color: "oklch(0.98 0 0)",
          boxShadow: "0 0 16px oklch(0.55 0.18 220 / 0.4)",
          outlineColor: "oklch(0.60 0.16 220)",
        }}
        aria-label="Run sequence alignment visualization"
        data-ocid="align-sequences-btn"
      >
        {animating ? "Aligning…" : "▶ Align Sequences"}
      </button>

      <p className="text-xs text-muted-foreground leading-relaxed">
        <strong style={{ color: "oklch(0.70 0.16 220)" }}>How it works:</strong>{" "}
        Global alignment (Needleman-Wunsch) compares every position. Green glow
        = match, red glow = mismatch. The similarity score quantifies how
        related two sequences are — key to identifying homologous genes across
        species.
      </p>
    </div>
  );
}

// ─── Phylogenetic Tree ─────────────────────────────────────────────────────────

const TREE_SPECIES = [
  { id: "human", label: "Human", x: 60, y: 30, color: "oklch(0.72 0.18 220)" },
  {
    id: "chimp",
    label: "Chimpanzee",
    x: 160,
    y: 30,
    color: "oklch(0.72 0.18 180)",
  },
  { id: "mouse", label: "Mouse", x: 270, y: 30, color: "oklch(0.72 0.18 142)" },
  {
    id: "zebrafish",
    label: "Zebrafish",
    x: 370,
    y: 30,
    color: "oklch(0.72 0.18 55)",
  },
  { id: "yeast", label: "Yeast", x: 450, y: 30, color: "oklch(0.72 0.18 27)" },
];

const TREE_BRANCHES = [
  // Human-Chimp clade
  { x1: 60, y1: 30, x2: 60, y2: 90, color: "oklch(0.60 0.14 220)" },
  { x1: 160, y1: 30, x2: 160, y2: 90, color: "oklch(0.60 0.14 180)" },
  { x1: 60, y1: 90, x2: 160, y2: 90, color: "oklch(0.50 0.14 200)" },
  // Primate root
  { x1: 110, y1: 90, x2: 110, y2: 145, color: "oklch(0.50 0.12 200)" },
  // Mouse branch
  { x1: 270, y1: 30, x2: 270, y2: 145, color: "oklch(0.60 0.14 142)" },
  // Mammal root
  { x1: 110, y1: 145, x2: 270, y2: 145, color: "oklch(0.45 0.10 170)" },
  { x1: 190, y1: 145, x2: 190, y2: 195, color: "oklch(0.45 0.10 170)" },
  // Zebrafish
  { x1: 370, y1: 30, x2: 370, y2: 195, color: "oklch(0.60 0.14 55)" },
  // Vertebrate root
  { x1: 190, y1: 195, x2: 370, y2: 195, color: "oklch(0.40 0.08 130)" },
  { x1: 280, y1: 195, x2: 280, y2: 235, color: "oklch(0.40 0.08 130)" },
  // Yeast
  { x1: 450, y1: 30, x2: 450, y2: 235, color: "oklch(0.60 0.14 27)" },
  // Root
  { x1: 280, y1: 235, x2: 450, y2: 235, color: "oklch(0.35 0.06 100)" },
  { x1: 365, y1: 235, x2: 365, y2: 260, color: "oklch(0.35 0.06 100)" },
];

function PhylogeneticTree() {
  return (
    <div
      className="rounded-2xl p-5 md:p-7"
      style={{
        background: "oklch(0.16 0.04 220)",
        border: "1px solid oklch(0.60 0.16 220 / 0.3)",
      }}
      aria-label="Phylogenetic tree showing evolutionary relationships"
      role="img"
    >
      <h4
        className="font-display text-base font-semibold mb-4"
        style={{ color: "oklch(0.70 0.16 220)" }}
      >
        🌳 Phylogenetic Tree — Evolutionary Relationships
      </h4>
      <div className="overflow-x-auto">
        <svg
          viewBox="0 0 520 290"
          width="100%"
          height="auto"
          style={{ minWidth: 340, maxWidth: 520 }}
          aria-hidden="true"
        >
          {/* Branch lines */}
          {TREE_BRANCHES.map((b, i) => (
            <motion.line
              key={`branch-${b.x1}-${b.y1}-${b.x2}-${b.y2}`}
              x1={b.x1}
              y1={b.y1}
              x2={b.x2}
              y2={b.y2}
              stroke={b.color}
              strokeWidth="2.5"
              strokeLinecap="round"
              initial={{ pathLength: 0, opacity: 0 }}
              whileInView={{ pathLength: 1, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05, duration: 0.4 }}
            />
          ))}

          {/* Species nodes */}
          {TREE_SPECIES.map((sp) => (
            <g key={sp.id}>
              <motion.circle
                cx={sp.x}
                cy={sp.y}
                r="14"
                fill="oklch(0.18 0.06 220)"
                stroke={sp.color}
                strokeWidth="2"
                initial={{ scale: 0, opacity: 0 }}
                whileInView={{ scale: 1, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.8, duration: 0.4, type: "spring" }}
                style={{
                  filter: `drop-shadow(0 0 6px ${sp.color}80)`,
                }}
              />
              <motion.text
                x={sp.x}
                y={sp.y + 1}
                textAnchor="middle"
                dominantBaseline="middle"
                fontSize="9"
                fontWeight="700"
                fill={sp.color}
                fontFamily="monospace"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 1, duration: 0.4 }}
              >
                {sp.id === "zebrafish"
                  ? "ZF"
                  : sp.label.slice(0, 2).toUpperCase()}
              </motion.text>
              <motion.text
                x={sp.x}
                y={sp.y - 22}
                textAnchor="middle"
                fontSize="8"
                fill={sp.color}
                fontFamily="sans-serif"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 1.1, duration: 0.4 }}
              >
                {sp.label}
              </motion.text>
            </g>
          ))}

          {/* Root label */}
          <motion.text
            x={365}
            y={278}
            textAnchor="middle"
            fontSize="8"
            fill="oklch(0.55 0.06 100)"
            fontFamily="sans-serif"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 1.3 }}
          >
            Common ancestor
          </motion.text>
        </svg>
      </div>
      <p className="text-xs text-muted-foreground mt-3">
        Branching points (nodes) represent common ancestors. Shorter branches
        between species = greater evolutionary similarity. Human and Chimpanzee
        share ~98.7% of their DNA sequence.
      </p>
      <div className="flex flex-wrap gap-3 mt-3">
        {TREE_SPECIES.map((sp) => (
          <span
            key={sp.id}
            className="flex items-center gap-1.5 text-xs"
            style={{ color: sp.color }}
          >
            <span
              className="inline-block w-2.5 h-2.5 rounded-full"
              style={{
                background: sp.color,
                boxShadow: `0 0 6px ${sp.color}60`,
              }}
            />
            {sp.label}
          </span>
        ))}
      </div>
    </div>
  );
}

// ─── Concept cards ─────────────────────────────────────────────────────────────

const CONCEPT_CARDS = [
  {
    icon: "🗄️",
    title: "Biological Databases",
    items: [
      { name: "GenBank", desc: "Nucleotide sequences (NCBI)" },
      { name: "UniProt", desc: "Protein sequences & functions" },
      { name: "PDB", desc: "3D protein structures" },
      { name: "KEGG", desc: "Metabolic pathways" },
    ],
    color: "oklch(0.68 0.16 220)",
  },
  {
    icon: "🔍",
    title: "Sequence Tools",
    items: [
      { name: "BLAST", desc: "Find similar sequences quickly" },
      { name: "Clustal Omega", desc: "Multiple sequence alignment" },
      { name: "MUSCLE", desc: "Fast MSA for large datasets" },
      { name: "HMMER", desc: "Profile-based sequence search" },
    ],
    color: "oklch(0.68 0.16 262)",
  },
  {
    icon: "🤖",
    title: "Structure Prediction",
    items: [
      { name: "AlphaFold2", desc: "AI-powered protein folding" },
      { name: "Rosetta", desc: "De novo structure prediction" },
      { name: "I-TASSER", desc: "Threading-based prediction" },
      { name: "ESMFold", desc: "Language model folding" },
    ],
    color: "oklch(0.68 0.18 290)",
  },
  {
    icon: "🧬",
    title: "Genomics",
    items: [
      { name: "BWA / Bowtie2", desc: "Short-read mapping" },
      { name: "GATK", desc: "Variant calling pipeline" },
      { name: "HISAT2", desc: "RNA-seq read alignment" },
      { name: "Kraken2", desc: "Metagenomic classification" },
    ],
    color: "oklch(0.68 0.18 142)",
  },
];

// ─── Explanations ──────────────────────────────────────────────────────────────

const EXPLANATIONS = [
  {
    id: "what-is",
    heading: "What Is Bioinformatics and Why Does It Matter?",
    body: `Bioinformatics is the science of using computational methods, statistical algorithms, and software tools to collect, store, analyze, and interpret biological data — particularly the vast quantities of DNA, RNA, and protein sequence data generated by modern molecular biology. The field emerged from the recognition that biology had become an information science: the human genome alone contains over 3 billion base pairs, and sequencing technologies now generate terabytes of sequence data per day. Without computers and algorithms, none of this data could be meaningfully interpreted.

The importance of bioinformatics cannot be overstated. It is the backbone of personalized medicine, where a patient's tumor genome is sequenced and analyzed to identify mutations driving cancer and to select targeted therapies. It underlies drug discovery, where computational docking and molecular dynamics simulations identify drug candidates before expensive laboratory synthesis. It drives vaccine development, evolutionary biology, forensic science, and agricultural improvement. When COVID-19 emerged, bioinformaticians analyzed its genome within days, enabling vaccine design months faster than any previous pandemic response.`,
  },
  {
    id: "databases",
    heading: "Biological Databases — The Repositories of Life's Information",
    body: `Biological databases are the foundational infrastructure of bioinformatics, storing the molecular data that researchers worldwide deposit and query. The most important is GenBank, maintained by the National Center for Biotechnology Information (NCBI), which archives all publicly available nucleotide sequences. As of 2024, GenBank contains over 250 million sequences representing hundreds of thousands of species. When a researcher sequences a new gene or genome, they submit the sequence to GenBank, making it available to the entire global research community.

UniProt (Universal Protein Resource) serves the equivalent function for protein sequences, storing not just the sequence of amino acids but functional annotations — what the protein does, where it is located in the cell, what diseases arise from its mutation, what other proteins it interacts with. The Protein Data Bank (PDB) stores experimentally determined three-dimensional structures of proteins, DNA, and RNA, currently housing over 230,000 structures solved by X-ray crystallography, cryo-electron microscopy, and NMR spectroscopy. Pathway databases like KEGG and Reactome map how molecules interact in metabolic and signaling networks. These databases are constantly growing and are freely accessible to all researchers worldwide — representing a remarkable collaborative achievement of global science.`,
  },
  {
    id: "alignment",
    heading: "Sequence Alignment — Comparing the Language of Life",
    body: `Sequence alignment is one of bioinformatics' most fundamental operations: placing two or more sequences side by side to identify regions of similarity that reveal functional, structural, or evolutionary relationships. The principle is simple — if two sequences from different species share a similar region, they likely descended from a common ancestral sequence and probably perform similar functions. This logic of homology underpins almost all of comparative genomics.

Local alignment (implemented in the Smith-Waterman algorithm) finds the most similar sub-regions between sequences, ideal for finding conserved domains within otherwise divergent proteins. Global alignment (Needleman-Wunsch) aligns entire sequences end-to-end, useful for closely related sequences. BLAST (Basic Local Alignment Search Tool) is the most widely used bioinformatics tool in history — it rapidly searches GenBank or UniProt to find sequences similar to a query sequence, using heuristic shortcuts to achieve speed without sacrificing much accuracy. Multiple sequence alignment (MSA) simultaneously aligns three or more sequences, revealing conserved columns that indicate functionally critical positions. MSA is the foundation for building phylogenetic trees and identifying conserved protein domains.`,
  },
  {
    id: "phylogenetics",
    heading: "Phylogenetic Trees — Mapping the Tree of Life",
    body: `Phylogenetic trees (also called phylogenies or dendrograms) are graphical representations of evolutionary relationships among organisms, genes, or proteins. They are inferred from molecular sequence data: by comparing how similar or different the DNA or protein sequences of different species are, computational methods reconstruct the branching history of life. A phylogenetic tree has leaves (representing current organisms or sequences), internal nodes (representing ancestral lineages), and branch lengths (representing the amount of evolutionary change, often correlated with time).

Modern phylogenetics uses several methods: distance-based methods (like UPGMA and Neighbor-Joining) compute pairwise sequence distances and build trees accordingly; character-based methods (Maximum Parsimony) minimize the number of evolutionary changes; probabilistic methods (Maximum Likelihood and Bayesian Inference) explicitly model the probability that a given tree generated the observed sequences. These methods have revolutionized our understanding of evolution — revealing that some bacteria are more distantly related to other bacteria than humans are to mushrooms, and that the three domains of life (Bacteria, Archaea, and Eukarya) diverged over 3.5 billion years ago.`,
  },
  {
    id: "protein-structure",
    heading: "Protein Structure Prediction and AlphaFold",
    body: `For decades, determining how an amino acid sequence folds into a three-dimensional protein structure was considered one of biology's hardest problems — the "protein folding problem." Experimental methods like X-ray crystallography can solve a protein's structure but require years of effort and tens of thousands of dollars per protein. Computational prediction methods attempted to predict structure from sequence alone, but accuracy remained limited until a revolution in 2020.

AlphaFold2, developed by DeepMind, used deep learning trained on the entire PDB database to predict protein structures with experimental accuracy. In the 2020 Critical Assessment of Protein Structure Prediction (CASP14) competition, AlphaFold2 achieved median backbone accuracy under 1 Ångström — roughly the width of an atom. DeepMind subsequently released predictions for virtually the entire proteomes of humans and hundreds of model organisms (over 200 million proteins) in the AlphaFold Protein Structure Database, freely available to all researchers. This represents perhaps the single most impactful advance in structural biology in decades, enabling drug discovery campaigns that previously required years of crystallization trials to begin computationally within hours.`,
  },
  {
    id: "genomics",
    heading: "Genomics, Metagenomics, and the Big Picture",
    body: `Genomics is the branch of molecular biology concerned with the structure, function, evolution, and mapping of genomes — an organism's complete set of DNA. Whole-genome sequencing, made affordable by next-generation sequencing (NGS) technologies that cost under $1000 per human genome, generates gigabytes of raw sequence data that must be assembled, annotated, and analyzed computationally. Read mapping tools align millions of short sequencing reads to a reference genome; variant callers identify single nucleotide polymorphisms (SNPs), insertions, deletions, and structural variants that may underlie disease or evolutionary adaptation; genome annotation tools identify genes, regulatory elements, and non-coding RNAs.

Metagenomics takes genomics a step further by sequencing all the DNA in an environmental sample — a soil core, a gut microbiome biopsy, a ocean water sample — without culturing individual organisms. This approach has revealed that the vast majority of microbial life on Earth has never been cultured in the laboratory and that the human gut harbors trillions of microorganisms from thousands of species whose collective genome (the microbiome) encodes metabolic functions essential to human health. Transcriptomics (sequencing RNA to measure gene expression), proteomics (measuring all proteins in a sample), and metabolomics (measuring all small molecules) together with genomics form the "multi-omics" approaches that provide a comprehensive molecular snapshot of biological systems.`,
  },
  {
    id: "careers",
    heading: "Career Pathways in Bioinformatics",
    body: `Bioinformatics sits at the intersection of biology, computer science, statistics, and mathematics, and career opportunities span academia, industry, healthcare, and government. In academia, bioinformaticians develop new algorithms and tools — building the next BLAST, designing machine learning models for drug target prediction, or creating single-cell analysis pipelines — and work in research labs analyzing genomic data to answer fundamental biological questions. The demand in academia has grown substantially as nearly every biology lab now generates large-scale sequencing data requiring computational expertise.

In the pharmaceutical and biotechnology industry, bioinformaticians work in drug discovery teams identifying novel targets through computational genomics, in precision medicine teams analyzing clinical trial patient genomes to identify biomarkers, and in manufacturing teams using bioinformatics to monitor microbial production strains. Healthcare is a rapidly expanding sector: clinical bioinformatics specialists analyze patient genome data in hospital settings, interpret cancer genomics reports, and maintain clinical sequencing pipelines. Recommended preparation includes strong programming skills (Python and R are essential; familiarity with Linux/bash is critical), coursework or self-study in algorithms, statistics, and machine learning, and hands-on experience with public datasets from NCBI, Ensembl, or Galaxy platform tutorials.`,
  },
];

// ─── Quiz ──────────────────────────────────────────────────────────────────────

const BIOINFORMATICS_QUIZ: QuizQuestion[] = [
  {
    id: "bio1",
    topic: "bioinformatics",
    question: "What is the primary purpose of bioinformatics?",
    options: [
      "To grow cells in laboratory culture",
      "To use computational methods to analyze and interpret biological data",
      "To sequence proteins using mass spectrometry",
      "To study the structure of cell membranes",
    ],
    correctIndex: 1,
    explanation:
      "Bioinformatics applies computational, mathematical, and statistical methods to collect, store, analyze, and interpret biological data — especially the massive sequence datasets generated by modern genomics and proteomics technologies.",
  },
  {
    id: "bio2",
    topic: "bioinformatics",
    question: "What does BLAST do?",
    options: [
      "It assembles genome sequences from raw reads",
      "It searches databases to find sequences similar to a query sequence",
      "It predicts the 3D structure of proteins from sequence",
      "It aligns two sequences using dynamic programming",
    ],
    correctIndex: 1,
    explanation:
      "BLAST (Basic Local Alignment Search Tool) rapidly searches databases like GenBank or UniProt to find sequences similar to a query sequence. It is the most widely used bioinformatics tool, enabling researchers to infer function and evolutionary relationships.",
  },
  {
    id: "bio3",
    topic: "bioinformatics",
    question: "Which database stores publicly available nucleotide sequences?",
    options: ["UniProt", "PDB", "GenBank", "KEGG"],
    correctIndex: 2,
    explanation:
      "GenBank, maintained by NCBI, is the primary public repository for nucleotide sequences. It contains over 250 million sequences from hundreds of thousands of organisms, all freely accessible to researchers worldwide.",
  },
  {
    id: "bio4",
    topic: "bioinformatics",
    question:
      "What is the difference between local and global sequence alignment?",
    options: [
      "Local alignment uses DNA; global alignment uses proteins",
      "Local finds the best matching sub-region; global aligns entire sequences end-to-end",
      "Global alignment is faster; local alignment is more accurate",
      "There is no difference — they produce the same result",
    ],
    correctIndex: 1,
    explanation:
      "Local alignment (Smith-Waterman) finds the most similar sub-region between two sequences — useful for finding conserved domains in divergent proteins. Global alignment (Needleman-Wunsch) aligns entire sequences end-to-end, best for closely related sequences of similar length.",
  },
  {
    id: "bio5",
    topic: "bioinformatics",
    question:
      "In a phylogenetic tree, what do the branch lengths typically represent?",
    options: [
      "The physical size of the organism",
      "The number of genes in the genome",
      "The amount of evolutionary change (divergence) between sequences",
      "The age of the oldest fossil for each species",
    ],
    correctIndex: 2,
    explanation:
      "In most phylogenetic trees, branch lengths represent the amount of evolutionary change (sequence divergence) between nodes. Longer branches indicate more mutations occurred, which often (but not always) correlates with more time elapsed since divergence.",
  },
  {
    id: "bio6",
    topic: "bioinformatics",
    question:
      "What revolutionary AI tool was released in 2020 to predict protein structures?",
    options: ["ProteinBERT", "AlphaFold2", "DeepGenome", "RosettaNet"],
    correctIndex: 1,
    explanation:
      "AlphaFold2, developed by DeepMind, achieved near-experimental accuracy in protein structure prediction at the 2020 CASP14 competition. It has since predicted structures for over 200 million proteins, transforming structural biology and drug discovery.",
  },
  {
    id: "bio7",
    topic: "bioinformatics",
    question: "What is a genome?",
    options: [
      "A single chromosome from an organism",
      "All the RNA molecules in a cell",
      "The complete set of DNA in an organism",
      "A database of protein sequences",
    ],
    correctIndex: 2,
    explanation:
      "A genome is the complete set of DNA in an organism, including all its genes and non-coding sequences. The human genome contains approximately 3 billion base pairs across 23 pairs of chromosomes and encodes about 20,000 protein-coding genes.",
  },
  {
    id: "bio8",
    topic: "bioinformatics",
    question: "Why is bioinformatics critical for modern drug discovery?",
    options: [
      "It replaces the need for clinical trials",
      "It allows computational identification of drug targets and candidates before lab synthesis",
      "It manufactures drugs using bacteria",
      "It stores medical patient records",
    ],
    correctIndex: 1,
    explanation:
      "Bioinformatics enables computational identification of drug targets (via genomic analysis of disease) and candidate molecules (via docking simulations) before expensive laboratory synthesis and testing. This dramatically accelerates and reduces the cost of drug discovery pipelines.",
  },
  {
    id: "bio9",
    topic: "bioinformatics",
    question: "What is metagenomics?",
    options: [
      "Sequencing the genome of a single purified organism",
      "Comparing genomes of two different species",
      "Sequencing all DNA in an environmental sample without culturing organisms",
      "Creating a map of all metabolic pathways in a cell",
    ],
    correctIndex: 2,
    explanation:
      "Metagenomics sequences all DNA from an environmental sample (gut, soil, ocean) without isolating individual organisms. This reveals microbial communities that cannot be cultured — and has shown that the human gut microbiome contains trillions of organisms from thousands of species with profound effects on health.",
  },
  {
    id: "bio10",
    topic: "bioinformatics",
    question:
      "Which database stores the three-dimensional structures of proteins?",
    options: ["GenBank", "UniProt", "KEGG", "Protein Data Bank (PDB)"],
    correctIndex: 3,
    explanation:
      "The Protein Data Bank (PDB) archives experimentally determined 3D structures of proteins, nucleic acids, and complex assemblies, solved by X-ray crystallography, cryo-electron microscopy, and NMR spectroscopy. It currently houses over 230,000 structures.",
  },
];

// ─── Main section ──────────────────────────────────────────────────────────────

export default function BioinformaticsSection() {
  return (
    <section
      className="px-6 py-16 max-w-5xl mx-auto"
      data-ocid="bioinformatics-section"
      aria-labelledby="bioinformatics-title"
    >
      {/* Header */}
      <SectionHeader
        topicId="bioinformatics"
        title="Bioinformatics Basics"
        subtitle="Where biology meets computing — learn how algorithms decode genomes, predict protein structures, and map the tree of life."
      />

      {/* Interactive Sequence Alignment Demo */}
      <AnimatedEntrance direction="up" delay={0.1}>
        <div className="mb-10">
          <h3
            id="bioinformatics-title"
            className="font-display text-xl font-semibold mb-4"
            style={{ color: "oklch(0.70 0.16 220)" }}
          >
            💻 Interactive Sequence Alignment Demo
          </h3>
          <SequenceAlignmentDemo />
        </div>
      </AnimatedEntrance>

      {/* Phylogenetic Tree */}
      <AnimatedEntrance direction="left" delay={0.1}>
        <div className="mb-12">
          <PhylogeneticTree />
        </div>
      </AnimatedEntrance>

      {/* Concept Cards */}
      <AnimatedEntrance direction="up" delay={0.05}>
        <div className="mb-12">
          <h3
            className="font-display text-xl font-semibold mb-5"
            style={{ color: "oklch(0.70 0.16 220)" }}
          >
            🛠️ Key Tools & Resources
          </h3>
          <StaggerContainer
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4"
            staggerDelay={0.1}
          >
            {CONCEPT_CARDS.map((card) => (
              <StaggerItem key={card.title}>
                <div
                  className="rounded-xl p-4 h-full"
                  style={{
                    background: "oklch(0.17 0.04 220)",
                    border: `1px solid ${card.color}40`,
                    boxShadow: `0 0 16px ${card.color}10`,
                  }}
                >
                  <div className="flex items-center gap-2 mb-3">
                    <span className="text-xl" aria-hidden="true">
                      {card.icon}
                    </span>
                    <h4
                      className="font-semibold text-sm"
                      style={{ color: card.color }}
                    >
                      {card.title}
                    </h4>
                  </div>
                  <ul className="space-y-1.5">
                    {card.items.map((item) => (
                      <li key={item.name} className="flex flex-col gap-0.5">
                        <span
                          className="text-xs font-bold font-mono"
                          style={{ color: card.color }}
                        >
                          {item.name}
                        </span>
                        <span className="text-[11px] text-muted-foreground leading-snug">
                          {item.desc}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </AnimatedEntrance>

      {/* Deep Explanations */}
      <StaggerContainer
        className="flex flex-col gap-8 mb-16"
        staggerDelay={0.08}
      >
        {EXPLANATIONS.map((section) => (
          <StaggerItem key={section.id}>
            <div
              className="rounded-2xl p-7"
              style={{
                background: "oklch(0.17 0.04 220)",
                border: "1px solid oklch(0.60 0.16 220 / 0.20)",
                boxShadow: "0 0 24px oklch(0.60 0.16 220 / 0.06)",
              }}
              data-ocid={`explanation-${section.id}`}
            >
              <h3
                className="font-display text-xl font-bold mb-4"
                style={{ color: "oklch(0.70 0.16 220)" }}
              >
                {section.heading}
              </h3>
              {section.body.split("\n\n").map((paragraph, pi) => (
                <p
                  key={`${section.id}-p${pi}`}
                  className="text-muted-foreground leading-relaxed mb-4 last:mb-0 text-[0.95rem]"
                >
                  {paragraph}
                </p>
              ))}
            </div>
          </StaggerItem>
        ))}
      </StaggerContainer>

      {/* Quiz */}
      <AnimatedEntrance direction="up" delay={0.1}>
        <div className="mb-4">
          <h3
            className="font-display text-2xl font-bold mb-2"
            style={{ color: "oklch(0.70 0.16 220)" }}
          >
            💻 Test Your Bioinformatics Knowledge
          </h3>
          <p className="text-muted-foreground mb-6">
            10 questions covering databases, sequence alignment, phylogenetics,
            AlphaFold, genomics, and career pathways.
          </p>
          <QuizEngine
            topicId="bioinformatics"
            questions={BIOINFORMATICS_QUIZ}
          />
        </div>
      </AnimatedEntrance>
    </section>
  );
}
