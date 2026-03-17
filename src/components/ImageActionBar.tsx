import { useState, useRef, useEffect } from "react";
import { Download, Share2, X } from "lucide-react";
import { toast } from "sonner";

interface ImageActionBarProps {
  imageUrl: string;
  compact?: boolean;
}

const SHARE_PLATFORMS = [
  { name: "Twitter / X", color: "bg-gray-900 dark:bg-gray-100 text-white dark:text-gray-900", icon: "𝕏", getUrl: (url: string) => `https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent("Check out this AI-generated image!")}` },
  { name: "Facebook", color: "bg-blue-600 text-white", icon: "f", getUrl: (url: string) => `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}` },
  { name: "Pinterest", color: "bg-red-600 text-white", icon: "P", getUrl: (url: string, imgUrl: string) => `https://pinterest.com/pin/create/button/?url=${encodeURIComponent(url)}&media=${encodeURIComponent(imgUrl)}` },
  { name: "WhatsApp", color: "bg-green-500 text-white", icon: "W", getUrl: (url: string) => `https://wa.me/?text=${encodeURIComponent(url)}` },
  { name: "Telegram", color: "bg-sky-500 text-white", icon: "T", getUrl: (url: string) => `https://t.me/share/url?url=${encodeURIComponent(url)}` },
  { name: "Reddit", color: "bg-orange-500 text-white", icon: "R", getUrl: (url: string) => `https://reddit.com/submit?url=${encodeURIComponent(url)}&title=${encodeURIComponent("AI Generated Image")}` },
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
      <div
        className="relative"
        ref={popoverRef}
        onMouseEnter={() => setShareOpen(true)}
        onMouseLeave={() => setShareOpen(false)}
      >
        <button
          className={`${btnClass} bg-card border border-border flex items-center justify-center text-muted-foreground hover:text-primary hover:border-primary/50 hover:bg-primary/5 transition-all duration-200 cursor-pointer ${shareOpen ? "border-primary/50 text-primary bg-primary/5" : ""}`}
          title="分享"
        >
          <Share2 className={compact ? "w-4 h-4" : "w-[18px] h-[18px]"} />
        </button>

        {shareOpen && (
          <div className="absolute z-50 top-0 right-full pr-2 bg-transparent">
           <div className="bg-card border border-border rounded-xl shadow-lg p-1.5 animate-fade-in">
            <div className="flex flex-col items-center gap-1.5">
              {SHARE_PLATFORMS.map((platform) => (
                <button
                  key={platform.name}
                  onClick={() => handleSharePlatform(platform.getUrl)}
                  title={platform.name}
                  className={`w-8 h-8 rounded-lg flex items-center justify-center text-[11px] font-bold hover:opacity-80 transition-opacity cursor-pointer ${platform.color}`}
                >
                  {platform.icon}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
