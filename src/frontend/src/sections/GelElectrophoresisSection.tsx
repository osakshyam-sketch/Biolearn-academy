import {
  AnimatedEntrance,
  StaggerContainer,
  StaggerItem,
} from "@/components/AnimatedEntrance";
import { QuizEngine } from "@/components/QuizEngine";
import { SectionHeader } from "@/components/SectionHeader";
import type { QuizQuestion } from "@/types/biology";
import { useEffect, useRef, useState } from "react";

// ─── Gel Electrophoresis Animated Diagram ─────────────────────────────────────

const TEAL = "oklch(0.72 0.19 185)";
const TEAL_DIM = "oklch(0.50 0.14 185)";
const AMBER = "oklch(0.82 0.18 70)";
const LADDER_COLOR = "oklch(0.78 0.16 210)";
const NAVY_BG = "#060d26";

interface GelBand {
  lane: number; // 0 = ladder, 1-4 = samples
  label: string;
  size: number; // bp
  yPercent: number; // final resting position (% from top of gel)
  color: string;
  width: number; // px
  isLadder?: boolean;
}

const LADDER_BANDS: GelBand[] = [
  {
    lane: 0,
    label: "10 kb",
    size: 10000,
    yPercent: 12,
    color: LADDER_COLOR,
    width: 38,
    isLadder: true,
  },
  {
    lane: 0,
    label: "8 kb",
    size: 8000,
    yPercent: 17,
    color: LADDER_COLOR,
    width: 38,
    isLadder: true,
  },
  {
    lane: 0,
    label: "6 kb",
    size: 6000,
    yPercent: 24,
    color: LADDER_COLOR,
    width: 38,
    isLadder: true,
  },
  {
    lane: 0,
    label: "4 kb",
    size: 4000,
    yPercent: 33,
    color: LADDER_COLOR,
    width: 38,
    isLadder: true,
  },
  {
    lane: 0,
    label: "2 kb",
    size: 2000,
    yPercent: 47,
    color: LADDER_COLOR,
    width: 38,
    isLadder: true,
  },
  {
    lane: 0,
    label: "1 kb",
    size: 1000,
    yPercent: 60,
    color: LADDER_COLOR,
    width: 38,
    isLadder: true,
  },
  {
    lane: 0,
    label: "500 bp",
    size: 500,
    yPercent: 72,
    color: LADDER_COLOR,
    width: 38,
    isLadder: true,
  },
  {
    lane: 0,
    label: "100 bp",
    size: 100,
    yPercent: 86,
    color: LADDER_COLOR,
    width: 38,
    isLadder: true,
  },
];

const SAMPLE_BANDS: GelBand[] = [
  // Lane 1 — Sample A (2 fragments)
  { lane: 1, label: "~4 kb", size: 4000, yPercent: 33, color: TEAL, width: 44 },
  {
    lane: 1,
    label: "~900 bp",
    size: 900,
    yPercent: 63,
    color: TEAL,
    width: 44,
  },
  // Lane 2 — Sample B (3 fragments)
  { lane: 2, label: "~6 kb", size: 6000, yPercent: 24, color: TEAL, width: 44 },
  { lane: 2, label: "~2 kb", size: 2000, yPercent: 47, color: TEAL, width: 44 },
  {
    lane: 2,
    label: "~500 bp",
    size: 500,
    yPercent: 72,
    color: TEAL,
    width: 44,
  },
  // Lane 3 — Sample C (1 fragment — positive control)
  {
    lane: 3,
    label: "~1 kb",
    size: 1000,
    yPercent: 60,
    color: AMBER,
    width: 44,
  },
  // Lane 4 — Negative control (no bands)
];

const ALL_BANDS = [...LADDER_BANDS, ...SAMPLE_BANDS];
const LANE_COUNT = 5; // ladder + 4 samples

const LANE_LABELS = [
  "Ladder",
  "Sample A",
  "Sample B",
  "Sample C (ctrl)",
  "Neg ctrl",
];
const DIVIDER_IDS = ["div-1", "div-2", "div-3", "div-4"];
const ARROW_IDS = ["arr-0", "arr-1", "arr-2", "arr-3", "arr-4", "arr-5"];
const ARROW_DELAYS = [0, 0.2, 0.4, 0.6, 0.8, 1.0];

// ─── Gel Canvas Component ──────────────────────────────────────────────────────

