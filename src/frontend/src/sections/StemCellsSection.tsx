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
      "Self-renewal and potency — the ability to both copy themselves and transform into specialised cell types",
      "Large nucleus and telomerase expression only",
      "Hematopoiesis and immune privilege",
    ],
    correctIndex: 1,
    explanation:
      "Two properties together make a stem cell special — and you need both. Self-renewal means the cell can divide and produce identical copies of itself, keeping the stem cell pool topped up. Potency means it can differentiate — given the right signals, it can transform into one or more specialised cell types. Most specialised cells can do neither: neurons don't divide, and they can only be neurons. Most dividing cells (like skin cells) can only make more skin cells. Stem cells can both replicate themselves and become something new. It was Ernest McCulloch and James Till who first demonstrated these properties rigorously in 1961 using mouse bone marrow cells — showing that single cells could both self-renew and generate colonies of different blood cell types. Their experiments established the modern concept of the hematopoietic stem cell and are considered foundational to stem cell biology.",
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
      "Totipotent — the word means 'total potential.' The fertilised egg (zygote) and the cells of the very early embryo (2–4 cell stage, called blastomeres) are totipotent: they can form every tissue in the body AND the extraembryonic tissues like the placenta and yolk sac. This total capacity disappears quickly as the embryo develops. By the time the embryo forms a blastocyst (around day 5–7), the inner cell mass cells have narrowed to pluripotent — they can form any cell in the body, but not the placenta. This is a one-way narrowing: totipotent cells become pluripotent, pluripotent cells become multipotent, and so on. Normally, you can't go back up the ladder. One of the most amazing discoveries in modern biology was that under the right conditions, you can reprogram cells back to pluripotency — the iPSC revolution, which earned Shinya Yamanaka the Nobel Prize in 2012.",
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
      "ESCs come from the inner cell mass (ICM) of a blastocyst — the stage the embryo reaches about 5–7 days after fertilization. At this point, the embryo is a hollow ball of about 100–200 cells. The outer layer will become the placenta; the ICM (about 30–40 cells tucked inside) would normally develop into the embryo itself. Deriving ESC lines involves removing those ICM cells and growing them in culture — which requires destroying the blastocyst. James Thomson at the University of Wisconsin first derived and cultured human ESC lines in 1998, opening a new era of cell biology. ESCs are pluripotent — they can become any of the ~200 cell types in the human body. Their derivation triggered profound ethical debate that continues today, because different people hold genuinely different views about the moral status of a 5-day embryo.",
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
      "Oct4, Sox2, Klf4, and c-Myc — abbreviated OSKM, or the 'Yamanaka factors.' These four proteins are all transcription factors, meaning they bind to DNA and switch genes on or off. In embryonic stem cells, these factors are naturally active and work together to maintain the pluripotent state. Yamanaka's genius was asking: what if you force adult cells to express these same factors? His team inserted genes for all four into mouse skin cells using viruses in 2006. Remarkably, a small percentage of those skin cells were reprogrammed all the way back to a pluripotent state — behaving almost identically to embryonic stem cells in key tests. His team repeated the achievement with human cells in 2007. The scientific community was genuinely shocked — the fundamental direction of development (from stem cell to specialized cell) had been assumed to be irreversible. Yamanaka shared the 2012 Nobel Prize with John Gurdon, who had shown nuclear reprogramming was possible in frogs back in the 1960s.",
  },
  {
    id: "sc5",
    topic: "stem-cells",
    question:
      "What is a key advantage of iPSCs over embryonic stem cells for therapy?",
    options: [
      "iPSCs are always faster to differentiate into target cell types",
      "iPSCs can be made from a patient's own cells, avoiding immune rejection and without requiring embryo destruction",
      "iPSCs never form teratomas under any condition",
      "iPSCs are simpler and quicker to derive than ESCs",
    ],
    correctIndex: 1,
    explanation:
      "This is what made iPSCs so transformative for medicine. If you need replacement cells for a patient — say, dopamine-producing neurons for someone with Parkinson's disease — using someone else's cells risks immune rejection, and the patient would need to take immunosuppressant drugs for life. But if you take a small skin biopsy or blood sample from the patient, reprogram those cells to iPSCs, and then differentiate them into the needed cell type, the resulting cells are genetically the patient's own. The immune system recognizes them as 'self' and doesn't attack. No embryo needs to be destroyed, and no immunosuppression is needed. This autologous (patient-matched) approach is exactly what several clinical trials are now pursuing for Parkinson's disease, diabetes, and macular degeneration. The main challenges: iPSC derivation and differentiation take weeks to months, some iPSC lines don't behave perfectly, and pluripotent cells that haven't fully differentiated can form tumors (teratomas) if transplanted — a real safety challenge being actively solved.",
  },
  {
    id: "sc6",
    topic: "stem-cells",
    question:
      "Hematopoietic stem cells (HSCs) in bone marrow are described as 'multipotent'. What does this mean?",
    options: [
      "They can produce every cell type in the body",
      "They can produce all blood cell types but cannot make neurons or liver cells",
      "They can only produce red blood cells",
      "They are identical to pluripotent embryonic stem cells",
    ],
    correctIndex: 1,
    explanation:
      "Multipotent means 'several fates, but within one tissue family.' HSCs sit at the top of the blood cell hierarchy — they can produce every type of blood cell: oxygen-carrying red cells (erythrocytes), immune cells (neutrophils, lymphocytes, monocytes, eosinophils), and clot-forming platelets. That's a wide range of different, specialized cell types. But they cannot make neurons, liver cells, or muscle cells — their potential is limited to the blood and immune system lineage. This is different from pluripotent cells, which can become any cell in the body. The more potency narrows, the lower the tumor risk, which matters greatly for therapy. HSCs have been used in bone marrow transplants since the 1960s — this makes them the most clinically proven stem cell in medicine. They respond to molecular signals called cytokines (like erythropoietin to make more red cells, or G-CSF to make more neutrophils) that the body uses to match blood cell production to current needs.",
  },
  {
    id: "sc7",
    topic: "stem-cells",
    question: "Which is the OLDEST established clinical use of stem cells?",
    options: [
      "Repairing spinal cord injuries with neural stem cells",
      "Growing new cardiac muscle after a heart attack",
      "Bone marrow transplantation for blood cancers and genetic blood disorders",
      "Replacing pancreatic beta-cells for type 1 diabetes",
    ],
    correctIndex: 2,
    explanation:
      "Bone marrow transplantation has been used clinically since the 1960s — it's the original stem cell therapy and it's been saving lives for over 60 years. Here's how it works: a patient with leukemia or lymphoma receives high-dose chemotherapy or radiation to destroy their cancerous blood-making system (and unfortunately most of the healthy system too). Then donor stem cells from matching bone marrow are infused — these stem cells migrate to the bone marrow, settle in, and rebuild an entirely new blood and immune system. If successful, the patient ends up with a healthy blood system derived from the donor's stem cells. For sickle cell disease and thalassemia, a successful transplant from a matched donor can be genuinely curative — the patient's own defective stem cells are replaced with healthy donor cells that make normal hemoglobin. Tens of thousands of these transplants are performed annually worldwide. This established clinical reality is important context when evaluating newer, more experimental stem cell therapies.",
  },
  {
    id: "sc8",
    topic: "stem-cells",
    question: "What are organoids, and why are they so valuable for research?",
    options: [
      "Organ transplants using lab-grown tissue; developed by Christiaan Barnard",
      "3D self-organizing tissue structures grown from stem cells that mimic the architecture of real organs — used to test drugs and study diseases on human tissue",
      "Artificial organs made from synthetic polymers; developed by Robert Langer",
      "Single-cell suspensions from dissociated organs",
    ],
    correctIndex: 1,
    explanation:
      "Organoids are one of the most exciting recent developments in biology. When you grow stem cells in a 3D environment with the right matrix and signaling molecules, they self-organize into miniature structures that look and behave like real organs — a tiny intestine with crypts and villi, a mini-brain with layers similar to the real cortex, a small liver with functional liver cells. Hans Clevers' group at the Hubrecht Institute first grew intestinal organoids from adult intestinal stem cells in 2009. Since then, organoids have been made from brain, lung, liver, kidney, retina, stomach, and pancreas tissue. Why are they so valuable? Drug testing in animals is imperfect because mouse biology differs from human biology. Organoids allow you to test drugs on genuine human tissue, organized in the right 3D structure. A drug that kills cancer cells in a standard 2D culture might fail in a patient because tumors are 3D and have different properties. Tumor organoids grown from patient biopsies now predict drug response in clinical trials with remarkable accuracy. Brain organoids have been used to study how Zika virus causes microcephaly. The potential is enormous.",
  },
  {
    id: "sc9",
    topic: "stem-cells",
    question:
      "Why did the He Jiankui case in 2018 cause such a strong global reaction?",
    options: [
      "He claimed to have created the first human clone",
      "He used CRISPR to edit human embryos that were then implanted, resulting in live births — without adequate safety data or proper ethical oversight",
      "He destroyed embryos to derive a new ESC line without consent",
      "He performed bone marrow transplants without patient consent",
    ],
    correctIndex: 1,
    explanation:
      "He Jiankui, a Chinese scientist working largely in secret, used CRISPR to edit the CCR5 gene in human embryos to try to make them resistant to HIV infection. He then implanted those edited embryos into a woman's uterus, resulting in the birth of twin girls — and later a third child — with heritable genetic changes. The scientific community's reaction was almost universally one of shock and condemnation. Not because the idea of preventing genetic disease is wrong, but because: (1) CCR5 editing for HIV prevention wasn't medically necessary given existing HIV prevention options, (2) the safety data was completely inadequate — CRISPR editing can cause off-target mutations we can't fully predict yet, (3) the ethical review process was bypassed, and (4) germline edits (changes to embryos) are passed on to all future generations, affecting people who have no say. He was convicted of illegal medical practice in China and imprisoned. The case prompted serious international discussions about who should decide when — or if — germline editing is appropriate, and what governance structures need to exist before it could ever be used responsibly.",
  },
  {
    id: "sc10",
    topic: "stem-cells",
    question:
      "In mesenchymal stem cell (MSC) therapy, what is thought to be the primary mechanism of benefit?",
    options: [
      "Direct transformation into the target tissue cell type",
      "Paracrine signaling — MSCs secrete growth factors and anti-inflammatory molecules that reduce inflammation and stimulate local repair",
      "Genetic correction of the host cell's DNA",
      "Antibody production targeting damaged tissue",
    ],
    correctIndex: 1,
    explanation:
      "This discovery genuinely surprised researchers. Early hopes for MSC therapy were that the transplanted cells would directly become cartilage (for arthritis), heart muscle (for heart failure), or neurons (for neurological conditions). In most trials, that direct transformation turned out to be rare or minimal. Yet many patients still showed benefit. Researchers dug deeper and found that MSCs secrete a rich cocktail of growth factors, anti-inflammatory cytokines, and extracellular vesicles (tiny packages carrying signaling molecules). These secreted factors reduce inflammation, attract the body's own repair cells to the area, and create a more supportive environment for healing — even if the MSCs themselves don't stick around for long. This 'hit and run' paracrine mechanism has fundamentally changed how MSC therapies are designed. Some researchers are now investigating whether you could just use the secreted vesicles (exosomes) rather than transplanting whole cells — simpler, easier to manufacture, and avoiding some of the risks of live cell transplantation.",
  },
];

