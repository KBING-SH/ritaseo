import { useState, useRef } from "react";
import { Upload, ImageIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export function UploadPanel() {
  const [isDragging, setIsDragging] = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => setIsDragging(false);
  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  };

  return (
    <div className="rounded-xl border border-border/50 bg-card p-5 shadow-soft h-full flex flex-col">
      {/* Top controls */}
      <div className="flex items-center gap-3 mb-4 flex-wrap">
        <div className="flex items-center gap-2 px-3 py-2 rounded-full border border-border/50 bg-card-alt text-sm text-title">
          <Sparkle />
          <span className="font-medium">GPT-4o</span>
          <ChevDown />
        </div>
        <div className="flex items-center gap-2 px-3 py-2 rounded-full border border-border/50 bg-card-alt text-sm text-title">
          <span>2:3</span>
          <ChevDown />
        </div>
      </div>

      {/* Drop zone */}
      <div
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        className={cn(
          "flex-1 min-h-[240px] rounded-xl border-2 border-dashed flex flex-col items-center justify-center gap-3 transition-all duration-200 cursor-pointer",
          isDragging
            ? "border-primary bg-primary/5"
            : "border-border hover:border-primary/40 hover:bg-hover-bg"
        )}
        onClick={() => fileRef.current?.click()}
      >
        <div className="h-12 w-12 rounded-xl bg-card-alt flex items-center justify-center">
          <ImageIcon className="h-6 w-6 text-body-desc" />
        </div>
        <p className="text-sm text-body2">
          拖拽图片到此处，或{" "}
          <span className="text-primary font-medium">点击上传</span>
        </p>
        <Button variant="outline" size="sm">
          <Upload className="h-4 w-4 mr-1.5" />
          选择文件
        </Button>
        <p className="text-xs text-body-desc">支持 PNG, JPG, WEBP，最大 32MB</p>
        <input ref={fileRef} type="file" accept="image/*" className="hidden" />
      </div>

      {/* Custom prompt toggle */}
      <div className="flex items-center justify-between mt-4">
        <span className="text-sm text-body2">自定义提示词</span>
        <ToggleSwitch />
      </div>

      {/* Generate button */}
      <Button variant="gradient" size="lg" className="w-full mt-4">
        生成
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
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" className="text-primary">
      <path d="M12 2L14.5 9.5L22 12L14.5 14.5L12 22L9.5 14.5L2 12L9.5 9.5L12 2Z" fill="currentColor"/>
    </svg>
  );
}

function ToggleSwitch() {
  const [on, setOn] = useState(false);
  return (
    <button
      onClick={() => setOn(!on)}
      className={cn(
        "relative inline-flex h-6 w-11 items-center rounded-full transition-colors cursor-pointer",
        on ? "bg-primary" : "bg-border"
      )}
    >
      <span
        className={cn(
          "inline-block h-4 w-4 rounded-full bg-white transition-transform shadow-sm",
          on ? "translate-x-6" : "translate-x-1"
        )}
      />
    </button>
  );
}
