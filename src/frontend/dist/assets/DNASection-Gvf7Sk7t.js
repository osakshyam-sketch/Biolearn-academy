import { r as reactExports, j as jsxRuntimeExports } from "./index-V1Xys_hZ.js";
import { S as SectionHeader, A as AnimatedEntrance, a as StaggerContainer, b as StaggerItem, Q as QuizEngine } from "./SectionHeader-BzOZ529A.js";
import { S as SceneErrorBoundary } from "./SceneErrorBoundary-NlafLXOk.js";
const NAVY_BG = "#ffffff";
const COLORS = {
  backbone1: "#7c3aed",
  backbone2: "#ea580c",
  A: "#2563eb",
  T: "#d97706",
  G: "#059669",
  C: "#dc2626",
  hBond: "#7c3aed",
  label: "rgba(240,240,248,0.95)"
};
function roundRect(ctx, x, y, w, h, r) {
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
function labelBox(ctx, text, x, y, color, align = "left") {
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
const BASE_SEQUENCE = [
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
  "AT"
];
function drawHelix(ctx, W, H, phase) {
  ctx.clearRect(0, 0, W, H);
  ctx.fillStyle = NAVY_BG;
  ctx.fillRect(0, 0, W, H);
  const CX = W / 2;
  const amplitude = Math.min(W * 0.18, 90);
  const totalPairs = BASE_SEQUENCE.length;
  const pairSpacing = H / (totalPairs + 1);
  for (let i = 0; i < totalPairs; i++) {
    const pairType = BASE_SEQUENCE[i];
    const y = (i + 1) * pairSpacing;
    const t = i / (totalPairs - 1) * Math.PI * 4 + phase;
    const x1 = CX + Math.sin(t) * amplitude;
    const x2 = CX + Math.sin(t + Math.PI) * amplitude;
    const colorA = pairType === "AT" ? COLORS.A : COLORS.G;
    const colorB = pairType === "AT" ? COLORS.T : COLORS.C;
    const midX = (x1 + x2) / 2;
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
    ctx.save();
    ctx.fillStyle = colorA;
    ctx.shadowColor = colorA;
    ctx.shadowBlur = 10;
    ctx.globalAlpha = 0.95;
    ctx.beginPath();
    ctx.arc(x1, y, 5.5, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();
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
  for (const strand of [0, 1]) {
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
  const leftLabelX = 14;
  labelBox(
    ctx,
    "Sugar-Phosphate Backbone (5′→3′)",
    leftLabelX,
    H * 0.15,
    COLORS.backbone1,
    "left"
  );
  labelBox(ctx, "Adenine (A)", leftLabelX, H * 0.32, COLORS.A, "left");
  labelBox(ctx, "Guanine (G)", leftLabelX, H * 0.5, COLORS.G, "left");
  labelBox(ctx, "Hydrogen Bonds", leftLabelX, H * 0.68, COLORS.hBond, "left");
  labelBox(ctx, "Base Pair Rung", leftLabelX, H * 0.84, "#6366f1", "left");
  const rightLabelX = W - 14;
  labelBox(
    ctx,
    "Sugar-Phosphate Backbone (3′→5′)",
    rightLabelX,
    H * 0.22,
    COLORS.backbone2,
    "right"
  );
  labelBox(ctx, "Thymine (T)", rightLabelX, H * 0.4, COLORS.T, "right");
  labelBox(ctx, "Cytosine (C)", rightLabelX, H * 0.58, COLORS.C, "right");
  labelBox(
    ctx,
    "A-T: 2 hydrogen bonds",
    rightLabelX,
    H * 0.74,
    COLORS.A,
    "right"
  );
  labelBox(
    ctx,
    "G-C: 3 hydrogen bonds",
    rightLabelX,
    H * 0.9,
    COLORS.G,
    "right"
  );
  ctx.save();
  ctx.font = "bold 13px 'Inter','Segoe UI',sans-serif";
  ctx.fillStyle = "#4c1d95";
  ctx.textAlign = "center";
  ctx.fillText("DNA Double Helix", CX, 20);
  ctx.restore();
}
const PAIR_DATA = [
  { type: "AT", label: "A — T", detail: "2 hydrogen bonds" },
  { type: "GC", label: "G — C", detail: "3 hydrogen bonds" },
  { type: "AT", label: "A — T", detail: "Chargaff's rule" },
  { type: "GC", label: "G — C", detail: "Stronger bond" },
  { type: "GC", label: "G — C", detail: "3 hydrogen bonds" },
  { type: "AT", label: "A — T", detail: "2 hydrogen bonds" },
  { type: "GC", label: "G — C", detail: "3 hydrogen bonds" },
  { type: "AT", label: "A — T", detail: "Chargaff's rule" }
];
function drawBasePairs(ctx, W, H) {
  ctx.clearRect(0, 0, W, H);
  ctx.fillStyle = NAVY_BG;
  ctx.fillRect(0, 0, W, H);
  const CX = W / 2;
  const ladderW = Math.min(W * 0.42, 200);
  const left = CX - ladderW / 2;
  const right = CX + ladderW / 2;
  const topY = 50;
  const pairSpacing = (H - topY - 40) / (PAIR_DATA.length + 1);
  for (const [railX, color] of [
    [left, COLORS.backbone1],
    [right, COLORS.backbone2]
  ]) {
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
  for (let i = 0; i < PAIR_DATA.length; i++) {
    const { type, label, detail } = PAIR_DATA[i];
    const y = topY + (i + 1) * pairSpacing;
    const colorA = type === "AT" ? COLORS.A : COLORS.G;
    const colorB = type === "AT" ? COLORS.T : COLORS.C;
    const [baseA, baseB] = type === "AT" ? ["A", "T"] : ["G", "C"];
    const midX = CX;
    const bondCount = type === "AT" ? 2 : 3;
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
    ctx.save();
    ctx.globalAlpha = 0.7;
    for (let b = 0; b < bondCount; b++) {
      const bx = midX - (bondCount - 1) * 7 / 2 + b * 7;
      ctx.fillStyle = COLORS.hBond;
      ctx.shadowColor = COLORS.hBond;
      ctx.shadowBlur = 6;
      ctx.beginPath();
      ctx.arc(bx, y, 3, 0, Math.PI * 2);
      ctx.fill();
    }
    ctx.restore();
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
    ctx.save();
    ctx.font = "bold 11px 'Inter','Segoe UI',sans-serif";
    ctx.fillStyle = type === "AT" ? COLORS.A : COLORS.G;
    ctx.shadowColor = type === "AT" ? COLORS.A : COLORS.G;
    ctx.shadowBlur = 4;
    ctx.textAlign = "left";
    ctx.globalAlpha = 0.9;
    ctx.fillText(label, right + 14, y + 4);
    ctx.restore();
    ctx.save();
    ctx.font = "9px 'Inter','Segoe UI',sans-serif";
    ctx.fillStyle = "rgba(60,70,120,0.75)";
    ctx.textAlign = "left";
    ctx.fillText(detail, right + 14, y + 16);
    ctx.restore();
  }
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
  ctx.save();
  ctx.font = "bold 13px 'Inter','Segoe UI',sans-serif";
  ctx.fillStyle = "#4c1d95";
  ctx.textAlign = "center";
  ctx.fillText("Base Pairs Ladder Diagram", CX, 22);
  ctx.restore();
  const legendItems = [
    { color: COLORS.A, label: "Adenine (A)" },
    { color: COLORS.T, label: "Thymine (T)" },
    { color: COLORS.G, label: "Guanine (G)" },
    { color: COLORS.C, label: "Cytosine (C)" }
  ];
  const legendY = H - 16;
  const legendTotal = legendItems.length;
  const legendSpacing = Math.min(W / (legendTotal + 1), 130);
  const legendStartX = CX - (legendTotal - 1) * legendSpacing / 2;
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
      Math.PI * 2
    );
    ctx.fill();
    ctx.font = "10px 'Inter','Segoe UI',sans-serif";
    ctx.textAlign = "left";
    ctx.globalAlpha = 0.85;
    ctx.fillText(label, lx - ctx.measureText(label).width / 2, legendY);
    ctx.restore();
  }
}
function DNAScene() {
  const canvasRef = reactExports.useRef(null);
  const rafRef = reactExports.useRef(0);
  const [view, setView] = reactExports.useState("helix");
  const viewRef = reactExports.useRef(view);
  viewRef.current = view;
  reactExports.useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    const startTime = performance.now();
    function loop(now) {
      const elapsed = (now - startTime) / 1e3;
      const W = canvas.width;
      const H = canvas.height;
      if (viewRef.current === "helix") {
        const phase = elapsed * 0.4;
        drawHelix(ctx, W, H, phase);
      } else {
        drawBasePairs(ctx, W, H);
      }
      rafRef.current = requestAnimationFrame(loop);
    }
    rafRef.current = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(rafRef.current);
  }, []);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      className: "relative w-full rounded-2xl overflow-hidden",
      style: {
        background: "#ffffff",
        border: "1px solid rgba(100,90,200,0.15)"
      },
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute top-3 left-3 z-10 flex gap-2", children: ["helix", "basepairs"].map((v) => /* @__PURE__ */ jsxRuntimeExports.jsx(
          "button",
          {
            type: "button",
            onClick: () => setView(v),
            "data-ocid": `dna-view-${v}`,
            "aria-pressed": view === v,
            "aria-label": v === "helix" ? "Show Double Helix view" : "Show Base Pairs ladder view",
            style: {
              background: view === v ? "rgba(124,58,237,0.12)" : "rgba(245,243,255,0.92)",
              border: `1px solid ${view === v ? "#7c3aed" : "rgba(124,58,237,0.25)"}`,
              color: view === v ? "#5b21b6" : "rgba(79,70,229,0.75)",
              borderRadius: "8px",
              padding: "5px 13px",
              fontSize: "12px",
              fontWeight: 600,
              cursor: "pointer",
              backdropFilter: "blur(8px)",
              transition: "all 0.2s ease"
            },
            children: v === "helix" ? "Double Helix" : "Base Pairs"
          },
          v
        )) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "div",
          {
            className: "absolute bottom-3 left-1/2 -translate-x-1/2 pointer-events-none z-10",
            style: {
              background: "rgba(245,243,255,0.88)",
              borderRadius: "20px",
              padding: "4px 14px",
              border: "1px solid rgba(124,58,237,0.18)"
            },
            children: /* @__PURE__ */ jsxRuntimeExports.jsx(
              "p",
              {
                style: {
                  fontSize: "10px",
                  color: "rgba(79,70,180,0.78)",
                  textAlign: "center",
                  whiteSpace: "nowrap"
                },
                children: view === "helix" ? "2D Animation · Scrolling double helix · Permanent labels" : "Ladder diagram · A-T and G-C base pairs"
              }
            )
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "canvas",
          {
            ref: canvasRef,
            width: 720,
            height: 500,
            style: { width: "100%", height: "500px", display: "block" },
            "aria-label": "Animated DNA double helix diagram",
            role: "img"
          }
        )
      ]
    }
  );
}
function ReplicationFork() {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      className: "rounded-2xl border overflow-hidden",
      style: {
        borderColor: "oklch(0.70 0.20 290 / 0.3)",
        background: "oklch(0.14 0.02 290)"
      },
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("style", { children: `
        @keyframes fork-open {
          0%   { clip-path: inset(0 50% 0 50%); }
          100% { clip-path: inset(0 0% 0 0%); }
        }
        @keyframes strand-separate-top {
          0%   { transform: translateY(0px); }
          100% { transform: translateY(-18px); }
        }
        @keyframes strand-separate-bottom {
          0%   { transform: translateY(0px); }
          100% { transform: translateY(18px); }
        }
        @keyframes leading-extend {
          0%   { width: 0%; }
          100% { width: 100%; }
        }
        @keyframes okazaki-1 {
          0%,20%    { width: 0%; opacity: 0; }
          25%,60%   { width: 100%; opacity: 1; }
          100%      { width: 100%; opacity: 1; }
        }
        @keyframes okazaki-2 {
          0%,45%    { width: 0%; opacity: 0; }
          50%,80%   { width: 100%; opacity: 1; }
          100%      { width: 100%; opacity: 1; }
        }
        @keyframes okazaki-3 {
          0%,65%    { width: 0%; opacity: 0; }
          70%,100%  { width: 100%; opacity: 1; }
        }
        @keyframes polymerase-move {
          0%   { left: 0%; }
          100% { left: calc(100% - 28px); }
        }
        @keyframes helicase-pulse {
          0%,100% { transform: scale(1); box-shadow: 0 0 0 0 oklch(0.70 0.20 290 / 0.6); }
          50%     { transform: scale(1.12); box-shadow: 0 0 0 8px oklch(0.70 0.20 290 / 0); }
        }
        @keyframes arrow-flow {
          0%   { opacity: 0; transform: translateX(-6px); }
          50%  { opacity: 1; transform: translateX(0px); }
          100% { opacity: 0; transform: translateX(6px); }
        }
        .replication-animate .leading-bar {
          animation: leading-extend 4s linear 0.5s infinite;
        }
        .replication-animate .ok-1 {
          animation: okazaki-1 4s linear 0.5s infinite;
        }
        .replication-animate .ok-2 {
          animation: okazaki-2 4s linear 0.5s infinite;
        }
        .replication-animate .ok-3 {
          animation: okazaki-3 4s linear 0.5s infinite;
        }
        .replication-animate .strand-top {
          animation: strand-separate-top 4s linear 0.5s infinite alternate;
        }
        .replication-animate .strand-bottom {
          animation: strand-separate-bottom 4s linear 0.5s infinite alternate;
        }
        .helicase-enzyme {
          animation: helicase-pulse 1.8s ease-in-out infinite;
        }
        .arrow-flow-anim {
          animation: arrow-flow 1.2s ease-in-out infinite;
        }
      ` }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-6", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between mb-4", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("h4", { className: "font-display font-bold text-base accent-dna", children: "Replication Fork — Semi-Conservative Mechanism" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-3 text-xs text-muted-foreground flex-wrap", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-1.5", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "span",
                  {
                    className: "inline-block w-3 h-3 rounded-full",
                    style: { background: "#9b59ff" }
                  }
                ),
                "Template (parent)"
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-1.5", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "span",
                  {
                    className: "inline-block w-3 h-3 rounded-full",
                    style: { background: "#34d399" }
                  }
                ),
                "Leading strand"
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-1.5", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "span",
                  {
                    className: "inline-block w-3 h-3 rounded-full",
                    style: { background: "#f59e0b" }
                  }
                ),
                "Okazaki fragments"
              ] })
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "div",
            {
              className: "replication-animate relative rounded-xl overflow-hidden",
              style: { minHeight: 240, background: "oklch(0.12 0.02 290)" },
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "absolute left-0 top-1/2 -translate-y-1/2 w-[28%] flex flex-col gap-0.5 px-3", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs text-muted-foreground mb-1 font-medium", children: "Parent DNA" }),
                  ["p1", "p2", "p3", "p4", "p5", "p6", "p7", "p8"].map((id) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-0.5 h-4", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "div",
                      {
                        className: "h-2 rounded-full flex-1",
                        style: { background: "#9b59ff", opacity: 0.9 }
                      }
                    ),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "div",
                      {
                        className: "h-full w-px",
                        style: { background: "oklch(0.70 0.20 290 / 0.4)" }
                      }
                    ),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "div",
                      {
                        className: "h-2 rounded-full flex-1",
                        style: { background: "#c49bff", opacity: 0.85 }
                      }
                    )
                  ] }, id))
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "absolute left-[28%] top-1/2 -translate-y-1/2 flex flex-col items-center", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs(
                    "div",
                    {
                      className: "helicase-enzyme flex flex-col items-center justify-center rounded-full font-bold text-xs",
                      style: {
                        width: 48,
                        height: 48,
                        background: "oklch(0.70 0.20 290)",
                        color: "oklch(0.10 0 0)",
                        fontSize: 9,
                        textAlign: "center",
                        lineHeight: "1.2",
                        zIndex: 10,
                        position: "relative"
                      },
                      children: [
                        "HELI-",
                        /* @__PURE__ */ jsxRuntimeExports.jsx("br", {}),
                        "CASE"
                      ]
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "div",
                    {
                      className: "text-xs text-muted-foreground mt-1",
                      style: { fontSize: 9 },
                      children: "unwinds"
                    }
                  )
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "absolute left-[38%] right-0 top-1/2 -translate-y-1/2 flex flex-col gap-4 pr-4", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "strand-top flex flex-col gap-1", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1.5", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        "span",
                        {
                          className: "text-xs text-muted-foreground shrink-0",
                          style: { fontSize: 9, width: 60 },
                          children: "5'→3' template"
                        }
                      ),
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        "div",
                        {
                          className: "flex-1 h-2.5 rounded-full relative overflow-hidden",
                          style: { background: "oklch(0.25 0.05 290)" },
                          children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                            "div",
                            {
                              className: "absolute inset-0 h-full rounded-full",
                              style: { background: "#9b59ff", opacity: 0.7 }
                            }
                          )
                        }
                      ),
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        "span",
                        {
                          className: "text-xs font-bold shrink-0",
                          style: { color: "#9b59ff", fontSize: 9 },
                          children: "3'"
                        }
                      )
                    ] }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1.5", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        "span",
                        {
                          className: "text-xs text-muted-foreground shrink-0",
                          style: { fontSize: 9, width: 60 },
                          children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { style: { color: "#34d399" }, children: "Leading →" })
                        }
                      ),
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        "div",
                        {
                          className: "flex-1 h-2.5 rounded-full relative overflow-hidden",
                          style: { background: "oklch(0.20 0 0)" },
                          children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                            "div",
                            {
                              className: "leading-bar absolute left-0 top-0 h-full rounded-full",
                              style: { background: "#34d399", width: 0 }
                            }
                          )
                        }
                      ),
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        "span",
                        {
                          className: "text-xs font-bold shrink-0",
                          style: { color: "#34d399", fontSize: 9 },
                          children: "5'"
                        }
                      )
                    ] }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "div",
                      {
                        className: "text-xs text-muted-foreground pl-16",
                        style: { fontSize: 9 },
                        children: "← DNA Pol III (continuous, 5'→3')"
                      }
                    )
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "strand-bottom flex flex-col gap-1", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1.5", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        "span",
                        {
                          className: "text-xs text-muted-foreground shrink-0",
                          style: { fontSize: 9, width: 60 },
                          children: "3'→5' template"
                        }
                      ),
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        "div",
                        {
                          className: "flex-1 h-2.5 rounded-full relative overflow-hidden",
                          style: { background: "oklch(0.25 0.05 290)" },
                          children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                            "div",
                            {
                              className: "absolute inset-0 h-full rounded-full",
                              style: { background: "#c49bff", opacity: 0.7 }
                            }
                          )
                        }
                      ),
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        "span",
                        {
                          className: "text-xs font-bold shrink-0",
                          style: { color: "#c49bff", fontSize: 9 },
                          children: "5'"
                        }
                      )
                    ] }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1.5", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        "span",
                        {
                          className: "text-xs text-muted-foreground shrink-0",
                          style: { fontSize: 9, width: 60 },
                          children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { style: { color: "#f59e0b" }, children: "Lagging ←" })
                        }
                      ),
                      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 flex gap-0.5 h-2.5", children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx(
                          "div",
                          {
                            className: "flex-1 relative overflow-hidden rounded-l-full",
                            style: { background: "oklch(0.20 0 0)" },
                            children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                              "div",
                              {
                                className: "ok-1 absolute left-0 top-0 h-full rounded-full",
                                style: { background: "#f59e0b", opacity: 0, width: 0 }
                              }
                            )
                          }
                        ),
                        /* @__PURE__ */ jsxRuntimeExports.jsx(
                          "div",
                          {
                            className: "flex-1 relative overflow-hidden",
                            style: { background: "oklch(0.20 0 0)" },
                            children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                              "div",
                              {
                                className: "ok-2 absolute left-0 top-0 h-full",
                                style: { background: "#f59e0b", opacity: 0, width: 0 }
                              }
                            )
                          }
                        ),
                        /* @__PURE__ */ jsxRuntimeExports.jsx(
                          "div",
                          {
                            className: "flex-1 relative overflow-hidden rounded-r-full",
                            style: { background: "oklch(0.20 0 0)" },
                            children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                              "div",
                              {
                                className: "ok-3 absolute left-0 top-0 h-full rounded-full",
                                style: { background: "#f59e0b", opacity: 0, width: 0 }
                              }
                            )
                          }
                        )
                      ] }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        "span",
                        {
                          className: "text-xs font-bold shrink-0",
                          style: { color: "#f59e0b", fontSize: 9 },
                          children: "3'"
                        }
                      )
                    ] }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "div",
                      {
                        className: "text-xs text-muted-foreground pl-16",
                        style: { fontSize: 9 },
                        children: "Okazaki fragments · joined by Ligase"
                      }
                    )
                  ] })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  "div",
                  {
                    className: "absolute right-4 top-3 flex flex-col gap-1 text-xs",
                    style: { fontSize: 10 },
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsxs(
                        "div",
                        {
                          className: "flex items-center gap-1",
                          style: { color: "#34d399" },
                          children: [
                            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Leading 5'→3'" }),
                            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "arrow-flow-anim", children: "→" })
                          ]
                        }
                      ),
                      /* @__PURE__ */ jsxRuntimeExports.jsxs(
                        "div",
                        {
                          className: "flex items-center gap-1",
                          style: { color: "#f59e0b" },
                          children: [
                            /* @__PURE__ */ jsxRuntimeExports.jsx(
                              "span",
                              {
                                className: "arrow-flow-anim",
                                style: { animationDelay: "0.6s" },
                                children: "←"
                              }
                            ),
                            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Lagging 3'←5'" })
                          ]
                        }
                      )
                    ]
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute bottom-3 left-0 right-0 flex justify-around px-4", children: [
                  { label: "Primase", color: "#a78bfa", sub: "adds RNA primer" },
                  {
                    label: "DNA Pol III",
                    color: "#34d399",
                    sub: "synthesizes DNA"
                  },
                  { label: "DNA Ligase", color: "#f59e0b", sub: "joins fragments" }
                ].map(({ label, color, sub }) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  "div",
                  {
                    className: "flex flex-col items-center text-center",
                    style: { fontSize: 9 },
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        "div",
                        {
                          className: "rounded px-2 py-0.5 font-bold mb-0.5",
                          style: {
                            background: `${color}22`,
                            color,
                            border: `1px solid ${color}55`
                          },
                          children: label
                        }
                      ),
                      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground", children: sub })
                    ]
                  },
                  label
                )) })
              ]
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground mt-3 leading-relaxed", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { className: "accent-dna", children: "How to read this diagram:" }),
            " The helicase unwinds the parent double helix at the fork. The leading strand is synthesized continuously (5'→3') towards the fork. The lagging strand is synthesized away from the fork in discontinuous Okazaki fragments. All new synthesis happens in the 5'→3' direction."
          ] })
        ] })
      ]
    }
  );
}
const DNA_QUIZ = [
  {
    id: "dna-1",
    question: "Which two scientists are primarily credited with discovering the double helix structure of DNA in 1953?",
    options: [
      "Gregor Mendel and Charles Darwin",
      "James Watson and Francis Crick",
      "Rosalind Franklin and Maurice Wilkins",
      "Louis Pasteur and Robert Koch"
    ],
    correctIndex: 1,
    explanation: "James Watson and Francis Crick proposed the double helix model of DNA in 1953, using X-ray diffraction data obtained by Rosalind Franklin. They published their landmark paper in the journal Nature.",
    topic: "dna"
  },
  {
    id: "dna-2",
    question: "According to Chargaff's base-pairing rules, which two bases pair with each other?",
    options: [
      "Adenine pairs with Cytosine",
      "Adenine pairs with Guanine",
      "Adenine pairs with Thymine",
      "Adenine pairs with Uracil"
    ],
    correctIndex: 2,
    explanation: "Chargaff's rules state that Adenine (A) always pairs with Thymine (T), and Guanine (G) always pairs with Cytosine (C). These are complementary base pairs held together by hydrogen bonds.",
    topic: "dna"
  },
  {
    id: "dna-3",
    question: "How many hydrogen bonds connect a Guanine-Cytosine (G-C) base pair?",
    options: [
      "1 hydrogen bond",
      "2 hydrogen bonds",
      "3 hydrogen bonds",
      "4 hydrogen bonds"
    ],
    correctIndex: 2,
    explanation: "G-C pairs are held together by 3 hydrogen bonds, making them stronger than A-T pairs which only have 2 hydrogen bonds. This is why DNA sequences rich in G-C are more thermally stable.",
    topic: "dna"
  },
  {
    id: "dna-4",
    question: "What is the direction of DNA synthesis by DNA polymerase?",
    options: [
      "3' to 5' direction only",
      "5' to 3' direction only",
      "Both directions simultaneously",
      "Random direction"
    ],
    correctIndex: 1,
    explanation: "DNA polymerase can only synthesize new DNA in the 5' to 3' direction. This is because it adds new nucleotides to the 3'-OH end of the growing strand. This is why the lagging strand must be synthesized discontinuously.",
    topic: "dna"
  },
  {
    id: "dna-5",
    question: "What is the primary location of DNA within a eukaryotic cell?",
    options: ["Ribosome", "Mitochondria", "Nucleus", "Endoplasmic reticulum"],
    correctIndex: 2,
    explanation: "The vast majority of a eukaryotic cell's DNA is contained within the nucleus, organized into chromosomes. However, small amounts of DNA also exist in mitochondria and, in plant cells, chloroplasts.",
    topic: "dna"
  },
  {
    id: "dna-6",
    question: "What is the enzyme that unwinds the DNA double helix during replication?",
    options: ["DNA Polymerase III", "Primase", "DNA Ligase", "Helicase"],
    correctIndex: 3,
    explanation: "Helicase is the enzyme responsible for unwinding the double helix by breaking the hydrogen bonds between complementary base pairs. This creates a replication fork from which both strands can be copied.",
    topic: "dna"
  },
  {
    id: "dna-7",
    question: "What are Okazaki fragments?",
    options: [
      "Short RNA primers used to initiate DNA synthesis",
      "Short DNA fragments synthesized on the lagging strand",
      "Segments of DNA involved in gene expression",
      "Enzymes that seal nicks in the DNA backbone"
    ],
    correctIndex: 1,
    explanation: "Okazaki fragments are short DNA segments synthesized discontinuously on the lagging strand during replication. Because DNA polymerase can only work 5' to 3', the lagging strand (running 3' to 5') must be copied in pieces. These fragments are later joined by DNA ligase.",
    topic: "dna"
  },
  {
    id: "dna-8",
    question: "What is the term for DNA replication where each new double helix contains one original strand and one new strand?",
    options: [
      "Conservative replication",
      "Dispersive replication",
      "Semi-conservative replication",
      "Bidirectional replication"
    ],
    correctIndex: 2,
    explanation: "Semi-conservative replication means that when DNA is copied, each new double helix retains one original parent strand and one newly synthesized strand. This was proven by the Meselson–Stahl experiment in 1958 using heavy nitrogen isotopes.",
    topic: "dna"
  },
  {
    id: "dna-9",
    question: "Which component forms the 'backbone' of the DNA double helix?",
    options: [
      "Nitrogenous bases only",
      "Amino acids and peptide bonds",
      "Alternating deoxyribose sugar and phosphate groups",
      "Hydrogen bonds between base pairs"
    ],
    correctIndex: 2,
    explanation: "The DNA backbone is formed by alternating deoxyribose sugar molecules and phosphate groups, connected by phosphodiester bonds. The nitrogenous bases project inward and form the 'rungs' of the ladder-like structure.",
    topic: "dna"
  },
  {
    id: "dna-10",
    question: "What is the difference between the major and minor grooves of the DNA double helix?",
    options: [
      "Major grooves contain A-T pairs; minor grooves contain G-C pairs",
      "Major grooves are wider spaces between the backbone strands; minor grooves are narrower spaces",
      "Major grooves are found only in RNA; minor grooves in DNA",
      "There is no structural difference; they are the same"
    ],
    correctIndex: 1,
    explanation: "Due to the helical geometry of DNA, the backbone strands are not uniformly spaced — they create alternating wide (major) and narrow (minor) grooves. Proteins and other molecules that interact with DNA often use the major groove because it provides more accessible chemical information about the base sequence.",
    topic: "dna"
  }
];
const EXPLANATION_PARAGRAPHS = [
  {
    title: "Discovery and the Double Helix",
    content: "Deoxyribonucleic acid — DNA — is arguably the most famous molecule in all of biology, and for good reason: it carries the genetic instructions for the development, functioning, and reproduction of all known living organisms. The structure of DNA was described by James Watson and Francis Crick in their landmark 1953 paper published in Nature, building critically upon X-ray diffraction images produced by Rosalind Franklin and Maurice Wilkins. Their model revealed that DNA takes the form of a double helix — two long polynucleotide strands wound around a common axis like a twisted ladder. This elegant structure immediately suggested how genetic information could be copied faithfully from one cell to the next, sparking a revolution in biology that continues to this day. The discovery earned Watson, Crick, and Wilkins the Nobel Prize in Physiology or Medicine in 1962."
  },
  {
    title: "The Nucleotide Building Blocks",
    content: "DNA is a polymer built from monomers called nucleotides. Each nucleotide consists of three components: a five-carbon deoxyribose sugar, a phosphate group, and one of four nitrogenous bases — adenine (A), thymine (T), guanine (G), or cytosine (C). The deoxyribose sugar gives DNA its name; it differs from ribose (used in RNA) by lacking a hydroxyl group at the 2' carbon position. This seemingly small difference has major chemical consequences — it makes DNA more chemically stable than RNA, which is why DNA evolved as the preferred long-term storage molecule for genetic information. Thousands of nucleotides are linked together through covalent phosphodiester bonds between the phosphate group of one nucleotide and the 3' carbon of the next sugar, forming the sugar-phosphate backbone that runs along the outside of the helix."
  },
  {
    title: "Chargaff's Rules and Base Pairing",
    content: "One of the most important patterns in DNA chemistry was discovered by Erwin Chargaff in the late 1940s. By analyzing the base composition of DNA from many different species, Chargaff found that the amount of adenine always equals the amount of thymine (A = T), and the amount of guanine always equals cytosine (G = C). These proportions — known as Chargaff's rules — are observed in every organism's DNA. Watson and Crick realized this was because A specifically pairs with T (held by 2 hydrogen bonds) and G specifically pairs with C (held by 3 hydrogen bonds), forming complementary base pairs in the interior of the helix. The stronger G-C pairing explains why regions of DNA rich in guanine and cytosine have higher melting temperatures — more energy is required to separate the strands. This base-pair complementarity is the molecular foundation of the genetic code."
  },
  {
    title: "Helix Geometry: Grooves and Antiparallel Strands",
    content: "The geometry of the double helix has several important features beyond simple base pairing. The two backbone strands run antiparallel to each other — one strand runs in the 5' to 3' direction while the other runs 3' to 5', where 5' and 3' refer to the carbon positions on the deoxyribose sugar. This antiparallel arrangement is critical for replication and transcription. The helical twist of the backbones creates two distinct grooves that spiral around the outside of the molecule: the major groove (wider, approximately 22Å) and the minor groove (narrower, approximately 12Å). These grooves expose the edges of the base pairs to the solvent, allowing proteins such as transcription factors and restriction enzymes to read the genetic sequence without fully unwinding the helix. Most regulatory proteins bind specifically in the major groove because it provides richer chemical information about the underlying base sequence."
  },
  {
    title: "DNA Replication: The Semi-Conservative Mechanism",
    content: "Every time a cell divides, it must first duplicate its entire genome so that each daughter cell receives a complete copy. DNA replication is described as semi-conservative because each new double helix retains one original parent strand and one newly synthesized daughter strand — a fact confirmed elegantly by the Meselson–Stahl experiment in 1958. Replication begins at specific locations called origins of replication, where the enzyme helicase unwinds and separates the two strands, creating a replication fork. An enzyme called primase synthesizes short RNA primers to provide a starting point for DNA synthesis, since DNA polymerases cannot initiate new strands de novo. The main workhorse of replication in prokaryotes is DNA Polymerase III, which synthesizes new DNA by reading the template strand in the 3' to 5' direction and adding complementary nucleotides to the growing chain in the 5' to 3' direction."
  },
  {
    title: "Leading and Lagging Strands, Okazaki Fragments",
    content: "Because DNA polymerase can only synthesize in the 5' to 3' direction, and the two template strands run antiparallel, the two new strands are synthesized differently. The leading strand is synthesized continuously in the same direction as fork movement, using the 3' to 5' template strand. The lagging strand, however, runs in the opposite direction to fork movement and must be synthesized discontinuously in short segments called Okazaki fragments, each beginning with a new RNA primer. These fragments are typically 100–200 nucleotides long in eukaryotes and 1000–2000 nucleotides long in prokaryotes. After synthesis, the RNA primers are removed and replaced with DNA by DNA Polymerase I, and the fragments are joined into a continuous strand by DNA ligase, which catalyzes the formation of phosphodiester bonds between adjacent fragments. The entire process is remarkably accurate, with an error rate of approximately one mistake per billion base pairs."
  },
  {
    title: "Where DNA Lives in the Cell",
    content: "In eukaryotic cells, the vast majority of DNA is housed within the nucleus, coiled tightly around proteins called histones to form chromatin — a structure that allows approximately 2 meters of DNA to be packaged into a nucleus just 6–10 micrometers across. During cell division, chromatin condenses further into visible chromosomes. Humans carry 46 chromosomes (23 pairs) in their somatic cells, encoding approximately 3.2 billion base pairs. Beyond the nucleus, a small but vital portion of eukaryotic DNA exists in mitochondria, encoding 13 proteins critical for the respiratory chain; this mitochondrial DNA is circular, like bacterial chromosomes, reflecting the endosymbiotic origin of mitochondria. In plant cells, chloroplasts also contain their own circular DNA, encoding proteins essential for photosynthesis. Prokaryotic cells have no nucleus — their single circular chromosome is found in the nucleoid region of the cytoplasm."
  }
];
function DNASection() {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "section",
    {
      className: "px-4 py-16 md:px-8",
      style: { background: "oklch(0.15 0 0)" },
      children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mx-auto max-w-6xl", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          SectionHeader,
          {
            topicId: "dna",
            title: "DNA: The Blueprint of Life",
            subtitle: "The double-stranded molecule that carries hereditary information — unraveling its structure, chemistry, and the elegant mechanism of replication."
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(AnimatedEntrance, { direction: "up", delay: 0.1, children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-12 grid grid-cols-1 gap-8 lg:grid-cols-2 lg:items-start", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "div",
            {
              className: "rounded-2xl overflow-hidden border",
              style: {
                borderColor: "oklch(0.70 0.20 290 / 0.3)",
                background: "oklch(0.13 0.02 290)"
              },
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "px-4 pt-4 pb-2", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-display font-bold text-lg accent-dna", children: "Interactive 3D Double Helix" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground mt-0.5", children: "Click any base pair to identify it · Toggle highlighting to compare pair types" })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  SceneErrorBoundary,
                  {
                    sceneName: "DNA Double Helix 3D Model",
                    sceneColor: "#9b59ff",
                    children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                      reactExports.Suspense,
                      {
                        fallback: /* @__PURE__ */ jsxRuntimeExports.jsx(
                          "div",
                          {
                            className: "flex items-center justify-center",
                            style: {
                              height: 440,
                              background: "#080d2e",
                              borderRadius: 12
                            },
                            children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-8 w-8 animate-spin rounded-full border-2 border-muted border-t-primary" })
                          }
                        ),
                        children: /* @__PURE__ */ jsxRuntimeExports.jsx(DNAScene, {})
                      }
                    )
                  }
                )
              ]
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-col gap-5", children: EXPLANATION_PARAGRAPHS.slice(0, 2).map((para) => /* @__PURE__ */ jsxRuntimeExports.jsx(
            AnimatedEntrance,
            {
              direction: "right",
              delay: 0.15,
              children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
                "div",
                {
                  className: "rounded-xl p-5 border",
                  style: {
                    borderColor: "oklch(0.70 0.20 290 / 0.2)",
                    background: "oklch(0.17 0.01 290)"
                  },
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-display font-bold text-base mb-2 accent-dna", children: para.title }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm leading-relaxed text-muted-foreground", children: para.content })
                  ]
                }
              )
            },
            para.title
          )) })
        ] }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(AnimatedEntrance, { direction: "up", delay: 0.1, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "div",
          {
            className: "mb-10 rounded-2xl p-6 border",
            style: {
              borderColor: "oklch(0.70 0.20 290 / 0.3)",
              background: "oklch(0.17 0.02 290)"
            },
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-display font-bold text-lg accent-dna mb-4", children: "Chargaff's Base Pairing Rules at a Glance" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-1 gap-4 sm:grid-cols-2", children: [
                {
                  pair: "A — T",
                  desc: "Adenine binds Thymine",
                  bonds: "2 hydrogen bonds",
                  colorA: "#60a5fa",
                  colorB: "#fbbf24",
                  bg: "oklch(0.20 0.04 262)"
                },
                {
                  pair: "G — C",
                  desc: "Guanine binds Cytosine",
                  bonds: "3 hydrogen bonds",
                  colorA: "#34d399",
                  colorB: "#f87171",
                  bg: "oklch(0.20 0.04 142)"
                }
              ].map(({ pair, desc, bonds, colorA, colorB, bg }) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
                "div",
                {
                  className: "rounded-xl p-4 flex items-center gap-4",
                  style: {
                    background: bg,
                    border: "1px solid oklch(0.32 0 0)"
                  },
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "div",
                      {
                        className: "text-2xl font-bold font-mono",
                        style: { color: colorA },
                        children: pair.split(" — ")[0]
                      }
                    ),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xl font-bold text-muted-foreground", children: "—" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "div",
                      {
                        className: "text-2xl font-bold font-mono",
                        style: { color: colorB },
                        children: pair.split(" — ")[1]
                      }
                    ),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "ml-2 flex flex-col", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm font-medium text-foreground", children: desc }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-muted-foreground", children: bonds })
                    ] })
                  ]
                },
                pair
              )) })
            ]
          }
        ) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          StaggerContainer,
          {
            staggerDelay: 0.08,
            className: "mb-12 grid grid-cols-1 gap-5 md:grid-cols-2",
            children: EXPLANATION_PARAGRAPHS.slice(2).map((para) => /* @__PURE__ */ jsxRuntimeExports.jsx(StaggerItem, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "div",
              {
                className: "h-full rounded-xl p-5 border",
                style: {
                  borderColor: "oklch(0.70 0.20 290 / 0.2)",
                  background: "oklch(0.17 0.01 290)"
                },
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-display font-bold text-base mb-2 accent-dna", children: para.title }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm leading-relaxed text-muted-foreground", children: para.content })
                ]
              }
            ) }, para.title))
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(AnimatedEntrance, { direction: "up", delay: 0.1, children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-12", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-display font-bold text-2xl accent-dna glow-dna mb-2", children: "DNA Replication Fork" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground mb-6", children: "A CSS-animated diagram showing strand separation, leading strand synthesis, and Okazaki fragment formation on the lagging strand." }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(ReplicationFork, {})
        ] }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(AnimatedEntrance, { direction: "up", delay: 0.1, children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mb-12 grid grid-cols-2 gap-4 sm:grid-cols-4", children: [
          {
            label: "Base Pairs",
            value: "3.2 billion",
            sub: "in human genome",
            emoji: "🧬"
          },
          {
            label: "DNA Length",
            value: "~2 meters",
            sub: "per human cell",
            emoji: "📏"
          },
          {
            label: "Helix Width",
            value: "~2 nm",
            sub: "double helix diameter",
            emoji: "🔬"
          },
          {
            label: "Error Rate",
            value: "1 in 10⁹",
            sub: "bases during replication",
            emoji: "🎯"
          }
        ].map(({ label, value, sub, emoji }) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "div",
          {
            className: "rounded-xl p-4 text-center border",
            style: {
              borderColor: "oklch(0.70 0.20 290 / 0.25)",
              background: "oklch(0.18 0.02 290)"
            },
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-3xl mb-2", children: emoji }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "font-display font-bold text-lg accent-dna", children: value }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs font-semibold text-foreground mt-0.5", children: label }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs text-muted-foreground mt-0.5", children: sub })
            ]
          },
          label
        )) }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(AnimatedEntrance, { direction: "up", delay: 0.15, children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { "data-ocid": "dna-quiz-section", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-display font-bold text-2xl accent-dna glow-dna mb-4", children: "Test Your DNA Knowledge" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(QuizEngine, { topicId: "dna", questions: DNA_QUIZ })
        ] }) })
      ] })
    }
  );
}
export {
  DNASection as default
};
