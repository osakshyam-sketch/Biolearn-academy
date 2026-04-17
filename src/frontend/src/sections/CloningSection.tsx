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
      "What do restriction enzymes do, and why are Type II restriction enzymes so useful for cloning?",
    options: [
      "They copy DNA very quickly and are used in PCR",
      "They cut DNA at specific, predictable sequences — Type II enzymes cut right at or near their recognition site, creating defined pieces with 'sticky ends' ready for joining",
      "They join DNA fragments together like molecular glue",
      "They only cut RNA, not DNA",
    ],
    correctIndex: 1,
    explanation:
      "Restriction enzymes are bacteria's natural defence against viruses — they chop up foreign DNA that invades the cell. Scientists borrowed them for cloning. The really useful ones are called Type II: they recognise a specific short sequence in DNA (usually 6 letters) and cut right there, every single time. Importantly, they often cut in a staggered way — not straight across, but offset — leaving short single-stranded overhangs. These overhangs are called 'sticky ends' because they can pair up with matching overhangs from another piece of DNA cut with the same enzyme. It's like cutting puzzle pieces that are designed to fit together. EcoRI, for example, always recognises GAATTC and cuts it the same way, producing AATT overhangs every time. That predictability is what makes molecular cloning reliable.",
    topic: "cloning",
  },
  {
    id: "cloning-q2",
    question:
      "Why are sticky ends better than blunt ends for joining DNA pieces together?",
    options: [
      "Sticky ends contain extra phosphate groups that blunt ends lack",
      "Sticky ends have short single-stranded overhangs that naturally attract each other and hold the pieces close together, making it much easier for the joining enzyme (ligase) to seal them",
      "Blunt ends can only be joined by heat treatment, which destroys the DNA",
      "Sticky ends are longer and therefore stronger than blunt ends",
    ],
    correctIndex: 1,
    explanation:
      "Think of sticky ends like Velcro — they want to stick to their matching partner. When EcoRI cuts DNA, it leaves AATT single-stranded overhangs. These four-letter overhangs base-pair naturally with complementary TTAA overhangs from another piece cut with the same enzyme. By being held close together, they're 10–100 times more likely to be sealed by DNA ligase than blunt-ended pieces that rely on random bumping in solution. For directional cloning (making sure your gene inserts the right way), you can use two different restriction enzymes that create different sticky ends — the pieces can only fit together one way. Like a key that only fits one lock.",
    topic: "cloning",
  },
  {
    id: "cloning-q3",
    question:
      "Every cloning vector needs three essential features. What are they?",
    options: [
      "A promoter, a terminator, and a ribosome binding site",
      "An origin of replication (so it can copy itself), a selectable marker (so you can find which bacteria took it up), and a place to insert your gene (the multiple cloning site)",
      "A gene for green fluorescent protein, an antibiotic resistance gene, and a bacteriophage attachment site",
      "A centromere, telomere, and autonomously replicating sequence",
    ],
    correctIndex: 1,
    explanation:
      "A vector is like a tiny taxi — its job is to carry your gene of interest into bacterial cells and make sure it stays there. For that to work, it needs three things. First, an origin of replication: a sequence that tells the bacterium's copying machinery 'start copying here.' Without this, the plasmid would be lost every time the cell divides. Second, a selectable marker: usually an antibiotic resistance gene. When you plate the bacteria on antibiotic, only the ones that took up the plasmid survive. Third, a multiple cloning site: a stretch of DNA packed with recognition sites for many different restriction enzymes, giving you flexibility in how you insert your gene. Think of the MCS as a universal docking port. Interesting fact: many famous vectors like pUC19 have been used in millions of experiments and are freely available to any researcher who needs them.",
    topic: "cloning",
  },
  {
    id: "cloning-q4",
    question: "What is blue-white screening and what does it tell you?",
    options: [
      "Blue colonies have double the antibiotic resistance; white colonies have single resistance",
      "Blue colonies have intact lacZ gene so they make a blue colour on a special plate; white colonies have the lacZ gene disrupted by the insert, meaning they successfully received your gene",
      "White colonies are contaminated; blue colonies are pure clones",
      "The colour tells you how much protein the bacteria is making",
    ],
    correctIndex: 1,
    explanation:
      "Blue-white screening is one of those elegant tricks in molecular biology that seems like magic until you understand it. The vector carries part of a gene called lacZ, which makes an enzyme that breaks down a compound called X-gal into a blue dye. When bacteria are grown on plates with X-gal, they turn blue if lacZ is working. Now, the multiple cloning site sits right in the middle of lacZ. If your gene inserts there, it disrupts lacZ — and the colony stays white. So white colonies = insert present, blue colonies = empty vector (gene didn't insert). You pick white colonies, grow them up, and confirm by PCR or sequencing. No need for any expensive testing to get that first clue. It's simple, visual, and works every time.",
    topic: "cloning",
  },
  {
    id: "cloning-q5",
    question:
      "What is Gibson Assembly, and how is it different from restriction enzyme cloning?",
    options: [
      "Gibson Assembly uses RNA instead of DNA and joins fragments with heat",
      "Gibson Assembly uses three enzymes to join DNA fragments that have overlapping sequences — no restriction sites needed, no scars left, and multiple pieces can be joined at once",
      "Gibson Assembly is just a faster version of restriction cloning with better enzymes",
      "Gibson Assembly can only join two fragments at a time",
    ],
    correctIndex: 1,
    explanation:
      "Restriction enzyme cloning works well but leaves behind extra sequences at every junction — 'scars' from the restriction site. Gibson Assembly is seamless. Here's how it works: you design your fragments so the ends overlap by 15–30 DNA letters. Then three enzymes work together: the first chews back one strand of each overlapping end, exposing single-stranded regions that can pair up. A polymerase fills in any gaps. A ligase seals the nicks. The result is perfectly joined DNA with no extra sequences. Better still, you can join 2, 5, or even 10 pieces in a single tube reaction. Gibson Assembly is now standard in synthetic biology, where scientists need to assemble entire pathways — sometimes hundreds of pieces — quickly and cleanly. It was developed by Daniel Gibson in 2009 and has completely changed large-scale DNA assembly.",
    topic: "cloning",
  },
  {
    id: "cloning-q6",
    question:
      "Why do scientists use E. coli BL21 for making protein but DH5α for making more plasmid?",
    options: [
      "BL21 grows faster; DH5α grows at a lower temperature",
      "BL21 is missing two enzymes that would chew up your overexpressed protein, and has a gene for a specialised RNA polymerase that drives massive protein production; DH5α is optimised for stably making lots of plasmid without any extra genes getting in the way",
      "DH5α is the only strain that can take up plasmids by transformation",
      "BL21 produces more antibiotic resistance",
    ],
    correctIndex: 1,
    explanation:
      "Choosing the right bacterial strain matters enormously, and this is a classic example. DH5α is the workhorse for cloning — it's great at stably replicating plasmids at high copy number, and it has a mutation that prevents it from breaking down the plasmid DNA. Use it to make lots of plasmid for sequencing, storage, or transformation. BL21(DE3) is the workhorse for protein production. It's missing two proteases (Lon and OmpT) that would otherwise chew up your protein the moment you make it. The '(DE3)' part means it carries a gene for T7 RNA polymerase, which drives incredibly powerful transcription from T7 promoters in your expression vector. When you add IPTG to BL21(DE3) cells, it's like pressing the turbo button — the cells pour all their resources into making your protein. Interesting fact: a typical E. coli expression experiment can produce so much protein that it represents 30–50% of all the protein in the cell.",
    topic: "cloning",
  },
  {
    id: "cloning-q7",
    question:
      "What are BACs and YACs, and why were they essential for sequencing the human genome?",
    options: [
      "BACs hold up to 300,000 DNA letters; YACs hold up to 1,000,000 — both allowed scientists to clone and sequence large pieces of the human genome without it falling apart",
      "BACs and YACs are both exactly the same as normal plasmids but with a different name",
      "BACs and YACs are used in plant biology only",
      "They're both types of PCR used to amplify large genomic regions",
    ],
    correctIndex: 0,
    explanation:
      "Standard plasmids fall apart if you try to put more than about 10,000–15,000 DNA letters in them. The human genome has 3 billion letters — you can't clone it in normal plasmids. BACs (Bacterial Artificial Chromosomes) are derived from a large natural plasmid in E. coli and can stably hold inserts of 100,000–300,000 letters. YACs (Yeast Artificial Chromosomes) include the elements of a real yeast chromosome and can hold inserts up to 1,000,000 letters. To sequence the human genome, scientists cut genomic DNA into pieces of about 150,000 letters, cloned each piece into a BAC, then sequenced each BAC individually and assembled the results like a giant jigsaw puzzle. Without BACs, the Human Genome Project as it was done would have been impossible. Interesting fact: the project was completed ahead of schedule in 2003 and remains one of the largest collaborative scientific projects in history.",
    topic: "cloning",
  },
  {
    id: "cloning-q8",
    question:
      "Why is human insulin produced in CHO cells rather than bacteria for therapeutic use?",
    options: [
      "Bacteria can't take up the insulin gene",
      "Bacteria produce insulin, but it triggers immune reactions — CHO cells are mammalian and add the sugar decorations (glycosylation) that many therapeutic proteins need to work safely in the human body",
      "CHO cells grow faster than bacteria at industrial scale",
      "E. coli doesn't have the right promoter sequences to express human genes",
    ],
    correctIndex: 1,
    explanation:
      "This is a great example of why choosing the right expression system matters. Bacteria like E. coli are brilliant at making simple proteins quickly and cheaply — that's why the original human insulin (Humulin) was made in E. coli and still is. But many proteins need extra modifications after they're made. Antibodies, for example, need specific sugars attached to them (called glycosylation) for them to function properly in the body, have the right half-life in the bloodstream, and not trigger immune reactions. Bacteria don't add these sugars — they lack the machinery. Chinese Hamster Ovary (CHO) cells are mammalian, so they can add human-compatible sugars. That's why virtually every therapeutic antibody — trastuzumab for breast cancer, adalimumab for rheumatoid arthritis, and hundreds more — is manufactured in CHO cells. Interesting fact: CHO cells have been used in biopharmaceutical production for over 40 years and are responsible for billions of doses of life-saving medicines.",
    topic: "cloning",
  },
  {
    id: "cloning-q9",
    question:
      "Why was the production of recombinant human insulin in 1982 so historically significant?",
    options: [
      "It was the first time DNA was ever transferred between organisms",
      "Humulin was the world's first recombinant protein medicine — it proved the entire concept of using bacteria as drug factories and launched the modern biotech industry",
      "It solved the problem of insulin side effects permanently",
      "It was the first gene to ever be successfully sequenced",
    ],
    correctIndex: 1,
    explanation:
      "Before 1982, all insulin for treating diabetes came from pig and cow pancreas glands. Supply was limited, quality could vary, and some patients had immune reactions to the animal protein. Then Genentech — a company founded by Herbert Boyer, one of the inventors of recombinant DNA — inserted the human insulin gene into E. coli and got the bacteria to make it. Humulin, approved by the FDA in 1982, was identical to the insulin the human body makes. It could be produced at industrial scale, consistently. This single product: proved that bacteria could make human medicines, created a commercial model for the entire biotech industry, and opened the door to hundreds of subsequent drugs. Eli Lilly, which licensed the technology, made billions from it. Interesting fact: the Stanford and UCSF patents on recombinant DNA technology ultimately generated over $250 million in royalties — money that funded a generation of biotechnology research.",
    topic: "cloning",
  },
  {
    id: "cloning-q10",
    question:
      "What is somatic cell nuclear transfer (SCNT), and how is it different from molecular cloning?",
    options: [
      "SCNT and molecular cloning are identical — both produce multiple copies of a gene",
      "Molecular cloning copies a gene in bacteria; SCNT takes the nucleus from an adult body cell and puts it into an egg cell to make a genetically identical organism — like Dolly the sheep",
      "SCNT creates multiple identical protein molecules; molecular cloning creates identical organisms",
      "Both techniques use restriction enzymes and plasmids",
    ],
    correctIndex: 1,
    explanation:
      "This is a really important distinction because 'cloning' means different things in different contexts. Molecular cloning (most of what this section covers) is about copying a specific piece of DNA in bacteria — you make billions of copies of a gene, not a whole organism. Somatic cell nuclear transfer is completely different: you take the nucleus from any regular body cell (a skin cell, for example), remove the nucleus from an egg cell, insert the body cell nucleus into that empty egg, and stimulate it to develop. The resulting organism has the same DNA as whoever donated the body cell nucleus. This is how Dolly the sheep was made in 1996 at the Roslin Institute in Scotland. It was a scientific bombshell — until then, most scientists believed you couldn't reprogram an adult cell nucleus. Dolly lived to age six and was a healthy sheep. Her birth opened entirely new discussions about cloning in medicine and ethics.",
    topic: "cloning",
  },
];

