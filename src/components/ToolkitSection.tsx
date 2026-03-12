import { Image, Scaling, Eraser, Droplets, Sparkles, Clapperboard, Palette, Frame, Wand2, ImagePlus } from "lucide-react";

const tools = [
  { icon: Image, name: "AI 图片生成器", desc: "文本描述生成高质量图片" },
  { icon: Scaling, name: "AI 画质提升工具", desc: "低清图片一键放大增强" },
  { icon: Eraser, name: "AI 背景移除工具", desc: "智能抠图去除背景" },
  { icon: Droplets, name: "AI 水印去除工具", desc: "一键去除图片水印" },
  { icon: Sparkles, name: "AI 动漫形象生成器", desc: "生成专属动漫头像" },
  { icon: Palette, name: "AI 像素艺术生成器", desc: "照片转像素风格艺术" },
  { icon: Frame, name: "AI 吉卜力风格转换", desc: "照片转吉卜力动画风格" },
  { icon: ImagePlus, name: "AI 扩图工具", desc: "智能扩展图片画面" },
  { icon: Clapperboard, name: "AI 视频生成器", desc: "图片或文本生成视频" },
  { icon: Wand2, name: "AI 老照片修复", desc: "修复模糊老旧照片" },
];

export function ToolkitSection() {
  return (
    <section className="py-16 md:py-24 bg-card-alt">
      <div className="container px-4 md:px-8 max-w-6xl">
        <h2 className="text-2xl md:text-3xl font-bold text-title text-center mb-3">
          解锁更多 AI 图像能力
        </h2>
        <p className="text-body-desc text-center mb-12">
          满足您不同创作场景需求
        </p>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
          {tools.map((t) => (
            <div
              key={t.name}
              className="group rounded-xl bg-card border border-border/50 p-5 shadow-soft hover:shadow-soft-lg hover:-translate-y-0.5 transition-all duration-200 cursor-pointer text-center"
            >
              <div className="h-11 w-11 rounded-xl gradient-primary flex items-center justify-center mx-auto mb-3 group-hover:scale-105 transition-transform duration-200">
                <t.icon className="h-5 w-5 text-white" />
              </div>
              <h3 className="text-sm font-semibold text-title mb-1">{t.name}</h3>
              <p className="text-xs text-body-desc">{t.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
