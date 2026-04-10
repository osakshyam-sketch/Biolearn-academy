import type { TopicId } from "@/types/biology";
import { NAV_GROUPS } from "@/types/biology";
import { FlaskConical, Menu, X } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";

interface SidebarProps {
  activeSection: TopicId | null;
  onNavigate: (id: TopicId) => void;
  quizScores: Partial<Record<TopicId, number>>;
  totalQuestions: Partial<Record<TopicId, number>>;
}

// Per-topic accent colors (OKLCH)
const colorMap: Record<string, string> = {
  biomolecules: "oklch(0.72 0.18 142)",
  cells: "oklch(0.68 0.19 262)",
  dna: "oklch(0.70 0.20 290)",
  rna: "oklch(0.70 0.20 290)",
  proteins: "oklch(0.68 0.22 36)",
  // Biotechnology — teal/cyan/green family
  crispr: "oklch(0.72 0.18 172)",
  pcr: "oklch(0.72 0.18 195)",
  cloning: "oklch(0.70 0.17 160)",
  "gel-electrophoresis": "oklch(0.68 0.16 210)",
  "biotech-applications": "oklch(0.73 0.18 155)",
  fermentation: "oklch(0.71 0.17 145)",
  "stem-cells": "oklch(0.74 0.19 165)",
  bioinformatics: "oklch(0.70 0.16 220)",
};

interface NavItemRowProps {
  id: TopicId;
  label: string;
  emoji: string;
  isActive: boolean;
  score: number | undefined;
  total: number | undefined;
  onNavigate: (id: TopicId) => void;
  onClose: () => void;
}

function NavItemRow({
  id,
  label,
  emoji,
  isActive,
  score,
  total,
  onNavigate,
  onClose,
}: NavItemRowProps) {
  const color = colorMap[id] ?? "oklch(0.70 0.18 200)";
  const pct =
    score !== undefined && total ? Math.round((score / total) * 100) : null;

  return (
    <motion.button
      key={id}
      onClick={() => {
        onNavigate(id);
        onClose();
      }}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          onNavigate(id);
          onClose();
        }
      }}
      whileHover={{ x: 4 }}
      whileTap={{ scale: 0.97 }}
      tabIndex={0}
      aria-current={isActive ? "page" : undefined}
      aria-label={`Navigate to ${label}${pct !== null ? `, quiz score ${pct}%` : ""}`}
      data-ocid={`sidebar-nav-${id}`}
      className="group relative w-full flex items-center gap-3 rounded-xl px-3 py-2.5 text-left transition-smooth focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-1"
      style={{
        background: isActive
          ? `${color.replace(")", " / 0.15)")}`
          : "transparent",
        border: isActive
          ? `1px solid ${color.replace(")", " / 0.35)")}`
          : "1px solid transparent",
      }}
    >
      <span className="text-xl leading-none" aria-hidden="true">
        {emoji}
      </span>
      <div className="flex-1 min-w-0">
        <div
          className="text-sm font-medium truncate"
          style={{ color: isActive ? color : "oklch(0.85 0 0)" }}
        >
          {label}
        </div>
        {pct !== null && (
          <div
            className="mt-1 h-1 rounded-full bg-muted overflow-hidden"
            aria-hidden="true"
          >
            <motion.div
              className="h-1 rounded-full"
              style={{ background: color }}
              initial={{ width: 0 }}
              animate={{ width: `${pct}%` }}
              transition={{ duration: 0.6, ease: "easeOut" }}
            />
          </div>
        )}
      </div>
      {pct !== null && (
        <span
          className="text-xs font-semibold tabular-nums"
          style={{ color }}
          aria-hidden="true"
        >
          {pct}%
        </span>
      )}
      {isActive && (
        <motion.div
          layoutId="active-indicator"
          className="absolute right-2 h-2 w-2 rounded-full"
          style={{ background: color }}
          aria-hidden="true"
        />
      )}
    </motion.button>
  );
}

