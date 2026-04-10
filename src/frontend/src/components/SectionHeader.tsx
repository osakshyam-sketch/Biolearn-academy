import type { TopicId } from "@/types/biology";
import { TOPICS } from "@/types/biology";
import { motion } from "motion/react";

interface SectionHeaderProps {
  topicId: TopicId;
  title: string;
  subtitle?: string;
}

export function SectionHeader({
  topicId,
  title,
  subtitle,
}: SectionHeaderProps) {
  const topic = TOPICS.find((t) => t.id === topicId)!;

  return (
    <motion.div
      className="mb-10 flex flex-col items-start gap-3"
      initial={{ opacity: 0, x: -30 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
    >
      <div className="flex items-center gap-3">
        <motion.span
          className="text-4xl"
          animate={{ rotate: [0, 10, -10, 0] }}
          transition={{
            duration: 3,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
          }}
        >
          {topic.icon}
        </motion.span>
        <span
          className="rounded-full px-3 py-1 text-xs font-semibold tracking-widest uppercase"
          style={topic.badgeStyle}
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
                    ? "linear-gradient(135deg, oklch(0.72 0.18 172) 0%, oklch(0.85 0.12 172) 100%)"
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
