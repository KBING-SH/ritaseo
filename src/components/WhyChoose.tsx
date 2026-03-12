import { Zap, Paintbrush, Download, Wand2 } from "lucide-react";
import { MODEL_LABELS } from "@/components/UploadPanel";

const features = [
  {
    icon: Zap,
    title: "免费使用",
    desc: "一键上传图片即可开始 AI 卡通化转换，无需付费、零门槛使用。",
  },
  {
    icon: Wand2,
    title: "多模型驱动",
    descFn: (models: string[]) =>
      `支持 ${models.join("、")} 等多种先进 AI 模型，确保生成质量和风格多样性。`,
  },
  {
    icon: Download,
    title: "高清无水印下载",
    desc: "生成的卡通图片高清无水印，可直接用于商业和个人用途，无需二次编辑。",
  },
  {
    icon: Paintbrush,
    title: "自定义风格提示词",
    desc: "支持自定义提示词，精准控制卡通效果，打造独一无二的卡通形象。",
  },
];

export function WhyChoose() {
  const modelNames = MODEL_LABELS.slice(0, 3);

  return (
    <section className="py-16 md:py-24 bg-card-alt">
      <div className="container px-4 md:px-8">
        <h2 className="text-2xl md:text-3xl font-bold text-title text-center mb-3">为什么选择 Rita</h2>
        <p className="text-body-desc text-center mb-12 max-w-xl mx-auto">
          强大的 AI 能力 + 极简操作体验，让每个人都能轻松创作卡通形象
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {features.map((f) => (
            <div
              key={f.title}
              className="rounded-xl bg-card border border-border/50 p-6 shadow-soft hover:shadow-soft-lg transition-all duration-200 cursor-pointer hover:bg-hover-bg"
            >
              <div className="flex items-center gap-3 mb-3">
                <div className="h-11 w-11 rounded-xl gradient-primary flex items-center justify-center shrink-0">
                  <f.icon className="h-5 w-5 text-white" />
                </div>
                <h3 className="text-base font-semibold text-title">{f.title}</h3>
              </div>
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
