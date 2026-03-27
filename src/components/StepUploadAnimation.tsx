import { motion } from "framer-motion";
import { Camera, Type } from "lucide-react";

const CYCLE = 6.5;

const MATH_TEXT = "∫ x² dx = ?";

export function StepUploadAnimation({ active = true }: { active?: boolean }) {
  if (!active) {
    return (
      <div className="w-full h-full bg-card flex items-center justify-center">
        <div className="w-full h-full flex flex-col p-[8%] gap-[6%]">
          <p className="text-[0.65em] text-body-desc font-medium leading-none">Enter your math problem</p>
          <div className="relative flex-1 rounded-lg border-2 border-dashed border-border/60 flex flex-col items-center justify-center gap-[6%] bg-muted/10 min-h-0">
            <Type className="w-[12%] h-[12%] min-w-4 min-h-4 text-body-desc/40" />
            <span className="text-[0.55em] text-body-desc/40">Type or upload a math problem</span>
          </div>
          <div className="flex gap-[4%] mt-auto">
            <div className="flex-1 h-[2em] rounded-md border border-border/40 bg-muted/10 flex items-center justify-center gap-[4px]">
              <Type className="w-[0.5em] h-[0.5em] text-body-desc/40" />
              <span className="text-[0.45em] text-body-desc/40">Type</span>
            </div>
            <div className="flex-1 h-[2em] rounded-md border border-border/40 bg-muted/10 flex items-center justify-center gap-[4px]">
              <Camera className="w-[0.5em] h-[0.5em] text-body-desc/40" />
              <span className="text-[0.45em] text-body-desc/40">Upload Image</span>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full h-full bg-card relative overflow-hidden flex items-center justify-center">
      <div className="w-full h-full flex flex-col p-[8%] gap-[6%]">
        <p className="text-[0.65em] text-body-desc font-medium leading-none">Enter your math problem</p>
        
        {/* Input area */}
        <div className="relative flex-1 rounded-lg border-2 border-dashed border-border/60 flex flex-col items-center justify-center bg-muted/10 min-h-0">
          {/* Placeholder fading out */}
          <motion.div
            className="flex flex-col items-center gap-1"
            animate={{ opacity: [1, 1, 0, 0, 0, 0, 0, 1] }}
            transition={{ duration: CYCLE, times: [0, 0.12, 0.18, 0.5, 0.7, 0.85, 0.93, 1], repeat: Infinity }}
          >
            <Type className="w-[12%] h-[12%] min-w-4 min-h-4 text-body-desc/40" />
            <span className="text-[0.55em] text-body-desc/40">Type or upload a math problem</span>
          </motion.div>

          {/* Math equation typing in */}
          <motion.div
            className="absolute inset-0 flex items-center justify-center"
            animate={{ opacity: [0, 0, 0, 1, 1, 1, 1, 0] }}
            transition={{ duration: CYCLE, times: [0, 0.12, 0.18, 0.25, 0.5, 0.8, 0.92, 1], repeat: Infinity }}
          >
            <motion.div className="text-center px-[8%]">
              <motion.span 
                className="text-[1.2em] font-mono text-title font-semibold"
                animate={{ opacity: [0, 0, 1, 1, 1, 1, 0] }}
                transition={{ duration: CYCLE, times: [0, 0.2, 0.35, 0.5, 0.8, 0.9, 1], repeat: Infinity }}
              >
                {MATH_TEXT}
              </motion.span>
              {/* Blinking cursor */}
              <motion.span
                className="inline-block w-[2px] h-[1.1em] bg-primary ml-1 align-middle"
                animate={{ opacity: [0, 0, 1, 0, 1, 0, 1, 0] }}
                transition={{ duration: 1.2, repeat: Infinity }}
              />
            </motion.div>
          </motion.div>

          {/* Active border highlight */}
          <motion.div
            className="absolute inset-0 rounded-lg border-2 border-primary pointer-events-none"
            animate={{ opacity: [0, 0, 0, 0.7, 0.7, 0, 0] }}
            transition={{ duration: CYCLE, times: [0, 0.15, 0.2, 0.25, 0.8, 0.88, 1], repeat: Infinity }}
          />
        </div>

        {/* Mode buttons */}
        <div className="flex gap-[4%] mt-auto">
          <motion.div 
            className="flex-1 h-[2em] rounded-md border border-border/40 bg-muted/10 flex items-center justify-center gap-[4px]"
            animate={{ 
              borderColor: ["hsl(var(--border) / 0.4)", "hsl(var(--border) / 0.4)", "hsl(var(--primary))", "hsl(var(--primary))", "hsl(var(--border) / 0.4)"],
              backgroundColor: ["transparent", "transparent", "hsl(var(--primary) / 0.08)", "hsl(var(--primary) / 0.08)", "transparent"]
            }}
            transition={{ duration: CYCLE, times: [0, 0.15, 0.2, 0.85, 0.92], repeat: Infinity }}
          >
            <Type className="w-[0.5em] h-[0.5em] text-body-desc" />
            <span className="text-[0.45em] text-body-desc">Type</span>
          </motion.div>
          <div className="flex-1 h-[2em] rounded-md border border-border/40 bg-muted/10 flex items-center justify-center gap-[4px]">
            <Camera className="w-[0.5em] h-[0.5em] text-body-desc/40" />
            <span className="text-[0.45em] text-body-desc/40">Upload Image</span>
          </div>
        </div>
      </div>

      {/* Cursor */}
      <motion.div
        className="absolute w-4 h-4 z-10"
        style={{ top: "45%", left: "55%" }}
        animate={{ 
          x: [20, 20, 0, -10, 0, 0, 20], 
          y: [-20, -20, 0, 5, 0, 0, -20], 
          opacity: [0, 0.9, 0.9, 0.9, 0.9, 0, 0] 
        }}
        transition={{ duration: CYCLE, times: [0, 0.1, 0.18, 0.3, 0.5, 0.55, 1], repeat: Infinity }}
      >
        <svg viewBox="0 0 24 24" fill="none" className="w-4 h-4 drop-shadow">
          <path d="M5 3l14 8-6 2-4 6-4-16z" fill="hsl(var(--title))" stroke="hsl(var(--card))" strokeWidth="1.5" />
        </svg>
      </motion.div>
    </div>
  );
}
