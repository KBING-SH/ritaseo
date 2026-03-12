import { motion } from "framer-motion";
import { ImageIcon, Check } from "lucide-react";
import demoPortrait from "@/assets/demo-portrait.png";

// Total cycle: 2s empty → 1.2s drop animation → 3s showing result → 0.3s fade out = ~6.5s
const CYCLE = 6.5;

export function StepUploadAnimation() {
  return (
    <div className="w-full h-full bg-card flex flex-col items-center justify-center p-5 relative overflow-hidden">
      <div className="w-[85%] flex flex-col gap-2">
        <span className="text-[10px] text-body-desc">上传参考图片</span>

        {/* Upload dropzone */}
        <div className="relative w-full aspect-[5/3] rounded-lg border-2 border-dashed border-border/50 flex flex-col items-center justify-center gap-1 bg-muted/10">
          {/* Empty state icon + text */}
          <motion.div
            className="flex flex-col items-center gap-1"
            animate={{ opacity: [1, 1, 1, 0, 0, 0, 0, 1] }}
            transition={{
              duration: CYCLE,
              times: [0, 0.25, 0.28, 0.35, 0.5, 0.85, 0.93, 1],
              repeat: Infinity,
            }}
          >
            <ImageIcon className="w-5 h-5 text-body-desc/40" />
            <span className="text-[9px] text-body-desc/40">单击或拖动图像即可上传</span>
          </motion.div>

          {/* Photo dropping in — starts at ~30% of cycle */}
          <motion.div
            className="absolute inset-2 rounded-md overflow-hidden shadow-md"
            animate={{
              y: [-80, -80, -80, 0, -2, 0, 0, 0, -80],
              opacity: [0, 0, 0, 1, 1, 1, 1, 0, 0],
              scale: [0.8, 0.8, 0.8, 1, 1.01, 1, 1, 0.95, 0.8],
              rotate: [-5, -5, -5, 0, 0, 0, 0, 0, -5],
            }}
            transition={{
              duration: CYCLE,
              times: [0, 0.2, 0.3, 0.48, 0.52, 0.55, 0.88, 0.95, 1],
              ease: "easeOut",
              repeat: Infinity,
            }}
          >
            <img src={demoPortrait} alt="demo" className="w-full h-full object-cover" />
          </motion.div>

          {/* Border highlight on drop */}
          <motion.div
            className="absolute inset-0 rounded-lg border-2 border-primary pointer-events-none"
            animate={{ opacity: [0, 0, 0, 0.7, 0.7, 0] }}
            transition={{
              duration: CYCLE,
              times: [0, 0.3, 0.42, 0.48, 0.6, 0.65],
              repeat: Infinity,
            }}
          />
        </div>

        {/* Upload success message */}
        <motion.div
          className="flex items-center gap-1.5 h-4"
          animate={{ opacity: [0, 0, 0, 1, 1, 0, 0] }}
          transition={{
            duration: CYCLE,
            times: [0, 0.3, 0.5, 0.55, 0.85, 0.93, 1],
            repeat: Infinity,
          }}
        >
          <div className="w-3.5 h-3.5 rounded-full bg-primary/20 flex items-center justify-center">
            <Check className="w-2 h-2 text-primary" />
          </div>
          <span className="text-[9px] text-primary">上传成功</span>
        </motion.div>

        {/* Prompt area */}
        <div className="flex flex-col gap-1">
          <span className="text-[10px] text-body-desc">提示词</span>
          <div className="w-full h-7 rounded-md border border-border/40 bg-muted/10 px-2 flex items-center">
            <span className="text-[9px] text-body-desc/40">请描述你的想法...</span>
          </div>
        </div>
      </div>

      {/* Cursor */}
      <motion.div
        className="absolute w-4 h-4 z-10"
        style={{ top: "28%", left: "58%" }}
        animate={{
          x: [30, 30, 30, 0, 0, 0, 0, 30],
          y: [-30, -30, -30, 15, 15, 15, 15, -30],
          opacity: [0, 0, 0.9, 0.9, 0.9, 0, 0, 0],
        }}
        transition={{
          duration: CYCLE,
          times: [0, 0.2, 0.28, 0.46, 0.5, 0.55, 0.8, 1],
          repeat: Infinity,
        }}
      >
        <svg viewBox="0 0 24 24" fill="none" className="w-4 h-4 drop-shadow">
          <path d="M5 3l14 8-6 2-4 6-4-16z" fill="hsl(var(--title))" stroke="hsl(var(--card))" strokeWidth="1.5" />
        </svg>
      </motion.div>
    </div>
  );
}
