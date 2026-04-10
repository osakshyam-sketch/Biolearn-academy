import { useEffect, useRef, useState } from "react";

const NAVY_BG = "#ffffff";

// ── Color palette ─────────────────────────────────────────────
const COLORS = {
  backbone1: "#7c3aed",
  backbone2: "#ea580c",
  A: "#2563eb",
  T: "#d97706",
  G: "#059669",
  C: "#dc2626",
  hBond: "#7c3aed",
  label: "rgba(240,240,248,0.95)",
};

// ── Helpers ───────────────────────────────────────────────────
function roundRect(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  w: number,
  h: number,
  r: number,
) {
  ctx.beginPath();
  ctx.moveTo(x + r, y);
  ctx.lineTo(x + w - r, y);
  ctx.quadraticCurveTo(x + w, y, x + w, y + r);
  ctx.lineTo(x + w, y + h - r);
  ctx.quadraticCurveTo(x + w, y + h, x + w - r, y + h);
  ctx.lineTo(x + r, y + h);
  ctx.quadraticCurveTo(x, y + h, x, y + h - r);
  ctx.lineTo(x, y + r);
  ctx.quadraticCurveTo(x, y, x + r, y);
  ctx.closePath();
}

function labelBox(
  ctx: CanvasRenderingContext2D,
  text: string,
  x: number,
  y: number,
  color: string,
  align: "left" | "right" | "center" = "left",
) {
  ctx.save();
  ctx.font = "bold 11px 'Inter','Segoe UI',sans-serif";
  const tw = ctx.measureText(text).width;
  const bw = tw + 14;
  const bh = 22;
  const bx = align === "right" ? x - bw : align === "center" ? x - bw / 2 : x;
  const by = y - bh / 2;

  ctx.fillStyle = COLORS.label;
  ctx.strokeStyle = `${color}88`;
  ctx.lineWidth = 1;
  ctx.shadowColor = color;
  ctx.shadowBlur = 4;
  roundRect(ctx, bx, by, bw, bh, 5);
  ctx.fill();
  ctx.stroke();

  ctx.shadowBlur = 0;
  ctx.fillStyle = "#1e1b4b";
  ctx.fillText(text, bx + 7, y + 4);
  ctx.restore();
}

// ── Draw Double Helix view ────────────────────────────────────
const BASE_SEQUENCE: ("AT" | "GC")[] = [
  "AT",
  "GC",
  "GC",
  "AT",
  "GC",
  "AT",
  "AT",
  "GC",
  "AT",
  "GC",
  "GC",
  "AT",
  "AT",
  "GC",
  "GC",
  "AT",
  "GC",
  "AT",
  "GC",
  "AT",
];

