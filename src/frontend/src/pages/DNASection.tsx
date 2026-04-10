import {
  AnimatedEntrance,
  StaggerContainer,
  StaggerItem,
} from "@/components/AnimatedEntrance";
import { QuizEngine } from "@/components/QuizEngine";
import { SceneErrorBoundary } from "@/components/SceneErrorBoundary";
import { SectionHeader } from "@/components/SectionHeader";
import { DNAScene } from "@/sections/DNAScene";
import { ReplicationFork } from "@/sections/ReplicationFork";
import type { QuizQuestion } from "@/types/biology";
import { Suspense } from "react";

const DNA_QUIZ: QuizQuestion[] = [
  {
    id: "dna-1",
    question:
      "Which two scientists are primarily credited with discovering the double helix structure of DNA in 1953?",
    options: [
      "Gregor Mendel and Charles Darwin",
      "James Watson and Francis Crick",
      "Rosalind Franklin and Maurice Wilkins",
      "Louis Pasteur and Robert Koch",
    ],
    correctIndex: 1,
    explanation:
      "James Watson and Francis Crick proposed the double helix model of DNA in 1953, using X-ray diffraction data obtained by Rosalind Franklin. They published their landmark paper in the journal Nature.",
    topic: "dna",
  },
  {
    id: "dna-2",
    question:
      "According to Chargaff's base-pairing rules, which two bases pair with each other?",
    options: [
      "Adenine pairs with Cytosine",
      "Adenine pairs with Guanine",
      "Adenine pairs with Thymine",
      "Adenine pairs with Uracil",
    ],
    correctIndex: 2,
    explanation:
      "Chargaff's rules state that Adenine (A) always pairs with Thymine (T), and Guanine (G) always pairs with Cytosine (C). These are complementary base pairs held together by hydrogen bonds.",
    topic: "dna",
  },
  {
    id: "dna-3",
    question:
      "How many hydrogen bonds connect a Guanine-Cytosine (G-C) base pair?",
    options: [
      "1 hydrogen bond",
      "2 hydrogen bonds",
      "3 hydrogen bonds",
      "4 hydrogen bonds",
    ],
    correctIndex: 2,
    explanation:
      "G-C pairs are held together by 3 hydrogen bonds, making them stronger than A-T pairs which only have 2 hydrogen bonds. This is why DNA sequences rich in G-C are more thermally stable.",
    topic: "dna",
  },
  {
    id: "dna-4",
    question: "What is the direction of DNA synthesis by DNA polymerase?",
    options: [
      "3' to 5' direction only",
      "5' to 3' direction only",
      "Both directions simultaneously",
      "Random direction",
    ],
    correctIndex: 1,
    explanation:
      "DNA polymerase can only synthesize new DNA in the 5' to 3' direction. This is because it adds new nucleotides to the 3'-OH end of the growing strand. This is why the lagging strand must be synthesized discontinuously.",
    topic: "dna",
  },
  {
    id: "dna-5",
    question: "What is the primary location of DNA within a eukaryotic cell?",
    options: ["Ribosome", "Mitochondria", "Nucleus", "Endoplasmic reticulum"],
    correctIndex: 2,
    explanation:
      "The vast majority of a eukaryotic cell's DNA is contained within the nucleus, organized into chromosomes. However, small amounts of DNA also exist in mitochondria and, in plant cells, chloroplasts.",
    topic: "dna",
  },
  {
    id: "dna-6",
    question:
      "What is the enzyme that unwinds the DNA double helix during replication?",
    options: ["DNA Polymerase III", "Primase", "DNA Ligase", "Helicase"],
    correctIndex: 3,
    explanation:
      "Helicase is the enzyme responsible for unwinding the double helix by breaking the hydrogen bonds between complementary base pairs. This creates a replication fork from which both strands can be copied.",
    topic: "dna",
  },
  {
    id: "dna-7",
    question: "What are Okazaki fragments?",
    options: [
      "Short RNA primers used to initiate DNA synthesis",
      "Short DNA fragments synthesized on the lagging strand",
      "Segments of DNA involved in gene expression",
      "Enzymes that seal nicks in the DNA backbone",
    ],
    correctIndex: 1,
    explanation:
      "Okazaki fragments are short DNA segments synthesized discontinuously on the lagging strand during replication. Because DNA polymerase can only work 5' to 3', the lagging strand (running 3' to 5') must be copied in pieces. These fragments are later joined by DNA ligase.",
    topic: "dna",
  },
  {
    id: "dna-8",
    question:
      "What is the term for DNA replication where each new double helix contains one original strand and one new strand?",
    options: [
      "Conservative replication",
      "Dispersive replication",
      "Semi-conservative replication",
      "Bidirectional replication",
    ],
    correctIndex: 2,
    explanation:
      "Semi-conservative replication means that when DNA is copied, each new double helix retains one original parent strand and one newly synthesized strand. This was proven by the Meselson–Stahl experiment in 1958 using heavy nitrogen isotopes.",
    topic: "dna",
  },
  {
    id: "dna-9",
    question: "Which component forms the 'backbone' of the DNA double helix?",
    options: [
      "Nitrogenous bases only",
      "Amino acids and peptide bonds",
      "Alternating deoxyribose sugar and phosphate groups",
      "Hydrogen bonds between base pairs",
    ],
    correctIndex: 2,
    explanation:
      "The DNA backbone is formed by alternating deoxyribose sugar molecules and phosphate groups, connected by phosphodiester bonds. The nitrogenous bases project inward and form the 'rungs' of the ladder-like structure.",
    topic: "dna",
  },
  {
    id: "dna-10",
    question:
      "What is the difference between the major and minor grooves of the DNA double helix?",
    options: [
      "Major grooves contain A-T pairs; minor grooves contain G-C pairs",
      "Major grooves are wider spaces between the backbone strands; minor grooves are narrower spaces",
      "Major grooves are found only in RNA; minor grooves in DNA",
      "There is no structural difference; they are the same",
    ],
    correctIndex: 1,
    explanation:
      "Due to the helical geometry of DNA, the backbone strands are not uniformly spaced — they create alternating wide (major) and narrow (minor) grooves. Proteins and other molecules that interact with DNA often use the major groove because it provides more accessible chemical information about the base sequence.",
    topic: "dna",
  },
];

