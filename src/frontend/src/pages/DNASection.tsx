import {
  AnimatedEntrance,
  StaggerContainer,
  StaggerItem,
} from "@/components/AnimatedEntrance";
import { QuizEngine } from "@/components/QuizEngine";
import { SceneErrorBoundary } from "@/components/SceneErrorBoundary";
import { SectionHeader } from "@/components/SectionHeader";
import { DNAScene } from "@/sections/DNAScene";
import { ReplicationFork } from "@/sections/ReplicationFork";
import type { QuizQuestion } from "@/types/biology";
import { Suspense } from "react";

const DNA_QUIZ: QuizQuestion[] = [
  {
    id: "dna-1",
    question:
      "Most of the DNA in your cells exists as 'B-DNA.' What does that actually mean, and when do the other forms (A-DNA and Z-DNA) appear?",
    options: [
      "B-DNA is left-handed; A-DNA and Z-DNA are right-handed versions found only in bacteria",
      "B-DNA is the classic right-handed helix with ~10 base pairs per turn found under normal conditions; A-DNA is a wider, shorter right-handed form in dry conditions or RNA:DNA hybrids; Z-DNA is a rare left-handed form in GC-rich regions under stress",
      "All three forms are structurally identical but differ in the sequence of bases they contain",
      "A-DNA is found in bacteria, B-DNA in plants, and Z-DNA only in animals",
    ],
    correctIndex: 1,
    explanation:
      "Great question! The double helix isn't locked into one fixed shape. B-DNA is what most people picture — the right-handed helix with ~10 base pairs per turn and the classic wide major groove and narrow minor groove. It's the dominant form in cells under normal conditions. A-DNA forms when DNA is dehydrated (or when one strand is RNA, as in RNA-DNA hybrids during transcription) — it's shorter and wider than B-DNA. Z-DNA is the unusual one: it spirals to the left (a 'Z' zigzag pattern in the backbone) and forms in GC-rich stretches under torsional stress. Proteins exist that specifically recognise Z-DNA, suggesting it may play roles in regulating gene expression. The key takeaway: DNA's structure is dynamic and can shift conformations based on local conditions.",
    topic: "dna",
  },
  {
    id: "dna-2",
    question:
      "As DNA unwinds during replication, it creates a problem ahead of the fork — like unwinding a twisted rope creates extra twisting further along. What enzyme solves this, and how?",
    options: [
      "Primase synthesises short RNA primers that release the torsional stress ahead of the fork",
      "Ligase seals the single-strand breaks that build up ahead of the replication fork",
      "Topoisomerase cuts the DNA (one or both strands), allows a controlled rotation to release the tension, then reseals the cut — relieving the supercoiling ahead of the fork",
      "Helicase runs backwards ahead of the fork, pre-unwinding the helix so no stress builds up",
    ],
    correctIndex: 2,
    explanation:
      "Imagine unwinding a coiled telephone cord from one end — the more you unwind, the tighter the coil gets further along. That's exactly what happens ahead of a replication fork: helicase unwinds the helix, but the rotational stress has to go somewhere. Topoisomerase is the solution. Type I topoisomerase cuts one strand, allows the DNA to rotate and release the strain, then reseals. Type II cuts both strands, passes another segment of DNA through the gap, and reseals. Here's an important clinical application: many antibiotics (like fluoroquinolones) work by targeting bacterial topoisomerase, and chemotherapy drugs like doxorubicin target human topoisomerase II. Understanding this enzyme is literally life-or-death medicine.",
    topic: "dna",
  },
  {
    id: "dna-3",
    question:
      "The Meselson-Stahl experiment is called 'the most elegant experiment in molecular biology.' What did it prove?",
    options: [
      "It proved DNA is double-stranded by using X-ray crystallography to image the helix directly",
      "It proved DNA replication is semi-conservative — each new double helix keeps one original strand and builds one new strand — by tracking heavy and normal nitrogen through generations of bacterial cell division",
      "It proved that DNA polymerase works in the 3' to 5' direction",
      "It disproved the RNA World hypothesis by showing DNA came before RNA in evolution",
    ],
    correctIndex: 1,
    explanation:
      "Here's the elegant logic of the experiment (1958). Meselson and Stahl grew bacteria in 'heavy' ¹⁵N medium until all their DNA contained heavy nitrogen. Then they switched to normal ¹⁴N medium. After one generation: all DNA was intermediate density — consistent with each new double helix having one old heavy strand and one new light strand. After two generations: they saw both intermediate and light DNA — exactly what semi-conservative replication predicts. This simple observation ruled out both conservative replication (which would give heavy and light, not intermediate) and dispersive replication (which would give only intermediate even after two generations). Same basic idea as telling old rope from new by weight, but for molecules.",
    topic: "dna",
  },
  {
    id: "dna-4",
    question:
      "If you stretched out all the DNA in one human cell, it would be about 2 metres long. How does it fit inside a nucleus the size of a grain of sand?",
    options: [
      "DNA is chemically compacted — enzymes shorten the actual molecule rather than fold it",
      "DNA wraps around histone proteins to form nucleosomes (like thread around a spool), these stack into fibres, which form loops on a protein scaffold, which coil further into chromosomes — achieving about 10,000-fold compaction overall",
      "DNA compression only happens during cell division — the rest of the time it floats freely in the nucleus",
      "Topoisomerases tie DNA into knots that pack it tightly into the nucleus",
    ],
    correctIndex: 1,
    explanation:
      "This packaging is one of the most impressive feats of cellular engineering. Level 1: ~147 base pairs of DNA wrap 1.7 times around a histone octamer to form a nucleosome — like thread wound around a spool. This already achieves ~7-fold compaction. Level 2: nucleosomes coil into a ~30nm fibre (~50-fold compaction). Level 3: this fibre forms loops anchored to a protein scaffold (~1,000-fold). Level 4: during cell division, further coiling creates the visible chromosome (~10,000-fold total). But here's the key insight beyond the packing: chromatin structure controls gene expression. Loosely packed regions (euchromatin) are transcriptionally active. Tightly packed regions (heterochromatin) are silent. The degree of compaction is an instruction.",
    topic: "dna",
  },
  {
    id: "dna-5",
    question:
      "Your DNA is damaged thousands of times every day by radiation, chemicals, and normal cellular mistakes. What are the main repair mechanisms?",
    options: [
      "Nucleotide excision repair (NER) fixes UV-induced thymine dimers and bulky damage; base excision repair (BER) handles oxidised or missing bases; mismatch repair (MMR) corrects replication errors",
      "DNA damage is repaired by a single universal mechanism regardless of the type of damage",
      "Only mitochondrial DNA has repair mechanisms; nuclear DNA relies entirely on DNA polymerase proofreading",
      "NER repairs insertions; BER repairs deletions; MMR repairs transversions only",
    ],
    correctIndex: 0,
    explanation:
      "Your cells fix thousands of DNA lesions daily — mostly without you noticing. Nucleotide excision repair (NER) is like a molecular search-and-replace: it finds bulky distortions like UV-induced thymine dimers (where two adjacent thymine bases get stuck together by UV light), cuts out a ~30-nucleotide patch, and synthesises fresh DNA. Defective NER causes xeroderma pigmentosum — these patients get severe sunburns and have a very high risk of skin cancer even from small sun exposure. Base excision repair (BER) handles smaller damage: oxidised bases from reactive oxygen species, abasic sites. Mismatch repair (MMR) catches the rare errors that DNA polymerase's own proofreading misses. Inherited MMR gene mutations cause Lynch syndrome — significantly increased risk of colorectal and other cancers.",
    topic: "dna",
  },
  {
    id: "dna-6",
    question:
      "What is epigenetics — and how can two cells with identical DNA sequences have completely different jobs in the body?",
    options: [
      "Epigenetics means cells deliberately mutate their DNA to adapt to their environment",
      "Epigenetics refers to heritable changes in gene activity that don't change the DNA sequence itself — like methylating cytosines to silence genes, or modifying histones to open or close chromatin. These marks explain how all cells have the same DNA but different genes are active in each cell type",
      "Epigenetics is identical to genetic mutation — the terms are interchangeable",
      "Epigenetic changes only occur in stem cells and don't affect differentiated cells",
    ],
    correctIndex: 1,
    explanation:
      "This is one of the most important concepts in modern biology. Every cell in your body has the same DNA sequence — but a liver cell, a neuron, and a muscle cell look and behave completely differently. The reason is epigenetics. DNA methylation (adding a methyl group to cytosine, especially at CG sequences in gene promoters) is like a 'do not read' flag on a gene — it's associated with silencing. Histone modifications change how tightly DNA is wrapped, making genes more or less accessible. These marks are inherited when cells divide, so daughter cells remember their identity. Fascinatingly, your identical twin has the same DNA as you but gradually accumulates different epigenetic marks as you age and have different life experiences — which is partly why identical twins become less similar over time.",
    topic: "dna",
  },
  {
    id: "dna-7",
    question:
      "A mutation in a gene can have completely different consequences depending on where exactly the change happens. What's the difference between a silent, missense, and nonsense mutation?",
    options: [
      "Silent mutations always cause disease; missense mutations are harmless; nonsense mutations only occur in introns",
      "A silent mutation changes a codon but not the amino acid (due to the genetic code's redundancy); a missense mutation changes the amino acid; a nonsense mutation creates a premature stop codon, cutting the protein short",
      "All three types of mutations cause disease with equal severity",
      "Silent mutations change non-coding DNA; missense and nonsense mutations only occur in promoter regions",
    ],
    correctIndex: 1,
    explanation:
      "Not all mutations are equal — where and what matters enormously. A silent mutation changes a base but the codon still codes for the same amino acid (because the genetic code is redundant — most amino acids have multiple codons). The protein is unchanged. A missense mutation changes one base, resulting in a different amino acid. The classic example: sickle cell disease is caused by a single missense mutation in haemoglobin — one amino acid (valine instead of glutamic acid) at position 6 causes the protein to form sticky fibres, deforming red blood cells. A nonsense mutation creates a stop codon in the middle of the protein — the ribosome stops early, producing a truncated, usually non-functional protein. A single base, a completely different outcome.",
    topic: "dna",
  },
  {
    id: "dna-8",
    question:
      "Your chromosomes get slightly shorter every time your cells divide. Why does this happen, and how do cells that need to divide indefinitely (like stem cells and cancer cells) get around it?",
    options: [
      "Telomeres are in the centromere region; telomerase synthesises them during S phase alongside normal replication",
      "Telomeres are repetitive sequences (TTAGGG in humans) capping chromosome ends that shorten with each division because DNA polymerase can't copy the very end of a strand. Telomerase — a specialised enzyme carrying its own RNA template — extends them back, but it's silenced in most body cells",
      "Chromosome shortening has no biological effect and doesn't affect cell lifespan",
      "Telomerase is just another name for DNA ligase, which seals chromosome ends",
    ],
    correctIndex: 1,
    explanation:
      "Telomeres are fascinating molecular clocks. Human telomeres are thousands of repeats of TTAGGG at chromosome ends, forming protective caps that prevent chromosomes from being mistaken for broken DNA. Every time a cell divides, the telomeres get a little shorter — this is called the 'end replication problem.' Most body cells have a limit of about 50–70 divisions (the Hayflick limit). Stem cells and germ cells express telomerase to rebuild their telomeres. Here's the cancer connection: about 90% of cancer cells reactivate telomerase — they've found a way to divide indefinitely, which is one key hallmark of cancer. This is why telomerase is an attractive target for cancer drugs. Short telomeres are also associated with ageing and some rare premature ageing syndromes.",
    topic: "dna",
  },
  {
    id: "dna-9",
    question:
      "DNA polymerase copies DNA with remarkable accuracy. What's the mechanism that lets it catch and fix its own mistakes?",
    options: [
      "DNA polymerase has no proofreading ability — mismatch repair proteins correct all errors after the fact",
      "DNA polymerase has a built-in 3'→5' exonuclease that acts like a backspace key — if the wrong base is added, it reverses, removes the mistake, and tries again, achieving about 1 error per 10 million bases",
      "Proofreading is done by the sliding clamp protein, not the polymerase itself",
      "DNA polymerase checks each base pair using RNA primers that flag incorrect incorporations",
    ],
    correctIndex: 1,
    explanation:
      "The accuracy of DNA replication is genuinely breathtaking. Base pairing alone would give about 1 error in every 10,000 bases — not good enough for a 3.2-billion-base genome. DNA polymerase III has a built-in proofreading domain that works like a backspace key: if the wrong nucleotide is incorporated, the enzyme stalls, backs up, removes the incorrect base with a 3'→5' exonuclease, and tries again. This brings the error rate down to about 1 in 10 million. Then mismatch repair proteins sweep up remaining mistakes, bringing the final error rate to about 1 per billion base pairs. For context: copying the human genome produces about 3 errors total per cell division — most in non-coding DNA, most corrected by repair. When repair fails, as in Lynch syndrome, cancers develop.",
    topic: "dna",
  },
  {
    id: "dna-10",
    question:
      "Double-strand breaks are the most dangerous type of DNA damage. What are the two main ways cells repair them, and why does it matter which one is used?",
    options: [
      "Homologous recombination and non-homologous end joining are identical in accuracy; only the proteins involved differ",
      "Homologous recombination (HR) uses a template (the sister chromatid) to repair accurately — active mainly in S/G2 phase; non-homologous end joining (NHEJ) directly glues broken ends without a template and is available anytime but sometimes makes small errors",
      "NHEJ is always accurate; HR is error-prone and used only in bacteria",
      "HR repairs single-strand breaks; NHEJ repairs only double-strand breaks — they never handle the same damage",
    ],
    correctIndex: 1,
    explanation:
      "Double-strand breaks are catastrophic — an unrepaired break can cause loss of an entire chromosome arm. Cells have two main strategies. Homologous recombination (HR) is precise: it uses the sister chromatid as a perfect template, resecting the broken ends and synthesising new DNA accurately. It's like having a photocopy to work from. But it only works in S and G2 phases when the sister chromatid is present. BRCA1 and BRCA2 proteins are key HR players — which is exactly why BRCA mutations dramatically increase breast and ovarian cancer risk. NHEJ is the emergency repair: it captures broken ends and ligates them directly. It works at any time, but sometimes loses a few base pairs at the junction — good enough for survival, but not perfect. Interestingly, the immune system exploits NHEJ's imprecision during V(D)J recombination to generate antibody diversity.",
    topic: "dna",
  },
];

