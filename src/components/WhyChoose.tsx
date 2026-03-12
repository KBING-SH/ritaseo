import { Zap, Paintbrush, Download, Wand2, Sparkles, Shield } from "lucide-react";
import { MODEL_LABELS } from "@/components/UploadPanel";

const features = [
  {
    icon: Zap,
    title: "完全免费",
    desc: "无需注册、无需付费，打开即用。上传照片一键生成卡通形象，零门槛体验 AI 创作。",
    accent: "from-[hsl(45,100%,60%)] to-[hsl(30,95%,55%)]",
    iconBg: "bg-gradient-to-br from-[hsl(45,100%,60%)] to-[hsl(30,95%,55%)]",
    stat: "0元",
    statLabel: "使用成本",
  },
  {
    icon: Wand2,
    title: "多模型驱动",
    descFn: (models: string[]) =>
      `内置 ${models.join("、")} 等先进 AI 模型，不同模型擅长不同风格，确保每次生成都精准出色。`,
    accent: "from-[hsl(240,74%,61%)] to-[hsl(280,65%,60%)]",
    iconBg: "bg-gradient-to-br from-[hsl(240,74%,61%)] to-[hsl(280,65%,60%)]",
    stat: "7+",
    statLabel: "AI 模型",
  },
  {
    icon: Download,
    title: "高清无水印",
    desc: "生成结果高清无水印，可直接用于社交头像、内容创作、商业设计等场景，无需二次处理。",
    accent: "from-[hsl(162,63%,50%)] to-[hsl(180,60%,45%)]",
    iconBg: "bg-gradient-to-br from-[hsl(162,63%,50%)] to-[hsl(180,60%,45%)]",
    stat: "HD",
    statLabel: "输出画质",
  },
  {
    icon: Sparkles,
    title: "8 种卡通风格",
    desc: "吉卜力、像素、水墨、复古时尚等 8 种热门风格可选，一张照片多种玩法，灵感不受限。",
    accent: "from-[hsl(340,75%,55%)] to-[hsl(300,60%,55%)]",
    iconBg: "bg-gradient-to-br from-[hsl(340,75%,55%)] to-[hsl(300,60%,55%)]",
    stat: "8",
    statLabel: "风格可选",
  },
  {
    icon: Paintbrush,
    title: "自定义提示词",
    desc: "支持输入自定义提示词，精准控制卡通效果的细节和氛围，打造独一无二的个性形象。",
    accent: "from-[hsl(200,80%,55%)] to-[hsl(220,75%,55%)]",
    iconBg: "bg-gradient-to-br from-[hsl(200,80%,55%)] to-[hsl(220,75%,55%)]",
    stat: "∞",
    statLabel: "创意可能",
  },
  {
    icon: Shield,
    title: "隐私安全",
    desc: "照片仅用于生成卡通图片，处理完成后自动删除，不存储、不分享，保障你的隐私安全。",
    accent: "from-[hsl(150,55%,45%)] to-[hsl(162,63%,50%)]",
    iconBg: "bg-gradient-to-br from-[hsl(150,55%,45%)] to-[hsl(162,63%,50%)]",
    stat: "100%",
    statLabel: "隐私保障",
  },
];

export function WhyChoose() {
  const modelNames = MODEL_LABELS.slice(0, 3);

  return (
    <section className="py-16 md:py-24 bg-card-alt">
      <div className="container px-4 md:px-8 max-w-6xl">
        <h2 className="text-2xl md:text-3xl font-bold text-title text-center mb-3">
          为什么选择 Rita
        </h2>
        <p className="text-body-desc text-center mb-14 max-w-xl mx-auto">
          强大的 AI 能力 + 极简操作体验，让每个人都能轻松创作卡通形象
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {features.map((f) => (
            <div
              key={f.title}
              className="group relative rounded-2xl bg-card border border-border/40 p-6 shadow-soft hover:shadow-soft-lg transition-all duration-300 hover:-translate-y-1 overflow-hidden"
            >
              {/* Top accent bar */}
              <div
                className={`absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r ${f.accent} opacity-0 group-hover:opacity-100 transition-opacity duration-300`}
              />

              {/* Stat badge */}
              <div className="flex items-start justify-between mb-5">
                <div className={`h-12 w-12 rounded-xl ${f.iconBg} flex items-center justify-center shadow-md`}>
                  <f.icon className="h-5 w-5 text-white" strokeWidth={2} />
                </div>
                <div className="text-right">
                  <div className={`text-xl font-bold bg-gradient-to-r ${f.accent} bg-clip-text text-transparent`}>
                    {f.stat}
                  </div>
                  <div className="text-[11px] text-body-desc">{f.statLabel}</div>
                </div>
              </div>

              <h3 className="text-[15px] font-semibold text-title mb-2">{f.title}</h3>
              <p className="text-sm text-body-desc leading-relaxed">
                {f.descFn ? f.descFn(modelNames) : f.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
