import { Component, type ReactNode } from "react";

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
  sceneName?: string;
  sceneColor?: string;
}

interface State {
  hasError: boolean;
}

/**
 * Error boundary for R3F Canvas scenes.
 * When a 3D scene fails (CORS, WebGL, texture load error), shows a styled
 * fallback instead of a blank area — the text content is always visible.
 */
export class SceneErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(): State {
    return { hasError: true };
  }

  override componentDidCatch(error: Error) {
    // Silently swallow — the fallback handles the UX
    console.warn("[SceneErrorBoundary] Scene failed to render:", error.message);
  }

  override render() {
    if (this.state.hasError) {
      if (this.props.fallback) return this.props.fallback;

      const color = this.props.sceneColor ?? "#60a5fa";
      const name = this.props.sceneName ?? "3D Scene";
      return (
        <div
          style={{
            width: "100%",
            minHeight: "200px",
            borderRadius: "12px",
            background: "oklch(0.14 0.04 262)",
            border: `1px solid ${color}33`,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            gap: "10px",
            padding: "32px 24px",
          }}
          role="img"
          aria-label={`${name} visualization (fallback view)`}
        >
          <div style={{ fontSize: "40px" }}>🔬</div>
          <p style={{ color, fontWeight: 700, fontSize: "14px" }}>{name}</p>
          <p
            style={{
              color: "oklch(0.62 0.06 262)",
              fontSize: "12px",
              textAlign: "center",
              maxWidth: "280px",
            }}
          >
            Interactive 3D scene could not load. See explanations and diagrams
            below.
          </p>
        </div>
      );
    }
    return this.props.children;
  }
}
