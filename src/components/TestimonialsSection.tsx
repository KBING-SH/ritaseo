import { Star, Quote } from "lucide-react";

const testimonials = [
  {
    name: "小林",
    role: "自媒体博主",
    avatar: "🧑‍💻",
    rating: 5,
    content: "用 Rita 把自拍转成吉卜力风格的头像，发到小红书上收到好多赞！操作非常简单，上传照片选风格就搞定了，比我之前用的工具快很多。",
  },
  {
    name: "Emily W.",
    role: "平面设计师",
    avatar: "👩‍🎨",
    rating: 5,
    content: "作为设计师我经常需要快速生成卡通风格的素材，Rita 的多模型切换功能非常实用。Kling V2 生成的细节真的很惊艳，直接省去了手绘的时间。",
  },
  {
    name: "张明",
    role: "宠物摄影爱好者",
    avatar: "📸",
    rating: 5,
    content: "给我家猫猫生成了超可爱的卡通形象，朋友们都说想要！水墨风格的效果特别有意境，已经打印出来挂在墙上了。",
  },
  {
    name: "Alex K.",
    role: "产品经理",
    avatar: "💼",
    rating: 5,
    content: "团队头像统一用 Rita 生成卡通版本，效果非常统一且专业。支持自定义提示词这个功能很棒，可以精确控制想要的风格。",
  },
  {
    name: "王芳",
    role: "大学生",
    avatar: "🎓",
    rating: 5,
    content: "免费无水印真的太良心了！我用像素风格做了一套表情包，在班群里火了。8 种风格都试了一遍，每种效果都很不错。",
  },
  {
    name: "田中悠太",
    role: "内容创作者",
    avatar: "✍️",
    rating: 4,
    content: "用 Rita 给旅行风景照做了卡通化处理，配上文字做成明信片送给朋友。复古时尚风格出来的效果很惊喜，有种手绘质感。",
  },
];

export function TestimonialsSection() {
  return (
    <section className="py-16 md:py-24">
      <div className="container px-4 md:px-8 max-w-6xl">
        {/* Header */}
        <div className="text-center mb-14">
          <h2 className="text-2xl md:text-3xl font-bold text-title mb-3">
            用户怎么说
          </h2>
          <p className="text-body-desc max-w-lg mx-auto">
            来自全球创作者的真实反馈
          </p>
        </div>

        {/* Testimonials grid */}
        <div className="columns-1 sm:columns-2 lg:columns-3 gap-5 space-y-5">
          {testimonials.map((t, i) => (
            <div
              key={i}
              className="break-inside-avoid rounded-2xl border border-border/50 bg-card p-6 shadow-soft hover:shadow-soft-lg transition-all duration-300 hover:-translate-y-0.5"
            >
              {/* Quote icon */}
              <Quote className="h-5 w-5 text-primary/30 mb-3" />

              {/* Content */}
              <p className="text-sm text-body2 leading-[1.8] mb-5">
                "{t.content}"
              </p>

              {/* Rating */}
              <div className="flex gap-0.5 mb-4">
                {Array.from({ length: 5 }).map((_, s) => (
                  <Star
                    key={s}
                    className={`h-3.5 w-3.5 ${
                      s < t.rating
                        ? "text-amber-400 fill-amber-400"
                        : "text-border fill-border"
                    }`}
                  />
                ))}
              </div>

              {/* Author */}
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-full bg-muted flex items-center justify-center text-lg">
                  {t.avatar}
                </div>
                <div>
                  <p className="text-sm font-semibold text-title leading-snug">
                    {t.name}
                  </p>
                  <p className="text-xs text-body-desc">{t.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
