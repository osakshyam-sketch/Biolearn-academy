import {
  AnimatedEntrance,
  StaggerContainer,
  StaggerItem,
} from "@/components/AnimatedEntrance";
import { QuizEngine } from "@/components/QuizEngine";
import { SceneErrorBoundary } from "@/components/SceneErrorBoundary";
import { SectionHeader } from "@/components/SectionHeader";
import type { QuizQuestion } from "@/types/biology";
import { FlaskConical, Microscope } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { Suspense, useState } from "react";
import { CellScene } from "./CellScene";

// ─── Quiz questions ───────────────────────────────────────────────────────────
const QUIZ_QUESTIONS: QuizQuestion[] = [
  {
    id: "cell-q1",
    question:
      "What is the structural difference between Gram-positive and Gram-negative bacteria, and why does it matter clinically?",
    options: [
      "Gram-positive bacteria have flagella; Gram-negative do not",
      "Gram-positive bacteria have a thick peptidoglycan wall and no outer membrane; Gram-negative have a thin peptidoglycan layer plus an outer membrane containing lipopolysaccharide (LPS)",
      "Gram-positive bacteria are eukaryotic; Gram-negative are prokaryotic",
      "Gram-positive bacteria have chloroplasts; Gram-negative bacteria do not",
    ],
    correctIndex: 1,
    explanation:
      "This distinction matters enormously in medicine. Gram-positive bacteria (like Staphylococcus, Streptococcus) stain purple because their thick peptidoglycan wall traps the crystal violet dye. Gram-negative bacteria (like E. coli, Salmonella) stain pink/red — their thin peptidoglycan plus an outer membrane containing LPS causes the dye to wash out. That outer membrane is a permeability barrier that makes many antibiotics less effective against Gram-negative bacteria. LPS is also a potent activator of the innate immune system — responsible for the dangerous septic shock response in serious Gram-negative infections.",
    topic: "cells",
  },
  {
    id: "cell-q2",
    question:
      "The endosymbiotic theory proposes that mitochondria (and chloroplasts) were once free-living bacteria. Which of the following is NOT evidence for this?",
    options: [
      "Mitochondria have their own circular DNA encoding 13 proteins",
      "Mitochondria divide by binary fission, independent of the cell cycle",
      "Mitochondria are enclosed by two membranes, with the inner membrane resembling a bacterial plasma membrane",
      "Mitochondria are found only in plant cells, not in animal cells",
    ],
    correctIndex: 3,
    explanation:
      "Mitochondria are found in virtually all eukaryotic cells — both plant and animal. The other three options are genuine evidence for endosymbiosis: mitochondria have their own circular DNA (like bacteria), they replicate by binary fission (like bacteria), and their double membrane structure reflects their origin — the inner membrane is the original bacterial membrane, and the outer membrane came from the host cell that engulfed them. Chloroplasts in plant cells show the same pattern, suggesting both organelles were independent bacteria that entered into a mutually beneficial relationship with a host cell about 1.5–2 billion years ago.",
    topic: "cells",
  },
  {
    id: "cell-q3",
    question:
      "During the cell cycle, what is the role of cyclin-CDK complexes at checkpoints?",
    options: [
      "They synthesize new DNA at origins of replication",
      "They are regulatory protein complexes that phosphorylate target proteins to advance the cell through G1/S, G2/M, and M checkpoints — ensuring conditions are right before each transition",
      "They degrade misfolded proteins via the proteasome pathway",
      "They transport chromosomes to the poles during mitosis",
    ],
    correctIndex: 1,
    explanation:
      "Cyclins are proteins whose levels rise and fall during the cell cycle; CDKs (cyclin-dependent kinases) are always present but inactive without their cyclin partner. When a cyclin accumulates and binds its CDK, the complex phosphorylates target proteins that push the cell into the next phase. The G1/S checkpoint ('restriction point') is the most important — it's where the cell decides whether conditions are adequate to commit to division. If DNA is damaged or nutrients are insufficient, the checkpoint halts progression. Tumor suppressor genes like p53 and Rb are critical checkpoint regulators — their loss in cancer allows cells to divide without adequate oversight, which is a core mechanism of tumor development.",
    topic: "cells",
  },
  {
    id: "cell-q4",
    question:
      "What are the phases of mitosis in order, and what key event distinguishes anaphase from metaphase?",
    options: [
      "Prophase → Metaphase → Anaphase → Telophase; in anaphase sister chromatids separate and move to opposite poles",
      "Metaphase → Prophase → Anaphase → Telophase; in anaphase spindle fibers form",
      "Prophase → Anaphase → Metaphase → Telophase; in anaphase chromosomes align at the equator",
      "Prophase → Metaphase → Anaphase → Cytokinesis; telophase is skipped in most cells",
    ],
    correctIndex: 0,
    explanation:
      "Here's a mnemonic many students use: PMAT — Prophase, Metaphase, Anaphase, Telophase. In prophase, chromosomes condense and the spindle begins to form. In metaphase, chromosomes line up at the metaphase plate — this alignment is essential; the spindle assembly checkpoint won't let the cell proceed until every chromosome is properly attached. In anaphase, the cohesin bonds holding sister chromatids together are cleaved by separase, and the chromatids are pulled to opposite poles. Telophase sees nuclear envelopes reform and chromosomes decondense. Cytokinesis (cytoplasm division) overlaps with telophase — an animal cell pinches in with a cleavage furrow; a plant cell builds a new cell plate.",
    topic: "cells",
  },
  {
    id: "cell-q5",
    question: "What is the fluid mosaic model of membrane structure?",
    options: [
      "The membrane is a rigid, static layer of phospholipids with proteins permanently fixed in place",
      "The membrane is a fluid phospholipid bilayer in which proteins float laterally, consistent with different lipid and protein compositions in different membrane regions",
      "The membrane is made entirely of proteins with lipids scattered within them",
      "The membrane is a crystalline structure that changes phase only at extreme temperatures",
    ],
    correctIndex: 1,
    explanation:
      "Proposed by Singer and Nicolson in 1972, the fluid mosaic model describes the membrane as a dynamic bilayer. 'Fluid' because phospholipids and proteins can move laterally within their leaflet — some proteins diffuse rapidly, others are anchored to the cytoskeleton or clustered in lipid rafts. 'Mosaic' because the membrane is a patchwork of different lipid and protein types. Cholesterol moderates fluidity: too much makes it gel-like; too little makes it excessively permeable. Integral proteins (transmembrane or monotopic) are embedded in the bilayer; peripheral proteins attach to the surface. This model explained how membrane proteins can be enzyme, receptor, channel, and structural anchor all at once.",
    topic: "cells",
  },
  {
    id: "cell-q6",
    question:
      "How does receptor-mediated endocytosis differ from phagocytosis?",
    options: [
      "Receptor-mediated endocytosis is used for large particles like bacteria; phagocytosis is for small molecules",
      "Receptor-mediated endocytosis uses clathrin-coated pits to selectively internalize specific molecules bound to surface receptors; phagocytosis involves actin-driven engulfment of large particles",
      "Both are identical processes that differ only in the type of vesicle formed",
      "Receptor-mediated endocytosis requires ATP; phagocytosis does not",
    ],
    correctIndex: 1,
    explanation:
      "These are both forms of endocytosis but serve very different purposes. Receptor-mediated endocytosis (RME) is highly selective — LDL cholesterol, iron-loaded transferrin, and many hormones use it. Specific receptors cluster in clathrin-coated pits; when a ligand binds, the pit invaginates into a clathrin-coated vesicle, which delivers its cargo to early endosomes. Phagocytosis ('cell eating') is used by macrophages and neutrophils to engulf large targets — bacteria, dead cells, foreign particles. Actin polymerization drives the cell to extend pseudopodia that wrap around the target. Pinocytosis ('cell drinking') is non-selective uptake of extracellular fluid and dissolved solutes.",
    topic: "cells",
  },
  {
    id: "cell-q7",
    question:
      "What unique features does the central vacuole of plant cells provide?",
    options: [
      "It performs photosynthesis and is the primary energy organelle in plant cells",
      "It can occupy up to 90% of a mature plant cell's volume, maintains turgor pressure for structural support, stores nutrients and waste products, and drives cell elongation during growth",
      "It divides independently of the cell cycle to produce new plant cells",
      "It synthesizes cellulose for the cell wall",
    ],
    correctIndex: 1,
    explanation:
      "The central vacuole is one of the most fascinating organelles in plant biology. It's enclosed by the tonoplast membrane and can fill up to 90% of mature cell volume — pushing the cytoplasm and organelles against the cell wall. This creates turgor pressure, which is why plants stand upright without a skeleton. Wilting occurs when vacuoles lose water (lose turgor). The vacuole stores toxic secondary metabolites that deter herbivores (like nicotine in tobacco, or glucosinolates in cabbage), stores nutrients like sucrose and calcium, and can contain pigments (anthocyanins) that color flowers and fruits. When a plant cell elongates during growth, it's primarily the vacuole expanding with water — much more energy-efficient than synthesizing new cytoplasm.",
    topic: "cells",
  },
  {
    id: "cell-q8",
    question:
      "What are the three types of cytoskeletal filaments and their primary functions?",
    options: [
      "Microfilaments (actin), intermediate filaments (various proteins), microtubules (tubulin) — for movement/shape, mechanical strength, and intracellular transport/cell division respectively",
      "Microfilaments (tubulin), macrofilaments (actin), megafilaments (keratin) — all for structural support",
      "Alpha filaments, beta filaments, gamma filaments — only found in muscle cells",
      "Only microtubules exist; the other 'filaments' are actually membrane structures",
    ],
    correctIndex: 0,
    explanation:
      "The cytoskeleton is a dynamic three-component system. Microfilaments (7 nm diameter, made of actin) form the cortex beneath the plasma membrane, drive cell movement via actin polymerization, and power muscle contraction (with myosin). Intermediate filaments (~10 nm, with tissue-specific proteins: vimentin in fibroblasts, keratins in epithelial cells, neurofilaments in neurons, lamins in the nuclear envelope) provide mechanical resistance to stretch — they don't actively move but resist deformation. Microtubules (25 nm, alpha/beta tubulin heterodimers) radiate from the centrosome and serve as highways for kinesin (carries cargo toward the plus end) and dynein (carries cargo toward the minus end/centrosome). Microtubules also form the mitotic spindle. All three filament types are dynamic — constantly polymerizing and depolymerizing.",
    topic: "cells",
  },
  {
    id: "cell-q9",
    question: "What is autophagy and why is it important for cellular health?",
    options: [
      "Autophagy is programmed cell death (apoptosis) triggered by DNA damage",
      "Autophagy is the cell's self-cleaning process where damaged organelles, misfolded proteins, and excess components are sequestered in autophagosomes and delivered to lysosomes for degradation and recycling",
      "Autophagy is the synthesis of new organelles from pre-existing membrane components",
      "Autophagy is the selective degradation of mRNA by the RNA-induced silencing complex (RISC)",
    ],
    correctIndex: 1,
    explanation:
      "Autophagy (Greek: 'self-eating') is one of the cell's most important quality-control mechanisms. When organelles become damaged, proteins misfold and aggregate, or nutrients are scarce, the cell can sequester these components in a double-membrane vesicle called an autophagosome, which then fuses with a lysosome. The lysosomal hydrolases break down the contents into reusable building blocks — amino acids, fatty acids, sugars — recycled into new components. Mitophagy specifically removes damaged mitochondria. Autophagy dysregulation is implicated in Parkinson's disease (failure to clear alpha-synuclein aggregates), Alzheimer's disease, cancer, and aging. Interestingly, caloric restriction and fasting powerfully induce autophagy — one proposed mechanism behind their longevity benefits.",
    topic: "cells",
  },
  {
    id: "cell-q10",
    question:
      "How do plasmodesmata in plant cells compare functionally to gap junctions in animal cells?",
    options: [
      "Plasmodesmata carry electrical signals; gap junctions carry nutrients",
      "Both are cell-to-cell communication channels that allow direct cytoplasmic connection between adjacent cells, permitting passage of small molecules, ions, and signaling molecules without crossing a membrane",
      "Plasmodesmata are only found in root cells; gap junctions only in heart cells",
      "Plasmodesmata are membrane-free channels; gap junctions are made of integral membrane proteins called connexins",
    ],
    correctIndex: 1,
    explanation:
      "The functional analogy is beautiful: both plasmodesmata and gap junctions create direct cytoplasmic continuity between neighboring cells. Plant plasmodesmata are membrane-lined channels (40–50 nm diameter) perforating the cell wall, often containing a strand of ER called the desmotubule. They let cells share water, sugars, amino acids, hormones, and even regulatory proteins and RNA — coordinating the entire plant body without a nervous system. Animal gap junctions are assemblies of connexin proteins forming hydrophilic channels (~1.5 nm diameter) between cells — critical for cardiac muscle coordination (electrical coupling), liver metabolite sharing, and lens fiber cell communication. Both systems can be regulated to open or close in response to conditions like Ca²⁺ levels or pH.",
    topic: "cells",
  },
];

