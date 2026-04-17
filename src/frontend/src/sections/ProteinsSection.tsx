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
      "What makes each of the 20 amino acids different from one another, and why does it matter for how a protein folds?",
    options: [
      "Amino acids differ in the number of peptide bonds they form — more bonds means the amino acid pulls harder on neighbouring residues",
      "What differs is the R group (side chain) — its size, charge, and whether it likes or dislikes water determines where each residue ends up in a folded protein and drives the overall 3D shape",
      "All amino acids are identical in chemistry; only the order in which they appear in the chain distinguishes them",
      "Amino acids differ only in molecular weight — heavier ones sink to the protein interior; lighter ones float to the surface",
    ],
    correctIndex: 1,
    explanation:
      "The backbone of every amino acid is the same — it's the R group (side chain) that makes each one unique. Nonpolar, hydrophobic side chains (glycine, alanine, valine, leucine, and others) hate being in contact with water, so they cluster in the protein's interior, away from the aqueous environment. This hydrophobic collapse is the main driving force of protein folding. Polar uncharged side chains (serine, threonine, asparagine) can form hydrogen bonds. Charged side chains (lysine, arginine = positive; aspartate, glutamate = negative) sit on the protein's surface where they interact with water and other molecules. One change in the right place can completely alter a protein's behaviour — the single missense mutation that causes sickle cell disease is a perfect example.",
    topic: "proteins",
  },
  {
    id: "p2",
    question:
      "Peptide bonds connect amino acids in a chain. What makes the peptide bond chemically special, and why does that matter for protein structure?",
    options: [
      "The peptide bond is the strongest bond in biology and never breaks under any cellular conditions",
      "The peptide bond has partial double-bond character due to electron delocalisation, making the atoms around it coplanar (flat and rigid) — this constrains the angles at which the chain can fold and fundamentally influences secondary structure",
      "The peptide bond is a hydrogen bond between the R groups of neighbouring amino acids and is easily reversible",
      "The peptide bond connects the R groups directly, not the backbone — it's what gives each protein its unique properties",
    ],
    correctIndex: 1,
    explanation:
      "The peptide bond (–CO–NH–) is formed when the carboxyl group of one amino acid reacts with the amino group of the next, releasing a water molecule. Here's what makes it special: resonance between the C=O and C–N bonds gives the peptide group partial double-bond character. This means the six atoms in the peptide unit are locked in a flat, rigid plane — they can't freely rotate around the C–N bond. This planarity severely limits the possible conformations of the protein backbone, which is why proteins settle into regular, repeating secondary structures like alpha helices and beta sheets rather than random tangles. It's a fundamental constraint that shapes all protein structure.",
    topic: "proteins",
  },
  {
    id: "p3",
    question:
      "What is the primary structure of a protein, and why is the sequence so important?",
    options: [
      "Primary structure is the 3D folded shape of the protein",
      "Primary structure is the linear sequence of amino acids from N-terminus to C-terminus — encoded directly in the gene. It contains all the information needed to fold into the correct 3D shape",
      "Primary structure is the alpha-helical coiling pattern found in most proteins",
      "Primary structure refers to the association of multiple polypeptide chains in a complex",
    ],
    correctIndex: 1,
    explanation:
      "Primary structure is simply the order — amino acid number 1, number 2, number 3, and so on from the N-terminus (the amino end) to the C-terminus (the carboxyl end). It's determined directly by the DNA sequence of the gene. Here's the remarkable thing: Christian Anfinsen showed in the 1960s that this sequence alone contains all the information needed to fold the protein into its correct 3D structure. He denatured (unfolded) ribonuclease A and then allowed it to refold — it regained full activity, demonstrating that no external template is needed. Change one critical amino acid and you can get a devastating disease: sickle cell anaemia is caused by one missense mutation (glutamic acid → valine at position 6 of haemoglobin's beta chain). Primary structure is the root of everything.",
    topic: "proteins",
  },
  {
    id: "p4",
    question: "What is an alpha helix, and why does proline break it?",
    options: [
      "The alpha helix is left-handed; proline breaks it because its large aromatic ring physically blocks helix formation",
      "The alpha helix is a right-handed coil with 3.6 residues per turn, stabilised by backbone hydrogen bonds between residue n and residue n+4. Proline breaks helices because its cyclic side chain locks the backbone angle and it lacks the N–H needed for the hydrogen bond",
      "Alpha helices have 4 residues per turn and are stabilised by R-group hydrogen bonds; proline breaks them because it's negatively charged",
      "The alpha helix is held together by disulfide bonds; proline breaks helices by competing for these bonds",
    ],
    correctIndex: 1,
    explanation:
      "Think of the alpha helix like a spiral staircase — a right-handed coil where the backbone winds around a central axis. Every 3.6 amino acids, the backbone has made one complete turn. What holds it together? Hydrogen bonds between the carbonyl oxygen (C=O) of residue n and the amide nitrogen (N–H) of residue n+4, running roughly parallel to the helix axis. Proline is the classic 'helix breaker': its side chain forms a ring that includes the nitrogen atom, fixing the backbone angle in a position that doesn't fit helix geometry and — crucially — removing the N–H group needed for the stabilising hydrogen bond. So proline forces a kink or turn. You'll often find proline at helix ends or in tight connecting loops.",
    topic: "proteins",
  },
  {
    id: "p5",
    question:
      "You test two enzymes: one has a Km of 0.1 mM, the other has a Km of 10 mM. Which enzyme has higher affinity for its substrate, and what does Vmax tell you?",
    options: [
      "Higher Km means higher affinity; the enzyme with Km 10 mM is better at grabbing its substrate",
      "Lower Km means higher affinity — the enzyme with Km 0.1 mM reaches half its maximum speed at much lower substrate concentration, meaning it's more efficient at grabbing substrate. Vmax is the maximum rate the enzyme can achieve when fully loaded",
      "Km and affinity are unrelated; Km only tells you the enzyme's optimal temperature",
      "Both enzymes have the same affinity since Km only changes under inhibition conditions",
    ],
    correctIndex: 1,
    explanation:
      "The Michaelis constant (Km) is the substrate concentration needed to reach half the maximum reaction speed. A low Km means the enzyme reaches half its speed at very low substrate concentrations — it's highly sensitive to small amounts of substrate and has high affinity. A high Km means you need much more substrate to get the same effect — lower affinity. The enzyme with Km = 0.1 mM would be working near full speed in conditions where Km = 10 mM enzyme is barely ticking over. Vmax is the maximum speed when every enzyme molecule is fully loaded with substrate — it's related to how fast the enzyme can process substrate once bound. These two numbers together define an enzyme's performance profile in a cell.",
    topic: "proteins",
  },
  {
    id: "p6",
    question:
      "Haemoglobin carries oxygen cooperatively. What does 'cooperative' mean here, and what is the Bohr effect?",
    options: [
      "Cooperative binding means all four haemoglobin subunits bind oxygen simultaneously in one step",
      "Cooperative binding means each oxygen molecule bound makes the next binding event easier — haemoglobin switches between a low-affinity T-state and a high-affinity R-state. The Bohr effect means high CO₂ and H⁺ (in active tissues) shift haemoglobin toward T-state, releasing oxygen exactly where it's needed",
      "Cooperative binding means haemoglobin and myoglobin work together in the bloodstream to share oxygen molecules",
      "The Bohr effect is the process by which haemoglobin is synthesised in bone marrow",
    ],
    correctIndex: 1,
    explanation:
      "Haemoglobin is one of the most elegant examples of allosteric regulation in biology. It has four subunits (two alpha and two beta chains, each with a haem group that binds one oxygen). In the deoxy T-state (tense), subunits are in a constrained shape with low oxygen affinity. When the first oxygen binds, it shifts that subunit toward the R-state (relaxed), which nudges the other subunits toward R-state too, making them more likely to bind oxygen. This chain reaction produces the characteristic S-shaped oxygen binding curve — far more efficient for oxygen delivery than a simple non-cooperative protein like myoglobin. The Bohr effect is what makes haemoglobin a brilliant oxygen delivery system: in active tissues where CO₂ and H⁺ are high, haemoglobin's affinity drops, releasing oxygen right where metabolic demand is greatest.",
    topic: "proteins",
  },
  {
    id: "p7",
    question:
      "There are six classes of enzymes in the EC system. Can you name them and give one example of each?",
    options: [
      "Kinases, phosphatases, proteases, synthases, ligases, transferases",
      "Oxidoreductases (e.g. lactate dehydrogenase), transferases (hexokinase), hydrolases (pepsin), lyases (pyruvate decarboxylase), isomerases (phosphoglucose isomerase), ligases (DNA ligase)",
      "Polymerases, nucleases, kinases, phosphatases, proteases, glycosidases",
      "There is only one enzyme class; the EC number just describes the substrate",
    ],
    correctIndex: 1,
    explanation:
      "The six EC classes describe every chemical reaction catalysed by an enzyme. Oxidoreductases transfer electrons or hydrogen between molecules — lactate dehydrogenase converts pyruvate to lactate. Transferases move functional groups from one molecule to another — hexokinase transfers a phosphate from ATP to glucose. Hydrolases cleave bonds using water — pepsin, trypsin, and lipase all belong here. Lyases break bonds without water, often forming double bonds — pyruvate decarboxylase removes CO₂ from pyruvate. Isomerases convert a molecule to a structural isomer — phosphoglucose isomerase converts glucose-6-phosphate to fructose-6-phosphate in glycolysis. Ligases join two molecules using ATP — DNA ligase seals nicks in DNA. These six classes cover every chemical transformation in metabolism.",
    topic: "proteins",
  },
  {
    id: "p8",
    question:
      "What are post-translational modifications (PTMs), and why do they dramatically increase what the proteome can do?",
    options: [
      "PTMs change the amino acid sequence after translation; they're caused only by mutations",
      "PTMs are chemical additions to proteins after they're made — phosphorylation switches proteins on/off, glycosylation aids folding and targeting, ubiquitination marks proteins for degradation. They expand functional diversity far beyond what 20,000 genes alone could achieve",
      "PTMs only remove the signal peptide from secreted proteins — all other modifications are co-translational",
      "PTMs only affect membrane proteins; cytosolic proteins have fixed, unmodifiable functions",
    ],
    correctIndex: 1,
    explanation:
      "Proteins aren't finished products when translation ends — they're raw materials that get extensively modified. Phosphorylation is the most important regulatory PTM: kinase enzymes add phosphate groups to serine, threonine, or tyrosine residues, changing the protein's shape and interactions. This is how most cell signalling cascades work — information flows through a chain of phosphorylation events from a receptor at the cell surface deep into the nucleus. Phosphatase enzymes remove phosphates to reverse the signal. Glycosylation attaches sugar chains that help proteins fold correctly in the ER, target them to the right compartment, and mark them for immune recognition. Ubiquitination adds a small 76-amino acid protein tag that marks the protein for destruction by the proteasome. The combination of 20,000 genes × multiple splice variants × many possible PTMs means the actual functional proteome is vastly more complex than the genome alone suggests.",
    topic: "proteins",
  },
  {
    id: "p9",
    question:
      "Your cells are crowded with proteins that could accidentally stick together. How do molecular chaperones prevent protein misfolding, and what happens when they fail?",
    options: [
      "Chaperones permanently bind to proteins, keeping them in an unfolded state for storage until needed",
      "Chaperones (like Hsp70 and GroEL/GroES) bind exposed hydrophobic patches on newly made proteins, preventing them from sticking to other proteins. They provide a protected environment for proper folding, then release the correctly folded protein",
      "Chaperones are ribozymes that catalyse peptide bond formation, making sure the protein sequence is correct",
      "Chaperones only assist membrane protein folding; soluble cytosolic proteins fold spontaneously without any help",
    ],
    correctIndex: 1,
    explanation:
      "Protein folding in a crowded cell (where protein concentration can reach 300 mg per millilitre) is nothing like folding in a test tube. As a new protein chain emerges from the ribosome, its hydrophobic sections are exposed and could stick to hydrophobic sections on other unfolded proteins nearby — forming aggregates rather than properly folded proteins. Hsp70 (heat shock protein 70) acts first: it grabs exposed hydrophobic stretches on nascent chains, holding them safely while the chain finishes synthesis. GroEL/GroES (in bacteria; Hsp60/Hsp10 in cells) provides a barrel-shaped protected chamber where a protein can fold alone, away from everything else. When this quality control fails — as in Parkinson's disease (alpha-synuclein aggregates), Alzheimer's (amyloid-beta aggregates), or prion diseases — the consequences are devastating. The misfolded proteins don't just fail to work; they actively corrupt other normal proteins.",
    topic: "proteins",
  },
  {
    id: "p10",
    question:
      "Antibodies are Y-shaped proteins made by immune cells. What gives the immune system the ability to recognise virtually any pathogen it has never encountered before?",
    options: [
      "The immune system has millions of genes — one for every possible antigen — pre-stored in the genome",
      "Antibodies all share the same basic Y-shaped structure (two heavy chains + two light chains) but generate enormous diversity through V(D)J recombination — randomly rearranging gene segments to create approximately 10¹⁸ possible antigen-binding sequences",
      "Each antibody is specifically synthesised from scratch whenever a new pathogen enters the body",
      "All antibodies are identical in structure; different effector functions are determined entirely by which cell produces them",
    ],
    correctIndex: 1,
    explanation:
      "Antibodies are extraordinary engineering. Each antibody is Y-shaped: two identical heavy chains and two identical light chains, held together by disulfide bonds. The tips of the Y contain the antigen-binding sites, formed by the variable regions of both heavy and light chains. These variable regions are generated by V(D)J recombination — a process of randomly combining different gene segments (V, D, and J segments) to create the antigen-binding region. With further variation introduced at the junctions, the immune system can theoretically generate about 10¹⁸ different antibody sequences from a finite genome. This is also why cancer cells that arise from immune cells often carry chromosomal translocations — they're the product of recombination machinery that went to the wrong place. The five antibody classes (IgG, IgM, IgA, IgE, IgD) differ in their constant regions and have different roles in different parts of the body.",
    topic: "proteins",
  },
];

