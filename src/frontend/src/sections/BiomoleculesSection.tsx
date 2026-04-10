import {
  AnimatedEntrance,
  StaggerContainer,
  StaggerItem,
} from "@/components/AnimatedEntrance";
import { QuizEngine } from "@/components/QuizEngine";
import { SectionHeader } from "@/components/SectionHeader";
import type { QuizQuestion } from "@/types/biology";
import { Atom } from "lucide-react";

// ─── CSS-animated molecular diagrams ──────────────────────────────────────────

function GlucoseRing() {
  return (
    <div className="flex flex-col items-center gap-2">
      <div className="relative" style={{ width: 100, height: 96 }}>
        {/* Hexagonal ring */}
        <svg
          viewBox="0 0 100 96"
          width="100"
          height="96"
          className="animate-float"
          style={{ filter: "drop-shadow(0 0 8px oklch(0.72 0.18 142 / 0.7))" }}
        >
          {/* Ring bonds */}
          <polygon
            points="50,8 88,30 88,66 50,88 12,66 12,30"
            fill="none"
            stroke="oklch(0.72 0.18 142)"
            strokeWidth="3"
            strokeLinejoin="round"
          />
          {/* Atoms at vertices */}
          <circle
            cx="50"
            cy="8"
            r="7"
            fill="oklch(0.15 0 0)"
            stroke="oklch(0.72 0.18 142)"
            strokeWidth="2"
          />
          <circle
            cx="88"
            cy="30"
            r="7"
            fill="oklch(0.15 0 0)"
            stroke="oklch(0.72 0.18 142)"
            strokeWidth="2"
          />
          <circle
            cx="88"
            cy="66"
            r="7"
            fill="oklch(0.15 0 0)"
            stroke="oklch(0.72 0.18 142)"
            strokeWidth="2"
          />
          <circle
            cx="50"
            cy="88"
            r="7"
            fill="oklch(0.15 0 0)"
            stroke="oklch(0.55 0.18 142)"
            strokeWidth="2"
          />
          <circle
            cx="12"
            cy="66"
            r="7"
            fill="oklch(0.15 0 0)"
            stroke="oklch(0.72 0.18 142)"
            strokeWidth="2"
          />
          <circle
            cx="12"
            cy="30"
            r="7"
            fill="oklch(0.15 0 0)"
            stroke="oklch(0.55 0.18 142)"
            strokeWidth="2"
          />
          {/* Oxygen in ring */}
          <text
            x="50"
            y="12"
            textAnchor="middle"
            dominantBaseline="middle"
            fontSize="8"
            fill="oklch(0.72 0.18 142)"
            fontWeight="bold"
          >
            <title>Carbon atom</title>C
          </text>
          <text
            x="88"
            y="34"
            textAnchor="middle"
            dominantBaseline="middle"
            fontSize="8"
            fill="oklch(0.72 0.18 142)"
            fontWeight="bold"
          >
            <title>Carbon atom</title>C
          </text>
          <text
            x="88"
            y="70"
            textAnchor="middle"
            dominantBaseline="middle"
            fontSize="8"
            fill="oklch(0.72 0.18 142)"
            fontWeight="bold"
          >
            <title>Carbon atom</title>C
          </text>
          <text
            x="50"
            y="92"
            textAnchor="middle"
            dominantBaseline="middle"
            fontSize="8"
            fill="oklch(0.85 0.10 142)"
            fontWeight="bold"
          >
            <title>Oxygen atom</title>O
          </text>
          <text
            x="12"
            y="70"
            textAnchor="middle"
            dominantBaseline="middle"
            fontSize="8"
            fill="oklch(0.72 0.18 142)"
            fontWeight="bold"
          >
            <title>Carbon atom</title>C
          </text>
          <text
            x="12"
            y="34"
            textAnchor="middle"
            dominantBaseline="middle"
            fontSize="8"
            fill="oklch(0.85 0.10 142)"
            fontWeight="bold"
          >
            <title>Carbon atom</title>C
          </text>
          {/* OH groups */}
          <line
            x1="50"
            y1="1"
            x2="50"
            y2="-8"
            stroke="oklch(0.72 0.18 142)"
            strokeWidth="1.5"
          />
          <text
            x="50"
            y="-11"
            textAnchor="middle"
            fontSize="7"
            fill="oklch(0.85 0 0)"
          >
            OH
          </text>
          <line
            x1="94"
            y1="28"
            x2="104"
            y2="22"
            stroke="oklch(0.72 0.18 142)"
            strokeWidth="1.5"
          />
          <text x="108" y="21" fontSize="7" fill="oklch(0.85 0 0)">
            OH
          </text>
          <line
            x1="94"
            y1="68"
            x2="104"
            y2="74"
            stroke="oklch(0.72 0.18 142)"
            strokeWidth="1.5"
          />
          <text x="108" y="77" fontSize="7" fill="oklch(0.85 0 0)">
            OH
          </text>
          <line
            x1="4"
            y1="68"
            x2="-6"
            y2="74"
            stroke="oklch(0.72 0.18 142)"
            strokeWidth="1.5"
          />
          <text x="-26" y="77" fontSize="7" fill="oklch(0.85 0 0)">
            OH
          </text>
        </svg>
      </div>
      <span className="text-xs text-muted-foreground text-center">
        Carbon (C), Oxygen (O), Hydroxyl (–OH)
      </span>
    </div>
  );
}

