import { Html, OrbitControls } from "@react-three/drei";
import { Canvas, useFrame } from "@react-three/fiber";
import {
  Component,
  type ReactNode,
  Suspense,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import * as THREE from "three";

// Module-level visibility flag — toggled by IntersectionObserver on the canvas wrapper
// eslint-disable-next-line prefer-const
let proteinSceneVisible = true;

class SceneErrorBoundary extends Component<
  { children: ReactNode; fallback?: ReactNode },
  { hasError: boolean }
> {
  constructor(props: { children: ReactNode; fallback?: ReactNode }) {
    super(props);
    this.state = { hasError: false };
  }
  static getDerivedStateFromError() {
    return { hasError: true };
  }
  override render() {
    if (this.state.hasError)
      return (
        this.props.fallback ?? (
          <div
            style={{
              width: "100%",
              height: "100%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "#a78bfa",
              fontSize: 14,
              background: "#080d2e",
            }}
          >
            Unable to render protein scene
          </div>
        )
      );
    return this.props.children;
  }
}

const NAVY_BG = "#080d2e";
export type StructureLevel = "primary" | "secondary" | "tertiary";

// ── Amino acid bead chain (PRIMARY) ──────────────────────────
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
  { id: "trp", color: "#ffbb55", name: "Trp" },
];

function AminoAcidBead({
  position,
  color,
  pulseOffset,
}: {
  position: THREE.Vector3;
  color: string;
  pulseOffset: number;
}) {
  const meshRef = useRef<THREE.Mesh>(null);
  useFrame((state) => {
    if (!proteinSceneVisible || !meshRef.current) return;
    const s = 1 + Math.sin(state.clock.elapsedTime * 1.1 + pulseOffset) * 0.07;
    meshRef.current.scale.setScalar(s);
  });
  return (
    <mesh ref={meshRef} position={position}>
      <sphereGeometry args={[0.18, 16, 16]} />
      <meshStandardMaterial
        color={color}
        emissive={color}
        emissiveIntensity={0.3}
        roughness={0.35}
        metalness={0.1}
      />
    </mesh>
  );
}

