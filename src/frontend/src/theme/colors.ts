// Shared topic color maps — single source of truth used by Layout, Sidebar, App

export const colorMap: Record<string, string> = {
  biomolecules: "oklch(0.48 0.14 145)",
  cells: "oklch(0.45 0.14 240)",
  dna: "oklch(0.45 0.13 280)",
  rna: "oklch(0.45 0.13 280)",
  proteins: "oklch(0.5 0.16 35)",
  crispr: "oklch(0.46 0.13 172)",
  pcr: "oklch(0.46 0.13 195)",
  cloning: "oklch(0.46 0.13 160)",
  "gel-electrophoresis": "oklch(0.46 0.12 210)",
  "biotech-applications": "oklch(0.46 0.13 155)",
  fermentation: "oklch(0.46 0.13 145)",
  "stem-cells": "oklch(0.47 0.14 165)",
  bioinformatics: "oklch(0.46 0.12 220)",
};

export const bgTintMap: Record<string, string> = {
  biomolecules: "oklch(0.6 0.12 145 / 0.1)",
  cells: "oklch(0.58 0.11 240 / 0.1)",
  dna: "oklch(0.58 0.1 280 / 0.1)",
  rna: "oklch(0.58 0.1 280 / 0.1)",
  proteins: "oklch(0.62 0.14 35 / 0.1)",
  crispr: "oklch(0.6 0.12 172 / 0.1)",
  pcr: "oklch(0.6 0.12 195 / 0.1)",
  cloning: "oklch(0.58 0.12 160 / 0.1)",
  "gel-electrophoresis": "oklch(0.58 0.11 210 / 0.1)",
  "biotech-applications": "oklch(0.58 0.12 155 / 0.1)",
  fermentation: "oklch(0.58 0.12 145 / 0.1)",
  "stem-cells": "oklch(0.6 0.13 165 / 0.1)",
  bioinformatics: "oklch(0.58 0.11 220 / 0.1)",
};

export const borderTintMap: Record<string, string> = {
  biomolecules: "oklch(0.6 0.12 145 / 0.28)",
  cells: "oklch(0.58 0.11 240 / 0.28)",
  dna: "oklch(0.58 0.1 280 / 0.28)",
  rna: "oklch(0.58 0.1 280 / 0.28)",
  proteins: "oklch(0.62 0.14 35 / 0.28)",
  crispr: "oklch(0.6 0.12 172 / 0.28)",
  pcr: "oklch(0.6 0.12 195 / 0.28)",
  cloning: "oklch(0.58 0.12 160 / 0.28)",
  "gel-electrophoresis": "oklch(0.58 0.11 210 / 0.28)",
  "biotech-applications": "oklch(0.58 0.12 155 / 0.28)",
  fermentation: "oklch(0.58 0.12 145 / 0.28)",
  "stem-cells": "oklch(0.6 0.13 165 / 0.28)",
  bioinformatics: "oklch(0.58 0.11 220 / 0.28)",
};
