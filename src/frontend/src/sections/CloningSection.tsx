import {
  AnimatedEntrance,
  StaggerContainer,
  StaggerItem,
} from "@/components/AnimatedEntrance";
import { QuizEngine } from "@/components/QuizEngine";
import { SectionHeader } from "@/components/SectionHeader";
import type { QuizQuestion } from "@/types/biology";
import type React from "react";
import { useEffect, useRef, useState } from "react";

// ── Accent palette (teal/green) ─────────────────────────────────────────────────
const C = {
  teal: "oklch(0.50 0.14 160)",
  tealLight: "oklch(0.65 0.12 160)",
  tealDim: "oklch(0.50 0.14 160 / 0.12)",
  cyan: "oklch(0.52 0.14 195)",
  geneA: "oklch(0.58 0.18 36)",
  geneB: "oklch(0.55 0.16 290)",
  bacteria: "oklch(0.55 0.14 262)",
  ligase: "oklch(0.52 0.14 142)",
} as const;

const borderTeal = "1px solid oklch(0.50 0.14 160 / 0.35)";
const borderFaint = "1px solid oklch(0.87 0.02 75)";

// ── Step metadata ──────────────────────────────────────────────────────────────
const STEPS = [
  { id: "step-cut", label: "1. Restriction Digest", short: "Cut" },
  { id: "step-sticky", label: "2. Prepare Sticky Ends", short: "Sticky Ends" },
  { id: "step-ligate", label: "3. Ligate Gene into Plasmid", short: "Ligate" },
  { id: "step-transform", label: "4. Transform Bacteria", short: "Transform" },
  { id: "step-select", label: "5. Select Colonies", short: "Select" },
  { id: "step-express", label: "6. Express Gene Product", short: "Express" },
] as const;

type StepId = (typeof STEPS)[number]["id"];

// ── SVG helpers ────────────────────────────────────────────────────────────────
function StepCut({ active }: { active: boolean }) {
  return (
    <svg
      viewBox="0 0 300 300"
      width="300"
      height="300"
      aria-label="Restriction enzyme cutting circular plasmid at recognition site"
      role="img"
    >
      <defs>
        <filter id="gcut-b">
          <feDropShadow dx="0" dy="0" stdDeviation="4" floodColor={C.geneB} />
        </filter>
        <filter id="gcut-t">
          <feDropShadow dx="0" dy="0" stdDeviation="3" floodColor={C.teal} />
        </filter>
        {active && (
          <marker
            id="arr-cut"
            markerWidth="6"
            markerHeight="6"
            refX="3"
            refY="3"
            orient="auto"
          >
            <path d="M0,0 L6,3 L0,6 Z" fill={C.teal} />
          </marker>
        )}
      </defs>
      <circle
        cx="150"
        cy="150"
        r="90"
        fill="none"
        stroke={C.geneB}
        strokeWidth="10"
        filter="url(#gcut-b)"
      />
      <circle
        cx="150"
        cy="60"
        r="10"
        fill={C.teal}
        filter="url(#gcut-t)"
        style={{
          animation: active ? "pulse-glow 1.4s ease-in-out infinite" : "none",
        }}
      />
      <text
        x="150"
        y="38"
        textAnchor="middle"
        fontSize="11"
        fill={C.teal}
        fontFamily="DM Sans,sans-serif"
      >
        Recognition Site
      </text>
      <text
        x="150"
        y="162"
        textAnchor="middle"
        fontSize="13"
        fill={C.geneB}
        fontFamily="DM Sans,sans-serif"
        fontWeight="600"
      >
        Plasmid
      </text>
      <text
        x="150"
        y="178"
        textAnchor="middle"
        fontSize="11"
        fill={C.tealLight}
        fontFamily="DM Sans,sans-serif"
      >
        Restriction Enzyme
      </text>
      <g
        style={{
          transform: active ? "translate(130px,68px)" : "translate(145px,68px)",
          transition: "transform 0.8s ease-in-out",
          opacity: active ? 1 : 0.4,
        }}
      >
        <line
          x1="0"
          y1="0"
          x2="-14"
          y2="-14"
          stroke={C.teal}
          strokeWidth="3"
          strokeLinecap="round"
        />
        <line
          x1="0"
          y1="0"
          x2="14"
          y2="-14"
          stroke={C.teal}
          strokeWidth="3"
          strokeLinecap="round"
        />
        <circle cx="0" cy="0" r="3" fill={C.teal} />
      </g>
      {active && (
        <>
          <path
            d="M135,60 L115,50"
            stroke={C.teal}
            strokeWidth="1.5"
            strokeDasharray="4 2"
            fill="none"
            markerEnd="url(#arr-cut)"
          />
          <path
            d="M165,60 L185,50"
            stroke={C.teal}
            strokeWidth="1.5"
            strokeDasharray="4 2"
            fill="none"
            markerEnd="url(#arr-cut)"
          />
        </>
      )}
    </svg>
  );
}

function StepStickyEnds({ active }: { active: boolean }) {
  return (
    <svg
      viewBox="0 0 300 240"
      width="300"
      height="240"
      aria-label="Sticky ends produced after restriction digest"
      role="img"
    >
      <defs>
        <filter id="gse-b">
          <feDropShadow dx="0" dy="0" stdDeviation="2.5" floodColor={C.geneB} />
        </filter>
        <filter id="gse-a">
          <feDropShadow dx="0" dy="0" stdDeviation="2.5" floodColor={C.geneA} />
        </filter>
        <filter id="gse-t">
          <feDropShadow dx="0" dy="0" stdDeviation="3" floodColor={C.teal} />
        </filter>
      </defs>
      <rect
        x="30"
        y="80"
        width="110"
        height="18"
        rx="4"
        fill={C.geneB}
        filter="url(#gse-b)"
      />
      <rect
        x="160"
        y="80"
        width="110"
        height="18"
        rx="4"
        fill={C.geneA}
        filter="url(#gse-a)"
      />
      <rect
        x="132"
        y="72"
        width="14"
        height="12"
        rx="2"
        fill={C.teal}
        filter="url(#gse-t)"
        style={{
          animation: active ? "pulse-glow 1.2s ease-in-out infinite" : "none",
        }}
      />
      <rect
        x="154"
        y="94"
        width="14"
        height="12"
        rx="2"
        fill={C.teal}
        filter="url(#gse-t)"
        style={{
          animation: active
            ? "pulse-glow 1.2s ease-in-out 0.3s infinite"
            : "none",
        }}
      />
      <text
        x="85"
        y="72"
        textAnchor="middle"
        fontSize="11"
        fill={C.geneB}
        fontFamily="DM Sans,sans-serif"
      >
        Plasmid Fragment
      </text>
      <text
        x="215"
        y="72"
        textAnchor="middle"
        fontSize="11"
        fill={C.geneA}
        fontFamily="DM Sans,sans-serif"
      >
        Target Gene
      </text>
      <text
        x="150"
        y="145"
        textAnchor="middle"
        fontSize="11"
        fill={C.teal}
        fontFamily="DM Sans,sans-serif"
      >
        Sticky Ends (complementary)
      </text>
      <text
        x="150"
        y="165"
        textAnchor="middle"
        fontSize="10"
        fill={C.tealLight}
        fontFamily="DM Sans,sans-serif"
        opacity="0.8"
      >
        AATTC 5' overhang — ready to anneal
      </text>
      <text
        x="150"
        y="185"
        textAnchor="middle"
        fontSize="10"
        fill="oklch(0.50 0.04 75)"
        fontFamily="DM Sans,sans-serif"
      >
        e.g. EcoRI: G|AATTC → 4-nt 5' overhang
      </text>
    </svg>
  );
}

