import { useEffect, useRef } from "react";

const NAVY_BG = "#080d2e";

// ── Drawing helpers ───────────────────────────────────────────
function drawEllipse(
  ctx: CanvasRenderingContext2D,
  cx: number,
  cy: number,
  rx: number,
  ry: number,
  color: string,
  alpha = 0.82,
  glow = true,
) {
  ctx.save();
  if (glow) {
    ctx.shadowColor = color;
    ctx.shadowBlur = 14;
  }
  ctx.globalAlpha = alpha;
  ctx.beginPath();
  ctx.ellipse(cx, cy, rx, ry, 0, 0, Math.PI * 2);
  ctx.fillStyle = color;
  ctx.fill();
  ctx.restore();
}

function drawEllipseBorder(
  ctx: CanvasRenderingContext2D,
  cx: number,
  cy: number,
  rx: number,
  ry: number,
  color: string,
  lineWidth = 2,
  alpha = 1,
) {
  ctx.save();
  ctx.globalAlpha = alpha;
  ctx.shadowColor = color;
  ctx.shadowBlur = 10;
  ctx.strokeStyle = color;
  ctx.lineWidth = lineWidth;
  ctx.beginPath();
  ctx.ellipse(cx, cy, rx, ry, 0, 0, Math.PI * 2);
  ctx.stroke();
  ctx.restore();
}

// ── Label rendering ───────────────────────────────────────────
interface LabelDef {
  id: string;
  name: string;
  fn: string;
  color: string;
  dot: [number, number]; // canvas coords
}

