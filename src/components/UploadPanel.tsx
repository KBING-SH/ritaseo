import { useState, useRef, useCallback } from "react";
import { ImageIcon, Check, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { cn } from "@/lib/utils";

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
  { src: styleGhibli, label: "吉卜力" },
  { src: stylePixel, label: "像素" },
  { src: styleRealistic, label: "写实艺术" },
  { src: styleInk, label: "水墨" },
  { src: styleCartoon, label: "卡通片" },
  { src: styleClassic, label: "复古时尚" },
  { src: styleCute, label: "可爱" },
  { src: styleMinimal, label: "极简" },
];

const RATIOS = [
  { value: "auto", label: "Auto", w: 10, h: 10 },
  { value: "1:1", label: "1:1", w: 10, h: 10 },
  { value: "16:9", label: "16:9", w: 13, h: 7 },
  { value: "9:16", label: "9:16", w: 7, h: 13 },
  { value: "4:3", label: "4:3", w: 12, h: 9 },
  { value: "3:4", label: "3:4", w: 9, h: 12 },
  { value: "2:3", label: "2:3", w: 8, h: 12 },
  { value: "3:2", label: "3:2", w: 12, h: 8 },
  { value: "5:4", label: "5:4", w: 12, h: 10 },
  { value: "4:5", label: "4:5", w: 10, h: 12 },
];

const RESOLUTIONS = ["Auto", "0.5 MP", "1 MP", "2 MP", "4 MP"];
const FORMATS = ["WebP", "JPG", "PNG"];

export function UploadPanel() {
  const [isDragging, setIsDragging] = useState(false);
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const [showSuccess, setShowSuccess] = useState(false);
  const [selectedRatio, setSelectedRatio] = useState("1:1");
  const [selectedStyle, setSelectedStyle] = useState(0);
  const [selectedModel, setSelectedModel] = useState("chatgpt-image-1");
  const [selectedResolution, setSelectedResolution] = useState("1 MP");
  const [selectedFormat, setSelectedFormat] = useState("WebP");
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
    <div className="rounded-xl border border-border/50 bg-card shadow-soft h-full flex flex-col overflow-hidden">
      {/* Scrollable content */}
      <div className="flex-1 overflow-y-auto p-3 md:p-4 space-y-3 md:space-y-4 text-sm">
        {/* Model selector */}
        <div>
          <label className="text-xs font-medium text-title mb-1.5 block">模型</label>
          <Select value={selectedModel} onValueChange={setSelectedModel}>
            <SelectTrigger className="rounded-lg border-border/50 bg-card-alt text-title h-auto py-2 text-left">
              <SelectValue />
            </SelectTrigger>
            <SelectContent className="max-h-72">
              {MODEL_OPTIONS.map((m) => (
                <SelectItem key={m.value} value={m.value} className="py-2">
                  <div className="flex items-center gap-2.5">
                    <img src={m.logo} alt="" className="w-9 h-9 rounded-lg object-contain shrink-0" />
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
          <label className="text-xs font-medium text-title mb-1.5 block">图片</label>
          <div id="upload-drop-zone" className="relative">
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
                  "h-24 md:h-28 rounded-lg border-2 border-dashed flex flex-col items-center justify-center gap-1.5 transition-all cursor-pointer",
                  isDragging ? "border-primary bg-primary/5" : "border-border hover:border-primary/40 hover:bg-hover-bg"
                )}
              >
                <ImageIcon className="h-8 w-8 text-body-desc" />
                <p className="text-xs text-body-desc">将图像拖放到此处，或点击浏览</p>
                <p className="text-[10px] text-body-desc/60">最多支持8张图片</p>
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
        </div>

        {/* Prompt */}
        <div>
          <label className="text-xs font-medium text-title mb-1.5 block">
            提示词 <span className="text-destructive">*</span>
          </label>
          <textarea
            placeholder="请描述下你想如何处理图片..."
            className="w-full h-20 md:h-24 rounded-lg border border-border/50 bg-card-alt px-3 py-2 text-sm text-title placeholder:text-body-desc resize-y focus:outline-none focus:ring-1 focus:ring-primary/50"
          />
        </div>

        {/* Style selector */}
        <div>
          <label className="text-xs font-medium text-title mb-1.5 block">选择以下风格</label>
          <div className="grid grid-cols-4 gap-x-4 gap-y-3">
            {STYLE_OPTIONS.map((style, i) => (
              <StyleCard key={i} style={style} index={i} selected={selectedStyle === i} onSelect={setSelectedStyle} />
            ))}
          </div>
        </div>

        {/* Aspect Ratio */}
        <div>
          <label className="text-xs font-medium text-title mb-1.5 block">纵横比</label>
          <div className="grid grid-cols-5 gap-1.5">
            {RATIOS.map((r) => (
              <button
                key={r.value}
                onClick={() => setSelectedRatio(r.value)}
                className={cn(
                  "flex flex-col items-center gap-1 py-2 px-1 rounded-lg border text-[11px] font-medium transition-colors",
                  selectedRatio === r.value
                    ? "border-primary bg-primary/10 text-primary"
                    : "border-border/50 text-body-desc hover:border-primary/40"
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
          <label className="text-xs font-medium text-title mb-1.5 block">分辨率</label>
          <div className="flex flex-wrap gap-1.5">
            {RESOLUTIONS.map((res) => (
              <button
                key={res}
                onClick={() => setSelectedResolution(res)}
                className={cn(
                  "px-3 py-1.5 rounded-full border text-xs font-medium transition-colors",
                  selectedResolution === res
                    ? "border-primary bg-primary/10 text-primary"
                    : "border-border/50 text-body-desc hover:border-primary/40"
                )}
              >
                {res}
              </button>
            ))}
          </div>
        </div>

        {/* Image Format */}
        <div>
          <label className="text-xs font-medium text-title mb-1.5 block">图片格式</label>
          <div className="flex flex-wrap gap-1.5">
            {FORMATS.map((fmt) => (
              <button
                key={fmt}
                onClick={() => setSelectedFormat(fmt)}
                className={cn(
                  "px-3 py-1.5 rounded-full border text-xs font-medium transition-colors",
                  selectedFormat === fmt
                    ? "border-primary bg-primary/10 text-primary"
                    : "border-border/50 text-body-desc hover:border-primary/40"
                )}
              >
                {fmt}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Fixed bottom: credits + generate */}
      <div className="border-t border-border/50 p-3 md:p-4 space-y-2">
        <div className="flex items-center justify-between text-xs text-body-desc">
          <span>3 积分/次</span>
          <span>免费积分：60</span>
        </div>
        <Button variant="gradient" size="lg" className="w-full">
          生成
        </Button>
      </div>
    </div>
  );
}

function StyleCard({ style, index, selected, onSelect }: {
  style: { src: string; label: string };
  index: number;
  selected: boolean;
  onSelect: (i: number) => void;
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
      </div>
      <span className={cn(
        "text-[10px] leading-tight truncate w-full text-center",
        selected ? "text-primary font-medium" : "text-body-desc"
      )}>{style.label}</span>
    </div>
  );
}

function RatioIcon({ w, h, active }: { w: number; h: number; active: boolean }) {
  const color = active ? "hsl(var(--primary))" : "hsl(var(--body-desc))";
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
      <rect x={(16 - w) / 2} y={(16 - h) / 2} width={w} height={h} rx="1.5" stroke={color} strokeWidth="1.2" fill="none" />
    </svg>
  );
}