function StepLigate({ active }: { active: boolean }) {
  const junctions = [
    { uid: "jA", x: 150, y: 57 },
    { uid: "jB", x: 231, y: 178 },
  ];
  return (
    <svg
      viewBox="0 0 300 280"
      width="300"
      height="280"
      aria-label="DNA ligase sealing target gene into plasmid"
      role="img"
    >
      <defs>
        <filter id="glig-b">
          <feDropShadow dx="0" dy="0" stdDeviation="4" floodColor={C.geneB} />
        </filter>
        <filter id="glig-a">
          <feDropShadow dx="0" dy="0" stdDeviation="5" floodColor={C.geneA} />
        </filter>
        <filter id="glig-l">
          <feDropShadow dx="0" dy="0" stdDeviation="4" floodColor={C.ligase} />
        </filter>
      </defs>
      <circle
        cx="150"
        cy="145"
        r="88"
        fill="none"
        stroke={C.geneB}
        strokeWidth="9"
        filter="url(#glig-b)"
      />
      <path
        d="M 150,57 A 88,88 0 0,1 231,178"
        fill="none"
        stroke={C.geneA}
        strokeWidth="12"
        strokeLinecap="round"
        filter="url(#glig-a)"
        style={{ opacity: active ? 1 : 0.3, transition: "opacity 0.8s ease" }}
      />
      {junctions.map((pt) => (
        <circle
          key={pt.uid}
          cx={pt.x}
          cy={pt.y}
          r={active ? 9 : 6}
          fill={C.ligase}
          filter="url(#glig-l)"
          style={{
            transition: "r 0.5s ease",
            animation: active ? "pulse-glow 1.3s ease-in-out infinite" : "none",
          }}
        />
      ))}
      <text
        x="150"
        y="145"
        textAnchor="middle"
        fontSize="13"
        fill={C.geneB}
        fontWeight="600"
        fontFamily="DM Sans,sans-serif"
      >
        Plasmid
      </text>
      <text
        x="150"
        y="162"
        textAnchor="middle"
        fontSize="11"
        fill={C.geneA}
        fontFamily="DM Sans,sans-serif"
      >
        Target Gene
      </text>
      <text
        x="108"
        y="48"
        textAnchor="middle"
        fontSize="10"
        fill={C.ligase}
        fontFamily="DM Sans,sans-serif"
      >
        T4 DNA Ligase
      </text>
      <text
        x="258"
        y="196"
        textAnchor="middle"
        fontSize="10"
        fill={C.ligase}
        fontFamily="DM Sans,sans-serif"
      >
        T4 DNA Ligase
      </text>
      {active && (
        <text
          x="150"
          y="220"
          textAnchor="middle"
          fontSize="11"
          fill={C.teal}
          fontFamily="DM Sans,sans-serif"
        >
          ✓ Recombinant Plasmid Formed
        </text>
      )}
    </svg>
  );
}

function StepTransform({ active }: { active: boolean }) {
  const bgDark = "oklch(0.96 0.012 75)";
  return (
    <svg
      viewBox="0 0 300 260"
      width="300"
      height="260"
      aria-label="Recombinant plasmid being inserted into bacterial cell"
      role="img"
    >
      <defs>
        <filter id="gtr-bact">
          <feDropShadow
            dx="0"
            dy="0"
            stdDeviation="6"
            floodColor={C.bacteria}
          />
        </filter>
        <filter id="gtr-b">
          <feDropShadow dx="0" dy="0" stdDeviation="4" floodColor={C.geneB} />
        </filter>
        <filter id="gtr-a">
          <feDropShadow dx="0" dy="0" stdDeviation="3" floodColor={C.geneA} />
        </filter>
      </defs>
      <ellipse
        cx="150"
        cy="160"
        rx="90"
        ry="55"
        fill={bgDark}
        stroke={C.bacteria}
        strokeWidth="4"
        filter="url(#gtr-bact)"
      />
      <ellipse
        cx="150"
        cy="160"
        rx="84"
        ry="49"
        fill="none"
        stroke={C.bacteria}
        strokeWidth="1"
        strokeDasharray="6 4"
        opacity="0.35"
      />
      <path
        d="M240,152 Q270,130 265,100 Q260,75 280,60"
        stroke={C.bacteria}
        strokeWidth="2"
        fill="none"
        strokeLinecap="round"
        opacity="0.6"
      />
      <circle
        cx={active ? 150 : 80}
        cy={active ? 145 : 100}
        r="22"
        fill="none"
        stroke={C.geneB}
        strokeWidth="5"
        filter="url(#gtr-b)"
        style={{ transition: "cx 1s ease, cy 1s ease" }}
      />
      <path
        d={
          active
            ? "M 150,123 A 22,22 0 0,1 171,158"
            : "M 80,78 A 22,22 0 0,1 101,113"
        }
        fill="none"
        stroke={C.geneA}
        strokeWidth="6"
        strokeLinecap="round"
        filter="url(#gtr-a)"
        style={{ transition: "d 1s ease" }}
      />
      <text
        x={active ? 150 : 80}
        y={active ? 155 : 105}
        textAnchor="middle"
        fontSize="10"
        fill={C.geneB}
        fontFamily="DM Sans,sans-serif"
      >
        Plasmid
      </text>
      <text
        x="150"
        y="200"
        textAnchor="middle"
        fontSize="11"
        fill={C.bacteria}
        fontFamily="DM Sans,sans-serif"
        fontWeight="600"
      >
        Bacterial Cell (E. coli)
      </text>
      {active ? (
        <text
          x="150"
          y="232"
          textAnchor="middle"
          fontSize="11"
          fill={C.teal}
          fontFamily="DM Sans,sans-serif"
        >
          ✓ Transformation complete
        </text>
      ) : (
        <text
          x="75"
          y="90"
          textAnchor="middle"
          fontSize="10"
          fill={C.tealLight}
          fontFamily="DM Sans,sans-serif"
        >
          Recombinant Plasmid
        </text>
      )}
    </svg>
  );
}

