import { useRef } from "react";
import { ExternalLink, Github, Star } from "lucide-react";
import { gsap, useGSAP, prefersReducedMotion } from "@/lib/gsap";

interface Project {
  title: string;
  owner: string;
  desc: string;
  stack: string[];
  stars?: string;
  num: string;
  href?: string;
  image?: string;
  writeup?: { label: string; href: string };
}

const projects: Project[] = [
  {
    title: "hallucinot",
    owner: "Shafwansafi06/",
    desc: "Four adversarial layers stand between Gemma 4 and its own lies. Hallucinot interrogates every claim at runtime, catching and correcting hallucinations before they ever reach you.",
    stack: ["Python", "Gemma 4", "Adversarial ML"],
    stars: "1",
    num: "01",
    href: "https://github.com/Shafwansafi06/hallucinot",
    image: "/projects/hallucinot.webp",
    writeup: {
      label: "kaggle writeup",
      href: "https://www.kaggle.com/competitions/gemma-4-good-hackathon/writeups/hallucinot-making-gemma-4-hallucination-resistant",
    },
  },
  {
    title: "campus-entity-resolver",
    owner: "Shafwansafi06/",
    desc: "Campus data lives in silos: swipes, Wi-Fi, library, CCTV. CampusFlow fuses them into one privacy-aware picture, resolving identities and flagging anomalies before they become incidents.",
    stack: ["TypeScript", "Entity Resolution", "Security"],
    stars: "1",
    num: "02",
    href: "https://github.com/Shafwansafi06/campus-entity-resolver",
    image: "/projects/campusflow.webp",
  },
  {
    title: "QuillOps",
    owner: "shubhamupadhyay12/",
    desc: "AI that writes with you, not for you. QuillOps researches the topic, drafts the outline, waits for your nod, then writes section by section, keeping every revision while you hold the pen.",
    stack: ["LangGraph", "AI Agents", "TypeScript"],
    num: "03",
    href: "https://github.com/shubhamupadhyay12/QuillOps",
    image: "/projects/quillops.webp",
  },
  {
    title: "regime-aware-montecarlo",
    owner: "AbhishekIISERB/",
    desc: "Markets don't move to one drumbeat, so neither should risk models. This engine layers GARCH volatility, Student-t shocks and Markov regime switching over Monte Carlo, then trades the NIFTY 50 with regime-aware allocation.",
    stack: ["Python", "GARCH", "Markov Chains"],
    num: "04",
    href: "https://github.com/AbhishekIISERB/regime-aware-montecarlo",
    image: "/projects/regime-montecarlo.webp",
  },
];

const hueFor = (i: number) => `linear-gradient(140deg,
  hsl(${18 + i * 6} 100% 67% / .9),
  hsl(${344 + i * 4} 74% 57% / .85),
  hsl(${330 + i * 3} 72% 48% / .9))`;

