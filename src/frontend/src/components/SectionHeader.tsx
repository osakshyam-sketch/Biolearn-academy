import type { TopicId } from "@/types/biology";
import { TOPICS } from "@/types/biology";
import { motion } from "motion/react";

interface SectionHeaderProps {
  topicId: TopicId;
  title: string;
  subtitle?: string;
}

// Badge background and text colors appropriate for the light cream background
const badgeLightStyles: Record<
  string,
  { bg: string; text: string; border: string }
> = {
  biomolecule: {
    bg: "oklch(0.6 0.12 145 / 0.12)",
    text: "oklch(0.42 0.14 145)",
    border: "oklch(0.6 0.12 145 / 0.3)",
  },
  cell: {
    bg: "oklch(0.58 0.11 240 / 0.12)",
    text: "oklch(0.4 0.13 240)",
    border: "oklch(0.58 0.11 240 / 0.3)",
  },
  dna: {
    bg: "oklch(0.58 0.1 280 / 0.12)",
    text: "oklch(0.4 0.12 280)",
    border: "oklch(0.58 0.1 280 / 0.3)",
  },
  protein: {
    bg: "oklch(0.62 0.14 35 / 0.12)",
    text: "oklch(0.44 0.16 35)",
    border: "oklch(0.62 0.14 35 / 0.3)",
  },
  biotech: {
    bg: "oklch(0.6 0.12 155 / 0.12)",
    text: "oklch(0.42 0.13 155)",
    border: "oklch(0.6 0.12 155 / 0.3)",
  },
};

export function SectionHeader({
  topicId,
  title,
  subtitle,
}: SectionHeaderProps) {
  const topic = TOPICS.find((t) => t.id === topicId)!;
  const badge = badgeLightStyles[topic.color] ?? badgeLightStyles.biotech;

  return (
    <motion.div
      className="mb-10 flex flex-col items-start gap-3"
      initial={{ opacity: 0, x: -24 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
    >
      <div className="flex items-center gap-3">
        <motion.span
          className="text-4xl"
          animate={{ rotate: [0, 8, -8, 0] }}
          transition={{
            duration: 3.5,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
          }}
        >
          {topic.icon}
        </motion.span>
        <span
          className="rounded-full px-3 py-1 text-xs font-semibold tracking-widest uppercase"
          style={{
            background: badge.bg,
            color: badge.text,
            border: `1px solid ${badge.border}`,
          }}
        >
          {topic.label}
        </span>
      </div>
      <h2
        className={`font-display text-4xl font-bold leading-tight ${topic.accentClass} ${topic.glowClass}`}
      >
        {title}
      </h2>
      {subtitle && (
        <p className="text-lg text-muted-foreground max-w-2xl leading-relaxed">
          {subtitle}
        </p>
      )}
      <motion.div
        className="h-1 rounded-full"
        style={{
          background:
            topic.color === "biomolecule"
              ? "var(--gradient-biomolecule)"
              : topic.color === "cell"
                ? "var(--gradient-cell)"
                : topic.color === "dna"
                  ? "var(--gradient-dna)"
                  : topic.color === "biotech"
                    ? "linear-gradient(135deg, oklch(0.46 0.13 155) 0%, oklch(0.6 0.11 155) 100%)"
                    : "var(--gradient-protein)",
        }}
        initial={{ width: 0 }}
        whileInView={{ width: "120px" }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, delay: 0.3 }}
      />
    </motion.div>
  );
}
