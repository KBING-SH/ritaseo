import { useState, useEffect } from "react";
import { StepUploadAnimation } from "./StepUploadAnimation";
import { StepStyleAnimation } from "./StepStyleAnimation";
import { StepDownloadAnimation } from "./StepDownloadAnimation";

const steps = [
  {
    step: "01",
    title: "Type or Upload",
    desc: "Type your math question or upload a screenshot / image of the problem. Supports PNG / JPG / WEBP, up to 20 MB.",
    color: "from-primary to-theme1",
  },
  {
    step: "02",
    title: "AI Solves Step-by-Step",
    desc: "Rita AI analyzes the problem and delivers a clear, step-by-step solution so you can follow the reasoning behind each answer.",
    color: "from-theme1 to-emerald-400",
  },
  {
    step: "03",
    title: "Learn & Review",
    desc: "Review the detailed explanation, understand the method, and apply it to similar problems for deeper learning.",
    color: "from-theme2 to-primary",
  },
];

const DURATIONS = [6500, 10000, 8600];
const COMPONENTS = [StepUploadAnimation, StepStyleAnimation, StepDownloadAnimation];

export function HowItWorks() {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => {
      setActiveIndex((prev) => (prev + 1) % 3);
    }, DURATIONS[activeIndex]);

    return () => clearTimeout(timer);
  }, [activeIndex]);

  return (
    <section className="py-8 md:py-12">
      <div className="max-w-[1500px] mx-auto px-4 md:px-8">
        <h2 className="text-xl md:text-3xl font-bold text-title text-center mb-2 md:mb-3">How to Solve Math Problems in 3 Steps</h2>
        <p className="text-sm md:text-base text-body-desc text-center mb-6 md:mb-12">Type or upload a problem, get step-by-step solutions, and learn the method behind every answer</p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
          {steps.map((s, i) => {
            const Component = COMPONENTS[i];
            const isActive = activeIndex === i;

            return (
              <div
                key={s.step}
                className={`group rounded-xl border bg-card shadow-soft hover:shadow-soft-lg transition-all duration-300 cursor-pointer hover:bg-hover-bg overflow-hidden ${
                  isActive ? "border-primary/30" : "border-border/50"
                }`}
              >
                <div className="w-full aspect-[8/5] overflow-hidden bg-muted/30">
                  <Component key={isActive ? `active-${activeIndex}` : `idle-${i}`} active={isActive} />
                </div>
                <div className="p-4 md:p-6">
                  <div className="flex items-center gap-3 mb-3">
                    <div className={`inline-flex items-center justify-center h-10 w-10 rounded-xl bg-gradient-to-br ${s.color} shrink-0`}>
                      <span className="text-sm font-bold text-white">{s.step}</span>
                    </div>
                    <h3 className="text-lg font-semibold text-title">{s.title}</h3>
                  </div>
                  <p className="text-sm text-body-desc leading-relaxed">{s.desc}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
