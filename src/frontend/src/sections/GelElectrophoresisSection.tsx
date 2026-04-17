import {
  AnimatedEntrance,
  StaggerContainer,
  StaggerItem,
} from "@/components/AnimatedEntrance";
import { QuizEngine } from "@/components/QuizEngine";
import { SectionHeader } from "@/components/SectionHeader";
import type { QuizQuestion } from "@/types/biology";
import { useEffect, useRef, useState } from "react";

// ── Gel Electrophoresis diagram colors ────────────────────────────────────────
const TEAL = "oklch(0.52 0.15 185)";
const TEAL_DIM = "oklch(0.44 0.12 185)";
const AMBER = "oklch(0.68 0.16 70)";
const LADDER_COLOR = "oklch(0.60 0.14 210)";
const GEL_BG = "#0f1a3e";

interface GelBand {
  lane: number;
  label: string;
  size: number;
  yPercent: number;
  color: string;
  width: number;
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
  { lane: 1, label: "~4 kb", size: 4000, yPercent: 33, color: TEAL, width: 44 },
  {
    lane: 1,
    label: "~900 bp",
    size: 900,
    yPercent: 63,
    color: TEAL,
    width: 44,
  },
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
  {
    lane: 3,
    label: "~1 kb",
    size: 1000,
    yPercent: 60,
    color: AMBER,
    width: 44,
  },
];

const ALL_BANDS = [...LADDER_BANDS, ...SAMPLE_BANDS];
const LANE_COUNT = 5;
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

function GelDiagram() {
  const [running, setRunning] = useState(false);
  const [progress, setProgress] = useState(0);
  const [done, setDone] = useState(false);
  const [uvMode, setUvMode] = useState(false);
  const rafRef = useRef<number>(0);
  const startRef = useRef<number>(0);
  const DURATION = 3200;

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

  const WELL_Y = 5;
  const GEL_H = 360;
  const GEL_W = 480;
  const LANE_W = GEL_W / LANE_COUNT;
  const gelBg = uvMode ? "#05081a" : GEL_BG;
  const gelBandOpacity = uvMode ? 1 : 0.88;

  return (
    <section
      className="flex flex-col items-center gap-4"
      aria-label="Interactive gel electrophoresis simulation showing DNA band migration"
    >
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
              ? "rgba(0,180,140,0.15)"
              : "oklch(0.52 0.15 185 / 0.18)",
            color: TEAL,
            border: `1.5px solid ${running ? "oklch(0.52 0.15 185 / 0.5)" : TEAL}`,
            boxShadow: running
              ? "none"
              : "0 0 12px oklch(0.52 0.15 185 / 0.25)",
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
                ? "oklch(0.68 0.16 70 / 0.20)"
                : "rgba(220,180,50,0.08)",
              color: uvMode ? AMBER : "oklch(0.60 0.12 70)",
              border: `1.5px solid ${uvMode ? AMBER : "oklch(0.60 0.12 70 / 0.5)"}`,
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
              background: "rgba(220,80,80,0.08)",
              color: "oklch(0.55 0.18 22)",
              border: "1.5px solid oklch(0.55 0.18 22 / 0.5)",
              outlineColor: "oklch(0.55 0.18 22)",
            }}
          >
            ↺ Reset
          </button>
        )}
      </div>

      <div
        className="relative rounded-xl overflow-hidden"
        style={{
          width: GEL_W,
          height: GEL_H + 72,
          background: "#060d26",
          border: "1.5px solid oklch(0.40 0.12 220 / 0.5)",
          boxShadow: uvMode
            ? "0 0 40px oklch(0.52 0.15 185 / 0.30), 0 0 80px oklch(0.52 0.15 185 / 0.12)"
            : "0 4px 32px rgba(0,0,0,0.4)",
        }}
        aria-live="polite"
        aria-atomic="false"
      >
        <div
          className="absolute top-0 left-0 right-0 flex items-center justify-between px-4 pt-2 pb-1 z-20"
          style={{ borderBottom: "1px solid rgba(100,130,255,0.2)" }}
        >
          <span
            style={{
              color: "oklch(0.68 0.14 250)",
              fontSize: 11,
              fontWeight: 700,
            }}
          >
            ⊖ Negative (cathode) — DNA loads here
          </span>
          <span
            style={{
              color: "oklch(0.65 0.16 22)",
              fontSize: 11,
              fontWeight: 700,
            }}
          >
            Positive (anode) ⊕
          </span>
        </div>

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
          aria-label={`Gel electrophoresis diagram. ${done ? "Migration complete." : progress > 0 ? "DNA bands migrating." : "Press Run Gel to start."}`}
        >
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
                    color: "oklch(0.65 0.16 22 / 0.6)",
                    animation: `pulse-glow 1.2s ${ARROW_DELAYS[i]}s infinite`,
                  }}
                >
                  ↓
                </div>
              ))}
            </div>
          )}
        </div>

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

      {done && (
        <section
          className="w-full max-w-lg rounded-xl p-4 animate-fade-in"
          style={{
            background: "oklch(0.96 0.012 75)",
            border: "1px solid oklch(0.52 0.15 185 / 0.25)",
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
                desc: "2 bands: ~4 kb + ~900 bp — two DNA fragments. Could be a plasmid backbone + insert after restriction digest verification.",
                color: TEAL,
              },
              {
                label: "Sample B",
                desc: "3 bands: ~6 kb, ~2 kb, ~500 bp — larger plasmid with multiple fragments. Consistent with triple restriction digest.",
                color: TEAL,
              },
              {
                label: "Sample C",
                desc: "Single ~1 kb band — matches expected positive control size. PCR amplification verified with one clean product.",
                color: AMBER,
              },
              {
                label: "Neg ctrl",
                desc: "No bands — confirms no contamination, no primer-dimers, reagents clean. Every gel needs this control.",
                color: "oklch(0.55 0.06 0)",
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
                <span style={{ color: "oklch(0.35 0.03 75)" }}>{desc}</span>
              </div>
            ))}
          </div>
          <div
            style={{
              fontSize: 11,
              color: "oklch(0.50 0.04 75)",
              marginTop: 10,
              borderTop: "1px solid oklch(0.87 0.02 75)",
              paddingTop: 8,
            }}
          >
            💡 Compare band positions to the DNA ladder to estimate sizes.
            Log(size) vs distance gives a straight line for accurate
            interpolation.
          </div>
        </section>
      )}

      <div
        className="text-center text-xs"
        style={{ color: "oklch(0.50 0.08 220)" }}
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
          "🔵 UV mode: EtBr intercalated in DNA fluoresces orange. Brightness correlates with DNA quantity in each band."}
      </div>
    </section>
  );
}

