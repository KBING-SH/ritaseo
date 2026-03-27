import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Check, BookOpen, Lightbulb, RotateCcw } from "lucide-react";

type Step =
  | "idle"
  | "showSolution"
  | "highlightStep1"
  | "highlightStep2"
  | "highlightStep3"
  | "showInsight"
  | "tryAnother"
  | "reset";

const SCRIPT: { step: Step; duration: number }[] = [
  { step: "idle", duration: 500 },
  { step: "showSolution", duration: 1200 },
  { step: "highlightStep1", duration: 1400 },
  { step: "highlightStep2", duration: 1400 },
  { step: "highlightStep3", duration: 1400 },
  { step: "showInsight", duration: 2000 },
  { step: "tryAnother", duration: 1200 },
  { step: "reset", duration: 500 },
];

const SOLUTION_STEPS = [
  { text: "∫ x² dx", note: "Apply power rule" },
  { text: "= x^(2+1) / (2+1)", note: "Increase exponent by 1" },
  { text: "= x³/3 + C", note: "Final answer" },
];

export function StepDownloadAnimation({ active = true }: { active?: boolean }) {
  const [stepIndex, setStepIndex] = useState(0);
  const [highlightedStep, setHighlightedStep] = useState<number | null>(null);
  const [showSolution, setShowSolution] = useState(false);
  const [showInsight, setShowInsight] = useState(false);
  const [showTryAnother, setShowTryAnother] = useState(false);
  const [cursorPos, setCursorPos] = useState<[number, number]>([50, 50]);
  const [cursorVisible, setCursorVisible] = useState(false);

  const currentStep = SCRIPT[stepIndex].step;

  useEffect(() => {
    switch (currentStep) {
      case "idle":
        setCursorVisible(false);
        setShowSolution(false);
        setHighlightedStep(null);
        setShowInsight(false);
        setShowTryAnother(false);
        break;
      case "showSolution":
        setShowSolution(true);
        setCursorVisible(true);
        setCursorPos([50, 30]);
        break;
      case "highlightStep1":
        setHighlightedStep(0);
        setCursorPos([65, 32]);
        break;
      case "highlightStep2":
        setHighlightedStep(1);
        setCursorPos([65, 48]);
        break;
      case "highlightStep3":
        setHighlightedStep(2);
        setCursorPos([65, 62]);
        break;
      case "showInsight":
        setShowInsight(true);
        setHighlightedStep(null);
        setCursorPos([50, 82]);
        break;
      case "tryAnother":
        setShowTryAnother(true);
        setCursorPos([50, 92]);
        break;
      case "reset":
        setCursorVisible(false);
        setShowSolution(false);
        setShowInsight(false);
        setShowTryAnother(false);
        setHighlightedStep(null);
        break;
    }

    if (!active) return;

    const timer = setTimeout(() => {
      setStepIndex((prev) => (prev + 1) % SCRIPT.length);
    }, SCRIPT[stepIndex].duration);

    return () => clearTimeout(timer);
  }, [stepIndex, currentStep, active]);

  return (
    <div className="w-full h-full bg-card relative overflow-hidden flex flex-col p-[5%] gap-[3%]">
      {/* Header */}
      <div className="flex items-center gap-[3%] shrink-0">
        <BookOpen className="w-[0.8em] h-[0.8em] text-primary" />
        <span className="text-[0.55em] text-body-desc font-medium">Review & Learn</span>
      </div>

      {/* Solution steps */}
      <div className="flex-1 min-h-0 flex flex-col gap-[3%]">
        {SOLUTION_STEPS.map((s, i) => (
          <motion.div
            key={i}
            className="rounded-md border px-[4%] py-[3%] flex flex-col gap-[2px]"
            animate={{
              opacity: showSolution ? 1 : 0.2,
              borderColor: highlightedStep === i ? "hsl(var(--primary) / 0.6)" : "hsl(var(--border) / 0.3)",
              backgroundColor: highlightedStep === i ? "hsl(var(--primary) / 0.06)" : "transparent",
              scale: highlightedStep === i ? 1.02 : 1,
            }}
            transition={{ duration: 0.3 }}
          >
            <div className="flex items-center gap-[3%]">
              <motion.div
                className="w-[1em] h-[1em] rounded-full flex items-center justify-center shrink-0 text-[0.35em]"
                animate={{
                  backgroundColor: highlightedStep === i || (highlightedStep !== null && highlightedStep > i) 
                    ? "hsl(var(--primary))" 
                    : "hsl(var(--muted))",
                }}
              >
                {(highlightedStep !== null && highlightedStep > i) ? (
                  <Check className="w-[0.7em] h-[0.7em] text-primary-foreground" />
                ) : (
                  <span className="text-[1em] text-muted-foreground font-medium">{i + 1}</span>
                )}
              </motion.div>
              <span className="text-[0.55em] font-mono text-title">{s.text}</span>
            </div>
            <AnimatePresence>
              {highlightedStep === i && (
                <motion.p
                  className="text-[0.4em] text-primary ml-[12%] italic"
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                >
                  💡 {s.note}
                </motion.p>
              )}
            </AnimatePresence>
          </motion.div>
        ))}
      </div>

      {/* Insight tip */}
      <AnimatePresence>
        {showInsight && (
          <motion.div
            className="shrink-0 rounded-md border border-accent/50 bg-accent/10 px-[4%] py-[2.5%] flex items-start gap-[3%]"
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
          >
            <Lightbulb className="w-[0.7em] h-[0.7em] text-primary shrink-0 mt-[1px]" />
            <span className="text-[0.4em] text-body-desc leading-snug">
              The power rule: ∫ xⁿ dx = x^(n+1)/(n+1) + C
            </span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Try another button */}
      <AnimatePresence>
        {showTryAnother && (
          <motion.div
            className="shrink-0 h-[1.8em] rounded-lg flex items-center justify-center gap-[3%] border border-primary/30 bg-primary/5"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
          >
            <RotateCcw className="w-[0.5em] h-[0.5em] text-primary" />
            <span className="text-[0.42em] text-primary font-medium">Try a Similar Problem</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Cursor */}
      <motion.div
        className="absolute w-4 h-4 z-30 pointer-events-none"
        animate={{
          left: `${cursorPos[0]}%`,
          top: `${cursorPos[1]}%`,
          opacity: cursorVisible ? 0.9 : 0,
        }}
        transition={{ type: "tween", duration: 0.5, ease: "easeInOut" }}
      >
        <svg viewBox="0 0 24 24" fill="none" className="w-4 h-4 drop-shadow">
          <path d="M5 3l14 8-6 2-4 6-4-16z" fill="hsl(var(--title))" stroke="hsl(var(--card))" strokeWidth="1.5" />
        </svg>
      </motion.div>
    </div>
  );
}
