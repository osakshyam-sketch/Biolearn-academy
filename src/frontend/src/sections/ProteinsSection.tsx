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
      "What are the four categories of amino acid R groups, and why do they matter for protein folding?",
    options: [
      "Acidic, basic, aromatic, sulfur-containing — they determine the protein's molecular weight",
      "Nonpolar aliphatic/aromatic, polar uncharged, positively charged, negatively charged — they determine where each residue ends up in a folded protein and drive tertiary structure",
      "Hydrophobic, hydrophilic, neutral, ionizable — they determine only secondary structure",
      "R groups are identical in all amino acids — only the backbone differs",
    ],
    correctIndex: 1,
    explanation:
      "The 20 standard amino acids are classified by their R-group chemistry: nonpolar aliphatic (Gly, Ala, Val, Leu, Ile, Pro, Met) and aromatic (Phe, Trp, Tyr) residues cluster in the protein's hydrophobic core; polar uncharged residues (Ser, Thr, Cys, Asn, Gln) can participate in hydrogen bonding; positively charged (Lys, Arg, His) and negatively charged (Asp, Glu) residues sit at the protein surface where they interact with water and other charged molecules. These properties directly drive hydrophobic collapse and the specific 3D shape of every protein. Change one amino acid in a hydrophobic core position to a charged residue, and the protein often misfolds completely.",
    topic: "proteins",
  },
  {
    id: "p2",
    question: "What makes the peptide bond special from a chemical standpoint?",
    options: [
      "It's the strongest bond in biology and never breaks under any conditions",
      "It has partial double-bond character due to resonance — the C–N bond is planar and rigid, restricting rotation and influencing secondary structure",
      "It's a hydrogen bond between backbone atoms and is easily reversible",
      "It connects the R groups of adjacent amino acids, not the backbone",
    ],
    correctIndex: 1,
    explanation:
      "The peptide bond (–CO–NH–) has a fascinating chemical property: resonance between the C=O and C–N bonds gives the peptide group partial double-bond character. This means the six atoms of the peptide group (Cα–C=O–N–H–Cα) are coplanar — they can't rotate freely around the C–N bond. This planarity is crucial: it dramatically constrains the conformational space available to a polypeptide backbone, which is why only certain Phi (φ) and Psi (ψ) dihedral angles are allowed — exactly what the Ramachandran plot shows. Proline breaks helices because its cyclic side chain fixes the Phi angle and eliminates the N–H needed for helix hydrogen bonds.",
    topic: "proteins",
  },
  {
    id: "p3",
    question: "What defines the PRIMARY structure of a protein?",
    options: [
      "The coiling of the polypeptide into an alpha-helix",
      "The linear sequence of amino acids from N-terminus to C-terminus, encoded directly by the gene",
      "The overall 3D folded shape of the protein",
      "The association of multiple polypeptide chains",
    ],
    correctIndex: 1,
    explanation:
      "Primary structure is simply the order of amino acids from N-terminus to C-terminus, determined directly by the mRNA codon sequence and historically first sequenced by Fred Sanger (using chemical degradation — his Nobel-prize-winning work on insulin in 1955). Today, mass spectrometry proteomics can identify thousands of proteins and their sequences simultaneously. The primary structure is the master instruction set — it contains all the information needed to fold into the correct 3D shape (Anfinsen's dogma, demonstrated by denaturing and refolding ribonuclease A). Change one critical amino acid and you can get sickle cell disease (Val→Glu at position 6 of hemoglobin β-chain), complete loss of enzyme function, or a disease-causing protein aggregate.",
    topic: "proteins",
  },
  {
    id: "p4",
    question:
      "What is the alpha-helix, and what property of proline disrupts it?",
    options: [
      "The alpha-helix has 3.6 residues per turn, with i to i+4 backbone hydrogen bonds; proline breaks helices because its cyclic pyrrolidine ring fixes the Phi angle and lacks an N–H for H-bonding",
      "The alpha-helix is left-handed; proline's large aromatic ring sterically blocks helix formation",
      "Alpha-helices are held together by side-chain H-bonds; proline's charged side chain disrupts these",
      "Alpha-helices have 4 residues per turn; proline breaks them because it's nonpolar",
    ],
    correctIndex: 0,
    explanation:
      "The alpha-helix is a right-handed coil with 3.6 residues per turn and a pitch of 5.4 Å. The stabilizing force is backbone hydrogen bonds between the carbonyl oxygen (C=O) of residue n and the amide nitrogen (N–H) of residue n+4. These repeating H-bonds run nearly parallel to the helix axis, creating a stable, rod-like structure. Side chains project outward from the helix surface. Proline is the helix-breaker: its cyclic pyrrolidine ring covalently fixes the Phi angle at ~-65°, which doesn't fit the standard helix geometry, and it lacks the N–H group needed to form the i to i+4 hydrogen bond. Proline is often found at helix termini or in tight turns. The amphipathic helix is a biologically important variant — one face is hydrophobic, the other hydrophilic, making it ideal for membrane insertion or coiled-coil protein-protein interactions.",
    topic: "proteins",
  },
  {
    id: "p5",
    question:
      "What is the Michaelis-Menten equation describing, and what do Km and Vmax tell you about an enzyme?",
    options: [
      "It describes DNA polymerase fidelity; Km is the error rate and Vmax is the maximum replication speed",
      "It describes enzyme reaction rate as a function of substrate concentration; Km is the substrate concentration at half-maximal velocity (reflects binding affinity); Vmax is the maximum rate when enzyme is fully saturated",
      "It describes protein folding kinetics; Km is the folding rate constant and Vmax is the denaturation temperature",
      "It applies only to allosteric enzymes; Km and Vmax don't apply to standard enzymes",
    ],
    correctIndex: 1,
    explanation:
      "The Michaelis-Menten equation (v = Vmax[S] / (Km + [S])) describes how enzyme reaction velocity (v) varies with substrate concentration [S]. Km (Michaelis constant) is the substrate concentration at which v = Vmax/2 — a lower Km means the enzyme has higher affinity for its substrate (it reaches half-saturation at lower [S]). Vmax reflects how many substrate molecules the enzyme converts per unit time when fully saturated (related to kcat, the turnover number). In competitive inhibition, an inhibitor binds the active site: apparent Km increases but Vmax is unchanged — adding more substrate can overcome competitive inhibition. In noncompetitive inhibition, the inhibitor binds an allosteric site on both free enzyme and enzyme-substrate complex: Vmax decreases but Km is unchanged. Uncompetitive inhibitors bind only the enzyme-substrate complex, decreasing both Km and Vmax proportionally.",
    topic: "proteins",
  },
  {
    id: "p6",
    question:
      "What is cooperative binding in hemoglobin, and what is the Bohr effect?",
    options: [
      "Hemoglobin binds oxygen non-cooperatively; the Bohr effect describes how temperature affects binding",
      "Hemoglobin switches between T-state (tense, low O₂ affinity) and R-state (relaxed, high affinity); cooperative binding means each O₂ bound makes the next easier to bind; the Bohr effect is that increased CO₂/H⁺ (in tissues) shifts hemoglobin to T-state, promoting O₂ release",
      "Cooperative binding means hemoglobin can only bind one O₂ at a time; the Bohr effect describes allosteric inhibition by 2,3-BPG",
      "The Bohr effect is the chemical process by which hemoglobin is synthesized in red blood cells",
    ],
    correctIndex: 1,
    explanation:
      "Hemoglobin's quaternary structure (two alpha and two beta globin subunits, each with a heme group) enables cooperativity — one of the most elegant examples of allosteric regulation in biochemistry. In the T-state (tense/deoxy form), the subunits are in a constrained conformation with low O₂ affinity. When the first O₂ binds, it triggers a conformational change in that subunit which propagates to neighboring subunits, converting them toward the R-state (relaxed/oxy) with higher affinity. This produces the sigmoidal oxygen-binding curve — not the hyperbolic curve of a non-cooperative protein like myoglobin. The Bohr effect describes how CO₂ and H⁺ (which are high in metabolically active tissues) shift hemoglobin toward the T-state, causing O₂ release where it's most needed. 2,3-bisphosphoglycerate (2,3-BPG) also stabilizes the T-state and is elevated at altitude to improve O₂ delivery. This is how hemoglobin acts as both an oxygen delivery truck and a built-in sensor of tissue metabolic need.",
    topic: "proteins",
  },
  {
    id: "p7",
    question:
      "What are the six major enzyme classes (EC system) and one example of each?",
    options: [
      "Kinases, phosphatases, proteases, synthases, ligases, transferases",
      "Oxidoreductases (lactate dehydrogenase), transferases (hexokinase), hydrolases (pepsin), lyases (pyruvate decarboxylase), isomerases (phosphoglucose isomerase), ligases (DNA ligase)",
      "Polymerases, nucleases, kinases, phosphatases, proteases, glycosidases",
      "All enzymes belong to one class; the EC number only reflects their substrate specificity",
    ],
    correctIndex: 1,
    explanation:
      "The six EC enzyme classes are: Oxidoreductases transfer electrons/hydrogen (lactate dehydrogenase converts pyruvate to lactate, regenerating NAD⁺; succinate dehydrogenase in the TCA cycle). Transferases move functional groups between molecules (hexokinase transfers a phosphate from ATP to glucose; aminotransferases move amino groups). Hydrolases cleave bonds using water (pepsin and trypsin cleave peptide bonds; lipases cleave ester bonds in fats; lactase cleaves lactose). Lyases cleave bonds without water, often creating double bonds (pyruvate decarboxylase removes CO₂; aldolase cleaves fructose-1,6-bisphosphate). Isomerases interconvert structural isomers (phosphoglucose isomerase converts glucose-6-phosphate to fructose-6-phosphate; triose phosphate isomerase). Ligases join two molecules using ATP energy (DNA ligase seals nicks; acetyl-CoA carboxylase joins CO₂ to acetyl-CoA). These six classes cover every chemical transformation in metabolism.",
    topic: "proteins",
  },
  {
    id: "p8",
    question:
      "What are post-translational modifications (PTMs) and why are they crucial for protein function?",
    options: [
      "PTMs change the amino acid sequence after translation; they're caused only by mutations",
      "PTMs are chemical modifications added to proteins after translation — phosphorylation activates/inactivates proteins; glycosylation affects folding and recognition; ubiquitination marks proteins for proteasomal degradation; these expand functional diversity far beyond what the primary sequence alone can achieve",
      "PTMs are removals of the signal peptide only; all other modifications are co-translational",
      "PTMs only affect membrane proteins and have no role in cytosolic protein regulation",
    ],
    correctIndex: 1,
    explanation:
      "Post-translational modifications are the cell's way of creating enormous functional complexity from a finite proteome. Phosphorylation (by kinases, reversed by phosphatases) is the most common regulatory PTM — the Ser/Thr/Tyr hydroxyl groups receive a negatively charged phosphate that changes the protein's conformation and interactions. Signal transduction cascades are built almost entirely from phosphorylation events. Glycosylation adds sugar chains (N-linked to Asn, O-linked to Ser/Thr) for proper folding in the ER, protein trafficking, cell-cell recognition, and immune evasion by pathogens. Ubiquitination tags proteins with ubiquitin chains recognized by the 26S proteasome for degradation — essential for clearing misfolded proteins and regulatory proteins that must be destroyed after their job is done. SUMOylation (related to ubiquitin) regulates protein localization and activity. Acetylation of lysines neutralizes charge, affecting histone compaction and enzyme activity. Lipid modifications (myristoylation, palmitoylation, prenylation) anchor proteins to membranes. The sheer number of possible PTM combinations on a single protein means the 'proteome' is far larger than the genome would suggest.",
    topic: "proteins",
  },
  {
    id: "p9",
    question:
      "What are molecular chaperones and why are they essential for protein folding?",
    options: [
      "Chaperones are structural proteins that permanently bind their target proteins to stabilize them",
      "Chaperones (Hsp70, Hsp90, GroEL/GroES) prevent premature folding or aggregation of nascent polypeptides — they bind exposed hydrophobic regions, provide a folding chamber, and release the protein to fold correctly; they're especially important under heat stress when proteins denature",
      "Chaperones are only needed for membrane proteins; cytosolic proteins fold spontaneously without any assistance",
      "Chaperones are ribozymes that catalyze peptide bond formation during translation",
    ],
    correctIndex: 1,
    explanation:
      "Protein folding in the crowded cellular environment (protein concentration ~300 mg/mL) is not the same as folding in dilute solution. Nascent polypeptides emerging from ribosomes have exposed hydrophobic segments that would readily aggregate with other unfolded proteins — a catastrophe for the cell. Chaperones prevent this. Hsp70 (heat shock protein 70) binds short hydrophobic stretches on unfolded proteins in an ATP-dependent manner, preventing aggregation while giving the protein time to fold. The GroEL/GroES system in bacteria (Hsp60/Hsp10 in eukaryotes) provides a protected folding chamber: GroEL forms a barrel that encapsulates the unfolded protein; GroES caps the barrel; ATP hydrolysis causes conformational changes that allow folding in an isolated, chaperone-lined environment. Hsp90 specializes in folding signaling proteins like kinases and steroid hormone receptors. Prion diseases (Parkinson's, Alzheimer's) involve proteins that misfold and seed aggregation of other normally folded proteins — spectacular cases where folding quality control fails with devastating consequences.",
    topic: "proteins",
  },
  {
    id: "p10",
    question:
      "What are the five classes of antibodies (immunoglobulins) and what is the basic antibody structure?",
    options: [
      "IgA, IgB, IgC, IgD, IgE — each named for its tissue location of production",
      "IgG, IgM, IgA, IgE, IgD — all share a basic Y-shape with two heavy chains and two light chains connected by disulfide bonds; the variable (V) regions at the tips form the antigen-binding site; each class has distinct effector functions",
      "Antibodies are all identical in structure; only the signaling pathway they activate differs",
      "There are only two antibody classes — membrane-bound and secreted forms of IgM",
    ],
    correctIndex: 1,
    explanation:
      "Antibodies are extraordinary examples of protein architecture meeting biological function. The basic monomer is Y-shaped: two identical heavy chains and two identical light chains connected by disulfide bridges. Each arm of the Y contains a variable (V) domain from both chains that together form the antigen-binding site (the paratope) — generating specificity through the hypervariable CDR loops. The five immunoglobulin classes differ in their heavy chain constant regions and thus their effector functions: IgG (most abundant in blood; crosses the placenta; four subclasses) activates complement and opsonization; IgM (pentameric) is the first antibody produced in a response and is the most effective complement activator; IgA (dimeric in secretions) protects mucosal surfaces (gut, lungs, breast milk); IgE (monomeric; bound to mast cells) mediates allergic responses and antiparasitic immunity; IgD (on naive B cell surface) functions as a B cell receptor. Antibody diversity arises from V(D)J recombination — the same NHEJ-like mechanism that introduces junctional diversity — allowing the immune system to generate ~10¹⁸ possible antigen-binding sequences from a finite genome.",
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
    title: "Amino Acids: 20 Building Blocks, Unlimited Potential",
    color: "#c2410c",
    text: `It sounds improbable that just 20 amino acids could build the staggering diversity of proteins in every living organism — but that's exactly what happens. Every amino acid has the same backbone: a central alpha-carbon bonded to an amino group (–NH₂), a carboxyl group (–COOH), and a hydrogen atom. What makes each one unique is its R-group, the side chain hanging off that central carbon. Glycine's R-group is just a hydrogen atom — the smallest, most flexible amino acid. Tryptophan's is a large bicyclic aromatic indole ring. Aspartate carries a negative charge at physiological pH; lysine carries a positive charge; cysteine has a thiol group (–SH) that forms disulfide bridges.

The 20 amino acids are sorted into families by R-group properties. Nonpolar aliphatic (Gly, Ala, Val, Leu, Ile, Pro) and aromatic (Phe, Trp, Tyr) residues are hydrophobic — they cluster in protein cores away from water. Polar uncharged residues (Ser, Thr, Cys, Asn, Gln) have hydroxyl or amide groups capable of hydrogen bonding. Positively charged (Lys, Arg, His) and negatively charged (Asp, Glu) residues are at the surface. Essential amino acids (His, Ile, Leu, Lys, Met, Phe, Thr, Trp, Val in adults) must come from diet because humans can't synthesize them. Nine non-essential ones are synthesized from metabolic intermediates. Peptide bond formation is a condensation reaction: the carboxyl of one amino acid reacts with the amino group of the next, releasing water and creating the –CO–NH– linkage. Remarkably, this bond has partial double-bond character due to resonance — making the peptide unit planar and rigid, a constraint that drives secondary structure.`,
  },
  {
    anchorId: "proteins-structure",
    title:
      "Secondary Structure: Alpha-Helices, Beta-Sheets, and Ramachandran Space",
    color: "#d97706",
    text: `Secondary structure refers to regular, repeating local arrangements stabilized by backbone hydrogen bonds. The alpha-helix is a right-handed coil with 3.6 amino acid residues per turn and a pitch of 5.4 Å. Each backbone carbonyl oxygen (C=O at residue n) hydrogen bonds to the backbone amide nitrogen (N–H at residue n+4), and these H-bonds run roughly parallel to the helix axis, stabilizing it beautifully. Side chains project outward from the helix, available for interactions with other parts of the protein or with other molecules. Proline is the classic helix-breaker: its cyclic pyrrolidine side chain fixes the Phi backbone dihedral angle and lacks the N–H needed for helix H-bonding — proline is often found at helix termini or in tight turns, creating structural kinks (crucial in collagen, for example).

Beta-sheets form when two or more extended polypeptide strands run side-by-side, connected by backbone H-bonds between the strands rather than within a single strand. Antiparallel beta-sheets (strands running in opposite N→C directions) are more stable than parallel sheets because their H-bonds are more linear and their geometry more favorable. The pleated appearance of beta-sheets arises because the backbone has a slightly zig-zag geometry when extended. Beta-turns (type I, II, II') connect strands in antiparallel sheets and are frequently found on protein surfaces. The Ramachandran plot charts the allowed Phi (φ) and Psi (ψ) backbone dihedral angles for every residue — steric clashes forbid most regions, and the alpha-helical and beta-sheet regions are clearly distinct. Analyzing a new protein structure's Ramachandran plot is a standard quality check in structural biology.`,
  },
  {
    anchorId: "proteins-tertiary",
    title: "Tertiary Structure: Protein Domains, Motifs, and Chaperones",
    color: "#b45309",
    text: `Tertiary structure is the complete three-dimensional fold of a single polypeptide chain, stabilized by a network of R-group interactions. The hydrophobic effect is the dominant driving force: nonpolar side chains are excluded from water and cluster in the protein interior, minimizing the thermodynamically unfavorable exposure of hydrophobic surface area. Disulfide bonds between cysteine residues (formed in the oxidizing environment of the ER lumen) provide covalent stabilization, crucial for extracellular proteins like antibodies and insulin. Salt bridges between oppositely charged residues and a network of hydrogen bonds add further stability.

Proteins often contain independently folding units called domains — compact substructures with distinct hydrophobic cores, typically 50–350 residues. Protein domains are evolution's modular building blocks: the TIM barrel (a barrel of 8 beta-strands and 8 alpha-helices) is one of the most common enzymatic folds; the Rossmann fold binds NAD⁺/NADH in many dehydrogenases; the EF-hand is a calcium-binding loop found in calmodulin. Structural motifs are smaller super-secondary patterns: the leucine zipper and helix-turn-helix (HTH) are DNA-binding motifs; zinc fingers coordinate Zn²⁺ to stabilize a small finger-like protrusion that inserts into the DNA major groove. Chaperones are essential for in-cell folding — Hsp70 prevents premature aggregation of nascent chains; the GroEL/GroES barrel provides a protected folding chamber. When folding goes wrong, misfolded proteins aggregate into amyloid fibrils: Alzheimer's disease involves β-amyloid (Aβ) and tau aggregation; Parkinson's involves alpha-synuclein; prions are an extreme case where a misfolded protein (PrP^Sc) acts as a template to refold normal prions (PrP^C) into the disease conformation.`,
  },
  {
    anchorId: "proteins-quaternary",
    title: "Quaternary Structure and Allosteric Regulation",
    color: "#7c3aed",
    text: `Quaternary structure exists in proteins made of two or more polypeptide subunits — the arrangement of those subunits relative to each other. Subunits can be identical (homomers: hemoglobin-like complexes, viral capsids) or different (heteromers). The interactions holding subunits together are the same non-covalent forces as tertiary structure, plus sometimes intersubunit disulfide bonds. Quaternary assembly enables a remarkable phenomenon impossible in monomers: allostery.

Hemoglobin is the textbook example of positive cooperativity. The four subunits (2 alpha + 2 beta globin chains, each carrying a heme group) exist in two conformations: T-state (tense, low O₂ affinity) and R-state (relaxed, high affinity). When the first O₂ binds one subunit, it triggers a conformational change that propagates through the other subunits, shifting them toward R-state and making them more likely to bind O₂. This produces hemoglobin's sigmoidal oxygen-binding curve — far more efficient than the hyperbolic curve of non-cooperative myoglobin. The Bohr effect means that high CO₂ and H⁺ (in metabolically active tissues) stabilize the T-state and promote O₂ release exactly where it's needed. 2,3-BPG also stabilizes the T-state. Other major quaternary complexes: the 26S proteasome (28 subunit protease complex degrading ubiquitinated proteins), ATP synthase (8+ subunit types spanning two membranes, rotary mechanism), and the ribosome (4 rRNA + ~80 proteins). All are among the most complex machines in the cell.`,
  },
  {
    anchorId: "proteins-enzymes",
    title: "Six Enzyme Classes and Kinetics: From Km to Inhibition",
    color: "#c2410c",
    text: `Enzymes are biological catalysts that lower the activation energy of reactions without being consumed. They're classified into six EC (Enzyme Commission) classes: Oxidoreductases catalyze electron/hydrogen transfer (lactate dehydrogenase, succinate dehydrogenase, cytochrome P450s). Transferases move functional groups (hexokinase transfers phosphate from ATP to glucose; aminotransferases move amino groups in amino acid synthesis and catabolism). Hydrolases cleave bonds using water (proteases, lipases, glycosidases — the digestive enzymes). Lyases cleave bonds without water, often forming double bonds (pyruvate decarboxylase removing CO₂; aldolase in glycolysis). Isomerases interconvert stereoisomers or structural isomers (triose phosphate isomerase — one of the most efficient enzymes known; phosphoglucose isomerase). Ligases join two molecules using ATP energy (DNA ligase sealing nicks; acetyl-CoA carboxylase in fatty acid synthesis).

Enzyme kinetics follows the Michaelis-Menten model (v = Vmax[S]/(Km + [S])) for most simple enzymes. Km is the substrate concentration at half-maximal velocity — a low Km means high substrate affinity. Vmax reflects the maximum rate when enzyme is fully saturated, related to kcat (the catalytic rate constant, or turnover number). Competitive inhibitors bind the active site and increase apparent Km without affecting Vmax — addable substrate can overcome them. Noncompetitive inhibitors bind an allosteric site on both free enzyme and enzyme-substrate complex, decreasing Vmax but leaving Km unchanged. Uncompetitive inhibitors bind only the enzyme-substrate complex, decreasing both Km and Vmax. Allosteric enzymes (like aspartate transcarbamoylase or phosphofructokinase) don't obey Michaelis-Menten kinetics and produce sigmoidal v vs [S] curves — they're the key control points in metabolic pathways.`,
  },
  {
    anchorId: "proteins-functions",
    title: "Structural, Transport, Motor, and Signaling Proteins",
    color: "#d97706",
    text: `Proteins are the most functionally diverse molecules in biology. Structural proteins provide mechanical strength: collagen (the most abundant protein in the human body) is a triple-helix rope-like polymer that gives tendons, cartilage, bone, and skin their tensile strength; mutations in collagen genes cause Ehlers-Danlos and osteogenesis imperfecta syndromes. Keratin fills hair, nails, and the outer skin layer (epidermis). Actin and tubulin are cytoskeletal proteins that form dynamic filaments and microtubules for cell shape, division, and intracellular transport.

Transport proteins carry molecules where they're needed: hemoglobin carries O₂ in red blood cells; myoglobin stores O₂ in muscle; albumin (most abundant plasma protein) carries fatty acids, hormones, and bilirubin in blood; channel proteins (aquaporins, ion channels) and carrier proteins (glucose transporters) move solutes across membranes with specificity and speed. Motor proteins convert chemical energy (ATP hydrolysis) into directed mechanical motion: myosin walks along actin filaments, powering muscle contraction; kinesin and dynein walk along microtubules carrying vesicles and organelles toward opposite cell poles (kinesin toward + end, dynein toward − end). Signaling proteins include G-proteins (molecular switches cycling between GTP-active and GDP-inactive states), receptor tyrosine kinases (RTKs like EGFR and insulin receptor that autophosphorylate upon ligand binding, triggering downstream phosphorylation cascades), G-protein-coupled receptors (GPCRs — the largest receptor superfamily, ~800 human GPCRs, targets of ~35% of approved drugs), ligand-gated ion channels (nicotinic acetylcholine receptor), and nuclear receptors (glucocorticoid receptor, estrogen receptor — transcription factors activated by lipophilic ligands). Antibodies (IgG, IgM, IgA, IgE, IgD) are Y-shaped immunoglobulins with hypervariable CDR loops at the tips that generate extraordinary binding specificity; their diversity arises from V(D)J recombination.`,
  },
  {
    anchorId: "proteins-ptms",
    title: "Post-Translational Modifications and Protein Targeting",
    color: "#b45309",
    text: `Once a protein is translated, its story is far from over. Post-translational modifications (PTMs) dramatically expand functional diversity beyond what the primary sequence alone achieves. Phosphorylation is the most common regulatory PTM: kinases add phosphate groups to Ser, Thr, or Tyr hydroxyl groups, creating negative charges that alter protein conformation and interactions; phosphatases reverse this. Signal transduction cascades — from the cell surface to the nucleus — are largely built from phosphorylation events. Glycosylation adds carbohydrate chains (N-linked to Asn in the ER, O-linked to Ser/Thr in the Golgi) for proper folding, targeting, and cell-surface recognition. Ubiquitination tags proteins with chains of the 76-amino acid ubiquitin protein; K48-linked polyubiquitin chains mark proteins for degradation by the 26S proteasome; K63-linked chains have signaling roles in DNA repair. SUMOylation and acetylation (especially of histone lysines) regulate protein localization and chromatin compaction. Lipid modifications (N-myristoylation, palmitoylation, prenylation) anchor peripheral membrane proteins to bilayers.

Protein targeting ensures each protein reaches its correct cellular address. Cytosolic proteins (glycolytic enzymes, kinases, many regulatory proteins) are made on free ribosomes without any special signals. Proteins destined for secretion or membrane insertion contain an N-terminal hydrophobic signal sequence recognized by Signal Recognition Particle (SRP), which docks the ribosome on the rough ER — the polypeptide threads directly into the ER lumen as it's translated. After folding and initial glycosylation in the ER, COPII vesicles deliver proteins to the Golgi for further processing and sorting. Mitochondria have their own protein import machinery (TOM/TIM complexes) recognizing matrix-targeting sequences that are cleaved upon import. Nuclear localization sequences (NLS, typically enriched in Lys and Arg) are recognized by importins for active transport through nuclear pore complexes. Proteolytic cleavage activates many proteins: zymogens (inactive enzyme precursors) like trypsinogen and pepsinogen are activated by targeted cleavage; insulin is made as preproinsulin and processed to the active two-chain form by removal of the signal peptide and C-peptide.`,
  },
  {
    anchorId: "proteins-diseases",
    title: "Protein Folding Diseases: When the Machine Goes Wrong",
    color: "#c2410c",
    text: `Given the complexity of protein folding, it's remarkable how well it works — but when it fails, the consequences can be devastating. Amyloid diseases arise when proteins misfold from their native globular conformation into beta-sheet-rich fibrillar aggregates that are resistant to cellular degradation. In Alzheimer's disease, amyloid precursor protein is cleaved to generate Aβ peptides (especially Aβ42) that aggregate into extracellular plaques; tau protein also forms intracellular neurofibrillary tangles. In Parkinson's disease, alpha-synuclein aggregates into Lewy bodies in dopaminergic neurons. Type 2 diabetes involves IAPP (islet amyloid polypeptide) aggregating in pancreatic islets, destroying beta cells. Huntington's disease involves polyglutamine (polyQ) expansion in huntingtin protein, causing it to aggregate — a direct result of a DNA repeat expansion mutation.

Prion diseases represent the most conceptually disturbing folding pathology: a single protein (PrP) can exist in two conformations — the normal cellular form (PrP^C, mostly alpha-helical) and the misfolded scrapie form (PrP^Sc, predominantly beta-sheet). PrP^Sc acts as a template that physically catalyzes the conversion of PrP^C into more PrP^Sc — essentially an infectious protein with no nucleic acid. This underlies mad cow disease (BSE), Creutzfeldt-Jakob disease (CJD), and kuru. Cystic fibrosis provides another instructive example: the most common mutation (ΔF508) in the CFTR chloride channel causes it to misfold slightly, so the quality control machinery of the ER retains and degrades it — resulting in near-complete loss of functional CFTR at the cell surface, despite the protein potentially having some activity if it could get there. Understanding these diseases has driven enormous investment in protein folding research and chaperone-based therapies.`,
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
            subtitle="From amino acid chemistry through all four structural levels, enzyme kinetics, protein types, and post-translational modifications — a complete guide for students and researchers alike."
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
              10 questions spanning amino acid chemistry, structural levels,
              enzyme kinetics, cooperative binding, post-translational
              modifications, protein types, and chaperones — with detailed
              teacher-style explanations.
            </p>
            <QuizEngine topicId="proteins" questions={PROTEIN_QUIZ} />
          </div>
        </AnimatedEntrance>
      </div>
    </section>
  );
}
