import { useState, useRef, useCallback } from "react";
import beforeImg from "@/assets/before.png";
import afterImg from "@/assets/after.png";

export function StyleSelector() {
  const [sliderPos, setSliderPos] = useState(50);
  const containerRef = useRef<HTMLDivElement>(null);
  const dragging = useRef(false);

  const updatePosition = useCallback((clientX: number) => {
    const rect = containerRef.current?.getBoundingClientRect();
    if (!rect) return;
    const x = Math.max(0, Math.min(clientX - rect.left, rect.width));
    setSliderPos((x / rect.width) * 100);
  }, []);

  const onPointerDown = useCallback((e: React.PointerEvent) => {
    dragging.current = true;
    (e.target as HTMLElement).setPointerCapture(e.pointerId);
    updatePosition(e.clientX);
  }, [updatePosition]);

  const onPointerMove = useCallback((e: React.PointerEvent) => {
    if (!dragging.current) return;
    updatePosition(e.clientX);
  }, [updatePosition]);

  const onPointerUp = useCallback(() => {
    dragging.current = false;
  }, []);

  return (
    <div className="rounded-2xl xl:rounded-[32px] border border-border/50 bg-card shadow-soft overflow-hidden">
      <div
        ref={containerRef}
        className="relative w-full h-full overflow-hidden select-none touch-none cursor-ew-resize"
        style={{ aspectRatio: "2000 / 1124" }}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
      >
        {/* After (cartoon - full background) */}
        <img
          src={afterImg}
          alt="卡通效果"
          className="w-full h-full block object-cover"
          draggable={false}
        />

        {/* Slider handle */}
        <div
          className="absolute z-10 top-0 bottom-0 flex flex-col items-center justify-center"
          style={{ left: `${sliderPos}%`, transform: "translateX(-50%)" }}
        >
          <div className="w-[2px] bg-white h-[calc(50%-24px)]" />
          <button className="relative w-12 h-12 rounded-full border-2 border-white cursor-ew-resize outline-none flex items-center justify-center gap-1.5 bg-transparent">
            <span className="block h-5 w-[2px] bg-white rounded-full" />
            <span className="block h-5 w-[2px] bg-white rounded-full" />
          </button>
          <div className="w-[2px] bg-white h-[calc(50%-24px)]" />
        </div>

        {/* Before (original - clipped) */}
        <div
          className="absolute z-[8] top-0 left-0 bottom-0 overflow-hidden"
          style={{ width: `${sliderPos}%` }}
        >
          <img
            src={beforeImg}
            alt="原始照片"
            className="object-cover w-auto block h-full max-w-none object-left"
            style={{ width: `${containerRef.current?.offsetWidth ?? 9999}px` }}
            draggable={false}
          />
        </div>
      </div>
    </div>
  );
}
