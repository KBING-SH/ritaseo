import { useState, useRef, useCallback } from "react";
import beforeImg from "@/assets/before.webp";
import afterImg from "@/assets/after.webp";

export function StyleSelector() {
  const [sliderPos, setSliderPos] = useState(50);
  const [containerWidth, setContainerWidth] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const dragging = useRef(false);

  const updatePosition = useCallback((clientX: number) => {
    const rect = containerRef.current?.getBoundingClientRect();
    if (!rect) return;
    setContainerWidth(rect.width);
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

  const refCallback = useCallback((node: HTMLDivElement | null) => {
    (containerRef as React.MutableRefObject<HTMLDivElement | null>).current = node;
    if (node) setContainerWidth(node.offsetWidth);
  }, []);

  return (
    <div className="rounded-2xl xl:rounded-[32px] border border-border/50 bg-card shadow-soft overflow-hidden h-full">
      <div
        ref={refCallback}
        className="relative w-full h-full overflow-hidden select-none touch-none cursor-ew-resize"
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
      >
        {/* After (cartoon - full background) */}
        <img
          src={afterImg}
          alt="卡通效果"
          className="absolute inset-0 w-full h-full block object-cover object-center"
          draggable={false}
        />

        {/* Before (original - clipped) */}
        <div
          className="absolute z-[8] top-0 left-0 bottom-0 overflow-hidden"
          style={{ width: `${sliderPos}%` }}
        >
          <img
            src={beforeImg}
            alt="原始照片"
            className="block h-full max-w-none object-cover object-center"
            style={{ width: containerWidth > 0 ? `${containerWidth}px` : '100%' }}
            draggable={false}
          />
        </div>

        {/* Slider handle */}
        <div
          className="absolute z-10 top-0 bottom-0 flex flex-col items-center pointer-events-none"
          style={{ left: `${sliderPos}%`, transform: "translateX(-50%)" }}
        >
          <div className="w-[2px] bg-white h-[calc(50%-24px)]" />
          <button className="pointer-events-auto w-12 h-12 rounded-full border-2 border-white cursor-ew-resize outline-none flex items-center justify-center gap-1.5 bg-black/20 backdrop-blur-sm">
            <span className="block h-5 w-[2px] bg-white rounded-full" />
            <span className="block h-5 w-[2px] bg-white rounded-full" />
          </button>
          <div className="w-[2px] bg-white h-[calc(50%-24px)]" />
        </div>
      </div>
    </div>
  );
}
