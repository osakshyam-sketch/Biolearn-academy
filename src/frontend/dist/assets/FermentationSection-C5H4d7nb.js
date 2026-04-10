import { j as jsxRuntimeExports, F as FlaskConical } from "./index-V1Xys_hZ.js";
import { S as SectionHeader, A as AnimatedEntrance, a as StaggerContainer, b as StaggerItem, Q as QuizEngine } from "./SectionHeader-BzOZ529A.js";
const BUBBLES = [
  { id: "b1", cx: 92, startY: 290, delay: 0 },
  { id: "b2", cx: 115, startY: 310, delay: 0.7 },
  { id: "b3", cx: 138, startY: 295, delay: 1.4 },
  { id: "b4", cx: 105, startY: 320, delay: 2.1 },
  { id: "b5", cx: 125, startY: 305, delay: 0.4 },
  { id: "b6", cx: 80, startY: 315, delay: 1.8 },
  { id: "b7", cx: 150, startY: 285, delay: 2.8 },
  { id: "b8", cx: 98, startY: 300, delay: 3.3 }
];
function BioreactorDiagram() {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      className: "flex flex-col items-center gap-4",
      "aria-label": "Animated bioreactor diagram showing a stirred-tank vessel with rising bubbles, rotating stirrer, nutrient inlet, product outlet, and CO2 vent. Temperature and pH gauges are labeled on the vessel.",
      role: "img",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("style", { children: `
        @keyframes bubble-rise {
          0%   { transform: translateY(0px); opacity: 0.8; }
          80%  { opacity: 0.6; }
          100% { transform: translateY(-170px); opacity: 0; }
        }
        @keyframes stirrer-spin {
          from { transform: rotate(0deg); }
          to   { transform: rotate(360deg); }
        }
        @keyframes gauge-pulse {
          0%, 100% { opacity: 1; }
          50%       { opacity: 0.6; }
        }
        @keyframes foam-float {
          0%, 100% { transform: translateY(0px); }
          50%       { transform: translateY(-3px); }
        }
        .bubble-anim {
          animation: bubble-rise 3s ease-in infinite;
        }
        .stirrer-anim {
          transform-origin: 115px 300px;
          animation: stirrer-spin 4s linear infinite;
        }
        .gauge-anim {
          animation: gauge-pulse 2s ease-in-out infinite;
        }
        .foam-anim {
          animation: foam-float 2.5s ease-in-out infinite;
        }
      ` }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "svg",
          {
            viewBox: "0 0 340 460",
            width: "340",
            height: "460",
            "aria-hidden": "true",
            style: { filter: "drop-shadow(0 0 18px oklch(0.65 0.2 175 / 0.45))" },
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("defs", { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("linearGradient", { id: "vesselGrad", x1: "0%", y1: "0%", x2: "100%", y2: "0%", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("stop", { offset: "0%", stopColor: "oklch(0.38 0.04 220)" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("stop", { offset: "40%", stopColor: "oklch(0.55 0.05 210)" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("stop", { offset: "70%", stopColor: "oklch(0.48 0.04 215)" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("stop", { offset: "100%", stopColor: "oklch(0.32 0.04 220)" })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("linearGradient", { id: "liquidGrad", x1: "0%", y1: "0%", x2: "0%", y2: "100%", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "stop",
                    {
                      offset: "0%",
                      stopColor: "oklch(0.52 0.18 175)",
                      stopOpacity: "0.9"
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "stop",
                    {
                      offset: "100%",
                      stopColor: "oklch(0.35 0.14 175)",
                      stopOpacity: "0.95"
                    }
                  )
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("linearGradient", { id: "foamGrad", x1: "0%", y1: "0%", x2: "0%", y2: "100%", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "stop",
                    {
                      offset: "0%",
                      stopColor: "oklch(0.80 0.12 175)",
                      stopOpacity: "0.7"
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "stop",
                    {
                      offset: "100%",
                      stopColor: "oklch(0.60 0.15 175)",
                      stopOpacity: "0.5"
                    }
                  )
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("clipPath", { id: "vesselClip", children: /* @__PURE__ */ jsxRuntimeExports.jsx("path", { d: "M58,90 Q58,80 68,78 L162,78 Q172,78 172,90 L172,380 Q172,400 115,400 Q58,400 58,380 Z" }) })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "path",
                {
                  d: "M58,90 Q58,80 68,78 L162,78 Q172,78 172,90 L172,380 Q172,400 115,400 Q58,400 58,380 Z",
                  fill: "url(#vesselGrad)",
                  stroke: "oklch(0.6 0.05 210)",
                  strokeWidth: "2"
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "path",
                {
                  d: "M60,145 L170,145 L170,378 Q170,397 115,397 Q60,397 60,378 Z",
                  fill: "url(#liquidGrad)",
                  clipPath: "url(#vesselClip)"
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "ellipse",
                {
                  className: "foam-anim",
                  cx: "115",
                  cy: "148",
                  rx: "52",
                  ry: "8",
                  fill: "url(#foamGrad)"
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "line",
                {
                  x1: "58",
                  y1: "120",
                  x2: "172",
                  y2: "120",
                  stroke: "oklch(0.55 0.05 210)",
                  strokeWidth: "1.5",
                  strokeDasharray: "4,4",
                  opacity: "0.5"
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "line",
                {
                  x1: "58",
                  y1: "350",
                  x2: "172",
                  y2: "350",
                  stroke: "oklch(0.55 0.05 210)",
                  strokeWidth: "1.5",
                  strokeDasharray: "4,4",
                  opacity: "0.5"
                }
              ),
              BUBBLES.map((b) => /* @__PURE__ */ jsxRuntimeExports.jsx(
                "circle",
                {
                  className: "bubble-anim",
                  cx: b.cx,
                  cy: b.startY,
                  r: 3.5 + Number(b.id.replace("b", "")) % 3,
                  fill: "oklch(0.85 0.08 175)",
                  opacity: "0.75",
                  style: {
                    animationDelay: `${b.delay}s`,
                    animationDuration: `${2.4 + b.delay % 1.5}s`
                  }
                },
                b.id
              )),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "rect",
                {
                  x: "112",
                  y: "78",
                  width: "6",
                  height: "230",
                  fill: "oklch(0.58 0.04 210)",
                  rx: "2"
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("g", { className: "stirrer-anim", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "rect",
                  {
                    x: "68",
                    y: "293",
                    width: "38",
                    height: "9",
                    rx: "3",
                    fill: "oklch(0.62 0.06 210)",
                    stroke: "oklch(0.7 0.05 210)",
                    strokeWidth: "1"
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "rect",
                  {
                    x: "122",
                    y: "293",
                    width: "38",
                    height: "9",
                    rx: "3",
                    fill: "oklch(0.62 0.06 210)",
                    stroke: "oklch(0.7 0.05 210)",
                    strokeWidth: "1"
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "rect",
                  {
                    x: "110",
                    y: "264",
                    width: "9",
                    height: "38",
                    rx: "3",
                    fill: "oklch(0.62 0.06 210)",
                    stroke: "oklch(0.7 0.05 210)",
                    strokeWidth: "1"
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "rect",
                  {
                    x: "110",
                    y: "303",
                    width: "9",
                    height: "38",
                    rx: "3",
                    fill: "oklch(0.62 0.06 210)",
                    stroke: "oklch(0.7 0.05 210)",
                    strokeWidth: "1"
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "circle",
                  {
                    cx: "115",
                    cy: "300",
                    r: "8",
                    fill: "oklch(0.55 0.05 210)",
                    stroke: "oklch(0.7 0.05 210)",
                    strokeWidth: "1.5"
                  }
                )
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "ellipse",
                {
                  cx: "115",
                  cy: "370",
                  rx: "28",
                  ry: "5",
                  fill: "oklch(0.42 0.04 210)",
                  stroke: "oklch(0.6 0.05 210)",
                  strokeWidth: "1.5"
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "rect",
                {
                  x: "111",
                  y: "370",
                  width: "8",
                  height: "16",
                  fill: "oklch(0.42 0.04 210)",
                  rx: "2"
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "ellipse",
                {
                  cx: "115",
                  cy: "85",
                  rx: "57",
                  ry: "12",
                  fill: "oklch(0.44 0.04 215)",
                  stroke: "oklch(0.6 0.05 210)",
                  strokeWidth: "2"
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("g", { className: "gauge-anim", transform: "translate(178, 190)", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "rect",
                  {
                    x: "0",
                    y: "0",
                    width: "44",
                    height: "60",
                    rx: "6",
                    fill: "oklch(0.18 0.06 262)",
                    stroke: "oklch(0.55 0.15 175)",
                    strokeWidth: "1.5"
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "text",
                  {
                    x: "22",
                    y: "14",
                    textAnchor: "middle",
                    fontSize: "7",
                    fill: "oklch(0.75 0.15 175)",
                    fontFamily: "monospace",
                    fontWeight: "bold",
                    children: "TEMP"
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "rect",
                  {
                    x: "6",
                    y: "20",
                    width: "32",
                    height: "10",
                    rx: "3",
                    fill: "oklch(0.12 0.05 262)"
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "rect",
                  {
                    x: "7",
                    y: "21",
                    width: "24",
                    height: "8",
                    rx: "2",
                    fill: "oklch(0.72 0.2 50)"
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "text",
                  {
                    x: "22",
                    y: "44",
                    textAnchor: "middle",
                    fontSize: "8",
                    fill: "oklch(0.88 0.05 262)",
                    fontFamily: "monospace",
                    children: "37°C"
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "text",
                  {
                    x: "22",
                    y: "56",
                    textAnchor: "middle",
                    fontSize: "6",
                    fill: "oklch(0.62 0.06 262)",
                    fontFamily: "monospace",
                    children: "Optimal"
                  }
                )
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs(
                "g",
                {
                  className: "gauge-anim",
                  transform: "translate(178, 265)",
                  style: { animationDelay: "0.8s" },
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "rect",
                      {
                        x: "0",
                        y: "0",
                        width: "44",
                        height: "60",
                        rx: "6",
                        fill: "oklch(0.18 0.06 262)",
                        stroke: "oklch(0.55 0.15 175)",
                        strokeWidth: "1.5"
                      }
                    ),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "text",
                      {
                        x: "22",
                        y: "14",
                        textAnchor: "middle",
                        fontSize: "7",
                        fill: "oklch(0.75 0.15 175)",
                        fontFamily: "monospace",
                        fontWeight: "bold",
                        children: "pH"
                      }
                    ),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "rect",
                      {
                        x: "6",
                        y: "20",
                        width: "32",
                        height: "10",
                        rx: "3",
                        fill: "oklch(0.12 0.05 262)"
                      }
                    ),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "rect",
                      {
                        x: "7",
                        y: "21",
                        width: "20",
                        height: "8",
                        rx: "2",
                        fill: "oklch(0.65 0.18 142)"
                      }
                    ),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "text",
                      {
                        x: "22",
                        y: "44",
                        textAnchor: "middle",
                        fontSize: "8",
                        fill: "oklch(0.88 0.05 262)",
                        fontFamily: "monospace",
                        children: "7.0"
                      }
                    ),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "text",
                      {
                        x: "22",
                        y: "56",
                        textAnchor: "middle",
                        fontSize: "6",
                        fill: "oklch(0.62 0.06 262)",
                        fontFamily: "monospace",
                        children: "Neutral"
                      }
                    )
                  ]
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "line",
                {
                  x1: "178",
                  y1: "220",
                  x2: "172",
                  y2: "220",
                  stroke: "oklch(0.55 0.15 175)",
                  strokeWidth: "1",
                  strokeDasharray: "2,2",
                  opacity: "0.6"
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "line",
                {
                  x1: "178",
                  y1: "295",
                  x2: "172",
                  y2: "295",
                  stroke: "oklch(0.55 0.15 175)",
                  strokeWidth: "1",
                  strokeDasharray: "2,2",
                  opacity: "0.6"
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "path",
                {
                  d: "M155,78 L155,50 L230,50",
                  fill: "none",
                  stroke: "oklch(0.62 0.08 30)",
                  strokeWidth: "3",
                  strokeLinecap: "round"
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx("polygon", { points: "226,44 238,50 226,56", fill: "oklch(0.62 0.08 30)" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "text",
                {
                  x: "232",
                  y: "46",
                  fontSize: "9",
                  fill: "oklch(0.62 0.08 30)",
                  fontWeight: "bold",
                  children: "CO₂ out"
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "path",
                {
                  d: "M75,78 L75,50 L10,50",
                  fill: "none",
                  stroke: "oklch(0.72 0.18 142)",
                  strokeWidth: "3",
                  strokeLinecap: "round"
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx("polygon", { points: "14,44 2,50 14,56", fill: "oklch(0.72 0.18 142)" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "text",
                {
                  x: "2",
                  y: "44",
                  fontSize: "9",
                  fill: "oklch(0.72 0.18 142)",
                  fontWeight: "bold",
                  children: "Nutrients"
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "text",
                {
                  x: "2",
                  y: "56",
                  fontSize: "9",
                  fill: "oklch(0.72 0.18 142)",
                  fontWeight: "bold",
                  children: "in"
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "path",
                {
                  d: "M172,370 L220,370 L220,430",
                  fill: "none",
                  stroke: "oklch(0.68 0.22 36)",
                  strokeWidth: "3",
                  strokeLinecap: "round"
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx("polygon", { points: "214,426 220,438 226,426", fill: "oklch(0.68 0.22 36)" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "text",
                {
                  x: "224",
                  y: "402",
                  fontSize: "9",
                  fill: "oklch(0.68 0.22 36)",
                  fontWeight: "bold",
                  children: "Product"
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "text",
                {
                  x: "224",
                  y: "414",
                  fontSize: "9",
                  fill: "oklch(0.68 0.22 36)",
                  fontWeight: "bold",
                  children: "out"
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "path",
                {
                  d: "M58,370 L10,370 L10,430",
                  fill: "none",
                  stroke: "oklch(0.68 0.19 262)",
                  strokeWidth: "3",
                  strokeLinecap: "round"
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx("polygon", { points: "4,426 10,438 16,426", fill: "oklch(0.68 0.19 262)" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "text",
                {
                  x: "1",
                  y: "400",
                  fontSize: "9",
                  fill: "oklch(0.68 0.19 262)",
                  fontWeight: "bold",
                  children: "Air / O₂"
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "text",
                {
                  x: "1",
                  y: "412",
                  fontSize: "9",
                  fill: "oklch(0.68 0.19 262)",
                  fontWeight: "bold",
                  children: "in"
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "text",
                {
                  x: "115",
                  y: "165",
                  textAnchor: "middle",
                  fontSize: "8.5",
                  fill: "oklch(0.88 0.05 262)",
                  fontWeight: "bold",
                  children: "Broth"
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "text",
                {
                  x: "115",
                  y: "176",
                  textAnchor: "middle",
                  fontSize: "7",
                  fill: "oklch(0.75 0.08 175)",
                  children: "microorganisms + medium"
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "text",
                {
                  x: "115",
                  y: "240",
                  textAnchor: "middle",
                  fontSize: "7.5",
                  fill: "oklch(0.82 0.12 175)",
                  children: "Impeller"
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "text",
                {
                  x: "115",
                  y: "250",
                  textAnchor: "middle",
                  fontSize: "6.5",
                  fill: "oklch(0.65 0.08 175)",
                  children: "(mixing)"
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "text",
                {
                  x: "115",
                  y: "390",
                  textAnchor: "middle",
                  fontSize: "7.5",
                  fill: "oklch(0.75 0.08 175)",
                  children: "Sparger"
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "text",
                {
                  x: "115",
                  y: "448",
                  textAnchor: "middle",
                  fontSize: "11",
                  fill: "oklch(0.75 0.15 175)",
                  fontWeight: "bold",
                  children: "Stirred-Tank Bioreactor"
                }
              )
            ]
          }
        )
      ]
    }
  );
}
const quizQuestions = [
  {
    id: "ferm-q1",
    topic: "fermentation",
    question: "What distinguishes anaerobic fermentation from aerobic respiration?",
    options: [
      "Anaerobic fermentation requires oxygen; aerobic respiration does not",
      "Anaerobic fermentation occurs without oxygen and produces less ATP than aerobic respiration",
      "Aerobic respiration produces lactic acid; anaerobic fermentation produces CO₂",
      "They are identical processes — the terms are interchangeable"
    ],
    correctIndex: 1,
    explanation: "Anaerobic fermentation proceeds without oxygen and regenerates NAD⁺ by reducing pyruvate to products like lactate or ethanol, yielding only 2 ATP per glucose. Aerobic respiration uses oxygen and yields ~30–32 ATP per glucose through the full oxidation of glucose."
  },
  {
    id: "ferm-q2",
    topic: "fermentation",
    question: "Which metabolic product is generated during lactic acid fermentation?",
    options: [
      "Ethanol and CO₂",
      "Acetone and butanol",
      "Lactic acid (lactate)",
      "Acetic acid and hydrogen gas"
    ],
    correctIndex: 2,
    explanation: "In lactic acid fermentation, pyruvate is reduced directly to lactate by lactate dehydrogenase, regenerating NAD⁺. This pathway is used by Lactobacillus bacteria in yogurt and cheese production, and by human muscle cells during intense exercise."
  },
  {
    id: "ferm-q3",
    topic: "fermentation",
    question: "Which microorganism is most widely used in alcoholic fermentation for brewing and baking?",
    options: [
      "Escherichia coli",
      "Saccharomyces cerevisiae",
      "Penicillium notatum",
      "Clostridium acetobutylicum"
    ],
    correctIndex: 1,
    explanation: "Saccharomyces cerevisiae (brewer's yeast) carries out alcoholic fermentation, converting glucose to ethanol and CO₂. It is used industrially in brewing beer, fermenting wine, and leavening bread dough."
  },
  {
    id: "ferm-q4",
    topic: "fermentation",
    question: "What is the primary function of an impeller in a stirred-tank bioreactor?",
    options: [
      "To sterilize the growth medium by heat generation",
      "To control pH by releasing acid or base",
      "To mix the broth and maintain oxygen and nutrient distribution",
      "To filter product from the fermentation broth"
    ],
    correctIndex: 2,
    explanation: "The impeller in a stirred-tank bioreactor provides mechanical agitation, ensuring uniform distribution of oxygen, nutrients, and temperature throughout the culture. Good mixing prevents oxygen gradients and concentration gradients that would inhibit cell growth."
  },
  {
    id: "ferm-q5",
    topic: "fermentation",
    question: "In a batch fermentation process, what happens after inoculation?",
    options: [
      "Fresh medium is continuously added while product is continuously removed",
      "The culture grows in a closed, fixed volume of medium until nutrients are depleted",
      "Cells are removed at regular intervals while medium is replaced",
      "The bioreactor is heated to kill all cells and harvest the product"
    ],
    correctIndex: 1,
    explanation: "Batch fermentation is a closed-system process: the vessel is inoculated and sealed, and the culture grows through lag, exponential, stationary, and decline phases until nutrients are exhausted. The entire batch is then harvested. This contrasts with continuous culture, where fresh medium is constantly fed and broth continuously removed."
  },
  {
    id: "ferm-q6",
    topic: "fermentation",
    question: "Which antibiotic is produced by Penicillium mold through industrial fermentation?",
    options: ["Streptomycin", "Tetracycline", "Penicillin", "Vancomycin"],
    correctIndex: 2,
    explanation: "Penicillin is produced by the filamentous fungus Penicillium chrysogenum. Alexander Fleming discovered its antibacterial properties in 1928, and by the 1940s industrial deep-tank fermentation processes were developed to produce penicillin at scale, transforming medicine."
  },
  {
    id: "ferm-q7",
    topic: "fermentation",
    question: "What is a key challenge when scaling up fermentation from laboratory to industrial scale?",
    options: [
      "Microorganisms behave differently at larger scales due to oxygen and mixing limitations",
      "Industrial bioreactors cannot maintain sterile conditions",
      "Large-scale fermentation always produces toxic byproducts",
      "Scale-up is straightforward since microorganism behavior is independent of vessel size"
    ],
    correctIndex: 0,
    explanation: "Scale-up is challenging because mixing time, oxygen transfer rates, heat removal, and shear forces change non-linearly with vessel volume. What works in a 1-liter flask may produce oxygen-starved or poorly mixed zones in a 10,000-liter tank, requiring careful engineering of impeller design, sparger placement, and aeration strategies."
  },
  {
    id: "ferm-q8",
    topic: "fermentation",
    question: "How is recombinant human insulin produced commercially?",
    options: [
      "Extracted from the pancreases of pigs and purified",
      "Synthesized chemically from amino acids in industrial reactors",
      "Produced by genetically engineered Escherichia coli or yeast via fermentation",
      "Isolated from human blood donors"
    ],
    correctIndex: 2,
    explanation: "Recombinant human insulin is produced by inserting the human insulin gene into E. coli or Saccharomyces cerevisiae. These microorganisms then express the insulin protein during fermentation, which is purified, folded correctly, and formulated for therapeutic use."
  },
  {
    id: "ferm-q9",
    topic: "fermentation",
    question: "What is the role of a sparger in a bioreactor?",
    options: [
      "To add carbon sources like glucose to the medium",
      "To remove CO₂ from the exhaust gas stream",
      "To introduce fine air or oxygen bubbles into the culture broth",
      "To maintain temperature by circulating coolant"
    ],
    correctIndex: 2,
    explanation: "A sparger is a porous device or perforated pipe at the bottom of a bioreactor that disperses compressed air or pure oxygen as fine bubbles. These small bubbles maximize the gas-liquid contact area, improving oxygen mass transfer into the broth — critical for aerobic fermentations."
  },
  {
    id: "ferm-q10",
    topic: "fermentation",
    question: "Which type of fermentation produces both ethanol and CO₂ as metabolic end products?",
    options: [
      "Lactic acid fermentation",
      "Propionic acid fermentation",
      "Alcoholic (ethanolic) fermentation",
      "Acetic acid fermentation"
    ],
    correctIndex: 2,
    explanation: "In alcoholic fermentation, pyruvate is first decarboxylated to acetaldehyde (releasing CO₂), then acetaldehyde is reduced to ethanol by alcohol dehydrogenase using NADH. Both ethanol and CO₂ are the characteristic end products — CO₂ is what causes bread to rise and beer to be carbonated."
  }
];
const explanations = [
  {
    id: "intro",
    heading: "What Is Fermentation? Aerobic vs. Anaerobic Pathways",
    color: "oklch(0.72 0.18 175)",
    body: `Fermentation is a metabolic process in which microorganisms — and some of our own cells — extract energy from organic molecules in the absence of oxygen. More precisely, fermentation refers to the regeneration of NAD⁺ from NADH after glycolysis, allowing glycolysis to continue producing ATP even when no oxygen is available as a terminal electron acceptor. During glycolysis, glucose (6 carbons) is broken down into two molecules of pyruvate (3 carbons each), generating 2 ATP and 2 NADH. Without oxygen, the NADH produced must be reoxidized back to NAD⁺ — and fermentation pathways accomplish exactly this by transferring electrons to organic end products rather than to oxygen.

Aerobic respiration, by contrast, uses oxygen as the final electron acceptor in the electron transport chain, allowing the complete oxidation of glucose through the citric acid cycle and oxidative phosphorylation. This yields approximately 30–32 ATP per glucose molecule — far more than the 2 ATP generated by fermentation alone. The tradeoff is that aerobic respiration requires oxygen, while fermentation can sustain life in anaerobic environments — from the bottom of swamps to the interior of a fermenting batch of dough.`
  },
  {
    id: "types",
    heading: "Lactic Acid vs. Alcoholic Fermentation",
    color: "oklch(0.68 0.22 36)",
    body: `There are two major fermentation pathways that dominate industrial and biological importance. In **lactic acid fermentation**, pyruvate is reduced directly to lactate (lactic acid) by the enzyme lactate dehydrogenase, using the electrons from NADH. This pathway is used by lactic acid bacteria (LAB) such as Lactobacillus and Streptococcus — the microorganisms responsible for yogurt, cheese, sauerkraut, kimchi, and sourdough. Our own muscle cells switch to lactic acid fermentation during intense exercise when oxygen delivery cannot keep pace with ATP demand, causing the burning sensation associated with muscle fatigue.

**Alcoholic (ethanolic) fermentation** proceeds differently: pyruvate is first decarboxylated to acetaldehyde by pyruvate decarboxylase (releasing CO₂), and acetaldehyde is then reduced to ethanol by alcohol dehydrogenase using NADH. This two-step process is the biochemical basis of brewing, winemaking, and bread-making. The CO₂ released during alcoholic fermentation is what causes bread dough to rise and gives beer and champagne their carbonation. Yeasts — primarily Saccharomyces cerevisiae — are the microbial workhorses of alcoholic fermentation. Other fermentation pathways of industrial interest include propionic acid fermentation (Swiss cheese), butanol fermentation (biofuel production), and acetic acid fermentation (vinegar).`
  },
  {
    id: "microorganisms",
    heading: "Microorganisms in Industrial Fermentation",
    color: "oklch(0.70 0.20 290)",
    body: `Industrial fermentation relies on a carefully selected cast of microorganisms, each chosen for their unique metabolic capabilities, robustness, and suitability for large-scale culture. Bacteria are the workhorses of many industrial processes: Escherichia coli is the preferred host for recombinant protein production because it grows rapidly, is genetically well-understood, and can be engineered to produce foreign proteins at high yields. Corynebacterium glutamicum is used to manufacture amino acids like glutamate (monosodium glutamate, MSG) and lysine on a scale of millions of tons per year. Streptomyces species are filamentous bacteria that naturally produce antibiotics, including streptomycin, erythromycin, and tetracycline.

Fungi serve equally critical industrial roles. The yeast Saccharomyces cerevisiae dominates ethanol fermentation for beverages and biofuels, and is widely used for recombinant protein expression — including hepatitis B vaccine antigens and insulin. Filamentous fungi like Aspergillus niger are used to produce citric acid (a ubiquitous food additive) and industrial enzymes. Penicillium chrysogenum produces penicillin. Trichoderma reesei secretes cellulases used to break down plant biomass for second-generation biofuels. Microalgae are emerging producers of high-value compounds like omega-3 fatty acids, carotenoids, and bioplastic precursors.`
  },
  {
    id: "bioreactor",
    heading: "Bioreactor Design: From Stirred Tanks to Airlift Vessels",
    color: "oklch(0.65 0.20 175)",
    body: `A bioreactor is an engineered vessel designed to support and control microbial or cell culture at scale. The most common design is the **stirred-tank bioreactor (STR)**: a cylindrical stainless steel vessel equipped with mechanical agitators (impellers), a sparger for introducing air or oxygen, baffles to enhance mixing, temperature control via a water jacket, and ports for measuring and adjusting pH, dissolved oxygen, and nutrient feed. The impeller is the heart of the STR — its rotation creates turbulent flow that distributes oxygen, breaks up air bubbles, and maintains a homogeneous culture environment. Impeller designs range from Rushton turbines (excellent for gas dispersion) to pitched-blade turbines (gentler for fragile mammalian cells).

**Airlift bioreactors** use rising air or gas bubbles rather than mechanical agitation to circulate the culture. Air is introduced at the bottom of a draft tube (the riser), causing liquid to flow upward through the riser and downward through the annular space (the downcomer). This gentle circulation is ideal for shear-sensitive organisms like mammalian cells and microalgae. Airlift reactors require less energy and have fewer mechanical parts than STRs, reducing contamination risk and maintenance costs. Other designs include packed-bed reactors (immobilized cells on beads), bubble column reactors, and wave bioreactors (single-use plastic bags for cell therapy). The choice of bioreactor design depends on the organism, oxygen demand, product, and shear tolerance of the culture.`
  },
  {
    id: "scale-up",
    heading: "Scale-Up Challenges in Bioprocess Engineering",
    color: "oklch(0.72 0.18 142)",
    body: `Translating a fermentation process from a laboratory flask to a 50,000-liter industrial bioreactor is one of the most technically demanding challenges in bioprocess engineering. At laboratory scale, mixing is rapid, oxygen transfer is easy, and temperature gradients are negligible. At industrial scale, these assumptions break down. Mixing time — the time for a pulse of tracer to become uniformly distributed — scales roughly with vessel diameter, meaning industrial bioreactors can have mixing times of minutes rather than seconds. This creates concentration gradients of nutrients, dissolved oxygen, and pH throughout the vessel, which can profoundly affect microbial physiology and product yield.

Oxygen transfer rate (OTR) is often the critical scale-up constraint for aerobic fermentations. The volumetric oxygen transfer coefficient (kLa) must be maintained as vessels grow, requiring careful optimization of impeller speed, sparger design, and aeration rate — while avoiding excessive shear forces that damage cells. Heat removal presents another challenge: large cultures generate substantial metabolic heat, and cooling capacity must scale accordingly. Engineers use dimensionless parameters like the Reynolds number, power-to-volume ratio, and oxygen uptake rate to guide scale-up decisions, but empirical testing at pilot scale (typically 100–1000 liters) is almost always required before full industrial production begins.`
  },
  {
    id: "applications",
    heading: "Applications: Antibiotics, Beer, Cheese, Insulin, and Beyond",
    color: "oklch(0.68 0.22 36)",
    body: `Fermentation technology underpins an astonishing range of products central to modern life. In medicine, fermentation produces antibiotics — penicillin, cephalosporins, aminoglycosides — that have saved hundreds of millions of lives. Recombinant insulin, produced by engineered E. coli since 1982, replaced animal-derived insulin and is now the primary treatment for type 1 diabetes worldwide. Vaccines (hepatitis B, human papillomavirus), biologic drugs (erythropoietin, monoclonal antibodies), and amino acid supplements for animal feed all rely on industrial fermentation. The global market for fermentation-derived pharmaceuticals exceeds $200 billion annually.

In food and beverage production, fermentation is ancient technology modernized at industrial scale. Beer brewing uses Saccharomyces cerevisiae to ferment malted barley; wine fermentation converts grape sugars to ethanol; distilled spirits concentrate fermented ethanol further. Cheese production relies on LAB to acidify milk and specific fungi for ripening (Penicillium camemberti gives Brie its white rind; Penicillium roqueforti gives blue cheese its flavor and appearance). Soy sauce, miso, tempeh, and kombucha are fermented foods with complex microbial ecologies. Industrial enzymes produced by fermentation — amylases, proteases, lipases — are used in baking, brewing, detergents, and textile processing. Biofuels represent a growing application: bioethanol from sugarcane and corn fermentation is blended into gasoline worldwide, reducing fossil fuel dependence.`
  },
  {
    id: "continuous",
    heading: "Batch vs. Continuous Fermentation: Process Economics",
    color: "oklch(0.70 0.20 290)",
    body: `Industrial fermentation processes are classified by how medium is added and culture is removed. In **batch fermentation**, the bioreactor is inoculated with a starter culture, and the microorganisms grow through a characteristic series of phases: a lag phase (adaptation to the new environment), an exponential growth phase (rapid doubling), a stationary phase (nutrient depletion slows growth), and a decline phase. All of the product accumulates in the vessel over this time, and the entire batch is then harvested at once. Batch processes are simple to operate, easy to troubleshoot, and minimize contamination risk because the vessel is cleaned and sterilized between runs.

**Fed-batch fermentation** is a variation in which nutrients are added incrementally over time without removing culture — extending the productive phase and allowing much higher cell densities and product titers. Fed-batch is the dominant mode for antibiotic production and recombinant protein expression. **Continuous culture** (chemostat operation) provides a steady inflow of fresh medium and outflow of culture at equal rates, maintaining cells at a constant density and growth rate. Continuous operation maximizes volumetric productivity but requires stringent contamination prevention over long operational periods. Choosing between batch, fed-batch, and continuous operation depends on product stability, contamination risk, regulatory requirements, and economics — a batch process is safer and more auditable for pharmaceutical products, while continuous processes suit commodities like ethanol.`
  }
];
function FermentationSection() {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "section",
    {
      className: "px-6 py-16 max-w-5xl mx-auto",
      "data-ocid": "fermentation-section",
      "aria-label": "Fermentation and Bioreactors educational section",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          SectionHeader,
          {
            topicId: "fermentation",
            title: "Fermentation & Bioreactors",
            subtitle: "From ancient bread-making to cutting-edge insulin production — explore the metabolic processes and engineered vessels that power biotechnology."
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(AnimatedEntrance, { direction: "up", delay: 0.1, children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-14", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "h3",
            {
              className: "font-display text-xl font-semibold mb-6 flex items-center gap-2",
              style: { color: "oklch(0.72 0.18 175)" },
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  FlaskConical,
                  {
                    className: "inline w-5 h-5",
                    style: { color: "oklch(0.72 0.18 175)" },
                    "aria-hidden": "true"
                  }
                ),
                "Interactive Bioreactor Diagram"
              ]
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "div",
            {
              className: "rounded-2xl p-8 flex flex-col md:flex-row items-center gap-8",
              style: {
                background: "oklch(0.16 0.05 262)",
                border: "1px solid oklch(0.55 0.15 175 / 0.35)",
                boxShadow: "0 0 40px oklch(0.65 0.2 175 / 0.15), inset 0 0 24px oklch(0.65 0.2 175 / 0.04)"
              },
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex-shrink-0", children: /* @__PURE__ */ jsxRuntimeExports.jsx(BioreactorDiagram, {}) }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col gap-3 min-w-0", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "h4",
                    {
                      className: "font-display text-base font-semibold mb-1",
                      style: { color: "oklch(0.88 0.05 262)" },
                      children: "Components"
                    }
                  ),
                  [
                    {
                      color: "oklch(0.62 0.06 210)",
                      label: "Impeller",
                      desc: "Rotating blades for mixing"
                    },
                    {
                      color: "oklch(0.52 0.18 175)",
                      label: "Culture Broth",
                      desc: "Microorganism suspension"
                    },
                    {
                      color: "oklch(0.80 0.12 175)",
                      label: "Foam / Bubbles",
                      desc: "Air dispersion from sparger"
                    },
                    {
                      color: "oklch(0.72 0.18 142)",
                      label: "Nutrient Inlet",
                      desc: "Sugars, nitrogen, minerals"
                    },
                    {
                      color: "oklch(0.68 0.22 36)",
                      label: "Product Outlet",
                      desc: "Harvested fermentation product"
                    },
                    {
                      color: "oklch(0.68 0.19 262)",
                      label: "Air / O₂ Inlet",
                      desc: "Oxygen for aerobic growth"
                    },
                    {
                      color: "oklch(0.62 0.08 30)",
                      label: "CO₂ Exhaust",
                      desc: "Metabolic gas removed overhead"
                    }
                  ].map((item) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start gap-3", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "span",
                      {
                        className: "mt-1 flex-shrink-0 w-3 h-3 rounded-full",
                        style: { background: item.color },
                        "aria-hidden": "true"
                      }
                    ),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        "span",
                        {
                          className: "font-semibold text-sm",
                          style: { color: item.color },
                          children: item.label
                        }
                      ),
                      /* @__PURE__ */ jsxRuntimeExports.jsxs(
                        "span",
                        {
                          className: "text-sm ml-1",
                          style: { color: "oklch(0.68 0.06 262)" },
                          children: [
                            "— ",
                            item.desc
                          ]
                        }
                      )
                    ] })
                  ] }, item.label))
                ] })
              ]
            }
          )
        ] }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(StaggerContainer, { className: "mb-14 flex flex-col gap-10", children: explanations.map((para) => /* @__PURE__ */ jsxRuntimeExports.jsx(StaggerItem, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "article",
          {
            "aria-labelledby": `ferm-heading-${para.id}`,
            className: "rounded-2xl p-6 md:p-8",
            style: {
              background: "oklch(0.16 0.05 262)",
              border: `1px solid ${para.color}40`,
              boxShadow: `0 0 24px ${para.color}18`
            },
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "h3",
                {
                  id: `ferm-heading-${para.id}`,
                  className: "font-display text-lg font-bold mb-4",
                  style: { color: para.color },
                  children: para.heading
                }
              ),
              para.body.split("\n\n").map((paragraph) => /* @__PURE__ */ jsxRuntimeExports.jsx(
                "p",
                {
                  className: "text-base leading-relaxed mb-3 last:mb-0",
                  style: { color: "oklch(0.88 0.03 262)" },
                  children: paragraph.replace(/\*\*(.*?)\*\*/g, "$1")
                },
                paragraph.slice(0, 40)
              ))
            ]
          }
        ) }, para.id)) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(AnimatedEntrance, { direction: "up", delay: 0.2, children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { "data-ocid": "fermentation-quiz", children: /* @__PURE__ */ jsxRuntimeExports.jsx(QuizEngine, { topicId: "fermentation", questions: quizQuestions }) }) })
      ]
    }
  );
}
export {
  FermentationSection as default
};
