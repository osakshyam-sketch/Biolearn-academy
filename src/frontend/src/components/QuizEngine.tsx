import { Button } from "@/components/ui/button";
import type { QuizQuestion, TopicId } from "@/types/biology";
import { TOPICS } from "@/types/biology";
import {
  CheckCircle,
  ChevronRight,
  RotateCcw,
  Trophy,
  XCircle,
} from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useEffect, useId, useRef, useState } from "react";

interface QuizEngineProps {
  topicId: TopicId;
  questions: QuizQuestion[];
}

type Phase = "quiz" | "result";

function getAccentOklch(color: string): string {
  if (color === "biomolecule") return "0.72 0.18 142";
  if (color === "cell") return "0.68 0.19 262";
  if (color === "dna") return "0.70 0.20 290";
  return "0.68 0.22 36";
}

export function QuizEngine({ topicId, questions }: QuizEngineProps) {
  const topic = TOPICS.find((t) => t.id === topicId)!;
  const [phase, setPhase] = useState<Phase>("quiz");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<(number | null)[]>(
    Array(questions.length).fill(null),
  );
  const [selected, setSelected] = useState<number | null>(null);
  const [showFeedback, setShowFeedback] = useState(false);

  const questionId = useId();
  const feedbackId = useId();
  const scoreId = useId();
  const firstOptionRef = useRef<HTMLButtonElement>(null);

  const current = questions[currentIndex];
  const score = answers.filter(
    (a, i) => a === questions[i].correctIndex,
  ).length;
  const accentOklch = getAccentOklch(topic.color);

  // Move focus to first answer option when question changes
  useEffect(() => {
    if (phase === "quiz" && !showFeedback) {
      const timer = setTimeout(() => {
        firstOptionRef.current?.focus();
      }, 400);
      return () => clearTimeout(timer);
    }
  }, [phase, showFeedback]);

  function handleSelect(idx: number) {
    if (showFeedback) return;
    setSelected(idx);
    setShowFeedback(true);
    const newAnswers = [...answers];
    newAnswers[currentIndex] = idx;
    setAnswers(newAnswers);
  }

  function handleKeyDown(e: React.KeyboardEvent, idx: number) {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      handleSelect(idx);
    }
  }

  function handleNext() {
    if (currentIndex < questions.length - 1) {
      setCurrentIndex((prev) => prev + 1);
      setSelected(null);
      setShowFeedback(false);
    } else {
      setPhase("result");
    }
  }

  function handleRetake() {
    setPhase("quiz");
    setCurrentIndex(0);
    setAnswers(Array(questions.length).fill(null));
    setSelected(null);
    setShowFeedback(false);
  }

  const percentage = Math.round((score / questions.length) * 100);
  const progressValue = Math.round(
    ((currentIndex + 1) / questions.length) * 100,
  );

  const resultLabel =
    percentage >= 80
      ? "Excellent!"
      : percentage >= 60
        ? "Good work!"
        : "Keep learning!";

  return (
    <div
      className="rounded-2xl border p-6"
      style={{
        borderColor: `oklch(${accentOklch} / 0.3)`,
        background: "oklch(0.18 0 0)",
      }}
    >
      <div className="mb-5 flex items-center gap-3">
        <Trophy
          className="h-5 w-5"
          aria-hidden="true"
          style={{ color: `oklch(${accentOklch})` }}
        />
        <h3 className={`font-display text-xl font-bold ${topic.accentClass}`}>
          Knowledge Quiz
        </h3>
        <span
          className="ml-auto text-sm text-muted-foreground"
          aria-live="polite"
          aria-atomic="true"
        >
          {phase === "quiz"
            ? `Question ${currentIndex + 1} of ${questions.length}`
            : `Score: ${score} out of ${questions.length}`}
        </span>
      </div>

      <AnimatePresence mode="wait">
        {phase === "quiz" ? (
          <motion.div
            key={`q-${currentIndex}`}
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -40 }}
            transition={{ duration: 0.35 }}
          >
            {/* Progress bar — label + meter conveys progress accessibly */}
            <div className="mb-6">
              <span className="sr-only">
                Quiz progress: {progressValue}% complete
              </span>
              <div className="h-1.5 rounded-full bg-muted" aria-hidden="true">
                <motion.div
                  className="h-1.5 rounded-full"
                  style={{ background: `oklch(${accentOklch})` }}
                  initial={{
                    width: `${(currentIndex / questions.length) * 100}%`,
                  }}
                  animate={{ width: `${progressValue}%` }}
                  transition={{ duration: 0.4 }}
                />
              </div>
            </div>

            <p
              id={questionId}
              className="mb-6 text-lg font-medium leading-relaxed text-foreground"
            >
              {current.question}
            </p>

            {/* Answer options as accessible buttons in a fieldset group */}
            <fieldset
              aria-labelledby={questionId}
              className="grid gap-3 border-none p-0 m-0"
            >
              <legend className="sr-only">{current.question}</legend>
              {current.options.map((option, idx) => {
                let bg = "oklch(0.22 0 0)";
                let border = "oklch(0.28 0 0)";
                let textColor = "oklch(0.85 0 0)";
                let feedbackSuffix = "";

                if (showFeedback) {
                  if (idx === current.correctIndex) {
                    bg = "oklch(0.72 0.18 142 / 0.15)";
                    border = "oklch(0.72 0.18 142)";
                    textColor = "oklch(0.72 0.18 142)";
                    feedbackSuffix = " — Correct answer";
                  } else if (idx === selected && idx !== current.correctIndex) {
                    bg = "oklch(0.65 0.19 22 / 0.15)";
                    border = "oklch(0.65 0.19 22)";
                    textColor = "oklch(0.65 0.19 22)";
                    feedbackSuffix = " — Incorrect";
                  }
                } else if (idx === selected) {
                  bg = `oklch(${accentOklch} / 0.15)`;
                  border = `oklch(${accentOklch})`;
                  textColor = `oklch(${accentOklch})`;
                }

                const isFirstOption = idx === 0;
                const isSelected = idx === selected;

                return (
                  <motion.button
                    key={`opt-${option.slice(0, 20)}`}
                    ref={isFirstOption ? firstOptionRef : undefined}
                    type="button"
                    aria-pressed={isSelected}
                    aria-label={`${String.fromCharCode(65 + idx)}: ${option}${feedbackSuffix}`}
                    onClick={() => handleSelect(idx)}
                    onKeyDown={(e) => handleKeyDown(e, idx)}
                    whileHover={!showFeedback ? { scale: 1.01 } : {}}
                    whileTap={!showFeedback ? { scale: 0.99 } : {}}
                    data-ocid={`quiz-option-${idx}`}
                    disabled={
                      showFeedback &&
                      idx !== current.correctIndex &&
                      idx !== selected
                    }
                    className="flex items-center gap-3 rounded-xl px-4 py-3 text-left text-sm font-medium transition-smooth cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:opacity-40"
                    style={{
                      background: bg,
                      border: `1px solid ${border}`,
                      color: textColor,
                      // @ts-expect-error CSS custom property
                      "--tw-ring-color": `oklch(${accentOklch})`,
                      "--tw-ring-offset-color": "oklch(0.18 0 0)",
                    }}
                  >
                    <span
                      className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full border text-xs font-bold"
                      style={{ borderColor: border }}
                      aria-hidden="true"
                    >
                      {String.fromCharCode(65 + idx)}
                    </span>
                    <span className="flex-1">{option}</span>
                    {showFeedback && idx === current.correctIndex && (
                      <>
                        <CheckCircle
                          className="h-4 w-4 shrink-0"
                          aria-hidden="true"
                        />
                        <span className="sr-only">Correct</span>
                      </>
                    )}
                    {showFeedback &&
                      idx === selected &&
                      idx !== current.correctIndex && (
                        <>
                          <XCircle
                            className="h-4 w-4 shrink-0"
                            aria-hidden="true"
                          />
                          <span className="sr-only">Incorrect</span>
                        </>
                      )}
                  </motion.button>
                );
              })}
            </fieldset>

            {/* Live feedback announced to screen readers */}
            <div
              id={feedbackId}
              aria-live="polite"
              aria-atomic="true"
              className="sr-only"
            >
              {showFeedback
                ? selected === current.correctIndex
                  ? `Correct! ${current.explanation}`
                  : `Incorrect. The correct answer is ${current.options[current.correctIndex]}. ${current.explanation}`
                : ""}
            </div>

            <AnimatePresence>
              {showFeedback && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-4 rounded-xl p-4"
                  style={{
                    background: "oklch(0.20 0 0)",
                    border: "1px solid oklch(0.30 0 0)",
                  }}
                >
                  <div className="flex items-start gap-2 mb-2">
                    {selected === current.correctIndex ? (
                      <>
                        <CheckCircle
                          className="h-4 w-4 mt-0.5 shrink-0"
                          style={{ color: "oklch(0.72 0.18 142)" }}
                          aria-hidden="true"
                        />
                        <span
                          className="text-sm font-semibold"
                          style={{ color: "oklch(0.72 0.18 142)" }}
                        >
                          ✓ Correct!
                        </span>
                      </>
                    ) : (
                      <>
                        <XCircle
                          className="h-4 w-4 mt-0.5 shrink-0"
                          style={{ color: "oklch(0.65 0.19 22)" }}
                          aria-hidden="true"
                        />
                        <span
                          className="text-sm font-semibold"
                          style={{ color: "oklch(0.65 0.19 22)" }}
                        >
                          ✗ Incorrect
                        </span>
                      </>
                    )}
                  </div>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    <span className="font-semibold text-foreground">
                      Explanation:{" "}
                    </span>
                    {current.explanation}
                  </p>
                  <Button
                    onClick={handleNext}
                    size="sm"
                    className="mt-3 gap-2"
                    aria-label={
                      currentIndex < questions.length - 1
                        ? "Next question"
                        : "See results"
                    }
                    style={{
                      background: `oklch(${accentOklch})`,
                      color: "oklch(0.10 0 0)",
                    }}
                    data-ocid="quiz-next-btn"
                  >
                    {currentIndex < questions.length - 1
                      ? "Next Question"
                      : "See Results"}
                    <ChevronRight className="h-4 w-4" aria-hidden="true" />
                  </Button>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        ) : (
          <motion.div
            key="result"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="flex flex-col items-center py-6 text-center"
          >
            {/* Assertive live region announces final score */}
            <div
              id={scoreId}
              aria-live="assertive"
              aria-atomic="true"
              className="sr-only"
            >
              {`Quiz complete. ${resultLabel} You scored ${score} out of ${questions.length}, ${percentage} percent correct.`}
            </div>

            <motion.div
              animate={{ scale: [1, 1.1, 1] }}
              transition={{ duration: 1.5, repeat: Number.POSITIVE_INFINITY }}
              className="mb-4 text-6xl"
              aria-hidden="true"
            >
              {percentage >= 80 ? "🏆" : percentage >= 60 ? "🎯" : "📚"}
            </motion.div>
            <div
              className={`font-display text-5xl font-bold ${topic.accentClass} ${topic.glowClass} mb-2`}
              aria-hidden="true"
            >
              {score}/{questions.length}
            </div>
            <p className="mb-1 text-xl font-semibold text-foreground">
              {resultLabel}
            </p>
            <p className="mb-6 text-muted-foreground">
              {percentage}% correct answers
            </p>
            <Button
              onClick={handleRetake}
              variant="outline"
              className="gap-2 border-muted-foreground/30"
              aria-label="Retake quiz"
              data-ocid="quiz-retake-btn"
            >
              <RotateCcw className="h-4 w-4" aria-hidden="true" />
              Retake Quiz
            </Button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
