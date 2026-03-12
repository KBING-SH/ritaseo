import { useState } from "react";
import { ChevronDown, MessageCircleQuestion } from "lucide-react";
import { cn } from "@/lib/utils";

const faqs = [
  {
    q: "Rita 支持哪些类型的照片进行卡通化？",
    a: "Rita 支持人像自拍、宠物照片和风景照片三种主要类型的卡通化转换。你可以上传正面或半身人像用于生成社交头像，也可以上传宠物照片或户外风景照片。建议使用光线充足、主体清晰的原始照片以获得最佳效果。",
  },
  {
    q: "有哪些卡通风格可以选择？",
    a: "目前提供吉卜力、像素、写实艺术、水墨、卡通片、复古时尚、可爱、极简共 8 种风格。每种风格适用于不同场景，例如吉卜力适合温馨人像、水墨适合风景、像素适合趣味头像等。你还可以通过自定义提示词进一步调整效果细节。",
  },
  {
    q: "支持哪些 AI 模型？不同模型有什么区别？",
    a: "Rita 内置 ChatGPT-image-1、Nano-banana pro、Kling V1.5、Kling V2、Flux.1 Kontext 等 7 种 AI 模型。不同模型各有侧重：ChatGPT-image-1 理解力强且支持生成带文字的图片；Kling V1.5 支持参考面部特征；Kling V2 细节更丰富。你可以根据需求在顶部切换模型。",
  },
  {
    q: "支持哪些图片格式？文件大小有限制吗？",
    a: "支持 PNG、JPG、JPEG、WEBP 等主流图片格式，文件大小不超过 32MB。大多数手机和相机拍摄的照片都可以直接上传使用。",
  },
  {
    q: "生成的图片可以选择不同比例吗？",
    a: "可以。Rita 支持 1:1、2:3、3:2 三种输出比例，你可以根据用途选择合适的尺寸，例如 1:1 适合社交头像，2:3 适合手机壁纸，3:2 适合横版配图。",
  },
  {
    q: "生成的卡通图片有水印吗？可以用于商业用途吗？",
    a: "生成的卡通图片高清无水印，可直接下载。你可以将其用于社交头像、内容创作、个人项目等场景。如需商业用途，请确保你拥有原始照片的版权。",
  },
  {
    q: "我的照片会被保存吗？隐私安全吗？",
    a: "你的照片仅用于生成卡通图片，处理完成后会自动清除，不会被存储或分享给第三方。我们重视每一位用户的隐私安全。",
  },
  {
    q: "自定义提示词怎么用？",
    a: "在上传照片后，你可以在提示词输入框中描述你想要的效果，例如「柔和色调、梦幻背景」或「日系清新风格」，AI 会结合你选择的卡通风格和提示词一起生成更个性化的结果。",
  },
];

export function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section className="py-10 md:py-24">
      <div className="container px-4 md:px-8 max-w-3xl">
        {/* Header */}
        <div className="flex items-center justify-center gap-3 mb-6 md:mb-10">
          <div className="h-10 w-10 rounded-xl gradient-primary flex items-center justify-center shadow-md">
            <MessageCircleQuestion className="h-5 w-5 text-white" />
          </div>
          <h2 className="text-2xl md:text-3xl font-bold text-title">常见问题</h2>
        </div>

        {/* FAQ list */}
        <div className="rounded-2xl border border-border/50 bg-card shadow-soft overflow-hidden">
          {faqs.map((faq, i) => {
            const isOpen = openIndex === i;
            const isLast = i === faqs.length - 1;
            return (
              <div
                key={i}
                className={cn(!isLast && "border-b border-border/40")}
              >
                <button
                  onClick={() => setOpenIndex(isOpen ? null : i)}
                  className={cn(
                    "w-full flex items-center justify-between gap-4 px-6 py-5 text-left cursor-pointer group transition-colors duration-200",
                    isOpen ? "bg-primary/[0.04]" : "hover:bg-hover-bg"
                  )}
                >
                  <div className="flex items-center gap-3.5">
                    <span
                      className={cn(
                        "text-xs font-bold tabular-nums w-6 h-6 rounded-lg flex items-center justify-center shrink-0 transition-all duration-300",
                        isOpen
                          ? "gradient-primary text-white shadow-sm"
                          : "bg-muted text-body-desc"
                      )}
                    >
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span
                      className={cn(
                        "text-[15px] font-medium transition-colors",
                        isOpen ? "text-title" : "text-title group-hover:text-primary"
                      )}
                    >
                      {faq.q}
                    </span>
                  </div>
                  <ChevronDown
                    className={cn(
                      "h-4 w-4 shrink-0 transition-all duration-300",
                      isOpen
                        ? "rotate-180 text-primary"
                        : "text-body-desc group-hover:text-primary"
                    )}
                  />
                </button>
                <div
                  className={cn(
                    "grid transition-all duration-300 ease-out",
                    isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
                  )}
                >
                  <div className="overflow-hidden">
                    <p className="px-6 pb-5 pl-[3.75rem] text-sm text-body-desc leading-[1.8]">
                      {faq.a}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
