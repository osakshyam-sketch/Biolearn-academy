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

// ── Base color codes ───────────────────────────────────────────────────────────

const BASE_COLORS: Record<string, { bg: string; text: string; label: string }> =
  {
    A: {
      bg: "oklch(0.88 0.10 142)",
      text: "oklch(0.38 0.14 142)",
      label: "Adenine",
    },
    T: {
      bg: "oklch(0.90 0.08 27)",
      text: "oklch(0.40 0.14 27)",
      label: "Thymine",
    },
    G: {
      bg: "oklch(0.87 0.08 290)",
      text: "oklch(0.38 0.14 290)",
      label: "Guanine",
    },
    C: {
      bg: "oklch(0.88 0.10 55)",
      text: "oklch(0.40 0.14 55)",
      label: "Cytosine",
    },
    "-": { bg: "oklch(0.88 0.02 75)", text: "oklch(0.55 0 0)", label: "Gap" },
  };

// ── Sequence Alignment Demo ────────────────────────────────────────────────────

const SEQ1 = "ATGCTAGC";
const SEQ2 = "ATGCAAGC";
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
          border: `2px solid ${isMatch ? "oklch(0.52 0.18 142)" : isMismatch ? "oklch(0.55 0.18 27)" : `${color.text}44`}`,
          boxShadow: isMatch
            ? "0 0 8px oklch(0.52 0.18 142 / 0.5)"
            : isMismatch
              ? "0 0 8px oklch(0.55 0.18 27 / 0.5)"
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
        background: "oklch(0.985 0.008 75)",
        border: "1px solid oklch(0.87 0.02 75)",
        boxShadow: "0 2px 16px oklch(0.55 0.14 220 / 0.08)",
      }}
      aria-label="Sequence alignment interactive demo"
    >
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
              background: "oklch(0.88 0.08 142)",
              borderColor: "oklch(0.52 0.18 142)",
            }}
          />
          <span className="text-xs" style={{ color: "oklch(0.42 0.16 142)" }}>
            Match
          </span>
        </div>
        <div className="flex items-center gap-1.5">
          <div
            className="w-5 h-5 rounded border-2"
            style={{
              background: "oklch(0.90 0.08 27)",
              borderColor: "oklch(0.55 0.18 27)",
            }}
          />
          <span className="text-xs" style={{ color: "oklch(0.45 0.16 27)" }}>
            Mismatch
          </span>
        </div>
      </div>

      <section
        className="flex flex-col gap-2"
        aria-label="Sequence 1: ATGCTAGC"
      >
        <span
          className="text-xs font-semibold tracking-widest uppercase"
          style={{ color: "oklch(0.52 0.14 220)" }}
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
                  color: m ? "oklch(0.42 0.18 142)" : "oklch(0.50 0.18 27)",
                }}
                aria-label={m ? "match" : "mismatch"}
              >
                {m ? "|" : "✕"}
              </span>
            </div>
          ))}
        </motion.div>
      )}

      <section
        className="flex flex-col gap-2"
        aria-label="Sequence 2: ATGCAAGC"
      >
        <span
          className="text-xs font-semibold tracking-widest uppercase"
          style={{ color: "oklch(0.52 0.14 220)" }}
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

      {aligned && (
        <motion.div
          className="flex items-center gap-4 rounded-xl px-4 py-3"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.5 }}
          style={{
            background: "oklch(0.96 0.012 75)",
            border: "1px solid oklch(0.87 0.02 75)",
          }}
          aria-live="polite"
          aria-label={`Alignment complete. Similarity score: ${similarity} percent. ${matchCount} of ${ALIGNED1.length} bases match.`}
        >
          <div className="flex-1">
            <div
              className="text-xs font-semibold mb-1"
              style={{ color: "oklch(0.52 0.14 220)" }}
            >
              Similarity Score
            </div>
            <div className="h-2 rounded-full overflow-hidden bg-muted">
              <motion.div
                className="h-full rounded-full"
                style={{
                  background:
                    "linear-gradient(90deg, oklch(0.52 0.15 220), oklch(0.52 0.16 142))",
                }}
                initial={{ width: 0 }}
                animate={{ width: `${similarity}%` }}
                transition={{ delay: 0.5, duration: 0.8, ease: "easeOut" }}
              />
            </div>
          </div>
          <div
            className="text-2xl font-bold font-mono"
            style={{ color: "oklch(0.42 0.18 142)" }}
          >
            {similarity}%
          </div>
          <div className="text-xs" style={{ color: "oklch(0.45 0.04 75)" }}>
            {matchCount}/{ALIGNED1.length} bases match
          </div>
        </motion.div>
      )}

      <button
        type="button"
        onClick={handleAlign}
        disabled={animating}
        className="self-start rounded-xl px-6 py-2.5 font-semibold text-sm transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed hover:scale-105 active:scale-95"
        style={{
          background: "oklch(0.52 0.15 220)",
          color: "oklch(0.98 0 0)",
          boxShadow: "0 0 12px oklch(0.52 0.15 220 / 0.30)",
          outlineColor: "oklch(0.52 0.15 220)",
        }}
        aria-label="Run sequence alignment visualization"
        data-ocid="align-sequences-btn"
      >
        {animating ? "Aligning…" : "▶ Align Sequences"}
      </button>

      <p
        className="text-xs leading-relaxed"
        style={{ color: "oklch(0.45 0.04 75)" }}
      >
        <strong style={{ color: "oklch(0.52 0.14 220)" }}>How it works:</strong>{" "}
        Global alignment (Needleman-Wunsch) compares every position. Green
        border = match, orange border = mismatch. The similarity score
        quantifies how related two sequences are — key to identifying homologous
        genes across species.
      </p>
    </div>
  );
}

// ── Phylogenetic Tree ─────────────────────────────────────────────────────────

const TREE_SPECIES = [
  { id: "human", label: "Human", x: 60, y: 30, color: "oklch(0.52 0.15 220)" },
  {
    id: "chimp",
    label: "Chimpanzee",
    x: 160,
    y: 30,
    color: "oklch(0.52 0.15 180)",
  },
  { id: "mouse", label: "Mouse", x: 270, y: 30, color: "oklch(0.52 0.14 142)" },
  {
    id: "zebrafish",
    label: "Zebrafish",
    x: 370,
    y: 30,
    color: "oklch(0.58 0.16 55)",
  },
  { id: "yeast", label: "Yeast", x: 450, y: 30, color: "oklch(0.58 0.16 27)" },
];

const TREE_BRANCHES = [
  { x1: 60, y1: 30, x2: 60, y2: 90, color: "oklch(0.55 0.12 220)" },
  { x1: 160, y1: 30, x2: 160, y2: 90, color: "oklch(0.55 0.12 180)" },
  { x1: 60, y1: 90, x2: 160, y2: 90, color: "oklch(0.50 0.12 200)" },
  { x1: 110, y1: 90, x2: 110, y2: 145, color: "oklch(0.48 0.10 200)" },
  { x1: 270, y1: 30, x2: 270, y2: 145, color: "oklch(0.52 0.12 142)" },
  { x1: 110, y1: 145, x2: 270, y2: 145, color: "oklch(0.45 0.08 170)" },
  { x1: 190, y1: 145, x2: 190, y2: 195, color: "oklch(0.45 0.08 170)" },
  { x1: 370, y1: 30, x2: 370, y2: 195, color: "oklch(0.52 0.14 55)" },
  { x1: 190, y1: 195, x2: 370, y2: 195, color: "oklch(0.42 0.06 130)" },
  { x1: 280, y1: 195, x2: 280, y2: 235, color: "oklch(0.42 0.06 130)" },
  { x1: 450, y1: 30, x2: 450, y2: 235, color: "oklch(0.52 0.14 27)" },
  { x1: 280, y1: 235, x2: 450, y2: 235, color: "oklch(0.38 0.05 100)" },
  { x1: 365, y1: 235, x2: 365, y2: 260, color: "oklch(0.38 0.05 100)" },
];

function PhylogeneticTree() {
  return (
    <div
      className="rounded-2xl p-5 md:p-7"
      style={{
        background: "oklch(0.985 0.008 75)",
        border: "1px solid oklch(0.87 0.02 75)",
      }}
      aria-label="Phylogenetic tree showing evolutionary relationships"
      role="img"
    >
      <h4
        className="font-display text-base font-semibold mb-4"
        style={{ color: "oklch(0.52 0.14 220)" }}
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
          {TREE_BRANCHES.map((b) => (
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
              transition={{
                delay: TREE_BRANCHES.indexOf(b) * 0.05,
                duration: 0.4,
              }}
            />
          ))}
          {TREE_SPECIES.map((sp) => (
            <g key={sp.id}>
              <motion.circle
                cx={sp.x}
                cy={sp.y}
                r="14"
                fill="oklch(0.96 0.012 75)"
                stroke={sp.color}
                strokeWidth="2"
                initial={{ scale: 0, opacity: 0 }}
                whileInView={{ scale: 1, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.8, duration: 0.4, type: "spring" }}
                style={{ filter: `drop-shadow(0 0 5px ${sp.color}55)` }}
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
          <motion.text
            x={365}
            y={278}
            textAnchor="middle"
            fontSize="8"
            fill="oklch(0.55 0.04 100)"
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
      <p className="text-xs mt-3" style={{ color: "oklch(0.45 0.04 75)" }}>
        Branching points (nodes) represent common ancestors. Shorter branches =
        greater evolutionary similarity. Human and Chimpanzee share ~98.7% of
        their DNA sequence — a closer relationship than chimps share with
        gorillas.
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
              style={{ background: sp.color }}
            />
            {sp.label}
          </span>
        ))}
      </div>
    </div>
  );
}

// ── Concept cards ──────────────────────────────────────────────────────────────

const CONCEPT_CARDS = [
  {
    icon: "🗄️",
    title: "Biological Databases",
    items: [
      {
        name: "GenBank / NCBI",
        desc: "Primary repository — 250M+ nucleotide sequences",
      },
      {
        name: "UniProt / Swiss-Prot",
        desc: "Protein sequences with curated functional annotations",
      },
      { name: "PDB", desc: "230,000+ experimental 3D protein structures" },
      {
        name: "Ensembl / KEGG",
        desc: "Genome browsers and metabolic pathway maps",
      },
    ],
    color: "oklch(0.52 0.14 220)",
  },
  {
    icon: "🔍",
    title: "Sequence Analysis Tools",
    items: [
      {
        name: "BLAST / PSI-BLAST",
        desc: "Rapid similarity search — heuristic local alignment",
      },
      {
        name: "Clustal Omega / MUSCLE",
        desc: "Multiple sequence alignment (MSA)",
      },
      {
        name: "MAFFT",
        desc: "Fast Fourier transform-based MSA for large datasets",
      },
      {
        name: "BWA / Bowtie2",
        desc: "Short-read mapping to reference genomes",
      },
    ],
    color: "oklch(0.52 0.14 262)",
  },
  {
    icon: "🤖",
    title: "Structure Prediction",
    items: [
      {
        name: "AlphaFold2 / AF3",
        desc: "AI-powered protein and complex structure prediction",
      },
      { name: "Rosetta", desc: "Ab initio energy minimisation folding" },
      {
        name: "I-TASSER / Phyre2",
        desc: "Threading/fold-recognition for remote homologs",
      },
      {
        name: "AutoDock Vina",
        desc: "Protein–ligand docking for drug discovery",
      },
    ],
    color: "oklch(0.52 0.15 290)",
  },
  {
    icon: "🧬",
    title: "Genomics & Transcriptomics",
    items: [
      {
        name: "GATK HaplotypeCaller",
        desc: "Variant calling (SNPs, indels) from WGS/WES",
      },
      {
        name: "DESeq2 / edgeR",
        desc: "Differential gene expression from RNA-seq",
      },
      { name: "QIIME2 / MetaPhlAn", desc: "Microbiome/metagenomic analysis" },
      {
        name: "10x Genomics / Seurat",
        desc: "Single-cell RNA-seq and UMAP clustering",
      },
    ],
    color: "oklch(0.52 0.14 142)",
  },
];

// ── Explanations ──────────────────────────────────────────────────────────────

