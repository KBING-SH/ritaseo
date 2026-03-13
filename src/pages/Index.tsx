import { useState, useCallback, useRef } from "react";
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
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Loader2, ChevronLeft, ChevronRight, X, Trash2 } from "lucide-react";

const RATIO_ASPECT: Record<string, string> = {
  "auto": "16/9", "1:1": "1/1", "16:9": "16/9", "9:16": "9/16",
  "4:3": "4/3", "3:4": "3/4", "2:3": "2/3", "3:2": "3/2",
  "5:4": "5/4", "4:5": "4/5",
};

const Index = () => {
  const [generatedImg, setGeneratedImg] = useState<string | null>(null);
  const [generatedRatio, setGeneratedRatio] = useState("16/9");
  const [isGenerating, setIsGenerating] = useState(false);
  const [history, setHistory] = useState<{ img: string; ratio: string; ratioLabel: string; time: Date }[]>([]);
  const [selectedHistoryIdx, setSelectedHistoryIdx] = useState<number | null>(null);
  const historyRef = useRef<HTMLDivElement>(null);

  const handleGenerate = useCallback((styleImg: string, ratio: string) => {
    setIsGenerating(true);
    setGeneratedImg(null);
    const aspectRatio = RATIO_ASPECT[ratio] || "16/9";
    setTimeout(() => {
      setGeneratedImg(styleImg);
      setGeneratedRatio(aspectRatio);
      setIsGenerating(false);
      setHistory((prev) => {
        const next = [{ img: styleImg, ratio: aspectRatio, ratioLabel: ratio, time: new Date() }, ...prev];
        return next.slice(0, 30);
      });
      setSelectedHistoryIdx(0);
    }, 2000);
  }, []);

  const scrollHistory = (dir: number) => {
    historyRef.current?.scrollBy({ left: dir * 200, behavior: "smooth" });
  };
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
          <UploadPanel onGenerate={handleGenerate} />
        </aside>

        {/* Mobile/Tablet: UploadPanel */}
        <div className="flex-1 min-w-0 flex flex-col overflow-visible lg:overflow-hidden">
          <div className="lg:hidden flex-1 min-h-0 overflow-visible">
            <UploadPanel onGenerate={handleGenerate} />
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
            <div className={`flex-1 min-h-0 w-full px-4 flex items-end justify-center ${history.length > 0 ? "pb-4" : "pb-[180px]"}`}>
              {isGenerating ? (
                <div className="h-full max-w-full rounded-2xl border border-border/50 bg-muted/30 flex flex-col items-center justify-center gap-3" style={{ aspectRatio: generatedRatio }}>
                  <Loader2 className="w-10 h-10 text-primary animate-spin" />
                  <p className="text-sm text-muted-foreground">正在生成中...</p>
                </div>
              ) : generatedImg ? (
                <div className="h-full max-w-full rounded-2xl overflow-hidden border border-border/50 shadow-lg animate-fade-in" style={{ aspectRatio: generatedRatio }}>
                  <img src={generatedImg} alt="生成结果" className="w-full h-full object-cover" />
                </div>
              ) : (
                <div className="w-full max-h-full aspect-[16/9] rounded-2xl overflow-hidden">
                  <StyleSelector />
                </div>
              )}
            </div>

            {/* History strip */}
            {history.length > 0 && (
              <div className="shrink-0 w-full px-4 pb-3">
                {/* Header */}
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-baseline gap-2">
                    <span className="text-sm font-semibold text-title">历史</span>
                    <span className="text-[11px] text-muted-foreground">最多保存30次记录</span>
                  </div>
                  <button
                    onClick={() => { setHistory([]); setSelectedHistoryIdx(null); setGeneratedImg(null); }}
                    className="text-muted-foreground hover:text-destructive transition-colors"
                    title="清空历史"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
                {/* Thumbnails */}
                <div className="flex items-start gap-2">
                  {history.length > 6 && (
                    <button
                      onClick={() => scrollHistory(-1)}
                      className="shrink-0 w-7 h-7 mt-6 rounded-full border border-border bg-card flex items-center justify-center hover:bg-muted transition-colors"
                    >
                      <ChevronLeft className="w-4 h-4 text-title" />
                    </button>
                  )}
                  <div
                    ref={historyRef}
                    className="flex-1 flex gap-3 overflow-x-auto scrollbar-hide"
                  >
                    {history.map((item, i) => (
                      <div key={i} className="shrink-0 flex flex-col items-center gap-1 pt-2 pr-2">
                        <div className="relative">
                          <button
                            onClick={() => {
                              setGeneratedImg(item.img);
                              setGeneratedRatio(item.ratio);
                              setSelectedHistoryIdx(i);
                            }}
                            className={`w-20 h-20 rounded-xl flex items-center justify-center border-2 transition-all ${
                              item.ratio !== "1/1" ? "bg-muted/50" : ""
                            } ${
                              selectedHistoryIdx === i ? "border-primary shadow-sm" : "border-border/30 hover:border-primary/40"
                            }`}
                          >
                            <div
                              className="rounded-lg overflow-hidden max-w-[72px] max-h-[72px]"
                              style={{ aspectRatio: item.ratio }}
                            >
                              <img src={item.img} alt={`历史记录 ${i + 1}`} className="w-full h-full object-cover" />
                            </div>
                          </button>
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              setHistory((prev) => prev.filter((_, idx) => idx !== i));
                              if (selectedHistoryIdx === i) {
                                setSelectedHistoryIdx(null);
                                setGeneratedImg(null);
                              } else if (selectedHistoryIdx !== null && selectedHistoryIdx > i) {
                                setSelectedHistoryIdx(selectedHistoryIdx - 1);
                              }
                            }}
                            className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-foreground/60 hover:bg-foreground/80 flex items-center justify-center transition-colors z-10"
                          >
                            <X className="w-3 h-3 text-background" />
                          </button>
                        </div>
                        <span className="text-[9px] font-medium text-muted-foreground">{item.ratioLabel}</span>
                        <span className="text-[9px] text-muted-foreground">
                          {item.time.toLocaleDateString("zh-CN")} {item.time.toLocaleTimeString("zh-CN", { hour: "2-digit", minute: "2-digit", second: "2-digit" })}
                        </span>
                      </div>
                    ))}
                  </div>
                  {history.length > 6 && (
                    <button
                      onClick={() => scrollHistory(1)}
                      className="shrink-0 w-7 h-7 mt-6 rounded-full border border-border bg-card flex items-center justify-center hover:bg-muted transition-colors"
                    >
                      <ChevronRight className="w-4 h-4 text-title" />
                    </button>
                  )}
                </div>
              </div>
            )}
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
