import { useRef, type MouseEvent } from "react";
import { Calendar, Github, MessageSquare } from "lucide-react";
import { gsap, useGSAP, prefersReducedMotion } from "@/lib/gsap";
import { Magnetic } from "./Magnetic";

export function Community() {
  const rootRef = useRef<HTMLElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (prefersReducedMotion()) return;
      gsap.fromTo(
        "[data-cta-copy]",
        { opacity: 0, y: 48 },
        {
          opacity: 1,
          y: 0,
          duration: 0.9,
          ease: "power4.out",
          scrollTrigger: { trigger: rootRef.current, start: "top 72%" },
        },
      );
      gsap.fromTo(
        "[data-cta-row]",
        { opacity: 0, y: 24 },
        {
          opacity: 1,
          y: 0,
          duration: 0.7,
          delay: 0.25,
          ease: "power4.out",
          scrollTrigger: { trigger: rootRef.current, start: "top 72%" },
        },
      );
    },
    { scope: rootRef },
  );

  const onMove = (e: MouseEvent<HTMLElement>) => {
    const el = glowRef.current;
    if (!el || prefersReducedMotion()) return;
    const rect = e.currentTarget.getBoundingClientRect();
    gsap.to(el, {
      x: e.clientX - rect.left - el.offsetWidth / 2,
      y: e.clientY - rect.top - el.offsetHeight / 2,
      duration: 0.9,
      ease: "power3.out",
    });
  };

  return (
    <section
      ref={rootRef}
      id="community"
      onMouseMove={onMove}
      className="relative overflow-hidden border-y border-white/5 bg-bg-elevated/40 py-32 md:py-44"
    >
      <div className="grid-bg pointer-events-none absolute inset-0 opacity-70" aria-hidden="true" />
      <div
        ref={glowRef}
        aria-hidden="true"
        className="pointer-events-none absolute h-[34rem] w-[34rem] rounded-full opacity-20 blur-[110px]"
        style={{ background: "var(--ramp-x)", left: 0, top: 0 }}
      />
      <span
        aria-hidden="true"
        className="text-outline pointer-events-none absolute inset-x-0 top-1/2 -translate-y-1/2 select-none text-center font-display text-[18vw] font-bold leading-none tracking-tight"
      >
        JOIN US
      </span>

      <div className="relative mx-auto max-w-4xl px-6 text-center">
        <p data-cta-copy className="chip mx-auto">
          Join the community
        </p>
        <h2
          data-cta-copy
          className="font-display mt-7 text-[clamp(2.5rem,6vw,5.25rem)] font-semibold leading-[1.05] tracking-[-0.03em]"
        >
          Build with the brightest minds at <span className="text-ramp-y">Cyberheathens.</span>
        </h2>
        <p data-cta-copy className="mx-auto mt-6 max-w-xl text-lg text-text-secondary">
          Open to every IISER Bhopal student. No gatekeeping, no prerequisites, only curiosity
          required.
        </p>

        <div data-cta-row className="mt-10 flex flex-wrap items-center justify-center gap-4">
          <Magnetic>
            <a href="#" className="btn-solid">
              <MessageSquare className="h-4 w-4" /> Join Discord
            </a>
          </Magnetic>
          <Magnetic>
            <a href="#" className="btn-ghost">
              <Github className="h-4 w-4" /> GitHub
            </a>
          </Magnetic>
          <Magnetic>
            <a href="#events" className="btn-ghost">
              <Calendar className="h-4 w-4" /> Next event
            </a>
          </Magnetic>
        </div>
      </div>
    </section>
  );
}
