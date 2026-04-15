import { Layout } from "@/components/Layout";
import type { TopicId } from "@/types/biology";
import { BIOTECH_NAV_ITEMS } from "@/types/biology";
import { Suspense, lazy } from "react";

const BiomoleculesSection = lazy(() => import("@/pages/BiomoleculesSection"));
const CellsSection = lazy(() => import("@/pages/CellsSection"));
const DNASection = lazy(() => import("@/pages/DNASection"));
const RNASection = lazy(() => import("@/pages/RNASection"));
const ProteinsSection = lazy(() => import("@/pages/ProteinsSection"));

const CRISPRSection = lazy(() => import("@/sections/CRISPRSection"));
const PCRSection = lazy(() => import("@/sections/PCRSection"));
const CloningSection = lazy(() => import("@/sections/CloningSection"));
const GelElectrophoresisSection = lazy(
  () => import("@/sections/GelElectrophoresisSection"),
);
const BiotechApplicationsSection = lazy(
  () => import("@/sections/BiotechApplicationsSection"),
);
const FermentationSection = lazy(
  () => import("@/sections/FermentationSection"),
);
const StemCellsSection = lazy(() => import("@/sections/StemCellsSection"));
const BioinformaticsSection = lazy(
  () => import("@/sections/BioinformaticsSection"),
);

function SectionLoader() {
  return (
    <div className="flex items-center justify-center py-24">
      <div
        className="h-8 w-8 animate-spin rounded-full border-2"
        style={{
          borderColor: "oklch(0.88 0.022 75)",
          borderTopColor: "oklch(0.48 0.14 145)",
        }}
      />
    </div>
  );
}

const coreTopics = [
  {
    id: "biomolecules" as TopicId,
    label: "Biomolecules",
    emoji: "🧬",
    color: "0.48 0.14 145",
    bgTint: "oklch(0.6 0.12 145 / 0.1)",
    border: "oklch(0.6 0.12 145 / 0.28)",
  },
  {
    id: "cells" as TopicId,
    label: "Cells",
    emoji: "🔬",
    color: "0.45 0.14 240",
    bgTint: "oklch(0.58 0.11 240 / 0.1)",
    border: "oklch(0.58 0.11 240 / 0.28)",
  },
  {
    id: "dna" as TopicId,
    label: "DNA",
    emoji: "🧪",
    color: "0.45 0.13 280",
    bgTint: "oklch(0.58 0.1 280 / 0.1)",
    border: "oklch(0.58 0.1 280 / 0.28)",
  },
  {
    id: "rna" as TopicId,
    label: "RNA",
    emoji: "🔗",
    color: "0.45 0.13 280",
    bgTint: "oklch(0.58 0.1 280 / 0.1)",
    border: "oklch(0.58 0.1 280 / 0.28)",
  },
  {
    id: "proteins" as TopicId,
    label: "Proteins",
    emoji: "⚗️",
    color: "0.5 0.16 35",
    bgTint: "oklch(0.62 0.14 35 / 0.1)",
    border: "oklch(0.62 0.14 35 / 0.28)",
  },
];

const biotechColors = [
  {
    bgTint: "oklch(0.6 0.12 172 / 0.1)",
    border: "oklch(0.6 0.12 172 / 0.28)",
    text: "0.46 0.13 172",
  },
  {
    bgTint: "oklch(0.6 0.12 195 / 0.1)",
    border: "oklch(0.6 0.12 195 / 0.28)",
    text: "0.46 0.13 195",
  },
  {
    bgTint: "oklch(0.58 0.12 160 / 0.1)",
    border: "oklch(0.58 0.12 160 / 0.28)",
    text: "0.46 0.13 160",
  },
  {
    bgTint: "oklch(0.58 0.11 210 / 0.1)",
    border: "oklch(0.58 0.11 210 / 0.28)",
    text: "0.46 0.12 210",
  },
  {
    bgTint: "oklch(0.58 0.12 155 / 0.1)",
    border: "oklch(0.58 0.12 155 / 0.28)",
    text: "0.46 0.13 155",
  },
  {
    bgTint: "oklch(0.58 0.12 145 / 0.1)",
    border: "oklch(0.58 0.12 145 / 0.28)",
    text: "0.46 0.13 145",
  },
  {
    bgTint: "oklch(0.6 0.13 165 / 0.1)",
    border: "oklch(0.6 0.13 165 / 0.28)",
    text: "0.47 0.14 165",
  },
  {
    bgTint: "oklch(0.58 0.11 220 / 0.1)",
    border: "oklch(0.58 0.11 220 / 0.28)",
    text: "0.46 0.12 220",
  },
];

const biotechTopics = BIOTECH_NAV_ITEMS.map((item, i) => ({
  ...item,
  ...biotechColors[i % biotechColors.length],
}));