function drawHelix(
  ctx: CanvasRenderingContext2D,
  W: number,
  H: number,
  phase: number,
) {
  ctx.clearRect(0, 0, W, H);
  ctx.fillStyle = NAVY_BG;
  ctx.fillRect(0, 0, W, H);

  const CX = W / 2;
  const amplitude = Math.min(W * 0.18, 90);
  const totalPairs = BASE_SEQUENCE.length;
  // Vertical layout — helix runs top to bottom
  const pairSpacing = H / (totalPairs + 1);

  // ── Draw nucleobase rungs first (behind backbones) ──────────
  for (let i = 0; i < totalPairs; i++) {
    const pairType = BASE_SEQUENCE[i];
    const y = (i + 1) * pairSpacing;
    // Phase offset for this rung on the sine wave
    const t = (i / (totalPairs - 1)) * Math.PI * 4 + phase;
    const x1 = CX + Math.sin(t) * amplitude;
    const x2 = CX + Math.sin(t + Math.PI) * amplitude;

    const colorA = pairType === "AT" ? COLORS.A : COLORS.G;
    const colorB = pairType === "AT" ? COLORS.T : COLORS.C;
    const midX = (x1 + x2) / 2;

    // Dashed hydrogen bond (center segment)
    ctx.save();
    ctx.setLineDash([3, 3]);
    ctx.strokeStyle = COLORS.hBond;
    ctx.lineWidth = 1.2;
    ctx.globalAlpha = 0.55;
    ctx.beginPath();
    ctx.moveTo(x1 + (midX - x1) * 0.6, y);
    ctx.lineTo(x2 - (x2 - midX) * 0.6, y);
    ctx.stroke();
    ctx.setLineDash([]);
    ctx.restore();

    // Left base half-rung
    ctx.save();
    ctx.strokeStyle = colorA;
    ctx.lineWidth = 3.5;
    ctx.shadowColor = colorA;
    ctx.shadowBlur = 7;
    ctx.globalAlpha = 0.9;
    ctx.beginPath();
    ctx.moveTo(x1, y);
    ctx.lineTo(midX - 3, y);
    ctx.stroke();
    ctx.restore();

    // Right base half-rung
    ctx.save();
    ctx.strokeStyle = colorB;
    ctx.lineWidth = 3.5;
    ctx.shadowColor = colorB;
    ctx.shadowBlur = 7;
    ctx.globalAlpha = 0.9;
    ctx.beginPath();
    ctx.moveTo(midX + 3, y);
    ctx.lineTo(x2, y);
    ctx.stroke();
    ctx.restore();

    // Left base dot (on backbone)
    ctx.save();
    ctx.fillStyle = colorA;
    ctx.shadowColor = colorA;
    ctx.shadowBlur = 10;
    ctx.globalAlpha = 0.95;
    ctx.beginPath();
    ctx.arc(x1, y, 5.5, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();

    // Right base dot (on backbone)
    ctx.save();
    ctx.fillStyle = colorB;
    ctx.shadowColor = colorB;
    ctx.shadowBlur = 10;
    ctx.globalAlpha = 0.95;
    ctx.beginPath();
    ctx.arc(x2, y, 5.5, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();
  }

  // ── Draw backbone strands (sine curves) ─────────────────────
  for (const strand of [0, 1] as const) {
    const strandPhase = strand === 0 ? 0 : Math.PI;
    const color = strand === 0 ? COLORS.backbone1 : COLORS.backbone2;

    ctx.save();
    ctx.strokeStyle = color;
    ctx.lineWidth = 4;
    ctx.shadowColor = color;
    ctx.shadowBlur = 12;
    ctx.globalAlpha = 0.88;
    ctx.beginPath();

    const steps = 200;
    for (let s = 0; s <= steps; s++) {
      const frac = s / steps;
      const y = frac * H;
      const t = frac * Math.PI * 4 + phase + strandPhase;
      const x = CX + Math.sin(t) * amplitude;
      s === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y);
    }
    ctx.stroke();
    ctx.restore();
  }

  // ── Permanent labels (left/right split) ──────────────────────
  // Left-side labels
  const leftLabelX = 14;
  labelBox(
    ctx,
    "Sugar-Phosphate Backbone (5′→3′)",
    leftLabelX,
    H * 0.15,
    COLORS.backbone1,
    "left",
  );
  labelBox(ctx, "Adenine (A)", leftLabelX, H * 0.32, COLORS.A, "left");
  labelBox(ctx, "Guanine (G)", leftLabelX, H * 0.5, COLORS.G, "left");
  labelBox(ctx, "Hydrogen Bonds", leftLabelX, H * 0.68, COLORS.hBond, "left");
  labelBox(ctx, "Base Pair Rung", leftLabelX, H * 0.84, "#6366f1", "left");

  // Right-side labels
  const rightLabelX = W - 14;
  labelBox(
    ctx,
    "Sugar-Phosphate Backbone (3′→5′)",
    rightLabelX,
    H * 0.22,
    COLORS.backbone2,
    "right",
  );
  labelBox(ctx, "Thymine (T)", rightLabelX, H * 0.4, COLORS.T, "right");
  labelBox(ctx, "Cytosine (C)", rightLabelX, H * 0.58, COLORS.C, "right");
  labelBox(
    ctx,
    "A-T: 2 hydrogen bonds",
    rightLabelX,
    H * 0.74,
    COLORS.A,
    "right",
  );
  labelBox(
    ctx,
    "G-C: 3 hydrogen bonds",
    rightLabelX,
    H * 0.9,
    COLORS.G,
    "right",
  );

  // ── Title ─────────────────────────────────────────────────
  ctx.save();
  ctx.font = "bold 13px 'Inter','Segoe UI',sans-serif";
  ctx.fillStyle = "#4c1d95";
  ctx.textAlign = "center";
  ctx.fillText("DNA Double Helix", CX, 20);
  ctx.restore();
}

// ── Draw Base Pairs ladder view ───────────────────────────────
const PAIR_DATA = [
  { type: "AT" as const, label: "A — T", detail: "2 hydrogen bonds" },
  { type: "GC" as const, label: "G — C", detail: "3 hydrogen bonds" },
  { type: "AT" as const, label: "A — T", detail: "Chargaff's rule" },
  { type: "GC" as const, label: "G — C", detail: "Stronger bond" },
  { type: "GC" as const, label: "G — C", detail: "3 hydrogen bonds" },
  { type: "AT" as const, label: "A — T", detail: "2 hydrogen bonds" },
  { type: "GC" as const, label: "G — C", detail: "3 hydrogen bonds" },
  { type: "AT" as const, label: "A — T", detail: "Chargaff's rule" },
];

function drawBasePairs(ctx: CanvasRenderingContext2D, W: number, H: number) {
  ctx.clearRect(0, 0, W, H);
  ctx.fillStyle = NAVY_BG;
  ctx.fillRect(0, 0, W, H);

  const CX = W / 2;
  const ladderW = Math.min(W * 0.42, 200);
  const left = CX - ladderW / 2;
  const right = CX + ladderW / 2;
  const topY = 50;
  const pairSpacing = (H - topY - 40) / (PAIR_DATA.length + 1);

  // Backbone rails
  for (const [railX, color] of [
    [left, COLORS.backbone1],
    [right, COLORS.backbone2],
  ] as [number, string][]) {
    ctx.save();
    ctx.strokeStyle = color;
    ctx.lineWidth = 5;
    ctx.shadowColor = color;
    ctx.shadowBlur = 14;
    ctx.globalAlpha = 0.85;
    ctx.beginPath();
    ctx.moveTo(railX, topY);
    ctx.lineTo(railX, H - 30);
    ctx.stroke();
    ctx.restore();
  }

  // Rungs + labels
  for (let i = 0; i < PAIR_DATA.length; i++) {
    const { type, label, detail } = PAIR_DATA[i];
    const y = topY + (i + 1) * pairSpacing;

    const colorA = type === "AT" ? COLORS.A : COLORS.G;
    const colorB = type === "AT" ? COLORS.T : COLORS.C;
    const [baseA, baseB] = type === "AT" ? ["A", "T"] : ["G", "C"];
    const midX = CX;
    const bondCount = type === "AT" ? 2 : 3;

    // Left half rung
    ctx.save();
    ctx.strokeStyle = colorA;
    ctx.lineWidth = 4;
    ctx.shadowColor = colorA;
    ctx.shadowBlur = 8;
    ctx.globalAlpha = 0.9;
    ctx.beginPath();
    ctx.moveTo(left, y);
    ctx.lineTo(midX - 16, y);
    ctx.stroke();
    ctx.restore();

    // Right half rung
    ctx.save();
    ctx.strokeStyle = colorB;
    ctx.lineWidth = 4;
    ctx.shadowColor = colorB;
    ctx.shadowBlur = 8;
    ctx.globalAlpha = 0.9;
    ctx.beginPath();
    ctx.moveTo(midX + 16, y);
    ctx.lineTo(right, y);
    ctx.stroke();
    ctx.restore();

    // H-bond dots in center
    ctx.save();
    ctx.globalAlpha = 0.7;
    for (let b = 0; b < bondCount; b++) {
      const bx = midX - ((bondCount - 1) * 7) / 2 + b * 7;
      ctx.fillStyle = COLORS.hBond;
      ctx.shadowColor = COLORS.hBond;
      ctx.shadowBlur = 6;
      ctx.beginPath();
      ctx.arc(bx, y, 3, 0, Math.PI * 2);
      ctx.fill();
    }
    ctx.restore();

    // Left base dot + letter
    ctx.save();
    ctx.fillStyle = colorA;
    ctx.shadowColor = colorA;
    ctx.shadowBlur = 10;
    ctx.globalAlpha = 0.95;
    ctx.beginPath();
    ctx.arc(left, y, 8, 0, Math.PI * 2);
    ctx.fill();
    ctx.font = "bold 10px 'Inter','Segoe UI',sans-serif";
    ctx.fillStyle = "#ffffff";
    ctx.shadowBlur = 0;
    ctx.textAlign = "center";
    ctx.fillText(baseA, left, y + 4);
    ctx.restore();

    // Right base dot + letter
    ctx.save();
    ctx.fillStyle = colorB;
    ctx.shadowColor = colorB;
    ctx.shadowBlur = 10;
    ctx.globalAlpha = 0.95;
    ctx.beginPath();
    ctx.arc(right, y, 8, 0, Math.PI * 2);
    ctx.fill();
    ctx.font = "bold 10px 'Inter','Segoe UI',sans-serif";
    ctx.fillStyle = "#ffffff";
    ctx.shadowBlur = 0;
    ctx.textAlign = "center";
    ctx.fillText(baseB, right, y + 4);
    ctx.restore();

    // Pair label (right of ladder)
    ctx.save();
    ctx.font = "bold 11px 'Inter','Segoe UI',sans-serif";
    ctx.fillStyle = type === "AT" ? COLORS.A : COLORS.G;
    ctx.shadowColor = type === "AT" ? COLORS.A : COLORS.G;
    ctx.shadowBlur = 4;
    ctx.textAlign = "left";
    ctx.globalAlpha = 0.9;
    ctx.fillText(label, right + 14, y + 4);
    ctx.restore();

    // Detail (smaller, below label)
    ctx.save();
    ctx.font = "9px 'Inter','Segoe UI',sans-serif";
    ctx.fillStyle = "rgba(60,70,120,0.75)";
    ctx.textAlign = "left";
    ctx.fillText(detail, right + 14, y + 16);
    ctx.restore();
  }

  // Backbone labels at top
  ctx.save();
  ctx.font = "bold 11px 'Inter','Segoe UI',sans-serif";
  ctx.fillStyle = COLORS.backbone1;
  ctx.shadowColor = COLORS.backbone1;
  ctx.shadowBlur = 5;
  ctx.textAlign = "center";
  ctx.fillText("5′", left, topY - 10);
  ctx.fillStyle = COLORS.backbone2;
  ctx.shadowColor = COLORS.backbone2;
  ctx.fillText("3′", right, topY - 10);
  ctx.restore();

  // Title
  ctx.save();
  ctx.font = "bold 13px 'Inter','Segoe UI',sans-serif";
  ctx.fillStyle = "#4c1d95";
  ctx.textAlign = "center";
  ctx.fillText("Base Pairs Ladder Diagram", CX, 22);
  ctx.restore();

  // Legend bottom
  const legendItems = [
    { color: COLORS.A, label: "Adenine (A)" },
    { color: COLORS.T, label: "Thymine (T)" },
    { color: COLORS.G, label: "Guanine (G)" },
    { color: COLORS.C, label: "Cytosine (C)" },
  ];
  const legendY = H - 16;
  const legendTotal = legendItems.length;
  const legendSpacing = Math.min(W / (legendTotal + 1), 130);
  const legendStartX = CX - ((legendTotal - 1) * legendSpacing) / 2;

  for (let li = 0; li < legendItems.length; li++) {
    const { color, label } = legendItems[li];
    const lx = legendStartX + li * legendSpacing;
    ctx.save();
    ctx.fillStyle = color;
    ctx.shadowColor = color;
    ctx.shadowBlur = 6;
    ctx.beginPath();
    ctx.arc(
      lx - ctx.measureText(label).width / 2 - 8,
      legendY - 4,
      4,
      0,
      Math.PI * 2,
    );
    ctx.fill();
    ctx.font = "10px 'Inter','Segoe UI',sans-serif";
    ctx.textAlign = "left";
    ctx.globalAlpha = 0.85;
    ctx.fillText(label, lx - ctx.measureText(label).width / 2, legendY);
    ctx.restore();
  }
}

// ── React component ───────────────────────────────────────────
export function DNAScene() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const rafRef = useRef<number>(0);
  const [view, setView] = useState<"helix" | "basepairs">("helix");
  const viewRef = useRef(view);
  viewRef.current = view;

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const startTime = performance.now();

    function loop(now: number) {
      const elapsed = (now - startTime) / 1000;
      const W = canvas!.width;
      const H = canvas!.height;

      if (viewRef.current === "helix") {
        // Gentle scroll phase — half rotation every ~8 seconds
        const phase = elapsed * 0.4;
        drawHelix(ctx!, W, H, phase);
      } else {
        drawBasePairs(ctx!, W, H);
      }

      rafRef.current = requestAnimationFrame(loop);
    }

    rafRef.current = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(rafRef.current);
  }, []);

  return (
    <div
      className="relative w-full rounded-2xl overflow-hidden"
      style={{
        background: "#ffffff",
        border: "1px solid rgba(100,90,200,0.15)",
      }}
    >
      {/* View toggle buttons */}
      <div className="absolute top-3 left-3 z-10 flex gap-2">
        {(["helix", "basepairs"] as const).map((v) => (
          <button
            key={v}
            type="button"
            onClick={() => setView(v)}
            data-ocid={`dna-view-${v}`}
            aria-pressed={view === v}
            aria-label={
              v === "helix"
                ? "Show Double Helix view"
                : "Show Base Pairs ladder view"
            }
            style={{
              background:
                view === v ? "rgba(124,58,237,0.12)" : "rgba(245,243,255,0.92)",
              border: `1px solid ${view === v ? "#7c3aed" : "rgba(124,58,237,0.25)"}`,
              color: view === v ? "#5b21b6" : "rgba(79,70,229,0.75)",
              borderRadius: "8px",
              padding: "5px 13px",
              fontSize: "12px",
              fontWeight: 600,
              cursor: "pointer",
              backdropFilter: "blur(8px)",
              transition: "all 0.2s ease",
            }}
          >
            {v === "helix" ? "Double Helix" : "Base Pairs"}
          </button>
        ))}
      </div>

      {/* Hint badge */}
      <div
        className="absolute bottom-3 left-1/2 -translate-x-1/2 pointer-events-none z-10"
        style={{
          background: "rgba(245,243,255,0.88)",
          borderRadius: "20px",
          padding: "4px 14px",
          border: "1px solid rgba(124,58,237,0.18)",
        }}
      >
        <p
          style={{
            fontSize: "10px",
            color: "rgba(79,70,180,0.78)",
            textAlign: "center",
            whiteSpace: "nowrap",
          }}
        >
          {view === "helix"
            ? "2D Animation · Scrolling double helix · Permanent labels"
            : "Ladder diagram · A-T and G-C base pairs"}
        </p>
      </div>

      <canvas
        ref={canvasRef}
        width={720}
        height={500}
        style={{ width: "100%", height: "500px", display: "block" }}
        aria-label="Animated DNA double helix diagram"
        role="img"
      />
    </div>
  );
}
