import type React from "react";

export type TopicId =
  | "biomolecules"
  | "cells"
  | "dna"
  | "rna"
  | "proteins"
  | "crispr"
  | "pcr"
  | "cloning"
  | "gel-electrophoresis"
  | "biotech-applications"
  | "fermentation"
  | "stem-cells"
  | "bioinformatics";

export interface TopicConfig {
  id: TopicId;
  label: string;
  icon: string;
  color: "biomolecule" | "cell" | "dna" | "protein" | "biotech";
  accentClass: string;
  glowClass: string;
  shadowClass: string;
  sectionClass: string;
  badgeStyle: React.CSSProperties;
}

export interface QuizQuestion {
  id: string;
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
  topic: TopicId;
}

export interface QuizState {
  topicId: TopicId;
  currentIndex: number;
  answers: (number | null)[];
  completed: boolean;
  score: number;
}

export interface SubtopicLink {
  id: string;
  label: string;
  anchor: string;
}

export interface NavItem {
  id: TopicId;
  label: string;
  emoji: string;
  children?: SubtopicLink[];
}

export interface NavGroup {
  groupLabel: string;
  items: NavItem[];
}

export const TOPICS: TopicConfig[] = [
  {
    id: "biomolecules",
    label: "Biomolecules",
    icon: "🧬",
    color: "biomolecule",
    accentClass: "accent-biomolecule",
    glowClass: "glow-biomolecule",
    shadowClass: "shadow-glow-biomolecule",
    sectionClass: "topic-section-biomolecule",
    badgeStyle: {
      background: "oklch(0.72 0.18 142 / 0.2)",
      color: "oklch(0.72 0.18 142)",
      border: "1px solid oklch(0.72 0.18 142 / 0.4)",
    },
  },
  {
    id: "cells",
    label: "Cells",
    icon: "🔬",
    color: "cell",
    accentClass: "accent-cell",
    glowClass: "glow-cell",
    shadowClass: "shadow-glow-cell",
    sectionClass: "topic-section-cell",
    badgeStyle: {
      background: "oklch(0.68 0.19 262 / 0.2)",
      color: "oklch(0.68 0.19 262)",
      border: "1px solid oklch(0.68 0.19 262 / 0.4)",
    },
  },
  {
    id: "dna",
    label: "DNA",
    icon: "🧪",
    color: "dna",
    accentClass: "accent-dna",
    glowClass: "glow-dna",
    shadowClass: "shadow-glow-dna",
    sectionClass: "topic-section-dna",
    badgeStyle: {
      background: "oklch(0.70 0.20 290 / 0.2)",
      color: "oklch(0.70 0.20 290)",
      border: "1px solid oklch(0.70 0.20 290 / 0.4)",
    },
  },
  {
    id: "rna",
    label: "RNA",
    icon: "🔗",
    color: "dna",
    accentClass: "accent-dna",
    glowClass: "glow-dna",
    shadowClass: "shadow-glow-dna",
    sectionClass: "topic-section-dna",
    badgeStyle: {
      background: "oklch(0.70 0.20 290 / 0.2)",
      color: "oklch(0.70 0.20 290)",
      border: "1px solid oklch(0.70 0.20 290 / 0.4)",
    },
  },
  {
    id: "proteins",
    label: "Proteins",
    icon: "⚗️",
    color: "protein",
    accentClass: "accent-protein",
    glowClass: "glow-protein",
    shadowClass: "shadow-glow-protein",
    sectionClass: "topic-section-protein",
    badgeStyle: {
      background: "oklch(0.68 0.22 36 / 0.2)",
      color: "oklch(0.68 0.22 36)",
      border: "1px solid oklch(0.68 0.22 36 / 0.4)",
    },
  },
  // ── Biotechnology Topics ──────────────────────────────────────────────────
  {
    id: "crispr",
    label: "CRISPR",
    icon: "✂️",
    color: "biotech",
    accentClass: "accent-biotech",
    glowClass: "glow-biotech",
    shadowClass: "shadow-glow-biotech",
    sectionClass: "topic-section-biotech",
    badgeStyle: {
      background: "oklch(0.72 0.18 172 / 0.2)",
      color: "oklch(0.72 0.18 172)",
      border: "1px solid oklch(0.72 0.18 172 / 0.4)",
    },
  },
  {
    id: "pcr",
    label: "PCR",
    icon: "🔁",
    color: "biotech",
    accentClass: "accent-biotech",
    glowClass: "glow-biotech",
    shadowClass: "shadow-glow-biotech",
    sectionClass: "topic-section-biotech",
    badgeStyle: {
      background: "oklch(0.72 0.18 195 / 0.2)",
      color: "oklch(0.72 0.18 195)",
      border: "1px solid oklch(0.72 0.18 195 / 0.4)",
    },
  },
  {
    id: "cloning",
    label: "Cloning & Recombinant DNA",
    icon: "🧫",
    color: "biotech",
    accentClass: "accent-biotech",
    glowClass: "glow-biotech",
    shadowClass: "shadow-glow-biotech",
    sectionClass: "topic-section-biotech",
    badgeStyle: {
      background: "oklch(0.70 0.17 160 / 0.2)",
      color: "oklch(0.70 0.17 160)",
      border: "1px solid oklch(0.70 0.17 160 / 0.4)",
    },
  },
  {
    id: "gel-electrophoresis",
    label: "Gel Electrophoresis",
    icon: "📊",
    color: "biotech",
    accentClass: "accent-biotech",
    glowClass: "glow-biotech",
    shadowClass: "shadow-glow-biotech",
    sectionClass: "topic-section-biotech",
    badgeStyle: {
      background: "oklch(0.68 0.16 210 / 0.2)",
      color: "oklch(0.68 0.16 210)",
      border: "1px solid oklch(0.68 0.16 210 / 0.4)",
    },
  },
  {
    id: "biotech-applications",
    label: "Biotech Applications",
    icon: "💉",
    color: "biotech",
    accentClass: "accent-biotech",
    glowClass: "glow-biotech",
    shadowClass: "shadow-glow-biotech",
    sectionClass: "topic-section-biotech",
    badgeStyle: {
      background: "oklch(0.73 0.18 155 / 0.2)",
      color: "oklch(0.73 0.18 155)",
      border: "1px solid oklch(0.73 0.18 155 / 0.4)",
    },
  },
  {
    id: "fermentation",
    label: "Fermentation & Bioreactors",
    icon: "🫧",
    color: "biotech",
    accentClass: "accent-biotech",
    glowClass: "glow-biotech",
    shadowClass: "shadow-glow-biotech",
    sectionClass: "topic-section-biotech",
    badgeStyle: {
      background: "oklch(0.71 0.17 145 / 0.2)",
      color: "oklch(0.71 0.17 145)",
      border: "1px solid oklch(0.71 0.17 145 / 0.4)",
    },
  },
  {
    id: "stem-cells",
    label: "Stem Cells",
    icon: "🌱",
    color: "biotech",
    accentClass: "accent-biotech",
    glowClass: "glow-biotech",
    shadowClass: "shadow-glow-biotech",
    sectionClass: "topic-section-biotech",
    badgeStyle: {
      background: "oklch(0.74 0.19 165 / 0.2)",
      color: "oklch(0.74 0.19 165)",
      border: "1px solid oklch(0.74 0.19 165 / 0.4)",
    },
  },
  {
    id: "bioinformatics",
    label: "Bioinformatics",
    icon: "💻",
    color: "biotech",
    accentClass: "accent-biotech",
    glowClass: "glow-biotech",
    shadowClass: "shadow-glow-biotech",
    sectionClass: "topic-section-biotech",
    badgeStyle: {
      background: "oklch(0.70 0.16 220 / 0.2)",
      color: "oklch(0.70 0.16 220)",
      border: "1px solid oklch(0.70 0.16 220 / 0.4)",
    },
  },
];

