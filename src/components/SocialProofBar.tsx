import { Star, Award, Users, MessageSquare } from "lucide-react";

const stats = [
  {
    icon: Award,
    value: "#1 热门推荐",
    label: "Product Hunt",
    color: "text-orange-500",
  },
  {
    icon: Star,
    value: "4.9 / 5.0",
    label: "用户综合评分",
    color: "text-yellow-500",
    stars: true,
  },
  {
    icon: MessageSquare,
    value: "50,000+",
    label: "用户好评",
    color: "text-primary",
  },
  {
    icon: Users,
    value: "2,000,000+",
    label: "活跃用户",
    color: "text-emerald-500",
  },
];

export function SocialProofBar() {
  return (
    <div className="border-y border-border/50 bg-card-alt/50 backdrop-blur-sm">
      <div className="max-w-5xl mx-auto px-4 py-5 flex flex-wrap items-center justify-center gap-6 md:gap-0 md:divide-x md:divide-border/50">
        {stats.map((s, i) => (
          <div
            key={i}
            className="flex items-center gap-3 px-6 md:px-10"
          >
            <s.icon className={`h-5 w-5 ${s.color} shrink-0`} />
            <div>
              <div className="flex items-center gap-1.5">
                <span className="text-base md:text-lg font-bold text-title">{s.value}</span>
                {s.stars && (
                  <div className="flex">
                    {[...Array(5)].map((_, j) => (
                      <Star key={j} className="h-3.5 w-3.5 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                )}
              </div>
              <span className="text-xs text-body-desc">{s.label}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