const EXPLANATIONS = [
  {
    id: "what-is",
    anchorId: "bioinformatics-overview",
    heading: "What Is Bioinformatics — and Why Does It Matter So Much Now?",
    body: `Bioinformatics sits at the intersection of biology, computer science, mathematics, and statistics — and it exists because modern biology generates data at a scale that would have been unimaginable a generation ago. The Human Genome Project took 13 years and cost approximately $3 billion to sequence a single human genome, completing in 2003. Today, that same genome can be sequenced in under 24 hours for less than $200 — a cost reduction faster than Moore's law in computing. The bottleneck is no longer generating the data; it's making sense of it.

The importance goes far beyond academic curiosity. Bioinformatics is the backbone of personalised medicine: a patient's tumour genome is sequenced, computational tools identify the specific mutations driving cancer growth, and targeted therapies are selected accordingly. It underlies drug discovery — computational docking and virtual screening identify candidate molecules before expensive lab synthesis begins. It accelerates vaccine development: when COVID-19 emerged in late 2019, bioinformaticians had the complete viral genome sequenced and publicly available within days of the first cases. That sequence was the blueprint used to design the mRNA vaccines in record time. Across all of biology, the discipline has shifted from data-poor to data-rich, and bioinformatics is the infrastructure that makes that data mean something.`,
  },
  {
    id: "databases",
    anchorId: "bioinformatics-databases",
    heading: "Biological Databases: The World's Shared Filing Cabinets",
    body: `Think of biological databases as the shared filing system of global science. When a researcher sequences a new gene or solves a protein structure, they deposit the data in a public database — and it becomes instantly available to every lab in the world. That global data sharing has been one of the most productive collaborative arrangements in the history of science, and it's mostly taken for granted.

GenBank, maintained by the NCBI, is the central repository for nucleotide sequences. Over 250 million sequences from hundreds of thousands of species — from bacteria to blue whales — growing at exponential rates. When you use BLAST to search for similar sequences, you're searching GenBank. UniProt/Swiss-Prot is the counterpart for proteins, combining sequence data with rich functional annotations: what the protein does, where it localises in the cell, which diseases arise from mutations, what post-translational modifications it carries. The Protein Data Bank (PDB) archives three-dimensional structures solved by X-ray crystallography, cryo-electron microscopy, and NMR spectroscopy: over 230,000 structures, each representing enormous experimental effort. Pathway databases like KEGG map how molecules interact in metabolic and signalling networks, so you can see the broader system context of any gene. STRING shows protein-protein interaction networks. Ensembl provides genome browsers for hundreds of species with annotations of genes, regulatory elements, and variants. Together, these databases form the collective memory of molecular biology.`,
  },
  {
    id: "sequence-formats",
    anchorId: "bioinformatics-formats",
    heading: "Sequence Data Formats and Quality Control",
    body: `Before any analysis, you need to understand the data you're working with. FASTA format is the simplest: a header line starting with '>' followed by the sequence. It's the lingua franca of bioinformatics — every tool reads FASTA. FASTQ format adds per-base quality scores to each sequence read — critical for next-generation sequencing data because not all bases are called with equal confidence. The quality score (Phred score) is logarithmically related to the error probability: a Q30 score means 1 error in 1,000 bases, Q20 means 1 in 100. Modern Illumina sequencers typically achieve Q30 across most of the read. SAM (Sequence Alignment/Map) and its compressed binary version BAM store reads that have been aligned to a reference genome, along with position, orientation, and mapping quality for each read.

Quality control (QC) is always the first step in any sequencing analysis pipeline. FastQC is the standard tool — it produces visual reports of per-base quality scores, GC content distribution, adapter contamination, and overrepresented sequences. Low-quality bases are trimmed using tools like Trimmomatic or Cutadapt before proceeding. Skipping QC is a common mistake that leads to wrong results. For assembled genomes, N50 (the contig length such that half the assembly is in contigs of that length or longer) is a key quality metric. A genome with many short contigs and a low N50 will have many genes split across contig boundaries — a problem for gene finding and downstream analysis.`,
  },
  {
    id: "blast",
    anchorId: "bioinformatics-blast",
    heading: "BLAST: The Most-Used Bioinformatics Tool in History",
    body: `BLAST — Basic Local Alignment Search Tool — developed by Altschul and colleagues at NCBI in 1990, is probably the single most-used bioinformatics tool in the history of the field. The core idea is simple: you have an unknown sequence, and you want to find what's similar to it in the database. BLAST does this in seconds by using clever heuristics rather than exhaustive dynamic programming, making it fast enough to search billions of sequences.

BLAST comes in several flavours, each for a different query/database combination. BLASTn searches nucleotide against nucleotide; BLASTp searches protein against protein; BLASTx translates your nucleotide query in all six reading frames and searches against a protein database — useful when you have an uncharacterised sequence and want to find protein homologs. tBLASTn does the reverse: searches a protein query against translated nucleotide databases, good for finding unannotated genes in genome sequences. Understanding the BLAST output is crucial: the E-value (Expect value) is the number of hits you'd expect to get by chance in a database of that size — an E-value of 0.001 means one false positive per thousand searches, generally considered significant. Bit scores normalise for database size and query length. Percent identity tells you how many positions match; query coverage tells you how much of your query sequence was aligned. PSI-BLAST (Position-Specific Iterated BLAST) builds a profile from initial search results and iterates, dramatically improving sensitivity for detecting distant evolutionary relationships — it can find homologs with less than 25% sequence identity that BLASTp would miss.`,
  },
  {
    id: "alignment",
    anchorId: "bioinformatics-alignment",
    heading: "Sequence Alignment: The Foundation of Comparative Biology",
    body: `The core insight behind sequence alignment is elegant: if two genes from different species look similar, they probably descended from the same ancestral gene and likely perform the same function. This logic of homology is the engine of comparative genomics. Two genes in different organisms that descended from a common ancestral gene are called orthologs; two genes within the same organism that arose by duplication are paralogs. Both are detected by sequence alignment.

Pairwise alignment algorithms come in two flavours. Global alignment (Needleman-Wunsch, 1970) aligns entire sequences end-to-end, optimising a score based on matches, mismatches, and gap penalties across the full length. It uses dynamic programming — filling in a scoring matrix — to find the globally optimal alignment. It's best for closely related sequences of similar length. Local alignment (Smith-Waterman, 1981) finds the best-matching sub-region between two sequences, ignoring flanking regions that don't align well. It's ideal for finding a conserved domain buried inside an otherwise divergent protein. BLAST uses a local alignment strategy.

Multiple sequence alignment (MSA) simultaneously aligns three or more sequences and is the foundation for phylogenetics, identifying conserved motifs, and predicting functionally important residues. ClustalW builds alignments progressively using a guide tree; MUSCLE refines iteratively for better accuracy; MAFFT uses Fast Fourier Transform to find similarities in the frequency domain for large datasets. The scoring matrices used in protein alignment — PAM (Point Accepted Mutation, based on evolutionary models) and BLOSUM (Blocks Substitution Matrix, derived empirically from conserved sequence blocks) — encode the probability that one amino acid will substitute for another. BLOSUM62 is the standard choice for general protein database searching; higher BLOSUM numbers (BLOSUM80) work better for closely related sequences.`,
  },
  {
    id: "phylogenetics",
    anchorId: "bioinformatics-phylogenetics",
    heading: "Phylogenetics: Reading the History Written in DNA",
    body: `Every living organism carries its evolutionary history in its DNA. Mutations accumulate over generations like a molecular clock — closely related species have fewer differences; distantly related ones have more. Phylogenetic analysis reconstructs evolutionary relationships from these differences, producing the Tree of Life.

Distance methods (UPGMA, Neighbour-Joining) compute pairwise sequence similarities, convert them to distances, and cluster sequences hierarchically into a tree. They're fast and work well for large datasets with thousands of sequences. Parsimony methods seek the tree that requires the fewest evolutionary changes to explain the observed sequences — computationally expensive for many taxa but conceptually simple. Maximum Likelihood (ML) methods use an explicit statistical model of sequence evolution (e.g. the GTR+Γ model for nucleotides) and find the tree that maximises the probability of observing the sequences given that tree. Programs like RAxML and IQ-TREE implement ML and scale to thousands of sequences. Bayesian inference (MrBayes, BEAST) adds prior probabilities to produce posterior probability distributions over trees — the most statistically rigorous approach, and BEAST additionally estimates divergence times using molecular clocks. Bootstrap support (re-sampling with replacement and re-building the tree) quantifies confidence in each branch. Phylogenetics isn't purely academic: tracking SARS-CoV-2 evolution globally (Nextstrain uses real-time phylogenetics), understanding antibiotic resistance spread, reconstructing human migration out of Africa, and making conservation decisions about endangered species all rely on phylogenetic analysis.`,
  },
  {
    id: "genomics-transcriptomics",
    anchorId: "bioinformatics-genomics",
    heading: "Genomics, Variant Calling, RNA-seq, and Single-Cell Analysis",
    body: `Whole genome sequencing (WGS) sequences every base pair; whole exome sequencing (WES) targets only the protein-coding regions (~2% of the genome but ~85% of disease-causing variants); targeted panels sequence specific clinically relevant genes. The GATK (Genome Analysis Toolkit) Best Practices pipeline is the gold standard for variant calling from WGS/WES: reads are mapped with BWA, duplicates marked with Picard, base quality scores recalibrated, then HaplotypeCaller identifies variants and VQSR (Variant Quality Score Recalibration) filters them. Tools like SnpEff and VEP annotate variants with their predicted functional consequences — synonymous, missense, nonsense, splice site. GWAS (Genome-Wide Association Studies) test millions of variants across thousands of individuals to identify positions statistically associated with disease traits; the significance threshold is p < 5×10⁻⁸ to account for multiple testing.

RNA-seq measures gene expression genome-wide by sequencing the mRNA in a sample. The workflow: extract RNA, deplete ribosomal RNA (or select polyadenylated mRNA), prepare a sequencing library with strand specificity, sequence on Illumina, align reads to the genome with HISAT2 or STAR, count reads per gene with HTSeq or featureCounts, then use DESeq2 or edgeR (which model read counts as negative binomial distributions) to identify differentially expressed genes between conditions. Volcano plots, heatmaps, and pathway enrichment analysis (GSEA, over-representation analysis against KEGG or Gene Ontology) visualise the results.

Single-cell RNA-seq (scRNA-seq) takes this further by sequencing individual cells instead of bulk populations. The 10x Genomics Chromium platform is dominant — it encapsulates single cells in droplets with barcoded beads, uniquely tagging each cell's transcriptome. After sequencing and alignment, cells are clustered by transcriptome similarity (Louvain or Leiden algorithm), visualised by dimensionality reduction (UMAP or t-SNE), and annotated by cell type based on marker genes. Trajectory analysis (Monocle, Slingshot) maps cells onto pseudotime developmental trajectories — showing the progression from stem cell to differentiated fate as a continuous gradient rather than discrete clusters.`,
  },
  {
    id: "protein-structure",
    anchorId: "bioinformatics-alphafold",
    heading: "Structural Bioinformatics and the AlphaFold Revolution",
    body: `For 50 years, predicting a protein's 3D structure from its amino acid sequence — the protein folding problem — was considered one of biology's grand unsolved challenges. Structure determines function; understanding a protein's shape is often essential for understanding its biology and designing drugs that interact with it. Experimental methods like X-ray crystallography can take years and tens of thousands of dollars per protein. Cryo-electron microscopy (cryo-EM) has accelerated structure determination and can handle proteins that resist crystallisation, but still requires significant expertise and equipment.

Computational prediction approaches fall into three categories. Homology modelling (MODELLER, Swiss-Model) works when a query protein shares >30% sequence identity with a protein of known structure — the known structure serves as a template. Threading/fold recognition (Phyre2, I-TASSER) applies when identity is too low for homology modelling but the fold can still be recognised by threading the sequence through a library of known structures. Ab initio prediction (Rosetta) uses energy minimisation to predict structure from scratch, without relying on templates — it works for small proteins but was computationally intractable for large ones.

Then in 2020, AlphaFold2 (DeepMind) changed everything. Using an attention-based transformer architecture and evolutionary information from multiple sequence alignments, it achieved near-experimental accuracy at the CASP14 competition — a result that genuinely surprised even structural biologists who had been working on this problem for decades. DeepMind then released the AlphaFold Protein Structure Database containing predicted structures for over 200 million proteins — essentially the entire known proteome, freely available. AlphaFold3 (2024) extends the system to predict structures of complexes involving DNA, RNA, and small-molecule ligands. Drug discovery campaigns that previously required years of crystallography trials can now begin computationally. Protein–ligand docking (AutoDock Vina, Glide) predicts how a drug molecule binds to a target protein; molecular dynamics simulations (GROMACS, AMBER) model the behaviour of proteins in solution over nanosecond to microsecond timescales, revealing conformational changes and binding dynamics.`,
  },
  {
    id: "metagenomics",
    anchorId: "bioinformatics-metagenomics",
    heading: "Metagenomics and the Microbiome Revolution",
    body: `For most of the history of microbiology, the only microorganisms we could study were ones we could grow in the laboratory — which turns out to be a tiny fraction of the microbial world. Metagenomics changed this by sequencing all DNA in an environmental sample directly, without culturing anything. A soil sample, a gut biopsy, a water column from the deep ocean — all can be characterised by what DNA is present.

Two main approaches exist. Amplicon sequencing targets a specific marker gene — the 16S rRNA gene (specifically the V3-V4 hypervariable regions) for bacteria and archaea, or the ITS region for fungi. 16S sequences are then compared to reference databases (SILVA, Greengenes) to assign taxonomy, and communities are characterised by OTUs (Operational Taxonomic Units) or the more precise ASVs (Amplicon Sequence Variants) as implemented in QIIME2 and mothur. Shotgun metagenomics sequences everything — the full genetic complement of all organisms in the sample. This allows functional profiling (HUMAnN3 assigns reads to metabolic pathways), strain-level resolution, and discovery of entirely new organisms. The Human Microbiome Project found that the human gut contains trillions of organisms from thousands of species with a collective genome (the microbiome) encoding metabolic functions we lack ourselves: vitamin synthesis, bile acid metabolism, fermentation of dietary fibre to short-chain fatty acids, and immune system education. Disruptions in microbiome composition (dysbiosis) are associated with inflammatory bowel disease, obesity, anxiety, autism spectrum disorder, and dozens of other conditions — though causality versus correlation remains an active area of research. Ecological metrics quantify community diversity: alpha diversity (Shannon index, species richness) measures diversity within a sample; beta diversity (Bray-Curtis dissimilarity, UniFrac distance) measures how different communities are from each other.`,
  },
  {
    id: "machine-learning",
    anchorId: "bioinformatics-ml",
    heading: "Machine Learning and AI in Bioinformatics",
    body: `Bioinformatics was an early adopter of machine learning, long before the current AI boom. Hidden Markov Models (HMMs) have been used for gene finding and protein family classification (HMMER) since the 1990s. Random forests and support vector machines have been applied to variant pathogenicity prediction, splice site prediction, and protein function classification for decades. But the deep learning revolution starting around 2012 fundamentally expanded what's possible.

Convolutional neural networks can recognise sequence motifs — transcription factor binding sites, splicing signals, regulatory elements — with accuracy exceeding hand-crafted rules. Graph neural networks model molecules as graphs (atoms as nodes, bonds as edges) and predict molecular properties — solubility, toxicity, bioactivity — enabling AI-driven drug discovery. AlphaFold2's architecture, combining multiple sequence alignment processing with a transformer-based 'Evoformer' module, is perhaps the most impactful application of deep learning in biology to date.

Protein language models represent another frontier: large language models trained on hundreds of millions of protein sequences (ESM2 from Meta, ProtTrans from Rostlab) learn a rich representation of protein 'grammar' — sequence patterns that predict structure, function, and evolutionary relationships — without ever being explicitly told what any of those things are. ESMFold can predict protein structure from sequence in seconds using these embeddings. Similar models for DNA sequences (Nucleotide Transformer, Enformer) predict regulatory element activity and variant effects. In clinical medicine, AI systems analyse histopathology slides to detect cancer and predict molecular subtypes, read radiology images, and predict patient outcomes from electronic health records. BioBERT and PubMedBERT are language models fine-tuned on biomedical literature, enabling automated extraction of knowledge from millions of scientific papers. The integration of AI into bioinformatics workflows is accelerating — and the tools that feel cutting-edge today will likely feel routine within a decade.`,
  },
];

// ── Biopython code snippets ───────────────────────────────────────────────────

interface CodeBlockProps {
  code: string;
  language?: string;
}

function CodeBlock({ code }: CodeBlockProps) {
  return (
    <pre
      className="rounded-lg p-4 overflow-x-auto text-sm leading-relaxed font-mono"
      style={{
        background: "oklch(0.14 0.02 240)",
        border: "1px solid oklch(0.25 0.04 240)",
      }}
      aria-label="Code example"
    >
      <code>
        {code.split("\n").map((line, i) => {
          const isComment = line.trim().startsWith("#");
          return (
            <span
              key={`${i}-${line.slice(0, 20)}`}
              className="block"
              style={{
                color: isComment
                  ? "oklch(0.62 0.04 220)"
                  : "oklch(0.82 0.12 180)",
              }}
            >
              {line}
            </span>
          );
        })}
      </code>
    </pre>
  );
}

// ── Biopython subsections ─────────────────────────────────────────────────────

const BIOPYTHON_SUBSECTIONS = [
  {
    id: "bp-intro",
    heading: "1. What Is Biopython — and Why Should You Care?",
    body: `If you've ever wished there was a Python library that just *gets* biology — one that understands sequences, talks to NCBI databases, runs BLAST queries, and parses PDB files without you having to write it all from scratch — you're going to love Biopython. It's a collection of freely available tools for biological computation, written in Python, and it's been a cornerstone of the bioinformatics community since 1999. Think of it as biology's standard library.

Here's the cool part: you don't need to be a software engineer to use it. If you know basic Python (variables, loops, functions), you're ready. Biopython handles the heavy lifting — connecting to databases, parsing complex file formats, running alignment algorithms — so you can focus on the biology.

Getting started is genuinely easy. You install it with a single command, fire up a Python script or Jupyter notebook, and within minutes you're reading FASTA files and computing GC content. The community is welcoming, the documentation is excellent, and virtually every bioinformatics workflow you'll encounter has Biopython somewhere in its stack.`,
    code: `# Installation — run this once in your terminal
# pip install biopython

# Then in Python, just import what you need:
from Bio.Seq import Seq
from Bio import SeqIO, Entrez

# Quick sanity check — if this prints, you're good to go!
import Bio
print(f"Biopython version: {Bio.__version__}")

# The Seq object is Biopython's core building block
my_dna = Seq("ATGCGATCGATCGATCG")
print(f"My sequence: {my_dna}")
print(f"Length: {len(my_dna)} bp")`,
  },
  {
    id: "bp-seq",
    heading: "2. Seq Objects — Sequences That Actually Know They're Biological",
    body: "The Seq object is Biopython's most fundamental building block, and it's much smarter than a plain Python string. Yes, it stores your sequence — but it also knows how to transcribe DNA to RNA, translate RNA to protein, find the reverse complement, and compute GC content, all with built-in methods that follow the actual rules of molecular biology.\n\nYou'll notice that when you create a Seq object, it behaves a lot like a string — you can slice it, iterate over it, concatenate two of them together. But then you call .translate() and suddenly it's handing you the amino acid sequence, codon by codon, stopping at the first stop codon. That's the magic.\n\nDon't worry if the genetic code lookups feel abstract at first. The key insight is that Biopython uses the NCBI genetic code tables, so you can switch between standard code, mitochondrial code, or any of the 30+ alternative genetic codes with a single argument. This matters more than you'd think — many organisms use alternative codon tables, and getting this wrong is a surprisingly common source of errors in bioinformatics pipelines.",
    code: `from Bio.Seq import Seq
from Bio.SeqUtils import gc_fraction

# Create a DNA sequence
dna = Seq("ATGCGATCGAATTTAAACGATCG")

# Reverse complement — crucial for working with double-stranded DNA
rev_comp = dna.reverse_complement()
print(f"Original:          {dna}")
print(f"Reverse complement: {rev_comp}")

# Transcription — DNA → RNA (T becomes U)
mrna = dna.transcribe()
print(f"mRNA: {mrna}")

# Translation — RNA → Protein (stops at stop codon)
protein = dna.translate()
print(f"Protein: {protein}")

# GC content — higher GC = more thermally stable
gc = gc_fraction(dna) * 100
print(f"GC content: {gc:.1f}%")

# Slicing works just like strings
first_codon = dna[0:3]  # ATG = Methionine (start codon!)
print(f"First codon: {first_codon}")`,
  },
  {
    id: "bp-seqrecord",
    heading: "3. SeqRecord & SeqIO — Reading Real Biological Files",
    body: "Real-world bioinformatics means working with files: FASTA files from sequencing runs, GenBank files downloaded from NCBI, FASTQ files from an Illumina run. Biopython's SeqIO module handles all of these with the same clean interface, and the SeqRecord object wraps a sequence together with its ID, name, description, and annotations into a single tidy package.\n\nHere's something that trips up beginners: the difference between SeqIO.read() (for files with exactly one sequence) and SeqIO.parse() (for files with multiple sequences). Using read() on a multi-sequence file will raise an error — intentionally, because silently ignoring extra sequences would be a silent data loss bug. Parse returns an iterator, which means it's memory-efficient even for files with millions of sequences.\n\nThe reverse is equally powerful: you can write sequences back to files in any format. Converting between FASTA and GenBank, filtering sequences by length, extracting a subset — all of it becomes a few lines of code. Once you get comfortable with SeqRecord and SeqIO, you'll find that file I/O, which often dominates bioinformatics scripts, becomes almost frictionless.",
    code: `from Bio import SeqIO
from Bio.SeqRecord import SeqRecord
from Bio.Seq import Seq

# --- Reading a FASTA file ---
# SeqIO.parse returns an iterator — efficient for large files
for record in SeqIO.parse("sequences.fasta", "fasta"):
    print(f"ID: {record.id}")
    print(f"Description: {record.description}")
    print(f"Sequence length: {len(record.seq)} bp")
    print(f"First 50 bp: {record.seq[:50]}")

# --- Reading a GenBank file (much richer metadata) ---
record = SeqIO.read("gene.gb", "genbank")
print(f"Organism: {record.annotations.get('organism', 'unknown')}")
print(f"Features: {len(record.features)}")  # Genes, CDS, exons, etc.

# --- Creating and writing a SeqRecord ---
my_seq = SeqRecord(
    Seq("ATGCGATCGATCG"),
    id="gene_001",
    description="My interesting gene"
)
SeqIO.write(my_seq, "output.fasta", "fasta")

# --- Filtering: keep only sequences > 500 bp ---
long_seqs = [r for r in SeqIO.parse("all_seqs.fasta", "fasta")
             if len(r.seq) > 500]
SeqIO.write(long_seqs, "long_seqs.fasta", "fasta")
print(f"Kept {len(long_seqs)} sequences over 500 bp")`,
  },
  {
    id: "bp-entrez",
    heading: "4. Entrez & NCBI Databases — Fetching Sequences Programmatically",
    body: "You know that feeling when you need 50 sequences from NCBI and you're manually clicking \"download\" on each one? Bio.Entrez exists precisely to save you from that. It's Biopython's interface to the NCBI Entrez system — the web of databases (GenBank, PubMed, Protein, Taxonomy) that NCBI maintains — and it lets you search and fetch records programmatically as part of your scripts.\n\nThe basic workflow is always the same: search to get a list of IDs, then fetch those IDs to get the actual records. The esearch function returns IDs matching your query (same query syntax as the NCBI website), and efetch retrieves the data in whatever format you want: GenBank for full annotation, FASTA for just the sequence, XML for machine-readable structured data.\n\nOne important rule: always set your email address. NCBI uses it to contact you if your scripts cause load issues on their servers. Don't skip this — it's both polite and prevents your IP from being temporarily blocked. Also, don't make more than 3 requests per second without an API key. With an API key (free, takes 30 seconds to get), you can make up to 10 per second.",
    code: `from Bio import Entrez, SeqIO

# --- Always set your email first! ---
Entrez.email = "your.email@university.edu"

# --- Search for sequences matching a query ---
# Same syntax as NCBI's search bar
handle = Entrez.esearch(
    db="nucleotide",
    term="BRCA1[Gene Name] AND Homo sapiens[Organism]",
    retmax=5  # limit to 5 results
)
search_results = Entrez.read(handle)
handle.close()

ids = search_results["IdList"]
print(f"Found {search_results['Count']} records, fetching {len(ids)}")

# --- Fetch the actual sequences ---
handle = Entrez.efetch(
    db="nucleotide",
    id=ids,
    rettype="fasta",    # or "gb" for full GenBank format
    retmode="text"
)
sequences = list(SeqIO.parse(handle, "fasta"))
handle.close()

for seq in sequences:
    print(f"{seq.id}: {len(seq.seq)} bp")

# --- Fetch a specific accession directly ---
handle = Entrez.efetch(db="nucleotide", id="NM_007294", rettype="gb")
record = SeqIO.read(handle, "genbank")
print(f"Gene: {record.name}, Organism: {record.annotations['organism']}")`,
  },
  {
    id: "bp-blast",
    heading: "5. Running BLAST from Python — Automate Your Similarity Searches",
    body: "BLAST is probably the most-used bioinformatics tool in existence, and running it from the NCBI website is fine for one-off searches — but the moment you need to BLAST 100 sequences, or integrate BLAST into a larger pipeline, you want to do it in Python. Biopython's Bio.Blast module wraps the NCBI BLAST web service and, importantly, provides a robust parser for understanding what comes back.\n\nThe results Biopython hands you back are hierarchical: a BLAST result contains a list of alignments (one per matching database sequence), each alignment contains a list of high-scoring pairs (HSPs), and each HSP contains the actual aligned sequences, scores, and statistics. The E-value lives on the HSP object: hsp.expect. Bit scores, percent identity, and alignment lengths are all there too.\n\nHere's the cool part about parsing: once you understand the structure, extracting the information you want is just a few list comprehensions. Want the top 5 hits with E-value < 1e-10? That's three lines of Python. Want to write a summary table to a CSV? Another five. BLAST results that used to mean manual copy-pasting from a web page become structured data you can analyse programmatically.",
    code: `from Bio.Blast import NCBIWWW, NCBIXML
from Bio import SeqIO

# --- Run a BLAST search against NCBI (requires internet) ---
query_seq = "MTEYKLVVVGAGGVGKSALTIQLIQNHFVDE"  # KRAS protein fragment

print("Running BLAST... (this takes 30-60 seconds)")
result_handle = NCBIWWW.qblast(
    program="blastp",      # protein vs protein
    database="nr",         # non-redundant protein database
    sequence=query_seq,
    hitlist_size=10        # return top 10 hits
)

# --- Parse the results ---
blast_record = NCBIXML.read(result_handle)
result_handle.close()

print(f"Query: {blast_record.query[:50]}...")
print(f"Database: {blast_record.database}")
print()

# --- Iterate through alignments and HSPs ---
for alignment in blast_record.alignments[:5]:  # top 5 hits
    for hsp in alignment.hsps:
        if hsp.expect < 1e-10:  # only significant hits
            identity_pct = (hsp.identities / hsp.align_length) * 100
            print(f"Hit: {alignment.title[:60]}")
            print(f"  E-value: {hsp.expect:.2e}  Identity: {identity_pct:.1f}%")
            print(f"  Score: {hsp.score}  Length: {alignment.length} aa")`,
  },
  {
    id: "bp-alignment",
    heading: "6. Sequence Alignment with Biopython — Pairwise and Multiple",
    body: "Biopython gives you access to two distinct alignment worlds. For pairwise alignment (two sequences at a time), the modern PairwiseAligner is clean, flexible, and fast — you can switch between global (Needleman-Wunsch) and local (Smith-Waterman) alignment with a single attribute, set custom match/mismatch scores and gap penalties, and iterate through all optimal alignments. For multiple sequence alignment (three or more sequences simultaneously), AlignIO reads and writes in every standard format: ClustalW, PHYLIP, Stockholm, FASTA aligned.\n\nYou'll notice that the PairwiseAligner replaced the older pairwise2 module in recent Biopython versions. If you find old tutorials using Bio.pairwise2.align.globalds(), know that the new PairwiseAligner is the current way to go — it's cleaner and more powerful.\n\nMultiple sequence alignments are particularly important for phylogenetics and finding conserved residues. Once you have an MSA in memory as a MultipleSeqAlignment object, you can iterate over columns to find conservation scores, slice regions, and pass the alignment to tree-building functions. The combination of AlignIO for I/O and external tool wrappers (like Biopython's ClustalW wrapper) lets you build complete alignment pipelines with just Python.",
    code: `from Bio import Align, AlignIO
from Bio.Seq import Seq

# --- Pairwise alignment with PairwiseAligner ---
aligner = Align.PairwiseAligner()
aligner.mode = "global"       # Needleman-Wunsch (use "local" for Smith-Waterman)
aligner.match_score = 2       # reward for a match
aligner.mismatch_score = -1   # penalty for mismatch
aligner.open_gap_score = -2   # penalty to open a gap
aligner.extend_gap_score = -0.5  # penalty to extend a gap

seq1 = Seq("ATGCGATCGATCGAA")
seq2 = Seq("ATGCAATCGATCGAA")

score = aligner.score(seq1, seq2)
print(f"Alignment score: {score}")

# Get the best alignment
alignments = aligner.align(seq1, seq2)
best = next(alignments)  # top-scoring alignment
print(best)

# --- Reading a multiple sequence alignment (MSA) ---
# Assumes you have a pre-computed alignment file
alignment = AlignIO.read("sequences_aligned.fasta", "fasta")
print(f"MSA: {len(alignment)} sequences × {alignment.get_alignment_length()} columns")

# Iterate columns to find conserved positions
for i in range(alignment.get_alignment_length()):
    col = alignment[:, i]  # all residues at position i
    if len(set(col)) == 1:  # every sequence has the same residue
        print(f"Conserved at position {i}: {col[0]}")`,
  },
  {
    id: "bp-phylo",
    heading: "7. Phylogenetics with Bio.Phylo — Building and Visualising Trees",
    body: "One of the most satisfying things you can do in bioinformatics is build a phylogenetic tree — start with sequences, end with a visual picture of evolutionary relationships. Biopython's Bio.Phylo module lets you read trees in Newick, Nexus, and PhyloXML formats, navigate and modify tree structure programmatically, and draw ASCII or matplotlib-based visualisations directly in Python.\n\nThe typical workflow is: compute a multiple sequence alignment (using an external tool like MUSCLE or MAFFT, or Biopython's wrappers), calculate a distance matrix from that alignment, and build a tree using Neighbour-Joining or another algorithm. Biopython has the Bio.Phylo.TreeConstruction submodule for this, implementing distance-based tree construction methods out of the box.\n\nHere's something that genuinely impresses students: once you have the tree as a Python object, you can query it like a data structure. What's the most recent common ancestor of human and mouse? One method call. List all tips of the tree? Iterate tree.get_terminals(). Calculate the distance between two species along the tree? tree.distance(clade1, clade2). The tree isn't just a picture — it's a queryable data structure representing evolutionary history.",
    code: `from Bio import Phylo, AlignIO
from Bio.Phylo.TreeConstruction import DistanceCalculator, DistanceTreeConstructor
from io import StringIO

# --- Parse a tree from Newick format ---
newick_str = "((Human:0.1, Chimp:0.12):0.3, (Mouse:0.4, Rat:0.38):0.5);"
tree = Phylo.read(StringIO(newick_str), "newick")

# --- Navigate tree structure ---
print(f"Number of terminals (leaves): {tree.count_terminals()}")
for clade in tree.get_terminals():
    print(f"  Species: {clade.name}, Branch length: {clade.branch_length}")

# --- Find common ancestor ---
human_chimp_ancestor = tree.common_ancestor("Human", "Chimp")
print(f"Common ancestor confidence: {human_chimp_ancestor.confidence}")

# --- Build a tree from a multiple sequence alignment ---
alignment = AlignIO.read("sequences_aligned.fasta", "fasta")

# Calculate pairwise distances using the 'identity' model
calculator = DistanceCalculator("identity")
distance_matrix = calculator.get_distance(alignment)

# Build Neighbour-Joining tree
constructor = DistanceTreeConstructor()
nj_tree = constructor.nj(distance_matrix)  # Neighbour-Joining

# Draw ASCII tree in terminal
Phylo.draw_ascii(nj_tree)

# Or draw with matplotlib (shows in a window or saves to file)
# Phylo.draw(nj_tree)`,
  },
  {
    id: "bp-structure",
    heading: "8. Structural Bioinformatics — Parsing PDB Files with Bio.PDB",
    body: `Protein structures are stored in PDB (Protein Data Bank) files — a text format that encodes the 3D coordinates of every atom in the structure. These files can be enormous (the ribosome has ~100,000 atoms), and parsing them by hand is genuinely painful. Bio.PDB makes it remarkably elegant.

The data model in Bio.PDB mirrors the physical reality: a Structure contains Models (usually just one, unless it's an NMR structure with multiple conformers), each Model contains Chains (one per polypeptide chain), each Chain contains Residues (amino acids or nucleotides), and each Residue contains Atoms with their 3D coordinates. This hierarchy — Structure → Model → Chain → Residue → Atom — is called SMCRA, and once you internalise it, navigating any PDB file feels natural.

Here's the cool part: with atomic coordinates in hand, you can calculate distances between atoms, identify hydrogen bond donors and acceptors, find the active site residues, measure torsion angles (φ, ψ for Ramachandran analysis), and compute the solvent-accessible surface area. Structural analyses that once required expensive molecular graphics software can now be scripted in an afternoon with Biopython.`,
    code: `from Bio.PDB import PDBParser, MMCIFParser, PDBIO
from Bio.PDB.DSSP import DSSP
import numpy as np

# --- Parse a PDB file ---
parser = PDBParser(QUIET=True)  # QUIET suppresses warnings about non-standard residues
structure = parser.get_structure("1TUP", "1TUP.pdb")  # p53 tumour suppressor

# --- Navigate SMCRA hierarchy ---
for model in structure:
    print(f"Model: {model.id}")
    for chain in model:
        print(f"  Chain: {chain.id} — {len(list(chain.get_residues()))} residues")
        for residue in chain:
            if residue.id[0] == " ":  # skip HETATM records (ligands, water)
                resname = residue.resname
                resnum  = residue.id[1]
                # Access specific atoms
                if "CA" in residue:  # Cα (alpha carbon)
                    ca_coords = residue["CA"].get_vector()

# --- Calculate distance between two residues ---
res_A = structure[0]["A"][100]  # model 0, chain A, residue 100
res_B = structure[0]["A"][150]
ca_A = res_A["CA"].get_vector()
ca_B = res_B["CA"].get_vector()
distance = (ca_A - ca_B).norm()  # in Angstroms
print(f"Cα–Cα distance: {distance:.2f} Å")

# --- Download a structure directly from PDB ---
from Bio.PDB import PDBList
pdbl = PDBList()
pdbl.retrieve_pdb_file("4HHB", file_type="pdb")  # haemoglobin`,
  },
];

