import {
  AnimatedEntrance,
  StaggerContainer,
  StaggerItem,
} from "@/components/AnimatedEntrance";
import { QuizEngine } from "@/components/QuizEngine";
import { SceneErrorBoundary } from "@/components/SceneErrorBoundary";
import { SectionHeader } from "@/components/SectionHeader";
import type { QuizQuestion } from "@/types/biology";
import { Check, FlaskConical, Microscope, X } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { Suspense, useState } from "react";
import { CellScene } from "./CellScene";

// ─── Quiz questions ───────────────────────────────────────────────────────────
const QUIZ_QUESTIONS: QuizQuestion[] = [
  {
    id: "cell-q1",
    question:
      "Which organelle is known as the 'powerhouse of the cell' because it produces ATP?",
    options: ["Nucleus", "Golgi Apparatus", "Mitochondria", "Ribosome"],
    correctIndex: 2,
    explanation:
      "Mitochondria produce ATP through cellular respiration, converting glucose and oxygen into usable energy. This is why they are called the powerhouse of the cell.",
    topic: "cells",
  },
  {
    id: "cell-q2",
    question:
      "What is the main structural difference between prokaryotic and eukaryotic cells?",
    options: [
      "Prokaryotes are larger than eukaryotes",
      "Eukaryotes have a membrane-bound nucleus; prokaryotes do not",
      "Prokaryotes have mitochondria; eukaryotes do not",
      "Eukaryotes lack a cell membrane",
    ],
    correctIndex: 1,
    explanation:
      "The defining difference is that eukaryotic cells have a true nucleus enclosed in a membrane, while prokaryotic cells (like bacteria) have their genetic material freely floating in the cytoplasm.",
    topic: "cells",
  },
  {
    id: "cell-q3",
    question:
      "Which organelle is responsible for modifying, packaging, and shipping proteins?",
    options: ["Rough ER", "Smooth ER", "Golgi Apparatus", "Lysosome"],
    correctIndex: 2,
    explanation:
      "The Golgi apparatus acts as the cell's post office. It receives proteins from the endoplasmic reticulum, processes them, and directs them to their correct destinations inside or outside the cell.",
    topic: "cells",
  },
  {
    id: "cell-q4",
    question:
      "Which structure is found in plant cells but NOT in animal cells?",
    options: ["Nucleus", "Mitochondria", "Cell membrane", "Chloroplast"],
    correctIndex: 3,
    explanation:
      "Chloroplasts are unique to plant cells (and algae). They contain chlorophyll and carry out photosynthesis, converting light energy into glucose. Animal cells cannot perform photosynthesis.",
    topic: "cells",
  },
  {
    id: "cell-q5",
    question: "What is the function of ribosomes?",
    options: [
      "Store genetic information",
      "Produce ATP energy",
      "Synthesize proteins from mRNA instructions",
      "Digest cellular waste",
    ],
    correctIndex: 2,
    explanation:
      "Ribosomes are the cell's protein factories. They read messenger RNA (mRNA) sequences and assemble the corresponding chain of amino acids to build proteins.",
    topic: "cells",
  },
  {
    id: "cell-q6",
    question:
      "Which cell theory principle states that all existing cells come from pre-existing cells?",
    options: [
      "All organisms are made of cells",
      "The cell is the basic unit of life",
      "All cells arise from pre-existing cells (Biogenesis)",
      "Cells can spontaneously generate from non-living matter",
    ],
    correctIndex: 2,
    explanation:
      "This principle, called biogenesis, was proposed by Rudolf Virchow (1855). It means cells only come from cell division — life cannot arise spontaneously from non-living material.",
    topic: "cells",
  },
  {
    id: "cell-q7",
    question:
      "What unique structure do plant cells have that provides rigid structural support?",
    options: ["Cell membrane", "Cell wall", "Tonoplast", "Plasmalemma"],
    correctIndex: 1,
    explanation:
      "Plant cells have a rigid cell wall made of cellulose surrounding their membrane. It provides structural support and prevents the cell from bursting when it absorbs too much water.",
    topic: "cells",
  },
  {
    id: "cell-q8",
    question: "The lysosome's main function is to:",
    options: [
      "Produce energy via photosynthesis",
      "Synthesize lipids and hormones",
      "Digest waste materials, old organelles, and pathogens",
      "Control which substances enter and leave the cell",
    ],
    correctIndex: 2,
    explanation:
      "Lysosomes contain digestive enzymes that break down cellular waste products, worn-out organelles, and foreign invaders like bacteria. This recycling process is called autophagy.",
    topic: "cells",
  },
  {
    id: "cell-q9",
    question:
      "Which organelle organizes spindle fibers during cell division in animal cells?",
    options: ["Nucleus", "Centrosome", "Vacuole", "Golgi apparatus"],
    correctIndex: 1,
    explanation:
      "The centrosome (containing two centrioles) organizes the mitotic spindle during cell division. It is found in animal cells but absent in most plant cells, which use other mechanisms for spindle formation.",
    topic: "cells",
  },
  {
    id: "cell-q10",
    question: "What is the role of the rough endoplasmic reticulum (RER)?",
    options: [
      "Lipid synthesis and drug detoxification",
      "Protein synthesis and folding, studded with ribosomes",
      "ATP production via oxidative phosphorylation",
      "Photosynthesis using light energy",
    ],
    correctIndex: 1,
    explanation:
      "The rough ER gets its name from the ribosomes dotting its surface. These ribosomes synthesize proteins that are threaded into the ER lumen for folding, modification, and transport to the Golgi apparatus.",
    topic: "cells",
  },
];