function PrimaryChain() {
  const groupRef = useRef<THREE.Group>(null);
  const count = AA_BEADS.length;
  const spread = 0.55;

  useFrame((_, delta) => {
    if (!proteinSceneVisible || !groupRef.current) return;
    groupRef.current.rotation.y += delta * 0.22;
  });

  const positions = useMemo(
    () =>
      Array.from(
        { length: count },
        (_, i) =>
          new THREE.Vector3(
            (i - count / 2) * spread,
            Math.sin(i * 0.5) * 0.3,
            Math.cos(i * 0.7) * 0.25,
          ),
      ),
    [count],
  );

  return (
    <group ref={groupRef}>
      {AA_BEADS.slice(1).map((bead, rawIdx) => {
        const i = rawIdx + 1;
        const pos = positions[i];
        const prev = positions[i - 1];
        const mid = pos.clone().add(prev).multiplyScalar(0.5);
        const dir = pos.clone().sub(prev);
        const len = dir.length();
        const quat = new THREE.Quaternion().setFromUnitVectors(
          new THREE.Vector3(0, 1, 0),
          dir.clone().normalize(),
        );
        return (
          <mesh key={`bond-${bead.id}`} position={mid} quaternion={quat}>
            <cylinderGeometry args={[0.042, 0.042, len, 8]} />
            <meshStandardMaterial
              color="#a78bfa"
              roughness={0.5}
              emissive="#7c3aed"
              emissiveIntensity={0.1}
            />
          </mesh>
        );
      })}

      {AA_BEADS.map((bead, i) => (
        <group key={`aa-${bead.id}`}>
          <AminoAcidBead
            position={positions[i]}
            color={bead.color}
            pulseOffset={i * 0.4}
          />
          <Html
            position={[positions[i].x, positions[i].y + 0.33, positions[i].z]}
            style={{ pointerEvents: "none" }}
          >
            <div
              style={{
                background: `${bead.color}22`,
                border: `1px solid ${bead.color}77`,
                borderRadius: "5px",
                padding: "1px 5px",
                fontSize: "8px",
                fontWeight: 700,
                color: bead.color,
                whiteSpace: "nowrap",
                textShadow: `0 0 4px ${bead.color}88`,
              }}
            >
              {bead.name}
            </div>
          </Html>
        </group>
      ))}

      <Html
        position={[positions[0].x - 0.2, positions[0].y + 0.68, 0]}
        style={{ pointerEvents: "none" }}
      >
        <div
          style={{
            background: "rgba(255,153,68,0.2)",
            border: "1px solid #ff994488",
            borderRadius: "7px",
            padding: "2px 8px",
            color: "#ff9944",
            fontSize: "11px",
            fontWeight: 700,
            whiteSpace: "nowrap",
            boxShadow: "0 0 10px #ff994455",
            textShadow: "0 0 8px #ff994488",
          }}
        >
          N-terminus (+H₃N)
        </div>
      </Html>
      <Html
        position={[
          positions[count - 1].x + 0.1,
          positions[count - 1].y + 0.68,
          0,
        ]}
        style={{ pointerEvents: "none" }}
      >
        <div
          style={{
            background: "rgba(77,184,255,0.2)",
            border: "1px solid #4db8ff88",
            borderRadius: "7px",
            padding: "2px 8px",
            color: "#4db8ff",
            fontSize: "11px",
            fontWeight: 700,
            whiteSpace: "nowrap",
            boxShadow: "0 0 10px #4db8ff55",
            textShadow: "0 0 8px #4db8ff88",
          }}
        >
          C-terminus (–COO⁻)
        </div>
      </Html>

      {[
        {
          label: "Polypeptide Chain",
          color: "#fbbf24",
          pos: [0, 1.4, 0] as [number, number, number],
        },
        {
          label: "Peptide Bond (–CO–NH–)",
          color: "#a78bfa",
          pos: [0, -1.3, 0] as [number, number, number],
        },
        {
          label: "R-Group (Side Chain)",
          color: "#34d399",
          pos: [0, 0.35, 0.8] as [number, number, number],
        },
      ].map((lbl) => (
        <Html
          key={lbl.label}
          position={lbl.pos}
          style={{ pointerEvents: "none" }}
        >
          <div
            style={{
              background: "rgba(5,10,40,0.85)",
              border: `1px solid ${lbl.color}55`,
              borderRadius: "7px",
              padding: "2px 7px",
              fontSize: "9px",
              fontWeight: 700,
              color: lbl.color,
              whiteSpace: "nowrap",
              textShadow: `0 0 5px ${lbl.color}77`,
            }}
          >
            {lbl.label}
          </div>
        </Html>
      ))}
    </group>
  );
}

// ── Alpha-Helix (pure geometry coil) ─────────────────────────
function AlphaHelix({
  position,
  id,
  color = "#ff7722",
  label,
}: {
  position: [number, number, number];
  id: string;
  color?: string;
  label?: string;
}) {
  const meshRef = useRef<THREE.Mesh>(null);
  const [hovered, setHovered] = useState(false);

  useFrame((_, delta) => {
    if (!proteinSceneVisible || !meshRef.current) return;
    meshRef.current.rotation.y += delta * (hovered ? 0.7 : 0.2);
  });

  const curve = useMemo(() => {
    const pts: THREE.Vector3[] = [];
    for (let i = 0; i <= 80; i++) {
      const t = (i / 80) * 4 * Math.PI * 2;
      pts.push(
        new THREE.Vector3(
          Math.cos(t) * 0.28,
          (i / 80) * 1.6 - 0.8,
          Math.sin(t) * 0.28,
        ),
      );
    }
    return new THREE.CatmullRomCurve3(pts);
  }, []);

  const geo = useMemo(
    () => new THREE.TubeGeometry(curve, 80, hovered ? 0.07 : 0.055, 10, false),
    [curve, hovered],
  );

  return (
    <group position={position}>
      <mesh
        key={`helix-${id}-${hovered}`}
        ref={meshRef}
        geometry={geo}
        onPointerEnter={() => setHovered(true)}
        onPointerLeave={() => setHovered(false)}
      >
        <meshStandardMaterial
          color={hovered ? "#ffaa44" : color}
          emissive={color}
          emissiveIntensity={hovered ? 0.55 : 0.22}
          roughness={0.3}
          metalness={0.15}
        />
      </mesh>
      <Html position={[0.62, 0.95, 0]} style={{ pointerEvents: "none" }}>
        <div
          style={{
            background: `${color}28`,
            border: `1px solid ${color}99`,
            borderRadius: "8px",
            padding: "3px 8px",
            fontSize: "10px",
            fontWeight: 700,
            color: hovered ? "#ffaa44" : color,
            whiteSpace: "nowrap",
            boxShadow: `0 0 10px ${color}44`,
            textShadow: `0 0 5px ${color}66`,
          }}
        >
          🌀 {label ?? "Alpha-Helix"}
        </div>
      </Html>
    </group>
  );
}

