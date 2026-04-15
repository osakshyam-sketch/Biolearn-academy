import {
  AnimatedEntrance,
  StaggerContainer,
  StaggerItem,
} from "@/components/AnimatedEntrance";
import { QuizEngine } from "@/components/QuizEngine";
import { SectionHeader } from "@/components/SectionHeader";
import type { QuizQuestion } from "@/types/biology";
import { useState } from "react";

// ── Accent colors (purple/lavender) ──────────────────────────────────────────
const STEM = "0.62 0.16 310";
const STEM_LIGHT = "0.72 0.13 310";
const NEURON = "0.58 0.18 260";
const MUSCLE = "0.60 0.17 30";
const BLOOD = "0.55 0.20 20";
const LIVER = "0.58 0.16 80";

// ── Differentiation Tree (SVG) ────────────────────────────────────────────────

interface CellNodeProps {
  cx: number;
  cy: number;
  r: number;
  color: string;
  label: string;
  sublabel: string;
  delay: number;
  visible: boolean;
  pulse?: boolean;
}

function CellNode({
  cx,
  cy,
  r,
  color,
  label,
  sublabel,
  delay,
  visible,
  pulse = false,
}: CellNodeProps) {
  return (
    <g
      aria-label={`${label}: ${sublabel}`}
      style={{
        opacity: visible ? 1 : 0,
        transition: `opacity 0.5s ease ${delay}s`,
      }}
    >
      <circle
        cx={cx}
        cy={cy}
        r={r + 8}
        fill={`oklch(${color} / 0.10)`}
        style={
          pulse
            ? { animation: "stemPulse 2.8s ease-in-out infinite" }
            : visible
              ? {
                  animation: `cellFloat${Math.round(delay * 10) % 4} 3.5s ease-in-out infinite`,
                  animationDelay: `${delay + 0.5}s`,
                }
              : {}
        }
      />
      <circle
        cx={cx}
        cy={cy}
        r={r}
        fill={`oklch(${color} / 0.18)`}
        stroke={`oklch(${color})`}
        strokeWidth={pulse ? 2.5 : 2}
        style={
          pulse ? { animation: "stemPulse 2.8s ease-in-out infinite" } : {}
        }
      />
      <circle cx={cx} cy={cy} r={r * 0.35} fill={`oklch(${color} / 0.50)`} />
      <text
        x={cx}
        y={cy + r + 18}
        textAnchor="middle"
        fontSize="11"
        fontWeight="700"
        fill={`oklch(${color})`}
        fontFamily="BricolageGrotesque, sans-serif"
      >
        {label}
      </text>
      <text
        x={cx}
        y={cy + r + 30}
        textAnchor="middle"
        fontSize="9"
        fill="oklch(0.45 0.04 75)"
        fontFamily="DM Sans, sans-serif"
      >
        {sublabel}
      </text>
    </g>
  );
}

interface BranchLineProps {
  x1: number;
  y1: number;
  x2: number;
  y2: number;
  color: string;
  delay: number;
  visible: boolean;
}

function BranchLine({
  x1,
  y1,
  x2,
  y2,
  color,
  delay,
  visible,
}: BranchLineProps) {
  const len = Math.sqrt((x2 - x1) ** 2 + (y2 - y1) ** 2);
  return (
    <line
      x1={x1}
      y1={y1}
      x2={x2}
      y2={y2}
      stroke={`oklch(${color})`}
      strokeWidth="1.8"
      strokeDasharray={len}
      strokeDashoffset={visible ? 0 : len}
      strokeLinecap="round"
      style={{ transition: `stroke-dashoffset 0.7s ease ${delay}s` }}
    />
  );
}