export const NAV_ITEMS: NavItem[] = [
  {
    id: "biomolecules",
    label: "Biomolecules",
    emoji: "🧬",
    children: [
      {
        id: "bm-carbs",
        label: "Carbohydrates",
        anchor: "#biomolecules-carbohydrates",
      },
      { id: "bm-lipids", label: "Lipids", anchor: "#biomolecules-lipids" },
      {
        id: "bm-nucleic",
        label: "Nucleic Acids",
        anchor: "#biomolecules-nucleotides",
      },
      {
        id: "bm-amino",
        label: "Amino Acids & Proteins",
        anchor: "#biomolecules-proteins-overview",
      },
    ],
  },
  {
    id: "cells",
    label: "Cells",
    emoji: "🔬",
    children: [
      {
        id: "cell-prokaryotic",
        label: "Prokaryotic Cells",
        anchor: "#cells-prokaryotic",
      },
      {
        id: "cell-organelles",
        label: "Eukaryotic Organelles",
        anchor: "#cells-organelles",
      },
      {
        id: "cell-transport",
        label: "Cell Transport",
        anchor: "#cells-transport",
      },
      {
        id: "cell-division",
        label: "Cell Division",
        anchor: "#cells-division",
      },
    ],
  },
  {
    id: "dna",
    label: "DNA",
    emoji: "🧪",
    children: [
      { id: "dna-structure", label: "DNA Structure", anchor: "#dna-structure" },
      { id: "dna-types", label: "DNA Types (A/B/Z)", anchor: "#dna-types" },
      {
        id: "dna-replication",
        label: "Replication",
        anchor: "#dna-replication",
      },
      {
        id: "dna-mutations",
        label: "Mutations & Repair",
        anchor: "#dna-mutations",
      },
      {
        id: "dna-epigenetics",
        label: "Epigenetics",
        anchor: "#dna-epigenetics",
      },
    ],
  },
  {
    id: "rna",
    label: "RNA",
    emoji: "🔗",
    children: [
      { id: "rna-mrna", label: "mRNA & Transcription", anchor: "#rna-mrna" },
      { id: "rna-trna", label: "tRNA & rRNA", anchor: "#rna-trna" },
      {
        id: "rna-regulatory",
        label: "Regulatory RNAs",
        anchor: "#rna-regulatory",
      },
    ],
  },
  {
    id: "proteins",
    label: "Proteins",
    emoji: "⚗️",
    children: [
      {
        id: "prot-amino",
        label: "Amino Acids",
        anchor: "#proteins-amino-acids",
      },
      {
        id: "prot-structure",
        label: "Protein Structure",
        anchor: "#proteins-structure",
      },
      {
        id: "prot-functions",
        label: "Protein Functions",
        anchor: "#proteins-functions",
      },
      { id: "prot-enzymes", label: "Enzymes", anchor: "#proteins-enzymes" },
    ],
  },
];