// ── Beta-Sheet (pure geometry flat ribbons + arrows) ──────────
function BetaSheet({
  position,
  id,
}: { position: [number, number, number]; id: string }) {
  const [hovered, setHovered] = useState(false);
  const strands = [
    { y: 0.3, flip: false, sid: "top" },
    { y: 0, flip: true, sid: "mid" },
    { y: -0.3, flip: false, sid: "bot" },
  ];
  const color = "#ffd44d";

  return (
    <group position={position}>
      {strands.map((s) => (
        <group key={`${id}-s${s.sid}`}>
          <mesh
            position={[0, s.y, 0]}
            rotation={[0, s.flip ? Math.PI : 0, 0]}
            onPointerEnter={() => setHovered(true)}
            onPointerLeave={() => setHovered(false)}
          >
            <boxGeometry args={[0.9, 0.13, 0.22]} />
            <meshStandardMaterial
              color={hovered ? "#ffe17a" : color}
              emissive="#ffb300"
              emissiveIntensity={hovered ? 0.5 : 0.2}
              roughness={0.45}
            />
          </mesh>
          <mesh
            position={[0.55, s.y, 0]}
            rotation={[0, s.flip ? Math.PI : 0, Math.PI / 2]}
            onPointerEnter={() => setHovered(true)}
            onPointerLeave={() => setHovered(false)}
          >
            <coneGeometry args={[0.13, 0.22, 4]} />
            <meshStandardMaterial
              color={hovered ? "#ffe17a" : color}
              emissive="#ffb300"
              emissiveIntensity={hovered ? 0.5 : 0.2}
            />
          </mesh>
        </group>
      ))}
      <Html position={[0.88, 0.6, 0]} style={{ pointerEvents: "none" }}>
        <div
          style={{
            background: `${color}28`,
            border: `1px solid ${color}99`,
            borderRadius: "8px",
            padding: "3px 8px",
            fontSize: "10px",
            fontWeight: 700,
            color,
            whiteSpace: "nowrap",
            boxShadow: `0 0 10px ${color}44`,
          }}
        >
          ➡ Beta-Sheet
        </div>
      </Html>
      <Html position={[0, -0.52, 0]} style={{ pointerEvents: "none" }}>
        <div
          style={{
            background: "rgba(52,211,153,0.15)",
            border: "1px solid #34d39966",
            borderRadius: "6px",
            padding: "2px 6px",
            fontSize: "9px",
            fontWeight: 700,
            color: "#34d399",
            whiteSpace: "nowrap",
          }}
        >
          Hydrogen Bonds
        </div>
      </Html>
    </group>
  );
}

function LoopConnector({
  from,
  to,
}: { from: THREE.Vector3; to: THREE.Vector3 }) {
  const curve = useMemo(() => {
    const mid = from.clone().lerp(to, 0.5);
    mid.x += 0.4;
    return new THREE.CatmullRomCurve3([from, mid, to]);
  }, [from, to]);
  return (
    <mesh>
      <tubeGeometry args={[curve, 20, 0.03, 6, false]} />
      <meshStandardMaterial
        color="#b0a0c8"
        roughness={0.7}
        transparent
        opacity={0.8}
      />
    </mesh>
  );
}