// ── Guided projects data ───────────────────────────────────────────────────────

interface GuidedStep {
  instruction: string;
  code?: string;
  why?: string;
  how?: string;
  codeExplanation?: string;
  codeBreakdown?: string;
}

interface GuidedProject {
  id: string;
  title: string;
  difficulty: "Beginner" | "Intermediate" | "Advanced";
  time: string;
  objectives: string[];
  steps: GuidedStep[];
  gain: string;
  fullCode?: string;
}

const GUIDED_PROJECTS: GuidedProject[] = [
  {
    id: "proj-dna-analysis",
    title: "Your First DNA Analysis",
    difficulty: "Beginner",
    time: "~1 hour",
    objectives: [
      "Read a FASTA file with Biopython's SeqIO",
      "Calculate GC content for each sequence",
      "Find open reading frames (ORFs) manually",
      "Write results to a summary text file",
    ],
    steps: [
      {
        instruction:
          "Install Biopython and set up your project folder. Create a file called `dna_analysis.py`.",
        why: "Before you can run any analysis, your Python environment needs to know Biopython exists. Think of it like installing a new app on your phone — the code is sitting somewhere on the internet and you need to download it first so your computer can use it. Creating a dedicated project folder keeps things organised: when you're working on real data, you'll have FASTA files, result files, and scripts all in one place.",
        how: "When you run `pip install biopython`, Python's package manager reaches out to the Python Package Index (PyPI), downloads the Biopython library files, and places them somewhere your Python interpreter can find them. From that point on, any Python script can say `from Bio import ...` and get access to all of Biopython's tools. The FASTA file we create here uses a standard format: a '>' header line followed by the raw sequence. This is the lingua franca of bioinformatics — virtually every tool reads it.",
        codeExplanation:
          "This block creates a mini FASTA file with two hypothetical DNA sequences and saves it to disk. This gives you real data to work with right away, without needing to download anything from the internet.",
        codeBreakdown:
          "The triple-quoted string (the content between the triple quotes) stores multi-line text. Each sequence starts with a `>` line — that's the FASTA header convention. The `with open(..., 'w') as f:` pattern opens a file for writing ('w' mode) and guarantees it gets properly closed even if something goes wrong. `f.write(test_fasta)` dumps the string into the file.",
        code: `# pip install biopython
# Create a test FASTA file to work with
test_fasta = """>seq_001 Hypothetical gene A
ATGCGATCGATCGATCGATCGATCGTAATGCGATCG
>seq_002 Hypothetical gene B
GCATCGATCGATCGATCGATCGATCGATCGATCGAT"""

with open("test_sequences.fasta", "w") as f:
    f.write(test_fasta)`,
      },
      {
        instruction:
          "Read the FASTA file and print basic information about each sequence.",
        why: "Here's the thing — before you do any computation, you should always sanity-check your data. Is the file being read correctly? Are the sequence IDs what you expect? How long are the sequences? Skipping this step is how subtle bugs sneak in. A sequence that's supposed to be 1,000 bp but reads as 10 bp is a problem you want to catch immediately, not after hours of analysis.",
        how: "Biopython's SeqIO.parse() opens the file and reads it one record at a time, yielding a SeqRecord object for each sequence it finds. Each SeqRecord is a container: it holds the actual sequence, the ID (the text immediately after the '>'), the name, and a description. The loop processes one sequence at a time, which is memory-efficient — even a file with millions of sequences won't crash your computer because you're never loading them all at once.",
        codeExplanation:
          "This code opens the FASTA file and loops through every sequence inside it, printing the ID and length for each one. It's your first check that the data loaded correctly.",
        codeBreakdown:
          "`from Bio import SeqIO` loads Biopython's sequence input/output module. `SeqIO.parse('test_sequences.fasta', 'fasta')` is a generator — it reads the file lazily, one sequence at a time. `record.id` is the identifier (e.g., 'seq_001'). `record.seq` is the actual sequence object. `len(record.seq)` counts how many bases are in it. The `f'...'` syntax is an f-string — a clean way to embed variables directly into text.",
        code: `from Bio import SeqIO

for record in SeqIO.parse("test_sequences.fasta", "fasta"):
    print(f"ID: {record.id}")
    print(f"Length: {len(record.seq)} bp")`,
      },
      {
        instruction:
          "Calculate GC content for each sequence using `gc_fraction`.",
        why: "GC content — the percentage of a DNA sequence that is Guanine or Cytosine — is one of the most biologically meaningful numbers you can compute. Why? Because G-C base pairs form three hydrogen bonds, while A-T pairs form only two. This means GC-rich DNA is more thermally stable (harder to 'melt' apart). Organisms living in high-temperature environments like hot springs tend to have higher GC content. In PCR primer design, you aim for 40–60% GC for optimal performance. And different regions of the human genome have dramatically different GC content — a phenomenon called GC bias.",
        how: "The gc_fraction function counts all the G and C bases in the sequence, divides by the total length, and returns a value between 0 and 1. Multiplying by 100 converts it to a percentage. Under the hood, it's just iterating over each character in the sequence string and counting the ones that match 'G', 'C', 'g', or 'c'. Simple maths, but biologically powerful.",
        codeExplanation:
          "This code loops through every sequence in the FASTA file and prints its GC percentage with one decimal place. We import gc_fraction from Bio.SeqUtils — a utility module that pre-packages common sequence calculations.",
        codeBreakdown:
          "`from Bio.SeqUtils import gc_fraction` loads just the function we need — no need to import the whole library. `gc_fraction(record.seq)` returns a decimal (e.g., 0.62 for 62%). Multiplying by 100 gives the familiar percentage. The `:.1f` inside the f-string formats the number to one decimal place — so 62.5% instead of 62.499999...",
        code: `from Bio.SeqUtils import gc_fraction

for record in SeqIO.parse("test_sequences.fasta", "fasta"):
    gc = gc_fraction(record.seq) * 100
    print(f"{record.id}: GC content = {gc:.1f}%")`,
      },
      {
        instruction:
          "Find simple ORFs — stretches starting with ATG and ending at a stop codon (TAA, TAG, TGA).",
        why: "An Open Reading Frame (ORF) is a continuous stretch of codons — three-base units — that starts with the ATG start codon (which codes for methionine) and ends at one of three stop codons (TAA, TAG, or TGA). ORFs are where proteins are encoded. If you have an uncharacterised DNA sequence and want to know where the genes are, finding ORFs is the first computational step. Real gene finders are more sophisticated (they account for introns, codon usage bias, and surrounding context), but this regex-based ORF finder captures the core idea and works well for simple bacterial or viral sequences.",
        how: "DNA can be read in six possible reading frames: three forward (starting at position 0, 1, or 2 of the sequence) and three reverse (on the complementary strand). Our function checks the three forward frames by shifting the starting position. For each frame, a regular expression pattern searches for the pattern 'ATG followed by any number of codons, ending in TAA, TAG, or TGA'. The `min_length` parameter filters out tiny ORFs that are likely random matches rather than real genes.",
        codeExplanation:
          "The `find_orfs` function uses a regular expression (a pattern-matching formula) to find every stretch of DNA that looks like it could encode a protein. The main loop then calls this function on each sequence in our FASTA file and reports how many ORFs were found.",
        codeBreakdown:
          "`import re` loads Python's regular expression module. The `for frame in range(3):` loop shifts through reading frames 0, 1, and 2. `seq_str[frame:]` slices the sequence to start at the right position. The regex `r'ATG(?:(?!TAA|TAG|TGA).{3})*(?:TAA|TAG|TGA)'` is the pattern: 'ATG' to start, then any number of 3-character groups that aren't stop codons, then a stop codon. `re.finditer` finds all non-overlapping matches. `match.group()` returns the matched string. `match.start()+frame` corrects the position back to the original sequence coordinates.",
        code: `import re

def find_orfs(seq_str, min_length=30):
    orfs = []
    # Search all three forward reading frames
    for frame in range(3):
        for match in re.finditer(r'ATG(?:(?!TAA|TAG|TGA).{3})*(?:TAA|TAG|TGA)', seq_str[frame:]):
            if len(match.group()) >= min_length:
                orfs.append((frame, match.start()+frame, match.group()))
    return orfs

for record in SeqIO.parse("test_sequences.fasta", "fasta"):
    orfs = find_orfs(str(record.seq))
    print(f"{record.id}: {len(orfs)} ORF(s) found")`,
      },
      {
        instruction: "Write a summary of your analysis to a file.",
        why: "Real bioinformatics analyses don't end with printing to the screen — the results need to be saved somewhere you can use them later, share with collaborators, or feed into the next step of a pipeline. A tab-separated values (TSV) file is the perfect format: it opens in Excel/Google Sheets, it's readable by any downstream Python or R script, and it's human-readable in a text editor. Getting into the habit of always saving results is one of the most important software practices you can develop.",
        how: "We re-read the FASTA file (SeqIO.parse is an iterator — it can only be looped once, so we call it again) and write one row per sequence into the output file. The `\\t` character is a tab — it separates columns in the file. This creates a clean, machine-readable table of your analysis results.",
        codeExplanation:
          "This block opens a new file called 'summary.txt' for writing, loops through every sequence, computes GC content, and writes a summary line for each one. After the loop, it prints a confirmation message so you know the script completed successfully.",
        codeBreakdown:
          "`with open('summary.txt', 'w') as out:` opens the output file. Inside the loop, `out.write(f'...')` writes one line per sequence. `\\t` inserts a tab character between columns (making it a proper TSV). `\\n` at the end writes a newline so each sequence gets its own line. The `print` outside the `with` block runs after the file is closed — confirming everything worked.",
        code: `with open("summary.txt", "w") as out:
    for record in SeqIO.parse("test_sequences.fasta", "fasta"):
        gc = gc_fraction(record.seq) * 100
        out.write(f"{record.id}\\t{len(record.seq)} bp\\t{gc:.1f}% GC\\n")
print("Analysis complete! Check summary.txt")`,
      },
    ],
    gain: "You'll have a reusable Python script that handles real FASTA files and computes biologically meaningful statistics — a foundation for every future analysis.",
    fullCode: `#!/usr/bin/env python3
"""
PROJECT 1 — Your First DNA Analysis
=====================================
Complete, runnable script. Copy this into a file called dna_analysis.py
and run it with:  python dna_analysis.py

Requirements:  pip install biopython
"""

# === Step 1: Check Biopython is installed and create a test FASTA file ===
try:
    import Bio
    print(f"Biopython version: {Bio.__version__}  ✓")
except ImportError:
    raise SystemExit(
        "Biopython not found. Install it with:  pip install biopython"
    )

import re
from Bio import SeqIO
from Bio.SeqUtils import gc_fraction

# Create a small FASTA file with two hypothetical DNA sequences.
# Each entry starts with a '>' header line followed by the raw sequence.
test_fasta = """>seq_001 Hypothetical gene A
ATGCGATCGATCGATCGATCGATCGTAATGCGATCG
>seq_002 Hypothetical gene B
GCATCGATCGATCGATCGATCGATCGATCGATCGAT"""

with open("test_sequences.fasta", "w") as f:
    f.write(test_fasta)

print("Created test_sequences.fasta  ✓")

# === Step 2: Read the FASTA file and print basic info ===
# SeqIO.parse() is a generator — it reads one record at a time,
# so even enormous files won't overwhelm your RAM.
print("\\n--- Sequence summary ---")
for record in SeqIO.parse("test_sequences.fasta", "fasta"):
    print(f"  ID: {record.id}  |  Length: {len(record.seq)} bp")

# === Step 3: Calculate GC content for each sequence ===
# GC-rich DNA has three H-bonds per base pair (vs. two for A-T),
# making it thermally more stable. Aim for 40–60% in PCR primers.
print("\\n--- GC content ---")
for record in SeqIO.parse("test_sequences.fasta", "fasta"):
    gc = gc_fraction(record.seq) * 100
    print(f"  {record.id}: GC = {gc:.1f}%")

# === Step 4: Find Open Reading Frames (ORFs) ===
# An ORF starts with the ATG codon (methionine) and ends at a stop
# codon (TAA, TAG, or TGA). Real genes are encoded as ORFs.
def find_orfs(seq_str: str, min_length: int = 30) -> list:
    """Return a list of (frame, start_pos, orf_sequence) tuples."""
    orfs = []
    # Check all three forward reading frames (starting at 0, 1, or 2)
    for frame in range(3):
        for match in re.finditer(
            r'ATG(?:(?!TAA|TAG|TGA).{3})*(?:TAA|TAG|TGA)',
            seq_str[frame:]
        ):
            if len(match.group()) >= min_length:
                orfs.append((frame, match.start() + frame, match.group()))
    return orfs

print("\\n--- ORF search ---")
for record in SeqIO.parse("test_sequences.fasta", "fasta"):
    orfs = find_orfs(str(record.seq))
    print(f"  {record.id}: {len(orfs)} ORF(s) found")
    for frame, start, seq in orfs:
        print(f"    Frame +{frame}  pos {start}  length {len(seq)} bp")

# === Step 5: Write a summary file ===
# Real pipelines always save results to disk for reproducibility
# and downstream use in other tools or spreadsheets.
with open("summary.txt", "w") as out:
    out.write("ID\\tLength\\tGC%\\n")   # TSV header
    for record in SeqIO.parse("test_sequences.fasta", "fasta"):
        gc = gc_fraction(record.seq) * 100
        out.write(f"{record.id}\\t{len(record.seq)} bp\\t{gc:.1f}%\\n")

print("\\nAnalysis complete!  Results saved to summary.txt  ✓")
`,
  },
  {
    id: "proj-blast",
    title: "BLAST It! — Programmatic Similarity Search",
    difficulty: "Beginner",
    time: "~1.5 hours",
    objectives: [
      "Run a BLAST search against NCBI databases from Python",
      "Parse BLAST XML output with NCBIXML",
      "Extract top hits, E-values, and percent identity",
      "Filter results by significance threshold",
    ],
    steps: [
      {
        instruction:
          "Choose a query sequence. We'll use a short human protein fragment as an example.",
        why: "BLAST works by taking a query sequence — something you're curious about — and searching it against millions of sequences in a database to find similar ones. The KRAS protein we're using is genuinely important: KRAS is a molecular switch that controls cell growth, and mutations in it are found in roughly 25% of all human cancers. By BLASTing it, we'll find its evolutionary cousins across all species in the database — revealing which organisms share this critical signalling protein.",
        how: "The sequence here is written as a one-letter amino acid code — the standard shorthand where 'M' is methionine, 'T' is threonine, and so on. This fragment covers the GTP-binding domain of KRAS — the region that binds guanosine triphosphate (GTP) to switch the protein on. When BLAST searches this sequence, it will find other RAS family members (HRAS, NRAS), related GTPases in other species, and distant homologs in organisms as far removed from humans as yeast.",
        codeExplanation:
          "This step simply defines the query sequence as a Python string and prints its length. It's preparation — making sure you know what you're about to search with before you send it to NCBI's servers.",
        codeBreakdown:
          "The `query` variable is just a string — Python doesn't know it's a protein sequence, it's just text to us at this point. `len(query)` counts the characters (amino acids). The comment about KRAS is not code — the `#` symbol makes Python ignore everything after it on that line. Comments are notes to yourself and future readers.",
        code: `# KRAS oncogene fragment — mutated in ~25% of all cancers
query = "MTEYKLVVVGAGGVGKSALTIQLIQNHFVDEYDPTIEDSY"
print(f"Query length: {len(query)} amino acids")`,
      },
      {
        instruction:
          "Submit the BLAST search. This will take 30–60 seconds — be patient!",
        why: "We're sending our query sequence to NCBI's servers and asking them to search it against their databases. This genuinely takes time — NCBI's servers are comparing our 40-amino-acid fragment against millions of sequences using a sophisticated algorithm. The wait is totally normal. For large-scale projects (BLASTing thousands of sequences), researchers often install BLAST locally on their computer to run it offline — but for a single query, the web service is perfect.",
        how: "NCBI's BLAST web API receives our protein sequence and runs it against the Swiss-Prot database — a curated, high-quality protein database that's smaller and faster than the full 'nr' (non-redundant) database. The algorithm finds seeds (short exact matches between the query and database sequences), extends them into high-scoring pairs (HSPs), then calculates E-values to assess significance. The results come back as XML — a structured format that Biopython can parse cleanly. We save the XML to a file immediately so we don't have to re-run the BLAST if we want to re-analyse the results.",
        codeExplanation:
          "This block imports Biopython's BLAST web interface, submits the query to NCBI, waits for results, and saves the XML response to a file. Think of it as filling out a form on the NCBI website — we're just doing it programmatically.",
        codeBreakdown:
          "`from Bio.Blast import NCBIWWW` imports the web BLAST interface. `NCBIWWW.qblast()` is the main function — 'q' for 'query', 'blast' for BLAST. The first argument is the program ('blastp' = protein vs protein), the second is the database ('swissprot' = Swiss-Prot, a curated protein database), and the third is our query sequence. This function sends the request and waits, returning a file-like handle when done. `result_handle.read()` reads the XML response as a string. We write it to a file so we can parse it later without re-running the search.",
        code: `from Bio.Blast import NCBIWWW
print("Submitting BLAST job to NCBI...")
result_handle = NCBIWWW.qblast(
    "blastp",    # protein vs protein
    "swissprot", # Swiss-Prot — curated, fast
    query
)
print("Done! Saving results...")
with open("blast_results.xml", "w") as f:
    f.write(result_handle.read())
result_handle.close()`,
      },
      {
        instruction: "Parse the saved XML results and print the top 5 hits.",
        why: "Raw BLAST XML output is messy — pages of tags and numbers that are hard to read. Biopython's NCBIXML parser turns that chaos into a clean Python object you can navigate logically. This step is where the real work happens: reading the results and pulling out the information you actually care about — what hit, how similar is it, and how confident are we?",
        how: "Think of it this way: the BLAST result is a hierarchical structure. At the top is the record (one per query sequence). Inside are alignments — one for each matching database sequence. Each alignment has one or more HSPs (High-Scoring Pairs) — the actual aligned segments. The first HSP (index 0) is always the best one for that match. The E-value tells you how likely this match is to be a false positive: smaller = more significant. Percent identity tells you what fraction of aligned positions are identical residues.",
        codeExplanation:
          "This code opens the saved XML file, parses it with NCBIXML, and then loops through the top 5 matching sequences, printing the name, E-value, and percent identity for each one.",
        codeBreakdown:
          "`from Bio.Blast import NCBIXML` imports the parser. `NCBIXML.read(f)` reads one BLAST record from the file (use `NCBIXML.parse()` if you BLASTed multiple queries). `record.alignments` is a list of matching database sequences. `aln.hsps[0]` gets the best High-Scoring Pair for that match. `hsp.identities` is the count of identical positions; dividing by `hsp.align_length` and multiplying by 100 gives percent identity. `aln.title[:60]` trims the often very long hit title to 60 characters. `hsp.expect` is the E-value — `:.1e` formats it in scientific notation.",
        code: `from Bio.Blast import NCBIXML

with open("blast_results.xml") as f:
    record = NCBIXML.read(f)

print(f"Top {min(5, len(record.alignments))} hits:\\n")
for aln in record.alignments[:5]:
    hsp = aln.hsps[0]  # best HSP for this hit
    identity = (hsp.identities / hsp.align_length) * 100
    print(f"  {aln.title[:60]}...")
    print(f"  E-value: {hsp.expect:.1e}  Identity: {identity:.0f}%")
    print()`,
      },
      {
        instruction:
          "Filter for high-confidence hits only (E-value < 1e-20) and count them.",
        why: "Not all BLAST hits are equally meaningful. An E-value of 0.1 means there's a 10% chance that hit appeared by random chance — that's not very convincing. An E-value of 1e-20 (0.000000000000000000001 — twenty zeros after the decimal point) means the chance of a false positive is astronomically small. Filtering to this threshold keeps only the hits that genuinely share evolutionary history with your query — the true homologs. In a KRAS search, you'd expect to see all the other RAS family members and similar GTPases from across the tree of life.",
        how: "We use a Python list comprehension — a compact way to build a filtered list. For each alignment, we check all its HSPs: if any of them has an E-value below 1e-20, the alignment passes the filter. This `any()` check is important because some hits have multiple HSPs with varying quality — we want to keep the hit if at least one HSP is highly significant.",
        codeExplanation:
          "This one-piece of code filters the full alignment list to keep only the high-confidence matches, then reports how many passed the cutoff. It's a powerful one-liner that demonstrates how readable Python can be.",
        codeBreakdown:
          "List comprehensions have the form `[item for item in list if condition]`. Here, `aln for aln in record.alignments` iterates over every alignment. The `if` clause filters: `any(hsp.expect < 1e-20 for hsp in aln.hsps)` returns True if *any* HSP in that alignment has an E-value below our threshold. `1e-20` is Python's scientific notation for 10⁻²⁰. `len(significant_hits)` counts how many survived the filter.",
        code: `significant_hits = [
    aln for aln in record.alignments
    if any(hsp.expect < 1e-20 for hsp in aln.hsps)
]
print(f"Hits with E-value < 1e-20: {len(significant_hits)}")`,
      },
    ],
    gain: "You'll be able to BLAST any sequence, extract the information you actually care about, and integrate search results into larger Python workflows — no more manual copying from web pages.",
    fullCode: `#!/usr/bin/env python3
"""
PROJECT 2 — BLAST It! Programmatic Similarity Search
======================================================
Complete, runnable script. Copy this into a file called blast_search.py
and run it with:  python blast_search.py

Requirements:  pip install biopython
Note: Step 2 sends a live request to NCBI — you need an internet connection.
The BLAST query takes 30–90 seconds. Be patient!
"""

try:
    import Bio
except ImportError:
    raise SystemExit("Install Biopython first:  pip install biopython")

from Bio.Blast import NCBIWWW, NCBIXML

# === Step 1: Define the query sequence ===
# We're using a fragment of human KRAS — a protein mutated in ~25% of cancers.
# This 40-amino-acid stretch covers the critical GTP-binding domain.
# One-letter amino acid code: M=Met, T=Thr, E=Glu, Y=Tyr, K=Lys, etc.
query = "MTEYKLVVVGAGGVGKSALTIQLIQNHFVDEYDPTIEDSY"
print(f"Query: KRAS oncogene fragment")
print(f"Length: {len(query)} amino acids")
print(f"Sequence: {query}")

# === Step 2: Submit the BLAST search to NCBI ===
# We use blastp (protein vs protein) against Swiss-Prot (a curated, high-quality
# protein database that's faster than the full 'nr' database).
# NCBI's servers compare our sequence against millions of proteins.
print("\\nSubmitting BLAST job to NCBI...  (this takes 30–90 seconds)")
try:
    result_handle = NCBIWWW.qblast(
        "blastp",     # program: protein vs protein
        "swissprot",  # database: curated Swiss-Prot
        query
    )
    print("BLAST search complete!  Saving XML results...")
    with open("blast_results.xml", "w") as f:
        f.write(result_handle.read())
    result_handle.close()
    print("Saved to blast_results.xml  ✓")
except Exception as e:
    raise SystemExit(f"BLAST request failed: {e}\\nCheck your internet connection.")

# === Step 3: Parse results and print the top 5 hits ===
# NCBIXML turns the raw XML into Python objects we can navigate.
# Structure: record → alignments → hsps (High-Scoring Pairs)
print("\\n--- Top 5 BLAST hits ---")
with open("blast_results.xml") as f:
    record = NCBIXML.read(f)

if not record.alignments:
    print("No alignments returned — check your query sequence.")
else:
    top_n = min(5, len(record.alignments))
    print(f"(Showing {top_n} of {len(record.alignments)} total hits)\\n")
    for i, aln in enumerate(record.alignments[:5], start=1):
        hsp = aln.hsps[0]   # best High-Scoring Pair for this hit
        identity = (hsp.identities / hsp.align_length) * 100
        print(f"  Hit {i}: {aln.title[:70]}...")
        print(f"         E-value:  {hsp.expect:.2e}")
        print(f"         Identity: {identity:.0f}%")
        print(f"         Score:    {hsp.score:.0f} bits")
        print()

# === Step 4: Filter for high-confidence hits (E-value < 1e-20) ===
# Lower E-value = less likely to be a random match.
# 1e-20 is an astronomically small false-positive probability.
significant_hits = [
    aln for aln in record.alignments
    if any(hsp.expect < 1e-20 for hsp in aln.hsps)
]
print(f"--- Significance filter (E-value < 1e-20) ---")
print(f"  Total hits:       {len(record.alignments)}")
print(f"  Significant hits: {len(significant_hits)}")
print("\\nDone!  ✓")
`,
  },
  {
    id: "proj-phylo-tree",
    title: "Build a Phylogenetic Tree",
    difficulty: "Intermediate",
    time: "~3 hours",
    objectives: [
      "Fetch cytochrome c sequences from NCBI Entrez",
      "Align sequences using ClustalW or MUSCLE",
      "Build a Neighbour-Joining tree with Bio.Phylo",
      "Visualise and interpret the resulting tree",
    ],
    steps: [
      {
        instruction:
          "Fetch cytochrome c protein sequences from five species using Entrez.",
        why: "Cytochrome c is one of the most elegant molecules in biology for studying evolution. It's a small electron transport protein found in virtually every eukaryotic organism — it's essential for cellular respiration, so it can't change too dramatically or the cell dies. But small changes do accumulate over millions of years, and the pattern of those changes perfectly reflects evolutionary history. Richard Lewontin and others used cytochrome c in the 1960s to provide some of the first molecular evidence for the tree of life. It's still a classroom favourite because the phylogenetic signal is strong and the data is clean.",
        how: "NCBI Entrez is the unified gateway to all NCBI databases. The efetch function is equivalent to going to the NCBI website, searching for a specific accession number, and clicking 'Download as FASTA' — except we do it in Python for all five species in a loop. Each accession number (like 'NP_061820' for human cytochrome c) is a unique identifier in NCBI's protein database. After fetching, we rename each record with the species name (more useful in a tree than a cryptic accession) and save all five sequences to a single FASTA file for alignment.",
        codeExplanation:
          "This block connects to NCBI, downloads the cytochrome c protein sequence for five species (human, mouse, chicken, yeast, and fly), renames each record for clarity, and saves them all to a FASTA file. This file is the input for the alignment step.",
        codeBreakdown:
          "`Entrez.email = 'you@example.com'` — always required; NCBI needs this to contact you if your scripts cause server issues. `accessions` is a Python dictionary mapping species names to their NCBI accession numbers. The `for species, acc in accessions.items():` loop unpacks each key-value pair. `Entrez.efetch(db='protein', ...)` downloads the sequence from NCBI's protein database in FASTA format. `SeqIO.read(handle, 'fasta')` parses the response. `record.id = species` renames the sequence using the species name. `record.description = ''` clears the verbose description to keep the tree labels clean. `SeqIO.write(sequences, ...)` writes all five sequences to a single file.",
        code: `from Bio import Entrez, SeqIO
Entrez.email = "you@example.com"  # required!

# Accession numbers for cytochrome c in 5 species
accessions = {
    "Human":  "NP_061820",
    "Mouse":  "NP_034089",
    "Chicken":"NP_990736",
    "Yeast":  "NP_009292",
    "Fly":    "NP_524729"
}

sequences = []
for species, acc in accessions.items():
    handle = Entrez.efetch(db="protein", id=acc, rettype="fasta")
    record = SeqIO.read(handle, "fasta")
    record.id = species      # rename for clarity in the tree
    record.description = ""
    sequences.append(record)
    print(f"Fetched {species}: {len(record.seq)} aa")

SeqIO.write(sequences, "cytochrome_c.fasta", "fasta")`,
      },
      {
        instruction:
          "Run ClustalW alignment (install separately: `conda install clustalw`).",
        why: "Before we can calculate evolutionary distances, we need to align the sequences — literally line them up so that equivalent positions across all species are in the same column. Without alignment, comparing position 50 of the human protein with position 50 of the yeast protein would be meaningless if those positions don't correspond to the same ancestral amino acid. Alignment inserts gaps where insertions or deletions happened during evolution, creating a matrix where each column represents a position that can be validly compared across species.",
        how: "ClustalW is a classic progressive alignment algorithm. It first computes rough pairwise distances between all sequences, builds a guide tree from those distances, then constructs the final alignment progressively — starting with the most similar sequences and adding more divergent ones step by step. Think of it like building a sentence from the middle outward: you start with the most similar sequences (where you're most confident about the alignment), then incorporate the more distantly related ones. The output is a .aln file with all sequences aligned, and a .dnd file (the guide tree in Newick format).",
        codeExplanation:
          "Biopython can call external command-line tools like ClustalW directly from Python. This block constructs the ClustalW command with the right arguments and executes it. The `()` at the end actually runs the command, just like typing it in a terminal.",
        codeBreakdown:
          "`from Bio.Align.Applications import ClustalwCommandline` loads Biopython's ClustalW wrapper. `ClustalwCommandline('clustalw2', infile='cytochrome_c.fasta')` builds the command object — 'clustalw2' is the executable name (may be 'clustalw' on some systems). The `infile=` argument specifies our input FASTA file. Calling `clustalw_cline()` with empty parentheses executes the command and returns stdout and stderr output. ClustalW writes its output files automatically — you don't need to capture the return value.",
        code: `from Bio.Align.Applications import ClustalwCommandline

clustalw_cline = ClustalwCommandline(
    "clustalw2",
    infile="cytochrome_c.fasta"
)
stdout, stderr = clustalw_cline()  # runs ClustalW
print("Alignment complete!")
# This creates cytochrome_c.aln (alignment) and cytochrome_c.dnd (guide tree)`,
      },
      {
        instruction: "Build a Neighbour-Joining tree from the alignment.",
        why: "Now for the satisfying part — turning our aligned sequences into a tree that shows evolutionary relationships. Neighbour-Joining (NJ) is a distance-based tree building method: it computes how different each pair of sequences is, then iteratively joins the two 'nearest neighbours' (the most similar pair) into a node, recalculates distances, and repeats until only one node remains — the root. It's computationally fast and works well for moderate amounts of sequence divergence. For publication-quality trees, you'd use Maximum Likelihood, but NJ is perfect for learning the process and gives interpretable results.",
        how: "The pipeline has two steps: first, compute a distance matrix from the alignment using BLOSUM62 (a protein-appropriate scoring matrix derived from observed amino acid substitution frequencies in conserved protein blocks). This tells us how different each pair of sequences is, quantified as a number between 0 (identical) and 1 (no similarity). Then, pass that matrix to the DistanceTreeConstructor, which applies the NJ algorithm to produce a tree. The tree is saved in Newick format — a compact text representation of branching relationships, like `((Human:0.02, Chimp:0.03):0.1, Mouse:0.2)`. Every phylogenetics tool understands Newick.",
        codeExplanation:
          "This code reads the ClustalW alignment, computes how different each pair of sequences is using the BLOSUM62 substitution matrix, builds a Neighbour-Joining tree from those distances, and saves it to a Newick file.",
        codeBreakdown:
          "`AlignIO.read('cytochrome_c.aln', 'clustal')` reads the ClustalW alignment file. `DistanceCalculator('blosum62')` creates a calculator that uses BLOSUM62 to score amino acid differences. `calculator.get_distance(alignment)` computes all pairwise distances — the output is a symmetric matrix. `DistanceTreeConstructor()` creates the tree builder object. `constructor.nj(dm)` runs Neighbour-Joining on the distance matrix, returning a tree. `Phylo.write(tree, 'my_tree.nwk', 'newick')` saves the tree in the standard Newick format.",
        code: `from Bio import AlignIO, Phylo
from Bio.Phylo.TreeConstruction import DistanceCalculator, DistanceTreeConstructor

# Read the alignment ClustalW produced
alignment = AlignIO.read("cytochrome_c.aln", "clustal")
print(f"Aligned {len(alignment)} sequences × {alignment.get_alignment_length()} columns")

# Calculate pairwise distances
calculator = DistanceCalculator("blosum62")  # protein-appropriate matrix
dm = calculator.get_distance(alignment)

# Build the tree
constructor = DistanceTreeConstructor()
tree = constructor.nj(dm)           # Neighbour-Joining
Phylo.write(tree, "my_tree.nwk", "newick")`,
      },
      {
        instruction: "Visualise and interpret the tree.",
        why: "A tree on disk is just text. To actually learn something from it, you need to see it. The ASCII tree in the terminal is humble but surprisingly useful — you can immediately see which species group together (the 'clade' structure), which branches are long (lots of evolutionary change) and which are short (high similarity). You should see human and mouse grouping together as mammals, with chicken slightly further away, and yeast and fly branching off much earlier — perfectly reflecting the known evolutionary history of these organisms.",
        how: "The `ladderize()` method sorts the tree so longer clades appear at the bottom — this is purely cosmetic, but it makes the tree much easier to read. `Phylo.draw_ascii()` renders the tree as a text diagram using `|`, `-`, and `,` characters to represent branches — no graphics needed. `get_terminals()` returns a list of all the tip nodes (the 'leaves' of the tree — the actual species). The order they appear and the depth of the branching pattern encodes the evolutionary relationships.",
        codeExplanation:
          "This block loads the tree we saved, cleans up its layout for readability, prints it as an ASCII diagram in the terminal, and lists all the species in the tree. It's where you see the final result of everything you've built in the previous steps.",
        codeBreakdown:
          "`Phylo.read('my_tree.nwk', 'newick')` loads the saved tree. `tree.ladderize()` sorts clades by size (biggest at the bottom) — purely visual. `Phylo.draw_ascii(tree)` prints the tree as text using box-drawing characters. `tree.count_terminals()` returns the number of leaf nodes. `tree.get_terminals()` returns a list of Clade objects representing the leaves. `tip.name` gets the species name we set earlier.",
        code: `from Bio import Phylo

tree = Phylo.read("my_tree.nwk", "newick")
tree.ladderize()  # sort clades for cleaner display

print("\\nPhylogenetic tree (ASCII):")
Phylo.draw_ascii(tree)

# Find which species are most closely related
print(f"\\nTotal tree terminals: {tree.count_terminals()}")
for tip in tree.get_terminals():
    print(f"  {tip.name}")`,
      },
      {
        instruction:
          "Challenge: bootstrap the tree to estimate confidence on each branch.",
        why: "A phylogenetic tree is a hypothesis about evolutionary history — and like any hypothesis, it has uncertainty. What if the data is a bit noisy? Would the same tree come out if you had slightly different data? Bootstrap analysis answers this by re-sampling: take the alignment, randomly shuffle the columns (with replacement), rebuild the tree 100 or 1,000 times, and see which branches appear consistently. A branch with >70% bootstrap support across 100 resampled trees is generally considered reliable. Below 50% and you should treat that branch with scepticism. This is the bioinformatics equivalent of error bars.",
        how: "Bootstrap resampling creates pseudo-datasets by randomly drawing columns from the alignment with replacement (so some columns are repeated, some are left out). A fresh tree is built from each pseudo-dataset. The bootstrap support value on each branch is the percentage of trees in which that branch appeared. The Bio.Phylo.Consensus module in Biopython provides this functionality — it's more involved to set up than what's shown here, but the conceptual principle is what matters at this stage.",
        codeExplanation:
          "This is an exploratory step — it points you toward the Bootstrap functionality in Biopython's Consensus module rather than implementing it in full, so you understand what the next level of analysis looks like and why it matters.",
        codeBreakdown:
          "The comment explains that bootstrapping means re-sampling alignment columns. `Bio.Phylo.Consensus` is the module to explore — it contains `BootstrapConsensus` and related functions. The print statements guide you: a bootstrap value above 70% on a branch means that branch appears in more than 70% of re-sampled trees, giving you confidence it's real and not an artifact of the particular data you started with.",
        code: `# Bootstrap resampling — re-sample alignment columns 100x
# and rebuild the tree each time
from Bio.Phylo.TreeConstruction import BootstrapConsensus
# (Requires the full scoring setup — explore Bio.Phylo.Consensus)
print("Explore Bio.Phylo.Consensus for bootstrap support values!")
print("High bootstrap (>70%) = reliable branch")`,
      },
    ],
    gain: "You'll understand the full phylogenetics pipeline end-to-end — from raw sequences to an interpretable tree — and be equipped to analyse any set of homologous sequences.",
    fullCode: `#!/usr/bin/env python3
"""
PROJECT 3 — Build a Phylogenetic Tree
=======================================
Complete, runnable script. Copy this into a file called phylo_tree.py
and run it with:  python phylo_tree.py

Requirements:
  pip install biopython
  conda install -c bioconda clustalw   (or: apt-get install clustalw)

Note: Steps 1–2 need an internet connection to fetch sequences from NCBI.
If ClustalW is not installed, the script uses a built-in fallback approach.
"""

try:
    import Bio
except ImportError:
    raise SystemExit("Install Biopython first:  pip install biopython")

import sys
from Bio import Entrez, SeqIO, AlignIO, Phylo
from Bio.Phylo.TreeConstruction import DistanceCalculator, DistanceTreeConstructor

# === Step 1: Fetch cytochrome c sequences from NCBI Entrez ===
# Cytochrome c is a small electron transport protein found in all eukaryotes.
# It evolves slowly (can't change too much or the cell dies), making it ideal
# for studying evolutionary relationships across very distant species.
Entrez.email = "student@example.com"  # Always required — NCBI policy

# NCBI accession numbers for cytochrome c in 5 species
accessions = {
    "Human":   "NP_061820",
    "Mouse":   "NP_034089",
    "Chicken": "NP_990736",
    "Yeast":   "NP_009292",
    "Fly":     "NP_524729",
}

print("Fetching cytochrome c sequences from NCBI...")
sequences = []
for species, acc in accessions.items():
    try:
        handle = Entrez.efetch(db="protein", id=acc, rettype="fasta")
        record = SeqIO.read(handle, "fasta")
        record.id = species        # rename with species name for cleaner tree labels
        record.description = ""   # clear verbose NCBI description
        sequences.append(record)
        print(f"  Fetched {species}: {len(record.seq)} aa  ✓")
    except Exception as e:
        print(f"  WARNING: Could not fetch {species} ({e}). Skipping.", file=sys.stderr)

if len(sequences) < 3:
    raise SystemExit("Need at least 3 sequences to build a tree. Check your internet connection.")

SeqIO.write(sequences, "cytochrome_c.fasta", "fasta")
print(f"Saved {len(sequences)} sequences to cytochrome_c.fasta  ✓")

# === Step 2: Align sequences with ClustalW (or fallback) ===
# Before computing evolutionary distances, sequences must be aligned —
# lined up so equivalent positions across species are in the same column.
# Gaps (–) are inserted where insertions/deletions happened during evolution.
alignment = None
try:
    from Bio.Align.Applications import ClustalwCommandline
    clustalw_cline = ClustalwCommandline("clustalw2", infile="cytochrome_c.fasta")
    stdout, stderr = clustalw_cline()
    alignment = AlignIO.read("cytochrome_c.aln", "clustal")
    print(f"ClustalW alignment done: {len(alignment)} seqs × {alignment.get_alignment_length()} cols  ✓")
except Exception:
    # Fallback: use Biopython's built-in PairwiseAligner to create a simple alignment
    print("ClustalW not found — using Biopython's built-in aligner as fallback...")
    from Bio.Align import MultipleSeqAlignment
    from Bio import pairwise2
    # Pad all sequences to the same length using global alignment against the first
    ref = sequences[0]
    aligned_records = [ref]
    for seq_rec in sequences[1:]:
        alignments = pairwise2.align.globalms(
            str(ref.seq), str(seq_rec.seq), 2, -1, -5, -0.5
        )
        if alignments:
            from Bio.SeqRecord import SeqRecord
            from Bio.Seq import Seq
            aligned_seq = SeqRecord(Seq(alignments[0].seqB), id=seq_rec.id, description="")
            aligned_records.append(aligned_seq)
        else:
            aligned_records.append(seq_rec)
    alignment = MultipleSeqAlignment(aligned_records)
    print(f"Fallback alignment done: {len(alignment)} seqs × {alignment.get_alignment_length()} cols  ✓")

# === Step 3: Build a Neighbour-Joining tree from the alignment ===
# Neighbour-Joining (NJ) builds the tree by iteratively joining the two most
# similar sequences, recalculating distances, and repeating until one root remains.
# BLOSUM62 is the standard amino acid substitution scoring matrix.
print("\\nCalculating pairwise distances...")
calculator = DistanceCalculator("blosum62")   # protein-appropriate scoring matrix
dm = calculator.get_distance(alignment)

print("Building Neighbour-Joining tree...")
constructor = DistanceTreeConstructor()
tree = constructor.nj(dm)                     # NJ algorithm
Phylo.write(tree, "my_tree.nwk", "newick")
print("Tree saved to my_tree.nwk  ✓")

# === Step 4: Visualise and interpret the tree ===
# ladderize() sorts clades so longer ones appear at the bottom — purely cosmetic,
# but makes the ASCII output much easier to read.
tree = Phylo.read("my_tree.nwk", "newick")
tree.ladderize()

print("\\n--- Phylogenetic Tree (ASCII) ---")
Phylo.draw_ascii(tree)

print(f"\\nTotal leaf nodes (species): {tree.count_terminals()}")
for tip in tree.get_terminals():
    print(f"  {tip.name}")

print("\\nInterpretation: species that branch closer together are more closely related.")
print("You should see Human & Mouse together as mammals, Yeast & Fly more distant.  ✓")

# === Step 5: Bootstrap hint ===
# Bootstrap resampling (re-sampling alignment columns 100x and rebuilding the tree)
# gives confidence values for each branch. Values >70% are considered reliable.
print("\\n--- Next step: Bootstrap support ---")
print("Explore Bio.Phylo.Consensus.BootstrapConsensus for branch support values.")
print("High bootstrap (>70%) = reliable branch; <50% = treat with scepticism.")
print("\\nProject complete!  ✓")
`,
  },
  {
    id: "proj-pdb-explorer",
    title: "Protein Structure Explorer",
    difficulty: "Intermediate",
    time: "~2 hours",
    objectives: [
      "Download and parse a PDB file using Bio.PDB",
      "Extract chain information and residue counts",
      "Identify active site residues by proximity",
      "Calculate Cα–Cα distances between key residues",
    ],
    steps: [
      {
        instruction:
          "Download a PDB file. We'll use haemoglobin (4HHB) — a classic.",
        why: "Haemoglobin (PDB ID: 4HHB) is one of the most studied proteins in history. It's the oxygen-carrying protein in red blood cells, and its three-dimensional structure — solved by Max Perutz in 1960, earning him the Nobel Prize — explains everything about how it works. It has four subunits (two alpha and two beta chains), each carrying a haem group with an iron atom at its centre that binds oxygen. The cooperative nature of oxygen binding (each subunit's state influences the others) is one of the most elegant mechanisms in biochemistry, and you can explore it computationally right here.",
        how: "The Protein Data Bank (PDB) at RCSB stores over 230,000 experimentally determined protein structures. Each structure has a four-character accession code — '4HHB' for our haemoglobin. The PDB file format stores the 3D coordinates of every atom in the structure, along with connectivity, B-factors (how much each atom is vibrating), and metadata. Biopython's PDBList class handles the download automatically, and PDBParser reads the file into Python's memory as a structured object you can navigate.",
        codeExplanation:
          "This code downloads the haemoglobin crystal structure from the RCSB PDB website and loads it into Python as a structured object. From this point forward, you have the 3D coordinates of every atom in haemoglobin available as a Python data structure.",
        codeBreakdown:
          "`from Bio.PDB import PDBList, PDBParser` imports the downloader and parser. `PDBList()` creates the downloader object. `pdbl.retrieve_pdb_file('4HHB', file_type='pdb', pdir='.')` downloads the file to the current directory (`.`). `PDBParser(QUIET=True)` creates the parser — `QUIET=True` suppresses warnings about non-standard residues (haemoglobin has ligands that aren't standard amino acids). `parser.get_structure('haemoglobin', pdb_file)` reads the file and returns a Structure object. The name 'haemoglobin' is just a label for the object.",
        code: `from Bio.PDB import PDBList, PDBParser

# Download from RCSB PDB
pdbl = PDBList()
pdb_file = pdbl.retrieve_pdb_file("4HHB", file_type="pdb", pdir=".")
print(f"Downloaded to: {pdb_file}")

# Parse the structure
parser = PDBParser(QUIET=True)
structure = parser.get_structure("haemoglobin", pdb_file)
print(f"Structure loaded: {structure.header.get('name', '4HHB')}")`,
      },
      {
        instruction:
          "Explore the structure — models, chains, and residue counts.",
        why: "Before doing any calculation, you should understand what you're working with. PDB files can contain multiple 'models' — this happens with NMR structures, where each model is one conformer from the ensemble of possible structures. Haemoglobin was solved by X-ray crystallography, so it has just one model. The chains correspond to individual protein subunits: haemoglobin has four (labeled A, B, C, D). Knowing the chain structure helps you navigate to specific parts of the protein for your analysis.",
        how: "The SMCRA hierarchy (Structure → Model → Chain → Residue → Atom) is the central data model in Bio.PDB. You navigate it exactly like nested folders: open the Structure, find the Model inside, find the Chain inside the Model, then count the Residues inside the Chain. The filter `r.id[0] == ' '` (a space character) selects only standard amino acid residues — the `id[0]` field is a space for normal residues but a letter for heteroatoms (ligands, water, etc.) and modified residues.",
        codeExplanation:
          "This code loops through the entire structure hierarchy, printing each model and chain with the number of amino acid residues it contains. Running this gives you a clear map of what's in the structure before you start analysing it.",
        codeBreakdown:
          "`for model in structure:` loops over models (usually just one for X-ray structures). `for chain in model:` loops over polypeptide chains. `[r for r in chain if r.id[0] == ' ']` is a list comprehension that filters to only standard amino acid residues — the space in `r.id[0]` is how Biopython marks standard residues. `len(residues)` counts them. The comment reminds you what to expect: chains A, B, C, D corresponding to the two alpha and two beta haemoglobin subunits.",
        code: `for model in structure:
    print(f"Model {model.id}:")
    for chain in model:
        residues = [r for r in chain if r.id[0] == " "]  # protein residues only
        print(f"  Chain {chain.id}: {len(residues)} residues")

# Haemoglobin should show 4 chains: A, B, C, D (α and β subunits × 2)`,
      },
      {
        instruction: "Find the haem iron atoms — the ligand-binding sites.",
        why: "The haem group — a porphyrin ring with an iron atom at its centre — is where oxygen actually binds. The iron (Fe) can be in two oxidation states: Fe²⁺ (ferrous, in functional deoxyhaemoglobin) and Fe³⁺ (ferric, in methaemoglobin, which cannot carry oxygen). Each of haemoglobin's four subunits has one haem group, and their positions and the amino acids surrounding them explain how oxygen binding in one subunit allosterically affects the others. Finding the iron atoms computationally is the first step toward analysing the active site.",
        how: "In PDB files, non-amino-acid molecules are marked as HETATM records (vs. ATOM records for standard residues). Biopython identifies these using the residue ID — ligands have a non-space character in `residue.id[0]`. The haem group has the PDB residue name 'HEM', and the iron atom within it is named 'FE'. We get the iron's 3D position using `get_vector()`, which returns a Vector object containing the x, y, z coordinates in Ångströms (1 Å = 0.1 nanometres — the scale of atoms and chemical bonds).",
        codeExplanation:
          "This code searches through every residue in the structure, finds the ones named 'HEM' (the haem groups), extracts the iron atom from each one, and prints its 3D coordinates. You should see four iron atoms — one per chain.",
        codeBreakdown:
          "`if residue.resname == 'HEM':` checks whether the residue is a haem group. `if 'FE' in residue:` checks whether the iron atom is present in this residue (it always should be, but defensive coding is good practice). `residue['FE']` accesses the atom by name — like looking up a value in a dictionary. `fe.get_vector()` returns the 3D coordinates as a Bio.PDB.Vector object. `coords[0]`, `coords[1]`, `coords[2]` are the x, y, z values respectively, in Ångströms.",
        code: `# HETATM records include ligands (HEM = haem group)
for model in structure:
    for chain in model:
        for residue in chain:
            if residue.resname == "HEM":  # haem group
                if "FE" in residue:
                    fe = residue["FE"]
                    coords = fe.get_vector()
                    print(f"Haem iron in chain {chain.id}: "
                          f"({coords[0]:.1f}, {coords[1]:.1f}, {coords[2]:.1f}) Å")`,
      },
      {
        instruction:
          "Calculate the distance between haem irons in the α and β subunits.",
        why: "The distance between haem groups is not just a structural curiosity — it's directly relevant to haemoglobin's cooperative oxygen binding. When one subunit binds oxygen, it shifts conformation slightly, and this shift is transmitted mechanically through the protein to the other subunits, making them more likely to bind oxygen too (the T-state to R-state transition). The ~25 Å iron-to-iron distance between subunits is large enough that the irons can't interact directly — the communication happens through the protein backbone. Understanding this distance computationally is a taste of structural biology research.",
        how: "We define a helper function `get_haem_fe` that takes a chain ID and navigates to the HEM residue's iron atom, returning its position as a Vector. Then we call it for chains A and B, and use the Vector subtraction operation (which computes the difference vector between two points in 3D space) followed by `.norm()` (which computes the length of that difference vector) to get the straight-line distance in Ångströms. This is the Euclidean distance formula: √((x₂-x₁)² + (y₂-y₁)² + (z₂-z₁)²), but handled elegantly by Biopython's Vector class.",
        codeExplanation:
          "This code defines a function that retrieves the haem iron position from any chain, then uses it to calculate the straight-line distance between the iron atoms in the alpha (A) and beta (B) subunits of haemoglobin.",
        codeBreakdown:
          "`def get_haem_fe(structure, chain_id):` defines a reusable function. `structure[0][chain_id]` navigates directly to chain A (or B) in model 0. The `for residue in ...` loop finds the HEM residue and returns its iron vector immediately. `return None` is a safety return if no HEM is found. After getting `fe_A` and `fe_B`, `(fe_A - fe_B)` uses Vector subtraction to get a vector pointing from one iron to the other. `.norm()` computes its length — the actual distance in Ångströms.",
        code: `from Bio.PDB.vectors import Vector
import numpy as np

# Get Fe coordinates from chains A and B
def get_haem_fe(structure, chain_id):
    for residue in structure[0][chain_id]:
        if residue.resname == "HEM" and "FE" in residue:
            return residue["FE"].get_vector()
    return None

fe_A = get_haem_fe(structure, "A")
fe_B = get_haem_fe(structure, "B")

if fe_A and fe_B:
    distance = (fe_A - fe_B).norm()
    print(f"Fe(A)–Fe(B) distance: {distance:.2f} Å")
    print("(~25 Å typical — important for cooperative oxygen binding)")`,
      },
      {
        instruction:
          "Identify residues within 5 Å of the haem iron — these are the active site residues.",
        why: "The residues immediately surrounding the haem iron are the active site — they hold the haem in place, tune the iron's chemistry, and interact with the oxygen molecule as it binds. The most important one is the 'proximal histidine' (His93 in the alpha chain), which forms a direct bond with the iron from below. Another histidine on the other side — the 'distal histidine' — helps stabilise the bound oxygen and prevents the iron from oxidising. By finding all residues within 5 Ångströms of the iron, you're essentially mapping the active site computationally — the same analysis done in published papers.",
        how: "NeighborSearch is a spatial indexing data structure that makes proximity searches fast. Rather than computing the distance from the iron to every single atom in the structure (which would work but be slow for large proteins), NeighborSearch builds a spatial hash that can answer 'what's within radius R of point P?' in near-constant time. We search at the residue level ('R') so we get whole amino acids, not individual atoms. The 5 Å radius is conventional for active site analysis — it captures residues that can directly interact with the ligand.",
        codeExplanation:
          "This code builds a spatial index of all atoms in the structure, then uses it to find every residue within 5 Ångströms of the haem iron in chain A. These are the active site residues — the amino acids that directly interact with the haem group.",
        codeBreakdown:
          "`from Bio.PDB import NeighborSearch` imports the spatial search class. `list(structure.get_atoms())` collects all atoms across the entire structure into a list. `NeighborSearch(atoms)` builds the spatial index from those atoms. `ns.search(fe_A.get_array(), 5.0, 'R')` searches for residues ('R') within 5.0 Ångströms of the iron coordinates. `fe_A.get_array()` converts the Vector to a numpy array that NeighborSearch expects. `if res.resname != 'HEM':` filters out the haem group itself from the results.",
        code: `from Bio.PDB import NeighborSearch

# Collect all protein atoms
atoms = list(structure.get_atoms())
ns = NeighborSearch(atoms)

# Find protein residues near haem iron in chain A
fe_A = get_haem_fe(structure, "A")
nearby = ns.search(fe_A.get_array(), 5.0, "R")  # 5 Å radius, residue level

print("Residues within 5 Å of haem Fe in chain A:")
for res in nearby:
    if res.resname != "HEM":  # exclude the haem itself
        print(f"  {res.resname} {res.id[1]}")`,
      },
    ],
    gain: "You'll have real experience navigating protein structure data — a skill that's directly applicable to structural biology research, drug discovery, and protein engineering projects.",
    fullCode: `#!/usr/bin/env python3
"""
PROJECT 4 — Protein Structure Explorer (Haemoglobin 4HHB)
===========================================================
Complete, runnable script. Copy this into a file called pdb_explorer.py
and run it with:  python pdb_explorer.py

Requirements:
  pip install biopython numpy

Note: Step 1 downloads ~200 KB from the RCSB PDB website (needs internet).
The file is cached locally so subsequent runs are instant.
"""

try:
    import Bio
    import numpy as np
except ImportError:
    raise SystemExit("Install dependencies first:  pip install biopython numpy")

from Bio.PDB import PDBList, PDBParser, NeighborSearch

# === Step 1: Download and parse the haemoglobin PDB file ===
# Haemoglobin (4HHB) is one of the most-studied proteins in history.
# Solved by Max Perutz in 1960 (Nobel Prize 1962), it carries oxygen in red
# blood cells via four subunits, each with one iron-containing haem group.
# PDB IDs are always 4 characters: letters and/or digits.
print("Downloading haemoglobin structure from RCSB PDB (4HHB)...")
pdbl = PDBList()
pdb_file = pdbl.retrieve_pdb_file("4HHB", file_type="pdb", pdir=".")
print(f"Downloaded: {pdb_file}  ✓")

# PDBParser reads the coordinate file into a hierarchical Python object.
# QUIET=True suppresses warnings about non-standard residues (e.g. haem, water).
parser = PDBParser(QUIET=True)
structure = parser.get_structure("haemoglobin", pdb_file)
print(f"Structure loaded: {structure.header.get('name', '4HHB')}  ✓")

# === Step 2: Explore the SMCRA hierarchy ===
# Bio.PDB organises structures as: Structure → Model → Chain → Residue → Atom
# X-ray structures have one Model. Each chain is a separate polypeptide.
# r.id[0] == ' '  selects standard amino acids (non-space = ligand/water).
print("\\n--- Structure overview ---")
for model in structure:
    print(f"Model {model.id}:")
    for chain in model:
        aa_residues = [r for r in chain if r.id[0] == " "]
        print(f"  Chain {chain.id}: {len(aa_residues)} amino acid residues")
# You should see 4 chains (A, B, C, D) — two alpha and two beta subunits.

# === Step 3: Find the haem iron atoms (active sites) ===
# The haem group (residue name 'HEM') is where oxygen actually binds.
# The iron atom at its centre (atom name 'FE') switches between
# Fe2+ (functional, binds O2) and Fe3+ (metHb, cannot carry O2).
print("\\n--- Haem iron positions ---")
iron_positions = {}   # {chain_id: Vector}
for model in structure:
    for chain in model:
        for residue in chain:
            if residue.resname == "HEM" and "FE" in residue:
                fe = residue["FE"]
                coords = fe.get_vector()
                iron_positions[chain.id] = coords
                print(f"  Chain {chain.id} haem Fe: "
                      f"({coords[0]:.1f}, {coords[1]:.1f}, {coords[2]:.1f}) Å")

# === Step 4: Calculate inter-subunit haem iron distances ===
# The ~25 Å Fe-to-Fe distance between subunits is key to cooperative
# oxygen binding (the T→R state transition) — subunits "communicate"
# through the protein backbone, not through direct iron contact.

def get_haem_fe(structure, chain_id):
    """Return the Vector of the haem iron in the specified chain, or None."""
    for residue in structure[0][chain_id]:
        if residue.resname == "HEM" and "FE" in residue:
            return residue["FE"].get_vector()
    return None

print("\\n--- Fe–Fe distances between subunits ---")
chain_pairs = [("A", "B"), ("A", "C"), ("A", "D"), ("B", "C")]
for ca, cb in chain_pairs:
    fe_a = get_haem_fe(structure, ca)
    fe_b = get_haem_fe(structure, cb)
    if fe_a and fe_b:
        dist = (fe_a - fe_b).norm()
        print(f"  Fe({ca}) – Fe({cb}): {dist:.2f} Å")
    else:
        print(f"  Fe({ca}) – Fe({cb}): not found")

# === Step 5: Identify active site residues (within 5 Å of haem Fe in chain A) ===
# NeighborSearch builds a spatial index so proximity queries are fast.
# 5 Å is the standard radius for 'direct interaction' with a ligand.
# The most critical residue you'll find: His93 (the proximal histidine —
# it forms a direct bond with the iron from below the haem ring).
fe_A = get_haem_fe(structure, "A")
if fe_A:
    atoms = list(structure.get_atoms())
    ns = NeighborSearch(atoms)
    nearby_residues = ns.search(fe_A.get_array(), 5.0, "R")  # 'R' = residue level
    print("\\n--- Active site: residues within 5 Å of haem Fe in chain A ---")
    for res in nearby_residues:
        if res.resname != "HEM":   # exclude the haem group itself
            print(f"  {res.resname} {res.id[1]} (chain {res.get_parent().id})")
else:
    print("Chain A haem iron not found — check the PDB file downloaded.")

# Summary statistics
print("\\n--- Summary ---")
all_residues = [r for r in structure[0].get_residues() if r.id[0] == " "]
all_atoms    = list(structure[0].get_atoms())
print(f"  Total amino acid residues: {len(all_residues)}")
print(f"  Total atoms:               {len(all_atoms)}")
print(f"  Haem groups found:         {len(iron_positions)}")
print("\\nProject complete!  ✓")
`,
  },
  {
    id: "proj-microbiome",
    title: "Microbiome Diversity Analysis",
    difficulty: "Advanced",
    time: "~4 hours",
    objectives: [
      "Simulate or parse 16S rRNA OTU table data",
      "Calculate alpha diversity metrics (Shannon index, species richness)",
      "Compute beta diversity using Bray-Curtis dissimilarity",
      "Visualise community composition with stacked bar charts",
    ],
    steps: [
      {
        instruction:
          "Create a simulated OTU (Operational Taxonomic Unit) table. In real projects, this comes from QIIME2.",
        why: "Real microbiome data starts with 16S rRNA amplicon sequencing or shotgun metagenomics. QIIME2 processes the raw reads into an OTU (Operational Taxonomic Unit) table — a matrix where rows are microbial species (or OTUs) and columns are samples (patients, time points, environments). We're simulating this table because it lets us control the data and understand the analysis without needing gigabytes of sequencing reads. Crucially, we're simulating a biologically realistic scenario: IBD (inflammatory bowel disease) samples have lower microbial diversity (a phenomenon called dysbiosis that's well-documented in the literature).",
        how: "We use the negative binomial distribution to simulate count data — the same statistical model used by DESeq2 and edgeR for RNA-seq, and appropriate for microbial count data because it handles overdispersion (the variance being much higher than the mean, which is typical of biological count data). The healthy samples use parameters that generate higher, more varied counts across many OTUs. The IBD samples use parameters that generate sparser, more uneven counts — reflecting the reduced diversity seen in IBD patients. This is the same pattern you'd see in published IBD microbiome datasets.",
        codeExplanation:
          "This code creates a simulated OTU table using realistic statistical properties. The table has 20 OTUs (microbial species) as rows and 6 samples as columns — 3 healthy and 3 IBD. The IBD samples are simulated with lower diversity to mirror what's known about gut microbiome dysbiosis.",
        codeBreakdown:
          "`np.random.seed(42)` sets a random seed — this ensures everyone gets the same 'random' numbers, making the analysis reproducible. `n_otus, n_samples = 20, 6` sets the dimensions. `sample_names` and `otu_names` label rows and columns. `np.random.negative_binomial(5, 0.3, (n_otus, 3))` generates count data from a negative binomial distribution — the parameters 5 and 0.3 produce relatively high, diverse counts (healthy). The IBD parameters (2, 0.6) produce lower, sparser counts. `np.hstack(...)` stacks the two matrices horizontally. `pd.DataFrame(...)` wraps the data with row (OTU) and column (sample) labels.",
        code: `import numpy as np
import pandas as pd

# OTU table: rows = OTUs (microbial species), columns = samples
np.random.seed(42)
n_otus, n_samples = 20, 6
sample_names = ["Healthy_1","Healthy_2","Healthy_3","IBD_1","IBD_2","IBD_3"]
otu_names = [f"OTU_{i:03d}" for i in range(1, n_otus+1)]

# Simulate dysbiosis: IBD samples have lower diversity
healthy_counts = np.random.negative_binomial(5, 0.3, (n_otus, 3))
ibd_counts = np.random.negative_binomial(2, 0.6, (n_otus, 3))
otu_table = pd.DataFrame(
    np.hstack([healthy_counts, ibd_counts]),
    index=otu_names, columns=sample_names
)
print(otu_table.head())`,
      },
      {
        instruction:
          "Calculate Shannon diversity index for each sample — higher = more diverse.",
        why: "Alpha diversity measures the diversity within a single sample. The Shannon index (H) is the gold standard — it accounts for both species richness (how many different species are present) and evenness (are they present in similar amounts, or does one species dominate?). A healthy gut microbiome typically has a Shannon index of 3–4 bits. IBD patients often show values closer to 2 or below. This is one of the most clinically relevant numbers in microbiome research: reduced alpha diversity is associated not just with IBD but with obesity, C. difficile infection, antibiotic disruption, and various other conditions. Think of it as a health score for the microbial community.",
        how: "The Shannon index formula is H = -Σ(pᵢ × log₂(pᵢ)) where pᵢ is the relative abundance of species i. You sum this for every species in the sample. Intuitively: if all species are equally abundant, every term contributes equally and H is maximised. If one species completely dominates, the other terms are near zero and H is low. The `scipy.stats.entropy` function computes this exactly — it's called 'entropy' because the Shannon index is mathematically identical to information entropy from information theory (Shannon diversity was actually named after Claude Shannon, the father of information theory).",
        codeExplanation:
          "This code defines a function that computes the Shannon diversity index for any array of count data, then applies it to every sample in our OTU table. It also reports species richness (the simpler count of how many OTUs are present at all).",
        codeBreakdown:
          "`def shannon_index(counts):` defines the function. `counts = counts[counts > 0]` removes zero entries — species that aren't in this sample. Zeros would make the logarithm undefined. `proportions = counts / counts.sum()` converts raw counts to relative abundances (fractions that add to 1). `entropy(proportions, base=2)` computes Shannon entropy in bits (base-2 logarithm). For the main loop, `otu_table[sample]` selects one column (one sample). `(otu_table[sample] > 0).sum()` counts how many OTUs have at least one count — this is species richness.",
        code: `from scipy.stats import entropy

def shannon_index(counts):
    # Remove zeros, calculate proportions, compute entropy
    counts = counts[counts > 0]
    proportions = counts / counts.sum()
    return entropy(proportions, base=2)  # bits

for sample in sample_names:
    H = shannon_index(otu_table[sample])
    richness = (otu_table[sample] > 0).sum()  # species richness
    print(f"{sample}: Shannon H = {H:.2f}, Richness = {richness} OTUs")`,
      },
      {
        instruction:
          "Compute Bray-Curtis dissimilarity matrix (beta diversity) between all sample pairs.",
        why: "Beta diversity measures how different microbial communities are from each other — across samples. While alpha diversity tells you about diversity within one sample, beta diversity tells you how much communities vary between samples. Bray-Curtis dissimilarity is the standard metric: 0 means two communities are identical, 1 means they share no species at all. In a dysbiosis study, you'd expect healthy vs. IBD comparisons to have high Bray-Curtis (very different), while healthy vs. healthy comparisons would be low (similar). This is how researchers demonstrate that disease state is associated with a distinct microbial profile.",
        how: "Bray-Curtis dissimilarity between two samples A and B is calculated as: BC = 1 - (2 × sum of shared counts) / (total counts in A + total counts in B). It's an ecological distance metric that weights differences by abundance — a species present in very high abundance in one sample but absent in another contributes more to dissimilarity than a rare species. The result is a symmetric matrix (dissimilarity from A to B equals B to A), which is perfect input for ordination methods like PCoA in the next step.",
        codeExplanation:
          "This code computes the Bray-Curtis dissimilarity between every pair of samples and prints the result as a formatted matrix. It's a concise way to see at a glance how similar or different all the communities are relative to each other.",
        codeBreakdown:
          "`from scipy.spatial.distance import braycurtis` imports the Bray-Curtis function. The outer loops iterate over all sample pairs. `braycurtis(otu_table[s1], otu_table[s2])` computes the dissimilarity between the count vectors for samples s1 and s2. The f-string formatting (`{s[:9]:>10}`) right-aligns text in 10-character fields to create a clean table. The nested loops print the full symmetric matrix.",
        code: `from scipy.spatial.distance import braycurtis
import itertools

samples = otu_table.columns.tolist()
print("Bray-Curtis dissimilarity matrix (0=identical, 1=completely different):")
print(f"{'':15}", end="")
for s in samples:
    print(f"{s[:9]:>10}", end="")
print()

for s1 in samples:
    print(f"{s1[:15]:15}", end="")
    for s2 in samples:
        bc = braycurtis(otu_table[s1], otu_table[s2])
        print(f"{bc:10.3f}", end="")
    print()`,
      },
      {
        instruction:
          "Visualise community composition with a stacked bar chart.",
        why: "Numbers tell you that samples are different — visualisation shows you how. A stacked bar chart of relative abundance is the most common figure in microbiome papers. Each bar represents one sample; each colour represents one OTU (species). The width of each coloured segment shows that species' proportion of the total community. Healthy samples should show a roughly similar, diverse distribution of many OTUs. IBD samples should look different — fewer dominant species, or different species dominating entirely. This chart is the microbiome equivalent of a pie chart, but for every sample simultaneously.",
        how: "We first normalise the raw counts to relative abundance — dividing each column by its sum gives proportions that add to 100% for each sample. This normalisation is essential because different samples might have different total sequencing depths (one sample sequenced at higher coverage would have more raw counts, but not necessarily more bacteria). Working with proportions puts all samples on the same scale. We plot only the top 8 OTUs individually (the most abundant) and lump everything else into 'Other' to keep the chart readable.",
        codeExplanation:
          "This code normalises the OTU table to relative abundance, identifies the most abundant OTUs, and creates a stacked bar chart saved as a PNG file. Each bar represents a sample, and each coloured segment represents a different microbial species' proportion of the community.",
        codeBreakdown:
          "`otu_table.div(otu_table.sum(axis=0))` divides each cell by its column's total — axis=0 means column-wise. Multiplying by 100 converts to percentages. `rel_abundance.mean(axis=1).nlargest(8).index` computes the average abundance across all samples for each OTU, picks the 8 highest, and returns their index labels. `rel_abundance.drop(top_otus).sum()` sums all the remaining (non-top-8) OTUs into an 'Other' category. The `ax.bar(...)` loop draws one set of segments for each OTU, starting at the accumulated `bottom` height. `plt.savefig(...)` saves the figure to disk.",
        code: `import matplotlib.pyplot as plt

# Normalise to relative abundance (%)
rel_abundance = otu_table.div(otu_table.sum(axis=0)) * 100

# Plot top 8 OTUs for clarity
top_otus = rel_abundance.mean(axis=1).nlargest(8).index
other = rel_abundance.drop(top_otus).sum()
plot_data = rel_abundance.loc[top_otus]

fig, ax = plt.subplots(figsize=(10, 5))
colors = plt.cm.tab10.colors
bottom = np.zeros(n_samples)
for i, otu in enumerate(top_otus):
    ax.bar(sample_names, plot_data.loc[otu], bottom=bottom,
           color=colors[i % 10], label=otu)
    bottom += plot_data.loc[otu].values
ax.bar(sample_names, other, bottom=bottom, color="grey", label="Other")
ax.set_ylabel("Relative Abundance (%)")
ax.set_title("Microbiome Community Composition")
ax.legend(bbox_to_anchor=(1.05, 1), loc="upper left", fontsize=8)
plt.tight_layout()
plt.savefig("microbiome_composition.png", dpi=150)
print("Saved microbiome_composition.png")`,
      },
      {
        instruction:
          "Run a PCoA (Principal Coordinates Analysis) on the Bray-Curtis matrix to visualise beta diversity in 2D.",
        why: "The Bray-Curtis matrix we computed has 6 samples × 6 samples = 36 numbers, but it's essentially a description of a 6-dimensional space. PCoA (Principal Coordinates Analysis, equivalent to classical MDS — Multi-Dimensional Scaling) is an ordination technique that finds the 2D projection that preserves the pairwise distances as faithfully as possible. In the resulting plot, samples that are similar (low Bray-Curtis) appear close together, and dissimilar samples appear far apart. If the healthy and IBD communities truly differ, you should see two distinct clusters. This is one of the most important figures in a microbiome paper — it visually demonstrates whether disease state explains the variation in community composition.",
        how: "MDS (Multi-Dimensional Scaling) takes a dissimilarity matrix and finds coordinates in a lower-dimensional space that best reproduce those distances. With `dissimilarity='precomputed'`, scikit-learn's MDS takes our Bray-Curtis matrix directly instead of computing its own distances. The output is a 2D array where each row is a sample's (x, y) position. We colour healthy samples blue and IBD samples red so the grouping is immediately apparent. If the analysis works, you'll see the blue points clustering away from the red points.",
        codeExplanation:
          "This code builds the complete Bray-Curtis dissimilarity matrix, applies MDS to project it into 2D, and creates a scatter plot where each point is a sample. Healthy samples appear in blue and IBD samples in red, showing how distinct the communities are in a 2D space derived purely from their species composition.",
        codeBreakdown:
          "`np.zeros((n_samples, n_samples))` creates an empty square matrix. The nested loop fills it with Bray-Curtis values for every sample pair. `MDS(n_components=2, dissimilarity='precomputed', random_state=42)` creates the MDS object — 'precomputed' means we're providing the distance matrix directly. `mds.fit_transform(bc_matrix)` runs the algorithm and returns 2D coordinates for each sample. The `enumerate(coords)` loop unpacks each (x, y) pair. `ax.scatter(...)` plots a dot at that position. `ax.annotate(...)` adds the sample label next to each dot.",
        code: `from sklearn.manifold import MDS
from scipy.spatial.distance import pdist, squareform

# Build full dissimilarity matrix
bc_matrix = np.zeros((n_samples, n_samples))
for i, s1 in enumerate(samples):
    for j, s2 in enumerate(samples):
        bc_matrix[i,j] = braycurtis(otu_table[s1], otu_table[s2])

# MDS = equivalent to PCoA for Bray-Curtis
mds = MDS(n_components=2, dissimilarity="precomputed", random_state=42)
coords = mds.fit_transform(bc_matrix)

fig, ax = plt.subplots(figsize=(6, 5))
colors = ["#2196F3"]*3 + ["#F44336"]*3   # blue=healthy, red=IBD
for i, (x, y) in enumerate(coords):
    ax.scatter(x, y, color=colors[i], s=120, zorder=5)
    ax.annotate(samples[i], (x, y), textcoords="offset points", xytext=(6,4))
ax.set_title("Beta Diversity — PCoA of Bray-Curtis")
ax.set_xlabel("PC1"); ax.set_ylabel("PC2")
plt.tight_layout()
plt.savefig("beta_diversity_pcoa.png", dpi=150)
print("Saved beta_diversity_pcoa.png")`,
      },
    ],
    gain: "You'll have tackled a real microbiome analysis pipeline from raw counts to statistical analysis and visualisation — the same workflow used in published gut microbiome studies.",
    fullCode: `#!/usr/bin/env python3
"""
PROJECT 5 — Microbiome Diversity Analysis
==========================================
Complete, runnable script. Copy this into a file called microbiome_analysis.py
and run it with:  python microbiome_analysis.py

Requirements:
  pip install numpy pandas scipy scikit-learn matplotlib

This script is fully self-contained — no internet access needed.
It simulates a realistic IBD vs. healthy gut microbiome dataset and
runs alpha diversity, beta diversity, and ordination analyses.
"""

try:
    import numpy as np
    import pandas as pd
    from scipy.stats import entropy
    from scipy.spatial.distance import braycurtis
    from sklearn.manifold import MDS
    import matplotlib
    matplotlib.use("Agg")      # non-interactive backend — saves to file
    import matplotlib.pyplot as plt
except ImportError:
    raise SystemExit(
        "Install required packages:\\n"
        "  pip install numpy pandas scipy scikit-learn matplotlib"
    )

# === Step 1: Create a simulated OTU table ===
# In a real study this comes from QIIME2 processing of 16S rRNA amplicon reads.
# OTU table: rows = OTUs (microbial species), columns = samples
# We simulate dysbiosis: IBD patients have lower microbial diversity —
# a well-documented clinical finding (reduced Shannon index in IBD patients).
np.random.seed(42)   # fixed seed → reproducible 'random' numbers

n_otus, n_samples = 20, 6
sample_names = ["Healthy_1", "Healthy_2", "Healthy_3", "IBD_1", "IBD_2", "IBD_3"]
otu_names    = [f"OTU_{i:03d}" for i in range(1, n_otus + 1)]

# Healthy: higher, more even counts (params 5, 0.3 → higher mean)
# IBD:     lower, sparser counts (params 2, 0.6 → lower mean, more zeros)
# Negative binomial distribution models overdispersed count data — same model
# used by DESeq2 and edgeR for RNA-seq and microbiome analysis.
healthy_counts = np.random.negative_binomial(5, 0.3, (n_otus, 3))
ibd_counts     = np.random.negative_binomial(2, 0.6, (n_otus, 3))

otu_table = pd.DataFrame(
    np.hstack([healthy_counts, ibd_counts]),
    index=otu_names,
    columns=sample_names
)

print("OTU table (first 5 rows):")
print(otu_table.head().to_string())
print(f"\\nTable shape: {otu_table.shape[0]} OTUs × {otu_table.shape[1]} samples")

# === Step 2: Calculate Shannon diversity index (alpha diversity) ===
# Shannon H = -Σ(pᵢ × log₂(pᵢ))  where pᵢ = relative abundance of OTU i
# Higher H = more diverse community.
# Healthy gut: H ≈ 3–4 bits.  IBD/dysbiosis: H often < 2.5 bits.
def shannon_index(counts: np.ndarray) -> float:
    """Compute Shannon diversity index (bits) from raw count vector."""
    counts = counts[counts > 0]                  # remove zeros (log(0) undefined)
    proportions = counts / counts.sum()          # convert to relative abundance
    return float(entropy(proportions, base=2))   # scipy entropy = Shannon H

print("\\n--- Alpha Diversity (Shannon Index) ---")
for sample in sample_names:
    H        = shannon_index(otu_table[sample].values)
    richness = int((otu_table[sample] > 0).sum())   # OTU richness = # present OTUs
    group    = "Healthy" if "Healthy" in sample else "IBD    "
    print(f"  {sample:<12}  ({group})  Shannon H = {H:.2f} bits  |  Richness = {richness} OTUs")

# === Step 3: Bray-Curtis beta diversity matrix ===
# Beta diversity measures how different communities are BETWEEN samples.
# Bray-Curtis: 0 = identical communities, 1 = no shared species.
# Expected pattern: Healthy vs IBD comparisons should have higher BC than
# Healthy vs Healthy comparisons, confirming a disease-associated signature.
print("\\n--- Beta Diversity (Bray-Curtis dissimilarity matrix) ---")
samples = otu_table.columns.tolist()

# Print matrix header
print(f"{'':15}", end="")
for s in samples:
    print(f"{s[:9]:>10}", end="")
print()

# Fill and print the full symmetric matrix
bc_matrix = np.zeros((n_samples, n_samples))
for i, s1 in enumerate(samples):
    print(f"{s1[:15]:15}", end="")
    for j, s2 in enumerate(samples):
        bc = braycurtis(otu_table[s1].values, otu_table[s2].values)
        bc_matrix[i, j] = bc
        print(f"{bc:10.3f}", end="")
    print()

# === Step 4: Stacked bar chart of relative abundance ===
# Normalise to relative abundance (%) so all samples are comparable
# regardless of sequencing depth.  Show top 8 OTUs; rest → "Other".
rel_abundance = otu_table.div(otu_table.sum(axis=0)) * 100

top_otus  = rel_abundance.mean(axis=1).nlargest(8).index
other_row = rel_abundance.drop(top_otus).sum()
plot_data = rel_abundance.loc[top_otus]

fig, ax = plt.subplots(figsize=(10, 5))
tab10    = plt.cm.tab10.colors
bottom   = np.zeros(n_samples)

for i, otu in enumerate(top_otus):
    ax.bar(sample_names, plot_data.loc[otu], bottom=bottom,
           color=tab10[i % 10], label=otu)
    bottom += plot_data.loc[otu].values

ax.bar(sample_names, other_row, bottom=bottom, color="grey", label="Other")
ax.set_ylabel("Relative Abundance (%)")
ax.set_title("Microbiome Community Composition — Healthy vs IBD")
ax.legend(bbox_to_anchor=(1.05, 1), loc="upper left", fontsize=8)
plt.tight_layout()
plt.savefig("microbiome_composition.png", dpi=150)
plt.close()
print("\\nSaved microbiome_composition.png  ✓")

# === Step 5: PCoA (MDS) ordination of Bray-Curtis distances ===
# PCoA projects the 6-dimensional Bray-Curtis distance space into 2D
# while preserving pairwise distances as faithfully as possible.
# Healthy samples should cluster together (blue), IBD apart (red).
mds    = MDS(n_components=2, dissimilarity="precomputed", random_state=42)
coords = mds.fit_transform(bc_matrix)

fig, ax = plt.subplots(figsize=(6, 5))
colors  = ["#2196F3"] * 3 + ["#F44336"] * 3   # blue=Healthy, red=IBD

for i, (x, y) in enumerate(coords):
    ax.scatter(x, y, color=colors[i], s=140, zorder=5, edgecolors="white", linewidths=1.5)
    ax.annotate(samples[i], (x, y),
                textcoords="offset points", xytext=(7, 4), fontsize=9)

ax.set_title("Beta Diversity — PCoA (Bray-Curtis)")
ax.set_xlabel("PC1")
ax.set_ylabel("PC2")
# Legend patches
import matplotlib.patches as mpatches
ax.legend(handles=[
    mpatches.Patch(color="#2196F3", label="Healthy"),
    mpatches.Patch(color="#F44336", label="IBD"),
], loc="best")
plt.tight_layout()
plt.savefig("beta_diversity_pcoa.png", dpi=150)
plt.close()
print("Saved beta_diversity_pcoa.png  ✓")

# === Final summary ===
print("\\n=== Diversity Summary ===")
healthy_H = np.mean([shannon_index(otu_table[s].values) for s in sample_names if "Healthy" in s])
ibd_H     = np.mean([shannon_index(otu_table[s].values) for s in sample_names if "IBD" in s])
print(f"  Mean Shannon H (Healthy): {healthy_H:.2f} bits")
print(f"  Mean Shannon H (IBD):     {ibd_H:.2f} bits")
print(f"  Diversity reduction in IBD: {((healthy_H - ibd_H) / healthy_H * 100):.1f}%")
print("\\nProject complete!  Check the two PNG files for visualisations.  ✓")
`,
  },
];

