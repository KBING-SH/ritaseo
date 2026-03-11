import { Image, Video, FileText, Bot } from "lucide-react";

const tools = [
  { icon: Image, name: "AI 图像生成", desc: "文本生成图像" },
  { icon: Video, name: "AI 视频生成", desc: "一键创建视频" },
  { icon: FileText, name: "智能文档", desc: "PDF 对话分析" },
  { icon: Bot, name: "AI 助手", desc: "多模型聊天" },
];

export function ToolkitSection() {
  return (
    <section className="py-16 md:py-24 bg-card-alt">
      <div className="container px-4 md:px-8">
        <h2 className="text-2xl md:text-3xl font-bold text-title text-center mb-3">更多 AI 工具</h2>
        <p className="text-body-desc text-center mb-10">探索更多效率工具</p>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {tools.map((t) => (
            <div
              key={t.name}
              className="rounded-xl bg-card border border-border/50 p-5 shadow-soft hover:shadow-soft-lg hover:bg-hover-bg transition-all duration-200 cursor-pointer text-center"
            >
              <div className="h-11 w-11 rounded-xl gradient-primary flex items-center justify-center mx-auto mb-3">
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
