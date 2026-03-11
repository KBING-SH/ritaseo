import { useState } from "react";
import { ThemeToggle } from "@/components/ThemeToggle";
import { StyleSelector } from "@/components/StyleSelector";
import { UploadPanel } from "@/components/UploadPanel";
import { HowItWorks } from "@/components/HowItWorks";
import { WhyChoose } from "@/components/WhyChoose";
import { FAQSection } from "@/components/FAQSection";
import { ContentSections } from "@/components/ContentSections";
import { ToolkitSection } from "@/components/ToolkitSection";
import { Badge } from "@/components/ui/badge";

const Index = () => {
  return (
    <div className="min-h-screen bg-background transition-colors duration-300">
      {/* Top bar */}
      <header className="sticky top-0 z-40 h-16 border-b border-border/50 bg-background/80 backdrop-blur-md flex items-center justify-between px-4 md:px-8">
        <div className="flex items-center gap-2.5">
          <div className="h-8 w-8 rounded-lg gradient-primary" />
          <span className="text-base font-bold text-title">rita</span>
        </div>
        <ThemeToggle />
      </header>

      {/* Scrollable content */}
      <main>
        {/* Hero + Workspace: Full first screen */}
        <section className="min-h-[calc(100vh-4rem)] flex flex-col px-4 md:px-8 pt-8 md:pt-12 pb-4">
          <div className="max-w-[1400px] mx-auto w-full flex flex-col gap-6 flex-1">
            <div className="text-center">
              <Badge className="mb-4 rounded-full bg-primary/10 text-primary border-none px-3 py-1 text-xs font-medium">
                ✨ AI 驱动
              </Badge>
              <h1 className="text-2xl md:text-4xl font-bold text-primary leading-tight mb-3">
                免费在线照片转卡通
              </h1>
              <p className="text-muted-foreground text-sm md:text-base max-w-2xl mx-auto">
                上传你的照片，Rita AI 将为你生成多种风格的趣味卡通形象。支持人像、宠物、风景等多种照片类型，操作简单，几秒完成。
              </p>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-[1.6fr_1fr] gap-5 items-stretch">
              <StyleSelector />
              <UploadPanel />
            </div>
          </div>
        </section>

        {/* Content Sections (SEO rich text) */}
        <ContentSections />

        {/* How it works */}
        <HowItWorks />

        {/* Why choose */}
        <WhyChoose />

        {/* FAQ */}
        <FAQSection />

        {/* Toolkit */}
        <ToolkitSection />

        {/* Footer */}
        <footer className="border-t border-border/50 py-8">
          <div className="max-w-4xl mx-auto px-4 md:px-8 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-body-desc">
            <span>© 2026 rita. All rights reserved.</span>
            <div className="flex gap-6">
              {["隐私政策", "服务条款", "联系我们"].map((item) => (
                <a key={item} href="#" className="hover:text-title transition-colors cursor-pointer">
                  {item}
                </a>
              ))}
            </div>
          </div>
        </footer>
      </main>
    </div>
  );
};

export default Index;
