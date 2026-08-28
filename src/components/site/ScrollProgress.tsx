import { useEffect, useRef } from "react";
import { getLenis } from "@/components/providers/SmoothScroll";

export function ScrollProgress() {
  const barRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const bar = barRef.current;
    if (!bar) return;

    let raf = 0;
    const paint = () => {
      raf = 0;
      const h = document.documentElement;
      const max = h.scrollHeight - h.clientHeight;
      bar.style.transform = `scaleX(${max > 0 ? h.scrollTop / max : 0})`;
    };
    const onScroll = () => {
      if (raf) return;
      raf = requestAnimationFrame(paint);
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    const lenis = getLenis();
    lenis?.on("scroll", onScroll);
    paint();

    return () => {
      window.removeEventListener("scroll", onScroll);
      lenis?.off("scroll", onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <div
      ref={barRef}
      aria-hidden="true"
      className="fixed inset-x-0 top-0 z-[90] h-[3px] origin-left scale-x-0 bg-ramp"
    />
  );
}
