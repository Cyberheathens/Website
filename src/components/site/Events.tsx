import { useRef } from "react";
import { ArrowUpRight } from "lucide-react";
import { gsap, useGSAP, prefersReducedMotion } from "@/lib/gsap";

const events = [
  {
    date: "AUG",
    year: "2026",
    title: "ICPC Orientation",
    tag: "CP",
    desc: "How ICPC works: rules, contest formats, team roles, and how Cyberheathens trains you for the regionals.",
  },
  {
    date: "AUG",
    year: "2026",
    title: "Freshers Orientation",
    tag: "Freshers",
    desc: "Welcome, freshers! Meet the club, explore every track, and find your starting point. No prerequisites, only curiosity.",
  },
  {
    date: "SEP",
    year: "2026",
    title: "Open Source Bootcamp",
    tag: "OSS",
    desc: "A hands-on bootcamp: Git and GitHub flow, finding good first issues, and shipping your first merged PR.",
  },
  {
    date: "TBA",
    year: "2026",
    title: "Codeforces Hackathon",
    tag: "CP",
    desc: "A contest sprint on Codeforces: rating battles, team upsolving, and prizes to keep you sharp.",
  },
];

export function Events() {
  const rootRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      if (prefersReducedMotion()) return;

      gsap.fromTo(
        "[data-rail-fill]",
        { scaleY: 0 },
        {
          scaleY: 1,
          ease: "none",
          transformOrigin: "top",
          scrollTrigger: {
            trigger: "[data-timeline]",
            start: "top 70%",
            end: "bottom 60%",
            scrub: 0.6,
          },
        },
      );

      gsap.fromTo(
        "[data-event]",
        { opacity: 0, y: 44 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: "power4.out",
          stagger: 0.12,
          scrollTrigger: { trigger: "[data-timeline]", start: "top 75%" },
        },
      );

      gsap.utils.toArray<HTMLElement>("[data-dot]").forEach((dot) => {
        gsap.fromTo(
          dot,
          { scale: 0 },
          {
            scale: 1,
            duration: 0.5,
            ease: "back.out(3)",
            scrollTrigger: { trigger: dot, start: "top 78%" },
          },
        );
      });
    },
    { scope: rootRef },
  );

  return (
    <section ref={rootRef} id="events" className="relative py-28 md:py-36">
      <div className="mx-auto max-w-5xl px-6">
        <p className="chip">Events</p>
        <h2 className="font-display mt-6 max-w-2xl text-[clamp(2.25rem,5vw,4rem)] font-semibold leading-[1.02] tracking-[-0.02em]">
          A timeline of <span className="text-ramp-y">shipping.</span>
        </h2>

        <div data-timeline className="relative mt-16 pl-10 md:pl-16">
          <div className="absolute bottom-0 left-[7px] top-0 w-px bg-white/10 md:left-[15px]" />
          <div
            data-rail-fill
            className="absolute bottom-0 left-[7px] top-0 w-px bg-ramp-y md:left-[15px]"
          />

          <ul className="space-y-8">
            {events.map((e) => (
              <li key={e.title} data-event data-cursor className="group relative">
                <span
                  data-dot
                  className="absolute -left-10 top-7 h-[15px] w-[15px] rounded-full border-2 border-background bg-coral shadow-[0_0_18px_rgb(243_88_108/0.7)] transition-colors duration-300 group-hover:bg-flame md:-left-16"
                />
                <div className="panel rounded-2xl p-6">
                  <div className="flex flex-wrap items-baseline justify-between gap-3">
                    <div className="flex items-baseline gap-3">
                      <h3 className="font-display text-xl font-semibold tracking-tight md:text-2xl">
                        {e.title}
                      </h3>
                      <span className="chip !border-magenta/30 !text-magenta">{e.tag}</span>
                    </div>
                    <time className="font-mono text-xs uppercase tracking-[0.2em] text-text-secondary">
                      {e.date} · {e.year}
                    </time>
                  </div>
                  <p className="mt-3 max-w-xl text-sm leading-relaxed text-text-secondary">
                    {e.desc}
                  </p>
                  <span className="mt-4 inline-flex items-center gap-1 font-mono text-xs text-flame opacity-0 transition-all duration-300 group-hover:opacity-100">
                    RSVP soon <ArrowUpRight className="h-3 w-3" />
                  </span>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
