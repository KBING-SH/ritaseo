import { motion } from "framer-motion";
import { ImageIcon, Check } from "lucide-react";
import styleGhibli from "@/assets/style-ghibli.png";

export function StepUploadAnimation() {
  return (
    <div className="w-full h-full bg-card flex flex-col items-center justify-center p-5 relative overflow-hidden">
      {/* Title label */}
      <div className="w-[85%] flex flex-col gap-2">
        <span className="text-[10px] text-body-desc">上传参考图片</span>

        {/* Upload dropzone */}
        <div className="relative w-full aspect-[5/3] rounded-lg border-2 border-dashed border-border/50 flex flex-col items-center justify-center gap-1 bg-muted/10">
          <ImageIcon className="w-5 h-5 text-body-desc/40" />
          <span className="text-[9px] text-body-desc/40">单击或拖动图像即可上传</span>

          {/* Photo dropping in */}
          <motion.div
            className="absolute inset-2 rounded-md overflow-hidden shadow-md"
            initial={{ y: -80, opacity: 0, scale: 0.8, rotate: -4 }}
            animate={{
              y: [-80, 0, -3, 0],
              opacity: [0, 1, 1, 1],
              scale: [0.8, 1, 1.01, 1],
              rotate: [-4, 0, 0, 0],
            }}
            transition={{
              duration: 1.4,
              times: [0, 0.5, 0.7, 1],
              ease: "easeOut",
              repeat: Infinity,
              repeatDelay: 4,
            }}
          >
            <img src={styleGhibli} alt="preview" className="w-full h-full object-cover" />
          </motion.div>

          {/* Border highlight on drop */}
          <motion.div
            className="absolute inset-0 rounded-lg border-2 border-primary pointer-events-none"
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 0, 0.7, 0.7, 0] }}
            transition={{
              duration: 1.4,
              times: [0, 0.35, 0.5, 0.8, 1],
              repeat: Infinity,
              repeatDelay: 4,
            }}
          />
        </div>

        {/* Success state after drop */}
        <motion.div
          className="flex items-center gap-1.5"
          initial={{ opacity: 0 }}
          animate={{ opacity: [0, 0, 0, 1, 1, 1, 0] }}
          transition={{
            duration: 5.4,
            times: [0, 0.1, 0.25, 0.3, 0.7, 0.9, 1],
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
            <motion.span
              className="text-[9px] text-body-desc/40"
              initial={{ opacity: 0.4 }}
              animate={{ opacity: [0.4, 0.4, 0.4, 0.7, 0.7, 0.7, 0.4] }}
              transition={{
                duration: 5.4,
                times: [0, 0.1, 0.25, 0.35, 0.7, 0.9, 1],
                repeat: Infinity,
              }}
            >
              请描述你的想法...
            </motion.span>
          </div>
        </div>
      </div>

      {/* Cursor */}
      <motion.div
        className="absolute w-4 h-4 z-10"
        style={{ top: "30%", left: "55%" }}
        initial={{ opacity: 0 }}
        animate={{
          x: [30, 0, 0, 0, 0],
          y: [-30, 10, 10, 10, 10],
          opacity: [0, 0.9, 0.9, 0, 0],
        }}
        transition={{
          duration: 1.4,
          times: [0, 0.4, 0.6, 0.7, 1],
          repeat: Infinity,
          repeatDelay: 4,
        }}
      >
        <svg viewBox="0 0 24 24" fill="none" className="w-4 h-4 drop-shadow">
          <path d="M5 3l14 8-6 2-4 6-4-16z" fill="hsl(var(--title))" stroke="hsl(var(--card))" strokeWidth="1.5" />
        </svg>
      </motion.div>
    </div>
  );
}