// ── Explanations ──────────────────────────────────────────────────────────────

const EXPLANATIONS = [
  {
    anchorId: "gel-agarose",
    title: "Gel Electrophoresis: A DNA Race Through Jelly",
    content:
      "Here's the simplest way to think about gel electrophoresis: imagine a race where smaller runners move faster than bigger ones through an obstacle course. That's exactly what happens with DNA fragments. DNA has a natural negative charge (because of the phosphate groups in its backbone), so when you switch on an electric current, DNA gets pulled toward the positive end — just like opposite poles of a magnet attracting. But here's the clever part: all DNA, big or small, would move at the same speed in water. What slows the bigger pieces down is the gel. Agarose gel (made from a type of red seaweed!) forms a tangled mesh of tiny fibres when it sets. Small DNA fragments zip right through the gaps. Large fragments have to squeeze and twist their way through — scientists actually call this 'reptation' because the DNA wriggles like a reptile. The result? After running the gel for 30–60 minutes, small fragments end up far from the starting point and large fragments stay close. You can now 'read' the size of any fragment by seeing where it landed, compared to a DNA ladder loaded in the first lane. Interesting fact: this same principle works in forensics — the DNA from a single hair cell can be used to identify a person!",
  },
  {
    anchorId: "gel-agarose-setup",
    title: "Setting Up a Gel: Easier Than You'd Think",
    content:
      "Making a gel is actually one of the first things students do in a biology lab — and it's surprisingly simple. You dissolve agarose powder in a special liquid called buffer (by microwaving it until clear), let it cool a little, then pour it into a tray with a comb sticking out. The comb makes little rectangular holes called wells when you pull it out after the gel sets. You load your DNA samples into those wells using a tiny pipette, then run the electric current. The whole gel-making process takes about 30 minutes — most of that is just waiting for it to set. How thick you make the gel matters: a denser gel (2–3% agarose) creates smaller holes and is perfect for separating small DNA pieces; a thinner gel (0.5–0.8%) has bigger holes and is better for large fragments. A 1% gel is the all-purpose standard. You always add 'loading dye' to your samples — this makes them heavier so they sink into the wells (otherwise they'd just float away), and it contains coloured markers that slowly travel through the gel so you can watch the progress without stopping the run. Once done, you stain the gel to make the DNA visible. Easy, elegant, and incredibly powerful.",
  },
  {
    anchorId: "gel-sds-page",
    title: "SDS-PAGE: Sorting Proteins by Size",
    content:
      "DNA is simple to sort because all DNA molecules behave the same way — they're all negatively charged and the only difference is size. Proteins are much trickier. Every protein has its own size, shape, and charge, which means sorting them is like trying to race people who are all different shapes and also carry different loads. SDS-PAGE is the clever solution. SDS (sodium dodecyl sulfate) is a soap-like detergent that unfolds proteins and wraps around them, giving every protein a uniform negative charge proportional to its size. Now they all behave the same way: a big protein has more SDS and more charge, a small protein has less — but the charge-to-size ratio is equal. Add a reducing agent to break any bonds holding protein parts together, and now all proteins are fully unfolded and coated. Run them through a polyacrylamide gel (denser than agarose, better for proteins), and they separate purely by size. Load a protein ladder alongside your samples and you can read off the exact molecular weight of any band you see. This technique is used every single day in biochemistry labs worldwide. Fun fact: the person who invented the most popular version of SDS-PAGE, Walter Laemmli, published his method in 1970, and it has since become one of the most cited scientific papers in history.",
  },
  {
    anchorId: "gel-staining",
    title: "Making Invisible Bands Visible: Staining",
    content:
      "After you run a gel, all the DNA or protein is separated but completely invisible. You need to stain it to see anything. For DNA gels, the classic dye is ethidium bromide (EtBr). It's clever: EtBr slides in between DNA base pairs (this is called intercalation) and when you shine ultraviolet light on the gel, those intercalated molecules glow bright orange. The more DNA in a band, the brighter the glow. However, EtBr can also slip into the DNA of living cells — including your cells — and potentially cause mutations. For this reason, most teaching labs now use safer alternatives like SYBR Safe, which works just as well but is much less hazardous. For protein gels (SDS-PAGE), the go-to stain is Coomassie Brilliant Blue — a dark blue dye that sticks to proteins and turns them a vivid blue against the clear gel background. It can detect about 100 nanograms of protein per band. When you need to detect even tinier amounts, silver staining can pick up as little as 1 nanogram — that's 100 times more sensitive. After staining, you photograph the gel and measure how far each band has traveled to work out sizes from the ladder. Sharp, clean bands mean your experiment worked perfectly.",
  },
  {
    anchorId: "gel-western-blot",
    title: "Western Blotting: Finding One Protein in a Crowd of Thousands",
    content:
      "SDS-PAGE shows you all the proteins in a sample as a series of blue bands. But what if you need to find just one specific protein — say, whether a cancer-related protein is present in a tumor cell? Western blotting is the technique for that. It's like a molecular detective search. After running SDS-PAGE, you transfer all the proteins from the gel onto a special membrane (think of pressing a stamp onto paper — all the protein patterns transfer over, keeping their size-based positions). You then 'block' the membrane by soaking it in milk or albumin solution to prevent antibodies from sticking randomly to it. Next, you add your primary antibody — a protein specially designed to recognize and bind only to your target protein, like a lock that only accepts one specific key. After washing away any loose antibody, you add a secondary antibody that sticks to the primary one and carries a glow-producing enzyme. Add the right chemical, and the enzyme creates light exactly where your target protein is. Photograph it, and you see a dark band at the exact molecular weight of your protein, even though it was hiding among thousands of other proteins. Western blots are used to diagnose HIV, study cancer biology, and verify that gene editing has worked correctly. Really one of the most useful tools in all of biology.",
  },
  {
    anchorId: "gel-2d",
    title: "2D Gel Electrophoresis: A Map of All Your Proteins",
    content:
      "What if you want to look at thousands of proteins at once and see which ones change when a cell becomes cancerous? One gel lane isn't nearly enough. Two-dimensional gel electrophoresis gives each protein its own unique spot on a 2D map, making it possible to compare thousands at a time. Here's how it works: in the first direction, proteins are separated by their isoelectric point (pI) — a unique pH value for each protein where it has zero charge. Run an electric field across a gel strip with a built-in pH gradient from acidic to basic, and each protein migrates until it hits its pI and stops. In the second direction (run at a right angle to the first), proteins are separated by molecular weight using SDS-PAGE. The result is a 2D scatter plot where each protein has a unique position based on its pI and its weight. A typical 2D gel can separate 1,000 to 2,000 individual protein spots. Compare two gels side by side — one from healthy tissue, one from diseased tissue — and you can literally see which proteins appeared, disappeared, or changed in amount. The technique is called proteomics (studying the whole protein set of a cell), and it has been used to discover cancer biomarkers and understand how drugs affect cells.",
  },
  {
    anchorId: "gel-southern-northern",
    title: "Southern, Northern, and Western Blots: A Family of Techniques",
    content:
      "Once Edwin Southern invented his DNA blotting technique in 1975, scientists had so much fun with the naming that they created a whole compass of blotting methods. Southern blotting finds specific DNA sequences among millions of others. Here's how: you run genomic DNA on a gel, denature it into single strands, transfer it to a membrane, then wash the membrane with a 'probe' — a small piece of DNA that's complementary to the gene you're looking for. The probe only sticks where it finds its matching sequence, like a piece of puzzle fitting into the right slot. Where the probe sticks, you see a signal. This tells you which size DNA fragment contains your gene of interest. Northern blotting does the same thing but for RNA — you can find out which genes are being actively expressed and how large the RNA messages are. (Nobody could resist naming it after Southern, even though Edwin Southern never named his own technique after a direction — it was just his surname!) Western blotting (the protein version we discussed above) completes the set. These techniques were game-changers in the 1970s–1990s. Today many labs use PCR-based methods for speed, but blotting techniques remain essential, especially when you need to see the size of the DNA or RNA you're detecting.",
  },
  {
    anchorId: "gel-applications",
    title: "Gel Electrophoresis in the Real World",
    content:
      "Once you understand gel electrophoresis, you start seeing it everywhere. In forensics, a tiny amount of DNA from a crime scene — even from a single shed skin cell — is amplified by PCR and then run through a highly precise form of gel electrophoresis called capillary electrophoresis. The result is a DNA profile unique to that person (unless they have an identical twin). The chance of two unrelated people sharing the same profile is less than one in a quintillion — that's why DNA evidence is so powerful in courts. In hospitals, protein gel patterns in blood serum can flag certain cancers like multiple myeloma. In research labs, gel electrophoresis is the quick sanity check after nearly every experiment: Did my PCR reaction produce the right-sized product? Did my restriction enzymes cut DNA in the right places? Is my RNA intact before I sequence it? Every single day, in tens of thousands of labs around the world, scientists are loading tiny samples into wells and watching bands migrate through gel — a technique invented over 50 years ago that remains just as essential today as when it was first discovered.",
  },
];

