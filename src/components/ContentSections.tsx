import { User, PawPrint, Mountain } from "lucide-react";

const sections = [
  {
    icon: User,
    title: "人像卡通化",
    subtitle: "把你的照片，变成专属卡通头像",
    paragraphs: [
      "想把自拍照片变成卡通效果头像？rita 提供免费的在线照片卡通功能，上传一张人像照片后即可生成卡通版本。该功能能识别人脸特征，使卡通头像更有趣且自然。生成的头像适合用作社交平台的个性展示，便于在网络中展现独特形象。",
      "rita 支持多样卡通效果，满足内容创作者和亲友礼物的需求。整个过程无需复杂调整，轻松制作具有辨识度的人像卡通。生成后可用于社交头像或创意素材，也适合作为分享素材或小礼物用途。",
    ],
  },
  {
    icon: PawPrint,
    title: "把宠物照片变成卡通效果",
    subtitle: "为你的萌宠打造专属卡通形象",
    paragraphs: [
      "想把宠物照片变成卡通形象？rita 提供免费的在线宠物照片卡通功能，上传宠物照片后即可得到卡通版本，无需繁琐步骤。生成的卡通宠物图像更有特色，适合用作社交头像，也方便发布在社交平台上。",
      "宠物卡通形象还适合用于创意项目，或作为独特的礼物和装饰品送给亲友。rita 让你轻松打造专属宠物卡通形象。完成后可用于头像或创意素材，也可以把生成结果当作内容配图，搭配封面或介绍图使用。",
    ],
  },
  {
    icon: Mountain,
    title: "把风景照片变成卡通效果",
    subtitle: "让风景照片呈现全新的卡通视觉",
    paragraphs: [
      "想让风景照片呈现卡通效果？rita 的免费在线卡通功能支持自然风景图像。上传照片后即可获得富有趣味的卡通风格画面。整个过程简单，无需复杂操作，方便打造独特的视觉效果。生成结果常见用法是用于社交发布或内容配图。",
      "风景卡通形象也适合创意项目制作，或作为特别的礼物赠送亲友，增加趣味和温馨感。rita 支持多样风景画面转换，方便用于发布或素材整理。生成后可用于分享发布或素材整理，也适合用作配图、封面或内容素材。",
    ],
  },
];

export function ContentSections() {
  return (
    <section className="py-16 md:py-24">
      <div className="container px-4 md:px-8 max-w-4xl space-y-16 md:space-y-20">
        {sections.map((section, i) => (
          <article key={i} className="space-y-4">
            <div className="flex items-center gap-3 mb-2">
              <div className="h-10 w-10 rounded-xl gradient-primary flex items-center justify-center shrink-0">
                <section.icon className="h-5 w-5 text-white" />
              </div>
              <div>
                <h2 className="text-xl md:text-2xl font-bold text-title">{section.title}</h2>
                <p className="text-sm text-body-desc mt-0.5">{section.subtitle}</p>
              </div>
            </div>
            {section.paragraphs.map((p, j) => (
              <p key={j} className="text-sm md:text-base text-body2 leading-relaxed">
                {p}
              </p>
            ))}
          </article>
        ))}

      </div>
    </section>
  );
}