// ─── Organelle comparison data ────────────────────────────────────────────────
interface OrgData {
  name: string;
  animal: boolean;
  plant: boolean;
  color: string;
}

const ORGANELLE_COMPARISON: OrgData[] = [
  { name: "Cell Membrane", animal: true, plant: true, color: "#4a90e2" },
  { name: "Nucleus", animal: true, plant: true, color: "#5c6bc0" },
  { name: "Mitochondria", animal: true, plant: true, color: "#ff7043" },
  { name: "Ribosomes", animal: true, plant: true, color: "#ffca28" },
  {
    name: "Endoplasmic Reticulum",
    animal: true,
    plant: true,
    color: "#ab47bc",
  },
  { name: "Golgi Apparatus", animal: true, plant: true, color: "#26a69a" },
  { name: "Lysosomes", animal: true, plant: false, color: "#ef5350" },
  { name: "Centrosome", animal: true, plant: false, color: "#66bb6a" },
  {
    name: "Cell Wall (cellulose)",
    animal: false,
    plant: true,
    color: "#8bc34a",
  },
  { name: "Chloroplasts", animal: false, plant: true, color: "#4caf50" },
  { name: "Central Vacuole", animal: false, plant: true, color: "#29b6f6" },
  { name: "Plasmodesmata", animal: false, plant: true, color: "#80cbc4" },
];

