import { useState, useRef, useCallback, useEffect } from "react";
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
    <div className="rounded-xl border border-border/50 bg-card shadow-soft overflow-hidden">
      <div
        ref={containerRef}
        className="relative w-full aspect-square cursor-col-resize select-none touch-none"
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
      >
        {/* After (cartoon - full background) */}
        <img
          src={afterImg}
          alt="卡通效果"
          className="absolute inset-0 w-full h-full object-cover"
          draggable={false}
        />

        {/* Before (original - clipped by slider) */}
        <div
          className="absolute inset-0 overflow-hidden"
          style={{ width: `${sliderPos}%` }}
        >
          <img
            src={beforeImg}
            alt="原始照片"
            className="absolute top-0 left-0 h-full object-cover"
            style={{ width: `${containerRef.current?.offsetWidth ?? 9999}px` }}
            draggable={false}
          />
        </div>

        {/* Labels */}
        <span className="absolute top-3 left-3 bg-black/50 backdrop-blur-sm text-white text-xs px-2 py-1 rounded-md z-20">原图</span>
        <span className="absolute top-3 right-3 bg-black/50 backdrop-blur-sm text-white text-xs px-2 py-1 rounded-md z-20">卡通</span>

        {/* Slider line + handle */}
        <div
          className="absolute top-0 bottom-0 w-0.5 bg-white/90 shadow-lg z-10 pointer-events-none"
          style={{ left: `${sliderPos}%`, transform: 'translateX(-50%)' }}
        >
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/90 backdrop-blur-sm shadow-lg flex items-center justify-center pointer-events-auto">
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" className="text-muted-foreground">
              <path d="M7 4L3 10L7 16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M13 4L17 10L13 16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
}