// ────────────────────────────────────────────────────────────
// Amino acid chain CSS animation
// ────────────────────────────────────────────────────────────
const AA_CHAIN_DATA = [
  { label: "Gly", color: "#c2410c", type: "Nonpolar" },
  { label: "Ala", color: "#b45309", type: "Nonpolar" },
  { label: "Val", color: "#a16207", type: "Nonpolar" },
  { label: "Ser", color: "#4d7c0f", type: "Polar" },
  { label: "Thr", color: "#15803d", type: "Polar" },
  { label: "Asp", color: "#1d4ed8", type: "Charged −" },
  { label: "Lys", color: "#7e22ce", type: "Charged +" },
  { label: "Pro", color: "#be185d", type: "Nonpolar" },
];

function AminoAcidChain() {
  return (
    <div className="relative overflow-x-auto pb-2">
      <div className="flex items-center gap-0 min-w-max py-6 px-4">
        {/* N-terminus label */}
        <div className="flex flex-col items-center mr-3">
          <span className="text-xs font-bold mb-1" style={{ color: "#b45309" }}>
            N
          </span>
          <div className="h-6 w-0.5" style={{ background: "#b4530966" }} />
          <span className="text-xs" style={{ color: "#b4530988" }}>
            H₂N–
          </span>
        </div>

        {AA_CHAIN_DATA.map((aa, i) => (
          <div key={aa.label} className="flex items-center">
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
                className="flex h-12 w-12 items-center justify-center rounded-full text-xs font-bold"
                style={{
                  background: `${aa.color}15`,
                  border: `2px solid ${aa.color}`,
                  color: aa.color,
                  boxShadow: `0 2px 8px ${aa.color}33`,
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

            {i < AA_CHAIN_DATA.length - 1 && (
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
                    color: "oklch(0.5 0.03 75)",
                    marginBottom: "2px",
                  }}
                >
                  –CO–NH–
                </span>
                <div
                  style={{
                    height: "2px",
                    width: "24px",
                    background: "oklch(0.75 0.02 75)",
                  }}
                />
              </div>
            )}
          </div>
        ))}

        {/* C-terminus label */}
        <div className="flex flex-col items-center ml-3">
          <span className="text-xs font-bold mb-1" style={{ color: "#1d4ed8" }}>
            C
          </span>
          <div className="h-6 w-0.5" style={{ background: "#1d4ed866" }} />
          <span className="text-xs" style={{ color: "#1d4ed888" }}>
            –COOH
          </span>
        </div>
      </div>

      {/* Legend */}
      <div className="flex flex-wrap gap-3 px-4 mt-2">
        {[
          { label: "Nonpolar (hydrophobic)", color: "#b45309" },
          { label: "Polar (uncharged)", color: "#15803d" },
          { label: "Charged (–)", color: "#1d4ed8" },
          { label: "Charged (+)", color: "#7e22ce" },
        ].map((item) => (
          <div key={item.label} className="flex items-center gap-1.5">
            <div
              className="h-3 w-3 rounded-full"
              style={{ background: item.color }}
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
    color: "#c2410c",
    shape: "linear",
    description:
      "The specific order of amino acids from N-terminus to C-terminus — encoded directly in the gene. Change one amino acid in the wrong place and the whole protein can lose its function. Sanger sequencing revealed the first protein sequence (insulin, 1955); mass spectrometry now maps entire proteomes.",
  },
  {
    id: "secondary",
    label: "Secondary Structure",
    sublabel: "Local folding patterns",
    color: "#d97706",
    shape: "coiled",
    description:
      "Backbone hydrogen bonds create alpha-helices (right-handed coils, 3.6 residues/turn, i to i+4 H-bonds) and beta-sheets (extended strands running side-by-side, parallel or antiparallel). Beta-turns and loops connect these elements. The Ramachandran plot shows which Phi/Psi backbone angles are sterically allowed.",
  },
  {
    id: "tertiary",
    label: "Tertiary Structure",
    sublabel: "Overall 3D fold",
    color: "#b45309",
    shape: "globular",
    description:
      "R-group interactions collapse the chain into a compact, unique 3D shape: hydrophobic residues hide in the core (hydrophobic effect), polar and charged residues sit on the surface. Disulfide bridges between cysteines, salt bridges between charged residues, and H-bonds provide additional stability. Chaperones (Hsp70, GroEL/GroES) assist in crowded cellular conditions.",
  },
  {
    id: "quaternary",
    label: "Quaternary Structure",
    sublabel: "Multi-subunit assembly",
    color: "#7c3aed",
    shape: "complex",
    description:
      "Multiple folded polypeptides associate via non-covalent interactions and sometimes disulfide bonds. Hemoglobin (2α + 2β subunits) exhibits cooperativity through the T-state/R-state allosteric switch. The proteasome has 28 subunits; ATP synthase spans two membranes with 8+ subunit types. Quaternary assembly enables allosteric regulation impossible in single-chain proteins.",
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
                activeStage === i ? `${stage.color}15` : "oklch(0.96 0.015 75)",
              border: `1px solid ${activeStage === i ? stage.color : "oklch(0.88 0.02 75)"}`,
              cursor: "pointer",
              flex: "1 1 0",
              minWidth: "120px",
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
          background: "oklch(0.95 0.02 75)",
          minHeight: "180px",
          border: "1px solid oklch(0.88 0.02 75)",
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
                    background: `oklch(0.92 0.05 ${36 + i * 12} / 0.4)`,
                    border: `2px solid oklch(0.62 0.14 ${36 + i * 12})`,
                    color: `oklch(0.42 0.14 ${36 + i * 12})`,
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
                      background: "oklch(0.78 0.02 75)",
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
            <div className="flex flex-col items-center gap-2">
              <div
                className="text-4xl"
                style={{
                  animation: "spin-slow 4s linear infinite",
                  color: "#c2410c",
                }}
              >
                🌀
              </div>
              <span
                className="text-xs font-semibold"
                style={{ color: "#c2410c" }}
              >
                Alpha-Helix
              </span>
              <span className="text-xs text-muted-foreground">
                3.6 residues/turn · i to i+4 H-bonds
              </span>
            </div>
            <div style={{ color: "oklch(0.6 0.02 75)", fontSize: "24px" }}>
              +
            </div>
            <div className="flex flex-col items-center gap-2">
              <div className="flex flex-col gap-1">
                {[0, 1, 2].map((i) => (
                  <div key={i} className="flex items-center gap-1">
                    <div
                      style={{
                        width: "48px",
                        height: "10px",
                        background: "#d9770622",
                        border: "1px solid #d9770666",
                        borderRadius: "2px",
                      }}
                    />
                    <div
                      style={{
                        width: 0,
                        height: 0,
                        borderLeft: "10px solid #d97706aa",
                        borderTop: "5px solid transparent",
                        borderBottom: "5px solid transparent",
                      }}
                    />
                  </div>
                ))}
              </div>
              <span
                className="text-xs font-semibold"
                style={{ color: "#d97706" }}
              >
                Beta-Sheet
              </span>
              <span className="text-xs text-muted-foreground">
                Antiparallel · backbone H-bonds
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
              <div
                className="h-28 w-28 rounded-full flex items-center justify-center"
                style={{
                  background:
                    "radial-gradient(circle at 35% 35%, oklch(0.75 0.12 36 / 0.4), oklch(0.55 0.12 36 / 0.2))",
                  border: "2px solid oklch(0.62 0.14 36 / 0.5)",
                  boxShadow: "0 4px 20px oklch(0.62 0.14 36 / 0.2)",
                  animation: "pulse-glow 3s ease-in-out infinite",
                }}
              >
                <span className="text-2xl">⚗️</span>
              </div>
              {[0, 60, 120, 180, 240, 300].map((deg) => (
                <div
                  key={deg}
                  className="absolute h-3 w-3 rounded-full"
                  style={{
                    background: `oklch(0.62 0.14 ${36 + deg / 10})`,
                    top: `${50 + 46 * Math.sin((deg * Math.PI) / 180)}%`,
                    left: `${50 + 46 * Math.cos((deg * Math.PI) / 180)}%`,
                    transform: "translate(-50%, -50%)",
                  }}
                />
              ))}
            </div>
            <div className="text-center">
              <p className="text-sm font-semibold" style={{ color: "#b45309" }}>
                Compact Globular Shape
              </p>
              <p className="text-xs text-muted-foreground mt-1">
                Hydrophobic core · Disulfide bridges · H-bonds
              </p>
            </div>
          </div>
        )}

        {activeStage === 3 && (
          <div
            className="flex items-center gap-4 py-6 px-6"
            style={{ animation: "fadeIn 0.4s ease" }}
          >
            {[
              { color: "#7c3aed", label: "α-chain 1", id: "alpha1" },
              { color: "#be185d", label: "β-chain 1", id: "beta1" },
              { color: "#7c3aed", label: "α-chain 2", id: "alpha2" },
              { color: "#be185d", label: "β-chain 2", id: "beta2" },
            ].map((sub, i) => (
              <div key={sub.id} className="flex flex-col items-center gap-2">
                <div
                  className="h-16 w-16 rounded-full flex items-center justify-center text-xs font-bold"
                  style={{
                    background: `${sub.color}18`,
                    border: `2px solid ${sub.color}66`,
                    color: sub.color,
                    boxShadow: `0 2px 12px ${sub.color}22`,
                    animation: `pulse-glow ${2.5 + i * 0.3}s ease-in-out infinite`,
                  }}
                >
                  ⚗️
                </div>
                <span className="text-xs" style={{ color: sub.color }}>
                  {sub.label}
                </span>
              </div>
            ))}
            <div className="ml-3 text-center">
              <p className="text-sm font-semibold" style={{ color: "#7c3aed" }}>
                Hemoglobin
              </p>
              <p className="text-xs text-muted-foreground">
                Tetrameric complex
              </p>
              <p className="text-xs text-muted-foreground">T-state ⇌ R-state</p>
            </div>
          </div>
        )}
      </div>

      {/* Description */}
      <div
        className="rounded-xl p-4"
        style={{
          background: `${FOLDING_STAGES[activeStage].color}0d`,
          border: `1px solid ${FOLDING_STAGES[activeStage].color}30`,
        }}
      >
        <p
          className="text-sm leading-relaxed"
          style={{ color: "oklch(0.3 0.03 75)" }}
        >
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
    anchorId: "proteins-amino-acids",
    title: "Amino Acids: 20 Building Blocks, Infinite Possibilities",
    color: "#c2410c",
    text: `It seems almost impossible that just 20 amino acids could build all the proteins in every living organism on Earth — from the haemoglobin in your blood to the enzymes that digest your food to the antibodies that fight infections. But that's exactly what happens, and the key is combinatorial diversity. Every amino acid has the same backbone: a central alpha-carbon bonded to an amino group (–NH₂), a carboxyl group (–COOH), and a hydrogen atom. What makes each amino acid unique is its R group (side chain) — the fourth group hanging off that central carbon.

Glycine's R group is just a hydrogen atom — making it the smallest, most flexible amino acid. Tryptophan has a large, complex bicyclic indole ring. Cysteine has a thiol group (–SH) that can form covalent disulfide bridges with another cysteine — molecular staples that hold parts of a protein in a fixed shape. Aspartate and glutamate carry negative charges; lysine, arginine, and histidine carry positive charges. These charged and polar groups tend to sit on the protein's water-exposed surface. Phenylalanine, leucine, and valine are hydrophobic — they hide in the protein's interior, away from water. Understanding R-group chemistry is understanding why proteins fold the way they do. The nine essential amino acids (histidine, isoleucine, leucine, lysine, methionine, phenylalanine, threonine, tryptophan, valine) can't be synthesised by the human body and must come from food — which is why protein quality in diet matters.`,
  },
  {
    anchorId: "proteins-structure",
    title: "Secondary Structure: Helices, Sheets, and Why Shape Follows Rule",
    color: "#d97706",
    text: `Once amino acids are linked into a chain, the chain doesn't flop around randomly — it folds into regular, repeating patterns called secondary structures, stabilised by hydrogen bonds between backbone atoms (not R groups). The two main secondary structures are the alpha helix and the beta sheet.

The alpha helix is a right-handed coil with 3.6 amino acid residues per complete turn. Its stability comes from hydrogen bonds between the carbonyl oxygen of residue n and the amide nitrogen (N–H) of residue n+4 — these H-bonds run roughly along the helix axis, creating a rod-like structure. Side chains project outward from the helix, free to interact with other molecules. Proline disrupts helices because its cyclic side chain locks the backbone angle and removes the N–H needed for the key hydrogen bond — proline is a natural helix-breaker.

Beta sheets form when two or more extended polypeptide strands run side by side, connected by hydrogen bonds between strands rather than within one strand. Antiparallel sheets (strands running in opposite directions) are more stable than parallel ones. Both alpha helices and beta sheets are found throughout all proteins — their relative proportions and arrangement determine the protein's overall shape. The Ramachandran plot maps which backbone dihedral angles are physically allowed, showing that most residues in real proteins fall neatly into the alpha-helical or beta-sheet regions. It's a beautifully simple way to check whether a protein structure is realistic.`,
  },
  {
    anchorId: "proteins-tertiary",
    title: "Tertiary Structure: How a Protein Gets Its Final 3D Shape",
    color: "#b45309",
    text: `Tertiary structure is the complete three-dimensional fold of a single polypeptide chain — the full, complex shape that allows a protein to do its job. This shape is stabilised by a web of interactions between R groups: the hydrophobic effect (nonpolar side chains clustering in the protein's core, away from water) is the dominant driving force. Additional stability comes from hydrogen bonds between polar side chains, ionic bonds between oppositely charged residues (salt bridges), and in secreted proteins, covalent disulfide bridges between cysteine residues.

Proteins often contain independently stable sub-units called domains — compact, self-contained folding units of typically 50–350 residues. Domains are evolution's modular building blocks: the same domain appears in many different proteins, performing the same function in each. The TIM barrel is one of the most common enzyme folds. The Rossmann fold binds NAD⁺ in many dehydrogenases. Zinc fingers coordinate a zinc ion to form a small projection that inserts into the DNA major groove — they're DNA-binding domains found in hundreds of transcription factors.

Folding in the crowded cellular environment requires help. Molecular chaperones (Hsp70, GroEL/GroES) prevent nascent chains from aggregating before they've had the chance to fold. When proteins misfold and can't be salvaged by chaperones, they're tagged with ubiquitin and destroyed by the proteasome. When this quality control fails, misfolded proteins accumulate: Alzheimer's disease involves aggregates of amyloid-beta and tau protein; Parkinson's involves alpha-synuclein aggregates; prion diseases involve a protein that templates its own misfolding. These diseases show starkly how much depends on getting the fold exactly right.`,
  },
  {
    anchorId: "proteins-quaternary",
    title: "Quaternary Structure: When Multiple Chains Work Together",
    color: "#7c3aed",
    text: `Quaternary structure is what you get when two or more polypeptide chains assemble together to form a functional complex. Subunits can be identical (a homomer) or different (a heteromer), and they're held together by the same non-covalent forces as tertiary structure — hydrophobic interactions, hydrogen bonds, salt bridges — plus sometimes disulfide bonds between chains.

Haemoglobin is the textbook example, and for good reason: its four-subunit structure (two alpha and two beta chains) enables cooperative oxygen binding, which is far more sophisticated than anything a single chain could do. In the deoxy T-state (tense), the subunits are in a constrained conformation with low oxygen affinity. When the first oxygen binds, it triggers a conformational change that propagates to the other subunits, shifting them toward the high-affinity R-state. The result: a sigmoidal oxygen-binding curve that loads up efficiently in the lungs and releases oxygen efficiently in tissues. The Bohr effect adds another layer of elegance: high CO₂ and H⁺ in metabolically active tissues push haemoglobin toward T-state, releasing oxygen exactly where it's most needed.

Other examples of quaternary structure are everywhere: the proteasome (28 subunits forming a barrel-shaped protein destroyer), ATP synthase (8+ subunit types spanning two membranes, working as a rotary motor), and the ribosome (4 RNA molecules plus ~80 proteins). Quaternary assembly enables allosteric regulation — one part of the complex influencing the activity of another — which would be impossible in a single isolated chain.`,
  },
  {
    anchorId: "proteins-enzymes",
    title: "Enzymes: Biological Catalysts and How They Work",
    color: "#c2410c",
    text: `Enzymes are proteins that make reactions happen that would otherwise take minutes, hours, or centuries, and they do this without being used up themselves. They work by binding their substrate in a precisely shaped active site and stabilising the transition state — the teetering, highest-energy moment of the reaction — making it easier to pass through. The 'induced fit' model is more accurate than the old 'lock and key' analogy: both enzyme and substrate change shape slightly when they meet, optimising the fit around the transition state.

There are six enzyme classes. Oxidoreductases transfer electrons or hydrogen between molecules — lactate dehydrogenase, succinate dehydrogenase. Transferases move functional groups — hexokinase transfers phosphate from ATP to glucose. Hydrolases cleave bonds using water — your digestive enzymes (pepsin, trypsin, lipase) are all hydrolases. Lyases cleave bonds without water, often forming double bonds — pyruvate decarboxylase removes CO₂. Isomerases interconvert structural isomers — phosphoglucose isomerase in glycolysis. Ligases join molecules using ATP — DNA ligase.

Enzyme kinetics tells you how fast an enzyme works under different conditions. Km (Michaelis constant) is the substrate concentration at half-maximal speed — lower Km means higher affinity. Vmax is the maximum rate when all enzyme molecules are fully loaded. Competitive inhibitors bind the active site, raising apparent Km but leaving Vmax unchanged — add more substrate to overcome them. Noncompetitive inhibitors bind elsewhere, reducing Vmax but not Km — can't overcome with substrate. Many drugs work by enzyme inhibition: statins inhibit HMG-CoA reductase (cholesterol synthesis), aspirin irreversibly inhibits cyclooxygenase (prostaglandin synthesis), and many antibiotics target bacterial enzymes.`,
  },
  {
    anchorId: "proteins-functions",
    title: "Proteins in Action: Structural, Transport, Motor, and Signalling",
    color: "#d97706",
    text: `Proteins do almost everything in a cell. Structural proteins provide the scaffolding: collagen (the most abundant protein in your body by mass) is a triple-helix rope-like polymer that gives tendons, cartilage, bone, and skin their tensile strength. Mutations in collagen genes cause brittle bone disease and Ehlers-Danlos syndrome. Keratin fills your hair and nails and the outer skin layer. Actin and tubulin form dynamic filaments and microtubules that give cells their shape and serve as tracks for cargo.

Transport proteins are molecular taxis: haemoglobin carries oxygen in red blood cells, cooperatively loading and unloading in response to oxygen partial pressure and the Bohr effect. Myoglobin stores oxygen in muscle. Albumin (the most abundant protein in blood plasma) carries fatty acids, hormones, and bilirubin. Channel proteins (aquaporins, ion channels) and carrier proteins (GLUT glucose transporters) move specific molecules across cell membranes.

Motor proteins convert ATP energy into directed mechanical movement: myosin walks along actin filaments to power muscle contraction. Kinesin walks toward the plus end of microtubules, carrying vesicles toward the cell periphery. Dynein walks toward the minus end, carrying things back toward the nucleus. Signalling proteins are how cells communicate: GPCRs (G-protein-coupled receptors) are the largest receptor superfamily (~800 human genes) and the target of about 35% of all approved drugs — they respond to hormones, neurotransmitters, light, and smell. Receptor tyrosine kinases (RTKs) like the insulin receptor and EGFR activate intracellular signalling cascades when growth factors bind. Nuclear receptors (glucocorticoid, oestrogen, thyroid hormone receptors) enter the nucleus and directly regulate gene transcription.`,
  },
  {
    anchorId: "proteins-ptms",
    title: "Post-Translational Modifications: The Protein's Second Life",
    color: "#b45309",
    text: `When a protein is freshly made, it's a starting point, not a finished product. Post-translational modifications (PTMs) dramatically expand what a protein can do, where it can go, and how long it lasts. Phosphorylation is the most important: kinase enzymes add phosphate groups to serine, threonine, or tyrosine side chains, changing the protein's conformation and interactions. When a hormone binds a cell-surface receptor, the signal travels into the cell as a cascade of phosphorylation events, each kinase activating the next, eventually reaching the nucleus to change gene expression. Phosphatase enzymes reverse these modifications. It's the molecular equivalent of flicking switches on and off.

Glycosylation attaches sugar chains to asparagine (N-linked) or serine/threonine (O-linked). These sugar decorations help proteins fold correctly in the ER, direct them to the right compartment, and act as identity tags on cell surfaces — this is how cells of the same organism recognise each other, and it's also how some pathogens disguise themselves as 'self.' Ubiquitination attaches chains of a 76-amino acid protein called ubiquitin. K48-linked chains direct the protein to the proteasome for destruction — the cell's way of clearing damaged, misfolded, or no-longer-needed proteins. K63-linked chains have regulatory signalling roles instead.

Lipid modifications (myristoylation, palmitoylation, prenylation) anchor proteins to the inner face of the cell membrane without them being transmembrane proteins. Signal peptide cleavage removes an N-terminal sequence that directed the protein to the secretory pathway — insulin is synthesised with both a signal peptide and an internal C-peptide, both of which are removed to produce active insulin. The sheer number of possible modifications means a genome of 20,000 genes can produce a proteome of enormous functional complexity.`,
  },
  {
    anchorId: "proteins-diseases",
    title: "When Proteins Go Wrong: Folding Diseases and Their Consequences",
    color: "#c2410c",
    text: `Given how many steps protein folding involves, it's remarkable how well it works. But when it fails, the results are often devastating — and understanding these failures reveals deep truths about how protein structure and biology are connected.

Amyloid diseases arise when proteins that are normally globular and soluble misfold into flat, sheet-rich fibrillar aggregates called amyloid fibrils. These aggregates resist all the cell's degradation systems and accumulate, damaging tissue. In Alzheimer's disease, amyloid precursor protein is cleaved into Aβ peptides (especially the 42-amino acid Aβ42) that aggregate outside cells into senile plaques. Tau protein forms tangles inside neurons. In Parkinson's disease, alpha-synuclein aggregates into Lewy bodies in the dopaminergic neurons of the substantia nigra, killing those cells and causing the characteristic movement problems. Type 2 diabetes involves IAPP aggregation in pancreatic islets.

Prion diseases are the most conceptually disturbing: a protein (PrP) can exist in a normal cellular form (mostly alpha-helical) and an infectious misfolded form (mostly beta-sheet). The misfolded form physically templates the conversion of normal protein into more of itself — no nucleic acid, no virus, just a misfolded protein that replicates its shape. This underlies mad cow disease, Creutzfeldt-Jakob disease in humans, and kuru. Cystic fibrosis teaches a different lesson: the most common mutation (deletion of phenylalanine 508 in the CFTR chloride channel) causes only subtle misfolding — but the ER's quality control system detects it and degrades the protein before it reaches the cell surface, even though some functional CFTR might reach the surface if allowed. Therapeutic strategies that help misfolded CFTR escape quality control and reach the membrane (like lumacaftor) can partially restore function.`,
  },
];

// ────────────────────────────────────────────────────────────
// Function spotlight cards
// ────────────────────────────────────────────────────────────
const FUNCTION_CARDS = [
  {
    icon: "⚙️",
    label: "Enzymes",
    desc: "Six EC classes: oxidoreductases, transferases, hydrolases, lyases, isomerases, ligases. Kinetics: Km, Vmax, competitive/noncompetitive inhibition.",
    color: "#c2410c",
  },
  {
    icon: "🛡️",
    label: "Antibodies",
    desc: "IgG/IgM/IgA/IgE/IgD — Y-shaped immunoglobulins; V(D)J recombination generates ~10¹⁸ possible antigen-binding specificities.",
    color: "#d97706",
  },
  {
    icon: "📡",
    label: "Signaling",
    desc: "GPCRs (~800 human types, 35% of drug targets), RTKs, G-proteins, nuclear receptors — coordinate cellular responses to signals.",
    color: "#b45309",
  },
  {
    icon: "🏗️",
    label: "Structural",
    desc: "Collagen (triple helix, most abundant human protein), keratin (hair/nails), actin/tubulin (cytoskeleton dynamics).",
    color: "#c2410c",
  },
  {
    icon: "🚌",
    label: "Transport",
    desc: "Hemoglobin (cooperative O₂ binding, Bohr effect), albumin, aquaporins, glucose transporters, ion channels.",
    color: "#d97706",
  },
  {
    icon: "⚡",
    label: "Motor",
    desc: "Myosin (muscle contraction along actin), kinesin (+end, anterograde cargo), dynein (−end, retrograde) — ATP-powered walking.",
    color: "#b45309",
  },
];

// ────────────────────────────────────────────────────────────
// Main section
// ────────────────────────────────────────────────────────────
export default function ProteinsSection() {
  const [level, setLevel] = useState<StructureLevel>("secondary");

  return (
    <section
      className="px-4 py-16 md:px-8"
      style={{ background: "oklch(0.97 0.015 36 / 0.25)" }}
    >
      <div className="mx-auto max-w-5xl">
        {/* Header */}
        <AnimatedEntrance direction="left">
          <SectionHeader
            topicId="proteins"
            title="Proteins — The Molecular Workhorses"
            subtitle="From amino acids and four structural levels to enzymes, protein functions, and folding diseases — all explained clearly from the ground up."
          />
          <div
            className="mb-6 inline-flex items-center gap-2 rounded-full px-3 py-1.5 text-xs font-semibold"
            style={{
              background: "oklch(0.92 0.06 36)",
              border: "1px solid oklch(0.62 0.14 36 / 0.35)",
              color: "oklch(0.42 0.14 36)",
            }}
          >
            <Zap className="h-3.5 w-3.5" />
            20 standard amino acids · 4 structural levels · 6 enzyme classes ·
            Countless PTMs
          </div>
        </AnimatedEntrance>

        {/* 3D Scene */}
        <AnimatedEntrance direction="up" delay={0.1}>
          <div
            className="mb-12 rounded-2xl overflow-hidden"
            style={{
              border: "1px solid oklch(0.62 0.14 36 / 0.25)",
              boxShadow: "0 4px 20px oklch(0.62 0.14 36 / 0.1)",
            }}
          >
            <div
              className="flex items-center justify-between px-5 py-3 border-b"
              style={{
                borderColor: "oklch(0.62 0.14 36 / 0.18)",
                background: "oklch(0.99 0.01 75)",
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

        {/* Amino acid categories quick reference */}
        <AnimatedEntrance direction="up" delay={0.05} className="mb-12">
          <div
            className="rounded-2xl p-5 border"
            style={{
              borderColor: "oklch(0.62 0.14 36 / 0.22)",
              background: "oklch(0.98 0.01 75)",
            }}
          >
            <h3 className="font-display font-bold text-base mb-3 accent-protein">
              The 20 Amino Acids — Grouped by R-Group Properties
            </h3>
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
              {[
                {
                  cat: "Nonpolar Aliphatic",
                  aas: "Gly, Ala, Val, Leu, Ile, Pro, Met",
                  role: "Hydrophobic core packing; Pro breaks helices",
                  color: "#c2410c",
                },
                {
                  cat: "Aromatic",
                  aas: "Phe, Trp, Tyr",
                  role: "Hydrophobic + pi-stacking; Tyr has –OH for H-bonding; Trp fluorescent",
                  color: "#b45309",
                },
                {
                  cat: "Polar Uncharged",
                  aas: "Ser, Thr, Cys, Asn, Gln",
                  role: "H-bonding; Cys forms disulfide bridges; Ser/Thr phosphorylation sites",
                  color: "#15803d",
                },
                {
                  cat: "Charged",
                  aas: "Asp, Glu (−) · Lys, Arg, His (+)",
                  role: "Protein surface, salt bridges; Asp/Glu in enzyme active sites; Lys acetylated in histones",
                  color: "#1d4ed8",
                },
              ].map((item) => (
                <div
                  key={item.cat}
                  className="rounded-xl p-3"
                  style={{
                    background: `${item.color}08`,
                    border: `1px solid ${item.color}25`,
                  }}
                >
                  <div
                    className="font-semibold text-xs mb-1"
                    style={{ color: item.color }}
                  >
                    {item.cat}
                  </div>
                  <div
                    className="text-xs font-mono font-medium mb-1.5"
                    style={{ color: "oklch(0.35 0.03 75)" }}
                  >
                    {item.aas}
                  </div>
                  <p
                    className="text-xs leading-relaxed"
                    style={{ color: "oklch(0.42 0.02 75)" }}
                  >
                    {item.role}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </AnimatedEntrance>

        {/* Explanation paragraphs */}
        <StaggerContainer className="mb-12 space-y-8" staggerDelay={0.08}>
          {EXPLANATION_PARAGRAPHS.map((para, i) => (
            <StaggerItem key={para.title}>
              <div
                id={para.anchorId}
                className="rounded-2xl p-6"
                style={{
                  background:
                    i % 2 === 0
                      ? "oklch(0.98 0.01 75)"
                      : "oklch(0.95 0.04 36 / 0.2)",
                  border: `1px solid ${para.color}20`,
                }}
              >
                <h3
                  className="font-display text-xl font-bold mb-3"
                  style={{ color: para.color }}
                >
                  {para.title}
                </h3>
                {para.text.split("\n\n").map((paragraph) => (
                  <p
                    key={paragraph.slice(0, 40)}
                    className="leading-relaxed text-sm md:text-base mb-3 last:mb-0"
                    style={{ color: "oklch(0.3 0.03 75)" }}
                  >
                    {paragraph}
                  </p>
                ))}
              </div>
            </StaggerItem>
          ))}
        </StaggerContainer>

        {/* Amino acid chain visualization */}
        <AnimatedEntrance direction="up" delay={0.05}>
          <div
            className="mb-12 rounded-2xl overflow-hidden"
            style={{
              background: "oklch(0.98 0.01 75)",
              border: "1px solid oklch(0.62 0.14 36 / 0.2)",
            }}
          >
            <div
              className="px-5 py-4 border-b"
              style={{ borderColor: "oklch(0.62 0.14 36 / 0.18)" }}
            >
              <h3 className="font-display text-lg font-bold accent-protein">
                Amino Acid Chain — Building a Polypeptide
              </h3>
              <p className="text-xs text-muted-foreground mt-1">
                Each colored bead is an amino acid; connectors show the peptide
                bond (–CO–NH–); colors encode R-group class
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
              background: "oklch(0.98 0.01 75)",
              border: "1px solid oklch(0.62 0.14 36 / 0.2)",
            }}
          >
            <div
              className="px-5 py-4 border-b"
              style={{ borderColor: "oklch(0.62 0.14 36 / 0.18)" }}
            >
              <h3 className="font-display text-lg font-bold accent-protein">
                Protein Folding Hierarchy — All Four Levels
              </h3>
              <p className="text-xs text-muted-foreground mt-1">
                Click each level to explore primary → secondary → tertiary →
                quaternary
              </p>
            </div>
            <div className="p-5">
              <FoldingDiagram />
            </div>
          </div>
        </AnimatedEntrance>

        {/* Enzyme kinetics quick reference */}
        <AnimatedEntrance direction="up" delay={0.05} className="mb-12">
          <div
            className="rounded-2xl p-5 border"
            style={{
              borderColor: "oklch(0.62 0.14 36 / 0.22)",
              background: "oklch(0.97 0.015 36 / 0.18)",
            }}
          >
            <h3 className="font-display font-bold text-lg mb-4 accent-protein">
              Enzyme Kinetics Quick Reference
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {[
                {
                  type: "Competitive Inhibition",
                  effect: "Km ↑ · Vmax unchanged",
                  mechanism:
                    "Inhibitor binds active site; competes with substrate. Overcome by excess substrate.",
                  example: "Methotrexate vs dihydrofolate reductase",
                  color: "#dc2626",
                },
                {
                  type: "Noncompetitive Inhibition",
                  effect: "Km unchanged · Vmax ↓",
                  mechanism:
                    "Inhibitor binds allosteric site on both free enzyme and E-S complex. Can't overcome with substrate.",
                  example: "Heavy metals vs many enzymes",
                  color: "#d97706",
                },
                {
                  type: "Uncompetitive Inhibition",
                  effect: "Km ↓ · Vmax ↓ (proportionally)",
                  mechanism:
                    "Inhibitor binds only the enzyme-substrate complex. Paradoxically decreases Km (increases apparent affinity).",
                  example: "Lithium vs inositol monophosphatase",
                  color: "#7c3aed",
                },
              ].map((item) => (
                <div
                  key={item.type}
                  className="rounded-xl p-4"
                  style={{
                    background: `${item.color}08`,
                    border: `1px solid ${item.color}28`,
                  }}
                >
                  <div
                    className="font-semibold text-sm mb-1"
                    style={{ color: item.color }}
                  >
                    {item.type}
                  </div>
                  <div
                    className="text-xs font-mono font-bold mb-2"
                    style={{ color: item.color }}
                  >
                    {item.effect}
                  </div>
                  <p
                    className="text-xs leading-relaxed mb-2"
                    style={{ color: "oklch(0.38 0.03 75)" }}
                  >
                    {item.mechanism}
                  </p>
                  <p
                    className="text-xs italic"
                    style={{ color: "oklch(0.5 0.02 75)" }}
                  >
                    Example: {item.example}
                  </p>
                </div>
              ))}
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
              Each class evolved for a distinct molecular job — and all are
              essential for life.
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
                      background: `${card.color}0a`,
                      border: `1px solid ${card.color}25`,
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
          <div
            data-ocid="proteins-quiz-section"
            className="rounded-2xl p-7 mb-4"
            style={{
              background: "oklch(0.98 0.01 75)",
              border: "1px solid oklch(0.62 0.14 36 / 0.2)",
            }}
          >
            <h3 className="font-display text-2xl font-bold accent-protein glow-protein mb-1">
              🧪 Test Your Protein Knowledge
            </h3>
            <p className="text-muted-foreground text-sm mb-6">
              10 questions covering amino acids, protein structure levels,
              enzyme kinetics, haemoglobin, modifications, and folding diseases
              — each with a clear explanation that builds real understanding.
            </p>
            <QuizEngine topicId="proteins" questions={PROTEIN_QUIZ} />
          </div>
        </AnimatedEntrance>
      </div>
    </section>
  );
}