// ─── Explanation paragraphs ──────────────────────────────────────────────────
const PARAGRAPHS = [
  {
    heading: "Cell Theory: The Foundation of Biology",
    text: "The cell theory is one of the most fundamental unifying principles in all of biology. Developed in the mid-19th century through the work of Matthias Schleiden (1838) who studied plants, Theodor Schwann (1839) who studied animals, and Rudolf Virchow (1855) who contributed the principle of biogenesis, the modern cell theory rests on three pillars: all living organisms are composed of one or more cells; the cell is the basic structural and functional unit of life; and all cells arise only from pre-existing cells through cell division. This revolutionary framework dismantled the long-held belief in spontaneous generation and redirected biology toward studying the cell as the fundamental unit of life, rather than whole organisms. Understanding the cell is therefore the essential starting point for comprehending how any living system functions, grows, reproduces, and responds to its environment.",
    icon: "🔬",
    color: "oklch(0.68 0.19 262)",
  },
  {
    heading: "Prokaryotes vs. Eukaryotes: A Deep Structural Divide",
    text: "Cells fall into two fundamentally distinct categories based on their internal organization. Prokaryotic cells — found in bacteria and archaea — are structurally simpler: they lack a membrane-enclosed nucleus, instead keeping their circular DNA molecule in an area called the nucleoid. They have no membrane-bound organelles, are generally smaller (1–10 µm), and reproduce by binary fission. Eukaryotic cells, found in fungi, protists, plants, and animals, are structurally far more complex. They possess a true membrane-bound nucleus that houses linear chromosomes, contain an elaborate endomembrane system (ER, Golgi, vesicles), and house numerous specialized organelles such as mitochondria and, in plants, chloroplasts. The eukaryotic cell is typically 10–100 µm in size. This structural complexity enables eukaryotes to perform a far greater range of metabolic and developmental functions, ultimately making multicellular organisms possible.",
    icon: "🦠",
    color: "oklch(0.68 0.19 262)",
  },
  {
    heading: "Animal Cell Organelles: A Complete Tour",
    text: "The animal cell is a marvel of molecular organization. The nucleus, enclosed in a double membrane called the nuclear envelope, houses the cell's genome and coordinates gene expression. Within it, the nucleolus assembles ribosomal subunits. The rough endoplasmic reticulum (RER), studded with ribosomes, synthesizes and folds proteins for secretion or membrane insertion, while the smooth ER handles lipid biosynthesis, detoxification, and calcium storage. The Golgi apparatus receives proteins from the ER, modifies them with sugar chains, sorts them, and dispatches them in vesicles to their final destinations. Lysosomes, membranous bags of digestive enzymes, perform autophagy — digesting cellular debris and recycling molecular components. Mitochondria, the double-membraned power plants, carry out oxidative phosphorylation to generate ATP. The centrosome, containing two centrioles, orchestrates cell division by organizing the mitotic spindle. Ribosomes, free or bound, continuously translate mRNA into proteins. The entire cytoplasm is structured by a cytoskeleton of microtubules, actin filaments, and intermediate filaments, maintaining shape and enabling intracellular transport.",
    icon: "🧫",
    color: "oklch(0.68 0.19 262)",
  },
  {
    heading: "Plant Cells: Unique Adaptations for a Photosynthetic Life",
    text: "Plant cells share the core organelles of animal cells but contain several distinctive structures that reflect their sessile, photosynthetic lifestyle. The cellulose cell wall, external to the cell membrane, provides rigid structural support, prevents over-expansion during water uptake (turgor pressure), and contributes to the rigidity of plant tissues. Chloroplasts, the green double-membraned organelles containing thylakoid membrane stacks, carry out photosynthesis — capturing light energy to fix atmospheric CO₂ into glucose. They harbor their own DNA and ribosomes, reflecting their evolutionary origin as endosymbiotic cyanobacteria. The large central vacuole, often occupying up to 90% of mature plant cell volume, maintains turgor pressure, stores nutrients and waste products, and drives cell elongation during growth. Plasmodesmata, narrow membrane-lined channels traversing the cell wall between adjacent cells, enable direct cytoplasmic communication and molecular transport across cell boundaries — a plant-specific system with no animal equivalent.",
    icon: "🌿",
    color: "oklch(0.68 0.19 262)",
  },
  {
    heading: "Energy Production: Mitochondria and Cellular Respiration",
    text: "Every activity a cell performs — from muscle contraction to protein synthesis to ion pumping — requires a constant supply of energy in the form of adenosine triphosphate (ATP). Mitochondria are the primary ATP-generating factories in eukaryotic cells. They carry out aerobic cellular respiration across four interconnected stages: glycolysis (cytoplasm), pyruvate oxidation, the citric acid cycle (Krebs cycle), and oxidative phosphorylation via the electron transport chain (mitochondrial inner membrane). The electron transport chain pumps protons across the inner mitochondrial membrane, creating an electrochemical gradient that drives ATP synthase — often described as a molecular turbine — to synthesize ATP from ADP and phosphate. A single glucose molecule can yield approximately 30–32 ATP molecules through this complete process. Mitochondria replicate semi-autonomously, contain their own circular genome, and are transmitted maternally — evidence of their ancient bacterial ancestry, captured by an ancestral eukaryote in a pivotal event called endosymbiosis.",
    icon: "⚡",
    color: "oklch(0.68 0.19 262)",
  },
  {
    heading: "Protein Synthesis and Secretion: The Endomembrane Highway",
    text: "Cells continuously manufacture thousands of distinct proteins. For proteins destined for secretion, membrane insertion, or targeting to organelles, a highly coordinated pathway operates through the endomembrane system. Ribosomes on the rough ER synthesize these proteins co-translationally, threading the growing polypeptide into the ER lumen. Molecular chaperones within the ER assist in proper folding; misfolded proteins are flagged and degraded by the unfolded protein response. Correctly folded proteins are packaged into COPII vesicles that bud off to the Golgi apparatus. Within the Golgi stack, proteins are progressively modified — phosphorylated, glycosylated, and proteolytically cleaved — and sorted at the trans-Golgi network into vesicles bound for lysosomes, the plasma membrane, or secretory vesicles that fuse with the membrane to release cargo outside the cell. This entire process, called the secretory pathway, underlies the production of hormones, enzymes, antibodies, and extracellular matrix proteins.",
    icon: "🏭",
    color: "oklch(0.68 0.19 262)",
  },
  {
    heading: "Cell Division, Signaling, and the Boundary of Life",
    text: "The cell membrane is not simply a passive barrier — it is a dynamic, cholesterol-rich phospholipid bilayer embedded with hundreds of membrane proteins that carry out transport, signaling, adhesion, and structural functions. Signal transduction begins when extracellular ligands (hormones, growth factors, neurotransmitters) bind to membrane receptors, triggering cascades of intracellular events that alter gene expression or metabolism. Cell division itself is tightly regulated by these signals. During mitosis, the replicated chromosomes are separated with precision by spindle fibers anchored at centrosomes, ensuring each daughter cell receives an identical genome. Errors in this process lead to aneuploidy and can cause cancer. Programmed cell death (apoptosis) provides a counterbalance, eliminating damaged or unnecessary cells via controlled molecular demolition without triggering inflammation. Together, cell division, differentiation, migration, and apoptosis coordinate the development of a complex multicellular organism from a single fertilized egg — a process that remains one of the most astonishing phenomena in all of nature.",
    icon: "🔄",
    color: "oklch(0.68 0.19 262)",
  },
];

