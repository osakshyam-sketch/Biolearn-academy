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
      "Crank up the heat! At 95°C, the hydrogen bonds holding the two DNA strands together snap open — like a zip being pulled apart. The double helix separates into two single strands. Each strand now serves as a template that can be copied. This step is why we need Taq polymerase — a regular enzyme would fall apart at this temperature, but Taq was designed by nature to thrive in near-boiling conditions.",
    color: "oklch(0.60 0.19 22)",
    dimColor: "oklch(0.60 0.19 22 / 0.12)",
  },
  {
    id: "annealing",
    label: "Annealing",
    temp: "55–65 °C",
    description:
      "Cool down to 55–65°C. The primers — short pieces of DNA that mark your target — drift through the solution and find their matching sequences on the single-stranded template. When a primer finds its match, it sticks to it through base pairing. One primer binds to the start of your target, one to the end. Together they mark exactly what gets copied. The exact temperature here is critical — too hot and nothing sticks; too cool and primers stick to the wrong places.",
    color: "oklch(0.52 0.14 195)",
    dimColor: "oklch(0.52 0.14 195 / 0.12)",
  },
  {
    id: "extension",
    label: "Extension",
    temp: "72 °C",
    description:
      "Warm up to 72°C — Taq polymerase's favourite temperature. Starting from the 3' end of each primer, Taq reads the template and builds a new complementary DNA strand, snapping in matching bases one at a time. It moves at about 1,000 letters per minute. After each cycle, the total amount of DNA roughly doubles. After 30 cycles, one molecule becomes over a billion copies. That's exponential amplification!",
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
    role: "The original DNA you want to copy. It could come from a cheek swab, a drop of blood, a hair root, or even an ancient bone — anything with intact DNA. You can start with just a tiny amount.",
    color: "oklch(0.55 0.14 262)",
  },
  {
    name: "Forward & Reverse Primers",
    symbol: "→←",
    role: "Short DNA sequences (about 18–25 letters each) that act like bookmarks. One marks the start of your target, one marks the end. Change the primers and you copy a completely different region of the genome.",
    color: TEAL,
  },
  {
    name: "Taq Polymerase",
    symbol: "⚙",
    role: "A heat-resistant enzyme from bacteria that live in Yellowstone's boiling hot springs. It survives the 95°C heating step that would destroy any normal enzyme, making automated PCR possible.",
    color: "oklch(0.55 0.16 142)",
  },
  {
    name: "dNTPs",
    symbol: "ATGC",
    role: "The four DNA building blocks: A, T, G, and C. Taq polymerase snaps them into place one by one to build the new DNA strand. If you run out of dNTPs, the reaction stops mid-copy.",
    color: "oklch(0.58 0.16 52)",
  },
  {
    name: "MgCl₂ & Buffer",
    symbol: "Mg²⁺",
    role: "Magnesium ions are a critical helper that Taq polymerase absolutely needs to function. The buffer keeps the pH stable so nothing breaks down during the heating and cooling cycles.",
    color: "oklch(0.60 0.18 36)",
  },
  {
    name: "Thermal Cycler",
    symbol: "♨",
    role: "The machine that does all the work — it precisely cycles between three temperatures, over and over, 25–40 times automatically. A typical run of 35 cycles takes about 1.5 hours.",
    color: "oklch(0.55 0.16 290)",
  },
];

// ── Explanation paragraphs ─────────────────────────────────────────────────────