export const BIOTECH_NAV_ITEMS: NavItem[] = [
  {
    id: "crispr",
    label: "CRISPR",
    emoji: "✂️",
    children: [
      { id: "cr-cas9", label: "Cas9 Mechanism", anchor: "#crispr-cas9" },
      {
        id: "cr-editing",
        label: "Base & Prime Editing",
        anchor: "#crispr-base-prime-editing",
      },
      {
        id: "cr-applications",
        label: "Applications",
        anchor: "#crispr-applications",
      },
      { id: "cr-ethics", label: "Ethics", anchor: "#crispr-ethics" },
    ],
  },
  {
    id: "pcr",
    label: "PCR",
    emoji: "🔁",
    children: [
      { id: "pcr-standard", label: "Standard PCR", anchor: "#pcr-standard" },
      { id: "pcr-rt", label: "RT-PCR", anchor: "#pcr-rt" },
      { id: "pcr-qpcr", label: "qPCR & ddPCR", anchor: "#pcr-qpcr" },
      { id: "pcr-apps", label: "Applications", anchor: "#pcr-applications" },
    ],
  },
  {
    id: "cloning",
    label: "Cloning & Recombinant DNA",
    emoji: "🧫",
    children: [
      {
        id: "cln-restriction",
        label: "Restriction Enzymes",
        anchor: "#cloning-restriction-enzymes",
      },
      { id: "cln-vectors", label: "Vectors", anchor: "#cloning-vectors" },
      {
        id: "cln-transform",
        label: "Transformation",
        anchor: "#cloning-transformation",
      },
      {
        id: "cln-expression",
        label: "Expression Systems",
        anchor: "#cloning-expression",
      },
    ],
  },
  {
    id: "gel-electrophoresis",
    label: "Gel Electrophoresis",
    emoji: "📊",
    children: [
      { id: "gel-agarose", label: "Agarose Gel", anchor: "#gel-agarose" },
      { id: "gel-sds", label: "SDS-PAGE", anchor: "#gel-sds-page" },
      { id: "gel-western", label: "Western Blot", anchor: "#gel-western-blot" },
      {
        id: "gel-southern",
        label: "Southern/Northern",
        anchor: "#gel-southern-northern",
      },
    ],
  },
  {
    id: "biotech-applications",
    label: "Biotech Applications",
    emoji: "💉",
    children: [
      { id: "bta-medical", label: "Medical", anchor: "#biotech-medical" },
      {
        id: "bta-agricultural",
        label: "Agricultural",
        anchor: "#biotech-agricultural",
      },
      {
        id: "bta-industrial",
        label: "Industrial",
        anchor: "#biotech-industrial",
      },
      {
        id: "bta-environmental",
        label: "Environmental",
        anchor: "#biotech-environmental",
      },
    ],
  },
  {
    id: "fermentation",
    label: "Fermentation & Bioreactors",
    emoji: "🫧",
    children: [
      {
        id: "ferm-types",
        label: "Fermentation Types",
        anchor: "#fermentation-types",
      },
      {
        id: "ferm-bioreactor",
        label: "Bioreactor Design",
        anchor: "#fermentation-bioreactor",
      },
      {
        id: "ferm-scaleup",
        label: "Scale-Up",
        anchor: "#fermentation-scale-up",
      },
      {
        id: "ferm-industrial",
        label: "Industrial Uses",
        anchor: "#fermentation-industrial",
      },
    ],
  },
  {
    id: "stem-cells",
    label: "Stem Cells",
    emoji: "🌱",
    children: [
      {
        id: "sc-potency",
        label: "Potency Types",
        anchor: "#stem-cells-potency",
      },
      {
        id: "sc-esc-ipsc",
        label: "ESC vs iPSC",
        anchor: "#stem-cells-esc-ipsc",
      },
      {
        id: "sc-adult",
        label: "Adult Stem Cells",
        anchor: "#stem-cells-adult",
      },
      {
        id: "sc-therapy",
        label: "Therapy & Organoids",
        anchor: "#stem-cells-therapy",
      },
    ],
  },
  {
    id: "bioinformatics",
    label: "Bioinformatics",
    emoji: "💻",
    children: [
      {
        id: "bi-overview",
        label: "Overview",
        anchor: "#bioinformatics-overview",
      },
      {
        id: "bi-databases",
        label: "Databases",
        anchor: "#bioinformatics-databases",
      },
      {
        id: "bi-blast",
        label: "BLAST",
        anchor: "#bioinformatics-blast",
      },
      {
        id: "bi-alignment",
        label: "Sequence Alignment",
        anchor: "#bioinformatics-alignment",
      },
      {
        id: "bi-phylogenetics",
        label: "Phylogenetics",
        anchor: "#bioinformatics-phylogenetics",
      },
      {
        id: "bi-genomics",
        label: "Genomics",
        anchor: "#bioinformatics-genomics",
      },
      {
        id: "bi-biopython-basics",
        label: "Biopython Basics",
        anchor: "#bioinformatics-biopython-basics",
      },
      {
        id: "bi-guided-projects",
        label: "Guided Projects",
        anchor: "#bioinformatics-guided-projects",
      },
    ],
  },
];

export const NAV_GROUPS: NavGroup[] = [
  { groupLabel: "Core Biology", items: NAV_ITEMS },
  { groupLabel: "Biotechnology", items: BIOTECH_NAV_ITEMS },
];

export const BIOTECH_TOPIC_IDS: TopicId[] = [
  "crispr",
  "pcr",
  "cloning",
  "gel-electrophoresis",
  "biotech-applications",
  "fermentation",
  "stem-cells",
  "bioinformatics",
];
