import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";

const productColumns = [
  { title: "AI Chat", links: ["Rita", "Rita Pro", "ChatGPT 5.4", "ChatGPT 5.2", "Gemini 3.1 Pro", "Claude Opus 4.6", "Claude Sonnet 4.6", "Claude Opus 4.5", "Gemini 3 Pro", "Claude 4.5 Sonnet", "ChatGPT 5.1", "DeepSeek V3.1", "Grok 4.1", "ChatGPT 4o", "ChatGPT 5"] },
  { title: "AI Image", links: ["Nano Banana 2", "Nano Banana Pro", "Midjourney", "ChatGPT Image", "Flux", "Stable Diffusion", "Kling"] },
  { title: "AI Video", links: ["Veo", "Kling"] },
  { title: "AI Audio", links: ["Suno"] },
  { title: "AI Art Tools", links: ["AI Image Generator", "AI Image Upscaler", "AI Background Remover", "AI Watermark Remover", "AI Photo to Cartoon", "AI Christmas Avatar", "AI Ghibli Style", "AI Logo Generator", "AI Pixel Art Generator", "AI Poster Generator", "AI Video Generator", "AI Outpainting", "AI Pixar Style", "AI Avatar Generator", "AI Photo Restore", "Seedance 2.0"] },
  { title: "AI Tools", links: ["AI Detector", "AI Humanizer", "AI Math Solver", "AI Story Generator", "AI Rewriter", "AI Image to Text", "AI Essay Writer", "AI Image Translator", "AI Email Generator", "AI Fortune Teller", "AI Translator", "AI Chemistry Solver"] },
];

export const ProductFooterSection = () => {
  const [open, setOpen] = useState(false);
  const isMobile = useIsMobile();

  const content = (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-x-6 gap-y-6 text-sm">
      {productColumns.map((col) => (
        <div key={col.title}>
          <h5 className="font-semibold text-title mb-2 text-xs">{col.title}</h5>
          <ul className="space-y-1.5">
            {col.links.map((link) => (
              <li key={link}>
                <a href="#" className="text-xs text-body-desc hover:text-primary transition-colors">{link}</a>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );

  if (!isMobile) {
    return (
      <div className="flex-1">
        <h4 className="font-bold text-title mb-4 text-sm">Products</h4>
        {content}
      </div>
    );
  }

  return (
    <div className="flex-1">
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center justify-between w-full mb-2"
      >
        <h4 className="font-bold text-title text-sm">产品</h4>
        <ChevronDown
          className={`h-4 w-4 text-muted-foreground transition-transform duration-200 ${open ? "rotate-180" : ""}`}
        />
      </button>
      {open && <div className="mt-2">{content}</div>}
    </div>
  );
};
