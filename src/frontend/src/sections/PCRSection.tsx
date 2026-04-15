import {
  AnimatedEntrance,
  StaggerContainer,
  StaggerItem,
} from "@/components/AnimatedEntrance";
import { QuizEngine } from "@/components/QuizEngine";
import { SectionHeader } from "@/components/SectionHeader";
import type { QuizQuestion } from "@/types/biology";
import { useEffect, useRef, useState } from "react";

// ── PCR accent (teal/cyan) ─────────────────────────────────────────────────────
const TEAL = "oklch(0.52 0.14 195)";
const TEAL_DIM = "oklch(0.52 0.14 195 / 0.12)";
const TEAL_GLOW = "0 0 14px oklch(0.52 0.14 195 / 0.20)";

// ── PCR Thermal-Cycle Animated Diagram ─────────────────────────────────────────

type CyclePhase = "denaturation" | "annealing" | "extension";

interface PhaseInfo {
  id: CyclePhase;
  label: string;
  temp: string;
  description: string;
  color: string;
  dimColor: string;
}

const PHASES: PhaseInfo[] = [
  {
    id: "denaturation",
    label: "Denaturation",
    temp: "95 °C",
    description:
      "Crank up the heat. At 95°C, hydrogen bonds snap and the two strands peel apart. Your double-stranded DNA becomes two single-stranded templates, ready to be copied. GC-rich regions need a little extra convincing — three hydrogen bonds vs two for AT pairs.",
    color: "oklch(0.60 0.19 22)",
    dimColor: "oklch(0.60 0.19 22 / 0.12)",
  },
  {
    id: "annealing",
    label: "Annealing",
    temp: "55–65 °C",
    description:
      "Cool it down to the primer's sweet spot — usually 5°C below Tm. Primers snap onto their complementary sequences, locking in the address of exactly what gets copied. Forward primer on one strand, reverse on the other, flanking your target.",
    color: "oklch(0.52 0.14 195)",
    dimColor: "oklch(0.52 0.14 195 / 0.12)",
  },
  {
    id: "extension",
    label: "Extension",
    temp: "72 °C",
    description:
      "Taq polymerase's sweet spot. It reads the template 3'→5' and builds a new strand 5'→3', snapping in complementary dNTPs at ~1 kb/min. After cycle 2, defined-length products matching your primer pair start accumulating exponentially.",
    color: "oklch(0.55 0.16 142)",
    dimColor: "oklch(0.55 0.16 142 / 0.12)",
  },
];

function BasePairRow({
  y,
  separated,
  primerLeft,
  primerRight,
  extendLeft,
  extendRight,
  phase,
}: {
  y: number;
  separated: boolean;
  primerLeft: boolean;
  primerRight: boolean;
  extendLeft: boolean;
  extendRight: boolean;
  phase: CyclePhase;
}) {
  const LEFT_X = 70;
  const RIGHT_X = 230;
  const CENTER = 150;
  const offset = separated ? 40 : 0;
  const lx = CENTER - offset;
  const rx = CENTER + offset;
  const lStroke = extendLeft
    ? "oklch(0.55 0.16 142)"
    : primerLeft
      ? TEAL
      : "oklch(0.55 0.14 262)";
  const rStroke = extendRight
    ? "oklch(0.55 0.16 142)"
    : primerRight
      ? TEAL
      : "oklch(0.60 0.18 36)";
  return (
    <g>
      <line
        x1={LEFT_X}
        y1={y}
        x2={lx}
        y2={y}
        stroke={lStroke}
        strokeWidth={primerLeft || extendLeft ? 3 : 2}
        style={{ transition: "all 0.5s ease" }}
      />
      <line
        x1={rx}
        y1={y}
        x2={RIGHT_X}
        y2={y}
        stroke={rStroke}
        strokeWidth={primerRight || extendRight ? 3 : 2}
        style={{ transition: "all 0.5s ease" }}
      />
      {phase === "extension" && (
        <line
          x1={lx}
          y1={y}
          x2={rx}
          y2={y}
          stroke="oklch(0.75 0.02 75)"
          strokeWidth={1}
          strokeDasharray="3 3"
          style={{ transition: "all 0.5s ease" }}
        />
      )}
    </g>
  );
}

