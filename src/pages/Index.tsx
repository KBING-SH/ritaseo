import { useState, useCallback } from "react";
import { ThemeToggle } from "@/components/ThemeToggle";
import ritaLogo from "@/assets/rita-logo.webp";
import { ProductFooterSection } from "@/components/ProductFooterSection";
import { MathInputPanel } from "@/components/MathInputPanel";
import { MathResultDisplay } from "@/components/MathResultDisplay";

import { HowItWorks } from "@/components/HowItWorks";
import { WhyChoose } from "@/components/WhyChoose";
import { FAQSection } from "@/components/FAQSection";
import { ContentSections } from "@/components/ContentSections";
import { ToolkitSection } from "@/components/ToolkitSection";
import { TestimonialsSection } from "@/components/TestimonialsSection";
import { ToolFeatures } from "@/components/ToolFeatures";

const STREAM_URL = `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/math-solver`;

const Index = () => {
  const [solution, setSolution] = useState("");
  const [isSolving, setIsSolving] = useState(false);

  const handleSolve = useCallback(async (question: string, imageBase64?: string) => {
    setIsSolving(true);
    setSolution("");

    try {
      const resp = await fetch(STREAM_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY}`,
        },
        body: JSON.stringify({ question, imageBase64 }),
      });

      if (!resp.ok || !resp.body) {
        const errorData = await resp.json().catch(() => ({}));
        setSolution(`Error: ${errorData.error || "Failed to solve. Please try again."}`);
        setIsSolving(false);
        return;
      }

      const reader = resp.body.getReader();
      const decoder = new TextDecoder();
      let buffer = "";
      let accumulated = "";

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        buffer += decoder.decode(value, { stream: true });

        let newlineIndex: number;
        while ((newlineIndex = buffer.indexOf("\n")) !== -1) {
          let line = buffer.slice(0, newlineIndex);
          buffer = buffer.slice(newlineIndex + 1);

          if (line.endsWith("\r")) line = line.slice(0, -1);
          if (line.startsWith(":") || line.trim() === "") continue;
          if (!line.startsWith("data: ")) continue;

          const jsonStr = line.slice(6).trim();
          if (jsonStr === "[DONE]") break;

          try {
            const parsed = JSON.parse(jsonStr);
            const content = parsed.choices?.[0]?.delta?.content;
            if (content) {
              accumulated += content;
              setSolution(accumulated);
            }
          } catch {
            buffer = line + "\n" + buffer;
            break;
          }
        }
      }

      // Final flush
      if (buffer.trim()) {
        for (let raw of buffer.split("\n")) {
          if (!raw) continue;
          if (raw.endsWith("\r")) raw = raw.slice(0, -1);
          if (raw.startsWith(":") || raw.trim() === "") continue;
          if (!raw.startsWith("data: ")) continue;
          const jsonStr = raw.slice(6).trim();
          if (jsonStr === "[DONE]") continue;
          try {
            const parsed = JSON.parse(jsonStr);
            const content = parsed.choices?.[0]?.delta?.content;
            if (content) {
              accumulated += content;
              setSolution(accumulated);
            }
          } catch { /* ignore */ }
        }
      }
    } catch (e) {
      console.error("Solve error:", e);
      setSolution("Error: Something went wrong. Please try again.");
    } finally {
      setIsSolving(false);
    }
  }, []);

  const handleReset = () => {
    setSolution("");
  };

  const hasResult = solution || isSolving;

  return (
    <div className="min-h-screen bg-background transition-colors duration-300 relative">
      {/* Theme toggle - desktop top right */}
      <div className="hidden lg:block fixed top-4 right-4 z-50">
        <ThemeToggle />
      </div>

      {/* First screen */}
      <section className="min-h-screen lg:h-screen flex flex-col lg:flex-row">
        {/* Mobile/Tablet header */}
        <div className="lg:hidden h-12 shrink-0 border-b border-border/50 bg-background/80 backdrop-blur-md flex items-center justify-between px-4">
          <div className="flex items-center gap-2.5">
            <img src={ritaLogo} alt="Rita" className="h-7 w-7 rounded-lg" />
            <span className="text-sm font-bold text-title">Rita</span>
          </div>
          <ThemeToggle />
        </div>

        {/* Left sidebar - desktop */}
        <aside className="hidden lg:flex shrink-0 border-r border-border/50 bg-background" style={{ width: 'clamp(320px, 33vw, 480px)' }}>
          <MathInputPanel onSolve={handleSolve} isSolving={isSolving} />
        </aside>

        {/* Mobile: MathInputPanel */}
        <div className="flex-1 lg:w-[82%] min-w-0 flex flex-col overflow-hidden bg-background">
          <div className="lg:hidden flex-1 min-h-0 overflow-hidden">
            <MathInputPanel onSolve={handleSolve} isSolving={isSolving} />
          </div>

          {/* Mobile: result */}
          {hasResult && (
            <div className="lg:hidden shrink-0 border-t border-border/50 bg-card max-h-[50vh] overflow-hidden">
              <MathResultDisplay solution={solution} isStreaming={isSolving} onReset={handleReset} />
            </div>
          )}

          {/* Desktop: hero or result */}
          <div className="hidden lg:flex flex-col flex-1 overflow-hidden">
            {hasResult ? (
              <MathResultDisplay solution={solution} isStreaming={isSolving} onReset={handleReset} />
            ) : (
              <div className="flex flex-col items-center justify-center flex-1 px-8">
                <div className="text-center max-w-[800px]">
                  <h1 className="text-3xl md:text-5xl font-bold text-title leading-tight mb-4">
                    AI Math Tool for Learning and Problem Solving
                  </h1>
                  <p className="text-muted-foreground text-sm md:text-lg max-w-[700px] mx-auto leading-relaxed">
                    Practical AI math tool for solving, learning, and statistics support. Type or upload a problem for step-by-step solutions.
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Below first screen */}
      <div>
        <ToolFeatures />
        <HowItWorks />
        <ContentSections />
        <WhyChoose />
        <TestimonialsSection />
        <FAQSection />
        <ToolkitSection />

        {/* Footer */}
        <footer className="bg-[hsl(220,20%,14%)] text-white">
          <div className="max-w-[1500px] mx-auto px-4 md:px-8 py-14 md:py-20">
            <div className="flex flex-col lg:flex-row gap-12 lg:gap-14 mb-14">
              <div className="lg:w-48 shrink-0 space-y-3">
                <div className="flex items-center gap-2.5">
                  <img src={ritaLogo} alt="Rita" className="h-10 w-10 rounded-xl" />
                  <span className="text-2xl font-bold text-white italic">Rita</span>
                </div>
                <p className="text-sm text-white/60 leading-relaxed">Rita makes creativity and efficiency accessible to everyone</p>
              </div>
              <ProductFooterSection />
            </div>
            <div className="border-t border-white/10 pt-6 text-sm text-white/40 text-center">
              © 2026 Rita. All rights reserved.
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default Index;