function DifferentiationTree({ expanded }: { expanded: boolean }) {
  const W = 600;
  const H = 340;
  const CENTER_X = 300;
  const STEM_Y = 60;
  const MID_Y = 160;
  const LEAF_Y = 270;

  const midNodes = [
    {
      cx: 140,
      cy: MID_Y,
      color: NEURON,
      label: "Neural",
      sublabel: "Progenitor",
      idx: 0,
    },
    {
      cx: 260,
      cy: MID_Y,
      color: MUSCLE,
      label: "Mesoderm",
      sublabel: "Progenitor",
      idx: 1,
    },
    {
      cx: 380,
      cy: MID_Y,
      color: BLOOD,
      label: "Hematopoietic",
      sublabel: "Progenitor",
      idx: 2,
    },
    {
      cx: 500,
      cy: MID_Y,
      color: LIVER,
      label: "Endoderm",
      sublabel: "Progenitor",
      idx: 3,
    },
  ];

  const leafNodes = [
    {
      cx: 80,
      cy: LEAF_Y,
      color: NEURON,
      label: "Neuron",
      sublabel: "Nerve cell",
      parentX: 140,
      parentY: MID_Y,
    },
    {
      cx: 190,
      cy: LEAF_Y,
      color: NEURON,
      label: "Astrocyte",
      sublabel: "Glial cell",
      parentX: 140,
      parentY: MID_Y,
    },
    {
      cx: 290,
      cy: LEAF_Y,
      color: MUSCLE,
      label: "Muscle Cell",
      sublabel: "Myocyte",
      parentX: 260,
      parentY: MID_Y,
    },
    {
      cx: 390,
      cy: LEAF_Y,
      color: BLOOD,
      label: "Red Blood Cell",
      sublabel: "Erythrocyte",
      parentX: 380,
      parentY: MID_Y,
    },
    {
      cx: 480,
      cy: LEAF_Y,
      color: BLOOD,
      label: "White Blood Cell",
      sublabel: "Leukocyte",
      parentX: 380,
      parentY: MID_Y,
    },
    {
      cx: 560,
      cy: LEAF_Y,
      color: LIVER,
      label: "Liver Cell",
      sublabel: "Hepatocyte",
      parentX: 500,
      parentY: MID_Y,
    },
  ];

  return (
    <div
      className="w-full overflow-x-auto rounded-2xl p-4"
      style={{ background: "oklch(0.96 0.012 75)" }}
      role="img"
      aria-label="Stem cell differentiation tree showing a pluripotent stem cell branching into neural, mesoderm, hematopoietic, and endoderm progenitors, which then differentiate into neurons, astrocytes, muscle cells, red blood cells, white blood cells, and liver cells"
    >
      <svg
        viewBox={`0 0 ${W} ${H}`}
        width="100%"
        style={{ minWidth: 480, maxWidth: "100%" }}
        aria-hidden="true"
      >
        {midNodes.map((n) => (
          <BranchLine
            key={`trunk-${n.idx}`}
            x1={CENTER_X}
            y1={STEM_Y + 28}
            x2={n.cx}
            y2={n.cy - 26}
            color={n.color}
            delay={n.idx * 0.15}
            visible={expanded}
          />
        ))}
        {leafNodes.map((leaf) => (
          <BranchLine
            key={`leaf-${leaf.label}`}
            x1={leaf.parentX}
            y1={leaf.parentY + 26}
            x2={leaf.cx}
            y2={leaf.cy - 22}
            color={leaf.color}
            delay={0.7 + leafNodes.indexOf(leaf) * 0.12}
            visible={expanded}
          />
        ))}
        <CellNode
          cx={CENTER_X}
          cy={STEM_Y}
          r={28}
          color={STEM}
          label="Pluripotent Stem Cell"
          sublabel="Self-renewing"
          delay={0}
          visible={true}
          pulse={true}
        />
        {midNodes.map((n) => (
          <CellNode
            key={`mid-${n.idx}`}
            cx={n.cx}
            cy={n.cy}
            r={22}
            color={n.color}
            label={n.label}
            sublabel={n.sublabel}
            delay={0.2 + n.idx * 0.15}
            visible={expanded}
          />
        ))}
        {leafNodes.map((leaf, i) => (
          <CellNode
            key={`leaf-${leaf.label}`}
            cx={leaf.cx}
            cy={leaf.cy}
            r={18}
            color={leaf.color}
            label={leaf.label}
            sublabel={leaf.sublabel}
            delay={0.8 + i * 0.12}
            visible={expanded}
          />
        ))}
      </svg>
      <div className="flex flex-wrap justify-center gap-4 mt-2">
        {[
          { color: STEM, label: "Pluripotent Stem Cell" },
          { color: NEURON, label: "Neural Lineage" },
          { color: MUSCLE, label: "Muscle Lineage" },
          { color: BLOOD, label: "Blood Lineage" },
          { color: LIVER, label: "Liver Lineage" },
        ].map(({ color, label }) => (
          <div key={label} className="flex items-center gap-1.5">
            <span
              className="inline-block w-3 h-3 rounded-full border"
              style={{
                background: `oklch(${color} / 0.25)`,
                borderColor: `oklch(${color})`,
              }}
              aria-hidden="true"
            />
            <span
              className="text-xs font-medium"
              style={{ color: `oklch(${color})` }}
            >
              {label}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

// ── Quiz questions ─────────────────────────────────────────────────────────────

const STEM_CELL_QUIZ: QuizQuestion[] = [
  {
    id: "sc1",
    topic: "stem-cells",
    question: "Which two properties together define a stem cell?",
    options: [
      "Rapid division and antibiotic resistance",
      "Self-renewal and potency (ability to differentiate into specialised cell types)",
      "Large nucleus and telomerase expression only",
      "Haematopoiesis and immune privilege",
    ],
    correctIndex: 1,
    explanation:
      "Two properties together make a stem cell special: self-renewal (it can divide and produce more copies of itself indefinitely) and potency (it can transform into one or more specialised cell types). Most cells can do one or the other — stem cells do both. Ernest McCulloch and James Till first demonstrated this experimentally in 1961 using mouse bone marrow colony-forming units.",
  },
  {
    id: "sc2",
    topic: "stem-cells",
    question:
      "Which type of stem cell can give rise to ALL cell types, including the placenta?",
    options: [
      "Pluripotent stem cell",
      "Multipotent stem cell",
      "Totipotent stem cell",
      "Unipotent stem cell",
    ],
    correctIndex: 2,
    explanation:
      "Totipotent — the 'total potential' option. The fertilised egg (zygote) and the cells of the very early embryo (2–4 cell stage) are totipotent: they can form every tissue in the body AND the extraembryonic tissues like the placenta. That total capacity disappears quickly as the embryo develops into a blastocyst.",
  },
  {
    id: "sc3",
    topic: "stem-cells",
    question: "Embryonic stem cells (ESCs) are derived from which structure?",
    options: [
      "The neural tube during fetal development",
      "The inner cell mass of a blastocyst (day 5–7 embryo)",
      "The bone marrow of a newborn",
      "The umbilical cord blood at birth",
    ],
    correctIndex: 1,
    explanation:
      "ESCs come from the inner cell mass (ICM) of a blastocyst — the stage the embryo reaches about 5–7 days after fertilisation. The ICM contains the pluripotent cells that would normally develop into the embryo proper. Deriving ESCs requires destroying the blastocyst. James Thomson first cultured human ESCs in 1998, requiring years of work and triggering global ethical debate.",
  },
  {
    id: "sc4",
    topic: "stem-cells",
    question:
      "What are the four Yamanaka factors used to generate iPSCs from adult cells?",
    options: [
      "BRCA1, TP53, PTEN, and RB1",
      "Oct4, Sox2, Klf4, and c-Myc (OSKM)",
      "Wnt, Notch, Hedgehog, and BMP",
      "IGF1, EGF, FGF2, and VEGF",
    ],
    correctIndex: 1,
    explanation:
      "The Yamanaka factors — Oct4, Sox2, Klf4, and c-Myc (abbreviated OSKM) — are transcription factors that, when introduced into adult somatic cells, reprogram them back to a pluripotent state. Yamanaka's 2006 paper showing this in mouse fibroblasts genuinely shocked the scientific community. The Nobel Prize in Physiology or Medicine followed in 2012, shared with John Gurdon.",
  },
  {
    id: "sc5",
    topic: "stem-cells",
    question:
      "What is a key advantage of iPSCs over embryonic stem cells for therapeutic use?",
    options: [
      "iPSCs are always faster to differentiate",
      "iPSCs can be generated from a patient's own cells, avoiding immune rejection and embryo destruction",
      "iPSCs never form teratomas under any condition",
      "iPSCs are simpler to derive than ESCs",
    ],
    correctIndex: 1,
    explanation:
      "This is the reason iPSCs were so transformative: you take a skin biopsy or blood sample from a patient, reprogram those cells back to pluripotency, then differentiate them into the cell type needed for therapy. No embryo is destroyed, and the cells are genetically the patient's own — meaning no immune rejection. The challenge is that iPSC lines can retain epigenetic memory of their source tissue and incomplete reprogramming can cause problems.",
  },
  {
    id: "sc6",
    topic: "stem-cells",
    question:
      "Hematopoietic stem cells (HSCs) in bone marrow are described as 'multipotent'. What does this mean?",
    options: [
      "They can produce every cell type in the body",
      "They are restricted to producing all blood cell lineages but not neurons or liver cells",
      "They can only produce red blood cells",
      "They are identical to pluripotent embryonic stem cells",
    ],
    correctIndex: 1,
    explanation:
      "Multipotent means 'several fates, but within one tissue family.' HSCs can produce every type of blood cell — red cells (erythrocytes), white cells (neutrophils, lymphocytes, monocytes), and platelets. But they can't make neurons or liver cells. In humans, HSCs are characterised as CD34+/CD38- cells. They respond to cytokines like SCF, TPO, G-CSF, and EPO to control which lineage is produced.",
  },
  {
    id: "sc7",
    topic: "stem-cells",
    question: "Which is the OLDEST established clinical use of stem cells?",
    options: [
      "Repairing spinal cord injuries with neural stem cells",
      "Growing new cardiac muscle from cardiac stem cells",
      "Bone marrow transplantation for blood cancers and genetic blood disorders",
      "Replacing pancreatic β-cells for type 1 diabetes",
    ],
    correctIndex: 2,
    explanation:
      "Bone marrow transplantation has been used clinically since the 1960s — it's the original stem cell therapy. Patients with leukaemia, lymphoma, or inherited blood disorders (like sickle cell disease) receive high-dose chemotherapy to eliminate the diseased haematopoietic system, and then donor (or their own previously collected) stem cells are infused to rebuild a healthy blood system. Tens of thousands of transplants are performed annually.",
  },
  {
    id: "sc8",
    topic: "stem-cells",
    question:
      "What are organoids, and which scientist's group first described intestinal organoids from stem cells?",
    options: [
      "Organ transplants; discovered by Christiaan Barnard",
      "3D self-organising tissue structures derived from stem cells; Hans Clevers' group using Lgr5+ intestinal stem cells",
      "Artificial organs made from synthetic polymers; developed by Robert Langer",
      "Single-cell suspensions from dissociated organs; method by Yamanaka",
    ],
    correctIndex: 1,
    explanation:
      "Organoids are 3D self-organising mini-organs grown from stem cells in culture — they recapitulate the architecture and cell diversity of real tissues. Hans Clevers' group at the Hubrecht Institute first generated intestinal organoids from Lgr5+ intestinal stem cells (crypt base columnar cells) in 2009. Since then, organoids have been made from brain, lung, liver, kidney, retina, and stomach tissue — and are revolutionising drug testing and disease modelling.",
  },
  {
    id: "sc9",
    topic: "stem-cells",
    question:
      "Why did the He Jiankui case in 2018 cause a global scientific and ethical uproar?",
    options: [
      "He claimed to have created the first human clone",
      "He gene-edited human embryos that were then implanted, resulting in live births — without adequate safety data or ethical approval",
      "He destroyed embryos to derive a new ESC line without consent",
      "He performed bone marrow transplants without patient consent",
    ],
    correctIndex: 1,
    explanation:
      "He Jiankui used CRISPR to edit the CCR5 gene in human embryos to try to confer HIV resistance, then implanted those embryos — resulting in twin girls (and later a third child). This was done without proper ethical oversight, without adequate safety data, and without transparency. The scientific community condemned it almost universally. He was convicted of illegal medical practice in China and imprisoned. The case catalysed global discussion on the governance of germline editing.",
  },
  {
    id: "sc10",
    topic: "stem-cells",
    question:
      "In mesenchymal stem cell (MSC) therapy, what is thought to be the primary mechanism of benefit — even in trials where structural repair is limited?",
    options: [
      "Direct transdifferentiation into the target tissue cell type",
      "Paracrine signalling — MSCs secrete growth factors and immunomodulatory molecules that reduce inflammation and stimulate local repair",
      "Genetic correction of host cell DNA",
      "Antibody production targeting damaged tissue",
    ],
    correctIndex: 1,
    explanation:
      "This is one of the most important realisations in MSC biology: even when transplanted MSCs don't directly become the intended cell type (e.g. cartilage in osteoarthritis), they often still provide benefit. The reason appears to be paracrine signalling — MSCs secrete a cocktail of growth factors, cytokines, and exosomes that reduce inflammation, attract endogenous repair cells, and create a more permissive environment for tissue healing. Understanding this 'hit and run' mechanism has shifted how MSC therapies are designed.",
  },
];

// ── Explanation paragraphs ─────────────────────────────────────────────────────

const explanations = [
  {
    id: "what-are",
    anchorId: "stem-cells-what-are",
    heading: "What Makes a Stem Cell a Stem Cell?",
    body: `Picture the moment a fertilised egg starts dividing. Two cells. Four. Eight. At some point those identical cells begin specialising — this one will become a neuron, that one a muscle fibre. The remarkable thing is that some cells hold off. They stay in a kind of molecular 'pause mode,' retaining the ability to produce other cell types when needed. Those are stem cells.

Two properties together define them. Self-renewal means they can divide and produce more of themselves — indefinitely, under the right conditions. Most specialised cells can't do this at all; neurons, for example, are essentially post-mitotic. Potency means they can differentiate: given the right molecular signals, they transform into one or more specific cell types. Every one of your ~200 cell types descended from a single fertilised egg through repeated rounds of division and differentiation, and stem cell populations keep the supply chain running throughout life — your gut lining replaces itself every 3–5 days, your blood cells live only weeks to months, all sustained by local stem cell reservoirs.

The stem cell niche is the microenvironment that controls all of this. It's not just passive storage — it's an active signalling hub of supporting cells, extracellular matrix, and secreted factors that collectively determine whether a stem cell stays dormant, self-renews, or differentiates. Ernest McCulloch and James Till were the first to demonstrate quantitative properties of stem cells experimentally, using bone marrow colony-forming assays in mice in 1961 — work that established the modern concept of the haematopoietic stem cell.`,
  },
  {
    id: "potency-levels",
    anchorId: "stem-cells-potency",
    heading: "Potency Hierarchy: From Totipotent to Unipotent",
    body: `When biologists talk about stem cell 'potency,' they mean: how many different cell types can this cell produce? The hierarchy goes from totipotent at the top down to unipotent at the bottom — and the distinctions matter enormously for therapy and research.

Totipotent cells — the fertilised egg and the first few cells after it divides (up to the 4–8 cell stage in humans) — are the most powerful. They can form every tissue in the body AND the extraembryonic tissues (placenta, yolk sac). By the time the embryo reaches the blastocyst stage (around day 5–7), this capacity is gone. Pluripotent stem cells in the inner cell mass can make any of the ~200 cell types in the body proper, but not the placenta. These cells express a characteristic network of transcription factors: OCT4, SOX2, NANOG, and KLF4 form the pluripotency circuit. The promoters of these genes are active, their chromatin is 'bivalent' (carrying both activating and repressive marks — poised for either self-renewal or differentiation). In culture, human ESCs require FGF2 and Activin/Nodal/TGF-β signalling to maintain pluripotency; mouse ESCs require LIF/JAK/STAT3 — a revealing species difference.

Multipotent stem cells have narrowed their potential to a family of related types: haematopoietic stem cells produce all blood lineages, mesenchymal stem cells produce adipocytes, osteoblasts, and chondrocytes, neural stem cells produce neurons, astrocytes, and oligodendrocytes. Oligopotent cells produce just two or three lineages. Unipotent cells produce only one — muscle satellite cells produce muscle fibres, spermatogonial stem cells produce sperm. The further down the potency ladder a cell sits, the lower the tumour risk it poses in transplantation — which is a critical safety consideration for cell therapies.`,
  },
  {
    id: "embryonic",
    anchorId: "stem-cells-esc-ipsc",
    heading: "Embryonic Stem Cells: Extraordinary Biology, Complex Ethics",
    body: `Embryonic stem cells come from the inner cell mass of a blastocyst — a day 5–7 embryo. James Thomson at the University of Wisconsin first derived and cultured human ESC lines in 1998, opening a new era of cell biology. ESCs are naturally pluripotent, can self-renew indefinitely in culture, and can differentiate into any tissue type in the body given the right signals. From a basic science standpoint, they're extraordinary.

Maintaining pluripotency in culture requires careful conditions. Historically, this meant growing ESCs on a feeder layer of mouse embryonic fibroblasts (MEF cells) that secrete supporting signals. Modern feeder-free systems use defined matrices like Matrigel combined with chemically defined media (such as mTeSR1) and recombinant FGF2 and Activin A. To induce differentiation, you can either allow cells to form 3D embryoid bodies (where cells spontaneously begin differentiating into all three germ layers) or use directed differentiation — applying specific growth factor combinations in a precise temporal sequence to guide cells toward a target lineage. For example, to make dopaminergic neurons you apply FGF8, SHH, and BDNF at defined stages; to make pancreatic beta cells you use a six-stage protocol spanning nearly 30 days.

The ethical controversy centres on one inescapable fact: deriving ESCs destroys the blastocyst. Whether that's morally acceptable depends on your view of the moral status of a 5-day embryo — a genuinely contested question, not a simple one. This disagreement has shaped research funding, regulatory frameworks, and scientific careers across countries for decades.`,
  },
  {
    id: "adult-stem-cells",
    anchorId: "stem-cells-adult",
    heading: "Adult Stem Cells: Tissue Repair, Every Day of Your Life",
    body: `Adult stem cells are the unsung heroes of biology. They quietly sit in tissues throughout your body, maintaining and repairing them continuously — usually without you ever noticing. When you do notice (a wound healing, a bone mending, blood counts recovering after chemotherapy), that's adult stem cells in action.

Haematopoietic stem cells (HSCs) in the bone marrow are the best characterised. In mice, they're identified by the LSK (Lin-/Sca1+/cKit+) phenotype; in humans, CD34+/CD38- marks them. Every blood cell in your body — the oxygen-carrying erythrocytes, the immune-defending neutrophils and lymphocytes, the clot-forming platelets — derives from HSCs through a series of progressively committed progenitor stages, guided by cytokines like SCF, TPO, G-CSF, and EPO. Neural stem cells reside in two brain regions — the subventricular zone and the dentate gyrus of the hippocampus — and produce neurons, astrocytes, and oligodendrocytes even in adult brains, a discovery that overturned decades of dogma about brain cells being non-renewable. Mesenchymal stem cells (MSCs) found in bone marrow, adipose tissue, and umbilical cord are of great therapeutic interest: they differentiate into adipocytes, osteoblasts, and chondrocytes, but their therapeutic benefit in trials appears to come primarily from paracrine secretion of growth factors and immunomodulatory molecules rather than direct cell replacement.

Lgr5+ intestinal stem cells at the base of gut crypts replace the entire intestinal lining every 3–5 days — one of the highest cell turnover rates in the body. Skin stem cells in the basal layer and hair follicle bulge region maintain the skin and hair cycling. Even the liver, long considered to have limited regenerative capacity, contains hepatic progenitor cells (sometimes called oval cells) that activate after severe damage. Limbal stem cells at the border of the cornea and conjunctiva are the source of corneal epithelium — their deficiency causes corneal blindness, and limbal stem cell transplantation is one of the few established stem cell therapies outside the haematopoietic system.`,
  },
  {
    id: "ipscs",
    anchorId: "stem-cells-ipscs",
    heading: "iPSCs: The Reprogramming Revolution",
    body: `In 2006, Shinya Yamanaka published a result that genuinely shocked the scientific world: you can take a fully differentiated adult mouse skin cell and reprogram it back to a pluripotent state by introducing just four transcription factors — Oct4, Sox2, Klf4, and c-Myc (OSKM). The resulting induced pluripotent stem cells behaved almost identically to embryonic stem cells in all key tests. His team did the same with human cells in 2007. The 2012 Nobel Prize in Physiology or Medicine followed, shared with John Gurdon who had shown nuclear reprogramming was possible in frogs back in the 1960s.

How does reprogramming work? The OSKM factors enter the nucleus and begin remodelling the epigenome — erasing somatic methylation patterns, opening up chromatin at pluripotency gene promoters, and activating the self-reinforcing OCT4/SOX2/NANOG network. It takes 2–4 weeks, and efficiency is low — typically less than 1% of starting cells become genuine iPSCs. Early methods used integrating retroviruses to deliver the factors, raising concerns about insertional mutagenesis. Modern non-integrating methods include Sendai virus vectors (widely used, no genomic integration), episomal plasmids, synthetic mRNA transfection, and even small molecule cocktails that can partially replace the transcription factors.

iPSCs are now the standard model for studying patient-specific disease in a dish — you can take cells from a patient with a genetic disorder, reprogram them, differentiate them into the affected cell type, and study the disease mechanism in human cells that actually have the patient's mutations. The pharmaceutical industry uses iPSC-derived cardiomyocytes and hepatocytes for drug cardiotoxicity and hepatotoxicity testing. And the prospect of using iPSC-derived cells for autologous cell therapy — patient-matched replacement cells with no immune rejection — is actively being pursued in Parkinson's disease, diabetes, macular degeneration, and heart failure. The challenges are real: some iPSC lines retain epigenetic memory of their source tissue, differentiation is not always complete, and residual undifferentiated cells in a transplant are a tumour risk.`,
  },
  {
    id: "differentiation-niche",
    anchorId: "stem-cells-differentiation",
    heading: "How Cells Decide What to Become: Signals and the Niche",
    body: `Differentiation — the process by which a stem cell commits to a specific identity — is driven by an orchestrated sequence of molecular signals, not random chance. External signals (growth factors, morphogens, cytokines, neighbouring cells, physical forces like stiffness and stretch) bind receptors on the stem cell surface and trigger intracellular signalling pathways (Wnt, Notch, Hedgehog, TGF-β, BMP, and others). These pathways activate lineage-specific transcription factors — master regulators like MyoD for muscle, Pax6 for neural tissue, GATA-1 for red blood cells — which then remodel the epigenome. Histone acetylation opens chromatin; methylation closes it. CpG methylation at promoters silences genes. Bivalent domains (both H3K4me3 activating mark and H3K27me3 repressing mark at the same gene) keep lineage genes poised — ready to be activated or silenced when the differentiation signal arrives.

The stem cell niche is the physical and chemical microenvironment that keeps stem cells in their stem cell state until needed. For bone marrow HSCs, the niche includes osteoblasts, endothelial cells, and perivascular stromal cells that secrete CXCL12 (SDF-1), SCF, and thrombopoietin — factors that maintain HSC quiescence and prevent exhaustion. Most stem cells are kept in a quiescent (G0) state under normal homeostasis: this protects the genome from damage and prevents the stem cell pool from being depleted. Injury signals — reactive oxygen species, inflammatory cytokines, damage-associated molecular patterns — pull stem cells out of quiescence and direct rapid proliferation and differentiation. The precision of this push-and-pull is why stem cells can sustain tissue renewal throughout a lifetime without getting exhausted or becoming cancerous. When the niche fails — as happens with age, radiation damage, or genetic mutations — the stem cell pool shrinks, tissue maintenance fails, and disease follows.`,
  },
  {
    id: "therapy",
    anchorId: "stem-cells-therapy",
    heading: "Stem Cell Therapies: What Works, What's Coming",
    body: `The most established stem cell therapy is bone marrow transplantation, in use since the 1960s for leukaemia, lymphoma, aplastic anaemia, and inherited blood disorders. For sickle cell disease, a successful bone marrow transplant from a matched donor is literally curative — the patient's entire haematopoietic system is replaced. CAR-T cell therapies, while distinct from traditional stem cell therapies, use ex vivo engineering of T lymphocytes and represent some of the most spectacular oncology results in modern medicine.

Beyond haematology, the field is moving rapidly. Limbal stem cell transplantation (using cells from the patient's own healthy eye or from a donor) restores vision in patients with corneal stem cell deficiency — a clean, established success. Skin graft procedures using autologous epidermal stem cells have been used for burn patients since the 1980s. In 2015, a group in Germany treated a 7-year-old boy with junctional epidermolysis bullosa (a fatal skin condition) by gene-correcting his epidermal stem cells and growing a complete new skin from them — he has been healthy since. For neurodegenerative disease, dopaminergic neurons derived from iPSCs are now in Phase I/II clinical trials for Parkinson's disease in Japan. For diabetes, Vertex Pharmaceuticals' VX-880 (ESC-derived islet cells) has shown extraordinary early results — participants have reduced or eliminated insulin dependence. For the eye, ESC-derived retinal pigment epithelium cells are in clinical trials for Stargardt disease and age-related macular degeneration with early evidence of safety and vision stabilisation.

Organoids — 3D self-organising tissue structures derived from stem cells — have become essential research tools even before reaching clinical application. Brain organoids model neurodevelopment and have been used to study Zika virus neurotropism and microcephaly. Tumour organoids grown from patient-derived cells predict drug response in clinical trials with accuracy that animal models often can't match. The path from organoid to implantable organ is long (vascularity, immune integration, and maturation all remain unsolved), but organ-on-a-chip microfluidic devices are already improving drug testing pipelines.`,
  },
  {
    id: "ethics",
    anchorId: "stem-cells-ethics",
    heading: "The Ethical Landscape: Genuine Complexity, Not Easy Answers",
    body: `Stem cell research sits at the intersection of extraordinary science and genuine ethical complexity. The core controversy around embryonic stem cells is not manufactured: if you believe a human blastocyst is a person with full moral standing, then destroying it for research is ethically unacceptable regardless of the potential therapeutic benefits. That belief is sincere and widely held, and it has shaped regulatory policy in the United States (Congressional restrictions on federal funding for new ESC lines), Germany (where ESC derivation is prohibited), the UK (where it's permitted under strict HFEA regulation), and across the world — revealing how deeply moral frameworks differ.

iPSC technology largely sidestepped the embryo destruction issue, but created new ethical territory. Human-animal chimeras — where human pluripotent cells are introduced into animal embryos to study development or (hypothetically) to grow human organs — raise profound questions about the moral status of the resulting animals. Synthetic embryo models, created by combining embryonic and trophoblast organoids, are beginning to recapitulate early human development without a sperm or egg — and existing regulations (including the 14-day rule, which limits culture of human embryos to 14 days) weren't designed with these in mind. The He Jiankui case in 2018, in which human embryos were CRISPR-edited and implanted to produce live births without adequate safety data or ethical approval, demonstrated how badly things can go when scientists act unilaterally in the absence of societal consensus.

Equity is a quieter but equally important ethical issue: if a CAR-T therapy costs $400,000 per treatment, or a personalised iPSC therapy costs millions, who gets access? The most effective stem cell therapies risk being available only to patients in wealthy countries. Global governance frameworks for cell and gene therapies are still catching up to the pace of scientific advance — and that gap is everyone's problem to solve together.`,
  },
];

// ── Keyframe injection ────────────────────────────────────────────────────────

const STEM_KEYFRAMES = `
@keyframes stemPulse {
  0%, 100% { r: 28; opacity: 1; }
  50% { r: 32; opacity: 0.85; }
}
@keyframes cellFloat0 {
  0%, 100% { transform: translateY(0px); }
  50% { transform: translateY(-4px); }
}
@keyframes cellFloat1 {
  0%, 100% { transform: translateY(0px); }
  50% { transform: translateY(-3px); }
}
@keyframes cellFloat2 {
  0%, 100% { transform: translateY(0px); }
  50% { transform: translateY(-5px); }
}
@keyframes cellFloat3 {
  0%, 100% { transform: translateY(0px); }
  50% { transform: translateY(-2px); }
}
`;

// ── Main section ──────────────────────────────────────────────────────────────

export default function StemCellsSection() {
  const [treeExpanded, setTreeExpanded] = useState(false);

  return (
    <section
      className="px-6 py-16 max-w-5xl mx-auto"
      data-ocid="stem-cells-section"
      style={{ background: "oklch(0.97 0.012 75)" }}
    >
      <style>{STEM_KEYFRAMES}</style>

      <SectionHeader
        topicId="stem-cells"
        title="Stem Cells"
        subtitle="Every one of your ~200 cell types descended from a single fertilised egg. Stem cells are how that miracle of diversification keeps running throughout your life."
      />

      <AnimatedEntrance direction="up" delay={0.1}>
        <div className="mb-14">
          <div className="flex items-center justify-between flex-wrap gap-3 mb-5">
            <h3
              className="font-display text-xl font-semibold"
              style={{ color: `oklch(${STEM})` }}
            >
              🌿 Stem Cell Differentiation Tree
            </h3>
            <button
              type="button"
              aria-expanded={treeExpanded}
              aria-controls="differentiation-tree"
              onClick={() => setTreeExpanded((v) => !v)}
              data-ocid="show-differentiation-btn"
              className="flex items-center gap-2 rounded-xl px-5 py-2.5 text-sm font-semibold transition-smooth focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2"
              style={{
                background: treeExpanded
                  ? `oklch(${STEM} / 0.15)`
                  : `oklch(${STEM} / 0.08)`,
                border: `1.5px solid oklch(${STEM} / ${treeExpanded ? 0.55 : 0.3})`,
                color: `oklch(${STEM})`,
              }}
            >
              <span
                style={{
                  display: "inline-block",
                  transition: "transform 0.35s ease",
                  transform: treeExpanded ? "rotate(90deg)" : "none",
                }}
                aria-hidden="true"
              >
                ▶
              </span>
              {treeExpanded
                ? "Collapse Differentiation"
                : "Show Differentiation"}
            </button>
          </div>

          {!treeExpanded && (
            <p
              className="text-sm mb-4"
              style={{ color: "oklch(0.50 0.04 75)" }}
            >
              Press{" "}
              <strong style={{ color: `oklch(${STEM_LIGHT})` }}>
                "Show Differentiation"
              </strong>{" "}
              to animate the tree showing how a single pluripotent stem cell
              branches into neurons, muscle, blood, and liver cells.
            </p>
          )}

          <div id="differentiation-tree">
            <DifferentiationTree expanded={treeExpanded} />
          </div>

          <div className="flex flex-wrap gap-3 mt-4">
            {[
              {
                label: "Totipotent",
                sublabel:
                  "Zygote / 2–4 cell stage — forms entire organism including placenta",
                opacity: "0.9",
              },
              {
                label: "Pluripotent",
                sublabel:
                  "Inner cell mass / ESCs / iPSCs — all body cell types",
                opacity: "0.75",
              },
              {
                label: "Multipotent",
                sublabel:
                  "Adult tissue stem cells — all types within one tissue",
                opacity: "0.55",
              },
              {
                label: "Oligopotent",
                sublabel: "2–3 related cell types (e.g. lymphoid progenitor)",
                opacity: "0.42",
              },
              {
                label: "Unipotent",
                sublabel: "Single cell type only (e.g. muscle satellite cells)",
                opacity: "0.30",
              },
            ].map(({ label, sublabel, opacity }) => (
              <div
                key={label}
                className="rounded-xl px-4 py-2.5 flex flex-col"
                style={{
                  background: `oklch(${STEM} / 0.06)`,
                  border: `1px solid oklch(${STEM} / ${opacity})`,
                }}
              >
                <span
                  className="text-xs font-bold"
                  style={{ color: `oklch(${STEM} / ${opacity})` }}
                >
                  {label}
                </span>
                <span
                  className="text-xs mt-0.5"
                  style={{ color: "oklch(0.50 0.04 75)" }}
                >
                  {sublabel}
                </span>
              </div>
            ))}
          </div>
        </div>
      </AnimatedEntrance>

      {/* Interesting fact callout */}
      <AnimatedEntrance direction="up" delay={0.05}>
        <div
          className="rounded-2xl p-5 mb-10 flex items-start gap-4"
          style={{
            background: `oklch(${STEM} / 0.07)`,
            border: `1px solid oklch(${STEM} / 0.25)`,
          }}
        >
          <span className="text-2xl shrink-0" aria-hidden="true">
            ✨
          </span>
          <div>
            <p
              className="font-semibold text-sm mb-1"
              style={{ color: `oklch(${STEM_LIGHT})` }}
            >
              Did you know?
            </p>
            <p
              className="text-sm leading-relaxed"
              style={{ color: "oklch(0.35 0.05 75)" }}
            >
              In 2015, a 7-year-old boy in Germany named Hassan was dying from
              junctional epidermolysis bullosa — a condition causing his skin to
              fall apart at the slightest touch. Doctors took a small patch of
              his remaining healthy skin, corrected the disease-causing mutation
              in his keratinocyte stem cells using a viral vector, grew an
              entire new skin covering 80% of his body area in the lab, and
              grafted it back onto him. He has been in school and living
              normally ever since. That's what stem cell therapy can look like
              when it works.
            </p>
          </div>
        </div>
      </AnimatedEntrance>

      <StaggerContainer
        className="flex flex-col gap-7 mb-16"
        staggerDelay={0.09}
      >
        {explanations.map((exp) => (
          <StaggerItem key={exp.id}>
            <div
              id={exp.anchorId}
              className="rounded-2xl p-7"
              style={{
                background: "oklch(0.985 0.008 75)",
                border: "1px solid oklch(0.87 0.02 75)",
                borderLeft: `3px solid oklch(${STEM} / 0.5)`,
              }}
              data-ocid={`explanation-${exp.id}`}
            >
              <h3
                className="font-display text-xl font-bold mb-4"
                style={{ color: `oklch(${STEM_LIGHT})` }}
              >
                {exp.heading}
              </h3>
              {exp.body.split("\n\n").map((paragraph, pi) => (
                <p
                  key={`${exp.id}-p${pi}`}
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

      <AnimatedEntrance direction="up" delay={0.1}>
        <div
          className="rounded-2xl p-6 mb-14"
          style={{
            background: "oklch(0.985 0.008 75)",
            border: `1px solid oklch(${STEM} / 0.20)`,
          }}
        >
          <h3
            className="font-display text-lg font-bold mb-4"
            style={{ color: `oklch(${STEM_LIGHT})` }}
          >
            🔑 Key Facts at a Glance
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {[
              {
                icon: "🏆",
                fact: "Nobel Prize 2012",
                detail:
                  "Gurdon & Yamanaka — nuclear reprogramming and iPSC discovery",
              },
              {
                icon: "🩸",
                fact: "Bone Marrow Transplant",
                detail:
                  "Established since the 1960s — first clinical stem cell therapy, curative for many blood cancers",
              },
              {
                icon: "🧬",
                fact: "4 Yamanaka Factors",
                detail:
                  "Oct4, Sox2, Klf4, c-Myc (OSKM) reprogram somatic cells back to pluripotency",
              },
              {
                icon: "📅",
                fact: "14-Day Rule",
                detail:
                  "International limit on culturing human embryos — predates synthetic embryo models",
              },
              {
                icon: "🔬",
                fact: "~200 Cell Types",
                detail:
                  "All arise from a single pluripotent cell during development via directed differentiation",
              },
              {
                icon: "🌱",
                fact: "Organoids",
                detail:
                  "3D mini-organs from stem cells — brain, gut, liver, lung organoids used in drug testing and disease research",
              },
              {
                icon: "🎯",
                fact: "Paracrine Signalling",
                detail:
                  "MSCs benefit tissues primarily by secreting growth factors and immunomodulatory molecules, not direct differentiation",
              },
              {
                icon: "💉",
                fact: "iPSC Therapies in Trials",
                detail:
                  "Parkinson's neurons, beta cells for diabetes, retinal cells for macular degeneration all in Phase I/II",
              },
              {
                icon: "⚠️",
                fact: "Tumour Risk",
                detail:
                  "Residual undifferentiated pluripotent cells in transplants can form teratomas — a key safety challenge",
              },
            ].map(({ icon, fact, detail }) => (
              <div
                key={fact}
                className="flex gap-3 items-start rounded-xl p-3"
                style={{ background: `oklch(${STEM} / 0.05)` }}
              >
                <span className="text-xl shrink-0" aria-hidden="true">
                  {icon}
                </span>
                <div>
                  <p
                    className="text-sm font-bold leading-tight"
                    style={{ color: `oklch(${STEM_LIGHT})` }}
                  >
                    {fact}
                  </p>
                  <p
                    className="text-xs mt-0.5 leading-relaxed"
                    style={{ color: "oklch(0.45 0.04 75)" }}
                  >
                    {detail}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </AnimatedEntrance>

      <AnimatedEntrance direction="up" delay={0.1}>
        <div className="mb-4">
          <h3
            className="font-display text-2xl font-bold mb-2"
            style={{ color: `oklch(${STEM_LIGHT})` }}
          >
            🌱 Test Your Knowledge
          </h3>
          <p className="mb-6" style={{ color: "oklch(0.45 0.04 75)" }}>
            10 questions covering stem cell biology, potency levels, ESCs vs
            iPSCs, adult stem cells, organoids, and ethical dimensions.
          </p>
          <QuizEngine topicId="stem-cells" questions={STEM_CELL_QUIZ} />
        </div>
      </AnimatedEntrance>
    </section>
  );
}
