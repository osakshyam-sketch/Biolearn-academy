import { r as reactExports, j as jsxRuntimeExports } from "./index-V1Xys_hZ.js";
import { S as SectionHeader, A as AnimatedEntrance, a as StaggerContainer, b as StaggerItem, Q as QuizEngine } from "./SectionHeader-BzOZ529A.js";
const STEM = "0.74 0.19 310";
const STEM_LIGHT = "0.86 0.13 310";
const NEURON = "0.68 0.22 260";
const MUSCLE = "0.72 0.20 30";
const BLOOD = "0.64 0.22 20";
const LIVER = "0.68 0.18 80";
function CellNode({
  cx,
  cy,
  r,
  color,
  label,
  sublabel,
  delay,
  visible,
  pulse = false
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "g",
    {
      "aria-label": `${label}: ${sublabel}`,
      style: {
        opacity: visible ? 1 : 0,
        transition: `opacity 0.5s ease ${delay}s`
      },
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "circle",
          {
            cx,
            cy,
            r: r + 8,
            fill: `oklch(${color} / 0.12)`,
            style: pulse ? { animation: "stemPulse 2.8s ease-in-out infinite" } : visible ? {
              animation: `cellFloat${Math.round(delay * 10) % 4} 3.5s ease-in-out infinite`,
              animationDelay: `${delay + 0.5}s`
            } : {}
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "circle",
          {
            cx,
            cy,
            r,
            fill: `oklch(${color} / 0.22)`,
            stroke: `oklch(${color})`,
            strokeWidth: pulse ? 2.5 : 2,
            style: pulse ? { animation: "stemPulse 2.8s ease-in-out infinite" } : {}
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx("circle", { cx, cy, r: r * 0.35, fill: `oklch(${color} / 0.55)` }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "text",
          {
            x: cx,
            y: cy + r + 18,
            textAnchor: "middle",
            fontSize: "11",
            fontWeight: "700",
            fill: `oklch(${color})`,
            fontFamily: "BricolageGrotesque, sans-serif",
            children: label
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "text",
          {
            x: cx,
            y: cy + r + 30,
            textAnchor: "middle",
            fontSize: "9",
            fill: "oklch(0.62 0.06 262)",
            fontFamily: "DM Sans, sans-serif",
            children: sublabel
          }
        )
      ]
    }
  );
}
function BranchLine({
  x1,
  y1,
  x2,
  y2,
  color,
  delay,
  visible
}) {
  const len = Math.sqrt((x2 - x1) ** 2 + (y2 - y1) ** 2);
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "line",
    {
      x1,
      y1,
      x2,
      y2,
      stroke: `oklch(${color})`,
      strokeWidth: "1.8",
      strokeDasharray: len,
      strokeDashoffset: visible ? 0 : len,
      strokeLinecap: "round",
      style: { transition: `stroke-dashoffset 0.7s ease ${delay}s` }
    }
  );
}
function DifferentiationTree({ expanded }) {
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
      idx: 0
    },
    {
      cx: 260,
      cy: MID_Y,
      color: MUSCLE,
      label: "Mesoderm",
      sublabel: "Progenitor",
      idx: 1
    },
    {
      cx: 380,
      cy: MID_Y,
      color: BLOOD,
      label: "Hematopoietic",
      sublabel: "Progenitor",
      idx: 2
    },
    {
      cx: 500,
      cy: MID_Y,
      color: LIVER,
      label: "Endoderm",
      sublabel: "Progenitor",
      idx: 3
    }
  ];
  const leafNodes = [
    {
      cx: 80,
      cy: LEAF_Y,
      color: NEURON,
      label: "Neuron",
      sublabel: "Nerve cell",
      parentX: 140,
      parentY: MID_Y
    },
    {
      cx: 190,
      cy: LEAF_Y,
      color: NEURON,
      label: "Astrocyte",
      sublabel: "Glial cell",
      parentX: 140,
      parentY: MID_Y
    },
    {
      cx: 290,
      cy: LEAF_Y,
      color: MUSCLE,
      label: "Muscle Cell",
      sublabel: "Myocyte",
      parentX: 260,
      parentY: MID_Y
    },
    {
      cx: 390,
      cy: LEAF_Y,
      color: BLOOD,
      label: "Red Blood Cell",
      sublabel: "Erythrocyte",
      parentX: 380,
      parentY: MID_Y
    },
    {
      cx: 480,
      cy: LEAF_Y,
      color: BLOOD,
      label: "White Blood Cell",
      sublabel: "Leukocyte",
      parentX: 380,
      parentY: MID_Y
    },
    {
      cx: 560,
      cy: LEAF_Y,
      color: LIVER,
      label: "Liver Cell",
      sublabel: "Hepatocyte",
      parentX: 500,
      parentY: MID_Y
    }
  ];
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      className: "w-full overflow-x-auto rounded-2xl p-4",
      style: { background: "oklch(0.155 0.05 310 / 0.18)" },
      role: "img",
      "aria-label": "Stem cell differentiation tree showing a pluripotent stem cell branching into neural, mesoderm, hematopoietic, and endoderm progenitors, which then differentiate into neurons, astrocytes, muscle cells, red blood cells, white blood cells, and liver cells",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "svg",
          {
            viewBox: `0 0 ${W} ${H}`,
            width: "100%",
            style: { minWidth: 480, maxWidth: "100%" },
            "aria-hidden": "true",
            children: [
              midNodes.map((n) => /* @__PURE__ */ jsxRuntimeExports.jsx(
                BranchLine,
                {
                  x1: CENTER_X,
                  y1: STEM_Y + 28,
                  x2: n.cx,
                  y2: n.cy - 26,
                  color: n.color,
                  delay: n.idx * 0.15,
                  visible: expanded
                },
                `trunk-${n.idx}`
              )),
              leafNodes.map((leaf) => /* @__PURE__ */ jsxRuntimeExports.jsx(
                BranchLine,
                {
                  x1: leaf.parentX,
                  y1: leaf.parentY + 26,
                  x2: leaf.cx,
                  y2: leaf.cy - 22,
                  color: leaf.color,
                  delay: 0.7 + leafNodes.indexOf(leaf) * 0.12,
                  visible: expanded
                },
                `leaf-${leaf.label}`
              )),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                CellNode,
                {
                  cx: CENTER_X,
                  cy: STEM_Y,
                  r: 28,
                  color: STEM,
                  label: "Pluripotent Stem Cell",
                  sublabel: "Self-renewing",
                  delay: 0,
                  visible: true,
                  pulse: true
                }
              ),
              midNodes.map((n) => /* @__PURE__ */ jsxRuntimeExports.jsx(
                CellNode,
                {
                  cx: n.cx,
                  cy: n.cy,
                  r: 22,
                  color: n.color,
                  label: n.label,
                  sublabel: n.sublabel,
                  delay: 0.2 + n.idx * 0.15,
                  visible: expanded
                },
                `mid-${n.idx}`
              )),
              leafNodes.map((leaf, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(
                CellNode,
                {
                  cx: leaf.cx,
                  cy: leaf.cy,
                  r: 18,
                  color: leaf.color,
                  label: leaf.label,
                  sublabel: leaf.sublabel,
                  delay: 0.8 + i * 0.12,
                  visible: expanded
                },
                `leaf-${leaf.label}`
              ))
            ]
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-wrap justify-center gap-4 mt-2", children: [
          { color: STEM, label: "Pluripotent Stem Cell" },
          { color: NEURON, label: "Neural Lineage" },
          { color: MUSCLE, label: "Muscle Lineage" },
          { color: BLOOD, label: "Blood Lineage" },
          { color: LIVER, label: "Liver Lineage" }
        ].map(({ color, label }) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1.5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "span",
            {
              className: "inline-block w-3 h-3 rounded-full border",
              style: {
                background: `oklch(${color} / 0.35)`,
                borderColor: `oklch(${color})`
              },
              "aria-hidden": "true"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "span",
            {
              className: "text-xs font-medium",
              style: { color: `oklch(${color})` },
              children: label
            }
          )
        ] }, label)) })
      ]
    }
  );
}
const STEM_CELL_QUIZ = [
  {
    id: "sc1",
    topic: "stem-cells",
    question: "Which property uniquely defines a stem cell?",
    options: [
      "It can only divide once before dying",
      "It can self-renew and differentiate into specialized cell types",
      "It always remains in the bone marrow",
      "It produces antibodies when activated"
    ],
    correctIndex: 1,
    explanation: "Stem cells are defined by two key properties: self-renewal (the ability to divide and produce more stem cells) and multipotency or pluripotency (the ability to differentiate into one or more specialized cell types). This combination is unique among cell types."
  },
  {
    id: "sc2",
    topic: "stem-cells",
    question: "Which type of stem cell can give rise to ALL cell types, including the placenta?",
    options: [
      "Pluripotent stem cell",
      "Multipotent stem cell",
      "Totipotent stem cell",
      "Unipotent stem cell"
    ],
    correctIndex: 2,
    explanation: "Totipotent stem cells — such as the cells of a fertilized egg (zygote) and very early embryo (2–4 cell stage) — can form every cell type in the body AND the extraembryonic tissues like the placenta. They have the highest developmental potential."
  },
  {
    id: "sc3",
    topic: "stem-cells",
    question: "Embryonic stem cells (ESCs) are derived from which structure?",
    options: [
      "The neural tube during fetal development",
      "The inner cell mass of a blastocyst",
      "The bone marrow of a newborn",
      "The umbilical cord blood at birth"
    ],
    correctIndex: 1,
    explanation: "Embryonic stem cells are isolated from the inner cell mass (ICM) of a blastocyst — a stage reached approximately 5–7 days after fertilization. The ICM contains pluripotent cells that would normally develop into the embryo proper. Isolation of ESCs requires destruction of the embryo, which raises ethical concerns."
  },
  {
    id: "sc4",
    topic: "stem-cells",
    question: "What is a key advantage of induced pluripotent stem cells (iPSCs) over embryonic stem cells?",
    options: [
      "iPSCs are always safer and never cause tumors",
      "iPSCs can be generated from a patient's own cells, avoiding immune rejection and ethical issues",
      "iPSCs differentiate faster than embryonic stem cells",
      "iPSCs only produce blood cells, making them more useful"
    ],
    correctIndex: 1,
    explanation: "iPSCs can be derived from a patient's own adult somatic cells (e.g., skin fibroblasts), reprogrammed back to a pluripotent state. This means iPSC-derived therapies would be immunologically matched to the patient, reducing rejection risk — and they avoid the ethical issues of embryo destruction associated with ESCs."
  },
  {
    id: "sc5",
    topic: "stem-cells",
    question: "Who discovered iPSCs and won a Nobel Prize for this work?",
    options: [
      "James Watson and Francis Crick",
      "Shinya Yamanaka (and John Gurdon)",
      "Jennifer Doudna and Emmanuelle Charpentier",
      "Robert Edwards and Patrick Steptoe"
    ],
    correctIndex: 1,
    explanation: "Shinya Yamanaka (and John Gurdon) won the 2012 Nobel Prize in Physiology or Medicine. Yamanaka showed in 2006 that adult mouse cells could be reprogrammed to a pluripotent state by introducing just four transcription factors (Oct4, Sox2, Klf4, c-Myc), now known as the 'Yamanaka factors'."
  },
  {
    id: "sc6",
    topic: "stem-cells",
    question: "The 'stem cell niche' refers to:",
    options: [
      "The specific organ where all stem cells are stored",
      "The specialized microenvironment that maintains stem cell identity and regulates their behavior",
      "The process by which stem cells divide asymmetrically",
      "The laboratory dish used to culture stem cells"
    ],
    correctIndex: 1,
    explanation: "The stem cell niche is the specialized microenvironment surrounding a stem cell — composed of neighboring cells, extracellular matrix, signaling molecules, and physical factors. The niche provides signals that maintain stemness, regulate quiescence vs. activation, and control whether a cell self-renews or differentiates."
  },
  {
    id: "sc7",
    topic: "stem-cells",
    question: "Which is the OLDEST established clinical use of stem cells?",
    options: [
      "Repairing spinal cord injuries with neural stem cells",
      "Growing new hearts from cardiac stem cells",
      "Bone marrow transplantation for blood cancers",
      "Replacing pancreatic β-cells for type 1 diabetes"
    ],
    correctIndex: 2,
    explanation: "Bone marrow transplantation, used since the 1960s, is the oldest and most established stem cell therapy. It replaces a patient's diseased hematopoietic (blood-forming) stem cells with healthy donor cells, effectively 'resetting' the blood and immune system. It is curative for leukemias, lymphomas, and certain inherited blood disorders."
  },
  {
    id: "sc8",
    topic: "stem-cells",
    question: "Multipotent adult stem cells differ from pluripotent stem cells in that they:",
    options: [
      "Cannot divide at all",
      "Can only produce a limited range of related cell types within one tissue",
      "Can form every cell type in the body including placenta",
      "Are only found in early embryos"
    ],
    correctIndex: 1,
    explanation: "Multipotent stem cells (e.g., hematopoietic stem cells in bone marrow) can differentiate into multiple cell types, but only within a related family. Hematopoietic stem cells produce all blood cell types (red cells, white cells, platelets) but cannot form neurons or muscle. Pluripotent cells lack this restriction and can form any body cell type."
  },
  {
    id: "sc9",
    topic: "stem-cells",
    question: "What is a major ethical concern specifically associated with human embryonic stem cell research?",
    options: [
      "ESCs grow too slowly for practical use",
      "ESCs can only be obtained by destroying a human embryo",
      "ESCs are rejected by the immune system",
      "ESCs spontaneously form tumors with 100% frequency"
    ],
    correctIndex: 1,
    explanation: "The primary ethical concern is that deriving human ESCs requires the destruction of a human blastocyst — an early embryo. Those who believe that human personhood begins at fertilization consider this morally equivalent to taking a human life. This debate has shaped regulatory policy around ESC research in many countries."
  },
  {
    id: "sc10",
    topic: "stem-cells",
    question: "In regenerative medicine, stem cells hold promise for treating:",
    options: [
      "Only bacterial infections, where immune reconstitution is needed",
      "A wide range of diseases including Parkinson's, heart failure, diabetes, and spinal cord injuries",
      "Exclusively genetic diseases caused by single-gene mutations",
      "Only conditions affecting red blood cell production"
    ],
    correctIndex: 1,
    explanation: "Stem cell-based therapies have potential for a broad spectrum of degenerative and traumatic diseases. Current research includes replacing dopamine neurons in Parkinson's disease, generating insulin-producing cells for type 1 diabetes, repairing cardiac muscle after heart attack, and restoring function after spinal cord injury — alongside many other conditions where cell replacement or tissue regeneration could be curative."
  }
];
const explanations = [
  {
    id: "what-are",
    heading: "What Are Stem Cells? Self-Renewal and Potency",
    body: `Stem cells are a unique category of biological cells defined by two remarkable properties that set them apart from every other cell in the body. First, they are capable of self-renewal — they can divide and produce identical copies of themselves indefinitely. This is in sharp contrast to most specialized cells (like neurons or muscle cells), which are terminally differentiated and cannot divide. Second, stem cells possess potency — the capacity to differentiate, meaning they can transform into one or more distinct, specialized cell types depending on the molecular signals they receive.

These two properties together make stem cells the body's master repair system. During development, stem cells give rise to every one of the approximately 200 cell types that make up the human body. In adults, resident stem cell populations replenish tissues that experience continuous turnover — the lining of the gut replaces itself every few days, and millions of blood cells die and are replaced every second, all thanks to local stem cell populations. The balance between self-renewal and differentiation is exquisitely regulated through a combination of intrinsic genetic programs and external environmental signals.`
  },
  {
    id: "potency-levels",
    heading: "Potency Hierarchy: Totipotent, Pluripotent, Multipotent",
    body: `Not all stem cells are equal in their developmental potential, and biologists classify them by their "potency" — how many different cell types they can produce. At the top of this hierarchy are totipotent cells — the fertilized egg (zygote) and the cells of the earliest cell divisions (2–4 cell stage embryo). These cells can produce every cell type in the organism, including the extraembryonic tissues such as the placenta. Totipotency is fleeting; by the time the embryo reaches the blastocyst stage (about 5–6 days after fertilization), this capacity is lost.

Pluripotent stem cells occupy the next level. They can generate any of the ~200 cell types of the body proper but cannot form the extraembryonic tissues. The two best-known examples are embryonic stem cells (ESCs), found in the inner cell mass of the blastocyst, and induced pluripotent stem cells (iPSCs). Multipotent stem cells have a narrower range — they can differentiate into multiple cell types within a specific tissue lineage. Hematopoietic (blood) stem cells in the bone marrow, for example, can generate every type of blood cell (red cells, white cells, platelets) but cannot produce neurons or liver cells. Oligopotent and unipotent stem cells have even more restricted potential, generating only two or one cell type respectively.`
  },
  {
    id: "embryonic-vs-adult",
    heading: "Embryonic Stem Cells vs. Adult Stem Cells",
    body: `Embryonic stem cells (ESCs) are derived from the inner cell mass (ICM) of a blastocyst-stage embryo, typically at day 5–7 post-fertilization. ESCs are naturally pluripotent — they can generate any cell type in the body — and they can be cultured and expanded indefinitely in the laboratory while maintaining this pluripotency. Their ability to differentiate into any tissue type makes them invaluable for developmental biology research and potentially for cell replacement therapies. However, generating ESCs requires the destruction of the embryo from which they are harvested, which raises profound ethical questions about the moral status of early human embryos.

Adult (somatic) stem cells, by contrast, exist in mature organisms and serve as local repair populations. They are typically multipotent — confined to producing cell types within their home tissue. Hematopoietic stem cells in bone marrow continuously replenish all blood lineages; neural stem cells in specific brain regions (the hippocampus and olfactory bulb) can generate new neurons throughout life; mesenchymal stem cells in bone marrow and connective tissue can produce bone, cartilage, and fat cells. Adult stem cells do not trigger immune rejection when used for autologous (self) transplantation and avoid the ethical issues of ESCs, but they are harder to isolate, present in very small numbers, and have more limited differentiation capacity.`
  },
  {
    id: "ipscs",
    heading: "Induced Pluripotent Stem Cells (iPSCs) — Reprogramming Adult Cells",
    body: `In 2006, Shinya Yamanaka and his team achieved one of the most transformative breakthroughs in modern biology: they demonstrated that fully differentiated adult mouse skin cells (fibroblasts) could be reprogrammed back into a pluripotent state by introducing just four transcription factors — Oct4, Sox2, Klf4, and c-Myc. The resulting cells, called induced pluripotent stem cells (iPSCs), behaved virtually identically to embryonic stem cells: they could self-renew indefinitely, form embryoid bodies in culture, and differentiate into cells of all three germ layers. Yamanaka shared the 2012 Nobel Prize in Physiology or Medicine with John Gurdon for this discovery.

iPSCs represented a paradigm shift because they circumvented both the ethical concerns surrounding ESCs (no embryo destruction) and the risk of immune rejection (a patient's own cells can be reprogrammed). The clinical implications are enormous: a patient's skin biopsy or blood sample could theoretically be reprogrammed into patient-matched neurons to model a neurological disease, cardiomyocytes to test drug cardiotoxicity, or beta cells for diabetes therapy. However, challenges remain. The reprogramming process is inefficient; some iPSC lines carry genetic abnormalities; and there are concerns about incomplete epigenetic reprogramming and the tumorigenic potential of residual undifferentiated cells in transplantation settings.`
  },
  {
    id: "differentiation-niche",
    heading: "The Differentiation Process and the Stem Cell Niche",
    body: `Differentiation — the process by which a stem cell transforms into a specialized cell type — is driven by sequential activation and repression of specific gene expression programs. External signals (growth factors, cytokines, cell-cell contacts, mechanical forces) bind receptors on the stem cell surface and trigger intracellular signaling cascades that ultimately activate transcription factors, which remodel the cell's epigenome and switch on lineage-specific genes while silencing others. For example, the transcription factor MyoD drives differentiation toward muscle cells, while Pax5 drives B-lymphocyte development. Differentiation is generally irreversible under normal physiological conditions — once a cell commits to a lineage, it stably maintains that identity.

The stem cell niche is the specialized microenvironment in which stem cells reside and which regulates their behavior. The niche is not simply a passive container; it is an active signaling hub composed of supporting cells, extracellular matrix components, blood vessels, and soluble factors. For hematopoietic stem cells, the niche in the bone marrow includes osteoblasts and endothelial cells that produce essential factors (SCF, CXCL12, thrombopoietin) maintaining stemness and controlling proliferation. The niche also maintains most stem cells in a state of quiescence (dormancy) under normal conditions — protecting them from DNA damage and exhaustion — and activates them in response to injury or demand. Understanding niche signals is critical for manipulating stem cells in therapeutic contexts.`
  },
  {
    id: "therapy",
    heading: "Therapeutic Applications and Regenerative Medicine",
    body: `The clinical application of stem cells is one of the most exciting frontiers in modern medicine. The longest-established and most successful therapy is hematopoietic stem cell transplantation (bone marrow transplant), practiced since the late 1960s. Patients with leukemia, lymphoma, multiple myeloma, or inherited blood disorders (like sickle cell disease and thalassemia) receive high-dose chemotherapy or radiation to destroy their diseased hematopoietic system, followed by infusion of healthy donor (allogeneic) or their own (autologous) hematopoietic stem cells to rebuild a healthy immune and blood system. Tens of thousands of transplants are performed annually worldwide, with outcomes continuing to improve.

Looking ahead, the regenerative medicine field seeks to harness stem cells to repair or replace virtually any tissue. Pluripotent-derived retinal pigment epithelial cells are in clinical trials for age-related macular degeneration; dopamine neurons derived from iPSCs are being tested in Parkinson's disease; ESC-derived oligodendrocyte precursors have been trialed for spinal cord injury. Engineered heart patches, liver organoids for drug testing, and beta cell replacements for type 1 diabetes are all active research areas. Beyond direct cell transplantation, stem cell-derived organoids — miniature organs grown in laboratory dishes — have revolutionized drug discovery, disease modeling, and personalized medicine by providing human tissue models that recapitulate disease biology far better than traditional cell lines.`
  },
  {
    id: "ethics",
    heading: "Ethical Considerations in Stem Cell Research",
    body: `Stem cell research occupies a unique position at the intersection of cutting-edge science and deep ethical debate. The core controversy around embryonic stem cell research concerns the moral status of the human embryo: if one believes that human personhood begins at fertilization, then deriving ESCs — which requires destroying a blastocyst — is morally equivalent to ending a human life. This position, held widely in religious and some secular frameworks, has led to strict regulatory restrictions in some countries and resulted in funding battles in the United States and elsewhere. Even among those who support ESC research, questions arise about informed consent for embryo donation, commodification of human embryos, and the appropriateness of creating embryos solely for research purposes.

The development of iPSC technology alleviated some of these concerns by providing pluripotent cells without embryo destruction. However, iPSCs introduced new ethical questions: the theoretical (though not yet practical) possibility of creating synthetic embryos entirely from reprogrammed cells challenges existing regulatory frameworks that define embryo protections. Additionally, somatic cell nuclear transfer (SCNT), which can generate embryos genetically identical to a donor, raises the specter of reproductive cloning — which is widely condemned internationally. Regulatory bodies worldwide have responded with frameworks governing embryo research (e.g., the 14-day rule, which prohibits culturing human embryos beyond 14 days), therapeutic cloning versus reproductive cloning distinctions, and requirements for rigorous ethical oversight of all human stem cell research.`
  }
];
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
function StemCellsSection() {
  const [treeExpanded, setTreeExpanded] = reactExports.useState(false);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "section",
    {
      className: "px-6 py-16 max-w-5xl mx-auto",
      "data-ocid": "stem-cells-section",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("style", { children: STEM_KEYFRAMES }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          SectionHeader,
          {
            topicId: "stem-cells",
            title: "Stem Cells",
            subtitle: "The body's master builders — self-renewing cells with the power to transform into any tissue, from neurons to blood cells to heart muscle."
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(AnimatedEntrance, { direction: "up", delay: 0.1, children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-14", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between flex-wrap gap-3 mb-5", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "h3",
              {
                className: "font-display text-xl font-semibold",
                style: { color: `oklch(${STEM})` },
                children: "🌿 Stem Cell Differentiation Tree"
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "button",
              {
                type: "button",
                "aria-expanded": treeExpanded,
                "aria-controls": "differentiation-tree",
                onClick: () => setTreeExpanded((v) => !v),
                "data-ocid": "show-differentiation-btn",
                className: "flex items-center gap-2 rounded-xl px-5 py-2.5 text-sm font-semibold transition-smooth focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2",
                style: {
                  background: treeExpanded ? `oklch(${STEM} / 0.25)` : `oklch(${STEM} / 0.15)`,
                  border: `1.5px solid oklch(${STEM} / ${treeExpanded ? 0.7 : 0.4})`,
                  color: `oklch(${STEM})`,
                  // @ts-expect-error CSS custom property
                  "--tw-ring-color": `oklch(${STEM})`,
                  "--tw-ring-offset-color": "oklch(0.13 0.06 262)"
                },
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "span",
                    {
                      style: {
                        display: "inline-block",
                        transition: "transform 0.35s ease",
                        transform: treeExpanded ? "rotate(90deg)" : "none"
                      },
                      "aria-hidden": "true",
                      children: "▶"
                    }
                  ),
                  treeExpanded ? "Collapse Differentiation" : "Show Differentiation"
                ]
              }
            )
          ] }),
          !treeExpanded && /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "p",
            {
              className: "text-sm mb-4",
              style: { color: "oklch(0.62 0.06 262)" },
              children: [
                "Press",
                " ",
                /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { style: { color: `oklch(${STEM_LIGHT})` }, children: '"Show Differentiation"' }),
                " ",
                "to animate the tree showing how a single pluripotent stem cell branches into neurons, muscle, blood, and liver cells."
              ]
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { id: "differentiation-tree", children: /* @__PURE__ */ jsxRuntimeExports.jsx(DifferentiationTree, { expanded: treeExpanded }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-wrap gap-3 mt-4", children: [
            {
              label: "Totipotent",
              sublabel: "Zygote / 2–4 cell stage",
              opacity: "0.9"
            },
            {
              label: "Pluripotent",
              sublabel: "Inner cell mass / ESCs / iPSCs",
              opacity: "0.75"
            },
            {
              label: "Multipotent",
              sublabel: "Adult tissue stem cells",
              opacity: "0.55"
            },
            {
              label: "Unipotent",
              sublabel: "Single cell type only",
              opacity: "0.40"
            }
          ].map(({ label, sublabel, opacity }) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "div",
            {
              className: "rounded-xl px-4 py-2.5 flex flex-col",
              style: {
                background: `oklch(${STEM} / 0.08)`,
                border: `1px solid oklch(${STEM} / ${opacity})`
              },
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "span",
                  {
                    className: "text-xs font-bold",
                    style: { color: `oklch(${STEM} / ${opacity})` },
                    children: label
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-muted-foreground mt-0.5", children: sublabel })
              ]
            },
            label
          )) })
        ] }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          StaggerContainer,
          {
            className: "flex flex-col gap-8 mb-16",
            staggerDelay: 0.09,
            children: explanations.map((exp) => /* @__PURE__ */ jsxRuntimeExports.jsx(StaggerItem, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "div",
              {
                className: "rounded-2xl p-7",
                style: {
                  background: "oklch(0.18 0.04 310 / 0.25)",
                  border: `1px solid oklch(${STEM} / 0.20)`,
                  boxShadow: `0 0 24px oklch(${STEM} / 0.06)`
                },
                "data-ocid": `explanation-${exp.id}`,
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "h3",
                    {
                      className: "font-display text-xl font-bold mb-4",
                      style: { color: `oklch(${STEM_LIGHT})` },
                      children: exp.heading
                    }
                  ),
                  exp.body.split("\n\n").map((paragraph) => /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "p",
                    {
                      className: "text-muted-foreground leading-relaxed mb-4 last:mb-0 text-[0.95rem]",
                      children: paragraph
                    },
                    paragraph.slice(0, 40)
                  ))
                ]
              }
            ) }, exp.id))
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(AnimatedEntrance, { direction: "up", delay: 0.1, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "div",
          {
            className: "rounded-2xl p-6 mb-14",
            style: {
              background: `oklch(${STEM} / 0.08)`,
              border: `1px solid oklch(${STEM} / 0.25)`
            },
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "h3",
                {
                  className: "font-display text-lg font-bold mb-4",
                  style: { color: `oklch(${STEM_LIGHT})` },
                  children: "🔑 Key Facts at a Glance"
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4", children: [
                {
                  icon: "🏆",
                  fact: "Nobel Prize 2012",
                  detail: "Gurdon & Yamanaka — cellular reprogramming & iPSCs"
                },
                {
                  icon: "🩸",
                  fact: "Bone Marrow Transplant",
                  detail: "First clinical stem cell therapy, established since the 1960s"
                },
                {
                  icon: "🧬",
                  fact: "4 Yamanaka Factors",
                  detail: "Oct4, Sox2, Klf4, c-Myc reprogram somatic cells to iPSCs"
                },
                {
                  icon: "📅",
                  fact: "14-Day Rule",
                  detail: "International limit on culturing human embryos in the lab"
                },
                {
                  icon: "🔬",
                  fact: "~200 Cell Types",
                  detail: "All arise from pluripotent stem cells during development"
                },
                {
                  icon: "🌱",
                  fact: "Niche Control",
                  detail: "Microenvironment determines if stem cells self-renew or differentiate"
                }
              ].map(({ icon, fact, detail }) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
                "div",
                {
                  className: "flex gap-3 items-start rounded-xl p-3",
                  style: { background: `oklch(${STEM} / 0.06)` },
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xl shrink-0", "aria-hidden": "true", children: icon }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        "p",
                        {
                          className: "text-sm font-bold leading-tight",
                          style: { color: `oklch(${STEM_LIGHT})` },
                          children: fact
                        }
                      ),
                      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground mt-0.5 leading-relaxed", children: detail })
                    ] })
                  ]
                },
                fact
              )) })
            ]
          }
        ) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(AnimatedEntrance, { direction: "up", delay: 0.1, children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "h3",
            {
              className: "font-display text-2xl font-bold mb-2",
              style: {
                color: `oklch(${STEM_LIGHT})`,
                textShadow: `0 0 20px oklch(${STEM} / 0.55)`
              },
              children: "🌱 Test Your Knowledge"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground mb-6", children: "10 questions covering stem cell biology, potency levels, iPSCs, differentiation, and therapeutic applications." }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(QuizEngine, { topicId: "stem-cells", questions: STEM_CELL_QUIZ })
        ] }) })
      ]
    }
  );
}
export {
  StemCellsSection as default
};
