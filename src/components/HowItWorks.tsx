import { useState, useEffect, useCallback } from "react";
import { StepUploadAnimation } from "./StepUploadAnimation";
import { StepStyleAnimation } from "./StepStyleAnimation";
import { StepDownloadAnimation } from "./StepDownloadAnimation";

const steps = [
  {
    step: "01",
    title: "上传照片",
    desc: "将人像、宠物或风景照片拖拽到上传区域，支持 PNG、JPG、WEBP 等主流格式，文件大小不超过 32MB。",
    color: "from-primary to-theme1",
  },
  {
    step: "02",
    title: "选择卡通风格并生成",
    desc: "选择你喜欢的卡通风格，点击生成按钮，Rita AI 将在几秒内完成高质量的卡通化转换。",
    color: "from-theme1 to-emerald-400",
  },
  {
    step: "03",
    title: "下载或分享",
    desc: "生成完成后可直接下载高清无水印卡通图片，或一键分享到社交媒体。",
    color: "from-theme2 to-primary",
  },
];

// Duration each animation plays before moving to next
const DURATIONS = [6500, 10000, 8600];

const COMPONENTS = [StepUploadAnimation, StepStyleAnimation, StepDownloadAnimation];

export function HowItWorks() {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => {
      setActiveIndex((prev) => (prev + 1) % 3);
    }, DURATIONS[activeIndex]);

    return () => clearTimeout(timer);
  }, [activeIndex]);

  return (
    <section className="py-16 md:py-24 bg-card-alt">
      <div className="container px-4 md:px-8">
        <h2 className="text-2xl md:text-3xl font-bold text-title text-center mb-3">使用步骤</h2>
        <p className="text-body-desc text-center mb-12">三步完成照片卡通化</p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {steps.map((s, i) => {
            const Component = COMPONENTS[i];
            const isActive = activeIndex === i;

            return (
              <div
                key={s.step}
                className={`group rounded-xl border bg-card shadow-soft hover:shadow-soft-lg transition-all duration-300 cursor-pointer hover:bg-hover-bg overflow-hidden ${
                  isActive ? "border-primary/30" : "border-border/50"
                }`}
              >
                <div className="w-full aspect-[8/5] overflow-hidden bg-muted/30">
                  {/* Re-mount component when it becomes active to restart animation */}
                  <Component key={isActive ? `active-${activeIndex}` : `idle-${i}`} active={isActive} />
                </div>
                <div className="p-6">
                  <div className="flex items-center gap-3 mb-3">
                    <div className={`inline-flex items-center justify-center h-10 w-10 rounded-xl bg-gradient-to-br ${s.color} shrink-0`}>
                      <span className="text-sm font-bold text-white">{s.step}</span>
                    </div>
                    <h3 className="text-lg font-semibold text-title">{s.title}</h3>
                  </div>
                  <p className="text-sm text-body-desc leading-relaxed">{s.desc}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
