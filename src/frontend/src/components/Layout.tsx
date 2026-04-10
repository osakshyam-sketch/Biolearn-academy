import type { TopicId } from "@/types/biology";
import { BIOTECH_NAV_ITEMS, NAV_ITEMS } from "@/types/biology";
import {
  type ReactNode,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import { Sidebar } from "./Sidebar";

interface LayoutProps {
  children: (props: {
    registerSection: (id: TopicId, el: HTMLElement | null) => void;
    navigateTo: (id: TopicId) => void;
  }) => ReactNode;
}

const colorMap: Record<string, string> = {
  // Core Biology
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

const ALL_NAV_ITEMS = [...NAV_ITEMS, ...BIOTECH_NAV_ITEMS];

export function Layout({ children }: LayoutProps) {
  const sectionRefs = useRef<Partial<Record<TopicId, HTMLElement>>>({});
  const [activeSection, setActiveSection] = useState<TopicId | null>(null);
  const [quizScores] = useState<Partial<Record<TopicId, number>>>({});
  const [totalQuestions] = useState<Partial<Record<TopicId, number>>>({});

  // Always start at the top on first load — never land on the last scrolled section
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" });
    setActiveSection(null);
  }, []);

  const registerSection = useCallback((id: TopicId, el: HTMLElement | null) => {
    if (el) sectionRefs.current[id] = el;
  }, []);

  const navigateTo = useCallback((id: TopicId) => {
    setActiveSection(id);
    const el = sectionRefs.current[id];
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }, []);

  const activeColor = activeSection
    ? (colorMap[activeSection] ?? "oklch(0.75 0.15 254)")
    : "oklch(0.75 0.15 254)";

  const activeLabel = activeSection
    ? ALL_NAV_ITEMS.find((n) => n.id === activeSection)?.label
    : null;

  return (
    <div className="min-h-screen bg-background">
      {/* Skip to main content — first focusable element for keyboard users */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-2 focus:left-2 focus:z-50 focus:rounded-lg focus:bg-card focus:px-4 focus:py-2 focus:text-sm focus:font-semibold focus:text-foreground focus:shadow-lg focus:outline focus:outline-2 focus:outline-offset-2"
        style={{ outlineColor: "oklch(0.85 0.20 142)" }}
      >
        Skip to main content
      </a>

      <Sidebar
        activeSection={activeSection}
        onNavigate={navigateTo}
        quizScores={quizScores}
        totalQuestions={totalQuestions}
      />

      {/* Header */}
      <header
        className="fixed top-0 right-0 z-20 flex items-center justify-between px-6 py-3 border-b border-border lg:left-64"
        style={{ background: "oklch(0.17 0.02 240)", left: 0 }}
        data-ocid="header"
      >
        <div className="lg:hidden w-8" />
        <div className="flex items-center gap-3">
          <h1 className="font-display text-lg font-bold text-foreground">
            BioLearn Academy
          </h1>
          <nav
            aria-label="Quick topic navigation"
            className="hidden sm:flex items-center gap-1.5"
          >
            {NAV_ITEMS.map((item) => (
              <button
                type="button"
                key={item.id}
                onClick={() => navigateTo(item.id)}
                className="h-2.5 w-2.5 rounded-full transition-smooth hover:scale-125 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2"
                style={{
                  background: colorMap[item.id],
                  opacity: activeSection === item.id ? 1 : 0.4,
                  outlineColor: colorMap[item.id],
                }}
                aria-label={`Navigate to ${item.label}`}
                aria-current={activeSection === item.id ? "true" : undefined}
                title={item.label}
                data-ocid={`header-dot-${item.id}`}
              />
            ))}
            <span
              className="mx-0.5 h-3 w-px opacity-30"
              style={{ background: "oklch(0.72 0.18 172)" }}
              aria-hidden="true"
            />
            {BIOTECH_NAV_ITEMS.map((item) => (
              <button
                type="button"
                key={item.id}
                onClick={() => navigateTo(item.id)}
                className="h-2 w-2 rounded-full transition-smooth hover:scale-125 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2"
                style={{
                  background: colorMap[item.id],
                  opacity: activeSection === item.id ? 1 : 0.35,
                  outlineColor: colorMap[item.id],
                }}
                aria-label={`Navigate to ${item.label}`}
                aria-current={activeSection === item.id ? "true" : undefined}
                title={item.label}
                data-ocid={`header-dot-${item.id}`}
              />
            ))}
          </nav>
        </div>
        <div
          className="flex items-center gap-2"
          aria-live="polite"
          aria-atomic="true"
        >
          <div
            className="h-2 w-2 rounded-full animate-pulse-glow"
            style={{ background: activeColor }}
            aria-hidden="true"
          />
          <span className="text-xs font-medium text-muted-foreground truncate max-w-[160px]">
            {activeLabel ?? "Select a topic"}
          </span>
        </div>
      </header>

      {/* Main Content */}
      <main
        id="main-content"
        aria-label="Biology and Biotechnology learning content"
        className="lg:pl-64 pt-[53px]"
        data-ocid="main-content"
        tabIndex={-1}
      >
        {children({ registerSection, navigateTo })}
      </main>

      {/* Footer */}
      <footer
        className="lg:pl-64 border-t border-border py-4 px-6 text-center text-xs text-muted-foreground"
        style={{ background: "oklch(0.15 0.05 262)" }}
      >
        © {new Date().getFullYear()}. Built with love using{" "}
        <a
          href={`https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(typeof window !== "undefined" ? window.location.hostname : "")}`}
          target="_blank"
          rel="noopener noreferrer"
          className="underline hover:text-foreground transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:rounded focus-visible:outline-offset-1"
          style={{ outlineColor: "oklch(0.75 0.15 254)" }}
        >
          caffeine.ai
        </a>
      </footer>
    </div>
  );
}
