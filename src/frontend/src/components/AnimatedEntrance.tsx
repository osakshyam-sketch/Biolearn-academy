import { type ReactNode, useEffect, useRef } from "react";

interface AnimatedEntranceProps {
  children: ReactNode;
  delay?: number;
  direction?: "up" | "down" | "left" | "right" | "fade";
  className?: string;
}

// CSS-only entrance animation using IntersectionObserver.
// Replaces framer-motion whileInView to avoid scroll re-render cascades.
export function AnimatedEntrance({
  children,
  delay = 0,
  direction = "up",
  className,
}: AnimatedEntranceProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            el.classList.add("ae-visible");
            observer.unobserve(el);
          }
        }
      },
      { rootMargin: "-80px" },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={`ae-base ae-${direction}${className ? ` ${className}` : ""}`}
      style={delay ? { transitionDelay: `${delay}s` } : undefined}
    >
      {children}
    </div>
  );
}

interface StaggerContainerProps {
  children: ReactNode;
  className?: string;
  staggerDelay?: number;
}

export function StaggerContainer({
  children,
  className,
}: StaggerContainerProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            el.classList.add("sc-visible");
            observer.unobserve(el);
          }
        }
      },
      { rootMargin: "-60px" },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={ref} className={`sc-base${className ? ` ${className}` : ""}`}>
      {children}
    </div>
  );
}

export function StaggerItem({
  children,
  className,
}: { children: ReactNode; className?: string }) {
  return (
    <div className={`si-base${className ? ` ${className}` : ""}`}>
      {children}
    </div>
  );
}
