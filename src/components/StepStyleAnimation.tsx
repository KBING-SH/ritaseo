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
  { src: styleGhibli, label: "吉卜力" },  // 0
  { src: stylePixel, label: "像素" },      // 1
  { src: styleRealistic, label: "写实" },  // 2
  { src: styleInk, label: "中国墨" },      // 3
  { src: styleCartoon, label: "卡通" },    // 4
  { src: styleClassic, label: "经典" },    // 5
  { src: styleCute, label: "可爱" },       // 6
  { src: styleMinimal, label: "极简" },    // 7
];

// Grid positions (percentage) for cursor targeting center of each cell
// Row1: 0=col1, 1=col2, 2=col3, 3=col4
// Row2: 4=col1, 5=col2, 6=col3, 7=col4
const POS: Record<number, [string, string]> = {
  0: ["16%", "24%"], 1: ["38%", "24%"], 2: ["60%", "24%"], 3: ["82%", "24%"],
  4: ["16%", "52%"], 5: ["38%", "52%"], 6: ["60%", "52%"], 7: ["82%", "52%"],
};
const BTN_POS: [string, string] = ["50%", "90%"];

// Sequence: select 中国墨(3) → select 像素(1) → select 卡通(4) → click generate
// Timeline markers (fraction of CYCLE=12s):
// 0.00-0.08: idle, cursor fades in
// 0.08-0.15: cursor moves to 中国墨(3)
// 0.15: click 中国墨 → border+check appear
// 0.15-0.30: hold
// 0.30-0.38: cursor moves to 像素(1)
// 0.38: click 像素 → 中国墨 deselects, 像素 selects
// 0.38-0.52: hold
// 0.52-0.60: cursor moves to 卡通(4)
// 0.60: click 卡通 → 像素 deselects, 卡通 selects
// 0.60-0.72: hold
// 0.72-0.80: cursor moves to generate button
// 0.80: click generate → button press
// 0.82-0.93: loading dots
// 0.93-1.0: fade out, reset

const CYCLE = 12;

// Click moments (when border/check should appear — AFTER cursor arrives)
const CLICK1 = 0.16; // select 中国墨
const CLICK2 = 0.39; // select 像素
const CLICK3 = 0.61; // select 卡通
const GEN_CLICK = 0.81; // click generate

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
          // idle...press down...bounce up...settle
          scale: [1, 1, 0.95, 1.02, 1, 1, 1],
        }}
        transition={{
          duration: CYCLE,
          times: [0, GEN_CLICK, GEN_CLICK + 0.02, GEN_CLICK + 0.04, GEN_CLICK + 0.05, 0.95, 1],
          repeat: Infinity,
        }}
      >
        <motion.span
          className="text-[0.5em] font-semibold text-white"
          animate={{ opacity: [1, 1, 0, 0, 1] }}
          transition={{
            duration: CYCLE,
            times: [0, GEN_CLICK + 0.03, GEN_CLICK + 0.04, 0.92, 0.96],
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
            times: [0, GEN_CLICK + 0.04, GEN_CLICK + 0.05, 0.92, 0.95],
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

      {/* Cursor — moves: idle → 中国墨 → 像素 → 卡通 → button → hide */}
      <motion.div
        className="absolute w-4 h-4 z-10 pointer-events-none"
        animate={{
          left: [
            "50%",          // 0: idle start
            POS[3][0],      // 0.14: arrive at 中国墨
            POS[3][0],      // 0.30: hold
            POS[1][0],      // 0.37: arrive at 像素
            POS[1][0],      // 0.52: hold
            POS[4][0],      // 0.59: arrive at 卡通
            POS[4][0],      // 0.72: hold
            BTN_POS[0],     // 0.79: arrive at button
            BTN_POS[0],     // 0.85: hold
          ],
          top: [
            "15%",
            POS[3][1],
            POS[3][1],
            POS[1][1],
            POS[1][1],
            POS[4][1],
            POS[4][1],
            BTN_POS[1],
            BTN_POS[1],
          ],
          opacity: [0, 0.9, 0.9, 0.9, 0.9, 0.9, 0.9, 0.9, 0],
        }}
        transition={{
          duration: CYCLE,
          times: [0, 0.14, 0.30, 0.37, 0.52, 0.59, 0.72, 0.79, 0.88],
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

// Selection windows (border+check visible):
// 中国墨(3): CLICK1(0.16) → CLICK2(0.39)
// 像素(1):   CLICK2(0.39) → CLICK3(0.61)
// 卡通(4):   CLICK3(0.61) → 0.96

function StyleThumbnail({ index, style }: { index: number; style: { src: string; label: string } }) {
  let selectStart: number | null = null;
  let selectEnd: number | null = null;

  if (index === 3) { selectStart = CLICK1; selectEnd = CLICK2; }
  else if (index === 1) { selectStart = CLICK2; selectEnd = CLICK3; }
  else if (index === 4) { selectStart = CLICK3; selectEnd = 0.96; }

  const hasSelection = selectStart !== null;

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

        {hasSelection && (
          <motion.div
            className="absolute inset-0 rounded-[0.2em] border-2 border-primary pointer-events-none"
            animate={{ opacity: [0, 0, 1, 1, 0, 0] }}
            transition={{
              duration: CYCLE,
              times: [0, selectStart!, selectStart! + 0.01, selectEnd! - 0.01, selectEnd!, 1],
              repeat: Infinity,
            }}
          />
        )}

        {hasSelection && (
          <motion.div
            className="absolute top-[5%] left-[5%] w-[22%] aspect-square rounded-full bg-primary flex items-center justify-center"
            animate={{
              opacity: [0, 0, 1, 1, 0, 0],
              scale: [0.5, 0.5, 1, 1, 0.5, 0.5],
            }}
            transition={{
              duration: CYCLE,
              times: [0, selectStart!, selectStart! + 0.02, selectEnd! - 0.02, selectEnd!, 1],
              repeat: Infinity,
            }}
          >
            <Check className="w-[55%] h-[55%] text-primary-foreground" />
          </motion.div>
        )}
      </div>
      <motion.span
        className="text-[0.32em] leading-tight truncate w-full text-center"
        style={{ color: "hsl(var(--body-desc))" }}
        animate={
          hasSelection
            ? {
                color: [
                  "hsl(var(--body-desc))",
                  "hsl(var(--body-desc))",
                  "hsl(var(--primary))",
                  "hsl(var(--primary))",
                  "hsl(var(--body-desc))",
                  "hsl(var(--body-desc))",
                ],
              }
            : {}
        }
        transition={
          hasSelection
            ? { duration: CYCLE, times: [0, selectStart!, selectStart! + 0.02, selectEnd! - 0.02, selectEnd!, 1], repeat: Infinity }
            : undefined
        }
      >
        {style.label}
      </motion.span>
    </div>
  );
}
