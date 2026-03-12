import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

const faqs = [
  {
    q: "Rita 支持哪些类型的照片进行卡通化？",
    a: "Rita 支持人像自拍、宠物照片和风景照片的卡通化转换。无论是正面特写还是全身照、萌宠写真还是户外风景，都可以上传处理。建议使用光线充足、主体清晰的照片以获得最佳效果。",
  },
  {
    q: "Rita 是免费的吗？需要注册账号吗？",
    a: "Rita 目前提供免费使用，无需注册或登录。打开页面即可直接上传照片并生成卡通图片，零门槛体验。",
  },
  {
    q: "生成的卡通图片有水印吗？可以商用吗？",
    a: "生成的卡通图片高清无水印，可直接下载使用。你可以将其用于社交头像、内容创作、个人项目等场景。如需商业用途，请确保你拥有原始照片的使用权。",
  },
  {
    q: "支持哪些图片格式和大小？",
    a: "Rita 支持 PNG、JPG、JPEG、WEBP 等主流图片格式，文件大小不超过 32MB。大多数手机和相机拍摄的照片都可以直接使用。",
  },
  {
    q: "有多少种卡通风格可以选择？",
    a: "目前提供吉卜力、像素、写实艺术、水墨、卡通片、复古时尚、可爱、极简等 8 种以上风格。你还可以通过自定义提示词，进一步调整卡通效果的细节和氛围。",
  },
  {
    q: "我的照片安全吗？会被保存吗？",
    a: "你的照片仅用于生成卡通图片，处理完成后会自动清除，不会被存储或分享给第三方。我们重视每一位用户的隐私安全。",
  },
  {
    q: "生成速度快吗？一般需要多长时间？",
    a: "通常几秒钟内即可完成卡通化转换。实际速度取决于所选模型和图片复杂度，大多数情况下等待时间不超过 10 秒。",
  },
  {
    q: "可以同时选择多种风格对比效果吗？",
    a: "目前每次生成需选择一种风格。你可以多次上传同一张照片、切换不同风格，快速对比找到最满意的效果。",
  },
];

export function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section className="py-16 md:py-24">
      <div className="container px-4 md:px-8 max-w-3xl">
        <div className="text-center mb-14">
          <h2 className="text-2xl md:text-3xl font-bold text-title mb-3">常见问题</h2>
          <p className="text-body-desc">了解更多关于 Rita 照片卡通化的功能与使用细节</p>
        </div>

        <div className="divide-y divide-border/60">
          {faqs.map((faq, i) => {
            const isOpen = openIndex === i;
            return (
              <div key={i}>
                <button
                  onClick={() => setOpenIndex(isOpen ? null : i)}
                  className="w-full flex items-center justify-between gap-4 py-5 text-left cursor-pointer group"
                >
                  <span
                    className={cn(
                      "text-[15px] font-medium transition-colors",
                      isOpen ? "text-primary" : "text-title group-hover:text-primary"
                    )}
                  >
                    {faq.q}
                  </span>
                  <ChevronDown
                    className={cn(
                      "h-4.5 w-4.5 shrink-0 transition-all duration-300",
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
                    <p className="pb-5 text-sm text-body-desc leading-[1.8]">
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
