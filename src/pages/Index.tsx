import { ThemeToggle } from "@/components/ThemeToggle";
import { StyleSelector } from "@/components/StyleSelector";
import { UploadPanel } from "@/components/UploadPanel";
import { SocialProofBar } from "@/components/SocialProofBar";
import { HowItWorks } from "@/components/HowItWorks";
import { ArtGallery } from "@/components/ArtGallery";
import { WhyChoose } from "@/components/WhyChoose";
import { FAQSection } from "@/components/FAQSection";
import { ContentSections } from "@/components/ContentSections";
import { ToolkitSection } from "@/components/ToolkitSection";
import { TestimonialsSection } from "@/components/TestimonialsSection";

const Index = () => {
  return (
    <div className="min-h-screen bg-background transition-colors duration-300">
      {/* Top bar */}
      <header className="sticky top-0 z-40 h-16 border-b border-border/50 bg-background/80 backdrop-blur-md flex items-center justify-between px-4 md:px-8">
        <div className="flex items-center gap-2.5">
          <div className="h-8 w-8 rounded-lg gradient-primary" />
          <span className="text-base font-bold text-title">Rita</span>
        </div>
        <ThemeToggle />
      </header>

      {/* Scrollable content */}
      <main>
        {/* Hero + Workspace: Full first screen */}
        <section className="h-[calc(100vh-4rem)] flex flex-col items-center justify-start px-4 md:px-8 pt-[6vh] overflow-hidden">
          <div className="max-w-[1540px] mx-auto w-full flex flex-col gap-6">
            <div className="text-center">
              <h1 className="text-3xl md:text-5xl font-bold text-primary leading-tight mb-4">
                免费在线照片转卡通
              </h1>
              <p className="text-muted-foreground text-base md:text-lg max-w-2xl mx-auto">
                上传你的照片，Rita AI 将为你生成多种风格的趣味卡通形象。支持人像、宠物、风景等多种照片类型，操作简单，几秒完成。
              </p>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-[1.6fr_1fr] gap-5 items-stretch">
              <StyleSelector />
              <UploadPanel />
            </div>
          </div>
        </section>

        {/* Social Proof */}
        <SocialProofBar />

        {/* How it works */}
        <HowItWorks />

        {/* Art Gallery */}
        <ArtGallery />

        {/* Content Sections (SEO rich text) */}
        <ContentSections />

        {/* Why choose */}
        <WhyChoose />

        {/* Testimonials */}
        <TestimonialsSection />

        {/* FAQ */}
        <FAQSection />

        {/* Toolkit */}
        <ToolkitSection />

        {/* Footer */}
        <footer className="border-t border-border/50 bg-card-alt">
          <div className="max-w-[1400px] mx-auto px-4 md:px-8 py-12 md:py-16">
            <div className="flex flex-col lg:flex-row gap-12 lg:gap-10 mb-12">
              {/* Brand */}
              <div className="lg:w-40 shrink-0 space-y-2">
                <div className="flex items-center gap-2.5">
                  <div className="h-9 w-9 rounded-xl gradient-primary" />
                  <span className="text-xl font-bold text-title italic">Rita</span>
                </div>
                <p className="text-xs text-muted-foreground leading-snug">Rita让创意和效率人人可得</p>
              </div>

              {/* Product columns */}
              <div className="flex-1">
                <h4 className="font-bold text-title mb-4 text-sm">产品</h4>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-x-6 gap-y-6 text-sm">
                  {[
                    { title: "AI 对话", links: ["Rita", "Rita Pro", "ChatGPT 5.4", "ChatGPT 5.2", "Gemini 3.1 Pro", "Claude Opus 4.6", "Claude Sonnet 4.6", "Claude Opus 4.5", "Gemini 3 Pro", "Claude 4.5 Sonnet", "ChatGPT 5.1", "DeepSeek V3.1", "Grok 4.1", "ChatGPT 4o", "ChatGPT 5"] },
                    { title: "AI 图片", links: ["Nano Banana 2", "Nano Banana Pro", "Midjourney", "ChatGPT Image", "Flux", "Stable Diffusion", "Kling"] },
                    { title: "AI 视频", links: ["Veo", "Kling"] },
                    { title: "AI 音频", links: ["Suno"] },
                    { title: "AI 艺术工具", links: ["AI 图片生成器", "AI 画质提升工具", "AI 背景移除工具", "AI 水印去除工具", "AI 照片转卡通工具", "AI 圣诞形象生成器", "AI 吉卜力风格转换器", "AI 标志生成器", "AI 像素艺术生成器", "AI 海报生成器", "AI 视频生成器", "AI 扩图工具", "AI 皮克斯风格生成器", "AI 头像生成器", "AI 老照片修复器", "Seedance 2.0"] },
                    { title: "AI 工具", links: ["AI 检测器", "AI 人性化工具", "AI 数学解题器", "AI 故事生成器", "AI 改写器", "AI 图片转文字工具", "AI 论文写作工具", "AI 图片翻译工具", "AI 邮件生成器", "AI 算命师", "AI 翻译器", "AI 化学解题器"] },
                  ].map((col) => (
                    <div key={col.title}>
                      <h5 className="font-semibold text-title mb-2 text-xs">{col.title}</h5>
                      <ul className="space-y-1.5">
                        {col.links.map((link) => (
                          <li key={link}>
                            <a href="#" className="text-xs text-body-desc hover:text-primary transition-colors">{link}</a>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </div>

              {/* About & Compliance */}
              <div className="flex gap-10 lg:gap-12 shrink-0 text-sm">
                <div>
                  <h4 className="font-bold text-title mb-4 text-sm">关于</h4>
                  <ul className="space-y-1.5">
                    {["关于我们", "联系我们"].map((l) => (
                      <li key={l}><a href="#" className="text-xs text-body-desc hover:text-primary transition-colors">{l}</a></li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h4 className="font-bold text-title mb-4 text-sm">合规</h4>
                  <ul className="space-y-1.5">
                    {["条款条件", "隐私政策", "版权政策", "退款政策", "AML政策"].map((l) => (
                      <li key={l}><a href="#" className="text-xs text-body-desc hover:text-primary transition-colors">{l}</a></li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>

            {/* Bottom bar */}
            <div className="border-t border-border/50 pt-6 text-xs text-body-desc text-center">
              © 2026 Rita. All rights reserved.
            </div>
          </div>
        </footer>
      </main>
    </div>
  );
};

export default Index;
