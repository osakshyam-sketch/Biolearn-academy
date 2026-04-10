import { r as reactExports, j as jsxRuntimeExports } from "./index-V1Xys_hZ.js";
import { C as Canvas, O as OrbitControls, u as useFrame, V as Vector3, a as CatmullRomCurve3, H as Html, b as useLoader, D as DoubleSide, c as TextureLoader } from "./OrbitControls-Cr3drnWX.js";
class TextureErrorBoundary extends reactExports.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }
  static getDerivedStateFromError() {
    return { hasError: true };
  }
  render() {
    if (this.state.hasError) return null;
    return this.props.children;
  }
}
const NAVY_BG = "#080d2e";
const BASE_SEQ = [
  "A",
  "U",
  "G",
  "C",
  "A",
  "U",
  "G",
  "C",
  "A",
  "U",
  "G",
  "C",
  "A",
  "U"
];
const BASE_COLORS = {
  A: "#22c55e",
  U: "#ef4444",
  G: "#3b82f6",
  C: "#eab308"
};
const MRNA_IMAGE = "https://upload.wikimedia.org/wikipedia/commons/thumb/9/94/MRNA_structure.svg/300px-MRNA_structure.svg.png";
const TRNA_IMAGE = "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e2/TRNA-Phe_yeast_1ehz.png/200px-TRNA-Phe_yeast_1ehz.png";
const RRNA_IMAGE = "https://upload.wikimedia.org/wikipedia/commons/thumb/4/4a/Ribosome_shape.png/200px-Ribosome_shape.png";
const MRNA_STRUCT_LABELS = [
  {
    label: "mRNA Strand",
    color: "#a78bfa",
    pos: [-2.2, 3.6, 0]
  },
  {
    label: "5' Cap (m7G)",
    color: "#60a5fa",
    pos: [-1.6, 2.8, 0]
  },
  {
    label: "Codon (3 bases)",
    color: "#fbbf24",
    pos: [1.8, 0.6, 0]
  },
  {
    label: "3' Poly-A Tail",
    color: "#f87171",
    pos: [-1.6, -3.1, 0]
  },
  {
    label: "Open Reading Frame",
    color: "#34d399",
    pos: [1.8, -1, 0]
  }
];
function RNAImagePlaneInner({
  url,
  width,
  height
}) {
  const texture = useLoader(TextureLoader, url);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("mesh", { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("planeGeometry", { args: [width, height] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "meshBasicMaterial",
      {
        map: texture,
        transparent: true,
        opacity: 0.88,
        side: DoubleSide,
        depthWrite: false
      }
    )
  ] });
}
function RNAImagePlane({
  url,
  width,
  height
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(TextureErrorBoundary, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(reactExports.Suspense, { fallback: null, children: /* @__PURE__ */ jsxRuntimeExports.jsx(RNAImagePlaneInner, { url, width, height }) }) });
}
function MRNAStrand() {
  const groupRef = reactExports.useRef(null);
  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = state.clock.getElapsedTime() * 0.28;
      groupRef.current.position.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.08;
    }
  });
  const bases = BASE_SEQ.map((base, i) => {
    const t = i / (BASE_SEQ.length - 1);
    return {
      id: `base-${base}-${i}`,
      base,
      pos: [
        Math.sin(t * Math.PI * 2.5) * 1.2,
        (t - 0.5) * 5,
        Math.cos(t * Math.PI * 2.5) * 0.6
      ],
      color: BASE_COLORS[base]
    };
  });
  const backbonePoints = bases.map((b) => new Vector3(...b.pos));
  const curve = new CatmullRomCurve3(backbonePoints);
  const tubePoints = curve.getPoints(80);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("group", { ref: groupRef, children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("group", { position: [-2.4, 0, -0.5], rotation: [0, 0.3, 0], children: /* @__PURE__ */ jsxRuntimeExports.jsx(RNAImagePlane, { url: MRNA_IMAGE, width: 2, height: 1.4 }) }),
    tubePoints.slice(0, -1).map((pt, tubeSeg) => {
      const next = tubePoints[tubeSeg + 1];
      const len = new Vector3().subVectors(next, pt).length();
      const mid = new Vector3().addVectors(pt, next).multiplyScalar(0.5);
      const segKey = `tube-${Math.round(pt.x * 100)}-${Math.round(pt.y * 100)}-${tubeSeg}`;
      return /* @__PURE__ */ jsxRuntimeExports.jsxs("mesh", { position: [mid.x, mid.y, mid.z], children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("cylinderGeometry", { args: [0.055, 0.055, len, 6] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "meshStandardMaterial",
          {
            color: "#a78bfa",
            roughness: 0.3,
            metalness: 0.15,
            emissive: "#7c3aed",
            emissiveIntensity: 0.12
          }
        )
      ] }, segKey);
    }),
    bases.map((b, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs("group", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(PulsingBase, { pos: b.pos, color: b.color, pulseOffset: i * 0.45 }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        Html,
        {
          position: [b.pos[0] + 0.4, b.pos[1], b.pos[2]],
          style: { pointerEvents: "none" },
          children: /* @__PURE__ */ jsxRuntimeExports.jsx(
            "div",
            {
              style: {
                background: `${b.color}22`,
                border: `1px solid ${b.color}88`,
                borderRadius: "50%",
                width: "19px",
                height: "19px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "9px",
                fontWeight: 800,
                color: b.color,
                textShadow: `0 0 4px ${b.color}`
              },
              children: b.base
            }
          )
        }
      )
    ] }, b.id)),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "mesh",
      {
        position: [
          bases[0].pos[0] - 0.15,
          bases[0].pos[1] - 0.28,
          bases[0].pos[2]
        ],
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("sphereGeometry", { args: [0.25, 12, 12] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "meshStandardMaterial",
            {
              color: "#60a5fa",
              emissive: "#3b82f6",
              emissiveIntensity: 0.55,
              roughness: 0.25
            }
          )
        ]
      }
    ),
    MRNA_STRUCT_LABELS.map((lbl) => /* @__PURE__ */ jsxRuntimeExports.jsx(
      Html,
      {
        position: lbl.pos,
        style: { pointerEvents: "none" },
        children: /* @__PURE__ */ jsxRuntimeExports.jsx(
          "div",
          {
            style: {
              background: "rgba(5,10,40,0.88)",
              border: `1px solid ${lbl.color}66`,
              borderRadius: "8px",
              padding: "3px 8px",
              fontSize: "10px",
              fontWeight: 700,
              color: lbl.color,
              whiteSpace: "nowrap",
              boxShadow: `0 0 8px ${lbl.color}44`,
              textShadow: `0 0 5px ${lbl.color}88`,
              backdropFilter: "blur(4px)"
            },
            children: lbl.label
          }
        )
      },
      lbl.label
    ))
  ] });
}
function PulsingBase({
  pos,
  color,
  pulseOffset
}) {
  const meshRef = reactExports.useRef(null);
  useFrame((state) => {
    if (meshRef.current) {
      const s = 1 + Math.sin(state.clock.elapsedTime * 1.4 + pulseOffset) * 0.06;
      meshRef.current.scale.setScalar(s);
    }
  });
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("mesh", { ref: meshRef, position: pos, children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("sphereGeometry", { args: [0.2, 12, 12] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "meshStandardMaterial",
      {
        color,
        emissive: color,
        emissiveIntensity: 0.42,
        roughness: 0.22
      }
    )
  ] });
}
const TRNA_LABELS = [
  {
    label: "Acceptor Stem (CCA 3')",
    color: "#a78bfa",
    pos: [0.6, 4.7, 0]
  },
  {
    label: "Aminoacyl Site",
    color: "#f97316",
    pos: [1.4, 4.1, 0]
  },
  {
    label: "D-Loop",
    color: "#60a5fa",
    pos: [-2.6, 0.8, 0]
  },
  {
    label: "T-Loop (TΨC)",
    color: "#34d399",
    pos: [2.3, 0.8, 0]
  },
  {
    label: "Anticodon Loop",
    color: "#ec4899",
    pos: [1.4, -2.4, 0]
  },
  {
    label: "Anticodon (reads mRNA codons)",
    color: "#f87171",
    pos: [1.4, -3.2, 0]
  }
];
const ANTICODON_POS = [
  { id: "ac-left", x: -0.5 },
  { id: "ac-center", x: 0 },
  { id: "ac-right", x: 0.5 }
];
const STEM_COLOR = "#a78bfa";
const ANTICODON_COLOR = "#ec4899";
function DoubleStem({
  start,
  dir,
  len,
  color
}) {
  const pairs = Math.floor(len);
  return /* @__PURE__ */ jsxRuntimeExports.jsx("group", { children: Array.from({ length: pairs }).map((_, pairIdx) => {
    const t = pairIdx / (pairs - 1 || 1);
    const x = start[0] + dir[0] * t * (len - 1);
    const y = start[1] + dir[1] * t * (len - 1);
    const z = start[2] + dir[2] * t * (len - 1);
    const stemKey = `stem-${Math.round(x * 100)}-${Math.round(y * 100)}-${pairIdx}`;
    return /* @__PURE__ */ jsxRuntimeExports.jsxs("group", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("mesh", { position: [x - 0.22, y, z], children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("sphereGeometry", { args: [0.12, 8, 8] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "meshStandardMaterial",
          {
            color,
            emissive: color,
            emissiveIntensity: 0.28
          }
        )
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("mesh", { position: [x + 0.22, y, z], children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("sphereGeometry", { args: [0.12, 8, 8] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "meshStandardMaterial",
          {
            color,
            emissive: color,
            emissiveIntensity: 0.28
          }
        )
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("mesh", { position: [x, y, z], rotation: [0, 0, Math.PI / 2], children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("cylinderGeometry", { args: [0.035, 0.035, 0.44, 6] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("meshStandardMaterial", { color: "#6d28d9" })
      ] })
    ] }, stemKey);
  }) });
}
function Loop({
  center,
  radius,
  color,
  tubeRadius = 0.08
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("mesh", { position: center, children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("torusGeometry", { args: [radius, tubeRadius, 8, 24] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "meshStandardMaterial",
      {
        color,
        emissive: color,
        emissiveIntensity: 0.4,
        roughness: 0.3
      }
    )
  ] });
}
function TRNAMolecule() {
  const groupRef = reactExports.useRef(null);
  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = state.clock.getElapsedTime() * 0.28;
      groupRef.current.position.y = Math.sin(state.clock.elapsedTime * 0.6) * 0.06;
    }
  });
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("group", { ref: groupRef, scale: 0.9, children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("group", { position: [2.5, 0, -0.5], rotation: [0, -0.3, 0], children: /* @__PURE__ */ jsxRuntimeExports.jsx(RNAImagePlane, { url: TRNA_IMAGE, width: 1.6, height: 2 }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      DoubleStem,
      {
        start: [0, 0, 0],
        dir: [0, 1, 0],
        len: 4,
        color: STEM_COLOR
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("mesh", { position: [0, 4.3, 0], children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("sphereGeometry", { args: [0.3, 12, 12] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "meshStandardMaterial",
        {
          color: "#f97316",
          emissive: "#f97316",
          emissiveIntensity: 0.6
        }
      )
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Loop, { center: [-1.4, 0.5, 0], radius: 0.55, color: "#60a5fa" }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("mesh", { position: [-0.65, 0.35, 0], rotation: [0, 0, -0.5], children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("cylinderGeometry", { args: [0.045, 0.045, 0.8, 6] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("meshStandardMaterial", { color: STEM_COLOR })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Loop, { center: [1.4, 0.5, 0], radius: 0.55, color: "#34d399" }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("mesh", { position: [0.65, 0.35, 0], rotation: [0, 0, 0.5], children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("cylinderGeometry", { args: [0.045, 0.045, 0.8, 6] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("meshStandardMaterial", { color: STEM_COLOR })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("mesh", { position: [0, -1.1, 0], children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("cylinderGeometry", { args: [0.045, 0.045, 1.8, 6] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("meshStandardMaterial", { color: STEM_COLOR })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      Loop,
      {
        center: [0, -2.1, 0],
        radius: 0.7,
        color: ANTICODON_COLOR,
        tubeRadius: 0.12
      }
    ),
    ANTICODON_POS.map((ac) => /* @__PURE__ */ jsxRuntimeExports.jsxs("mesh", { position: [ac.x, -2.7, 0], children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("sphereGeometry", { args: [0.17, 10, 10] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "meshStandardMaterial",
        {
          color: ANTICODON_COLOR,
          emissive: ANTICODON_COLOR,
          emissiveIntensity: 0.65
        }
      )
    ] }, ac.id)),
    TRNA_LABELS.map((lbl) => /* @__PURE__ */ jsxRuntimeExports.jsx(
      Html,
      {
        position: lbl.pos,
        style: { pointerEvents: "none" },
        children: /* @__PURE__ */ jsxRuntimeExports.jsx(
          "div",
          {
            style: {
              background: "rgba(5,10,40,0.88)",
              border: `1px solid ${lbl.color}66`,
              borderRadius: "8px",
              padding: "3px 8px",
              fontSize: "10px",
              fontWeight: 700,
              color: lbl.color,
              whiteSpace: "nowrap",
              boxShadow: `0 0 8px ${lbl.color}44`,
              textShadow: `0 0 5px ${lbl.color}88`,
              backdropFilter: "blur(4px)"
            },
            children: lbl.label
          }
        )
      },
      lbl.label
    ))
  ] });
}
const RRNA_LABELS = [
  {
    label: "Large Subunit (60S)",
    color: "#a78bfa",
    pos: [2.4, 1, 0]
  },
  {
    label: "Small Subunit (40S)",
    color: "#c084fc",
    pos: [2.2, -1.5, 0]
  },
  {
    label: "mRNA Channel",
    color: "#f59e0b",
    pos: [2, -0.5, 0]
  },
  {
    label: "P-site (peptidyl)",
    color: "#22c55e",
    pos: [-2.4, -0.5, 0]
  },
  {
    label: "A-site (aminoacyl)",
    color: "#ef4444",
    pos: [-0.5, -1.9, 0]
  },
  {
    label: "Exit Tunnel",
    color: "#94a3b8",
    pos: [-2.6, 0.5, 0]
  }
];
const RRNA_SURFACE_DOTS = [
  { id: "dot-0", angle: 0 },
  { id: "dot-1", angle: 1.2 },
  { id: "dot-2", angle: 2.4 },
  { id: "dot-3", angle: 3.6 }
];
function RRNAMolecule() {
  const groupRef = reactExports.useRef(null);
  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = state.clock.getElapsedTime() * 0.22;
      groupRef.current.position.y = Math.sin(state.clock.elapsedTime * 0.45) * 0.07;
    }
  });
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("group", { ref: groupRef, children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("group", { position: [-2.6, 0, -0.5], rotation: [0, 0.4, 0], children: /* @__PURE__ */ jsxRuntimeExports.jsx(RNAImagePlane, { url: RRNA_IMAGE, width: 1.8, height: 1.8 }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("mesh", { position: [0, 0.5, 0], children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("sphereGeometry", { args: [1.5, 24, 24] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "meshStandardMaterial",
        {
          color: "#7c3aed",
          emissive: "#5b21b6",
          emissiveIntensity: 0.35,
          roughness: 0.4,
          metalness: 0.1
        }
      )
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("mesh", { position: [0, -1.2, 0], scale: [1, 0.6, 1], children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("sphereGeometry", { args: [1.1, 20, 20] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "meshStandardMaterial",
        {
          color: "#a855f7",
          emissive: "#7c3aed",
          emissiveIntensity: 0.3,
          roughness: 0.4,
          metalness: 0.1
        }
      )
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("mesh", { position: [0, -0.55, 1], rotation: [Math.PI / 2, 0, 0], children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("cylinderGeometry", { args: [0.15, 0.15, 0.5, 8] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "meshStandardMaterial",
        {
          color: "#f59e0b",
          emissive: "#f59e0b",
          emissiveIntensity: 0.7
        }
      )
    ] }),
    RRNA_SURFACE_DOTS.map((d) => {
      const x = Math.sin(d.angle) * 1.55;
      const z = Math.cos(d.angle) * 1.55;
      return /* @__PURE__ */ jsxRuntimeExports.jsxs("mesh", { position: [x, 0.5, z], children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("sphereGeometry", { args: [0.11, 8, 8] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "meshStandardMaterial",
          {
            color: "#c4b5fd",
            emissive: "#c4b5fd",
            emissiveIntensity: 0.5
          }
        )
      ] }, d.id);
    }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("mesh", { position: [-0.4, -0.55, 0.7], children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("sphereGeometry", { args: [0.22, 10, 10] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "meshStandardMaterial",
        {
          color: "#22c55e",
          emissive: "#22c55e",
          emissiveIntensity: 0.6
        }
      )
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("mesh", { position: [0.4, -0.55, 0.7], children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("sphereGeometry", { args: [0.22, 10, 10] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "meshStandardMaterial",
        {
          color: "#ef4444",
          emissive: "#ef4444",
          emissiveIntensity: 0.6
        }
      )
    ] }),
    RRNA_LABELS.map((lbl) => /* @__PURE__ */ jsxRuntimeExports.jsx(
      Html,
      {
        position: lbl.pos,
        style: { pointerEvents: "none" },
        children: /* @__PURE__ */ jsxRuntimeExports.jsx(
          "div",
          {
            style: {
              background: "rgba(5,10,40,0.88)",
              border: `1px solid ${lbl.color}66`,
              borderRadius: "8px",
              padding: "3px 8px",
              fontSize: "10px",
              fontWeight: 700,
              color: lbl.color,
              whiteSpace: "nowrap",
              boxShadow: `0 0 8px ${lbl.color}44`,
              textShadow: `0 0 5px ${lbl.color}88`,
              backdropFilter: "blur(4px)"
            },
            children: lbl.label
          }
        )
      },
      lbl.label
    ))
  ] });
}
function SceneContents({ view }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("ambientLight", { intensity: 0.55 }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("pointLight", { position: [5, 5, 5], intensity: 1.6, color: "#c4b5fd" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("pointLight", { position: [-5, -5, 3], intensity: 0.9, color: "#818cf8" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("pointLight", { position: [0, 0, -5], intensity: 0.7, color: "#7c3aed" }),
    view === "mRNA" && /* @__PURE__ */ jsxRuntimeExports.jsx(MRNAStrand, {}),
    view === "tRNA" && /* @__PURE__ */ jsxRuntimeExports.jsx(TRNAMolecule, {}),
    view === "rRNA" && /* @__PURE__ */ jsxRuntimeExports.jsx(RRNAMolecule, {}),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      OrbitControls,
      {
        enablePan: false,
        minDistance: 4,
        maxDistance: 12,
        autoRotate: false
      }
    )
  ] });
}
const LEGENDS = {
  mRNA: [
    { color: "#22c55e", label: "Adenine (A)" },
    { color: "#ef4444", label: "Uracil (U)" },
    { color: "#3b82f6", label: "Guanine (G)" },
    { color: "#eab308", label: "Cytosine (C)" },
    { color: "#a78bfa", label: "Sugar-Phosphate Backbone" },
    { color: "#60a5fa", label: "5' Cap" }
  ],
  tRNA: [
    { color: "#a78bfa", label: "Acceptor Stem" },
    { color: "#60a5fa", label: "D-Loop" },
    { color: "#34d399", label: "T-Loop (TΨC)" },
    { color: "#ec4899", label: "Anticodon Loop" },
    { color: "#f97316", label: "Amino Acid Site (CCA 3')" }
  ],
  rRNA: [
    { color: "#7c3aed", label: "Large Subunit (60S)" },
    { color: "#a855f7", label: "Small Subunit (40S)" },
    { color: "#22c55e", label: "P-site (peptidyl)" },
    { color: "#ef4444", label: "A-site (aminoacyl)" },
    { color: "#f59e0b", label: "mRNA Channel" },
    { color: "#94a3b8", label: "Exit Tunnel" }
  ]
};
const VIEW_DESCRIPTIONS = {
  mRNA: "Messenger RNA (mRNA) carries the genetic code from DNA to the ribosome. Each codon (3 bases) specifies one amino acid. The 5' cap (blue) protects the strand; the 3' poly-A tail stabilizes it. Every base is permanently labeled: A (green), U (red), G (blue), C (yellow).",
  tRNA: "Transfer RNA (tRNA) adopts a cloverleaf 3D structure. The anticodon loop (pink) reads mRNA codons; the 3' CCA acceptor stem (orange sphere) carries the amino acid. D-loop and T-loop provide structural stability. All regions are permanently labeled.",
  rRNA: "Ribosomal RNA (rRNA) forms the structural and catalytic core of the ribosome. The large 60S subunit (purple) and small 40S subunit (violet) come together. A-site, P-site, mRNA channel and exit tunnel are all labeled. Translation occurs at the interface."
};
const VIEW_BUTTONS = [
  { id: "mRNA", label: "mRNA", color: "#a78bfa" },
  { id: "tRNA", label: "tRNA", color: "#ec4899" },
  { id: "rRNA", label: "rRNA / Ribosome", color: "#7c3aed" }
];
function RNAScene() {
  const [view, setView] = reactExports.useState("mRNA");
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "section",
    {
      className: "rounded-2xl border overflow-hidden",
      style: { borderColor: "rgba(155,89,255,0.3)", background: NAVY_BG },
      "aria-label": "Interactive RNA molecular structure viewer",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "div",
          {
            className: "flex items-center gap-2 p-4 border-b",
            style: { borderColor: "rgba(155,89,255,0.2)" },
            role: "tablist",
            "aria-label": "RNA type selector",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "span",
                {
                  style: {
                    fontSize: "13px",
                    fontWeight: 700,
                    color: "#a78bfa",
                    marginRight: "4px"
                  },
                  children: "View:"
                }
              ),
              VIEW_BUTTONS.map((btn) => /* @__PURE__ */ jsxRuntimeExports.jsx(
                "button",
                {
                  type: "button",
                  role: "tab",
                  "aria-selected": view === btn.id,
                  "aria-label": `Show ${btn.id} structure`,
                  onClick: () => setView(btn.id),
                  "data-ocid": `rna-view-${btn.id.toLowerCase()}`,
                  className: "rounded-lg px-4 py-1.5 text-sm font-semibold",
                  style: view === btn.id ? {
                    background: `${btn.color}33`,
                    color: btn.color,
                    border: `1px solid ${btn.color}`,
                    boxShadow: `0 0 10px ${btn.color}44`,
                    transition: "all 0.2s ease"
                  } : {
                    background: "rgba(5,10,40,0.6)",
                    color: "rgba(160,180,255,0.7)",
                    border: "1px solid rgba(100,110,200,0.35)",
                    transition: "all 0.2s ease"
                  },
                  children: btn.label
                },
                btn.id
              )),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "span",
                {
                  className: "ml-auto",
                  style: { fontSize: "11px", color: "rgba(120,140,220,0.6)" },
                  children: "Real images · Drag · Scroll"
                }
              )
            ]
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: { height: "380px", background: NAVY_BG }, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
          Canvas,
          {
            role: "img",
            "aria-label": `3D model of ${view} RNA structure with labeled components`,
            camera: { position: [0, 0, 8], fov: 50 },
            style: { background: NAVY_BG },
            gl: { antialias: true, alpha: false },
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("color", { attach: "background", args: [NAVY_BG] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(SceneContents, { view })
            ]
          }
        ) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "div",
          {
            className: "p-4 border-t",
            style: { borderColor: "rgba(155,89,255,0.2)" },
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "p",
                {
                  style: {
                    fontSize: "13px",
                    color: "rgba(180,200,255,0.85)",
                    marginBottom: "12px",
                    lineHeight: "1.6"
                  },
                  children: VIEW_DESCRIPTIONS[view]
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-wrap gap-3", children: LEGENDS[view].map((item) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1.5", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "div",
                  {
                    className: "h-3 w-3 rounded-full shrink-0",
                    style: {
                      background: item.color,
                      boxShadow: `0 0 6px ${item.color}88`
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
              ] }, item.label)) })
            ]
          }
        )
      ]
    }
  );
}
export {
  RNAScene
};
