import { useState, useRef, useCallback } from "react";
import { ImageIcon, Check, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

import styleGhibli from "@/assets/style-ghibli.png";
import stylePixel from "@/assets/style-pixel.png";
import styleRealistic from "@/assets/style-realistic.png";
import styleInk from "@/assets/style-ink.png";
import styleCartoon from "@/assets/style-cartoon.png";
import styleClassic from "@/assets/style-classic.png";
import styleCute from "@/assets/style-cute.png";
import styleMinimal from "@/assets/style-minimal.png";

const STYLE_OPTIONS = [
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

export function UploadPanel() {
  const [isDragging, setIsDragging] = useState(false);
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const [showSuccess, setShowSuccess] = useState(false);
  const [selectedRatio, setSelectedRatio] = useState("1:1");
  const [selectedStyle, setSelectedStyle] = useState(0);
  const [selectedModel, setSelectedModel] = useState("chatgpt-image-1");
  const fileRef = useRef<HTMLInputElement>(null);

  const handleDragOver = (e: React.DragEvent) => { e.preventDefault(); setIsDragging(true); };
  const handleDragLeave = () => setIsDragging(false);

  const handleFile = useCallback((file: File) => {
    if (!file.type.startsWith("image/")) return;
    const url = URL.createObjectURL(file);
    setUploadedImage(url);
    setShowSuccess(true);
    setTimeout(() => setShowSuccess(false), 2500);
  }, []);

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files?.[0];
    if (file) handleFile(file);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) handleFile(file);
  };

  const removeImage = () => {
    setUploadedImage(null);
    setShowSuccess(false);
    if (fileRef.current) fileRef.current.value = "";
  };

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
        {uploadedImage ? (
          <div className="relative rounded-lg border border-border/50 overflow-hidden animate-fade-in">
            <img src={uploadedImage} alt="uploaded" className="w-full h-24 object-cover" />
            <button
              onClick={removeImage}
              className="absolute top-1.5 right-1.5 w-5 h-5 rounded-full bg-foreground/60 hover:bg-foreground/80 flex items-center justify-center transition-colors"
            >
              <X className="w-3 h-3 text-background" />
            </button>
          </div>
        ) : (
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
          </div>
        )}
        <input ref={fileRef} type="file" accept="image/*" className="hidden" onChange={handleInputChange} />
        {showSuccess && (
          <div className="flex items-center gap-1.5 mt-1.5 animate-fade-in">
            <div className="w-4 h-4 rounded-full bg-primary/20 flex items-center justify-center">
              <Check className="w-2.5 h-2.5 text-primary" />
            </div>
            <span className="text-xs text-primary">上传成功</span>
          </div>
        )}
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
        <div className="grid grid-cols-2 sm:[grid-template-columns:repeat(4,128px)] sm:justify-between gap-x-3 gap-y-2">
          {STYLE_OPTIONS.map((style, i) => (
            <div
              key={i}
              onClick={() => setSelectedStyle(i)}
              className="relative cursor-pointer flex flex-col items-center gap-1"
            >
              <div className={cn(
                "relative w-full aspect-[4/3] rounded-lg overflow-hidden border-2 transition-all",
                selectedStyle === i ? "border-primary shadow-sm" : "border-transparent hover:border-primary/40"
              )}>
                <img
                  src={style.src}
                  alt={style.label}
                  className="w-full h-full object-cover"
                  style={{
                    imageRendering: "auto",
                    transform: "translateZ(0)",
                    backfaceVisibility: "hidden",
                    filter: "blur(0.15px)",
                  }}
                  loading="eager"
                  decoding="async"
                  draggable={false}
                />
                {selectedStyle === i && (
                  <div className="absolute top-1 left-1 w-4 h-4 rounded-full bg-primary flex items-center justify-center">
                    <Check className="w-2.5 h-2.5 text-primary-foreground" />
                  </div>
                )}
              </div>
              <span className={cn(
                "text-[10px] leading-tight truncate w-full text-center",
                selectedStyle === i ? "text-primary font-medium" : "text-body-desc"
              )}>{style.label}</span>
            </div>
          ))}
        </div>
      </div>

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


      {/* Spacer */}

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
