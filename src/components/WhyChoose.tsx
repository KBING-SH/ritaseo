import { Zap, Paintbrush, Download, Wand2, Sparkles, Shield } from "lucide-react";
import { MODEL_LABELS } from "@/components/UploadPanel";

const features = [
  {
    icon: Zap,
    title: "Free to Use",
    desc: "No sign-up or payment needed — just open and go. Upload a photo and generate a cartoon avatar in one click, with zero barriers to AI creation.",
    accent: "from-[hsl(45,100%,60%)] to-[hsl(30,95%,55%)]",
    iconBg: "bg-gradient-to-br from-[hsl(45,100%,60%)] to-[hsl(30,95%,55%)]",
    stat: "$0",
    statLabel: "Cost",
  },
  {
    icon: Wand2,
    title: "Multi-Model Powered",
    descFn: (models: string[]) =>
      `Built-in ${models.join(", ")} and more advanced AI models, each excelling at different styles, ensuring every generation is precise and impressive.`,
    accent: "from-[hsl(240,74%,61%)] to-[hsl(280,65%,60%)]",
    iconBg: "bg-gradient-to-br from-[hsl(240,74%,61%)] to-[hsl(280,65%,60%)]",
    stat: "7+",
    statLabel: "AI Models",
  },
  {
    icon: Download,
    title: "HD & Watermark-Free",
    desc: "Generated results are high-definition and watermark-free, ready to use for social avatars, content creation, commercial design, and more — no post-processing needed.",
    accent: "from-[hsl(162,63%,50%)] to-[hsl(180,60%,45%)]",
    iconBg: "bg-gradient-to-br from-[hsl(162,63%,50%)] to-[hsl(180,60%,45%)]",
    stat: "HD",
    statLabel: "Output Quality",
  },
  {
    icon: Sparkles,
    title: "Multiple Styles",
    desc: "Choose from Ghibli, Pixel, Ink, Retro Fashion, and many more popular styles — one photo, multiple creative options with unlimited inspiration.",
    accent: "from-[hsl(340,75%,55%)] to-[hsl(300,60%,55%)]",
    iconBg: "bg-gradient-to-br from-[hsl(340,75%,55%)] to-[hsl(300,60%,55%)]",
    stat: "8+",
    statLabel: "Styles",
  },
  {
    icon: Paintbrush,
    title: "Custom Prompts",
    desc: "Enter your own custom prompts to precisely control cartoon effect details and mood, creating a one-of-a-kind personalized image.",
    accent: "from-[hsl(200,80%,55%)] to-[hsl(220,75%,55%)]",
    iconBg: "bg-gradient-to-br from-[hsl(200,80%,55%)] to-[hsl(220,75%,55%)]",
    stat: "∞",
    statLabel: "Possibilities",
  },
  {
    icon: Shield,
    title: "Privacy & Security",
    desc: "Photos are only used to generate cartoon images. They are automatically deleted after processing — never stored or shared, keeping your privacy safe.",
    accent: "from-[hsl(150,55%,45%)] to-[hsl(162,63%,50%)]",
    iconBg: "bg-gradient-to-br from-[hsl(150,55%,45%)] to-[hsl(162,63%,50%)]",
    stat: "100%",
    statLabel: "Privacy",
  },
];

export function WhyChoose() {
  const modelNames = MODEL_LABELS.slice(0, 3);

  return (
    <section className="py-10 md:py-24 bg-card-alt">
      <div className="container px-4 md:px-8 max-w-6xl">
        <h2 className="text-xl md:text-3xl font-bold text-title text-center mb-2 md:mb-3">
          Why Choose Rita
        </h2>
        <p className="text-sm md:text-base text-body-desc text-center mb-8 md:mb-14 max-w-xl mx-auto">
          Powerful AI + simple workflow — making cartoon creation accessible to everyone
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5">
          {features.map((f) => (
            <div
              key={f.title}
              className="group relative rounded-2xl bg-card border border-border/40 p-4 md:p-6 shadow-soft hover:shadow-soft-lg transition-all duration-300 hover:-translate-y-1 overflow-hidden"
            >
              {/* Top accent bar */}
              <div
                className={`absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r ${f.accent} opacity-0 group-hover:opacity-100 transition-opacity duration-300`}
              />

              {/* Stat badge */}
              <div className="flex items-start justify-between mb-5">
                <div className="flex items-center gap-3">
                  <div className={`h-12 w-12 rounded-xl ${f.iconBg} flex items-center justify-center shadow-md shrink-0`}>
                    <f.icon className="h-5 w-5 text-white" strokeWidth={2} />
                  </div>
                  <h3 className="text-[15px] font-semibold text-title">{f.title}</h3>
                </div>
                <div className="text-right shrink-0">
                  <div className={`text-xl font-bold bg-gradient-to-r ${f.accent} bg-clip-text text-transparent`}>
                    {f.stat}
                  </div>
                  <div className="text-[11px] text-body-desc">{f.statLabel}</div>
                </div>
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
