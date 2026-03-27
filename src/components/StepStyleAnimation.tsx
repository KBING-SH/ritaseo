import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Check, Loader2 } from "lucide-react";

const STEPS_DATA = [
  { label: "Analyze problem", icon: "🔍" },
  { label: "Apply integration rule", icon: "📐" },
  { label: "Compute antiderivative", icon: "🧮" },
  { label: "Simplify result", icon: "✅" },
];

type Step =
  | { type: "idle" }
  | { type: "showProblem" }
  | { type: "step"; index: number }
  | { type: "complete"; index: number }
  | { type: "showResult" }
  | { type: "reset" };

const SCRIPT: { step: Step; duration: number }[] = [
  { step: { type: "idle" }, duration: 600 },
  { step: { type: "showProblem" }, duration: 1200 },
  { step: { type: "step", index: 0 }, duration: 1200 },
  { step: { type: "complete", index: 0 }, duration: 400 },
  { step: { type: "step", index: 1 }, duration: 1400 },
  { step: { type: "complete", index: 1 }, duration: 400 },
  { step: { type: "step", index: 2 }, duration: 1200 },
  { step: { type: "complete", index: 2 }, duration: 400 },
  { step: { type: "step", index: 3 }, duration: 1000 },
  { step: { type: "complete", index: 3 }, duration: 400 },
  { step: { type: "showResult" }, duration: 2000 },
  { step: { type: "reset" }, duration: 500 },
];

export function StepStyleAnimation({ active = true }: { active?: boolean }) {
  const [stepIndex, setStepIndex] = useState(0);
  const [completedSteps, setCompletedSteps] = useState<number[]>([]);
  const [activeStep, setActiveStep] = useState<number | null>(null);
  const [showProblem, setShowProblem] = useState(false);
  const [showResult, setShowResult] = useState(false);

  useEffect(() => {
    const entry = SCRIPT[stepIndex];
    const { step } = entry;

    switch (step.type) {
      case "idle":
        setCompletedSteps([]);
        setActiveStep(null);
        setShowProblem(false);
        setShowResult(false);
        break;
      case "showProblem":
        setShowProblem(true);
        break;
      case "step":
        setActiveStep(step.index);
        break;
      case "complete":
        setCompletedSteps(prev => [...prev, step.index]);
        setActiveStep(null);
        break;
      case "showResult":
        setShowResult(true);
        break;
      case "reset":
        setShowProblem(false);
        setShowResult(false);
        setCompletedSteps([]);
        setActiveStep(null);
        break;
    }

    if (!active) return;

    const timer = setTimeout(() => {
      setStepIndex((prev) => (prev + 1) % SCRIPT.length);
    }, entry.duration);

    return () => clearTimeout(timer);
  }, [stepIndex, active]);

  return (
    <div className="w-full h-full bg-card relative overflow-hidden flex flex-col p-[5%] gap-[3%]">
      {/* Problem display */}
      <div className="shrink-0">
        <p className="text-[0.5em] text-body-desc font-medium leading-none mb-[3%]">Problem</p>
        <motion.div
          className="rounded-md border border-border/40 bg-muted/10 px-[4%] py-[3%] min-h-[2em] flex items-center"
          animate={{ borderColor: showProblem ? "hsl(var(--primary) / 0.4)" : "hsl(var(--border) / 0.4)" }}
        >
          <AnimatePresence>
            {showProblem && (
              <motion.span
                className="text-[0.65em] font-mono text-title font-semibold"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                ∫ x² dx = ?
              </motion.span>
            )}
          </AnimatePresence>
        </motion.div>
      </div>

      {/* Steps progress */}
      <div className="flex-1 min-h-0 flex flex-col gap-[3%]">
        <p className="text-[0.5em] text-body-desc font-medium leading-none">AI Solving Steps</p>
        <div className="flex flex-col gap-[4%]">
          {STEPS_DATA.map((s, i) => {
            const isCompleted = completedSteps.includes(i);
            const isActive = activeStep === i;
            const isVisible = showProblem && (isCompleted || isActive || completedSteps.length > i);

            return (
              <motion.div
                key={i}
                className="flex items-center gap-[3%] rounded-md border px-[4%] py-[2.5%]"
                animate={{
                  opacity: isVisible ? 1 : 0.3,
                  borderColor: isActive ? "hsl(var(--primary) / 0.5)" : isCompleted ? "hsl(var(--primary) / 0.2)" : "hsl(var(--border) / 0.3)",
                  backgroundColor: isActive ? "hsl(var(--primary) / 0.05)" : "transparent",
                }}
                transition={{ duration: 0.3 }}
              >
                {isCompleted ? (
                  <motion.div
                    className="w-[1.1em] h-[1.1em] rounded-full bg-primary flex items-center justify-center shrink-0"
                    initial={{ scale: 0.5 }}
                    animate={{ scale: 1 }}
                  >
                    <Check className="w-[0.6em] h-[0.6em] text-primary-foreground" />
                  </motion.div>
                ) : isActive ? (
                  <Loader2 className="w-[1.1em] h-[1.1em] text-primary animate-spin shrink-0" />
                ) : (
                  <span className="text-[0.6em] shrink-0">{s.icon}</span>
                )}
                <span
                  className="text-[0.42em] leading-tight truncate"
                  style={{ color: isCompleted ? "hsl(var(--primary))" : isActive ? "hsl(var(--title))" : "hsl(var(--body-desc))" }}
                >
                  {s.label}
                </span>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Result */}
      <AnimatePresence>
        {showResult && (
          <motion.div
            className="shrink-0 rounded-md border border-primary/30 bg-primary/5 px-[4%] py-[3%]"
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
          >
            <p className="text-[0.45em] text-primary font-medium mb-[2%]">Solution</p>
            <p className="text-[0.7em] font-mono text-title font-semibold">∫ x² dx = x³/3 + C</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
