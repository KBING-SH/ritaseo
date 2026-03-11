import { useState } from "react";
import { Menu } from "lucide-react";
import { AppSidebar } from "@/components/AppSidebar";
import { ThemeToggle } from "@/components/ThemeToggle";
import { StyleSelector } from "@/components/StyleSelector";
import { UploadPanel } from "@/components/UploadPanel";
import { HowItWorks } from "@/components/HowItWorks";
import { WhyChoose } from "@/components/WhyChoose";
import { FAQSection } from "@/components/FAQSection";
import { ToolkitSection } from "@/components/ToolkitSection";
import { Badge } from "@/components/ui/badge";

const Index = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex min-h-screen bg-background transition-colors duration-300">
      {/* Sidebar */}
      <AppSidebar mobileOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      {/* Main content */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top bar */}
        <header className="sticky top-0 z-40 h-16 border-b border-border/50 bg-background/80 backdrop-blur-md flex items-center justify-between px-4 md:px-8">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setSidebarOpen(true)}
              className="lg:hidden p-2 rounded-lg hover:bg-hover-bg transition-colors cursor-pointer"
            >
              <Menu className="h-5 w-5 text-body2" />
            </button>
            <div className="lg:hidden flex items-center gap-2">
              <div className="h-7 w-7 rounded-md gradient-primary" />
              <span className="font-bold text-title text-sm">TechFlow</span>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <ThemeToggle />
          </div>
        </header>

        {/* Scrollable content */}
        <main className="flex-1 overflow-y-auto">
          {/* Hero */}
          <section className="px-4 md:px-8 pt-10 pb-8 md:pt-14 md:pb-10">
            <div className="max-w-3xl">
              <Badge className="mb-4 rounded-full bg-primary/10 text-primary border-none px-3 py-1 text-xs font-medium">
                ✨ AI 驱动
              </Badge>
              <h1 className="text-2xl md:text-4xl font-bold text-title leading-tight mb-3">
                AI 风格转换：
                <span className="gradient-text">一键将照片变为艺术作品</span>
              </h1>
              <p className="text-body-desc text-sm md:text-base max-w-2xl">
                上传照片，选择风格，AI 在几秒内生成精美的卡通、插画、3D 等多种艺术风格图像。完全免费，无需注册。
              </p>
            </div>
          </section>

          {/* Workspace: Style Selector + Upload Panel */}
          <section className="px-4 md:px-8 pb-10 md:pb-16">
            <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.2fr] gap-5 max-w-6xl">
              <StyleSelector />
              <UploadPanel />
            </div>
          </section>

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
            <div className="container px-4 md:px-8 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-body-desc">
              <span>© 2026 TechFlow. All rights reserved.</span>
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
    </div>
  );
};

export default Index;
