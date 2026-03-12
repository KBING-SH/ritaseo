import { useState, useRef } from "react";
import { ImageIcon, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

import styleGhibli from "@/assets/style-ghibli.webp";
import stylePixel from "@/assets/style-pixel.webp";
import styleRealistic from "@/assets/style-realistic.webp";
import styleInk from "@/assets/style-ink.webp";
import styleCartoon from "@/assets/style-cartoon.webp";
import styleClassic from "@/assets/style-classic.webp";
import styleCute from "@/assets/style-cute.webp";
import styleMinimal from "@/assets/style-minimal.webp";
import styleChibi from "@/assets/style-chibi.webp";

const STYLE_OPTIONS = [
  { src: styleGhibli, label: "吉卜力工作室" },
  { src: stylePixel, label: "方块" },
  { src: styleRealistic, label: "写实艺术" },
  { src: styleInk, label: "中国墨" },
  { src: styleCartoon, label: "卡通片" },
  { src: styleClassic, label: "经典的" },
  { src: styleCute, label: "可爱" },
  { src: styleMinimal, label: "极简主义者" },
  { src: styleChibi, label: "奇比" },
];

const RATIOS = ["1:1", "2:3", "3:2"];

export function UploadPanel() {
  const [isDragging, setIsDragging] = useState(false);
  const [promptOn, setPromptOn] = useState(false);
  const [selectedRatio, setSelectedRatio] = useState("1:1");
  const [selectedStyle, setSelectedStyle] = useState(0);
  const [count, setCount] = useState(1);
  const fileRef = useRef<HTMLInputElement>(null);

  const handleDragOver = (e: React.DragEvent) => { e.preventDefault(); setIsDragging(true); };
  const handleDragLeave = () => setIsDragging(false);
  const handleDrop = (e: React.DragEvent) => { e.preventDefault(); setIsDragging(false); };

  return (
    <div className="rounded-xl border border-border/50 bg-card p-4 shadow-soft h-full flex flex-col gap-3 text-sm overflow-y-auto max-h-[calc(100vh-12rem)]">
      {/* Model selector */}
      <div>
        <label className="text-xs text-body-desc mb-1 block">切换模型</label>
        <div className="flex items-center gap-2 px-3 py-2 rounded-lg border border-border/50 bg-card-alt text-title cursor-pointer">
          <Sparkle />
          <span className="font-medium flex-1">ChatGPT-image-1</span>
          <ChevDown />
        </div>
      </div>

      {/* Upload area */}
      <div>
        <label className="text-xs text-body-desc mb-1 block">上传参考图片</label>
        <div
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          onClick={() => fileRef.current?.click()}
          className={cn(
            "h-24 rounded-lg border-2 border-dashed flex flex-col items-center justify-center gap-1 transition-all cursor-pointer",
            isDragging ? "border-primary bg-primary/5" : "border-border hover:border-primary/40 hover:bg-hover-bg"
          )}
        >
          <ImageIcon className="h-5 w-5 text-body-desc" />
          <p className="text-xs text-body-desc">单击或拖动图像即可上传</p>
          <input ref={fileRef} type="file" accept="image/*" className="hidden" />
        </div>
      </div>

      {/* Prompt */}
      <div>
        <label className="text-xs text-body-desc mb-1 block">提示词</label>
        <textarea
          placeholder="请描述你的想法"
          className="w-full h-20 rounded-lg border border-border/50 bg-card-alt px-3 py-2 text-sm text-title placeholder:text-body-desc resize-none focus:outline-none focus:ring-1 focus:ring-primary/50"
        />
      </div>

      {/* Style selector */}
      <div>
        <label className="text-xs text-body-desc mb-1 block">选择以下风格</label>
        <div className="flex gap-2 flex-wrap">
          {STYLE_OPTIONS.map((style, i) => (
            <div
              key={i}
              onClick={() => setSelectedStyle(i)}
              className="relative cursor-pointer group"
              title={style.label}
            >
              <img
                src={style.src}
                alt={style.label}
                className={cn(
                  "w-11 h-11 rounded-lg object-cover transition-all",
                  selectedStyle === i ? "ring-2 ring-primary" : "hover:ring-2 hover:ring-primary/50"
                )}
              />
              {selectedStyle === i && (
                <div className="absolute top-0.5 left-0.5 w-4 h-4 rounded-full bg-primary flex items-center justify-center">
                  <Check className="w-2.5 h-2.5 text-primary-foreground" />
                </div>
              )}
              {/* Hover enlarged preview */}
              {/* Hover enlarged preview - appears to the left of the panel */}
              <div className="pointer-events-none fixed z-[100] opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                style={{ transform: 'translate(-110%, -50%)', top: '50%', left: '0' }}>
                <div className="rounded-xl overflow-hidden shadow-lg border border-border/50 bg-card p-1.5">
                  <img src={style.src} alt={style.label} className="w-40 h-40 rounded-lg object-cover" />
                  <p className="text-xs text-center text-body-desc mt-1 font-medium">{style.label}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Ratio */}
      <div>
        <label className="text-xs text-body-desc mb-1 block">比例</label>
        <div className="flex gap-2">
          {RATIOS.map((r) => (
            <button
              key={r}
              onClick={() => setSelectedRatio(r)}
              className={cn(
                "flex items-center gap-1.5 px-3 py-1.5 rounded-full border text-xs font-medium transition-colors",
                selectedRatio === r
                  ? "border-primary bg-primary/10 text-primary"
                  : "border-border/50 text-body2 hover:border-primary/40"
              )}
            >
              <RatioIcon ratio={r} active={selectedRatio === r} />
              {r}
            </button>
          ))}
        </div>
      </div>

      {/* Count */}
      <div>
        <label className="text-xs text-body-desc mb-1 block">生成图片数量</label>
        <div className="flex gap-2">
          {[1, 2, 4].map((n) => (
            <button
              key={n}
              onClick={() => setCount(n)}
              className={cn(
                "w-9 h-9 rounded-lg border text-xs font-medium transition-colors",
                count === n
                  ? "border-primary bg-primary/10 text-primary"
                  : "border-border/50 text-body2 hover:border-primary/40"
              )}
            >
              {n}
            </button>
          ))}
        </div>
      </div>

      {/* Spacer */}
      <div className="flex-1" />

      {/* Generate */}
      <Button variant="gradient" size="lg" className="w-full">
        生成 ⚡10
      </Button>
    </div>
  );
}

function ChevDown() {
  return (
    <svg width="12" height="12" viewBox="0 0 12 12" fill="none" className="text-body-desc">
      <path d="M3 4.5L6 7.5L9 4.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
}

function Sparkle() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" className="text-primary">
      <path d="M12 2L14.5 9.5L22 12L14.5 14.5L12 22L9.5 14.5L2 12L9.5 9.5L12 2Z" fill="currentColor"/>
    </svg>
  );
}

function RatioIcon({ ratio, active }: { ratio: string; active: boolean }) {
  const color = active ? "hsl(var(--primary))" : "hsl(var(--body-desc))";
  const [w, h] = ratio === "1:1" ? [10, 10] : ratio === "2:3" ? [8, 12] : [12, 8];
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
      <rect x={(14 - w) / 2} y={(14 - h) / 2} width={w} height={h} rx="1.5" stroke={color} strokeWidth="1.2" fill="none" />
    </svg>
  );
}