// ── Quiz ─────────────────────────────────────────────────────────────────────

const GEL_QUIZ: QuizQuestion[] = [
  {
    id: "gel-1",
    question:
      "DNA is negatively charged, so why do different-sized pieces travel at different speeds through a gel?",
    options: [
      "Larger DNA fragments carry more positive charges that slow them down",
      "In free solution all DNA moves at the same speed — it's the gel's tangled network of fibres that slows bigger fragments more, because they have to twist and squeeze through smaller gaps",
      "Smaller fragments have more hydrogen bonds, making them heavier",
      "The electric field is weaker at the positive end of the gel, slowing large fragments",
    ],
    correctIndex: 1,
    explanation:
      "This is the key insight that makes gel electrophoresis so clever. Every DNA molecule, big or small, has one negative charge per base — so a 100-base fragment and a 10,000-base fragment would race at exactly the same speed in plain water. The gel changes the game completely. Agarose forms a tangled web of tiny fibres with pores throughout it. Small fragments zip through these gaps easily. Large fragments have to wriggle and contort themselves to squeeze through — scientists call this 'reptation,' like a reptile squeezing through narrow spaces. The bigger the fragment, the harder it is to squeeze through, and the shorter the distance it travels. That's why you can read fragment sizes: big fragments stay near the top of the gel, small ones travel all the way to the bottom. Fun fact: if you plot the log of fragment size against the distance traveled, you get a straight line — that's exactly how scientists calculate unknown sizes from a gel.",
    topic: "gel-electrophoresis",
  },
  {
    id: "gel-2",
    question:
      "If you want to separate very small DNA fragments (100–500 bases), should you use a 0.5% or a 3% agarose gel?",
    options: [
      "0.5% gel — lower percentage gels have smaller pores that are better for small fragments",
      "3% gel — higher percentage creates smaller pores that give better separation for small fragments",
      "Agarose percentage doesn't affect separation of small fragments — only voltage matters",
      "0.5% is better because the gel is less viscous, allowing fragments to move faster",
    ],
    correctIndex: 1,
    explanation:
      "Think of it this way: more agarose means a denser mesh, which means smaller pores. Small DNA fragments need those tiny pores to create enough resistance so they actually separate from each other. On a 0.5% gel with large pores, small fragments would zoom through so quickly they'd all pile up at the same spot — no separation at all. On a 3% gel with tight pores, a 150-base fragment and a 400-base fragment will end up noticeably different distances apart, which is exactly what you want. On the other hand, if you're trying to separate huge fragments (thousands of bases), you'd use a 0.5% gel — a 3% gel would stop them almost immediately. Choosing the right percentage for your fragment sizes is one of the first decisions you make when designing a gel experiment, and getting it right makes a big difference.",
    topic: "gel-electrophoresis",
  },
  {
    id: "gel-3",
    question:
      "What does SDS do to proteins in SDS-PAGE, and why is that so useful?",
    options: [
      "SDS stains proteins blue so they can be seen under UV light",
      "SDS unfolds proteins and coats them with a uniform negative charge proportional to their size — so they separate purely by size, making it easy to read molecular weight",
      "SDS cross-links proteins together so they don't diffuse through the gel",
      "SDS removes sugars from proteins so they migrate more predictably",
    ],
    correctIndex: 1,
    explanation:
      "This is one of the cleverest tricks in biochemistry. Proteins naturally come in all sorts of shapes, sizes, and charges — if you just ran them in a gel, they'd separate by all three at once, making it impossible to work out their size. SDS fixes this problem elegantly. SDS is a soap-like detergent that unfolds proteins (think of it like untangling a ball of wool into a straight line) and wraps around them, adding roughly one SDS molecule for every two amino acids. Since SDS is negatively charged, every protein-SDS complex ends up negatively charged in direct proportion to its length. Big protein = lots of SDS = lots of charge; small protein = less SDS = less charge. But crucially, the charge-to-size ratio is equal for all of them. A reducing agent like DTT breaks any internal bonds to fully unfold the protein. Now when you run the gel, the only thing determining how far a protein travels is its molecular weight. Load a protein ladder alongside and you can read off the exact size of any protein. Walter Laemmli invented this system in 1970 and it became one of the most-used methods in all of science.",
    topic: "gel-electrophoresis",
  },
  {
    id: "gel-4",
    question:
      "In a Western blot, what are the two antibodies for and why do you need both?",
    options: [
      "The first antibody stains the background; the second one specifically detects the protein of interest",
      "The primary antibody specifically recognizes your target protein; the secondary antibody binds the primary and carries an enzyme that produces the detectable signal — using two amplifies the signal and lets one secondary work for many different primaries",
      "Both antibodies recognise the same target — two are used for redundancy and a stronger signal",
      "The primary antibody is used in stripping; the secondary is used in fresh probing",
    ],
    correctIndex: 1,
    explanation:
      "The two-antibody system is beautifully smart. The primary antibody is the specific one — you choose it based on exactly what protein you're looking for. If you're studying cancer, you might pick an antibody against p53 or HER2. This antibody binds only to your protein of interest, nothing else. The secondary antibody's job is different: it doesn't know or care about your target protein. It binds the primary antibody (any primary from a certain animal species). The secondary comes with a detection enzyme attached — usually horseradish peroxidase (HRP). Add a chemiluminescent chemical, and HRP makes light wherever your protein is sitting. Why use two antibodies? First, it amplifies the signal — multiple secondary antibodies can pile onto one primary antibody. Second, it's economical: if all your primary antibodies come from rabbits, you only ever need to buy one anti-rabbit secondary. You can use it for every experiment. One secondary antibody serves dozens of different experiments. Smart and cost-effective!",
    topic: "gel-electrophoresis",
  },
  {
    id: "gel-5",
    question:
      "What is Southern blotting and how does it detect a specific gene among millions of DNA fragments?",
    options: [
      "Southern blotting runs gels at high voltage so genes migrate further and are easier to isolate",
      "After gel separation, DNA is transferred to a membrane and soaked with a labelled probe — a piece of DNA complementary to your gene — which sticks only to its matching sequence and lights up, revealing which size fragment contains your gene",
      "Southern blotting uses antibodies against DNA to detect specific sequences",
      "Southern blotting is performed before gel electrophoresis to pre-select fragments",
    ],
    correctIndex: 1,
    explanation:
      "Edwin Southern invented this technique in 1975, and the naming is simply his surname — not a direction. Here's the beauty of it: after you separate millions of DNA fragments by size on a gel, you can't pick out any individual gene — it's lost in the crowd. But by transferring all that DNA to a membrane and then washing it with a 'probe' — a short piece of DNA complementary to your gene of interest, labelled with a glowing or radioactive tag — you let molecular base-pairing do the detective work. The probe only sticks exactly where it finds its matching sequence, like finding a specific word in a book. Everything else washes away. The signal remaining tells you exactly which size fragment your gene lives on, how many copies exist, and whether the gene has been deleted or mutated. Interesting fact: when scientists invented a similar technique for RNA, they called it Northern blotting (to go with Southern), and when a protein detection technique was developed, they called it Western blotting. The compass-points naming stuck because it was too fun to resist.",
    topic: "gel-electrophoresis",
  },
  {
    id: "gel-6",
    question:
      "What are the two jobs of loading dye, and why does it need to be added to every sample?",
    options: [
      "It stains DNA blue for visibility and provides a positive charge to help DNA migrate",
      "It adds density so samples sink into the wells and stay there, and it contains coloured tracking dyes so you can watch how far the gel has run without stopping it",
      "It prevents DNA from degrading and keeps the gel solid",
      "It marks the positive electrode end so you know which direction DNA is migrating",
    ],
    correctIndex: 1,
    explanation:
      "Loading dye does two simple but essential things. First, it adds density — it contains glycerol or a heavy sugar that makes the sample sink down into the well when you pipette it in. Without loading dye, your sample would just float right back out of the well into the buffer solution. Second, the dye contains coloured tracking molecules — usually bromophenol blue (small, travels fast) and xylene cyanol (larger, travels slower). You can see these colours slowly moving down the gel as it runs, without needing to stain or use UV light. When the blue dye front reaches the far end of the gel, you know it's time to stop, or your smallest fragments will run right off the edge and be lost. It's the simplest, cheapest way to monitor your gel in real time. Every sample on every gel needs loading dye — it's one of those small steps you never skip.",
    topic: "gel-electrophoresis",
  },
  {
    id: "gel-7",
    question:
      "What is native PAGE and when would you use it instead of SDS-PAGE?",
    options: [
      "Native PAGE uses a higher voltage for faster separation; SDS-PAGE uses lower voltage for more fragile proteins",
      "Native PAGE runs proteins in their natural folded state — separating by size, shape, and charge all at once — useful when you want to study protein interactions or activity, not just molecular weight",
      "Native PAGE is for DNA; SDS-PAGE is only for proteins",
      "They're the same thing — 'native' just means the protein was expressed naturally rather than recombinantly",
    ],
    correctIndex: 1,
    explanation:
      "SDS-PAGE destroys protein structure — it unfolds everything and coats it with detergent. That's great for finding out how big a protein is, but terrible if you want to know whether it's active, folded correctly, or forming a complex with other proteins. Native PAGE (also called non-denaturing PAGE) skips the SDS completely — proteins run through the gel in their natural, folded state. A protein complex (two or more proteins bound together) travels as one big unit, slower than either protein alone would travel. This tells you the complex exists and how large it is. Enzymes retain their activity in native PAGE, so you can even detect them by staining the gel for enzyme activity. The trade-off is that you can't simply read off molecular weight from a native gel the way you can from an SDS gel, because each protein's shape and charge also affects how it runs. Use native PAGE when you care about function and interactions; use SDS-PAGE when you just need to know size and identity.",
    topic: "gel-electrophoresis",
  },
  {
    id: "gel-8",
    question:
      "In 2D gel electrophoresis, what does isoelectric focusing (the first dimension) separate proteins by?",
    options: [
      "Molecular weight — using a pre-cast SDS gel strip",
      "Isoelectric point (pI) — each protein migrates along a pH gradient until it reaches the pH where it has zero charge and stops",
      "Hydrophobicity — proteins stick to the strip in proportion to how oily they are",
      "Sugar content — glycoproteins separate from non-glycoproteins in the first dimension",
    ],
    correctIndex: 1,
    explanation:
      "Every protein has a special pH — called its isoelectric point (pI) — at which it carries no overall charge. In isoelectric focusing, a gel strip has a smooth pH gradient running from acidic at one end to basic at the other. An electric field is applied, and each protein migrates along the strip. If a protein is positively charged at its starting position, it drifts toward the negative end (higher pH). If it overshoots and becomes negative, it drifts back. It keeps drifting until it reaches exactly the pH that equals its pI — and there it stops, 'focused' precisely at that spot. Different proteins stop at different positions depending on their unique amino acid composition. Then you lay this focused strip on top of an SDS gel and run it in the second direction to separate by molecular weight. Each protein now has two coordinates — its pI and its weight — giving it a unique position in the 2D map. It's a bit like using latitude and longitude to pinpoint a location on a map, but for proteins.",
    topic: "gel-electrophoresis",
  },
  {
    id: "gel-9",
    question:
      "Why is ethidium bromide considered potentially hazardous, and what safer alternatives are used?",
    options: [
      "Ethidium bromide is radioactive and emits gamma radiation",
      "Ethidium bromide intercalates between DNA base pairs — the same property that makes it glow can also interfere with DNA replication in living cells, potentially causing mutations; safer alternatives include SYBR Safe, GelRed, and GelGreen",
      "Ethidium bromide reacts violently with buffer solutions",
      "Ethidium bromide has been directly proven to cause cancer in humans at the doses used in gel staining",
    ],
    correctIndex: 1,
    explanation:
      "Ethidium bromide works because its flat, ring-shaped structure slots perfectly between the stacked base pairs of DNA — this is called intercalation. Under UV light, the intercalated EtBr fluoresces bright orange, making DNA bands very visible. The concern is that EtBr intercalates indiscriminately — it will insert into the DNA of living cells just as readily as into DNA in a gel. If a cell tries to copy DNA with EtBr intercalated, the copying enzyme can lose its place and insert or delete a base. This makes EtBr mutagenic in lab tests. In practice, the small amounts used in gels and proper protective handling (gloves, no eating in the lab) make the risk manageable. But safer alternatives are now standard, especially in teaching labs where students are learning. SYBR Safe has been tested extensively and shows no mutagenic activity — it's equally sensitive to EtBr, works with blue light instead of UV (easier on the eyes), and can be mixed directly into hot agarose before pouring. Interesting note: EtBr was used for decades before its mutagenic potential was widely known, a reminder that 'standard' doesn't always mean 'fully risk-assessed.'",
    topic: "gel-electrophoresis",
  },
  {
    id: "gel-10",
    question:
      "How does forensic DNA profiling using capillary electrophoresis differ from running a standard agarose gel?",
    options: [
      "Capillary electrophoresis uses the same agarose gel but with a finer comb to make smaller wells",
      "Capillary electrophoresis separates fluorescently labeled DNA fragments through a narrow polymer-filled tube with laser detection — fully automated, much higher resolution, and produces a digital peak readout instead of a visual band image",
      "Forensic labs still use regular agarose gels — capillary electrophoresis is only for research",
      "Capillary electrophoresis doesn't use an electric field — it relies on pressure to push DNA through",
    ],
    correctIndex: 1,
    explanation:
      "A standard agarose gel gives you a visual image of bands, but the resolution isn't precise enough to tell the difference between a 152-base and a 155-base fragment — and forensic work needs exactly that level of precision. Capillary electrophoresis solves this. DNA fragments from a crime scene are amplified by PCR with fluorescent dye-labeled primers. These fragments are then injected into a capillary tube — thinner than a human hair — filled with a polymer gel. As they migrate, they pass a laser detector that reads the fluorescent signal at each moment in time. The result is an electropherogram: a graph with sharp peaks at precise positions corresponding to exact fragment lengths. Each peak is accurate to within a single base. Multiple genetic markers (called STR loci) are measured simultaneously in different colour channels. The software automatically identifies every allele across all markers. The whole process is automated and produces a digital result. It can work from an incredibly small amount of DNA — sometimes just a nanogram — which is why cold cases from decades ago are still being solved with this technology today.",
    topic: "gel-electrophoresis",
  },
];