function FattyAcidChain() {
  const atomKeys = ["c1", "c2", "c3", "c4", "c5", "c6"];
  return (
    <div className="flex flex-col items-center gap-2">
      <div
        className="flex items-center gap-0.5"
        style={{ animation: "pulse-glow 2.5s ease-in-out infinite" }}
      >
        {/* Carboxyl head */}
        <div className="flex flex-col items-center">
          <span
            className="text-xs font-bold"
            style={{ color: "oklch(0.85 0.12 36)" }}
          >
            O
          </span>
          <span
            className="text-[10px]"
            style={{ color: "oklch(0.70 0.18 142)" }}
          >
            ‖
          </span>
          <span
            className="text-xs font-bold"
            style={{ color: "oklch(0.72 0.18 142)" }}
          >
            C
          </span>
          <span
            className="text-[10px]"
            style={{ color: "oklch(0.70 0.18 142)" }}
          >
            |
          </span>
          <span
            className="text-xs font-bold"
            style={{ color: "oklch(0.85 0.12 36)" }}
          >
            OH
          </span>
        </div>
        <div
          className="w-2 h-0.5 rounded"
          style={{ background: "oklch(0.60 0.18 142)" }}
        />
        {atomKeys.map((key, i) => (
          <div key={key} className="flex items-center">
            <div
              className="w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold transition-smooth"
              style={{
                background: `oklch(${0.22 + i * 0.02} 0 0)`,
                border: "1.5px solid oklch(0.72 0.18 142)",
                color: "oklch(0.72 0.18 142)",
                animationDelay: `${i * 0.2}s`,
              }}
            >
              C
            </div>
            {i < atomKeys.length - 1 && (
              <div
                className="w-2 h-0.5"
                style={{ background: "oklch(0.60 0.18 142)" }}
              />
            )}
          </div>
        ))}
        <div
          className="w-2 h-0.5 rounded"
          style={{ background: "oklch(0.60 0.18 142)" }}
        />
        {/* Methyl tail */}
        <div
          className="w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold"
          style={{
            background: "oklch(0.22 0 0)",
            border: "1.5px solid oklch(0.60 0.18 142)",
            color: "oklch(0.60 0.18 142)",
          }}
        >
          CH₃
        </div>
      </div>
      <span className="text-xs text-muted-foreground text-center">
        Carboxyl head (–COOH) · Carbon chain · Methyl tail (–CH₃)
      </span>
    </div>
  );
}

function NucleotideDiagram() {
  return (
    <div className="flex flex-col items-center gap-2">
      <div
        className="relative flex flex-col items-center gap-1"
        style={{ animation: "spin-slow 8s linear infinite" }}
      >
        {/* Nitrogenous base */}
        <div
          className="w-20 h-10 rounded-lg flex items-center justify-center text-xs font-bold"
          style={{
            background: "oklch(0.70 0.20 290 / 0.2)",
            border: "1.5px solid oklch(0.70 0.20 290)",
            color: "oklch(0.70 0.20 290)",
          }}
        >
          Base (A/T/G/C)
        </div>
        {/* Bond line */}
        <div
          className="w-0.5 h-3"
          style={{ background: "oklch(0.72 0.18 142)" }}
        />
        {/* Sugar */}
        <div
          className="w-20 h-10 rounded-lg flex items-center justify-center text-xs font-bold"
          style={{
            background: "oklch(0.72 0.18 142 / 0.2)",
            border: "1.5px solid oklch(0.72 0.18 142)",
            color: "oklch(0.72 0.18 142)",
          }}
        >
          Deoxyribose
        </div>
        {/* Bond line */}
        <div
          className="w-0.5 h-3"
          style={{ background: "oklch(0.72 0.18 142)" }}
        />
        {/* Phosphate */}
        <div
          className="w-20 h-10 rounded-lg flex items-center justify-center text-xs font-bold"
          style={{
            background: "oklch(0.85 0.12 36 / 0.2)",
            border: "1.5px solid oklch(0.85 0.12 36)",
            color: "oklch(0.85 0.12 36)",
          }}
        >
          Phosphate (PO₄³⁻)
        </div>
      </div>
      <span className="text-xs text-muted-foreground text-center">
        Base · Sugar · Phosphate group
      </span>
    </div>
  );
}