// ── Extended content data ──────────────────────────────────────────────────────
const EXPLANATIONS = [
  {
    uid: "exp-history",
    anchorId: "cloning-restriction-enzymes",
    color: C.teal,
    heading: "The Late-Night Sandwich That Launched Biotechnology",
    body: "The story of recombinant DNA begins at a conference dinner in Hawaii in 1972. Two scientists happened to sit next to each other: Stanley Cohen from Stanford, who was an expert on bacterial plasmids (small circular DNA molecules that bacteria carry alongside their main chromosome), and Herbert Boyer from UCSF, who had been studying restriction enzymes — proteins that cut DNA and leave matching sticky ends. Over sandwiches, they realised their tools were made for each other. Boyer's enzymes could cut DNA from any source into pieces with matching ends. Cohen's knowledge could get those pieces into bacteria and keep them there. In 1973 they published the first recombinant DNA experiment — the proof that you could cut a gene from one organism and paste it into another. The world immediately understood what this meant. By 1982, just nine years later, recombinant human insulin produced in bacteria was on pharmacy shelves, changing medicine forever. The Stanford and UCSF patents on their technology generated over $250 million in royalties and essentially seeded the entire modern biotech industry — all from a dinner conversation over sandwiches.",
  },
  {
    uid: "exp-restriction",
    anchorId: "cloning-restriction-enzymes-detail",
    color: C.geneA,
    heading: "Restriction Enzymes: Bacteria's Natural Molecular Scissors",
    body: "Restriction enzymes exist because bacteria need to defend themselves. When a virus injects its DNA into a bacterium, restriction enzymes chop the viral DNA into harmless pieces. The bacterium protects its own DNA by adding a chemical mark (called methylation) at those same sequences — so its own DNA is invisible to the scissors. Werner Arber, Daniel Nathans, and Hamilton Smith won the Nobel Prize in 1978 for discovering how these enzymes work. Over 3,000 different restriction enzymes have been found since then, each recognising a different short sequence. The most useful ones for cloning are called Type II enzymes. They recognise short palindromic sequences — meaning the sequence reads the same forwards and backwards on both strands. For example, EcoRI always recognises the six-letter sequence GAATTC. Here's the interesting detail: when EcoRI cuts in the middle of this sequence, it cuts in a staggered way, leaving single-stranded overhangs of AATT on each piece. These overhangs are called 'sticky ends' because they naturally pair up with any other piece cut by EcoRI. It's like leaving puzzle tabs on each side — pieces from different sources automatically fit together.",
  },
  {
    uid: "exp-vectors",
    anchorId: "cloning-vectors",
    color: C.geneB,
    heading: "Vectors: Choosing the Right Taxi for Your Gene",
    body: "A vector is like a taxi that carries your gene into a cell and makes sure it stays there and gets used. Choosing the right vector depends on what you're trying to do. For simply making lots of copies of a piece of DNA, a small plasmid like pUC19 is perfect — it replicates to hundreds of copies per bacterial cell, is easy to handle, and comes with antibiotic resistance and a docking site for inserting your gene. For larger pieces of DNA (up to 45,000 letters), bacteriophage lambda vectors package DNA into viral capsids and deliver it into bacteria very efficiently. For very large inserts (100,000–300,000 letters), BACs (Bacterial Artificial Chromosomes) are stable and reliable — they were essential for mapping the entire human genome. For actually making a protein in bacteria, expression vectors have extra features: a strong promoter that can be switched on by adding a chemical, a sequence that tells the ribosome where to start translating, and a protein tag (like 6 histidine amino acids in a row) that lets you easily pull your protein out of the bacterial soup. Each vector is an engineering choice based on your goal.",
  },
  {
    uid: "exp-ligation",
    anchorId: "cloning-transformation",
    color: C.ligase,
    heading: "Ligation, Transformation, and Finding Your Clones",
    body: "Once you've cut your gene and your vector with the same restriction enzyme, you mix them together with an enzyme called T4 DNA ligase. Ligase seals the connections between the sticky ends, permanently joining the gene into the vector. You use more insert than vector in the reaction to encourage the gene to go in rather than the vector just re-joining itself empty. Next comes transformation: getting the recombinant plasmid into bacteria. The classic method treats bacteria with chemicals to make them temporarily 'competent' (able to take up DNA), then gives them a brief 42°C heat shock. Nobody fully understands why the heat shock helps — but it works reliably. The bacteria are then spread onto plates containing antibiotic. Most bacteria take up no DNA and die. The ones that survive have a plasmid. But which ones have your gene inside? Blue-white screening is the clever visual trick: bacteria with empty vectors turn blue on special plates; bacteria with your gene inserted turn white. Pick the white colonies, grow them up overnight, extract the plasmid, and send it for DNA sequencing to confirm your gene is there. The whole process — from ligation to a confirmed clone — typically takes just two to three days.",
  },
  {
    uid: "exp-expression",
    anchorId: "cloning-expression",
    color: "oklch(0.55 0.14 220)",
    heading: "From Gene to Working Protein: The Expression Challenge",
    body: "Getting a gene into bacteria is the easy part. Getting the bacteria to make the protein in a useful form is harder. For a simple protein, E. coli expression is fast and cheap: add a chemical called IPTG to switch on transcription, grow for a few hours, break open the cells, and purify the protein. Simple. But for many human proteins — especially ones that need to fold into complex shapes, have sugars attached, or are actually toxic to bacteria if overproduced — things get complicated. A common problem is called inclusion bodies: the bacteria make lots of protein, but it all clumps together in insoluble lumps instead of folding correctly. Solutions include growing at a lower temperature, adding less inducer, or switching to a different host altogether. Yeast cells handle folding much better for some proteins, and they can secrete proteins outside the cell for easy collection. When a protein absolutely needs human-compatible sugar decorations — as therapeutic antibodies do — you need mammalian cells like CHO cells (Chinese Hamster Ovary cells), which do the job but grow more slowly. The choice of expression system is one of the most important decisions in any protein production project.",
  },
];

