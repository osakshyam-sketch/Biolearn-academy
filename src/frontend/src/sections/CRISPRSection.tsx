import {
  AnimatedEntrance,
  StaggerContainer,
  StaggerItem,
} from "@/components/AnimatedEntrance";
import { QuizEngine } from "@/components/QuizEngine";
import { SectionHeader } from "@/components/SectionHeader";
import type { QuizQuestion } from "@/types/biology";
import { Scissors } from "lucide-react";
import { useEffect, useRef, useState } from "react";

// ── CRISPR accent: teal ──────────────────────────────────────────────────────
const TEAL = "oklch(0.52 0.14 172)";
const TEAL_DIM = "oklch(0.52 0.14 172 / 0.15)";
const TEAL_BORDER = "oklch(0.52 0.14 172 / 0.35)";

// ── Quiz questions ───────────────────────────────────────────────────────────
const CRISPR_QUIZ: QuizQuestion[] = [
  {
    id: "cr1",
    question:
      "Where did scientists first find CRISPR — and why does that surprise people?",
    options: [
      "In bacteria, as part of their immune system for fighting viruses",
      "In human white blood cells, as a natural cancer-fighting mechanism",
      "In yeast, as a DNA repair tool discovered in a lab",
      "In plants, as a way to protect against UV radiation",
    ],
    correctIndex: 0,
    explanation:
      "Here's the wonderful twist — CRISPR wasn't invented in a high-tech lab. It was hiding in bacteria the whole time! Bacteria don't have an immune system like ours, but they do have CRISPR: a clever system that stores 'mugshot' sequences of viruses that attacked them before. When the same virus comes back, the bacteria recognise it and destroy it. Francisco Mojica figured this out in the 1990s. Then in 2012, Jennifer Doudna and Emmanuelle Charpentier realised they could hijack this natural system to edit any DNA they wanted — and won the Nobel Prize for it. Nature had already built the tool; scientists just learned how to use it.",
    topic: "crispr",
  },
  {
    id: "cr2",
    question: "Why does Cas9 need a PAM sequence before it will cut DNA?",
    options: [
      "The PAM sequence gives Cas9 energy to make the cut",
      "The PAM is a short 'landing signal' that Cas9 must find first — without it, Cas9 won't even try to read the nearby DNA",
      "The PAM sequence holds the two DNA strands together after cutting",
      "The PAM tells Cas9 which direction to read the DNA",
    ],
    correctIndex: 1,
    explanation:
      "Think of the PAM sequence like a parking spot sign — Cas9 won't stop unless it sees the right sign. For the most commonly used Cas9, the sign reads 'NGG' (two guanine bases next to any base). When Cas9 spots this sign, it slows down and checks: does the DNA nearby match my guide RNA? If yes, it cuts. If no PAM is found, Cas9 keeps moving without doing anything. This is actually a smart safety feature that bacteria evolved so Cas9 wouldn't accidentally cut its own CRISPR sequences. Interestingly, a different version called Cas12a looks for a different sign — TTTV — and expands the places scientists can target.",
    topic: "crispr",
  },
  {
    id: "cr3",
    question:
      "After Cas9 cuts DNA, the cell tries to repair it. What are the two main repair pathways?",
    options: [
      "NHEJ is slow and perfect; HDR is fast and imperfect",
      "NHEJ is the quick-but-messy repair that often disrupts the gene; HDR is the precise repair that needs a template you provide",
      "Both pathways always produce exactly the same result",
      "NHEJ only works at night; HDR works during the day",
    ],
    correctIndex: 1,
    explanation:
      "When DNA breaks, cells panic a little — they have to fix it fast. NHEJ (Non-Homologous End Joining) is the emergency repair crew: it grabs the broken ends and sticks them back together quickly. But it's sloppy — it often drops or adds a few letters in the process, which breaks the gene's instructions. This is actually useful for researchers who want to disable a gene (called a knockout). HDR (Homology-Directed Repair) is like having a perfect blueprint to follow: you give the cell an exact template for the repair, and it copies it in precisely. The catch is that HDR only works when cells are actively dividing, so it's harder to use in cells like neurons that rarely divide. Scientists choose between these pathways depending on whether they want to disrupt or precisely fix a gene.",
    topic: "crispr",
  },
  {
    id: "cr4",
    question:
      "How is Cas12a different from Cas9, and when might a scientist choose Cas12a?",
    options: [
      "Cas12a is just an older version of Cas9 with no meaningful differences",
      "Cas12a needs a simpler guide RNA, looks for a different landing signal (TTTV), and makes a staggered cut — it's also useful in CRISPR-based disease detection tests",
      "Cas12a cuts RNA instead of DNA",
      "Cas12a is bigger and harder to deliver into cells than Cas9",
    ],
    correctIndex: 1,
    explanation:
      "This is where it gets cool: the CRISPR toolbox has more than one tool! Cas12a is a different molecular scissors from a different bacterium. It's simpler in some ways — it doesn't need the full two-part guide RNA that Cas9 needs, it looks for a T-rich landing signal rather than NGG, and it cuts in a staggered way instead of straight across. That staggered cut is actually helpful for inserting new DNA. Here's an interesting fact: Cas12a has a remarkable extra trick — when it finds and cuts its target, it also starts cutting any nearby single-stranded DNA. Scientists have exploited this to build DETECTR, a CRISPR-based disease detection test that can identify viral infections like COVID-19 with incredible sensitivity.",
    topic: "crispr",
  },
  {
    id: "cr5",
    question:
      "What makes base editing different from standard CRISPR cutting, and why is it exciting for medicine?",
    options: [
      "Base editing cuts both DNA strands just like Cas9, but more precisely",
      "Base editing chemically converts one DNA letter to another without cutting the DNA at all — perfect for fixing single-letter spelling errors in genes",
      "Base editing only works on RNA, not DNA",
      "Base editing amplifies the target DNA before making changes",
    ],
    correctIndex: 1,
    explanation:
      "Imagine your DNA as a book with three billion letters. Standard CRISPR is like cutting a page out and hoping the repair crew pastes it back correctly. Base editing is more like having a tiny eraser and pencil — it quietly swaps one letter for another without tearing the page. A molecular tool called a deaminase is attached to a modified Cas9 that can no longer cut. It still finds the right spot using the guide RNA, then chemically converts the target letter. C→T editors and A→G editors can fix many genetic diseases caused by a single wrong letter. No double-strand break, no messy repair needed. Interesting fact: sickle cell disease is caused by just one wrong letter in a single gene — base editing can potentially fix this in one step.",
    topic: "crispr",
  },
  {
    id: "cr6",
    question:
      "Prime editing is called a 'find and replace' tool for DNA. What makes it different from base editing?",
    options: [
      "Prime editing uses two separate Cas9 proteins working together",
      "Prime editing uses a special guide RNA that carries the new sequence you want, plus a reverse transcriptase enzyme that writes the new sequence directly into DNA",
      "Prime editing only works in bacterial cells",
      "Prime editing is an older technique that base editing replaced",
    ],
    correctIndex: 1,
    explanation:
      "David Liu's lab invented prime editing in 2019, and it's genuinely clever. The guide RNA in prime editing is special — it does two jobs at once. First, it finds the right spot in the DNA (just like a normal guide RNA). Second, it carries a mini template of the exact change you want to make. A reverse transcriptase enzyme (borrowed from retroviruses!) reads this template and writes the new sequence directly into the DNA — like a molecular cut-and-paste. What makes prime editing so powerful is that it can make any small change: swap a letter, add letters, or delete letters, all without making a dangerous double-strand break. It's the most flexible single-tool editor we have so far.",
    topic: "crispr",
  },
  {
    id: "cr7",
    question:
      "Casgevy was the first CRISPR medicine approved by the FDA. What disease does it treat and how does it work?",
    options: [
      "It treats type 1 diabetes by repairing insulin-producing cells in the pancreas",
      "It treats sickle cell disease by editing bone marrow stem cells to turn on a backup haemoglobin that works perfectly",
      "It treats lung cancer by deleting tumour-promoting genes",
      "It treats HIV by preventing the virus from entering T cells",
    ],
    correctIndex: 1,
    explanation:
      "In December 2023, the FDA approved Casgevy — the world's first CRISPR medicine, and what a story it is! Here's the beautiful logic behind it: people with sickle cell disease have broken adult haemoglobin, but as babies, everyone makes fetal haemoglobin (HbF) that works perfectly. After birth, a molecular switch called BCL11A turns off HbF production. Casgevy uses CRISPR to disrupt that switch in the patient's own bone marrow stem cells — the stem cells are taken out, edited in the lab, then given back to the patient. The fetal haemoglobin comes back on and does the job the adult haemoglobin can't do. In clinical trials, 29 out of 29 patients were completely free of painful crises for over a year. For a disease that had no cure, this is remarkable.",
    topic: "crispr",
  },
  {
    id: "cr8",
    question:
      "What are lipid nanoparticles and why are they useful for delivering CRISPR into cells?",
    options: [
      "They are tiny fat bubbles that protect and carry CRISPR components into cells without needing a virus",
      "They are protein capsules that permanently integrate CRISPR into the genome",
      "They are metal particles that attract CRISPR to specific cell types using magnets",
      "They are sugar-coated viruses that carry CRISPR to the liver only",
    ],
    correctIndex: 0,
    explanation:
      "Here's something interesting — the same technology that delivered mRNA COVID vaccines is now used to deliver CRISPR! Lipid nanoparticles are tiny fat spheres, a bit like microscopic soap bubbles, that can wrap around and protect the CRISPR machinery (the guide RNA and Cas9 instructions). When these bubbles reach a cell, they fuse with the cell membrane and release their cargo inside. Because the CRISPR doesn't get permanently installed in the genome — it arrives, does its job, and then gets broken down — the risk of the editing machinery causing problems long-term is much lower. This 'hit and run' approach makes lipid nanoparticles one of the safest delivery methods available.",
    topic: "crispr",
  },
  {
    id: "cr9",
    question:
      "What are off-target effects and why do scientists work hard to minimise them?",
    options: [
      "Off-target effects happen when CRISPR edits the wrong person's cells",
      "Cas9 can sometimes cut DNA at the wrong location if the guide RNA partially matches a different part of the genome — which could accidentally damage an important gene",
      "Off-target effects refer to CRISPR accidentally editing RNA instead of DNA",
      "They happen when a patient's immune system destroys the CRISPR components before they work",
    ],
    correctIndex: 1,
    explanation:
      "Think of it this way: you're searching a book for one specific sentence, but sometimes similar sentences in different chapters could be mistaken for the one you want. Cas9 is similar — it's very precise but not perfect. If the guide RNA matches another spot in the genome even slightly, Cas9 might cut there too. In a medical treatment, accidentally cutting near a tumour suppressor gene could be dangerous. Scientists tackle this in several clever ways: they design guides that match the target as specifically as possible, they use 'high-fidelity' Cas9 versions that are pickier about matching, and they sequence the entire genome of edited cells before any clinical use to make sure nothing unexpected was cut. The field is getting safer all the time.",
    topic: "crispr",
  },
  {
    id: "cr10",
    question:
      "Why is editing genes in a living patient considered very different from editing genes in an embryo?",
    options: [
      "Editing a patient is more expensive, which is the main ethical concern",
      "Editing a patient's body cells only affects that one person; editing an embryo changes genes that will be passed to every future child and grandchild — without their consent",
      "There is no ethical difference — both types of editing are equally controversial",
      "Embryo editing is only controversial because the technology is less reliable",
    ],
    correctIndex: 1,
    explanation:
      "This is one of the most important conversations happening in science right now. When doctors use CRISPR to treat a patient — like Casgevy for sickle cell disease — they're changing only that patient's cells. Those changes stay with that person and don't get passed on. That's called somatic editing, and it's medically and ethically accepted. But editing an embryo's genes is completely different — those changes get copied into every single cell of the resulting child, and into their children, and their children's children, forever. In 2018, a scientist named He Jiankui created CRISPR-edited babies without proper consent or safety evidence. The scientific world was appalled. He was imprisoned. The reason everyone reacted so strongly is that changing heritable genes affects future generations who never agreed to it. Scientists broadly agree: germline editing must wait until the science is much better understood and global governance frameworks are in place.",
    topic: "crispr",
  },
];