const DIFFICULTY_STYLES: Record<
  string,
  { bg: string; text: string; border: string }
> = {
  Beginner: {
    bg: "oklch(0.94 0.06 142 / 0.4)",
    text: "oklch(0.38 0.14 142)",
    border: "oklch(0.68 0.14 142 / 0.5)",
  },
  Intermediate: {
    bg: "oklch(0.94 0.08 75 / 0.5)",
    text: "oklch(0.40 0.14 75)",
    border: "oklch(0.65 0.14 75 / 0.5)",
  },
  Advanced: {
    bg: "oklch(0.94 0.07 27 / 0.4)",
    text: "oklch(0.40 0.14 27)",
    border: "oklch(0.62 0.16 27 / 0.5)",
  },
};

const STEP_LAYER_STYLES = {
  why: {
    bg: "oklch(0.95 0.035 220 / 0.35)",
    border: "oklch(0.52 0.14 220 / 0.3)",
    label: "🤔 Why this step?",
    labelColor: "oklch(0.38 0.14 220)",
    textColor: "oklch(0.28 0.06 220)",
  },
  how: {
    bg: "oklch(0.95 0.04 142 / 0.28)",
    border: "oklch(0.52 0.14 142 / 0.3)",
    label: "⚙️ How does it work?",
    labelColor: "oklch(0.35 0.14 142)",
    textColor: "oklch(0.28 0.06 142)",
  },
  codeExplanation: {
    bg: "oklch(0.95 0.05 55 / 0.3)",
    border: "oklch(0.60 0.14 55 / 0.35)",
    label: "📋 What does the code do?",
    labelColor: "oklch(0.38 0.14 55)",
    textColor: "oklch(0.30 0.06 55)",
  },
  codeBreakdown: {
    bg: "oklch(0.94 0.04 290 / 0.25)",
    border: "oklch(0.52 0.14 290 / 0.3)",
    label: "🔍 How does the code do it?",
    labelColor: "oklch(0.38 0.14 290)",
    textColor: "oklch(0.28 0.06 290)",
  },
};

