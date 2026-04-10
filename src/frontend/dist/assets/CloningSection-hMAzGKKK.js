import { j as jsxRuntimeExports, r as reactExports } from "./index-V1Xys_hZ.js";
import { S as SectionHeader, A as AnimatedEntrance, a as StaggerContainer, b as StaggerItem, Q as QuizEngine } from "./SectionHeader-BzOZ529A.js";
const C = {
  teal: "oklch(0.70 0.17 160)",
  tealLight: "oklch(0.82 0.13 160)",
  tealDim: "oklch(0.70 0.17 160 / 0.25)",
  bg: "oklch(0.16 0.05 262)",
  bgDark: "oklch(0.14 0.05 262)",
  geneA: "oklch(0.72 0.22 36)",
  // orange – target gene
  geneB: "oklch(0.70 0.20 290)",
  // purple – plasmid backbone
  bacteria: "oklch(0.68 0.19 262)",
  // blue   – bacterium
  ligase: "oklch(0.72 0.18 142)"
  // green  – DNA ligase
};
const borderTeal = "1px solid oklch(0.70 0.17 160 / 0.45)";
const borderTealFaint = "1px solid oklch(0.26 0.05 262)";
const STEPS = [
  { id: "step-cut", label: "1. Restriction Digest", short: "Cut" },
  { id: "step-sticky", label: "2. Prepare Sticky Ends", short: "Sticky Ends" },
  { id: "step-ligate", label: "3. Ligate Gene into Plasmid", short: "Ligate" },
  { id: "step-transform", label: "4. Transform Bacteria", short: "Transform" },
  { id: "step-select", label: "5. Select Colonies", short: "Select" },
  { id: "step-express", label: "6. Express Gene Product", short: "Express" }
];
function StepCut({ active }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "svg",
    {
      viewBox: "0 0 300 300",
      width: "300",
      height: "300",
      "aria-label": "Restriction enzyme cutting circular plasmid at recognition site",
      role: "img",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("defs", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("filter", { id: "gcut-b", children: /* @__PURE__ */ jsxRuntimeExports.jsx("feDropShadow", { dx: "0", dy: "0", stdDeviation: "4", floodColor: C.geneB }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("filter", { id: "gcut-t", children: /* @__PURE__ */ jsxRuntimeExports.jsx("feDropShadow", { dx: "0", dy: "0", stdDeviation: "3", floodColor: C.teal }) }),
          active && /* @__PURE__ */ jsxRuntimeExports.jsx(
            "marker",
            {
              id: "arr-cut",
              markerWidth: "6",
              markerHeight: "6",
              refX: "3",
              refY: "3",
              orient: "auto",
              children: /* @__PURE__ */ jsxRuntimeExports.jsx("path", { d: "M0,0 L6,3 L0,6 Z", fill: C.teal })
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "circle",
          {
            cx: "150",
            cy: "150",
            r: "90",
            fill: "none",
            stroke: C.geneB,
            strokeWidth: "10",
            filter: "url(#gcut-b)"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "circle",
          {
            cx: "150",
            cy: "60",
            r: "10",
            fill: C.teal,
            filter: "url(#gcut-t)",
            style: {
              animation: active ? "pulse-glow 1.4s ease-in-out infinite" : "none"
            }
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "text",
          {
            x: "150",
            y: "38",
            textAnchor: "middle",
            fontSize: "11",
            fill: C.teal,
            fontFamily: "DM Sans,sans-serif",
            children: "Recognition Site"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "text",
          {
            x: "150",
            y: "162",
            textAnchor: "middle",
            fontSize: "13",
            fill: C.geneB,
            fontFamily: "DM Sans,sans-serif",
            fontWeight: "600",
            children: "Plasmid"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "text",
          {
            x: "150",
            y: "178",
            textAnchor: "middle",
            fontSize: "11",
            fill: C.tealLight,
            fontFamily: "DM Sans,sans-serif",
            children: "Restriction Enzyme"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "g",
          {
            style: {
              transform: active ? "translate(130px,68px)" : "translate(145px,68px)",
              transition: "transform 0.8s ease-in-out",
              opacity: active ? 1 : 0.4
            },
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "line",
                {
                  x1: "0",
                  y1: "0",
                  x2: "-14",
                  y2: "-14",
                  stroke: C.teal,
                  strokeWidth: "3",
                  strokeLinecap: "round"
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "line",
                {
                  x1: "0",
                  y1: "0",
                  x2: "14",
                  y2: "-14",
                  stroke: C.teal,
                  strokeWidth: "3",
                  strokeLinecap: "round"
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx("circle", { cx: "0", cy: "0", r: "3", fill: C.teal })
            ]
          }
        ),
        active && /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "path",
            {
              d: "M135,60 L115,50",
              stroke: C.teal,
              strokeWidth: "1.5",
              strokeDasharray: "4 2",
              fill: "none",
              markerEnd: "url(#arr-cut)"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "path",
            {
              d: "M165,60 L185,50",
              stroke: C.teal,
              strokeWidth: "1.5",
              strokeDasharray: "4 2",
              fill: "none",
              markerEnd: "url(#arr-cut)"
            }
          )
        ] })
      ]
    }
  );
}
function StepStickyEnds({ active }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "svg",
    {
      viewBox: "0 0 300 240",
      width: "300",
      height: "240",
      "aria-label": "Sticky ends produced after restriction digest",
      role: "img",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("defs", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("filter", { id: "gse-b", children: /* @__PURE__ */ jsxRuntimeExports.jsx("feDropShadow", { dx: "0", dy: "0", stdDeviation: "2.5", floodColor: C.geneB }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("filter", { id: "gse-a", children: /* @__PURE__ */ jsxRuntimeExports.jsx("feDropShadow", { dx: "0", dy: "0", stdDeviation: "2.5", floodColor: C.geneA }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("filter", { id: "gse-t", children: /* @__PURE__ */ jsxRuntimeExports.jsx("feDropShadow", { dx: "0", dy: "0", stdDeviation: "3", floodColor: C.teal }) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "rect",
          {
            x: "30",
            y: "80",
            width: "110",
            height: "18",
            rx: "4",
            fill: C.geneB,
            filter: "url(#gse-b)"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "rect",
          {
            x: "160",
            y: "80",
            width: "110",
            height: "18",
            rx: "4",
            fill: C.geneA,
            filter: "url(#gse-a)"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "rect",
          {
            x: "132",
            y: "72",
            width: "14",
            height: "12",
            rx: "2",
            fill: C.teal,
            filter: "url(#gse-t)",
            style: {
              animation: active ? "pulse-glow 1.2s ease-in-out infinite" : "none"
            }
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "rect",
          {
            x: "154",
            y: "94",
            width: "14",
            height: "12",
            rx: "2",
            fill: C.teal,
            filter: "url(#gse-t)",
            style: {
              animation: active ? "pulse-glow 1.2s ease-in-out 0.3s infinite" : "none"
            }
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "text",
          {
            x: "85",
            y: "72",
            textAnchor: "middle",
            fontSize: "11",
            fill: C.geneB,
            fontFamily: "DM Sans,sans-serif",
            children: "Plasmid Fragment"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "text",
          {
            x: "215",
            y: "72",
            textAnchor: "middle",
            fontSize: "11",
            fill: C.geneA,
            fontFamily: "DM Sans,sans-serif",
            children: "Target Gene"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "text",
          {
            x: "150",
            y: "145",
            textAnchor: "middle",
            fontSize: "11",
            fill: C.teal,
            fontFamily: "DM Sans,sans-serif",
            children: "Sticky Ends (complementary)"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "text",
          {
            x: "150",
            y: "165",
            textAnchor: "middle",
            fontSize: "10",
            fill: C.tealLight,
            fontFamily: "DM Sans,sans-serif",
            opacity: "0.8",
            children: "AATTC overhang — ready to bind"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "text",
          {
            x: "150",
            y: "185",
            textAnchor: "middle",
            fontSize: "10",
            fill: "oklch(0.62 0.06 262)",
            fontFamily: "DM Sans,sans-serif",
            children: "e.g. EcoRI recognition: GAATTC"
          }
        )
      ]
    }
  );
}
function StepLigate({ active }) {
  const junctions = [
    { uid: "jA", x: 150, y: 57 },
    { uid: "jB", x: 231, y: 178 }
  ];
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "svg",
    {
      viewBox: "0 0 300 280",
      width: "300",
      height: "280",
      "aria-label": "DNA ligase sealing target gene into plasmid",
      role: "img",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("defs", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("filter", { id: "glig-b", children: /* @__PURE__ */ jsxRuntimeExports.jsx("feDropShadow", { dx: "0", dy: "0", stdDeviation: "4", floodColor: C.geneB }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("filter", { id: "glig-a", children: /* @__PURE__ */ jsxRuntimeExports.jsx("feDropShadow", { dx: "0", dy: "0", stdDeviation: "5", floodColor: C.geneA }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("filter", { id: "glig-l", children: /* @__PURE__ */ jsxRuntimeExports.jsx("feDropShadow", { dx: "0", dy: "0", stdDeviation: "4", floodColor: C.ligase }) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "circle",
          {
            cx: "150",
            cy: "145",
            r: "88",
            fill: "none",
            stroke: C.geneB,
            strokeWidth: "9",
            filter: "url(#glig-b)"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "path",
          {
            d: "M 150,57 A 88,88 0 0,1 231,178",
            fill: "none",
            stroke: C.geneA,
            strokeWidth: "12",
            strokeLinecap: "round",
            filter: "url(#glig-a)",
            style: { opacity: active ? 1 : 0.3, transition: "opacity 0.8s ease" }
          }
        ),
        junctions.map((pt) => /* @__PURE__ */ jsxRuntimeExports.jsx(
          "circle",
          {
            cx: pt.x,
            cy: pt.y,
            r: active ? 9 : 6,
            fill: C.ligase,
            filter: "url(#glig-l)",
            style: {
              transition: "r 0.5s ease",
              animation: active ? "pulse-glow 1.3s ease-in-out infinite" : "none"
            }
          },
          pt.uid
        )),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "text",
          {
            x: "150",
            y: "145",
            textAnchor: "middle",
            fontSize: "13",
            fill: C.geneB,
            fontWeight: "600",
            fontFamily: "DM Sans,sans-serif",
            children: "Plasmid"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "text",
          {
            x: "150",
            y: "162",
            textAnchor: "middle",
            fontSize: "11",
            fill: C.geneA,
            fontFamily: "DM Sans,sans-serif",
            children: "Target Gene"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "text",
          {
            x: "108",
            y: "48",
            textAnchor: "middle",
            fontSize: "10",
            fill: C.ligase,
            fontFamily: "DM Sans,sans-serif",
            children: "DNA Ligase"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "text",
          {
            x: "258",
            y: "196",
            textAnchor: "middle",
            fontSize: "10",
            fill: C.ligase,
            fontFamily: "DM Sans,sans-serif",
            children: "DNA Ligase"
          }
        ),
        active && /* @__PURE__ */ jsxRuntimeExports.jsx(
          "text",
          {
            x: "150",
            y: "220",
            textAnchor: "middle",
            fontSize: "11",
            fill: C.teal,
            fontFamily: "DM Sans,sans-serif",
            children: "✓ Recombinant Plasmid Formed"
          }
        )
      ]
    }
  );
}
function StepTransform({ active }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "svg",
    {
      viewBox: "0 0 300 260",
      width: "300",
      height: "260",
      "aria-label": "Recombinant plasmid being inserted into bacterial cell",
      role: "img",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("defs", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("filter", { id: "gtr-bact", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
            "feDropShadow",
            {
              dx: "0",
              dy: "0",
              stdDeviation: "6",
              floodColor: C.bacteria
            }
          ) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("filter", { id: "gtr-b", children: /* @__PURE__ */ jsxRuntimeExports.jsx("feDropShadow", { dx: "0", dy: "0", stdDeviation: "4", floodColor: C.geneB }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("filter", { id: "gtr-a", children: /* @__PURE__ */ jsxRuntimeExports.jsx("feDropShadow", { dx: "0", dy: "0", stdDeviation: "3", floodColor: C.geneA }) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "ellipse",
          {
            cx: "150",
            cy: "160",
            rx: "90",
            ry: "55",
            fill: C.bgDark,
            stroke: C.bacteria,
            strokeWidth: "4",
            filter: "url(#gtr-bact)"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "ellipse",
          {
            cx: "150",
            cy: "160",
            rx: "84",
            ry: "49",
            fill: "none",
            stroke: C.bacteria,
            strokeWidth: "1",
            strokeDasharray: "6 4",
            opacity: "0.35"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "path",
          {
            d: "M240,152 Q270,130 265,100 Q260,75 280,60",
            stroke: C.bacteria,
            strokeWidth: "2",
            fill: "none",
            strokeLinecap: "round",
            opacity: "0.6"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "circle",
          {
            cx: active ? 150 : 80,
            cy: active ? 145 : 100,
            r: "22",
            fill: "none",
            stroke: C.geneB,
            strokeWidth: "5",
            filter: "url(#gtr-b)",
            style: { transition: "cx 1s ease, cy 1s ease" }
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "path",
          {
            d: active ? "M 150,123 A 22,22 0 0,1 171,158" : "M 80,78 A 22,22 0 0,1 101,113",
            fill: "none",
            stroke: C.geneA,
            strokeWidth: "6",
            strokeLinecap: "round",
            filter: "url(#gtr-a)",
            style: { transition: "d 1s ease" }
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "text",
          {
            x: active ? 150 : 80,
            y: active ? 155 : 105,
            textAnchor: "middle",
            fontSize: "10",
            fill: C.geneB,
            fontFamily: "DM Sans,sans-serif",
            children: "Plasmid"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "text",
          {
            x: "150",
            y: "200",
            textAnchor: "middle",
            fontSize: "11",
            fill: C.bacteria,
            fontFamily: "DM Sans,sans-serif",
            fontWeight: "600",
            children: "Bacterial Cell"
          }
        ),
        active ? /* @__PURE__ */ jsxRuntimeExports.jsx(
          "text",
          {
            x: "150",
            y: "232",
            textAnchor: "middle",
            fontSize: "11",
            fill: C.teal,
            fontFamily: "DM Sans,sans-serif",
            children: "✓ Transformation complete"
          }
        ) : /* @__PURE__ */ jsxRuntimeExports.jsx(
          "text",
          {
            x: "75",
            y: "90",
            textAnchor: "middle",
            fontSize: "10",
            fill: C.tealLight,
            fontFamily: "DM Sans,sans-serif",
            children: "Recombinant Plasmid"
          }
        )
      ]
    }
  );
}
const COLONIES = [
  { uid: "col-a", cx: 80, cy: 130, r: 18, hasGene: true },
  { uid: "col-b", cx: 135, cy: 100, r: 15, hasGene: false },
  { uid: "col-c", cx: 180, cy: 130, r: 20, hasGene: true },
  { uid: "col-d", cx: 220, cy: 170, r: 14, hasGene: false },
  { uid: "col-e", cx: 100, cy: 175, r: 17, hasGene: true },
  { uid: "col-f", cx: 155, cy: 165, r: 13, hasGene: false }
];
function StepSelect({ active }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "svg",
    {
      viewBox: "0 0 300 250",
      width: "300",
      height: "250",
      "aria-label": "Petri dish with bacterial colonies; transformed colonies highlighted",
      role: "img",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "circle",
          {
            cx: "150",
            cy: "148",
            r: "115",
            fill: "oklch(0.12 0.04 200)",
            stroke: "oklch(0.35 0.06 200)",
            strokeWidth: "3"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "circle",
          {
            cx: "150",
            cy: "148",
            r: "108",
            fill: "none",
            stroke: "oklch(0.28 0.05 200)",
            strokeWidth: "1",
            strokeDasharray: "8 4",
            opacity: "0.4"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "text",
          {
            x: "150",
            y: "240",
            textAnchor: "middle",
            fontSize: "10",
            fill: "oklch(0.62 0.06 262)",
            fontFamily: "DM Sans,sans-serif",
            children: "Antibiotic Selection Plate"
          }
        ),
        COLONIES.map((col, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs("g", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "circle",
            {
              cx: col.cx,
              cy: col.cy,
              r: col.r,
              fill: col.hasGene ? C.tealDim : "oklch(0.30 0.05 262 / 0.6)",
              stroke: col.hasGene ? C.teal : "oklch(0.38 0.05 262)",
              strokeWidth: "2",
              style: {
                filter: col.hasGene && active ? "drop-shadow(0 0 6px oklch(0.70 0.17 160))" : "none",
                animation: col.hasGene && active ? "pulse-glow 1.5s ease-in-out infinite" : "none",
                animationDelay: `${i * 0.25}s`
              }
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "text",
            {
              x: col.cx,
              y: col.cy + 4,
              textAnchor: "middle",
              fontSize: "8",
              fill: col.hasGene ? C.teal : "oklch(0.50 0.04 262)",
              fontFamily: "DM Sans,sans-serif",
              fontWeight: "600",
              children: col.hasGene ? "✓" : "✗"
            }
          )
        ] }, col.uid)),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "rect",
          {
            x: "18",
            y: "10",
            width: "10",
            height: "10",
            rx: "2",
            fill: C.tealDim,
            stroke: C.teal,
            strokeWidth: "1.5"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "text",
          {
            x: "32",
            y: "20",
            fontSize: "9",
            fill: C.teal,
            fontFamily: "DM Sans,sans-serif",
            children: "Transformed colony"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "rect",
          {
            x: "18",
            y: "26",
            width: "10",
            height: "10",
            rx: "2",
            fill: "oklch(0.30 0.05 262 / 0.6)",
            stroke: "oklch(0.38 0.05 262)",
            strokeWidth: "1.5"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "text",
          {
            x: "32",
            y: "36",
            fontSize: "9",
            fill: "oklch(0.50 0.04 262)",
            fontFamily: "DM Sans,sans-serif",
            children: "Untransformed colony"
          }
        )
      ]
    }
  );
}
const PROTEIN_DOTS = [
  { uid: "pd-a", x: 190, y: 118 },
  { uid: "pd-b", x: 212, y: 130 },
  { uid: "pd-c", x: 212, y: 150 },
  { uid: "pd-d", x: 190, y: 162 }
];
function StepExpress({ active }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "svg",
    {
      viewBox: "0 0 300 260",
      width: "300",
      height: "260",
      "aria-label": "Bacterium expressing recombinant protein product",
      role: "img",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("defs", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("filter", { id: "gex-bact", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
            "feDropShadow",
            {
              dx: "0",
              dy: "0",
              stdDeviation: "7",
              floodColor: C.bacteria
            }
          ) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("filter", { id: "gex-b", children: [
            " ",
            /* @__PURE__ */ jsxRuntimeExports.jsx("feDropShadow", { dx: "0", dy: "0", stdDeviation: "3", floodColor: C.geneB })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("filter", { id: "gex-a", children: [
            " ",
            /* @__PURE__ */ jsxRuntimeExports.jsx("feDropShadow", { dx: "0", dy: "0", stdDeviation: "2.5", floodColor: C.geneA })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("filter", { id: "gex-t", children: [
            " ",
            /* @__PURE__ */ jsxRuntimeExports.jsx("feDropShadow", { dx: "0", dy: "0", stdDeviation: "3", floodColor: C.teal })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "marker",
            {
              id: "arr-expr",
              markerWidth: "6",
              markerHeight: "6",
              refX: "3",
              refY: "3",
              orient: "auto",
              children: /* @__PURE__ */ jsxRuntimeExports.jsx("path", { d: "M0,0 L6,3 L0,6 Z", fill: C.ligase })
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "ellipse",
          {
            cx: "150",
            cy: "140",
            rx: "95",
            ry: "58",
            fill: C.bgDark,
            stroke: C.bacteria,
            strokeWidth: "4",
            filter: "url(#gex-bact)"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "circle",
          {
            cx: "130",
            cy: "128",
            r: "20",
            fill: "none",
            stroke: C.geneB,
            strokeWidth: "4",
            filter: "url(#gex-b)"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "path",
          {
            d: "M 130,108 A 20,20 0 0,1 149,140",
            fill: "none",
            stroke: C.geneA,
            strokeWidth: "5",
            strokeLinecap: "round",
            filter: "url(#gex-a)"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "path",
          {
            d: "M155,128 L175,128",
            stroke: C.ligase,
            strokeWidth: "2",
            markerEnd: "url(#arr-expr)"
          }
        ),
        active ? PROTEIN_DOTS.map((p, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(
          "circle",
          {
            cx: p.x,
            cy: p.y,
            r: 7,
            fill: C.teal,
            filter: "url(#gex-t)",
            style: {
              animation: "pulse-glow 1.2s ease-in-out infinite",
              animationDelay: `${i * 0.2}s`,
              opacity: 0.9
            }
          },
          p.uid
        )) : /* @__PURE__ */ jsxRuntimeExports.jsx(
          "circle",
          {
            cx: "200",
            cy: "135",
            r: "10",
            fill: C.tealDim,
            stroke: C.teal,
            strokeWidth: "2",
            opacity: "0.4"
          }
        ),
        active && /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "text",
            {
              x: "210",
              y: "188",
              textAnchor: "middle",
              fontSize: "10",
              fill: C.teal,
              fontFamily: "DM Sans,sans-serif",
              fontWeight: "600",
              children: "Protein Product"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "text",
            {
              x: "210",
              y: "200",
              textAnchor: "middle",
              fontSize: "9",
              fill: C.tealLight,
              fontFamily: "DM Sans,sans-serif",
              children: "(e.g. Insulin)"
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "text",
          {
            x: "130",
            y: "168",
            textAnchor: "middle",
            fontSize: "9",
            fill: C.geneB,
            fontFamily: "DM Sans,sans-serif",
            children: "Plasmid"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "text",
          {
            x: "150",
            y: "215",
            textAnchor: "middle",
            fontSize: "11",
            fill: C.bacteria,
            fontFamily: "DM Sans,sans-serif",
            fontWeight: "600",
            children: "Gene Expression in Bacterium"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "text",
          {
            x: "165",
            y: "130",
            textAnchor: "middle",
            fontSize: "9",
            fill: C.ligase,
            fontFamily: "DM Sans,sans-serif",
            children: "Transcription &"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "text",
          {
            x: "165",
            y: "142",
            textAnchor: "middle",
            fontSize: "9",
            fill: C.ligase,
            fontFamily: "DM Sans,sans-serif",
            children: "Translation"
          }
        )
      ]
    }
  );
}
function RecombinantDNADiagram() {
  const [stepIndex, setStepIndex] = reactExports.useState(0);
  const [isPlaying, setIsPlaying] = reactExports.useState(true);
  const timerRef = reactExports.useRef(null);
  const total = STEPS.length;
  reactExports.useEffect(() => {
    if (!isPlaying) return;
    timerRef.current = setTimeout(
      () => setStepIndex((s) => (s + 1) % total),
      3200
    );
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [isPlaying, total]);
  function goTo(idx) {
    setStepIndex(idx);
    setIsPlaying(false);
  }
  const svgMap = {
    "step-cut": /* @__PURE__ */ jsxRuntimeExports.jsx(StepCut, { active: stepIndex === 0 }),
    "step-sticky": /* @__PURE__ */ jsxRuntimeExports.jsx(StepStickyEnds, { active: stepIndex === 1 }),
    "step-ligate": /* @__PURE__ */ jsxRuntimeExports.jsx(StepLigate, { active: stepIndex === 2 }),
    "step-transform": /* @__PURE__ */ jsxRuntimeExports.jsx(StepTransform, { active: stepIndex === 3 }),
    "step-select": /* @__PURE__ */ jsxRuntimeExports.jsx(StepSelect, { active: stepIndex === 4 }),
    "step-express": /* @__PURE__ */ jsxRuntimeExports.jsx(StepExpress, { active: stepIndex === 5 })
  };
  const current = STEPS[stepIndex];
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      className: "rounded-2xl p-6",
      style: {
        background: C.bgDark,
        border: borderTeal,
        boxShadow: "0 0 32px oklch(0.70 0.17 160 / 0.2)"
      },
      "aria-label": "Interactive recombinant DNA cloning process diagram",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "div",
          {
            className: "flex flex-wrap gap-2 mb-6",
            role: "tablist",
            "aria-label": "Cloning steps",
            children: STEPS.map((s, idx) => /* @__PURE__ */ jsxRuntimeExports.jsx(
              "button",
              {
                type: "button",
                role: "tab",
                "aria-selected": stepIndex === idx,
                "aria-label": s.label,
                onClick: () => goTo(idx),
                className: "rounded-lg px-3 py-1.5 text-xs font-semibold transition-smooth focus:outline-none focus-visible:ring-2",
                style: {
                  background: stepIndex === idx ? C.tealDim : "transparent",
                  color: stepIndex === idx ? C.teal : "oklch(0.62 0.06 262)",
                  border: stepIndex === idx ? borderTeal : borderTealFaint,
                  boxShadow: stepIndex === idx ? "0 0 10px oklch(0.70 0.17 160 / 0.3)" : "none"
                },
                "data-ocid": `cloning-step-${idx}`,
                children: s.short
              },
              s.id
            ))
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-4 flex items-center justify-between", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "h3",
            {
              className: "font-display text-base font-bold",
              style: { color: C.teal },
              "aria-live": "polite",
              "aria-atomic": "true",
              children: current.label
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "button",
            {
              type: "button",
              onClick: () => setIsPlaying((p) => !p),
              className: "rounded-lg px-3 py-1 text-xs font-medium transition-smooth focus:outline-none focus-visible:ring-2",
              style: { background: C.tealDim, color: C.teal, border: borderTeal },
              "aria-label": isPlaying ? "Pause animation" : "Play animation",
              "data-ocid": "cloning-play-pause",
              children: isPlaying ? "⏸ Pause" : "▶ Play"
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "div",
          {
            className: "flex justify-center items-center min-h-[280px]",
            role: "tabpanel",
            "aria-label": current.label,
            children: svgMap[current.id]
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "div",
            {
              className: "h-1.5 rounded-full overflow-hidden",
              style: { background: "oklch(0.22 0.04 262)" },
              children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                "div",
                {
                  className: "h-full rounded-full transition-all duration-700",
                  style: {
                    width: `${(stepIndex + 1) / total * 100}%`,
                    background: "linear-gradient(90deg, oklch(0.70 0.17 160), oklch(0.72 0.18 195))",
                    boxShadow: "0 0 8px oklch(0.70 0.17 160 / 0.4)"
                  },
                  role: "progressbar",
                  "aria-valuenow": stepIndex + 1,
                  "aria-valuemin": 1,
                  "aria-valuemax": total,
                  "aria-label": `Step ${stepIndex + 1} of ${total}`,
                  tabIndex: 0
                }
              )
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "p",
            {
              className: "text-xs text-right mt-1",
              style: { color: "oklch(0.55 0.06 262)" },
              children: [
                "Step ",
                stepIndex + 1,
                " of ",
                total
              ]
            }
          )
        ] })
      ]
    }
  );
}
const PULSE_STYLE = "@keyframes pulse-glow { 0%, 100% { opacity: 1; } 50% { opacity: 0.55; } }";
const QUIZ = [
  {
    id: "cloning-q1",
    question: "What is recombinant DNA?",
    options: [
      "DNA that has been chemically synthesized from scratch",
      "DNA formed by joining sequences from two different sources",
      "Double-stranded RNA from a virus",
      "A type of chromosome found only in bacteria"
    ],
    correctIndex: 1,
    explanation: "Recombinant DNA is produced by combining DNA segments from two or more sources — for example, inserting a human gene into a bacterial plasmid.",
    topic: "cloning"
  },
  {
    id: "cloning-q2",
    question: "What is the role of restriction enzymes in DNA cloning?",
    options: [
      "They copy DNA strands during replication",
      "They translate mRNA into protein",
      "They cut DNA at specific recognition sequences",
      "They transport DNA across the cell membrane"
    ],
    correctIndex: 2,
    explanation: "Restriction enzymes act as molecular scissors, recognizing and cutting specific short DNA sequences, often producing sticky ends that facilitate joining.",
    topic: "cloning"
  },
  {
    id: "cloning-q3",
    question: "What are 'sticky ends' in DNA cloning?",
    options: [
      "Sequences resistant to enzyme digestion",
      "Short single-stranded overhangs left after restriction enzyme cutting",
      "Telomeres at the ends of chromosomes",
      "Double-stranded loops in plasmid DNA"
    ],
    correctIndex: 1,
    explanation: "Sticky ends are short single-stranded nucleotide overhangs produced by staggered restriction enzyme cuts. They are complementary and facilitate joining.",
    topic: "cloning"
  },
  {
    id: "cloning-q4",
    question: "What is a plasmid vector?",
    options: [
      "A linear piece of DNA found in human cells",
      "A small circular DNA molecule used to carry foreign genes into host cells",
      "A type of RNA used in gene silencing",
      "A viral capsid protein"
    ],
    correctIndex: 1,
    explanation: "A plasmid is a small, circular, self-replicating DNA molecule. Engineered plasmid vectors carry the foreign gene of interest into host cells.",
    topic: "cloning"
  },
  {
    id: "cloning-q5",
    question: "What enzyme seals the target gene into the plasmid?",
    options: ["RNA polymerase", "DNA helicase", "DNA ligase", "Topoisomerase"],
    correctIndex: 2,
    explanation: "DNA ligase catalyzes phosphodiester bond formation between compatible sticky ends, permanently joining the target gene to the plasmid backbone.",
    topic: "cloning"
  },
  {
    id: "cloning-q6",
    question: "What is 'transformation' in DNA cloning?",
    options: [
      "Converting a prokaryote into a eukaryote",
      "The process of inserting a plasmid into a host bacterial cell",
      "Transcribing a gene into mRNA",
      "Cutting DNA with restriction enzymes"
    ],
    correctIndex: 1,
    explanation: "Transformation is the uptake of foreign DNA by a bacterial cell, usually via heat shock or electroporation, after which the bacteria replicate the gene.",
    topic: "cloning"
  },
  {
    id: "cloning-q7",
    question: "What is the purpose of a selectable marker in a cloning vector?",
    options: [
      "It codes for the protein of interest",
      "It allows transformed bacteria to be identified and selected",
      "It triggers plasmid replication",
      "It promotes transcription of all genes in the cell"
    ],
    correctIndex: 1,
    explanation: "Selectable markers — usually antibiotic resistance genes — allow scientists to identify transformed bacteria; only colonies with the plasmid survive on antibiotic plates.",
    topic: "cloning"
  },
  {
    id: "cloning-q8",
    question: "Which feature is NOT typically found in a cloning vector?",
    options: [
      "Origin of replication",
      "Selectable marker",
      "Multiple cloning site (MCS)",
      "Centromere for chromosome segregation"
    ],
    correctIndex: 3,
    explanation: "Bacterial cloning vectors require an origin of replication, a selectable marker, and a multiple cloning site. Centromeres are chromosomal features not needed in plasmids.",
    topic: "cloning"
  },
  {
    id: "cloning-q9",
    question: "Which commercial product is made using recombinant DNA technology?",
    options: [
      "Table salt (NaCl)",
      "Plastic polymers",
      "Human insulin for diabetics",
      "Stainless steel alloys"
    ],
    correctIndex: 2,
    explanation: "Human insulin was the first recombinant protein drug approved (1982). The human insulin gene was cloned into E. coli for industrial-scale production.",
    topic: "cloning"
  },
  {
    id: "cloning-q10",
    question: "How does reproductive organism cloning differ from gene cloning?",
    options: [
      "Reproductive cloning uses restriction enzymes; gene cloning does not",
      "Gene cloning copies a specific gene; reproductive cloning creates a genetically identical organism",
      "Reproductive cloning works only in bacteria",
      "They are the same process with different names"
    ],
    correctIndex: 1,
    explanation: "Gene cloning amplifies a specific DNA sequence. Reproductive cloning (SCNT) creates a new organism genetically identical to the donor — exemplified by Dolly the sheep (1996).",
    topic: "cloning"
  }
];
const EXPLANATIONS = [
  {
    uid: "exp-plasmid",
    color: C.teal,
    heading: "Plasmid Vectors and Their Features",
    body: "A cloning vector must have three essential features. First, an origin of replication (ori) allows the plasmid to replicate independently of the host chromosome, producing hundreds of copies per cell. Second, a selectable marker — almost always an antibiotic resistance gene such as ampR or kanR — lets scientists grow bacteria on antibiotic-containing medium so only transformed colonies survive. Third, a multiple cloning site (MCS) is a short region packed with recognition sequences for many different restriction enzymes, giving flexibility in which enzyme to use. Some vectors also include a lacZ reporter gene or fluorescent protein to allow blue-white screening, identifying inserts visually without sequencing."
  },
  {
    uid: "exp-steps",
    color: C.geneA,
    heading: "Steps of DNA Cloning in Detail",
    body: "After ligation, the recombinant plasmid is introduced into competent bacteria by transformation — cells made temporarily permeable using calcium chloride treatment or electroporation. Bacteria take up the plasmid and begin replicating it. When spread onto antibiotic plates, untransformed cells die; transformed cells form visible colonies. Colonies containing the correct insert are identified by colony PCR, blue-white screening, or direct sequencing. Once a positive clone is identified, bacteria are grown in liquid culture, the plasmid is extracted, and the inserted gene is expressed to produce the desired protein, then purified by chromatography."
  },
  {
    uid: "exp-vs-organism",
    color: C.geneB,
    heading: "Gene Cloning vs. Organism Cloning",
    body: "'Cloning' means different things in different contexts. Gene cloning (molecular cloning) copies a DNA sequence and produces many identical molecules or protein products. Organism cloning (reproductive cloning) produces a genetically identical animal by somatic cell nuclear transfer (SCNT): the nucleus from an adult body cell is inserted into an enucleated egg, which is then implanted in a surrogate mother. Dolly the sheep (1996) was the first mammal cloned this way. Therapeutic cloning uses the same technique but only to produce embryonic stem cells for research, not a live animal. These processes are biologically and ethically very distinct."
  },
  {
    uid: "exp-applications",
    color: C.ligase,
    heading: "Applications: Insulin, Vaccines & Gene Therapy",
    body: "Recombinant DNA technology has transformed medicine. Human insulin was the first recombinant protein drug approved (1982), replacing animal-derived insulin and enabling consistent, scalable production. Recombinant vaccines, such as the hepatitis B vaccine, use cloned viral surface antigens instead of whole viruses, improving safety and manufacturing. Monoclonal antibodies used in cancer immunotherapy are produced in recombinant CHO cells. In gene therapy, viral vectors carrying corrective genes are engineered using recombinant DNA methods — the first approved gene therapy (Luxturna) restored vision in inherited retinal dystrophy. Agriculture benefits too: Bt crops express a cloned bacterial toxin gene, reducing pesticide use."
  }
];
const KEY_CONCEPTS = [
  {
    uid: "kc-re",
    term: "Restriction Enzyme",
    def: "Cuts DNA at specific palindromic sequences, often leaving sticky ends."
  },
  {
    uid: "kc-pv",
    term: "Plasmid Vector",
    def: "Circular bacterial DNA carrying ori, selectable marker, and MCS for foreign gene insertion."
  },
  {
    uid: "kc-se",
    term: "Sticky Ends",
    def: "Short single-stranded overhangs that base-pair spontaneously, facilitating ligation."
  },
  {
    uid: "kc-dl",
    term: "DNA Ligase",
    def: "Seals phosphodiester bonds between compatible sticky ends, completing the recombinant molecule."
  },
  {
    uid: "kc-tr",
    term: "Transformation",
    def: "Uptake of foreign plasmid DNA by competent bacteria, via heat shock or electroporation."
  },
  {
    uid: "kc-sm",
    term: "Selectable Marker",
    def: "Antibiotic-resistance gene allowing only transformed bacteria to survive selection."
  }
];
function CloningSection() {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "section",
    {
      className: "px-6 py-16",
      "aria-labelledby": "cloning-heading",
      "data-ocid": "cloning-section",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("style", { children: PULSE_STYLE }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mx-auto max-w-5xl", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            SectionHeader,
            {
              topicId: "cloning",
              title: "Cloning & Recombinant DNA",
              subtitle: "Discover how scientists copy genes, build designer plasmids, and make bacteria produce life-saving medicines."
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 lg:grid-cols-2 gap-10 mb-14", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(AnimatedEntrance, { direction: "left", children: /* @__PURE__ */ jsxRuntimeExports.jsx(RecombinantDNADiagram, {}) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(AnimatedEntrance, { direction: "right", delay: 0.15, children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-5", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-base leading-relaxed text-foreground", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-semibold", style: { color: C.teal }, children: "Recombinant DNA" }),
                " ",
                "is any DNA molecule assembled by joining genetic material from two or more different sources. This technology, pioneered in the early 1970s by Paul Berg, Stanley Cohen, and Herbert Boyer, underpins virtually all of modern biotechnology. By splicing a gene of interest from one organism into a carrier DNA molecule, scientists can instruct bacteria, yeast, or mammalian cells to manufacture virtually any protein."
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-base leading-relaxed text-foreground", children: [
                "The first step is to cut both the donor DNA and a",
                " ",
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-semibold", style: { color: C.geneB }, children: "plasmid vector" }),
                " ",
                "with the same",
                " ",
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-semibold", style: { color: C.teal }, children: "restriction enzyme" }),
                " ",
                "— a molecular scissors that recognizes a short palindromic sequence (e.g., GAATTC for EcoRI) and cuts both strands at that site. Staggered cuts leave short unpaired nucleotide overhangs called ",
                /* @__PURE__ */ jsxRuntimeExports.jsx("em", { children: "sticky ends" }),
                ", which are complementary to the corresponding ends of the target gene fragment, making re-annealing spontaneous."
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-base leading-relaxed text-foreground", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-semibold", style: { color: C.ligase }, children: "DNA ligase" }),
                " ",
                "then covalently seals the nick between the two fragments. In the cell, ligase normally repairs single-strand breaks; in the laboratory it fuses the target gene into the plasmid backbone, forming a complete circular ",
                /* @__PURE__ */ jsxRuntimeExports.jsx("em", { children: "recombinant plasmid" }),
                ". This newly engineered plasmid is the vehicle that carries the foreign gene into the host organism."
              ] })
            ] }) })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(StaggerContainer, { className: "space-y-6 mb-14", children: EXPLANATIONS.map((item) => /* @__PURE__ */ jsxRuntimeExports.jsx(StaggerItem, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "div",
            {
              className: "rounded-xl p-6",
              style: {
                background: C.bgDark,
                border: `1px solid ${item.color}30`
              },
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "h3",
                  {
                    className: "font-display text-lg font-bold mb-3",
                    style: { color: item.color },
                    children: item.heading
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-base leading-relaxed text-foreground", children: item.body })
              ]
            }
          ) }, item.uid)) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(AnimatedEntrance, { direction: "up", delay: 0.1, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "dl",
            {
              className: "rounded-2xl p-6 mb-14",
              style: {
                background: C.bgDark,
                border: borderTeal,
                boxShadow: "0 0 24px oklch(0.70 0.17 160 / 0.2)"
              },
              "aria-label": "Key concepts in recombinant DNA technology",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "h3",
                  {
                    className: "font-display text-lg font-bold mb-5",
                    style: { color: C.teal },
                    children: "🔑 Key Concepts at a Glance"
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-1 sm:grid-cols-2 gap-4", children: KEY_CONCEPTS.map((kc) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  "div",
                  {
                    className: "rounded-lg p-4",
                    style: { background: C.bg, border: borderTeal },
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        "dt",
                        {
                          className: "text-sm font-bold mb-1",
                          style: { color: C.teal },
                          children: kc.term
                        }
                      ),
                      /* @__PURE__ */ jsxRuntimeExports.jsx("dd", { className: "text-sm leading-relaxed text-foreground opacity-85", children: kc.def })
                    ]
                  },
                  kc.uid
                )) })
              ]
            }
          ) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(AnimatedEntrance, { direction: "up", delay: 0.15, children: /* @__PURE__ */ jsxRuntimeExports.jsx(
            "div",
            {
              id: "cloning-quiz",
              className: "rounded-2xl p-1",
              style: {
                background: "linear-gradient(135deg, oklch(0.70 0.17 160 / 0.18), oklch(0.72 0.18 195 / 0.12))",
                border: borderTeal
              },
              children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-xl p-6", style: { background: C.bgDark }, children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "h3",
                  {
                    className: "font-display text-xl font-bold mb-1",
                    style: { color: C.teal },
                    children: "🧫 Test Your Knowledge"
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "p",
                  {
                    className: "text-sm mb-6",
                    style: { color: "oklch(0.62 0.06 262)" },
                    children: "10 questions on recombinant DNA, restriction enzymes, plasmids, and applications."
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(QuizEngine, { topicId: "cloning", questions: QUIZ })
              ] })
            }
          ) })
        ] })
      ]
    }
  );
}
export {
  CloningSection as default
};
