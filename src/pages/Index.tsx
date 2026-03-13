import { useState, useCallback } from "react";
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
import { Loader2 } from "lucide-react";

const RATIO_ASPECT: Record<string, string> = {
  "auto": "16/9", "1:1": "1/1", "16:9": "16/9", "9:16": "9/16",
  "4:3": "4/3", "3:4": "3/4", "2:3": "2/3", "3:2": "3/2",
  "5:4": "5/4", "4:5": "4/5",
};

const Index = () => {
  const [generatedImg, setGeneratedImg] = useState<string | null>(null);
  const [generatedRatio, setGeneratedRatio] = useState("16/9");
  const [isGenerating, setIsGenerating] = useState(false);

  const handleGenerate = useCallback((styleImg: string, ratio: string) => {
    setIsGenerating(true);
    setGeneratedImg(null);
    // Simulate generation delay
    setTimeout(() => {
      setGeneratedImg(styleImg);
      setGeneratedRatio(RATIO_ASPECT[ratio] || "16/9");
      setIsGenerating(false);
    }, 2000);
  }, []);
  return (
    <div className="min-h-screen bg-background transition-colors duration-300 relative">
      {/* Theme toggle - desktop top right */}
      <div className="hidden lg:block fixed top-4 right-4 z-50">
        <ThemeToggle />
      </div>

      {/* First screen */}
      <section className="h-screen flex flex-col lg:flex-row">
        {/* Mobile/Tablet header inside first screen */}
        <div className="lg:hidden h-12 shrink-0 border-b border-border/50 bg-background/80 backdrop-blur-md flex items-center justify-between px-4">
          <div className="flex items-center gap-2.5">
            <div className="h-7 w-7 rounded-lg gradient-primary" />
            <span className="text-sm font-bold text-title">Rita</span>
          </div>
          <ThemeToggle />
        </div>

        {/* Left sidebar - desktop */}
        <aside className="hidden lg:flex w-[397px] xl:w-[422px] shrink-0 border-r border-border/50 bg-card">
          <UploadPanel />
        </aside>

        {/* Mobile/Tablet: UploadPanel */}
        <div className="flex-1 min-w-0 flex flex-col overflow-visible lg:overflow-hidden">
          <div className="lg:hidden flex-1 min-h-0 overflow-visible">
            <UploadPanel />
          </div>

          {/* Hero content - only visible on desktop */}
          <div className="hidden lg:flex flex-col items-center justify-start pt-4 px-4 md:px-6 flex-1 overflow-hidden">
            <div className="text-center shrink-0 mb-4">
              <h1 className="text-3xl md:text-5xl font-bold text-title leading-tight mb-3 md:mb-4">
                免费在线照片转卡通
              </h1>
              <p className="text-muted-foreground text-sm md:text-lg max-w-2xl mx-auto leading-relaxed">
                上传你的照片，Rita AI 将为你生成多种风格的趣味卡通形象。支持人像、宠物、风景等多种照片类型，操作简单，几秒完成。
              </p>
            </div>
            <div className="flex-1 min-h-0 w-full px-4 pb-40 flex items-end justify-center">
              <div className="w-full max-h-full aspect-[16/9] rounded-2xl overflow-hidden">
                <StyleSelector />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Below first screen: sidebar sticks, content scrolls */}
      {/* Below first screen: full-width content */}
      <div>
          <SocialProofBar />
          <HowItWorks />
          <ArtGallery />
          <ContentSections />
          <WhyChoose />
          <TestimonialsSection />
          <FAQSection />
          <ToolkitSection />

          {/* Footer */}
          <footer className="border-t border-border/50 bg-card-alt">
            <div className="max-w-[1100px] mx-auto px-4 md:px-8 py-12 md:py-16">
              <div className="flex flex-col lg:flex-row gap-12 lg:gap-10 mb-12">
                <div className="lg:w-40 shrink-0 space-y-2">
                  <div className="flex items-center gap-2.5">
                    <div className="h-9 w-9 rounded-xl gradient-primary" />
                    <span className="text-xl font-bold text-title italic">Rita</span>
                  </div>
                  <p className="text-xs text-muted-foreground leading-snug">Rita让创意和效率人人可得</p>
                </div>
                <ProductFooterSection />
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
              <div className="border-t border-border/50 pt-6 text-xs text-body-desc text-center">
                © 2026 Rita. All rights reserved.
              </div>
            </div>
          </footer>
      </div>
    </div>
  );
};

export default Index;