// ── CRISPR Mechanism Animated Diagram ─────────────────────────────────────────

const DNA_BASES_TOP = [
  "A",
  "T",
  "G",
  "C",
  "A",
  "T",
  "G",
  "C",
  "A",
  "T",
  "G",
  "C",
];
const DNA_BASES_BOT = [
  "T",
  "A",
  "C",
  "G",
  "T",
  "A",
  "C",
  "G",
  "T",
  "A",
  "C",
  "G",
];
const DNA_TOP_IDS = DNA_BASES_TOP.map((b, i) => `top-${b}-pos${i}`);
const DNA_BOT_IDS = DNA_BASES_BOT.map((b, i) => `bot-${b}-pos${i}`);
const DNA_BP_IDS = DNA_BASES_TOP.map((_, i) => `bp-pos${i}`);

const BASE_COLORS: Record<string, string> = {
  A: "oklch(0.55 0.18 142)",
  T: "oklch(0.58 0.18 36)",
  G: "oklch(0.55 0.18 290)",
  C: "oklch(0.55 0.18 200)",
};

type MechanismStep = "scan" | "bind" | "cut" | "repair";

const STEPS: { id: MechanismStep; label: string; desc: string }[] = [
  {
    id: "scan",
    label: "1 · Guide RNA Scanning",
    desc: "Think of the guide RNA as a tiny search query. It carries a 20-letter sequence that matches your target gene, and it slides along the DNA looking for that exact match — like scrolling through a very long document using Ctrl+F. Cas9 travels with it, checking for a short landing signal called PAM (the letters NGG) to confirm it's found the right spot.",
  },
  {
    id: "bind",
    label: "2 · Cas9 Binds to DNA",
    desc: "Match found! Cas9 grips the DNA, peels the two strands apart at the target site, and the guide RNA hooks onto one strand. The whole complex locks into place like a key fitting a lock. Cas9's two cutting arms — called HNH and RuvC — slowly rotate into their ready position. The system is now primed and ready to cut.",
  },
  {
    id: "cut",
    label: "3 · The Cut",
    desc: "Cas9 fires both cutting arms at the same time — one cuts each strand of the DNA double helix. The result is a complete break through both strands, right where you aimed. It's like snipping a rope in two. The cell immediately detects the broken DNA and sends repair signals — which is where scientists can step in and guide what happens next.",
  },
  {
    id: "repair",
    label: "4 · DNA Repair Choice",
    desc: "The cell has two main ways to fix the break. NHEJ is the fast, emergency repair — it glues the ends back together quickly, but it's sloppy and often deletes or adds a few letters, which breaks the gene. Scientists use this on purpose to disable genes. HDR is the precise repair — if you provide a DNA template with the correct sequence, the cell copies it in exactly. This is how you fix a mutation.",
  },
];

