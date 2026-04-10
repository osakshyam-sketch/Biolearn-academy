import { j as jsxRuntimeExports, r as reactExports } from "./index-V1Xys_hZ.js";
import { S as SectionHeader, A as AnimatedEntrance, a as StaggerContainer, b as StaggerItem, Q as QuizEngine } from "./SectionHeader-BzOZ529A.js";
const TEAL = "oklch(0.72 0.18 195)";
const TEAL_DIM = "oklch(0.72 0.18 195 / 0.25)";
const TEAL_GLOW = "0 0 18px oklch(0.72 0.18 195 / 0.55)";
const PHASES = [
  {
    id: "denaturation",
    label: "Denaturation",
    temp: "95 °C",
    description: "Heat breaks hydrogen bonds. Double strand separates.",
    color: "oklch(0.72 0.19 22)",
    dimColor: "oklch(0.72 0.19 22 / 0.18)"
  },
  {
    id: "annealing",
    label: "Annealing",
    temp: "55–65 °C",
    description: "Cool down allows primers to bind complementary template.",
    color: "oklch(0.72 0.18 195)",
    dimColor: "oklch(0.72 0.18 195 / 0.18)"
  },
  {
    id: "extension",
    label: "Extension",
    temp: "72 °C",
    description: "Taq polymerase synthesises new strand from each primer.",
    color: "oklch(0.72 0.18 142)",
    dimColor: "oklch(0.72 0.18 142 / 0.18)"
  }
];
function BasePairRow({
  y,
  separated,
  primerLeft,
  primerRight,
  extendLeft,
  extendRight,
  phase
}) {
  const LEFT_X = 70;
  const RIGHT_X = 230;
  const CENTER = 150;
  const offset = separated ? 40 : 0;
  const lx = CENTER - offset;
  const rx = CENTER + offset;
  const lStroke = extendLeft ? "oklch(0.72 0.18 142)" : primerLeft ? TEAL : "oklch(0.68 0.19 262)";
  const rStroke = extendRight ? "oklch(0.72 0.18 142)" : primerRight ? TEAL : "oklch(0.68 0.22 36)";
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("g", { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "line",
      {
        x1: LEFT_X,
        y1: y,
        x2: lx,
        y2: y,
        stroke: lStroke,
        strokeWidth: primerLeft || extendLeft ? 3 : 2,
        style: { transition: "all 0.5s ease" }
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "line",
      {
        x1: rx,
        y1: y,
        x2: RIGHT_X,
        y2: y,
        stroke: rStroke,
        strokeWidth: primerRight || extendRight ? 3 : 2,
        style: { transition: "all 0.5s ease" }
      }
    ),
    phase === "extension" && /* @__PURE__ */ jsxRuntimeExports.jsx(
      "line",
      {
        x1: lx,
        y1: y,
        x2: rx,
        y2: y,
        stroke: "oklch(0.50 0 0)",
        strokeWidth: 1,
        strokeDasharray: "3 3",
        style: { transition: "all 0.5s ease" }
      }
    )
  ] });
}
function PCRDiagram() {
  const [phase, setPhase] = reactExports.useState("denaturation");
  const [cycle, setCycle] = reactExports.useState(1);
  const [running, setRunning] = reactExports.useState(true);
  const intervalRef = reactExports.useRef(null);
  const phaseOrder = ["denaturation", "annealing", "extension"];
  reactExports.useEffect(() => {
    if (!running) return;
    intervalRef.current = setInterval(() => {
      setPhase((prev) => {
        const idx = phaseOrder.indexOf(prev);
        const next = phaseOrder[(idx + 1) % 3];
        if (next === "denaturation") setCycle((c) => Math.min(c + 1, 30));
        return next;
      });
    }, 2200);
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [running]);
  function jumpTo(p) {
    setPhase(p);
    setRunning(false);
    if (intervalRef.current) clearInterval(intervalRef.current);
  }
  function togglePlay() {
    setRunning((r) => !r);
  }
  const info = PHASES.find((p) => p.id === phase);
  const separated = phase === "denaturation";
  const annealing = phase === "annealing";
  const extension = phase === "extension";
  const rows = [30, 50, 70, 90, 110, 130, 150, 170];
  const primerRows = [70, 90, 110];
  const copies = cycle <= 10 ? 2 ** cycle : "1024+";
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      className: "rounded-2xl p-5 flex flex-col gap-4",
      style: {
        background: "oklch(0.16 0 0)",
        border: `1px solid ${TEAL_DIM}`,
        boxShadow: TEAL_GLOW
      },
      "aria-label": "Animated PCR thermal cycle diagram",
      role: "img",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "fieldset",
          {
            className: "flex gap-2 flex-wrap border-none p-0 m-0",
            "aria-label": "PCR phase selector",
            children: [
              PHASES.map((p) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
                "button",
                {
                  type: "button",
                  onClick: () => jumpTo(p.id),
                  "aria-pressed": phase === p.id,
                  className: "rounded-full px-3 py-1 text-xs font-semibold transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2",
                  style: {
                    background: phase === p.id ? p.color : p.dimColor,
                    color: phase === p.id ? "oklch(0.10 0 0)" : p.color,
                    border: `1px solid ${p.color}`,
                    // @ts-expect-error CSS custom property
                    "--tw-ring-color": p.color,
                    "--tw-ring-offset-color": "oklch(0.16 0 0)"
                  },
                  children: [
                    p.label,
                    " · ",
                    p.temp
                  ]
                },
                p.id
              )),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "button",
                {
                  type: "button",
                  onClick: togglePlay,
                  "aria-label": running ? "Pause animation" : "Play animation",
                  className: "ml-auto rounded-full px-3 py-1 text-xs font-semibold border transition-all focus-visible:outline-none focus-visible:ring-2",
                  style: {
                    borderColor: TEAL,
                    color: TEAL,
                    background: running ? TEAL_DIM : "transparent",
                    // @ts-expect-error CSS custom property
                    "--tw-ring-color": TEAL
                  },
                  children: running ? "⏸ Pause" : "▶ Play"
                }
              )
            ]
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-muted-foreground", children: "Cycle" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "span",
            {
              className: "font-display text-2xl font-bold",
              style: { color: TEAL },
              "aria-live": "polite",
              "aria-label": `Cycle ${cycle}`,
              children: cycle
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-muted-foreground", children: "→" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-xs", style: { color: "oklch(0.72 0.18 142)" }, children: [
            "≈ ",
            copies,
            " copies"
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "span",
            {
              className: "ml-auto text-xs font-semibold rounded px-2 py-0.5",
              style: {
                background: `${info.color}22`,
                color: info.color,
                border: `1px solid ${info.color}55`
              },
              "aria-live": "polite",
              children: info.temp
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col md:flex-row gap-5 items-start", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "svg",
            {
              viewBox: "0 0 300 210",
              className: "w-full max-w-xs mx-auto",
              "aria-hidden": "true",
              style: { filter: `drop-shadow(0 0 8px ${info.color}55)` },
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "line",
                  {
                    x1: "70",
                    y1: "20",
                    x2: "70",
                    y2: "190",
                    stroke: "oklch(0.30 0 0)",
                    strokeWidth: "1",
                    strokeDasharray: "2 4"
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "line",
                  {
                    x1: "230",
                    y1: "20",
                    x2: "230",
                    y2: "190",
                    stroke: "oklch(0.30 0 0)",
                    strokeWidth: "1",
                    strokeDasharray: "2 4"
                  }
                ),
                rows.map((y) => /* @__PURE__ */ jsxRuntimeExports.jsx(
                  BasePairRow,
                  {
                    y,
                    separated,
                    primerLeft: annealing && primerRows.includes(y),
                    primerRight: annealing && primerRows.includes(y),
                    extendLeft: extension && primerRows.includes(y),
                    extendRight: extension && primerRows.includes(y),
                    phase
                  },
                  `row-${y}`
                )),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "line",
                  {
                    x1: "70",
                    y1: "20",
                    x2: "70",
                    y2: "190",
                    stroke: "oklch(0.68 0.19 262)",
                    strokeWidth: "3"
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "line",
                  {
                    x1: "230",
                    y1: "20",
                    x2: "230",
                    y2: "190",
                    stroke: "oklch(0.68 0.22 36)",
                    strokeWidth: "3"
                  }
                ),
                annealing && /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "rect",
                    {
                      x: "70",
                      y: "65",
                      width: "35",
                      height: "55",
                      rx: "4",
                      fill: `${TEAL}33`,
                      stroke: TEAL,
                      strokeWidth: "1.5"
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "text",
                    {
                      x: "87",
                      y: "95",
                      textAnchor: "middle",
                      fontSize: "8",
                      fill: TEAL,
                      fontWeight: "bold",
                      children: "Primer"
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "rect",
                    {
                      x: "195",
                      y: "65",
                      width: "35",
                      height: "55",
                      rx: "4",
                      fill: `${TEAL}33`,
                      stroke: TEAL,
                      strokeWidth: "1.5"
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "text",
                    {
                      x: "213",
                      y: "95",
                      textAnchor: "middle",
                      fontSize: "8",
                      fill: TEAL,
                      fontWeight: "bold",
                      children: "Primer"
                    }
                  )
                ] }),
                extension && /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("defs", { children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "marker",
                      {
                        id: "arrowGreen",
                        markerWidth: "6",
                        markerHeight: "6",
                        refX: "3",
                        refY: "3",
                        orient: "auto",
                        children: /* @__PURE__ */ jsxRuntimeExports.jsx("path", { d: "M0,0 L0,6 L6,3 z", fill: "oklch(0.72 0.18 142)" })
                      }
                    ),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "marker",
                      {
                        id: "arrowTeal",
                        markerWidth: "6",
                        markerHeight: "6",
                        refX: "3",
                        refY: "3",
                        orient: "auto-start-reverse",
                        children: /* @__PURE__ */ jsxRuntimeExports.jsx("path", { d: "M0,0 L0,6 L6,3 z", fill: "oklch(0.72 0.18 142)" })
                      }
                    )
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "line",
                    {
                      x1: "105",
                      y1: "115",
                      x2: "105",
                      y2: "180",
                      stroke: "oklch(0.72 0.18 142)",
                      strokeWidth: "2",
                      markerEnd: "url(#arrowGreen)"
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "text",
                    {
                      x: "75",
                      y: "175",
                      fontSize: "7",
                      fill: "oklch(0.72 0.18 142)",
                      fontWeight: "bold",
                      children: "New strand"
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "line",
                    {
                      x1: "195",
                      y1: "115",
                      x2: "195",
                      y2: "180",
                      stroke: "oklch(0.72 0.18 142)",
                      strokeWidth: "2",
                      markerEnd: "url(#arrowTeal)"
                    }
                  )
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  "text",
                  {
                    x: "150",
                    y: "205",
                    textAnchor: "middle",
                    fontSize: "9",
                    fill: info.color,
                    fontWeight: "bold",
                    children: [
                      info.label,
                      " · ",
                      info.temp
                    ]
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "text",
                  {
                    x: "55",
                    y: "16",
                    fontSize: "7",
                    fill: "oklch(0.68 0.19 262)",
                    textAnchor: "middle",
                    children: "5'"
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "text",
                  {
                    x: "55",
                    y: "198",
                    fontSize: "7",
                    fill: "oklch(0.68 0.19 262)",
                    textAnchor: "middle",
                    children: "3'"
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "text",
                  {
                    x: "245",
                    y: "16",
                    fontSize: "7",
                    fill: "oklch(0.68 0.22 36)",
                    textAnchor: "middle",
                    children: "3'"
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "text",
                  {
                    x: "245",
                    y: "198",
                    fontSize: "7",
                    fill: "oklch(0.68 0.22 36)",
                    textAnchor: "middle",
                    children: "5'"
                  }
                )
              ]
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col gap-3 flex-1 min-w-0", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "div",
              {
                className: "rounded-xl p-4",
                style: {
                  background: info.dimColor,
                  border: `1px solid ${info.color}55`
                },
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 mb-2", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "span",
                      {
                        className: "w-2.5 h-2.5 rounded-full shrink-0",
                        style: { background: info.color },
                        "aria-hidden": "true"
                      }
                    ),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-bold text-sm", style: { color: info.color }, children: info.label }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "span",
                      {
                        className: "ml-auto text-xs rounded px-1.5 py-0.5 font-mono",
                        style: { background: `${info.color}22`, color: info.color },
                        children: info.temp
                      }
                    )
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground leading-relaxed", children: info.description })
                ]
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-col gap-1.5", children: PHASES.map((p, idx) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "div",
              {
                className: "flex items-center gap-2 text-xs rounded-lg px-3 py-2 transition-all",
                style: {
                  background: phase === p.id ? p.dimColor : "oklch(0.19 0 0)",
                  border: `1px solid ${phase === p.id ? p.color : "oklch(0.25 0 0)"}`
                },
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "span",
                    {
                      className: "w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold shrink-0",
                      style: {
                        background: p.dimColor,
                        color: p.color,
                        border: `1px solid ${p.color}`
                      },
                      "aria-hidden": "true",
                      children: idx + 1
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs(
                    "span",
                    {
                      style: {
                        color: phase === p.id ? p.color : "oklch(0.65 0 0)"
                      },
                      children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { children: p.label }),
                        " · ",
                        p.temp
                      ]
                    }
                  )
                ]
              },
              p.id
            )) }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "div",
              {
                className: "rounded-xl p-3",
                style: {
                  background: "oklch(0.19 0 0)",
                  border: `1px solid ${TEAL_DIM}`
                },
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[10px] text-muted-foreground mb-2 font-semibold uppercase tracking-wider", children: "Exponential amplification" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "div",
                    {
                      className: "flex items-end gap-0.5 h-8",
                      "aria-label": "DNA copy count grows exponentially",
                      children: Array.from({ length: Math.min(cycle, 10) }, (_, i) => {
                        const barHue = 172 + i * 2;
                        const barKey = `bar-cycle${cycle}-pos${i}`;
                        return /* @__PURE__ */ jsxRuntimeExports.jsx(
                          "div",
                          {
                            className: "flex-1 rounded-t-sm transition-all",
                            style: {
                              height: `${Math.min(100, (i + 1) * 10)}%`,
                              background: `oklch(0.72 0.18 ${barHue})`,
                              opacity: 0.8
                            }
                          },
                          barKey
                        );
                      })
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-[10px] text-muted-foreground mt-1", children: [
                    "After ",
                    cycle,
                    " cycle",
                    cycle !== 1 ? "s" : "",
                    ": ~",
                    copies,
                    " DNA copies"
                  ] })
                ]
              }
            )
          ] })
        ] })
      ]
    }
  );
}
function ComponentCard({ name, symbol, role, color }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      className: "rounded-xl p-4 flex flex-col gap-2 transition-all hover:scale-[1.02]",
      style: {
        background: "oklch(0.19 0 0)",
        border: `1px solid ${color}33`,
        boxShadow: `0 0 12px ${color}15`
      },
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "div",
          {
            className: "w-10 h-10 rounded-full flex items-center justify-center text-lg font-bold shrink-0",
            style: {
              background: `${color}22`,
              border: `2px solid ${color}`,
              color
            },
            children: symbol
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-semibold text-sm text-foreground", children: name }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground leading-relaxed", children: role })
      ]
    }
  );
}
const PCR_COMPONENTS = [
  {
    name: "Template DNA",
    symbol: "🧬",
    role: "The original DNA sample to be copied. Can come from any organism.",
    color: "oklch(0.68 0.19 262)"
  },
  {
    name: "DNA Primers",
    symbol: "→",
    role: "Short single-stranded sequences (~20 nt) that define where copying begins.",
    color: TEAL
  },
  {
    name: "Taq Polymerase",
    symbol: "⚙",
    role: "Heat-stable enzyme from Thermus aquaticus — builds new DNA at 72 °C.",
    color: "oklch(0.72 0.18 142)"
  },
  {
    name: "dNTPs",
    symbol: "A·T·G·C",
    role: "Free nucleotide building blocks (dATP, dTTP, dGTP, dCTP) used to extend the new strand.",
    color: "oklch(0.72 0.18 52)"
  },
  {
    name: "Buffer & MgCl₂",
    symbol: "Mg²⁺",
    role: "Provides optimal ionic conditions. Mg²⁺ is a cofactor required by Taq polymerase.",
    color: "oklch(0.68 0.22 36)"
  },
  {
    name: "Thermal Cycler",
    symbol: "♨",
    role: "Programmable machine that rapidly cycles between precise temperatures.",
    color: "oklch(0.70 0.20 290)"
  }
];
const EXPLANATIONS = [
  {
    id: "intro",
    heading: "What Is PCR and Why Does It Matter?",
    body: `Polymerase Chain Reaction (PCR) is one of the most transformative technologies in modern biology. Invented by Kary Mullis in 1983 — an achievement that earned him the Nobel Prize in Chemistry in 1993 — PCR allows scientists to amplify a specific segment of DNA from a tiny starting sample into millions or even billions of identical copies in just a few hours. Before PCR, working with small DNA samples was practically impossible; even a single hair or a few cells now contains enough genetic material to analyse. This single technique transformed forensic science, medical diagnostics, evolutionary biology, and biotechnology almost overnight.

The genius of PCR lies in its simplicity and elegance: it mimics the way cells copy their DNA, but it does so inside a test tube using only a handful of molecules. A programmable machine called a thermal cycler automates the entire process by cycling through three precise temperatures, each triggering a specific molecular event. The result is an exponential amplification — after just 30 cycles, a single DNA molecule can yield over one billion copies. Understanding PCR gives you insight into molecular cloning, COVID-19 testing, paternity tests, ancient DNA research, and gene editing workflows.`
  },
  {
    id: "denaturation",
    heading: "Step 1 — Denaturation at 95 °C",
    body: `The first step of each PCR cycle is denaturation, which occurs at approximately 94–96 °C (typically 95 °C). At this temperature, the thermal energy is sufficient to break the hydrogen bonds holding the two complementary strands of the double-stranded DNA template together. The two strands unwind and separate completely, creating two single-stranded DNA templates. This step typically lasts 20–30 seconds per cycle. The initial denaturation step before the first cycle is usually longer — up to 2–5 minutes — to ensure complete separation of longer or GC-rich regions that require more energy to melt apart.

The beauty of high-temperature denaturation is that it is entirely reversible. When the temperature drops, complementary sequences will naturally re-anneal. This property is exploited in the very next step. It is important that the temperature reaches the full 95 °C; incomplete denaturation results in double-stranded DNA that cannot serve as an effective template, reducing PCR efficiency. In practice, the melting temperature can be adjusted for AT-rich versus GC-rich sequences, since G-C pairs (three hydrogen bonds) require more energy to separate than A-T pairs (two hydrogen bonds).`
  },
  {
    id: "annealing",
    heading: "Step 2 — Annealing at 55–65 °C",
    body: `After denaturation, the reaction is rapidly cooled to the annealing temperature, typically between 55 °C and 65 °C. At this lower temperature, short single-stranded DNA molecules called primers can bind (anneal) to their complementary sequences on the now-separated template strands. Primers are usually 18–25 nucleotides long and are designed to flank the target region on opposite strands — a forward primer binds the bottom strand, and a reverse primer binds the top strand. The specific annealing temperature is calculated from the primer melting temperature (Tm), generally set 5 °C below the Tm to maximise specificity while still allowing efficient binding.

Primer design is critical to PCR success. If the annealing temperature is too high, primers fail to bind (no product). If it is too low, they bind non-specifically (multiple spurious products appear on a gel). The primers determine exactly which region of the genome is amplified — they are the "molecular GPS" of the reaction. In multiplex PCR, several primer pairs are included simultaneously to amplify multiple targets in a single reaction. The 20–30 second annealing step is brief because primer-template complementarity is so favourable that binding happens within seconds once the temperature is right.`
  },
  {
    id: "extension",
    heading: "Step 3 — Extension at 72 °C",
    body: `The extension step occurs at 72 °C — the optimum temperature for the key enzyme in PCR, Taq DNA polymerase. Taq polymerase was isolated from Thermus aquaticus, a bacterium that thrives in hot springs at up to 80 °C. Its extraordinary thermostability is what makes PCR practical: the enzyme survives the 95 °C denaturation step cycle after cycle without losing activity. Starting from the 3' end of each annealed primer, Taq polymerase reads the template in the 3'→5' direction and synthesises a new complementary strand in the 5'→3' direction, incorporating free deoxyribonucleoside triphosphates (dNTPs) one by one.

Extension rates for Taq polymerase are approximately 1,000 base pairs per minute, so a 1 kb target requires roughly 1 minute of extension time. The extension step produces a new double-stranded DNA molecule — the primer plus the newly synthesised complementary strand. Critically, in later cycles, these shorter "primer-extended" products serve as templates themselves, and products whose length is precisely defined by the distance between the two primers accumulate exponentially. It is this exponential kinetics — each product doubling each cycle — that makes PCR so powerful: 30 cycles can theoretically produce 2³⁰ (approximately 1 billion) copies from a single template.`
  },
  {
    id: "applications",
    heading: "Applications of PCR: From the Clinic to the Crime Scene",
    body: `PCR has become so central to biology that it is difficult to name a field where it is not used. In medical diagnostics, PCR is the gold standard for detecting infectious diseases. During the COVID-19 pandemic, reverse transcription PCR (RT-PCR) was used globally to detect SARS-CoV-2 RNA — the viral genome is first converted to DNA by reverse transcriptase, then amplified. PCR can detect a single viral or bacterial genome in a millilitre of blood, making it far more sensitive than antibody-based tests. PCR is also used to diagnose HIV, TB, hepatitis, chlamydia, and hundreds of other pathogens with high specificity.

In forensic science, PCR amplifies DNA from minute samples — a few skin cells on a door handle, a hair root, a blood droplet — to generate enough material for DNA profiling. STR (short tandem repeat) analysis, based on PCR amplification of repeated sequences, forms the basis of DNA fingerprinting used in criminal investigations and paternity testing. In research, PCR is used to clone genes, verify gene editing (CRISPR knock-outs), study gene expression, create DNA libraries for sequencing, and perform site-directed mutagenesis. In agriculture, PCR tests detect plant pathogens and verify GMO content. PCR is, without question, the most widely used molecular biology technique ever developed.`
  },
  {
    id: "qpcr",
    heading: "Real-Time PCR (qPCR) — Quantifying Gene Expression",
    body: `Real-time PCR, also called quantitative PCR (qPCR), adds a fluorescent reporter to the standard PCR reaction, allowing the accumulation of PCR product to be monitored cycle by cycle in real time. As more DNA is produced, fluorescence intensity increases. The cycle at which the fluorescence first rises above a threshold — called the Ct (cycle threshold) value — is inversely proportional to the amount of target DNA present in the original sample. A low Ct means abundant starting template; a high Ct means very little. This enables accurate quantification over a range of several orders of magnitude.

The most common qPCR chemistry uses TaqMan probes — short fluorescent-labelled oligonucleotides that hybridise within the amplified region. The 5'→3' exonuclease activity of Taq polymerase cleaves the probe during extension, releasing the fluorophore from a quencher and generating signal. Alternatively, SYBR Green intercalates into double-stranded DNA and fluoresces, providing a simpler, cheaper but less specific readout. Reverse transcription qPCR (RT-qPCR) first converts mRNA into complementary DNA (cDNA) before amplification, allowing researchers to quantify gene expression levels across different tissues, treatments, or time points. qPCR is the standard method for validating RNA sequencing results and measuring how gene activity changes in response to disease or drug treatment.`
  },
  {
    id: "variants",
    heading: "PCR Variants and Modern Advances",
    body: `Decades of innovation have produced a rich family of PCR variants tailored to specific challenges. Digital PCR (dPCR) partitions the reaction into thousands of tiny droplets (droplet digital PCR, ddPCR), allowing absolute quantification of nucleic acids without a standard curve — an advance enabling liquid biopsy detection of rare tumour DNA circulating in blood. Allele-specific PCR discriminates single-nucleotide polymorphisms (SNPs) by designing primers whose 3' end matches only the mutant or wild-type allele. Long-range PCR uses specialised polymerase blends to amplify targets up to 30 kb. Nested PCR uses two sequential amplification steps with inner and outer primer pairs to dramatically increase specificity for difficult samples. Hot-start PCR adds a physical or chemical block to prevent non-specific extension before the initial denaturation step, reducing background.

In the post-genomic era, PCR has merged seamlessly with next-generation sequencing: library preparation for Illumina, Nanopore, and PacBio platforms all rely on PCR amplification steps. LAMP (loop-mediated isothermal amplification) is a PCR-like technique that works at a single temperature (~65 °C) without a thermal cycler, enabling low-cost field diagnostics. CRISPR-based detection methods like SHERLOCK use PCR as an upstream amplification step before CRISPR-mediated collateral cleavage provides a visual readout. From the first gel-based PCR in 1985 to modern chip-based microfluidic systems running hundreds of reactions in parallel, the core principle — primers, polymerase, cycling — has remained unchanged, while its applications continue to expand.`
  }
];
const PCR_QUIZ = [
  {
    id: "pcr1",
    topic: "pcr",
    question: "What does PCR stand for?",
    options: [
      "Protein Chain Reaction",
      "Polymerase Chain Reaction",
      "Primer Cloning Replication",
      "Phosphate Carbon Replication"
    ],
    correctIndex: 1,
    explanation: "PCR stands for Polymerase Chain Reaction. It uses a DNA polymerase enzyme to repeatedly copy a specific DNA segment in a chain-like, exponential fashion."
  },
  {
    id: "pcr2",
    topic: "pcr",
    question: "What is the temperature used in the denaturation step of PCR?",
    options: ["37 °C", "55–65 °C", "72 °C", "94–96 °C"],
    correctIndex: 3,
    explanation: "Denaturation occurs at 94–96 °C (usually 95 °C). This high temperature breaks the hydrogen bonds between the two complementary DNA strands, separating them into single strands for use as templates."
  },
  {
    id: "pcr3",
    topic: "pcr",
    question: "During which PCR step do primers bind to the template DNA?",
    options: ["Denaturation", "Annealing", "Extension", "Ligation"],
    correctIndex: 1,
    explanation: "During the annealing step (55–65 °C), the temperature is lowered to allow short DNA primers to bind to their complementary sequences on the separated single-stranded templates."
  },
  {
    id: "pcr4",
    topic: "pcr",
    question: "Why is Taq polymerase preferred over other DNA polymerases in PCR?",
    options: [
      "It works at 37 °C like body temperature",
      "It is thermostable and survives the 95 °C denaturation step",
      "It can synthesise DNA without primers",
      "It has a proofreading exonuclease activity"
    ],
    correctIndex: 1,
    explanation: "Taq polymerase is isolated from Thermus aquaticus, a bacterium from hot springs. It is thermostable — it remains active after repeated exposure to 95 °C, making it ideal for PCR's repeated heat cycles."
  },
  {
    id: "pcr5",
    topic: "pcr",
    question: "What is the role of primers in PCR?",
    options: [
      "They provide the energy for polymerisation",
      "They join the two DNA strands together",
      "They define the start point and region to be amplified",
      "They separate the two DNA strands"
    ],
    correctIndex: 2,
    explanation: "Primers are short (~20 nt) single-stranded DNA sequences complementary to the flanking regions of the target DNA. They define exactly where polymerase starts copying, and thus which region of the genome is amplified."
  },
  {
    id: "pcr6",
    topic: "pcr",
    question: "How does PCR amplification increase with each cycle?",
    options: [
      "Linearly — one new copy per cycle",
      "Quadratically — n² copies per cycle",
      "Exponentially — copies double each cycle (2ⁿ)",
      "Logarithmically — slowly at first then constant"
    ],
    correctIndex: 2,
    explanation: "PCR amplification is exponential. Each cycle doubles the number of DNA copies, so after n cycles there are theoretically 2ⁿ copies. After 30 cycles, a single molecule yields over one billion copies."
  },
  {
    id: "pcr7",
    topic: "pcr",
    question: "What temperature is used during the extension step, and why?",
    options: [
      "37 °C — optimal for E. coli DNA polymerase",
      "55 °C — optimal for primer binding",
      "72 °C — optimal for Taq polymerase activity",
      "95 °C — to keep strands separated"
    ],
    correctIndex: 2,
    explanation: "Extension occurs at 72 °C because that is the optimum temperature for Taq polymerase. At this temperature the enzyme synthesises new DNA at ~1000 bases per minute, extending from the primer along the template."
  },
  {
    id: "pcr8",
    topic: "pcr",
    question: "What is real-time PCR (qPCR) used for?",
    options: [
      "To visualise DNA on a gel faster",
      "To amplify RNA directly without reverse transcription",
      "To quantify the amount of target DNA or RNA present",
      "To sequence the amplified DNA in real time"
    ],
    correctIndex: 2,
    explanation: "qPCR (quantitative PCR) uses fluorescent reporters to monitor PCR amplification cycle by cycle, allowing precise quantification of the starting amount of DNA or RNA in a sample."
  },
  {
    id: "pcr9",
    topic: "pcr",
    question: "Which of these is a direct application of PCR in forensic science?",
    options: [
      "Blood typing from a crime scene",
      "DNA fingerprinting using STR analysis",
      "Comparing fingerprint ridge patterns",
      "Detecting drugs in blood samples"
    ],
    correctIndex: 1,
    explanation: "Forensic PCR amplifies specific short tandem repeat (STR) loci from trace DNA samples (hair, skin cells, blood). The resulting profile uniquely identifies individuals with extremely high probability — this is DNA fingerprinting."
  },
  {
    id: "pcr10",
    topic: "pcr",
    question: "What building blocks does Taq polymerase use to synthesise new DNA strands?",
    options: [
      "Ribonucleoside triphosphates (rNTPs)",
      "Amino acids",
      "Deoxyribonucleoside triphosphates (dNTPs)",
      "Phospholipids"
    ],
    correctIndex: 2,
    explanation: "Taq polymerase uses free deoxyribonucleoside triphosphates (dNTPs — dATP, dTTP, dGTP, dCTP) as building blocks. It adds them one at a time, complementary to the template, releasing pyrophosphate as a by-product."
  }
];
function PCRSection() {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "px-6 py-16 max-w-5xl mx-auto", "data-ocid": "pcr-section", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      SectionHeader,
      {
        topicId: "pcr",
        title: "Polymerase Chain Reaction",
        subtitle: "The molecular photocopier of biotechnology — PCR amplifies a single DNA sequence into billions of copies in hours, powering diagnostics, forensics, and research."
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx(AnimatedEntrance, { direction: "up", delay: 0.1, children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-12", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "h3",
        {
          className: "font-display text-xl font-semibold mb-5 flex items-center gap-2",
          style: { color: TEAL },
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { "aria-hidden": "true", children: "🔁" }),
            "PCR Thermal Cycle — Live Animation"
          ]
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(PCRDiagram, {})
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(AnimatedEntrance, { direction: "up", delay: 0.15, children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-12", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "h3",
        {
          className: "font-display text-xl font-semibold mb-5",
          style: { color: TEAL },
          children: "Key PCR Components"
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        StaggerContainer,
        {
          className: "grid grid-cols-2 md:grid-cols-3 gap-4",
          staggerDelay: 0.1,
          children: PCR_COMPONENTS.map((comp) => /* @__PURE__ */ jsxRuntimeExports.jsx(StaggerItem, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(ComponentCard, { ...comp }) }, comp.name))
        }
      )
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      StaggerContainer,
      {
        className: "flex flex-col gap-7 mb-14",
        staggerDelay: 0.08,
        children: EXPLANATIONS.map((sec) => /* @__PURE__ */ jsxRuntimeExports.jsx(StaggerItem, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "div",
          {
            className: "rounded-2xl p-7",
            style: {
              background: "oklch(0.18 0 0)",
              border: `1px solid ${TEAL_DIM}`,
              boxShadow: "0 0 20px oklch(0.72 0.18 195 / 0.04)"
            },
            "data-ocid": `pcr-explanation-${sec.id}`,
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "h3",
                {
                  className: "font-display text-xl font-bold mb-4",
                  style: { color: TEAL },
                  children: sec.heading
                }
              ),
              sec.body.split("\n\n").map((para) => /* @__PURE__ */ jsxRuntimeExports.jsx(
                "p",
                {
                  className: "text-muted-foreground leading-relaxed mb-4 last:mb-0 text-[0.95rem]",
                  children: para
                },
                para.slice(0, 40)
              ))
            ]
          }
        ) }, sec.id))
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx(AnimatedEntrance, { direction: "up", delay: 0.1, children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "h3",
        {
          className: "font-display text-2xl font-bold mb-2",
          style: {
            color: TEAL,
            textShadow: "0 0 16px oklch(0.72 0.18 195 / 0.5)"
          },
          children: "🔁 Test Your PCR Knowledge"
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground mb-6", children: "10 questions covering PCR steps, temperatures, enzyme roles, and real-world applications." }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(QuizEngine, { topicId: "pcr", questions: PCR_QUIZ })
    ] }) })
  ] });
}
export {
  PCRSection as default
};
