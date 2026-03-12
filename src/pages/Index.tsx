import { ThemeToggle } from "@/components/ThemeToggle";
import { ProductFooterSection } from "@/components/ProductFooterSection";
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

              {/* Product columns - collapsible on mobile */}
              <ProductFooterSection />

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
