import { c as createLucideIcon, r as reactExports, j as jsxRuntimeExports } from "./index-V1Xys_hZ.js";
import { A as AnimatedEntrance, S as SectionHeader, a as StaggerContainer, b as StaggerItem, Q as QuizEngine } from "./SectionHeader-BzOZ529A.js";
import { S as SceneErrorBoundary$1 } from "./SceneErrorBoundary-NlafLXOk.js";
import { C as Canvas, O as OrbitControls, u as useFrame, V as Vector3, Q as Quaternion, H as Html, a as CatmullRomCurve3, T as TubeGeometry } from "./OrbitControls-Cr3drnWX.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  [
    "path",
    {
      d: "M4 14a1 1 0 0 1-.78-1.63l9.9-10.2a.5.5 0 0 1 .86.46l-1.92 6.02A1 1 0 0 0 13 10h7a1 1 0 0 1 .78 1.63l-9.9 10.2a.5.5 0 0 1-.86-.46l1.92-6.02A1 1 0 0 0 11 14z",
      key: "1xq2db"
    }
  ]
];
const Zap = createLucideIcon("zap", __iconNode);
class SceneErrorBoundary extends reactExports.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }
  static getDerivedStateFromError() {
    return { hasError: true };
  }
  render() {
    if (this.state.hasError)
      return this.props.fallback ?? /* @__PURE__ */ jsxRuntimeExports.jsx(
        "div",
        {
          style: {
            width: "100%",
            height: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: "#a78bfa",
            fontSize: 14,
            background: "#080d2e"
          },
          children: "Unable to render protein scene"
        }
      );
    return this.props.children;
  }
}
const NAVY_BG = "#080d2e";
const AA_BEADS = [
  { id: "gly", color: "#ff6b35", name: "Gly" },
  { id: "ala", color: "#ffa040", name: "Ala" },
  { id: "val", color: "#ffcb47", name: "Val" },
  { id: "leu", color: "#e8d44d", name: "Leu" },
  { id: "ile", color: "#a8e063", name: "Ile" },
  { id: "ser", color: "#56c596", name: "Ser" },
  { id: "thr", color: "#3bbdbd", name: "Thr" },
  { id: "asp", color: "#4da6ff", name: "Asp" },
  { id: "lys", color: "#7b77e9", name: "Lys" },
  { id: "phe", color: "#c86dd7", name: "Phe" },
  { id: "tyr", color: "#e96595", name: "Tyr" },
  { id: "cys", color: "#ff8484", name: "Cys" },
  { id: "met", color: "#ff9966", name: "Met" },
  { id: "trp", color: "#ffbb55", name: "Trp" }
];
function AminoAcidBead({
  position,
  color,
  pulseOffset
}) {
  const meshRef = reactExports.useRef(null);
  useFrame((state) => {
    if (meshRef.current) {
      const s = 1 + Math.sin(state.clock.elapsedTime * 1.1 + pulseOffset) * 0.07;
      meshRef.current.scale.setScalar(s);
    }
  });
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("mesh", { ref: meshRef, position, children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("sphereGeometry", { args: [0.18, 16, 16] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "meshStandardMaterial",
      {
        color,
        emissive: color,
        emissiveIntensity: 0.3,
        roughness: 0.35,
        metalness: 0.1
      }
    )
  ] });
}
function PrimaryChain() {
  const groupRef = reactExports.useRef(null);
  const count = AA_BEADS.length;
  const spread = 0.55;
  useFrame((_, delta) => {
    if (groupRef.current) groupRef.current.rotation.y += delta * 0.22;
  });
  const positions = reactExports.useMemo(
    () => Array.from(
      { length: count },
      (_, i) => new Vector3(
        (i - count / 2) * spread,
        Math.sin(i * 0.5) * 0.3,
        Math.cos(i * 0.7) * 0.25
      )
    ),
    [count]
  );
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("group", { ref: groupRef, children: [
    AA_BEADS.slice(1).map((bead, rawIdx) => {
      const i = rawIdx + 1;
      const pos = positions[i];
      const prev = positions[i - 1];
      const mid = pos.clone().add(prev).multiplyScalar(0.5);
      const dir = pos.clone().sub(prev);
      const len = dir.length();
      const quat = new Quaternion().setFromUnitVectors(
        new Vector3(0, 1, 0),
        dir.clone().normalize()
      );
      return /* @__PURE__ */ jsxRuntimeExports.jsxs("mesh", { position: mid, quaternion: quat, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("cylinderGeometry", { args: [0.042, 0.042, len, 8] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "meshStandardMaterial",
          {
            color: "#a78bfa",
            roughness: 0.5,
            emissive: "#7c3aed",
            emissiveIntensity: 0.1
          }
        )
      ] }, `bond-${bead.id}`);
    }),
    AA_BEADS.map((bead, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs("group", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        AminoAcidBead,
        {
          position: positions[i],
          color: bead.color,
          pulseOffset: i * 0.4
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        Html,
        {
          position: [positions[i].x, positions[i].y + 0.33, positions[i].z],
          style: { pointerEvents: "none" },
          children: /* @__PURE__ */ jsxRuntimeExports.jsx(
            "div",
            {
              style: {
                background: `${bead.color}22`,
                border: `1px solid ${bead.color}77`,
                borderRadius: "5px",
                padding: "1px 5px",
                fontSize: "8px",
                fontWeight: 700,
                color: bead.color,
                whiteSpace: "nowrap",
                textShadow: `0 0 4px ${bead.color}88`
              },
              children: bead.name
            }
          )
        }
      )
    ] }, `aa-${bead.id}`)),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      Html,
      {
        position: [positions[0].x - 0.2, positions[0].y + 0.68, 0],
        style: { pointerEvents: "none" },
        children: /* @__PURE__ */ jsxRuntimeExports.jsx(
          "div",
          {
            style: {
              background: "rgba(255,153,68,0.2)",
              border: "1px solid #ff994488",
              borderRadius: "7px",
              padding: "2px 8px",
              color: "#ff9944",
              fontSize: "11px",
              fontWeight: 700,
              whiteSpace: "nowrap",
              boxShadow: "0 0 10px #ff994455",
              textShadow: "0 0 8px #ff994488"
            },
            children: "N-terminus (+H₃N)"
          }
        )
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      Html,
      {
        position: [
          positions[count - 1].x + 0.1,
          positions[count - 1].y + 0.68,
          0
        ],
        style: { pointerEvents: "none" },
        children: /* @__PURE__ */ jsxRuntimeExports.jsx(
          "div",
          {
            style: {
              background: "rgba(77,184,255,0.2)",
              border: "1px solid #4db8ff88",
              borderRadius: "7px",
              padding: "2px 8px",
              color: "#4db8ff",
              fontSize: "11px",
              fontWeight: 700,
              whiteSpace: "nowrap",
              boxShadow: "0 0 10px #4db8ff55",
              textShadow: "0 0 8px #4db8ff88"
            },
            children: "C-terminus (–COO⁻)"
          }
        )
      }
    ),
    [
      {
        label: "Polypeptide Chain",
        color: "#fbbf24",
        pos: [0, 1.4, 0]
      },
      {
        label: "Peptide Bond (–CO–NH–)",
        color: "#a78bfa",
        pos: [0, -1.3, 0]
      },
      {
        label: "R-Group (Side Chain)",
        color: "#34d399",
        pos: [0, 0.35, 0.8]
      }
    ].map((lbl) => /* @__PURE__ */ jsxRuntimeExports.jsx(
      Html,
      {
        position: lbl.pos,
        style: { pointerEvents: "none" },
        children: /* @__PURE__ */ jsxRuntimeExports.jsx(
          "div",
          {
            style: {
              background: "rgba(5,10,40,0.85)",
              border: `1px solid ${lbl.color}55`,
              borderRadius: "7px",
              padding: "2px 7px",
              fontSize: "9px",
              fontWeight: 700,
              color: lbl.color,
              whiteSpace: "nowrap",
              textShadow: `0 0 5px ${lbl.color}77`
            },
            children: lbl.label
          }
        )
      },
      lbl.label
    ))
  ] });
}
function AlphaHelix({
  position,
  id,
  color = "#ff7722",
  label
}) {
  const meshRef = reactExports.useRef(null);
  const [hovered, setHovered] = reactExports.useState(false);
  useFrame((_, delta) => {
    if (meshRef.current)
      meshRef.current.rotation.y += delta * (hovered ? 0.7 : 0.2);
  });
  const curve = reactExports.useMemo(() => {
    const pts = [];
    for (let i = 0; i <= 80; i++) {
      const t = i / 80 * 4 * Math.PI * 2;
      pts.push(
        new Vector3(
          Math.cos(t) * 0.28,
          i / 80 * 1.6 - 0.8,
          Math.sin(t) * 0.28
        )
      );
    }
    return new CatmullRomCurve3(pts);
  }, []);
  const geo = reactExports.useMemo(
    () => new TubeGeometry(curve, 80, hovered ? 0.07 : 0.055, 10, false),
    [curve, hovered]
  );
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("group", { position, children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "mesh",
      {
        ref: meshRef,
        geometry: geo,
        onPointerEnter: () => setHovered(true),
        onPointerLeave: () => setHovered(false),
        children: /* @__PURE__ */ jsxRuntimeExports.jsx(
          "meshStandardMaterial",
          {
            color: hovered ? "#ffaa44" : color,
            emissive: color,
            emissiveIntensity: hovered ? 0.55 : 0.22,
            roughness: 0.3,
            metalness: 0.15
          }
        )
      },
      `helix-${id}-${hovered}`
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Html, { position: [0.62, 0.95, 0], style: { pointerEvents: "none" }, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        style: {
          background: `${color}28`,
          border: `1px solid ${color}99`,
          borderRadius: "8px",
          padding: "3px 8px",
          fontSize: "10px",
          fontWeight: 700,
          color: hovered ? "#ffaa44" : color,
          whiteSpace: "nowrap",
          boxShadow: `0 0 10px ${color}44`,
          textShadow: `0 0 5px ${color}66`
        },
        children: [
          "🌀 ",
          label ?? "Alpha-Helix"
        ]
      }
    ) })
  ] });
}
function BetaSheet({
  position,
  id
}) {
  const [hovered, setHovered] = reactExports.useState(false);
  const strands = [
    { y: 0.3, flip: false, sid: "top" },
    { y: 0, flip: true, sid: "mid" },
    { y: -0.3, flip: false, sid: "bot" }
  ];
  const color = "#ffd44d";
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("group", { position, children: [
    strands.map((s) => /* @__PURE__ */ jsxRuntimeExports.jsxs("group", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "mesh",
        {
          position: [0, s.y, 0],
          rotation: [0, s.flip ? Math.PI : 0, 0],
          onPointerEnter: () => setHovered(true),
          onPointerLeave: () => setHovered(false),
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("boxGeometry", { args: [0.9, 0.13, 0.22] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "meshStandardMaterial",
              {
                color: hovered ? "#ffe17a" : color,
                emissive: "#ffb300",
                emissiveIntensity: hovered ? 0.5 : 0.2,
                roughness: 0.45
              }
            )
          ]
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "mesh",
        {
          position: [0.55, s.y, 0],
          rotation: [0, s.flip ? Math.PI : 0, Math.PI / 2],
          onPointerEnter: () => setHovered(true),
          onPointerLeave: () => setHovered(false),
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("coneGeometry", { args: [0.13, 0.22, 4] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "meshStandardMaterial",
              {
                color: hovered ? "#ffe17a" : color,
                emissive: "#ffb300",
                emissiveIntensity: hovered ? 0.5 : 0.2
              }
            )
          ]
        }
      )
    ] }, `${id}-s${s.sid}`)),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Html, { position: [0.88, 0.6, 0], style: { pointerEvents: "none" }, children: /* @__PURE__ */ jsxRuntimeExports.jsx(
      "div",
      {
        style: {
          background: `${color}28`,
          border: `1px solid ${color}99`,
          borderRadius: "8px",
          padding: "3px 8px",
          fontSize: "10px",
          fontWeight: 700,
          color,
          whiteSpace: "nowrap",
          boxShadow: `0 0 10px ${color}44`
        },
        children: "➡ Beta-Sheet"
      }
    ) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Html, { position: [0, -0.52, 0], style: { pointerEvents: "none" }, children: /* @__PURE__ */ jsxRuntimeExports.jsx(
      "div",
      {
        style: {
          background: "rgba(52,211,153,0.15)",
          border: "1px solid #34d39966",
          borderRadius: "6px",
          padding: "2px 6px",
          fontSize: "9px",
          fontWeight: 700,
          color: "#34d399",
          whiteSpace: "nowrap"
        },
        children: "Hydrogen Bonds"
      }
    ) })
  ] });
}
function LoopConnector({
  from,
  to
}) {
  const curve = reactExports.useMemo(() => {
    const mid = from.clone().lerp(to, 0.5);
    mid.x += 0.4;
    return new CatmullRomCurve3([from, mid, to]);
  }, [from, to]);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("mesh", { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("tubeGeometry", { args: [curve, 20, 0.03, 6, false] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "meshStandardMaterial",
      {
        color: "#b0a0c8",
        roughness: 0.7,
        transparent: true,
        opacity: 0.8
      }
    )
  ] });
}
function TertiaryFoldScene({ paused }) {
  const groupRef = reactExports.useRef(null);
  useFrame((_, delta) => {
    if (groupRef.current && !paused)
      groupRef.current.rotation.y += delta * 0.18;
  });
  const loopFrom = reactExports.useMemo(() => new Vector3(-0.6, 0.9, 0), []);
  const loopTo = reactExports.useMemo(() => new Vector3(0.3, 0.2, -0.2), []);
  const loopFrom2 = reactExports.useMemo(() => new Vector3(0.8, 0.6, -0.2), []);
  const loopTo2 = reactExports.useMemo(() => new Vector3(0.3, 0.2, 0.3), []);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("group", { ref: groupRef, children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      AlphaHelix,
      {
        id: "t-h1",
        position: [-0.9, 0.2, 0],
        color: "#ff7722",
        label: "Alpha-Helix (α)"
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      AlphaHelix,
      {
        id: "t-h2",
        position: [0.6, -0.5, 0.3],
        color: "#e05520",
        label: "Helix Region"
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx(BetaSheet, { id: "t-b1", position: [0.3, 0.6, -0.2] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(LoopConnector, { from: loopFrom, to: loopTo }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(LoopConnector, { from: loopFrom2, to: loopTo2 }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("mesh", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("sphereGeometry", { args: [0.5, 20, 20] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "meshStandardMaterial",
        {
          color: "#ff6600",
          emissive: "#ff4400",
          emissiveIntensity: 0.12,
          transparent: true,
          opacity: 0.07
        }
      )
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("mesh", { position: [-0.1, 0.1, 0.4], children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("sphereGeometry", { args: [0.09, 12, 12] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "meshStandardMaterial",
        {
          color: "#e8d44d",
          emissive: "#d4aa00",
          emissiveIntensity: 0.5
        }
      )
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Html, { position: [0.85, 1.35, 0], style: { pointerEvents: "none" }, children: /* @__PURE__ */ jsxRuntimeExports.jsx(
      "div",
      {
        style: {
          background: "rgba(176,160,200,0.2)",
          border: "1px solid #b0a0c888",
          borderRadius: "6px",
          padding: "2px 7px",
          fontSize: "9px",
          fontWeight: 700,
          color: "#c4b5fd",
          whiteSpace: "nowrap"
        },
        children: "Random Coil / Loop"
      }
    ) }),
    [
      {
        label: "Disulfide Bond (S–S)",
        color: "#e8d44d",
        pos: [0.4, 0.5, 1]
      },
      {
        label: "Hydrophobic Core",
        color: "#fb923c",
        pos: [-0.8, -0.2, 0.8]
      },
      {
        label: "Tertiary Fold",
        color: "#c084fc",
        pos: [1.3, 0.9, 0.5]
      }
    ].map((lbl) => /* @__PURE__ */ jsxRuntimeExports.jsx(
      Html,
      {
        position: lbl.pos,
        style: { pointerEvents: "none" },
        children: /* @__PURE__ */ jsxRuntimeExports.jsx(
          "div",
          {
            style: {
              background: "rgba(5,10,40,0.85)",
              border: `1px solid ${lbl.color}66`,
              borderRadius: "7px",
              padding: "2px 7px",
              fontSize: "9px",
              fontWeight: 700,
              color: lbl.color,
              whiteSpace: "nowrap",
              textShadow: `0 0 4px ${lbl.color}77`,
              boxShadow: `0 0 8px ${lbl.color}33`
            },
            children: lbl.label
          }
        )
      },
      lbl.label
    ))
  ] });
}
function SecondaryScene({ paused }) {
  const groupRef = reactExports.useRef(null);
  useFrame((_, delta) => {
    if (groupRef.current && !paused)
      groupRef.current.rotation.y += delta * 0.18;
  });
  const loopFrom = reactExports.useMemo(() => new Vector3(-0.6, 0.9, 0), []);
  const loopTo = reactExports.useMemo(() => new Vector3(0.3, 0.2, -0.2), []);
  const loopFrom2 = reactExports.useMemo(() => new Vector3(0.8, 0.6, -0.2), []);
  const loopTo2 = reactExports.useMemo(() => new Vector3(0.3, 0.2, 0.3), []);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("group", { ref: groupRef, children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(AlphaHelix, { id: "s-h1", position: [-0.9, 0.2, 0] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      AlphaHelix,
      {
        id: "s-h2",
        position: [0.6, -0.5, 0.3],
        color: "#e05520",
        label: "Helix Region"
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx(BetaSheet, { id: "s-b1", position: [0.3, 0.6, -0.2] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(LoopConnector, { from: loopFrom, to: loopTo }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(LoopConnector, { from: loopFrom2, to: loopTo2 }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Html, { position: [0.85, 1.35, 0], style: { pointerEvents: "none" }, children: /* @__PURE__ */ jsxRuntimeExports.jsx(
      "div",
      {
        style: {
          background: "rgba(176,160,200,0.2)",
          border: "1px solid #b0a0c888",
          borderRadius: "6px",
          padding: "2px 7px",
          fontSize: "9px",
          fontWeight: 700,
          color: "#c4b5fd",
          whiteSpace: "nowrap"
        },
        children: "Random Coil / Loop"
      }
    ) })
  ] });
}
const LEVEL_BUTTONS = [
  {
    id: "primary",
    label: "Primary",
    color: "#ff9944",
    desc: "Amino acid sequence"
  },
  {
    id: "secondary",
    label: "Secondary",
    color: "#ffd44d",
    desc: "α-helices & β-sheets"
  },
  {
    id: "tertiary",
    label: "Tertiary",
    color: "#ff6622",
    desc: "3D folded structure"
  }
];
const LEVEL_LEGENDS = {
  primary: [
    { color: "#ff9944", label: "Amino Acid" },
    { color: "#a78bfa", label: "Peptide Bond" },
    { color: "#ff9944", label: "N-terminus (+H₃N)" },
    { color: "#4db8ff", label: "C-terminus (–COO⁻)" },
    { color: "#34d399", label: "R Group (Side Chain)" }
  ],
  secondary: [
    { color: "#ff7722", label: "Alpha-Helix (α)" },
    { color: "#ffd44d", label: "Beta-Sheet (β)" },
    { color: "#34d399", label: "Hydrogen Bond" },
    { color: "#b0a0c8", label: "Random Coil / Loop" }
  ],
  tertiary: [
    { color: "#ff7722", label: "Alpha-Helix" },
    { color: "#ffd44d", label: "Beta-Sheet" },
    { color: "#e8d44d", label: "Disulfide Bond" },
    { color: "#fb923c", label: "Hydrophobic Core" },
    { color: "#c084fc", label: "Tertiary Fold" }
  ]
};
function ProteinScene({
  level,
  onLevelChange
}) {
  var _a, _b, _c;
  const [paused, setPaused] = reactExports.useState(false);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { "aria-label": "Interactive protein structure viewer", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        className: "relative w-full rounded-2xl overflow-hidden",
        style: { height: "480px", background: NAVY_BG },
        onPointerEnter: () => setPaused(true),
        onPointerLeave: () => setPaused(false),
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "div",
            {
              className: "absolute top-3 left-3 z-10 flex gap-2",
              role: "tablist",
              "aria-label": "Protein structure level",
              children: LEVEL_BUTTONS.map((btn) => /* @__PURE__ */ jsxRuntimeExports.jsx(
                "button",
                {
                  type: "button",
                  role: "tab",
                  "aria-selected": level === btn.id,
                  "aria-label": `View ${btn.label} protein structure — ${btn.desc}`,
                  onClick: () => onLevelChange(btn.id),
                  "data-ocid": `protein-level-${btn.id}`,
                  style: {
                    background: level === btn.id ? `${btn.color}28` : "rgba(5,10,40,0.88)",
                    border: `1px solid ${level === btn.id ? btn.color : "rgba(100,110,200,0.3)"}`,
                    color: level === btn.id ? btn.color : "rgba(160,180,255,0.7)",
                    borderRadius: "8px",
                    padding: "5px 12px",
                    fontSize: "12px",
                    fontWeight: 600,
                    cursor: "pointer",
                    backdropFilter: "blur(6px)",
                    transition: "all 0.25s ease",
                    boxShadow: level === btn.id ? `0 0 12px ${btn.color}44` : "none"
                  },
                  children: btn.label
                },
                btn.id
              ))
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            SceneErrorBoundary,
            {
              fallback: /* @__PURE__ */ jsxRuntimeExports.jsxs(
                "div",
                {
                  style: {
                    width: "100%",
                    height: "100%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    background: NAVY_BG,
                    color: "#a78bfa",
                    fontSize: 14,
                    flexDirection: "column",
                    gap: 8
                  },
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { style: { fontSize: 28 }, children: "🧬" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Protein structure visualization" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { style: { fontSize: 12, color: "#6b7dd8" }, children: (_a = LEVEL_BUTTONS.find((b) => b.id === level)) == null ? void 0 : _a.desc })
                  ]
                }
              ),
              children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
                Canvas,
                {
                  role: "img",
                  "aria-label": `Protein ${level} structure — pure geometry, permanent labels`,
                  camera: { position: [0, 0, 4.5], fov: 50 },
                  gl: { antialias: true, alpha: false },
                  style: { background: NAVY_BG },
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("color", { attach: "background", args: [NAVY_BG] }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("ambientLight", { intensity: 0.45 }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("pointLight", { position: [3, 3, 3], intensity: 2, color: "#ffaa55" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "pointLight",
                      {
                        position: [-3, -2, -2],
                        intensity: 0.9,
                        color: "#aa6600"
                      }
                    ),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("pointLight", { position: [0, -3, 2], intensity: 0.5, color: "#7c3aed" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "spotLight",
                      {
                        position: [0, 5, 2],
                        intensity: 0.7,
                        angle: 0.5,
                        penumbra: 0.6,
                        color: "#ffeecc"
                      }
                    ),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs(reactExports.Suspense, { fallback: null, children: [
                      level === "primary" && /* @__PURE__ */ jsxRuntimeExports.jsx(PrimaryChain, {}),
                      level === "secondary" && /* @__PURE__ */ jsxRuntimeExports.jsx(SecondaryScene, { paused }),
                      level === "tertiary" && /* @__PURE__ */ jsxRuntimeExports.jsx(TertiaryFoldScene, { paused })
                    ] }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      OrbitControls,
                      {
                        enablePan: false,
                        minDistance: 2.5,
                        maxDistance: 8,
                        autoRotate: !paused,
                        autoRotateSpeed: 1.1,
                        enableDamping: true,
                        dampingFactor: 0.08
                      }
                    )
                  ]
                }
              )
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "div",
            {
              className: "absolute bottom-3 left-1/2 -translate-x-1/2 pointer-events-none",
              style: {
                background: "rgba(5,10,40,0.7)",
                borderRadius: "20px",
                padding: "4px 12px",
                border: "1px solid rgba(255,255,255,0.07)"
              },
              children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                "p",
                {
                  style: {
                    fontSize: "10px",
                    color: "rgba(160,180,255,0.65)",
                    textAlign: "center",
                    whiteSpace: "nowrap"
                  },
                  children: "Pure geometry · Hover structures · Drag to rotate · Scroll to zoom"
                }
              )
            }
          )
        ]
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        className: "mt-3 rounded-xl p-3 flex flex-wrap gap-3",
        style: {
          background: "rgba(5,10,40,0.72)",
          border: "1px solid rgba(100,110,200,0.25)",
          backdropFilter: "blur(8px)"
        },
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "div",
            {
              style: {
                width: "100%",
                fontSize: "11px",
                fontWeight: 700,
                color: "#a78bfa",
                marginBottom: "2px",
                letterSpacing: "0.04em"
              },
              children: [
                (_b = LEVEL_BUTTONS.find((b) => b.id === level)) == null ? void 0 : _b.label.toUpperCase(),
                " —",
                " ",
                (_c = LEVEL_BUTTONS.find((b) => b.id === level)) == null ? void 0 : _c.desc
              ]
            }
          ),
          LEVEL_LEGENDS[level].map((item) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1.5", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "div",
              {
                style: {
                  width: "10px",
                  height: "10px",
                  borderRadius: "3px",
                  background: item.color,
                  boxShadow: `0 0 5px ${item.color}88`,
                  flexShrink: 0
                }
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "span",
              {
                style: { fontSize: "12px", color: item.color, fontWeight: 600 },
                children: item.label
              }
            )
          ] }, item.label))
        ]
      }
    )
  ] });
}
const PROTEIN_QUIZ = [
  {
    id: "p1",
    question: "What are the four components attached to the central alpha-carbon of an amino acid?",
    options: [
      "Amino group, carboxyl group, R side chain, hydrogen atom",
      "Phosphate group, sugar, base, hydroxyl group",
      "Peptide bond, carbonyl, amine, methyl group",
      "Adenine, guanine, cytosine, thymine"
    ],
    correctIndex: 0,
    explanation: "Every amino acid has a central alpha-carbon bonded to: an amino group (–NH₂), a carboxyl group (–COOH), a variable R side chain (determines the amino acid's identity), and a hydrogen atom.",
    topic: "proteins"
  },
  {
    id: "p2",
    question: "How is a peptide bond formed between two amino acids?",
    options: [
      "By a condensation reaction releasing water between the carboxyl of one and the amino group of the next",
      "By an oxidation reaction forming a disulfide bridge",
      "By ionic attraction between opposite charges",
      "By hydrogen bonding between backbone atoms"
    ],
    correctIndex: 0,
    explanation: "A peptide bond (–CO–NH–) forms via a condensation (dehydration) reaction: the carboxyl group of one amino acid reacts with the amino group of the next, releasing a water molecule. This creates the –CO–NH– covalent linkage.",
    topic: "proteins"
  },
  {
    id: "p3",
    question: "What defines the PRIMARY structure of a protein?",
    options: [
      "The coiling of the polypeptide into an alpha-helix",
      "The linear sequence of amino acids in the chain",
      "The overall 3D folded shape of the protein",
      "The association of multiple polypeptide chains"
    ],
    correctIndex: 1,
    explanation: "Primary structure is simply the order of amino acids along the polypeptide chain, read from the N-terminus to the C-terminus. This sequence is encoded in the gene and determines all higher-order structures.",
    topic: "proteins"
  },
  {
    id: "p4",
    question: "What type of bonds hold an alpha-helix together?",
    options: [
      "Covalent peptide bonds between side chains",
      "Disulfide bridges between cysteine residues",
      "Hydrogen bonds between backbone carbonyl and amino groups every 4 residues",
      "Ionic interactions between R groups"
    ],
    correctIndex: 2,
    explanation: "Alpha-helices are stabilized by hydrogen bonds between the carbonyl oxygen (C=O) of one residue and the amide nitrogen (N–H) of a residue four positions further along the backbone. These regular H-bonds create the tight coil.",
    topic: "proteins"
  },
  {
    id: "p5",
    question: "Which describes beta-sheets correctly?",
    options: [
      "Tightly coiled ribbons stabilized by side-chain interactions",
      "Extended polypeptide strands lying side by side, linked by backbone hydrogen bonds",
      "Globular regions formed by hydrophobic R groups clustering together",
      "Double-stranded structures similar to DNA"
    ],
    correctIndex: 1,
    explanation: "Beta-sheets are formed when two or more extended polypeptide strands line up side-by-side. Backbone hydrogen bonds (not side-chain bonds) form between the strands. Strands can be parallel (same N→C direction) or antiparallel.",
    topic: "proteins"
  },
  {
    id: "p6",
    question: "What drives the TERTIARY structure folding of a protein?",
    options: [
      "Watson-Crick base pairing rules",
      "R-group interactions including hydrophobic effect, H-bonds, ionic bonds, and disulfide bridges",
      "Only covalent peptide bonds between the backbone atoms",
      "Ribosomal RNA templates that guide folding"
    ],
    correctIndex: 1,
    explanation: "Tertiary structure is the overall 3D shape of a single polypeptide. It is driven by R-group (side-chain) interactions: nonpolar R groups cluster in the hydrophobic core (hydrophobic effect), while H-bonds, ionic bonds, and disulfide bridges between cysteines further stabilize the fold.",
    topic: "proteins"
  },
  {
    id: "p7",
    question: "Hemoglobin is a classic example of which level of protein structure?",
    options: [
      "Primary structure — its long amino acid sequence",
      "Secondary structure — its alpha-helices and beta-sheets",
      "Tertiary structure — the single folded globin chain",
      "Quaternary structure — four polypeptide subunits assembled together"
    ],
    correctIndex: 3,
    explanation: "Quaternary structure arises when two or more folded polypeptide chains (subunits) associate into one functional complex. Hemoglobin has four subunits (2 alpha-globin + 2 beta-globin chains) that work cooperatively to carry oxygen.",
    topic: "proteins"
  },
  {
    id: "p8",
    question: "Which of the following is an example of a structural protein?",
    options: [
      "Hemoglobin — transports oxygen in red blood cells",
      "Insulin — a hormone that regulates blood glucose",
      "Collagen — provides tensile strength to skin and tendons",
      "Amylase — an enzyme that digests starch"
    ],
    correctIndex: 2,
    explanation: "Collagen and keratin are structural proteins. Collagen forms triple-helix fibers that give connective tissues (skin, cartilage, tendons) their remarkable tensile strength. Keratin provides the tough scaffold for hair, nails, and the outer skin layer.",
    topic: "proteins"
  },
  {
    id: "p9",
    question: "What happens to a protein when it is DENATURED?",
    options: [
      "Its amino acid sequence is permanently destroyed",
      "New peptide bonds are created, changing its primary structure",
      "Non-covalent bonds maintaining its 3D shape are disrupted, causing it to unfold and lose function",
      "It is broken into individual amino acids by hydrolysis"
    ],
    correctIndex: 2,
    explanation: "Denaturation disrupts the non-covalent interactions (hydrogen bonds, ionic bonds, hydrophobic interactions) that hold the protein's 3D shape together. The primary structure (amino acid sequence, held by covalent peptide bonds) remains intact, but the protein unfolds and loses its biological activity.",
    topic: "proteins"
  },
  {
    id: "p10",
    question: "Where in the cell are proteins destined for secretion outside the cell primarily made and processed?",
    options: [
      "Free ribosomes in the cytoplasm, then directly exported",
      "Rough ER ribosomes → Golgi apparatus → secretory vesicles → plasma membrane",
      "Mitochondria → lysosomes → plasma membrane",
      "Nucleus → cytoplasm → directly secreted"
    ],
    correctIndex: 1,
    explanation: "Secreted proteins follow the endomembrane pathway: synthesized by ribosomes on the rough ER, threaded into the ER lumen, passed through the Golgi apparatus for modification and sorting, then packaged into secretory vesicles that fuse with the plasma membrane to release the protein outside the cell.",
    topic: "proteins"
  }
];
const AA_DATA = [
  { label: "Gly", color: "#ff6b35", type: "Nonpolar" },
  { label: "Ala", color: "#ffa040", type: "Nonpolar" },
  { label: "Val", color: "#ffcb47", type: "Nonpolar" },
  { label: "Ser", color: "#a8e063", type: "Polar" },
  { label: "Thr", color: "#56c596", type: "Polar" },
  { label: "Asp", color: "#4da6ff", type: "Charged −" },
  { label: "Lys", color: "#c86dd7", type: "Charged +" },
  { label: "Pro", color: "#e96595", type: "Nonpolar" }
];
function AminoAcidChain() {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative overflow-x-auto pb-2", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-0 min-w-max py-6 px-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col items-center mr-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs font-bold mb-1", style: { color: "#ff9944" }, children: "N" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-6 w-0.5", style: { background: "#ff994466" } }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs", style: { color: "#ff994488" }, children: "H₂N–" })
      ] }),
      AA_DATA.map((aa, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "div",
          {
            className: "flex flex-col items-center",
            style: {
              animation: "chainBuild 0.4s ease-out both",
              animationDelay: `${i * 0.15}s`
            },
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "span",
                {
                  className: "text-xs text-muted-foreground mb-1 font-medium",
                  style: { fontSize: "10px" },
                  children: aa.type
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "div",
                {
                  className: "flex h-12 w-12 items-center justify-center rounded-full text-xs font-bold shadow-lg",
                  style: {
                    background: `${aa.color}22`,
                    border: `2px solid ${aa.color}`,
                    color: aa.color,
                    boxShadow: `0 0 12px ${aa.color}44`
                  },
                  children: aa.label
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsxs(
                "span",
                {
                  className: "mt-1 text-xs text-muted-foreground",
                  style: { fontSize: "9px", opacity: 0.7 },
                  children: [
                    "#",
                    i + 1
                  ]
                }
              )
            ]
          }
        ),
        i < AA_DATA.length - 1 && /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "div",
          {
            className: "flex flex-col items-center mx-1",
            style: {
              animation: "chainBuild 0.4s ease-out both",
              animationDelay: `${(i + 0.5) * 0.15}s`
            },
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "span",
                {
                  style: {
                    fontSize: "9px",
                    color: "oklch(0.55 0 0)",
                    marginBottom: "2px"
                  },
                  children: "–CO–NH–"
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "div",
                {
                  style: {
                    height: "2px",
                    width: "24px",
                    background: "oklch(0.45 0 0)"
                  }
                }
              )
            ]
          }
        )
      ] }, aa.label)),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col items-center ml-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs font-bold mb-1", style: { color: "#4db8ff" }, children: "C" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-6 w-0.5", style: { background: "#4db8ff66" } }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs", style: { color: "#4db8ff88" }, children: "–COOH" })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-wrap gap-3 px-4 mt-2", children: [
      { label: "Nonpolar (hydrophobic)", color: "#ffa040" },
      { label: "Polar (uncharged)", color: "#56c596" },
      { label: "Charged (–)", color: "#4da6ff" },
      { label: "Charged (+)", color: "#c86dd7" }
    ].map((item) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1.5", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "div",
        {
          className: "h-3 w-3 rounded-full",
          style: {
            background: item.color,
            boxShadow: `0 0 6px ${item.color}88`
          }
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-muted-foreground", children: item.label })
    ] }, item.label)) })
  ] });
}
const FOLDING_STAGES = [
  {
    id: "primary",
    label: "Primary Structure",
    sublabel: "Amino acid sequence",
    color: "#ff9944",
    shape: "linear",
    description: "The specific order of amino acids (N→C terminus) determined by the DNA sequence. This is the blueprint."
  },
  {
    id: "secondary",
    label: "Secondary Structure",
    sublabel: "Local folding patterns",
    color: "#ffd44d",
    shape: "coiled",
    description: "Backbone hydrogen bonds create alpha-helices (coils) and beta-sheets (flat sheets) in local regions."
  },
  {
    id: "tertiary",
    label: "Tertiary Structure",
    sublabel: "Overall 3D fold",
    color: "#ff6622",
    shape: "globular",
    description: "R-group interactions collapse the chain into a compact 3D shape: the functional protein."
  }
];
function FoldingDiagram() {
  const [activeStage, setActiveStage] = reactExports.useState(0);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col gap-6", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex gap-3 flex-wrap", children: FOLDING_STAGES.map((stage, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "button",
      {
        type: "button",
        onClick: () => setActiveStage(i),
        "data-ocid": `folding-stage-${stage.id}`,
        className: "flex flex-col items-start rounded-xl px-4 py-3 transition-smooth",
        style: {
          background: activeStage === i ? `${stage.color}22` : "oklch(0.20 0 0)",
          border: `1px solid ${activeStage === i ? stage.color : "oklch(0.28 0 0)"}`,
          cursor: "pointer",
          flex: "1 1 0",
          minWidth: "140px"
        },
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs font-bold", style: { color: stage.color }, children: stage.label }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-muted-foreground mt-0.5", children: stage.sublabel })
        ]
      },
      stage.id
    )) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        className: "flex items-center justify-center rounded-2xl",
        style: {
          background: "oklch(0.14 0 0)",
          minHeight: "180px",
          border: "1px solid oklch(0.25 0 0)"
        },
        children: [
          activeStage === 0 && /* @__PURE__ */ jsxRuntimeExports.jsx(
            "div",
            {
              className: "flex items-center gap-0 py-8",
              style: { animation: "fadeIn 0.4s ease" },
              children: Array.from({ length: 10 }, (_, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "div",
                  {
                    className: "h-8 w-8 rounded-full flex items-center justify-center text-xs font-bold",
                    style: {
                      background: `oklch(0.68 0.22 ${36 + i * 15} / 0.25)`,
                      border: `2px solid oklch(0.68 0.22 ${36 + i * 15} / 0.8)`,
                      color: `oklch(0.85 0.15 ${36 + i * 15})`,
                      animation: "chainBuild 0.3s ease-out both",
                      animationDelay: `${i * 0.06}s`
                    },
                    children: i + 1
                  }
                ),
                i < 9 && /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "div",
                  {
                    style: {
                      width: "12px",
                      height: "2px",
                      background: "oklch(0.40 0 0)"
                    }
                  }
                )
              ] }, `aa-step-${i + 1}`))
            }
          ),
          activeStage === 1 && /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "div",
            {
              className: "flex items-center gap-8 py-6",
              style: { animation: "fadeIn 0.4s ease" },
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col items-center gap-2", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "div",
                    {
                      className: "text-4xl",
                      style: {
                        animation: "spin-slow 4s linear infinite",
                        color: "#ff8833"
                      },
                      children: "🌀"
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "span",
                    {
                      className: "text-xs font-semibold",
                      style: { color: "#ff8833" },
                      children: "Alpha-Helix"
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-muted-foreground", children: "H-bonds every 4 residues" })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: { color: "oklch(0.45 0 0)", fontSize: "24px" }, children: "+" }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col items-center gap-2", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-col gap-1", children: [0, 1, 2].map((i) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "div",
                      {
                        style: {
                          width: "48px",
                          height: "10px",
                          background: "#ffd44d44",
                          border: "1px solid #ffd44d88",
                          borderRadius: "2px"
                        }
                      }
                    ),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "div",
                      {
                        style: {
                          width: 0,
                          height: 0,
                          borderLeft: "10px solid #ffd44daa",
                          borderTop: "5px solid transparent",
                          borderBottom: "5px solid transparent"
                        }
                      }
                    )
                  ] }, i)) }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "span",
                    {
                      className: "text-xs font-semibold",
                      style: { color: "#ffd44d" },
                      children: "Beta-Sheet"
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-muted-foreground", children: "Parallel strands" })
                ] })
              ]
            }
          ),
          activeStage === 2 && /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "div",
            {
              className: "flex flex-col items-center gap-3 py-6",
              style: { animation: "fadeIn 0.4s ease" },
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "div",
                    {
                      className: "h-28 w-28 rounded-full flex items-center justify-center",
                      style: {
                        background: "radial-gradient(circle at 35% 35%, oklch(0.68 0.22 36 / 0.5), oklch(0.45 0.15 36 / 0.3))",
                        border: "2px solid oklch(0.68 0.22 36 / 0.6)",
                        boxShadow: "0 0 30px oklch(0.68 0.22 36 / 0.3)",
                        animation: "pulse-glow 3s ease-in-out infinite"
                      },
                      children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-2xl", children: "⚗️" })
                    }
                  ),
                  [0, 60, 120, 180, 240, 300].map((deg) => /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "div",
                    {
                      className: "absolute h-3 w-3 rounded-full",
                      style: {
                        background: `oklch(0.72 0.20 ${36 + deg / 10})`,
                        boxShadow: `0 0 6px oklch(0.72 0.20 ${36 + deg / 10} / 0.7)`,
                        top: `${50 + 46 * Math.sin(deg * Math.PI / 180)}%`,
                        left: `${50 + 46 * Math.cos(deg * Math.PI / 180)}%`,
                        transform: "translate(-50%, -50%)"
                      }
                    },
                    deg
                  ))
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-semibold", style: { color: "#ff6622" }, children: "Compact Globular Shape" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground mt-1", children: "Hydrophobic core · Disulfide bridges · H-bonds" })
                ] })
              ]
            }
          )
        ]
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "div",
      {
        className: "rounded-xl p-4",
        style: {
          background: `${FOLDING_STAGES[activeStage].color}11`,
          border: `1px solid ${FOLDING_STAGES[activeStage].color}33`
        },
        children: /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-sm leading-relaxed text-muted-foreground", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "span",
            {
              className: "font-semibold",
              style: { color: FOLDING_STAGES[activeStage].color },
              children: [
                FOLDING_STAGES[activeStage].label,
                ":",
                " "
              ]
            }
          ),
          FOLDING_STAGES[activeStage].description
        ] })
      }
    )
  ] });
}
const EXPLANATION_PARAGRAPHS = [
  {
    title: "Amino Acids: The Monomer Units of Proteins",
    color: "#ff9944",
    text: "Proteins are built from amino acids, small organic molecules that share a common core architecture. At the center sits an alpha-carbon (Cα) bonded to four groups: an amino group (–NH₂), a carboxyl group (–COOH), a hydrogen atom, and a variable R side chain (also called the side group). It is the R chain that distinguishes one amino acid from another. The human body uses 20 standard amino acids, which differ in the size, charge, polarity, and chemical reactivity of their R groups. These 20 are grouped into families: nonpolar aliphatic (like glycine, alanine, valine, leucine, isoleucine, proline, and methionine), aromatic (phenylalanine, tyrosine, tryptophan), polar uncharged (serine, threonine, cysteine, asparagine, glutamine), positively charged (lysine, arginine, histidine), and negatively charged (aspartate, glutamate). The specific properties of each R group ultimately determine how a protein will fold and function."
  },
  {
    title: "Peptide Bond Formation: Linking the Chain",
    color: "#ffd44d",
    text: "Amino acids are joined into chains through peptide bonds, a type of covalent bond formed in a condensation (dehydration) reaction. When two amino acids approach one another, the carboxyl group (–COOH) of the first reacts with the amino group (–NH₂) of the second, releasing a molecule of water (H₂O) as a byproduct. The resulting covalent linkage, –CO–NH–, is the peptide bond. The chain that forms is called a polypeptide, and it has a defined directionality: the end with the free amino group is called the N-terminus, while the end with the free carboxyl group is the C-terminus. By convention, polypeptide sequences are always read from the N-terminus to the C-terminus. In living cells, this bond formation occurs on ribosomes, molecular machines that translate the information in mRNA into polypeptide chains with remarkable speed and fidelity."
  },
  {
    title: "Hierarchy of Protein Structure: Four Levels",
    color: "#ff6622",
    text: "Proteins adopt complex, precise three-dimensional shapes described by four hierarchical levels. Primary structure is simply the linear amino acid sequence — the specific order of residues from N to C terminus, encoded directly in the gene. Secondary structure arises from regular, repetitive folding patterns within local regions of the polypeptide, driven entirely by hydrogen bonds between backbone atoms (not side chains). The two main secondary structures are the alpha-helix, a right-handed coil held by H-bonds between every fourth residue, and the beta-sheet, where extended strands lie side by side and form H-bonds across strands in parallel or antiparallel orientations. Tertiary structure is the complete, unique three-dimensional fold of a single polypeptide chain, determined by interactions among R groups: hydrophobic residues cluster in the core, polar and charged residues prefer the surface, H-bonds and ionic interactions provide additional stability, and disulfide bridges (covalent bonds between cysteine thiol groups) can lock regions together. Quaternary structure exists only in multi-subunit proteins and refers to how two or more folded polypeptide chains associate into one functional complex, as in hemoglobin’s four-subunit structure."
  },
  {
    title: "Protein Functions: The Workhorses of the Cell",
    color: "#ff8833",
    text: "Proteins carry out an astonishing variety of cellular functions, making them the most functionally diverse macromolecules in biology. Enzymes are catalytic proteins that accelerate biochemical reactions by lowering activation energy; without them, most metabolic reactions would proceed far too slowly to sustain life. Structural proteins such as collagen (providing tensile strength to connective tissues) and keratin (the tough polymer of hair, nails, and epidermis) give cells and tissues their physical integrity. Transport proteins — most famously hemoglobin — bind and ferry small molecules or ions through the bloodstream or across membranes (as channel and carrier proteins). Hormonal proteins like insulin, a small protein secreted by pancreatic beta-cells, serve as chemical messengers that coordinate physiology across different organs. Antibodies (immunoglobulins) are Y-shaped proteins produced by immune cells that bind and neutralize specific foreign molecules with exquisite specificity. Motor proteins such as myosin and kinesin convert chemical energy into directed mechanical movement, powering muscle contraction and organelle transport."
  },
  {
    title: "Protein Denaturation: When Structure Collapses",
    color: "#ff5533",
    text: "Proteins depend on their precise three-dimensional shape to function. Denaturation is the process by which this shape is disrupted — not by breaking peptide bonds, but by destroying the weaker non-covalent interactions (hydrogen bonds, ionic bonds, hydrophobic interactions, and van der Waals forces) that maintain the native conformation. High temperature is one of the most common denaturants: heat agitates atoms and breaks the fragile H-bond network, causing the chain to unfold. Extreme pH disrupts ionic bonds and the protonation state of ionizable R groups, while chemical denaturants such as urea or detergents interfere with hydrophobic packing and hydrogen bonding. When denatured, proteins lose their biological activity — an enzyme can no longer catalyze its reaction, a transport protein cannot bind its cargo. In some cases (if the primary structure is intact and conditions are restored) a protein can refold spontaneously; in others, denaturation is irreversible, as when cooking an egg white transforms liquid albumin into a permanently solid mass."
  },
  {
    title: "Where Proteins Are Made and Localized in the Cell",
    color: "#ffaa44",
    text: "Protein synthesis begins on ribosomes, large complexes of ribosomal RNA and proteins located throughout the cell. Cytosolic proteins — those destined to function in the cytoplasm (glycolytic enzymes, cytoskeletal components, most regulatory proteins) — are made on free ribosomes floating in the cytoplasm. In contrast, proteins destined for secretion, for the plasma membrane, or for organelles such as the ER, Golgi, or lysosomes are synthesized on ribosomes attached to the rough endoplasmic reticulum (rough ER). A hydrophobic signal sequence at the protein’s N-terminus directs the ribosome to dock on the rough ER membrane; as the polypeptide elongates it is threaded directly into the ER lumen, where initial folding and glycosylation occur. From the ER the protein moves via vesicles to the Golgi apparatus, the cell’s sorting and modification center, which adds carbohydrates, cleaves signal peptides, and packages finished proteins into secretory vesicles for delivery to their final destinations. Mitochondria and chloroplasts import many of their own proteins post-translationally using specific targeting sequences, while integral membrane proteins remain embedded in the lipid bilayer through hydrophobic transmembrane helices."
  }
];
const FUNCTION_CARDS = [
  {
    icon: "⚙️",
    label: "Enzymes",
    desc: "Amylase digests starch; catalase destroys H₂O₂",
    color: "#ff9944"
  },
  {
    icon: "🛡️",
    label: "Antibodies",
    desc: "Immunoglobulins neutralize pathogens with high specificity",
    color: "#ffd44d"
  },
  {
    icon: "📡",
    label: "Hormones",
    desc: "Insulin signals cells to absorb glucose from blood",
    color: "#ff6622"
  },
  {
    icon: "🏗️",
    label: "Structural",
    desc: "Collagen in tendons; keratin in hair and nails",
    color: "#ff8833"
  },
  {
    icon: "🚌",
    label: "Transport",
    desc: "Hemoglobin carries O₂; channel proteins regulate ion flow",
    color: "#ffaa44"
  },
  {
    icon: "⚡",
    label: "Motor",
    desc: "Myosin powers muscle contraction; kinesin walks on microtubules",
    color: "#ff5544"
  }
];
function ProteinsSection() {
  const [level, setLevel] = reactExports.useState("secondary");
  return /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "px-4 py-16 md:px-8", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mx-auto max-w-5xl", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs(AnimatedEntrance, { direction: "left", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        SectionHeader,
        {
          topicId: "proteins",
          title: "Proteins — The Molecular Workhorses",
          subtitle: "From amino acid sequences to intricate 3D machines: explore how proteins fold, function, and power every living process."
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "div",
        {
          className: "mb-6 inline-flex items-center gap-2 rounded-full px-3 py-1.5 text-xs font-semibold",
          style: {
            background: "oklch(0.68 0.22 36 / 0.15)",
            border: "1px solid oklch(0.68 0.22 36 / 0.35)",
            color: "oklch(0.82 0.15 36)"
          },
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Zap, { className: "h-3.5 w-3.5" }),
            "20 standard amino acids · 4 structural levels · Countless functions"
          ]
        }
      )
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(AnimatedEntrance, { direction: "up", delay: 0.1, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        className: "mb-12 rounded-2xl overflow-hidden",
        style: {
          border: "1px solid oklch(0.68 0.22 36 / 0.3)",
          boxShadow: "0 0 40px oklch(0.68 0.22 36 / 0.15)"
        },
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "div",
            {
              className: "flex items-center justify-between px-5 py-3 border-b",
              style: {
                borderColor: "oklch(0.68 0.22 36 / 0.2)",
                background: "oklch(0.17 0 0)"
              },
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-display text-sm font-semibold accent-protein", children: "Interactive Protein Structure Viewer" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-muted-foreground", children: "Toggle structural level below" })
              ]
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            SceneErrorBoundary$1,
            {
              sceneName: "Protein Structure 3D Model",
              sceneColor: "#fb923c",
              children: /* @__PURE__ */ jsxRuntimeExports.jsx(ProteinScene, { level, onLevelChange: setLevel })
            }
          )
        ]
      }
    ) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(StaggerContainer, { className: "mb-12 space-y-8", staggerDelay: 0.08, children: EXPLANATION_PARAGRAPHS.map((para) => /* @__PURE__ */ jsxRuntimeExports.jsx(StaggerItem, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        className: "rounded-2xl p-6",
        style: {
          background: "oklch(0.18 0 0)",
          border: `1px solid ${para.color}25`
        },
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "h3",
            {
              className: "font-display text-xl font-bold mb-3",
              style: { color: para.color },
              children: para.title
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground leading-relaxed text-sm md:text-base", children: para.text })
        ]
      }
    ) }, para.title)) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(AnimatedEntrance, { direction: "up", delay: 0.05, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        className: "mb-12 rounded-2xl overflow-hidden",
        style: {
          background: "oklch(0.17 0 0)",
          border: "1px solid oklch(0.68 0.22 36 / 0.25)"
        },
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "div",
            {
              className: "px-5 py-4 border-b",
              style: { borderColor: "oklch(0.68 0.22 36 / 0.2)" },
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-display text-lg font-bold accent-protein", children: "Amino Acid Chain — Building a Polypeptide" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground mt-1", children: "Each colored bead is an amino acid; the connector shows the peptide bond (–CO–NH–)" })
              ]
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "px-2 py-4", children: /* @__PURE__ */ jsxRuntimeExports.jsx(AminoAcidChain, {}) })
        ]
      }
    ) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(AnimatedEntrance, { direction: "up", delay: 0.05, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        className: "mb-12 rounded-2xl overflow-hidden",
        style: {
          background: "oklch(0.17 0 0)",
          border: "1px solid oklch(0.68 0.22 36 / 0.25)"
        },
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "div",
            {
              className: "px-5 py-4 border-b",
              style: { borderColor: "oklch(0.68 0.22 36 / 0.2)" },
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-display text-lg font-bold accent-protein", children: "Protein Folding Hierarchy" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground mt-1", children: "Click a stage to explore the primary → secondary → tertiary structure progression" })
              ]
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "p-5", children: /* @__PURE__ */ jsxRuntimeExports.jsx(FoldingDiagram, {}) })
        ]
      }
    ) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(AnimatedEntrance, { direction: "up", delay: 0.05, children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-12", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-display text-2xl font-bold accent-protein glow-protein mb-2", children: "Six Roles Proteins Play" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground text-sm mb-6", children: "Proteins are specialists — each class evolved for a distinct molecular job." }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        StaggerContainer,
        {
          className: "grid grid-cols-2 md:grid-cols-3 gap-4",
          staggerDelay: 0.07,
          children: FUNCTION_CARDS.map((card) => /* @__PURE__ */ jsxRuntimeExports.jsx(StaggerItem, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "div",
            {
              className: "rounded-2xl p-5 flex flex-col gap-2 h-full transition-smooth hover:scale-[1.02]",
              style: {
                background: `${card.color}0f`,
                border: `1px solid ${card.color}30`
              },
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-3xl", children: card.icon }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "span",
                  {
                    className: "font-display font-bold text-base",
                    style: { color: card.color },
                    children: card.label
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-muted-foreground leading-relaxed", children: card.desc })
              ]
            }
          ) }, card.label))
        }
      )
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(AnimatedEntrance, { direction: "up", delay: 0.05, children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-display text-2xl font-bold accent-protein glow-protein mb-1", children: "Test Your Knowledge" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground text-sm mb-6", children: "10 questions on amino acid structure, protein folding, functions, and denaturation." }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(QuizEngine, { topicId: "proteins", questions: PROTEIN_QUIZ })
    ] }) })
  ] }) });
}
export {
  ProteinsSection as default
};