const EXPLANATION_PARAGRAPHS = [
  {
    anchorId: "dna-structure",
    title: "The Discovery That Changed Everything",
    content:
      "In April 1953, Watson and Crick published a two-page paper that began with almost comical understatement: 'We wish to suggest a structure for the salt of deoxyribose nucleic acid.' Those two pages changed the course of biology forever. The double helix wasn't just a beautiful structure — it revealed how genetic information could be stored, copied, and passed down through generations. The moment you see it, you understand replication: the two strands are complementary templates for each other. What made the discovery possible was years of work by many scientists, especially Rosalind Franklin, whose X-ray diffraction images (particularly 'Photo 51') provided critical evidence for the helix dimensions. It's worth knowing: Franklin's contribution was significant and not fully credited during her lifetime.",
  },
  {
    anchorId: "dna-nucleotides",
    title: "What Is a Nucleotide — the Building Block of DNA?",
    content:
      "DNA is a polymer — a long chain of repeating units. Each unit is called a nucleotide, and every nucleotide is a three-part package: a five-carbon sugar called deoxyribose, a phosphate group, and one of four nitrogenous bases — adenine (A), thymine (T), guanine (G), or cytosine (C). The 'deoxy' in deoxyribose tells you this sugar is missing one oxygen atom compared to RNA's ribose — that single difference makes DNA more chemically stable, which is why DNA evolved as the long-term genetic archive. Nucleotides chain together through phosphodiester bonds — connecting the 3' carbon of one sugar to the 5' carbon of the next, always in the same direction. The bases are divided into purines (A and G — double-ring structures) and pyrimidines (C and T — single-ring). A always pairs with T (2 hydrogen bonds); G always pairs with C (3 hydrogen bonds). The extra hydrogen bond in G-C pairing makes GC-rich regions slightly more stable — relevant to why some organisms that live at very high temperatures have GC-rich genomes.",
  },
  {
    anchorId: "dna-types",
    title: "Three DNA Conformations: B, A, and Z",
    content:
      "The double helix isn't a rigid, fixed structure — it can shift between different conformations depending on conditions. B-DNA is what most people picture: a right-handed helix with about 10 base pairs per turn, characteristic wide major groove and narrower minor groove, and the geometry Watson and Crick described. It's the dominant form under normal cellular conditions. A-DNA forms when DNA is dehydrated or in RNA-DNA hybrids (which form during transcription and reverse transcription) — it's a right-handed helix but wider and shorter than B-DNA, with ~11 base pairs per turn.\n\nZ-DNA is the unusual one. It's a left-handed helix with a zig-zag backbone (hence 'Z'), and forms preferentially in alternating GC sequences under torsional stress — like the negative supercoiling that builds up behind a moving RNA polymerase. Z-DNA binding proteins exist (like ADAR1), suggesting Z-DNA has regulatory roles in transcription and may be part of the innate immune response to viral DNA. Understanding that DNA can shift conformations is important: DNA isn't just a static information storage medium, it's a dynamic molecule whose shape carries biological meaning.",
  },
  {
    anchorId: "dna-packaging",
    title: "Fitting 2 Metres of DNA into a Space You Can't See",
    content:
      "The human genome's 3.2 billion base pairs would stretch about 2 metres if laid end to end — yet every cell squeezes this into a nucleus about 6 micrometres across. This requires a beautiful hierarchy of packaging. First level: 147 base pairs of DNA wrap 1.67 times around a histone octamer (two copies each of H2A, H2B, H3, and H4) to form a nucleosome — the 'beads on a string' visible in electron micrographs. Linker histone H1 and ~20–50 base pairs of linker DNA connect the beads. This already gives about 7-fold compaction.\n\nNucleosomes coil into a 30nm fibre (~50-fold compaction), which then forms loops anchored to protein scaffolds (~1,000-fold), which coil further into the visible chromosomes during cell division (~10,000-fold total). But this is more than just a packing problem — chromatin structure controls which genes can be expressed. Loosely packed euchromatin marks active genes accessible to RNA polymerase and transcription factors. Tightly packed heterochromatin marks silenced regions. The inactivated X chromosome in female cells (the Barr body) is a visible example of heterochromatin silencing at a chromosomal scale.",
  },
  {
    anchorId: "dna-replication",
    title: "How Cells Copy Their Entire Genome Before Every Division",
    content:
      "Every cell division requires copying 3.2 billion base pairs with extraordinary accuracy — and doing it in hours. Replication starts at specific sequences called origins of replication. Humans have about 30,000 of them, allowing the genome to be copied from many places simultaneously. At each origin, a protein complex unloads the replication machinery: helicase unwinds the double helix, single-strand binding proteins stabilise the exposed strands, topoisomerases relieve the torsional stress ahead, and primase synthesises short RNA primers (because DNA polymerase cannot start from scratch — it can only extend an existing strand).\n\nDNA polymerase then reads the template strand from 3' to 5' and synthesises new DNA in the 5' to 3' direction. One strand (the leading strand) is copied continuously in the direction the fork moves. The other strand (the lagging strand) must be copied in short fragments (Okazaki fragments, each starting with its own RNA primer) because it runs in the opposite direction from the fork. These fragments are later joined by DNA ligase. The entire process achieves an error rate of about 1 mistake per billion base pairs after proofreading and repair — meaning roughly 3 errors in the whole human genome per cell division.",
  },
  {
    anchorId: "dna-mutations",
    title: "Mutations: From Single Base Changes to Big Chromosomal Events",
    content:
      "A mutation is any permanent change to the DNA sequence. They range from swapping a single base to rearranging entire chromosomal segments. Point mutations are the simplest: a transition replaces one base with another of the same structural type (A↔G, or C↔T), while a transversion swaps a purine for a pyrimidine or vice versa. Whether a point mutation matters depends entirely on where it lands: a silent mutation changes the codon but not the amino acid (thanks to the genetic code's redundancy). A missense mutation changes one amino acid — sickle cell disease is caused by exactly one missense mutation in haemoglobin. A nonsense mutation creates a premature stop codon, producing a truncated, usually broken protein. A frameshift mutation (adding or deleting bases in a number that isn't a multiple of three) completely derails the reading frame downstream.\n\nLarger mutations include deletions, duplications, inversions, and translocations of chromosome segments — the kinds of changes visible through a microscope. Causes include spontaneous errors during replication, chemical damage from environmental toxins, UV radiation causing thymine dimers, and ionising radiation causing double-strand breaks. Most mutations are repaired or are neutral. Occasionally, a mutation is beneficial — and that's the molecular foundation of evolution.",
  },
  {
    anchorId: "dna-epigenetics",
    title: "Epigenetics: Regulating Genes Without Changing the Sequence",
    content:
      "Here's a genuinely mind-bending concept: two cells in your body — say, a liver cell and a neuron — have virtually identical DNA sequences, yet they look different, behave differently, express different genes, and have completely different identities. How? Epigenetics. Epigenetic mechanisms are changes in gene activity that are heritable (passed on when cells divide) but don't alter the DNA sequence itself.\n\nDNA methylation is the best understood: special enzymes add a methyl group to cytosine bases, especially at CG sequences called CpG dinucleotides. When promoter regions (the 'on switches' of genes) accumulate methylation, the genes tend to be silenced. These marks are copied faithfully when cells divide, so daughter cells inherit the same pattern of gene activity. Histone modifications are another layer: acetylating histone tails opens up chromatin and activates genes; methylation can either activate or silence depending on which histone and which position. Cancer cells often show aberrant epigenetic patterns — tumour suppressor genes get silenced by hypermethylation. Genomic imprinting is a striking example where only the maternal or paternal copy of a gene is expressed (the other is epigenetically silenced) — errors cause syndromes like Prader-Willi and Angelman. And X-inactivation in female mammals silences one X chromosome in each cell, driven by a long non-coding RNA called XIST.",
  },
];

