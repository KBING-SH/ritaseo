import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";

const productColumns = [
  { title: "AI 对话", links: ["Rita", "Rita Pro", "ChatGPT 5.4", "ChatGPT 5.2", "Gemini 3.1 Pro", "Claude Opus 4.6", "Claude Sonnet 4.6", "Claude Opus 4.5", "Gemini 3 Pro", "Claude 4.5 Sonnet", "ChatGPT 5.1", "DeepSeek V3.1", "Grok 4.1", "ChatGPT 4o", "ChatGPT 5"] },
  { title: "AI 图片", links: ["Nano Banana 2", "Nano Banana Pro", "Midjourney", "ChatGPT Image", "Flux", "Stable Diffusion", "Kling"] },
  { title: "AI 视频", links: ["Veo", "Kling"] },
  { title: "AI 音频", links: ["Suno"] },
  { title: "AI 艺术工具", links: ["AI 图片生成器", "AI 画质提升工具", "AI 背景移除工具", "AI 水印去除工具", "AI 照片转卡通工具", "AI 圣诞形象生成器", "AI 吉卜力风格转换器", "AI 标志生成器", "AI 像素艺术生成器", "AI 海报生成器", "AI 视频生成器", "AI 扩图工具", "AI 皮克斯风格生成器", "AI 头像生成器", "AI 老照片修复器", "Seedance 2.0"] },
  { title: "AI 工具", links: ["AI 检测器", "AI 人性化工具", "AI 数学解题器", "AI 故事生成器", "AI 改写器", "AI 图片转文字工具", "AI 论文写作工具", "AI 图片翻译工具", "AI 邮件生成器", "AI 算命师", "AI 翻译器", "AI 化学解题器"] },
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
        <h4 className="font-bold text-title mb-4 text-sm">产品</h4>
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
