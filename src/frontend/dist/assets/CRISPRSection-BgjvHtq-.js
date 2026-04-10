import { c as createLucideIcon, j as jsxRuntimeExports, r as reactExports } from "./index-V1Xys_hZ.js";
import { A as AnimatedEntrance, S as SectionHeader, a as StaggerContainer, b as StaggerItem, Q as QuizEngine } from "./SectionHeader-BzOZ529A.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  ["circle", { cx: "6", cy: "6", r: "3", key: "1lh9wr" }],
  ["path", { d: "M8.12 8.12 12 12", key: "1alkpv" }],
  ["path", { d: "M20 4 8.12 15.88", key: "xgtan2" }],
  ["circle", { cx: "6", cy: "18", r: "3", key: "fqmcym" }],
  ["path", { d: "M14.8 14.8 20 20", key: "ptml3r" }]
];
const Scissors = createLucideIcon("scissors", __iconNode);
const TEAL = "oklch(0.72 0.18 172)";
const TEAL_DIM = "oklch(0.72 0.18 172 / 0.25)";
const TEAL_BORDER = "oklch(0.72 0.18 172 / 0.4)";
const CRISPR_QUIZ = [
  {
    id: "cr1",
    question: "What does CRISPR stand for?",
    options: [
      "Clustered Regularly Interspaced Short Palindromic Repeats",
      "Catalytic RNA Interference and Splicing Protein Regulator",
      "Controlled Recombinant Integration of Specific Promoter Regions",
      "Comprehensive RNA Insertion System for Protein Replacement"
    ],
    correctIndex: 0,
    explanation: "CRISPR stands for Clustered Regularly Interspaced Short Palindromic Repeats — repetitive DNA sequences naturally found in bacterial genomes that serve as a molecular memory of past viral infections.",
    topic: "crispr"
  },
  {
    id: "cr2",
    question: "What is the primary function of the Cas9 protein in CRISPR-Cas9?",
    options: [
      "It synthesizes a new DNA strand to replace the deleted sequence",
      "It acts as a molecular scissors, cutting double-stranded DNA at a specific site",
      "It carries the edited gene from the laboratory into the patient's cells",
      "It transcribes the guide RNA from the target DNA template"
    ],
    correctIndex: 1,
    explanation: "Cas9 is a nuclease (molecular scissors) that creates a precise double-strand break in DNA at the location specified by the guide RNA. Its two cutting domains (RuvC and HNH) each sever one strand of the double helix.",
    topic: "crispr"
  },
  {
    id: "cr3",
    question: "What is the role of guide RNA (gRNA) in CRISPR-Cas9?",
    options: [
      "It degrades the Cas9 protein after editing is complete",
      "It provides energy in the form of ATP for the DNA-cutting reaction",
      "It directs the Cas9 protein to the correct target DNA sequence through complementary base pairing",
      "It repairs the cut DNA by filling in missing nucleotides"
    ],
    correctIndex: 2,
    explanation: "The guide RNA (gRNA) — typically a single guide RNA combining crRNA and tracrRNA — contains a 20-nucleotide spacer sequence that is complementary to the target DNA. It acts as a molecular GPS, directing Cas9 to the precise genomic location to be edited.",
    topic: "crispr"
  },
  {
    id: "cr4",
    question: "What is the PAM sequence and why is it essential for CRISPR?",
    options: [
      "A Protective Activation Motif that shields Cas9 from cellular degradation",
      "A Protospacer Adjacent Motif — a short DNA sequence (NGG for SpCas9) required adjacent to the target site for Cas9 to bind and cut",
      "A Post-Activation Marker added to DNA after successful editing",
      "A Primer Annealing Motif used to amplify the edited gene by PCR"
    ],
    correctIndex: 1,
    explanation: "The PAM (Protospacer Adjacent Motif) is a short sequence (5'-NGG-3' for the commonly used SpCas9) that must be immediately downstream of the target site. Cas9 first scans the genome for PAM sequences before interrogating nearby DNA for guide RNA complementarity.",
    topic: "crispr"
  },
  {
    id: "cr5",
    question: "After Cas9 cuts DNA, which repair pathway introduces targeted insertions or deletions (indels)?",
    options: [
      "Homology-Directed Repair (HDR) using a provided DNA template",
      "Non-Homologous End Joining (NHEJ), an error-prone repair mechanism",
      "Base Excision Repair (BER) triggered by oxidative damage",
      "Mismatch Repair (MMR) correcting replication errors"
    ],
    correctIndex: 1,
    explanation: "Non-Homologous End Joining (NHEJ) is the cell's default repair mechanism for double-strand breaks. It is error-prone and frequently introduces small insertions or deletions (indels) at the cut site, which can disrupt a gene's reading frame and knock out gene function.",
    topic: "crispr"
  },
  {
    id: "cr6",
    question: "Which CRISPR repair strategy allows precise replacement of a DNA sequence with a new one?",
    options: [
      "NHEJ, because it randomly inserts or deletes nucleotides",
      "HDR (Homology-Directed Repair) using a donor DNA template with homology arms",
      "RNA interference (RNAi) post-transcriptional silencing",
      "Transposon-mediated insertion at random genomic locations"
    ],
    correctIndex: 1,
    explanation: "Homology-Directed Repair (HDR) can be exploited by providing a donor DNA template with sequences homologous to regions flanking the cut. The cell copies the template into the break, allowing precise correction or insertion of a desired sequence.",
    topic: "crispr"
  },
  {
    id: "cr7",
    question: "How does CRISPR-Cas9 differ fundamentally from earlier gene editing tools like ZFNs and TALENs?",
    options: [
      "CRISPR cannot edit mammalian cells, while ZFNs and TALENs can",
      "CRISPR targets DNA using programmable RNA, making it faster and cheaper to design than protein-based ZFN/TALEN systems",
      "ZFNs and TALENs use guide RNA while CRISPR uses engineered proteins",
      "CRISPR only edits mitochondrial DNA, unlike ZFNs which target nuclear DNA"
    ],
    correctIndex: 1,
    explanation: "ZFNs and TALENs require engineering new proteins for each new target — an expensive, time-consuming process. CRISPR uses a simple RNA molecule for targeting, making it orders of magnitude cheaper, faster, and easier to design for any genomic location.",
    topic: "crispr"
  },
  {
    id: "cr8",
    question: "Which medical application of CRISPR has shown promising clinical trial results for sickle cell disease?",
    options: [
      "Replacing the patient's entire hemoglobin gene with a synthetic DNA version",
      "Reactivating fetal hemoglobin (HbF) expression by disrupting the BCL11A enhancer using CRISPR editing of patient stem cells",
      "Injecting purified Cas9 protein directly into red blood cells",
      "Using CRISPR to target and destroy the bone marrow cells producing abnormal hemoglobin"
    ],
    correctIndex: 1,
    explanation: "A breakthrough clinical approach uses CRISPR to edit a patient's own hematopoietic stem cells, disrupting the BCL11A enhancer to reactivate fetal hemoglobin (HbF) expression. HbF compensates for the defective adult hemoglobin in sickle cell disease. The FDA approved this approach (Casgevy) in 2023.",
    topic: "crispr"
  },
  {
    id: "cr9",
    question: "What is a major ethical concern surrounding germline CRISPR editing?",
    options: [
      "That it will make genetic diseases more common by introducing new mutations",
      "That edits to embryos, eggs, or sperm are heritable and passed to future generations, raising concerns about consent and long-term unknown effects",
      "That CRISPR is too expensive for academic labs to use responsibly",
      "That guide RNA molecules could be repurposed to delete entire chromosomes"
    ],
    correctIndex: 1,
    explanation: "Germline editing (editing embryos, eggs, or sperm) produces heritable changes affecting all cells in future offspring and their descendants. Unlike somatic editing (affecting only one individual), germline changes cannot be consented to by future generations, raising profound ethical questions about 'designer babies', equity, and unintended consequences.",
    topic: "crispr"
  },
  {
    id: "cr10",
    question: "What is the 'off-target effect' problem in CRISPR editing?",
    options: [
      "When the guide RNA fails to enter the cell nucleus and is degraded in the cytoplasm",
      "When Cas9 cuts DNA at unintended genomic sites with sequences similar to the target, potentially causing harmful mutations",
      "When edited cells are rejected by the immune system because Cas9 is a foreign protein",
      "When CRISPR edits only one allele instead of both copies of the target gene"
    ],
    correctIndex: 1,
    explanation: "Off-target effects occur when Cas9 cleaves DNA at sites other than the intended target due to imperfect base-pairing tolerance. This can cause unintended mutations, potentially disrupting tumor suppressor genes or other critical sequences. Researchers are developing high-fidelity Cas9 variants and improved guide RNA design to minimize this risk.",
    topic: "crispr"
  }
];
const DNA_BASES_TOP = [
  "A",
  "T",
  "G",
  "C",
  "A",
  "T",
  "G",
  "C",
  "A",
  "T",
  "G",
  "C"
];
const DNA_BASES_BOT = [
  "T",
  "A",
  "C",
  "G",
  "T",
  "A",
  "C",
  "G",
  "T",
  "A",
  "C",
  "G"
];
const DNA_TOP_IDS = DNA_BASES_TOP.map((b, i) => `top-${b}-pos${i}`);
const DNA_BOT_IDS = DNA_BASES_BOT.map((b, i) => `bot-${b}-pos${i}`);
const DNA_BP_IDS = DNA_BASES_TOP.map((_, i) => `bp-pos${i}`);
const BASE_COLORS = {
  A: "oklch(0.75 0.20 142)",
  // green
  T: "oklch(0.75 0.20 36)",
  // orange
  G: "oklch(0.75 0.20 290)",
  // purple
  C: "oklch(0.75 0.20 200)"
  // cyan
};
const STEPS = [
  {
    id: "scan",
    label: "1 · Guide RNA Scanning",
    desc: "The single guide RNA (sgRNA) — a ~100 nt molecule combining targeting and scaffold sequences — forms a complex with Cas9 and scans along double-stranded DNA, searching for a complementary 20-nucleotide sequence adjacent to a PAM site (5′-NGG-3′)."
  },
  {
    id: "bind",
    label: "2 · Cas9 Binding",
    desc: "Upon finding its target, Cas9 unwinds the DNA double helix and the guide RNA base-pairs with the complementary strand (R-loop formation). Cas9 undergoes a conformational change, repositioning its two nuclease domains (HNH and RuvC) over each DNA strand."
  },
  {
    id: "cut",
    label: "3 · DNA Double-Strand Break",
    desc: "Both nuclease domains activate simultaneously: HNH cuts the strand complementary to the guide RNA, and RuvC cuts the non-complementary strand. This creates a blunt-ended double-strand break (DSB) precisely 3 bp upstream of the PAM sequence."
  },
  {
    id: "repair",
    label: "4 · DNA Repair",
    desc: "The cell detects the break and activates repair pathways. NHEJ (non-homologous end joining) rejoins the ends imprecisely, often introducing indels that disrupt the gene. If a repair template is provided, HDR (homology-directed repair) copies the template sequence into the break — enabling precise gene correction."
  }
];
function CRISPRDiagram() {
  const [step, setStep] = reactExports.useState("scan");
  const [scanPos, setScanPos] = reactExports.useState(0);
  const [cutAnim, setCutAnim] = reactExports.useState(false);
  const scanRef = reactExports.useRef(null);
  const stepIdx = STEPS.findIndex((s) => s.id === step);
  reactExports.useEffect(() => {
    const timer = setTimeout(() => {
      const next = (stepIdx + 1) % STEPS.length;
      setStep(STEPS[next].id);
    }, 4e3);
    return () => clearTimeout(timer);
  }, [stepIdx]);
  reactExports.useEffect(() => {
    if (step === "scan") {
      setScanPos(0);
      scanRef.current = setInterval(() => {
        setScanPos((p) => p >= 10 ? 0 : p + 1);
      }, 350);
    } else {
      if (scanRef.current) clearInterval(scanRef.current);
    }
    return () => {
      if (scanRef.current) clearInterval(scanRef.current);
    };
  }, [step]);
  reactExports.useEffect(() => {
    if (step === "cut") {
      setCutAnim(false);
      const t = setTimeout(() => setCutAnim(true), 400);
      return () => clearTimeout(t);
    }
    setCutAnim(false);
  }, [step]);
  const cutIndex = 6;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "section",
    {
      className: "rounded-2xl overflow-hidden",
      style: {
        background: "oklch(0.14 0.05 262)",
        border: `1px solid ${TEAL_BORDER}`,
        boxShadow: `0 0 40px ${TEAL_DIM}`
      },
      "aria-label": "CRISPR-Cas9 mechanism animated diagram",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "div",
          {
            className: "flex gap-1 flex-wrap p-3 border-b",
            style: { borderColor: TEAL_BORDER },
            role: "tablist",
            "aria-label": "CRISPR mechanism steps",
            children: STEPS.map((s) => /* @__PURE__ */ jsxRuntimeExports.jsx(
              "button",
              {
                type: "button",
                role: "tab",
                "aria-selected": step === s.id,
                "data-ocid": `crispr-step-${s.id}`,
                onClick: () => setStep(s.id),
                className: "flex-1 rounded-lg px-3 py-2 text-xs font-semibold transition-smooth focus:outline-none focus-visible:ring-2",
                style: {
                  background: step === s.id ? TEAL_DIM : "oklch(0.19 0.04 262)",
                  color: step === s.id ? TEAL : "oklch(0.62 0.06 262)",
                  border: `1px solid ${step === s.id ? TEAL_BORDER : "oklch(0.26 0.04 262)"}`,
                  minWidth: "120px"
                },
                children: s.label
              },
              s.id
            ))
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "div",
          {
            className: "relative flex flex-col items-center justify-center py-10 px-4",
            style: { minHeight: "280px" },
            "aria-live": "polite",
            "aria-atomic": "true",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs(
                "div",
                {
                  className: "relative flex flex-col items-center gap-0",
                  "aria-label": "DNA double helix",
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1 mb-2", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs font-bold", style: { color: TEAL }, children: "5′" }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-muted-foreground", children: "Template strand" })
                    ] }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "div",
                      {
                        className: "flex items-center gap-1 mb-1",
                        role: "img",
                        "aria-label": "Top DNA strand",
                        children: DNA_BASES_TOP.map((base, i) => {
                          const isCutSite = (step === "cut" || step === "repair") && (i === cutIndex || i === cutIndex - 1);
                          const isTarget = (step === "bind" || step === "cut") && i >= 4 && i <= 9;
                          return /* @__PURE__ */ jsxRuntimeExports.jsx(
                            "div",
                            {
                              className: "flex h-8 w-8 items-center justify-center rounded text-xs font-bold transition-smooth",
                              style: {
                                background: isCutSite && cutAnim ? "oklch(0.70 0.25 22 / 0.4)" : isTarget ? `${BASE_COLORS[base]}33` : `${BASE_COLORS[base]}1a`,
                                border: `1.5px solid ${isCutSite && cutAnim ? "oklch(0.75 0.22 22)" : isTarget ? BASE_COLORS[base] : `${BASE_COLORS[base]}66`}`,
                                color: BASE_COLORS[base],
                                boxShadow: isTarget ? `0 0 8px ${BASE_COLORS[base]}55` : void 0,
                                transform: isCutSite && cutAnim ? "translateY(-3px)" : void 0
                              },
                              "aria-label": `${base}`,
                              children: base
                            },
                            DNA_TOP_IDS[i]
                          );
                        })
                      }
                    ),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-center gap-1 my-0.5", children: DNA_BASES_TOP.map((_, i) => {
                      const isBreak = step === "cut" && cutAnim && (i === cutIndex || i === cutIndex - 1);
                      return /* @__PURE__ */ jsxRuntimeExports.jsx(
                        "div",
                        {
                          style: {
                            width: "32px",
                            height: "8px",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center"
                          },
                          children: isBreak ? /* @__PURE__ */ jsxRuntimeExports.jsx(
                            "span",
                            {
                              style: {
                                color: "oklch(0.75 0.22 22)",
                                fontSize: "14px",
                                fontWeight: "bold"
                              },
                              children: "⚡"
                            }
                          ) : /* @__PURE__ */ jsxRuntimeExports.jsx(
                            "div",
                            {
                              style: {
                                width: "2px",
                                height: "8px",
                                background: i >= 4 && i <= 9 && step !== "scan" ? `${TEAL}88` : "oklch(0.35 0.04 262)"
                              }
                            }
                          )
                        },
                        DNA_BP_IDS[i]
                      );
                    }) }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "div",
                      {
                        className: "flex items-center gap-1 mt-1",
                        role: "img",
                        "aria-label": "Bottom DNA strand",
                        children: DNA_BASES_BOT.map((base, i) => {
                          const isCutSite = (step === "cut" || step === "repair") && (i === cutIndex || i === cutIndex - 1);
                          const isTarget = (step === "bind" || step === "cut") && i >= 4 && i <= 9;
                          return /* @__PURE__ */ jsxRuntimeExports.jsx(
                            "div",
                            {
                              className: "flex h-8 w-8 items-center justify-center rounded text-xs font-bold transition-smooth",
                              style: {
                                background: isCutSite && cutAnim ? "oklch(0.70 0.25 22 / 0.4)" : isTarget ? `${BASE_COLORS[base]}33` : `${BASE_COLORS[base]}1a`,
                                border: `1.5px solid ${isCutSite && cutAnim ? "oklch(0.75 0.22 22)" : isTarget ? BASE_COLORS[base] : `${BASE_COLORS[base]}66`}`,
                                color: BASE_COLORS[base],
                                boxShadow: isTarget ? `0 0 8px ${BASE_COLORS[base]}55` : void 0,
                                transform: isCutSite && cutAnim ? "translateY(3px)" : void 0
                              },
                              "aria-label": `${base}`,
                              children: base
                            },
                            DNA_BOT_IDS[i]
                          );
                        })
                      }
                    ),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1 mt-2", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs font-bold", style: { color: TEAL }, children: "3′" }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-muted-foreground", children: "Non-template strand" })
                    ] }),
                    step === "scan" && /* @__PURE__ */ jsxRuntimeExports.jsxs(
                      "div",
                      {
                        className: "absolute flex flex-col items-center pointer-events-none",
                        style: {
                          top: "-52px",
                          left: `${16 + scanPos * 36}px`,
                          transition: "left 0.3s linear"
                        },
                        "aria-label": "Guide RNA scanning along DNA",
                        children: [
                          /* @__PURE__ */ jsxRuntimeExports.jsx(
                            "div",
                            {
                              className: "rounded-lg px-2 py-1 text-xs font-bold whitespace-nowrap",
                              style: {
                                background: `${TEAL}22`,
                                border: `1px solid ${TEAL_BORDER}`,
                                color: TEAL,
                                animation: "pulse-glow-teal 2s ease-in-out infinite"
                              },
                              children: "sgRNA scanning →"
                            }
                          ),
                          /* @__PURE__ */ jsxRuntimeExports.jsx(
                            "div",
                            {
                              style: {
                                width: "2px",
                                height: "14px",
                                background: `${TEAL}88`
                              }
                            }
                          )
                        ]
                      }
                    ),
                    (step === "bind" || step === "cut") && /* @__PURE__ */ jsxRuntimeExports.jsxs(
                      "div",
                      {
                        className: "absolute flex flex-col items-center pointer-events-none",
                        style: {
                          top: "-70px",
                          left: "120px",
                          animation: step === "bind" ? "gentle-float 3s ease-in-out infinite" : void 0
                        },
                        "aria-label": "Cas9 protein bound to DNA",
                        children: [
                          /* @__PURE__ */ jsxRuntimeExports.jsxs(
                            "div",
                            {
                              className: "rounded-2xl px-4 py-2 text-xs font-bold flex items-center gap-2",
                              style: {
                                background: `${TEAL}22`,
                                border: `2px solid ${TEAL}`,
                                color: TEAL,
                                boxShadow: `0 0 18px ${TEAL}55`
                              },
                              children: [
                                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { style: { fontSize: "18px" }, children: "🔬" }),
                                "Cas9 + sgRNA complex"
                              ]
                            }
                          ),
                          /* @__PURE__ */ jsxRuntimeExports.jsx(
                            "div",
                            {
                              style: {
                                width: "2px",
                                height: "20px",
                                background: `${TEAL}88`
                              }
                            }
                          )
                        ]
                      }
                    ),
                    step === "repair" && /* @__PURE__ */ jsxRuntimeExports.jsxs(
                      "div",
                      {
                        className: "absolute flex flex-col items-center pointer-events-none",
                        style: { top: "-68px", left: "80px" },
                        "aria-label": "DNA repair mechanisms",
                        children: [
                          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-3", children: [
                            /* @__PURE__ */ jsxRuntimeExports.jsx(
                              "div",
                              {
                                className: "rounded-lg px-3 py-2 text-xs font-semibold",
                                style: {
                                  background: "oklch(0.65 0.20 290 / 0.2)",
                                  border: "1px solid oklch(0.65 0.20 290 / 0.6)",
                                  color: "oklch(0.75 0.18 290)"
                                },
                                children: "NHEJ (indels)"
                              }
                            ),
                            /* @__PURE__ */ jsxRuntimeExports.jsx(
                              "div",
                              {
                                className: "rounded-lg px-3 py-2 text-xs font-semibold",
                                style: {
                                  background: `${TEAL}22`,
                                  border: `1px solid ${TEAL_BORDER}`,
                                  color: TEAL
                                },
                                children: "HDR (precise)"
                              }
                            )
                          ] }),
                          /* @__PURE__ */ jsxRuntimeExports.jsx(
                            "div",
                            {
                              style: {
                                width: "2px",
                                height: "18px",
                                background: "oklch(0.45 0 0)"
                              }
                            }
                          )
                        ]
                      }
                    )
                  ]
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "div",
                {
                  className: "flex gap-3 flex-wrap justify-center mt-8",
                  "aria-label": "DNA base color legend",
                  children: Object.entries(BASE_COLORS).map(([base, color]) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1.5", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "div",
                      {
                        className: "h-5 w-5 rounded flex items-center justify-center text-xs font-bold",
                        style: {
                          background: `${color}22`,
                          border: `1px solid ${color}88`,
                          color
                        },
                        "aria-hidden": "true",
                        children: base
                      }
                    ),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-muted-foreground", children: base === "A" ? "Adenine" : base === "T" ? "Thymine" : base === "G" ? "Guanine" : "Cytosine" })
                  ] }, base))
                }
              )
            ]
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "div",
          {
            className: "px-5 pb-5",
            role: "tabpanel",
            "aria-label": `Step description: ${STEPS[stepIdx].label}`,
            children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "div",
              {
                className: "rounded-xl p-4",
                style: { background: `${TEAL}0f`, border: `1px solid ${TEAL}2a` },
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs font-bold mb-1", style: { color: TEAL }, children: STEPS[stepIdx].label }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm leading-relaxed text-muted-foreground", children: STEPS[stepIdx].desc })
                ]
              }
            )
          }
        )
      ]
    }
  );
}
const EXPLANATIONS = [
  {
    title: "What Is Genetic Engineering?",
    color: TEAL,
    text: "Genetic engineering is the direct manipulation of an organism's DNA using laboratory techniques to alter, add, or remove specific genes. Unlike traditional selective breeding, which works through generations of controlled mating, genetic engineering allows scientists to make targeted changes at the molecular level within a single generation. The field emerged in the 1970s with the development of recombinant DNA technology — tools that could cut DNA at specific sites and splice foreign genes into new organisms. Early tools included restriction enzymes (molecular scissors from bacteria), DNA ligases (biological glue), and plasmid vectors (circular DNA carriers). These foundational techniques revolutionized medicine, agriculture, and basic research: insulin for diabetes was among the first human proteins produced in bacteria using recombinant DNA. Today, genetic engineering underpins vaccine production, cancer therapy, crop improvement, and the rapidly advancing field of gene therapy for inherited diseases."
  },
  {
    title: "A Brief History of Gene Editing Tools",
    color: "oklch(0.76 0.18 185)",
    text: "Before CRISPR, scientists developed two major protein-based gene editing platforms. Zinc Finger Nucleases (ZFNs), introduced in the late 1990s, used engineered zinc finger protein domains fused to the FokI nuclease to cut DNA at predetermined sequences. Designing ZFNs for a new target required months of protein engineering work and was accessible only to specialist labs. Transcription Activator-Like Effector Nucleases (TALENs), described around 2011, were somewhat easier to design — each TALEN module recognized a single DNA base, allowing modular assembly — but still required protein engineering for every new target. Both platforms produced double-strand breaks and enabled gene knockout and correction, proving the concept of precision genome editing. However, the protein-based design process remained slow, expensive, and technically demanding. The CRISPR-Cas9 system, repurposed from a bacterial immune defense mechanism by Jennifer Doudna, Emmanuelle Charpentier, and colleagues in 2012, replaced protein-based targeting with programmable RNA — cutting the design cycle from months to days and making precision gene editing accessible to virtually every molecular biology laboratory worldwide."
  },
  {
    title: "How CRISPR-Cas9 Works: The Molecular Mechanism",
    color: "oklch(0.74 0.19 160)",
    text: "The CRISPR-Cas9 system has two essential components: the Cas9 protein and the single guide RNA (sgRNA). The Cas9 protein is a large (~160 kDa) endonuclease derived from Streptococcus pyogenes. It contains two nuclease domains — HNH, which cleaves the DNA strand complementary to the guide RNA, and RuvC, which cleaves the non-complementary strand — as well as a recognition lobe that holds the guide RNA. The sgRNA is a roughly 100-nucleotide RNA molecule consisting of two functional parts: a 20-nucleotide spacer sequence at the 5′ end that is designed to be complementary to the genomic target, and a scaffold sequence that folds into a complex secondary structure and anchors the RNA to Cas9. In the cell, the Cas9-sgRNA complex scans along DNA in a three-dimensional diffusion-and-search process, transiently opening short stretches to interrogate the sequence. When the complex encounters a PAM sequence (5′-NGG-3′ on the non-template strand for SpCas9), it locally unwinds the DNA and the sgRNA spacer invades the duplex to form an R-loop. If sufficient complementarity exists across the 20-base protospacer, Cas9 undergoes a conformational change that positions both nuclease domains for cleavage, creating a blunt-ended double-strand break exactly 3 base pairs upstream of the PAM."
  },
  {
    title: "DNA Repair Pathways Harnessed by CRISPR",
    color: "oklch(0.72 0.18 172)",
    text: "Once Cas9 creates a double-strand break, the cell activates one of two main repair pathways — and the choice between them determines the editing outcome. Non-Homologous End Joining (NHEJ) is the default, fast, error-prone pathway. Cellular machinery rapidly joins the broken ends, frequently inserting or deleting a small number of nucleotides (indels) in the process. If indels occur within a protein-coding exon they often shift the reading frame, introducing a premature stop codon and destroying gene function. Researchers exploit NHEJ for gene knockout — a powerful tool to study gene function and a therapeutic strategy for diseases caused by gain-of-function mutations (such as some forms of hereditary blindness). Homology-Directed Repair (HDR) is a slower, more precise pathway that uses a homologous DNA template to faithfully copy sequence across the break. By providing a synthetic donor template flanked by sequences matching the genomic region around the break, scientists can insert, correct, or replace any DNA sequence with single-nucleotide precision. HDR is the pathway of choice for gene correction in therapeutic applications, though it is less efficient than NHEJ and is most active in dividing cells during the S and G2 phases of the cell cycle."
  },
  {
    title: "Medical Applications of CRISPR",
    color: "oklch(0.75 0.17 142)",
    text: "CRISPR's therapeutic potential spans monogenic diseases, cancer, and infectious diseases. The most clinically advanced application is for hemoglobin disorders: in 2023, the FDA approved Casgevy (exagamglogene autotemcel), a CRISPR-based therapy for sickle cell disease and transfusion-dependent beta-thalassemia that edits a patient's own hematopoietic stem cells to reactivate fetal hemoglobin, compensating for the defective adult hemoglobin. In oncology, CAR-T cell therapies are being enhanced with CRISPR edits to knock out genes that limit T cell persistence or cause exhaustion, creating more potent living drugs against leukemia and other cancers. For infectious diseases, researchers are exploring in vivo CRISPR delivery to disable HIV proviruses integrated into patient T cells, and CRISPR-based diagnostics (SHERLOCK, DETECTR) have been developed for rapid, ultra-sensitive nucleic acid detection of pathogens including SARS-CoV-2. Looking ahead, base editing and prime editing — CRISPR-derived technologies that can change individual nucleotides without creating double-strand breaks — promise even safer and more precise correction of the thousands of known pathogenic point mutations underlying inherited diseases."
  },
  {
    title: "Agricultural and Environmental Applications",
    color: "oklch(0.73 0.16 195)",
    text: "Beyond medicine, CRISPR is transforming agriculture and environmental biotechnology. In crop science, CRISPR is used to knock out genes that cause browning in mushrooms and apples, increase yield in tomatoes and rice, introduce drought and disease resistance, and reduce allergenicity in wheat and peanuts. Because CRISPR can create changes identical to naturally occurring mutations, many CRISPR-edited crops are being regulated differently from conventional GMOs in several countries, potentially accelerating their path to market. In livestock, CRISPR has been used to produce pigs resistant to PRRS virus (a major threat to pork production) and to knock out genes that cause bovine respiratory disease. In the environment, gene drives — CRISPR systems engineered to spread rapidly through wild populations — are being developed to suppress malaria-transmitting mosquito populations and potentially eradicate invasive species. However, gene drives raise profound ecological concerns about the irreversibility of releasing self-propagating genetic changes into wild ecosystems, demanding careful containment and international regulatory oversight."
  },
  {
    title: "Ethics, Regulation, and the Future of CRISPR",
    color: "oklch(0.70 0.18 262)",
    text: "The power of CRISPR raises urgent ethical and regulatory questions. In 2018, a Chinese scientist shocked the scientific community by announcing the birth of the first genome-edited human babies — twin girls whose CCR5 gene had been disrupted in an attempt to confer HIV resistance. The experiment was widely condemned as premature, unsafe, and ethically unjustifiable because germline edits are heritable and the long-term consequences are unknown, the girls faced no imminent HIV risk, and the process bypassed standard oversight. This scandal accelerated international efforts to establish governance frameworks for human germline editing. Most regulatory bodies distinguish sharply between somatic editing (changing cells in a living patient, affecting only that individual) and germline editing (editing embryos or reproductive cells, affecting all future generations). Somatic therapies have a clear regulatory pathway analogous to other cell and gene therapies. Germline editing in humans for reproductive purposes remains prohibited or heavily restricted in most jurisdictions. Looking forward, the CRISPR toolbox continues to expand rapidly: base editors (adenine and cytosine base editors), prime editors, epigenome editors, and CRISPR-based transcriptional regulators offer increasingly precise control over genome function. The challenge for the scientific community, regulators, ethicists, and the public is to develop the governance structures that allow beneficial applications — curing genetic diseases, improving food security, controlling infectious disease vectors — while preventing misuse and ensuring equitable access globally."
  }
];
const APP_CARDS = [
  {
    icon: "💉",
    label: "Gene Therapy",
    desc: "Sickle cell disease & thalassemia — FDA-approved Casgevy (2023)",
    color: TEAL
  },
  {
    icon: "🦠",
    label: "Infectious Disease",
    desc: "HIV provirus excision, CRISPR diagnostics for SARS-CoV-2",
    color: "oklch(0.75 0.18 185)"
  },
  {
    icon: "🌱",
    label: "Crop Engineering",
    desc: "Disease-resistant, high-yield, non-browning edited crops",
    color: "oklch(0.74 0.18 142)"
  },
  {
    icon: "🧫",
    label: "Cancer Immunotherapy",
    desc: "CRISPR-enhanced CAR-T cells with improved persistence and potency",
    color: "oklch(0.73 0.19 160)"
  },
  {
    icon: "🦟",
    label: "Gene Drives",
    desc: "Population-level mosquito control to reduce malaria transmission",
    color: "oklch(0.72 0.17 195)"
  },
  {
    icon: "🔬",
    label: "Basic Research",
    desc: "High-throughput genome-wide knockout screens reveal gene function",
    color: "oklch(0.70 0.18 220)"
  }
];
function CRISPRSection() {
  return /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "px-4 py-16 md:px-8", "aria-labelledby": "crispr-heading", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mx-auto max-w-5xl", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs(AnimatedEntrance, { direction: "left", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        SectionHeader,
        {
          topicId: "crispr",
          title: "Genetic Engineering & CRISPR",
          subtitle: "From bacterial immune systems to molecular scissors: how CRISPR-Cas9 is rewriting the code of life — one base pair at a time."
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "div",
        {
          className: "mb-6 inline-flex items-center gap-2 rounded-full px-3 py-1.5 text-xs font-semibold",
          style: {
            background: `${TEAL}1a`,
            border: `1px solid ${TEAL_BORDER}`,
            color: TEAL
          },
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Scissors, { className: "h-3.5 w-3.5", "aria-hidden": "true" }),
            "Guide RNA · Cas9 Nuclease · Double-Strand Break · DNA Repair"
          ]
        }
      )
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(AnimatedEntrance, { direction: "up", delay: 0.1, children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-12", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "div",
        {
          className: "flex items-center justify-between px-5 py-3 rounded-t-2xl border-b",
          style: {
            background: "oklch(0.17 0.05 262)",
            borderColor: TEAL_BORDER,
            borderTop: `1px solid ${TEAL_BORDER}`,
            borderLeft: `1px solid ${TEAL_BORDER}`,
            borderRight: `1px solid ${TEAL_BORDER}`
          },
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "h3",
              {
                className: "font-display text-sm font-semibold",
                style: { color: TEAL },
                id: "crispr-heading",
                children: "Interactive CRISPR-Cas9 Mechanism Diagram"
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-muted-foreground", children: "Auto-advances · Click steps to explore" })
          ]
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(CRISPRDiagram, {})
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(StaggerContainer, { className: "mb-12 space-y-8", staggerDelay: 0.08, children: EXPLANATIONS.map((para) => /* @__PURE__ */ jsxRuntimeExports.jsx(StaggerItem, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        className: "rounded-2xl p-6",
        style: {
          background: "oklch(0.18 0.05 262)",
          border: `1px solid ${para.color}25`
        },
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "h3",
            {
              className: "font-display text-xl font-bold mb-3",
              style: { color: para.color },
              children: para.title
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground leading-relaxed text-sm md:text-base", children: para.text })
        ]
      }
    ) }, para.title)) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(AnimatedEntrance, { direction: "up", delay: 0.05, children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-12", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "h3",
        {
          className: "font-display text-2xl font-bold mb-2 accent-biotech glow-biotech",
          style: { color: TEAL },
          children: "Six Frontiers of CRISPR Applications"
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground text-sm mb-6", children: "From curing genetic diseases to engineering entire ecosystems — CRISPR's reach spans every domain of biology." }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        StaggerContainer,
        {
          className: "grid grid-cols-2 md:grid-cols-3 gap-4",
          staggerDelay: 0.07,
          children: APP_CARDS.map((card) => /* @__PURE__ */ jsxRuntimeExports.jsx(StaggerItem, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "div",
            {
              className: "rounded-2xl p-5 flex flex-col gap-2 h-full transition-smooth hover:scale-[1.02]",
              style: {
                background: `${card.color}0e`,
                border: `1px solid ${card.color}30`
              },
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-3xl", "aria-hidden": "true", children: card.icon }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "span",
                  {
                    className: "font-display font-bold text-base",
                    style: { color: card.color },
                    children: card.label
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-muted-foreground leading-relaxed", children: card.desc })
              ]
            }
          ) }, card.label))
        }
      )
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(AnimatedEntrance, { direction: "up", delay: 0.05, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        className: "mb-12 rounded-2xl overflow-hidden",
        style: {
          background: "oklch(0.17 0.05 262)",
          border: `1px solid ${TEAL_BORDER}`
        },
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "div",
            {
              className: "px-5 py-4 border-b",
              style: { borderColor: TEAL_BORDER },
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "h3",
                  {
                    className: "font-display text-lg font-bold",
                    style: { color: TEAL },
                    children: "CRISPR vs. Earlier Gene Editing Technologies"
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground mt-1", children: "How RNA-guided targeting transformed the field" })
              ]
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "overflow-x-auto", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "table",
            {
              className: "w-full text-sm",
              "aria-label": "Comparison of gene editing technologies",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("thead", { children: /* @__PURE__ */ jsxRuntimeExports.jsx("tr", { style: { background: `${TEAL}0f` }, children: ["Feature", "ZFNs", "TALENs", "CRISPR-Cas9"].map((h) => /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "th",
                  {
                    scope: "col",
                    className: "px-4 py-3 text-left text-xs font-bold uppercase tracking-wide",
                    style: {
                      color: TEAL,
                      borderBottom: `1px solid ${TEAL_BORDER}`
                    },
                    children: h
                  },
                  h
                )) }) }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("tbody", { children: [
                  [
                    "Targeting mechanism",
                    "Protein–DNA",
                    "Protein–DNA",
                    "RNA–DNA"
                  ],
                  ["Design time", "Months", "Weeks", "Days"],
                  ["Cost to design", "High", "Moderate", "Low"],
                  ["Multiplexing", "Difficult", "Moderate", "Easy"],
                  [
                    "Off-target risk",
                    "Moderate",
                    "Lower",
                    "Low (engineered variants)"
                  ],
                  [
                    "Cut type",
                    "DSB (staggered)",
                    "DSB (blunt)",
                    "DSB (blunt) / nickase"
                  ]
                ].map((row, ri) => /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "tr",
                  {
                    style: {
                      background: ri % 2 === 0 ? "transparent" : "oklch(0.15 0.05 262)",
                      borderBottom: "1px solid oklch(0.22 0.04 262)"
                    },
                    children: row.map((cell, ci) => /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "td",
                      {
                        className: "px-4 py-3",
                        style: {
                          color: ci === 0 ? "oklch(0.80 0.06 262)" : ci === 3 ? TEAL : "oklch(0.62 0.06 262)",
                          fontWeight: ci === 0 ? "600" : "400"
                        },
                        children: cell
                      },
                      `${row[0]}-${ci}`
                    ))
                  },
                  row[0]
                )) })
              ]
            }
          ) })
        ]
      }
    ) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(AnimatedEntrance, { direction: "up", delay: 0.05, children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "h3",
        {
          className: "font-display text-2xl font-bold mb-1",
          style: { color: TEAL, textShadow: `0 0 20px ${TEAL}60` },
          children: "Test Your CRISPR Knowledge"
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground text-sm mb-6", children: "10 questions covering the mechanism, applications, repair pathways, and ethics of CRISPR-Cas9." }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(QuizEngine, { topicId: "crispr", questions: CRISPR_QUIZ })
    ] }) })
  ] }) });
}
export {
  CRISPRSection as default
};