function CRISPRDiagram() {
  const [step, setStep] = useState<MechanismStep>("scan");
  const [scanPos, setScanPos] = useState(0);
  const [cutAnim, setCutAnim] = useState(false);
  const scanRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const stepIdx = STEPS.findIndex((s) => s.id === step);

  useEffect(() => {
    const timer = setTimeout(() => {
      const next = (stepIdx + 1) % STEPS.length;
      setStep(STEPS[next].id);
    }, 4000);
    return () => clearTimeout(timer);
  }, [stepIdx]);

  useEffect(() => {
    if (step === "scan") {
      setScanPos(0);
      scanRef.current = setInterval(() => {
        setScanPos((p) => (p >= 10 ? 0 : p + 1));
      }, 350);
    } else {
      if (scanRef.current) clearInterval(scanRef.current);
    }
    return () => {
      if (scanRef.current) clearInterval(scanRef.current);
    };
  }, [step]);

  useEffect(() => {
    if (step === "cut") {
      setCutAnim(false);
      const t = setTimeout(() => setCutAnim(true), 400);
      return () => clearTimeout(t);
    }
    setCutAnim(false);
  }, [step]);

  const cutIndex = 6;

  return (
    <section
      className="rounded-2xl overflow-hidden"
      style={{
        background: "oklch(0.97 0.01 75)",
        border: `1px solid ${TEAL_BORDER}`,
        boxShadow: "0 2px 24px oklch(0.52 0.14 172 / 0.10)",
      }}
      aria-label="CRISPR-Cas9 mechanism animated diagram"
    >
      <div
        className="flex gap-1 flex-wrap p-3 border-b"
        style={{ borderColor: TEAL_BORDER }}
        role="tablist"
        aria-label="CRISPR mechanism steps"
      >
        {STEPS.map((s) => (
          <button
            key={s.id}
            type="button"
            role="tab"
            aria-selected={step === s.id}
            data-ocid={`crispr-step-${s.id}`}
            onClick={() => setStep(s.id)}
            className="flex-1 rounded-lg px-3 py-2 text-xs font-semibold transition-smooth focus:outline-none focus-visible:ring-2"
            style={{
              background: step === s.id ? TEAL_DIM : "oklch(0.93 0.015 75)",
              color: step === s.id ? TEAL : "oklch(0.45 0.04 75)",
              border: `1px solid ${step === s.id ? TEAL_BORDER : "oklch(0.86 0.02 75)"}`,
              minWidth: "120px",
            }}
          >
            {s.label}
          </button>
        ))}
      </div>

      <div
        className="relative flex flex-col items-center justify-center py-10 px-4"
        style={{ minHeight: "280px" }}
        aria-live="polite"
        aria-atomic="true"
      >
        <div
          className="relative flex flex-col items-center gap-0"
          aria-label="DNA double helix"
        >
          <div className="flex items-center gap-1 mb-2">
            <span className="text-xs font-bold" style={{ color: TEAL }}>
              5′
            </span>
            <span className="text-xs" style={{ color: "oklch(0.50 0.04 75)" }}>
              Template strand
            </span>
          </div>

          <div
            className="flex items-center gap-1 mb-1"
            role="img"
            aria-label="Top DNA strand"
          >
            {DNA_BASES_TOP.map((base, i) => {
              const isCutSite =
                (step === "cut" || step === "repair") &&
                (i === cutIndex || i === cutIndex - 1);
              const isTarget =
                (step === "bind" || step === "cut") && i >= 4 && i <= 9;
              return (
                <div
                  key={DNA_TOP_IDS[i]}
                  className="flex h-8 w-8 items-center justify-center rounded text-xs font-bold transition-smooth"
                  style={{
                    background:
                      isCutSite && cutAnim
                        ? "oklch(0.70 0.25 22 / 0.4)"
                        : isTarget
                          ? `${BASE_COLORS[base]}25`
                          : `${BASE_COLORS[base]}15`,
                    border: `1.5px solid ${isCutSite && cutAnim ? "oklch(0.75 0.22 22)" : isTarget ? BASE_COLORS[base] : `${BASE_COLORS[base]}55`}`,
                    color: BASE_COLORS[base],
                    boxShadow: isTarget
                      ? `0 0 8px ${BASE_COLORS[base]}40`
                      : undefined,
                    transform:
                      isCutSite && cutAnim ? "translateY(-3px)" : undefined,
                  }}
                  aria-label={`${base}`}
                >
                  {base}
                </div>
              );
            })}
          </div>

          <div className="flex items-center gap-1 my-0.5">
            {DNA_BASES_TOP.map((_, i) => {
              const isBreak =
                step === "cut" &&
                cutAnim &&
                (i === cutIndex || i === cutIndex - 1);
              return (
                <div
                  key={DNA_BP_IDS[i]}
                  style={{
                    width: "32px",
                    height: "8px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  {isBreak ? (
                    <span
                      style={{
                        color: "oklch(0.75 0.22 22)",
                        fontSize: "14px",
                        fontWeight: "bold",
                      }}
                    >
                      ⚡
                    </span>
                  ) : (
                    <div
                      style={{
                        width: "2px",
                        height: "8px",
                        background:
                          i >= 4 && i <= 9 && step !== "scan"
                            ? `${TEAL}66`
                            : "oklch(0.78 0.02 75)",
                      }}
                    />
                  )}
                </div>
              );
            })}
          </div>

          <div
            className="flex items-center gap-1 mt-1"
            role="img"
            aria-label="Bottom DNA strand"
          >
            {DNA_BASES_BOT.map((base, i) => {
              const isCutSite =
                (step === "cut" || step === "repair") &&
                (i === cutIndex || i === cutIndex - 1);
              const isTarget =
                (step === "bind" || step === "cut") && i >= 4 && i <= 9;
              return (
                <div
                  key={DNA_BOT_IDS[i]}
                  className="flex h-8 w-8 items-center justify-center rounded text-xs font-bold transition-smooth"
                  style={{
                    background:
                      isCutSite && cutAnim
                        ? "oklch(0.70 0.25 22 / 0.4)"
                        : isTarget
                          ? `${BASE_COLORS[base]}25`
                          : `${BASE_COLORS[base]}15`,
                    border: `1.5px solid ${isCutSite && cutAnim ? "oklch(0.75 0.22 22)" : isTarget ? BASE_COLORS[base] : `${BASE_COLORS[base]}55`}`,
                    color: BASE_COLORS[base],
                    boxShadow: isTarget
                      ? `0 0 8px ${BASE_COLORS[base]}40`
                      : undefined,
                    transform:
                      isCutSite && cutAnim ? "translateY(3px)" : undefined,
                  }}
                  aria-label={`${base}`}
                >
                  {base}
                </div>
              );
            })}
          </div>

          <div className="flex items-center gap-1 mt-2">
            <span className="text-xs font-bold" style={{ color: TEAL }}>
              3′
            </span>
            <span className="text-xs" style={{ color: "oklch(0.50 0.04 75)" }}>
              Non-template strand
            </span>
          </div>

          {step === "scan" && (
            <div
              className="absolute flex flex-col items-center pointer-events-none"
              style={{
                top: "-52px",
                left: `${16 + scanPos * 36}px`,
                transition: "left 0.3s linear",
              }}
              aria-label="Guide RNA scanning along DNA"
            >
              <div
                className="rounded-lg px-2 py-1 text-xs font-bold whitespace-nowrap"
                style={{
                  background: TEAL_DIM,
                  border: `1px solid ${TEAL_BORDER}`,
                  color: TEAL,
                }}
              >
                sgRNA scanning →
              </div>
              <div
                style={{
                  width: "2px",
                  height: "14px",
                  background: `${TEAL}66`,
                }}
              />
            </div>
          )}

          {(step === "bind" || step === "cut") && (
            <div
              className="absolute flex flex-col items-center pointer-events-none"
              style={{
                top: "-70px",
                left: "120px",
                animation:
                  step === "bind"
                    ? "gentle-float 3s ease-in-out infinite"
                    : undefined,
              }}
              aria-label="Cas9 protein bound to DNA"
            >
              <div
                className="rounded-2xl px-4 py-2 text-xs font-bold flex items-center gap-2"
                style={{
                  background: TEAL_DIM,
                  border: `2px solid ${TEAL}`,
                  color: TEAL,
                  boxShadow: `0 0 16px ${TEAL}33`,
                }}
              >
                <span style={{ fontSize: "18px" }}>🔬</span>
                Cas9 + sgRNA complex
              </div>
              <div
                style={{
                  width: "2px",
                  height: "20px",
                  background: `${TEAL}66`,
                }}
              />
            </div>
          )}

          {step === "repair" && (
            <div
              className="absolute flex flex-col items-center pointer-events-none"
              style={{ top: "-68px", left: "80px" }}
              aria-label="DNA repair mechanisms"
            >
              <div className="flex gap-3">
                <div
                  className="rounded-lg px-3 py-2 text-xs font-semibold"
                  style={{
                    background: "oklch(0.65 0.20 290 / 0.12)",
                    border: "1px solid oklch(0.65 0.20 290 / 0.4)",
                    color: "oklch(0.45 0.18 290)",
                  }}
                >
                  NHEJ (indels)
                </div>
                <div
                  className="rounded-lg px-3 py-2 text-xs font-semibold"
                  style={{
                    background: TEAL_DIM,
                    border: `1px solid ${TEAL_BORDER}`,
                    color: TEAL,
                  }}
                >
                  HDR (precise)
                </div>
                <div
                  className="rounded-lg px-3 py-2 text-xs font-semibold"
                  style={{
                    background: "oklch(0.65 0.18 36 / 0.12)",
                    border: "1px solid oklch(0.65 0.18 36 / 0.4)",
                    color: "oklch(0.50 0.16 36)",
                  }}
                >
                  MMEJ
                </div>
              </div>
              <div
                style={{
                  width: "2px",
                  height: "18px",
                  background: "oklch(0.70 0.02 75)",
                }}
              />
            </div>
          )}
        </div>

        <div
          className="flex gap-3 flex-wrap justify-center mt-8"
          aria-label="DNA base color legend"
        >
          {Object.entries(BASE_COLORS).map(([base, color]) => (
            <div key={base} className="flex items-center gap-1.5">
              <div
                className="h-5 w-5 rounded flex items-center justify-center text-xs font-bold"
                style={{
                  background: `${color}15`,
                  border: `1px solid ${color}66`,
                  color,
                }}
                aria-hidden="true"
              >
                {base}
              </div>
              <span
                className="text-xs"
                style={{ color: "oklch(0.50 0.04 75)" }}
              >
                {base === "A"
                  ? "Adenine"
                  : base === "T"
                    ? "Thymine"
                    : base === "G"
                      ? "Guanine"
                      : "Cytosine"}
              </span>
            </div>
          ))}
        </div>
      </div>

      <div
        className="px-5 pb-5"
        role="tabpanel"
        aria-label={`Step description: ${STEPS[stepIdx].label}`}
      >
        <div
          className="rounded-xl p-4"
          style={{ background: TEAL_DIM, border: `1px solid ${TEAL_BORDER}` }}
        >
          <p className="text-xs font-bold mb-1" style={{ color: TEAL }}>
            {STEPS[stepIdx].label}
          </p>
          <p
            className="text-sm leading-relaxed"
            style={{ color: "oklch(0.30 0.03 75)" }}
          >
            {STEPS[stepIdx].desc}
          </p>
        </div>
      </div>
    </section>
  );
}

