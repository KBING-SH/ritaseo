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
const CYCLE = 7;
const TARGET = 3; // 中国墨

export function StepStyleAnimation() {
  return (
    <div className="w-full h-full bg-card relative overflow-hidden">
      <div className="w-full h-full flex flex-col px-[7%] py-[5%] gap-[3%]">
        {/* Label */}
        <p className="text-[0.6em] text-body-desc font-medium leading-none shrink-0">选择以下风格</p>

        {/* Style grid */}
        <div className="grid grid-cols-4 gap-x-[3%] gap-y-[4%] shrink-0">
          {STYLES.map((style, i) => (
            <StyleThumbnail key={i} index={i} style={style} />
          ))}
        </div>

        {/* Ratio selector */}
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

        {/* Spacer */}
        <div className="flex-1 min-h-0" />

        {/* Generate button */}
        <motion.div
          className="shrink-0 h-[12%] min-h-[1.6em] rounded-xl flex items-center justify-center"
          style={{
            background: "linear-gradient(135deg, hsl(var(--primary)), hsl(var(--theme1)))",
          }}
          animate={{
            scale: [1, 1, 1, 1, 1.03, 1],
            opacity: [0.85, 0.85, 0.85, 1, 1, 0.85],
          }}
          transition={{
            duration: CYCLE,
            times: [0, 0.6, 0.72, 0.76, 0.82, 0.9],
            repeat: Infinity,
          }}
        >
          <span className="text-[0.55em] font-semibold text-white">生成 ⚡10</span>
        </motion.div>
      </div>

      {/* Cursor */}
      <motion.div
        className="absolute w-4 h-4 z-10"
        animate={{
          left: ["65%", "65%", "65%", "30%", "30%", "50%", "50%"],
          top: ["22%", "22%", "32%", "56%", "32%", "90%", "90%"],
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

        {/* Selected state for target */}
        {isTarget && (
          <>
            <motion.div
              className="absolute inset-0 rounded-[0.25em] border-2 border-primary pointer-events-none"
              animate={{ opacity: [0, 0, 0, 1, 1, 0] }}
              transition={{
                duration: CYCLE,
                times: [0, 0.55, 0.58, 0.62, 0.9, 0.95],
                repeat: Infinity,
              }}
            />
            <motion.div
              className="absolute top-[5%] left-[5%] w-[22%] aspect-square rounded-full bg-primary flex items-center justify-center"
              animate={{ opacity: [0, 0, 0, 1, 1, 0], scale: [0.5, 0.5, 0.5, 1, 1, 0.5] }}
              transition={{
                duration: CYCLE,
                times: [0, 0.55, 0.6, 0.65, 0.9, 0.95],
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
            ? { duration: CYCLE, times: [0, 0.55, 0.6, 0.65, 0.9, 0.95], repeat: Infinity }
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