interface StepLayerBoxProps {
  type: keyof typeof STEP_LAYER_STYLES;
  text: string;
}

function StepLayerBox({ type, text }: StepLayerBoxProps) {
  const style = STEP_LAYER_STYLES[type];
  return (
    <div
      className="rounded-xl px-4 py-3"
      style={{
        background: style.bg,
        border: `1px solid ${style.border}`,
      }}
    >
      <p
        className="text-xs font-bold uppercase tracking-wide mb-1.5"
        style={{ color: style.labelColor }}
      >
        {style.label}
      </p>
      <p className="text-sm leading-relaxed" style={{ color: style.textColor }}>
        {text}
      </p>
    </div>
  );
}

function ProjectCard({ project }: { project: GuidedProject }) {
  const [expanded, setExpanded] = useState(false);
  const diff = DIFFICULTY_STYLES[project.difficulty];

  return (
    <div
      className="rounded-2xl overflow-hidden"
      style={{
        background: "oklch(0.985 0.008 75)",
        border: "1px solid oklch(0.87 0.02 75)",
      }}
      data-ocid={`project-card-${project.id}`}
    >
      <div className="p-6">
        <div className="flex flex-wrap items-start gap-3 mb-3">
          <h4
            className="font-display text-lg font-bold flex-1 min-w-0"
            style={{ color: "oklch(0.30 0.05 75)" }}
          >
            {project.title}
          </h4>
          <span
            className="shrink-0 text-xs font-bold px-2.5 py-1 rounded-full"
            style={{
              background: diff.bg,
              color: diff.text,
              border: `1px solid ${diff.border}`,
            }}
          >
            {project.difficulty}
          </span>
        </div>

        <p className="text-sm mb-4" style={{ color: "oklch(0.52 0.04 220)" }}>
          ⏱ Estimated time: <strong>{project.time}</strong>
        </p>

        <div className="mb-4">
          <p
            className="text-xs font-semibold uppercase tracking-wide mb-2"
            style={{ color: "oklch(0.52 0.14 220)" }}
          >
            What you'll learn
          </p>
          <ul className="space-y-1">
            {project.objectives.map((obj) => (
              <li
                key={obj}
                className="flex items-start gap-2 text-sm"
                style={{ color: "oklch(0.35 0.04 75)" }}
              >
                <span
                  className="text-green-600 shrink-0 mt-0.5"
                  aria-hidden="true"
                >
                  ✓
                </span>
                <span>{obj}</span>
              </li>
            ))}
          </ul>
        </div>

        <button
          type="button"
          onClick={() => setExpanded(!expanded)}
          className="text-sm font-semibold flex items-center gap-1.5 transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 rounded"
          style={{ color: "oklch(0.52 0.15 220)" }}
          aria-expanded={expanded}
          aria-controls={`steps-${project.id}`}
          data-ocid={`expand-project-${project.id}`}
        >
          <span>{expanded ? "▲ Hide steps" : "▼ Show step-by-step guide"}</span>
        </button>
      </div>

      {expanded && (
        <motion.div
          id={`steps-${project.id}`}
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          exit={{ opacity: 0, height: 0 }}
          transition={{ duration: 0.3 }}
          className="border-t px-6 pb-6 pt-5 flex flex-col gap-7"
          style={{ borderColor: "oklch(0.87 0.02 75)" }}
        >
          {project.steps.map((step, si) => (
            <div
              key={`${project.id}-step-${step.instruction.slice(0, 20)}`}
              className="flex flex-col gap-3"
            >
              {/* Step header */}
              <p
                className="text-sm font-semibold"
                style={{ color: "oklch(0.35 0.04 75)" }}
              >
                <span
                  className="inline-flex items-center justify-center w-6 h-6 rounded-full text-xs font-bold mr-2"
                  style={{ background: "oklch(0.52 0.15 220)", color: "white" }}
                  aria-hidden="true"
                >
                  {si + 1}
                </span>
                {step.instruction}
              </p>

              {/* Explanation layers — appear before the code */}
              {step.why && <StepLayerBox type="why" text={step.why} />}
              {step.how && <StepLayerBox type="how" text={step.how} />}
              {step.codeExplanation && (
                <StepLayerBox
                  type="codeExplanation"
                  text={step.codeExplanation}
                />
              )}

              {/* Code block */}
              {step.code && <CodeBlock code={step.code} />}

              {/* Code breakdown appears after the code so students can read it alongside */}
              {step.codeBreakdown && (
                <StepLayerBox type="codeBreakdown" text={step.codeBreakdown} />
              )}
            </div>
          ))}

          <div
            className="rounded-xl p-4 mt-2"
            style={{
              background: "oklch(0.96 0.025 142 / 0.3)",
              border: "1px solid oklch(0.68 0.14 142 / 0.4)",
            }}
          >
            <p className="text-sm" style={{ color: "oklch(0.35 0.10 142)" }}>
              <strong>What you'll gain: </strong>
              {project.gain}
            </p>
          </div>

          {/* Complete project code ─ copy & run */}
          {project.fullCode && (
            <div
              className="rounded-2xl overflow-hidden mt-2"
              style={{
                border: "2px solid oklch(0.55 0.16 162 / 0.55)",
                background: "oklch(0.96 0.03 162 / 0.12)",
              }}
              data-ocid={`full-code-${project.id}`}
            >
              {/* Header bar */}
              <div
                className="px-5 py-3 flex items-center gap-3"
                style={{
                  background: "oklch(0.52 0.16 162 / 0.15)",
                  borderBottom: "1px solid oklch(0.55 0.16 162 / 0.35)",
                }}
              >
                <span className="text-lg" aria-hidden="true">
                  ⬇️
                </span>
                <div className="min-w-0">
                  <p
                    className="font-display font-bold text-sm"
                    style={{ color: "oklch(0.32 0.14 162)" }}
                  >
                    Complete Project Code — Copy &amp; Run
                  </p>
                  <p
                    className="text-xs mt-0.5"
                    style={{ color: "oklch(0.45 0.08 162)" }}
                  >
                    This is the full, self-contained Python script for this
                    project. Copy it into a{" "}
                    <code className="font-mono">.py</code> file and run it with{" "}
                    <code className="font-mono">python filename.py</code>
                  </p>
                </div>
              </div>
              {/* Code block */}
              <div className="p-4">
                <CodeBlock code={project.fullCode} />
              </div>
            </div>
          )}
        </motion.div>
      )}
    </div>
  );
}

