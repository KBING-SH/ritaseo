import { useRef, useCallback, useEffect } from "react";

/**
 * Hook that adds manual drag-to-scroll to a CSS-animated marquee container.
 * Pauses the CSS animation while dragging and resumes on release.
 */
export function useDraggableMarquee() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const dragging = useRef(false);
  const startX = useRef(0);
  const scrollLeft = useRef(0);

  const onPointerDown = useCallback((e: React.PointerEvent) => {
    const el = scrollRef.current;
    if (!el) return;
    dragging.current = true;
    startX.current = e.clientX;
    scrollLeft.current = el.scrollLeft;
    el.style.animationPlayState = "paused";
    el.style.overflow = "auto";
    (e.target as HTMLElement).setPointerCapture?.(e.pointerId);
  }, []);

  const onPointerMove = useCallback((e: React.PointerEvent) => {
    if (!dragging.current || !scrollRef.current) return;
    const dx = e.clientX - startX.current;
    scrollRef.current.scrollLeft = scrollLeft.current - dx;
  }, []);

  const onPointerUp = useCallback(() => {
    if (!dragging.current) return;
    dragging.current = false;
    const el = scrollRef.current;
    if (!el) return;
    el.style.overflow = "";
    // Resume animation after a short delay
    setTimeout(() => {
      if (!dragging.current && el) {
        el.style.animationPlayState = "running";
      }
    }, 1500);
  }, []);

  return {
    scrollRef,
    handlers: {
      onPointerDown,
      onPointerMove,
      onPointerUp,
      onPointerCancel: onPointerUp,
    },
  };
}
