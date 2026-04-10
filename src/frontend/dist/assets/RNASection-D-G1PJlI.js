const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["assets/RNAScene-BrXKDWiD.js","assets/index-V1Xys_hZ.js","assets/index-C0bSg-oI.css","assets/OrbitControls-Cr3drnWX.js"])))=>i.map(i=>d[i]);
import { j as jsxRuntimeExports, r as reactExports, _ as __vitePreload } from "./index-V1Xys_hZ.js";
import { S as SectionHeader, A as AnimatedEntrance, a as StaggerContainer, b as StaggerItem, Q as QuizEngine } from "./SectionHeader-BzOZ529A.js";
import { S as SceneErrorBoundary } from "./SceneErrorBoundary-NlafLXOk.js";
const RNAScene = reactExports.lazy(
  () => __vitePreload(() => import("./RNAScene-BrXKDWiD.js"), true ? __vite__mapDeps([0,1,2,3]) : void 0).then((m) => ({ default: m.RNAScene }))
);
const RNA_QUIZ = [
  {
    id: "rna-q1",
    topic: "rna",
    question: "Which sugar is found in RNA but NOT in DNA?",
    options: ["Deoxyribose", "Ribose", "Glucose", "Fructose"],
    correctIndex: 1,
    explanation: "RNA contains ribose, which has a hydroxyl (–OH) group at the 2' carbon. DNA contains deoxyribose, which lacks that –OH group, making DNA more stable."
  },
  {
    id: "rna-q2",
    topic: "rna",
    question: "Which nitrogenous base is found in RNA but NOT in DNA?",
    options: ["Adenine", "Guanine", "Uracil", "Cytosine"],
    correctIndex: 2,
    explanation: "RNA uses Uracil (U) instead of Thymine (T). Both pair with Adenine, but Uracil lacks the methyl group that Thymine has."
  },
  {
    id: "rna-q3",
    topic: "rna",
    question: "What is the primary role of messenger RNA (mRNA)?",
    options: [
      "Forms the ribosome structure",
      "Brings amino acids to the ribosome",
      "Carries the genetic message from DNA to the ribosome",
      "Catalyzes peptide bond formation"
    ],
    correctIndex: 2,
    explanation: "mRNA is transcribed from DNA and carries the codons (triplet sequences) that specify which amino acids to incorporate into a growing protein."
  },
  {
    id: "rna-q4",
    topic: "rna",
    question: "Which part of a tRNA molecule carries the amino acid?",
    options: [
      "Anticodon loop",
      "D-loop",
      "T-loop",
      "3' CCA end (acceptor stem)"
    ],
    correctIndex: 3,
    explanation: "The 3' CCA end of tRNA is where the specific amino acid is covalently attached by aminoacyl-tRNA synthetase enzymes."
  },
  {
    id: "rna-q5",
    topic: "rna",
    question: "What does the anticodon on a tRNA molecule do?",
    options: [
      "Attaches to the ribosome large subunit",
      "Pairs with the complementary codon on mRNA",
      "Binds to RNA polymerase",
      "Catalyzes peptide bond formation"
    ],
    correctIndex: 1,
    explanation: "The anticodon loop on tRNA contains three nucleotides that base-pair with the complementary codon on mRNA, ensuring the correct amino acid is added."
  },
  {
    id: "rna-q6",
    topic: "rna",
    question: "Which enzyme synthesizes RNA during transcription?",
    options: ["DNA polymerase", "RNA polymerase", "Ribonuclease", "Helicase"],
    correctIndex: 1,
    explanation: "RNA polymerase binds to the promoter region of DNA, unwinds the double helix, and synthesizes a complementary RNA strand in the 5'→3' direction."
  },
  {
    id: "rna-q7",
    topic: "rna",
    question: "In eukaryotes, what happens to pre-mRNA before it leaves the nucleus?",
    options: [
      "It is immediately translated",
      "Introns are added and exons are removed",
      "A 5' cap and poly-A tail are added, and introns are spliced out",
      "It is converted into DNA"
    ],
    correctIndex: 2,
    explanation: "Pre-mRNA processing in eukaryotes includes adding a 5' methylguanosine cap, a 3' poly-A tail, and removing non-coding introns by spliceosomes — producing mature mRNA."
  },
  {
    id: "rna-q8",
    topic: "rna",
    question: "What codon signals the START of translation?",
    options: ["UAA", "UAG", "AUG", "UGA"],
    correctIndex: 2,
    explanation: "AUG is the universal start codon. It codes for the amino acid methionine and marks where the ribosome begins reading the mRNA."
  },
  {
    id: "rna-q9",
    topic: "rna",
    question: "Which RNA type is a major structural and catalytic component of ribosomes?",
    options: ["mRNA", "tRNA", "rRNA", "miRNA"],
    correctIndex: 2,
    explanation: "Ribosomal RNA (rRNA) makes up the bulk of the ribosome. The large subunit contains catalytic rRNA that directly forms peptide bonds — making it a ribozyme."
  },
  {
    id: "rna-q10",
    topic: "rna",
    question: "Which non-coding RNA type regulates gene expression by silencing complementary mRNA?",
    options: ["rRNA", "tRNA", "snRNA", "miRNA"],
    correctIndex: 3,
    explanation: "MicroRNA (miRNA) are short (~22 nt) non-coding RNAs that bind to complementary regions on mRNA, blocking translation or triggering degradation — a key post-transcriptional regulatory mechanism."
  }
];
const BASE_COLOR_MAP = {
  A: "#22c55e",
  U: "#ef4444",
  G: "#3b82f6",
  C: "#eab308",
  T: "#f59e0b"
};
const DNA_TEMPLATE = [
  { id: "dt-T1", b: "T" },
  { id: "dt-A1", b: "A" },
  { id: "dt-C1", b: "C" },
  { id: "dt-G1", b: "G" },
  { id: "dt-T2", b: "T" },
  { id: "dt-A2", b: "A" },
  { id: "dt-C2", b: "C" },
  { id: "dt-G2", b: "G" },
  { id: "dt-T3", b: "T" },
  { id: "dt-A3", b: "A" },
  { id: "dt-C3", b: "C" }
];
const DNA_CODING = [
  { id: "dc-A1", b: "A" },
  { id: "dc-T1", b: "T" },
  { id: "dc-G1", b: "G" },
  { id: "dc-C1", b: "C" },
  { id: "dc-A2", b: "A" },
  { id: "dc-T2", b: "T" },
  { id: "dc-G2", b: "G" },
  { id: "dc-C2", b: "C" },
  { id: "dc-A3", b: "A" },
  { id: "dc-T3", b: "T" },
  { id: "dc-G3", b: "G" }
];
const RNA_BASES = [
  { id: "rb-A1", b: "A", delay: 0 },
  { id: "rb-U1", b: "U", delay: 0.3 },
  { id: "rb-G1", b: "G", delay: 0.6 },
  { id: "rb-C1", b: "C", delay: 0.9 },
  { id: "rb-A2", b: "A", delay: 1.2 },
  { id: "rb-U2", b: "U", delay: 1.5 },
  { id: "rb-G2", b: "G", delay: 1.8 },
  { id: "rb-C2", b: "C", delay: 2.1 },
  { id: "rb-A3", b: "A", delay: 2.4 },
  { id: "rb-U3", b: "U", delay: 2.7 },
  { id: "rb-G3", b: "G", delay: 3 }
];
const TRANSCRIPTION_STEPS = [
  "1. RNAP binds promoter",
  "2. Unwinds DNA",
  "3. Builds RNA 5'→3'",
  "4. Terminates"
];
function TranscriptionDiagram() {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      className: "rounded-2xl border p-6 overflow-hidden relative",
      style: {
        borderColor: "oklch(0.70 0.20 290 / 0.25)",
        background: "oklch(0.16 0 0)"
      },
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-display text-lg font-bold mb-1 accent-dna", children: "Transcription" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground mb-5", children: "RNA Polymerase reads the DNA template and builds a complementary RNA strand" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "div",
          {
            className: "relative h-44 overflow-hidden rounded-xl",
            style: { background: "oklch(0.13 0 0)" },
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "absolute top-4 left-0 right-0 flex flex-col gap-2 px-4", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-1.5 items-center", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-muted-foreground w-16 shrink-0", children: "Template" }),
                  DNA_TEMPLATE.map((item) => /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "div",
                    {
                      className: "h-6 w-6 rounded flex items-center justify-center text-xs font-bold",
                      style: {
                        background: "oklch(0.70 0.20 290 / 0.2)",
                        color: "oklch(0.70 0.20 290)",
                        border: "1px solid oklch(0.70 0.20 290 / 0.4)"
                      },
                      children: item.b
                    },
                    item.id
                  ))
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-1.5 items-center", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-muted-foreground w-16 shrink-0", children: "Coding" }),
                  DNA_CODING.map((item) => /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "div",
                    {
                      className: "h-6 w-6 rounded flex items-center justify-center text-xs font-bold",
                      style: {
                        background: "oklch(0.28 0 0)",
                        color: "oklch(0.55 0 0)"
                      },
                      children: item.b
                    },
                    item.id
                  ))
                ] })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "div",
                {
                  className: "absolute top-2",
                  style: {
                    animation: "rnapMove 4s linear infinite",
                    background: "oklch(0.70 0.20 290 / 0.85)",
                    borderRadius: "8px",
                    padding: "2px 8px",
                    fontSize: "10px",
                    fontWeight: "700",
                    color: "oklch(0.12 0 0)",
                    whiteSpace: "nowrap"
                  },
                  children: "RNA Pol II"
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "absolute bottom-4 left-0 px-4 flex gap-1.5 items-center overflow-hidden", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-muted-foreground w-16 shrink-0", children: "RNA (5'→3')" }),
                RNA_BASES.map((item) => /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "div",
                  {
                    className: "h-6 w-6 rounded flex items-center justify-center text-xs font-bold",
                    style: {
                      background: `${BASE_COLOR_MAP[item.b]}22`,
                      color: BASE_COLOR_MAP[item.b],
                      border: `1px solid ${BASE_COLOR_MAP[item.b]}66`,
                      animation: `rnaBaseAppear 4s ${item.delay}s ease-out infinite`,
                      opacity: 0
                    },
                    children: item.b
                  },
                  item.id
                ))
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute right-3 top-3 flex flex-col gap-1", children: TRANSCRIPTION_STEPS.map((step) => /* @__PURE__ */ jsxRuntimeExports.jsx(
                "div",
                {
                  className: "text-xs text-muted-foreground bg-black/30 px-1.5 py-0.5 rounded",
                  children: step
                },
                step
              )) })
            ]
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx("style", { children: `
        @keyframes rnapMove {
          0% { left: 72px; }
          100% { left: calc(100% - 80px); }
        }
        @keyframes rnaBaseAppear {
          0%, 10% { opacity: 0; transform: translateY(8px); }
          30%, 70% { opacity: 1; transform: translateY(0); }
          85%, 100% { opacity: 0; transform: translateY(-4px); }
        }
      ` })
      ]
    }
  );
}
const CODON_DATA = [
  {
    id: "codon-AUG",
    bases: [
      { id: "cb-A1", b: "A" },
      { id: "cb-U1", b: "U" },
      { id: "cb-G1", b: "G" }
    ]
  },
  {
    id: "codon-UAU",
    bases: [
      { id: "cb-U2", b: "U" },
      { id: "cb-A2", b: "A" },
      { id: "cb-U3", b: "U" }
    ]
  },
  {
    id: "codon-GCC",
    bases: [
      { id: "cb-G2", b: "G" },
      { id: "cb-C1", b: "C" },
      { id: "cb-C2", b: "C" }
    ]
  },
  {
    id: "codon-AAA",
    bases: [
      { id: "cb-A3", b: "A" },
      { id: "cb-A4", b: "A" },
      { id: "cb-A5", b: "A" }
    ]
  },
  {
    id: "codon-UGG",
    bases: [
      { id: "cb-U4", b: "U" },
      { id: "cb-G3", b: "G" },
      { id: "cb-G4", b: "G" }
    ]
  },
  {
    id: "codon-CAG",
    bases: [
      { id: "cb-C3", b: "C" },
      { id: "cb-A6", b: "A" },
      { id: "cb-G5", b: "G" }
    ]
  },
  {
    id: "codon-UAA",
    bases: [
      { id: "cb-U5", b: "U" },
      { id: "cb-A7", b: "A" },
      { id: "cb-A8", b: "A" }
    ]
  }
];
const AA_DATA = [
  { id: "aa-Met", label: "Met", color: "#a78bfa", delay: 0 },
  { id: "aa-Tyr", label: "Tyr", color: "#22c55e", delay: 0.7 },
  { id: "aa-Ala", label: "Ala", color: "#f59e0b", delay: 1.4 },
  { id: "aa-Lys", label: "Lys", color: "#3b82f6", delay: 2.1 },
  { id: "aa-Trp", label: "Trp", color: "#ec4899", delay: 2.8 },
  { id: "aa-Gln", label: "Gln", color: "#34d399", delay: 3.5 }
];
const SITE_LABELS = [
  { id: "site-A", color: "#ef4444", label: "A-site: incoming tRNA" },
  { id: "site-P", color: "#22c55e", label: "P-site: growing chain" },
  { id: "site-E", color: "#6b7280", label: "E-site: exiting tRNA" }
];
function TranslationDiagram() {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      className: "rounded-2xl border p-6 overflow-hidden",
      style: {
        borderColor: "oklch(0.70 0.20 290 / 0.25)",
        background: "oklch(0.16 0 0)"
      },
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-display text-lg font-bold mb-1 accent-dna", children: "Translation" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground mb-5", children: "Ribosome reads mRNA codons; tRNA delivers amino acids to build the polypeptide chain" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "div",
          {
            className: "relative h-52 overflow-hidden rounded-xl",
            style: { background: "oklch(0.13 0 0)" },
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute top-6 left-0 right-0 flex items-center px-3 gap-0", children: CODON_DATA.map((codon) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-0.5", children: [
                codon.bases.map((base) => /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "div",
                  {
                    className: "h-7 w-6 flex items-center justify-center text-xs font-bold rounded-sm",
                    style: {
                      background: `${BASE_COLOR_MAP[base.b]}22`,
                      color: BASE_COLOR_MAP[base.b],
                      border: `1px solid ${BASE_COLOR_MAP[base.b]}44`
                    },
                    children: base.b
                  },
                  base.id
                )),
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-1" })
              ] }, codon.id)) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "div",
                {
                  className: "absolute top-1",
                  style: {
                    animation: "ribosomeSlide 5s linear infinite",
                    background: "linear-gradient(135deg, oklch(0.70 0.20 290 / 0.9), oklch(0.55 0.22 290 / 0.9))",
                    borderRadius: "12px",
                    width: "64px",
                    height: "44px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: "9px",
                    fontWeight: "700",
                    color: "oklch(0.95 0 0)"
                  },
                  children: "Ribosome"
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "absolute bottom-4 left-3 flex items-center gap-1.5 flex-wrap", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-muted-foreground mr-1", children: "Chain:" }),
                AA_DATA.map((aa) => /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "div",
                  {
                    className: "rounded-full px-2 py-0.5 text-xs font-semibold",
                    style: {
                      background: `${aa.color}22`,
                      color: aa.color,
                      border: `1px solid ${aa.color}55`,
                      animation: `aaAppear 5s ${aa.delay}s ease-out infinite`,
                      opacity: 0
                    },
                    children: aa.label
                  },
                  aa.id
                ))
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute right-3 top-3 flex flex-col gap-1", children: SITE_LABELS.map((s) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1.5", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "div",
                  {
                    className: "h-2.5 w-2.5 rounded-full shrink-0",
                    style: { background: s.color }
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-muted-foreground", children: s.label })
              ] }, s.id)) })
            ]
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx("style", { children: `
        @keyframes ribosomeSlide {
          0% { left: 4px; }
          100% { left: calc(100% - 68px); }
        }
        @keyframes aaAppear {
          0%, 5% { opacity: 0; transform: scale(0.6); }
          20%, 70% { opacity: 1; transform: scale(1); }
          85%, 100% { opacity: 0; }
        }
      ` })
      ]
    }
  );
}
const PARAGRAPHS = [
  {
    id: "para-structure",
    heading: "RNA vs DNA: Key Structural Differences",
    body: `RNA (ribonucleic acid) and DNA (deoxyribonucleic acid) are both nucleic acids built from nucleotide monomers, but they differ in three critical ways. First, RNA contains the sugar ribose, which has a hydroxyl (–OH) group at the 2' carbon, while DNA uses deoxyribose that lacks this group. This seemingly small difference makes RNA more reactive and less chemically stable — a feature that is actually advantageous for a molecule meant to be temporary. Second, RNA replaces the base thymine (T) with uracil (U), which also pairs with adenine but lacks thymine's methyl group. Third, RNA is typically single-stranded rather than forming a stable double helix. This single-stranded nature allows RNA to fold into complex three-dimensional shapes through internal base-pairing — shapes that are crucial for its many functional roles.`
  },
  {
    id: "para-types",
    heading: "The Three Main Types of RNA",
    body: `Three principal RNA species orchestrate protein synthesis. Messenger RNA (mRNA) is the molecular blueprint: it is transcribed from a gene and carries its nucleotide sequence — organized into sequential three-letter codons — to the ribosome, where the protein is built. Transfer RNA (tRNA) is the decoder: each tRNA molecule carries a specific amino acid on its 3' CCA end and sports an anticodon loop whose three nucleotides pair with the matching mRNA codon, ensuring amino acids are added in the correct order. Ribosomal RNA (rRNA) is the most abundant RNA in a cell and forms the structural scaffold and catalytic machinery of the ribosome itself. The large ribosomal subunit's rRNA is a ribozyme — it directly catalyzes the formation of peptide bonds between amino acids, without the help of any protein enzyme.`
  },
  {
    id: "para-transcription",
    heading: "Transcription: From DNA to RNA",
    body: `Transcription is the process of copying a gene's sequence from DNA into RNA. It begins when RNA polymerase II recognizes and binds a promoter region — a specific DNA sequence upstream of the gene, often containing a "TATA box" motif. The polymerase unwinds the double helix to expose a short single-stranded template. Reading the template strand in the 3'→5' direction, it synthesizes a complementary RNA strand in the 5'→3' direction, substituting uracil wherever it would have placed thymine in DNA. Transcription ends when the polymerase reaches a terminator sequence. In eukaryotes, the initial transcript (pre-mRNA) is extensively processed: a 7-methylguanosine cap is added to the 5' end (to protect RNA from degradation and aid ribosome binding), a poly-A tail of ~250 adenines is added to the 3' end (for export and stability), and spliceosome machinery removes non-coding intron sequences, joining the coding exons together. Only after this processing does the mature mRNA exit the nucleus.`
  },
  {
    id: "para-translation",
    heading: "Translation: From RNA to Protein",
    body: `Translation is the process of reading the mRNA sequence and using it as instructions to build a polypeptide. The ribosome assembles at the mRNA's 5' cap and scans until it reaches the start codon AUG, which codes for methionine. At this point, the initiator tRNA carrying methionine occupies the ribosome's P-site (peptidyl site). A second tRNA bearing the next amino acid enters the A-site (aminoacyl site). RNA polymerase — actually here the rRNA of the large subunit — catalyzes the formation of a peptide bond between the two amino acids, transferring the growing chain from the P-site tRNA to the A-site tRNA. The ribosome then translocates one codon along the mRNA, moving the chain-bearing tRNA from A to P, the empty tRNA from P to the E-site (exit site) where it leaves. This cycle repeats, adding one amino acid per codon, until a stop codon (UAA, UAG, or UGA) is reached and no amino acid-carrying tRNA can bind. Release factors trigger hydrolysis of the chain, liberating the newly synthesized polypeptide.`
  },
  {
    id: "para-noncoding",
    heading: "Non-Coding RNAs: Beyond Protein Synthesis",
    body: `Beyond mRNA, tRNA, and rRNA, cells produce a rich repertoire of non-coding RNAs that regulate gene expression at multiple levels. MicroRNAs (miRNAs) are ~22 nucleotide molecules that, when incorporated into the RISC (RNA-Induced Silencing Complex), bind to complementary sequences in mRNA 3' UTRs and either block translation or trigger mRNA degradation — fine-tuning gene output. Small interfering RNAs (siRNAs) work through a similar RISC mechanism and are heavily exploited in research and medicine to silence specific genes. Small nuclear RNAs (snRNAs) form part of the spliceosome and are essential for removing introns from pre-mRNA. The discovery of these regulatory RNAs has transformed our understanding of the genome: a large fraction of non-coding DNA is actively transcribed into functional RNA molecules, expanding our concept of how genetic information is controlled.`
  },
  {
    id: "para-rna-world",
    heading: "The RNA World and RNA's Central Role in Life",
    body: `RNA occupies a uniquely pivotal position in biology because it can both store genetic information (like DNA) and catalyze chemical reactions (like protein enzymes). This dual capability underpins the "RNA World" hypothesis — the idea that early life relied on RNA as the primary molecule of heredity and catalysis before proteins took over most enzymatic roles and DNA took over as the stable genetic archive. Today's ribosome is a molecular fossil of that ancient RNA world: at its core, it is an RNA machine, with proteins playing a mostly structural supporting role. Understanding RNA is therefore not just about understanding protein synthesis — it is about understanding the molecular origins of life itself.`
  }
];
function RNASection() {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "px-4 py-16 md:px-8 max-w-5xl mx-auto", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      SectionHeader,
      {
        topicId: "rna",
        title: "RNA: The Versatile Messenger",
        subtitle: "From transcription to translation — discover how RNA bridges DNA and proteins to make life possible."
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx(AnimatedEntrance, { direction: "fade", delay: 0.1, className: "mb-10", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
      SceneErrorBoundary,
      {
        sceneName: "RNA Structure 3D Model",
        sceneColor: "#a78bfa",
        children: /* @__PURE__ */ jsxRuntimeExports.jsx(
          reactExports.Suspense,
          {
            fallback: /* @__PURE__ */ jsxRuntimeExports.jsx(
              "div",
              {
                className: "rounded-2xl border flex items-center justify-center h-40",
                style: {
                  borderColor: "oklch(0.70 0.20 290 / 0.3)",
                  background: "oklch(0.16 0 0)"
                },
                children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col items-center gap-3", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "div",
                    {
                      className: "h-8 w-8 animate-spin rounded-full border-2 border-muted",
                      style: { borderTopColor: "oklch(0.70 0.20 290)" }
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: "Loading 3D model…" })
                ] })
              }
            ),
            children: /* @__PURE__ */ jsxRuntimeExports.jsx(RNAScene, {})
          }
        )
      }
    ) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      StaggerContainer,
      {
        staggerDelay: 0.12,
        className: "flex flex-col gap-6 mb-12",
        children: PARAGRAPHS.map((para) => /* @__PURE__ */ jsxRuntimeExports.jsx(StaggerItem, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "div",
          {
            className: "rounded-2xl border p-6",
            style: {
              borderColor: "oklch(0.70 0.20 290 / 0.2)",
              background: "oklch(0.17 0 0)"
            },
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-display text-xl font-bold mb-3 accent-dna", children: para.heading }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-base text-muted-foreground leading-relaxed", children: para.body })
            ]
          }
        ) }, para.id))
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx(AnimatedEntrance, { direction: "up", delay: 0.1, className: "mb-12", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid md:grid-cols-2 gap-5", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(TranscriptionDiagram, {}),
      /* @__PURE__ */ jsxRuntimeExports.jsx(TranslationDiagram, {})
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(AnimatedEntrance, { direction: "up", delay: 0.15, children: /* @__PURE__ */ jsxRuntimeExports.jsx(QuizEngine, { topicId: "rna", questions: RNA_QUIZ }) })
  ] });
}
export {
  RNASection as default
};
