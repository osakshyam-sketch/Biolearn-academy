import { Html, OrbitControls } from "@react-three/drei";
import { Canvas, useFrame, useLoader } from "@react-three/fiber";
import { Component, type ReactNode, Suspense, useRef, useState } from "react";
import * as THREE from "three";
import { TextureLoader } from "three";

// Per-texture error boundary prevents one failed image from blanking the scene
class TextureErrorBoundary extends Component<
  { children: ReactNode },
  { hasError: boolean }
> {
  constructor(props: { children: ReactNode }) {
    super(props);
    this.state = { hasError: false };
  }
  static getDerivedStateFromError() {
    return { hasError: true };
  }
  override render() {
    if (this.state.hasError) return null; // gracefully hide failed image
    return this.props.children;
  }
}

const NAVY_BG = "#080d2e";
type RNAView = "mRNA" | "tRNA" | "rRNA";

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
  "U",
] as const;
const BASE_COLORS: Record<string, string> = {
  A: "#22c55e",
  U: "#ef4444",
  G: "#3b82f6",
  C: "#eab308",
};

// Real molecular images for RNA components
const MRNA_IMAGE =
  "https://upload.wikimedia.org/wikipedia/commons/thumb/9/94/MRNA_structure.svg/300px-MRNA_structure.svg.png";
const TRNA_IMAGE =
  "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e2/TRNA-Phe_yeast_1ehz.png/200px-TRNA-Phe_yeast_1ehz.png";
const RRNA_IMAGE =
  "https://upload.wikimedia.org/wikipedia/commons/thumb/4/4a/Ribosome_shape.png/200px-Ribosome_shape.png";

const MRNA_STRUCT_LABELS = [
  {
    label: "mRNA Strand",
    color: "#a78bfa",
    pos: [-2.2, 3.6, 0] as [number, number, number],
  },
  {
    label: "5' Cap (m7G)",
    color: "#60a5fa",
    pos: [-1.6, 2.8, 0] as [number, number, number],
  },
  {
    label: "Codon (3 bases)",
    color: "#fbbf24",
    pos: [1.8, 0.6, 0] as [number, number, number],
  },
  {
    label: "3' Poly-A Tail",
    color: "#f87171",
    pos: [-1.6, -3.1, 0] as [number, number, number],
  },
  {
    label: "Open Reading Frame",
    color: "#34d399",
    pos: [1.8, -1.0, 0] as [number, number, number],
  },
];

function RNAImagePlaneInner({
  url,
  width,
  height,
}: { url: string; width: number; height: number }) {
  const texture = useLoader(TextureLoader, url);
  return (
    <mesh>
      <planeGeometry args={[width, height]} />
      <meshBasicMaterial
        map={texture}
        transparent
        opacity={0.88}
        side={THREE.DoubleSide}
        depthWrite={false}
      />
    </mesh>
  );
}

function RNAImagePlane({
  url,
  width,
  height,
}: { url: string; width: number; height: number }) {
  return (
    <TextureErrorBoundary>
      <Suspense fallback={null}>
        <RNAImagePlaneInner url={url} width={width} height={height} />
      </Suspense>
    </TextureErrorBoundary>
  );
}