function AminoAcidDiagram() {
  return (
    <div className="flex flex-col items-center gap-2">
      <div
        className="flex items-end gap-1"
        style={{ animation: "color-transition 4s ease-in-out infinite" }}
      >
        {/* Amino group */}
        <div className="flex flex-col items-center gap-0.5">
          <div
            className="px-2 py-1 rounded-lg text-xs font-bold"
            style={{
              background: "oklch(0.68 0.19 262 / 0.2)",
              border: "1.5px solid oklch(0.68 0.19 262)",
              color: "oklch(0.68 0.19 262)",
            }}
          >
            H₂N–
          </div>
          <span className="text-[9px] text-muted-foreground">Amino</span>
        </div>
        {/* Central carbon */}
        <div className="flex flex-col items-center gap-0.5">
          <div
            className="w-10 h-10 rounded-full flex items-center justify-center text-xs font-bold transition-smooth"
            style={{
              background: "oklch(0.72 0.18 142 / 0.25)",
              border: "2px solid oklch(0.72 0.18 142)",
              color: "oklch(0.72 0.18 142)",
            }}
          >
            Cα
          </div>
          {/* R group below */}
          <div
            className="w-0.5 h-3"
            style={{ background: "oklch(0.72 0.18 142)" }}
          />
          <div
            className="px-2 py-1 rounded-lg text-xs font-bold"
            style={{
              background: "oklch(0.68 0.22 36 / 0.2)",
              border: "1.5px solid oklch(0.68 0.22 36)",
              color: "oklch(0.68 0.22 36)",
            }}
          >
            R
          </div>
          <span className="text-[9px] text-muted-foreground">Side chain</span>
        </div>
        {/* H above central carbon */}
        {/* Carboxyl group */}
        <div className="flex flex-col items-center gap-0.5">
          <div
            className="px-2 py-1 rounded-lg text-xs font-bold"
            style={{
              background: "oklch(0.85 0.12 36 / 0.2)",
              border: "1.5px solid oklch(0.85 0.12 36)",
              color: "oklch(0.85 0.12 36)",
            }}
          >
            –COOH
          </div>
          <span className="text-[9px] text-muted-foreground">Carboxyl</span>
        </div>
      </div>
      <span className="text-xs text-muted-foreground text-center">
        Amino (–NH₂) · α-Carbon · Carboxyl (–COOH) · R group
      </span>
    </div>
  );
}

// ─── Molecule card ─────────────────────────────────────────────────────────────

interface MoleculeCardProps {
  name: string;
  badge: string;
  caption: string;
  diagram: React.ReactNode;
}

function MoleculeCard({ name, badge, caption, diagram }: MoleculeCardProps) {
  return (
    <div
      className="flex flex-col items-center gap-4 rounded-2xl p-5 transition-smooth hover:scale-[1.02]"
      style={{
        background: "oklch(0.19 0 0)",
        border: "1px solid oklch(0.72 0.18 142 / 0.25)",
        boxShadow: "0 0 20px oklch(0.72 0.18 142 / 0.08)",
      }}
    >
      <div className="flex flex-col items-center gap-3 w-full">
        {/* diagram area */}
        <div
          className="w-full flex items-center justify-center rounded-xl py-6 px-4 overflow-visible"
          style={{ background: "oklch(0.16 0 0)", minHeight: 120 }}
        >
          {diagram}
        </div>
        {/* name badge */}
        <span
          className="rounded-full px-3 py-0.5 text-xs font-semibold tracking-wide"
          style={{
            background: "oklch(0.72 0.18 142 / 0.2)",
            color: "oklch(0.72 0.18 142)",
            border: "1px solid oklch(0.72 0.18 142 / 0.4)",
          }}
        >
          {badge}
        </span>
        <h4 className="font-display font-bold text-base text-foreground">
          {name}
        </h4>
        <p className="text-xs text-muted-foreground text-center leading-relaxed">
          {caption}
        </p>
      </div>
    </div>
  );
}

