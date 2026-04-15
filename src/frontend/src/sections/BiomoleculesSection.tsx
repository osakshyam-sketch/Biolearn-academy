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
        <svg
          viewBox="0 0 100 96"
          width="100"
          height="96"
          className="animate-float"
          style={{ filter: "drop-shadow(0 0 8px oklch(0.5 0.14 145 / 0.4))" }}
        >
          <polygon
            points="50,8 88,30 88,66 50,88 12,66 12,30"
            fill="none"
            stroke="oklch(0.5 0.14 145)"
            strokeWidth="3"
            strokeLinejoin="round"
          />
          <circle
            cx="50"
            cy="8"
            r="7"
            fill="oklch(0.97 0.01 75)"
            stroke="oklch(0.5 0.14 145)"
            strokeWidth="2"
          />
          <circle
            cx="88"
            cy="30"
            r="7"
            fill="oklch(0.97 0.01 75)"
            stroke="oklch(0.5 0.14 145)"
            strokeWidth="2"
          />
          <circle
            cx="88"
            cy="66"
            r="7"
            fill="oklch(0.97 0.01 75)"
            stroke="oklch(0.5 0.14 145)"
            strokeWidth="2"
          />
          <circle
            cx="50"
            cy="88"
            r="7"
            fill="oklch(0.97 0.01 75)"
            stroke="oklch(0.45 0.14 145)"
            strokeWidth="2"
          />
          <circle
            cx="12"
            cy="66"
            r="7"
            fill="oklch(0.97 0.01 75)"
            stroke="oklch(0.5 0.14 145)"
            strokeWidth="2"
          />
          <circle
            cx="12"
            cy="30"
            r="7"
            fill="oklch(0.97 0.01 75)"
            stroke="oklch(0.45 0.14 145)"
            strokeWidth="2"
          />
          <text
            x="50"
            y="12"
            textAnchor="middle"
            dominantBaseline="middle"
            fontSize="8"
            fill="oklch(0.4 0.14 145)"
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
            fill="oklch(0.4 0.14 145)"
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
            fill="oklch(0.4 0.14 145)"
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
            fill="oklch(0.35 0.1 145)"
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
            fill="oklch(0.4 0.14 145)"
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
            fill="oklch(0.35 0.1 145)"
            fontWeight="bold"
          >
            <title>Carbon atom</title>C
          </text>
          <line
            x1="50"
            y1="1"
            x2="50"
            y2="-8"
            stroke="oklch(0.5 0.14 145)"
            strokeWidth="1.5"
          />
          <text
            x="50"
            y="-11"
            textAnchor="middle"
            fontSize="7"
            fill="oklch(0.3 0.05 75)"
          >
            OH
          </text>
          <line
            x1="94"
            y1="28"
            x2="104"
            y2="22"
            stroke="oklch(0.5 0.14 145)"
            strokeWidth="1.5"
          />
          <text x="108" y="21" fontSize="7" fill="oklch(0.3 0.05 75)">
            OH
          </text>
          <line
            x1="94"
            y1="68"
            x2="104"
            y2="74"
            stroke="oklch(0.5 0.14 145)"
            strokeWidth="1.5"
          />
          <text x="108" y="77" fontSize="7" fill="oklch(0.3 0.05 75)">
            OH
          </text>
          <line
            x1="4"
            y1="68"
            x2="-6"
            y2="74"
            stroke="oklch(0.5 0.14 145)"
            strokeWidth="1.5"
          />
          <text x="-26" y="77" fontSize="7" fill="oklch(0.3 0.05 75)">
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
        <div className="flex flex-col items-center">
          <span
            className="text-xs font-bold"
            style={{ color: "oklch(0.55 0.14 36)" }}
          >
            O
          </span>
          <span
            className="text-[10px]"
            style={{ color: "oklch(0.5 0.14 145)" }}
          >
            ‖
          </span>
          <span
            className="text-xs font-bold"
            style={{ color: "oklch(0.5 0.14 145)" }}
          >
            C
          </span>
          <span
            className="text-[10px]"
            style={{ color: "oklch(0.5 0.14 145)" }}
          >
            |
          </span>
          <span
            className="text-xs font-bold"
            style={{ color: "oklch(0.55 0.14 36)" }}
          >
            OH
          </span>
        </div>
        <div
          className="w-2 h-0.5 rounded"
          style={{ background: "oklch(0.5 0.14 145)" }}
        />
        {atomKeys.map((key, i) => (
          <div key={key} className="flex items-center">
            <div
              className="w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold"
              style={{
                background: "oklch(0.94 0.02 75)",
                border: "1.5px solid oklch(0.5 0.14 145)",
                color: "oklch(0.4 0.14 145)",
                animationDelay: `${i * 0.2}s`,
              }}
            >
              C
            </div>
            {i < atomKeys.length - 1 && (
              <div
                className="w-2 h-0.5"
                style={{ background: "oklch(0.5 0.14 145)" }}
              />
            )}
          </div>
        ))}
        <div
          className="w-2 h-0.5 rounded"
          style={{ background: "oklch(0.5 0.14 145)" }}
        />
        <div
          className="w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold"
          style={{
            background: "oklch(0.94 0.02 75)",
            border: "1.5px solid oklch(0.45 0.12 145)",
            color: "oklch(0.4 0.12 145)",
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
        <div
          className="w-20 h-10 rounded-lg flex items-center justify-center text-xs font-bold"
          style={{
            background: "oklch(0.88 0.06 280)",
            border: "1.5px solid oklch(0.55 0.12 280)",
            color: "oklch(0.35 0.12 280)",
          }}
        >
          Base (A/T/G/C)
        </div>
        <div
          className="w-0.5 h-3"
          style={{ background: "oklch(0.5 0.14 145)" }}
        />
        <div
          className="w-20 h-10 rounded-lg flex items-center justify-center text-xs font-bold"
          style={{
            background: "oklch(0.90 0.06 145)",
            border: "1.5px solid oklch(0.5 0.14 145)",
            color: "oklch(0.35 0.12 145)",
          }}
        >
          Deoxyribose
        </div>
        <div
          className="w-0.5 h-3"
          style={{ background: "oklch(0.5 0.14 145)" }}
        />
        <div
          className="w-20 h-10 rounded-lg flex items-center justify-center text-xs font-bold"
          style={{
            background: "oklch(0.92 0.06 36)",
            border: "1.5px solid oklch(0.55 0.14 36)",
            color: "oklch(0.4 0.14 36)",
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
        <div className="flex flex-col items-center gap-0.5">
          <div
            className="px-2 py-1 rounded-lg text-xs font-bold"
            style={{
              background: "oklch(0.88 0.06 262)",
              border: "1.5px solid oklch(0.55 0.12 262)",
              color: "oklch(0.35 0.12 262)",
            }}
          >
            H₂N–
          </div>
          <span className="text-[9px] text-muted-foreground">Amino</span>
        </div>
        <div className="flex flex-col items-center gap-0.5">
          <div
            className="w-10 h-10 rounded-full flex items-center justify-center text-xs font-bold"
            style={{
              background: "oklch(0.90 0.07 145)",
              border: "2px solid oklch(0.5 0.14 145)",
              color: "oklch(0.35 0.14 145)",
            }}
          >
            Cα
          </div>
          <div
            className="w-0.5 h-3"
            style={{ background: "oklch(0.5 0.14 145)" }}
          />
          <div
            className="px-2 py-1 rounded-lg text-xs font-bold"
            style={{
              background: "oklch(0.92 0.07 36)",
              border: "1.5px solid oklch(0.55 0.14 36)",
              color: "oklch(0.4 0.14 36)",
            }}
          >
            R
          </div>
          <span className="text-[9px] text-muted-foreground">Side chain</span>
        </div>
        <div className="flex flex-col items-center gap-0.5">
          <div
            className="px-2 py-1 rounded-lg text-xs font-bold"
            style={{
              background: "oklch(0.92 0.06 36)",
              border: "1.5px solid oklch(0.55 0.12 36)",
              color: "oklch(0.4 0.12 36)",
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
        background: "oklch(0.98 0.01 75)",
        border: "1px solid oklch(0.5 0.12 145 / 0.25)",
        boxShadow: "0 2px 12px oklch(0.5 0.12 145 / 0.08)",
      }}
    >
      <div className="flex flex-col items-center gap-3 w-full">
        <div
          className="w-full flex items-center justify-center rounded-xl py-6 px-4 overflow-visible"
          style={{ background: "oklch(0.94 0.02 145 / 0.4)", minHeight: 120 }}
        >
          {diagram}
        </div>
        <span
          className="rounded-full px-3 py-0.5 text-xs font-semibold tracking-wide"
          style={{
            background: "oklch(0.88 0.08 145)",
            color: "oklch(0.35 0.12 145)",
            border: "1px solid oklch(0.5 0.12 145 / 0.3)",
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
    question:
      "Which of these correctly describes the difference between alpha and beta glycosidic linkages?",
    options: [
      "Alpha linkages point upward; beta linkages point downward — both are found in starch",
      "Alpha linkages (as in starch/glycogen) are digestible by humans; beta linkages (as in cellulose) are not, because our enzymes can't break them",
      "Alpha linkages are in RNA; beta linkages are in DNA",
      "Both alpha and beta linkages are found in triglycerides",
    ],
    correctIndex: 1,
    explanation:
      "This is one of biology's most elegant examples of how geometry determines function. Starch and cellulose are both made of glucose chains — but starch uses alpha-1,4-glycosidic bonds, and cellulose uses beta-1,4-glycosidic bonds. That single geometric difference means your amylase enzyme can digest starch easily but can't touch cellulose at all. Cows and termites can only digest cellulose because they have gut microbes that produce beta-glucosidases — not because they evolved different stomachs.",
  },
  {
    id: "bm2",
    topic: "biomolecules",
    question:
      "Which disaccharide causes lactose intolerance in people lacking lactase?",
    options: [
      "Sucrose (glucose + fructose)",
      "Maltose (glucose + glucose)",
      "Lactose (glucose + galactose)",
      "Cellobiose (glucose + glucose, beta linkage)",
    ],
    correctIndex: 2,
    explanation:
      "Lactose is glucose bonded to galactose via a beta-1,4-glycosidic link. To digest it, your small intestine needs lactase. Most mammals (and many adult humans) produce less lactase after weaning — a completely normal evolutionary adaptation, since most adults historically didn't drink milk. Without lactase, undigested lactose reaches the colon where gut bacteria ferment it, producing gas, bloating, and diarrhea. Fascinating side note: humans with Northern European ancestry evolved persistent lactase expression — a genetic mutation that spread rapidly when dairy farming became widespread ~10,000 years ago.",
  },
  {
    id: "bm3",
    topic: "biomolecules",
    question:
      "What is the key structural difference between a saturated and an unsaturated fatty acid?",
    options: [
      "Saturated fatty acids contain nitrogen; unsaturated ones do not",
      "Saturated fatty acids have no carbon-carbon double bonds, making them straight chains; unsaturated ones have one or more double bonds, causing 'kinks'",
      "Unsaturated fatty acids have more carbon atoms than saturated ones",
      "Saturated fatty acids are liquid at room temperature; unsaturated ones are solid",
    ],
    correctIndex: 1,
    explanation:
      "Saturated means every carbon in the chain is fully 'saturated' with hydrogen atoms — no double bonds, perfectly straight chains that pack tightly together (solid at room temperature, like butter or lard). Unsaturated fatty acids have one or more C=C double bonds that introduce a rigid kink, preventing tight packing — so they're liquid at room temperature (think olive oil). Trans fats are artificially straightened unsaturated fats (via industrial hydrogenation), which is why they behave like saturated fats and are associated with cardiovascular disease.",
  },
  {
    id: "bm4",
    topic: "biomolecules",
    question:
      "What makes a phospholipid amphipathic, and why does this matter for membrane formation?",
    options: [
      "It has both carbon and nitrogen atoms, allowing it to bond with anything",
      "It has a water-loving (hydrophilic) phosphate head and water-hating (hydrophobic) fatty acid tails — causing spontaneous bilayer formation in water",
      "It is positively charged, attracting negatively charged water molecules",
      "It contains a steroid ring that stabilizes the membrane",
    ],
    correctIndex: 1,
    explanation:
      "Amphipathic means 'both loves' — the molecule has a hydrophilic end (the charged phosphate head) and hydrophobic ends (the two fatty acid tails). Drop phospholipids in water and the tails self-organize away from water into the interior, while the heads face out into the aqueous environment — automatically forming a bilayer. No assembly instructions needed; thermodynamics drives it. This self-assembly principle is why cell membranes could plausibly arise spontaneously in early Earth conditions, which is a key part of theories about the origin of life.",
  },
  {
    id: "bm5",
    topic: "biomolecules",
    question:
      "Cholesterol is a steroid lipid. What two roles does it play in cell membranes?",
    options: [
      "It stores energy and provides color to the membrane",
      "It acts as a buffer — preventing membranes from being too rigid at low temperatures and too fluid at high temperatures, while also reducing permeability to ions",
      "It forms hydrogen bonds with water, making the membrane hydrophilic",
      "It catalyzes phospholipid synthesis and controls membrane thickness",
    ],
    correctIndex: 1,
    explanation:
      "Cholesterol is the membrane's thermostat. At low temperatures, it inserts between phospholipids and disrupts their tight packing, keeping the membrane fluid. At high temperatures, it restricts phospholipid movement, preventing the membrane from becoming too fluid. It also makes membranes less permeable to small polar molecules and ions. Interestingly, cholesterol is essential for life — it's the precursor to all steroid hormones (testosterone, estrogen, cortisol) and bile acids. The health concern is about having too much in the wrong lipoproteins, not about eliminating it entirely.",
  },
  {
    id: "bm6",
    topic: "biomolecules",
    question:
      "Which of the 20 amino acids is unique in containing a thiol (–SH) group that can form disulfide bridges?",
    options: [
      "Serine (has –OH group)",
      "Cysteine (has –SH group)",
      "Methionine (has –S–CH₃ group)",
      "Tyrosine (has aromatic –OH group)",
    ],
    correctIndex: 1,
    explanation:
      "Cysteine is special because its thiol group (–SH) can be oxidized to form a covalent disulfide bond (–S–S–) with another cysteine in the same or different protein. These disulfide bridges act like molecular staples, locking parts of the protein into a fixed conformation. They're especially important in secreted proteins (like antibodies and insulin) that face harsh oxidizing environments. Interestingly, insulin is actually synthesized as proinsulin — a single chain — and two disulfide bridges hold the functional two-chain form together after proteolytic processing.",
  },
  {
    id: "bm7",
    topic: "biomolecules",
    question:
      "What is the difference between a purine and a pyrimidine nucleobase, and which are found in DNA?",
    options: [
      "Purines are single-ring structures; pyrimidines are double-ring structures — DNA has A (purine) and G (purine), C (pyrimidine) and T (pyrimidine)",
      "Purines are double-ring structures (Adenine, Guanine); pyrimidines are single-ring structures (Cytosine, Thymine in DNA; Uracil in RNA)",
      "Purines are found only in RNA; pyrimidines only in DNA",
      "Purines and pyrimidines are identical in structure but differ in their sugar attachment",
    ],
    correctIndex: 1,
    explanation:
      "The distinction matters because it explains why A always pairs with T (not G), and G always pairs with C (not A). Each base pair consists of one purine and one pyrimidine — the double ring of the purine plus the single ring of the pyrimidine fits perfectly in the helix's fixed-width interior. A purine-purine pair would be too wide; a pyrimidine-pyrimidine pair too narrow. DNA uses A, G, C, and T (thymine). RNA replaces thymine with uracil — which is simply thymine without a methyl group, cheaper to synthesize for a short-lived molecule.",
  },
  {
    id: "bm8",
    topic: "biomolecules",
    question:
      "ATP is called the 'energy currency' of the cell. Why does breaking one phosphate bond release energy?",
    options: [
      "ATP contains a radioactive phosphate group that releases radiation",
      "The three phosphate groups are negatively charged and repel each other — breaking the terminal bond releases the strain energy stored in that repulsion",
      "ATP contains a high-energy carbon-nitrogen bond that releases energy when hydrolyzed",
      "The energy comes from the ribose sugar oxidation, not from the phosphate bonds",
    ],
    correctIndex: 1,
    explanation:
      "It's all about electrostatic repulsion. ATP has three phosphate groups in a row, all negatively charged — they're constantly pushing against each other. That strain stores energy like a compressed spring. When ATP is hydrolyzed to ADP + Pᵢ, the repulsion is relieved and ~30.5 kJ/mol is released. That energy is used to drive endergonic (energy-requiring) reactions, power motor proteins, pump ions against gradients, and synthesize molecules. Your body recycles roughly your own body weight in ATP every day — making and breaking it continuously through cellular respiration.",
  },
  {
    id: "bm9",
    topic: "biomolecules",
    question:
      "Why does cellulose provide structural support in plant cell walls but cannot be used as energy storage?",
    options: [
      "Cellulose is too large to enter the mitochondria for energy production",
      "Cellulose uses beta-1,4-glycosidic bonds, which form straight, rigid fibers ideal for structure but uncleavable by most organisms' digestive enzymes",
      "Cellulose contains phosphorus atoms that make it indigestible",
      "Cellulose is always found outside the cell, so cells cannot access it for energy",
    ],
    correctIndex: 1,
    explanation:
      "The beta-1,4-glycosidic bonds in cellulose cause the glucose chains to form long, straight fibers that stack together and form strong hydrogen bonds with neighboring chains — creating microfibrils with extraordinary tensile strength. Compare that to starch's alpha-1,4-glycosidic bonds, which cause the chain to coil into a helix — accessible to amylase and easily broken down. The same monomer (glucose), two different bond geometries, completely different biological roles. This is one of biochemistry's most beautiful examples of structure determining function.",
  },
  {
    id: "bm10",
    topic: "biomolecules",
    question:
      "What is the role of coenzymes like NAD⁺ and FAD in cellular metabolism?",
    options: [
      "They are structural components of the cell membrane that carry lipid molecules",
      "They are derived from vitamins (NAD⁺ from niacin/B3, FAD from riboflavin/B2) and serve as electron and hydrogen carriers in metabolic reactions like glycolysis and the citric acid cycle",
      "They are enzymes that directly catalyze the hydrolysis of phosphodiester bonds",
      "They are storage forms of glucose that can be rapidly mobilized for energy",
    ],
    correctIndex: 1,
    explanation:
      "NAD⁺ and FAD are electron carriers — molecular taxis that pick up electrons (as NADH and FADH₂) during glycolysis and the citric acid cycle, and deliver them to the electron transport chain to generate ATP. Here's the vitamin connection: NAD⁺ is synthesized from niacin (vitamin B3), and FAD from riboflavin (vitamin B2). That's why B-vitamin deficiencies can impair energy metabolism — you're literally short of the electron carriers that power ATP production. It's a direct link between dietary vitamins and cellular biochemistry that most people never appreciate.",
  },
];

// ─── Explanation paragraphs ────────────────────────────────────────────────────

const explanations = [
  {
    id: "intro",
    heading: "So, What Actually *Are* Biomolecules?",
    body: `Here's a fun way to think about it: your entire body is basically a remarkably sophisticated chemistry experiment. Every heartbeat, every thought, every time you digest a meal — it's all driven by molecular machines called biomolecules. And "organic molecule" just means carbon-based; carbon happens to be one of the most bond-happy atoms on the periodic table, capable of forming four bonds at once and chaining with other carbons endlessly. That's why life chose it.

Biomolecules fall into four major families: carbohydrates, lipids, nucleic acids, and proteins. Don't let those words intimidate you — they're really just different tools in the cell's toolkit. Carbohydrates store and deliver energy. Lipids build membranes and stash long-term fuel. Nucleic acids hold the genetic blueprint and read it out. Proteins do, well, almost everything else. And here's what makes it fascinating: they're not independent. A gene in your DNA tells a ribosome how to build a protein, and that protein might then break down a carbohydrate or assemble a lipid. It's a remarkably circular, self-sustaining system.`,
  },
  {
    id: "carbohydrates",
    heading: "Carbohydrates — Not Just Empty Calories",
    body: `Carbohydrates are the cell's first-choice fuel, and their diversity is extraordinary. The simplest are monosaccharides — single sugar units that cells can use directly. Glucose (C₆H₁₂O₆) is the six-carbon pyranose ring that feeds cellular respiration. Fructose (fruit sugar) and galactose (milk sugar) have the same molecular formula as glucose but different three-dimensional arrangements — they're structural isomers, and that geometric difference changes how enzymes recognize and process them. Ribose and deoxyribose are five-carbon monosaccharides (pentoses) that form the backbone of RNA and DNA respectively. The way a sugar's –OH groups point in space defines whether it is recognized by receptors, digestible by enzymes, or built into structural polymers.

Link two monosaccharides via a glycosidic bond and you get a disaccharide. Sucrose (table sugar) is glucose + fructose, joined by an alpha-1,beta-2-glycosidic bond — non-reducing because both anomeric carbons are involved. Lactose (milk sugar) is glucose + galactose via beta-1,4 linkage. Maltose (in germinating grains) is glucose + glucose via alpha-1,4 linkage — a reducing sugar because one anomeric carbon remains free. The nature of that glycosidic bond matters enormously: alpha-1,4 bonds in starch make it digestible; beta-1,4 bonds in cellulose make it indigestible to humans (though bacteria with beta-glucosidases can break it down, which is why herbivores with the right gut microbiome can survive on grass).

Polysaccharides are long chains of monosaccharides serving two master roles. For energy storage: glycogen is the animal world's emergency pantry — a highly branched glucose polymer (with alpha-1,4 main chains and alpha-1,6 branch points every 8–12 residues) stored in liver (releasing glucose to blood) and muscle (fueling contraction). Plants use starch: amylose is an unbranched helix held by alpha-1,4 bonds; amylopectin is branched like glycogen, with branch points every 24–30 residues. For structural roles: cellulose (beta-1,4 glucose, the most abundant organic polymer on Earth) forms the rigid cell walls of every plant; chitin (N-acetylglucosamine polymer with beta-1,4 bonds) armors insect and crustacean exoskeletons and fungal cell walls; peptidoglycans form bacterial cell walls. Beyond these classic roles, glycoproteins (sugars covalently attached to proteins) and proteoglycans (core proteins with large glycosaminoglycan chains) line cell surfaces for molecular recognition, lubrication of joint cartilage, and coordinating cell signaling.`,
  },
  {
    id: "lipids",
    heading: "Lipids — The Underappreciated Molecules",
    body: `Lipids get a bad reputation in popular culture, but your cells couldn't survive without them. The most familiar are triglycerides — three fatty acid chains esterified onto a glycerol backbone — which are your body's preferred long-term energy storage. One gram of fat stores about 9 kcal, more than twice the 4 kcal from a gram of carbohydrate or protein. That's because fats are mostly C–H bonds, which are more reduced (energy-rich) than the C–OH bonds in carbohydrates.

Fatty acids vary in chain length (typically 12–22 carbons) and saturation. Saturated fatty acids (no double bonds: palmitic acid C16:0, stearic C18:0) pack tightly into solids at room temperature — think butter, lard. Monounsaturated fatty acids have one double bond (oleic acid, C18:1, the main component of olive oil). Polyunsaturated fatty acids have two or more double bonds: omega-6 fatty acids (linoleic acid, C18:2, precursor to arachidonic acid) and omega-3 fatty acids (alpha-linolenic acid C18:3; EPA and DHA found in fish oils) are essential — your body can't synthesize them, so they must come from diet. Both kink the chain, keeping cell membranes fluid and reducing inflammation via eicosanoid synthesis. Trans fatty acids — produced by partial hydrogenation — are unsaturated but with an unnatural trans configuration that behaves metabolically like saturated fats and is strongly associated with cardiovascular disease; most countries are phasing them out of food supplies.

The real MVP of lipids is the phospholipid. Its glycerol backbone carries two fatty acid tails (hydrophobic) and a phosphate group linked to a polar head group — either choline (phosphatidylcholine), serine (phosphatidylserine), ethanolamine (phosphatidylethanolamine), or inositol (phosphatidylinositol). That combination makes phospholipids amphipathic: hydrophilic head, hydrophobic tails. Drop phospholipids in water and they spontaneously form a bilayer — no blueprint needed, just thermodynamics. That bilayer is the foundation of every cell membrane on Earth. Steroids are a structurally distinct lipid class — built around a four-ring carbon scaffold. Cholesterol moderates membrane fluidity, acting as a thermal buffer. Its derivatives — testosterone, estrogen, progesterone, cortisol, aldosterone, vitamin D — are steroid hormones that travel to cell nuclei and directly regulate gene expression. Waxes (long-chain fatty acids esterified to alcohols) waterproof plant cuticles and insect exoskeletons. Eicosanoids (prostaglandins, leukotrienes, thromboxanes) are 20-carbon lipid signaling molecules derived from arachidonic acid that coordinate inflammation, fever, pain, and immune responses — aspirin and ibuprofen work by blocking eicosanoid synthesis.`,
  },
  {
    id: "proteins-overview",
    heading: "Proteins — The Molecular Workforce",
    body: `Proteins deserve their own full section (which they get — check out the Proteins section for the deep dive!), but no biomolecules overview is complete without appreciating how uniquely versatile they are. Just 20 standard amino acids, combined in different sequences and lengths, generate thousands of structurally and functionally distinct proteins. What makes amino acids different from each other is the R group (side chain). Nonpolar aliphatic side chains (glycine, alanine, valine, leucine, isoleucine, proline, methionine) are hydrophobic and tend to cluster in protein interiors, driving folding. Aromatic side chains (phenylalanine, tryptophan, tyrosine) are hydrophobic but also participate in pi-stacking interactions. Polar uncharged side chains (serine, threonine, cysteine, asparagine, glutamine) can form hydrogen bonds with water and other polar groups. Charged side chains split into acidic (aspartate and glutamate carry negative charges) and basic (lysine, arginine, histidine carry positive charges at physiological pH), forming ionic interactions and salt bridges.

Peptide bonds (–CO–NH–) link amino acids together in a polypeptide chain, with the sequence reading from the N-terminus (free amino group) to the C-terminus (free carboxyl group). The peptide bond has partial double-bond character due to resonance, making it planar — a constraint that profoundly shapes how proteins fold. From primary sequence, proteins fold into secondary structures: alpha-helices (held by backbone hydrogen bonds every 3.6 residues) and beta-sheets (parallel or antiparallel hydrogen bonds between strands). Secondary structures pack into compact tertiary structures stabilized by hydrophobic interactions, hydrogen bonds, ionic bonds, van der Waals forces, and in secreted proteins, disulfide bridges. Some proteins assemble into quaternary complexes (hemoglobin: 4 subunits; collagen: 3 intertwined chains). Molecular chaperones (Hsp70, Hsp90, the GroEL/GroES chaperonin barrel) assist folding in the crowded cellular environment and refold stress-denatured proteins. Misfolded proteins that can't be salvaged are tagged with ubiquitin and degraded by the 26S proteasome. When this quality-control system fails, aggregated proteins accumulate — the molecular basis of Alzheimer's (amyloid-beta), Parkinson's (alpha-synuclein), and prion diseases.`,
  },
  {
    id: "nucleotides",
    heading: "Nucleotides — Tiny Molecules With Huge Jobs",
    body: `Think of nucleotides as the alphabet of genetics, but they're much more than just letters. Each nucleotide is a three-part assembly: a nitrogenous base, a five-carbon pentose sugar, and one or more phosphate groups. The bases come in two structural families: double-ring purines (adenine and guanine — remember, purines are Pure As Gold: Purines = A and G) and single-ring pyrimidines (cytosine in both DNA and RNA; thymine in DNA only; uracil in RNA only — CUT the PYrimidines). In DNA the sugar is deoxyribose (2'-deoxy, lacking a hydroxyl group); in RNA it's ribose (with a 2'-OH group that makes RNA more reactive, more prone to hydrolysis, and less stable than DNA — perfect for a temporary messenger).

Nucleotides link into polymers through phosphodiester bonds, connecting the 3' carbon of one sugar to the 5' carbon of the next, creating a directional backbone. DNA strands run antiparallel: one 5'→3', the complementary strand 3'→5'. This directionality is critical — all DNA and RNA polymerases can only synthesize in the 5'→3' direction, adding nucleotides to the 3' end. The two DNA strands are held together by hydrogen bonds between complementary bases: A pairs with T (2 H-bonds, weaker), G pairs with C (3 H-bonds, stronger). G-C rich regions need more energy to separate — which is why G-C content affects DNA melting temperature, relevant to PCR primer design and understanding genomic stability in thermophiles.

But nucleotides wear many hats beyond being genetic letters. ATP (adenosine triphosphate) is the cell's universal energy currency — cleaving its terminal phosphate releases ~30.5 kJ/mol to power nearly every energy-demanding reaction in the cell. GTP fuels ribosomal translocation and G-protein signaling. NAD⁺ and FAD (both nucleotide derivatives) are coenzymes that carry electrons and hydrogen atoms in metabolic pathways — and they're synthesized from dietary vitamins B3 and B2, which is why B-vitamin deficiencies impair energy metabolism. Cyclic AMP (cAMP, made from ATP by adenylyl cyclase when hormones like glucagon or adrenaline bind surface receptors) is a second messenger that relays hormonal signals deep inside the cell to activate protein kinase A. Coenzyme A (CoA, containing adenine nucleotide plus pantothenic acid — vitamin B5) is essential for activating acetyl groups for fatty acid synthesis and the citric acid cycle. The versatility of the nucleotide scaffold is one of evolution's most repeatedly exploited design motifs.`,
  },
  {
    id: "enzymes-cofactors",
    heading: "Enzymes, Cofactors, and the Vitamins Behind Them",
    body: `You've probably learned that enzymes are proteins that speed up reactions — but the full picture is richer. Enzymes work by binding their substrate in an active site and stabilizing the transition state, lowering the activation energy so the reaction proceeds orders of magnitude faster than it would spontaneously. The classic 'lock and key' analogy captures the specificity but not the dynamics. The better model is 'induced fit' — both enzyme and substrate change shape slightly when they meet, optimizing the active site geometry around the transition state. Many enzymes need additional non-protein components to function: these are cofactors.

Inorganic cofactors are metal ions that stabilize charged intermediates, mediate electron transfer, or coordinate substrate binding. Zinc (Zn²⁺) is crucial for DNA polymerase (coordinating the nucleotide triphosphate), carbonic anhydrase (catalyzing CO₂ hydration in red blood cells), and alcohol dehydrogenase. Iron (Fe²⁺/Fe³⁺) is in hemoglobin and myoglobin (O₂ transport), cytochromes of the electron transport chain, catalase (decomposing H₂O₂), and non-heme iron-sulfur clusters. Magnesium (Mg²⁺) is required by virtually all kinases (it chelates ATP, orienting the phosphate for transfer) and by ribosomes for their structure and catalysis. Copper (Cu²⁺) is found in cytochrome c oxidase (Complex IV), ceruloplasmin, and lysyl oxidase for collagen crosslinking. Manganese (Mn²⁺) is in the oxygen-evolving complex of photosystem II and in manganese superoxide dismutase.

Organic cofactors called coenzymes are typically derived from vitamins and must come from the diet because most animals lost the ability to synthesize them. Thiamine pyrophosphate (TPP, from vitamin B1/thiamine) is used by pyruvate dehydrogenase and alpha-ketoglutarate dehydrogenase for decarboxylation reactions. NAD⁺/NADH (from B3/niacin) participate in over 500 oxidation-reduction reactions — a deficiency causes pellagra, characterized by the 4 D's: dermatitis, diarrhea, dementia, and death. FAD/FADH₂ (from B2/riboflavin) are electron carriers in succinate dehydrogenase and fatty acid oxidation. Pyridoxal phosphate (PLP, from B6/pyridoxine) is involved in nearly all amino acid transamination and decarboxylation reactions. Cobalamin (B12, the only vitamin with a cobalt atom) is essential for methyl group transfer and for maintaining the myelin sheaths of neurons — deficiency causes pernicious anemia and neurological damage. Biotin is a prosthetic group on carboxylase enzymes that add CO₂. Tetrahydrofolate (from folate/B9) carries one-carbon units for nucleotide synthesis, which is why folate deficiency causes megaloblastic anemia and why pregnant women take folic acid to prevent neural tube defects. Vitamin C (ascorbate) is required for proline hydroxylation in collagen synthesis — scurvy was the sailors' disease because of collagen-deficient connective tissue failing without dietary vitamin C.`,
  },
  {
    id: "interconnections",
    heading: "How These Four Families Talk to Each Other",
    body: `Biomolecules never work in isolation. They form a remarkably integrated system where each family enables, regulates, and converts into the others. When you eat a meal, carbohydrates get broken down to glucose, which feeds glycolysis. Glycolysis products feed the citric acid cycle, which generates electron-carrying NADH and FADH₂ (nucleotide coenzymes) to the electron transport chain, which makes ATP (another nucleotide) that powers every energy-requiring process in the cell.

When you eat more glucose than you need for immediate energy, enzymes (proteins!) activate a signaling cascade triggered by insulin (a protein hormone), causing GLUT4 transporters (membrane proteins) to shuttle glucose into muscle and fat cells, where it's stored as glycogen (carbohydrate) or converted to fatty acids via acetyl-CoA (lipid). If you're fasting, glucagon (another protein hormone) signals the liver to break down glycogen and release glucose; if fasting continues, fat mobilization (lipolysis) releases fatty acids from adipose tissue to be oxidized in the mitochondria; if that's insufficient, amino acids are deaminated and converted to glucose in gluconeogenesis — you're actually consuming protein to make carbohydrate.

At the molecular level, these connections run even deeper: DNA (a nucleotide polymer) carries the instructions for building every protein; RNA (another nucleotide polymer) carries those instructions to ribosomes; the ribosome itself is an RNA-protein complex (a ribozyme — the peptidyl transferase center is catalytic RNA, not protein); the finished proteins catalyze virtually every reaction involving carbohydrates, lipids, and nucleic acids; and all of this chemistry happens inside compartments defined by phospholipid membranes. Life, at its core, is these four molecular families in a self-sustaining cycle — and recognizing those connections transforms biochemistry from memorization into one of the most logically coherent bodies of knowledge in science.`,
  },
];

// ─── Interesting facts ─────────────────────────────────────────────────────────

const INTERESTING_FACTS = [
  {
    icon: "🧬",
    fact: "Your body recycles roughly its own weight in ATP every day — making and breaking ~40 kg of it continuously through cellular respiration.",
  },
  {
    icon: "🌿",
    fact: "Cellulose is the most abundant organic polymer on Earth — every plant cell wall is made of it, yet humans can't digest a single gram of it.",
  },
  {
    icon: "💧",
    fact: "A phospholipid bilayer self-assembles spontaneously in water — no instructions needed, just the physics of water-fearing tails hiding from water.",
  },
  {
    icon: "🔬",
    fact: "The 20 amino acids can be combined into chains of 100–300 residues with 20¹⁰⁰ possible sequences — more combinations than atoms in the universe.",
  },
  {
    icon: "🍊",
    fact: "Vitamin C (ascorbic acid) is technically a carbohydrate derivative — a six-carbon lactone — and works as a cofactor by donating electrons to keep iron in its active Fe²⁺ state in collagen-synthesizing enzymes.",
  },
  {
    icon: "🐟",
    fact: "Omega-3 fatty acids EPA and DHA are essential for brain development — the reason breast milk and many infant formulas are enriched with them. The human brain is roughly 60% fat by dry weight.",
  },
];

// ─── Main section ──────────────────────────────────────────────────────────────

export default function BiomoleculesSection() {
  return (
    <section
      className="px-6 py-16 max-w-5xl mx-auto"
      data-ocid="biomolecules-section"
      style={{ background: "oklch(0.97 0.015 75)" }}
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
            style={{ color: "oklch(0.45 0.14 145)" }}
          >
            <Atom
              className="inline w-5 h-5 mr-2 animate-spin"
              style={{ animationDuration: "6s", color: "oklch(0.45 0.14 145)" }}
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
                caption="The cell's primary fuel. A 6-carbon pyranose ring used in glycolysis and cellular respiration. Alpha form in starch; beta form in cellulose."
                diagram={<GlucoseRing />}
              />
            </StaggerItem>
            <StaggerItem>
              <MoleculeCard
                name="Fatty Acid"
                badge="Lipid monomer"
                caption="A hydrocarbon chain with a carboxyl head. Saturated = no double bonds (solid); unsaturated = kinks (liquid). Two tails anchor every phospholipid."
                diagram={<FattyAcidChain />}
              />
            </StaggerItem>
            <StaggerItem>
              <MoleculeCard
                name="Nucleotide"
                badge="DNA/RNA monomer"
                caption="Three-part unit: a nitrogenous base (purine or pyrimidine), pentose sugar, and phosphate group. ATP is a nucleotide that powers the entire cell."
                diagram={<NucleotideDiagram />}
              />
            </StaggerItem>
            <StaggerItem>
              <MoleculeCard
                name="Amino Acid"
                badge="Protein monomer"
                caption="A central α-carbon flanked by an amino group, carboxyl group, and unique R-group. The R-group's properties (charge, polarity, size) determine everything."
                diagram={<AminoAcidDiagram />}
              />
            </StaggerItem>
          </StaggerContainer>
        </div>
      </AnimatedEntrance>

      {/* Interesting facts strip */}
      <AnimatedEntrance direction="up" delay={0.1}>
        <div className="mb-12 grid grid-cols-1 sm:grid-cols-2 gap-3">
          {INTERESTING_FACTS.map((item) => (
            <div
              key={item.fact.slice(0, 30)}
              className="flex items-start gap-3 rounded-xl p-4"
              style={{
                background: "oklch(0.94 0.04 145 / 0.3)",
                border: "1px solid oklch(0.5 0.12 145 / 0.18)",
              }}
            >
              <span className="text-2xl shrink-0">{item.icon}</span>
              <p
                className="text-sm leading-relaxed"
                style={{ color: "oklch(0.32 0.04 75)" }}
              >
                {item.fact}
              </p>
            </div>
          ))}
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
              id={`biomolecules-${section.id}`}
              className="rounded-2xl p-7"
              style={{
                background: "oklch(0.99 0.008 145 / 0.6)",
                border: "1px solid oklch(0.5 0.12 145 / 0.18)",
                boxShadow: "0 2px 16px oklch(0.5 0.12 145 / 0.06)",
              }}
              data-ocid={`explanation-${section.id}`}
            >
              <h3
                className="font-display text-xl font-bold mb-4"
                style={{ color: "oklch(0.38 0.14 145)" }}
              >
                {section.heading}
              </h3>
              {section.body.split("\n\n").map((paragraph) => (
                <p
                  key={paragraph.slice(0, 40)}
                  className="text-foreground leading-relaxed mb-4 last:mb-0 text-[0.95rem]"
                  style={{ color: "oklch(0.3 0.03 75)" }}
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
        <div
          className="rounded-2xl p-6 mb-4"
          style={{
            background: "oklch(0.98 0.01 75)",
            border: "1px solid oklch(0.5 0.12 145 / 0.2)",
          }}
        >
          <h3 className="font-display text-2xl font-bold mb-2 accent-biomolecule">
            🧬 Test Your Knowledge
          </h3>
          <p className="text-muted-foreground mb-6">
            10 questions spanning all four biomolecule families — a mix of
            concepts, mechanisms, and real-world connections. Don't worry if you
            miss some; the explanations are the real learning.
          </p>
          <QuizEngine topicId="biomolecules" questions={BIOMOLECULE_QUIZ} />
        </div>
      </AnimatedEntrance>
    </section>
  );
}