function MRNAStrand() {
  const groupRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = state.clock.getElapsedTime() * 0.28;
      // gentle float
      groupRef.current.position.y =
        Math.sin(state.clock.elapsedTime * 0.5) * 0.08;
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
        Math.cos(t * Math.PI * 2.5) * 0.6,
      ] as [number, number, number],
      color: BASE_COLORS[base],
    };
  });

  const backbonePoints = bases.map((b) => new THREE.Vector3(...b.pos));
  const curve = new THREE.CatmullRomCurve3(backbonePoints);
  const tubePoints = curve.getPoints(80);

  return (
    <group ref={groupRef}>
      {/* Real mRNA image backdrop */}
      <group position={[-2.4, 0, -0.5]} rotation={[0, 0.3, 0]}>
        <RNAImagePlane url={MRNA_IMAGE} width={2.0} height={1.4} />
      </group>

      {/* Backbone tube */}
      {tubePoints.slice(0, -1).map((pt, tubeSeg) => {
        const next = tubePoints[tubeSeg + 1];
        const len = new THREE.Vector3().subVectors(next, pt).length();
        const mid = new THREE.Vector3()
          .addVectors(pt, next)
          .multiplyScalar(0.5);
        const segKey = `tube-${Math.round(pt.x * 100)}-${Math.round(pt.y * 100)}-${tubeSeg}`;
        return (
          <mesh key={segKey} position={[mid.x, mid.y, mid.z]}>
            <cylinderGeometry args={[0.055, 0.055, len, 6]} />
            <meshStandardMaterial
              color="#a78bfa"
              roughness={0.3}
              metalness={0.15}
              emissive="#7c3aed"
              emissiveIntensity={0.12}
            />
          </mesh>
        );
      })}

      {/* Base spheres with letter labels */}
      {bases.map((b, i) => (
        <group key={b.id}>
          <PulsingBase pos={b.pos} color={b.color} pulseOffset={i * 0.45} />
          <Html
            position={[b.pos[0] + 0.4, b.pos[1], b.pos[2]]}
            style={{ pointerEvents: "none" }}
          >
            <div
              style={{
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
                textShadow: `0 0 4px ${b.color}`,
              }}
            >
              {b.base}
            </div>
          </Html>
        </group>
      ))}

      {/* 5' cap sphere */}
      <mesh
        position={[
          bases[0].pos[0] - 0.15,
          bases[0].pos[1] - 0.28,
          bases[0].pos[2],
        ]}
      >
        <sphereGeometry args={[0.25, 12, 12]} />
        <meshStandardMaterial
          color="#60a5fa"
          emissive="#3b82f6"
          emissiveIntensity={0.55}
          roughness={0.25}
        />
      </mesh>

      {/* Structural labels */}
      {MRNA_STRUCT_LABELS.map((lbl) => (
        <Html
          key={lbl.label}
          position={lbl.pos}
          style={{ pointerEvents: "none" }}
        >
          <div
            style={{
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
              backdropFilter: "blur(4px)",
            }}
          >
            {lbl.label}
          </div>
        </Html>
      ))}
    </group>
  );
}

// Sub-component to allow useFrame inside base spheres
function PulsingBase({
  pos,
  color,
  pulseOffset,
}: { pos: [number, number, number]; color: string; pulseOffset: number }) {
  const meshRef = useRef<THREE.Mesh>(null);
  useFrame((state) => {
    if (meshRef.current) {
      const s =
        1 + Math.sin(state.clock.elapsedTime * 1.4 + pulseOffset) * 0.06;
      meshRef.current.scale.setScalar(s);
    }
  });
  return (
    <mesh ref={meshRef} position={pos}>
      <sphereGeometry args={[0.2, 12, 12]} />
      <meshStandardMaterial
        color={color}
        emissive={color}
        emissiveIntensity={0.42}
        roughness={0.22}
      />
    </mesh>
  );
}

// ── tRNA ──────────────────────────────────────────────────────────────────────

const TRNA_LABELS = [
  {
    label: "Acceptor Stem (CCA 3')",
    color: "#a78bfa",
    pos: [0.6, 4.7, 0] as [number, number, number],
  },
  {
    label: "Aminoacyl Site",
    color: "#f97316",
    pos: [1.4, 4.1, 0] as [number, number, number],
  },
  {
    label: "D-Loop",
    color: "#60a5fa",
    pos: [-2.6, 0.8, 0] as [number, number, number],
  },
  {
    label: "T-Loop (TΨC)",
    color: "#34d399",
    pos: [2.3, 0.8, 0] as [number, number, number],
  },
  {
    label: "Anticodon Loop",
    color: "#ec4899",
    pos: [1.4, -2.4, 0] as [number, number, number],
  },
  {
    label: "Anticodon (reads mRNA codons)",
    color: "#f87171",
    pos: [1.4, -3.2, 0] as [number, number, number],
  },
];

