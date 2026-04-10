import { r as reactExports, j as jsxRuntimeExports } from "./index-V1Xys_hZ.js";
class SceneErrorBoundary extends reactExports.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }
  static getDerivedStateFromError() {
    return { hasError: true };
  }
  componentDidCatch(error) {
    console.warn("[SceneErrorBoundary] Scene failed to render:", error.message);
  }
  render() {
    if (this.state.hasError) {
      if (this.props.fallback) return this.props.fallback;
      const color = this.props.sceneColor ?? "#60a5fa";
      const name = this.props.sceneName ?? "3D Scene";
      return /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "div",
        {
          style: {
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
            padding: "32px 24px"
          },
          role: "img",
          "aria-label": `${name} visualization (fallback view)`,
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: { fontSize: "40px" }, children: "🔬" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { style: { color, fontWeight: 700, fontSize: "14px" }, children: name }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "p",
              {
                style: {
                  color: "oklch(0.62 0.06 262)",
                  fontSize: "12px",
                  textAlign: "center",
                  maxWidth: "280px"
                },
                children: "Interactive 3D scene could not load. See explanations and diagrams below."
              }
            )
          ]
        }
      );
    }
    return this.props.children;
  }
}
export {
  SceneErrorBoundary as S
};
