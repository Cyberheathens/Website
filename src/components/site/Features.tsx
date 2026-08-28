import { useRef, type MouseEvent } from "react";
import { ArrowUpRight, Binary, Cpu, GitBranch, Globe, Microscope, Trophy } from "lucide-react";
import { gsap, useGSAP, prefersReducedMotion } from "@/lib/gsap";

const features = [
  {
    icon: Trophy,
    title: "Competitive Programming",
    desc: "ICPC, Codeforces rounds, weekly contests, and dedicated training squads.",
    span: "md:col-span-4",
    num: "01",
  },
  {
    icon: GitBranch,
    title: "Open Source",
    desc: "Ship merged PRs to projects used by millions.",
    span: "md:col-span-2",
    num: "02",
  },
  {
    icon: Cpu,
    title: "AI & ML",
    desc: "From transformers to diffusion, with research-grade study groups.",
    span: "md:col-span-2",
    num: "03",
  },
  {
    icon: Globe,
    title: "Web Development",
    desc: "Modern stacks: edge runtimes, design systems, real-time everything.",
    span: "md:col-span-4",
    num: "04",
  },
  {
    icon: Microscope,
    title: "Research Engineering",
    desc: "Systems that power Cyberheathens labs, from data planes to evals.",
    span: "md:col-span-3",
    num: "05",
  },
  {
    icon: Binary,
    title: "Hackathons",
    desc: "Build weekends. Real shipping. Real prizes.",
    span: "md:col-span-3",
    num: "06",
  },
];

export function Features() {
  const rootRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      if (prefersReducedMotion()) return;
      gsap.fromTo(
        "[data-feature]",
        { opacity: 0, y: 56 },
        {
          opacity: 1,
          y: 0,
          duration: 0.9,
          ease: "power4.out",
          stagger: 0.08,
          scrollTrigger: { trigger: "[data-features-grid]", start: "top 78%" },
        },
      );
      gsap.fromTo(
        "[data-features-head]",
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 0.9,
          ease: "power4.out",
          scrollTrigger: { trigger: rootRef.current, start: "top 80%" },
        },
      );
    },
    { scope: rootRef },
  );

  const onCardMove = (e: MouseEvent<HTMLElement>) => {
    const el = e.currentTarget;
    const rect = el.getBoundingClientRect();
    el.style.setProperty("--mx", `${e.clientX - rect.left}px`);
    el.style.setProperty("--my", `${e.clientY - rect.top}px`);
  };

  return (
    <section ref={rootRef} id="about" className="relative py-28 md:py-36">
      <div className="mx-auto max-w-7xl px-6">
        <div data-features-head>
          <p className="chip">What we do</p>
          <h2 className="font-display mt-6 max-w-3xl text-[clamp(2.25rem,5vw,4rem)] font-semibold leading-[1.02] tracking-[-0.02em]">
            Six disciplines. <span className="text-ramp-y">One community.</span>
          </h2>
          <p className="mt-5 max-w-xl text-lg text-text-secondary">
            An asymmetric atlas of how Cyberheathens engineers learn, ship, and compete.
          </p>
        </div>

        <div data-features-grid className="mt-16 grid grid-cols-1 gap-4 md:grid-cols-6">
          {features.map((f) => (
            <a
              key={f.title}
              href="#terminal"
              onMouseMove={onCardMove}
              data-feature
              data-cursor
              className={`spotlight-card panel group flex flex-col justify-between overflow-hidden rounded-2xl p-7 ${f.span}`}
            >
              <div className="flex items-start justify-between">
                <span className="grid h-11 w-11 place-items-center rounded-xl border border-white/10 bg-white/5 transition-colors duration-300 group-hover:border-flame/40">
                  <f.icon className="h-5 w-5 text-flame" />
                </span>
                <span className="flex items-center gap-3">
                  <span className="font-mono text-xs text-white/20">{f.num}</span>
                  <ArrowUpRight className="h-5 w-5 text-text-secondary transition-all duration-300 group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:text-magenta" />
                </span>
              </div>
              <div className="mt-14">
                <h3 className="font-display text-2xl font-semibold tracking-tight">{f.title}</h3>
                <p className="mt-2 max-w-md text-sm leading-relaxed text-text-secondary">
                  {f.desc}
                </p>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