// ─── Quiz questions ─────────────────────────────────────────────────────────────

const BIOMOLECULE_QUIZ: QuizQuestion[] = [
  {
    id: "bm1",
    topic: "biomolecules",
    question: "What is a biomolecule?",
    options: [
      "A molecule found only in non-living organisms",
      "An organic molecule produced by living organisms",
      "Any molecule containing nitrogen",
      "A molecule larger than a protein",
    ],
    correctIndex: 1,
    explanation:
      "Biomolecules are organic molecules produced by and found in living organisms. They include carbohydrates, lipids, nucleic acids, and proteins — all essential for life's functions.",
  },
  {
    id: "bm2",
    topic: "biomolecules",
    question: "Which of these is a monosaccharide (simple sugar)?",
    options: ["Starch", "Cellulose", "Glucose", "Sucrose"],
    correctIndex: 2,
    explanation:
      "Glucose is a monosaccharide — the simplest form of carbohydrate. Starch and cellulose are polysaccharides, and sucrose is a disaccharide made of glucose + fructose.",
  },
  {
    id: "bm3",
    topic: "biomolecules",
    question: "What does ATP stand for?",
    options: [
      "Adenine Triphosphate Protein",
      "Adenosine Triphosphate",
      "Amino Triphosphate Peptide",
      "Adenylate Transfer Polymer",
    ],
    correctIndex: 1,
    explanation:
      "ATP stands for Adenosine Triphosphate. It is the cell's main energy currency, releasing energy when its terminal phosphate bond is broken to form ADP.",
  },
  {
    id: "bm4",
    topic: "biomolecules",
    question: "Which part of a phospholipid is hydrophobic (water-repelling)?",
    options: [
      "The phosphate head",
      "The glycerol backbone",
      "The fatty acid tails",
      "The choline group",
    ],
    correctIndex: 2,
    explanation:
      "The fatty acid tails of a phospholipid are nonpolar and therefore hydrophobic — they repel water. The phosphate-containing head group is polar and hydrophilic (water-loving), creating the amphipathic nature critical for membrane formation.",
  },
  {
    id: "bm5",
    topic: "biomolecules",
    question: "What monomer (building block) makes up proteins?",
    options: ["Glucose", "Fatty acids", "Nucleotides", "Amino acids"],
    correctIndex: 3,
    explanation:
      "Proteins are polymers built from amino acid monomers. There are 20 standard amino acids, each with a unique R-group (side chain). They are linked by peptide bonds during protein synthesis.",
  },
  {
    id: "bm6",
    topic: "biomolecules",
    question:
      "What type of bond links amino acids together in a protein chain?",
    options: [
      "Hydrogen bond",
      "Ionic bond",
      "Peptide bond",
      "Phosphodiester bond",
    ],
    correctIndex: 2,
    explanation:
      "Amino acids are joined by peptide bonds, formed through a condensation (dehydration) reaction between the carboxyl group (–COOH) of one amino acid and the amino group (–NH₂) of the next.",
  },
  {
    id: "bm7",
    topic: "biomolecules",
    question:
      "Which polysaccharide serves as the main energy storage in animals?",
    options: ["Cellulose", "Starch", "Glycogen", "Chitin"],
    correctIndex: 2,
    explanation:
      "Glycogen is the primary energy-storage polysaccharide in animals, stored mainly in the liver and muscle. Starch is the equivalent in plants. Cellulose provides structural support in plant cell walls.",
  },
  {
    id: "bm8",
    topic: "biomolecules",
    question: "A nucleotide is composed of which three parts?",
    options: [
      "Amino acid + sugar + phosphate",
      "Nitrogenous base + pentose sugar + phosphate group",
      "Fatty acid + glycerol + phosphate",
      "Glucose + nitrogen + oxygen",
    ],
    correctIndex: 1,
    explanation:
      "Each nucleotide consists of a nitrogenous base (A, T, G, C, or U), a five-carbon (pentose) sugar (deoxyribose in DNA, ribose in RNA), and one or more phosphate groups. These three parts are covalently bonded.",
  },
  {
    id: "bm9",
    topic: "biomolecules",
    question:
      "Which lipid type forms the structural basis of all cell membranes?",
    options: ["Triglycerides", "Steroids", "Waxes", "Phospholipids"],
    correctIndex: 3,
    explanation:
      "Phospholipids spontaneously arrange into a bilayer in aqueous environments — their hydrophilic heads face outward and hydrophobic tails face inward. This phospholipid bilayer is the fundamental structure of all cell membranes.",
  },
  {
    id: "bm10",
    topic: "biomolecules",
    question:
      "What unique feature of carbon makes it the backbone of all biomolecules?",
    options: [
      "It has 8 electrons in its outer shell",
      "It can form 4 covalent bonds and bond with itself",
      "It is the lightest element",
      "It dissolves easily in water",
    ],
    correctIndex: 1,
    explanation:
      "Carbon's ability to form four covalent bonds and bond with other carbon atoms allows it to create the enormous diversity of molecular structures needed for life — from simple sugars to complex proteins. This tetrahedral bonding capacity creates chains, rings, and branching structures.",
  },
];