export default function CellsSection() {
  const [isPlant, setIsPlant] = useState(false);

  return (
    <section className="px-4 py-16 md:px-8">
      <div className="mx-auto max-w-5xl">
        <AnimatedEntrance direction="up">
          <SectionHeader
            topicId="cells"
            title="The Living Cell"
            subtitle="From the earliest cell theory to the intricate machinery inside every living organism — explore the fundamental unit of all life on Earth."
          />
        </AnimatedEntrance>

        {/* 3D Viewer */}
        <AnimatedEntrance direction="up" delay={0.15}>
          <div
            className="mb-12 overflow-hidden rounded-2xl border"
            style={{
              borderColor: "oklch(0.68 0.19 262 / 0.35)",
              background: "oklch(0.16 0.02 262)",
              boxShadow: "0 0 40px oklch(0.68 0.19 262 / 0.15)",
            }}
          >
            {/* Toggle header */}
            <div
              className="flex items-center justify-between gap-4 px-6 py-4 border-b"
              style={{
                borderColor: "oklch(0.68 0.19 262 / 0.2)",
                background: "oklch(0.17 0.02 262)",
              }}
            >
              <div className="flex items-center gap-3">
                <Microscope
                  className="h-5 w-5"
                  style={{ color: "oklch(0.68 0.19 262)" }}
                />
                <span className="font-display font-semibold text-foreground">
                  Interactive 3D Cell Model
                </span>
                <span
                  className="rounded-full px-2.5 py-0.5 text-xs font-medium"
                  style={{
                    background: "oklch(0.68 0.19 262 / 0.15)",
                    color: "oklch(0.68 0.19 262)",
                    border: "1px solid oklch(0.68 0.19 262 / 0.3)",
                  }}
                >
                  {isPlant ? "Plant Cell" : "Animal Cell"}
                </span>
              </div>

              {/* Toggle buttons */}
              <div
                className="flex rounded-xl p-1 gap-1"
                style={{ background: "oklch(0.20 0.01 262 / 0.6)" }}
              >
                <button
                  type="button"
                  onClick={() => setIsPlant(false)}
                  data-ocid="toggle-animal-cell"
                  className="rounded-lg px-4 py-1.5 text-sm font-medium transition-smooth"
                  style={
                    !isPlant
                      ? {
                          background: "oklch(0.68 0.19 262)",
                          color: "oklch(0.10 0 0)",
                        }
                      : { color: "oklch(0.60 0 0)" }
                  }
                >
                  Animal Cell
                </button>
                <button
                  type="button"
                  onClick={() => setIsPlant(true)}
                  data-ocid="toggle-plant-cell"
                  className="rounded-lg px-4 py-1.5 text-sm font-medium transition-smooth"
                  style={
                    isPlant
                      ? {
                          background: "oklch(0.55 0.18 142)",
                          color: "oklch(0.10 0 0)",
                        }
                      : { color: "oklch(0.60 0 0)" }
                  }
                >
                  Plant Cell
                </button>
              </div>
            </div>

            {/* Canvas */}
            <AnimatePresence mode="wait">
              <motion.div
                key={isPlant ? "plant" : "animal"}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.4 }}
              >
                <SceneErrorBoundary
                  sceneName={
                    isPlant ? "Plant Cell 3D Model" : "Animal Cell 3D Model"
                  }
                  sceneColor={isPlant ? "#86efac" : "#93c5fd"}
                >
                  <Suspense
                    fallback={
                      <div
                        className="flex items-center justify-center"
                        style={{ height: 520, background: "#080d2e" }}
                      >
                        <div className="h-8 w-8 animate-spin rounded-full border-2 border-muted border-t-primary" />
                      </div>
                    }
                  >
                    <CellScene isPlant={isPlant} />
                  </Suspense>
                </SceneErrorBoundary>
              </motion.div>
            </AnimatePresence>

            {/* Legend */}
            <div
              className="flex flex-wrap gap-3 px-6 py-4 border-t"
              style={{
                borderColor: "oklch(0.68 0.19 262 / 0.15)",
                background: "oklch(0.17 0.01 262)",
              }}
            >
              {[
                { color: "#4a90e2", label: "Nucleus" },
                { color: "#ff7043", label: "Mitochondria" },
                { color: "#ab47bc", label: "Rough ER" },
                { color: "#26a69a", label: "Golgi" },
                { color: "#ef5350", label: "Lysosome" },
                ...(isPlant
                  ? [
                      { color: "#4caf50", label: "Chloroplast" },
                      { color: "#80d8ff", label: "Central Vacuole" },
                    ]
                  : [{ color: "#66bb6a", label: "Centrosome" }]),
              ].map((item) => (
                <div key={item.label} className="flex items-center gap-1.5">
                  <div
                    className="h-2.5 w-2.5 rounded-full"
                    style={{ background: item.color }}
                  />
                  <span className="text-xs text-muted-foreground">
                    {item.label}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </AnimatedEntrance>

        {/* Explanation paragraphs */}
        <StaggerContainer
          className="mb-14 flex flex-col gap-8"
          staggerDelay={0.08}
        >
          {PARAGRAPHS.map((para) => (
            <StaggerItem key={para.heading}>
              <div
                className="rounded-2xl p-6 border"
                style={{
                  borderColor: "oklch(0.68 0.19 262 / 0.2)",
                  background: "oklch(0.17 0.015 262 / 0.6)",
                }}
              >
                <div className="flex items-center gap-3 mb-3">
                  <span className="text-2xl">{para.icon}</span>
                  <h3
                    className="font-display text-xl font-bold"
                    style={{ color: para.color }}
                  >
                    {para.heading}
                  </h3>
                </div>
                <p className="text-muted-foreground leading-relaxed text-[0.94rem]">
                  {para.text}
                </p>
              </div>
            </StaggerItem>
          ))}
        </StaggerContainer>

        {/* Organelle comparison table */}
        <AnimatedEntrance direction="up" delay={0.1}>
          <div className="mb-14">
            <div className="flex items-center gap-3 mb-6">
              <FlaskConical
                className="h-5 w-5"
                style={{ color: "oklch(0.68 0.19 262)" }}
              />
              <h3
                className="font-display text-2xl font-bold"
                style={{ color: "oklch(0.68 0.19 262)" }}
              >
                Animal vs. Plant Cell: Organelle Comparison
              </h3>
            </div>
            <div
              className="overflow-hidden rounded-2xl border"
              style={{ borderColor: "oklch(0.68 0.19 262 / 0.25)" }}
            >
              {/* Table header */}
              <div
                className="grid grid-cols-3 px-5 py-3 text-sm font-semibold"
                style={{ background: "oklch(0.20 0.03 262 / 0.8)" }}
              >
                <span className="text-foreground">Organelle</span>
                <span
                  className="text-center"
                  style={{ color: "oklch(0.68 0.19 262)" }}
                >
                  Animal Cell
                </span>
                <span
                  className="text-center"
                  style={{ color: "oklch(0.55 0.18 142)" }}
                >
                  Plant Cell
                </span>
              </div>

              {ORGANELLE_COMPARISON.map((row, i) => (
                <motion.div
                  key={row.name}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.04, duration: 0.4 }}
                  className="grid grid-cols-3 px-5 py-3 border-t items-center transition-smooth hover:brightness-110"
                  style={{
                    borderColor: "oklch(0.68 0.19 262 / 0.12)",
                    background:
                      i % 2 === 0
                        ? "oklch(0.17 0.01 262 / 0.5)"
                        : "oklch(0.18 0.005 262 / 0.3)",
                  }}
                  data-ocid={`organelle-row-${row.name.toLowerCase().replace(/\s+/g, "-")}`}
                >
                  <div className="flex items-center gap-2">
                    <div
                      className="h-2 w-2 rounded-full shrink-0"
                      style={{ background: row.color }}
                    />
                    <span className="text-sm text-foreground">{row.name}</span>
                  </div>
                  <div className="flex justify-center">
                    {row.animal ? (
                      <Check
                        className="h-4 w-4"
                        style={{ color: "oklch(0.68 0.19 262)" }}
                      />
                    ) : (
                      <X className="h-4 w-4 text-muted-foreground opacity-30" />
                    )}
                  </div>
                  <div className="flex justify-center">
                    {row.plant ? (
                      <Check
                        className="h-4 w-4"
                        style={{ color: "oklch(0.55 0.18 142)" }}
                      />
                    ) : (
                      <X className="h-4 w-4 text-muted-foreground opacity-30" />
                    )}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </AnimatedEntrance>

        {/* Quiz */}
        <AnimatedEntrance direction="up" delay={0.1}>
          <QuizEngine topicId="cells" questions={QUIZ_QUESTIONS} />
        </AnimatedEntrance>
      </div>
    </section>
  );
}
