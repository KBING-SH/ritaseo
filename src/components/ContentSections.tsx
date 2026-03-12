import { useState } from "react";
import { User, PawPrint, Mountain, ChevronRight } from "lucide-react";
import sectionPortrait from "@/assets/section-portrait.webp";
import sectionPet from "@/assets/section-pet.webp";
import sectionLandscape from "@/assets/section-landscape.webp";

const sections = [
  {
    icon: User,
    title: "人像卡通化",
    subtitle: "把你的照片，变成专属卡通头像",
    image: sectionPortrait,
    imageAlt: "人像卡通化效果示例",
    paragraphs: [
      "想把自拍照片变成卡通效果头像？rita 提供免费的在线照片卡通功能，上传一张人像照片后即可生成卡通版本。该功能能识别人脸特征，使卡通头像更有趣且自然。生成的头像适合用作社交平台的个性展示，便于在网络中展现独特形象。",
      "rita 支持多样卡通效果，满足内容创作者和亲友礼物的需求。整个过程无需复杂调整，轻松制作具有辨识度的人像卡通。生成后可用于社交头像或创意素材，也适合作为分享素材或小礼物用途。",
    ],
    imageFirst: true,
  },
  {
    icon: PawPrint,
    title: "把宠物照片变成卡通效果",
    subtitle: "为你的萌宠打造专属卡通形象",
    image: sectionPet,
    imageAlt: "宠物卡通化效果示例",
    paragraphs: [
      "想把宠物照片变成卡通形象？rita 提供免费的在线宠物照片卡通功能，上传宠物照片后即可得到卡通版本，无需繁琐步骤。生成的卡通宠物图像更有特色，适合用作社交头像，也方便发布在社交平台上。",
      "宠物卡通形象还适合用于创意项目，或作为独特的礼物和装饰品送给亲友。rita 让你轻松打造专属宠物卡通形象。完成后可用于头像或创意素材，也可以把生成结果当作内容配图，搭配封面或介绍图使用。",
    ],
    imageFirst: false,
  },
  {
    icon: Mountain,
    title: "把风景照片变成卡通效果",
    subtitle: "让风景照片呈现全新的卡通视觉",
    image: sectionLandscape,
    imageAlt: "风景卡通化效果示例",
    paragraphs: [
      "想让风景照片呈现卡通效果？rita 的免费在线卡通功能支持自然风景图像。上传照片后即可获得富有趣味的卡通风格画面。整个过程简单，无需复杂操作，方便打造独特的视觉效果。生成结果常见用法是用于社交发布或内容配图。",
      "风景卡通形象也适合创意项目制作，或作为特别的礼物赠送亲友，增加趣味和温馨感。rita 支持多样风景画面转换，方便用于发布或素材整理。生成后可用于分享发布或素材整理，也适合用作配图、封面或内容素材。",
    ],
    imageFirst: true,
  },
];

export function ContentSections() {
  const [showTooltip, setShowTooltip] = useState(false);

  const handleTryNow = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    setTimeout(() => {
      setShowTooltip(true);
      setTimeout(() => setShowTooltip(false), 2000);
    }, 500);
  };

  return (
    <>
      {/* Floating tooltip on upload area */}
      {showTooltip && (
        <div className="fixed z-50 pointer-events-none" style={{ top: 0, left: 0, width: '100%', height: '100%' }}>
          <UploadTooltip />
        </div>
      )}
      <section className="py-16 md:py-24">
        <div className="px-4 md:px-12 lg:px-20 max-w-[1600px] mx-auto space-y-24 md:space-y-36">
          {sections.map((section, i) => (
            <article
              key={i}
              className={`flex flex-col md:flex-row items-center gap-8 md:gap-[80px] ${
                section.imageFirst ? "" : "md:flex-row-reverse"
              }`}
            >
              {/* Image */}
              <div className="w-full md:w-[55%] shrink-0">
                <div className="rounded-2xl overflow-hidden shadow-lg border border-border/50">
                  <img
                    src={section.image}
                    alt={section.imageAlt}
                    className="w-full h-auto object-cover"
                    loading="lazy"
                  />
                </div>
              </div>

              {/* Text */}
              <div className="w-full md:w-[45%] space-y-5">
                <div className="space-y-3">
                  <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/10 text-primary text-xs font-semibold tracking-wide uppercase">
                    <section.icon className="h-3.5 w-3.5" />
                    <span>{section.subtitle}</span>
                  </div>
                  <h2 className="text-2xl md:text-3xl lg:text-4xl font-extrabold text-title leading-tight tracking-tight">
                    {section.title}
                  </h2>
                </div>
                <div className="space-y-4">
                  {section.paragraphs.map((p, j) => (
                    <p key={j} className="text-base md:text-lg text-body2 leading-relaxed">
                      {p}
                    </p>
                  ))}
                </div>
                <div className="pt-2">
                  <button
                    onClick={handleTryNow}
                    className="inline-flex items-center gap-2 px-8 py-3 rounded-full border-2 border-transparent bg-clip-padding text-base font-semibold text-title transition-all hover:shadow-lg group relative overflow-hidden"
                  >
                    <span className="absolute inset-0 rounded-full border-2 border-transparent" style={{ background: 'linear-gradient(white, white) padding-box, linear-gradient(135deg, hsl(var(--primary)), hsl(var(--accent))) border-box', borderColor: 'transparent' }} />
                    <span className="relative z-10">立即试用</span>
                    <ChevronRight className="relative z-10 h-4 w-4 text-body-desc group-hover:translate-x-0.5 transition-transform" />
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>
    </>
  );
}

function UploadTooltip() {
  const [pos, setPos] = useState<{ top: number; left: number; width: number } | null>(null);

  useState(() => {
    const el = document.getElementById("upload-drop-zone");
    if (el) {
      const rect = el.getBoundingClientRect();
      setPos({ top: rect.top, left: rect.left, width: rect.width });
    }
  });

  if (!pos) return null;

  return (
    <div
      className="absolute animate-fade-in flex items-center justify-center"
      style={{ top: pos.top, left: pos.left, width: pos.width, height: 96 }}
    >
      <div className="bg-primary text-primary-foreground px-4 py-2 rounded-lg shadow-lg text-sm font-medium animate-bounce">
        👆 在此插入图片，马上改图
      </div>
    </div>
  );
}
