import { motion } from "framer-motion";
import { Check } from "lucide-react";

import styleGhibli from "@/assets/style-ghibli.png";
import stylePixel from "@/assets/style-pixel.png";
import styleRealistic from "@/assets/style-realistic.png";
import styleInk from "@/assets/style-ink.png";
import styleCartoon from "@/assets/style-cartoon.png";
import styleClassic from "@/assets/style-classic.png";
import styleCute from "@/assets/style-cute.png";
import styleMinimal from "@/assets/style-minimal.png";

const STYLES = [
  { src: styleGhibli, label: "吉卜力" },
  { src: stylePixel, label: "像素" },
  { src: styleRealistic, label: "写实" },
  { src: styleInk, label: "中国墨" },
  { src: styleCartoon, label: "卡通" },
  { src: styleClassic, label: "经典" },
  { src: styleCute, label: "可爱" },
  { src: styleMinimal, label: "极简" },
];

const CYCLE = 8;
const TARGET = 3;
const HOVER1 = 2;
const HOVER2 = 5;

export function StepStyleAnimation() {
  return (
    <div className="w-full h-full bg-card relative overflow-hidden flex flex-col p-[5%] gap-[2%]">
      <p className="text-[0.55em] text-body-desc font-medium leading-none">选择以下风格</p>

      {/* Style grid - compact */}
      <div className="grid grid-cols-4 gap-[2.5%] flex-1 min-h-0">
        {STYLES.map((style, i) => (
          <StyleThumbnail key={i} index={i} style={style} />
        ))}
      </div>

      {/* Generate button */}
      <motion.div
        className="w-full h-[13%] rounded-lg flex items-center justify-center shrink-0"
        style={{
          background: "linear-gradient(135deg, hsl(var(--primary)), hsl(var(--theme1)))",
        }}
        animate={{
          scale: [1, 1, 1, 1, 0.96, 1.02, 1, 1, 1],
        }}
        transition={{
          duration: CYCLE,
          times: [0, 0.6, 0.62, 0.64, 0.66, 0.68, 0.7, 0.9, 1],
          repeat: Infinity,
        }}
      >
        {/* Normal text */}
        <motion.span
          className="text-[0.5em] font-semibold text-white absolute"
          animate={{ opacity: [1, 1, 1, 0, 0, 1] }}
          transition={{
            duration: CYCLE,
            times: [0, 0.65, 0.68, 0.7, 0.9, 0.95],
            repeat: Infinity,
          }}
        >
          生成 ⚡10
        </motion.span>

        {/* Loading dots */}
        <motion.div
          className="flex items-center gap-[3px] absolute"
          animate={{ opacity: [0, 0, 1, 1, 0] }}
          transition={{
            duration: CYCLE,
            times: [0, 0.7, 0.72, 0.88, 0.92],
            repeat: Infinity,
          }}
        >
          {[0, 0.15, 0.3].map((d) => (
            <motion.div
              key={d}
              className="w-[4px] h-[4px] rounded-full bg-white/80"
              animate={{ scale: [1, 1.5, 1] }}
              transition={{ duration: 0.6, repeat: Infinity, delay: d }}
            />
          ))}
        </motion.div>
      </motion.div>

      {/* Cursor */}
      <motion.div
        className="absolute w-4 h-4 z-10 pointer-events-none"
        animate={{
          left: ["55%", "55%", "55%", "30%", "80%", "50%", "50%"],
          top: ["18%", "18%", "25%", "48%", "25%", "88%", "88%"],
          opacity: [0, 0.9, 0.9, 0.9, 0.9, 0.9, 0],
        }}
        transition={{
          duration: CYCLE,
          times: [0, 0.15, 0.22, 0.32, 0.42, 0.6, 0.7],
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

function StyleThumbnail({ index, style }: { index: number; style: { src: string; label: string } }) {
  const isTarget = index === TARGET;
  const isHover1 = index === HOVER1;
  const isHover2 = index === HOVER2;

  return (
    <div className="relative flex flex-col items-center gap-[2px] min-h-0">
      <div className="relative w-full aspect-[4/3] rounded-[0.2em] overflow-hidden border border-border/30">
        <img
          src={style.src}
          alt={style.label}
          className="w-full h-full object-cover"
          style={{ imageRendering: "auto", transform: "translateZ(0)", backfaceVisibility: "hidden" }}
          draggable={false}
        />

        {isHover1 && (
          <motion.div
            className="absolute inset-0 rounded-[0.2em] border-2 border-primary/40 pointer-events-none"
            animate={{ opacity: [0, 0, 0.8, 0.8, 0, 0] }}
            transition={{ duration: CYCLE, times: [0, 0.18, 0.22, 0.28, 0.32, 1], repeat: Infinity }}
          />
        )}

        {isHover2 && (
          <motion.div
            className="absolute inset-0 rounded-[0.2em] border-2 border-primary/40 pointer-events-none"
            animate={{ opacity: [0, 0, 0.8, 0.8, 0, 0] }}
            transition={{ duration: CYCLE, times: [0, 0.3, 0.34, 0.38, 0.42, 1], repeat: Infinity }}
          />
        )}

        {isTarget && (
          <>
            <motion.div
              className="absolute inset-0 rounded-[0.2em] border-2 border-primary pointer-events-none"
              animate={{ opacity: [0, 0, 0, 1, 1, 0] }}
              transition={{ duration: CYCLE, times: [0, 0.4, 0.44, 0.48, 0.92, 0.97], repeat: Infinity }}
            />
            <motion.div
              className="absolute top-[5%] left-[5%] w-[22%] aspect-square rounded-full bg-primary flex items-center justify-center"
              animate={{ opacity: [0, 0, 0, 1, 1, 0], scale: [0.5, 0.5, 0.5, 1, 1, 0.5] }}
              transition={{ duration: CYCLE, times: [0, 0.4, 0.45, 0.5, 0.92, 0.97], repeat: Infinity }}
            >
              <Check className="w-[55%] h-[55%] text-primary-foreground" />
            </motion.div>
          </>
        )}
      </div>
      <motion.span
        className="text-[0.32em] leading-tight truncate w-full text-center text-body-desc"
        animate={
          isTarget
            ? { color: ["hsl(var(--body-desc))", "hsl(var(--body-desc))", "hsl(var(--body-desc))", "hsl(var(--primary))", "hsl(var(--primary))", "hsl(var(--body-desc))"] }
            : {}
        }
        transition={
          isTarget ? { duration: CYCLE, times: [0, 0.4, 0.45, 0.5, 0.92, 0.97], repeat: Infinity } : undefined
        }
      >
        {style.label}
      </motion.span>
    </div>
  );
}