// ─── Organelle comparison data ────────────────────────────────────────────────
interface OrgData {
  name: string;
  animal: string;
  plant: string;
  color: string;
}

const ORGANELLE_COMPARISON: OrgData[] = [
  {
    name: "Cell Membrane",
    animal: "Present — lipid bilayer regulates transport",
    plant: "Present — inside the rigid cell wall",
    color: "#4a90e2",
  },
  {
    name: "Nucleus",
    animal: "Present — double-membraned, holds chromosomes",
    plant: "Present — same structure, often displaced by vacuole",
    color: "#5c6bc0",
  },
  {
    name: "Mitochondria",
    animal: "Present — ATP via aerobic respiration",
    plant: "Present — also produces ATP alongside chloroplasts",
    color: "#ff7043",
  },
  {
    name: "Ribosomes",
    animal: "Present — free and on rough ER",
    plant: "Present — also inside chloroplasts (70S type)",
    color: "#e6a817",
  },
  {
    name: "Rough ER",
    animal: "Present — protein synthesis & folding",
    plant: "Present — same function",
    color: "#ab47bc",
  },
  {
    name: "Golgi Apparatus",
    animal: "Present — modifies and sorts proteins",
    plant: "Present — also makes cell wall polysaccharides",
    color: "#26a69a",
  },
  {
    name: "Lysosomes",
    animal: "Present — digests waste & pathogens",
    plant: "Vacuole takes over this role (has hydrolytic enzymes)",
    color: "#ef5350",
  },
  {
    name: "Centrosome",
    animal: "Present — organizes mitotic spindle",
    plant: "Absent in most — other mechanisms organize spindle",
    color: "#66bb6a",
  },
  {
    name: "Cell Wall (cellulose)",
    animal: "Absent — only plasma membrane boundary",
    plant: "Present — cellulose microfibrils for rigidity & turgor",
    color: "#8bc34a",
  },
  {
    name: "Chloroplasts",
    animal: "Absent — animals can't photosynthesize",
    plant: "Present — converts light to glucose (photosynthesis)",
    color: "#4caf50",
  },
  {
    name: "Central Vacuole",
    animal: "Small vacuoles only (endosomes, lysosomes)",
    plant: "Present — up to 90% of cell volume; turgor pressure",
    color: "#29b6f6",
  },
  {
    name: "Plasmodesmata",
    animal: "Absent — gap junctions serve similar role",
    plant: "Present — channels through cell walls for communication",
    color: "#80cbc4",
  },
];