function drawLabels(
  ctx: CanvasRenderingContext2D,
  labels: LabelDef[],
  W: number,
) {
  const leftLabels = labels.filter((l) => l.dot[0] < W / 2);
  const rightLabels = labels.filter((l) => l.dot[0] >= W / 2);

  const LABEL_W = 148;
  const LABEL_H = 34;
  const FONT_NAME = "11px 'Inter', 'Segoe UI', sans-serif";
  const FONT_FN = "9px 'Inter', 'Segoe UI', sans-serif";

  function drawSingleLabel(
    lbl: LabelDef,
    lx: number,
    ly: number,
    isRight: boolean,
  ) {
    const bx = isRight ? lx : lx - LABEL_W;
    const by = ly - LABEL_H / 2;

    // Connector line
    ctx.save();
    ctx.strokeStyle = lbl.color;
    ctx.globalAlpha = 0.55;
    ctx.lineWidth = 1;
    ctx.setLineDash([3, 3]);
    ctx.beginPath();
    ctx.moveTo(lbl.dot[0], lbl.dot[1]);
    ctx.lineTo(lx, ly);
    ctx.stroke();
    ctx.setLineDash([]);
    ctx.restore();

    // Dot on organelle
    ctx.save();
    ctx.shadowColor = lbl.color;
    ctx.shadowBlur = 8;
    ctx.fillStyle = lbl.color;
    ctx.beginPath();
    ctx.arc(lbl.dot[0], lbl.dot[1], 4, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();

    // Label box
    ctx.save();
    ctx.globalAlpha = 0.92;
    ctx.fillStyle = "rgba(5,10,40,0.88)";
    ctx.strokeStyle = `${lbl.color}88`;
    ctx.lineWidth = 1;
    ctx.shadowColor = lbl.color;
    ctx.shadowBlur = 6;
    roundRect(ctx, bx, by, LABEL_W, LABEL_H, 6);
    ctx.fill();
    ctx.stroke();
    ctx.restore();

    // Name text
    ctx.save();
    ctx.font = `bold ${FONT_NAME}`;
    ctx.fillStyle = lbl.color;
    ctx.globalAlpha = 1;
    ctx.fillText(lbl.name, bx + 6, by + 14);
    ctx.restore();

    // Function text
    ctx.save();
    ctx.font = FONT_FN;
    ctx.fillStyle = "rgba(180,210,255,0.75)";
    ctx.globalAlpha = 1;
    const maxW = LABEL_W - 10;
    let fn = lbl.fn;
    if (ctx.measureText(fn).width > maxW) fn = `${fn.slice(0, 28)}…`;
    ctx.fillText(fn, bx + 6, by + 27);
    ctx.restore();
  }

  // Space labels evenly on left and right
  const leftSpacing = Math.min(48, (400 - 40) / Math.max(leftLabels.length, 1));
  const rightSpacing = Math.min(
    48,
    (400 - 40) / Math.max(rightLabels.length, 1),
  );
  const leftStartY = (400 - (leftLabels.length - 1) * leftSpacing) / 2;
  const rightStartY = (400 - (rightLabels.length - 1) * rightSpacing) / 2;

  leftLabels.forEach((lbl, i) => {
    const ly = leftStartY + i * leftSpacing;
    const lx = 8 + LABEL_W + 12;
    drawSingleLabel(lbl, lx, ly, false);
  });
  rightLabels.forEach((lbl, i) => {
    const ly = rightStartY + i * rightSpacing;
    const lx = W - 8 - LABEL_W - 12;
    drawSingleLabel(lbl, lx, ly, true);
  });
}

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

// ── Main 2D cell drawing function ────────────────────────────
function drawCell(
  ctx: CanvasRenderingContext2D,
  W: number,
  H: number,
  isPlant: boolean,
  t: number,
) {
  // Clear
  ctx.clearRect(0, 0, W, H);
  ctx.fillStyle = NAVY_BG;
  ctx.fillRect(0, 0, W, H);

  const CX = W / 2;
  const CY = H / 2;
  const RX = isPlant ? W * 0.32 : W * 0.3;
  const RY = isPlant ? H * 0.39 : H * 0.36;

  // ── Cell wall (plant only) ────────────────────────────────
  if (isPlant) {
    ctx.save();
    ctx.strokeStyle = "#4ade80";
    ctx.lineWidth = 5;
    ctx.globalAlpha = 0.5;
    ctx.shadowColor = "#4ade80";
    ctx.shadowBlur = 12;
    ctx.beginPath();
    ctx.ellipse(CX, CY, RX + 14, RY + 14, 0, 0, Math.PI * 2);
    ctx.stroke();
    ctx.restore();
  }

  // ── Plasma membrane ───────────────────────────────────────
  const memPulse = 1 + Math.sin(t * 0.6) * 0.004;
  ctx.save();
  ctx.strokeStyle = isPlant ? "#86efac" : "#93c5fd";
  ctx.lineWidth = 3;
  ctx.globalAlpha = 0.85;
  ctx.shadowColor = isPlant ? "#4ade80" : "#3b82f6";
  ctx.shadowBlur = 20;
  ctx.beginPath();
  ctx.ellipse(CX, CY, RX * memPulse, RY * memPulse, 0, 0, Math.PI * 2);
  ctx.stroke();
  ctx.restore();

  // ── Cytoplasm fill ────────────────────────────────────────
  ctx.save();
  const grad = ctx.createRadialGradient(CX, CY, 0, CX, CY, Math.max(RX, RY));
  grad.addColorStop(0, isPlant ? "rgba(10,40,18,0.55)" : "rgba(8,22,58,0.55)");
  grad.addColorStop(1, "rgba(5,10,30,0.0)");
  ctx.fillStyle = grad;
  ctx.beginPath();
  ctx.ellipse(CX, CY, RX - 2, RY - 2, 0, 0, Math.PI * 2);
  ctx.fill();
  ctx.restore();

  const labels: LabelDef[] = [];

  // ── Helper to push label ──────────────────────────────────
  function pushLabel(
    id: string,
    name: string,
    fn: string,
    color: string,
    dot: [number, number],
  ) {
    labels.push({ id, name, fn, color, dot });
  }

  // ── Central vacuole (plant, drawn under nucleus) ──────────
  if (isPlant) {
    const vacRX = RX * 0.46;
    const vacRY = RY * 0.48;
    const vcx = CX - 10;
    const vcy = CY + 6;
    drawEllipse(
      ctx,
      vcx,
      vcy,
      vacRX,
      vacRY,
      "rgba(125,211,252,0.18)",
      1,
      false,
    );
    drawEllipseBorder(ctx, vcx, vcy, vacRX, vacRY, "#7dd3fc", 1.5, 0.55);
    pushLabel(
      "vacuole",
      "Central Vacuole",
      "Stores water & maintains turgor",
      "#7dd3fc",
      [vcx - vacRX + 16, vcy],
    );
  }

  // ── Nucleus ───────────────────────────────────────────────
  const nucFX = 0;
  const nucFY = Math.sin(t * 0.4) * 3;
  const nucR = isPlant ? 44 : 48;
  const nucCX = CX + nucFX;
  const nucCY = CY + nucFY;

  // Nuclear envelope
  drawEllipse(
    ctx,
    nucCX,
    nucCY,
    nucR,
    nucR * 0.92,
    "rgba(59,130,246,0.22)",
    1,
    false,
  );
  drawEllipseBorder(ctx, nucCX, nucCY, nucR, nucR * 0.92, "#60a5fa", 2.5, 0.9);
  drawEllipseBorder(
    ctx,
    nucCX,
    nucCY,
    nucR - 5,
    (nucR - 5) * 0.92,
    "#3b82f6",
    1,
    0.35,
  );

  // Nucleolus
  drawEllipse(ctx, nucCX - 8, nucCY - 6, 14, 11, "#1d4ed8", 0.85, true);

  // Nuclear pores (dots around envelope)
  for (let p = 0; p < 8; p++) {
    const a = (p / 8) * Math.PI * 2;
    const px = nucCX + Math.cos(a) * (nucR - 2);
    const py = nucCY + Math.sin(a) * ((nucR - 2) * 0.92);
    ctx.save();
    ctx.shadowColor = "#93c5fd";
    ctx.shadowBlur = 6;
    ctx.fillStyle = "#93c5fd";
    ctx.globalAlpha = 0.85;
    ctx.beginPath();
    ctx.arc(px, py, 3, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();
  }
  pushLabel("nucleus", "Nucleus", "DNA storage & cell control", "#60a5fa", [
    nucCX + nucR - 4,
    nucCY - 18,
  ]);

  // ── Mitochondria (2) ──────────────────────────────────────
  const mitoData = [
    { ox: RX * 0.55, oy: -RY * 0.28, phase: 0.0 },
    { ox: -RX * 0.52, oy: RY * 0.3, phase: 1.3 },
  ];
  mitoData.forEach(({ ox, oy, phase }, mi) => {
    const fy = Math.sin(t * 0.7 + phase) * 4;
    const mx = CX + ox;
    const my = CY + oy + fy;
    // Outer membrane
    ctx.save();
    ctx.translate(mx, my);
    ctx.rotate(0.4 + mi * 0.6);
    drawEllipse(ctx, 0, 0, 28, 16, "rgba(251,146,60,0.8)", 0.85, false);
    // Inner cristae lines
    ctx.shadowColor = "#fb923c";
    ctx.shadowBlur = 4;
    ctx.strokeStyle = "#fdba74";
    ctx.lineWidth = 1.5;
    ctx.globalAlpha = 0.65;
    for (let ci = -1; ci <= 1; ci++) {
      ctx.beginPath();
      ctx.moveTo(-8 + ci * 7, -10);
      ctx.bezierCurveTo(-5 + ci * 7, -2, -5 + ci * 7, 2, -8 + ci * 7, 10);
      ctx.stroke();
    }
    ctx.restore();
    if (mi === 0)
      pushLabel(
        "mito",
        "Mitochondria",
        "ATP production (powerhouse)",
        "#fb923c",
        [mx + 28, my],
      );
  });

  // ── Rough ER ──────────────────────────────────────────────
  {
    const erFY = Math.sin(t * 0.55 + 0.8) * 3;
    const erX = CX + RX * 0.38;
    const erY = CY + RY * 0.35 + erFY;
    ctx.save();
    ctx.translate(erX, erY);
    ctx.strokeStyle = "#c084fc";
    ctx.lineWidth = 2;
    ctx.globalAlpha = 0.85;
    ctx.shadowColor = "#c084fc";
    ctx.shadowBlur = 8;
    for (let row = 0; row < 3; row++) {
      const ry = (row - 1) * 9;
      ctx.beginPath();
      for (let xi = 0; xi <= 30; xi++) {
        const x2 = xi - 15;
        const y2 = ry + Math.sin(xi * 0.55) * 4;
        xi === 0 ? ctx.moveTo(x2, y2) : ctx.lineTo(x2, y2);
      }
      ctx.stroke();
    }
    // Ribosome dots on ER
    ctx.fillStyle = "#fbbf24";
    ctx.shadowColor = "#fbbf24";
    ctx.shadowBlur = 5;
    ctx.globalAlpha = 0.9;
    for (const [rdx, rdy] of [
      [-12, -8],
      [-4, -12],
      [6, -8],
      [-8, 0],
      [4, 4],
    ] as [number, number][]) {
      ctx.beginPath();
      ctx.arc(rdx, rdy, 2.5, 0, Math.PI * 2);
      ctx.fill();
    }
    ctx.restore();
    pushLabel("rer", "Rough ER", "Protein synthesis & transport", "#c084fc", [
      erX + 18,
      erY - 14,
    ]);
  }

  // ── Smooth ER ─────────────────────────────────────────────
  {
    const erFY = Math.sin(t * 0.5 + 1.5) * 3;
    const erX = CX - RX * 0.44;
    const erY = CY + RY * 0.3 + erFY;
    ctx.save();
    ctx.translate(erX, erY);
    ctx.strokeStyle = "#a78bfa";
    ctx.lineWidth = 2;
    ctx.globalAlpha = 0.75;
    ctx.shadowColor = "#a78bfa";
    ctx.shadowBlur = 6;
    for (let row = 0; row < 2; row++) {
      const ry = (row - 0.5) * 10;
      ctx.beginPath();
      for (let xi = 0; xi <= 28; xi++) {
        const x2 = xi - 14;
        const y2 = ry + Math.sin(xi * 0.65 + row) * 3.5;
        xi === 0 ? ctx.moveTo(x2, y2) : ctx.lineTo(x2, y2);
      }
      ctx.stroke();
    }
    ctx.restore();
    pushLabel("ser", "Smooth ER", "Lipid synthesis & detox", "#a78bfa", [
      erX - 18,
      erY,
    ]);
  }

  // ── Golgi apparatus ───────────────────────────────────────
  {
    const golFY = Math.sin(t * 0.6 + 0.3) * 3;
    const gx = CX + RX * 0.15;
    const gy = CY - RY * 0.45 + golFY;
    ctx.save();
    ctx.translate(gx, gy);
    for (let arc = 0; arc < 5; arc++) {
      const rad = 22 - arc * 3.5;
      const yoff = arc * 5 - 10;
      ctx.strokeStyle = arc < 3 ? "#2dd4bf" : "#67e8f9";
      ctx.lineWidth = arc === 0 ? 2.5 : 2;
      ctx.globalAlpha = 0.75 - arc * 0.06;
      ctx.shadowColor = "#2dd4bf";
      ctx.shadowBlur = 8;
      ctx.beginPath();
      ctx.arc(0, yoff, rad, Math.PI * 0.15, Math.PI * 0.85);
      ctx.stroke();
    }
    // Vesicles
    ctx.fillStyle = "#67e8f9";
    ctx.globalAlpha = 0.7;
    ctx.shadowBlur = 5;
    for (const [vx, vy] of [
      [26, -12],
      [28, -4],
      [24, 4],
    ] as [number, number][]) {
      ctx.beginPath();
      ctx.arc(vx, vy, 4, 0, Math.PI * 2);
      ctx.fill();
    }
    ctx.restore();
    pushLabel(
      "golgi",
      "Golgi Apparatus",
      "Packages & ships proteins",
      "#2dd4bf",
      [gx - 26, gy - 14],
    );
  }

  // ── Lysosomes ─────────────────────────────────────────────
  {
    const lysPositions = [
      { ox: -RX * 0.6, oy: -RY * 0.4, phase: 2.0 },
      { ox: RX * 0.55, oy: RY * 0.52, phase: 3.1 },
    ];
    lysPositions.forEach(({ ox, oy, phase }, li) => {
      const fy = Math.sin(t * 0.9 + phase) * 4;
      const lx = CX + ox;
      const ly = CY + oy + fy;
      drawEllipse(ctx, lx, ly, 11, 11, "#f87171", 0.82, true);
      if (li === 0)
        pushLabel("lyso", "Lysosome", "Digests cellular waste", "#f87171", [
          lx - 12,
          ly,
        ]);
    });
  }

  // ── Free ribosomes (scattered dots) ───────────────────────
  {
    const ribPositions = [
      { ox: -RX * 0.2, oy: -RY * 0.55, phase: 0.5 },
      { ox: RX * 0.35, oy: -RY * 0.5, phase: 1.2 },
      { ox: -RX * 0.5, oy: RY * 0.1, phase: 2.2 },
      { ox: RX * 0.6, oy: -RY * 0.1, phase: 0.9 },
    ];
    ribPositions.forEach(({ ox, oy, phase }, ri) => {
      const fy = Math.sin(t * 1.1 + phase) * 3;
      const rx2 = CX + ox;
      const ry2 = CY + oy + fy;
      drawEllipse(ctx, rx2, ry2, 5, 5, "#fbbf24", 0.85, true);
      if (ri === 0)
        pushLabel("ribo", "Ribosome", "Translates mRNA → protein", "#fbbf24", [
          rx2 - 8,
          ry2 - 14,
        ]);
    });
  }

  // ── Centrosome (animal only) ───────────────────────────────
  if (!isPlant) {
    const fy = Math.sin(t * 0.55 + 2.5) * 4;
    const ccx = CX - RX * 0.2;
    const ccy = CY - RY * 0.6 + fy;
    ctx.save();
    ctx.translate(ccx, ccy);
    ctx.strokeStyle = "#4ade80";
    ctx.lineWidth = 2;
    ctx.shadowColor = "#4ade80";
    ctx.shadowBlur = 8;
    ctx.globalAlpha = 0.82;
    ctx.beginPath();
    ctx.arc(0, 0, 10, 0, Math.PI * 2);
    ctx.stroke();
    ctx.beginPath();
    ctx.arc(0, 0, 10, 0, Math.PI * 2);
    ctx.rotate(Math.PI / 2);
    ctx.stroke();
    ctx.restore();
    pushLabel("centro", "Centrosome", "Organizes spindle fibers", "#4ade80", [
      ccx + 12,
      ccy,
    ]);
  }

  // ── Vacuole (animal — small) ───────────────────────────────
  if (!isPlant) {
    const fy = Math.sin(t * 0.65 + 1.8) * 3;
    const vx = CX + RX * 0.45;
    const vy = CY - RY * 0.3 + fy;
    drawEllipse(ctx, vx, vy, 14, 12, "rgba(56,189,248,0.28)", 1, false);
    drawEllipseBorder(ctx, vx, vy, 14, 12, "#38bdf8", 1.5, 0.65);
    pushLabel("vac", "Vacuole", "Stores water & nutrients", "#38bdf8", [
      vx + 15,
      vy,
    ]);
  }

  // ── Chloroplasts (plant only) ─────────────────────────────
  if (isPlant) {
    const chlorPos = [
      { ox: -RX * 0.52, oy: -RY * 0.42, phase: 0.4 },
      { ox: RX * 0.5, oy: -RY * 0.38, phase: 1.8 },
      { ox: -RX * 0.58, oy: RY * 0.42, phase: 0.9 },
    ];
    chlorPos.forEach(({ ox, oy, phase }, ci) => {
      const fy = Math.sin(t * 0.7 + phase) * 4;
      const chx = CX + ox;
      const chy = CY + oy + fy;
      ctx.save();
      ctx.translate(chx, chy);
      ctx.rotate(0.3 + ci * 0.5);
      // Outer membrane
      drawEllipse(ctx, 0, 0, 24, 15, "rgba(74,222,128,0.72)", 0.85, false);
      // Grana dots inside
      ctx.fillStyle = "#166534";
      ctx.shadowColor = "#4ade80";
      ctx.shadowBlur = 4;
      ctx.globalAlpha = 0.85;
      for (const [gx, gy] of [
        [-7, 0],
        [0, -4],
        [7, 3],
        [-3, 6],
      ] as [number, number][]) {
        ctx.beginPath();
        ctx.arc(gx, gy, 3, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.restore();
      if (ci === 0)
        pushLabel(
          "chloro",
          "Chloroplast",
          "Photosynthesis (light → glucose)",
          "#4ade80",
          [chx - 25, chy],
        );
    });
  }

  // ── Draw all labels at the end ────────────────────────────
  drawLabels(ctx, labels, W);

  // ── Membrane label at bottom ──────────────────────────────
  {
    const text = isPlant
      ? "Cell Wall + Plasma Membrane"
      : "Plasma Membrane (phospholipid bilayer)";
    const textColor = isPlant ? "#86efac" : "#93c5fd";
    ctx.save();
    ctx.font = "bold 10px 'Inter', 'Segoe UI', sans-serif";
    const tw = ctx.measureText(text).width;
    const bx = CX - tw / 2 - 8;
    const by = CY + RY + 18;
    ctx.globalAlpha = 0.9;
    ctx.fillStyle = "rgba(5,10,40,0.82)";
    ctx.shadowColor = textColor;
    ctx.shadowBlur = 6;
    roundRect(ctx, bx, by, tw + 16, 20, 5);
    ctx.fill();
    ctx.strokeStyle = `${textColor}77`;
    ctx.lineWidth = 1;
    ctx.stroke();
    ctx.fillStyle = textColor;
    ctx.shadowBlur = 0;
    ctx.fillText(text, bx + 8, by + 13);
    ctx.restore();
  }
}

// ── React component ───────────────────────────────────────────
export function CellScene({ isPlant }: { isPlant: boolean }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const rafRef = useRef<number>(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let startTime = performance.now();

    function loop(now: number) {
      const t = (now - startTime) / 1000;
      const W = canvas!.width;
      const H = canvas!.height;
      drawCell(ctx!, W, H, isPlant, t);
      rafRef.current = requestAnimationFrame(loop);
    }

    rafRef.current = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(rafRef.current);
  }, [isPlant]);

  return (
    <div
      className="relative w-full rounded-2xl overflow-hidden"
      style={{ background: NAVY_BG }}
      aria-label={`2D animated ${isPlant ? "plant" : "animal"} cell diagram with labeled organelles`}
    >
      {/* Cell type badge */}
      <div
        className="absolute top-3 left-3 z-10"
        style={{
          background: "rgba(5,10,40,0.88)",
          border: `1px solid ${isPlant ? "#4ade8055" : "#60a5fa55"}`,
          borderRadius: "10px",
          padding: "6px 13px",
          backdropFilter: "blur(10px)",
          boxShadow: isPlant ? "0 0 14px #4ade8022" : "0 0 14px #3b82f622",
        }}
      >
        <p
          style={{
            color: isPlant ? "#86efac" : "#93c5fd",
            fontWeight: 700,
            fontSize: "12px",
            letterSpacing: "0.05em",
            textTransform: "uppercase",
          }}
        >
          {isPlant ? "🌿 Plant Cell" : "🧬 Animal Cell"}
        </p>
      </div>

      {/* Hint */}
      <div
        className="absolute bottom-3 left-1/2 -translate-x-1/2 pointer-events-none z-10"
        style={{
          background: "rgba(5,10,40,0.72)",
          borderRadius: "20px",
          padding: "4px 14px",
          border: "1px solid rgba(255,255,255,0.07)",
        }}
      >
        <p
          style={{
            fontSize: "10px",
            color: "rgba(160,185,255,0.68)",
            textAlign: "center",
            whiteSpace: "nowrap",
          }}
        >
          2D Animation · Organelles float gently · Permanent labels
        </p>
      </div>

      <canvas
        ref={canvasRef}
        width={720}
        height={480}
        style={{ width: "100%", height: "480px", display: "block" }}
        aria-label={`Animated 2D ${isPlant ? "plant" : "animal"} cell`}
      />
    </div>
  );
}
