import { Zap, Paintbrush, Download, Wand2 } from "lucide-react";
import { MODEL_LABELS } from "@/components/UploadPanel";

const features = [
  {
    icon: Zap,
    title: "免费使用",
    desc: "一键上传图片即可开始 AI 卡通化转换，无需付费、零门槛使用。",
    gradient: "from-[hsl(240,74%,61%)] to-[hsl(280,60%,65%)]",
    iconBg: "bg-gradient-to-br from-[hsl(240,74%,61%)] to-[hsl(280,60%,65%)]",
  },
  {
    icon: Wand2,
    title: "多模型驱动",
    descFn: (models: string[]) =>
      `支持 ${models.join("、")} 等多种先进 AI 模型，确保生成质量和风格多样性。`,
    gradient: "from-[hsl(162,63%,50%)] to-[hsl(200,70%,55%)]",
    iconBg: "bg-gradient-to-br from-[hsl(162,63%,50%)] to-[hsl(200,70%,55%)]",
  },
  {
    icon: Download,
    title: "高清无水印下载",
    desc: "生成的卡通图片高清无水印，可直接用于商业和个人用途，无需二次编辑。",
    gradient: "from-[hsl(30,90%,60%)] to-[hsl(350,80%,60%)]",
    iconBg: "bg-gradient-to-br from-[hsl(30,90%,60%)] to-[hsl(350,80%,60%)]",
  },
  {
    icon: Paintbrush,
    title: "自定义风格提示词",
    desc: "支持自定义提示词，精准控制卡通效果，打造独一无二的卡通形象。",
    gradient: "from-[hsl(300,60%,55%)] to-[hsl(240,74%,61%)]",
    iconBg: "bg-gradient-to-br from-[hsl(300,60%,55%)] to-[hsl(240,74%,61%)]",
  },
];

export function WhyChoose() {
  const modelNames = MODEL_LABELS.slice(0, 3);

  return (
    <section className="py-16 md:py-24 bg-card-alt">
      <div className="container px-4 md:px-8 max-w-5xl">
        <h2 className="text-2xl md:text-3xl font-bold text-title text-center mb-3">为什么选择 Rita</h2>
        <p className="text-body-desc text-center mb-14 max-w-xl mx-auto">
          强大的 AI 能力 + 极简操作体验，让每个人都能轻松创作卡通形象
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          {features.map((f) => (
            <div
              key={f.title}
              className="group relative rounded-2xl bg-card border border-border/40 p-7 shadow-soft hover:shadow-soft-lg transition-all duration-300 cursor-pointer hover:-translate-y-0.5"
            >
              {/* Subtle gradient accent line at top */}
              <div className={`absolute top-0 left-6 right-6 h-[2px] rounded-full bg-gradient-to-r ${f.gradient} opacity-60 group-hover:opacity-100 transition-opacity`} />

              <div className="flex items-start gap-4">
                <div className={`h-12 w-12 rounded-xl ${f.iconBg} flex items-center justify-center shrink-0 shadow-md`}>
                  <f.icon className="h-5.5 w-5.5 text-white" strokeWidth={2} />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="text-[15px] font-semibold text-title mb-1.5">{f.title}</h3>
                  <p className="text-sm text-body-desc leading-relaxed">
                    {f.descFn ? f.descFn(modelNames) : f.desc}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
