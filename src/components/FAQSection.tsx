import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

const faqs = [
  {
    q: "如何将照片转换为卡通风格？",
    a: "只需上传你的照片到平台，选择喜欢的卡通风格，点击生成按钮即可。AI 将在几秒内完成高质量的风格转换。",
  },
  {
    q: "这个工具是免费的吗？",
    a: "是的，基础功能完全免费，无需注册或付费。你可以直接上传图片开始使用。",
  },
  {
    q: "生成的图片有水印吗？",
    a: "没有。我们生成的图片均为高清无水印版本，可直接用于商业和个人用途。",
  },
  {
    q: "支持哪些图片格式？",
    a: "支持 PNG、JPG、JPEG、WEBP 等主流图片格式，文件大小限制为 32MB。",
  },
  {
    q: "可以用于商业用途吗？",
    a: "可以。所有通过平台生成的图片均可用于商业用途，你拥有生成图片的完整使用权。",
  },
];

export function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section className="py-16 md:py-24">
      <div className="container px-4 md:px-8 max-w-3xl">
        <h2 className="text-2xl md:text-3xl font-bold text-title text-center mb-3">常见问题</h2>
        <p className="text-body-desc text-center mb-12">了解更多关于 TechFlow 的信息</p>
        <div className="space-y-3">
          {faqs.map((faq, i) => (
            <div
              key={i}
              className="rounded-xl border border-border/50 bg-card shadow-soft overflow-hidden"
            >
              <button
                onClick={() => setOpenIndex(openIndex === i ? null : i)}
                className="w-full flex items-center justify-between px-5 py-4 text-left cursor-pointer hover:bg-hover-bg transition-colors"
              >
                <span className="text-sm font-medium text-title">{faq.q}</span>
                <ChevronDown
                  className={cn(
                    "h-4 w-4 text-body-desc shrink-0 ml-4 transition-transform duration-200",
                    openIndex === i && "rotate-180"
                  )}
                />
              </button>
              <div
                className={cn(
                  "grid transition-all duration-200 ease-out",
                  openIndex === i ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
                )}
              >
                <div className="overflow-hidden">
                  <p className="px-5 pb-4 text-sm text-body-desc leading-relaxed">{faq.a}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
