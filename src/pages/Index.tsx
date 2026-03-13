import { ThemeToggle } from "@/components/ThemeToggle";
import { ProductFooterSection } from "@/components/ProductFooterSection";
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
      <header className="sticky top-0 z-40 h-14 border-b border-border/50 bg-background/80 backdrop-blur-md flex items-center justify-between px-4 md:px-8">
        <div className="flex items-center gap-2.5">
          <div className="h-8 w-8 rounded-lg gradient-primary" />
          <span className="text-base font-bold text-title">Rita</span>
        </div>
        <ThemeToggle />
      </header>

      {/* Main layout: sidebar + content */}
      <div className="flex">
        {/* Left sidebar - operation panel */}
        <aside className="hidden lg:flex w-[320px] xl:w-[340px] shrink-0 border-r border-border/50 bg-card sticky top-14 h-[calc(100vh-3.5rem)]">
          <UploadPanel />
        </aside>

        {/* Right: scrollable content */}
        <div className="flex-1 min-w-0">
          {/* Mobile: show UploadPanel inline */}
          <div className="lg:hidden px-4 pt-4">
            <UploadPanel />
          </div>

          {/* Hero section */}
          <section className="px-4 md:px-8 pt-6 md:pt-10 pb-6 md:pb-10">
            <div className="max-w-[1100px] mx-auto">
              <div className="text-center mb-6 md:mb-8">
                <h1 className="text-2xl md:text-4xl font-bold text-primary leading-tight mb-2 md:mb-3">
                  免费在线照片转卡通
                </h1>
                <p className="text-muted-foreground text-sm md:text-base max-w-2xl mx-auto">
                  上传你的照片，Rita AI 将为你生成多种风格的趣味卡通形象。支持人像、宠物、风景等多种照片类型，操作简单，几秒完成。
                </p>
              </div>
              <div className="max-w-[900px] mx-auto">
                <StyleSelector />
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
            <div className="max-w-[1100px] mx-auto px-4 md:px-8 py-12 md:py-16">
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
        </div>
      </div>
    </div>
  );
};

export default Index;