const ANTICODON_POS = [
  { id: "ac-left", x: -0.5 },
  { id: "ac-center", x: 0 },
  { id: "ac-right", x: 0.5 },
];

const STEM_COLOR = "#a78bfa";
const ANTICODON_COLOR = "#ec4899";

function DoubleStem({
  start,
  dir,
  len,
  color,
}: {
  start: [number, number, number];
  dir: [number, number, number];
  len: number;
  color: string;
}) {
  const pairs = Math.floor(len);
  return (
    <group>
      {Array.from({ length: pairs }).map((_, pairIdx) => {
        const t = pairIdx / (pairs - 1 || 1);
        const x = start[0] + dir[0] * t * (len - 1);
        const y = start[1] + dir[1] * t * (len - 1);
        const z = start[2] + dir[2] * t * (len - 1);
        const stemKey = `stem-${Math.round(x * 100)}-${Math.round(y * 100)}-${pairIdx}`;
        return (
          <group key={stemKey}>
            <mesh position={[x - 0.22, y, z]}>
              <sphereGeometry args={[0.12, 8, 8]} />
              <meshStandardMaterial
                color={color}
                emissive={color}
                emissiveIntensity={0.28}
              />
            </mesh>
            <mesh position={[x + 0.22, y, z]}>
              <sphereGeometry args={[0.12, 8, 8]} />
              <meshStandardMaterial
                color={color}
                emissive={color}
                emissiveIntensity={0.28}
              />
            </mesh>
            <mesh position={[x, y, z]} rotation={[0, 0, Math.PI / 2]}>
              <cylinderGeometry args={[0.035, 0.035, 0.44, 6]} />
              <meshStandardMaterial color="#6d28d9" />
            </mesh>
          </group>
        );
      })}
    </group>
  );
}

function Loop({
  center,
  radius,
  color,
  tubeRadius = 0.08,
}: {
  center: [number, number, number];
  radius: number;
  color: string;
  tubeRadius?: number;
}) {
  return (
    <mesh position={center}>
      <torusGeometry args={[radius, tubeRadius, 8, 24]} />
      <meshStandardMaterial
        color={color}
        emissive={color}
        emissiveIntensity={0.4}
        roughness={0.3}
      />
    </mesh>
  );
}

function TRNAMolecule() {
  const groupRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = state.clock.getElapsedTime() * 0.28;
      groupRef.current.position.y =
        Math.sin(state.clock.elapsedTime * 0.6) * 0.06;
    }
  });

  return (
    <group ref={groupRef} scale={0.9}>
      {/* Real tRNA structural image */}
      <group position={[2.5, 0, -0.5]} rotation={[0, -0.3, 0]}>
        <RNAImagePlane url={TRNA_IMAGE} width={1.6} height={2.0} />
      </group>

      <DoubleStem
        start={[0, 0, 0]}
        dir={[0, 1, 0]}
        len={4}
        color={STEM_COLOR}
      />
      <mesh position={[0, 4.3, 0]}>
        <sphereGeometry args={[0.3, 12, 12]} />
        <meshStandardMaterial
          color="#f97316"
          emissive="#f97316"
          emissiveIntensity={0.6}
        />
      </mesh>
      <Loop center={[-1.4, 0.5, 0]} radius={0.55} color="#60a5fa" />
      <mesh position={[-0.65, 0.35, 0]} rotation={[0, 0, -0.5]}>
        <cylinderGeometry args={[0.045, 0.045, 0.8, 6]} />
        <meshStandardMaterial color={STEM_COLOR} />
      </mesh>
      <Loop center={[1.4, 0.5, 0]} radius={0.55} color="#34d399" />
      <mesh position={[0.65, 0.35, 0]} rotation={[0, 0, 0.5]}>
        <cylinderGeometry args={[0.045, 0.045, 0.8, 6]} />
        <meshStandardMaterial color={STEM_COLOR} />
      </mesh>
      <mesh position={[0, -1.1, 0]}>
        <cylinderGeometry args={[0.045, 0.045, 1.8, 6]} />
        <meshStandardMaterial color={STEM_COLOR} />
      </mesh>
      <Loop
        center={[0, -2.1, 0]}
        radius={0.7}
        color={ANTICODON_COLOR}
        tubeRadius={0.12}
      />
      {ANTICODON_POS.map((ac) => (
        <mesh key={ac.id} position={[ac.x, -2.7, 0]}>
          <sphereGeometry args={[0.17, 10, 10]} />
          <meshStandardMaterial
            color={ANTICODON_COLOR}
            emissive={ANTICODON_COLOR}
            emissiveIntensity={0.65}
          />
        </mesh>
      ))}
      {TRNA_LABELS.map((lbl) => (
        <Html
          key={lbl.label}
          position={lbl.pos}
          style={{ pointerEvents: "none" }}
        >
          <div
            style={{
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
              backdropFilter: "blur(4px)",
            }}
          >
            {lbl.label}
          </div>
        </Html>
      ))}
    </group>
  );
}