// ── Tertiary fold: sphere cluster + disulfide bonds ────────────
function TertiaryFoldScene({ paused }: { paused: boolean }) {
  const groupRef = useRef<THREE.Group>(null);

  useFrame((_, delta) => {
    if (!proteinSceneVisible || !groupRef.current || paused) return;
    groupRef.current.rotation.y += delta * 0.18;
  });

  const loopFrom = useMemo(() => new THREE.Vector3(-0.6, 0.9, 0), []);
  const loopTo = useMemo(() => new THREE.Vector3(0.3, 0.2, -0.2), []);
  const loopFrom2 = useMemo(() => new THREE.Vector3(0.8, 0.6, -0.2), []);
  const loopTo2 = useMemo(() => new THREE.Vector3(0.3, 0.2, 0.3), []);

  return (
    <group ref={groupRef}>
      <AlphaHelix
        id="t-h1"
        position={[-0.9, 0.2, 0]}
        color="#ff7722"
        label="Alpha-Helix (α)"
      />
      <AlphaHelix
        id="t-h2"
        position={[0.6, -0.5, 0.3]}
        color="#e05520"
        label="Helix Region"
      />
      <BetaSheet id="t-b1" position={[0.3, 0.6, -0.2]} />
      <LoopConnector from={loopFrom} to={loopTo} />
      <LoopConnector from={loopFrom2} to={loopTo2} />

      {/* Hydrophobic core sphere */}
      <mesh>
        <sphereGeometry args={[0.5, 20, 20]} />
        <meshStandardMaterial
          color="#ff6600"
          emissive="#ff4400"
          emissiveIntensity={0.12}
          transparent
          opacity={0.07}
        />
      </mesh>

      {/* Disulfide bond — yellow sphere */}
      <mesh position={[-0.1, 0.1, 0.4]}>
        <sphereGeometry args={[0.09, 12, 12]} />
        <meshStandardMaterial
          color="#e8d44d"
          emissive="#d4aa00"
          emissiveIntensity={0.5}
        />
      </mesh>

      <Html position={[0.85, 1.35, 0]} style={{ pointerEvents: "none" }}>
        <div
          style={{
            background: "rgba(176,160,200,0.2)",
            border: "1px solid #b0a0c888",
            borderRadius: "6px",
            padding: "2px 7px",
            fontSize: "9px",
            fontWeight: 700,
            color: "#c4b5fd",
            whiteSpace: "nowrap",
          }}
        >
          Random Coil / Loop
        </div>
      </Html>

      {[
        {
          label: "Disulfide Bond (S–S)",
          color: "#e8d44d",
          pos: [0.4, 0.5, 1.0] as [number, number, number],
        },
        {
          label: "Hydrophobic Core",
          color: "#fb923c",
          pos: [-0.8, -0.2, 0.8] as [number, number, number],
        },
        {
          label: "Tertiary Fold",
          color: "#c084fc",
          pos: [1.3, 0.9, 0.5] as [number, number, number],
        },
      ].map((lbl) => (
        <Html
          key={lbl.label}
          position={lbl.pos}
          style={{ pointerEvents: "none" }}
        >
          <div
            style={{
              background: "rgba(5,10,40,0.85)",
              border: `1px solid ${lbl.color}66`,
              borderRadius: "7px",
              padding: "2px 7px",
              fontSize: "9px",
              fontWeight: 700,
              color: lbl.color,
              whiteSpace: "nowrap",
              textShadow: `0 0 4px ${lbl.color}77`,
              boxShadow: `0 0 8px ${lbl.color}33`,
            }}
          >
            {lbl.label}
          </div>
        </Html>
      ))}
    </group>
  );
}

