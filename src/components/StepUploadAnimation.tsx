import { motion } from "framer-motion";
import { ImageIcon } from "lucide-react";

export function StepUploadAnimation() {
  return (
    <div className="w-full h-full bg-card flex items-center justify-center p-6 relative overflow-hidden">
      {/* Upload dropzone */}
      <div className="w-[80%] h-[70%] rounded-xl border-2 border-dashed border-border/60 flex flex-col items-center justify-center gap-2 relative">
        <ImageIcon className="w-6 h-6 text-body-desc/50" />
        <span className="text-xs text-body-desc/50">单击或拖动图像即可上传</span>

        {/* Animated photo dropping in */}
        <motion.div
          className="absolute inset-4 rounded-lg overflow-hidden shadow-lg"
          initial={{ y: -120, opacity: 0, scale: 0.7, rotate: -6 }}
          animate={{
            y: [null, -120, 0, -4, 0],
            opacity: [0, 0.6, 1, 1, 1],
            scale: [0.7, 0.75, 1, 1.01, 1],
            rotate: [-6, -3, 0, 0, 0],
          }}
          transition={{
            duration: 1.8,
            times: [0, 0.2, 0.55, 0.75, 1],
            ease: "easeOut",
            repeat: Infinity,
            repeatDelay: 3,
          }}
        >
          {/* Simulated photo with gradient */}
          <div className="w-full h-full bg-gradient-to-br from-sky-100 via-rose-50 to-amber-50 flex items-center justify-center">
            <div className="w-16 h-16 rounded-full bg-gradient-to-br from-amber-200 to-rose-200" />
            <div className="absolute bottom-0 left-0 right-0 h-[40%] bg-gradient-to-t from-emerald-100/80 to-transparent" />
          </div>
        </motion.div>

        {/* Border highlight on drop */}
        <motion.div
          className="absolute inset-0 rounded-xl border-2 border-primary pointer-events-none"
          initial={{ opacity: 0 }}
          animate={{ opacity: [0, 0, 0.6, 0.6, 0] }}
          transition={{
            duration: 1.8,
            times: [0, 0.4, 0.55, 0.8, 1],
            repeat: Infinity,
            repeatDelay: 3,
          }}
        />
      </div>

      {/* Cursor animation */}
      <motion.div
        className="absolute w-5 h-5"
        initial={{ x: 60, y: -40, opacity: 0 }}
        animate={{
          x: [60, 20, 0, 0, 0],
          y: [-40, -20, 10, 10, 10],
          opacity: [0, 0.8, 0.8, 0, 0],
        }}
        transition={{
          duration: 1.8,
          times: [0, 0.2, 0.5, 0.6, 1],
          repeat: Infinity,
          repeatDelay: 3,
        }}
      >
        <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5 drop-shadow-md">
          <path d="M5 3l14 8-6 2-4 6-4-16z" fill="hsl(var(--title))" stroke="white" strokeWidth="1.5" />
        </svg>
      </motion.div>
    </div>
  );
}