const COLONIES = [
  { uid: "col-a", cx: 80, cy: 130, r: 18, hasGene: true },
  { uid: "col-b", cx: 135, cy: 100, r: 15, hasGene: false },
  { uid: "col-c", cx: 180, cy: 130, r: 20, hasGene: true },
  { uid: "col-d", cx: 220, cy: 170, r: 14, hasGene: false },
  { uid: "col-e", cx: 100, cy: 175, r: 17, hasGene: true },
  { uid: "col-f", cx: 155, cy: 165, r: 13, hasGene: false },
] as const;

function StepSelect({ active }: { active: boolean }) {
  return (
    <svg
      viewBox="0 0 300 250"
      width="300"
      height="250"
      aria-label="Petri dish with bacterial colonies; transformed colonies highlighted"
      role="img"
    >
      <circle
        cx="150"
        cy="148"
        r="115"
        fill="oklch(0.96 0.012 75)"
        stroke="oklch(0.78 0.06 160)"
        strokeWidth="3"
      />
      <circle
        cx="150"
        cy="148"
        r="108"
        fill="none"
        stroke="oklch(0.72 0.05 160)"
        strokeWidth="1"
        strokeDasharray="8 4"
        opacity="0.4"
      />
      <text
        x="150"
        y="240"
        textAnchor="middle"
        fontSize="10"
        fill="oklch(0.45 0.04 75)"
        fontFamily="DM Sans,sans-serif"
      >
        Antibiotic Selection Plate (ampicillin)
      </text>
      {COLONIES.map((col, i) => (
        <g key={col.uid}>
          <circle
            cx={col.cx}
            cy={col.cy}
            r={col.r}
            fill={col.hasGene ? C.tealDim : "oklch(0.88 0.02 75)"}
            stroke={col.hasGene ? C.teal : "oklch(0.78 0.02 75)"}
            strokeWidth="2"
            style={{
              filter:
                col.hasGene && active
                  ? "drop-shadow(0 0 6px oklch(0.50 0.14 160))"
                  : "none",
              animation:
                col.hasGene && active
                  ? "pulse-glow 1.5s ease-in-out infinite"
                  : "none",
              animationDelay: `${i * 0.25}s`,
            }}
          />
          <text
            x={col.cx}
            y={col.cy + 4}
            textAnchor="middle"
            fontSize="9"
            fill={col.hasGene ? C.teal : "oklch(0.60 0.04 75)"}
            fontFamily="DM Sans,sans-serif"
            fontWeight="600"
          >
            {col.hasGene ? "AmpR" : "dead"}
          </text>
        </g>
      ))}
      <rect
        x="18"
        y="10"
        width="10"
        height="10"
        rx="2"
        fill={C.tealDim}
        stroke={C.teal}
        strokeWidth="1.5"
      />
      <text
        x="32"
        y="20"
        fontSize="9"
        fill={C.teal}
        fontFamily="DM Sans,sans-serif"
      >
        Transformed (AmpR)
      </text>
      <rect
        x="18"
        y="26"
        width="10"
        height="10"
        rx="2"
        fill="oklch(0.88 0.02 75)"
        stroke="oklch(0.78 0.02 75)"
        strokeWidth="1.5"
      />
      <text
        x="32"
        y="36"
        fontSize="9"
        fill="oklch(0.55 0.04 75)"
        fontFamily="DM Sans,sans-serif"
      >
        No plasmid (killed)
      </text>
    </svg>
  );
}

const PROTEIN_DOTS = [
  { uid: "pd-a", x: 190, y: 118 },
  { uid: "pd-b", x: 212, y: 130 },
  { uid: "pd-c", x: 212, y: 150 },
  { uid: "pd-d", x: 190, y: 162 },
] as const;

function StepExpress({ active }: { active: boolean }) {
  const bgDark = "oklch(0.96 0.012 75)";
  return (
    <svg
      viewBox="0 0 300 260"
      width="300"
      height="260"
      aria-label="Bacterium expressing recombinant protein product"
      role="img"
    >
      <defs>
        <filter id="gex-bact">
          <feDropShadow
            dx="0"
            dy="0"
            stdDeviation="7"
            floodColor={C.bacteria}
          />
        </filter>
        <filter id="gex-b">
          <feDropShadow dx="0" dy="0" stdDeviation="3" floodColor={C.geneB} />
        </filter>
        <filter id="gex-a">
          <feDropShadow dx="0" dy="0" stdDeviation="2.5" floodColor={C.geneA} />
        </filter>
        <filter id="gex-t">
          <feDropShadow dx="0" dy="0" stdDeviation="3" floodColor={C.teal} />
        </filter>
        <marker
          id="arr-expr"
          markerWidth="6"
          markerHeight="6"
          refX="3"
          refY="3"
          orient="auto"
        >
          <path d="M0,0 L6,3 L0,6 Z" fill={C.ligase} />
        </marker>
      </defs>
      <ellipse
        cx="150"
        cy="140"
        rx="95"
        ry="58"
        fill={bgDark}
        stroke={C.bacteria}
        strokeWidth="4"
        filter="url(#gex-bact)"
      />
      <circle
        cx="130"
        cy="128"
        r="20"
        fill="none"
        stroke={C.geneB}
        strokeWidth="4"
        filter="url(#gex-b)"
      />
      <path
        d="M 130,108 A 20,20 0 0,1 149,140"
        fill="none"
        stroke={C.geneA}
        strokeWidth="5"
        strokeLinecap="round"
        filter="url(#gex-a)"
      />
      <path
        d="M155,128 L175,128"
        stroke={C.ligase}
        strokeWidth="2"
        markerEnd="url(#arr-expr)"
      />
      {active ? (
        PROTEIN_DOTS.map((p, i) => (
          <circle
            key={p.uid}
            cx={p.x}
            cy={p.y}
            r={7}
            fill={C.teal}
            filter="url(#gex-t)"
            style={{
              animation: "pulse-glow 1.2s ease-in-out infinite",
              animationDelay: `${i * 0.2}s`,
              opacity: 0.9,
            }}
          />
        ))
      ) : (
        <circle
          cx="200"
          cy="135"
          r="10"
          fill={C.tealDim}
          stroke={C.teal}
          strokeWidth="2"
          opacity="0.4"
        />
      )}
      {active && (
        <>
          <text
            x="210"
            y="188"
            textAnchor="middle"
            fontSize="10"
            fill={C.teal}
            fontFamily="DM Sans,sans-serif"
            fontWeight="600"
          >
            Protein Product
          </text>
          <text
            x="210"
            y="200"
            textAnchor="middle"
            fontSize="9"
            fill={C.tealLight}
            fontFamily="DM Sans,sans-serif"
          >
            (e.g. Insulin, GFP)
          </text>
        </>
      )}
      <text
        x="130"
        y="168"
        textAnchor="middle"
        fontSize="9"
        fill={C.geneB}
        fontFamily="DM Sans,sans-serif"
      >
        Plasmid
      </text>
      <text
        x="150"
        y="215"
        textAnchor="middle"
        fontSize="11"
        fill={C.bacteria}
        fontFamily="DM Sans,sans-serif"
        fontWeight="600"
      >
        Gene Expression in Bacterium
      </text>
      <text
        x="165"
        y="130"
        textAnchor="middle"
        fontSize="9"
        fill={C.ligase}
        fontFamily="DM Sans,sans-serif"
      >
        Transcription &amp;
      </text>
      <text
        x="165"
        y="142"
        textAnchor="middle"
        fontSize="9"
        fill={C.ligase}
        fontFamily="DM Sans,sans-serif"
      >
        Translation
      </text>
    </svg>
  );
}