const KEY_CONCEPTS = [
  {
    uid: "kc-re",
    term: "Type II Restriction Enzyme",
    def: "Molecular scissors that cut DNA at a specific short sequence (usually 6 letters). They cut in a staggered way, leaving 'sticky ends' — short single-stranded overhangs ready to pair with matching pieces. EcoRI is the classic example, recognising GAATTC every time.",
  },
  {
    uid: "kc-pv",
    term: "Plasmid Vector",
    def: "A small circular DNA molecule that acts as a 'taxi' for your gene. Needs three things to work: an origin of replication (so it can copy itself), a selectable marker like antibiotic resistance (so you can find which bacteria took it up), and a cloning site (where your gene goes in).",
  },
  {
    uid: "kc-se",
    term: "Sticky Ends",
    def: "Short single-stranded overhangs left when a restriction enzyme cuts in a staggered way. Because they're complementary to each other, they naturally pair up and hold DNA pieces together, making ligation 10–100 times more efficient than blunt ends.",
  },
  {
    uid: "kc-dl",
    term: "T4 DNA Ligase",
    def: "The enzyme that acts as 'molecular glue' — it seals the connections between sticky ends, permanently joining DNA fragments together. Uses ATP as energy. The essential final step that turns separate pieces into a complete recombinant DNA molecule.",
  },
  {
    uid: "kc-tr",
    term: "Transformation",
    def: "The process of getting a plasmid into bacterial cells. Bacteria are made temporarily 'competent' using chemicals, then given a brief heat shock at 42°C that somehow allows the plasmid to enter the cell. It's not fully understood why it works — but it does, consistently.",
  },
  {
    uid: "kc-sm",
    term: "Selectable Marker",
    def: "Usually an antibiotic resistance gene on the plasmid. When you plate bacteria on antibiotic-containing media, only bacteria that took up the plasmid survive. Blue-white screening adds a visual clue — white colonies have your gene inserted; blue ones just have the empty plasmid.",
  },
  {
    uid: "kc-ga",
    term: "Gibson Assembly",
    def: "A modern method that joins DNA pieces without restriction enzymes, leaving no extra sequences (scars) at the junctions. Works by designing fragments with overlapping ends, then using three enzymes that chew, fill, and seal them together seamlessly. Can join up to 10 pieces at once.",
  },
  {
    uid: "kc-bac",
    term: "BAC / YAC",
    def: "Large-capacity vectors for when your DNA is too big for a regular plasmid. BACs hold up to 300,000 letters and are very stable. YACs hold up to 1,000,000 letters. Both were essential for the Human Genome Project — you can't clone 3 billion letters using regular plasmids.",
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
          subtitle="When people hear 'cloning,' they often think of identical sheep or science fiction. But molecular cloning is actually about copying genes — and it gave us human insulin, life-saving vaccines, and almost every medicine made from proteins."
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
                is DNA that has been put together by joining pieces from two or
                more different sources. Cohen and Boyer pioneered the technique
                in 1973, and it became the foundation of virtually every biotech
                product that exists today. The idea is straightforward: take a
                gene you want, cut it out, paste it into a small carrier DNA
                called a vector, and use living cells to copy it and produce the
                protein it encodes.
              </p>
              <p
                className="text-base leading-relaxed"
                style={{ color: "oklch(0.30 0.03 75)" }}
              >
                The tools are elegant:{" "}
                <span className="font-semibold" style={{ color: C.teal }}>
                  restriction enzymes
                </span>{" "}
                act as molecular scissors — they find specific short DNA
                sequences (like GAATTC for EcoRI) and cut there every single
                time, leaving short sticky overhangs on each piece. Cut both
                your gene and your vector with the same enzyme, and the matching
                sticky ends automatically pair up, ready to be sealed
                permanently by the enzyme{" "}
                <span className="font-semibold" style={{ color: C.ligase }}>
                  T4 DNA ligase
                </span>
                .
              </p>
              <p
                className="text-base leading-relaxed"
                style={{ color: "oklch(0.30 0.03 75)" }}
              >
                The recombinant plasmid is then introduced into{" "}
                <span className="font-semibold" style={{ color: C.bacteria }}>
                  E. coli
                </span>{" "}
                by a process called transformation. Bacteria that took up the
                plasmid survive on antibiotic plates; the rest don't. Each
                surviving colony is a clone — millions of identical cells, all
                carrying your gene and potentially producing its protein product
                in large amounts.
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