// ── Quiz ──────────────────────────────────────────────────────────────────────

const BIOINFORMATICS_QUIZ: QuizQuestion[] = [
  {
    id: "bio1",
    topic: "bioinformatics",
    question:
      "The cost of sequencing a human genome dropped from ~$3 billion (Human Genome Project, 2003) to under $200 today. What has this primarily enabled?",
    options: [
      "Faster synthesis of new DNA sequences in the lab",
      "A shift from data-poor to data-rich biology — requiring computational tools to extract meaning from massive datasets",
      "The ability to grow organisms in the laboratory without culturing",
      "Replacement of the polymerase chain reaction with direct sequencing",
    ],
    correctIndex: 1,
    explanation:
      "The sequencing cost revolution is the reason bioinformatics became so central to modern biology. When data was scarce, analysis was done manually. When a human genome can be sequenced for $200, the bottleneck is no longer generating data — it's analysing it. Bioinformatics provides the algorithms, databases, and software pipelines that transform billions of raw base calls into biological knowledge.",
  },
  {
    id: "bio2",
    topic: "bioinformatics",
    question: "What does the E-value in a BLAST result represent?",
    options: [
      "The percentage of identical bases between query and subject",
      "The evolutionary divergence time between two sequences",
      "The number of hits of that score or better expected by chance in a database of that size",
      "The energy required to form the sequence alignment",
    ],
    correctIndex: 2,
    explanation:
      "The E-value is a statistical measure: it's the number of alignments with that score or better you'd expect to find by random chance when searching a database of that size. An E-value of 0.001 means you'd expect one false positive per thousand searches. Lower E-values = more significant hits. A general rule: E < 0.001 is considered significant; E < 1×10⁻¹⁰ is very strong evidence of homology.",
  },
  {
    id: "bio3",
    topic: "bioinformatics",
    question:
      "What is the difference between the Needleman-Wunsch and Smith-Waterman alignment algorithms?",
    options: [
      "Needleman-Wunsch is for proteins; Smith-Waterman is for nucleotides",
      "Needleman-Wunsch performs global alignment (full sequences end-to-end); Smith-Waterman performs local alignment (best-matching sub-region)",
      "Smith-Waterman is faster but less accurate than Needleman-Wunsch",
      "They are the same algorithm with different names",
    ],
    correctIndex: 1,
    explanation:
      "Both use dynamic programming and gap penalties, but their objective differs. Needleman-Wunsch (1970) optimises alignment across the full length of both sequences — best for closely related sequences of similar length. Smith-Waterman (1981) finds the highest-scoring local region, ignoring the flanks — ideal for finding a conserved domain in otherwise divergent proteins. BLAST uses a local alignment strategy based on Smith-Waterman principles.",
  },
  {
    id: "bio4",
    topic: "bioinformatics",
    question: "Which database stores publicly available nucleotide sequences?",
    options: ["UniProt", "PDB", "GenBank (NCBI)", "KEGG"],
    correctIndex: 2,
    explanation:
      "GenBank at NCBI is the primary public repository for nucleotide sequences — over 250 million sequences from hundreds of thousands of organisms. Submitting your sequences to GenBank upon publication is required by most journals. UniProt stores protein sequences, PDB stores 3D protein structures, and KEGG stores metabolic pathway data.",
  },
  {
    id: "bio5",
    topic: "bioinformatics",
    question:
      "In a phylogenetic tree, what do the branch lengths typically represent?",
    options: [
      "The physical size of the organism",
      "The number of genes in the genome",
      "The amount of evolutionary change (sequence divergence) between nodes",
      "The age of the oldest fossil for each species",
    ],
    correctIndex: 2,
    explanation:
      "Branch lengths represent sequence divergence — the number of mutations that accumulated since two lineages split from a common ancestor. Longer branches mean more evolutionary change. Human and chimpanzee have very short branches (98.7% DNA similarity — they're more closely related to each other than either is to gorillas), while the branch to yeast is much longer, reflecting hundreds of millions of years of separate evolution.",
  },
  {
    id: "bio6",
    topic: "bioinformatics",
    question:
      "AlphaFold2 achieved near-experimental accuracy at the CASP14 competition in 2020. What makes its architectural approach distinctive?",
    options: [
      "It uses energy minimisation like Rosetta, but with faster hardware",
      "It uses an attention-based Evoformer module trained on multiple sequence alignments and PDB structures — learning coevolutionary patterns",
      "It relies solely on homology to known structures",
      "It simulates protein folding using molecular dynamics at the atomic level",
    ],
    correctIndex: 1,
    explanation:
      "AlphaFold2's key innovation is its Evoformer module — an attention-based transformer that processes multiple sequence alignments (MSAs) to extract coevolutionary constraints. When two positions in a protein have co-evolved (mutating together to maintain contact), it's evidence they're close in 3D space. AlphaFold2 learned to extract these structural constraints from MSAs with extraordinary accuracy, predicting structures to near-experimental quality for most proteins.",
  },
  {
    id: "bio7",
    topic: "bioinformatics",
    question:
      "In RNA-seq differential expression analysis, which statistical model do DESeq2 and edgeR use for read counts?",
    options: [
      "Normal (Gaussian) distribution",
      "Poisson distribution",
      "Negative binomial distribution",
      "Binomial distribution",
    ],
    correctIndex: 2,
    explanation:
      "RNA-seq read counts are count data with variance that exceeds the mean — a phenomenon called overdispersion. The Poisson distribution (used in early tools) assumes variance equals the mean, which underfits overdispersed data and produces too many false positives. The negative binomial distribution has a separate dispersion parameter that captures biological variability between replicates. DESeq2 and edgeR both model count data as negative binomial, making them statistically rigorous for differential expression.",
  },
  {
    id: "bio8",
    topic: "bioinformatics",
    question:
      "What is metagenomics, and what did it reveal about microbial life?",
    options: [
      "Sequencing the genome of a single purified organism — revealed that bacteria have more genes than expected",
      "Comparing genomes of two species — showed horizontal gene transfer occurs between bacteria",
      "Sequencing all DNA in an environmental sample without culturing — revealed that most microbial life cannot be cultured and that the gut microbiome is vastly more complex than previously known",
      "Creating a complete map of all metabolic pathways in a model organism",
    ],
    correctIndex: 2,
    explanation:
      "Metagenomics sequences everything in a sample — gut, soil, ocean — bypassing the need to culture organisms. This was transformative because the vast majority of microorganisms in nature cannot be grown in laboratory conditions. The Human Microbiome Project used metagenomics to characterise the trillions of organisms living in and on the human body, revealing thousands of species whose collective genome encodes metabolic capabilities essential to human health.",
  },
  {
    id: "bio9",
    topic: "bioinformatics",
    question: "What is the BLOSUM62 matrix used for in sequence alignment?",
    options: [
      "Calculating the likelihood of mutations in nucleotide sequences",
      "Scoring amino acid substitutions based on frequencies observed in conserved protein blocks — the standard for database searching",
      "Predicting protein secondary structure from amino acid sequence",
      "Estimating branch lengths in phylogenetic trees",
    ],
    correctIndex: 1,
    explanation:
      "BLOSUM (BLOcks SUbstitution Matrix) matrices are derived empirically from observed amino acid substitutions in conserved protein blocks in the BLOCKS database. BLOSUM62 (derived from alignments with ≥62% identity) assigns positive scores to substitutions that occur more often than chance and negative scores to those that occur rarely — reflecting structural and functional conservation. It's the default scoring matrix in BLAST and is most appropriate for searching against distantly related sequences.",
  },
  {
    id: "bio10",
    topic: "bioinformatics",
    question:
      "In single-cell RNA-seq analysis, what does the dimensionality reduction step (UMAP or t-SNE) achieve?",
    options: [
      "It filters out low-quality cells from the dataset",
      "It maps high-dimensional transcriptome data (thousands of genes) into 2D or 3D space while preserving cluster structure, enabling visual identification of cell populations",
      "It aligns sequencing reads to the reference genome",
      "It normalises for differences in sequencing depth between cells",
    ],
    correctIndex: 1,
    explanation:
      "Each cell in scRNA-seq has a transcriptome described by thousands of gene expression values — a high-dimensional space that's impossible to visualise directly. UMAP and t-SNE reduce this to 2D while trying to preserve the local neighbourhood structure of the data. Cells of the same type cluster together in the reduced-dimension plot, revealing cell populations and their relationships. These clusters are then annotated by inspecting which marker genes are highly expressed in each cluster.",
  },
  {
    id: "bio11",
    topic: "bioinformatics",
    question:
      "In Biopython, what does the Seq object's .translate() method do, and what does a '*' in the output represent?",
    options: [
      "It converts RNA to DNA; '*' means a start codon",
      "It translates a DNA or RNA sequence into a protein sequence using the genetic code; '*' represents a stop codon",
      "It calculates the molecular weight of the sequence; '*' marks modified amino acids",
      "It aligns two sequences; '*' marks identical positions",
    ],
    correctIndex: 1,
    explanation:
      "Biopython's Seq.translate() uses the NCBI genetic code tables to convert a nucleotide sequence codon-by-codon into amino acids. The asterisk '*' in the output represents a stop codon (TAA, TAG, or TGA). If you want to translate only up to the first stop codon, you can pass to_stop=True as an argument. By default it uses the standard genetic code, but you can specify table=2 for vertebrate mitochondrial code, which matters for analysing mitochondrial genes.",
  },
  {
    id: "bio12",
    topic: "bioinformatics",
    question:
      "When using Bio.Entrez to fetch sequences from NCBI, why is it important to always set Entrez.email before making any requests?",
    options: [
      "It creates an account on NCBI and gives you unlimited downloads",
      "NCBI uses the email to contact you if your scripts cause excessive server load; without it, your IP may be blocked",
      "The email is encrypted and used as an authentication token for secure queries",
      "It registers your sequences in GenBank automatically",
    ],
    correctIndex: 1,
    explanation:
      "NCBI provides free programmatic access to its databases, but it asks that all scripts identify themselves with a valid email address. If your script causes issues — for example, by sending too many requests — NCBI will contact that address before blocking access. Omitting it is both impolite and risky: NCBI may temporarily block IP addresses that make many anonymous requests. It's a small thing to include and a big thing to skip. With an API key (also free), you can increase from 3 to 10 requests per second.",
  },
  {
    id: "bio13",
    topic: "bioinformatics",
    question:
      "When parsing BLAST results with NCBIXML in Biopython, what does hsp.expect represent and how do you use it to filter for significant hits?",
    options: [
      "The expected protein length; filter with hsp.expect > 300",
      "The E-value — expected number of false-positive alignments at that score in the database; filter with hsp.expect < 0.001 for significant hits",
      "The expected runtime of the BLAST search in seconds",
      "The expected number of gaps in the alignment",
    ],
    correctIndex: 1,
    explanation:
      "In Biopython's BLAST result objects, hsp.expect is the E-value — the expected number of hits you'd get at that score or better purely by chance in a database of that size. A smaller number means a more significant hit. Common thresholds: E < 0.001 for general significance, E < 1e-10 for strong evidence of homology. In Biopython you typically write: 'for hsp in alignment.hsps: if hsp.expect < 0.001: ...' to process only meaningful results.",
  },
  {
    id: "bio14",
    topic: "bioinformatics",
    question:
      "In Bio.Phylo.TreeConstruction, what is the difference between the DistanceCalculator and DistanceTreeConstructor objects?",
    options: [
      "DistanceCalculator downloads sequences from NCBI; DistanceTreeConstructor runs MUSCLE alignment",
      "DistanceCalculator computes pairwise distances from an alignment; DistanceTreeConstructor builds a tree from those distances using methods like Neighbour-Joining",
      "They are interchangeable — both build phylogenetic trees from raw sequences",
      "DistanceCalculator scores BLAST alignments; DistanceTreeConstructor visualises them",
    ],
    correctIndex: 1,
    explanation:
      "These are two sequential steps in distance-based phylogenetics with Biopython. DistanceCalculator takes a MultipleSeqAlignment object and computes a pairwise distance matrix — it needs a substitution model (like 'identity' for nucleotides or 'blosum62' for proteins) to score how different each pair of sequences is. DistanceTreeConstructor then takes that distance matrix and builds a tree using Neighbour-Joining (constructor.nj(dm)) or UPGMA (constructor.upgma(dm)). You need both: distances first, then the tree.",
  },
  {
    id: "bio15",
    topic: "bioinformatics",
    question:
      "What does the gc_fraction() function in Biopython's Bio.SeqUtils module return, and why is GC content biologically meaningful?",
    options: [
      "The fraction of the sequence that is adenine; important because A pairs with T in DNA",
      "The fraction of bases that are guanine or cytosine; important because G-C pairs have three hydrogen bonds, making GC-rich sequences more thermally stable",
      "The total length of the sequence divided by the number of codons",
      "The proportion of the genome that codes for protein; higher GC = more genes",
    ],
    correctIndex: 1,
    explanation:
      "gc_fraction() returns a value between 0 and 1 representing the proportion of G and C bases in a sequence (multiply by 100 for a percentage). GC content is biologically important because G-C base pairs form three hydrogen bonds while A-T pairs form only two — so a GC-rich sequence requires more energy to denature (melt), making it thermally more stable. GC content varies dramatically across organisms and even across different regions of the same genome. Interestingly, in PCR primer design, GC content between 40–60% is considered ideal.",
  },
];

