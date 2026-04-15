# Design Brief

## Direction
Warm, Organic, Educational — A light-filled learning space that feels human-crafted and inviting, not clinical or AI-polished. Cream-base palette with soft subject-specific color accents, subtle texture, and organic touches.

## Tone
Educational warmth meets artisanal craft. Typography is conversational (not academic), shadows are soft (not harsh), spacing breathes naturally (not mechanical).

## Differentiation
Soft subject-specific color accents (pale green for biomolecules, soft blue for cells, muted purple for DNA, warm terracotta for proteins) layered on a warm cream background with subtle texture — creates visual distinction without harshness or glow effects.

## Color Palette

| Token      | OKLCH           | Role                                 |
| ---------- | --------------- | ------------------------------------ |
| background | 0.96 0.015 75   | Warm cream base (light, airy)        |
| foreground | 0.22 0.03 75    | Dark warm brown (high contrast text) |
| card       | 0.98 0.01 75    | Off-white cards (subtle lift)        |
| primary    | 0.5 0.12 35     | Warm terracotta (CTA, accents)       |
| accent     | 0.5 0.1 160     | Muted sage (secondary accents)       |
| muted      | 0.92 0.02 75    | Soft beige (subtle backgrounds)      |
| biomolecule| 0.6 0.12 145    | Pale green (topic accent)            |
| cell       | 0.58 0.11 240   | Soft blue (topic accent)             |
| dna        | 0.58 0.1 280    | Muted purple (topic accent)          |
| protein    | 0.62 0.14 35    | Warm terracotta (topic accent)       |
| border     | 0.88 0.025 75   | Subtle warm dividers                 |

## Typography
- Display: BricolageGrotesque — warm, playful headlines (font-weight: 700)
- Body: DM Sans — conversational, comfortable reading (font-weight: 400-500)
- Mono: Geist Mono — code/notation clarity

Scale: h1 `text-4xl md:text-5xl font-bold`, h2 `text-2xl md:text-3xl font-bold`, body `text-base md:text-lg`, labels `text-sm font-semibold`

## Elevation & Depth
Soft, warm shadows (0.4-1.2 opacity, warm tones) with minimal blur. Inset highlights create gentle depth without visual weight. Card backgrounds lift subtly via soft drop shadows, not glowing borders.

## Structural Zones

| Zone    | Background          | Border                      | Notes                                  |
| ------- | ------------------- | --------------------------- | -------------------------------------- |
| Header  | 0.94 0.01 75        | Warm terracotta accent-top  | Warm navigation, subject-color dots    |
| Content | 0.96 0.015 75       | Topic-specific gradient     | Alternating muted 0.92 for visual flow |
| Cards   | 0.98 0.01 75        | Soft shadow + border glow   | Pale backgrounds, organic rounded      |
| Footer  | 0.94 0.01 75        | Warm terracotta accent-top  | Muted text, aligned with header tone   |

## Spacing & Rhythm
1.5rem padding on cards, 2rem section gaps, 3rem page edges. Rhythm: 8px baseline, breathing room between sections. Mobile 1-col, tablet 2-col, desktop 3-col. Varied rhythm — not mechanical, not uniform.

## Component Patterns
- Topic Sections: `.topic-section-{biomolecule|cell|dna|protein}` — soft shadow + gradient top border
- Accent Text: `.accent-{topic}` — warm, readable color (not bright neon)
- Glow: `.glow-{topic}` — gentle text-shadow (0.3-0.4 opacity, max 12px blur)
- Buttons: Warm terracotta primary, muted secondary, high contrast
- Quiz Cards: Subject-color left border (2px), soft shadow, light bg

## Motion
- Entrance: fade-in 0.5s ease-out (slow, deliberate)
- Continuous: gentle-float 4s ease-in-out (organic, not mechanical)
- Hover: transition-smooth 0.3s (warm responsiveness)
- Pulse: pulse-glow 3s ease-in-out (subtle, not urgent)

All animations respect `prefers-reduced-motion`.

## Constraints
- No harsh glows, neon, or high-saturation colors (max 0.15 chroma on accents)
- Warm shadows only (no cold greys)
- AA+ contrast on all text (lightness diff ≥0.7)
- No dark mode toggle — light mode always
- Organic spacing — avoid perfect uniformity
- Texture via subtle noise overlay (optional future enhancement)

## Signature Detail
Soft subject-specific color accents on cream: each topic uses a desaturated, warm-toned color paired with subtle shadows and organic borders. The palette feels hand-picked and lived-in, not procedurally generated. Users learn color associations (pale green = biomolecules) without visual strain.
