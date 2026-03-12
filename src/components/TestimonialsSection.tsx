import { Star } from "lucide-react";
import { useEffect, useRef } from "react";
import { cn } from "@/lib/utils";

const testimonials = [
  {
    name: "小林",
    role: "自媒体博主",
    avatar: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=400&h=400&fit=crop",
    content: "用 Rita 把自拍转成吉卜力风格的头像，发到小红书上收到好多赞！操作非常简单，上传照片选风格就搞定了。",
    rating: 5,
  },
  {
    name: "Emily W.",
    role: "平面设计师",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop",
    content: "多模型切换功能非常实用，Kling V2 生成的细节很惊艳。作为设计师，直接省去了手绘卡通头像的时间。",
    rating: 5,
  },
  {
    name: "张明",
    role: "宠物摄影爱好者",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop",
    content: "给我家猫猫生成了超可爱的卡通形象！水墨风格特别有意境，已经打印出来挂在墙上了。",
    rating: 5,
  },
  {
    name: "Sophia L.",
    role: "产品经理",
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop",
    content: "团队头像统一用 Rita 生成卡通版本，效果非常统一且专业。自定义提示词功能可以精确控制想要的风格。",
    rating: 5,
  },
  {
    name: "王芳",
    role: "大学生",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&h=400&fit=crop",
    content: "免费无水印真的太良心了！用像素风格做了一套表情包，在班群里超火。8 种风格都试了，每种都不错。",
    rating: 5,
  },
  {
    name: "田中悠太",
    role: "内容创作者",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=400&fit=crop",
    content: "给旅行风景照做了卡通化处理，复古时尚风格出来的效果很惊喜，有种手绘质感，特别适合做明信片。",
    rating: 4,
  },
  {
    name: "Lisa Chen",
    role: "UI 设计师",
    avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400&h=400&fit=crop",
    content: "ChatGPT-image-1 模型的理解力真的强，输入提示词后生成的效果和预期非常接近，细节把控很到位。",
    rating: 5,
  },
  {
    name: "赵凯",
    role: "短视频运营",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop",
    content: "支持 1:1 和 2:3 比例切换很实用，做社交头像和手机壁纸都方便。生成速度也很快，几秒就出图。",
    rating: 5,
  },
];

const row1 = testimonials.slice(0, 4);
const row2 = testimonials.slice(4, 8);

function MarqueeRow({
  items,
  reverse = false,
}: {
  items: typeof testimonials;
  reverse?: boolean;
}) {
  return (
    <div className="relative overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]">
      <div
        className={cn(
          "flex gap-3 md:gap-5 w-max",
          reverse ? "animate-marquee-reverse" : "animate-marquee"
        )}
      >
        {[...items, ...items, ...items, ...items].map((t, i) => (
          <div
            key={i}
            className="w-[260px] md:w-[380px] shrink-0 rounded-xl md:rounded-2xl border border-border/50 bg-card p-3 md:p-5 shadow-soft hover:shadow-soft-lg transition-shadow duration-300"
          >
            <p className="text-xs md:text-sm text-body2 leading-relaxed md:leading-[1.75] mb-2 md:mb-4 line-clamp-3">
              "{t.content}"
            </p>
            <div className="flex gap-0.5 mb-2 md:mb-4">
              {Array.from({ length: 5 }).map((_, s) => (
                <Star
                  key={s}
                  className={cn(
                    "h-3 w-3",
                    s < t.rating
                      ? "text-amber-400 fill-amber-400"
                      : "text-border fill-border"
                  )}
                />
              ))}
            </div>
            <div className="flex items-center gap-2 md:gap-3">
              <img
                src={t.avatar}
                alt={t.name}
                className="h-7 w-7 md:h-9 md:w-9 rounded-full object-cover"
              />
              <div>
                <p className="text-xs md:text-sm font-semibold text-title leading-snug">
                  {t.name}
                </p>
                <p className="text-[10px] md:text-xs text-body-desc">{t.role}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export function TestimonialsSection() {
  return (
    <section className="py-16 md:py-24 overflow-hidden">
      <div className="container px-4 md:px-8 max-w-6xl mb-12">
        <h2 className="text-2xl md:text-3xl font-bold text-title text-center mb-3">
          用户怎么说
        </h2>
        <p className="text-body-desc text-center max-w-lg mx-auto">
          来自全球创作者的真实反馈
        </p>
      </div>

      <div className="space-y-5">
        <MarqueeRow items={row1} />
        <MarqueeRow items={row2} reverse />
      </div>
    </section>
  );
}
