import { useState, useRef, useEffect, useCallback } from "react";

interface AutoComparisonSliderProps {
  beforeSrc: string;
  afterSrc: string;
  beforeAlt?: string;
  afterAlt?: string;
  speed?: number;
  min?: number;
  max?: number;
}

export function AutoComparisonSlider({
  beforeSrc,
  afterSrc,
  beforeAlt = "原始照片",
  afterAlt = "卡通效果",
  speed = 10,
  min = 15,
  max = 85,
}: AutoComparisonSliderProps) {
  const [sliderPos, setSliderPos] = useState(50);
  const directionRef = useRef<1 | -1>(1);
  const animationRef = useRef<number>(0);

  useEffect(() => {
    let lastTime = 0;

    const animate = (time: number) => {
      if (lastTime === 0) lastTime = time;
      const delta = (time - lastTime) / 1000;
      lastTime = time;

      setSliderPos((prev) => {
        let next = prev + directionRef.current * speed * delta;
        if (next >= max) {
          next = max;
          directionRef.current = -1;
        } else if (next <= min) {
          next = min;
          directionRef.current = 1;
        }
        return next;
      });

      animationRef.current = requestAnimationFrame(animate);
    };

    animationRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationRef.current);
  }, [speed, min, max]);

  return (
    <div className="relative w-full aspect-[4/3] overflow-hidden select-none">
      {/* After (cartoon - full background) */}
      <img
        src={afterSrc}
        alt={afterAlt}
        className="absolute inset-0 w-full h-full block object-cover object-center"
        draggable={false}
      />

      {/* Before (original - clipped) */}
      <div
        className="absolute inset-0 z-[8]"
        style={{ clipPath: `inset(0 ${100 - sliderPos}% 0 0)` }}
      >
        <img
          src={beforeSrc}
          alt={beforeAlt}
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
        <div className="w-9 h-9 rounded-full border-2 border-white flex items-center justify-center gap-1 bg-black/20 backdrop-blur-sm">
          <span className="block h-3.5 w-[2px] bg-white rounded-full" />
          <span className="block h-3.5 w-[2px] bg-white rounded-full" />
        </div>
        <div className="w-[2px] bg-white flex-1" />
      </div>

      {/* Labels */}
      <div className="absolute top-3 left-3 z-20 px-2 py-0.5 rounded bg-black/40 backdrop-blur-sm text-white text-xs font-medium">
        Before
      </div>
      <div className="absolute top-3 right-3 z-20 px-2 py-0.5 rounded bg-black/40 backdrop-blur-sm text-white text-xs font-medium">
        After
      </div>
    </div>
  );
}
