import {
  AnimatedEntrance,
  StaggerContainer,
  StaggerItem,
} from "@/components/AnimatedEntrance";
import { QuizEngine } from "@/components/QuizEngine";
import { SceneErrorBoundary } from "@/components/SceneErrorBoundary";
import { SectionHeader } from "@/components/SectionHeader";
import { ProteinScene } from "@/sections/ProteinScene";
import type { StructureLevel } from "@/sections/ProteinScene";
import type { QuizQuestion } from "@/types/biology";
import { Zap } from "lucide-react";
import { useState } from "react";

// ────────────────────────────────────────────────────────────
// Quiz questions
// ────────────────────────────────────────────────────────────
const PROTEIN_QUIZ: QuizQuestion[] = [
  {
    id: "p1",
    question:
      "What are the four components attached to the central alpha-carbon of an amino acid?",
    options: [
      "Amino group, carboxyl group, R side chain, hydrogen atom",
      "Phosphate group, sugar, base, hydroxyl group",
      "Peptide bond, carbonyl, amine, methyl group",
      "Adenine, guanine, cytosine, thymine",
    ],
    correctIndex: 0,
    explanation:
      "Every amino acid has a central alpha-carbon bonded to: an amino group (–NH₂), a carboxyl group (–COOH), a variable R side chain (determines the amino acid's identity), and a hydrogen atom.",
    topic: "proteins",
  },
  {
    id: "p2",
    question: "How is a peptide bond formed between two amino acids?",
    options: [
      "By a condensation reaction releasing water between the carboxyl of one and the amino group of the next",
      "By an oxidation reaction forming a disulfide bridge",
      "By ionic attraction between opposite charges",
      "By hydrogen bonding between backbone atoms",
    ],
    correctIndex: 0,
    explanation:
      "A peptide bond (–CO–NH–) forms via a condensation (dehydration) reaction: the carboxyl group of one amino acid reacts with the amino group of the next, releasing a water molecule. This creates the –CO–NH– covalent linkage.",
    topic: "proteins",
  },
  {
    id: "p3",
    question: "What defines the PRIMARY structure of a protein?",
    options: [
      "The coiling of the polypeptide into an alpha-helix",
      "The linear sequence of amino acids in the chain",
      "The overall 3D folded shape of the protein",
      "The association of multiple polypeptide chains",
    ],
    correctIndex: 1,
    explanation:
      "Primary structure is simply the order of amino acids along the polypeptide chain, read from the N-terminus to the C-terminus. This sequence is encoded in the gene and determines all higher-order structures.",
    topic: "proteins",
  },
  {
    id: "p4",
    question: "What type of bonds hold an alpha-helix together?",
    options: [
      "Covalent peptide bonds between side chains",
      "Disulfide bridges between cysteine residues",
      "Hydrogen bonds between backbone carbonyl and amino groups every 4 residues",
      "Ionic interactions between R groups",
    ],
    correctIndex: 2,
    explanation:
      "Alpha-helices are stabilized by hydrogen bonds between the carbonyl oxygen (C=O) of one residue and the amide nitrogen (N–H) of a residue four positions further along the backbone. These regular H-bonds create the tight coil.",
    topic: "proteins",
  },
  {
    id: "p5",
    question: "Which describes beta-sheets correctly?",
    options: [
      "Tightly coiled ribbons stabilized by side-chain interactions",
      "Extended polypeptide strands lying side by side, linked by backbone hydrogen bonds",
      "Globular regions formed by hydrophobic R groups clustering together",
      "Double-stranded structures similar to DNA",
    ],
    correctIndex: 1,
    explanation:
      "Beta-sheets are formed when two or more extended polypeptide strands line up side-by-side. Backbone hydrogen bonds (not side-chain bonds) form between the strands. Strands can be parallel (same N→C direction) or antiparallel.",
    topic: "proteins",
  },
  {
    id: "p6",
    question: "What drives the TERTIARY structure folding of a protein?",
    options: [
      "Watson-Crick base pairing rules",
      "R-group interactions including hydrophobic effect, H-bonds, ionic bonds, and disulfide bridges",
      "Only covalent peptide bonds between the backbone atoms",
      "Ribosomal RNA templates that guide folding",
    ],
    correctIndex: 1,
    explanation:
      "Tertiary structure is the overall 3D shape of a single polypeptide. It is driven by R-group (side-chain) interactions: nonpolar R groups cluster in the hydrophobic core (hydrophobic effect), while H-bonds, ionic bonds, and disulfide bridges between cysteines further stabilize the fold.",
    topic: "proteins",
  },
  {
    id: "p7",
    question:
      "Hemoglobin is a classic example of which level of protein structure?",
    options: [
      "Primary structure — its long amino acid sequence",
      "Secondary structure — its alpha-helices and beta-sheets",
      "Tertiary structure — the single folded globin chain",
      "Quaternary structure — four polypeptide subunits assembled together",
    ],
    correctIndex: 3,
    explanation:
      "Quaternary structure arises when two or more folded polypeptide chains (subunits) associate into one functional complex. Hemoglobin has four subunits (2 alpha-globin + 2 beta-globin chains) that work cooperatively to carry oxygen.",
    topic: "proteins",
  },
  {
    id: "p8",
    question: "Which of the following is an example of a structural protein?",
    options: [
      "Hemoglobin — transports oxygen in red blood cells",
      "Insulin — a hormone that regulates blood glucose",
      "Collagen — provides tensile strength to skin and tendons",
      "Amylase — an enzyme that digests starch",
    ],
    correctIndex: 2,
    explanation:
      "Collagen and keratin are structural proteins. Collagen forms triple-helix fibers that give connective tissues (skin, cartilage, tendons) their remarkable tensile strength. Keratin provides the tough scaffold for hair, nails, and the outer skin layer.",
    topic: "proteins",
  },
  {
    id: "p9",
    question: "What happens to a protein when it is DENATURED?",
    options: [
      "Its amino acid sequence is permanently destroyed",
      "New peptide bonds are created, changing its primary structure",
      "Non-covalent bonds maintaining its 3D shape are disrupted, causing it to unfold and lose function",
      "It is broken into individual amino acids by hydrolysis",
    ],
    correctIndex: 2,
    explanation:
      "Denaturation disrupts the non-covalent interactions (hydrogen bonds, ionic bonds, hydrophobic interactions) that hold the protein's 3D shape together. The primary structure (amino acid sequence, held by covalent peptide bonds) remains intact, but the protein unfolds and loses its biological activity.",
    topic: "proteins",
  },
  {
    id: "p10",
    question:
      "Where in the cell are proteins destined for secretion outside the cell primarily made and processed?",
    options: [
      "Free ribosomes in the cytoplasm, then directly exported",
      "Rough ER ribosomes → Golgi apparatus → secretory vesicles → plasma membrane",
      "Mitochondria → lysosomes → plasma membrane",
      "Nucleus → cytoplasm → directly secreted",
    ],
    correctIndex: 1,
    explanation:
      "Secreted proteins follow the endomembrane pathway: synthesized by ribosomes on the rough ER, threaded into the ER lumen, passed through the Golgi apparatus for modification and sorting, then packaged into secretory vesicles that fuse with the plasma membrane to release the protein outside the cell.",
    topic: "proteins",
  },
];