function SidebarContent({
  activeSection,
  onNavigate,
  quizScores,
  totalQuestions,
  onClose,
}: SidebarProps & { onClose: () => void }) {
  return (
    <div className="flex h-full flex-col">
      {/* Logo */}
      <div className="flex items-center gap-3 px-4 py-5 border-b border-border">
        <div
          className="flex h-9 w-9 items-center justify-center rounded-xl text-xl"
          aria-hidden="true"
          style={{
            background:
              "linear-gradient(135deg, oklch(0.72 0.18 142 / 0.3), oklch(0.68 0.19 262 / 0.3))",
          }}
        >
          🔭
        </div>
        <div>
          <div className="font-display text-base font-bold text-foreground leading-tight">
            BioLearn
          </div>
          <div className="text-xs text-muted-foreground">Academy</div>
        </div>
      </div>

      {/* Nav Groups */}
      <nav
        className="flex-1 overflow-y-auto px-3 py-4 space-y-5"
        aria-label="Topic navigation"
      >
        {NAV_GROUPS.map((group) => {
          const isBiotech = group.groupLabel === "Biotechnology";
          return (
            <div key={group.groupLabel}>
              {/* Group Header */}
              <div className="flex items-center gap-2 mb-2 px-2">
                {isBiotech && (
                  <FlaskConical
                    className="h-3.5 w-3.5 shrink-0"
                    aria-hidden="true"
                    style={{ color: "oklch(0.72 0.18 172)" }}
                  />
                )}
                <p
                  className="text-xs font-semibold tracking-wider uppercase"
                  style={{
                    color: isBiotech
                      ? "oklch(0.72 0.18 172)"
                      : "oklch(0.60 0 0)",
                  }}
                >
                  {group.groupLabel}
                </p>
                {isBiotech && (
                  <div
                    className="flex-1 h-px"
                    style={{
                      background:
                        "linear-gradient(to right, oklch(0.72 0.18 172 / 0.4), transparent)",
                    }}
                    aria-hidden="true"
                  />
                )}
              </div>

              {/* Items */}
              <div className="space-y-0.5">
                {group.items.map((item) => (
                  <NavItemRow
                    key={item.id}
                    id={item.id}
                    label={item.label}
                    emoji={item.emoji}
                    isActive={activeSection === item.id}
                    score={quizScores[item.id]}
                    total={totalQuestions[item.id]}
                    onNavigate={onNavigate}
                    onClose={onClose}
                  />
                ))}
              </div>
            </div>
          );
        })}
      </nav>

      {/* Footer */}
      <div className="border-t border-border px-4 py-3">
        <p className="text-xs text-muted-foreground text-center">
          © {new Date().getFullYear()} ·{" "}
          <a
            href={`https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(
              typeof window !== "undefined" ? window.location.hostname : "",
            )}`}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-foreground transition-smooth focus-visible:outline-none focus-visible:underline"
          >
            caffeine.ai
          </a>
        </p>
      </div>
    </div>
  );
}

export function Sidebar({
  activeSection,
  onNavigate,
  quizScores,
  totalQuestions,
}: SidebarProps) {
  const [mobileOpen, setMobileOpen] = useState(false);

  const sharedProps = {
    activeSection,
    onNavigate,
    quizScores,
    totalQuestions,
    onClose: () => setMobileOpen(false),
  };

  return (
    <>
      {/* Desktop Sidebar */}
      <aside
        className="hidden lg:flex fixed left-0 top-0 h-full w-64 flex-col border-r border-border z-30"
        style={{ background: "oklch(0.14 0.02 240)" }}
        data-ocid="sidebar-desktop"
        aria-label="Site navigation"
      >
        <SidebarContent {...sharedProps} />
      </aside>

      {/* Mobile Toggle */}
      <button
        type="button"
        onClick={() => setMobileOpen(true)}
        className="lg:hidden fixed top-4 left-4 z-40 flex h-10 w-10 items-center justify-center rounded-xl border border-border bg-card focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
        data-ocid="sidebar-mobile-toggle"
        aria-label="Open navigation menu"
        aria-expanded={mobileOpen}
        aria-controls="mobile-sidebar"
      >
        <Menu className="h-5 w-5" aria-hidden="true" />
      </button>

      {/* Mobile Sidebar Overlay */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMobileOpen(false)}
              className="fixed inset-0 z-40 bg-black/60 lg:hidden"
              aria-hidden="true"
            />
            <motion.aside
              id="mobile-sidebar"
              initial={{ x: -280 }}
              animate={{ x: 0 }}
              exit={{ x: -280 }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              className="fixed left-0 top-0 h-full w-64 border-r border-border z-50 lg:hidden"
              style={{ background: "oklch(0.14 0.02 240)" }}
              data-ocid="sidebar-mobile"
              aria-label="Mobile navigation"
            >
              <button
                type="button"
                onClick={() => setMobileOpen(false)}
                className="absolute right-3 top-3 flex h-8 w-8 items-center justify-center rounded-lg border border-border focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                aria-label="Close navigation menu"
              >
                <X className="h-4 w-4" aria-hidden="true" />
              </button>
              <SidebarContent {...sharedProps} />
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