function GelDiagram() {
  const [running, setRunning] = useState(false);
  const [progress, setProgress] = useState(0); // 0–1
  const [done, setDone] = useState(false);
  const [uvMode, setUvMode] = useState(false);
  const rafRef = useRef<number>(0);
  const startRef = useRef<number>(0);
  const DURATION = 3200; // ms for full migration

  function startRun() {
    if (running) return;
    setDone(false);
    setProgress(0);
    setRunning(true);
    startRef.current = performance.now();

    function tick(now: number) {
      const elapsed = now - startRef.current;
      const p = Math.min(elapsed / DURATION, 1);
      setProgress(p);
      if (p < 1) {
        rafRef.current = requestAnimationFrame(tick);
      } else {
        setRunning(false);
        setDone(true);
      }
    }
    rafRef.current = requestAnimationFrame(tick);
  }

  function resetRun() {
    cancelAnimationFrame(rafRef.current);
    setRunning(false);
    setProgress(0);
    setDone(false);
    setUvMode(false);
  }

  useEffect(() => () => cancelAnimationFrame(rafRef.current), []);

  // Each band starts at yPercent=5 (well) and migrates to its final yPercent
  const WELL_Y = 5;
  const GEL_H = 360;
  const GEL_W = 480;
  const LANE_W = GEL_W / LANE_COUNT;

  const gelBg = uvMode ? "#05081a" : "#0a1040";
  const gelBandOpacity = uvMode ? 1 : 0.88;

  return (
    <section
      className="flex flex-col items-center gap-4"
      aria-label="Interactive gel electrophoresis simulation showing DNA band migration"
    >
      {/* Controls */}
      <div className="flex items-center gap-3 flex-wrap justify-center">
        <button
          type="button"
          onClick={startRun}
          disabled={running}
          data-ocid="gel-run-btn"
          aria-label="Run gel electrophoresis simulation — DNA bands will migrate toward positive electrode"
          className="rounded-lg px-5 py-2 text-sm font-semibold transition-all duration-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 disabled:opacity-50"
          style={{
            background: running
              ? "rgba(0,200,160,0.15)"
              : "oklch(0.72 0.19 185 / 0.25)",
            color: TEAL,
            border: `1.5px solid ${running ? "oklch(0.72 0.19 185 / 0.5)" : "oklch(0.72 0.19 185)"}`,
            boxShadow: running
              ? "none"
              : "0 0 16px oklch(0.72 0.19 185 / 0.35)",
            outlineColor: TEAL,
          }}
        >
          {running ? "⚡ Running…" : "▶ Run Gel"}
        </button>

        {done && (
          <button
            type="button"
            onClick={() => setUvMode((v) => !v)}
            data-ocid="gel-uv-btn"
            aria-label={
              uvMode
                ? "Switch to white light view"
                : "Switch to UV light — shows ethidium bromide fluorescence"
            }
            className="rounded-lg px-4 py-2 text-sm font-semibold transition-all duration-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2"
            style={{
              background: uvMode
                ? "oklch(0.78 0.20 70 / 0.25)"
                : "rgba(255,200,60,0.1)",
              color: uvMode ? AMBER : "oklch(0.75 0.14 70)",
              border: `1.5px solid ${uvMode ? AMBER : "oklch(0.75 0.14 70 / 0.5)"}`,
              outlineColor: AMBER,
            }}
          >
            {uvMode ? "🔆 White Light" : "🔵 UV Stain"}
          </button>
        )}

        {(done || progress > 0) && (
          <button
            type="button"
            onClick={resetRun}
            data-ocid="gel-reset-btn"
            aria-label="Reset gel simulation"
            className="rounded-lg px-4 py-2 text-sm font-semibold transition-all duration-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2"
            style={{
              background: "rgba(255,100,100,0.1)",
              color: "oklch(0.70 0.18 22)",
              border: "1.5px solid oklch(0.70 0.18 22 / 0.5)",
              outlineColor: "oklch(0.70 0.18 22)",
            }}
          >
            ↺ Reset
          </button>
        )}
      </div>

      {/* Gel Container */}
      <div
        className="relative rounded-xl overflow-hidden"
        style={{
          width: GEL_W,
          height: GEL_H + 72,
          background: NAVY_BG,
          border: "1.5px solid oklch(0.40 0.12 220 / 0.5)",
          boxShadow: uvMode
            ? "0 0 40px oklch(0.72 0.19 185 / 0.35), 0 0 80px oklch(0.72 0.19 185 / 0.15)"
            : "0 4px 32px rgba(0,0,0,0.6)",
        }}
        aria-live="polite"
        aria-atomic="false"
      >
        {/* Electrode labels */}
        <div
          className="absolute top-0 left-0 right-0 flex items-center justify-between px-4 pt-2 pb-1 z-20"
          style={{ borderBottom: "1px solid rgba(100,130,255,0.2)" }}
        >
          <span
            style={{
              color: "oklch(0.72 0.16 250)",
              fontSize: 11,
              fontWeight: 700,
            }}
          >
            ⊖ Negative (cathode) — DNA loads here
          </span>
          <span
            style={{
              color: "oklch(0.70 0.18 22)",
              fontSize: 11,
              fontWeight: 700,
            }}
          >
            Positive (anode) ⊕
          </span>
        </div>

        {/* Gel body */}
        <div
          className="absolute"
          style={{
            top: 28,
            left: 0,
            width: GEL_W,
            height: GEL_H,
            background: uvMode
              ? "linear-gradient(180deg, #05081a 0%, #070c1e 100%)"
              : `linear-gradient(180deg, ${gelBg} 0%, #0c1548 100%)`,
            transition: "background 0.5s ease",
          }}
          role="img"
          aria-label={`Gel electrophoresis diagram with ${LANE_COUNT} lanes. ${done ? "Migration complete." : progress > 0 ? "DNA bands are migrating." : "Press Run Gel to start."}`}
        >
          {/* Lane dividers */}
          {DIVIDER_IDS.map((divId, i) => (
            <div
              key={divId}
              className="absolute top-0 bottom-0"
              style={{
                left: (i + 1) * LANE_W,
                width: 1,
                background: "rgba(100,130,255,0.12)",
              }}
            />
          ))}

          {/* Wells */}
          {LANE_LABELS.map((laneLabel, i) => {
            const wellW = 36;
            const laneCenter = i * LANE_W + LANE_W / 2;
            return (
              <div
                key={laneLabel}
                className="absolute"
                style={{
                  left: laneCenter - wellW / 2,
                  top: 8,
                  width: wellW,
                  height: 14,
                  background: "rgba(0,0,0,0.8)",
                  border: "1.5px solid oklch(0.50 0.12 220 / 0.6)",
                  borderRadius: "2px 2px 4px 4px",
                }}
                aria-label={`Well ${i + 1}: ${laneLabel}`}
              />
            );
          })}

          {/* DNA Bands */}
          {ALL_BANDS.map((band) => {
            const laneCenter = band.lane * LANE_W + LANE_W / 2;
            const currentY = WELL_Y + (band.yPercent - WELL_Y) * progress;
            const yPx = (currentY / 100) * GEL_H;
            const isVisible = progress > 0;
            const bandColor = uvMode
              ? band.isLadder
                ? "oklch(0.85 0.20 210)"
                : band.lane === 3
                  ? "oklch(0.88 0.22 70)"
                  : "oklch(0.80 0.22 155)"
              : band.color;
            const glow = uvMode
              ? `0 0 12px ${bandColor}, 0 0 24px ${bandColor}88`
              : `0 0 8px ${band.color}99`;

            return (
              <div
                key={`band-lane${band.lane}-${band.label}`}
                className="absolute"
                style={{
                  left: laneCenter - band.width / 2,
                  top: yPx - 3,
                  width: band.width,
                  height: 6,
                  background: isVisible ? bandColor : "transparent",
                  borderRadius: 3,
                  opacity: isVisible ? gelBandOpacity : 0,
                  boxShadow: isVisible ? glow : "none",
                  transition:
                    "opacity 0.3s ease, background 0.5s ease, box-shadow 0.5s ease",
                }}
                aria-label={`${LANE_LABELS[band.lane]} band at ${band.label}`}
              />
            );
          })}

          {/* Ladder size labels (visible only after run completes) */}
          {done &&
            LADDER_BANDS.map((band) => {
              const yPx = (band.yPercent / 100) * GEL_H;
              return (
                <div
                  key={`lbl-${band.label}`}
                  className="absolute"
                  style={{
                    left: 4,
                    top: yPx - 7,
                    fontSize: 9,
                    fontWeight: 700,
                    color: uvMode ? "oklch(0.85 0.20 210)" : LADDER_COLOR,
                    whiteSpace: "nowrap",
                    textShadow: `0 0 6px ${LADDER_COLOR}99`,
                    pointerEvents: "none",
                  }}
                  aria-hidden="true"
                >
                  {band.label}
                </div>
              );
            })}

          {/* Electric field arrows (right edge) — only when running */}
          {running && (
            <div
              className="absolute right-2 top-0 bottom-0 flex flex-col justify-around items-center pointer-events-none"
              aria-hidden="true"
            >
              {ARROW_IDS.map((arrowId, i) => (
                <div
                  key={arrowId}
                  style={{
                    fontSize: 14,
                    color: "oklch(0.70 0.18 22 / 0.6)",
                    animation: `pulse-glow 1.2s ${ARROW_DELAYS[i]}s infinite`,
                  }}
                >
                  ↓
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Lane labels at bottom */}
        <div
          className="absolute bottom-0 left-0 right-0 flex"
          style={{
            height: 44,
            background: "rgba(5,10,40,0.95)",
            borderTop: "1px solid rgba(100,130,255,0.15)",
          }}
        >
          {LANE_LABELS.map((lbl, i) => (
            <div
              key={`lbl-${lbl}`}
              className="flex items-center justify-center text-center"
              style={{
                width: LANE_W,
                fontSize: 10,
                fontWeight: 600,
                color: i === 0 ? LADDER_COLOR : i === 3 ? AMBER : TEAL_DIM,
                lineHeight: 1.2,
                padding: "4px 2px",
              }}
            >
              {i === 0 ? "📏 " : i === 3 ? "✅ " : i === 4 ? "❌ " : "🧬 "}
              {lbl}
            </div>
          ))}
        </div>
      </div>

      {/* Results interpretation panel */}
      {done && (
        <section
          className="w-full max-w-lg rounded-xl p-4 animate-fade-in"
          style={{
            background: "oklch(0.12 0.05 220 / 0.95)",
            border: "1px solid oklch(0.72 0.19 185 / 0.3)",
            boxShadow: "0 0 20px oklch(0.72 0.19 185 / 0.12)",
          }}
          aria-label="Results interpretation panel"
        >
          <div
            style={{
              color: TEAL,
              fontWeight: 700,
              fontSize: 13,
              marginBottom: 8,
              letterSpacing: "0.06em",
            }}
          >
            📊 RESULTS INTERPRETATION
          </div>
          <div className="flex flex-col gap-2">
            {[
              {
                label: "Sample A",
                desc: "2 bands: ~4 kb + ~900 bp — two DNA fragments",
                color: TEAL,
              },
              {
                label: "Sample B",
                desc: "3 bands: ~6 kb, ~2 kb, ~500 bp — larger plasmid with inserts",
                color: TEAL,
              },
              {
                label: "Sample C",
                desc: "Single ~1 kb band — matches expected positive control size",
                color: AMBER,
              },
              {
                label: "Neg ctrl",
                desc: "No bands — confirms no contamination in experiment",
                color: "oklch(0.65 0.08 0)",
              },
            ].map(({ label, desc, color }) => (
              <div
                key={label}
                className="flex items-start gap-2"
                style={{ fontSize: 12 }}
              >
                <span
                  style={{
                    color,
                    fontWeight: 700,
                    minWidth: 72,
                    flexShrink: 0,
                  }}
                >
                  {label}:
                </span>
                <span style={{ color: "oklch(0.78 0.06 220)" }}>{desc}</span>
              </div>
            ))}
          </div>
          <div
            style={{
              fontSize: 11,
              color: "oklch(0.60 0.06 220)",
              marginTop: 10,
              borderTop: "1px solid rgba(100,130,255,0.15)",
              paddingTop: 8,
            }}
          >
            💡 Smaller fragments travel farther from the wells. Compare unknown
            bands to the DNA ladder to estimate size.
          </div>
        </section>
      )}

      {/* Status bar */}
      <div
        className="text-center text-xs"
        style={{ color: "oklch(0.55 0.08 220)" }}
        aria-live="polite"
      >
        {!running &&
          progress === 0 &&
          "Press ▶ Run Gel to apply electric current and watch DNA fragments separate by size"}
        {running &&
          `⚡ Applying 100V DC — DNA fragments migrating toward positive electrode… ${Math.round(progress * 100)}%`}
        {done &&
          !uvMode &&
          "✅ Migration complete — click UV Stain to visualize ethidium bromide fluorescence"}
        {done &&
          uvMode &&
          "🔵 UV mode: ethidium bromide intercalated in DNA glows orange under UV light"}
      </div>
    </section>
  );
}

// ─── Explanations ─────────────────────────────────────────────────────────────

const EXPLANATIONS = [
  {
    title: "What Is Gel Electrophoresis?",
    content:
      "Gel electrophoresis is a laboratory technique used to separate and analyze DNA, RNA, or protein molecules based on their size and electrical charge. The name comes from two key principles: a gel matrix (most commonly agarose for nucleic acids) acts as a molecular sieve, and electrophoresis refers to the movement of charged molecules in an electric field. When an electric voltage is applied across the gel, negatively charged DNA molecules are attracted toward the positive electrode (anode) and repelled from the negative electrode (cathode), causing them to migrate through the gel. The rate at which they move depends almost entirely on their size — smaller fragments weave through the gel pores more easily and travel farther in a given time, while larger fragments are impeded by the mesh and move a shorter distance. This size-based separation produces a characteristic banding pattern that can be stained and visualized.",
  },
  {
    title: "The Agarose Gel Matrix",
    content:
      "Agarose is a polysaccharide polymer extracted from red seaweed (agar), and it forms the physical framework through which DNA migrates. To prepare the gel, agarose powder is dissolved in a buffer solution (typically TAE — Tris-acetate-EDTA — or TBE — Tris-borate-EDTA) by heating, then poured into a mold with a comb inserted to create wells. As the solution cools to room temperature, the agarose chains form a tangled three-dimensional network of pores. The concentration of agarose determines the pore size: a low-percentage gel (0.5–0.8%) has larger pores and is best for resolving large DNA fragments (5–50 kb), while a high-percentage gel (2–3%) has smaller pores and is used for small fragments (100–500 bp). The buffer solution is critical — it maintains a stable pH and provides ions that carry the electrical current through the gel. Without a buffer, the current would heat the gel unevenly and distort the separation.",
  },
  {
    title: "How the Electric Current Separates DNA",
    content:
      "DNA is a negatively charged molecule at physiological pH due to the phosphate groups in its backbone. When submerged in buffer and connected to a power supply, the DNA fragments loaded into the wells begin migrating toward the positive electrode at the far end of the gel. The movement is not uniform: the relationship between fragment size and migration distance follows a logarithmic curve — a semilog plot of log(base pair size) versus distance migrated produces a straight line. This predictable relationship allows scientists to estimate the size of unknown fragments by comparing their position to a DNA ladder (also called a molecular weight marker), which is a mixture of DNA fragments of precisely known sizes run in an adjacent lane. The voltage used typically ranges from 80 to 150 volts; higher voltages speed up the run but can cause bands to blur and overheat the gel.",
  },
  {
    title: "Loading Wells, DNA Ladder, and Sample Preparation",
    content:
      "Before loading onto the gel, DNA samples are mixed with a loading dye that serves two purposes: it adds density (typically from glycerol or ficoll) to ensure the sample sinks into the well rather than floating out, and it contains tracking dyes (such as bromophenol blue and xylene cyanol) that migrate at known rates, allowing the researcher to monitor electrophoresis progress without staining. Samples are pipetted carefully into the wells — rectangular slots formed by the comb during casting. One lane is always reserved for the DNA ladder, a commercially prepared mixture of DNA fragments at standard sizes (e.g., 100 bp, 200 bp, 500 bp, 1 kb, 2 kb, 5 kb, 10 kb). After electrophoresis, each ladder band appears at a predictable position, and unknown sample bands can be estimated by measuring their distance from the well and interpolating against the ladder's known values. A negative control well (containing buffer and loading dye but no DNA) confirms that any bands observed in sample lanes are genuine and not contaminants.",
  },
  {
    title: "Visualization: Ethidium Bromide and Modern Stains",
    content:
      "Once electrophoresis is complete, the DNA bands are invisible to the naked eye and must be stained. Ethidium bromide (EtBr) has historically been the most widely used dye for this purpose. It intercalates (inserts) between the stacked base pairs of double-stranded DNA and, when exposed to ultraviolet (UV) light, fluoresces bright orange. The gel is either run with EtBr incorporated throughout (allowing real-time visualization) or stained after the run. Under UV illumination, DNA bands appear as glowing orange bands against the dark gel background. While highly sensitive, ethidium bromide is a mutagen and requires careful handling and disposal. Modern labs increasingly use safer alternatives such as SYBR Safe, GelRed, and SYBR Green, which are less hazardous but similarly effective. Some protocols use silver staining for very high sensitivity when working with nanogram quantities of DNA. The intensity of a band correlates roughly with the amount of DNA present — a brighter band contains more DNA molecules at that size.",
  },
  {
    title: "Southern Blotting: From Gel to Membrane",
    content:
      "Gel electrophoresis is also the first step in the powerful technique known as Southern blotting, developed by Edwin Southern in 1975. After electrophoresis separates DNA fragments by size, the gel is treated to denature the double-stranded DNA into single strands. The fragments are then transferred (blotted) from the gel onto a nitrocellulose or nylon membrane, preserving their size-based arrangement. The membrane is incubated with a labeled DNA or RNA probe — a single-stranded sequence complementary to the target gene. Where the probe hybridizes (binds) to its complement on the membrane, a signal is generated (via radioactivity, chemiluminescence, or fluorescence). This reveals which specific-sized fragments contain the gene of interest. Southern blotting was an essential tool in early molecular biology before the rise of PCR and DNA sequencing, and it remains useful for detecting gene copy number variations, confirming transgene integration in genetically modified organisms, and diagnosing certain genetic diseases.",
  },
  {
    title: "Applications: Forensics, Diagnostics, and Beyond",
    content:
      "Gel electrophoresis underpins a remarkable range of real-world applications. In forensic science, DNA fingerprinting (DNA profiling) relies on gel electrophoresis to separate PCR-amplified short tandem repeat (STR) fragments from a biological sample — the unique banding pattern can identify individuals with extremely high statistical confidence and has revolutionized criminal investigations since the 1980s. In medical diagnostics, gel electrophoresis is used to screen for genetic disorders: for example, sickle cell anemia can be detected by the altered migration pattern of hemoglobin S on protein gels. Paternity testing, diagnosis of sexually transmitted infections, and detection of foodborne pathogens all rely on electrophoresis-based methods. In research, gel electrophoresis verifies PCR products, confirms restriction enzyme digestion, checks RNA integrity before sequencing experiments, and validates plasmid construction in cloning workflows. Protein gel electrophoresis (SDS-PAGE) uses sodium dodecyl sulfate to denature and give proteins uniform negative charge before separating them by molecular weight — a fundamental technique for protein analysis and Western blotting.",
  },
];

// ─── Quiz ─────────────────────────────────────────────────────────────────────

const GEL_QUIZ: QuizQuestion[] = [
  {
    id: "gel-1",
    question:
      "What is the primary purpose of gel electrophoresis in molecular biology?",
    options: [
      "To amplify specific DNA sequences",
      "To separate DNA, RNA, or proteins by size using an electric field",
      "To sequence the nucleotide order of a DNA strand",
      "To cut DNA at specific restriction sites",
    ],
    correctIndex: 1,
    explanation:
      "Gel electrophoresis separates molecules based on their size and charge by driving them through a gel matrix with an electric field. Smaller fragments move faster and travel farther; larger fragments are impeded and stay near the wells.",
    topic: "gel-electrophoresis",
  },
  {
    id: "gel-2",
    question:
      "Why do smaller DNA fragments migrate farther in a gel during electrophoresis?",
    options: [
      "Smaller fragments carry more negative charge per base",
      "Smaller fragments are repelled more strongly by the negative electrode",
      "Smaller fragments pass through gel pores more easily and encounter less resistance",
      "Smaller fragments are denser and sink faster through the gel",
    ],
    correctIndex: 2,
    explanation:
      "The agarose gel acts as a molecular sieve. Smaller fragments weave through the tangled network of pores much more easily than larger fragments, which are significantly impeded by the gel matrix. This size-dependent friction is the basis of separation.",
    topic: "gel-electrophoresis",
  },
  {
    id: "gel-3",
    question:
      "What is a DNA ladder (molecular weight marker) used for in gel electrophoresis?",
    options: [
      "It provides the electric current that drives DNA migration",
      "It stains the DNA bands so they are visible under UV light",
      "It is a mixture of known-size fragments that allows estimation of unknown fragment sizes",
      "It acts as a negative control to confirm no DNA contamination",
    ],
    correctIndex: 2,
    explanation:
      "A DNA ladder contains a set of DNA fragments of precisely known sizes run in one lane of the gel. After electrophoresis, each ladder band appears at a predictable position based on its size. Researchers compare the migration distance of unknown bands to the ladder to estimate their sizes.",
    topic: "gel-electrophoresis",
  },
  {
    id: "gel-4",
    question:
      "What polymer forms the matrix of the most common nucleic acid electrophoresis gel?",
    options: ["Polyacrylamide", "Cellulose", "Agarose", "Gelatin"],
    correctIndex: 2,
    explanation:
      "Agarose, a polysaccharide derived from red seaweed, is the standard matrix for separating DNA and RNA fragments by size. It forms a tangled three-dimensional network of pores when cooled. Polyacrylamide gels are used for higher-resolution separation of proteins and small nucleic acids.",
    topic: "gel-electrophoresis",
  },
  {
    id: "gel-5",
    question:
      "In gel electrophoresis, toward which electrode do DNA fragments migrate, and why?",
    options: [
      "Toward the negative electrode (cathode), because DNA is positively charged",
      "Toward the positive electrode (anode), because DNA has a negative charge from its phosphate backbone",
      "Toward the negative electrode (cathode), because DNA is neutral",
      "DNA does not migrate — the gel moves around it",
    ],
    correctIndex: 1,
    explanation:
      "DNA molecules carry an overall negative charge at physiological pH because of the multiple phosphate groups in the sugar-phosphate backbone. In an electric field, negatively charged molecules are attracted to the positive electrode (anode) and migrate toward it.",
    topic: "gel-electrophoresis",
  },
  {
    id: "gel-6",
    question:
      "Which dye is classically used to visualize DNA bands in an agarose gel under UV light?",
    options: [
      "Coomassie Brilliant Blue",
      "Crystal violet",
      "Methylene blue",
      "Ethidium bromide",
    ],
    correctIndex: 3,
    explanation:
      "Ethidium bromide (EtBr) intercalates between the base pairs of double-stranded DNA and fluoresces bright orange when exposed to UV light, making DNA bands visible. While highly effective, EtBr is a mutagen and many labs now use safer alternatives like SYBR Safe or GelRed.",
    topic: "gel-electrophoresis",
  },
  {
    id: "gel-7",
    question:
      "What technique uses gel electrophoresis as its first step to identify specific DNA sequences on a membrane?",
    options: [
      "PCR (Polymerase Chain Reaction)",
      "CRISPR-Cas9 gene editing",
      "Southern blotting",
      "Flow cytometry",
    ],
    correctIndex: 2,
    explanation:
      "Southern blotting (developed by Edwin Southern in 1975) starts with gel electrophoresis to separate DNA fragments by size, then transfers them to a membrane and uses a labeled probe to detect specific sequences. It is used for gene copy number analysis, transgene confirmation, and genetic disease diagnosis.",
    topic: "gel-electrophoresis",
  },
  {
    id: "gel-8",
    question:
      "How does gel electrophoresis contribute to DNA fingerprinting used in forensic science?",
    options: [
      "It amplifies trace DNA found at a crime scene",
      "It separates PCR-amplified STR fragments to produce a unique banding pattern that identifies individuals",
      "It reads the exact sequence of DNA bases from crime scene evidence",
      "It removes contaminants from DNA before analysis",
    ],
    correctIndex: 1,
    explanation:
      "In DNA fingerprinting (profiling), specific short tandem repeat (STR) regions are first amplified by PCR, then separated by gel electrophoresis. The resulting pattern of band sizes is unique to each individual (except identical twins) and can match suspects to biological evidence.",
    topic: "gel-electrophoresis",
  },
  {
    id: "gel-9",
    question:
      "What is the role of the loading dye added to DNA samples before gel electrophoresis?",
    options: [
      "It denatures the DNA into single strands for better separation",
      "It adds density so samples sink into wells and provides visible tracking dye to monitor migration",
      "It stains the DNA so bands are visible without UV light",
      "It digests the DNA into uniform small fragments",
    ],
    correctIndex: 1,
    explanation:
      "Loading dye contains two components: a dense substance (glycerol or ficoll) that weighs down the sample so it sinks into the well rather than floating out, and tracking dyes (bromophenol blue, xylene cyanol) that migrate at known rates and are visible during the run so the researcher can monitor progress.",
    topic: "gel-electrophoresis",
  },
  {
    id: "gel-10",
    question:
      "How does increasing the agarose concentration of a gel affect the separation of DNA fragments?",
    options: [
      "Higher agarose concentration creates larger pores and is better for large fragments",
      "Higher agarose concentration creates smaller pores and gives better resolution for small fragments",
      "Agarose concentration does not affect pore size or separation",
      "Higher agarose concentration makes DNA migrate toward the negative electrode",
    ],
    correctIndex: 1,
    explanation:
      "Higher agarose concentrations produce a denser gel network with smaller pores, which provides better resolution for separating small DNA fragments (100–500 bp). Lower agarose concentrations (larger pores) are better for resolving large fragments (5–50 kb). Choosing the right concentration is key for optimal separation.",
    topic: "gel-electrophoresis",
  },
];

// ─── Main Component ────────────────────────────────────────────────────────────

export default function GelElectrophoresisSection() {
  return (
    <article
      className="topic-section-biotech"
      style={{ background: "oklch(0.13 0.06 240)", minHeight: "100vh" }}
      aria-labelledby="gel-section-heading"
    >
      <div className="mx-auto max-w-5xl px-4 py-16 sm:px-8">
        {/* Header */}
        <div id="gel-section-heading">
          <SectionHeader
            topicId="gel-electrophoresis"
            title="Gel Electrophoresis"
            subtitle="Separating DNA, RNA, and proteins by size using an electric field — the foundation of molecular biology's most powerful analytical techniques."
          />
        </div>

        {/* Interactive Gel Diagram */}
        <AnimatedEntrance direction="up" delay={0.1}>
          <div
            className="mb-14 rounded-2xl overflow-hidden"
            style={{
              background: "oklch(0.10 0.05 240)",
              border: "1px solid oklch(0.68 0.16 210 / 0.25)",
              boxShadow: "0 8px 48px oklch(0.10 0.05 240 / 0.8)",
            }}
          >
            <div className="px-6 pt-6 pb-2">
              <div className="flex items-center gap-3 mb-1">
                <span
                  className="rounded-full px-3 py-1 text-xs font-semibold tracking-widest uppercase"
                  style={{
                    background: "oklch(0.68 0.16 210 / 0.2)",
                    color: "oklch(0.68 0.16 210)",
                    border: "1px solid oklch(0.68 0.16 210 / 0.4)",
                  }}
                >
                  Interactive Simulation
                </span>
                <span style={{ fontSize: 12, color: "oklch(0.55 0.08 220)" }}>
                  Ethidium bromide visualization included
                </span>
              </div>
              <h3
                className="font-display text-xl font-bold mb-1"
                style={{ color: TEAL }}
              >
                DNA Migration Simulator
              </h3>
              <p
                style={{
                  fontSize: 13,
                  color: "oklch(0.65 0.08 220)",
                  marginBottom: 16,
                }}
              >
                Click <strong style={{ color: TEAL }}>Run Gel</strong> to apply
                100V and watch fragments separate by size. Then activate{" "}
                <strong style={{ color: AMBER }}>UV Stain</strong> to see
                ethidium bromide fluorescence.
              </p>
            </div>
            <div className="px-6 pb-8 flex justify-center overflow-x-auto">
              <GelDiagram />
            </div>
          </div>
        </AnimatedEntrance>

        {/* Explanation Paragraphs */}
        <StaggerContainer className="mb-14 flex flex-col gap-8">
          {EXPLANATIONS.map((para, i) => (
            <StaggerItem key={para.title}>
              <div
                className="rounded-xl p-6"
                style={{
                  background:
                    i % 2 === 0
                      ? "oklch(0.11 0.05 240)"
                      : "oklch(0.13 0.06 250)",
                  border: "1px solid oklch(0.40 0.10 220 / 0.25)",
                }}
              >
                <h3
                  className="font-display text-lg font-bold mb-3"
                  style={{ color: TEAL }}
                >
                  {para.title}
                </h3>
                <p
                  className="leading-relaxed"
                  style={{ color: "oklch(0.82 0.06 220)", fontSize: 15 }}
                >
                  {para.content}
                </p>
              </div>
            </StaggerItem>
          ))}
        </StaggerContainer>

        {/* Key Concepts summary */}
        <AnimatedEntrance direction="up" delay={0.2}>
          <div
            className="mb-14 rounded-2xl p-6"
            style={{
              background: "oklch(0.10 0.05 240)",
              border: "1px solid oklch(0.68 0.16 210 / 0.3)",
            }}
          >
            <h3
              className="font-display text-xl font-bold mb-5"
              style={{ color: TEAL }}
            >
              ⚡ Key Concepts at a Glance
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {[
                {
                  icon: "📏",
                  title: "Size-based separation",
                  desc: "Smaller fragments travel farther; distance is proportional to log(size)",
                },
                {
                  icon: "🔋",
                  title: "Electric field",
                  desc: "DNA migrates toward positive electrode (anode) due to negative charge",
                },
                {
                  icon: "🧫",
                  title: "Agarose matrix",
                  desc: "Pore size tuned by concentration — 0.5% for large DNA, 3% for small fragments",
                },
                {
                  icon: "🔬",
                  title: "DNA ladder",
                  desc: "Reference lane of known sizes used to estimate unknown fragment lengths",
                },
                {
                  icon: "🔵",
                  title: "EtBr staining",
                  desc: "Intercalates in DNA, fluoresces orange under UV — reveals band positions",
                },
                {
                  icon: "🧬",
                  title: "Applications",
                  desc: "Forensics, diagnostics, gene cloning verification, Southern blotting",
                },
              ].map(({ icon, title, desc }) => (
                <div
                  key={title}
                  className="flex items-start gap-3 rounded-lg p-4"
                  style={{
                    background: "oklch(0.13 0.06 240)",
                    border: "1px solid oklch(0.40 0.10 220 / 0.2)",
                  }}
                >
                  <span style={{ fontSize: 22, lineHeight: 1 }}>{icon}</span>
                  <div>
                    <div
                      style={{
                        color: TEAL,
                        fontWeight: 700,
                        fontSize: 13,
                        marginBottom: 2,
                      }}
                    >
                      {title}
                    </div>
                    <div
                      style={{ color: "oklch(0.72 0.06 220)", fontSize: 12 }}
                    >
                      {desc}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </AnimatedEntrance>

        {/* Quiz */}
        <AnimatedEntrance direction="up" delay={0.15}>
          <div
            className="rounded-2xl overflow-hidden"
            style={{
              border: "1px solid oklch(0.68 0.16 210 / 0.3)",
            }}
          >
            <div
              className="px-6 py-4"
              style={{
                background: "oklch(0.10 0.05 240)",
                borderBottom: "1px solid oklch(0.40 0.10 220 / 0.2)",
              }}
            >
              <h3
                className="font-display text-xl font-bold"
                style={{ color: TEAL }}
              >
                🧪 Test Your Knowledge
              </h3>
              <p
                style={{
                  fontSize: 13,
                  color: "oklch(0.60 0.06 220)",
                  marginTop: 4,
                }}
              >
                10 questions covering gel electrophoresis principles and
                applications
              </p>
            </div>
            <div style={{ background: "oklch(0.11 0.05 240)" }}>
              <QuizEngine questions={GEL_QUIZ} topicId="gel-electrophoresis" />
            </div>
          </div>
        </AnimatedEntrance>
      </div>
    </article>
  );
}