export function Projects() {
  const rootRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      mm.add("(min-width: 768px)", () => {
        if (prefersReducedMotion()) return;
        const track = trackRef.current;
        if (!track) return;

        const getDistance = () => Math.max(0, track.scrollWidth - window.innerWidth);

        const horiz = gsap.to(track, {
          x: () => -getDistance(),
          ease: "none",
          scrollTrigger: {
            trigger: "[data-projects-pin]",
            start: "top top",
            end: () => `+=${getDistance() + window.innerHeight * 0.4}`,
            pin: true,
            scrub: 1,
            invalidateOnRefresh: true,
            anticipatePin: 1,
            onUpdate: (self) => {
              const counter = document.querySelector("[data-project-counter]");
              if (counter) {
                const idx = Math.min(
                  projects.length,
                  Math.floor(self.progress * projects.length) + 1,
                );
                counter.textContent = String(idx).padStart(2, "0");
              }
              const bar = document.querySelector("[data-project-bar]");
              if (bar) (bar as HTMLElement).style.transform = `scaleX(${self.progress})`;
            },
          },
        });

        gsap.utils.toArray<HTMLElement>("[data-cover]").forEach((cover) => {
          const numeral = cover.querySelector("[data-numeral]");
          if (!numeral) return;
          gsap.fromTo(
            numeral,
            { yPercent: 12 },
            {
              yPercent: -12,
              ease: "none",
              scrollTrigger: {
                trigger: cover,
                containerAnimation: horiz,
                start: "left right",
                end: "right left",
                scrub: true,
              },
            },
          );
        });
      });

      mm.add("(max-width: 767px)", () => {
        gsap.fromTo(
          "[data-project-card]",
          { opacity: 0, y: 48 },
          {
            opacity: 1,
            y: 0,
            stagger: 0.1,
            duration: 0.8,
            ease: "power4.out",
            scrollTrigger: { trigger: trackRef.current, start: "top 80%" },
          },
        );
      });

      return () => mm.revert();
    },
    { scope: rootRef },
  );

  return (
    <section ref={rootRef} id="projects" className="relative">
      <div
        data-projects-pin
        className="relative flex min-h-[100svh] flex-col justify-center overflow-hidden bg-bg-elevated/30 py-24 md:py-0"
      >
        <div className="mx-auto w-full max-w-7xl px-6 pt-20 md:absolute md:left-0 md:right-0 md:top-14 md:z-10 md:pt-0">
          <p className="chip">Projects</p>
          <h2 className="font-display mt-5 text-[clamp(2.25rem,5vw,4rem)] font-semibold leading-[1.02] tracking-[-0.02em]">
            Code that <span className="text-ramp-y">ships.</span>
          </h2>
          <p className="mt-4 hidden max-w-xl text-text-secondary md:block">
            Open-source tools and research software built by members. Keep scrolling; the gallery
            moves sideways.
          </p>
        </div>

        <div
          ref={trackRef}
          className="mt-12 flex flex-col gap-4 px-6 md:mt-0 md:w-max md:flex-row md:items-center md:gap-6 md:pl-[max(1.5rem,calc((100vw-80rem)/2+1.5rem))] md:pr-24"
        >
          {projects.map((p, i) => (
            <article
              key={p.title}
              data-project-card
              data-cursor
              onClick={p.href ? () => window.open(p.href, "_blank", "noopener") : undefined}
              className="panel group relative shrink-0 overflow-hidden rounded-2xl md:w-[34rem]"
            >
              <div
                data-cover
                className="relative h-44 overflow-hidden md:h-52"
                style={p.image ? undefined : { background: hueFor(i) }}
              >
                {p.image ? (
                  <img
                    src={p.image}
                    alt={`${p.title} preview`}
                    className="h-full w-full object-cover object-top"
                    loading="lazy"
                    decoding="async"
                  />
                ) : (
                  <span
                    data-numeral
                    className="absolute -bottom-7 right-4 select-none font-display text-[9rem] font-bold leading-none text-white/25 mix-blend-overlay"
                  >
                    {p.num}
                  </span>
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-[#0d0812]/90 via-transparent to-transparent" />
                <div className="absolute bottom-4 left-5 flex items-center gap-2 font-mono text-sm">
                  <Github className="h-4 w-4 text-white/70" />
                  <span className="text-white/60">{p.owner}</span>
                  <span className="text-white">{p.title}</span>
                </div>
              </div>

              <div className="p-6">
                <p className="text-sm leading-relaxed text-text-secondary">{p.desc}</p>
                <div className="mt-4 flex flex-wrap gap-1.5">
                  {p.stack.map((t) => (
                    <span key={t} className="chip !px-2.5 !py-1 !text-[10px]">
                      {t}
                    </span>
                  ))}
                </div>
                <div className="mt-5 flex items-center justify-between border-t border-white/10 pt-4">
                  <span className="inline-flex items-center gap-1.5 font-mono text-xs text-text-secondary">
                    {p.stars && (
                      <>
                        <Star className="h-3.5 w-3.5 text-flame" /> {p.stars}
                      </>
                    )}
                  </span>
                  <span className="flex items-center gap-4">
                    {p.writeup && (
                      <a
                        href={p.writeup.href}
                        target="_blank"
                        rel="noreferrer"
                        onClick={(e) => e.stopPropagation()}
                        className="inline-flex items-center gap-1 font-mono text-xs text-flame"
                      >
                        {p.writeup.label} <ExternalLink className="h-3 w-3" />
                      </a>
                    )}
                    {p.href ? (
                      <a
                        href={p.href}
                        target="_blank"
                        rel="noreferrer"
                        onClick={(e) => e.stopPropagation()}
                        className="inline-flex items-center gap-1 font-mono text-xs text-coral"
                      >
                        view repo <ExternalLink className="h-3 w-3" />
                      </a>
                    ) : (
                      <span className="inline-flex translate-x-1 items-center gap-1 font-mono text-xs text-coral opacity-0 transition-all duration-300 group-hover:translate-x-0 group-hover:opacity-100">
                        view repo <ExternalLink className="h-3 w-3" />
                      </span>
                    )}
                  </span>
                </div>
              </div>
            </article>
          ))}
        </div>

        <div className="mx-auto mt-10 hidden w-full max-w-7xl items-center gap-5 px-6 pb-8 md:flex">
          <span className="font-mono text-sm tabular-nums">
            <span data-project-counter>01</span>
            <span className="text-text-secondary">
              {" "}
              / {String(projects.length).padStart(2, "0")}
            </span>
          </span>
          <div className="h-px flex-1 overflow-hidden bg-white/10">
            <div data-project-bar className="h-full w-full origin-left scale-x-0 bg-ramp-x" />
          </div>
          <span className="font-mono text-[11px] uppercase tracking-[0.25em] text-text-secondary">
            Scroll
          </span>
        </div>
      </div>
    </section>
  );
}
