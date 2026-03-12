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

// Timeline (10s):
// 0-1s: idle
// 1-2s: cursor moves to 中国墨(3), select it (border+check appear)
// 2-3.5s: hold on 中国墨
// 3.5-4.5s: cursor moves to 像素(1), 中国墨 deselects, 像素 selects
// 4.5-6s: hold on 像素
// 6-7s: cursor moves to 卡通(4), 像素 deselects, 卡通 selects
// 7-8s: cursor moves to generate button
// 8-8.5s: button press
// 8.5-9.5s: loading
// 9.5-10s: reset
const CYCLE = 10;

// Selection sequence: 中国墨(3) → 像素(1) → 卡通(4)
const SEL1 = 3; // 中国墨
const SEL2 = 1; // 像素
const SEL3 = 4; // 卡通 (final)

export function StepStyleAnimation() {
  return (
    <div className="w-full h-full bg-card relative overflow-hidden flex flex-col p-[5%] gap-[2%]">
      <p className="text-[0.55em] text-body-desc font-medium leading-none">选择以下风格</p>

      <div className="grid grid-cols-4 gap-[2.5%] flex-1 min-h-0">
        {STYLES.map((style, i) => (
          <StyleThumbnail key={i} index={i} style={style} />
        ))}
      </div>

      {/* Generate button */}
      <motion.div
        className="w-full h-[13%] rounded-lg flex items-center justify-center shrink-0 relative"
        style={{
          background: "linear-gradient(135deg, hsl(var(--primary)), hsl(var(--theme1)))",
        }}
        animate={{
          scale: [1, 1, 1, 0.95, 1.03, 1, 1, 1],
        }}
        transition={{
          duration: CYCLE,
          times: [0, 0.78, 0.8, 0.82, 0.84, 0.86, 0.95, 1],
          repeat: Infinity,
        }}
      >
        <motion.span
          className="text-[0.5em] font-semibold text-white"
          animate={{ opacity: [1, 1, 0, 0, 1] }}
          transition={{
            duration: CYCLE,
            times: [0, 0.84, 0.86, 0.94, 0.97],
            repeat: Infinity,
          }}
        >
          生成 ⚡10
        </motion.span>
        <motion.div
          className="flex items-center gap-[3px] absolute"
          animate={{ opacity: [0, 0, 1, 1, 0] }}
          transition={{
            duration: CYCLE,
            times: [0, 0.86, 0.87, 0.93, 0.96],
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
          // idle → 中国墨(col4,row1) → hold → 像素(col2,row1) → hold → 卡通(col1,row2) → button → hide
          left: ["50%", "82%", "82%", "30%", "30%", "12%", "12%", "50%", "50%"],
          top: ["15%", "22%", "22%", "22%", "22%", "50%", "50%", "88%", "88%"],
          opacity: [0, 0.9, 0.9, 0.9, 0.9, 0.9, 0.9, 0.9, 0],
        }}
        transition={{
          duration: CYCLE,
          times: [0, 0.12, 0.2, 0.38, 0.45, 0.62, 0.7, 0.78, 0.86],
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
  // Each selection has: appear time, hold, disappear time
  // SEL1 中国墨(3): selected 0.15-0.40
  // SEL2 像素(1): selected 0.40-0.65
  // SEL3 卡通(4): selected 0.65-0.97
  const isSel1 = index === SEL1;
  const isSel2 = index === SEL2;
  const isSel3 = index === SEL3;

  let borderAnim: { opacity: number[] } | undefined;
  let borderTimes: number[] | undefined;
  let checkAnim: { opacity: number[]; scale: number[] } | undefined;
  let checkTimes: number[] | undefined;
  let labelAnim: { color: string[] } | undefined;
  let labelTimes: number[] | undefined;

  if (isSel1) {
    borderAnim = { opacity: [0, 0, 1, 1, 0, 0] };
    borderTimes = [0, 0.13, 0.16, 0.38, 0.41, 1];
    checkAnim = { opacity: [0, 0, 1, 1, 0, 0], scale: [0.5, 0.5, 1, 1, 0.5, 0.5] };
    checkTimes = [0, 0.14, 0.18, 0.36, 0.4, 1];
    labelAnim = { color: ["hsl(var(--body-desc))", "hsl(var(--body-desc))", "hsl(var(--primary))", "hsl(var(--primary))", "hsl(var(--body-desc))", "hsl(var(--body-desc))"] };
    labelTimes = [0, 0.14, 0.18, 0.36, 0.4, 1];
  } else if (isSel2) {
    borderAnim = { opacity: [0, 0, 1, 1, 0, 0] };
    borderTimes = [0, 0.39, 0.42, 0.63, 0.66, 1];
    checkAnim = { opacity: [0, 0, 1, 1, 0, 0], scale: [0.5, 0.5, 1, 1, 0.5, 0.5] };
    checkTimes = [0, 0.4, 0.44, 0.61, 0.65, 1];
    labelAnim = { color: ["hsl(var(--body-desc))", "hsl(var(--body-desc))", "hsl(var(--primary))", "hsl(var(--primary))", "hsl(var(--body-desc))", "hsl(var(--body-desc))"] };
    labelTimes = [0, 0.4, 0.44, 0.61, 0.65, 1];
  } else if (isSel3) {
    borderAnim = { opacity: [0, 0, 1, 1, 0] };
    borderTimes = [0, 0.64, 0.67, 0.95, 0.98];
    checkAnim = { opacity: [0, 0, 1, 1, 0], scale: [0.5, 0.5, 1, 1, 0.5] };
    checkTimes = [0, 0.65, 0.69, 0.93, 0.97];
    labelAnim = { color: ["hsl(var(--body-desc))", "hsl(var(--body-desc))", "hsl(var(--primary))", "hsl(var(--primary))", "hsl(var(--body-desc))"] };
    labelTimes = [0, 0.65, 0.69, 0.93, 0.97];
  }

  const hasAnim = isSel1 || isSel2 || isSel3;

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

        {hasAnim && borderAnim && (
          <motion.div
            className="absolute inset-0 rounded-[0.2em] border-2 border-primary pointer-events-none"
            animate={borderAnim}
            transition={{ duration: CYCLE, times: borderTimes, repeat: Infinity }}
          />
        )}

        {hasAnim && checkAnim && (
          <motion.div
            className="absolute top-[5%] left-[5%] w-[22%] aspect-square rounded-full bg-primary flex items-center justify-center"
            animate={checkAnim}
            transition={{ duration: CYCLE, times: checkTimes, repeat: Infinity }}
          >
            <Check className="w-[55%] h-[55%] text-primary-foreground" />
          </motion.div>
        )}
      </div>
      <motion.span
        className="text-[0.32em] leading-tight truncate w-full text-center"
        style={{ color: "hsl(var(--body-desc))" }}
        animate={labelAnim || {}}
        transition={labelTimes ? { duration: CYCLE, times: labelTimes, repeat: Infinity } : undefined}
      >
        {style.label}
      </motion.span>
    </div>
  );
}