// ── rRNA ──────────────────────────────────────────────────────────────────────

const RRNA_LABELS = [
  {
    label: "Large Subunit (60S)",
    color: "#a78bfa",
    pos: [2.4, 1.0, 0] as [number, number, number],
  },
  {
    label: "Small Subunit (40S)",
    color: "#c084fc",
    pos: [2.2, -1.5, 0] as [number, number, number],
  },
  {
    label: "mRNA Channel",
    color: "#f59e0b",
    pos: [2.0, -0.5, 0] as [number, number, number],
  },
  {
    label: "P-site (peptidyl)",
    color: "#22c55e",
    pos: [-2.4, -0.5, 0] as [number, number, number],
  },
  {
    label: "A-site (aminoacyl)",
    color: "#ef4444",
    pos: [-0.5, -1.9, 0] as [number, number, number],
  },
  {
    label: "Exit Tunnel",
    color: "#94a3b8",
    pos: [-2.6, 0.5, 0] as [number, number, number],
  },
];

const RRNA_SURFACE_DOTS = [
  { id: "dot-0", angle: 0 },
  { id: "dot-1", angle: 1.2 },
  { id: "dot-2", angle: 2.4 },
  { id: "dot-3", angle: 3.6 },
];

function RRNAMolecule() {
  const groupRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = state.clock.getElapsedTime() * 0.22;
      // gentle float
      groupRef.current.position.y =
        Math.sin(state.clock.elapsedTime * 0.45) * 0.07;
    }
  });

  return (
    <group ref={groupRef}>
      {/* Ribosome image */}
      <group position={[-2.6, 0, -0.5]} rotation={[0, 0.4, 0]}>
        <RNAImagePlane url={RRNA_IMAGE} width={1.8} height={1.8} />
      </group>

      {/* Large subunit */}
      <mesh position={[0, 0.5, 0]}>
        <sphereGeometry args={[1.5, 24, 24]} />
        <meshStandardMaterial
          color="#7c3aed"
          emissive="#5b21b6"
          emissiveIntensity={0.35}
          roughness={0.4}
          metalness={0.1}
        />
      </mesh>
      {/* Small subunit */}
      <mesh position={[0, -1.2, 0]} scale={[1, 0.6, 1]}>
        <sphereGeometry args={[1.1, 20, 20]} />
        <meshStandardMaterial
          color="#a855f7"
          emissive="#7c3aed"
          emissiveIntensity={0.3}
          roughness={0.4}
          metalness={0.1}
        />
      </mesh>
      {/* mRNA channel */}
      <mesh position={[0, -0.55, 1.0]} rotation={[Math.PI / 2, 0, 0]}>
        <cylinderGeometry args={[0.15, 0.15, 0.5, 8]} />
        <meshStandardMaterial
          color="#f59e0b"
          emissive="#f59e0b"
          emissiveIntensity={0.7}
        />
      </mesh>
      {RRNA_SURFACE_DOTS.map((d) => {
        const x = Math.sin(d.angle) * 1.55;
        const z = Math.cos(d.angle) * 1.55;
        return (
          <mesh key={d.id} position={[x, 0.5, z]}>
            <sphereGeometry args={[0.11, 8, 8]} />
            <meshStandardMaterial
              color="#c4b5fd"
              emissive="#c4b5fd"
              emissiveIntensity={0.5}
            />
          </mesh>
        );
      })}
      <mesh position={[-0.4, -0.55, 0.7]}>
        <sphereGeometry args={[0.22, 10, 10]} />
        <meshStandardMaterial
          color="#22c55e"
          emissive="#22c55e"
          emissiveIntensity={0.6}
        />
      </mesh>
      <mesh position={[0.4, -0.55, 0.7]}>
        <sphereGeometry args={[0.22, 10, 10]} />
        <meshStandardMaterial
          color="#ef4444"
          emissive="#ef4444"
          emissiveIntensity={0.6}
        />
      </mesh>
      {RRNA_LABELS.map((lbl) => (
        <Html
          key={lbl.label}
          position={lbl.pos}
          style={{ pointerEvents: "none" }}
        >
          <div
            style={{
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
              backdropFilter: "blur(4px)",
            }}
          >
            {lbl.label}
          </div>
        </Html>
      ))}
    </group>
  );
}