const EXPLANATIONS = [
  {
    id: "intro",
    anchorId: "pcr-standard",
    heading: "PCR: The DNA Photocopier That Changed Everything",
    body: `Imagine you have one specific sentence buried inside a book that's three billion letters long — and you need to copy that sentence billions of times so you can actually study it. That's exactly what PCR does. The idea came to Kary Mullis in 1983 while he was driving along a California highway at night. He pulled over and scribbled notes in the dark, and within a few years his idea became one of the most transformative tools in the history of science. He won the Nobel Prize in Chemistry in 1993.

Before PCR, studying a specific gene was extraordinarily difficult. You needed enormous amounts of starting material, and the techniques were slow, radioactive, and exhausting. A cheek swab, a few skin cells left on a door handle, a strand of hair — these were essentially useless for DNA analysis before PCR. After PCR, any of these tiny samples could yield enough DNA to work with in a few hours. Today, PCR appears in virtually every molecular biology experiment ever done. Understanding how it works gives you the foundation for understanding COVID testing, cancer diagnostics, forensic DNA, ancient DNA research — and dozens of other technologies.`,
  },
  {
    id: "components",
    anchorId: "pcr-components",
    heading: "What's Actually Inside a PCR Tube?",
    body: `A PCR reaction looks like a tiny, colourless drop of liquid — but inside it contains everything needed to copy a specific piece of DNA billions of times. Let's go through each ingredient simply.

Template DNA is your starting material — the original DNA that contains the sequence you want. You don't need much; PCR can technically work from just a single molecule. Primers are two short DNA sequences (about 18–25 letters each) that act as bookmarks — they find and stick to the two ends of your target. One goes at the start, one at the end. Change the primers and you copy a completely different part of the genome. Taq polymerase is the engine: a heat-resistant enzyme originally found in bacteria living in Yellowstone's boiling hot springs. It reads the template and builds a new copy. dNTPs are the four DNA building blocks (A, T, G, C) that polymerase snaps into place one by one. And magnesium ions are the critical helper that Taq absolutely needs — get this concentration wrong and nothing happens. Every ingredient has a specific job, and all of them must be present for the reaction to work.`,
  },
  {
    id: "denaturation",
    anchorId: "pcr-denaturation",
    heading: "Step 1: Denaturation — Pulling the DNA Strands Apart",
    body: `Every PCR cycle starts with a burst of intense heat — typically 94–95°C. At that temperature, the hydrogen bonds holding the two DNA strands together snap open, and the double helix separates into two individual strands. Each strand is now a template waiting to be copied. This is called denaturation.

Here's an interesting story behind this step: the reason PCR works so smoothly is because of a bacterium called Thermus aquaticus, found living in the scorching hot springs of Yellowstone National Park, where temperatures regularly reach 85–95°C. This bacterium evolved enzymes that function perfectly in near-boiling water. When scientists first figured out PCR, they had to manually add fresh enzyme after every heating step, because normal enzymes would be destroyed by the heat. Using Taq polymerase from Thermus aquaticus solved this completely — the enzyme just sits in the tube through all the heating, totally unharmed. That discovery made PCR automated, practical, and affordable.`,
  },
  {
    id: "annealing",
    anchorId: "pcr-annealing",
    heading: "Step 2: Annealing — Primers Find Their Matching Sequences",
    body: `After the heating step separates the DNA strands, the reaction cools down to 55–65°C. Now, the primers drift through the solution looking for their matching sequences. When a primer finds its match, it sticks to it through complementary base pairing — the same natural attraction that holds the double helix together normally. Once a primer is attached, the polymerase has a starting point and begins copying.

The exact annealing temperature matters a lot. Set it too high and the primers won't bind — the reaction produces nothing. Set it too low and primers might stick to the wrong places, giving you extra unwanted products. The ideal temperature is usually about 5°C below the primer's melting temperature, which depends on how long the primer is and how many G-C pairs it contains (G-C pairs need more energy to separate than A-T pairs). Good primer design is one of the most important skills in PCR — it's often the difference between a reaction that works beautifully and one that gives you puzzling results for weeks.`,
  },
  {
    id: "extension",
    anchorId: "pcr-extension",
    heading: "Step 3: Extension — Building the New Copy",
    body: `At 72°C — Taq polymerase's ideal working temperature — the copying begins. Starting from where the primer is attached, the polymerase reads the template and adds matching DNA letters one at a time, building a new strand. It works at about 1,000 letters per minute. Extension time is set based on how long your target is: a 500-letter target needs about 30 seconds; a 2,000-letter target needs about 2 minutes.

Here's the beautiful maths that makes PCR so powerful. After cycle 1, you've roughly doubled your DNA. After cycle 2, you've doubled it again. After 10 cycles: about 1,000 copies. After 20 cycles: around 1 million. After 30 cycles: over 1 billion. All from a single starting molecule — in about 90 minutes. This exponential growth is why PCR can detect HIV when there are only 50 viral particles in a millilitre of blood, or identify a person from just three skin cells left on a surface. The numbers are almost unbelievable, but the maths of doubling is relentless.`,
  },
  {
    id: "rt-pcr",
    anchorId: "pcr-rt",
    heading: "RT-PCR: When Your Target Is RNA, Not DNA",
    body: `Standard PCR only works on DNA. But many important viruses — including SARS-CoV-2, influenza, and HIV — store their genetic information as RNA. And when scientists want to measure gene expression (how actively a gene is being used in a cell), the relevant molecule is also RNA. Enter RT-PCR: Reverse Transcription PCR.

The reverse transcription step uses an enzyme called reverse transcriptase, which is borrowed from retroviruses like HIV that naturally convert their RNA genome into DNA inside host cells. You incubate the RNA sample with this enzyme and it produces a complementary DNA (cDNA) copy. Then you run regular PCR on that cDNA. One important note: RT-PCR (reverse transcription + PCR) is not the same as real-time qPCR. These terms get mixed up constantly in news coverage. What was used for COVID-19 testing was actually RT-qPCR: the RT step converts viral RNA to cDNA, and then quantitative PCR amplifies and measures it. Every positive COVID test result came from this exact combination.`,
  },
  {
    id: "qpcr",
    anchorId: "pcr-qpcr",
    heading: "qPCR: Measuring How Much DNA You Have",
    body: `Regular PCR tells you whether a DNA sequence is present. qPCR (quantitative PCR, also called real-time PCR) goes further — it tells you exactly how much of it there is. A fluorescent signal is added to the reaction that grows stronger every time a new DNA copy is made. The instrument watches this signal build up cycle by cycle and notes the exact cycle where it first rises above the background noise. This is called the Ct (cycle threshold) value.

Low Ct means the target was present in large amounts — it reached the threshold quickly. High Ct means very little was present — it took many more cycles to build up enough signal. Every 3.3 cycles of difference represents roughly a 10-fold difference in starting amount. In COVID testing, a patient with a Ct of 15 carried vastly more virus than one with a Ct of 35. This is why qPCR is used for measuring viral load in HIV treatment, tracking gene activity when a drug is given, or detecting how many cancer cells are in a sample. It's one of the most powerful measurement tools in modern biology.`,
  },
  {
    id: "digital",
    anchorId: "pcr-digital",
    heading: "Digital PCR: The Most Precise Counting Method in Biology",
    body: `qPCR is incredibly useful, but at very low amounts of target DNA — when only a handful of molecules are present — it can become unreliable. Digital PCR solves this with an elegant idea: instead of measuring one big reaction, split it into thousands of tiny individual reactions. Each one is so small that it contains either one template molecule or none. PCR happens in every compartment at once. When it's done, you count: how many compartments lit up, and how many stayed dark? That gives you an absolute count without any guesswork.

Droplet digital PCR (ddPCR) creates 20,000 or more tiny oil droplets — each about the size of a cell — and runs PCR in all of them simultaneously. Afterwards, a laser counts fluorescent versus non-fluorescent droplets. This makes ddPCR perfect for detecting cancer-related mutations in blood. Tumours shed small fragments of their DNA into the bloodstream (called circulating tumour DNA). In a background of normal DNA, a cancer mutation might appear in only 1 in every 10,000 molecules. Regular qPCR struggles to detect this; digital PCR can find it reliably. This means doctors could potentially detect cancer recurrence or treatment resistance from a simple blood draw, months before it would show up on any scan.`,
  },
  {
    id: "variants",
    anchorId: "pcr-applications",
    heading: "The PCR Family: Different Tools for Different Problems",
    body: `The core PCR idea has inspired a whole family of techniques, each built to solve a specific problem. Multiplex PCR runs several pairs of primers in one tube at the same time, amplifying multiple targets at once — this is how a modern respiratory test can check for COVID-19, influenza A, influenza B, and RSV all from one swab. Nested PCR uses two rounds of amplification for extra sensitivity: a first pair of primers amplifies a broad region, then a second pair amplifies just the specific target within that. Two layers of specificity make it extraordinarily powerful for detecting rare pathogens.

Hot-start PCR keeps the polymerase inactive until the first high-temperature step, preventing messy side-products that form when everything is mixed at room temperature. Colony PCR lets researchers screen hundreds of bacterial colonies in minutes — touch a toothpick to a colony, drop it in a PCR tube, and a band on the gel tells you which colony has your gene. And LAMP — Loop-Mediated Isothermal Amplification — achieves PCR-level sensitivity without any temperature cycling, at a constant 60°C, with results visible as a colour change by eye. No thermal cycler needed at all. LAMP tests have been used in remote villages, on research ships, and in home testing kits — bringing molecular diagnostics to places that could never access traditional lab equipment. PCR isn't one technique — it's a whole way of thinking about DNA amplification.`,
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
    question: "What is PCR, and why did it change biology so dramatically?",
    options: [
      "A way to read DNA letter by letter — the first method ever to sequence a genome",
      "A technique that makes billions of copies of a specific piece of DNA from a very tiny starting amount — making it possible to study DNA from almost any source",
      "A method to cut DNA at specific locations using special enzymes",
      "A process for transferring DNA from one organism to another using a virus",
    ],
    correctIndex: 1,
    explanation:
      "PCR stands for Polymerase Chain Reaction, and the name tells you exactly what it does — it uses a polymerase enzyme to chain together a reaction that copies DNA over and over. The idea came to Kary Mullis in 1983 while driving at night in California. Before PCR, working with a specific gene required large amounts of starting material and days of difficult work. After PCR, a few cells from a cheek swab, a single hair root, or a drop of ancient blood could yield enough DNA to study in just a couple of hours. Mullis won the Nobel Prize in 1993 for this discovery. Today, PCR is used in COVID testing, cancer diagnosis, forensic science, and almost every molecular biology experiment in the world.",
    topic: "pcr",
  },
  {
    id: "pcr2",
    question:
      "Why does PCR need two primers — a forward and a reverse primer — and what do they do during the annealing step?",
    options: [
      "Two primers are needed because DNA has two strands, and each primer copies one strand from the same starting point",
      "One primer marks the start of your target sequence, the other marks the end — together they define exactly what gets copied. During annealing, they cool down and stick to their matching sequences on the DNA",
      "The two primers need to stick to each other first before attaching to the DNA template",
      "Primers mark where the DNA should be cut, not where it gets copied",
    ],
    correctIndex: 1,
    explanation:
      "Think of primers like bookmarks placed at the start and end of a paragraph you want to copy. The forward primer sticks to one end of your target on one DNA strand, and the reverse primer sticks to the other end on the complementary strand. Together, they define exactly which piece of DNA gets amplified — change the primers and you copy a completely different region. During annealing, the reaction cools to 55–65°C after the DNA has been separated, allowing the primers to find and stick to their matching sequences. The temperature has to be just right: too hot and the primers won't stick; too cold and they might stick in the wrong places. This is why designing good primers is one of the most important parts of setting up a PCR experiment.",
    topic: "pcr",
  },
  {
    id: "pcr3",
    question: "Why is Taq polymerase special, and where does it come from?",
    options: [
      "Taq polymerase comes from human cells and was genetically modified to survive high temperatures",
      "Taq is a heat-resistant enzyme from bacteria that live in Yellowstone's boiling hot springs — it survives the intense heat needed to separate DNA strands, making automatic PCR possible",
      "Taq is a chemical catalyst, not a biological enzyme, which is why it survives high temperatures",
      "Taq polymerase was designed by scientists in the 1960s specifically for PCR",
    ],
    correctIndex: 1,
    explanation:
      "Here's a wonderful example of nature solving a problem before scientists even knew they had it. Thermus aquaticus is a bacterium discovered in the boiling hot springs of Yellowstone National Park, where water temperatures reach 85–95°C. This bacterium evolved enzymes that work perfectly in near-boiling conditions. When PCR was first invented, scientists had to add fresh regular polymerase after every heating step because the heat destroyed it — imagine doing that 30 times in one experiment! Once researchers started using Taq polymerase, the enzyme survived every heating step intact, sitting in the tube through the entire reaction. Suddenly PCR could run automatically in a thermal cycler machine. That one discovery — a hot spring bacterium in Wyoming — made PCR the universal tool it is today.",
    topic: "pcr",
  },
  {
    id: "pcr4",
    question: "In qPCR, what does the Ct value tell you about a sample?",
    options: [
      "The Ct value tells you the temperature at which your DNA melted apart",
      "The Ct value is the PCR cycle at which fluorescence first rises above background noise — a lower Ct means more starting material was present; a higher Ct means very little was there",
      "The Ct value tells you how many different DNA sequences are in your sample",
      "Ct stands for 'copy total' — the exact number of DNA molecules in the sample",
    ],
    correctIndex: 1,
    explanation:
      "qPCR doesn't just tell you whether DNA is present — it tells you how much was there to begin with. Here's how it works: a fluorescent signal is added that grows stronger every time a new DNA copy is made. A detector watches this signal build up cycle by cycle, and notes the exact cycle where it first rises clearly above the background level. That's the Ct value — the cycle threshold. Because PCR doubles the DNA every cycle, something that reaches the threshold at cycle 15 had a LOT more starting material than something that only reaches it at cycle 35. Each 3.3 cycles difference represents a roughly 10-fold difference in starting amount. This is how COVID tests could tell the difference between someone with a heavy infection (low Ct around 15–20) and someone with only a trace of virus (high Ct around 37–39).",
    topic: "pcr",
  },
  {
    id: "pcr5",
    question:
      "What is the difference between SYBR Green and TaqMan probes in qPCR?",
    options: [
      "SYBR Green detects RNA; TaqMan probes only detect DNA",
      "SYBR Green is a dye that glows whenever any double-stranded DNA is present — simple and cheap but not specific to your exact target; TaqMan probes only glow when your specific target sequence is copied — far more accurate",
      "TaqMan probes are used in standard PCR; SYBR Green is only for real-time detection",
      "SYBR Green uses radioactivity; TaqMan uses fluorescence",
    ],
    correctIndex: 1,
    explanation:
      "This is a really practical distinction to understand. SYBR Green is like a dye that lights up whenever any double-stranded DNA is present — it doesn't distinguish between your target and any other DNA that happened to get amplified by mistake. It's cheap and flexible, but you have to be careful that your primers are very specific. TaqMan probes are much more precise. They're short DNA sequences designed to match the inside of your specific target region, with a fluorescent dye on one end and a 'quencher' on the other. While the probe is intact, it doesn't glow. As the polymerase copies through the probe, it chews the probe apart, separating the dye from the quencher — and it lights up. Only your exact target triggers the signal. This is why clinical diagnostic tests like COVID-19 tests use TaqMan probes — you need to be absolutely certain you're detecting the right thing.",
    topic: "pcr",
  },
  {
    id: "pcr6",
    question: "Why is RT-PCR used to detect COVID-19 instead of standard PCR?",
    options: [
      "RT-PCR is more sensitive because it runs more cycles than standard PCR",
      "SARS-CoV-2 stores its genetic information as RNA, not DNA — so reverse transcriptase must first convert the viral RNA into DNA, which can then be amplified by regular PCR",
      "RT-PCR stands for 'Rapid Thermal PCR' — it was designed to run faster in clinical settings",
      "Standard PCR cannot work with saliva or nasal swab samples, so RT-PCR was created for diagnostic use",
    ],
    correctIndex: 1,
    explanation:
      "This is an important distinction to understand. Standard PCR only works with DNA. But the coronavirus SARS-CoV-2 — like influenza, HIV, and many other viruses — carries its genetic information as RNA, not DNA. To detect it, scientists use a two-step approach. First, an enzyme called reverse transcriptase (borrowed from HIV, which naturally converts its RNA genome into DNA) copies the viral RNA into complementary DNA (cDNA). Then regular PCR amplifies that cDNA. The full name for what COVID tests actually used was RT-qPCR — the RT step converts RNA to DNA, and then quantitative PCR measures it. Every positive COVID test anyone has ever received used exactly this combination of two elegant biological tools working together.",
    topic: "pcr",
  },
  {
    id: "pcr7",
    question:
      "What makes digital PCR (ddPCR) better than regular qPCR for detecting very rare mutations?",
    options: [
      "ddPCR is faster because it skips the temperature cycling steps",
      "ddPCR splits the reaction into thousands of tiny droplets so each droplet contains either zero or one DNA molecule — then you simply count positive droplets, giving an exact number and detecting variants as rare as 1 in 10,000 molecules",
      "ddPCR uses a different polymerase with no errors, making it more accurate",
      "Digital PCR doesn't need primers, which makes it more accurate",
    ],
    correctIndex: 1,
    explanation:
      "Here's the clever logic behind digital PCR. Regular qPCR measures a relative signal and needs a reference curve to calculate how much DNA you started with. That works well for most purposes, but at very low amounts of DNA it becomes unreliable. Digital PCR does something fundamentally different: it splits the entire reaction into 20,000 or more tiny oil-water droplets. Each droplet is so small that it contains either one DNA molecule or none. PCR runs in all droplets at the same time. Afterwards, you simply count how many droplets lit up (contained the target) and how many stayed dark (didn't). It's like counting beans — no reference curve, no guesswork, just an absolute number. For detecting a cancer mutation that appears in only 1 in 10,000 blood cells, this precision is essential. qPCR can't find that signal reliably; digital PCR can.",
    topic: "pcr",
  },
  {
    id: "pcr8",
    question:
      "What is LAMP, and why is it so useful in places without laboratory equipment?",
    options: [
      "LAMP is a PCR variant that uses UV light instead of heat to amplify DNA",
      "LAMP amplifies DNA at a single constant temperature without any thermal cycling — it works in a simple heat block, and results appear as a visible colour change, no specialised equipment needed",
      "LAMP only works for bacterial DNA, not viral RNA",
      "LAMP uses gel electrophoresis to detect results, making it slower than PCR",
    ],
    correctIndex: 1,
    explanation:
      "LAMP — Loop-Mediated Isothermal Amplification — is one of the most practically important molecular biology innovations for global health, and the idea is clever. Standard PCR needs a machine that precisely cycles between three different temperatures. LAMP doesn't need any temperature cycling at all. It works at a constant 60–65°C — any simple heat block works, even a flask of warm water. It uses a special set of 4–6 primers that create self-looping DNA structures that amplify themselves extraordinarily fast, producing a billion copies in 30–60 minutes. The result shows as a visible colour change in the tube — you can see with your own eyes whether it's positive, no special reader needed. LAMP-based tests have been used in remote African villages, on research ships, and in home testing kits. It's democratised molecular diagnostics, making sensitive DNA testing available to anyone, anywhere in the world.",
    topic: "pcr",
  },
  {
    id: "pcr9",
    question:
      "How does forensic DNA profiling use PCR to identify people from tiny samples?",
    options: [
      "PCR copies the entire genome from the sample, which is then compared letter by letter to a suspect's genome",
      "PCR amplifies specific short tandem repeat (STR) regions — naturally varying sequences at about 20 locations in the genome — creating a unique pattern that acts like a DNA fingerprint for each person",
      "PCR creates a fluorescent fingerprint directly from the physical structure of the DNA",
      "PCR amplifies mitochondrial DNA from hair, which is identical in all related individuals",
    ],
    correctIndex: 1,
    explanation:
      "Forensic DNA profiling is one of the most impactful applications of PCR. Here's how it works: throughout your genome, there are regions called Short Tandem Repeats (STRs) — sequences like AGAT repeated over and over. Different people naturally have different numbers of repeats at each location. By looking at about 20 of these STR sites, the specific combination of repeat lengths you have is essentially unique to you. PCR amplifies these regions simultaneously from a tiny sample — even from just a few skin cells. The resulting pattern of band sizes acts as your DNA 'fingerprint.' The probability that two unrelated people share the same profile at all 20 sites is less than 1 in a quintillion. Cold cases have been solved from evidence collected decades ago using exactly this approach. It's a genuinely remarkable power to have as a society.",
    topic: "pcr",
  },
  {
    id: "pcr10",
    question: "What is hot-start PCR and what problem does it solve?",
    options: [
      "Hot-start PCR heats the sample above 100°C first, then cools it slowly to improve strand separation",
      "Hot-start PCR keeps the polymerase inactive until the first high-temperature step — preventing messy nonspecific products from forming when all the ingredients are mixed together at room temperature",
      "Hot-start PCR is a faster version of standard PCR that finishes in under 30 minutes",
      "Hot-start PCR is only used for ancient DNA samples that need gentler conditions",
    ],
    correctIndex: 1,
    explanation:
      "Here's a practical problem that frustrated early PCR users. When you mix all your PCR ingredients together at room temperature, the polymerase is already active. It can start extending primers that accidentally stuck to slightly wrong locations while everything was cold. This creates 'nonspecific products' — extra bands on a gel that aren't what you wanted. Hot-start PCR solves this neatly. The polymerase is blocked by an antibody or chemical cap at room temperature. The block only releases when the reaction hits 95°C in the very first heating step — by which point everything is properly denatured and set up. The polymerase only starts working when conditions are ideal. The result: much cleaner, more specific reactions with fewer extra bands. Most modern PCR kits include hot-start formulations as standard because this small change makes a big practical difference in the quality of results.",
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
        subtitle="PCR is like a molecular photocopier for DNA. Starting from just a tiny sample — even a single cell — it makes billions of copies of a specific piece of DNA in a couple of hours. That one idea unlocked everything from COVID testing to solving cold cases."
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