// ── Animation controller ───────────────────────────────────────────────────────
function RecombinantDNADiagram() {
  const [stepIndex, setStepIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const total = STEPS.length;

  useEffect(() => {
    if (!isPlaying) return;
    timerRef.current = setTimeout(
      () => setStepIndex((s) => (s + 1) % total),
      3200,
    );
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [isPlaying, total]);

  function goTo(idx: number) {
    setStepIndex(idx);
    setIsPlaying(false);
  }

  const svgMap: Record<StepId, React.ReactElement> = {
    "step-cut": <StepCut active={stepIndex === 0} />,
    "step-sticky": <StepStickyEnds active={stepIndex === 1} />,
    "step-ligate": <StepLigate active={stepIndex === 2} />,
    "step-transform": <StepTransform active={stepIndex === 3} />,
    "step-select": <StepSelect active={stepIndex === 4} />,
    "step-express": <StepExpress active={stepIndex === 5} />,
  };
  const current = STEPS[stepIndex];

  return (
    <div
      className="rounded-2xl p-6"
      style={{
        background: "oklch(0.985 0.008 75)",
        border: borderTeal,
        boxShadow: "0 2px 20px oklch(0.50 0.14 160 / 0.08)",
      }}
      aria-label="Interactive recombinant DNA cloning process diagram"
    >
      <div
        className="flex flex-wrap gap-2 mb-6"
        role="tablist"
        aria-label="Cloning steps"
      >
        {STEPS.map((s, idx) => (
          <button
            key={s.id}
            type="button"
            role="tab"
            aria-selected={stepIndex === idx}
            aria-label={s.label}
            onClick={() => goTo(idx)}
            className="rounded-lg px-3 py-1.5 text-xs font-semibold transition-smooth focus:outline-none focus-visible:ring-2"
            style={{
              background: stepIndex === idx ? C.tealDim : "transparent",
              color: stepIndex === idx ? C.teal : "oklch(0.50 0.04 75)",
              border: stepIndex === idx ? borderTeal : borderFaint,
            }}
            data-ocid={`cloning-step-${idx}`}
          >
            {s.short}
          </button>
        ))}
      </div>
      <div className="mb-4 flex items-center justify-between">
        <h3
          className="font-display text-base font-bold"
          style={{ color: C.teal }}
          aria-live="polite"
          aria-atomic="true"
        >
          {current.label}
        </h3>
        <button
          type="button"
          onClick={() => setIsPlaying((p) => !p)}
          className="rounded-lg px-3 py-1 text-xs font-medium transition-smooth focus:outline-none focus-visible:ring-2"
          style={{ background: C.tealDim, color: C.teal, border: borderTeal }}
          aria-label={isPlaying ? "Pause animation" : "Play animation"}
          data-ocid="cloning-play-pause"
        >
          {isPlaying ? "⏸ Pause" : "▶ Play"}
        </button>
      </div>
      <div
        className="flex justify-center items-center min-h-[280px]"
        role="tabpanel"
        aria-label={current.label}
      >
        {svgMap[current.id]}
      </div>
      <div className="mt-4">
        <div
          className="h-1.5 rounded-full overflow-hidden"
          style={{ background: "oklch(0.88 0.02 75)" }}
        >
          <div
            className="h-full rounded-full transition-all duration-700"
            style={{
              width: `${((stepIndex + 1) / total) * 100}%`,
              background:
                "linear-gradient(90deg, oklch(0.50 0.14 160), oklch(0.52 0.14 195))",
            }}
            role="progressbar"
            aria-valuenow={stepIndex + 1}
            aria-valuemin={1}
            aria-valuemax={total}
            aria-label={`Step ${stepIndex + 1} of ${total}`}
            tabIndex={0}
          />
        </div>
        <p
          className="text-xs text-right mt-1"
          style={{ color: "oklch(0.55 0.04 75)" }}
        >
          Step {stepIndex + 1} of {total}
        </p>
      </div>
    </div>
  );
}

const PULSE_STYLE =
  "@keyframes pulse-glow { 0%, 100% { opacity: 1; } 50% { opacity: 0.55; } }";

// ── Quiz questions ─────────────────────────────────────────────────────────────
const QUIZ: QuizQuestion[] = [
  {
    id: "cloning-q1",
    question:
      "What distinguishes Type II restriction enzymes from Type I and Type III, and why are Type II enzymes the workhorses of molecular cloning?",
    options: [
      "Type II require ATP for cleavage; Type I and III do not — Type II is preferred for speed",
      "Type II enzymes cut at or near their recognition sequence, producing defined fragments — Type I and III cut at distant sites making fragment sizes unpredictable",
      "Type II are only active in eukaryotic cells; Type I and III work in prokaryotes",
      "Type II recognize longer sequences (>12 bp); shorter recognition sites are Type I",
    ],
    correctIndex: 1,
    explanation:
      "Type II restriction enzymes are the cloning workhorses because they cut at a defined position relative to their recognition sequence, producing predictable, reproducible fragments. EcoRI (GAATTC) and BamHI (GGATCC) always cut their 6-bp palindrome and produce the same sticky ends every time. Type I enzymes recognize one sequence but cleave a random site far away (up to 1000 bp distant) — useless for generating defined fragments. Type III enzymes cleave 24–26 bp from the recognition site — less predictable. Type II's precision made restriction mapping and recombinant DNA technology possible.",
    topic: "cloning",
  },
  {
    id: "cloning-q2",
    question:
      "Why are sticky ends more efficient for ligation than blunt ends?",
    options: [
      "Sticky ends contain phosphate groups that blunt ends lack — making them easier for ligase to seal",
      "Sticky ends (single-stranded overhangs) base-pair spontaneously with complementary ends, bringing them into proximity for ligation — 10–100x more efficient than random collisions of blunt ends",
      "Sticky ends form with ATP as cofactor; blunt-end ligation requires GTP",
      "Blunt ends can only be ligated if they share the same restriction enzyme sequence",
    ],
    correctIndex: 1,
    explanation:
      "When EcoRI cuts GAATTC on both strands (staggered), it leaves 5'-AATT single-stranded overhangs on each piece. These overhangs are complementary to each other — they anneal spontaneously by hydrogen bonding. The insert and vector are essentially pre-positioned for ligation. Blunt ends have no such attraction — you're relying on random collisions in solution. That's why sticky-end ligation is 10–100x more efficient. For directional cloning, use two different restriction enzymes (incompatible ends) to force the insert in the correct orientation. Dephosphorylating the vector backbone (alkaline phosphatase) prevents self-ligation of the vector without insert, increasing the proportion of recombinant clones.",
    topic: "cloning",
  },
  {
    id: "cloning-q3",
    question:
      "What three features must every functional cloning vector have, and what does each do?",
    options: [
      "Promoter, terminator, ribosome binding site — for protein expression only",
      "Origin of replication (for autonomous replication), selectable marker (for identifying transformed cells), and multiple cloning site (for inserting genes)",
      "Cos sites (for phage packaging), antibiotic resistance, and lacZ for expression",
      "Centromere, telomere, ARS sequence — for stable chromosomal maintenance",
    ],
    correctIndex: 1,
    explanation:
      "Every cloning vector needs exactly three things: (1) Origin of replication (ori) — tells the cell's replication machinery where to start copying the plasmid. Without it, the plasmid dilutes out with every division. High-copy ori like ColE1 gives hundreds of copies per cell; low-copy ori like p15A gives 5–10. (2) Selectable marker — usually an antibiotic resistance gene (ampicillin, kanamycin, chloramphenicol). Plate transformed bacteria on antibiotic medium: only cells that took up the plasmid survive. (3) Multiple Cloning Site (MCS) — a short stretch containing recognition sites for 10–20 different restriction enzymes, giving flexibility to use whichever enzyme matches your insert. Some vectors add a lacZ gene flanking the MCS for blue-white screening.",
    topic: "cloning",
  },
  {
    id: "cloning-q4",
    question:
      "How does blue-white screening work to identify recombinant colonies?",
    options: [
      "Blue colonies express GFP from the vector backbone; white colonies have the GFP gene disrupted by the insert",
      "The lacZ-alpha gene in the vector encodes beta-galactosidase; when an insert disrupts lacZ, colonies turn white on X-gal/IPTG plates instead of blue",
      "Blue colonies have incorporated two copies of the insert; white colonies have none",
      "White colonies have taken up linearized plasmid; blue colonies have circular plasmid",
    ],
    correctIndex: 1,
    explanation:
      "Blue-white screening is elegant. The vector carries the lacZ-alpha fragment, encoding the alpha-peptide of beta-galactosidase. When bacteria are plated on X-gal (a colorless substrate that produces blue dye when cleaved) and IPTG (inducer), colonies with intact lacZ-alpha turn blue — the enzyme is working. But when your gene of interest is inserted into the MCS, it disrupts the lacZ-alpha reading frame. The truncated, non-functional fragment can't cleave X-gal. Those colonies stay white. So white colonies almost certainly have your insert. Blue colonies have empty vector (re-ligated without insert). You pick white colonies, grow them up, and confirm by PCR or sequencing. Simple, visual, no fancy equipment needed.",
    topic: "cloning",
  },
  {
    id: "cloning-q5",
    question:
      "What is Gibson Assembly and how does it differ from restriction enzyme–based cloning?",
    options: [
      "Gibson Assembly uses RNA ligation instead of DNA ligase — it's faster but only works with RNA targets",
      "Gibson Assembly uses three enzymes (5' exonuclease, polymerase, DNA ligase) to seamlessly join overlapping DNA fragments in a single tube — no restriction sites needed, no scar sequences left",
      "Gibson Assembly requires a specific palindromic adapter sequence; restriction cloning does not",
      "They are identical in mechanism — Gibson Assembly just uses different restriction enzymes",
    ],
    correctIndex: 1,
    explanation:
      "Gibson Assembly, developed by Daniel Gibson at JCVI in 2009, works completely differently from restriction cloning. You design your fragments to have 15–30 bp overlapping sequences at their junctions. Then three enzymes act together at 50°C: T5 5' exonuclease chews back the 5' ends to expose single-stranded overhangs that can anneal; a polymerase fills in any gaps; DNA ligase seals the nicks. The result: seamlessly joined DNA with no extra restriction site sequences left at the junctions ('scarless' cloning). You can assemble 2–10 fragments in a single reaction. Golden Gate Assembly is similar but uses Type IIS restriction enzymes (like BsaI) that cut outside their recognition sequence — programmable overhangs with no scar. These modern assembly methods have largely replaced traditional restriction cloning for complex gene assembly and pathway engineering.",
    topic: "cloning",
  },
  {
    id: "cloning-q6",
    question:
      "Why is E. coli BL21(DE3) used for protein expression while DH5α is used for cloning?",
    options: [
      "BL21 lacks restriction enzymes that would degrade foreign DNA; DH5α has restriction enzymes needed for ligation",
      "BL21 lacks the Lon and OmpT proteases that degrade overexpressed proteins and carries the T7 RNA polymerase gene for IPTG-inducible expression; DH5α is optimized for stable plasmid propagation",
      "DH5α grows faster, making colony selection quicker; BL21 grows slowly for quality protein folding",
      "BL21 is used for mammalian expression vectors; DH5α only for bacterial vectors",
    ],
    correctIndex: 1,
    explanation:
      "Strain choice matters enormously. DH5α is optimized for stable, high-copy plasmid propagation: it lacks endA1 (a nuclease that degrades plasmid DNA) and has lacZ mutations allowing blue-white screening. It's your workhorse for cloning, sequencing, and preparing plasmid stocks. BL21(DE3) is optimized for protein production: it lacks Lon protease and OmpT outer membrane protease, which would degrade overexpressed proteins. The '(DE3)' means it carries a chromosomal copy of T7 RNA polymerase under lacUV5 promoter control — add IPTG, and T7 RNAP is expressed, which then drives high-level transcription from your T7-promoter–containing expression vector. For toxic proteins, use auto-induction media or a T7 expression strain with a tighter promoter.",
    topic: "cloning",
  },
  {
    id: "cloning-q7",
    question:
      "What are BACs and YACs, and why were they critical for the Human Genome Project?",
    options: [
      "BACs (Bacterial Artificial Chromosomes) hold up to 300 kb; YACs (Yeast Artificial Chromosomes) hold up to 1 Mb — both were essential for cloning large genomic fragments for sequencing",
      "BACs are used for plant gene expression; YACs for fungal expression",
      "BACs replicate in mammalian cells; YACs replicate in bacterial cells only",
      "Both BACs and YACs are 10–20 kb vectors — the same as standard plasmids but with greater insert stability",
    ],
    correctIndex: 0,
    explanation:
      "Standard plasmids max out around 10–15 kb inserts before becoming unstable. To clone and sequence an entire human genome (3 billion bp), you need vectors that can carry much larger pieces. BACs (Bacterial Artificial Chromosomes) are derived from the F-plasmid of E. coli and can accommodate inserts of 100–300 kb with high stability and low chimerism. YACs (Yeast Artificial Chromosomes) include centromere, telomere, and ARS sequences from yeast, enabling inserts up to 1 Mb, but suffer from insert instability and chimerism. The Human Genome Project used BAC libraries — genomic DNA fragmented to ~150 kb, cloned into BACs, each BAC sequenced by shotgun methods, then assembled. The final human genome reference sequence is built on BAC-based physical maps.",
    topic: "cloning",
  },
  {
    id: "cloning-q8",
    question:
      "Which expression system is best for producing a therapeutic monoclonal antibody with full post-translational modifications?",
    options: [
      "E. coli — fastest and cheapest, produces correctly glycosylated antibodies",
      "Cell-free expression — most controllable and scalable for complex proteins",
      "Chinese Hamster Ovary (CHO) cells — mammalian system capable of human-compatible glycosylation essential for antibody efficacy and half-life",
      "Pichia pastoris — produces identical glycosylation to CHO cells at lower cost",
    ],
    correctIndex: 2,
    explanation:
      "Antibody production illustrates why expression system choice matters. Antibodies are glycoproteins — N-linked glycans on the Fc region are essential for complement activation, FcR binding, and serum half-life. E. coli can't add mammalian glycans (it lacks the pathway entirely) and produces non-glycosylated antibodies that fold poorly in the reducing cytoplasm, often forming insoluble inclusion bodies. Pichia adds glycans but they're yeast-type, which can be immunogenic and differs from human patterns. CHO cells perform human-compatible N-glycosylation, produce properly folded and disulfide-bonded antibodies, secrete them into the culture medium, and can be grown at industrial scale in bioreactors. That's why virtually every approved therapeutic antibody (trastuzumab, bevacizumab, adalimumab) is produced in CHO cells.",
    topic: "cloning",
  },
  {
    id: "cloning-q9",
    question:
      "What was the historical significance of insulin production by recombinant DNA, and what year was it approved?",
    options: [
      "Recombinant insulin was the first genetically modified food, approved in 1990",
      "Recombinant human insulin (Humulin) was the first approved recombinant protein drug in 1982, replacing animal-derived insulin and establishing the commercial viability of recombinant biotechnology",
      "Insulin was first produced by CRISPR base editing in 2015, replacing transgenic approaches",
      "Recombinant insulin was produced in yeast by Sanger in 1977, the same year he developed DNA sequencing",
    ],
    correctIndex: 1,
    explanation:
      "Humulin, approved by the FDA in October 1982, was the world's first recombinant protein pharmaceutical — a landmark that launched the modern biotechnology industry. The human insulin gene was synthesized and inserted into E. coli by Genentech scientists (Herbert Boyer's company, co-founded with Robert Swanson). Before 1982, all insulin came from porcine and bovine pancreas glands — supply was limited, quality varied, and about 1–2% of patients had immunological reactions to animal insulin. Human recombinant insulin was identical to the natural human hormone, produced at industrial scale, with consistent quality. Eli Lilly licensed the technology and brought it to market. That one product established the entire pharmaceutical biotechnology business model and opened the door to every recombinant therapeutic that followed.",
    topic: "cloning",
  },
  {
    id: "cloning-q10",
    question:
      "How does somatic cell nuclear transfer (SCNT) produce cloned organisms, and how does it differ from molecular cloning?",
    options: [
      "SCNT and molecular cloning are identical — both produce multiple copies of a gene",
      "SCNT transfers the nucleus from an adult somatic cell into an enucleated egg, reprogramming it to develop into a genetically identical organism; molecular cloning copies specific DNA sequences in bacterial hosts",
      "SCNT is performed only in bacteria using plasmid vectors; molecular cloning is done only in mammalian cells",
      "SCNT produces copies of proteins; molecular cloning produces copies of organisms",
    ],
    correctIndex: 1,
    explanation:
      "These two uses of 'cloning' are completely different. Molecular cloning (what most of this section covers) copies a specific DNA sequence by putting it in a plasmid and growing it in E. coli. You end up with billions of copies of your gene and its encoded protein. Somatic cell nuclear transfer (SCNT) is organism-level cloning: you take a somatic cell (any body cell) from the organism you want to clone, remove its nucleus, inject that nucleus into an egg cell whose own nucleus has been removed, and stimulate the egg to develop into an embryo. The resulting organism is genetically identical to the donor of the somatic cell nucleus. Dolly the sheep (1996, Roslin Institute) was the first mammal cloned this way — her nuclear DNA came from an adult mammary gland cell. Therapeutic cloning uses SCNT to create embryos only to harvest embryonic stem cells for research, not to produce offspring.",
    topic: "cloning",
  },
];

// ── Extended content data ──────────────────────────────────────────────────────
const EXPLANATIONS = [
  {
    uid: "exp-history",
    anchorId: "cloning-restriction-enzymes",
    color: C.teal,
    heading: "The Discovery That Started an Industry: Cohen, Boyer, and 1973",
    body: "The story of recombinant DNA begins in Hawaii in 1972. Stanley Cohen (Stanford) and Herbert Boyer (UCSF) happened to sit next to each other at a conference on plasmids. Cohen was an expert on bacterial plasmids; Boyer had just discovered restriction enzymes could produce sticky-ended fragments. Over a late-night deli sandwich, they realized their tools were made for each other: Boyer's restriction enzymes could cut DNA from any source to produce compatible ends; Cohen's plasmid expertise could get that DNA into bacteria. In 1973 they published the first recombinant DNA experiment — a frog ribosomal gene spliced into an E. coli plasmid, successfully replicated inside bacteria. The world immediately understood the implications. Senator Ted Kennedy convened hearings. Scientists themselves called for a moratorium at the Asilomar Conference in 1975 to discuss the safety of recombinant organisms. The moratorium lasted months, not years — because careful analysis showed that E. coli K-12 laboratory strains with recombinant plasmids posed negligible risk. By 1977, the first recombinant human protein (somatostatin) was made in bacteria. By 1982, recombinant insulin was on pharmacy shelves. The Cohen-Boyer patents, licensed by Stanford and UCSF to industry, generated over $250 million in royalties and seeded the entire biotech industry.",
  },
  {
    uid: "exp-restriction",
    anchorId: "cloning-restriction-enzymes-detail",
    color: C.geneA,
    heading: "Restriction Enzymes: The Original Molecular Scissors",
    body: "Restriction enzymes are bacterial self-defense weapons. When a virus (bacteriophage) injects its DNA into a bacterium, the bacterium tries to destroy it using restriction endonucleases — proteins that recognize and cut specific short DNA sequences. The bacterium's own DNA is protected by methylation at those same sequences. Werner Arber, Daniel Nathans, and Hamilton Smith shared the 1978 Nobel Prize for discovering and characterizing restriction enzymes. Over 3,000 restriction enzymes from hundreds of bacteria are now known, each recognizing a different sequence. The most useful for cloning are Type II enzymes: they recognize palindromic sequences (reading the same on both strands 5'→3') and cut within or very near the recognition sequence, producing predictable fragments. Recognition sequence length determines cutting frequency: a 4-cutter (like HaeIII, GGCC) cuts every 256 bp on average; a 6-cutter (like EcoRI, GAATTC) cuts every 4,096 bp; an 8-cutter (like NotI, GCGGCCGC) cuts every 65,536 bp — useful for rare cuts and mapping large genomic regions. The sticky ends produced by enzymes like EcoRI (4-nt 5' overhang: AATT) or BamHI (4-nt 5' overhang: GATC) drive efficient ligation. 'Star activity' is a real problem: under non-optimal conditions (excess glycerol, wrong salt, high enzyme concentration), some enzymes cut at relaxed recognition sequences — which can generate spurious fragments and wreck a cloning experiment.",
  },
  {
    uid: "exp-vectors",
    anchorId: "cloning-vectors",
    color: C.geneB,
    heading: "Vectors: Choosing the Right Carrier for Your Gene",
    body: "Not all vectors are equal — the right choice depends on insert size, desired copy number, expression requirements, and host organism. For routine cloning, pUC19 and pBR322 are the workhorses: they replicate to hundreds of copies in E. coli, carry ampicillin and/or tetracycline resistance markers, and have multiple cloning sites. For larger inserts (up to 45 kb), bacteriophage lambda vectors use cos sites for in vitro packaging into viral heads, achieving high efficiency transformation. Cosmids are plasmids carrying cos sites — they can carry 40–45 kb inserts and are packaged as phage but replicate as plasmids in E. coli. BACs (100–300 kb inserts, derived from F-plasmid) and YACs (up to 1 Mb inserts, with centromere, telomere, and ARS sequences) enable genomic library construction for genome projects. For protein expression, the vector needs a strong promoter (T7 for bacterial expression driven by T7 RNAP; CMV for mammalian cells; 35S for plant cells), a ribosome binding site, and often an affinity tag for purification — His-tag (6xHis binds Ni-NTA resin), GST-tag (binds glutathione resin), or FLAG-tag (recognized by specific antibody). Inducible systems — IPTG/lac operator for bacteria, tetracycline-responsive elements for mammalian cells — let you control when the gene is expressed, preventing toxic protein accumulation during cell growth.",
  },
  {
    uid: "exp-ligation",
    anchorId: "cloning-transformation",
    color: C.ligase,
    heading: "Ligation, Transformation, and Colony Screening",
    body: "Once your insert and vector have been digested, purified, and mixed, T4 DNA ligase seals the phosphodiester bonds between the compatible sticky ends — using ATP as energy source. The optimal vector:insert molar ratio is typically 1:3 to 1:5 (more insert than vector drives recombinant formation over empty vector re-ligation). Ligation efficiency depends on temperature (4°C overnight vs 16°C for 1h vs quick ligation kits at 25°C), DNA concentration (optimal around 10–20 ng vector in 10 μL), and sticky end quality. After ligation, you need to get the plasmid into bacteria — transformation. Chemically competent cells (prepared by CaCl₂ treatment) take up DNA after heat shock at 42°C for 30–90 seconds. The heat shock transiently disrupts the membrane, allowing plasmid entry. Electroporation (a brief high-voltage pulse at ~1.8 kV/cm across the cell) is more efficient — up to 10⁹ transformants per μg DNA — but requires electrocompetent cells and causes more cell death. After transformation, cells recover in rich medium for 1 hour (allowing antibiotic resistance gene expression), then are plated. Colonies appear overnight. You screen by colony PCR (pick colony, amplify with flanking primers — right size band = insert present), blue-white screening, or direct sequencing (Sanger sequencing of a small miniprep).",
  },
  {
    uid: "exp-expression",
    anchorId: "cloning-expression",
    color: "oklch(0.55 0.14 220)",
    heading: "From Gene to Product: Recombinant Protein Expression",
    body: "Getting a gene into a host cell is just step one. Making useful amounts of functional protein requires careful design of the expression system. In E. coli, the gene needs a strong promoter (T7 is the most powerful — driven by T7 RNA polymerase, it generates massive transcript levels), a ribosome binding site (Shine-Dalgarno sequence) precisely spaced 5–10 nt upstream of the start codon, and the right reading frame from the start codon through the tag. Common problems: inclusion bodies (insoluble protein aggregates, especially for eukaryotic proteins with complex disulfide bonds — resolvable by growing at 18°C, reducing IPTG concentration, or using solubility-enhancing tags like SUMO or TF); proteolysis (use protease-deficient strains like BL21); codon bias (if your gene uses rare codons, use Rosetta strain that supplies rare tRNA genes). For proteins requiring glycosylation, disulfide bonds, or other eukaryotic modifications, switch to yeast (P. pastoris secretes proteins with glycosylation into the medium), insect cells (baculovirus system — high yield, partial glycosylation), or mammalian cells (CHO, HEK293 — gold standard for therapeutic proteins, full human glycosylation). After expression, purification uses affinity chromatography for tagged proteins, then size exclusion chromatography or ion exchange to achieve pharmaceutical purity. The entire workflow — gene synthesis to purified protein — can now be accomplished in 2–4 weeks with modern tools.",
  },
];

const KEY_CONCEPTS = [
  {
    uid: "kc-re",
    term: "Type II Restriction Enzyme",
    def: "Cuts at/near its recognition sequence (palindromic, 4–8 bp) producing defined sticky or blunt ends. Over 3,000 known; 6-cutters like EcoRI most common in cloning.",
  },
  {
    uid: "kc-pv",
    term: "Plasmid Vector",
    def: "Circular self-replicating DNA requiring: origin of replication (copy number), selectable marker (ampR), and MCS (insertion sites). pUC19 is the classic backbone.",
  },
  {
    uid: "kc-se",
    term: "Sticky Ends",
    def: "Single-stranded 5' or 3' overhangs after staggered restriction cuts. Anneal spontaneously with complementary ends, enabling 10–100x more efficient ligation than blunt ends.",
  },
  {
    uid: "kc-dl",
    term: "T4 DNA Ligase",
    def: "ATP-dependent enzyme sealing phosphodiester bonds between compatible ends. Dephosphorylate vector backbone first to prevent self-ligation without insert.",
  },
  {
    uid: "kc-tr",
    term: "Transformation",
    def: "Uptake of plasmid by competent bacteria. Heat shock (42°C, 30s) for chemical competence; ~1,800 V/cm pulse for electroporation. ~10⁶–10⁹ colonies/μg DNA.",
  },
  {
    uid: "kc-sm",
    term: "Selectable Marker",
    def: "Antibiotic resistance gene (ampicillin, kanamycin, chloramphenicol). Only transformed cells survive on selection plates. Blue-white adds visual screening for insert presence.",
  },
  {
    uid: "kc-ga",
    term: "Gibson Assembly",
    def: "Isothermal, scarless joining of overlapping fragments using T5 exonuclease + polymerase + ligase. No restriction sites needed. Industry-standard for synthetic biology.",
  },
  {
    uid: "kc-bac",
    term: "BAC / YAC",
    def: "Large-capacity vectors: BAC up to 300 kb (F-plasmid derived, stable), YAC up to 1 Mb (yeast chromosomal elements, prone to chimerism). Critical for genome project libraries.",
  },
] as const;

// ── Main exported component ────────────────────────────────────────────────────
export default function CloningSection() {
  return (
    <section
      className="px-6 py-16"
      aria-labelledby="cloning-heading"
      data-ocid="cloning-section"
      style={{ background: "oklch(0.97 0.012 75)" }}
    >
      <style>{PULSE_STYLE}</style>
      <div className="mx-auto max-w-5xl">
        <SectionHeader
          topicId="cloning"
          title="Cloning & Recombinant DNA"
          subtitle="How scientists cut, paste, and copy genes — and turned bacteria into microscopic factories for life-saving medicines, one precision molecular step at a time."
        />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 mb-14">
          <AnimatedEntrance direction="left">
            <RecombinantDNADiagram />
          </AnimatedEntrance>
          <AnimatedEntrance direction="right" delay={0.15}>
            <div className="space-y-5">
              <p
                className="text-base leading-relaxed"
                style={{ color: "oklch(0.30 0.03 75)" }}
              >
                <span className="font-semibold" style={{ color: C.teal }}>
                  Recombinant DNA
                </span>{" "}
                is any DNA assembled by joining genetic material from two or
                more different sources. Cohen and Boyer pioneered this in 1973 —
                and it's the foundation of virtually every biotech product in
                existence. The logic is simple: take a gene you want, cut it
                out, paste it into a carrier DNA (vector), and use living cells
                to amplify it and produce the protein it encodes.
              </p>
              <p
                className="text-base leading-relaxed"
                style={{ color: "oklch(0.30 0.03 75)" }}
              >
                The tools are elegant:{" "}
                <span className="font-semibold" style={{ color: C.teal }}>
                  restriction enzymes
                </span>{" "}
                act as molecular scissors, cutting DNA at specific palindromic
                sequences (like GAATTC for EcoRI) in a staggered way that leaves
                'sticky ends'. Cut both your gene and your vector with the same
                enzyme, and they have matching sticky ends that spontaneously
                pair up — ready to be sealed permanently by{" "}
                <span className="font-semibold" style={{ color: C.ligase }}>
                  T4 DNA ligase
                </span>
                .
              </p>
              <p
                className="text-base leading-relaxed"
                style={{ color: "oklch(0.30 0.03 75)" }}
              >
                The resulting <em>recombinant plasmid</em> is introduced into{" "}
                <span className="font-semibold" style={{ color: C.bacteria }}>
                  E. coli
                </span>{" "}
                by transformation (heat shock or electroporation). Bacteria that
                took up the plasmid survive on antibiotic medium; those that
                didn't are eliminated. Each surviving colony is a clone —
                millions of identical cells, all replicating your gene and
                potentially making its protein product.
              </p>
            </div>
          </AnimatedEntrance>
        </div>

        <StaggerContainer className="space-y-6 mb-14">
          {EXPLANATIONS.map((item) => (
            <StaggerItem key={item.uid}>
              <div
                id={item.anchorId}
                className="rounded-xl p-6"
                style={{
                  background: "oklch(0.985 0.008 75)",
                  border: `1px solid ${item.color}22`,
                  borderLeft: `3px solid ${item.color}`,
                }}
              >
                <h3
                  className="font-display text-lg font-bold mb-3"
                  style={{ color: item.color }}
                >
                  {item.heading}
                </h3>
                <p
                  className="text-base leading-relaxed"
                  style={{ color: "oklch(0.30 0.03 75)" }}
                >
                  {item.body}
                </p>
              </div>
            </StaggerItem>
          ))}
        </StaggerContainer>

        <AnimatedEntrance direction="up" delay={0.1}>
          <dl
            className="rounded-2xl p-6 mb-14"
            style={{ background: "oklch(0.985 0.008 75)", border: borderTeal }}
            aria-label="Key concepts in recombinant DNA technology"
          >
            <h3
              className="font-display text-lg font-bold mb-5"
              style={{ color: C.teal }}
            >
              🔑 Key Concepts at a Glance
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {KEY_CONCEPTS.map((kc) => (
                <div
                  key={kc.uid}
                  className="rounded-lg p-4"
                  style={{
                    background: "oklch(0.96 0.01 75)",
                    border: borderFaint,
                  }}
                >
                  <dt
                    className="text-sm font-bold mb-1"
                    style={{ color: C.teal }}
                  >
                    {kc.term}
                  </dt>
                  <dd
                    className="text-sm leading-relaxed"
                    style={{ color: "oklch(0.35 0.03 75)", opacity: 0.9 }}
                  >
                    {kc.def}
                  </dd>
                </div>
              ))}
            </div>
          </dl>
        </AnimatedEntrance>

        <AnimatedEntrance direction="up" delay={0.15}>
          <div
            id="cloning-quiz"
            className="rounded-2xl p-1"
            style={{
              background:
                "linear-gradient(135deg, oklch(0.50 0.14 160 / 0.10), oklch(0.52 0.14 195 / 0.08))",
              border: borderTeal,
            }}
          >
            <div
              className="rounded-xl p-6"
              style={{ background: "oklch(0.985 0.008 75)" }}
            >
              <h3
                className="font-display text-xl font-bold mb-1"
                style={{ color: C.teal }}
              >
                🧫 Test Your Cloning & Recombinant DNA Knowledge
              </h3>
              <p
                className="text-sm mb-6"
                style={{ color: "oklch(0.50 0.04 75)" }}
              >
                10 questions on restriction enzymes, vectors, ligation
                strategies, expression systems, Gibson Assembly, and
                applications.
              </p>
              <QuizEngine topicId="cloning" questions={QUIZ} />
            </div>
          </div>
        </AnimatedEntrance>
      </div>
    </section>
  );
}