// ── Explanation paragraphs ─────────────────────────────────────────────────────

const explanations = [
  {
    id: "what-are",
    anchorId: "stem-cells-what-are",
    heading: "What Is a Stem Cell, Really?",
    body: `Picture the moment a fertilised egg starts dividing. Two cells. Four. Eight. At some point, those identical cells begin specialising — this one will become a neuron, that one a muscle cell. But some cells hold off. They remain in a kind of 'pause mode,' keeping the ability to turn into other cell types when needed. Those are stem cells — and they're one of the most fascinating things in biology.

Two properties together define a stem cell. First, self-renewal: stem cells can divide and produce more copies of themselves, keeping the supply running. Most specialised cells can't do this — your neurons, for instance, are essentially permanent once formed. Second, potency: stem cells can differentiate, meaning they can transform into one or more specific cell types when they receive the right molecular signals. Your gut lining replaces itself completely every 3–5 days, your blood cells live only weeks to months, and it's all sustained by local stem cell reservoirs quietly doing their job. You have stem cells working for you right now, maintaining your tissues around the clock. The environment around a stem cell — called the stem cell niche — is an active signalling hub of surrounding cells and secreted molecules that tells the stem cell whether to stay dormant, divide, or differentiate. The balance of these signals is what keeps your body's tissues in good repair throughout life.`,
  },
  {
    id: "potency-levels",
    anchorId: "stem-cells-potency",
    heading: "Potency Levels: From Totipotent to Unipotent",
    body: `When biologists talk about a stem cell's 'potency,' they're asking: how many different cell types can this cell produce? The answer ranges from 'every cell that could possibly exist in or around your body' all the way down to 'just one type.' Understanding these levels matters enormously for therapy and research.

Totipotent cells are the most powerful — the fertilised egg and the cells of the very early embryo (up to the 4–8 cell stage) can form every tissue in the body AND the placenta and other supporting structures. Totipotency disappears within the first week of development. Pluripotent stem cells — like embryonic stem cells and iPSCs — can become any of the approximately 200 cell types in the body, but not the placenta. They express a network of transcription factors (Oct4, Sox2, Nanog) that keep them in the pluripotent state. Multipotent stem cells have narrowed their potential to a family of related types: blood stem cells produce all blood lineages, neural stem cells produce neurons and support cells, but neither can produce cells outside their tissue family. Oligopotent cells produce just two or three types. Unipotent cells produce only one — muscle stem cells make muscle, skin basal cells make skin. As you go down the ladder from totipotent to unipotent, each level is more restricted in what it can become — but also safer for therapy, because cells that can only become one thing have almost no risk of forming tumors.`,
  },
  {
    id: "embryonic",
    anchorId: "stem-cells-esc-ipsc",
    heading: "Embryonic Stem Cells: Amazing Science, Real Ethical Questions",
    body: `Embryonic stem cells come from the inner cell mass of a blastocyst — a day 5–7 embryo that is a hollow ball of about 100–200 cells. James Thomson at the University of Wisconsin first derived and cultured human ESC lines in 1998, opening a new era of cell biology. ESCs are naturally pluripotent — given the right chemical signals in culture, they can differentiate into any tissue type in the body. They can self-renew indefinitely. From a scientific standpoint, they're extraordinary tools.

Directing ESCs to become specific cell types requires very precise conditions. To make dopaminergic neurons (the cells lost in Parkinson's disease), you apply specific growth factors in a precise sequence over several weeks. To make pancreatic beta cells (the insulin-producing cells lost in type 1 diabetes), you follow a six-stage protocol taking nearly 30 days. These differentiation protocols are the product of years of patient research, and getting them right enough for clinical use is genuinely hard work. The ethical controversy is real and shouldn't be dismissed. Deriving ESCs requires destroying the blastocyst, and whether a 5-day embryo has moral status equivalent to a person is a genuinely contested question that reasonable people answer differently. This disagreement has shaped research funding (the US restricted federal funding for new ESC lines), regulatory frameworks (Germany prohibits derivation; the UK permits it under strict oversight), and scientific careers. It's a good example of how science and ethics can't be cleanly separated when the research involves human material.`,
  },
  {
    id: "adult-stem-cells",
    anchorId: "stem-cells-adult",
    heading: "Adult Stem Cells: The Quiet Heroes of Your Body",
    body: `Right now, without you noticing, stem cells are quietly maintaining your body. Every day your bone marrow produces millions of new blood cells to replace worn-out ones. Your gut lining renews itself completely every few days. Your skin constantly replaces surface cells. This is all adult stem cells in action — and they've been there since you were born.

Hematopoietic stem cells (HSCs) in the bone marrow are the best understood. From a single HSC at the top of the hierarchy, the whole blood and immune system is maintained: oxygen-carrying red cells, immune-defending white cells (neutrophils, lymphocytes, monocytes), and clot-forming platelets. The body controls which type gets made by releasing hormonal signals — erythropoietin (EPO) to make more red cells when oxygen is low (this is the same molecule that athletes illegally dope with!), G-CSF to make more neutrophils during infection. Neural stem cells in two specific brain regions keep producing new neurons even in adults — overturning decades of dogma that said brain cells never regenerate. Skin stem cells in the bottom layer of the epidermis and in hair follicles maintain the skin and hair cycle. Intestinal stem cells at the base of gut crypts are among the most active dividing cells in the body. All of these are multipotent — restricted to their tissue family. They don't need to be as powerful as embryonic stem cells to do their job, and their restricted nature means much lower tumor risk. Adult stem cells are already the basis of the most established clinical stem cell therapy: bone marrow transplantation for leukemia and blood disorders, used successfully since the 1960s.`,
  },
  {
    id: "ipscs",
    anchorId: "stem-cells-ipscs",
    heading: "iPSCs: Rewinding the Clock on Cells",
    body: `In 2006, Shinya Yamanaka published a result that genuinely stunned the scientific world. He took a fully specialised adult mouse skin cell — a fibroblast — and introduced just four transcription factors (Oct4, Sox2, Klf4, c-Myc). A small percentage of those cells were reprogrammed all the way back to a pluripotent stem-cell-like state, capable of becoming virtually any cell in the body. His team called these induced pluripotent stem cells (iPSCs). They repeated the achievement with human cells in 2007. Yamanaka shared the 2012 Nobel Prize with John Gurdon, who had shown nuclear reprogramming was possible in frogs in the 1960s.

How does reprogramming work? The four factors enter the nucleus and begin rewriting the epigenome — opening up chromatin at pluripotency gene promoters, activating the self-reinforcing Oct4/Sox2/Nanog network, and gradually erasing the gene expression patterns that made the cell a skin cell. It takes 2–4 weeks and only about 1% of starting cells successfully reprogram. Early methods used viruses that integrated into the genome (raising safety concerns). Modern approaches use non-integrating Sendai virus vectors, synthetic mRNA, or even chemical cocktails — safer and increasingly efficient. iPSCs have transformed disease research: you can now take cells from a patient with any genetic condition, reprogram them, differentiate them into the affected cell type (heart cells, neurons, liver cells), and study the disease in human cells with the patient's exact mutations. You can test drugs on those cells. The pharmaceutical industry uses iPSC-derived heart cells to test whether new drugs cause dangerous heart rhythm problems — a major cause of drug failures. And the prospect of making patient-matched replacement cells for therapy is actively being pursued in multiple clinical trials.`,
  },
  {
    id: "differentiation-niche",
    anchorId: "stem-cells-differentiation",
    heading: "How Stem Cells Decide What to Become",
    body: `Stem cell differentiation — the process of committing to a specific identity — doesn't happen randomly. It's driven by a precisely orchestrated sequence of molecular signals, and it's one of the most elegant examples of biological computing that exists. External signals (growth factors, hormone-like molecules called morphogens, neighbouring cells, even the stiffness of the surrounding material) bind receptors on the stem cell surface and activate signaling pathways inside the cell. Those pathways turn on 'master regulator' transcription factors — proteins like MyoD, which commands muscle identity, Pax6 which commands neural identity, or GATA-1 which drives blood cell formation. These master regulators then remodel the cell's entire gene expression pattern.

The mechanism involves chromatin remodeling: physical changes to how DNA is wound around proteins (histones) that make certain genes accessible and others inaccessible. Active genes have their chromatin opened up; silenced genes get it closed down or even chemically marked with methyl groups. There are also 'bivalent domains' — genes carrying both activating and repressing marks simultaneously — kept poised and ready to be rapidly activated or silenced when a differentiation signal arrives. The stem cell niche plays a major role in all of this. For blood stem cells in the bone marrow, the niche includes bone-lining cells, blood vessel cells, and fibroblasts that together maintain the right chemical environment. Most stem cells are kept in a quiescent (sleeping) state under normal conditions — this protects their DNA from accumulating mutations during quiet periods. When tissue damage occurs, inflammation signals wake them up and direct rapid proliferation. This push-and-pull between quiescence and activity is what allows stem cells to sustain tissue repair throughout a lifetime.`,
  },
  {
    id: "therapy",
    anchorId: "stem-cells-therapy",
    heading: "Stem Cell Therapies: What Works and What's Coming",
    body: `The most proven stem cell therapy is bone marrow transplantation — used since the 1960s for leukemia, lymphoma, aplastic anemia, sickle cell disease, and other blood disorders. For many patients with otherwise incurable blood cancers, a successful bone marrow transplant from a matched donor is genuinely curative. This is already mature, established medicine performed tens of thousands of times every year.

Beyond blood disorders, the field is advancing. Limbal stem cell transplantation restores vision in patients whose corneal stem cells have been destroyed by chemical burns or disease — this is a clean, established therapy that works. In 2015, gene-corrected skin stem cells were used to grow an entirely new skin covering 80% of the body surface area for a child with a fatal genetic skin condition — he has been living normally ever since. For Parkinson's disease, dopaminergic neurons derived from iPSCs are now in Phase I/II clinical trials. For diabetes, stem cell-derived beta cells have shown extraordinary early results — some participants in trials have reduced or eliminated their insulin dependence. For the eye, stem cell-derived retinal pigment epithelium cells are in trials for macular degeneration with early evidence of safety and visual stabilization. Organoids — 3D mini-organs grown from stem cells — are already revolutionising drug development even before reaching clinical use themselves. The path to full organ replacement remains long (vascular connections, immune integration, and complete maturation are all unsolved), but each year brings new clinical approvals and clinical trial results. The pace is accelerating.`,
  },
  {
    id: "ethics",
    anchorId: "stem-cells-ethics",
    heading: "The Ethics: Real Complexity, Genuine Disagreement",
    body: `Stem cell research sits at the intersection of remarkable science and genuine ethical complexity. The core controversy around embryonic stem cells isn't manufactured: if you believe that a human blastocyst has the full moral status of a person, then destroying it to derive stem cells is unacceptable regardless of the therapeutic potential. That belief is sincerely and widely held. Different countries have landed in very different places on this question — the US restricted federal funding for new ESC lines for years, Germany prohibits ESC derivation entirely, while the UK permits it under strict regulatory oversight. These differences reflect real moral disagreement, not just different levels of scientific literacy.

iPSC technology largely sidestepped the embryo destruction issue — but created new ethical territory. Human-animal chimeras (inserting human pluripotent cells into animal embryos to study development or potentially grow human organs) raise profound questions about the moral status of the resulting animals. Synthetic embryo models — created by combining different types of stem cells to form structures that recapitulate early human development — are being created in labs today, and existing regulations (like the 14-day rule limiting embryo culture) were simply not designed with these structures in mind. Equity is another important ethical dimension: if the most effective stem cell therapies cost hundreds of thousands or millions of dollars per patient, who actually gets access? The most powerful medicines risk being available only in wealthy countries. The pace of scientific advance in stem cell biology has consistently outrun the governance frameworks meant to oversee it. Bridging that gap is everyone's responsibility — scientists, policymakers, patients, and the public all have a stake in getting this right.`,
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