const EXPLANATION_PARAGRAPHS = [
  {
    title: "Discovery and the Double Helix",
    content:
      "Deoxyribonucleic acid — DNA — is arguably the most famous molecule in all of biology, and for good reason: it carries the genetic instructions for the development, functioning, and reproduction of all known living organisms. The structure of DNA was described by James Watson and Francis Crick in their landmark 1953 paper published in Nature, building critically upon X-ray diffraction images produced by Rosalind Franklin and Maurice Wilkins. Their model revealed that DNA takes the form of a double helix — two long polynucleotide strands wound around a common axis like a twisted ladder. This elegant structure immediately suggested how genetic information could be copied faithfully from one cell to the next, sparking a revolution in biology that continues to this day. The discovery earned Watson, Crick, and Wilkins the Nobel Prize in Physiology or Medicine in 1962.",
  },
  {
    title: "The Nucleotide Building Blocks",
    content:
      "DNA is a polymer built from monomers called nucleotides. Each nucleotide consists of three components: a five-carbon deoxyribose sugar, a phosphate group, and one of four nitrogenous bases — adenine (A), thymine (T), guanine (G), or cytosine (C). The deoxyribose sugar gives DNA its name; it differs from ribose (used in RNA) by lacking a hydroxyl group at the 2' carbon position. This seemingly small difference has major chemical consequences — it makes DNA more chemically stable than RNA, which is why DNA evolved as the preferred long-term storage molecule for genetic information. Thousands of nucleotides are linked together through covalent phosphodiester bonds between the phosphate group of one nucleotide and the 3' carbon of the next sugar, forming the sugar-phosphate backbone that runs along the outside of the helix.",
  },
  {
    title: "Chargaff's Rules and Base Pairing",
    content:
      "One of the most important patterns in DNA chemistry was discovered by Erwin Chargaff in the late 1940s. By analyzing the base composition of DNA from many different species, Chargaff found that the amount of adenine always equals the amount of thymine (A = T), and the amount of guanine always equals cytosine (G = C). These proportions — known as Chargaff's rules — are observed in every organism's DNA. Watson and Crick realized this was because A specifically pairs with T (held by 2 hydrogen bonds) and G specifically pairs with C (held by 3 hydrogen bonds), forming complementary base pairs in the interior of the helix. The stronger G-C pairing explains why regions of DNA rich in guanine and cytosine have higher melting temperatures — more energy is required to separate the strands. This base-pair complementarity is the molecular foundation of the genetic code.",
  },
  {
    title: "Helix Geometry: Grooves and Antiparallel Strands",
    content:
      "The geometry of the double helix has several important features beyond simple base pairing. The two backbone strands run antiparallel to each other — one strand runs in the 5' to 3' direction while the other runs 3' to 5', where 5' and 3' refer to the carbon positions on the deoxyribose sugar. This antiparallel arrangement is critical for replication and transcription. The helical twist of the backbones creates two distinct grooves that spiral around the outside of the molecule: the major groove (wider, approximately 22Å) and the minor groove (narrower, approximately 12Å). These grooves expose the edges of the base pairs to the solvent, allowing proteins such as transcription factors and restriction enzymes to read the genetic sequence without fully unwinding the helix. Most regulatory proteins bind specifically in the major groove because it provides richer chemical information about the underlying base sequence.",
  },
  {
    title: "DNA Replication: The Semi-Conservative Mechanism",
    content:
      "Every time a cell divides, it must first duplicate its entire genome so that each daughter cell receives a complete copy. DNA replication is described as semi-conservative because each new double helix retains one original parent strand and one newly synthesized daughter strand — a fact confirmed elegantly by the Meselson–Stahl experiment in 1958. Replication begins at specific locations called origins of replication, where the enzyme helicase unwinds and separates the two strands, creating a replication fork. An enzyme called primase synthesizes short RNA primers to provide a starting point for DNA synthesis, since DNA polymerases cannot initiate new strands de novo. The main workhorse of replication in prokaryotes is DNA Polymerase III, which synthesizes new DNA by reading the template strand in the 3' to 5' direction and adding complementary nucleotides to the growing chain in the 5' to 3' direction.",
  },
  {
    title: "Leading and Lagging Strands, Okazaki Fragments",
    content:
      "Because DNA polymerase can only synthesize in the 5' to 3' direction, and the two template strands run antiparallel, the two new strands are synthesized differently. The leading strand is synthesized continuously in the same direction as fork movement, using the 3' to 5' template strand. The lagging strand, however, runs in the opposite direction to fork movement and must be synthesized discontinuously in short segments called Okazaki fragments, each beginning with a new RNA primer. These fragments are typically 100–200 nucleotides long in eukaryotes and 1000–2000 nucleotides long in prokaryotes. After synthesis, the RNA primers are removed and replaced with DNA by DNA Polymerase I, and the fragments are joined into a continuous strand by DNA ligase, which catalyzes the formation of phosphodiester bonds between adjacent fragments. The entire process is remarkably accurate, with an error rate of approximately one mistake per billion base pairs.",
  },
  {
    title: "Where DNA Lives in the Cell",
    content:
      "In eukaryotic cells, the vast majority of DNA is housed within the nucleus, coiled tightly around proteins called histones to form chromatin — a structure that allows approximately 2 meters of DNA to be packaged into a nucleus just 6–10 micrometers across. During cell division, chromatin condenses further into visible chromosomes. Humans carry 46 chromosomes (23 pairs) in their somatic cells, encoding approximately 3.2 billion base pairs. Beyond the nucleus, a small but vital portion of eukaryotic DNA exists in mitochondria, encoding 13 proteins critical for the respiratory chain; this mitochondrial DNA is circular, like bacterial chromosomes, reflecting the endosymbiotic origin of mitochondria. In plant cells, chloroplasts also contain their own circular DNA, encoding proteins essential for photosynthesis. Prokaryotic cells have no nucleus — their single circular chromosome is found in the nucleoid region of the cytoplasm.",
  },
];

