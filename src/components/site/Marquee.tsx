import { useRef } from "react";
import { gsap, useGSAP, prefersReducedMotion, ScrollTrigger } from "@/lib/gsap";

export function Marquee({
  items,
  reverse = false,
  outline = false,
  className,
}: {
  items: string[];
  reverse?: boolean;
  outline?: boolean;
  className?: string;
}) {
  const rootRef = useRef<HTMLDivElement>(null);
  const animateClass = reverse ? "marquee-rev" : "marquee";
  const duration = prefersReducedMotion() ? "0s" : "38s";

  const row = (
    <>
      {items.map((item, i) => (
        <span key={i} className="flex shrink-0 items-center gap-8 pr-8">
          <span
            className={`font-display text-5xl font-semibold uppercase tracking-tight md:text-7xl ${
              outline ? "text-outline" : "text-ramp"
            }`}
          >
            {item}
          </span>
          <span className={`h-2.5 w-2.5 rounded-full ${outline ? "bg-white/25" : "bg-ramp-x"}`} />
        </span>
      ))}
    </>
  );

  useGSAP(
    () => {
      if (prefersReducedMotion()) return;
      const track = rootRef.current?.querySelector<HTMLElement>("[data-marquee-track]");
      if (!track) return;

      const proxy = { skew: 0 };
      const skewSetter = gsap.quickSetter(track, "skewX", "deg");
      const clamp = gsap.utils.clamp(-10, 10);

      const st = ScrollTrigger.create({
        onUpdate: (self) => {
          const skew = clamp(self.getVelocity() / -320);
          if (Math.abs(skew) > Math.abs(proxy.skew)) {
            proxy.skew = skew;
            gsap.to(proxy, {
              skew: 0,
              duration: 0.9,
              ease: "power3.out",
              overwrite: true,
              onUpdate: () => skewSetter(proxy.skew),
            });
          }
        },
      });
      return () => st.kill();
    },
    { scope: rootRef },
  );

  return (
    <div ref={rootRef} className={`relative overflow-hidden py-6 ${className ?? ""}`}>
      <div
        data-marquee-track
        className="mask-fade-x flex w-max"
        style={{ animation: `${animateClass} ${duration} linear infinite` }}
      >
        <div className="flex">{row}</div>
        <div className="flex" aria-hidden="true">
          {row}
        </div>
      </div>
    </div>
  );
}

export function MarqueeBand() {
  return (
    <div className="border-y border-white/5 bg-bg-elevated/40 py-2" aria-hidden="true">
      <Marquee items={["Build", "Break", "Learn", "Repeat"]} />
    </div>
  );
}