// ── Secondary scene: 2 helices + 1 beta-sheet ─────────────────
function SecondaryScene({ paused }: { paused: boolean }) {
  const groupRef = useRef<THREE.Group>(null);

  useFrame((_, delta) => {
    if (!proteinSceneVisible || !groupRef.current || paused) return;
    groupRef.current.rotation.y += delta * 0.18;
  });

  const loopFrom = useMemo(() => new THREE.Vector3(-0.6, 0.9, 0), []);
  const loopTo = useMemo(() => new THREE.Vector3(0.3, 0.2, -0.2), []);
  const loopFrom2 = useMemo(() => new THREE.Vector3(0.8, 0.6, -0.2), []);
  const loopTo2 = useMemo(() => new THREE.Vector3(0.3, 0.2, 0.3), []);

  return (
    <group ref={groupRef}>
      <AlphaHelix id="s-h1" position={[-0.9, 0.2, 0]} />
      <AlphaHelix
        id="s-h2"
        position={[0.6, -0.5, 0.3]}
        color="#e05520"
        label="Helix Region"
      />
      <BetaSheet id="s-b1" position={[0.3, 0.6, -0.2]} />
      <LoopConnector from={loopFrom} to={loopTo} />
      <LoopConnector from={loopFrom2} to={loopTo2} />
      <Html position={[0.85, 1.35, 0]} style={{ pointerEvents: "none" }}>
        <div
          style={{
            background: "rgba(176,160,200,0.2)",
            border: "1px solid #b0a0c888",
            borderRadius: "6px",
            padding: "2px 7px",
            fontSize: "9px",
            fontWeight: 700,
            color: "#c4b5fd",
            whiteSpace: "nowrap",
          }}
        >
          Random Coil / Loop
        </div>
      </Html>
    </group>
  );
}

const LEVEL_BUTTONS: {
  id: StructureLevel;
  label: string;
  color: string;
  desc: string;
}[] = [
  {
    id: "primary",
    label: "Primary",
    color: "#ff9944",
    desc: "Amino acid sequence",
  },
  {
    id: "secondary",
    label: "Secondary",
    color: "#ffd44d",
    desc: "α-helices & β-sheets",
  },
  {
    id: "tertiary",
    label: "Tertiary",
    color: "#ff6622",
    desc: "3D folded structure",
  },
];

const LEVEL_LEGENDS: Record<
  StructureLevel,
  Array<{ color: string; label: string }>
> = {
  primary: [
    { color: "#ff9944", label: "Amino Acid" },
    { color: "#a78bfa", label: "Peptide Bond" },
    { color: "#ff9944", label: "N-terminus (+H₃N)" },
    { color: "#4db8ff", label: "C-terminus (–COO⁻)" },
    { color: "#34d399", label: "R Group (Side Chain)" },
  ],
  secondary: [
    { color: "#ff7722", label: "Alpha-Helix (α)" },
    { color: "#ffd44d", label: "Beta-Sheet (β)" },
    { color: "#34d399", label: "Hydrogen Bond" },
    { color: "#b0a0c8", label: "Random Coil / Loop" },
  ],
  tertiary: [
    { color: "#ff7722", label: "Alpha-Helix" },
    { color: "#ffd44d", label: "Beta-Sheet" },
    { color: "#e8d44d", label: "Disulfide Bond" },
    { color: "#fb923c", label: "Hydrophobic Core" },
    { color: "#c084fc", label: "Tertiary Fold" },
  ],
};

