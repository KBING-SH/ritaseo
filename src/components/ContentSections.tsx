import { useState, useEffect } from "react";
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
    imageAlt: "人像卡通化效果示例 - Rita AI 照片转卡通",
    paragraphs: [
      "想把自拍变成迪士尼风、吉卜力风的卡通头像？Rita AI 人像卡通化功能支持一键转换，智能识别面部特征，生成表情生动、风格独特的卡通形象。无需注册、免费无水印，几秒即可下载高清卡通头像。",
      "无论是用作社交媒体头像、个人品牌形象，还是送给朋友的趣味礼物，Rita AI 都能帮你轻松打造有辨识度的卡通人像。支持 GPT-4o、Kling V2 等多款 AI 模型，满足从简约到精致的多种风格需求。",
    ],
    imageFirst: true,
  },
  {
    icon: PawPrint,
    title: "宠物照片变卡通",
    subtitle: "为你的萌宠打造专属卡通形象",
    image: sectionPet,
    imageAlt: "宠物卡通化效果示例 - Rita AI 照片转卡通",
    paragraphs: [
      "用 Rita AI 把你家猫咪、狗狗的照片变成超萌卡通形象！只需上传宠物照片，AI 自动识别宠物特征，生成风格各异的卡通版本——可爱风、像素风、水墨风任你挑选。",
      "生成的卡通宠物图适合用作头像、表情包素材，也可以打印出来做成贴纸或周边。整个过程在线免费完成，无需下载软件，无水印直接保存。",
    ],
    imageFirst: false,
  },
  {
    icon: Mountain,
    title: "风景照片变卡通",
    subtitle: "让风景照片呈现全新的卡通视觉",
    image: sectionLandscape,
    imageAlt: "风景卡通化效果示例 - Rita AI 照片转卡通",
    paragraphs: [
      "想让旅行照、风景照变成动画电影里的画面？Rita AI 支持将任意风景照片转化为卡通风格——吉卜力田园、像素城市、水墨山水，一键生成，效果惊艳。",
      "生成的卡通风景图适合用作手机壁纸、社交封面或博客配图。搭配 Flux Kontext Max 模型，细节丰富、色彩鲜明，适用于商业用途和内容创作。",
    ],
    imageFirst: true,
  },
];

export function ContentSections() {
  const [showTooltip, setShowTooltip] = useState(false);

  const handleTryNow = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });

    const checkScrollDone = () => {
      if (window.scrollY <= 5) {
        setShowTooltip(true);
        setTimeout(() => setShowTooltip(false), 3000);
      } else {
        requestAnimationFrame(checkScrollDone);
      }
    };
    requestAnimationFrame(checkScrollDone);
  };

  return (
    <>
      {/* Floating tooltip on upload area */}
      {showTooltip && (
        <div className="fixed z-50 pointer-events-none" style={{ top: 0, left: 0, width: '100%', height: '100%' }}>
          <UploadTooltip />
        </div>
      )}
      <section className="py-10 md:py-24">
        <div className="px-4 md:px-12 lg:px-20 max-w-[1600px] mx-auto space-y-12 md:space-y-36">
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
                  <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-secondary text-secondary-foreground text-xs font-semibold tracking-wide">
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
                    className="inline-flex items-center gap-2 px-8 py-3 rounded-full border border-border text-base font-semibold text-title transition-all hover:border-primary hover:text-primary hover:shadow-lg group"
                  >
                    <span>立即试用</span>
                    <ChevronRight className="h-4 w-4 text-body-desc group-hover:text-primary group-hover:translate-x-0.5 transition-all" />
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

  useEffect(() => {
    const el = document.getElementById("upload-drop-zone");
    if (el) {
      const rect = el.getBoundingClientRect();
      setPos({ top: rect.top + window.scrollY, left: rect.left, width: rect.width });
    }
  }, []);

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