// ─── Explanation paragraphs ────────────────────────────────────────────────────

const explanations = [
  {
    id: "intro",
    heading: "What Are Biomolecules and Why Do They Matter?",
    body: `Biomolecules are the organic molecules produced by and essential to all living organisms. The word "organic" in this context refers to carbon-containing compounds — and carbon's extraordinary ability to form four covalent bonds, including long chains and stable rings with other carbon atoms, makes it the ideal backbone for life's molecular machinery. Every cell, tissue, organ, and organism on Earth is built from these remarkable compounds. Without biomolecules, there would be no enzymes to catalyze reactions, no DNA to carry genetic information, no membranes to enclose cells, and no fuel for metabolic processes.

Biomolecules fall into four major classes: carbohydrates, lipids, nucleic acids, and proteins. Each class has a distinct chemical structure and carries out specific biological roles — yet they are deeply interconnected. A gene in your DNA encodes the instructions for building a protein; that protein may then catalyze the synthesis of a carbohydrate or regulate lipid metabolism. Understanding biomolecules means understanding the fundamental language of life, written in atoms and chemical bonds.`,
  },
  {
    id: "carbohydrates",
    heading: "Carbohydrates — Life's Primary Fuel and Structural Material",
    body: `Carbohydrates are molecules composed of carbon, hydrogen, and oxygen, typically in a 1:2:1 ratio (CH₂O)ₙ, hence the name. The simplest carbohydrates are monosaccharides — single-unit sugars that cannot be broken down further by hydrolysis. Glucose (C₆H₁₂O₆) is the most biologically important monosaccharide and serves as the primary energy currency for cellular respiration. Its ring form — a six-membered pyranose ring — is stabilized by the oxygen atom bridging carbon 1 and carbon 5. Other important monosaccharides include fructose (found in fruit), galactose (found in milk), and ribose (the sugar backbone of RNA).

When two monosaccharides join by a glycosidic bond through a condensation reaction (releasing water), they form a disaccharide. Sucrose (table sugar) is glucose + fructose; lactose (milk sugar) is glucose + galactose; maltose is glucose + glucose. Polysaccharides are long chains of monosaccharides serving structural or storage functions. Starch (in plants) and glycogen (in animals) store glucose for energy release. Cellulose, with its β-1,4-glycosidic linkages, forms the rigid walls of plant cells — a structural role so important that cellulose is the most abundant organic molecule on Earth. The geometry of these bonds determines whether an enzyme can break them, explaining why humans can digest starch but not cellulose.`,
  },
  {
    id: "lipids",
    heading: "Lipids — Membranes, Energy Reserves, and Signaling Molecules",
    body: `Lipids are a diverse group of hydrophobic or amphipathic molecules united by their poor solubility in water. The most common lipids are triglycerides — three fatty acid chains esterified to a glycerol backbone — which serve as the body's main long-term energy reservoir, storing more than twice as many calories per gram as carbohydrates. Fatty acids are long hydrocarbon chains with a carboxyl group (–COOH) at one end. Saturated fatty acids have no double bonds between carbons (every carbon is "saturated" with hydrogen), making them straight, tightly packing, and solid at room temperature (e.g., butter). Unsaturated fatty acids have one or more double bonds, creating kinks in the chain that prevent tight packing, keeping them liquid at room temperature (e.g., olive oil).

Phospholipids are perhaps the most critical lipids in biology. A phospholipid consists of a glycerol backbone, two fatty acid tails, and a phosphate group linked to a polar head group. This amphipathic structure — polar head that loves water, nonpolar tails that avoid it — causes phospholipids to spontaneously assemble into bilayer sheets in aqueous environments. The result is the cell membrane: a fluid, selectively permeable barrier that defines the cell. Steroids form another important lipid class. They have a characteristic four-ring carbon skeleton. Cholesterol, a steroid, is a membrane component that modulates fluidity. Steroid hormones like cortisol, testosterone, and estrogen regulate gene expression throughout the body.`,
  },
  {
    id: "nucleotides",
    heading: "Nucleotides — Information Carriers and Energy Molecules",
    body: `Nucleotides are the monomers of nucleic acids (DNA and RNA), but they also play crucial independent roles in cellular metabolism. Each nucleotide consists of three covalently bonded components: a nitrogenous base, a five-carbon (pentose) sugar, and one or more phosphate groups. The nitrogenous bases fall into two chemical classes — purines (adenine and guanine, with a two-ring structure) and pyrimidines (cytosine, thymine, and uracil, with a single ring). In DNA, the sugar is deoxyribose (lacking an oxygen at the 2' position); in RNA, the sugar is ribose (carrying a hydroxyl group at 2'). Nucleotides polymerize via phosphodiester bonds between the 3' carbon of one sugar and the 5' phosphate of the next, forming the sugar-phosphate backbone of nucleic acid strands.

Beyond building DNA and RNA, nucleotides serve as the cell's chemical energy carriers. ATP (adenosine triphosphate) stores energy in the high-energy bonds between its phosphate groups. When the terminal phosphate is cleaved by hydrolysis (yielding ADP + inorganic phosphate), energy is released to power muscle contraction, active transport, biosynthesis, and signaling. Other nucleotide derivatives serve as coenzymes: NAD⁺ (nicotinamide adenine dinucleotide) shuttles electrons in metabolic reactions, and cAMP (cyclic AMP) is a key second messenger in hormonal signaling cascades.`,
  },
  {
    id: "amino-acids",
    heading:
      "Amino Acids — The Versatile Monomers of Life's Functional Molecules",
    body: `Amino acids are organic molecules that serve as the building blocks of proteins — the most functionally diverse class of biomolecules. Every standard amino acid shares a common backbone structure: a central alpha-carbon (Cα) bonded to an amino group (–NH₂), a carboxyl group (–COOH), a hydrogen atom, and a unique side chain called the R-group. It is the R-group that distinguishes the 20 standard amino acids from one another. R-groups range from a single hydrogen atom (glycine, the simplest) to aromatic ring systems (tryptophan, phenylalanine) to charged or polar groups (aspartate carries a negative charge; lysine carries a positive charge). These properties of the side chains determine how proteins fold, how enzymes bind substrates, and how receptors recognize their ligands.

Amino acids are linked together by peptide bonds — covalent bonds formed in a condensation reaction between the carboxyl group of one amino acid and the amino group of the next, releasing a water molecule. A chain of amino acids is called a polypeptide. The sequence of amino acids in a polypeptide (its primary structure) determines how it folds into secondary structures (alpha helices, beta sheets), and ultimately its three-dimensional tertiary and quaternary structures. This folded, functional form is what we call a protein. Enzymes, antibodies, hormones (like insulin), structural proteins (like collagen), and transport proteins (like hemoglobin) are all polypeptides — each with a unique amino acid sequence encoding a unique function.`,
  },
  {
    id: "interconnections",
    heading: "How Biomolecules Interrelate in Living Systems",
    body: `Biomolecules do not exist in isolation — they are constantly interacting, transforming, and regulating one another in the extraordinarily complex chemistry of life. Carbohydrates are broken down in glycolysis to produce pyruvate, which feeds the citric acid cycle, generating the electrons captured by NAD⁺ (a nucleotide derivative) that ultimately drive ATP synthesis. Amino acids can be converted to glucose (gluconeogenesis) when carbohydrates are scarce, and excess glucose is converted to fatty acids for lipid storage. These metabolic interconversions mean that all four biomolecule classes are metabolically linked.

At the molecular level, the connections are equally profound. DNA — a polymer of nucleotides — encodes the sequence of amino acids in proteins via the genetic code. RNA (another nucleotide polymer) acts as an intermediary, carrying genetic messages (mRNA), forming the machinery of the ribosome (rRNA), and bringing amino acids to the ribosome (tRNA). Proteins, once synthesized, catalyze virtually every metabolic reaction, including the reactions that build and break down carbohydrates, lipids, and even nucleic acids. Lipid membranes, meanwhile, provide the compartments within which all of this chemistry occurs — and membrane proteins control what enters and exits each compartment. Life, at its molecular core, is an intricate dance among these four families of molecules, each enabling the others to function.`,
  },
];

