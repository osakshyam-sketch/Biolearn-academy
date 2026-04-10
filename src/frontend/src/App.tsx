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
      <div className="h-8 w-8 animate-spin rounded-full border-2 border-muted border-t-primary" />
    </div>
  );
}

const coreTopics = [
  {
    id: "biomolecules" as TopicId,
    label: "Biomolecules",
    emoji: "🧬",
    color: "0.72 0.18 142",
  },
  {
    id: "cells" as TopicId,
    label: "Cells",
    emoji: "🔬",
    color: "0.68 0.19 262",
  },
  { id: "dna" as TopicId, label: "DNA", emoji: "🧪", color: "0.70 0.20 290" },
  { id: "rna" as TopicId, label: "RNA", emoji: "🔗", color: "0.70 0.20 290" },
  {
    id: "proteins" as TopicId,
    label: "Proteins",
    emoji: "⚗️",
    color: "0.68 0.22 36",
  },
];

const biotechTopics = BIOTECH_NAV_ITEMS.map((item, i) => {
  const bioColors = [
    "0.72 0.18 172",
    "0.72 0.18 195",
    "0.70 0.17 160",
    "0.68 0.16 210",
    "0.73 0.18 155",
    "0.71 0.17 145",
    "0.74 0.19 165",
    "0.70 0.16 220",
  ];
  return { ...item, color: bioColors[i] };
});

export default function App() {
  return (
    <Layout>
      {({ registerSection }) => (
        <div className="flex flex-col">
          {/* Hero Banner */}
          <section
            id="hero"
            className="relative overflow-hidden px-6 py-20 text-center"
            style={{
              background:
                "linear-gradient(180deg, oklch(0.17 0.02 240) 0%, oklch(0.15 0.01 240) 100%)",
            }}
          >
            <div
              className="absolute inset-0 pointer-events-none overflow-hidden"
              aria-hidden="true"
            >
              <div
                className="absolute -top-20 -left-20 h-64 w-64 rounded-full opacity-20 animate-float blur-3xl"
                style={{ background: "oklch(0.72 0.18 142)" }}
              />
              <div
                className="absolute top-10 right-10 h-48 w-48 rounded-full opacity-15 blur-3xl"
                style={{
                  background: "oklch(0.68 0.19 262)",
                  animationDelay: "1s",
                }}
              />
              <div
                className="absolute bottom-0 left-1/3 h-56 w-56 rounded-full opacity-15 blur-3xl animate-float"
                style={{
                  background: "oklch(0.70 0.20 290)",
                  animationDelay: "2s",
                }}
              />
              <div
                className="absolute bottom-10 right-1/4 h-44 w-44 rounded-full opacity-10 blur-3xl animate-float"
                style={{
                  background: "oklch(0.72 0.18 172)",
                  animationDelay: "3s",
                }}
              />
            </div>

            <div className="relative z-10 max-w-3xl mx-auto">
              <div
                className="mb-4 inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-sm font-medium border"
                style={{
                  background: "oklch(0.72 0.18 142 / 0.1)",
                  borderColor: "oklch(0.72 0.18 142 / 0.3)",
                  color: "oklch(0.72 0.18 142)",
                }}
              >
                🧬 Biology &amp; Biotechnology · Learn visually
              </div>
              <h1 className="font-display text-5xl md:text-6xl font-bold text-foreground leading-tight mb-4">
                Explore Life's{" "}
                <span className="accent-biomolecule glow-biomolecule">
                  Building Blocks
                </span>
              </h1>
              <p className="text-lg text-muted-foreground leading-relaxed max-w-xl mx-auto mb-8">
                From the smallest biomolecules to cutting-edge biotechnology —
                learn biology visually with rich animations, deep explanations,
                and interactive quizzes.
              </p>

              {/* Core Biology quick-links */}
              <div className="flex flex-wrap justify-center gap-3 mb-4">
                {coreTopics.map(({ id, label, emoji, color }) => (
                  <a
                    key={id}
                    href={`#${id}`}
                    className="flex items-center gap-2 rounded-xl px-4 py-2 text-sm font-medium transition-smooth hover:scale-105"
                    style={{
                      background: `oklch(${color} / 0.15)`,
                      color: `oklch(${color})`,
                      border: `1px solid oklch(${color} / 0.35)`,
                    }}
                    data-ocid={`hero-topic-${id}`}
                  >
                    {emoji} {label}
                  </a>
                ))}
              </div>

              {/* Biotechnology quick-links */}
              <div className="flex flex-wrap justify-center gap-2">
                <span
                  className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider mr-1"
                  style={{ color: "oklch(0.72 0.18 172)" }}
                >
                  ✂️ Biotech:
                </span>
                {biotechTopics.map(({ id, label, emoji, color }) => (
                  <a
                    key={id}
                    href={`#${id}`}
                    className="flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-medium transition-smooth hover:scale-105"
                    style={{
                      background: `oklch(${color} / 0.12)`,
                      color: `oklch(${color})`,
                      border: `1px solid oklch(${color} / 0.3)`,
                    }}
                    data-ocid={`hero-biotech-${id}`}
                  >
                    {emoji} {label}
                  </a>
                ))}
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
            className="relative px-6 py-10 text-center overflow-hidden"
            style={{
              background:
                "linear-gradient(135deg, oklch(0.16 0.04 180 / 0.6) 0%, oklch(0.16 0.04 220 / 0.6) 100%)",
              borderTop: "1px solid oklch(0.72 0.18 172 / 0.25)",
              borderBottom: "1px solid oklch(0.72 0.18 172 / 0.25)",
            }}
            aria-label="Biotechnology section"
          >
            <div
              className="absolute inset-0 pointer-events-none overflow-hidden"
              aria-hidden="true"
            >
              <div
                className="absolute -top-8 left-1/4 h-32 w-32 rounded-full opacity-10 blur-2xl animate-float"
                style={{ background: "oklch(0.72 0.18 172)" }}
              />
              <div
                className="absolute -bottom-8 right-1/4 h-28 w-28 rounded-full opacity-10 blur-2xl animate-float"
                style={{
                  background: "oklch(0.70 0.17 195)",
                  animationDelay: "1.5s",
                }}
              />
            </div>
            <div className="relative z-10 max-w-2xl mx-auto">
              <div
                className="mb-2 inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-wider border"
                style={{
                  background: "oklch(0.72 0.18 172 / 0.15)",
                  borderColor: "oklch(0.72 0.18 172 / 0.4)",
                  color: "oklch(0.72 0.18 172)",
                }}
              >
                🔬 Advanced Section
              </div>
              <h2
                className="font-display text-3xl md:text-4xl font-bold mb-3"
                style={{ color: "oklch(0.88 0.12 172)" }}
              >
                Biotechnology
              </h2>
              <p
                className="text-sm leading-relaxed"
                style={{ color: "oklch(0.70 0.05 220)" }}
              >
                Explore the techniques and tools that power modern biology —
                from gene editing with CRISPR to computational sequence
                analysis.
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
