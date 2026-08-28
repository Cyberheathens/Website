import { useEffect, useRef, useState } from "react";
import { Clock, Layers } from "lucide-react";
import { gsap, prefersReducedMotion } from "@/lib/gsap";

type Track = "CP" | "Web Dev" | "AI/ML" | "Systems" | "Research";

const data: Record<Track, { title: string; level: string; time: string; items: string[] }[]> = {
  CP: [
    {
      title: "Foundations",
      level: "Beginner",
      time: "4 weeks",
      items: ["STL & ad-hoc", "Two pointers", "Binary search", "Greedy patterns"],
    },
    {
      title: "Algorithms II",
      level: "Intermediate",
      time: "6 weeks",
      items: ["DP on trees", "Segment trees", "Graph theory", "Number theory"],
    },
    {
      title: "ICPC Prep",
      level: "Advanced",
      time: "8 weeks",
      items: ["Heavy-light", "Flows", "FFT", "Geometry"],
    },
  ],
  "Web Dev": [
    {
      title: "Modern React",
      level: "Beginner",
      time: "3 weeks",
      items: ["TS fundamentals", "Routing & data", "Forms & validation", "Testing"],
    },
    {
      title: "Full Stack",
      level: "Intermediate",
      time: "5 weeks",
      items: ["Edge runtimes", "Postgres + RLS", "Auth flows", "Realtime"],
    },
    {
      title: "Design Systems",
      level: "Advanced",
      time: "4 weeks",
      items: ["Tokens", "Primitives", "Motion craft", "Theming"],
    },
  ],
  "AI/ML": [
    {
      title: "Math + ML",
      level: "Beginner",
      time: "5 weeks",
      items: ["Linear algebra", "Probability", "scikit-learn", "Project: spam filter"],
    },
    {
      title: "Deep Learning",
      level: "Intermediate",
      time: "6 weeks",
      items: ["PyTorch", "CNNs / RNNs", "Transformers", "Fine-tuning"],
    },
    {
      title: "Frontier",
      level: "Advanced",
      time: "Ongoing",
      items: ["Diffusion", "RLHF", "Distributed training", "Eval harnesses"],
    },
  ],
  Systems: [
    {
      title: "Systems I",
      level: "Beginner",
      time: "4 weeks",
      items: ["C / pointers", "Linux internals", "Networking", "Bash + Make"],
    },
    {
      title: "Performance",
      level: "Intermediate",
      time: "5 weeks",
      items: ["Profiling", "Caches", "Concurrency", "Lock-free"],
    },
    {
      title: "Distributed",
      level: "Advanced",
      time: "6 weeks",
      items: ["Raft / Paxos", "Sharding", "Stream processing", "Storage engines"],
    },
  ],
  Research: [
    {
      title: "Reading Papers",
      level: "Beginner",
      time: "Ongoing",
      items: ["arXiv hygiene", "Notes pipeline", "Replication", "Critique"],
    },
    {
      title: "Writing & Reproducing",
      level: "Intermediate",
      time: "6 weeks",
      items: ["LaTeX", "Experiments", "Ablations", "Open peer review"],
    },
    {
      title: "Publishing",
      level: "Advanced",
      time: "Ongoing",
      items: ["Workshops", "Camera-ready", "Posters", "Talks"],
    },
  ],
};

const tracks: Track[] = ["CP", "Web Dev", "AI/ML", "Systems", "Research"];

const levelClass: Record<string, string> = {
  Beginner: "text-text-secondary",
  Intermediate: "text-flame",
  Advanced: "text-magenta",
};

export function Resources() {
  const [active, setActive] = useState<Track>("CP");
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (prefersReducedMotion() || !gridRef.current) return;
    gsap.fromTo(
      gridRef.current.children,
      { opacity: 0, y: 26 },
      { opacity: 1, y: 0, duration: 0.55, stagger: 0.07, ease: "power4.out" },
    );
  }, [active]);

  return (
    <section
      id="resources"
      className="relative border-y border-white/5 bg-bg-elevated/30 py-28 md:py-36"
    >
      <div className="mx-auto max-w-6xl px-6">
        <p className="chip">Roadmaps</p>
        <h2 className="font-display mt-6 max-w-3xl text-[clamp(2.25rem,5vw,4rem)] font-semibold leading-[1.02] tracking-[-0.02em]">
          Curious <span className="text-ramp-y">→ competent.</span>
        </h2>
        <p className="mt-5 max-w-xl text-lg text-text-secondary">
          Curated learning paths maintained by the club. Pick a track.
        </p>

        <div className="mt-10 flex flex-wrap gap-2" role="tablist" aria-label="Learning tracks">
          {tracks.map((t) => (
            <button
              key={t}
              role="tab"
              aria-selected={active === t}
              onClick={() => setActive(t)}
              className={`rounded-full px-5 py-2.5 font-mono text-xs uppercase tracking-[0.12em] transition-all duration-300 ${
                active === t
                  ? "bg-ramp-x text-[#14060e] shadow-[var(--glow-ramp)]"
                  : "border border-white/15 text-text-secondary hover:border-flame/50 hover:text-foreground"
              }`}
            >
              {t}
            </button>
          ))}
        </div>

        <div ref={gridRef} className="mt-10 grid grid-cols-1 gap-4 md:grid-cols-2">
          {data[active].map((card, i) => (
            <div
              key={`${active}-${card.title}`}
              className={`panel group rounded-2xl p-6 ${i === 2 ? "md:col-span-2" : ""}`}
            >
              <div className="flex items-center justify-between">
                <h3 className="font-display text-xl font-semibold tracking-tight">{card.title}</h3>
                <span
                  className={`font-mono text-[10px] uppercase tracking-[0.18em] ${levelClass[card.level]}`}
                >
                  {card.level}
                </span>
              </div>
              <div className="mt-2 flex items-center gap-4 font-mono text-xs text-text-secondary">
                <span className="inline-flex items-center gap-1.5">
                  <Clock className="h-3 w-3" /> {card.time}
                </span>
                <span className="inline-flex items-center gap-1.5">
                  <Layers className="h-3 w-3" /> {card.items.length} modules
                </span>
              </div>
              <ul className="mt-4 space-y-2">
                {card.items.map((it) => (
                  <li
                    key={it}
                    className="flex items-start gap-2.5 text-sm text-text-secondary transition-colors group-hover:text-foreground/80"
                  >
                    <span className="mt-[7px] h-1 w-3 rounded-full bg-ramp-x opacity-70" />
                    {it}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