// ─── Main section ──────────────────────────────────────────────────────────────

export default function BiomoleculesSection() {
  return (
    <section
      className="px-6 py-16 max-w-5xl mx-auto"
      data-ocid="biomolecules-section"
    >
      {/* Header */}
      <SectionHeader
        topicId="biomolecules"
        title="Biomolecules"
        subtitle="Life's molecular building blocks — from simple sugars to complex proteins, discover the chemistry that powers every living cell."
      />

      {/* Animated molecule diagrams */}
      <AnimatedEntrance direction="up" delay={0.1}>
        <div className="mb-14">
          <h3
            className="font-display text-xl font-semibold mb-6"
            style={{ color: "oklch(0.72 0.18 142)" }}
          >
            <Atom
              className="inline w-5 h-5 mr-2 animate-spin"
              style={{ animationDuration: "6s", color: "oklch(0.72 0.18 142)" }}
            />
            Interactive Molecular Diagrams
          </h3>
          <StaggerContainer
            className="grid grid-cols-2 md:grid-cols-4 gap-4"
            staggerDelay={0.12}
          >
            <StaggerItem>
              <MoleculeCard
                name="Glucose"
                badge="Monosaccharide"
                caption="The cell's primary fuel. A 6-carbon ring sugar (pyranose form) used in glycolysis and cellular respiration."
                diagram={<GlucoseRing />}
              />
            </StaggerItem>
            <StaggerItem>
              <MoleculeCard
                name="Fatty Acid"
                badge="Lipid monomer"
                caption="A hydrocarbon chain with a carboxyl head. Two fatty acid tails anchor every phospholipid in your cell membranes."
                diagram={<FattyAcidChain />}
              />
            </StaggerItem>
            <StaggerItem>
              <MoleculeCard
                name="Nucleotide"
                badge="DNA/RNA monomer"
                caption="Three-part unit: a nitrogenous base, pentose sugar, and phosphate group. ATP is a nucleotide that powers the cell."
                diagram={<NucleotideDiagram />}
              />
            </StaggerItem>
            <StaggerItem>
              <MoleculeCard
                name="Amino Acid"
                badge="Protein monomer"
                caption="A central α-carbon flanked by an amino group, carboxyl group, and unique R-group side chain determining identity."
                diagram={<AminoAcidDiagram />}
              />
            </StaggerItem>
          </StaggerContainer>
        </div>
      </AnimatedEntrance>

      {/* Deep explanations */}
      <StaggerContainer
        className="flex flex-col gap-8 mb-16"
        staggerDelay={0.09}
      >
        {explanations.map((section) => (
          <StaggerItem key={section.id}>
            <div
              className="rounded-2xl p-7"
              style={{
                background: "oklch(0.18 0 0)",
                border: "1px solid oklch(0.72 0.18 142 / 0.18)",
                boxShadow: "0 0 24px oklch(0.72 0.18 142 / 0.05)",
              }}
              data-ocid={`explanation-${section.id}`}
            >
              <h3
                className="font-display text-xl font-bold mb-4"
                style={{ color: "oklch(0.72 0.18 142)" }}
              >
                {section.heading}
              </h3>
              {section.body.split("\n\n").map((paragraph) => (
                <p
                  key={paragraph.slice(0, 40)}
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
          <h3 className="font-display text-2xl font-bold mb-2 accent-biomolecule glow-biomolecule">
            🧬 Test Your Knowledge
          </h3>
          <p className="text-muted-foreground mb-6">
            10 beginner-friendly questions covering biomolecule definitions,
            structures, and key concepts.
          </p>
          <QuizEngine topicId="biomolecules" questions={BIOMOLECULE_QUIZ} />
        </div>
      </AnimatedEntrance>
    </section>
  );
}
