# Design Brief

## Overview
Interactive biology learning platform with vibrant maximalist aesthetic. Dark navy base with glowing topic-specific accent colors. Each section (biomolecules, cells, DNA/RNA, proteins) has distinct visual identity through color and shadow effects. Card-based layout, smooth animations throughout.

## Tone & Purpose
Educational + Engaging. Designed for beginners to explore biology with wonder and clarity. Visual richness supports learning retention through color-coding and animation.

## Palette

| Token | Light OKLCH | Dark OKLCH | Usage |
|-------|-------------|-----------|-------|
| background | 0.15 0 0 | 0.15 0 0 | Dark navy base (enforced dark mode) |
| foreground | 0.95 0 0 | 0.95 0 0 | Light text on dark |
| card | 0.18 0 0 | 0.18 0 0 | Slightly elevated cards |
| primary | 0.75 0.15 254 | 0.75 0.15 254 | Purple accent (secondary CTA) |
| accent | 0.75 0.15 254 | 0.75 0.15 254 | Interactive elements |
| biomolecule | 0.72 0.18 142 | 0.72 0.18 142 | Vibrant green glow |
| cell | 0.68 0.19 262 | 0.68 0.19 262 | Bright blue glow |
| dna | 0.70 0.20 290 | 0.70 0.20 290 | Rich purple glow |
| protein | 0.68 0.22 36 | 0.68 0.22 36 | Warm orange glow |
| border | 0.28 0 0 | 0.28 0 0 | Subtle dividers |

## Typography
| Role | Font | Usage |
|------|------|-------|
| display | BricolageGrotesque | Section headers, topic titles (bold, playful) |
| body | DM Sans | Content, explanations (clear, readable) |
| mono | Geist Mono | Code snippets, molecule notation |

## Structural Zones
- **Header/Navigation**: Dark background with purple accent border-bottom, sidebar navigation in dark with topic colors for section indicators
- **Hero Section**: Dark background with topic-specific glowing borders and gradient overlays, bold header text with color-coded glow
- **Content Sections**: Cards with rounded-2xl corners, gradient borders (per topic color), inner glow effect (semi-transparent)
- **Interactive Elements**: 3D molecules on dark, CSS animations for smaller biomolecules, quiz cards with accent color accents
- **Footer**: Dark with muted text, topic color accent line above

## Spacing & Rhythm
- Padding: 1.5rem cards, 2rem sections, 3rem page edges
- Gaps: 1rem between cards, 1.5rem between sections
- Responsive: 1 column mobile, 2 columns tablet, 3 columns desktop

## Component Patterns
- **Topic Sections**: `.topic-section-{biomolecule|cell|dna|protein}` — glowing borders + inner shadow glow
- **Accent Text**: `.accent-{topic}` — colored text matching topic
- **Glow Effects**: `.glow-{topic}` — text-shadow glow for headers
- **Animated 3D**: Three.js for cells/molecules, canvas for smaller structures
- **Quiz Cards**: Accent-colored left border, dark background, smooth hover effects

## Motion & Animation
- **Entrance**: `fade-in 0.6s ease-out` for sections
- **Continuous**: `float 3s ease-in-out infinite` for molecule structures
- **Rotation**: `spin-slow 8s linear infinite` for 3D molecules
- **Pulse**: `pulse-glow 2s ease-in-out infinite` for accent elements
- **Transition**: `transition-smooth` (0.3s cubic-bezier) for all interactive elements

## Constraints
- Enforce dark mode (no light mode toggle)
- All glows use semi-transparency (0.2–0.6 opacity) to avoid harsh neon
- Border-radius: 0px (scientific diagrams) to 24px (hero elements)
- No rainbow gradients; use topic-specific colors only
- High contrast for text accessibility (AA+ standard)

## Signature Detail
**Glowing gradient borders**: Each topic section uses a subtle gradient border with matching box-shadow glow. The inset shadow creates depth without bulkiness. Topic colors define visual navigation — users learn to associate green with biomolecules, blue with cells, etc.
