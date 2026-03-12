import { Image, Scaling, Eraser, Droplets, Sparkles, Clapperboard, Palette, Frame, Wand2, ImagePlus } from "lucide-react";
import styleGhibli from "@/assets/style-ghibli.webp";
import stylePixel from "@/assets/style-pixel.webp";
import styleCute from "@/assets/style-cute.webp";
import styleInk from "@/assets/style-ink.webp";
import styleCartoon from "@/assets/style-cartoon.webp";
import sectionPortrait from "@/assets/section-portrait.webp";
import sectionPet from "@/assets/section-pet.webp";
import afterImg from "@/assets/after.webp";
import beforeImg from "@/assets/before.webp";
import styleRealistic from "@/assets/style-realistic.webp";

const tools = [
  { name: "AI 图片生成器", desc: "文本描述生成高质量图片", gradient: "from-[hsl(210,80%,75%)] to-[hsl(240,70%,80%)]", image: styleCartoon },
  { name: "AI 画质提升工具", desc: "低清图片一键放大增强", gradient: "from-[hsl(270,60%,78%)] to-[hsl(300,55%,75%)]", image: sectionPortrait },
  { name: "AI 背景移除工具", desc: "智能抠图去除背景", gradient: "from-[hsl(350,65%,75%)] to-[hsl(20,70%,78%)]", image: sectionPet },
  { name: "AI 水印去除工具", desc: "一键去除图片水印", gradient: "from-[hsl(260,55%,78%)] to-[hsl(210,65%,80%)]", image: beforeImg },
  { name: "AI 动漫形象生成器", desc: "生成专属动漫头像", gradient: "from-[hsl(200,70%,78%)] to-[hsl(170,60%,75%)]", image: styleCute },
  { name: "AI 像素艺术生成器", desc: "照片转像素风格艺术", gradient: "from-[hsl(15,75%,78%)] to-[hsl(40,70%,75%)]", image: stylePixel },
  { name: "AI 吉卜力风格转换", desc: "照片转吉卜力动画风格", gradient: "from-[hsl(45,65%,78%)] to-[hsl(80,55%,75%)]", image: styleGhibli },
  { name: "AI 头像生成器", desc: "智能生成个性头像", gradient: "from-[hsl(170,60%,75%)] to-[hsl(200,65%,78%)]", image: styleRealistic },
  { name: "AI 扩图工具", desc: "智能扩展图片画面", gradient: "from-[hsl(30,70%,78%)] to-[hsl(50,65%,75%)]", image: afterImg },
  { name: "AI 老照片修复", desc: "修复模糊老旧照片", gradient: "from-[hsl(180,55%,75%)] to-[hsl(210,60%,80%)]", image: styleInk },
];

export function ToolkitSection() {
  const repeated = [...tools, ...tools, ...tools, ...tools];

  return (
    <section className="py-16 md:py-24 bg-card-alt overflow-hidden">
      <div className="container px-4 md:px-8 max-w-6xl mb-10">
        <h2 className="text-2xl md:text-3xl font-bold text-title text-center mb-3">
          解锁更多 AI 图像能力
        </h2>
        <p className="text-body-desc text-center">
          满足您不同创作场景需求
        </p>
      </div>

      <div
        className="overflow-hidden"
        style={{ maskImage: "linear-gradient(to right, transparent, black 5%, black 95%, transparent)" }}
      >
        <div className="flex gap-5 w-max animate-marquee">
          {repeated.map((t, i) => (
            <div
              key={i}
              className="shrink-0 w-[220px] md:w-[260px] cursor-pointer group"
            >
              <div className={`rounded-2xl bg-gradient-to-br ${t.gradient} p-5 pb-0 overflow-hidden transition-all duration-300 group-hover:-translate-y-1 group-hover:shadow-soft-lg`}>
                <h3 className="text-sm font-bold text-title mb-6">{t.name}</h3>
                <div className="flex justify-center">
                  <img
                    src={t.image}
                    alt={t.name}
                    className="w-[85%] aspect-[3/4] object-cover object-top rounded-t-xl shadow-lg"
                    loading="lazy"
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
