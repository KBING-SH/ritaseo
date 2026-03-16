import { useState, useRef, useCallback, useEffect } from "react";
import beforeImg from "@/assets/before.webp";
import afterImg from "@/assets/after.webp";

export function StyleSelector() {
  const [sliderPos, setSliderPos] = useState(50);
  const [containerWidth, setContainerWidth] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const animationRef = useRef<number>(0);
  const directionRef = useRef<1 | -1>(1);

  const refCallback = useCallback((node: HTMLDivElement | null) => {
    (containerRef as React.MutableRefObject<HTMLDivElement | null>).current = node;
    if (node) setContainerWidth(node.offsetWidth);
  }, []);

  useEffect(() => {
    let lastTime = 0;
    const speed = 12; // percent per second

    const animate = (time: number) => {
      if (lastTime === 0) lastTime = time;
      const delta = (time - lastTime) / 1000;
      lastTime = time;

      setSliderPos((prev) => {
        let next = prev + directionRef.current * speed * delta;
        if (next >= 100) {
          next = 100;
          directionRef.current = -1;
        } else if (next <= 0) {
          next = 0;
          directionRef.current = 1;
        }
        return next;
      });

      animationRef.current = requestAnimationFrame(animate);
    };

    animationRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationRef.current);
  }, []);

  return (
    <div className="rounded-2xl xl:rounded-[32px] border border-border/50 bg-card shadow-soft overflow-hidden h-full">
      <div
        ref={refCallback}
        className="relative w-full h-full overflow-hidden select-none"
      >
        {/* After (cartoon - full background) */}
        <img
          src={afterImg}
          alt="卡通效果"
          className="absolute inset-0 w-full h-full block object-cover object-center"
          draggable={false}
        />

        {/* Before (original - clipped via clip-path for perfect alignment) */}
        <div
          className="absolute inset-0 z-[8]"
          style={{ clipPath: `inset(0 ${100 - sliderPos}% 0 0)` }}
        >
          <img
            src={beforeImg}
            alt="原始照片"
            className="absolute inset-0 w-full h-full block object-cover object-center"
            draggable={false}
          />
        </div>

        {/* Slider handle */}
        <div
          className="absolute z-10 top-0 bottom-0 flex flex-col items-center pointer-events-none"
          style={{ left: `${sliderPos}%`, transform: "translateX(-50%)" }}
        >
          <div className="w-[2px] bg-white flex-1" />
          <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full border-2 border-white flex items-center justify-center gap-1.5 bg-black/20 backdrop-blur-sm">
            <span className="block h-4 sm:h-5 w-[2px] bg-white rounded-full" />
            <span className="block h-4 sm:h-5 w-[2px] bg-white rounded-full" />
          </div>
          <div className="w-[2px] bg-white flex-1" />
        </div>
      </div>
    </div>
  );
}
