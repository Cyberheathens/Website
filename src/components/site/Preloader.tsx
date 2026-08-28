import { useEffect, useRef, useState } from "react";
import { gsap, prefersReducedMotion } from "@/lib/gsap";
import { Logo } from "./Logo";

export const ENTERED_EVENT = "ch:entered";

export function Preloader() {
  const rootRef = useRef<HTMLDivElement>(null);
  const [done, setDone] = useState(false);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    if (prefersReducedMotion()) {
      setDone(true);
      window.dispatchEvent(new Event(ENTERED_EVENT));
      return;
    }

    document.documentElement.classList.add("lenis-stopped");

    // IMPORTANT: scope every selector to the preloader root — a global
    // "[data-word]" query once leaked into other sections and broke them.
    const num = root.querySelector("[data-count]");
    const bar = root.querySelector("[data-bar]");
    const mark = root.querySelector("[data-mark]");
    const word = root.querySelector("[data-word]");
    const content = root.querySelectorAll("[data-fade]");
    const dark = root.querySelector("[data-dark]");
    const veil = root.querySelector("[data-veil]");

    const counter = { value: 0 };

    const tl = gsap.timeline({
      onComplete: () => {
        setDone(true);
        document.documentElement.classList.remove("lenis-stopped");
      },
    });

    tl.fromTo(
      mark,
      { scale: 0, rotate: -30 },
      { scale: 1, rotate: 0, duration: 1, ease: "elastic.out(1, 0.45)" },
    )
      .fromTo(
        word,
        { opacity: 0, y: 18 },
        { opacity: 1, y: 0, duration: 0.8, ease: "power3.out" },
        0.15,
      )
      .to(
        counter,
        {
          value: 100,
          duration: 1.15,
          ease: "power2.inOut",
          onUpdate: () => {
            if (num) num.textContent = String(Math.round(counter.value)).padStart(3, "0");
            if (bar) gsap.set(bar, { scaleX: counter.value / 100 });
          },
        },
        0.35,
      )
      .to(
        content,
        { yPercent: -140, opacity: 0, duration: 0.45, ease: "power2.in", stagger: 0.05 },
        "+=0.15",
      )
      .to(dark, { yPercent: -100, duration: 0.85, ease: "power4.inOut" }, "-=0.1")
      .to(veil, { yPercent: -100, duration: 0.85, ease: "power4.inOut" }, "<0.14")
      .call(() => window.dispatchEvent(new Event(ENTERED_EVENT)), undefined, "<0.35")
      .set(root, { display: "none" });

    return () => {
      tl.kill();
      document.documentElement.classList.remove("lenis-stopped");
    };
  }, []);

  if (done) return null;

  return (
    <div ref={rootRef} className="fixed inset-0 z-[200]" aria-hidden="true">
      {/* Trailing ramp veil under the dark curtain */}
      <div data-veil className="absolute inset-0 bg-ramp-y" />
      <div data-dark className="absolute inset-0 grid place-items-center bg-background">
        <div className="flex flex-col items-center gap-7">
          <div data-fade data-mark>
            <Logo size={72} />
          </div>
          <span
            data-fade
            data-word
            className="font-display text-xs uppercase tracking-[0.5em] text-text-secondary"
          >
            Cyberheathens
          </span>
          <span
            data-fade
            data-count
            className="font-display text-ramp-y text-7xl font-semibold tabular-nums md:text-8xl"
          >
            000
          </span>
          <div data-fade className="h-px w-56 overflow-hidden bg-white/10">
            <div data-bar className="h-full w-full origin-left scale-x-0 bg-ramp-x" />
          </div>
        </div>
      </div>
    </div>
  );
}
