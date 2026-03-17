import { useState, useRef, useEffect } from "react";
import { Download, Share2, Link, X } from "lucide-react";
import { toast } from "sonner";

interface ImageActionBarProps {
  imageUrl: string;
  compact?: boolean;
}

const SHARE_PLATFORMS = [
  { name: "Twitter / X", icon: "𝕏", getUrl: (url: string) => `https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent("Check out this AI-generated image!")}` },
  { name: "Facebook", icon: "f", getUrl: (url: string) => `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}` },
  { name: "Pinterest", icon: "P", getUrl: (url: string, imgUrl: string) => `https://pinterest.com/pin/create/button/?url=${encodeURIComponent(url)}&media=${encodeURIComponent(imgUrl)}` },
  { name: "WhatsApp", icon: "W", getUrl: (url: string) => `https://wa.me/?text=${encodeURIComponent(url)}` },
  { name: "Telegram", icon: "T", getUrl: (url: string) => `https://t.me/share/url?url=${encodeURIComponent(url)}` },
  { name: "Reddit", icon: "R", getUrl: (url: string) => `https://reddit.com/submit?url=${encodeURIComponent(url)}&title=${encodeURIComponent("AI Generated Image")}` },
];

export function ImageActionBar({ imageUrl, compact = false }: ImageActionBarProps) {
  const [shareOpen, setShareOpen] = useState(false);
  const popoverRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!shareOpen) return;
    const handler = (e: MouseEvent) => {
      if (popoverRef.current && !popoverRef.current.contains(e.target as Node)) {
        setShareOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [shareOpen]);

  const handleDownload = async () => {
    try {
      const response = await fetch(imageUrl);
      const blob = await response.blob();
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `rita-ai-${Date.now()}.png`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
      toast.success("图片已下载");
    } catch {
      toast.error("下载失败，请重试");
    }
  };

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(imageUrl);
      toast.success("链接已复制");
      setShareOpen(false);
    } catch {
      toast.error("复制失败");
    }
  };

  const handleSharePlatform = (getUrl: (url: string, imgUrl: string) => string) => {
    const shareUrl = window.location.href;
    window.open(getUrl(shareUrl, imageUrl), "_blank", "noopener,noreferrer,width=600,height=500");
    setShareOpen(false);
  };

  const btnClass = compact
    ? "w-9 h-9 rounded-lg"
    : "w-10 h-10 rounded-xl";

  return (
    <div className={`flex ${compact ? "flex-row gap-2" : "flex-col gap-2"}`}>
      {/* Download */}
      <button
        onClick={handleDownload}
        className={`${btnClass} bg-card border border-border flex items-center justify-center text-muted-foreground hover:text-primary hover:border-primary/50 hover:bg-primary/5 transition-all duration-200 cursor-pointer`}
        title="下载图片"
      >
        <Download className={compact ? "w-4 h-4" : "w-[18px] h-[18px]"} />
      </button>

      {/* Share */}
      <div className="relative" ref={popoverRef}>
        <button
          onClick={() => setShareOpen(!shareOpen)}
          className={`${btnClass} bg-card border border-border flex items-center justify-center text-muted-foreground hover:text-primary hover:border-primary/50 hover:bg-primary/5 transition-all duration-200 cursor-pointer ${shareOpen ? "border-primary/50 text-primary bg-primary/5" : ""}`}
          title="分享"
        >
          <Share2 className={compact ? "w-4 h-4" : "w-[18px] h-[18px]"} />
        </button>

        {shareOpen && (
          <div className={`absolute z-50 ${compact ? "bottom-full mb-2 right-0" : "left-full ml-2 top-0"} w-48 bg-card border border-border rounded-xl shadow-lg p-2 animate-fade-in`}>
            <div className="flex items-center justify-between px-2 py-1 mb-1">
              <span className="text-xs font-semibold text-foreground">分享到</span>
              <button onClick={() => setShareOpen(false)} className="text-muted-foreground hover:text-foreground transition-colors">
                <X className="w-3.5 h-3.5" />
              </button>
            </div>

            {SHARE_PLATFORMS.map((platform) => (
              <button
                key={platform.name}
                onClick={() => handleSharePlatform(platform.getUrl)}
                className="w-full flex items-center gap-2.5 px-2 py-1.5 rounded-lg text-sm text-foreground hover:bg-hover-bg transition-colors cursor-pointer"
              >
                <span className="w-6 h-6 rounded-md bg-muted flex items-center justify-center text-xs font-bold text-muted-foreground">
                  {platform.icon}
                </span>
                <span className="text-xs">{platform.name}</span>
              </button>
            ))}

            <div className="border-t border-border my-1" />
            <button
              onClick={handleCopyLink}
              className="w-full flex items-center gap-2.5 px-2 py-1.5 rounded-lg text-sm text-foreground hover:bg-hover-bg transition-colors cursor-pointer"
            >
              <span className="w-6 h-6 rounded-md bg-muted flex items-center justify-center">
                <Link className="w-3.5 h-3.5 text-muted-foreground" />
              </span>
              <span className="text-xs">复制链接</span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
