import { useEffect, useRef } from "react";
import { prefersReducedMotion } from "@/lib/gsap";

const RAMP = { color: 0xf3586c, color2: 0xff8359, background: 0x0a0710 };

export function useVantaNet(ref: React.RefObject<HTMLDivElement | null>) {
  const ioRef = useRef<IntersectionObserver | null>(null);
  const visRef = useRef<(() => void) | null>(null);

  useEffect(() => {
    if (prefersReducedMotion()) return;
    let effect: { destroy: () => void; pause?: () => void; resume?: () => void } | null = null;
    let disposed = false;

    Promise.all([import("three"), import("vanta/dist/vanta.net.min")])
      .then(([THREE, VantaNet]) => {
        if (disposed || !ref.current) return;
        effect = VantaNet.default({
          el: ref.current,
          THREE,
          mouseControls: true,
          touchControls: false,
          gyroControls: false,
          minHeight: 200,
          minWidth: 200,
          scale: 1,
          scaleMobile: 1,
          points: 13,
          maxDistance: 23,
          spacing: 17,
          showLines: true,
          ...RAMP,
        });

        const io = new IntersectionObserver(
          ([entry]) => {
            if (!effect) return;
            if (entry.isIntersecting) effect.resume?.();
            else effect.pause?.();
          },
          { threshold: 0 },
        );
        io.observe(ref.current);
        ioRef.current = io;

        const onVis = () => {
          if (!effect) return;
          if (document.hidden) effect.pause?.();
          else effect.resume?.();
        };
        document.addEventListener("visibilitychange", onVis);
        visRef.current = onVis;
      })
      .catch(() => {
        /* WebGL unavailable — CSS gradient fallback stays visible */
      });

    return () => {
      disposed = true;
      ioRef.current?.disconnect();
      if (visRef.current) document.removeEventListener("visibilitychange", visRef.current);
      effect?.destroy();
    };
  }, [ref]);
}