function SceneContents({ view }: { view: RNAView }) {
  return (
    <>
      <ambientLight intensity={0.55} />
      <pointLight position={[5, 5, 5]} intensity={1.6} color="#c4b5fd" />
      <pointLight position={[-5, -5, 3]} intensity={0.9} color="#818cf8" />
      <pointLight position={[0, 0, -5]} intensity={0.7} color="#7c3aed" />
      {view === "mRNA" && <MRNAStrand />}
      {view === "tRNA" && <TRNAMolecule />}
      {view === "rRNA" && <RRNAMolecule />}
      <OrbitControls
        enablePan={false}
        minDistance={4}
        maxDistance={12}
        autoRotate={false}
      />
    </>
  );
}

const LEGENDS: Record<RNAView, Array<{ color: string; label: string }>> = {
  mRNA: [
    { color: "#22c55e", label: "Adenine (A)" },
    { color: "#ef4444", label: "Uracil (U)" },
    { color: "#3b82f6", label: "Guanine (G)" },
    { color: "#eab308", label: "Cytosine (C)" },
    { color: "#a78bfa", label: "Sugar-Phosphate Backbone" },
    { color: "#60a5fa", label: "5' Cap" },
  ],
  tRNA: [
    { color: "#a78bfa", label: "Acceptor Stem" },
    { color: "#60a5fa", label: "D-Loop" },
    { color: "#34d399", label: "T-Loop (TΨC)" },
    { color: "#ec4899", label: "Anticodon Loop" },
    { color: "#f97316", label: "Amino Acid Site (CCA 3')" },
  ],
  rRNA: [
    { color: "#7c3aed", label: "Large Subunit (60S)" },
    { color: "#a855f7", label: "Small Subunit (40S)" },
    { color: "#22c55e", label: "P-site (peptidyl)" },
    { color: "#ef4444", label: "A-site (aminoacyl)" },
    { color: "#f59e0b", label: "mRNA Channel" },
    { color: "#94a3b8", label: "Exit Tunnel" },
  ],
};

const VIEW_DESCRIPTIONS: Record<RNAView, string> = {
  mRNA: "Messenger RNA (mRNA) carries the genetic code from DNA to the ribosome. Each codon (3 bases) specifies one amino acid. The 5' cap (blue) protects the strand; the 3' poly-A tail stabilizes it. Every base is permanently labeled: A (green), U (red), G (blue), C (yellow).",
  tRNA: "Transfer RNA (tRNA) adopts a cloverleaf 3D structure. The anticodon loop (pink) reads mRNA codons; the 3' CCA acceptor stem (orange sphere) carries the amino acid. D-loop and T-loop provide structural stability. All regions are permanently labeled.",
  rRNA: "Ribosomal RNA (rRNA) forms the structural and catalytic core of the ribosome. The large 60S subunit (purple) and small 40S subunit (violet) come together. A-site, P-site, mRNA channel and exit tunnel are all labeled. Translation occurs at the interface.",
};

