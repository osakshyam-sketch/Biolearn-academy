import { c as createLucideIcon, r as reactExports, j as jsxRuntimeExports, A as AnimatePresence, m as motion, F as FlaskConical, X } from "./index-V1Xys_hZ.js";
import { A as AnimatedEntrance, S as SectionHeader, a as StaggerContainer, b as StaggerItem, Q as QuizEngine } from "./SectionHeader-BzOZ529A.js";
import { S as SceneErrorBoundary } from "./SceneErrorBoundary-NlafLXOk.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$1 = [["path", { d: "M20 6 9 17l-5-5", key: "1gmf2c" }]];
const Check = createLucideIcon("check", __iconNode$1);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  ["path", { d: "M6 18h8", key: "1borvv" }],
  ["path", { d: "M3 22h18", key: "8prr45" }],
  ["path", { d: "M14 22a7 7 0 1 0 0-14h-1", key: "1jwaiy" }],
  ["path", { d: "M9 14h2", key: "197e7h" }],
  ["path", { d: "M9 12a2 2 0 0 1-2-2V6h6v4a2 2 0 0 1-2 2Z", key: "1bmzmy" }],
  ["path", { d: "M12 6V3a1 1 0 0 0-1-1H9a1 1 0 0 0-1 1v3", key: "1drr47" }]
];
const Microscope = createLucideIcon("microscope", __iconNode);
const NAVY_BG = "#080d2e";
function drawEllipse(ctx, cx, cy, rx, ry, color, alpha = 0.82, glow = true) {
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
function drawEllipseBorder(ctx, cx, cy, rx, ry, color, lineWidth = 2, alpha = 1) {
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
function drawLabels(ctx, labels, W) {
  const leftLabels = labels.filter((l) => l.dot[0] < W / 2);
  const rightLabels = labels.filter((l) => l.dot[0] >= W / 2);
  const LABEL_W = 148;
  const LABEL_H = 34;
  const FONT_NAME = "11px 'Inter', 'Segoe UI', sans-serif";
  const FONT_FN = "9px 'Inter', 'Segoe UI', sans-serif";
  function drawSingleLabel(lbl, lx, ly, isRight) {
    const bx = isRight ? lx : lx - LABEL_W;
    const by = ly - LABEL_H / 2;
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
    ctx.save();
    ctx.shadowColor = lbl.color;
    ctx.shadowBlur = 8;
    ctx.fillStyle = lbl.color;
    ctx.beginPath();
    ctx.arc(lbl.dot[0], lbl.dot[1], 4, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();
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
    ctx.save();
    ctx.font = `bold ${FONT_NAME}`;
    ctx.fillStyle = lbl.color;
    ctx.globalAlpha = 1;
    ctx.fillText(lbl.name, bx + 6, by + 14);
    ctx.restore();
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
  const leftSpacing = Math.min(48, (400 - 40) / Math.max(leftLabels.length, 1));
  const rightSpacing = Math.min(
    48,
    (400 - 40) / Math.max(rightLabels.length, 1)
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
function drawCell(ctx, W, H, isPlant, t) {
  ctx.clearRect(0, 0, W, H);
  ctx.fillStyle = NAVY_BG;
  ctx.fillRect(0, 0, W, H);
  const CX = W / 2;
  const CY = H / 2;
  const RX = isPlant ? W * 0.32 : W * 0.3;
  const RY = isPlant ? H * 0.39 : H * 0.36;
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
  const memPulse = 1 + Math.sin(t * 0.6) * 4e-3;
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
  ctx.save();
  const grad = ctx.createRadialGradient(CX, CY, 0, CX, CY, Math.max(RX, RY));
  grad.addColorStop(0, isPlant ? "rgba(10,40,18,0.55)" : "rgba(8,22,58,0.55)");
  grad.addColorStop(1, "rgba(5,10,30,0.0)");
  ctx.fillStyle = grad;
  ctx.beginPath();
  ctx.ellipse(CX, CY, RX - 2, RY - 2, 0, 0, Math.PI * 2);
  ctx.fill();
  ctx.restore();
  const labels = [];
  function pushLabel(id, name, fn, color, dot) {
    labels.push({ id, name, fn, color, dot });
  }
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
      false
    );
    drawEllipseBorder(ctx, vcx, vcy, vacRX, vacRY, "#7dd3fc", 1.5, 0.55);
    pushLabel(
      "vacuole",
      "Central Vacuole",
      "Stores water & maintains turgor",
      "#7dd3fc",
      [vcx - vacRX + 16, vcy]
    );
  }
  const nucFX = 0;
  const nucFY = Math.sin(t * 0.4) * 3;
  const nucR = isPlant ? 44 : 48;
  const nucCX = CX + nucFX;
  const nucCY = CY + nucFY;
  drawEllipse(
    ctx,
    nucCX,
    nucCY,
    nucR,
    nucR * 0.92,
    "rgba(59,130,246,0.22)",
    1,
    false
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
    0.35
  );
  drawEllipse(ctx, nucCX - 8, nucCY - 6, 14, 11, "#1d4ed8", 0.85, true);
  for (let p = 0; p < 8; p++) {
    const a = p / 8 * Math.PI * 2;
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
    nucCY - 18
  ]);
  const mitoData = [
    { ox: RX * 0.55, oy: -RY * 0.28, phase: 0 },
    { ox: -RX * 0.52, oy: RY * 0.3, phase: 1.3 }
  ];
  mitoData.forEach(({ ox, oy, phase }, mi) => {
    const fy = Math.sin(t * 0.7 + phase) * 4;
    const mx = CX + ox;
    const my = CY + oy + fy;
    ctx.save();
    ctx.translate(mx, my);
    ctx.rotate(0.4 + mi * 0.6);
    drawEllipse(ctx, 0, 0, 28, 16, "rgba(251,146,60,0.8)", 0.85, false);
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
        [mx + 28, my]
      );
  });
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
    ctx.fillStyle = "#fbbf24";
    ctx.shadowColor = "#fbbf24";
    ctx.shadowBlur = 5;
    ctx.globalAlpha = 0.9;
    for (const [rdx, rdy] of [
      [-12, -8],
      [-4, -12],
      [6, -8],
      [-8, 0],
      [4, 4]
    ]) {
      ctx.beginPath();
      ctx.arc(rdx, rdy, 2.5, 0, Math.PI * 2);
      ctx.fill();
    }
    ctx.restore();
    pushLabel("rer", "Rough ER", "Protein synthesis & transport", "#c084fc", [
      erX + 18,
      erY - 14
    ]);
  }
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
      erY
    ]);
  }
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
    ctx.fillStyle = "#67e8f9";
    ctx.globalAlpha = 0.7;
    ctx.shadowBlur = 5;
    for (const [vx, vy] of [
      [26, -12],
      [28, -4],
      [24, 4]
    ]) {
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
      [gx - 26, gy - 14]
    );
  }
  {
    const lysPositions = [
      { ox: -RX * 0.6, oy: -RY * 0.4, phase: 2 },
      { ox: RX * 0.55, oy: RY * 0.52, phase: 3.1 }
    ];
    lysPositions.forEach(({ ox, oy, phase }, li) => {
      const fy = Math.sin(t * 0.9 + phase) * 4;
      const lx = CX + ox;
      const ly = CY + oy + fy;
      drawEllipse(ctx, lx, ly, 11, 11, "#f87171", 0.82, true);
      if (li === 0)
        pushLabel("lyso", "Lysosome", "Digests cellular waste", "#f87171", [
          lx - 12,
          ly
        ]);
    });
  }
  {
    const ribPositions = [
      { ox: -RX * 0.2, oy: -RY * 0.55, phase: 0.5 },
      { ox: RX * 0.35, oy: -RY * 0.5, phase: 1.2 },
      { ox: -RX * 0.5, oy: RY * 0.1, phase: 2.2 },
      { ox: RX * 0.6, oy: -RY * 0.1, phase: 0.9 }
    ];
    ribPositions.forEach(({ ox, oy, phase }, ri) => {
      const fy = Math.sin(t * 1.1 + phase) * 3;
      const rx2 = CX + ox;
      const ry2 = CY + oy + fy;
      drawEllipse(ctx, rx2, ry2, 5, 5, "#fbbf24", 0.85, true);
      if (ri === 0)
        pushLabel("ribo", "Ribosome", "Translates mRNA → protein", "#fbbf24", [
          rx2 - 8,
          ry2 - 14
        ]);
    });
  }
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
      ccy
    ]);
  }
  if (!isPlant) {
    const fy = Math.sin(t * 0.65 + 1.8) * 3;
    const vx = CX + RX * 0.45;
    const vy = CY - RY * 0.3 + fy;
    drawEllipse(ctx, vx, vy, 14, 12, "rgba(56,189,248,0.28)", 1, false);
    drawEllipseBorder(ctx, vx, vy, 14, 12, "#38bdf8", 1.5, 0.65);
    pushLabel("vac", "Vacuole", "Stores water & nutrients", "#38bdf8", [
      vx + 15,
      vy
    ]);
  }
  if (isPlant) {
    const chlorPos = [
      { ox: -RX * 0.52, oy: -RY * 0.42, phase: 0.4 },
      { ox: RX * 0.5, oy: -RY * 0.38, phase: 1.8 },
      { ox: -RX * 0.58, oy: RY * 0.42, phase: 0.9 }
    ];
    chlorPos.forEach(({ ox, oy, phase }, ci) => {
      const fy = Math.sin(t * 0.7 + phase) * 4;
      const chx = CX + ox;
      const chy = CY + oy + fy;
      ctx.save();
      ctx.translate(chx, chy);
      ctx.rotate(0.3 + ci * 0.5);
      drawEllipse(ctx, 0, 0, 24, 15, "rgba(74,222,128,0.72)", 0.85, false);
      ctx.fillStyle = "#166534";
      ctx.shadowColor = "#4ade80";
      ctx.shadowBlur = 4;
      ctx.globalAlpha = 0.85;
      for (const [gx, gy] of [
        [-7, 0],
        [0, -4],
        [7, 3],
        [-3, 6]
      ]) {
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
          [chx - 25, chy]
        );
    });
  }
  drawLabels(ctx, labels, W);
  {
    const text = isPlant ? "Cell Wall + Plasma Membrane" : "Plasma Membrane (phospholipid bilayer)";
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
function CellScene({ isPlant }) {
  const canvasRef = reactExports.useRef(null);
  const rafRef = reactExports.useRef(0);
  reactExports.useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    let startTime = performance.now();
    function loop(now) {
      const t = (now - startTime) / 1e3;
      const W = canvas.width;
      const H = canvas.height;
      drawCell(ctx, W, H, isPlant, t);
      rafRef.current = requestAnimationFrame(loop);
    }
    rafRef.current = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(rafRef.current);
  }, [isPlant]);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      className: "relative w-full rounded-2xl overflow-hidden",
      style: { background: NAVY_BG },
      "aria-label": `2D animated ${isPlant ? "plant" : "animal"} cell diagram with labeled organelles`,
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "div",
          {
            className: "absolute top-3 left-3 z-10",
            style: {
              background: "rgba(5,10,40,0.88)",
              border: `1px solid ${isPlant ? "#4ade8055" : "#60a5fa55"}`,
              borderRadius: "10px",
              padding: "6px 13px",
              backdropFilter: "blur(10px)",
              boxShadow: isPlant ? "0 0 14px #4ade8022" : "0 0 14px #3b82f622"
            },
            children: /* @__PURE__ */ jsxRuntimeExports.jsx(
              "p",
              {
                style: {
                  color: isPlant ? "#86efac" : "#93c5fd",
                  fontWeight: 700,
                  fontSize: "12px",
                  letterSpacing: "0.05em",
                  textTransform: "uppercase"
                },
                children: isPlant ? "🌿 Plant Cell" : "🧬 Animal Cell"
              }
            )
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "div",
          {
            className: "absolute bottom-3 left-1/2 -translate-x-1/2 pointer-events-none z-10",
            style: {
              background: "rgba(5,10,40,0.72)",
              borderRadius: "20px",
              padding: "4px 14px",
              border: "1px solid rgba(255,255,255,0.07)"
            },
            children: /* @__PURE__ */ jsxRuntimeExports.jsx(
              "p",
              {
                style: {
                  fontSize: "10px",
                  color: "rgba(160,185,255,0.68)",
                  textAlign: "center",
                  whiteSpace: "nowrap"
                },
                children: "2D Animation · Organelles float gently · Permanent labels"
              }
            )
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "canvas",
          {
            ref: canvasRef,
            width: 720,
            height: 480,
            style: { width: "100%", height: "480px", display: "block" },
            "aria-label": `Animated 2D ${isPlant ? "plant" : "animal"} cell`
          }
        )
      ]
    }
  );
}
const QUIZ_QUESTIONS = [
  {
    id: "cell-q1",
    question: "Which organelle is known as the 'powerhouse of the cell' because it produces ATP?",
    options: ["Nucleus", "Golgi Apparatus", "Mitochondria", "Ribosome"],
    correctIndex: 2,
    explanation: "Mitochondria produce ATP through cellular respiration, converting glucose and oxygen into usable energy. This is why they are called the powerhouse of the cell.",
    topic: "cells"
  },
  {
    id: "cell-q2",
    question: "What is the main structural difference between prokaryotic and eukaryotic cells?",
    options: [
      "Prokaryotes are larger than eukaryotes",
      "Eukaryotes have a membrane-bound nucleus; prokaryotes do not",
      "Prokaryotes have mitochondria; eukaryotes do not",
      "Eukaryotes lack a cell membrane"
    ],
    correctIndex: 1,
    explanation: "The defining difference is that eukaryotic cells have a true nucleus enclosed in a membrane, while prokaryotic cells (like bacteria) have their genetic material freely floating in the cytoplasm.",
    topic: "cells"
  },
  {
    id: "cell-q3",
    question: "Which organelle is responsible for modifying, packaging, and shipping proteins?",
    options: ["Rough ER", "Smooth ER", "Golgi Apparatus", "Lysosome"],
    correctIndex: 2,
    explanation: "The Golgi apparatus acts as the cell's post office. It receives proteins from the endoplasmic reticulum, processes them, and directs them to their correct destinations inside or outside the cell.",
    topic: "cells"
  },
  {
    id: "cell-q4",
    question: "Which structure is found in plant cells but NOT in animal cells?",
    options: ["Nucleus", "Mitochondria", "Cell membrane", "Chloroplast"],
    correctIndex: 3,
    explanation: "Chloroplasts are unique to plant cells (and algae). They contain chlorophyll and carry out photosynthesis, converting light energy into glucose. Animal cells cannot perform photosynthesis.",
    topic: "cells"
  },
  {
    id: "cell-q5",
    question: "What is the function of ribosomes?",
    options: [
      "Store genetic information",
      "Produce ATP energy",
      "Synthesize proteins from mRNA instructions",
      "Digest cellular waste"
    ],
    correctIndex: 2,
    explanation: "Ribosomes are the cell's protein factories. They read messenger RNA (mRNA) sequences and assemble the corresponding chain of amino acids to build proteins.",
    topic: "cells"
  },
  {
    id: "cell-q6",
    question: "Which cell theory principle states that all existing cells come from pre-existing cells?",
    options: [
      "All organisms are made of cells",
      "The cell is the basic unit of life",
      "All cells arise from pre-existing cells (Biogenesis)",
      "Cells can spontaneously generate from non-living matter"
    ],
    correctIndex: 2,
    explanation: "This principle, called biogenesis, was proposed by Rudolf Virchow (1855). It means cells only come from cell division — life cannot arise spontaneously from non-living material.",
    topic: "cells"
  },
  {
    id: "cell-q7",
    question: "What unique structure do plant cells have that provides rigid structural support?",
    options: ["Cell membrane", "Cell wall", "Tonoplast", "Plasmalemma"],
    correctIndex: 1,
    explanation: "Plant cells have a rigid cell wall made of cellulose surrounding their membrane. It provides structural support and prevents the cell from bursting when it absorbs too much water.",
    topic: "cells"
  },
  {
    id: "cell-q8",
    question: "The lysosome's main function is to:",
    options: [
      "Produce energy via photosynthesis",
      "Synthesize lipids and hormones",
      "Digest waste materials, old organelles, and pathogens",
      "Control which substances enter and leave the cell"
    ],
    correctIndex: 2,
    explanation: "Lysosomes contain digestive enzymes that break down cellular waste products, worn-out organelles, and foreign invaders like bacteria. This recycling process is called autophagy.",
    topic: "cells"
  },
  {
    id: "cell-q9",
    question: "Which organelle organizes spindle fibers during cell division in animal cells?",
    options: ["Nucleus", "Centrosome", "Vacuole", "Golgi apparatus"],
    correctIndex: 1,
    explanation: "The centrosome (containing two centrioles) organizes the mitotic spindle during cell division. It is found in animal cells but absent in most plant cells, which use other mechanisms for spindle formation.",
    topic: "cells"
  },
  {
    id: "cell-q10",
    question: "What is the role of the rough endoplasmic reticulum (RER)?",
    options: [
      "Lipid synthesis and drug detoxification",
      "Protein synthesis and folding, studded with ribosomes",
      "ATP production via oxidative phosphorylation",
      "Photosynthesis using light energy"
    ],
    correctIndex: 1,
    explanation: "The rough ER gets its name from the ribosomes dotting its surface. These ribosomes synthesize proteins that are threaded into the ER lumen for folding, modification, and transport to the Golgi apparatus.",
    topic: "cells"
  }
];
const ORGANELLE_COMPARISON = [
  { name: "Cell Membrane", animal: true, plant: true, color: "#4a90e2" },
  { name: "Nucleus", animal: true, plant: true, color: "#5c6bc0" },
  { name: "Mitochondria", animal: true, plant: true, color: "#ff7043" },
  { name: "Ribosomes", animal: true, plant: true, color: "#ffca28" },
  {
    name: "Endoplasmic Reticulum",
    animal: true,
    plant: true,
    color: "#ab47bc"
  },
  { name: "Golgi Apparatus", animal: true, plant: true, color: "#26a69a" },
  { name: "Lysosomes", animal: true, plant: false, color: "#ef5350" },
  { name: "Centrosome", animal: true, plant: false, color: "#66bb6a" },
  {
    name: "Cell Wall (cellulose)",
    animal: false,
    plant: true,
    color: "#8bc34a"
  },
  { name: "Chloroplasts", animal: false, plant: true, color: "#4caf50" },
  { name: "Central Vacuole", animal: false, plant: true, color: "#29b6f6" },
  { name: "Plasmodesmata", animal: false, plant: true, color: "#80cbc4" }
];
const PARAGRAPHS = [
  {
    heading: "Cell Theory: The Foundation of Biology",
    text: "The cell theory is one of the most fundamental unifying principles in all of biology. Developed in the mid-19th century through the work of Matthias Schleiden (1838) who studied plants, Theodor Schwann (1839) who studied animals, and Rudolf Virchow (1855) who contributed the principle of biogenesis, the modern cell theory rests on three pillars: all living organisms are composed of one or more cells; the cell is the basic structural and functional unit of life; and all cells arise only from pre-existing cells through cell division. This revolutionary framework dismantled the long-held belief in spontaneous generation and redirected biology toward studying the cell as the fundamental unit of life, rather than whole organisms. Understanding the cell is therefore the essential starting point for comprehending how any living system functions, grows, reproduces, and responds to its environment.",
    icon: "🔬",
    color: "oklch(0.68 0.19 262)"
  },
  {
    heading: "Prokaryotes vs. Eukaryotes: A Deep Structural Divide",
    text: "Cells fall into two fundamentally distinct categories based on their internal organization. Prokaryotic cells — found in bacteria and archaea — are structurally simpler: they lack a membrane-enclosed nucleus, instead keeping their circular DNA molecule in an area called the nucleoid. They have no membrane-bound organelles, are generally smaller (1–10 µm), and reproduce by binary fission. Eukaryotic cells, found in fungi, protists, plants, and animals, are structurally far more complex. They possess a true membrane-bound nucleus that houses linear chromosomes, contain an elaborate endomembrane system (ER, Golgi, vesicles), and house numerous specialized organelles such as mitochondria and, in plants, chloroplasts. The eukaryotic cell is typically 10–100 µm in size. This structural complexity enables eukaryotes to perform a far greater range of metabolic and developmental functions, ultimately making multicellular organisms possible.",
    icon: "🦠",
    color: "oklch(0.68 0.19 262)"
  },
  {
    heading: "Animal Cell Organelles: A Complete Tour",
    text: "The animal cell is a marvel of molecular organization. The nucleus, enclosed in a double membrane called the nuclear envelope, houses the cell's genome and coordinates gene expression. Within it, the nucleolus assembles ribosomal subunits. The rough endoplasmic reticulum (RER), studded with ribosomes, synthesizes and folds proteins for secretion or membrane insertion, while the smooth ER handles lipid biosynthesis, detoxification, and calcium storage. The Golgi apparatus receives proteins from the ER, modifies them with sugar chains, sorts them, and dispatches them in vesicles to their final destinations. Lysosomes, membranous bags of digestive enzymes, perform autophagy — digesting cellular debris and recycling molecular components. Mitochondria, the double-membraned power plants, carry out oxidative phosphorylation to generate ATP. The centrosome, containing two centrioles, orchestrates cell division by organizing the mitotic spindle. Ribosomes, free or bound, continuously translate mRNA into proteins. The entire cytoplasm is structured by a cytoskeleton of microtubules, actin filaments, and intermediate filaments, maintaining shape and enabling intracellular transport.",
    icon: "🧫",
    color: "oklch(0.68 0.19 262)"
  },
  {
    heading: "Plant Cells: Unique Adaptations for a Photosynthetic Life",
    text: "Plant cells share the core organelles of animal cells but contain several distinctive structures that reflect their sessile, photosynthetic lifestyle. The cellulose cell wall, external to the cell membrane, provides rigid structural support, prevents over-expansion during water uptake (turgor pressure), and contributes to the rigidity of plant tissues. Chloroplasts, the green double-membraned organelles containing thylakoid membrane stacks, carry out photosynthesis — capturing light energy to fix atmospheric CO₂ into glucose. They harbor their own DNA and ribosomes, reflecting their evolutionary origin as endosymbiotic cyanobacteria. The large central vacuole, often occupying up to 90% of mature plant cell volume, maintains turgor pressure, stores nutrients and waste products, and drives cell elongation during growth. Plasmodesmata, narrow membrane-lined channels traversing the cell wall between adjacent cells, enable direct cytoplasmic communication and molecular transport across cell boundaries — a plant-specific system with no animal equivalent.",
    icon: "🌿",
    color: "oklch(0.68 0.19 262)"
  },
  {
    heading: "Energy Production: Mitochondria and Cellular Respiration",
    text: "Every activity a cell performs — from muscle contraction to protein synthesis to ion pumping — requires a constant supply of energy in the form of adenosine triphosphate (ATP). Mitochondria are the primary ATP-generating factories in eukaryotic cells. They carry out aerobic cellular respiration across four interconnected stages: glycolysis (cytoplasm), pyruvate oxidation, the citric acid cycle (Krebs cycle), and oxidative phosphorylation via the electron transport chain (mitochondrial inner membrane). The electron transport chain pumps protons across the inner mitochondrial membrane, creating an electrochemical gradient that drives ATP synthase — often described as a molecular turbine — to synthesize ATP from ADP and phosphate. A single glucose molecule can yield approximately 30–32 ATP molecules through this complete process. Mitochondria replicate semi-autonomously, contain their own circular genome, and are transmitted maternally — evidence of their ancient bacterial ancestry, captured by an ancestral eukaryote in a pivotal event called endosymbiosis.",
    icon: "⚡",
    color: "oklch(0.68 0.19 262)"
  },
  {
    heading: "Protein Synthesis and Secretion: The Endomembrane Highway",
    text: "Cells continuously manufacture thousands of distinct proteins. For proteins destined for secretion, membrane insertion, or targeting to organelles, a highly coordinated pathway operates through the endomembrane system. Ribosomes on the rough ER synthesize these proteins co-translationally, threading the growing polypeptide into the ER lumen. Molecular chaperones within the ER assist in proper folding; misfolded proteins are flagged and degraded by the unfolded protein response. Correctly folded proteins are packaged into COPII vesicles that bud off to the Golgi apparatus. Within the Golgi stack, proteins are progressively modified — phosphorylated, glycosylated, and proteolytically cleaved — and sorted at the trans-Golgi network into vesicles bound for lysosomes, the plasma membrane, or secretory vesicles that fuse with the membrane to release cargo outside the cell. This entire process, called the secretory pathway, underlies the production of hormones, enzymes, antibodies, and extracellular matrix proteins.",
    icon: "🏭",
    color: "oklch(0.68 0.19 262)"
  },
  {
    heading: "Cell Division, Signaling, and the Boundary of Life",
    text: "The cell membrane is not simply a passive barrier — it is a dynamic, cholesterol-rich phospholipid bilayer embedded with hundreds of membrane proteins that carry out transport, signaling, adhesion, and structural functions. Signal transduction begins when extracellular ligands (hormones, growth factors, neurotransmitters) bind to membrane receptors, triggering cascades of intracellular events that alter gene expression or metabolism. Cell division itself is tightly regulated by these signals. During mitosis, the replicated chromosomes are separated with precision by spindle fibers anchored at centrosomes, ensuring each daughter cell receives an identical genome. Errors in this process lead to aneuploidy and can cause cancer. Programmed cell death (apoptosis) provides a counterbalance, eliminating damaged or unnecessary cells via controlled molecular demolition without triggering inflammation. Together, cell division, differentiation, migration, and apoptosis coordinate the development of a complex multicellular organism from a single fertilized egg — a process that remains one of the most astonishing phenomena in all of nature.",
    icon: "🔄",
    color: "oklch(0.68 0.19 262)"
  }
];
function CellsSection() {
  const [isPlant, setIsPlant] = reactExports.useState(false);
  return /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "px-4 py-16 md:px-8", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mx-auto max-w-5xl", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(AnimatedEntrance, { direction: "up", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
      SectionHeader,
      {
        topicId: "cells",
        title: "The Living Cell",
        subtitle: "From the earliest cell theory to the intricate machinery inside every living organism — explore the fundamental unit of all life on Earth."
      }
    ) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(AnimatedEntrance, { direction: "up", delay: 0.15, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        className: "mb-12 overflow-hidden rounded-2xl border",
        style: {
          borderColor: "oklch(0.68 0.19 262 / 0.35)",
          background: "oklch(0.16 0.02 262)",
          boxShadow: "0 0 40px oklch(0.68 0.19 262 / 0.15)"
        },
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "div",
            {
              className: "flex items-center justify-between gap-4 px-6 py-4 border-b",
              style: {
                borderColor: "oklch(0.68 0.19 262 / 0.2)",
                background: "oklch(0.17 0.02 262)"
              },
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    Microscope,
                    {
                      className: "h-5 w-5",
                      style: { color: "oklch(0.68 0.19 262)" }
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-display font-semibold text-foreground", children: "Interactive 3D Cell Model" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "span",
                    {
                      className: "rounded-full px-2.5 py-0.5 text-xs font-medium",
                      style: {
                        background: "oklch(0.68 0.19 262 / 0.15)",
                        color: "oklch(0.68 0.19 262)",
                        border: "1px solid oklch(0.68 0.19 262 / 0.3)"
                      },
                      children: isPlant ? "Plant Cell" : "Animal Cell"
                    }
                  )
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  "div",
                  {
                    className: "flex rounded-xl p-1 gap-1",
                    style: { background: "oklch(0.20 0.01 262 / 0.6)" },
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        "button",
                        {
                          type: "button",
                          onClick: () => setIsPlant(false),
                          "data-ocid": "toggle-animal-cell",
                          className: "rounded-lg px-4 py-1.5 text-sm font-medium transition-smooth",
                          style: !isPlant ? {
                            background: "oklch(0.68 0.19 262)",
                            color: "oklch(0.10 0 0)"
                          } : { color: "oklch(0.60 0 0)" },
                          children: "Animal Cell"
                        }
                      ),
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        "button",
                        {
                          type: "button",
                          onClick: () => setIsPlant(true),
                          "data-ocid": "toggle-plant-cell",
                          className: "rounded-lg px-4 py-1.5 text-sm font-medium transition-smooth",
                          style: isPlant ? {
                            background: "oklch(0.55 0.18 142)",
                            color: "oklch(0.10 0 0)"
                          } : { color: "oklch(0.60 0 0)" },
                          children: "Plant Cell"
                        }
                      )
                    ]
                  }
                )
              ]
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(AnimatePresence, { mode: "wait", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
            motion.div,
            {
              initial: { opacity: 0 },
              animate: { opacity: 1 },
              exit: { opacity: 0 },
              transition: { duration: 0.4 },
              children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                SceneErrorBoundary,
                {
                  sceneName: isPlant ? "Plant Cell 3D Model" : "Animal Cell 3D Model",
                  sceneColor: isPlant ? "#86efac" : "#93c5fd",
                  children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                    reactExports.Suspense,
                    {
                      fallback: /* @__PURE__ */ jsxRuntimeExports.jsx(
                        "div",
                        {
                          className: "flex items-center justify-center",
                          style: { height: 520, background: "#080d2e" },
                          children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-8 w-8 animate-spin rounded-full border-2 border-muted border-t-primary" })
                        }
                      ),
                      children: /* @__PURE__ */ jsxRuntimeExports.jsx(CellScene, { isPlant })
                    }
                  )
                }
              )
            },
            isPlant ? "plant" : "animal"
          ) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "div",
            {
              className: "flex flex-wrap gap-3 px-6 py-4 border-t",
              style: {
                borderColor: "oklch(0.68 0.19 262 / 0.15)",
                background: "oklch(0.17 0.01 262)"
              },
              children: [
                { color: "#4a90e2", label: "Nucleus" },
                { color: "#ff7043", label: "Mitochondria" },
                { color: "#ab47bc", label: "Rough ER" },
                { color: "#26a69a", label: "Golgi" },
                { color: "#ef5350", label: "Lysosome" },
                ...isPlant ? [
                  { color: "#4caf50", label: "Chloroplast" },
                  { color: "#80d8ff", label: "Central Vacuole" }
                ] : [{ color: "#66bb6a", label: "Centrosome" }]
              ].map((item) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1.5", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "div",
                  {
                    className: "h-2.5 w-2.5 rounded-full",
                    style: { background: item.color }
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-muted-foreground", children: item.label })
              ] }, item.label))
            }
          )
        ]
      }
    ) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      StaggerContainer,
      {
        className: "mb-14 flex flex-col gap-8",
        staggerDelay: 0.08,
        children: PARAGRAPHS.map((para) => /* @__PURE__ */ jsxRuntimeExports.jsx(StaggerItem, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "div",
          {
            className: "rounded-2xl p-6 border",
            style: {
              borderColor: "oklch(0.68 0.19 262 / 0.2)",
              background: "oklch(0.17 0.015 262 / 0.6)"
            },
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 mb-3", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-2xl", children: para.icon }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "h3",
                  {
                    className: "font-display text-xl font-bold",
                    style: { color: para.color },
                    children: para.heading
                  }
                )
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground leading-relaxed text-[0.94rem]", children: para.text })
            ]
          }
        ) }, para.heading))
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx(AnimatedEntrance, { direction: "up", delay: 0.1, children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-14", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 mb-6", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          FlaskConical,
          {
            className: "h-5 w-5",
            style: { color: "oklch(0.68 0.19 262)" }
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "h3",
          {
            className: "font-display text-2xl font-bold",
            style: { color: "oklch(0.68 0.19 262)" },
            children: "Animal vs. Plant Cell: Organelle Comparison"
          }
        )
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "div",
        {
          className: "overflow-hidden rounded-2xl border",
          style: { borderColor: "oklch(0.68 0.19 262 / 0.25)" },
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "div",
              {
                className: "grid grid-cols-3 px-5 py-3 text-sm font-semibold",
                style: { background: "oklch(0.20 0.03 262 / 0.8)" },
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-foreground", children: "Organelle" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "span",
                    {
                      className: "text-center",
                      style: { color: "oklch(0.68 0.19 262)" },
                      children: "Animal Cell"
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "span",
                    {
                      className: "text-center",
                      style: { color: "oklch(0.55 0.18 142)" },
                      children: "Plant Cell"
                    }
                  )
                ]
              }
            ),
            ORGANELLE_COMPARISON.map((row, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
              motion.div,
              {
                initial: { opacity: 0, x: -20 },
                whileInView: { opacity: 1, x: 0 },
                viewport: { once: true },
                transition: { delay: i * 0.04, duration: 0.4 },
                className: "grid grid-cols-3 px-5 py-3 border-t items-center transition-smooth hover:brightness-110",
                style: {
                  borderColor: "oklch(0.68 0.19 262 / 0.12)",
                  background: i % 2 === 0 ? "oklch(0.17 0.01 262 / 0.5)" : "oklch(0.18 0.005 262 / 0.3)"
                },
                "data-ocid": `organelle-row-${row.name.toLowerCase().replace(/\s+/g, "-")}`,
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "div",
                      {
                        className: "h-2 w-2 rounded-full shrink-0",
                        style: { background: row.color }
                      }
                    ),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm text-foreground", children: row.name })
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex justify-center", children: row.animal ? /* @__PURE__ */ jsxRuntimeExports.jsx(
                    Check,
                    {
                      className: "h-4 w-4",
                      style: { color: "oklch(0.68 0.19 262)" }
                    }
                  ) : /* @__PURE__ */ jsxRuntimeExports.jsx(X, { className: "h-4 w-4 text-muted-foreground opacity-30" }) }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex justify-center", children: row.plant ? /* @__PURE__ */ jsxRuntimeExports.jsx(
                    Check,
                    {
                      className: "h-4 w-4",
                      style: { color: "oklch(0.55 0.18 142)" }
                    }
                  ) : /* @__PURE__ */ jsxRuntimeExports.jsx(X, { className: "h-4 w-4 text-muted-foreground opacity-30" }) })
                ]
              },
              row.name
            ))
          ]
        }
      )
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(AnimatedEntrance, { direction: "up", delay: 0.1, children: /* @__PURE__ */ jsxRuntimeExports.jsx(QuizEngine, { topicId: "cells", questions: QUIZ_QUESTIONS }) })
  ] }) });
}
export {
  CellsSection as default
};
