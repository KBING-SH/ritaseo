import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

const faqs = [
  {
    q: "Rita 可以将哪些类型的照片转换成卡通风格？",
    a: "Rita 可以将人像照片、宠物照片和风景照片转换成卡通风格。",
  },
  {
    q: "使用 Rita 进行人像卡通化后，生成的头像适合用来做什么？",
    a: "生成的人像卡通头像适合用作社交平台发布的个性头像。",
  },
  {
    q: "Rita 生成的宠物卡通图像适合用于哪些用途？",
    a: "宠物卡通图像适合用作社交头像，或在社交平台发布，吸引更多关注。",
  },
  {
    q: "Rita 的风景卡通化功能可以处理什么类型的照片？",
    a: "可以处理自然风景图像，转换成充满童趣的卡通风格画面。",
  },
  {
    q: "使用 Rita 卡通化照片的操作复杂吗？",
    a: "操作简单，无需复杂调整，几次点击即可完成卡通效果转换。",
  },
  {
    q: "Rita 生成的卡通人像是否自然生动？",
    a: "Rita 会自动识别人脸特征，使卡通头像自然生动。",
  },
  {
    q: "卡通化的风景照片可以用于哪些场景？",
    a: "风景卡通化照片适合内容创作和作为送给朋友家人的特别礼物。",
  },
  {
    q: "Rita 卡通化宠物照片的体验如何？",
    a: "Rita 提供简单便捷的体验，用户上传宠物照片后即可生成专属的卡通形象。",
  },
];

export function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section className="py-16 md:py-24">
      <div className="container px-4 md:px-8 max-w-3xl">
        <h2 className="text-2xl md:text-3xl font-bold text-title text-center mb-3">常见问题</h2>
        <p className="text-body-desc text-center mb-12">了解更多关于 Rita 照片卡通化的信息</p>
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