// ── Explanation paragraphs ─────────────────────────────────────────────────────
const EXPLANATIONS = [
  {
    title: "Where CRISPR Came From — A Bacterial Secret Weapon",
    anchorId: "crispr-origin",
    color: TEAL,
    text: "CRISPR didn't start in a high-tech laboratory. It was hiding inside bacteria for billions of years before scientists even noticed it was there. Here's the story: bacteria don't have an immune system like ours — they can't make antibodies or send in white blood cells. But they do have CRISPR. Every time a virus attacked a bacterium and the bacterium survived, it stored a tiny piece of that virus's DNA as a 'wanted poster.' If the same virus came back, the bacterium could recognise it and destroy it immediately. A Spanish microbiologist named Francisco Mojica spent years in the 1990s puzzling over strange repetitive sequences in bacteria — and eventually figured out this was actually a primitive immune memory. Then in 2012, Jennifer Doudna and Emmanuelle Charpentier made a revolutionary discovery: they could reprogram this bacterial system to cut any DNA sequence they wanted, just by changing 20 letters of a guide RNA. Nature had already built the tool. Scientists just figured out how to aim it at anything. Doudna and Charpentier won the Nobel Prize in Chemistry in 2020, and CRISPR quickly became the most powerful and widely used biotechnology tool in the world.",
  },
  {
    title: "Why Scientists Needed CRISPR: The Tools That Came Before",
    anchorId: "crispr-history",
    color: "oklch(0.52 0.14 185)",
    text: "Before CRISPR, scientists could edit genes — but it was painfully slow and expensive. Tools called Zinc Finger Nucleases (ZFNs) and TALENs did the same basic job. The problem was that for every new gene you wanted to edit, you had to design and build an entirely new custom protein from scratch. That could take months of specialised lab work and cost between $5,000 and $20,000 per target. Editing two genes at once was nearly impossible. Then CRISPR arrived and changed everything. The key difference is clever: CRISPR uses RNA to find its target, not protein. RNA is easy and cheap to make. To aim at a new gene, you just order a new 20-letter RNA sequence — it takes an afternoon and costs about $50. Suddenly, a scientist could edit ten different genes in one experiment. A lab that had never done gene editing before could learn the technique in a couple of weeks. CRISPR didn't just improve gene editing — it made it accessible to everyone. That's why it transformed biology so rapidly.",
  },
  {
    title: "How CRISPR-Cas9 Actually Works, Step by Step",
    anchorId: "crispr-cas9",
    color: "oklch(0.52 0.14 160)",
    text: "CRISPR is basically molecular scissors with a built-in GPS system. Let's walk through exactly what happens inside a cell. First, you design a short piece of RNA called a guide RNA. About 20 of its letters match the DNA sequence you want to cut — this is the 'address.' You load this guide RNA into the Cas9 protein, and the two form a team. Inside the cell, this team enters the nucleus and starts scanning the DNA. Cas9 is looking for a short landing marker called a PAM sequence — for the most common version, this is just the letters 'NGG.' When it finds one, it unzips the DNA slightly and checks: do the nearby 20 letters match the guide RNA? If yes — cut. Cas9 fires both of its cutting blades at the same time, one for each DNA strand. The result is a clean break through the entire double helix. The whole process, from finding the PAM to making the cut, happens in seconds. Right away, the cell's repair systems kick in — and this is the moment scientists can steer things toward disrupting a gene or precisely fixing one.",
  },
  {
    title: "What Happens After the Cut: NHEJ, HDR, and Repair Choices",
    anchorId: "crispr-repair",
    color: "oklch(0.52 0.14 172)",
    text: "When DNA breaks completely, a cell treats it like an emergency. It needs to fix both strands immediately or risk losing an entire chromosome. Here's the fascinating part: cells have more than one repair strategy, and scientists can take advantage of which one gets used. The first is called NHEJ — Non-Homologous End Joining. Picture a panicked repair crew grabbing the two broken ends and taping them back together as fast as possible. They're quick, but careless — they often drop or add a few letters in the process. These tiny errors (called indels) scramble the gene's instructions and effectively break it. This is actually useful when researchers want to knock out a gene on purpose. The second option is called HDR — Homology-Directed Repair. This is like giving the cell a perfect blueprint to copy from. If scientists provide a repair template alongside the CRISPR machinery, the cell can use it to make an exact, intentional change — like fixing the one misspelled letter that causes sickle cell disease. The catch: HDR only works well in actively dividing cells, so it's harder to use in the brain or heart muscle. Scientists choose between these options depending on whether they want to disrupt a gene or correct it.",
  },
  {
    title: "The CRISPR Toolbox: More Than Just Cas9",
    anchorId: "crispr-base-prime-editing",
    color: "oklch(0.55 0.14 142)",
    text: "Cas9 gets all the headlines, but it's only one tool in a growing CRISPR toolbox. Cas12a is another CRISPR protein that scientists love for different situations — it needs a simpler guide RNA, uses a different landing marker (TTTV instead of NGG), and cuts in a staggered way that's helpful for inserting new DNA. Cas12a has a remarkable bonus trick: after it cuts its target, it starts cutting any nearby single-stranded DNA. Scientists have turned this into a powerful disease detection test — DETECTR can identify COVID-19, Zika, or dengue viruses within minutes. Cas13 is even more unusual: it targets RNA instead of DNA, which lets scientists adjust how a gene is being used without permanently changing the genetic code. Then there are base editors — tools that don't cut the DNA at all. Instead, they act like a tiny chemical eraser, swapping one DNA letter for another. Change a single C to a T without making any cuts. And prime editing is the newest advance: it can insert, delete, or change any small sequence using a self-contained editing system — like having a miniature find-and-replace tool for the genome. Each tool has its strengths, and modern scientists pick the right one for each specific job.",
  },
  {
    title: "CRISPR as Medicine: From Lab to Pharmacy",
    anchorId: "crispr-applications",
    color: "oklch(0.52 0.14 195)",
    text: "For years, CRISPR was mainly a research tool — incredibly powerful in the lab, but not yet a real medicine. That changed in December 2023 when the FDA approved Casgevy, the world's first CRISPR-based therapy. It treats sickle cell disease using a beautifully logical approach. People with sickle cell have broken adult haemoglobin — but as babies, everyone makes a different, fully working version called fetal haemoglobin. After birth, a molecular switch turns it off. Casgevy uses CRISPR to break that switch in the patient's own bone marrow stem cells. The cells are removed from the patient, edited in the lab, then returned to the body. Fetal haemoglobin comes back on and does the job the adult version can't. In clinical trials, every single treated patient was free of sickle cell crises for at least a year. For a disease with no cure, this is extraordinary. CRISPR is also being tested in cancer treatment, where it's used to engineer patients' immune cells into powerful cancer hunters. Scientists hope to create 'off-the-shelf' immune cells that any patient could receive immediately — no waiting for personalised treatment.",
  },
  {
    title: "CRISPR in Farming: Editing the Crops We Eat",
    anchorId: "crispr-agriculture",
    color: "oklch(0.50 0.14 262)",
    text: "CRISPR isn't just for medicine — it's also changing what we grow and eat. One of the most interesting things about agricultural CRISPR is that many crop edits don't add any foreign DNA at all. They simply adjust genes that already exist in the plant. Several countries treat these kinds of edits differently from traditional GMOs, which can make regulatory approval faster. In 2021, Japan became the first country to approve a CRISPR food for sale in supermarkets: tomatoes with higher levels of GABA, a molecule that may support heart health. Scientists have also used CRISPR to make mushrooms that don't turn brown, wheat that resists a devastating fungus, and pigs that can survive a deadly viral disease. One of the most ambitious applications is something called a gene drive — a CRISPR system designed to spread through wild populations. A gene drive targeting malaria-carrying mosquitoes could theoretically save hundreds of thousands of lives each year. But it would spread through the entire wild population permanently, which is why scientists are very cautious and discuss the ethics thoroughly before any real-world release.",
  },
  {
    title: "The Ethical Questions CRISPR Forces Us to Answer",
    anchorId: "crispr-ethics",
    color: "oklch(0.50 0.14 210)",
    text: "CRISPR has sparked some of the most important ethical conversations in modern science. There's a clear dividing line. When doctors use CRISPR to treat a patient — like fixing a blood disorder — they're only changing that person's cells. The changes don't get passed on to their children. This is called somatic editing, and it's widely accepted because the patient can consent and the benefits are real. Editing an embryo is completely different. Any change made to an embryo's DNA gets copied into every cell of the child, and passed to their children, and their grandchildren — forever. In 2018, a scientist in China named He Jiankui used CRISPR to edit human embryos that were then implanted, resulting in the birth of three babies. He did this without adequate safety data, without genuine informed consent, and for a purpose that didn't justify the risks to those children. The scientific world reacted with near-universal condemnation. He was imprisoned for three years. The reason scientists reacted so strongly is simple: changing heritable genes affects people who haven't been born yet and never had a say in the decision. That's not just a safety question — it's a fundamental ethical question about power, consent, and the limits of science.",
  },
];