export function ProteinScene({
  level,
  onLevelChange,
}: { level: StructureLevel; onLevelChange: (l: StructureLevel) => void }) {
  const [paused, setPaused] = useState(false);
  const wrapperRef = useRef<HTMLDivElement>(null);

  // Gate all useFrame work when the canvas is offscreen
  useEffect(() => {
    const el = wrapperRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      (entries) => {
        proteinSceneVisible = entries[0]?.isIntersecting ?? false;
      },
      { rootMargin: "100px" },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <section aria-label="Interactive protein structure viewer">
      <div
        ref={wrapperRef}
        className="relative w-full rounded-2xl overflow-hidden"
        style={{ height: "480px", background: NAVY_BG }}
        onPointerEnter={() => setPaused(true)}
        onPointerLeave={() => setPaused(false)}
      >
        {/* Level tabs */}
        <div
          className="absolute top-3 left-3 z-10 flex gap-2"
          role="tablist"
          aria-label="Protein structure level"
        >
          {LEVEL_BUTTONS.map((btn) => (
            <button
              key={btn.id}
              type="button"
              role="tab"
              aria-selected={level === btn.id}
              aria-label={`View ${btn.label} protein structure — ${btn.desc}`}
              onClick={() => onLevelChange(btn.id)}
              data-ocid={`protein-level-${btn.id}`}
              style={{
                background:
                  level === btn.id ? `${btn.color}28` : "rgba(5,10,40,0.88)",
                border: `1px solid ${level === btn.id ? btn.color : "rgba(100,110,200,0.3)"}`,
                color: level === btn.id ? btn.color : "rgba(160,180,255,0.7)",
                borderRadius: "8px",
                padding: "5px 12px",
                fontSize: "12px",
                fontWeight: 600,
                cursor: "pointer",
                backdropFilter: "blur(6px)",
                transition: "all 0.25s ease",
                boxShadow:
                  level === btn.id ? `0 0 12px ${btn.color}44` : "none",
              }}
            >
              {btn.label}
            </button>
          ))}
        </div>

        <SceneErrorBoundary
          fallback={
            <div
              style={{
                width: "100%",
                height: "100%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                background: NAVY_BG,
                color: "#a78bfa",
                fontSize: 14,
                flexDirection: "column",
                gap: 8,
              }}
            >
              <span style={{ fontSize: 28 }}>🧬</span>
              <span>Protein structure visualization</span>
              <span style={{ fontSize: 12, color: "#6b7dd8" }}>
                {LEVEL_BUTTONS.find((b) => b.id === level)?.desc}
              </span>
            </div>
          }
        >
          <Canvas
            role="img"
            aria-label={`Protein ${level} structure — pure geometry, permanent labels`}
            camera={{ position: [0, 0, 4.5], fov: 50 }}
            gl={{ antialias: true, alpha: false }}
            style={{ background: NAVY_BG }}
          >
            <color attach="background" args={[NAVY_BG]} />
            <ambientLight intensity={0.45} />
            <pointLight position={[3, 3, 3]} intensity={2.0} color="#ffaa55" />
            <pointLight
              position={[-3, -2, -2]}
              intensity={0.9}
              color="#aa6600"
            />
            <pointLight position={[0, -3, 2]} intensity={0.5} color="#7c3aed" />
            <spotLight
              position={[0, 5, 2]}
              intensity={0.7}
              angle={0.5}
              penumbra={0.6}
              color="#ffeecc"
            />

            <Suspense fallback={null}>
              {level === "primary" && <PrimaryChain />}
              {level === "secondary" && <SecondaryScene paused={paused} />}
              {level === "tertiary" && <TertiaryFoldScene paused={paused} />}
            </Suspense>

            <OrbitControls
              enablePan={false}
              minDistance={2.5}
              maxDistance={8}
              autoRotate={!paused}
              autoRotateSpeed={1.1}
              enableDamping
              dampingFactor={0.08}
            />
          </Canvas>
        </SceneErrorBoundary>

        <div
          className="absolute bottom-3 left-1/2 -translate-x-1/2 pointer-events-none"
          style={{
            background: "rgba(5,10,40,0.7)",
            borderRadius: "20px",
            padding: "4px 12px",
            border: "1px solid rgba(255,255,255,0.07)",
          }}
        >
          <p
            style={{
              fontSize: "10px",
              color: "rgba(160,180,255,0.65)",
              textAlign: "center",
              whiteSpace: "nowrap",
            }}
          >
            Pure geometry · Hover structures · Drag to rotate · Scroll to zoom
          </p>
        </div>
      </div>

      {/* Legend panel */}
      <div
        className="mt-3 rounded-xl p-3 flex flex-wrap gap-3"
        style={{
          background: "rgba(5,10,40,0.72)",
          border: "1px solid rgba(100,110,200,0.25)",
          backdropFilter: "blur(8px)",
        }}
      >
        <div
          style={{
            width: "100%",
            fontSize: "11px",
            fontWeight: 700,
            color: "#a78bfa",
            marginBottom: "2px",
            letterSpacing: "0.04em",
          }}
        >
          {LEVEL_BUTTONS.find((b) => b.id === level)?.label.toUpperCase()} —{" "}
          {LEVEL_BUTTONS.find((b) => b.id === level)?.desc}
        </div>
        {LEVEL_LEGENDS[level].map((item) => (
          <div key={item.label} className="flex items-center gap-1.5">
            <div
              style={{
                width: "10px",
                height: "10px",
                borderRadius: "3px",
                background: item.color,
                boxShadow: `0 0 5px ${item.color}88`,
                flexShrink: 0,
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
    </section>
  );
}