export default function DNASection() {
  return (
    <section className="px-4 py-16 md:px-8" style={{ background: "white" }}>
      <div className="mx-auto max-w-6xl">
        <SectionHeader
          topicId="dna"
          title="DNA: The Blueprint of Life"
          subtitle="From the double helix's elegant structure to replication, mutations, repair, and epigenetics — everything about DNA explained clearly, from basics to deep knowledge."
        />

        {/* Helix + First 2 paragraphs */}
        <AnimatedEntrance direction="up" delay={0.1}>
          <div className="mb-12 grid grid-cols-1 gap-8 lg:grid-cols-2 lg:items-start">
            {/* Scene */}
            <div
              className="rounded-2xl overflow-hidden border"
              style={{
                borderColor: "oklch(0.55 0.12 280 / 0.25)",
                background: "oklch(0.96 0.02 280 / 0.2)",
              }}
            >
              <div className="px-4 pt-4 pb-2">
                <h3 className="font-display font-bold text-lg accent-dna">
                  Interactive Double Helix
                </h3>
                <p className="text-xs text-muted-foreground mt-0.5">
                  Click any base pair to identify it · Toggle highlighting to
                  compare pair types
                </p>
              </div>
              <SceneErrorBoundary
                sceneName="DNA Double Helix 3D Model"
                sceneColor="#9b59ff"
              >
                <Suspense
                  fallback={
                    <div
                      className="flex items-center justify-center"
                      style={{
                        height: 440,
                        background: "oklch(0.95 0.02 280 / 0.3)",
                        borderRadius: 12,
                      }}
                    >
                      <div className="h-8 w-8 animate-spin rounded-full border-2 border-muted border-t-primary" />
                    </div>
                  }
                >
                  <DNAScene />
                </Suspense>
              </SceneErrorBoundary>
            </div>

            {/* First 2 paragraphs */}
            <div className="flex flex-col gap-5">
              {EXPLANATION_PARAGRAPHS.slice(0, 2).map((para) => (
                <AnimatedEntrance
                  key={para.title}
                  direction="right"
                  delay={0.15}
                >
                  <div
                    id={para.anchorId}
                    className="rounded-xl p-5 border"
                    style={{
                      borderColor: "oklch(0.55 0.12 280 / 0.18)",
                      background: "oklch(0.97 0.015 280 / 0.2)",
                    }}
                  >
                    <h3 className="font-display font-bold text-base mb-2 accent-dna">
                      {para.title}
                    </h3>
                    <p
                      className="text-sm leading-relaxed"
                      style={{ color: "oklch(0.28 0.04 75)" }}
                    >
                      {para.content}
                    </p>
                  </div>
                </AnimatedEntrance>
              ))}
            </div>
          </div>
        </AnimatedEntrance>

        {/* Base pairing callout */}
        <AnimatedEntrance direction="up" delay={0.1}>
          <div
            className="mb-10 rounded-2xl p-6 border"
            style={{
              borderColor: "oklch(0.55 0.12 280 / 0.22)",
              background: "oklch(0.97 0.02 280 / 0.15)",
            }}
          >
            <h3 className="font-display font-bold text-lg accent-dna mb-4">
              Chargaff's Base Pairing Rules at a Glance
            </h3>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              {[
                {
                  pair: "A — T",
                  desc: "Adenine binds Thymine",
                  bonds: "2 hydrogen bonds",
                  colorA: "#2563eb",
                  colorB: "#b45309",
                  bg: "oklch(0.95 0.04 240 / 0.4)",
                },
                {
                  pair: "G — C",
                  desc: "Guanine binds Cytosine",
                  bonds:
                    "3 hydrogen bonds — stronger! GC-rich regions have higher melting points",
                  colorA: "#166534",
                  colorB: "#991b1b",
                  bg: "oklch(0.95 0.04 145 / 0.4)",
                },
              ].map(({ pair, desc, bonds, colorA, colorB, bg }) => (
                <div
                  key={pair}
                  className="rounded-xl p-4 flex items-center gap-4"
                  style={{
                    background: bg,
                    border: "1px solid oklch(0.55 0.12 280 / 0.12)",
                  }}
                >
                  <div
                    className="text-2xl font-bold font-mono"
                    style={{ color: colorA }}
                  >
                    {pair.split(" — ")[0]}
                  </div>
                  <div className="text-xl font-bold text-muted-foreground">
                    —
                  </div>
                  <div
                    className="text-2xl font-bold font-mono"
                    style={{ color: colorB }}
                  >
                    {pair.split(" — ")[1]}
                  </div>
                  <div className="ml-2 flex flex-col">
                    <span
                      className="text-sm font-medium"
                      style={{ color: "oklch(0.28 0.04 75)" }}
                    >
                      {desc}
                    </span>
                    <span className="text-xs text-muted-foreground">
                      {bonds}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </AnimatedEntrance>

        {/* DNA conformations highlight */}
        <AnimatedEntrance direction="up" delay={0.1}>
          <div className="mb-10 grid grid-cols-1 gap-4 sm:grid-cols-3">
            {[
              {
                name: "B-DNA",
                sub: "Most common form",
                detail:
                  "Right-handed · ~10 bp/turn · Physiological conditions · Major/minor grooves",
                color: "#3b82f6",
              },
              {
                name: "A-DNA",
                sub: "Dehydrated / RNA:DNA hybrids",
                detail:
                  "Right-handed · ~11 bp/turn · Wider & shorter · Forms during transcription",
                color: "#16a34a",
              },
              {
                name: "Z-DNA",
                sub: "GC-rich, torsional stress",
                detail:
                  "Left-handed · ~12 bp/turn · Zigzag backbone · May regulate transcription",
                color: "#9333ea",
              },
            ].map((conf) => (
              <div
                key={conf.name}
                className="rounded-xl p-4 border"
                style={{
                  borderColor: `${conf.color}33`,
                  background: `${conf.color}08`,
                }}
              >
                <div
                  className="font-display font-bold text-base mb-1"
                  style={{ color: conf.color }}
                >
                  {conf.name}
                </div>
                <div className="text-xs font-semibold mb-2 text-muted-foreground">
                  {conf.sub}
                </div>
                <p
                  className="text-xs leading-relaxed"
                  style={{ color: "oklch(0.35 0.03 75)" }}
                >
                  {conf.detail}
                </p>
              </div>
            ))}
          </div>
        </AnimatedEntrance>

        {/* Remaining paragraphs */}
        <StaggerContainer
          staggerDelay={0.08}
          className="mb-12 grid grid-cols-1 gap-5 md:grid-cols-2"
        >
          {EXPLANATION_PARAGRAPHS.slice(2).map((para) => (
            <StaggerItem key={para.title}>
              <div
                id={para.anchorId}
                className="h-full rounded-xl p-5 border"
                style={{
                  borderColor: "oklch(0.55 0.12 280 / 0.18)",
                  background: "oklch(0.98 0.01 75)",
                }}
              >
                <h3 className="font-display font-bold text-base mb-2 accent-dna">
                  {para.title}
                </h3>
                <p
                  className="text-sm leading-relaxed"
                  style={{ color: "oklch(0.28 0.04 75)" }}
                >
                  {para.content}
                </p>
              </div>
            </StaggerItem>
          ))}
        </StaggerContainer>

        {/* Replication Fork Diagram */}
        <AnimatedEntrance direction="up" delay={0.1}>
          <div className="mb-12">
            <h3 className="font-display font-bold text-2xl accent-dna glow-dna mb-2">
              DNA Replication Fork
            </h3>
            <p className="text-sm text-muted-foreground mb-6">
              Watch the leading strand copy continuously while the lagging
              strand forms Okazaki fragments — each needing its own RNA primer.
            </p>
            <ReplicationFork />
          </div>
        </AnimatedEntrance>

        {/* Key Facts Cards */}
        <AnimatedEntrance direction="up" delay={0.1}>
          <div className="mb-12 grid grid-cols-2 gap-4 sm:grid-cols-4">
            {[
              {
                label: "Base Pairs",
                value: "3.2 billion",
                sub: "in human genome",
                emoji: "🧬",
              },
              {
                label: "DNA Length",
                value: "~2 meters",
                sub: "per human cell",
                emoji: "📏",
              },
              {
                label: "Replication Accuracy",
                value: "1 in 10⁹",
                sub: "errors after repair",
                emoji: "🎯",
              },
              {
                label: "Origins of Replication",
                value: "~30,000",
                sub: "in human genome",
                emoji: "🔬",
              },
            ].map(({ label, value, sub, emoji }) => (
              <div
                key={label}
                className="rounded-xl p-4 text-center border"
                style={{
                  borderColor: "oklch(0.55 0.12 280 / 0.2)",
                  background: "oklch(0.97 0.02 280 / 0.2)",
                }}
              >
                <div className="text-3xl mb-2">{emoji}</div>
                <div className="font-display font-bold text-lg accent-dna">
                  {value}
                </div>
                <div
                  className="text-xs font-semibold mt-0.5"
                  style={{ color: "oklch(0.3 0.04 75)" }}
                >
                  {label}
                </div>
                <div className="text-xs text-muted-foreground mt-0.5">
                  {sub}
                </div>
              </div>
            ))}
          </div>
        </AnimatedEntrance>

        {/* Repair pathways summary */}
        <AnimatedEntrance direction="up" delay={0.1}>
          <div
            className="mb-12 rounded-2xl p-6 border"
            style={{
              borderColor: "oklch(0.55 0.12 280 / 0.2)",
              background: "oklch(0.97 0.02 280 / 0.1)",
            }}
          >
            <h3 className="font-display font-bold text-xl accent-dna mb-4">
              DNA Repair Pathways — A Quick Reference
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {[
                {
                  name: "Nucleotide Excision Repair (NER)",
                  damage: "UV-induced thymine dimers, bulky adducts",
                  disease: "Xeroderma pigmentosum when defective",
                  color: "#7c3aed",
                },
                {
                  name: "Base Excision Repair (BER)",
                  damage: "Oxidized/deaminated bases, abasic sites",
                  disease: "Contributes to aging and neurodegeneration",
                  color: "#0891b2",
                },
                {
                  name: "Mismatch Repair (MMR)",
                  damage: "Replication errors — mismatched bases, small indels",
                  disease: "Lynch syndrome (hereditary colorectal cancer)",
                  color: "#16a34a",
                },
                {
                  name: "Homologous Recombination (HR)",
                  damage: "Double-strand breaks (S/G2 phase)",
                  disease: "BRCA1/2 mutations → breast/ovarian cancer",
                  color: "#dc2626",
                },
                {
                  name: "Non-Homologous End Joining (NHEJ)",
                  damage: "Double-strand breaks (all phases)",
                  disease:
                    "Defects cause radiosensitivity and immunodeficiency",
                  color: "#d97706",
                },
                {
                  name: "Direct Reversal",
                  damage: "O⁶-methylguanine (MGMT enzyme)",
                  disease: "Relevant to temozolomide chemotherapy response",
                  color: "#be185d",
                },
              ].map((r) => (
                <div
                  key={r.name}
                  className="rounded-xl p-3"
                  style={{
                    background: `${r.color}0a`,
                    border: `1px solid ${r.color}25`,
                  }}
                >
                  <div
                    className="font-semibold text-xs mb-1"
                    style={{ color: r.color }}
                  >
                    {r.name}
                  </div>
                  <div className="text-xs text-muted-foreground mb-1">
                    Fixes: {r.damage}
                  </div>
                  <div
                    className="text-xs"
                    style={{ color: "oklch(0.4 0.03 75)" }}
                  >
                    When defective: {r.disease}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </AnimatedEntrance>

        {/* Quiz */}
        <AnimatedEntrance direction="up" delay={0.15}>
          <div
            data-ocid="dna-quiz-section"
            className="rounded-2xl p-7"
            style={{
              background: "oklch(0.97 0.02 280 / 0.15)",
              border: "1px solid oklch(0.55 0.12 280 / 0.2)",
            }}
          >
            <h3 className="font-display font-bold text-2xl accent-dna glow-dna mb-2">
              🧬 Test Your DNA Knowledge
            </h3>
            <p className="text-muted-foreground mb-6">
              10 questions covering DNA structure, replication, mutations,
              repair pathways, and epigenetics — each with a detailed
              explanation to help you understand, not just memorise.
            </p>
            <QuizEngine topicId="dna" questions={DNA_QUIZ} />
          </div>
        </AnimatedEntrance>
      </div>
    </section>
  );
}