// ── Main section ──────────────────────────────────────────────────────────────

export default function BioinformaticsSection() {
  return (
    <section
      className="px-6 py-16 max-w-5xl mx-auto"
      data-ocid="bioinformatics-section"
      aria-labelledby="bioinformatics-title"
      style={{ background: "oklch(0.97 0.012 75)" }}
    >
      <SectionHeader
        topicId="bioinformatics"
        title="Bioinformatics Basics"
        subtitle="Biology became a data science. Bioinformatics is the toolkit that turns 3 billion base pairs of sequence into something you can actually understand."
      />

      <AnimatedEntrance direction="up" delay={0.1}>
        <div className="mb-10">
          <h3
            id="bioinformatics-title"
            className="font-display text-xl font-semibold mb-4"
            style={{ color: "oklch(0.52 0.14 220)" }}
          >
            💻 Interactive Sequence Alignment Demo
          </h3>
          <SequenceAlignmentDemo />
        </div>
      </AnimatedEntrance>

      <AnimatedEntrance direction="left" delay={0.1}>
        <div className="mb-12">
          <PhylogeneticTree />
        </div>
      </AnimatedEntrance>

      {/* Interesting fact callout */}
      <AnimatedEntrance direction="up" delay={0.05}>
        <div
          className="rounded-2xl p-5 mb-10 flex items-start gap-4"
          style={{
            background: "oklch(0.96 0.025 220 / 0.35)",
            border: "1px solid oklch(0.52 0.14 220 / 0.3)",
          }}
        >
          <span className="text-2xl shrink-0" aria-hidden="true">
            🤯
          </span>
          <div>
            <p
              className="font-semibold text-sm mb-1"
              style={{ color: "oklch(0.42 0.12 220)" }}
            >
              Did you know?
            </p>
            <p
              className="text-sm leading-relaxed"
              style={{ color: "oklch(0.35 0.05 75)" }}
            >
              AlphaFold2's release in 2021 was described by some structural
              biologists as the equivalent of getting a Google Maps for the
              protein universe overnight. DeepMind released predicted structures
              for over <strong>200 million proteins</strong> — essentially every
              protein from every sequenced organism — for free. The entire
              database of experimentally solved structures in the PDB had taken
              the global scientific community 50 years to accumulate 230,000
              structures. AlphaFold matched and extended that in months.
            </p>
          </div>
        </div>
      </AnimatedEntrance>

      <AnimatedEntrance direction="up" delay={0.05}>
        <div className="mb-12">
          <h3
            className="font-display text-xl font-semibold mb-5"
            style={{ color: "oklch(0.52 0.14 220)" }}
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
                    background: "oklch(0.985 0.008 75)",
                    border: `1px solid ${card.color}28`,
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
                        <span
                          className="text-[11px] leading-snug"
                          style={{ color: "oklch(0.45 0.04 75)" }}
                        >
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

      <StaggerContainer
        className="flex flex-col gap-7 mb-16"
        staggerDelay={0.08}
      >
        {EXPLANATIONS.map((section) => (
          <StaggerItem key={section.id}>
            <div
              id={section.anchorId}
              className="rounded-2xl p-7"
              style={{
                background: "oklch(0.985 0.008 75)",
                border: "1px solid oklch(0.87 0.02 75)",
                borderLeft: "3px solid oklch(0.52 0.14 220 / 0.6)",
              }}
              data-ocid={`explanation-${section.id}`}
            >
              <h3
                className="font-display text-xl font-bold mb-4"
                style={{ color: "oklch(0.52 0.14 220)" }}
              >
                {section.heading}
              </h3>
              {section.body.split("\n\n").map((paragraph, pi) => (
                <p
                  key={`${section.id}-p${pi}`}
                  className="leading-relaxed mb-4 last:mb-0 text-[0.95rem]"
                  style={{ color: "oklch(0.30 0.03 75)" }}
                >
                  {paragraph}
                </p>
              ))}
            </div>
          </StaggerItem>
        ))}
      </StaggerContainer>

      {/* ── Biopython Section ──────────────────────────────────────────────── */}
      <AnimatedEntrance direction="up" delay={0.05}>
        <div
          id="bioinformatics-biopython-basics"
          className="mb-16"
          data-ocid="biopython-section"
        >
          <div
            className="rounded-2xl p-6 md:p-8 mb-8"
            style={{
              background: "oklch(0.96 0.025 220 / 0.2)",
              border: "2px solid oklch(0.52 0.14 220 / 0.25)",
            }}
          >
            <div className="flex items-center gap-3 mb-3">
              <span className="text-3xl" aria-hidden="true">
                🐍
              </span>
              <h3
                className="font-display text-2xl font-bold"
                style={{ color: "oklch(0.42 0.16 220)" }}
              >
                Biopython — Your Python Toolkit for Biology
              </h3>
            </div>
            <p
              className="text-base leading-relaxed"
              style={{ color: "oklch(0.35 0.05 75)" }}
            >
              Ready to go from reading about bioinformatics to actually{" "}
              <em>doing</em> it? Biopython is your best friend. It's a mature,
              well-documented Python library that handles everything from
              reading FASTA files to running BLAST searches to parsing protein
              structures — and you're about to get a tour of all of it, from
              your very first install through to structural bioinformatics.
            </p>
          </div>

          <div className="flex flex-col gap-8">
            {BIOPYTHON_SUBSECTIONS.map((sub) => (
              <div
                key={sub.id}
                id={
                  sub.id === "bp-intro"
                    ? "bioinformatics-biopython-basics-intro"
                    : `bioinformatics-biopython-${sub.id}`
                }
                className="rounded-2xl p-6 md:p-7"
                style={{
                  background: "oklch(0.985 0.008 75)",
                  border: "1px solid oklch(0.87 0.02 75)",
                  borderLeft: "3px solid oklch(0.52 0.14 220 / 0.5)",
                }}
                data-ocid={`biopython-subsection-${sub.id}`}
              >
                <h4
                  className="font-display text-lg font-bold mb-4"
                  style={{ color: "oklch(0.42 0.16 220)" }}
                >
                  {sub.heading}
                </h4>
                {sub.body.split("\n\n").map((para, pi) => (
                  <p
                    key={`${sub.id}-body-${pi}`}
                    className="leading-relaxed mb-4 text-[0.95rem]"
                    style={{ color: "oklch(0.30 0.03 75)" }}
                  >
                    {para}
                  </p>
                ))}
                <CodeBlock code={sub.code} />
              </div>
            ))}
          </div>
        </div>
      </AnimatedEntrance>

      {/* ── Guided Projects Section ────────────────────────────────────────── */}
      <AnimatedEntrance direction="up" delay={0.05}>
        <div
          id="bioinformatics-guided-projects"
          className="mb-16"
          data-ocid="guided-projects-section"
        >
          <div
            className="rounded-2xl p-6 md:p-8 mb-8"
            style={{
              background: "oklch(0.95 0.04 142 / 0.2)",
              border: "2px solid oklch(0.52 0.14 142 / 0.25)",
            }}
          >
            <div className="flex items-center gap-3 mb-3">
              <span className="text-3xl" aria-hidden="true">
                🚀
              </span>
              <h3
                className="font-display text-2xl font-bold"
                style={{ color: "oklch(0.38 0.14 142)" }}
              >
                Guided Projects — Build Something Real
              </h3>
            </div>
            <p
              className="text-base leading-relaxed"
              style={{ color: "oklch(0.35 0.05 75)" }}
            >
              Theory is great, but nothing cements bioinformatics knowledge like
              actually working through a project. These five guided exercises
              take you from beginner territory all the way to an advanced
              microbiome analysis — each one is self-contained, runnable on your
              laptop, and designed to leave you with real, reusable Python code.
              Pick the one that matches where you are right now and dive in.
            </p>
          </div>

          <div className="flex flex-col gap-6">
            {GUIDED_PROJECTS.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </div>
        </div>
      </AnimatedEntrance>

      <AnimatedEntrance direction="up" delay={0.1}>
        <div className="mb-4">
          <h3
            className="font-display text-2xl font-bold mb-2"
            style={{ color: "oklch(0.52 0.14 220)" }}
          >
            💻 Test Your Bioinformatics Knowledge
          </h3>
          <p className="mb-6" style={{ color: "oklch(0.45 0.04 75)" }}>
            15 questions covering databases, BLAST, sequence alignment,
            phylogenetics, AlphaFold, RNA-seq, metagenomics, machine learning,
            and Biopython.
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