const VIEW_BUTTONS: Array<{ id: RNAView; label: string; color: string }> = [
  { id: "mRNA", label: "mRNA", color: "#a78bfa" },
  { id: "tRNA", label: "tRNA", color: "#ec4899" },
  { id: "rRNA", label: "rRNA / Ribosome", color: "#7c3aed" },
];

export function RNAScene() {
  const [view, setView] = useState<RNAView>("mRNA");

  return (
    <section
      className="rounded-2xl border overflow-hidden"
      style={{ borderColor: "rgba(155,89,255,0.3)", background: NAVY_BG }}
      aria-label="Interactive RNA molecular structure viewer"
    >
      {/* Toggle buttons */}
      <div
        className="flex items-center gap-2 p-4 border-b"
        style={{ borderColor: "rgba(155,89,255,0.2)" }}
        role="tablist"
        aria-label="RNA type selector"
      >
        <span
          style={{
            fontSize: "13px",
            fontWeight: 700,
            color: "#a78bfa",
            marginRight: "4px",
          }}
        >
          View:
        </span>
        {VIEW_BUTTONS.map((btn) => (
          <button
            key={btn.id}
            type="button"
            role="tab"
            aria-selected={view === btn.id}
            aria-label={`Show ${btn.id} structure`}
            onClick={() => setView(btn.id)}
            data-ocid={`rna-view-${btn.id.toLowerCase()}`}
            className="rounded-lg px-4 py-1.5 text-sm font-semibold"
            style={
              view === btn.id
                ? {
                    background: `${btn.color}33`,
                    color: btn.color,
                    border: `1px solid ${btn.color}`,
                    boxShadow: `0 0 10px ${btn.color}44`,
                    transition: "all 0.2s ease",
                  }
                : {
                    background: "rgba(5,10,40,0.6)",
                    color: "rgba(160,180,255,0.7)",
                    border: "1px solid rgba(100,110,200,0.35)",
                    transition: "all 0.2s ease",
                  }
            }
          >
            {btn.label}
          </button>
        ))}
        <span
          className="ml-auto"
          style={{ fontSize: "11px", color: "rgba(120,140,220,0.6)" }}
        >
          Real images · Drag · Scroll
        </span>
      </div>

      {/* 3D canvas */}
      <div style={{ height: "380px", background: NAVY_BG }}>
        <Canvas
          role="img"
          aria-label={`3D model of ${view} RNA structure with labeled components`}
          camera={{ position: [0, 0, 8], fov: 50 }}
          style={{ background: NAVY_BG }}
          gl={{ antialias: true, alpha: false }}
        >
          <color attach="background" args={[NAVY_BG]} />
          <SceneContents view={view} />
        </Canvas>
      </div>

      {/* Description + legend */}
      <div
        className="p-4 border-t"
        style={{ borderColor: "rgba(155,89,255,0.2)" }}
      >
        <p
          style={{
            fontSize: "13px",
            color: "rgba(180,200,255,0.85)",
            marginBottom: "12px",
            lineHeight: "1.6",
          }}
        >
          {VIEW_DESCRIPTIONS[view]}
        </p>
        <div className="flex flex-wrap gap-3">
          {LEGENDS[view].map((item) => (
            <div key={item.label} className="flex items-center gap-1.5">
              <div
                className="h-3 w-3 rounded-full shrink-0"
                style={{
                  background: item.color,
                  boxShadow: `0 0 6px ${item.color}88`,
                }}
              />
              <span
                style={{ fontSize: "12px", color: item.color, fontWeight: 600 }}
              >
                {item.label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
