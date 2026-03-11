import { useState } from "react";
import { cn } from "@/lib/utils";

const styles = [
  { id: "ghibli", name: "吉卜力" },
  { id: "3d", name: "3D 风格" },
  { id: "clay", name: "粘土" },
  { id: "watercolor", name: "水彩" },
  { id: "illustration", name: "插画" },
  { id: "pixel", name: "像素" },
  { id: "cyberpunk", name: "赛博朋克" },
  { id: "cartoon", name: "卡通" },
  { id: "oil", name: "油画" },
];

// Generate gradient thumbnails based on style
const styleColors: Record<string, string> = {
  ghibli: "from-emerald-400 to-sky-400",
  "3d": "from-violet-400 to-pink-400",
  clay: "from-amber-300 to-orange-400",
  watercolor: "from-cyan-300 to-blue-400",
  illustration: "from-rose-400 to-fuchsia-400",
  pixel: "from-green-400 to-lime-400",
  cyberpunk: "from-purple-500 to-cyan-400",
  cartoon: "from-yellow-400 to-red-400",
  oil: "from-amber-500 to-rose-500",
};

export function StyleSelector() {
  const [selected, setSelected] = useState("ghibli");

  return (
    <div className="rounded-xl border border-border/50 bg-card p-5 shadow-soft h-full">
      <h3 className="text-sm font-semibold text-title mb-4">选择图像风格</h3>
      <div className="grid grid-cols-3 gap-3">
        {styles.map((style) => (
          <button
            key={style.id}
            onClick={() => setSelected(style.id)}
            className={cn(
              "group flex flex-col items-center gap-2 cursor-pointer transition-all duration-200",
            )}
          >
            <div
              className={cn(
                "w-full aspect-square rounded-xl bg-gradient-to-br transition-all duration-200 flex items-center justify-center",
                styleColors[style.id],
                selected === style.id
                  ? "ring-2 ring-primary ring-offset-2 ring-offset-card scale-[1.02]"
                  : "hover:scale-105 opacity-80 hover:opacity-100"
              )}
            >
              <span className="text-2xl font-bold text-white/60">{style.name.charAt(0)}</span>
            </div>
            <span
              className={cn(
                "text-xs transition-colors",
                selected === style.id ? "text-primary font-medium" : "text-body-desc"
              )}
            >
              {style.name}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
}