export default function App() {
  return (
    <Layout>
      {({ registerSection }) => (
        <div className="flex flex-col">
          {/* ── Hero Banner ──────────────────────────────────────────────── */}
          <section
            id="hero"
            className="relative overflow-hidden px-6 py-20 text-center texture-grain"
            style={{
              background:
                "linear-gradient(175deg, oklch(0.97 0.022 80) 0%, oklch(0.95 0.018 70) 100%)",
              borderBottom: "1px solid oklch(0.88 0.022 75)",
            }}
          >
            {/* Soft background blobs — warm pastel tones */}
            <div
              className="absolute inset-0 pointer-events-none overflow-hidden"
              aria-hidden="true"
            >
              <div
                className="absolute -top-16 -left-16 h-72 w-72 rounded-full opacity-30 animate-float blur-3xl"
                style={{ background: "oklch(0.85 0.1 145)" }}
              />
              <div
                className="absolute top-8 right-8 h-56 w-56 rounded-full opacity-20 blur-3xl animate-float-slow"
                style={{ background: "oklch(0.82 0.1 240)" }}
              />
              <div
                className="absolute bottom-4 left-1/3 h-48 w-48 rounded-full opacity-20 blur-3xl animate-float-delayed"
                style={{ background: "oklch(0.84 0.1 280)" }}
              />
              <div
                className="absolute bottom-8 right-1/4 h-40 w-40 rounded-full opacity-15 blur-3xl animate-float"
                style={{ background: "oklch(0.87 0.1 35)" }}
              />
            </div>

            <div className="relative z-10 max-w-3xl mx-auto">
              {/* Eyebrow badge */}
              <div
                className="mb-5 inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-sm font-medium border animate-entrance-up"
                style={{
                  background: "oklch(0.6 0.12 145 / 0.1)",
                  borderColor: "oklch(0.6 0.12 145 / 0.28)",
                  color: "oklch(0.42 0.14 145)",
                }}
              >
                🧬 Biology &amp; Biotechnology · Learn visually
              </div>

              {/* Headline */}
              <h1 className="font-display text-5xl md:text-6xl font-bold text-foreground leading-tight mb-5 animate-entrance-up-delay-1">
                Curious about how{" "}
                <span className="accent-biomolecule glow-biomolecule">
                  life actually works?
                </span>
              </h1>

              {/* Subheadline — conversational, warm */}
              <p
                className="text-lg leading-relaxed max-w-xl mx-auto mb-3 animate-entrance-up-delay-2"
                style={{ color: "oklch(0.42 0.03 75)" }}
              >
                You've come to the right place. BioLearn takes you from the
                tiniest molecules all the way through cutting-edge biotech —
                with animations that actually make sense, not textbook diagrams
                that don't.
              </p>
              <p className="text-sm text-muted-foreground mb-8 animate-entrance-up-delay-2">
                Pick a topic below and start exploring. No prior knowledge
                needed.
              </p>

              {/* Core Biology quick-links */}
              <div className="flex flex-wrap justify-center gap-3 mb-5 animate-entrance-up-delay-3">
                {coreTopics.map(
                  ({ id, label, emoji, color, bgTint, border }) => (
                    <a
                      key={id}
                      href={`#${id}`}
                      className="flex items-center gap-2 rounded-xl px-4 py-2 text-sm font-medium transition-smooth hover:scale-105 hover:shadow-sm"
                      style={{
                        background: bgTint,
                        color: `oklch(${color})`,
                        border: `1px solid ${border}`,
                      }}
                      data-ocid={`hero-topic-${id}`}
                    >
                      {emoji} {label}
                    </a>
                  ),
                )}
              </div>

              {/* Biotechnology quick-links */}
              <div className="flex flex-wrap justify-center gap-2 animate-entrance-up-delay-3">
                <span
                  className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider mr-1"
                  style={{ color: "oklch(0.46 0.13 155)" }}
                >
                  ✂️ Biotech:
                </span>
                {biotechTopics.map(
                  ({ id, label, emoji, bgTint, border, text }) => (
                    <a
                      key={id}
                      href={`#${id}`}
                      className="flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-medium transition-smooth hover:scale-105"
                      style={{
                        background: bgTint,
                        color: `oklch(${text})`,
                        border: `1px solid ${border}`,
                      }}
                      data-ocid={`hero-biotech-${id}`}
                    >
                      {emoji} {label}
                    </a>
                  ),
                )}
              </div>
            </div>
          </section>

          {/* ── Core Biology Sections ──────────────────────────────────────── */}
          <Suspense fallback={<SectionLoader />}>
            <div
              ref={(el) =>
                registerSection("biomolecules", el as HTMLElement | null)
              }
              id="biomolecules"
            >
              <BiomoleculesSection />
            </div>
          </Suspense>
          <Suspense fallback={<SectionLoader />}>
            <div
              ref={(el) => registerSection("cells", el as HTMLElement | null)}
              id="cells"
            >
              <CellsSection />
            </div>
          </Suspense>
          <Suspense fallback={<SectionLoader />}>
            <div
              ref={(el) => registerSection("dna", el as HTMLElement | null)}
              id="dna"
            >
              <DNASection />
            </div>
          </Suspense>
          <Suspense fallback={<SectionLoader />}>
            <div
              ref={(el) => registerSection("rna", el as HTMLElement | null)}
              id="rna"
            >
              <RNASection />
            </div>
          </Suspense>
          <Suspense fallback={<SectionLoader />}>
            <div
              ref={(el) =>
                registerSection("proteins", el as HTMLElement | null)
              }
              id="proteins"
            >
              <ProteinsSection />
            </div>
          </Suspense>

          {/* ── Biotechnology Divider ─────────────────────────────────────── */}
          <div
            className="relative px-6 py-12 text-center overflow-hidden texture-grain"
            style={{
              background:
                "linear-gradient(135deg, oklch(0.94 0.025 155) 0%, oklch(0.95 0.02 172) 100%)",
              borderTop: "1px solid oklch(0.88 0.025 155)",
              borderBottom: "1px solid oklch(0.88 0.025 155)",
            }}
            aria-label="Biotechnology section"
          >
            {/* Subtle floating blobs */}
            <div
              className="absolute inset-0 pointer-events-none overflow-hidden"
              aria-hidden="true"
            >
              <div
                className="absolute -top-8 left-1/4 h-32 w-32 rounded-full opacity-25 blur-2xl animate-float"
                style={{ background: "oklch(0.72 0.12 155)" }}
              />
              <div
                className="absolute -bottom-8 right-1/4 h-28 w-28 rounded-full opacity-20 blur-2xl animate-float-delayed"
                style={{ background: "oklch(0.70 0.12 195)" }}
              />
            </div>

            <div className="relative z-10 max-w-2xl mx-auto">
              <div
                className="mb-3 inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-wider border"
                style={{
                  background: "oklch(0.6 0.12 155 / 0.12)",
                  borderColor: "oklch(0.6 0.12 155 / 0.3)",
                  color: "oklch(0.42 0.13 155)",
                }}
              >
                🔬 Advanced Section
              </div>
              <h2 className="font-display text-3xl md:text-4xl font-bold mb-3 accent-biotech glow-biotech">
                Welcome to Biotechnology
              </h2>
              <p
                className="text-sm leading-relaxed max-w-lg mx-auto"
                style={{ color: "oklch(0.42 0.04 155)" }}
              >
                This is where biology gets applied. CRISPR, PCR, cloning,
                fermentation — the real-world tools that are reshaping medicine,
                agriculture, and everything in between.
              </p>
            </div>
          </div>

          {/* ── Biotechnology Sections ─────────────────────────────────────── */}
          <Suspense fallback={<SectionLoader />}>
            <div
              ref={(el) => registerSection("crispr", el as HTMLElement | null)}
              id="crispr"
            >
              <CRISPRSection />
            </div>
          </Suspense>
          <Suspense fallback={<SectionLoader />}>
            <div
              ref={(el) => registerSection("pcr", el as HTMLElement | null)}
              id="pcr"
            >
              <PCRSection />
            </div>
          </Suspense>
          <Suspense fallback={<SectionLoader />}>
            <div
              ref={(el) => registerSection("cloning", el as HTMLElement | null)}
              id="cloning"
            >
              <CloningSection />
            </div>
          </Suspense>
          <Suspense fallback={<SectionLoader />}>
            <div
              ref={(el) =>
                registerSection("gel-electrophoresis", el as HTMLElement | null)
              }
              id="gel-electrophoresis"
            >
              <GelElectrophoresisSection />
            </div>
          </Suspense>
          <Suspense fallback={<SectionLoader />}>
            <div
              ref={(el) =>
                registerSection(
                  "biotech-applications",
                  el as HTMLElement | null,
                )
              }
              id="biotech-applications"
            >
              <BiotechApplicationsSection />
            </div>
          </Suspense>
          <Suspense fallback={<SectionLoader />}>
            <div
              ref={(el) =>
                registerSection("fermentation", el as HTMLElement | null)
              }
              id="fermentation"
            >
              <FermentationSection />
            </div>
          </Suspense>
          <Suspense fallback={<SectionLoader />}>
            <div
              ref={(el) =>
                registerSection("stem-cells", el as HTMLElement | null)
              }
              id="stem-cells"
            >
              <StemCellsSection />
            </div>
          </Suspense>
          <Suspense fallback={<SectionLoader />}>
            <div
              ref={(el) =>
                registerSection("bioinformatics", el as HTMLElement | null)
              }
              id="bioinformatics"
            >
              <BioinformaticsSection />
            </div>
          </Suspense>
        </div>
      )}
    </Layout>
  );
}