// ────────────────────────────────────────────────────────────
// Amino acid chain CSS animation
// ────────────────────────────────────────────────────────────
const AA_DATA = [
  { label: "Gly", color: "#ff6b35", type: "Nonpolar" },
  { label: "Ala", color: "#ffa040", type: "Nonpolar" },
  { label: "Val", color: "#ffcb47", type: "Nonpolar" },
  { label: "Ser", color: "#a8e063", type: "Polar" },
  { label: "Thr", color: "#56c596", type: "Polar" },
  { label: "Asp", color: "#4da6ff", type: "Charged −" },
  { label: "Lys", color: "#c86dd7", type: "Charged +" },
  { label: "Pro", color: "#e96595", type: "Nonpolar" },
];

function AminoAcidChain() {
  return (
    <div className="relative overflow-x-auto pb-2">
      <div className="flex items-center gap-0 min-w-max py-6 px-4">
        {/* N-terminus label */}
        <div className="flex flex-col items-center mr-3">
          <span className="text-xs font-bold mb-1" style={{ color: "#ff9944" }}>
            N
          </span>
          <div className="h-6 w-0.5" style={{ background: "#ff994466" }} />
          <span className="text-xs" style={{ color: "#ff994488" }}>
            H₂N–
          </span>
        </div>

        {AA_DATA.map((aa, i) => (
          <div key={aa.label} className="flex items-center">
            {/* Amino acid bead */}
            <div
              className="flex flex-col items-center"
              style={{
                animation: "chainBuild 0.4s ease-out both",
                animationDelay: `${i * 0.15}s`,
              }}
            >
              <span
                className="text-xs text-muted-foreground mb-1 font-medium"
                style={{ fontSize: "10px" }}
              >
                {aa.type}
              </span>
              <div
                className="flex h-12 w-12 items-center justify-center rounded-full text-xs font-bold shadow-lg"
                style={{
                  background: `${aa.color}22`,
                  border: `2px solid ${aa.color}`,
                  color: aa.color,
                  boxShadow: `0 0 12px ${aa.color}44`,
                }}
              >
                {aa.label}
              </div>
              <span
                className="mt-1 text-xs text-muted-foreground"
                style={{ fontSize: "9px", opacity: 0.7 }}
              >
                #{i + 1}
              </span>
            </div>

            {/* Peptide bond connector */}
            {i < AA_DATA.length - 1 && (
              <div
                className="flex flex-col items-center mx-1"
                style={{
                  animation: "chainBuild 0.4s ease-out both",
                  animationDelay: `${(i + 0.5) * 0.15}s`,
                }}
              >
                <span
                  style={{
                    fontSize: "9px",
                    color: "oklch(0.55 0 0)",
                    marginBottom: "2px",
                  }}
                >
                  –CO–NH–
                </span>
                <div
                  style={{
                    height: "2px",
                    width: "24px",
                    background: "oklch(0.45 0 0)",
                  }}
                />
              </div>
            )}
          </div>
        ))}

        {/* C-terminus label */}
        <div className="flex flex-col items-center ml-3">
          <span className="text-xs font-bold mb-1" style={{ color: "#4db8ff" }}>
            C
          </span>
          <div className="h-6 w-0.5" style={{ background: "#4db8ff66" }} />
          <span className="text-xs" style={{ color: "#4db8ff88" }}>
            –COOH
          </span>
        </div>
      </div>

      {/* Legend */}
      <div className="flex flex-wrap gap-3 px-4 mt-2">
        {[
          { label: "Nonpolar (hydrophobic)", color: "#ffa040" },
          { label: "Polar (uncharged)", color: "#56c596" },
          { label: "Charged (–)", color: "#4da6ff" },
          { label: "Charged (+)", color: "#c86dd7" },
        ].map((item) => (
          <div key={item.label} className="flex items-center gap-1.5">
            <div
              className="h-3 w-3 rounded-full"
              style={{
                background: item.color,
                boxShadow: `0 0 6px ${item.color}88`,
              }}
            />
            <span className="text-xs text-muted-foreground">{item.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

// ────────────────────────────────────────────────────────────
// Protein folding CSS diagram
// ────────────────────────────────────────────────────────────
const FOLDING_STAGES = [
  {
    id: "primary",
    label: "Primary Structure",
    sublabel: "Amino acid sequence",
    color: "#ff9944",
    shape: "linear",
    description:
      "The specific order of amino acids (N→C terminus) determined by the DNA sequence. This is the blueprint.",
  },
  {
    id: "secondary",
    label: "Secondary Structure",
    sublabel: "Local folding patterns",
    color: "#ffd44d",
    shape: "coiled",
    description:
      "Backbone hydrogen bonds create alpha-helices (coils) and beta-sheets (flat sheets) in local regions.",
  },
  {
    id: "tertiary",
    label: "Tertiary Structure",
    sublabel: "Overall 3D fold",
    color: "#ff6622",
    shape: "globular",
    description:
      "R-group interactions collapse the chain into a compact 3D shape: the functional protein.",
  },
];

function FoldingDiagram() {
  const [activeStage, setActiveStage] = useState(0);

  return (
    <div className="flex flex-col gap-6">
      {/* Stage selector */}
      <div className="flex gap-3 flex-wrap">
        {FOLDING_STAGES.map((stage, i) => (
          <button
            key={stage.id}
            type="button"
            onClick={() => setActiveStage(i)}
            data-ocid={`folding-stage-${stage.id}`}
            className="flex flex-col items-start rounded-xl px-4 py-3 transition-smooth"
            style={{
              background:
                activeStage === i ? `${stage.color}22` : "oklch(0.20 0 0)",
              border: `1px solid ${activeStage === i ? stage.color : "oklch(0.28 0 0)"}`,
              cursor: "pointer",
              flex: "1 1 0",
              minWidth: "140px",
            }}
          >
            <span className="text-xs font-bold" style={{ color: stage.color }}>
              {stage.label}
            </span>
            <span className="text-xs text-muted-foreground mt-0.5">
              {stage.sublabel}
            </span>
          </button>
        ))}
      </div>

      {/* Animated shape visualization */}
      <div
        className="flex items-center justify-center rounded-2xl"
        style={{
          background: "oklch(0.14 0 0)",
          minHeight: "180px",
          border: "1px solid oklch(0.25 0 0)",
        }}
      >
        {activeStage === 0 && (
          <div
            className="flex items-center gap-0 py-8"
            style={{ animation: "fadeIn 0.4s ease" }}
          >
            {Array.from({ length: 10 }, (_, i) => (
              <div key={`aa-step-${i + 1}`} className="flex items-center">
                <div
                  className="h-8 w-8 rounded-full flex items-center justify-center text-xs font-bold"
                  style={{
                    background: `oklch(0.68 0.22 ${36 + i * 15} / 0.25)`,
                    border: `2px solid oklch(0.68 0.22 ${36 + i * 15} / 0.8)`,
                    color: `oklch(0.85 0.15 ${36 + i * 15})`,
                    animation: "chainBuild 0.3s ease-out both",
                    animationDelay: `${i * 0.06}s`,
                  }}
                >
                  {i + 1}
                </div>
                {i < 9 && (
                  <div
                    style={{
                      width: "12px",
                      height: "2px",
                      background: "oklch(0.40 0 0)",
                    }}
                  />
                )}
              </div>
            ))}
          </div>
        )}

        {activeStage === 1 && (
          <div
            className="flex items-center gap-8 py-6"
            style={{ animation: "fadeIn 0.4s ease" }}
          >
            {/* Helix symbol */}
            <div className="flex flex-col items-center gap-2">
              <div
                className="text-4xl"
                style={{
                  animation: "spin-slow 4s linear infinite",
                  color: "#ff8833",
                }}
              >
                🌀
              </div>
              <span
                className="text-xs font-semibold"
                style={{ color: "#ff8833" }}
              >
                Alpha-Helix
              </span>
              <span className="text-xs text-muted-foreground">
                H-bonds every 4 residues
              </span>
            </div>
            <div style={{ color: "oklch(0.45 0 0)", fontSize: "24px" }}>+</div>
            {/* Beta-sheet symbol */}
            <div className="flex flex-col items-center gap-2">
              <div className="flex flex-col gap-1">
                {[0, 1, 2].map((i) => (
                  <div key={i} className="flex items-center gap-1">
                    <div
                      style={{
                        width: "48px",
                        height: "10px",
                        background: "#ffd44d44",
                        border: "1px solid #ffd44d88",
                        borderRadius: "2px",
                      }}
                    />
                    <div
                      style={{
                        width: 0,
                        height: 0,
                        borderLeft: "10px solid #ffd44daa",
                        borderTop: "5px solid transparent",
                        borderBottom: "5px solid transparent",
                      }}
                    />
                  </div>
                ))}
              </div>
              <span
                className="text-xs font-semibold"
                style={{ color: "#ffd44d" }}
              >
                Beta-Sheet
              </span>
              <span className="text-xs text-muted-foreground">
                Parallel strands
              </span>
            </div>
          </div>
        )}

        {activeStage === 2 && (
          <div
            className="flex flex-col items-center gap-3 py-6"
            style={{ animation: "fadeIn 0.4s ease" }}
          >
            <div className="relative">
              {/* Compact globe shape */}
              <div
                className="h-28 w-28 rounded-full flex items-center justify-center"
                style={{
                  background:
                    "radial-gradient(circle at 35% 35%, oklch(0.68 0.22 36 / 0.5), oklch(0.45 0.15 36 / 0.3))",
                  border: "2px solid oklch(0.68 0.22 36 / 0.6)",
                  boxShadow: "0 0 30px oklch(0.68 0.22 36 / 0.3)",
                  animation: "pulse-glow 3s ease-in-out infinite",
                }}
              >
                <span className="text-2xl">⚗️</span>
              </div>
              {/* Decorative dots representing R-group contacts */}
              {[0, 60, 120, 180, 240, 300].map((deg) => (
                <div
                  key={deg}
                  className="absolute h-3 w-3 rounded-full"
                  style={{
                    background: `oklch(0.72 0.20 ${36 + deg / 10})`,
                    boxShadow: `0 0 6px oklch(0.72 0.20 ${36 + deg / 10} / 0.7)`,
                    top: `${50 + 46 * Math.sin((deg * Math.PI) / 180)}%`,
                    left: `${50 + 46 * Math.cos((deg * Math.PI) / 180)}%`,
                    transform: "translate(-50%, -50%)",
                  }}
                />
              ))}
            </div>
            <div className="text-center">
              <p className="text-sm font-semibold" style={{ color: "#ff6622" }}>
                Compact Globular Shape
              </p>
              <p className="text-xs text-muted-foreground mt-1">
                Hydrophobic core · Disulfide bridges · H-bonds
              </p>
            </div>
          </div>
        )}
      </div>

      {/* Description */}
      <div
        className="rounded-xl p-4"
        style={{
          background: `${FOLDING_STAGES[activeStage].color}11`,
          border: `1px solid ${FOLDING_STAGES[activeStage].color}33`,
        }}
      >
        <p className="text-sm leading-relaxed text-muted-foreground">
          <span
            className="font-semibold"
            style={{ color: FOLDING_STAGES[activeStage].color }}
          >
            {FOLDING_STAGES[activeStage].label}:{" "}
          </span>
          {FOLDING_STAGES[activeStage].description}
        </p>
      </div>
    </div>
  );
}

// ────────────────────────────────────────────────────────────
// Explanation paragraphs
// ────────────────────────────────────────────────────────────
const EXPLANATION_PARAGRAPHS = [
  {
    title: "Amino Acids: The Monomer Units of Proteins",
    color: "#ff9944",
    text: "Proteins are built from amino acids, small organic molecules that share a common core architecture. At the center sits an alpha-carbon (C\u03B1) bonded to four groups: an amino group (\u2013NH\u2082), a carboxyl group (\u2013COOH), a hydrogen atom, and a variable R side chain (also called the side group). It is the R chain that distinguishes one amino acid from another. The human body uses 20 standard amino acids, which differ in the size, charge, polarity, and chemical reactivity of their R groups. These 20 are grouped into families: nonpolar aliphatic (like glycine, alanine, valine, leucine, isoleucine, proline, and methionine), aromatic (phenylalanine, tyrosine, tryptophan), polar uncharged (serine, threonine, cysteine, asparagine, glutamine), positively charged (lysine, arginine, histidine), and negatively charged (aspartate, glutamate). The specific properties of each R group ultimately determine how a protein will fold and function.",
  },
  {
    title: "Peptide Bond Formation: Linking the Chain",
    color: "#ffd44d",
    text: "Amino acids are joined into chains through peptide bonds, a type of covalent bond formed in a condensation (dehydration) reaction. When two amino acids approach one another, the carboxyl group (\u2013COOH) of the first reacts with the amino group (\u2013NH\u2082) of the second, releasing a molecule of water (H\u2082O) as a byproduct. The resulting covalent linkage, \u2013CO\u2013NH\u2013, is the peptide bond. The chain that forms is called a polypeptide, and it has a defined directionality: the end with the free amino group is called the N-terminus, while the end with the free carboxyl group is the C-terminus. By convention, polypeptide sequences are always read from the N-terminus to the C-terminus. In living cells, this bond formation occurs on ribosomes, molecular machines that translate the information in mRNA into polypeptide chains with remarkable speed and fidelity.",
  },
  {
    title: "Hierarchy of Protein Structure: Four Levels",
    color: "#ff6622",
    text: "Proteins adopt complex, precise three-dimensional shapes described by four hierarchical levels. Primary structure is simply the linear amino acid sequence \u2014 the specific order of residues from N to C terminus, encoded directly in the gene. Secondary structure arises from regular, repetitive folding patterns within local regions of the polypeptide, driven entirely by hydrogen bonds between backbone atoms (not side chains). The two main secondary structures are the alpha-helix, a right-handed coil held by H-bonds between every fourth residue, and the beta-sheet, where extended strands lie side by side and form H-bonds across strands in parallel or antiparallel orientations. Tertiary structure is the complete, unique three-dimensional fold of a single polypeptide chain, determined by interactions among R groups: hydrophobic residues cluster in the core, polar and charged residues prefer the surface, H-bonds and ionic interactions provide additional stability, and disulfide bridges (covalent bonds between cysteine thiol groups) can lock regions together. Quaternary structure exists only in multi-subunit proteins and refers to how two or more folded polypeptide chains associate into one functional complex, as in hemoglobin\u2019s four-subunit structure.",
  },
  {
    title: "Protein Functions: The Workhorses of the Cell",
    color: "#ff8833",
    text: "Proteins carry out an astonishing variety of cellular functions, making them the most functionally diverse macromolecules in biology. Enzymes are catalytic proteins that accelerate biochemical reactions by lowering activation energy; without them, most metabolic reactions would proceed far too slowly to sustain life. Structural proteins such as collagen (providing tensile strength to connective tissues) and keratin (the tough polymer of hair, nails, and epidermis) give cells and tissues their physical integrity. Transport proteins \u2014 most famously hemoglobin \u2014 bind and ferry small molecules or ions through the bloodstream or across membranes (as channel and carrier proteins). Hormonal proteins like insulin, a small protein secreted by pancreatic beta-cells, serve as chemical messengers that coordinate physiology across different organs. Antibodies (immunoglobulins) are Y-shaped proteins produced by immune cells that bind and neutralize specific foreign molecules with exquisite specificity. Motor proteins such as myosin and kinesin convert chemical energy into directed mechanical movement, powering muscle contraction and organelle transport.",
  },
  {
    title: "Protein Denaturation: When Structure Collapses",
    color: "#ff5533",
    text: "Proteins depend on their precise three-dimensional shape to function. Denaturation is the process by which this shape is disrupted \u2014 not by breaking peptide bonds, but by destroying the weaker non-covalent interactions (hydrogen bonds, ionic bonds, hydrophobic interactions, and van der Waals forces) that maintain the native conformation. High temperature is one of the most common denaturants: heat agitates atoms and breaks the fragile H-bond network, causing the chain to unfold. Extreme pH disrupts ionic bonds and the protonation state of ionizable R groups, while chemical denaturants such as urea or detergents interfere with hydrophobic packing and hydrogen bonding. When denatured, proteins lose their biological activity \u2014 an enzyme can no longer catalyze its reaction, a transport protein cannot bind its cargo. In some cases (if the primary structure is intact and conditions are restored) a protein can refold spontaneously; in others, denaturation is irreversible, as when cooking an egg white transforms liquid albumin into a permanently solid mass.",
  },
  {
    title: "Where Proteins Are Made and Localized in the Cell",
    color: "#ffaa44",
    text: "Protein synthesis begins on ribosomes, large complexes of ribosomal RNA and proteins located throughout the cell. Cytosolic proteins \u2014 those destined to function in the cytoplasm (glycolytic enzymes, cytoskeletal components, most regulatory proteins) \u2014 are made on free ribosomes floating in the cytoplasm. In contrast, proteins destined for secretion, for the plasma membrane, or for organelles such as the ER, Golgi, or lysosomes are synthesized on ribosomes attached to the rough endoplasmic reticulum (rough ER). A hydrophobic signal sequence at the protein\u2019s N-terminus directs the ribosome to dock on the rough ER membrane; as the polypeptide elongates it is threaded directly into the ER lumen, where initial folding and glycosylation occur. From the ER the protein moves via vesicles to the Golgi apparatus, the cell\u2019s sorting and modification center, which adds carbohydrates, cleaves signal peptides, and packages finished proteins into secretory vesicles for delivery to their final destinations. Mitochondria and chloroplasts import many of their own proteins post-translationally using specific targeting sequences, while integral membrane proteins remain embedded in the lipid bilayer through hydrophobic transmembrane helices.",
  },
];

// ────────────────────────────────────────────────────────────
// Function spotlight cards
// ────────────────────────────────────────────────────────────
const FUNCTION_CARDS = [
  {
    icon: "⚙️",
    label: "Enzymes",
    desc: "Amylase digests starch; catalase destroys H₂O₂",
    color: "#ff9944",
  },
  {
    icon: "🛡️",
    label: "Antibodies",
    desc: "Immunoglobulins neutralize pathogens with high specificity",
    color: "#ffd44d",
  },
  {
    icon: "📡",
    label: "Hormones",
    desc: "Insulin signals cells to absorb glucose from blood",
    color: "#ff6622",
  },
  {
    icon: "🏗️",
    label: "Structural",
    desc: "Collagen in tendons; keratin in hair and nails",
    color: "#ff8833",
  },
  {
    icon: "🚌",
    label: "Transport",
    desc: "Hemoglobin carries O₂; channel proteins regulate ion flow",
    color: "#ffaa44",
  },
  {
    icon: "⚡",
    label: "Motor",
    desc: "Myosin powers muscle contraction; kinesin walks on microtubules",
    color: "#ff5544",
  },
];

// ────────────────────────────────────────────────────────────
// Main section
// ────────────────────────────────────────────────────────────
export default function ProteinsSection() {
  const [level, setLevel] = useState<StructureLevel>("secondary");

  return (
    <section className="px-4 py-16 md:px-8">
      <div className="mx-auto max-w-5xl">
        {/* Header */}
        <AnimatedEntrance direction="left">
          <SectionHeader
            topicId="proteins"
            title="Proteins — The Molecular Workhorses"
            subtitle="From amino acid sequences to intricate 3D machines: explore how proteins fold, function, and power every living process."
          />
          {/* Zap icon usage — decorative accent badge */}
          <div
            className="mb-6 inline-flex items-center gap-2 rounded-full px-3 py-1.5 text-xs font-semibold"
            style={{
              background: "oklch(0.68 0.22 36 / 0.15)",
              border: "1px solid oklch(0.68 0.22 36 / 0.35)",
              color: "oklch(0.82 0.15 36)",
            }}
          >
            <Zap className="h-3.5 w-3.5" />
            20 standard amino acids · 4 structural levels · Countless functions
          </div>
        </AnimatedEntrance>

        {/* 3D Scene */}
        <AnimatedEntrance direction="up" delay={0.1}>
          <div
            className="mb-12 rounded-2xl overflow-hidden"
            style={{
              border: "1px solid oklch(0.68 0.22 36 / 0.3)",
              boxShadow: "0 0 40px oklch(0.68 0.22 36 / 0.15)",
            }}
          >
            <div
              className="flex items-center justify-between px-5 py-3 border-b"
              style={{
                borderColor: "oklch(0.68 0.22 36 / 0.2)",
                background: "oklch(0.17 0 0)",
              }}
            >
              <h3 className="font-display text-sm font-semibold accent-protein">
                Interactive Protein Structure Viewer
              </h3>
              <span className="text-xs text-muted-foreground">
                Toggle structural level below
              </span>
            </div>
            <SceneErrorBoundary
              sceneName="Protein Structure 3D Model"
              sceneColor="#fb923c"
            >
              <ProteinScene level={level} onLevelChange={setLevel} />
            </SceneErrorBoundary>
          </div>
        </AnimatedEntrance>

        {/* Explanation paragraphs */}
        <StaggerContainer className="mb-12 space-y-8" staggerDelay={0.08}>
          {EXPLANATION_PARAGRAPHS.map((para) => (
            <StaggerItem key={para.title}>
              <div
                className="rounded-2xl p-6"
                style={{
                  background: "oklch(0.18 0 0)",
                  border: `1px solid ${para.color}25`,
                }}
              >
                <h3
                  className="font-display text-xl font-bold mb-3"
                  style={{ color: para.color }}
                >
                  {para.title}
                </h3>
                <p className="text-muted-foreground leading-relaxed text-sm md:text-base">
                  {para.text}
                </p>
              </div>
            </StaggerItem>
          ))}
        </StaggerContainer>

        {/* Amino acid chain visualization */}
        <AnimatedEntrance direction="up" delay={0.05}>
          <div
            className="mb-12 rounded-2xl overflow-hidden"
            style={{
              background: "oklch(0.17 0 0)",
              border: "1px solid oklch(0.68 0.22 36 / 0.25)",
            }}
          >
            <div
              className="px-5 py-4 border-b"
              style={{ borderColor: "oklch(0.68 0.22 36 / 0.2)" }}
            >
              <h3 className="font-display text-lg font-bold accent-protein">
                Amino Acid Chain — Building a Polypeptide
              </h3>
              <p className="text-xs text-muted-foreground mt-1">
                Each colored bead is an amino acid; the connector shows the
                peptide bond (–CO–NH–)
              </p>
            </div>
            <div className="px-2 py-4">
              <AminoAcidChain />
            </div>
          </div>
        </AnimatedEntrance>

        {/* Folding diagram */}
        <AnimatedEntrance direction="up" delay={0.05}>
          <div
            className="mb-12 rounded-2xl overflow-hidden"
            style={{
              background: "oklch(0.17 0 0)",
              border: "1px solid oklch(0.68 0.22 36 / 0.25)",
            }}
          >
            <div
              className="px-5 py-4 border-b"
              style={{ borderColor: "oklch(0.68 0.22 36 / 0.2)" }}
            >
              <h3 className="font-display text-lg font-bold accent-protein">
                Protein Folding Hierarchy
              </h3>
              <p className="text-xs text-muted-foreground mt-1">
                Click a stage to explore the primary → secondary → tertiary
                structure progression
              </p>
            </div>
            <div className="p-5">
              <FoldingDiagram />
            </div>
          </div>
        </AnimatedEntrance>

        {/* Function spotlight */}
        <AnimatedEntrance direction="up" delay={0.05}>
          <div className="mb-12">
            <h3 className="font-display text-2xl font-bold accent-protein glow-protein mb-2">
              Six Roles Proteins Play
            </h3>
            <p className="text-muted-foreground text-sm mb-6">
              Proteins are specialists — each class evolved for a distinct
              molecular job.
            </p>
            <StaggerContainer
              className="grid grid-cols-2 md:grid-cols-3 gap-4"
              staggerDelay={0.07}
            >
              {FUNCTION_CARDS.map((card) => (
                <StaggerItem key={card.label}>
                  <div
                    className="rounded-2xl p-5 flex flex-col gap-2 h-full transition-smooth hover:scale-[1.02]"
                    style={{
                      background: `${card.color}0f`,
                      border: `1px solid ${card.color}30`,
                    }}
                  >
                    <span className="text-3xl">{card.icon}</span>
                    <span
                      className="font-display font-bold text-base"
                      style={{ color: card.color }}
                    >
                      {card.label}
                    </span>
                    <span className="text-xs text-muted-foreground leading-relaxed">
                      {card.desc}
                    </span>
                  </div>
                </StaggerItem>
              ))}
            </StaggerContainer>
          </div>
        </AnimatedEntrance>

        {/* Quiz */}
        <AnimatedEntrance direction="up" delay={0.05}>
          <div className="mb-4">
            <h3 className="font-display text-2xl font-bold accent-protein glow-protein mb-1">
              Test Your Knowledge
            </h3>
            <p className="text-muted-foreground text-sm mb-6">
              10 questions on amino acid structure, protein folding, functions,
              and denaturation.
            </p>
            <QuizEngine topicId="proteins" questions={PROTEIN_QUIZ} />
          </div>
        </AnimatedEntrance>
      </div>
    </section>
  );
}