// ─── Explanation paragraphs ──────────────────────────────────────────────────
const PARAGRAPHS = [
  {
    anchorId: "cells-cell-theory",
    heading: "Cell Theory: Three Ideas That Redirected All of Biology",
    text: "In the mid-1800s, three scientists made a discovery that reshaped everything we understood about living organisms: everything alive is made of cells. Matthias Schleiden showed it for plants (1838), Theodor Schwann confirmed it for animals (1839), and Rudolf Virchow added the crucial clincher in 1855: 'Omnis cellula e cellula' — all cells come from pre-existing cells. No spontaneous generation. Life comes from life. These three pillars became cell theory, and they remain the foundation of everything we know about how organisms grow, reproduce, and function. The cell is simultaneously the simplest unit of life and a system of staggering complexity — a lesson that humbles even the most seasoned cell biologists.",
    icon: "🔬",
  },
  {
    anchorId: "cells-prokaryotic",
    heading:
      "Prokaryotes: Bacteria vs. Archaea — Not All Prokaryotes Are Alike",
    text: "Prokaryotic cells lack a membrane-bound nucleus and most internal organelles — but don't let their simplicity fool you. They're the most metabolically diverse organisms on Earth. The two domains of prokaryotes, Bacteria and Archaea, were only distinguished as deeply separate lineages in the 1970s when Carl Woese compared 16S ribosomal RNA sequences and found that Archaea are more closely related to eukaryotes than to Bacteria. That was a genuinely shocking result that reorganized the entire tree of life.\n\nBacteria are defined by peptidoglycan cell walls, ester-linked fatty acid membrane lipids, and standard 70S ribosomes sensitive to antibiotics like erythromycin and streptomycin. Gram staining distinguishes two major structural groups: Gram-positive bacteria (Staphylococcus, Streptococcus, Bacillus, Clostridium) have thick peptidoglycan walls that retain crystal violet dye, staining purple. Gram-negative bacteria (E. coli, Salmonella, Pseudomonas, Helicobacter pylori) have a thin peptidoglycan layer sandwiched between an inner plasma membrane and an outer membrane containing lipopolysaccharide (LPS). The outer membrane is both a permeability barrier and a potent immune trigger — LPS activates Toll-like receptor 4 and drives the cytokine storm of septic shock. Many bacteria also carry flagella (for motility via a rotary motor driven by the proton gradient), pili (for attachment and conjugation), fimbriae (for adhesion), and a polysaccharide capsule (to evade phagocytosis). The nucleoid region contains a single circular chromosome (~4.6 Mb in E. coli), and most bacteria also carry plasmids — small, extra circular DNA carrying accessory genes like antibiotic resistance.\n\nArchaea look superficially similar to bacteria but differ in three fundamental ways. First, their membrane lipids use ether linkages (not ester) between glycerol and isoprenoid chains (not fatty acids) — a more heat-stable connection. Second, their cell walls, when present, are made of pseudopeptidoglycan or other polymers — not the peptidoglycan that antibiotics target, which is why archaea are inherently resistant to most antibacterial antibiotics. Third, their gene expression machinery (RNA polymerase, transcription factors, ribosomes) is more similar to eukaryotes than to bacteria. Many archaea thrive in extreme environments: methanogens (Methanobacterium) live in anaerobic swamps and animal guts producing methane; halophiles (Halobacterium) colonize salt lakes so saturated they crystallize; thermophiles and hyperthermophiles (Sulfolobus, Pyrococcus) grow near volcanic vents at temperatures exceeding 100°C; acidophiles thrive at pH near 1. But not all archaea are extremophiles — methanogens in your gut and in wetlands are ecologically critical for global carbon cycling.",
    icon: "🦠",
  },
  {
    anchorId: "cells-organelles",
    heading: "The Eukaryotic Nucleus: More Than Just a DNA Container",
    text: "The eukaryotic nucleus is defined by its double-membrane envelope — the outer layer connected to the rough ER, the inner layer lining the nuclear lamina (a scaffold of lamin intermediate filaments that supports nuclear shape and anchors chromatin). Nuclear pore complexes (NPCs) dot the envelope — each is a ~120 MDa protein machine built from ~30 different nucleoporin proteins that mediates all traffic in and out of the nucleus: mRNA and ribosomal subunits exit; proteins (transcription factors, histones, DNA polymerases, RNA polymerases) enter, guided by nuclear localization signals (NLS) recognized by importin proteins. Small molecules can diffuse freely through the pore; large macromolecules require active, signal-mediated transport.\n\nInside, DNA wraps around histone octamers (H2A, H2B, H3, H4 forming the core; H1 as the linker histone) to form nucleosomes — the basic unit of chromatin compaction. Chromatin exists in two states: euchromatin (loosely packed, transcriptionally active) where genes are accessible to transcription factors and RNA polymerase II; and heterochromatin (tightly packed, largely silenced) concentrated at centromeres, telomeres, and inactive X chromosomes. The nucleolus is a distinct sub-compartment within the nucleus (not membrane-bounded) where ribosomal RNA genes are transcribed by RNA Pol I and the two ribosomal subunits (40S and 60S in eukaryotes) are pre-assembled. When cells prepare to divide, the nucleus disassembles — the lamina depolymerizes (triggered by CDK1-cyclin B phosphorylating lamins), chromosomes condense, and the nuclear envelope breaks down (in most animals) to allow spindle access during 'open mitosis.'",
    icon: "🔵",
  },
  {
    anchorId: "cells-mitochondria",
    heading: "Mitochondria: Your Body's Miniature Power Plants",
    text: "Every movement, every thought, every active transport event in your body runs on ATP — and most of it is made in mitochondria. These double-membraned organelles run aerobic respiration in interconnected stages: glycolysis in the cytoplasm produces pyruvate; pyruvate is imported into the mitochondrial matrix via the mitochondrial pyruvate carrier, where pyruvate dehydrogenase converts it to acetyl-CoA (releasing CO₂ and NADH); the citric acid cycle oxidizes acetyl-CoA through eight enzymatic steps, generating 3 NADH, 1 FADH₂, and 1 GTP per turn; and the electron transport chain (Complexes I–IV embedded in the inner membrane's cristae) transfers electrons from NADH and FADH₂ to molecular oxygen, pumping H⁺ ions across the inner membrane to build a proton gradient. That proton-motive force drives ATP synthase (Complex V) — a magnificent molecular rotary motor — to synthesize ATP from ADP and inorganic phosphate. One glucose molecule can yield approximately 30–32 ATP through this complete pathway.\n\nHere's the part that never gets old: mitochondria have their own circular DNA (mtDNA, ~16.5 kb in humans encoding 13 respiratory chain proteins, 22 tRNAs, and 2 rRNAs), their own 70S-like ribosomes, and they divide by binary fission independent of the cell cycle — all hallmarks of their bacterial ancestry. The endosymbiotic theory, championed by Lynn Margulis, proposes that about 2 billion years ago an ancestral alpha-proteobacterium was engulfed by a host archaeal cell and the relationship became mutually dependent. Over evolutionary time, most bacterial genes migrated to the host nucleus — which is why the current mitochondrial genome encodes only a tiny fraction of the ~1,500 proteins that mitochondria require. Mitochondrial DNA is maternally inherited in most species (the sperm's mitochondria are selectively destroyed after fertilization), making mtDNA a valuable marker for tracing maternal ancestry and population migrations.",
    icon: "⚡",
  },
  {
    anchorId: "cells-endomembrane",
    heading: "The Endomembrane System: The Cell's Internal Postal Service",
    text: "The rough ER, smooth ER, Golgi apparatus, lysosomes, and secretory vesicles aren't isolated organelles — they're a connected highway of membranes and vesicles that synthesize, process, package, and route cellular products. It's a coordinated postal system with its own sorting codes, quality control checkpoints, and delivery vehicles.\n\nRough ER is studded with ribosomes that co-translationally insert newly synthesized membrane and secretory proteins into the ER lumen, where molecular chaperones (BiP/GRP78) assist folding and N-linked glycosylation is added. Misfolded proteins trigger the unfolded protein response (UPR), a signaling pathway that either helps restore folding capacity or triggers apoptosis if the load is too great. Correctly folded proteins are packaged into COPII-coated vesicles and shipped to the Golgi. The smooth ER (lacking ribosomes) synthesizes phospholipids and cholesterol for membrane biogenesis, detoxifies drugs and lipid-soluble toxins via cytochrome P450 enzymes (particularly in liver hepatocytes), and sequesters calcium ions for signaling (released in response to IP₃, a second messenger).\n\nProteins traveling through the Golgi pass through cis (entry), medial, and trans (exit) cisternae, receiving sequential processing: N-linked glycans are trimmed and rebuilt; O-linked glycans are added; mannose-6-phosphate tags direct enzymes to lysosomes; proteolytic cleavage activates some proteins. The trans-Golgi network is the master sorting hub — vesicles depart for the plasma membrane (constitutive or regulated secretion), secretory granules (in specialized cells), or lysosomes. Lysosomes are acidic (pH ~4.8) organelles packed with ~60 hydrolytic enzymes that digest internalized material, damaged organelles (autophagy), and foreign bodies. Lysosomal storage diseases arise when specific hydrolases are absent: Gaucher's disease (glucocerebrosidase deficiency), Tay-Sachs (hexosaminidase A deficiency), and Pompe disease (acid alpha-glucosidase deficiency) all cause toxic substrate accumulation with severe consequences.",
    icon: "📦",
  },
  {
    anchorId: "cells-chloroplasts",
    heading: "Chloroplasts: Where the Sun Feeds the World",
    text: "Chloroplasts are the solar panels and food factories of plant cells, and their story is just as remarkable as mitochondria. Like mitochondria, they arose via endosymbiosis — this time from an ancient cyanobacterium engulfed by an early eukaryote. Evidence: they have their own circular DNA (~150 kb encoding ~80 proteins in most plants), 70S ribosomes, and divide by binary fission. Their three-membrane system (outer envelope, inner envelope, and internal thylakoid membranes) reflects this layered history.\n\nThylakoid membranes are organized into stacked discs called grana, connected by unstacked lamellae. In the thylakoids, the light-dependent reactions occur: photosystem II (P680) absorbs photons and splits water (releasing O₂ as a byproduct — the oxygen you breathe comes from this reaction), passing electrons along a transport chain to photosystem I (P700), which uses them to reduce NADP⁺ to NADPH. The electron flow also pumps H⁺ across the thylakoid membrane, driving ATP synthase to produce ATP. In the surrounding stroma (chloroplast fluid), the Calvin cycle (light-independent reactions) uses that ATP and NADPH to fix atmospheric CO₂ into three-carbon sugars via the enzyme RuBisCO — the most abundant enzyme on Earth. Those sugars are the entry point for almost all the fixed carbon in the biosphere. No chloroplasts: no photosynthesis; no photosynthesis: no O₂ in the atmosphere; no O₂: no aerobic life. They are, quite literally, the reason we exist.",
    icon: "🌱",
  },
  {
    anchorId: "cells-plant-cells",
    heading: "Plant Cells: Built for a Different Life",
    text: "Plant cells carry all the standard eukaryotic equipment, but they've added extras that reflect their lifestyle as photosynthetic, stationary organisms. The cellulose cell wall sits outside the membrane — rigid microfibrils of beta-1,4-linked glucose provide extraordinary tensile strength, preventing osmotic bursting and allowing turgor pressure to maintain structural support without a skeleton. Cell walls are dynamic: primary walls (thin, flexible) allow growth; secondary walls (thicker, sometimes lignified) provide woody strength in trees. Plasmodesmata — 40–50 nm channels through adjacent cell walls, lined with plasma membrane and often containing a desmotubule of ER — connect neighboring cells into a symplastic continuum, allowing water, sugars, amino acids, hormones, and even regulatory RNAs to move between cells without crossing a membrane. This is how plants coordinate organ-level responses without a nervous system.\n\nThe central vacuole dominates mature plant cells, often filling 80–90% of cell volume. Enclosed by the tonoplast membrane, it maintains turgor pressure by osmotically drawing water in — the mechanical force that keeps leaves rigid and flowers upright. When a plant wilts, it's the vacuoles losing water. The vacuole also stores toxic secondary metabolites (nicotine, glucosinolates, alkaloids, tannins) that deter herbivores; accumulates waste products the plant can't excrete; stores nutrients like sucrose, calcium, and potassium; and contains pigments (anthocyanins) responsible for the red, blue, and purple colors of many flowers and fruits. During cell elongation (driven by the plant hormone auxin), the vacuole expands with water — a much more energy-efficient way to grow than synthesizing new cytoplasm.",
    icon: "🌿",
  },
  {
    anchorId: "cells-transport",
    heading: "Cell Transport: Getting the Right Things In and Out",
    text: "The cell membrane is not a passive wall — it's a highly selective barrier that actively manages which molecules enter and exit. Understanding the mechanisms of transport is understanding how cells maintain their internal environment, a process called homeostasis.\n\nPassive diffusion works for small nonpolar molecules (O₂, CO₂, N₂, fatty acids, steroid hormones) and small uncharged molecules (ethanol, urea) — they simply dissolve through the lipid bilayer down their concentration gradient, requiring no energy. The rate depends on the molecule's size, polarity, and the concentration gradient. Water crosses membranes primarily through aquaporin channels (specific channel proteins) rather than directly through the bilayer — osmosis. Facilitated diffusion uses integral membrane proteins to move specific molecules down their concentration gradient without energy: channel proteins (ion channels gated by voltage or ligands — like the voltage-gated Na⁺ channel that generates nerve impulses) provide water-filled pores; carrier proteins (like GLUT glucose transporters that change conformation to move glucose into cells) alternate between open and closed conformations. Both are still passive, just faster and more selective.\n\nActive transport uses energy (usually ATP) to move molecules against their concentration gradient. The Na⁺/K⁺ ATPase (also called the sodium-potassium pump) is the classic example: for every ATP hydrolyzed, it pumps 3 Na⁺ out and 2 K⁺ in — against both their concentration gradients. This net outward positive charge drives the resting membrane potential of neurons and muscles. Secondary active transport cleverly couples two gradients: the Na⁺/glucose cotransporter in intestinal cells and kidney tubules uses the downhill Na⁺ gradient (maintained by the Na⁺/K⁺ pump) to simultaneously import glucose against its own gradient. Endocytosis brings material in via membrane vesicles: phagocytosis engulfs large particles (bacteria, dead cells); pinocytosis non-selectively imports extracellular fluid; receptor-mediated endocytosis (via clathrin-coated pits) selectively internalizes specific ligand-receptor complexes (LDL, transferrin, insulin). Exocytosis releases vesicle contents outside — either constitutively (as in ER-to-Golgi trafficking) or regulated (as in neurotransmitter release from synaptic vesicles triggered by calcium influx).",
    icon: "🔄",
  },
  {
    anchorId: "cells-division",
    heading: "Cell Division: Mitosis, the Cell Cycle, and Its Checkpoints",
    text: "Every time a cell divides, it must copy its entire genome accurately and distribute one complete copy to each daughter cell. This is a remarkable feat of molecular choreography — and the machinery that controls it is one of the most tightly regulated systems in biology.\n\nThe cell cycle has four phases: G1 (first gap — growth, protein synthesis, preparation for DNA replication), S (synthesis — the entire ~3 billion base pair genome is replicated, beginning at thousands of origins of replication simultaneously), G2 (second gap — further growth, repair of any replication errors, preparation for division), and M (mitosis + cytokinesis). Quiescent cells exit the cycle into G0 — most neurons and muscle cells stay there permanently. Cells re-enter the cycle from G0/G1 in response to growth factor signaling.\n\nCheckpoints are molecular security stations that verify conditions before proceeding. The G1/S checkpoint ('restriction point' in mammals) is the most critical: the Rb protein binds and inhibits E2F transcription factors (which drive S-phase gene expression) until mitogenic signals cause cyclin D to accumulate, activate CDK4/6, phosphorylate Rb, release E2F, and commit the cell to division. Once past this point, the cell proceeds regardless of growth factor levels. The G2/M checkpoint (monitored by CDK1-cyclin B, activated by Cdc25 phosphatase) verifies DNA replication is complete and DNA damage is repaired before entering mitosis. The spindle assembly checkpoint (SAC) holds cells in metaphase until every kinetochore is properly attached to spindle microtubules — unattached kinetochores generate a 'wait' signal that inhibits the anaphase-promoting complex (APC/C). Only when all chromosomes are properly attached is the APC/C activated, triggering separase to cleave cohesin and allow chromatid separation.\n\nMitosis itself has four stages: prophase (chromosomes condense, centrosomes separate, spindle forms), metaphase (chromosomes align at the metaphase plate, each kinetochore attached to microtubules from opposite poles), anaphase (cohesin cleaved by separase, sister chromatids pulled to opposite poles by shortening microtubules and motor proteins), and telophase + cytokinesis (nuclear envelopes reform, chromosomes decondense, cytoplasm divides — via a contractile ring of actin and myosin II in animal cells; via a new cell plate assembled from Golgi-derived vesicles in plant cells). The entire system is fail-safe — and when it fails, the result is aneuploidy and cancer.",
    icon: "🔢",
  },
];