function PCRDiagram() {
  const [phase, setPhase] = useState<CyclePhase>("denaturation");
  const [cycle, setCycle] = useState(1);
  const [running, setRunning] = useState(true);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const phaseOrder: CyclePhase[] = ["denaturation", "annealing", "extension"];

  useEffect(() => {
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

  function jumpTo(p: CyclePhase) {
    setPhase(p);
    setRunning(false);
    if (intervalRef.current) clearInterval(intervalRef.current);
  }
  function togglePlay() {
    setRunning((r) => !r);
  }

  const info = PHASES.find((p) => p.id === phase)!;
  const separated = phase === "denaturation";
  const annealing = phase === "annealing";
  const extension = phase === "extension";
  const rows = [30, 50, 70, 90, 110, 130, 150, 170];
  const primerRows = [70, 90, 110];
  const copies = cycle <= 10 ? 2 ** cycle : "1024+";

  return (
    <div
      className="rounded-2xl p-5 flex flex-col gap-4"
      style={{
        background: "oklch(0.985 0.008 75)",
        border: "1px solid oklch(0.87 0.02 75)",
        boxShadow: TEAL_GLOW,
      }}
      aria-label="Animated PCR thermal cycle diagram"
      role="img"
    >
      <fieldset
        className="flex gap-2 flex-wrap border-none p-0 m-0"
        aria-label="PCR phase selector"
      >
        {PHASES.map((p) => (
          <button
            key={p.id}
            type="button"
            onClick={() => jumpTo(p.id)}
            aria-pressed={phase === p.id}
            className="rounded-full px-3 py-1 text-xs font-semibold transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2"
            style={{
              background: phase === p.id ? p.color : p.dimColor,
              color: phase === p.id ? "oklch(0.98 0 0)" : p.color,
              border: `1px solid ${p.color}`,
            }}
          >
            {p.label} · {p.temp}
          </button>
        ))}
        <button
          type="button"
          onClick={togglePlay}
          aria-label={running ? "Pause animation" : "Play animation"}
          className="ml-auto rounded-full px-3 py-1 text-xs font-semibold border transition-all focus-visible:outline-none focus-visible:ring-2"
          style={{
            borderColor: TEAL,
            color: TEAL,
            background: running ? TEAL_DIM : "transparent",
          }}
        >
          {running ? "⏸ Pause" : "▶ Play"}
        </button>
      </fieldset>

      <div className="flex items-center gap-3">
        <span className="text-xs" style={{ color: "oklch(0.50 0.04 75)" }}>
          Cycle
        </span>
        <span
          className="font-display text-2xl font-bold"
          style={{ color: TEAL }}
          aria-live="polite"
          aria-label={`Cycle ${cycle}`}
        >
          {cycle}
        </span>
        <span className="text-xs" style={{ color: "oklch(0.55 0.04 75)" }}>
          →
        </span>
        <span className="text-xs" style={{ color: "oklch(0.55 0.16 142)" }}>
          ≈ {copies} copies
        </span>
        <span
          className="ml-auto text-xs font-semibold rounded px-2 py-0.5"
          style={{
            background: `${info.color}15`,
            color: info.color,
            border: `1px solid ${info.color}40`,
          }}
          aria-live="polite"
        >
          {info.temp}
        </span>
      </div>

      <div className="flex flex-col md:flex-row gap-5 items-start">
        <svg
          viewBox="0 0 300 210"
          className="w-full max-w-xs mx-auto"
          aria-hidden="true"
          style={{ filter: `drop-shadow(0 0 6px ${info.color}44)` }}
        >
          <line
            x1="70"
            y1="20"
            x2="70"
            y2="190"
            stroke="oklch(0.82 0.02 75)"
            strokeWidth="1"
            strokeDasharray="2 4"
          />
          <line
            x1="230"
            y1="20"
            x2="230"
            y2="190"
            stroke="oklch(0.82 0.02 75)"
            strokeWidth="1"
            strokeDasharray="2 4"
          />
          {rows.map((y) => (
            <BasePairRow
              key={`row-${y}`}
              y={y}
              separated={separated}
              primerLeft={annealing && primerRows.includes(y)}
              primerRight={annealing && primerRows.includes(y)}
              extendLeft={extension && primerRows.includes(y)}
              extendRight={extension && primerRows.includes(y)}
              phase={phase}
            />
          ))}
          <line
            x1="70"
            y1="20"
            x2="70"
            y2="190"
            stroke="oklch(0.55 0.14 262)"
            strokeWidth="3"
          />
          <line
            x1="230"
            y1="20"
            x2="230"
            y2="190"
            stroke="oklch(0.60 0.18 36)"
            strokeWidth="3"
          />
          {annealing && (
            <>
              <rect
                x="70"
                y="65"
                width="35"
                height="55"
                rx="4"
                fill={TEAL_DIM}
                stroke={TEAL}
                strokeWidth="1.5"
              />
              <text
                x="87"
                y="95"
                textAnchor="middle"
                fontSize="8"
                fill={TEAL}
                fontWeight="bold"
              >
                Primer
              </text>
              <rect
                x="195"
                y="65"
                width="35"
                height="55"
                rx="4"
                fill={TEAL_DIM}
                stroke={TEAL}
                strokeWidth="1.5"
              />
              <text
                x="213"
                y="95"
                textAnchor="middle"
                fontSize="8"
                fill={TEAL}
                fontWeight="bold"
              >
                Primer
              </text>
            </>
          )}
          {extension && (
            <>
              <defs>
                <marker
                  id="arrowGreen"
                  markerWidth="6"
                  markerHeight="6"
                  refX="3"
                  refY="3"
                  orient="auto"
                >
                  <path d="M0,0 L0,6 L6,3 z" fill="oklch(0.55 0.16 142)" />
                </marker>
                <marker
                  id="arrowTeal"
                  markerWidth="6"
                  markerHeight="6"
                  refX="3"
                  refY="3"
                  orient="auto-start-reverse"
                >
                  <path d="M0,0 L0,6 L6,3 z" fill="oklch(0.55 0.16 142)" />
                </marker>
              </defs>
              <line
                x1="105"
                y1="115"
                x2="105"
                y2="180"
                stroke="oklch(0.55 0.16 142)"
                strokeWidth="2"
                markerEnd="url(#arrowGreen)"
              />
              <text
                x="75"
                y="175"
                fontSize="7"
                fill="oklch(0.55 0.16 142)"
                fontWeight="bold"
              >
                New strand
              </text>
              <line
                x1="195"
                y1="115"
                x2="195"
                y2="180"
                stroke="oklch(0.55 0.16 142)"
                strokeWidth="2"
                markerEnd="url(#arrowTeal)"
              />
            </>
          )}
          <text
            x="150"
            y="205"
            textAnchor="middle"
            fontSize="9"
            fill={info.color}
            fontWeight="bold"
          >
            {info.label} · {info.temp}
          </text>
          <text
            x="55"
            y="16"
            fontSize="7"
            fill="oklch(0.55 0.14 262)"
            textAnchor="middle"
          >
            5'
          </text>
          <text
            x="55"
            y="198"
            fontSize="7"
            fill="oklch(0.55 0.14 262)"
            textAnchor="middle"
          >
            3'
          </text>
          <text
            x="245"
            y="16"
            fontSize="7"
            fill="oklch(0.60 0.18 36)"
            textAnchor="middle"
          >
            3'
          </text>
          <text
            x="245"
            y="198"
            fontSize="7"
            fill="oklch(0.60 0.18 36)"
            textAnchor="middle"
          >
            5'
          </text>
        </svg>

        <div className="flex flex-col gap-3 flex-1 min-w-0">
          <div
            className="rounded-xl p-4"
            style={{
              background: info.dimColor,
              border: `1px solid ${info.color}44`,
            }}
          >
            <div className="flex items-center gap-2 mb-2">
              <span
                className="w-2.5 h-2.5 rounded-full shrink-0"
                style={{ background: info.color }}
                aria-hidden="true"
              />
              <span className="font-bold text-sm" style={{ color: info.color }}>
                {info.label}
              </span>
              <span
                className="ml-auto text-xs rounded px-1.5 py-0.5 font-mono"
                style={{ background: `${info.color}15`, color: info.color }}
              >
                {info.temp}
              </span>
            </div>
            <p
              className="text-xs leading-relaxed"
              style={{ color: "oklch(0.35 0.03 75)" }}
            >
              {info.description}
            </p>
          </div>

          <div className="flex flex-col gap-1.5">
            {PHASES.map((p, idx) => (
              <div
                key={p.id}
                className="flex items-center gap-2 text-xs rounded-lg px-3 py-2 transition-all"
                style={{
                  background:
                    phase === p.id ? p.dimColor : "oklch(0.94 0.01 75)",
                  border: `1px solid ${phase === p.id ? p.color : "oklch(0.87 0.02 75)"}`,
                }}
              >
                <span
                  className="w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold shrink-0"
                  style={{
                    background: p.dimColor,
                    color: p.color,
                    border: `1px solid ${p.color}`,
                  }}
                  aria-hidden="true"
                >
                  {idx + 1}
                </span>
                <span
                  style={{
                    color: phase === p.id ? p.color : "oklch(0.45 0.04 75)",
                  }}
                >
                  <strong>{p.label}</strong> · {p.temp}
                </span>
              </div>
            ))}
          </div>

          <div
            className="rounded-xl p-3"
            style={{
              background: "oklch(0.94 0.01 75)",
              border: "1px solid oklch(0.87 0.02 75)",
            }}
          >
            <p
              className="text-[10px] mb-2 font-semibold uppercase tracking-wider"
              style={{ color: "oklch(0.50 0.04 75)" }}
            >
              Exponential amplification
            </p>
            <div
              className="flex items-end gap-0.5 h-8"
              aria-label="DNA copy count grows exponentially"
            >
              {Array.from({ length: Math.min(cycle, 10) }, (_, i) => {
                const barHue = 172 + i * 2;
                const barKey = `bar-cycle${cycle}-pos${i}`;
                return (
                  <div
                    key={barKey}
                    className="flex-1 rounded-t-sm transition-all"
                    style={{
                      height: `${Math.min(100, (i + 1) * 10)}%`,
                      background: `oklch(0.55 0.14 ${barHue})`,
                      opacity: 0.7,
                    }}
                  />
                );
              })}
            </div>
            <p
              className="text-[10px] mt-1"
              style={{ color: "oklch(0.50 0.04 75)" }}
            >
              After {cycle} cycle{cycle !== 1 ? "s" : ""}: ~{copies} DNA copies
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

// ── Component cards ────────────────────────────────────────────────────────────

interface ComponentCardProps {
  name: string;
  symbol: string;
  role: string;
  color: string;
}

function ComponentCard({ name, symbol, role, color }: ComponentCardProps) {
  return (
    <div
      className="rounded-xl p-4 flex flex-col gap-2 transition-all hover:scale-[1.02]"
      style={{
        background: "oklch(0.985 0.008 75)",
        border: `1px solid ${color}25`,
      }}
    >
      <div
        className="w-10 h-10 rounded-full flex items-center justify-center text-lg font-bold shrink-0"
        style={{
          background: `${color}12`,
          border: `2px solid ${color}`,
          color,
        }}
      >
        {symbol}
      </div>
      <p
        className="font-semibold text-sm"
        style={{ color: "oklch(0.28 0.03 75)" }}
      >
        {name}
      </p>
      <p
        className="text-xs leading-relaxed"
        style={{ color: "oklch(0.45 0.04 75)" }}
      >
        {role}
      </p>
    </div>
  );
}

const PCR_COMPONENTS = [
  {
    name: "Template DNA",
    symbol: "🧬",
    role: "The original DNA to be copied — could be from a cheek swab, a hair root, an ancient bone, anything with intact DNA.",
    color: "oklch(0.55 0.14 262)",
  },
  {
    name: "Forward & Reverse Primers",
    symbol: "→←",
    role: "Short ~18-25 nt oligonucleotides flanking the target. GC content 40–60%, Tm ~60°C, 3' end stability critical. Change primers, change what gets amplified.",
    color: TEAL,
  },
  {
    name: "Taq Polymerase",
    symbol: "⚙",
    role: "Heat-stable DNA polymerase from Thermus aquaticus hot-spring bacteria. Survives 95°C denaturation. No proofreading — use Phusion/Q5 for high-fidelity cloning.",
    color: "oklch(0.55 0.16 142)",
  },
  {
    name: "dNTPs",
    symbol: "ATGC",
    role: "dATP, dTTP, dGTP, dCTP — the four DNA building blocks. Taq snaps them in one by one. Run out and the reaction stops mid-strand.",
    color: "oklch(0.58 0.16 52)",
  },
  {
    name: "MgCl₂ & Buffer",
    symbol: "Mg²⁺",
    role: "Mg²⁺ is Taq's essential cofactor — stabilizes the dNTP binding and helps coordinate the phosphodiester bond formation. pH stability from the buffer prevents premature denaturation.",
    color: "oklch(0.60 0.18 36)",
  },
  {
    name: "Thermal Cycler",
    symbol: "♨",
    role: "The machine that does it all — precisely cycling three temperatures, 25–40 times, automatically. Modern cyclers take ~1.5 hours for 35 cycles.",
    color: "oklch(0.55 0.16 290)",
  },
];

// ── Explanation paragraphs ─────────────────────────────────────────────────────

const EXPLANATIONS = [
  {
    id: "intro",
    anchorId: "pcr-standard",
    heading: "What Is PCR and Why Did It Win a Nobel Prize?",
    body: `In 1983, Kary Mullis was driving along California Highway 128 at night when the idea struck him: what if you could copy a specific piece of DNA exponentially? Not just once, but doubling it every cycle until you had billions of copies from a single starting molecule? He pulled over, scribbled notes by flashlight, and effectively invented one of the most important tools in the history of biology. He won the Nobel Prize in Chemistry in 1993 — and rightly so.

Before PCR, detecting a specific DNA sequence in a complex sample required enormous amounts of material, radioactive probes, and days of work. A forensic sample from a hair root, an ancient piece of bone, a few viral copies in a blood sample — these were essentially unworkable. PCR transformed molecular biology's relationship with quantity: when you can amplify any sequence a billionfold, the limiting factor in biology stopped being how much material you had. Today PCR appears in essentially every molecular biology protocol in existence — it's the universal amplifier, the photocopier of genes, and understanding it deeply unlocks almost everything else in the field.`,
  },
  {
    id: "components",
    anchorId: "pcr-components",
    heading: "The Chemistry: What's Actually in a PCR Tube",
    body: `A PCR reaction contains just six things, and understanding each one helps you troubleshoot when things go wrong. Template DNA provides the starting material — it should be reasonably pure (absorbance ratio A260/A280 of ~1.8 for DNA), though PCR is forgiving enough to amplify from crude extracts, dried blood spots, or even ancient bone. Primers are the specificity element: two short oligonucleotides (~18–25 nt) that hybridize to the sequence flanking your target. For good primers, aim for GC content of 40–60%, melting temperatures (Tm) within 2–5°C of each other, no strong secondary structures (hairpins), and no self-complementarity. The 3' end is especially important — a G or C at the 3' end ('GC clamp') improves priming efficiency. Always BLAST check your primers against the whole genome to verify specificity.

Taq polymerase is the engine. It's thermostable (survives 95°C), synthesizes DNA 5'→3' at ~1 kb/min at 72°C, and has no 3'→5' proofreading activity — meaning it makes about 1 error per 1000 bases. For diagnostic PCR, that error rate doesn't matter. For cloning (where you'll express the amplified sequence), use a high-fidelity polymerase like Phusion or Q5 that has proofreading activity and error rates 10–50x lower. Magnesium ions are the hidden critical component: Mg²⁺ concentration affects Taq activity, primer annealing stringency, and product fidelity. Too little Mg²⁺: no product. Too much: nonspecific bands everywhere. The sweet spot is usually 1.5–2.5 mM for standard Taq.`,
  },
  {
    id: "denaturation",
    anchorId: "pcr-denaturation",
    heading: "Step 1 — Denaturation: Unzipping the Double Helix",
    body: `Every PCR cycle begins by heating the reaction to 94–98°C (typically 95°C). At this temperature, the hydrogen bonds holding the two DNA strands together break — the double helix denatures into two single-stranded templates, each one now accessible to primers. The initial denaturation (before cycle 1) usually runs longer — 2 to 5 minutes — to ensure complete melting of all sequences, particularly GC-rich regions which have three hydrogen bonds per base pair compared to two for AT pairs.

The denaturation step is fast — usually just 15–30 seconds per cycle. Taq polymerase can withstand 95°C because it comes from Thermus aquaticus, a bacterium that lives in Yellowstone's boiling hot springs where temperatures reach 85–95°C continuously. The enzyme's protein structure is stabilized by unique hydrophobic cores and modified amino acids that prevent unfolding at temperatures that would instantly destroy a human enzyme. Without this thermostability, you'd have to add fresh enzyme after every denaturation step — which is exactly what researchers had to do before Taq was discovered in 1988. Saiki and colleagues isolated Taq and the modern, automated PCR was born.`,
  },
  {
    id: "annealing",
    anchorId: "pcr-annealing",
    heading: "Step 2 — Annealing: The Art of Primer Design",
    body: `At 55–65°C, the reaction cools and primers compete with the complementary strand to rehybridize with the template. A well-designed primer wins this competition at the exact right temperature — specific enough to bind only its intended target, stable enough to stay bound until extension begins. The annealing temperature is typically set 5°C below the primer's calculated melting temperature (Tm). Getting this right is one of the most important variables in PCR.

Tm calculation isn't simple. The basic formula for short oligos is Tm = 4(G+C) + 2(A+T), but this is very approximate. More accurate calculations use nearest-neighbor thermodynamic parameters that account for stacking interactions between adjacent bases. Most primer design software (Primer3, IDT OligoAnalyzer, NCBI Primer-BLAST) uses these more accurate models. The annealing step is quick — typically 20–30 seconds — but the temperature gradient of the thermal cycler matters: some cyclers aren't as precise as others in hitting the exact setpoint, which is why different machines occasionally give different results with the same protocol. Touchdown PCR exploits this by starting each cycle at a high annealing temperature (increasing specificity) and gradually lowering it over successive cycles — you get the specificity of a high Tm but the efficiency of a lower one.`,
  },
  {
    id: "extension",
    anchorId: "pcr-extension",
    heading: "Step 3 — Extension: Building Billions of Copies",
    body: `At 72°C — Taq's optimal temperature — the extension step creates new DNA strands. Starting from the 3' end of each primer, Taq reads the template strand in the 3'→5' direction and synthesizes a new complementary strand in the 5'→3' direction, incorporating dNTPs one by one. The synthesis rate is ~1 kb per minute, so extension time is set based on amplicon size: a 2 kb product needs ~2 minutes; a 500 bp product needs ~30 seconds. Extend too briefly and you get truncated products; extend too long and nonspecific bands accumulate.

Here's the elegant mathematics of exponential amplification. After cycle 1, you have doubled the amount of template — but both new molecules are 'long' products (they extend indefinitely from the primer). After cycle 2, you get the first 'short' products with defined ends exactly matching your two primer positions. After each subsequent cycle, the short defined-length products double. After 10 cycles: ~1000 copies. After 20 cycles: ~1 million. After 30 cycles: ~1 billion. The 2ⁿ exponential means that even starting from a single DNA molecule, 30 cycles gives you enough material to see clearly on a gel. This is why PCR can detect HIV in a sample containing just 50 viral particles per milliliter, or identify a criminal from the DNA in three skin cells left on a door handle.`,
  },
  {
    id: "rt-pcr",
    anchorId: "pcr-rt",
    heading: "RT-PCR: Turning RNA Into Something You Can Amplify",
    body: `Standard PCR works on DNA, but sometimes your target is RNA — viral genomes, gene expression measurements, COVID-19 detection. Enter RT-PCR (Reverse Transcription PCR). The first step uses an enzyme called reverse transcriptase (RT), borrowed from retroviruses like HIV that naturally convert their RNA genome into DNA. You mix the RNA sample with RT, primers, and dNTPs, incubate at ~42°C, and the enzyme synthesizes a complementary DNA (cDNA) copy of the RNA. Then you do normal PCR on the cDNA.

Critical point that confuses students: RT-PCR is NOT the same as real-time qPCR. RT-PCR = reverse transcription + PCR (detects RNA). Real-time PCR = quantitative PCR (measures how much). RT-qPCR combines both: you convert RNA to cDNA, then quantify it by real-time PCR. The COVID-19 diagnostic test that was performed billions of times globally is RT-qPCR: SARS-CoV-2 has an RNA genome, so RT converts it to cDNA, then qPCR quantifies and confirms the presence of specific viral sequences. A positive test result means the assay detected viral cDNA at a Ct value indicating clinically meaningful viral load.`,
  },
  {
    id: "qpcr",
    anchorId: "pcr-qpcr",
    heading: "Quantitative PCR (qPCR): From Detection to Measurement",
    body: `Regular PCR gives you a yes/no answer: "Is this sequence present?" qPCR adds a number: "How much of it is there?" A fluorescent reporter is added to the reaction. As new DNA accumulates each cycle, fluorescence increases. The instrument reads fluorescence after every extension step and plots an amplification curve. The key output is the Ct value (cycle threshold) — the cycle at which fluorescence first crosses above background noise. Low Ct = lots of starting material. High Ct = very little. Each unit difference in Ct represents roughly a 2x difference in starting quantity.

Two main detection chemistries: SYBR Green intercalates non-specifically into any double-stranded DNA and fluoresces ~1000x brighter when bound. It's cheap and flexible — works with any primer pair — but it detects all amplified DNA including primer-dimers and nonspecific products. The melt curve analysis at the end helps discriminate: your specific product should have a single sharp melting peak. TaqMan probes are more specific: a 20-30 nt oligonucleotide labeled with a fluorescent reporter at the 5' end and a quencher at the 3' end hybridizes inside your amplicon. As Taq extends through the probe, its 5'→3' exonuclease activity clips off the fluorescent label, separating it from the quencher and generating signal. TaqMan probes only work with their specific sequence — no false positives from primer-dimers. The ΔΔCt method uses reference genes (housekeeping genes like GAPDH, beta-actin, or HPRT) to normalize between samples, calculating relative expression differences. Absolute quantification uses a standard curve of known concentrations.`,
  },
  {
    id: "digital",
    anchorId: "pcr-digital",
    heading: "Digital PCR: The Most Precise Quantification Yet",
    body: `Quantitative PCR is impressive, but it has a weakness: it measures relative fluorescence, which requires a standard curve for absolute quantification and can be noisy at very low target abundances. Digital PCR (dPCR) solves this elegantly. The reaction is partitioned into thousands to millions of individual chambers — either physical partitions (chip-based digital PCR) or water-in-oil droplets (droplet digital PCR, ddPCR from Bio-Rad). Each partition contains either zero or one template molecule. PCR runs in every partition simultaneously. After amplification, each partition is either fluorescent (contained a template molecule that amplified) or not. You simply count the positive and negative partitions and use Poisson statistics to calculate the absolute number of starting molecules. No standard curve needed — just counting.

Digital PCR shines where qPCR struggles: detecting rare variants in a large background (1 mutant cell in 10,000 normal cells), measuring copy number variations, quantifying ctDNA (circulating tumor DNA) in liquid biopsies for cancer monitoring, verifying GMO content at precisely defined thresholds, and standardizing reference materials. Liquid biopsy is particularly exciting: a blood draw can yield ctDNA fragments shed by tumors, and ddPCR can detect KRAS mutations or HER2 amplifications from those few fragments in a sea of normal DNA — potentially catching cancer recurrence months before imaging would show it.`,
  },
  {
    id: "variants",
    anchorId: "pcr-applications",
    heading: "The PCR Family: Specialized Variants for Special Problems",
    body: `The core PCR idea has spawned an entire family of techniques. Nested PCR uses two sequential amplification rounds: an outer primer pair amplifies a broad region, then an inner pair amplifies just the target within that product. Two rounds of specificity, extreme sensitivity — useful for detecting rare pathogens in complex clinical samples. Multiplex PCR runs multiple primer pairs simultaneously in one reaction, amplifying several targets at once — that's how current COVID panels detect multiple respiratory viruses from one swab. Hot-start PCR adds a wax barrier or anti-Taq antibody that keeps the enzyme inactive until the first high-temperature denaturation step, preventing nonspecific priming when everything is mixed cold.

Colony PCR screens bacterial colonies directly — pick a colony with a toothpick, dip it into a PCR tube, amplify with primers flanking your cloning site. White colonies on blue-white plates are screened for the right insert in minutes. Long-range PCR uses engineered polymerase mixtures capable of amplifying fragments up to 20–30 kb. And then there's LAMP — Loop-Mediated Isothermal Amplification — which achieves PCR-like sensitivity at a constant 60–65°C, without any thermal cycling at all. LAMP uses a set of 4–6 primers that generate a complex stem-loop structure that amplifies exponentially. The result is 10⁹ copies in 30–60 minutes, detected by eye using a colorimetric dye, without any specialized equipment. That's why LAMP is the foundation for point-of-care diagnostics in field settings, low-resource hospitals, and remote locations where a thermal cycler isn't available.`,
  },
];

// ── PCR Variants table ──────────────────────────────────────────────────────────
const PCR_VARIANTS = [
  ["Variant", "Key Feature", "Best Use Case"],
  [
    "Standard PCR",
    "3-step thermal cycling, Taq polymerase",
    "Routine amplification, genotyping",
  ],
  [
    "RT-PCR",
    "Reverse transcription of RNA → cDNA first",
    "Viral RNA detection (COVID, flu), gene expression",
  ],
  [
    "qPCR / Real-time PCR",
    "Fluorescent detection each cycle, Ct value",
    "Quantifying gene expression, viral load",
  ],
  [
    "RT-qPCR",
    "RT-PCR + real-time quantification",
    "COVID diagnostics, mRNA quantification",
  ],
  [
    "ddPCR",
    "Partitioned into droplets, absolute counting",
    "Liquid biopsy, rare variant detection, GMO testing",
  ],
  [
    "Multiplex PCR",
    "Multiple primer pairs in one tube",
    "Respiratory virus panels, STR genotyping",
  ],
  [
    "Nested PCR",
    "Two sequential rounds of amplification",
    "Rare pathogen detection in complex samples",
  ],
  [
    "Hot-start PCR",
    "Enzyme inactive until first denaturation",
    "Reduces primer-dimers, cleaner results",
  ],
  [
    "LAMP",
    "Isothermal amplification, no thermal cycler",
    "Field diagnostics, resource-limited settings",
  ],
  [
    "Long-range PCR",
    "Polymerase mix amplifies up to 30 kb",
    "Whole-gene amplification, structural variant calling",
  ],
];

// ── Quiz questions ─────────────────────────────────────────────────────────────

const PCR_QUIZ: QuizQuestion[] = [
  {
    id: "pcr1",
    question: "Who invented PCR, in what year, and what did they win for it?",
    options: [
      "Frederick Sanger, 1977 — Nobel Prize for DNA sequencing",
      "Kary Mullis, 1983 — Nobel Prize in Chemistry 1993",
      "James Watson, 1953 — Nobel Prize with Crick and Franklin",
      "Herbert Boyer, 1973 — Nobel Prize with Cohen for recombinant DNA",
    ],
    correctIndex: 1,
    explanation:
      "Kary Mullis had the insight for PCR in 1983 while driving in California and received the Nobel Prize in Chemistry in 1993 — shared with Michael Smith. The key innovation that made it practical was recognizing that thermostable DNA polymerase (Taq from Thermus aquaticus hot-spring bacteria) could survive the repeated denaturation steps, allowing fully automated cycling without adding fresh enzyme every cycle.",
    topic: "pcr",
  },
  {
    id: "pcr2",
    question:
      "What happens molecularly during the annealing step of PCR, and how is annealing temperature chosen?",
    options: [
      "DNA strands separate; temperature chosen to melt G-C bonds preferentially",
      "Primers hybridize to their complementary template sequences; temperature set ~5°C below primer Tm for optimal specificity",
      "Taq polymerase begins synthesizing DNA; temperature is Taq's optimal working temperature",
      "dNTPs are incorporated; temperature prevents premature termination",
    ],
    correctIndex: 1,
    explanation:
      "During annealing, the temperature drops and primers compete with the complementary strand to bind the single-stranded template. The annealing temperature is typically set ~5°C below the primer's melting temperature (Tm). Too high: primers can't bind, no product. Too low: primers bind nonspecifically to off-target sequences, multiple bands. Good primer design — GC content 40–60%, similar Tm for forward and reverse, no hairpins or dimers, GC clamp at 3' end — is essential for getting clean, specific PCR.",
    topic: "pcr",
  },
  {
    id: "pcr3",
    question:
      "Why is Taq polymerase thermostable, and what is its major limitation for cloning applications?",
    options: [
      "Taq comes from cold-adapted organisms and works at low temperatures; it lacks processivity",
      "Taq from Thermus aquaticus hot-spring bacteria survives 95°C cycles; it lacks 3'→5' proofreading, so errors accumulate",
      "Taq is chemically modified in the lab; its limitation is slow synthesis speed",
      "Taq works at all temperatures but lacks an active site for GC-rich sequences",
    ],
    correctIndex: 1,
    explanation:
      "Taq comes from Thermus aquaticus, found in Yellowstone's boiling hot springs — its proteins evolved to function at 85–95°C and not denature when you heat the reaction to 95°C every cycle. Its major limitation is no 3'→5' proofreading exonuclease activity, giving an error rate of roughly 1 per 1,000 bases. For diagnostic PCR (just checking presence/absence), this doesn't matter. For cloning — where you'll express the PCR product — one wrong base can mutate the protein. For cloning, use Phusion, Q5, or other proofreading polymerases with 10–50x lower error rates.",
    topic: "pcr",
  },
  {
    id: "pcr4",
    question:
      "What is the Ct value in qPCR, and what does a Ct of 15 vs a Ct of 35 tell you?",
    options: [
      "Ct is the total number of PCR cycles run; Ct 15 means 15 cycles, Ct 35 means 35 cycles",
      "Ct is the cycle at which fluorescence crosses threshold — Ct 15 indicates abundant starting material, Ct 35 indicates very little",
      "Ct measures reaction temperature in Celsius; higher Ct means higher annealing temperature used",
      "Ct is the primer concentration in the reaction; Ct 15 = 15 nM primer",
    ],
    correctIndex: 1,
    explanation:
      "The Ct (cycle threshold) value is the PCR cycle at which fluorescence first rises above the baseline noise. Since PCR doubles the target each cycle, every 3.3 Ct units represents roughly a 10-fold difference in starting material. Ct 15 means fluorescence crossed threshold very early — you started with a large amount of target (high viral load, high gene expression). Ct 35 means it took 35 cycles before enough product accumulated to detect — you started with very little target. COVID-19 tests often use Ct 40 as the cutoff, meaning any amplification by cycle 40 is considered positive.",
    topic: "pcr",
  },
  {
    id: "pcr5",
    question:
      "What is the difference between SYBR Green and TaqMan probe detection in qPCR?",
    options: [
      "SYBR Green detects RNA; TaqMan detects DNA only",
      "SYBR Green intercalates in any dsDNA (non-specific but cheap); TaqMan uses sequence-specific probes cleaved by Taq's 5' exonuclease (specific but costly)",
      "TaqMan requires reverse transcription; SYBR Green does not",
      "SYBR Green is used for gel visualization; TaqMan is for real-time quantification only",
    ],
    correctIndex: 1,
    explanation:
      "SYBR Green intercalates into any double-stranded DNA and fluoresces brightly. It's non-specific — it will detect your product AND any primer-dimers or nonspecific bands. A melt-curve analysis afterward helps confirm that there's only one product. TaqMan probes bind inside your amplicon between the two primers. As Taq extends, it hits the probe and its 5'→3' exonuclease activity clips off the fluorescent dye from the quencher, generating signal. Only your specific sequence produces signal — much higher specificity, less susceptible to false positives. TaqMan requires probe design and synthesis, which adds cost, but it's the standard for clinical diagnostics.",
    topic: "pcr",
  },
  {
    id: "pcr6",
    question:
      "Why is RT-PCR required for COVID-19 testing instead of standard PCR?",
    options: [
      "Standard PCR cannot be used in clinical settings due to biosafety regulations",
      "SARS-CoV-2 has an RNA genome, and standard PCR only amplifies DNA, so reverse transcriptase must first convert viral RNA to cDNA",
      "RT-PCR is more sensitive than PCR because it amplifies more cycles",
      "Standard PCR cannot amplify viral sequences because viruses lack DNA polymerase",
    ],
    correctIndex: 1,
    explanation:
      "SARS-CoV-2 is a positive-sense single-stranded RNA virus — its genetic material is RNA, not DNA. Standard PCR only works on DNA templates. So before you can amplify and detect the viral genome, you need to reverse transcribe it: an enzyme called reverse transcriptase converts the viral RNA into complementary DNA (cDNA), which then serves as the template for qPCR. The full technique is RT-qPCR: Reverse Transcription + real-time quantitative PCR. The same approach detects influenza, HIV viral load, RSV, hepatitis C, and any other RNA virus.",
    topic: "pcr",
  },
  {
    id: "pcr7",
    question:
      "What makes droplet digital PCR (ddPCR) superior to qPCR for liquid biopsy applications?",
    options: [
      "ddPCR runs at constant temperature, eliminating the need for a thermal cycler",
      "ddPCR partitions reactions into thousands of droplets, enabling absolute quantification without a standard curve and detection of rare variants at 0.01% frequency",
      "ddPCR uses DNA probes instead of RNA primers, improving specificity",
      "ddPCR is cheaper and faster than qPCR for all applications",
    ],
    correctIndex: 1,
    explanation:
      "Liquid biopsy involves detecting circulating tumor DNA (ctDNA) — fragments of tumor genome released into the blood. The challenge: one mutant molecule among thousands of normal molecules. qPCR struggles at such low allele frequencies because background noise obscures rare signals. ddPCR partitions the reaction into 20,000+ droplets; each droplet contains either zero or one template molecule. After PCR, you count fluorescent vs. non-fluorescent droplets. Poisson statistics gives you absolute molecule counts — no standard curve — and you can detect variants present at 0.01% frequency. That's how liquid biopsies can catch cancer recurrence from a blood draw months before imaging detects a tumor.",
    topic: "pcr",
  },
  {
    id: "pcr8",
    question:
      "How does LAMP (Loop-Mediated Isothermal Amplification) differ from PCR, and why is it important for field diagnostics?",
    options: [
      "LAMP requires a thermal cycler like PCR but uses different enzymes",
      "LAMP amplifies DNA at a constant single temperature (no cycling), using 4–6 primers that create self-looping structures, readable by a colorimetric dye without instruments",
      "LAMP only works on RNA targets and is limited to viral diagnostics",
      "LAMP uses gel electrophoresis for detection and is more expensive than standard PCR",
    ],
    correctIndex: 1,
    explanation:
      "The beauty of LAMP is that it's isothermal — it works at a constant 60–65°C with no temperature cycling. It uses a strand-displacing DNA polymerase (typically Bst) and 4–6 primers that generate self-complementary stem-loop structures that amplify themselves recursively. The result: 10⁹ copies in 30–60 minutes, often visible by eye using a pH-sensitive dye that changes color when amplification occurs (turbidity or calcein fluorescence). No thermal cycler, no gel equipment, no specialized training needed. This is why LAMP-based diagnostics have been deployed in rural clinics in sub-Saharan Africa, on research ships, in battlefield medical units, and — with a simple heat block — in home testing kits for COVID-19. It's democratizing molecular diagnostics.",
    topic: "pcr",
  },
  {
    id: "pcr9",
    question:
      "In forensic DNA analysis, PCR amplifies STR loci. What are STRs and why do they create unique identifiers?",
    options: [
      "STRs are mitochondrial mutations unique to each person's maternal lineage",
      "STRs (Short Tandem Repeats) are repetitive sequences whose number of repeats varies between individuals — the pattern across many loci creates a profile unique to each person",
      "STRs are viral integration sites that differ between individuals based on exposure history",
      "STRs are single-nucleotide polymorphisms in protein-coding genes used for medical diagnosis",
    ],
    correctIndex: 1,
    explanation:
      "Short Tandem Repeats (also called microsatellites) are repetitive sequences like (AGAT)n scattered throughout the genome, where different individuals carry different numbers of repeats at each locus. Because they're hypervariable — the number of repeats can change between generations — each person has a unique combination of repeat lengths across ~20 forensic STR loci (the US CODIS system uses 20). PCR amplifies each STR region; capillary electrophoresis separates the fragments by size; the resulting profile has a probability of coincidental match on the order of 1 in a quintillion for unrelated individuals. Cold cases have been solved decades later from degraded samples containing only a few dozen cells.",
    topic: "pcr",
  },
  {
    id: "pcr10",
    question: "What is 'hot-start PCR' and what problem does it solve?",
    options: [
      "PCR started at elevated temperature to improve denaturation of GC-rich sequences",
      "PCR using a Taq antibody or wax barrier that blocks polymerase activity until the first high-temperature step, preventing nonspecific priming at room temperature",
      "PCR performed in a preheated thermal cycler to reduce ramp time",
      "PCR with higher extension temperature (80°C) to improve strand displacement",
    ],
    correctIndex: 1,
    explanation:
      "When you mix all PCR components at room temperature, Taq polymerase is active at low temperatures — it can extend primers that have bound nonspecifically or extend primer-dimers that formed during setup. This generates smear-bands, multiple nonspecific products, and false positives. Hot-start PCR prevents this by inactivating Taq during setup. Two methods: (1) Anti-Taq antibodies that block the active site and denature at 95°C, releasing active enzyme only at denaturation step. (2) Aptamers that fold away from Taq at high temperature. Hot-start PCR gives cleaner results especially for GC-rich templates, multiplex PCR, and any protocol where nonspecific bands are a problem. Most modern diagnostic PCR kits include hot-start formulations.",
    topic: "pcr",
  },
];

// ── Main section ───────────────────────────────────────────────────────────────

export default function PCRSection() {
  return (
    <section
      className="px-6 py-16 max-w-5xl mx-auto"
      data-ocid="pcr-section"
      style={{ background: "oklch(0.97 0.012 75)" }}
    >
      <SectionHeader
        topicId="pcr"
        title="Polymerase Chain Reaction"
        subtitle="The molecular photocopier that changed biology forever — one Nobel Prize-winning idea that now powers everything from COVID tests to ancient DNA research to liquid biopsies."
      />

      <AnimatedEntrance direction="up" delay={0.1}>
        <div className="mb-12">
          <h3
            className="font-display text-xl font-semibold mb-5 flex items-center gap-2"
            style={{ color: TEAL }}
          >
            <span aria-hidden="true">🔁</span>
            PCR Thermal Cycle — Live Animation
          </h3>
          <PCRDiagram />
        </div>
      </AnimatedEntrance>

      <AnimatedEntrance direction="up" delay={0.15}>
        <div className="mb-12">
          <h3
            className="font-display text-xl font-semibold mb-5"
            style={{ color: TEAL }}
          >
            Key PCR Components
          </h3>
          <StaggerContainer
            className="grid grid-cols-2 md:grid-cols-3 gap-4"
            staggerDelay={0.1}
          >
            {PCR_COMPONENTS.map((comp) => (
              <StaggerItem key={comp.name}>
                <ComponentCard {...comp} />
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </AnimatedEntrance>

      <StaggerContainer
        className="flex flex-col gap-6 mb-14"
        staggerDelay={0.08}
      >
        {EXPLANATIONS.map((sec) => (
          <StaggerItem key={sec.id}>
            <div
              id={sec.anchorId}
              className="rounded-2xl p-7"
              style={{
                background: "oklch(0.985 0.008 75)",
                border: "1px solid oklch(0.87 0.02 75)",
                borderLeft: `3px solid ${TEAL}`,
              }}
              data-ocid={`pcr-explanation-${sec.id}`}
            >
              <h3
                className="font-display text-xl font-bold mb-4"
                style={{ color: TEAL }}
              >
                {sec.heading}
              </h3>
              {sec.body.split("\n\n").map((para) => (
                <p
                  key={para.slice(0, 40)}
                  className="leading-relaxed mb-4 last:mb-0 text-[0.95rem]"
                  style={{ color: "oklch(0.30 0.03 75)" }}
                >
                  {para}
                </p>
              ))}
            </div>
          </StaggerItem>
        ))}
      </StaggerContainer>

      {/* PCR Variants Table */}
      <AnimatedEntrance direction="up" delay={0.1}>
        <div
          className="mb-14 rounded-2xl overflow-hidden"
          style={{
            background: "oklch(0.985 0.008 75)",
            border: "1px solid oklch(0.87 0.02 75)",
          }}
        >
          <div
            className="px-5 py-4 border-b"
            style={{ borderColor: "oklch(0.87 0.02 75)" }}
          >
            <h3
              className="font-display text-lg font-bold"
              style={{ color: TEAL }}
            >
              The PCR Family: Variants and Applications
            </h3>
            <p
              className="text-xs mt-1"
              style={{ color: "oklch(0.50 0.04 75)" }}
            >
              Each variant solves a specific problem — choose the right tool for
              the job
            </p>
          </div>
          <div className="overflow-x-auto">
            <table
              className="w-full text-sm"
              aria-label="PCR variants and applications"
            >
              <thead>
                <tr style={{ background: `${TEAL}08` }}>
                  {PCR_VARIANTS[0].map((h) => (
                    <th
                      key={h}
                      scope="col"
                      className="px-4 py-3 text-left text-xs font-bold uppercase tracking-wide"
                      style={{
                        color: TEAL,
                        borderBottom: "1px solid oklch(0.87 0.02 75)",
                      }}
                    >
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {PCR_VARIANTS.slice(1).map((row, ri) => (
                  <tr
                    key={row[0]}
                    style={{
                      background:
                        ri % 2 === 0 ? "transparent" : "oklch(0.96 0.01 75)",
                      borderBottom: "1px solid oklch(0.90 0.015 75)",
                    }}
                  >
                    {row.map((cell, ci) => (
                      <td
                        key={`${row[0]}-${ci}`}
                        className="px-4 py-3 text-xs"
                        style={{
                          color: ci === 0 ? TEAL : "oklch(0.38 0.03 75)",
                          fontWeight: ci === 0 ? "600" : "400",
                        }}
                      >
                        {cell}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </AnimatedEntrance>

      <AnimatedEntrance direction="up" delay={0.1}>
        <div className="mb-4">
          <h3
            className="font-display text-2xl font-bold mb-2"
            style={{ color: TEAL }}
          >
            🔁 Test Your PCR Knowledge
          </h3>
          <p className="mb-6" style={{ color: "oklch(0.45 0.04 75)" }}>
            10 questions covering PCR mechanism, primer design, qPCR, ddPCR,
            RT-PCR, LAMP, forensics, and clinical applications.
          </p>
          <QuizEngine topicId="pcr" questions={PCR_QUIZ} />
        </div>
      </AnimatedEntrance>
    </section>
  );
}
