import { useState, useRef, useCallback } from "react";
import { ImageIcon, Check, X, Eye, Copy, ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { cn } from "@/lib/utils";
import { toast } from "sonner";

import logoChatgpt from "@/assets/logo-chatgpt.png";
import logoBanana from "@/assets/logo-banana.png";
import logoKling from "@/assets/logo-kling.png";
import logoFlux from "@/assets/logo-flux.png";

import styleGhibli from "@/assets/style-ghibli.png";
import stylePixel from "@/assets/style-pixel.png";
import styleRealistic from "@/assets/style-realistic.png";
import styleInk from "@/assets/style-ink.png";
import styleCartoon from "@/assets/style-cartoon.png";
import styleClassic from "@/assets/style-classic.png";
import styleCute from "@/assets/style-cute.png";
import styleMinimal from "@/assets/style-minimal.png";

const MODEL_OPTIONS = [
  { value: "chatgpt-image-1", label: "ChatGPT-image-1", desc: "理解能力强，可生成带文字的图片", logo: logoChatgpt },
  { value: "nano-banana-pro-direct", label: "Nano-banana pro | direct connect", desc: "覆盖更多区域和线路，适用于网络波动场景", logo: logoBanana },
  { value: "kling-v1.5", label: "Kling V1.5", desc: "支持生成时参考面部", logo: logoKling },
  { value: "kling-v2", label: "Kling V2", desc: "细节丰富，非常适合精致图像", logo: logoKling },
  { value: "nano-banana-pro", label: "Nano-banana pro", desc: "更鲜明的色彩和更丰富的细节", logo: logoBanana },
  { value: "flux-kontext-dev", label: "Flux.1 Kontext Dev", desc: "适合快速生成草图", logo: logoFlux },
  { value: "flux-kontext-max", label: "Flux.1 Kontext Max", desc: "可编辑、理解力和精细度强，适用于商业用途", logo: logoFlux },
];

export const MODEL_LABELS = MODEL_OPTIONS.map((m) => m.label);

const STYLE_OPTIONS = [
  { src: styleGhibli, label: "吉卜力", prompt: "将照片转换为吉卜力动画风格，保留柔和的色彩、温暖的光影和手绘质感，呈现出宫崎骏式的梦幻氛围。" },
  { src: stylePixel, label: "像素", prompt: "将照片转换为复古像素艺术风格，使用有限的调色板和清晰的像素块，呈现出8-bit游戏般的怀旧美感。" },
  { src: styleRealistic, label: "写实艺术", prompt: "将照片转换为高度写实的数字绘画风格，保留细腻的光影和纹理细节，呈现出超现实主义的艺术质感。" },
  { src: styleInk, label: "水墨", prompt: "将照片转换为东方水墨画风格，运用浓淡干湿的墨色变化，呈现出中国传统绘画的意境与韵味。" },
  { src: styleCartoon, label: "卡通片", prompt: "将照片转换为明亮活泼的卡通风格，使用鲜艳的色彩、粗线条和夸张的表情，充满趣味和生命力。" },
  { src: styleClassic, label: "复古时尚", prompt: "将照片转换为复古时尚风格，融合经典的色调和优雅的构图，呈现出老电影海报般的怀旧美感。" },
  { src: styleCute, label: "可爱", prompt: "将照片转换为Q版可爱风格，大眼睛、圆润的轮廓和柔和的色彩，呈现出萌系二次元的甜美形象。" },
  { src: styleMinimal, label: "极简", prompt: "将照片转换为极简插画风格，使用简洁的线条和有限的色彩，去除多余细节，呈现出干净利落的现代美感。" },
];

const RATIOS = [
  { value: "auto", label: "Auto", w: 26, h: 26 },
  { value: "1:1", label: "1:1", w: 26, h: 26 },
  { value: "16:9", label: "16:9", w: 27, h: 16 },
  { value: "9:16", label: "9:16", w: 16, h: 27 },
  { value: "4:3", label: "4:3", w: 27, h: 21 },
  { value: "3:4", label: "3:4", w: 21, h: 27 },
  { value: "2:3", label: "2:3", w: 19, h: 27 },
  { value: "3:2", label: "3:2", w: 27, h: 19 },
  { value: "5:4", label: "5:4", w: 27, h: 22 },
  { value: "4:5", label: "4:5", w: 22, h: 27 },
];

const RESOLUTIONS = ["Auto", "0.5 MP", "1 MP", "2 MP", "4 MP"];
const FORMATS = ["WebP", "JPG", "PNG"];

export function UploadPanel({ onGenerate }: { onGenerate?: (styleImg: string, ratio: string) => void } = {}) {
  const [isDragging, setIsDragging] = useState(false);
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const [showSuccess, setShowSuccess] = useState(false);
  const [selectedRatio, setSelectedRatio] = useState("1:1");
  const [selectedStyle, setSelectedStyle] = useState(0);
  const [selectedModel, setSelectedModel] = useState("chatgpt-image-1");
  const [selectedResolution, setSelectedResolution] = useState("1 MP");
  const [selectedFormat, setSelectedFormat] = useState("WebP");
  const [previewStyle, setPreviewStyle] = useState<number | null>(null);
  const [promptText, setPromptText] = useState("");
  const fileRef = useRef<HTMLInputElement>(null);

  const handleDragOver = (e: React.DragEvent) => { e.preventDefault(); setIsDragging(true); };
  const handleDragLeave = () => setIsDragging(false);

  const handleFile = useCallback((file: File) => {
    if (!file.type.startsWith("image/")) return;
    const url = URL.createObjectURL(file);
    setUploadedImage(url);
    setShowSuccess(true);
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
    <div className="rounded-xl border border-border/50 bg-muted shadow-soft h-full flex flex-col overflow-hidden">
      {/* Content */}
      <div className="flex-1 overflow-y-auto p-3 md:p-3 lg:p-4 space-y-2 md:space-y-1.5 lg:space-y-3 text-sm">
        {/* Model selector */}
        <div>
          <label className="text-xs font-medium text-title mb-1 lg:mb-1.5 block">模型</label>
          <Select value={selectedModel} onValueChange={setSelectedModel}>
            <SelectTrigger className="rounded-lg border-border/50 bg-card text-title h-auto py-1.5 lg:py-2 text-left">
              <SelectValue />
            </SelectTrigger>
            <SelectContent className="max-h-72">
              {MODEL_OPTIONS.map((m) => (
                <SelectItem key={m.value} value={m.value} className="py-2">
                  <div className="flex items-center gap-2.5">
                    <img src={m.logo} alt={m.label + " logo"} className="w-9 h-9 rounded-lg object-contain shrink-0" />
                    <div className="flex flex-col justify-center text-left">
                      <span className="font-medium text-sm leading-snug">{m.label}</span>
                      <span className="text-xs text-muted-foreground leading-snug">{m.desc}</span>
                    </div>
                  </div>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Upload area */}
        <div>
          <label className="text-xs font-medium text-title mb-1 lg:mb-1.5 block">图片</label>
          <div id="upload-drop-zone" className="relative">
            {uploadedImage ? (
              <div className="relative rounded-lg border border-border/50 overflow-hidden animate-fade-in">
                <img src={uploadedImage} alt="已上传的图片" className="w-full h-20 md:h-[90px] lg:h-28 object-cover" />
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
                  "h-20 md:h-[90px] lg:h-28 rounded-lg border-2 border-dashed flex flex-col items-center justify-center gap-0.5 transition-all cursor-pointer",
                  isDragging ? "border-primary bg-primary/5" : "border-border hover:border-primary/40 hover:bg-hover-bg"
                )}
              >
                <ImageIcon className="h-5 w-5 lg:h-8 lg:w-8 text-body-desc" />
                <p className="text-[11px] text-body-desc">将图像拖放到此处，或点击浏览</p>
                <p className="text-[10px] text-body-desc/60">支持 jpg/jpeg/png/webp，最大 32MB</p>
              </div>
            )}
            <input ref={fileRef} type="file" accept="image/*" className="hidden" onChange={handleInputChange} />
            {showSuccess && (
              <div className="flex items-center gap-1.5 mt-1 animate-fade-in">
                <div className="w-4 h-4 rounded-full bg-primary/20 flex items-center justify-center">
                  <Check className="w-2.5 h-2.5 text-primary" />
                </div>
                <span className="text-xs text-primary">上传成功</span>
              </div>
            )}
          </div>
        </div>

        {/* Prompt */}
        <div>
          <label className="text-xs font-medium text-title mb-1 lg:mb-1.5 block">
            提示词 <span className="text-destructive">*</span>
          </label>
          <textarea
            value={promptText}
            onChange={(e) => setPromptText(e.target.value)}
            placeholder="请描述下你想如何处理图片..."
            className="w-full h-[54px] md:h-14 lg:h-24 rounded-lg border border-border/50 bg-card px-3 py-1.5 text-sm text-title placeholder:text-body-desc resize-none md:resize-none lg:resize-y focus:outline-none focus:ring-1 focus:ring-primary/50"
          />
        </div>

        {/* Style selector */}
        <div>
          <label className="text-xs font-medium text-title mb-1 lg:mb-1.5 block">选择以下风格</label>
          <div className="grid grid-cols-4 md:grid-cols-4 lg:grid-cols-4 gap-x-2 gap-y-2 md:gap-x-2 md:gap-y-1.5 lg:gap-x-2 lg:gap-y-2">
            {STYLE_OPTIONS.map((style, i) => (
              <StyleCard key={i} style={style} index={i} selected={selectedStyle === i} onSelect={(idx) => { setSelectedStyle(idx); setPromptText(STYLE_OPTIONS[idx].prompt); }} onPreview={() => setPreviewStyle(i)} />
            ))}
          </div>
        </div>

        {/* Aspect Ratio */}
        <div>
          <label className="text-xs md:text-sm font-medium text-title mb-1 lg:mb-1.5 block">纵横比</label>
          <div className="grid grid-cols-5 gap-1.5 md:gap-2 lg:gap-2">
            {RATIOS.map((r) => (
              <button
                key={r.value}
                onClick={() => setSelectedRatio(r.value)}
                className={cn(
                  "flex flex-col items-center justify-center gap-1 py-1.5 px-1 rounded-lg border text-[10px] font-medium transition-all",
                  "md:rounded-xl md:text-xs md:py-2",
                  "lg:py-2.5 lg:rounded-xl lg:text-[11px]",
                  selectedRatio === r.value
                    ? "border-primary bg-primary text-primary-foreground shadow-sm"
                    : "border-border bg-card text-body2 hover:border-primary/50 hover:bg-primary/5"
                )}
              >
                <RatioIcon w={r.w} h={r.h} active={selectedRatio === r.value} />
                <span>{r.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Resolution */}
        <div>
          <label className="text-xs md:text-sm font-medium text-title mb-1 lg:mb-1.5 block">分辨率</label>
          <div className="flex flex-wrap gap-1 md:gap-1.5 lg:gap-1.5">
            {RESOLUTIONS.map((res) => (
              <button
                key={res}
                onClick={() => setSelectedResolution(res)}
                className={cn(
                  "px-3 py-1.5 md:px-4 md:py-2 rounded-lg border text-[11px] md:text-xs font-medium transition-all",
                  selectedResolution === res
                    ? "border-primary bg-primary text-primary-foreground shadow-sm"
                    : "border-border bg-card text-body2 hover:border-primary/50 hover:bg-primary/5"
                )}
              >
                {res}
              </button>
            ))}
          </div>
        </div>

        {/* Image Format */}
        <div>
          <label className="text-xs md:text-sm font-medium text-title mb-1 lg:mb-1.5 block">图片格式</label>
          <div className="flex flex-wrap gap-1 md:gap-1.5 lg:gap-1.5">
            {FORMATS.map((fmt) => (
              <button
                key={fmt}
                onClick={() => setSelectedFormat(fmt)}
                className={cn(
                  "px-3 py-1.5 md:px-4 md:py-2 rounded-lg border text-[11px] md:text-xs font-medium transition-all",
                  selectedFormat === fmt
                    ? "border-primary bg-primary text-primary-foreground shadow-sm"
                    : "border-border bg-card text-body2 hover:border-primary/50 hover:bg-primary/5"
                )}
              >
                {fmt}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Fixed bottom: generate */}
      <div className="border-t border-border/50 p-3 md:p-3 lg:p-4 flex items-center gap-2">
        <Button
          variant="gradient"
          size="default"
          className="flex-1"
          onClick={() => onGenerate?.(STYLE_OPTIONS[selectedStyle].src, selectedRatio)}
        >
          生成 ⚡10
        </Button>
        <span className="text-xs text-muted-foreground whitespace-nowrap flex items-center gap-0.5">免费 ⚡30</span>
      </div>

      {/* Style Preview Dialog */}
      <Dialog open={previewStyle !== null} onOpenChange={(open) => !open && setPreviewStyle(null)}>
        <DialogContent className="max-w-4xl p-4 overflow-visible gap-0 border border-border bg-card rounded-2xl shadow-xl [&>button]:hidden">
          <div className="relative">
            {/* Left arrow */}
            <button
              onClick={() => setPreviewStyle((prev) => prev !== null ? (prev - 1 + STYLE_OPTIONS.length) % STYLE_OPTIONS.length : 0)}
              className="absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/80 dark:bg-card/80 backdrop-blur-sm shadow-lg border border-border/50 flex items-center justify-center hover:bg-white dark:hover:bg-card transition-colors z-20"
            >
              <ChevronLeft className="w-6 h-6 text-title" />
            </button>

            {/* Right arrow */}
            <button
              onClick={() => setPreviewStyle((prev) => prev !== null ? (prev + 1) % STYLE_OPTIONS.length : 0)}
              className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/80 dark:bg-card/80 backdrop-blur-sm shadow-lg border border-border/50 flex items-center justify-center hover:bg-white dark:hover:bg-card transition-colors z-20"
            >
              <ChevronRight className="w-6 h-6 text-title" />
            </button>

            {/* Main card */}
            <div className="rounded-2xl border border-border bg-card shadow-lg overflow-hidden">
              <div className="flex flex-col md:flex-row min-h-[420px]">
                {/* Left: large image */}
                <div className="md:w-[55%] bg-muted/30">
                  {previewStyle !== null && (
                    <img
                      src={STYLE_OPTIONS[previewStyle].src}
                      alt={STYLE_OPTIONS[previewStyle].label}
                      className="w-full h-64 md:h-full object-cover"
                    />
                  )}
                </div>
                {/* Right: style info & prompt */}
                <div className="md:w-[45%] p-6 flex flex-col">
                  <div className="flex items-center justify-between mb-5">
                    <h3 className="text-xl font-bold text-title">
                      {previewStyle !== null && STYLE_OPTIONS[previewStyle].label}
                    </h3>
                    <button
                      onClick={() => setPreviewStyle(null)}
                      className="w-8 h-8 rounded-full border border-border flex items-center justify-center hover:bg-muted transition-colors"
                    >
                      <X className="w-4 h-4 text-muted-foreground" />
                    </button>
                  </div>
                  <p className="text-sm font-semibold text-title mb-2">提示词</p>
                  <div className="rounded-xl border border-border/50 bg-muted p-4 flex-1">
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {previewStyle !== null && STYLE_OPTIONS[previewStyle].prompt}
                    </p>
                  </div>
                  <Button
                    variant="gradient"
                    className="w-full mt-5"
                    onClick={() => {
                      if (previewStyle !== null) {
                        setSelectedStyle(previewStyle);
                        setPromptText(STYLE_OPTIONS[previewStyle].prompt);
                        setPreviewStyle(null);
                      }
                    }}
                  >
                    使用提示词
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}

function StyleCard({ style, index, selected, onSelect, onPreview }: {
  style: { src: string; label: string; prompt: string };
  index: number;
  selected: boolean;
  onSelect: (i: number) => void;
  onPreview: () => void;
}) {
  return (
    <div
      onClick={() => onSelect(index)}
      className="relative cursor-pointer flex flex-col items-center gap-1.5"
    >
      <div className={cn(
        "relative w-full aspect-square rounded-xl overflow-hidden border-2 transition-all",
        selected ? "border-primary shadow-sm" : "border-transparent hover:border-primary/40"
      )}>
        <img
          src={style.src}
          alt={style.label}
          className="w-full h-full object-cover"
          style={{ imageRendering: "auto", transform: "translateZ(0)", backfaceVisibility: "hidden", filter: "blur(0.15px)" }}
          loading="eager"
          decoding="async"
          draggable={false}
        />
        {selected && (
          <div className="absolute top-1 left-1 w-4 h-4 rounded-full bg-primary flex items-center justify-center">
            <Check className="w-2.5 h-2.5 text-primary-foreground" />
          </div>
        )}
        <button
          onClick={(e) => { e.stopPropagation(); onPreview(); }}
          className="absolute top-1 right-1 w-5 h-5 rounded-full bg-black/30 backdrop-blur-sm flex items-center justify-center hover:bg-black/50 transition-colors"
        >
          <Eye className="w-3 h-3 text-white" />
        </button>
      </div>
      <span className={cn(
        "text-[10px] leading-tight truncate w-full text-center",
        selected ? "text-primary font-medium" : "text-muted-foreground"
      )}>{style.label}</span>
    </div>
  );
}

function RatioIcon({ w, h, active }: { w: number; h: number; active: boolean }) {
  const stroke = active ? "hsl(var(--primary-foreground))" : "hsl(var(--body2))";
  const fill = active ? "hsl(var(--primary-foreground) / 0.2)" : "none";
  return (
    <svg width="32" height="32" viewBox="0 0 28 28" fill="none">
      <rect x={(28 - w) / 2} y={(28 - h) / 2} width={w} height={h} rx="2.5" stroke={stroke} strokeWidth="1.8" fill={fill} />
    </svg>
  );
}
