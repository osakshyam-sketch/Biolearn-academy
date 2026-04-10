export function ReplicationFork() {
  return (
    <div
      className="rounded-2xl border overflow-hidden"
      style={{
        borderColor: "oklch(0.70 0.20 290 / 0.3)",
        background: "oklch(0.14 0.02 290)",
      }}
    >
      <style>{`
        @keyframes fork-open {
          0%   { clip-path: inset(0 50% 0 50%); }
          100% { clip-path: inset(0 0% 0 0%); }
        }
        @keyframes strand-separate-top {
          0%   { transform: translateY(0px); }
          100% { transform: translateY(-18px); }
        }
        @keyframes strand-separate-bottom {
          0%   { transform: translateY(0px); }
          100% { transform: translateY(18px); }
        }
        @keyframes leading-extend {
          0%   { width: 0%; }
          100% { width: 100%; }
        }
        @keyframes okazaki-1 {
          0%,20%    { width: 0%; opacity: 0; }
          25%,60%   { width: 100%; opacity: 1; }
          100%      { width: 100%; opacity: 1; }
        }
        @keyframes okazaki-2 {
          0%,45%    { width: 0%; opacity: 0; }
          50%,80%   { width: 100%; opacity: 1; }
          100%      { width: 100%; opacity: 1; }
        }
        @keyframes okazaki-3 {
          0%,65%    { width: 0%; opacity: 0; }
          70%,100%  { width: 100%; opacity: 1; }
        }
        @keyframes polymerase-move {
          0%   { left: 0%; }
          100% { left: calc(100% - 28px); }
        }
        @keyframes helicase-pulse {
          0%,100% { transform: scale(1); box-shadow: 0 0 0 0 oklch(0.70 0.20 290 / 0.6); }
          50%     { transform: scale(1.12); box-shadow: 0 0 0 8px oklch(0.70 0.20 290 / 0); }
        }
        @keyframes arrow-flow {
          0%   { opacity: 0; transform: translateX(-6px); }
          50%  { opacity: 1; transform: translateX(0px); }
          100% { opacity: 0; transform: translateX(6px); }
        }
        .replication-animate .leading-bar {
          animation: leading-extend 4s linear 0.5s infinite;
        }
        .replication-animate .ok-1 {
          animation: okazaki-1 4s linear 0.5s infinite;
        }
        .replication-animate .ok-2 {
          animation: okazaki-2 4s linear 0.5s infinite;
        }
        .replication-animate .ok-3 {
          animation: okazaki-3 4s linear 0.5s infinite;
        }
        .replication-animate .strand-top {
          animation: strand-separate-top 4s linear 0.5s infinite alternate;
        }
        .replication-animate .strand-bottom {
          animation: strand-separate-bottom 4s linear 0.5s infinite alternate;
        }
        .helicase-enzyme {
          animation: helicase-pulse 1.8s ease-in-out infinite;
        }
        .arrow-flow-anim {
          animation: arrow-flow 1.2s ease-in-out infinite;
        }
      `}</style>

      <div className="p-6">
        <div className="flex items-center justify-between mb-4">
          <h4 className="font-display font-bold text-base accent-dna">
            Replication Fork — Semi-Conservative Mechanism
          </h4>
          <div className="flex gap-3 text-xs text-muted-foreground flex-wrap">
            <span className="flex items-center gap-1.5">
              <span
                className="inline-block w-3 h-3 rounded-full"
                style={{ background: "#9b59ff" }}
              />
              Template (parent)
            </span>
            <span className="flex items-center gap-1.5">
              <span
                className="inline-block w-3 h-3 rounded-full"
                style={{ background: "#34d399" }}
              />
              Leading strand
            </span>
            <span className="flex items-center gap-1.5">
              <span
                className="inline-block w-3 h-3 rounded-full"
                style={{ background: "#f59e0b" }}
              />
              Okazaki fragments
            </span>
          </div>
        </div>

        {/* Diagram */}
        <div
          className="replication-animate relative rounded-xl overflow-hidden"
          style={{ minHeight: 240, background: "oklch(0.12 0.02 290)" }}
        >
          {/* ─── Parent double helix (left side, intact) ─── */}
          <div className="absolute left-0 top-1/2 -translate-y-1/2 w-[28%] flex flex-col gap-0.5 px-3">
            <div className="text-xs text-muted-foreground mb-1 font-medium">
              Parent DNA
            </div>
            {["p1", "p2", "p3", "p4", "p5", "p6", "p7", "p8"].map((id) => (
              <div key={id} className="flex items-center gap-0.5 h-4">
                <div
                  className="h-2 rounded-full flex-1"
                  style={{ background: "#9b59ff", opacity: 0.9 }}
                />
                <div
                  className="h-full w-px"
                  style={{ background: "oklch(0.70 0.20 290 / 0.4)" }}
                />
                <div
                  className="h-2 rounded-full flex-1"
                  style={{ background: "#c49bff", opacity: 0.85 }}
                />
              </div>
            ))}
          </div>

          {/* ─── Replication fork center ─── */}
          <div className="absolute left-[28%] top-1/2 -translate-y-1/2 flex flex-col items-center">
            {/* Helicase enzyme */}
            <div
              className="helicase-enzyme flex flex-col items-center justify-center rounded-full font-bold text-xs"
              style={{
                width: 48,
                height: 48,
                background: "oklch(0.70 0.20 290)",
                color: "oklch(0.10 0 0)",
                fontSize: 9,
                textAlign: "center",
                lineHeight: "1.2",
                zIndex: 10,
                position: "relative",
              }}
            >
              HELI-
              <br />
              CASE
            </div>
            <div
              className="text-xs text-muted-foreground mt-1"
              style={{ fontSize: 9 }}
            >
              unwinds
            </div>
          </div>

          {/* ─── Separated strands + new synthesis (right side) ─── */}
          <div className="absolute left-[38%] right-0 top-1/2 -translate-y-1/2 flex flex-col gap-4 pr-4">
            {/* Top strand: template → leading strand synthesized */}
            <div className="strand-top flex flex-col gap-1">
              <div className="flex items-center gap-1.5">
                <span
                  className="text-xs text-muted-foreground shrink-0"
                  style={{ fontSize: 9, width: 60 }}
                >
                  5'→3' template
                </span>
                <div
                  className="flex-1 h-2.5 rounded-full relative overflow-hidden"
                  style={{ background: "oklch(0.25 0.05 290)" }}
                >
                  <div
                    className="absolute inset-0 h-full rounded-full"
                    style={{ background: "#9b59ff", opacity: 0.7 }}
                  />
                </div>
                <span
                  className="text-xs font-bold shrink-0"
                  style={{ color: "#9b59ff", fontSize: 9 }}
                >
                  3'
                </span>
              </div>
              <div className="flex items-center gap-1.5">
                <span
                  className="text-xs text-muted-foreground shrink-0"
                  style={{ fontSize: 9, width: 60 }}
                >
                  <span style={{ color: "#34d399" }}>Leading →</span>
                </span>
                <div
                  className="flex-1 h-2.5 rounded-full relative overflow-hidden"
                  style={{ background: "oklch(0.20 0 0)" }}
                >
                  <div
                    className="leading-bar absolute left-0 top-0 h-full rounded-full"
                    style={{ background: "#34d399", width: 0 }}
                  />
                </div>
                <span
                  className="text-xs font-bold shrink-0"
                  style={{ color: "#34d399", fontSize: 9 }}
                >
                  5'
                </span>
              </div>
              <div
                className="text-xs text-muted-foreground pl-16"
                style={{ fontSize: 9 }}
              >
                ← DNA Pol III (continuous, 5'→3')
              </div>
            </div>

            {/* Bottom strand: template + lagging strand (Okazaki fragments) */}
            <div className="strand-bottom flex flex-col gap-1">
              <div className="flex items-center gap-1.5">
                <span
                  className="text-xs text-muted-foreground shrink-0"
                  style={{ fontSize: 9, width: 60 }}
                >
                  3'→5' template
                </span>
                <div
                  className="flex-1 h-2.5 rounded-full relative overflow-hidden"
                  style={{ background: "oklch(0.25 0.05 290)" }}
                >
                  <div
                    className="absolute inset-0 h-full rounded-full"
                    style={{ background: "#c49bff", opacity: 0.7 }}
                  />
                </div>
                <span
                  className="text-xs font-bold shrink-0"
                  style={{ color: "#c49bff", fontSize: 9 }}
                >
                  5'
                </span>
              </div>
              <div className="flex items-center gap-1.5">
                <span
                  className="text-xs text-muted-foreground shrink-0"
                  style={{ fontSize: 9, width: 60 }}
                >
                  <span style={{ color: "#f59e0b" }}>Lagging ←</span>
                </span>
                {/* Okazaki fragments */}
                <div className="flex-1 flex gap-0.5 h-2.5">
                  <div
                    className="flex-1 relative overflow-hidden rounded-l-full"
                    style={{ background: "oklch(0.20 0 0)" }}
                  >
                    <div
                      className="ok-1 absolute left-0 top-0 h-full rounded-full"
                      style={{ background: "#f59e0b", opacity: 0, width: 0 }}
                    />
                  </div>
                  <div
                    className="flex-1 relative overflow-hidden"
                    style={{ background: "oklch(0.20 0 0)" }}
                  >
                    <div
                      className="ok-2 absolute left-0 top-0 h-full"
                      style={{ background: "#f59e0b", opacity: 0, width: 0 }}
                    />
                  </div>
                  <div
                    className="flex-1 relative overflow-hidden rounded-r-full"
                    style={{ background: "oklch(0.20 0 0)" }}
                  >
                    <div
                      className="ok-3 absolute left-0 top-0 h-full rounded-full"
                      style={{ background: "#f59e0b", opacity: 0, width: 0 }}
                    />
                  </div>
                </div>
                <span
                  className="text-xs font-bold shrink-0"
                  style={{ color: "#f59e0b", fontSize: 9 }}
                >
                  3'
                </span>
              </div>
              <div
                className="text-xs text-muted-foreground pl-16"
                style={{ fontSize: 9 }}
              >
                Okazaki fragments · joined by Ligase
              </div>
            </div>
          </div>

          {/* Direction arrows */}
          <div
            className="absolute right-4 top-3 flex flex-col gap-1 text-xs"
            style={{ fontSize: 10 }}
          >
            <div
              className="flex items-center gap-1"
              style={{ color: "#34d399" }}
            >
              <span>Leading 5'→3'</span>
              <span className="arrow-flow-anim">→</span>
            </div>
            <div
              className="flex items-center gap-1"
              style={{ color: "#f59e0b" }}
            >
              <span
                className="arrow-flow-anim"
                style={{ animationDelay: "0.6s" }}
              >
                ←
              </span>
              <span>Lagging 3'←5'</span>
            </div>
          </div>

          {/* Labels along bottom */}
          <div className="absolute bottom-3 left-0 right-0 flex justify-around px-4">
            {[
              { label: "Primase", color: "#a78bfa", sub: "adds RNA primer" },
              {
                label: "DNA Pol III",
                color: "#34d399",
                sub: "synthesizes DNA",
              },
              { label: "DNA Ligase", color: "#f59e0b", sub: "joins fragments" },
            ].map(({ label, color, sub }) => (
              <div
                key={label}
                className="flex flex-col items-center text-center"
                style={{ fontSize: 9 }}
              >
                <div
                  className="rounded px-2 py-0.5 font-bold mb-0.5"
                  style={{
                    background: `${color}22`,
                    color,
                    border: `1px solid ${color}55`,
                  }}
                >
                  {label}
                </div>
                <span className="text-muted-foreground">{sub}</span>
              </div>
            ))}
          </div>
        </div>

        <p className="text-xs text-muted-foreground mt-3 leading-relaxed">
          <strong className="accent-dna">How to read this diagram:</strong> The
          helicase unwinds the parent double helix at the fork. The leading
          strand is synthesized continuously (5'→3') towards the fork. The
          lagging strand is synthesized away from the fork in discontinuous
          Okazaki fragments. All new synthesis happens in the 5'→3' direction.
        </p>
      </div>
    </div>
  );
}