export default function DNASection() {
  return (
    <section
      className="px-4 py-16 md:px-8"
      style={{ background: "oklch(0.15 0 0)" }}
    >
      <div className="mx-auto max-w-6xl">
        <SectionHeader
          topicId="dna"
          title="DNA: The Blueprint of Life"
          subtitle="The double-stranded molecule that carries hereditary information — unraveling its structure, chemistry, and the elegant mechanism of replication."
        />

        {/* 3D Helix + Intro */}
        <AnimatedEntrance direction="up" delay={0.1}>
          <div className="mb-12 grid grid-cols-1 gap-8 lg:grid-cols-2 lg:items-start">
            {/* 3D Scene */}
            <div
              className="rounded-2xl overflow-hidden border"
              style={{
                borderColor: "oklch(0.70 0.20 290 / 0.3)",
                background: "oklch(0.13 0.02 290)",
              }}
            >
              <div className="px-4 pt-4 pb-2">
                <h3 className="font-display font-bold text-lg accent-dna">
                  Interactive 3D Double Helix
                </h3>
                <p className="text-xs text-muted-foreground mt-0.5">
                  Click any base pair to identify it · Toggle highlighting to
                  compare pair types
                </p>
              </div>
              <SceneErrorBoundary
                sceneName="DNA Double Helix 3D Model"
                sceneColor="#9b59ff"
              >
                <Suspense
                  fallback={
                    <div
                      className="flex items-center justify-center"
                      style={{
                        height: 440,
                        background: "#080d2e",
                        borderRadius: 12,
                      }}
                    >
                      <div className="h-8 w-8 animate-spin rounded-full border-2 border-muted border-t-primary" />
                    </div>
                  }
                >
                  <DNAScene />
                </Suspense>
              </SceneErrorBoundary>
            </div>

            {/* First 2 paragraphs */}
            <div className="flex flex-col gap-5">
              {EXPLANATION_PARAGRAPHS.slice(0, 2).map((para) => (
                <AnimatedEntrance
                  key={para.title}
                  direction="right"
                  delay={0.15}
                >
                  <div
                    className="rounded-xl p-5 border"
                    style={{
                      borderColor: "oklch(0.70 0.20 290 / 0.2)",
                      background: "oklch(0.17 0.01 290)",
                    }}
                  >
                    <h3 className="font-display font-bold text-base mb-2 accent-dna">
                      {para.title}
                    </h3>
                    <p className="text-sm leading-relaxed text-muted-foreground">
                      {para.content}
                    </p>
                  </div>
                </AnimatedEntrance>
              ))}
            </div>
          </div>
        </AnimatedEntrance>

        {/* Base pairing callout */}
        <AnimatedEntrance direction="up" delay={0.1}>
          <div
            className="mb-10 rounded-2xl p-6 border"
            style={{
              borderColor: "oklch(0.70 0.20 290 / 0.3)",
              background: "oklch(0.17 0.02 290)",
            }}
          >
            <h3 className="font-display font-bold text-lg accent-dna mb-4">
              Chargaff's Base Pairing Rules at a Glance
            </h3>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              {[
                {
                  pair: "A — T",
                  desc: "Adenine binds Thymine",
                  bonds: "2 hydrogen bonds",
                  colorA: "#60a5fa",
                  colorB: "#fbbf24",
                  bg: "oklch(0.20 0.04 262)",
                },
                {
                  pair: "G — C",
                  desc: "Guanine binds Cytosine",
                  bonds: "3 hydrogen bonds",
                  colorA: "#34d399",
                  colorB: "#f87171",
                  bg: "oklch(0.20 0.04 142)",
                },
              ].map(({ pair, desc, bonds, colorA, colorB, bg }) => (
                <div
                  key={pair}
                  className="rounded-xl p-4 flex items-center gap-4"
                  style={{
                    background: bg,
                    border: "1px solid oklch(0.32 0 0)",
                  }}
                >
                  <div
                    className="text-2xl font-bold font-mono"
                    style={{ color: colorA }}
                  >
                    {pair.split(" — ")[0]}
                  </div>
                  <div className="text-xl font-bold text-muted-foreground">
                    —
                  </div>
                  <div
                    className="text-2xl font-bold font-mono"
                    style={{ color: colorB }}
                  >
                    {pair.split(" — ")[1]}
                  </div>
                  <div className="ml-2 flex flex-col">
                    <span className="text-sm font-medium text-foreground">
                      {desc}
                    </span>
                    <span className="text-xs text-muted-foreground">
                      {bonds}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </AnimatedEntrance>

        {/* Remaining explanation paragraphs */}
        <StaggerContainer
          staggerDelay={0.08}
          className="mb-12 grid grid-cols-1 gap-5 md:grid-cols-2"
        >
          {EXPLANATION_PARAGRAPHS.slice(2).map((para) => (
            <StaggerItem key={para.title}>
              <div
                className="h-full rounded-xl p-5 border"
                style={{
                  borderColor: "oklch(0.70 0.20 290 / 0.2)",
                  background: "oklch(0.17 0.01 290)",
                }}
              >
                <h3 className="font-display font-bold text-base mb-2 accent-dna">
                  {para.title}
                </h3>
                <p className="text-sm leading-relaxed text-muted-foreground">
                  {para.content}
                </p>
              </div>
            </StaggerItem>
          ))}
        </StaggerContainer>

        {/* Replication Fork Diagram */}
        <AnimatedEntrance direction="up" delay={0.1}>
          <div className="mb-12">
            <h3 className="font-display font-bold text-2xl accent-dna glow-dna mb-2">
              DNA Replication Fork
            </h3>
            <p className="text-sm text-muted-foreground mb-6">
              A CSS-animated diagram showing strand separation, leading strand
              synthesis, and Okazaki fragment formation on the lagging strand.
            </p>
            <ReplicationFork />
          </div>
        </AnimatedEntrance>

        {/* Key Facts Cards */}
        <AnimatedEntrance direction="up" delay={0.1}>
          <div className="mb-12 grid grid-cols-2 gap-4 sm:grid-cols-4">
            {[
              {
                label: "Base Pairs",
                value: "3.2 billion",
                sub: "in human genome",
                emoji: "🧬",
              },
              {
                label: "DNA Length",
                value: "~2 meters",
                sub: "per human cell",
                emoji: "📏",
              },
              {
                label: "Helix Width",
                value: "~2 nm",
                sub: "double helix diameter",
                emoji: "🔬",
              },
              {
                label: "Error Rate",
                value: "1 in 10⁹",
                sub: "bases during replication",
                emoji: "🎯",
              },
            ].map(({ label, value, sub, emoji }) => (
              <div
                key={label}
                className="rounded-xl p-4 text-center border"
                style={{
                  borderColor: "oklch(0.70 0.20 290 / 0.25)",
                  background: "oklch(0.18 0.02 290)",
                }}
              >
                <div className="text-3xl mb-2">{emoji}</div>
                <div className="font-display font-bold text-lg accent-dna">
                  {value}
                </div>
                <div className="text-xs font-semibold text-foreground mt-0.5">
                  {label}
                </div>
                <div className="text-xs text-muted-foreground mt-0.5">
                  {sub}
                </div>
              </div>
            ))}
          </div>
        </AnimatedEntrance>

        {/* Quiz */}
        <AnimatedEntrance direction="up" delay={0.15}>
          <div data-ocid="dna-quiz-section">
            <h3 className="font-display font-bold text-2xl accent-dna glow-dna mb-4">
              Test Your DNA Knowledge
            </h3>
            <QuizEngine topicId="dna" questions={DNA_QUIZ} />
          </div>
        </AnimatedEntrance>
      </div>
    </section>
  );
}