export default function CellsSection() {
  const [isPlant, setIsPlant] = useState(false);

  return (
    <section
      className="px-4 py-16 md:px-8"
      style={{ background: "oklch(0.97 0.015 240 / 0.3)" }}
    >
      <div className="mx-auto max-w-5xl">
        <AnimatedEntrance direction="up">
          <SectionHeader
            topicId="cells"
            title="The Living Cell"
            subtitle="From the earliest cell theory to the intricate machinery inside every organism — the fundamental unit of all life, in full detail."
          />
        </AnimatedEntrance>

        {/* Cell Viewer */}
        <AnimatedEntrance direction="up" delay={0.15}>
          <div
            className="mb-12 overflow-hidden rounded-2xl border"
            style={{
              borderColor: "oklch(0.58 0.11 240 / 0.3)",
              background: "oklch(0.97 0.02 240 / 0.3)",
              boxShadow: "0 4px 24px oklch(0.58 0.11 240 / 0.1)",
            }}
          >
            {/* Toggle header */}
            <div
              className="flex items-center justify-between gap-4 px-6 py-4 border-b"
              style={{
                borderColor: "oklch(0.58 0.11 240 / 0.2)",
                background: "oklch(0.99 0.01 75)",
              }}
            >
              <div className="flex items-center gap-3">
                <Microscope
                  className="h-5 w-5"
                  style={{ color: "oklch(0.45 0.11 240)" }}
                />
                <span
                  className="font-display font-semibold"
                  style={{ color: "oklch(0.28 0.05 75)" }}
                >
                  Interactive Cell Model
                </span>
                <span
                  className="rounded-full px-2.5 py-0.5 text-xs font-medium"
                  style={{
                    background: "oklch(0.90 0.06 240)",
                    color: "oklch(0.38 0.11 240)",
                    border: "1px solid oklch(0.58 0.11 240 / 0.3)",
                  }}
                >
                  {isPlant ? "Plant Cell" : "Animal Cell"}
                </span>
              </div>
              <div
                className="flex rounded-xl p-1 gap-1"
                style={{ background: "oklch(0.93 0.03 240 / 0.6)" }}
              >
                <button
                  type="button"
                  onClick={() => setIsPlant(false)}
                  data-ocid="toggle-animal-cell"
                  className="rounded-lg px-4 py-1.5 text-sm font-medium transition-smooth"
                  style={
                    !isPlant
                      ? { background: "oklch(0.58 0.11 240)", color: "white" }
                      : { color: "oklch(0.5 0.02 75)" }
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
                      ? { background: "oklch(0.5 0.12 145)", color: "white" }
                      : { color: "oklch(0.5 0.02 75)" }
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
                        style={{
                          height: 520,
                          background: "oklch(0.95 0.02 240 / 0.3)",
                        }}
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
                borderColor: "oklch(0.58 0.11 240 / 0.15)",
                background: "oklch(0.99 0.01 75)",
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
                      { color: "#29b6f6", label: "Central Vacuole" },
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
          {PARAGRAPHS.map((para, i) => (
            <StaggerItem key={para.heading}>
              <div
                id={para.anchorId}
                className="rounded-2xl p-6 border"
                style={{
                  borderColor: "oklch(0.58 0.11 240 / 0.18)",
                  background:
                    i % 2 === 0
                      ? "oklch(0.98 0.01 75)"
                      : "oklch(0.95 0.04 240 / 0.25)",
                }}
              >
                <div className="flex items-center gap-3 mb-3">
                  <span className="text-2xl">{para.icon}</span>
                  <h3
                    className="font-display text-xl font-bold"
                    style={{ color: "oklch(0.38 0.11 240)" }}
                  >
                    {para.heading}
                  </h3>
                </div>
                {para.text.split("\n\n").map((paragraph) => (
                  <p
                    key={paragraph.slice(0, 40)}
                    className="leading-relaxed text-[0.94rem] mb-3 last:mb-0"
                    style={{ color: "oklch(0.3 0.03 75)" }}
                  >
                    {paragraph}
                  </p>
                ))}
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
                style={{ color: "oklch(0.45 0.11 240)" }}
              />
              <h3
                className="font-display text-2xl font-bold"
                style={{ color: "oklch(0.38 0.11 240)" }}
              >
                Animal vs. Plant Cell — What's Different?
              </h3>
            </div>
            <div
              className="overflow-hidden rounded-2xl border"
              style={{ borderColor: "oklch(0.58 0.11 240 / 0.2)" }}
            >
              {/* Table header */}
              <div
                className="grid grid-cols-3 px-5 py-3 text-sm font-semibold"
                style={{ background: "oklch(0.93 0.04 240 / 0.4)" }}
              >
                <span style={{ color: "oklch(0.28 0.05 75)" }}>
                  Organelle / Structure
                </span>
                <span
                  className="text-center"
                  style={{ color: "oklch(0.38 0.11 240)" }}
                >
                  Animal Cell
                </span>
                <span
                  className="text-center"
                  style={{ color: "oklch(0.4 0.12 145)" }}
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
                  className="grid grid-cols-3 px-5 py-3 border-t items-start transition-smooth hover:brightness-97"
                  style={{
                    borderColor: "oklch(0.58 0.11 240 / 0.1)",
                    background:
                      i % 2 === 0
                        ? "oklch(0.98 0.01 75)"
                        : "oklch(0.96 0.02 240 / 0.2)",
                  }}
                  data-ocid={`organelle-row-${row.name.toLowerCase().replace(/\s+/g, "-")}`}
                >
                  <div className="flex items-center gap-2">
                    <div
                      className="h-2 w-2 rounded-full shrink-0 mt-0.5"
                      style={{ background: row.color }}
                    />
                    <span
                      className="text-sm font-medium"
                      style={{ color: "oklch(0.3 0.03 75)" }}
                    >
                      {row.name}
                    </span>
                  </div>
                  <div className="px-2">
                    <span
                      className="text-xs leading-relaxed"
                      style={{ color: "oklch(0.38 0.11 240)" }}
                    >
                      {row.animal}
                    </span>
                  </div>
                  <div className="px-2">
                    <span
                      className="text-xs leading-relaxed"
                      style={{ color: "oklch(0.4 0.12 145)" }}
                    >
                      {row.plant}
                    </span>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </AnimatedEntrance>

        {/* Quiz */}
        <AnimatedEntrance direction="up" delay={0.1}>
          <div
            className="rounded-2xl p-7"
            style={{
              background: "oklch(0.98 0.01 75)",
              border: "1px solid oklch(0.58 0.11 240 / 0.2)",
            }}
          >
            <h3 className="font-display text-2xl font-bold mb-2 accent-cell">
              🔬 Test Your Cell Knowledge
            </h3>
            <p className="text-muted-foreground mb-6">
              10 questions spanning prokaryotes, organelles, membrane transport,
              cell division, and the fascinating details that make cells
              remarkable.
            </p>
            <QuizEngine topicId="cells" questions={QUIZ_QUESTIONS} />
          </div>
        </AnimatedEntrance>
      </div>
    </section>
  );
}
