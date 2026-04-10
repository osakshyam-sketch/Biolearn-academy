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

export interface NavItem {
  id: TopicId;
  label: string;
  emoji: string;
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
  { id: "biomolecules", label: "Biomolecules", emoji: "🧬" },
  { id: "cells", label: "Cells", emoji: "🔬" },
  { id: "dna", label: "DNA", emoji: "🧪" },
  { id: "rna", label: "RNA", emoji: "🔗" },
  { id: "proteins", label: "Proteins", emoji: "⚗️" },
];

export const BIOTECH_NAV_ITEMS: NavItem[] = [
  { id: "crispr", label: "CRISPR", emoji: "✂️" },
  { id: "pcr", label: "PCR", emoji: "🔁" },
  { id: "cloning", label: "Cloning & Recombinant DNA", emoji: "🧫" },
  { id: "gel-electrophoresis", label: "Gel Electrophoresis", emoji: "📊" },
  { id: "biotech-applications", label: "Biotech Applications", emoji: "💉" },
  { id: "fermentation", label: "Fermentation & Bioreactors", emoji: "🫧" },
  { id: "stem-cells", label: "Stem Cells", emoji: "🌱" },
  { id: "bioinformatics", label: "Bioinformatics", emoji: "💻" },
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
