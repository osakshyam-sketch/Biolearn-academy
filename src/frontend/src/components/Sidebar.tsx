import { useSoundContext } from "@/context/SoundContext";
import { bgTintMap, borderTintMap, colorMap } from "@/theme/colors";
import type { TopicId } from "@/types/biology";
import { NAV_GROUPS } from "@/types/biology";
import { ChevronDown, FlaskConical, Menu, X } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";

interface SidebarProps {
  activeSection: TopicId | null;
  onNavigate: (id: TopicId) => void;
  quizScores: Partial<Record<TopicId, number>>;
  totalQuestions: Partial<Record<TopicId, number>>;
}

// Per-topic accent colors, tints and borders are imported from theme/colors

interface NavItemRowProps {
  id: TopicId;
  label: string;
  emoji: string;
  isActive: boolean;
  score: number | undefined;
  total: number | undefined;
  onNavigate: (id: TopicId) => void;
  onClose: () => void;
  subtopics?: { id: string; label: string; anchor: string }[];
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
  subtopics,
}: NavItemRowProps) {
  const { playClick } = useSoundContext();
  const color = colorMap[id] ?? "oklch(0.46 0.13 155)";
  const bgTintVal = bgTintMap[id] ?? "oklch(0.6 0.1 155 / 0.1)";
  const borderTintVal = borderTintMap[id] ?? "oklch(0.6 0.1 155 / 0.28)";
  const pct =
    score !== undefined && total ? Math.round((score / total) * 100) : null;
  const [expanded, setExpanded] = useState(false);
  const hasChildren = subtopics && subtopics.length > 0;

  function handleNavigate() {
    playClick();
    onNavigate(id);
    onClose();
  }

  function handleKeyDown(e: React.KeyboardEvent) {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      handleNavigate();
    }
  }

  function handleToggleExpand(e: React.MouseEvent) {
    e.stopPropagation();
    setExpanded((v) => !v);
  }

  function handleSubtopicClick(anchor: string) {
    playClick();
    onNavigate(id);
    onClose();
    // Scroll to anchor after navigation renders
    setTimeout(() => {
      const el = document.querySelector(anchor);
      if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 150);
  }

  return (
    <div>
      <div
        className="group relative w-full flex items-center gap-0 rounded-xl transition-smooth"
        style={{
          background: isActive ? bgTintVal : "transparent",
          border: isActive
            ? `1px solid ${borderTintVal}`
            : "1px solid transparent",
        }}
      >
        <motion.button
          onClick={handleNavigate}
          onKeyDown={handleKeyDown}
          whileHover={{ x: 2 }}
          whileTap={{ scale: 0.97 }}
          tabIndex={0}
          aria-current={isActive ? "page" : undefined}
          aria-label={`Navigate to ${label}${pct !== null ? `, quiz score ${pct}%` : ""}`}
          data-ocid={`sidebar-nav-${id}`}
          className="flex-1 flex items-center gap-3 px-3 py-2.5 text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-1"
          style={{
            // @ts-expect-error CSS custom property
            "--tw-ring-color": color,
            "--tw-ring-offset-color": "oklch(0.97 0.012 75)",
          }}
        >
          <span className="text-xl leading-none" aria-hidden="true">
            {emoji}
          </span>
          <div className="flex-1 min-w-0">
            <div
              className="text-sm font-medium truncate"
              style={{
                color: isActive ? color : "oklch(0.35 0.025 75)",
              }}
            >
              {label}
            </div>
            {pct !== null && (
              <div
                className="mt-1 h-1 rounded-full overflow-hidden"
                style={{ background: "oklch(0.88 0.022 75)" }}
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
              className="h-2 w-2 rounded-full shrink-0"
              style={{ background: color }}
              aria-hidden="true"
            />
          )}
        </motion.button>

        {hasChildren && (
          <button
            type="button"
            onClick={handleToggleExpand}
            aria-expanded={expanded}
            aria-label={`${expanded ? "Collapse" : "Expand"} ${label} subtopics`}
            className="px-2 py-2.5 flex items-center justify-center focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-1 rounded-lg mr-1"
            style={{
              color: isActive ? color : "oklch(0.55 0.025 75)",
              // @ts-expect-error CSS custom property
              "--tw-ring-color": color,
              "--tw-ring-offset-color": "oklch(0.97 0.012 75)",
            }}
          >
            <motion.span
              animate={{ rotate: expanded ? 180 : 0 }}
              transition={{ duration: 0.2 }}
              className="flex items-center"
              aria-hidden="true"
            >
              <ChevronDown className="h-3.5 w-3.5" />
            </motion.span>
          </button>
        )}
      </div>

      {/* Subtopics */}
      <AnimatePresence>
        {hasChildren && expanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.22, ease: "easeInOut" }}
            className="overflow-hidden"
          >
            <div
              className="ml-9 mr-1 mb-1 flex flex-col gap-0.5 pl-2 border-l"
              style={{ borderColor: `${color}30` }}
            >
              {subtopics!.map((sub) => (
                <button
                  key={sub.id}
                  type="button"
                  onClick={() => handleSubtopicClick(sub.anchor)}
                  data-ocid={`sidebar-subtopic-${sub.id}`}
                  className="text-left px-2 py-1.5 rounded-lg text-xs transition-smooth hover:bg-muted/50 focus-visible:outline-none focus-visible:ring-1"
                  style={{
                    color: "oklch(0.42 0.03 75)",
                    // @ts-expect-error CSS custom property
                    "--tw-ring-color": color,
                  }}
                >
                  <span className="hover:text-foreground transition-colors">
                    {sub.label}
                  </span>
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
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
              "linear-gradient(135deg, oklch(0.6 0.12 145 / 0.18), oklch(0.58 0.11 240 / 0.18))",
            border: "1px solid oklch(0.88 0.022 75)",
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
                    style={{ color: "oklch(0.46 0.13 155)" }}
                  />
                )}
                <p
                  className="text-xs font-semibold tracking-wider uppercase"
                  style={{
                    color: isBiotech
                      ? "oklch(0.46 0.13 155)"
                      : "oklch(0.52 0.025 75)",
                  }}
                >
                  {group.groupLabel}
                </p>
                {isBiotech && (
                  <div
                    className="flex-1 h-px"
                    style={{
                      background:
                        "linear-gradient(to right, oklch(0.6 0.12 155 / 0.3), transparent)",
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
                    subtopics={item.children}
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
        className="hidden lg:flex fixed left-0 top-0 h-full w-64 flex-col border-r border-border z-30 bg-card"
        data-ocid="sidebar-desktop"
        aria-label="Site navigation"
      >
        <SidebarContent {...sharedProps} />
      </aside>

      {/* Mobile Toggle */}
      <button
        type="button"
        onClick={() => setMobileOpen(true)}
        className="lg:hidden fixed top-4 left-4 z-40 flex h-10 w-10 items-center justify-center rounded-xl border border-border bg-card shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
        data-ocid="sidebar-mobile-toggle"
        aria-label="Open navigation menu"
        aria-expanded={mobileOpen}
        aria-controls="mobile-sidebar"
      >
        <Menu className="h-5 w-5 text-foreground" aria-hidden="true" />
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
              className="fixed inset-0 z-40 bg-foreground/30 backdrop-blur-sm lg:hidden"
              aria-hidden="true"
            />
            <motion.aside
              id="mobile-sidebar"
              initial={{ x: -280 }}
              animate={{ x: 0 }}
              exit={{ x: -280 }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              className="fixed left-0 top-0 h-full w-64 border-r border-border z-50 lg:hidden bg-card"
              data-ocid="sidebar-mobile"
              aria-label="Mobile navigation"
            >
              <button
                type="button"
                onClick={() => setMobileOpen(false)}
                className="absolute right-3 top-3 flex h-8 w-8 items-center justify-center rounded-lg border border-border bg-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                aria-label="Close navigation menu"
              >
                <X className="h-4 w-4 text-foreground" aria-hidden="true" />
              </button>
              <SidebarContent {...sharedProps} />
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