// ── Application spotlight cards ────────────────────────────────────────────────
const APP_CARDS = [
  {
    icon: "💉",
    label: "Gene Therapy",
    desc: "Casgevy (sickle cell/thalassemia) — FDA approved Dec 2023. BCL11A editing reactivates fetal hemoglobin.",
    color: TEAL,
  },
  {
    icon: "🦠",
    label: "CRISPR Diagnostics",
    desc: "SHERLOCK (Cas13) and DETECTR (Cas12a) — attomolar sensitivity for COVID-19, Zika, and other pathogens",
    color: "oklch(0.52 0.14 185)",
  },
  {
    icon: "🌱",
    label: "Crop Engineering",
    desc: "Non-browning mushrooms, GABA tomatoes, powdery mildew-resistant wheat, hornless cattle",
    color: "oklch(0.52 0.14 142)",
  },
  {
    icon: "🧫",
    label: "Cancer Immunotherapy",
    desc: "Allogeneic CRISPR CAR-T cells targeting CD19, BCMA — multiple Phase I/II trials active",
    color: "oklch(0.52 0.14 160)",
  },
  {
    icon: "🦟",
    label: "Gene Drives",
    desc: "Population-suppression drives against Anopheles gambiae for malaria control — contained field trials",
    color: "oklch(0.52 0.14 195)",
  },
  {
    icon: "🧬",
    label: "Base & Prime Editing",
    desc: "Point mutation correction without DSB — therapeutic potential for sickle cell, progeria, cancer",
    color: "oklch(0.50 0.14 220)",
  },
];

