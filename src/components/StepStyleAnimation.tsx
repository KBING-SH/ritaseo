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
  { src: styleCartoon, label: "卡通片" },
  { src: styleClassic, label: "经典的" },
  { src: styleCute, label: "可爱" },
  { src: styleMinimal, label: "极简" },
];

// Cycle: 2s idle on 0 → highlight 2 → highlight 5 → select 3 → hold → reset
const CYCLE = 7;

// Which index gets selected at the end
const TARGET = 3;
// Intermediate hovers
const HOVER_SEQUENCE = [2, 5, TARGET];

export function StepStyleAnimation() {
  return (
    <div className="w-full h-full bg-card relative overflow-hidden flex items-center justify-center">
      <div className="w-full h-full flex flex-col p-[6%] gap-[4%]">
        <p className="text-[0.6em] text-body-desc font-medium leading-none">选择以下风格</p>

        <div className="grid grid-cols-4 gap-[4%] flex-1 min-h-0">
          {STYLES.map((style, i) => (
            <StyleThumbnail key={i} index={i} style={style} />
          ))}
        </div>

        {/* Generate button animation */}
        <motion.div
          className="h-[10%] min-h-[1.4em] rounded-lg flex items-center justify-center"
          animate={{
            backgroundColor: [
              "hsl(var(--muted))",
              "hsl(var(--muted))",
              "hsl(var(--muted))",
              "hsl(var(--primary))",
              "hsl(var(--primary))",
              "hsl(var(--muted))",
            ],
            scale: [1, 1, 1, 1, 1.03, 1],
          }}
          transition={{
            duration: CYCLE,
            times: [0, 0.5, 0.7, 0.75, 0.82, 0.9],
            repeat: Infinity,
          }}
        >
          <motion.span
            className="text-[0.5em] font-medium"
            animate={{
              color: [
                "hsl(var(--body-desc))",
                "hsl(var(--body-desc))",
                "hsl(var(--body-desc))",
                "hsl(var(--primary-foreground))",
                "hsl(var(--primary-foreground))",
                "hsl(var(--body-desc))",
              ],
            }}
            transition={{
              duration: CYCLE,
              times: [0, 0.5, 0.7, 0.75, 0.82, 0.9],
              repeat: Infinity,
            }}
          >
            生成 ⚡
          </motion.span>
        </motion.div>
      </div>

      {/* Cursor */}
      <motion.div
        className="absolute w-4 h-4 z-10"
        animate={{
          // Move cursor: idle → style2 → style5 → style3(target) → button
          left: ["65%", "65%", "65%", "30%", "30%", "50%", "50%"],
          top: ["25%", "25%", "35%", "65%", "35%", "88%", "88%"],
          opacity: [0, 0.9, 0.9, 0.9, 0.9, 0.9, 0],
        }}
        transition={{
          duration: CYCLE,
          times: [0, 0.25, 0.35, 0.48, 0.58, 0.72, 0.85],
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
  // Hover highlights for intermediate steps
  const isHover1 = index === HOVER_SEQUENCE[0];
  const isHover2 = index === HOVER_SEQUENCE[1];

  return (
    <div className="relative flex flex-col items-center gap-[2%]">
      <div className="relative w-full aspect-[4/3] rounded-[0.3em] overflow-hidden">
        <img src={style.src} alt={style.label} className="w-full h-full object-cover" />

        {/* Hover border for intermediate items */}
        {isHover1 && (
          <motion.div
            className="absolute inset-0 rounded-[0.3em] border-2 border-primary/40 pointer-events-none"
            animate={{ opacity: [0, 0, 0.8, 0, 0] }}
            transition={{
              duration: CYCLE,
              times: [0, 0.3, 0.36, 0.42, 1],
              repeat: Infinity,
            }}
          />
        )}
        {isHover2 && (
          <motion.div
            className="absolute inset-0 rounded-[0.3em] border-2 border-primary/40 pointer-events-none"
            animate={{ opacity: [0, 0, 0.8, 0, 0] }}
            transition={{
              duration: CYCLE,
              times: [0, 0.44, 0.5, 0.55, 1],
              repeat: Infinity,
            }}
          />
        )}

        {/* Selected state for target */}
        {isTarget && (
          <>
            <motion.div
              className="absolute inset-0 rounded-[0.3em] border-2 border-primary pointer-events-none"
              animate={{ opacity: [0, 0, 0, 1, 1, 0] }}
              transition={{
                duration: CYCLE,
                times: [0, 0.55, 0.58, 0.62, 0.9, 0.95],
                repeat: Infinity,
              }}
            />
            <motion.div
              className="absolute top-[4%] left-[4%] w-[20%] aspect-square rounded-full bg-primary flex items-center justify-center"
              animate={{ opacity: [0, 0, 0, 1, 1, 0], scale: [0.5, 0.5, 0.5, 1, 1, 0.5] }}
              transition={{
                duration: CYCLE,
                times: [0, 0.55, 0.6, 0.65, 0.9, 0.95],
                repeat: Infinity,
              }}
            >
              <Check className="w-[60%] h-[60%] text-primary-foreground" />
            </motion.div>
          </>
        )}
      </div>
      <motion.span
        className="text-[0.4em] leading-tight truncate w-full text-center"
        animate={
          isTarget
            ? { color: ["hsl(var(--body-desc))", "hsl(var(--body-desc))", "hsl(var(--body-desc))", "hsl(var(--primary))", "hsl(var(--primary))", "hsl(var(--body-desc))"] }
            : {}
        }
        transition={
          isTarget
            ? { duration: CYCLE, times: [0, 0.55, 0.6, 0.65, 0.9, 0.95], repeat: Infinity }
            : undefined
        }
        style={{ color: isTarget ? undefined : "hsl(var(--body-desc))" }}
      >
        {style.label}
      </motion.span>
    </div>
  );
}