// ── Main Component ────────────────────────────────────────────────────────────

export default function GelElectrophoresisSection() {
  return (
    <article
      className="topic-section-biotech"
      style={{ background: "oklch(0.97 0.012 75)", minHeight: "100vh" }}
      aria-labelledby="gel-section-heading"
    >
      <div className="mx-auto max-w-5xl px-4 py-16 sm:px-8">
        <div id="gel-section-heading">
          <SectionHeader
            topicId="gel-electrophoresis"
            title="Gel Electrophoresis"
            subtitle="Gel electrophoresis uses electricity to sort DNA or proteins by size — like a molecular race where smaller pieces run faster through a maze of gel fibres. It's one of the most elegant and widely used tools in all of biology."
          />
        </div>

        <AnimatedEntrance direction="up" delay={0.1}>
          <div
            className="mb-14 rounded-2xl overflow-hidden"
            style={{
              background: "oklch(0.985 0.008 75)",
              border: "1px solid oklch(0.87 0.02 75)",
              boxShadow: "0 4px 24px oklch(0.52 0.15 185 / 0.08)",
            }}
          >
            <div className="px-6 pt-6 pb-2">
              <div className="flex items-center gap-3 mb-1">
                <span
                  className="rounded-full px-3 py-1 text-xs font-semibold tracking-widest uppercase"
                  style={{
                    background: "oklch(0.52 0.15 185 / 0.10)",
                    color: TEAL,
                    border: "1px solid oklch(0.52 0.15 185 / 0.30)",
                  }}
                >
                  Interactive Simulation
                </span>
                <span style={{ fontSize: 12, color: "oklch(0.50 0.04 75)" }}>
                  Ethidium bromide UV visualization included
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
                  color: "oklch(0.45 0.04 75)",
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

        <StaggerContainer className="mb-14 flex flex-col gap-7">
          {EXPLANATIONS.map((para, i) => (
            <StaggerItem key={para.title}>
              <div
                id={para.anchorId}
                className="rounded-xl p-6"
                style={{
                  background:
                    i % 2 === 0
                      ? "oklch(0.985 0.008 75)"
                      : "oklch(0.975 0.010 75)",
                  border: "1px solid oklch(0.87 0.02 75)",
                  borderLeft: "3px solid oklch(0.52 0.15 185 / 0.5)",
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
                  style={{ color: "oklch(0.30 0.03 75)", fontSize: 15 }}
                >
                  {para.content}
                </p>
              </div>
            </StaggerItem>
          ))}
        </StaggerContainer>

        <AnimatedEntrance direction="up" delay={0.2}>
          <div
            className="mb-14 rounded-2xl p-6"
            style={{
              background: "oklch(0.985 0.008 75)",
              border: "1px solid oklch(0.87 0.02 75)",
            }}
          >
            <h3
              className="font-display text-xl font-bold mb-5"
              style={{ color: TEAL }}
            >
              ⚡ Techniques at a Glance
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {[
                {
                  icon: "🧫",
                  title: "Agarose gel electrophoresis",
                  desc: "0.5–3% gel for DNA/RNA size separation (50 bp–50 kb). TAE or TBE buffer, EtBr or SYBR staining.",
                },
                {
                  icon: "🔬",
                  title: "SDS-PAGE",
                  desc: "Polyacrylamide gel + SDS denatures proteins; separates by MW only. Coomassie or silver stain.",
                },
                {
                  icon: "🧬",
                  title: "Western blot",
                  desc: "SDS-PAGE → transfer → primary Ab → secondary Ab-HRP → ECL. Identifies specific proteins.",
                },
                {
                  icon: "📏",
                  title: "Southern blot",
                  desc: "Genomic DNA separated → membrane transfer → probe hybridization. Detects specific gene fragments.",
                },
                {
                  icon: "🔊",
                  title: "Northern blot",
                  desc: "RNA separated by size → membrane → probe. Detects mRNA expression and transcript size.",
                },
                {
                  icon: "🌀",
                  title: "2D gel electrophoresis",
                  desc: "IEF (pI) + SDS-PAGE (MW). Resolves 1,000–2,000 proteins. Core proteomics discovery tool.",
                },
                {
                  icon: "💉",
                  title: "Capillary electrophoresis",
                  desc: "Automated polymer-filled capillary, laser detection. Forensic STR profiling; high resolution.",
                },
                {
                  icon: "🔵",
                  title: "Pulsed-field gel (PFGE)",
                  desc: "Alternating field directions allow separation of chromosome-sized DNA (50 kb–10 Mb).",
                },
              ].map(({ icon, title, desc }) => (
                <div
                  key={title}
                  className="flex items-start gap-3 rounded-lg p-4"
                  style={{
                    background: "oklch(0.96 0.01 75)",
                    border: "1px solid oklch(0.87 0.02 75)",
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
                    <div style={{ color: "oklch(0.45 0.04 75)", fontSize: 12 }}>
                      {desc}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </AnimatedEntrance>

        <AnimatedEntrance direction="up" delay={0.15}>
          <div
            className="rounded-2xl overflow-hidden"
            style={{ border: "1px solid oklch(0.87 0.02 75)" }}
          >
            <div
              className="px-6 py-4"
              style={{
                background: "oklch(0.985 0.008 75)",
                borderBottom: "1px solid oklch(0.87 0.02 75)",
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
                  color: "oklch(0.50 0.04 75)",
                  marginTop: 4,
                }}
              >
                10 questions covering gel principles, SDS-PAGE, Western blot,
                Southern blot, 2D electrophoresis, and forensic applications
              </p>
            </div>
            <div style={{ background: "oklch(0.97 0.012 75)" }}>
              <QuizEngine questions={GEL_QUIZ} topicId="gel-electrophoresis" />
            </div>
          </div>
        </AnimatedEntrance>
      </div>
    </article>
  );
}