// ── Cas comparison table data ──────────────────────────────────────────────────
const CAS_COMPARISON = [
  ["Feature", "Cas9 (SpCas9)", "Cas12a (Cpf1)", "Cas13", "Base Editors"],
  ["Target", "dsDNA", "dsDNA", "ssRNA", "dsDNA"],
  ["PAM", "NGG (3' side)", "TTTV (5' side)", "No PAM", "NGG (via dCas9/nCas9)"],
  [
    "Cut type",
    "Blunt DSB",
    "Staggered 5' overhang",
    "RNA cleavage",
    "No DSB (nick or none)",
  ],
  [
    "Guide RNA",
    "sgRNA (crRNA+tracrRNA)",
    "crRNA only (self-processes)",
    "crRNA",
    "sgRNA",
  ],
  [
    "Key use",
    "Knockout/HDR/base editing",
    "Knock-in, diagnostics",
    "RNA knockdown, diagnostics",
    "Point mutation repair",
  ],
];

// ── Main section ───────────────────────────────────────────────────────────────
export default function CRISPRSection() {
  return (
    <section
      className="px-4 py-16 md:px-8"
      aria-labelledby="crispr-heading"
      style={{ background: "oklch(0.97 0.012 75)" }}
    >
      <div className="mx-auto max-w-5xl">
        <AnimatedEntrance direction="left">
          <SectionHeader
            topicId="crispr"
            title="Genetic Engineering & CRISPR"
            subtitle="CRISPR is basically molecular scissors — imagine being able to find a specific word in a three-billion-letter book and change just that one word. That's what this tool does, and bacteria invented it first."
          />
          <div
            className="mb-6 inline-flex items-center gap-2 rounded-full px-3 py-1.5 text-xs font-semibold"
            style={{
              background: TEAL_DIM,
              border: `1px solid ${TEAL_BORDER}`,
              color: TEAL,
            }}
          >
            <Scissors className="h-3.5 w-3.5" aria-hidden="true" />
            Guide RNA · Cas9 Nuclease · DSB · NHEJ/HDR · Base Editing · Prime
            Editing
          </div>
        </AnimatedEntrance>

        {/* CRISPR Mechanism Diagram */}
        <AnimatedEntrance direction="up" delay={0.1}>
          <div className="mb-12">
            <div
              className="flex items-center justify-between px-5 py-3 rounded-t-2xl border-b"
              style={{
                background: "oklch(0.96 0.015 75)",
                borderColor: TEAL_BORDER,
                borderTop: `1px solid ${TEAL_BORDER}`,
                borderLeft: `1px solid ${TEAL_BORDER}`,
                borderRight: `1px solid ${TEAL_BORDER}`,
              }}
            >
              <h3
                className="font-display text-sm font-semibold"
                style={{ color: TEAL }}
                id="crispr-heading"
              >
                Interactive CRISPR-Cas9 Mechanism Diagram
              </h3>
              <span
                className="text-xs"
                style={{ color: "oklch(0.50 0.04 75)" }}
              >
                Auto-advances · Click steps to explore
              </span>
            </div>
            <CRISPRDiagram />
          </div>
        </AnimatedEntrance>

        {/* Explanation paragraphs */}
        <StaggerContainer className="mb-12 space-y-6" staggerDelay={0.08}>
          {EXPLANATIONS.map((para) => (
            <StaggerItem key={para.title}>
              <div
                id={para.anchorId}
                className="rounded-2xl p-6"
                style={{
                  background: "oklch(0.985 0.008 75)",
                  border: "1px solid oklch(0.88 0.02 75)",
                  borderLeft: `3px solid ${para.color}`,
                }}
              >
                <h3
                  className="font-display text-xl font-bold mb-3"
                  style={{ color: para.color }}
                >
                  {para.title}
                </h3>
                <p
                  className="leading-relaxed text-sm md:text-base"
                  style={{ color: "oklch(0.30 0.03 75)" }}
                >
                  {para.text}
                </p>
              </div>
            </StaggerItem>
          ))}
        </StaggerContainer>

        {/* Cas protein comparison table */}
        <AnimatedEntrance direction="up" delay={0.05}>
          <div
            className="mb-12 rounded-2xl overflow-hidden"
            style={{
              background: "oklch(0.985 0.008 75)",
              border: "1px solid oklch(0.86 0.025 75)",
            }}
          >
            <div
              className="px-5 py-4 border-b"
              style={{ borderColor: "oklch(0.86 0.025 75)" }}
            >
              <h3
                className="font-display text-lg font-bold"
                style={{ color: TEAL }}
              >
                CRISPR Cas Protein Comparison
              </h3>
              <p
                className="text-xs mt-1"
                style={{ color: "oklch(0.50 0.04 75)" }}
              >
                Cas9, Cas12a, Cas13, and base editors — each optimized for
                different tasks
              </p>
            </div>
            <div className="overflow-x-auto">
              <table
                className="w-full text-sm"
                aria-label="Comparison of CRISPR Cas proteins"
              >
                <thead>
                  <tr style={{ background: `${TEAL}08` }}>
                    {CAS_COMPARISON[0].map((h) => (
                      <th
                        key={h}
                        scope="col"
                        className="px-4 py-3 text-left text-xs font-bold uppercase tracking-wide"
                        style={{
                          color: TEAL,
                          borderBottom: "1px solid oklch(0.86 0.025 75)",
                        }}
                      >
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {CAS_COMPARISON.slice(1).map((row, ri) => (
                    <tr
                      key={row[0]}
                      style={{
                        background:
                          ri % 2 === 0 ? "transparent" : "oklch(0.96 0.01 75)",
                        borderBottom: "1px solid oklch(0.90 0.015 75)",
                      }}
                    >
                      {row.map((cell, ci) => (
                        <td
                          key={`${row[0]}-${ci}`}
                          className="px-4 py-3"
                          style={{
                            color:
                              ci === 0
                                ? "oklch(0.28 0.03 75)"
                                : ci === 1
                                  ? TEAL
                                  : "oklch(0.45 0.04 75)",
                            fontWeight: ci === 0 ? "600" : "400",
                          }}
                        >
                          {cell}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </AnimatedEntrance>

        {/* CRISPR vs older tools comparison */}
        <AnimatedEntrance direction="up" delay={0.05}>
          <div
            className="mb-12 rounded-2xl overflow-hidden"
            style={{
              background: "oklch(0.985 0.008 75)",
              border: "1px solid oklch(0.86 0.025 75)",
            }}
          >
            <div
              className="px-5 py-4 border-b"
              style={{ borderColor: "oklch(0.86 0.025 75)" }}
            >
              <h3
                className="font-display text-lg font-bold"
                style={{ color: TEAL }}
              >
                CRISPR vs. Earlier Gene Editing Technologies
              </h3>
              <p
                className="text-xs mt-1"
                style={{ color: "oklch(0.50 0.04 75)" }}
              >
                How RNA-guided targeting transformed the field
              </p>
            </div>
            <div className="overflow-x-auto">
              <table
                className="w-full text-sm"
                aria-label="Comparison of gene editing technologies"
              >
                <thead>
                  <tr style={{ background: `${TEAL}08` }}>
                    {["Feature", "ZFNs", "TALENs", "CRISPR-Cas9"].map((h) => (
                      <th
                        key={h}
                        scope="col"
                        className="px-4 py-3 text-left text-xs font-bold uppercase tracking-wide"
                        style={{
                          color: TEAL,
                          borderBottom: "1px solid oklch(0.86 0.025 75)",
                        }}
                      >
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {[
                    [
                      "Targeting mechanism",
                      "Protein–DNA zinc fingers",
                      "Protein–DNA TALE repeats",
                      "RNA–DNA (20-nt guide)",
                    ],
                    [
                      "Design time",
                      "Months of protein engineering",
                      "Weeks",
                      "Days — order a synthetic oligo",
                    ],
                    [
                      "Cost per target",
                      "$5,000–$20,000+",
                      "$1,000–$5,000",
                      "$50–$200",
                    ],
                    [
                      "Multiplexing",
                      "Very difficult",
                      "Difficult",
                      "Easy — multiple guides simultaneously",
                    ],
                    [
                      "Off-target risk",
                      "Moderate–High",
                      "Lower than ZFNs",
                      "Low with HiFi variants",
                    ],
                    [
                      "Cut type",
                      "DSB (staggered)",
                      "DSB (blunt)",
                      "DSB blunt / nickase / base edit",
                    ],
                    [
                      "Clinical use",
                      "ZFN HIV trials (Sangamo)",
                      "Fewer clinical programs",
                      "Many approved/Phase III therapies",
                    ],
                  ].map((row, ri) => (
                    <tr
                      key={row[0]}
                      style={{
                        background:
                          ri % 2 === 0 ? "transparent" : "oklch(0.96 0.01 75)",
                        borderBottom: "1px solid oklch(0.90 0.015 75)",
                      }}
                    >
                      {row.map((cell, ci) => (
                        <td
                          key={`${row[0]}-${ci}`}
                          className="px-4 py-3"
                          style={{
                            color:
                              ci === 0
                                ? "oklch(0.28 0.03 75)"
                                : ci === 3
                                  ? TEAL
                                  : "oklch(0.45 0.04 75)",
                            fontWeight: ci === 0 ? "600" : "400",
                          }}
                        >
                          {cell}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </AnimatedEntrance>

        {/* Application spotlight */}
        <AnimatedEntrance direction="up" delay={0.05}>
          <div className="mb-12">
            <h3
              className="font-display text-2xl font-bold mb-2"
              style={{ color: TEAL }}
            >
              Six Frontiers of CRISPR Applications
            </h3>
            <p
              className="text-sm mb-6"
              style={{ color: "oklch(0.45 0.04 75)" }}
            >
              From curing genetic diseases to engineering entire ecosystems —
              CRISPR's reach spans every domain of biology.
            </p>
            <StaggerContainer
              className="grid grid-cols-2 md:grid-cols-3 gap-4"
              staggerDelay={0.07}
            >
              {APP_CARDS.map((card) => (
                <StaggerItem key={card.label}>
                  <div
                    className="rounded-2xl p-5 flex flex-col gap-2 h-full transition-smooth hover:scale-[1.02]"
                    style={{
                      background: `${card.color}0a`,
                      border: `1px solid ${card.color}25`,
                    }}
                  >
                    <span className="text-3xl" aria-hidden="true">
                      {card.icon}
                    </span>
                    <span
                      className="font-display font-bold text-base"
                      style={{ color: card.color }}
                    >
                      {card.label}
                    </span>
                    <span
                      className="text-xs leading-relaxed"
                      style={{ color: "oklch(0.40 0.04 75)" }}
                    >
                      {card.desc}
                    </span>
                  </div>
                </StaggerItem>
              ))}
            </StaggerContainer>
          </div>
        </AnimatedEntrance>

        {/* Quiz */}
        <AnimatedEntrance direction="up" delay={0.05}>
          <div className="mb-4">
            <h3
              className="font-display text-2xl font-bold mb-1"
              style={{ color: TEAL }}
            >
              Test Your CRISPR Knowledge
            </h3>
            <p
              className="text-sm mb-6"
              style={{ color: "oklch(0.45 0.04 75)" }}
            >
              10 questions covering Cas proteins, mechanism, base editing, prime
              editing, clinical applications, and ethics.
            </p>
            <QuizEngine topicId="crispr" questions={CRISPR_QUIZ} />
          </div>
        </AnimatedEntrance>
      </div>
    </section>
  );
}
