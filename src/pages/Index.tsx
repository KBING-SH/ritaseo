import { ThemeToggle } from "@/components/ThemeToggle";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Zap, Shield, Globe, ArrowRight, Layers, Code2, Sparkles } from "lucide-react";

const features = [
  { icon: Zap, title: "极速性能", desc: "毫秒级响应，流畅体验" },
  { icon: Shield, title: "安全可靠", desc: "企业级安全保障" },
  { icon: Globe, title: "全球部署", desc: "多区域节点覆盖" },
  { icon: Layers, title: "弹性扩展", desc: "自动伸缩，按需使用" },
  { icon: Code2, title: "开发友好", desc: "丰富 API 与 SDK" },
  { icon: Sparkles, title: "AI 驱动", desc: "智能化运维与分析" },
];

const Index = () => {
  return (
    <div className="min-h-screen bg-background transition-colors duration-300">
      {/* Nav */}
      <nav className="sticky top-0 z-50 border-b bg-background/80 backdrop-blur-md">
        <div className="container flex h-16 items-center justify-between px-4 md:px-8">
          <div className="flex items-center gap-2">
            <div className="h-8 w-8 rounded-lg gradient-primary" />
            <span className="text-lg font-bold text-title">TechFlow</span>
          </div>
          <div className="hidden md:flex items-center gap-8">
            {["产品", "解决方案", "文档", "定价"].map((item) => (
              <a
                key={item}
                href="#"
                className="text-sm text-body2 hover:text-title transition-colors cursor-pointer"
              >
                {item}
              </a>
            ))}
          </div>
          <div className="flex items-center gap-2">
            <ThemeToggle />
            <Button variant="ghost" size="sm" className="hidden md:inline-flex">
              登录
            </Button>
            <Button variant="gradient" size="sm">
              免费开始
            </Button>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="container px-4 md:px-8 py-20 md:py-32 text-center">
        <Badge className="mb-6 rounded-full bg-primary/10 text-primary border-none px-4 py-1.5 text-sm font-medium">
          🚀 全新发布 v3.0
        </Badge>
        <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-title leading-tight mb-6 animate-fade-in">
          构建未来的
          <br />
          <span className="gradient-text">云原生平台</span>
        </h1>
        <p className="text-body-desc text-lg md:text-xl max-w-2xl mx-auto mb-10 animate-fade-in" style={{ animationDelay: "0.1s" }}>
          一站式云基础设施，助力团队快速交付高质量应用。极速、安全、智能。
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in" style={{ animationDelay: "0.2s" }}>
          <Button variant="gradient" size="lg">
            立即体验 <ArrowRight className="ml-1 h-4 w-4" />
          </Button>
          <Button variant="outline" size="lg">
            查看文档
          </Button>
        </div>
      </section>

      {/* Features */}
      <section className="container px-4 md:px-8 pb-20 md:pb-32">
        <div className="text-center mb-14">
          <h2 className="text-2xl md:text-3xl font-bold text-title mb-3">核心能力</h2>
          <p className="text-body-desc">为现代应用提供全方位基础支撑</p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {features.map((f) => (
            <div
              key={f.title}
              className="group rounded-xl bg-card p-6 shadow-soft border border-border/50 hover:shadow-soft-lg hover:bg-hover-bg transition-all duration-200 cursor-pointer"
            >
              <div className="h-11 w-11 rounded-lg gradient-primary flex items-center justify-center mb-4">
                <f.icon className="h-5 w-5 text-primary-foreground" />
              </div>
              <h3 className="text-lg font-semibold text-title mb-1">{f.title}</h3>
              <p className="text-body-desc text-sm">{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="container px-4 md:px-8 pb-20 md:pb-32">
        <div className="rounded-2xl gradient-primary p-10 md:p-16 text-center">
          <h2 className="text-2xl md:text-4xl font-bold text-primary-foreground mb-4">准备好开始了吗？</h2>
          <p className="text-primary-foreground/80 mb-8 max-w-lg mx-auto">
            免费注册，几分钟内完成部署。无需信用卡。
          </p>
          <Button size="lg" className="rounded-full bg-background text-title hover:bg-background/90">
            免费开始使用
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t py-10">
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
    </div>
  );
};

export default Index;
