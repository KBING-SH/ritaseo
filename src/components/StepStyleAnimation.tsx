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
  { src: styleGhibli, label: "吉卜力工作室" },
  { src: stylePixel, label: "像素" },
  { src: styleRealistic, label: "写实艺术" },
  { src: styleInk, label: "中国墨" },
  { src: styleCartoon, label: "卡通片" },
  { src: styleClassic, label: "经典的" },
  { src: styleCute, label: "可爱" },
  { src: styleMinimal, label: "极简主义者" },
];

const RATIOS = ["1:1", "2:3", "3:2"];

// Timeline (8s total):
// 0-1.5s: idle, cursor appears
// 1.5-2.2s: cursor moves to style 2 (写实), hover border appears
// 2.2-3s: cursor moves to style 5 (经典), hover border appears  
// 3-4s: cursor moves to style 3 (中国墨), click & select
// 4-5s: cursor moves down to generate button
// 5-5.5s: button press animation
// 5.5-7s: loading/generating state
// 7-8s: fade out & reset
const CYCLE = 8;
const TARGET = 3;
const HOVER1 = 2;
const HOVER2 = 5;

export function StepStyleAnimation() {
  return (
    <div className="w-full h-full bg-card relative overflow-hidden">
      <div className="w-full h-full flex flex-col px-[7%] py-[5%] gap-[3%]">
        <p className="text-[0.6em] text-body-desc font-medium leading-none shrink-0">选择以下风格</p>

        <div className="grid grid-cols-4 gap-x-[3%] gap-y-[4%] shrink-0">
          {STYLES.map((style, i) => (
            <StyleThumbnail key={i} index={i} style={style} />
          ))}
        </div>

        <div className="shrink-0">
          <p className="text-[0.5em] text-body-desc mb-[3%] leading-none">比例</p>
          <div className="flex gap-[3%]">
            {RATIOS.map((r, i) => (
              <div
                key={r}
                className={`flex items-center gap-[4px] px-[6%] py-[2%] rounded-full border text-[0.42em] font-medium ${
                  i === 0
                    ? "border-primary/30 bg-primary/10 text-primary"
                    : "border-border/50 text-body-desc"
                }`}
              >
                <RatioIcon ratio={r} active={i === 0} />
                {r}
              </div>
            ))}
          </div>
        </div>

        <div className="flex-1 min-h-0" />

        {/* Generate button with press & loading animation */}
        <motion.div
          className="shrink-0 h-[12%] min-h-[1.6em] rounded-xl flex items-center justify-center relative overflow-hidden"
          style={{
            background: "linear-gradient(135deg, hsl(var(--primary)), hsl(var(--theme1)))",
          }}
          animate={{
            scale: [1, 1, 1, 1, 0.96, 1.02, 1, 1, 1],
          }}
          transition={{
            duration: CYCLE,
            // idle...cursor arrives...press down...release...hold...reset
            times: [0, 0.6, 0.62, 0.64, 0.66, 0.68, 0.7, 0.9, 1],
            repeat: Infinity,
          }}
        >
          {/* Normal text */}
          <motion.span
            className="text-[0.55em] font-semibold text-white"
            animate={{
              opacity: [1, 1, 1, 1, 0, 0, 0, 1],
            }}
            transition={{
              duration: CYCLE,
              times: [0, 0.6, 0.65, 0.68, 0.7, 0.85, 0.92, 1],
              repeat: Infinity,
            }}
          >
            生成 ⚡10
          </motion.span>

          {/* Loading spinner */}
          <motion.div
            className="absolute inset-0 flex items-center justify-center gap-[4px]"
            animate={{
              opacity: [0, 0, 0, 1, 1, 0],
            }}
            transition={{
              duration: CYCLE,
              times: [0, 0.68, 0.7, 0.72, 0.88, 0.92],
              repeat: Infinity,
            }}
          >
            <motion.div
              className="w-[4px] h-[4px] rounded-full bg-white/80"
              animate={{ scale: [1, 1.5, 1] }}
              transition={{ duration: 0.6, repeat: Infinity, delay: 0 }}
            />
            <motion.div
              className="w-[4px] h-[4px] rounded-full bg-white/80"
              animate={{ scale: [1, 1.5, 1] }}
              transition={{ duration: 0.6, repeat: Infinity, delay: 0.15 }}
            />
            <motion.div
              className="w-[4px] h-[4px] rounded-full bg-white/80"
              animate={{ scale: [1, 1.5, 1] }}
              transition={{ duration: 0.6, repeat: Infinity, delay: 0.3 }}
            />
          </motion.div>
        </motion.div>
      </div>

      {/* Cursor */}
      <motion.div
        className="absolute w-4 h-4 z-10 pointer-events-none"
        animate={{
          // idle → hover1(写实,col3) → hover2(经典,col2row2) → target(中国墨,col4row1) → button → hide
          left: ["60%", "60%", "60%", "30%", "80%", "50%", "50%"],
          top: ["20%", "20%", "28%", "52%", "28%", "90%", "90%"],
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
    <div className="relative flex flex-col items-center gap-[3px]">
      <div className="relative w-full aspect-[4/3] rounded-[0.25em] overflow-hidden border border-border/30">
        <img
          src={style.src}
          alt={style.label}
          className="w-full h-full object-cover"
          style={{ imageRendering: "auto", transform: "translateZ(0)", backfaceVisibility: "hidden" }}
          draggable={false}
        />

        {/* Hover border for style 2 (写实) */}
        {isHover1 && (
          <motion.div
            className="absolute inset-0 rounded-[0.25em] border-2 border-primary/40 pointer-events-none"
            animate={{ opacity: [0, 0, 0.8, 0.8, 0, 0] }}
            transition={{
              duration: CYCLE,
              times: [0, 0.18, 0.22, 0.28, 0.32, 1],
              repeat: Infinity,
            }}
          />
        )}

        {/* Hover border for style 5 (经典) */}
        {isHover2 && (
          <motion.div
            className="absolute inset-0 rounded-[0.25em] border-2 border-primary/40 pointer-events-none"
            animate={{ opacity: [0, 0, 0.8, 0.8, 0, 0] }}
            transition={{
              duration: CYCLE,
              times: [0, 0.3, 0.34, 0.38, 0.42, 1],
              repeat: Infinity,
            }}
          />
        )}

        {/* Selected state for target (中国墨) */}
        {isTarget && (
          <>
            <motion.div
              className="absolute inset-0 rounded-[0.25em] border-2 border-primary pointer-events-none"
              animate={{ opacity: [0, 0, 0, 1, 1, 0] }}
              transition={{
                duration: CYCLE,
                times: [0, 0.4, 0.44, 0.48, 0.92, 0.97],
                repeat: Infinity,
              }}
            />
            <motion.div
              className="absolute top-[5%] left-[5%] w-[22%] aspect-square rounded-full bg-primary flex items-center justify-center"
              animate={{ opacity: [0, 0, 0, 1, 1, 0], scale: [0.5, 0.5, 0.5, 1, 1, 0.5] }}
              transition={{
                duration: CYCLE,
                times: [0, 0.4, 0.45, 0.5, 0.92, 0.97],
                repeat: Infinity,
              }}
            >
              <Check className="w-[55%] h-[55%] text-primary-foreground" />
            </motion.div>
          </>
        )}
      </div>
      <motion.span
        className="text-[0.38em] leading-tight truncate w-full text-center text-body-desc"
        animate={
          isTarget
            ? { color: ["hsl(var(--body-desc))", "hsl(var(--body-desc))", "hsl(var(--body-desc))", "hsl(var(--primary))", "hsl(var(--primary))", "hsl(var(--body-desc))"] }
            : {}
        }
        transition={
          isTarget
            ? { duration: CYCLE, times: [0, 0.4, 0.45, 0.5, 0.92, 0.97], repeat: Infinity }
            : undefined
        }
      >
        {style.label}
      </motion.span>
    </div>
  );
}

function RatioIcon({ ratio, active }: { ratio: string; active: boolean }) {
  const color = active ? "hsl(var(--primary))" : "hsl(var(--body-desc))";
  const [w, h] = ratio === "1:1" ? [8, 8] : ratio === "2:3" ? [6, 9] : [9, 6];
  return (
    <svg width="10" height="10" viewBox="0 0 12 12" fill="none">
      <rect x={(12 - w) / 2} y={(12 - h) / 2} width={w} height={h} rx="1" stroke={color} strokeWidth="1" fill="none" />
    </svg>
  );
}
