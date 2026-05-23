import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Clock, Layers } from "lucide-react";
import { SectionHeader } from "./SectionHeader";

type Track = "CP" | "Web Dev" | "AI/ML" | "Systems" | "Research";

const data: Record<Track, { title: string; level: string; time: string; items: string[] }[]> = {
  CP: [
    { title: "Foundations", level: "Beginner", time: "4 weeks", items: ["STL & ad-hoc", "Two pointers", "Binary search", "Greedy patterns"] },
    { title: "Algorithms II", level: "Intermediate", time: "6 weeks", items: ["DP on trees", "Segment trees", "Graph theory", "Number theory"] },
    { title: "ICPC Prep", level: "Advanced", time: "8 weeks", items: ["Heavy-light", "Flows", "FFT", "Geometry"] },
  ],
  "Web Dev": [
    { title: "Modern React", level: "Beginner", time: "3 weeks", items: ["TS fundamentals", "TanStack Router", "TanStack Query", "Forms & validation"] },
    { title: "Full Stack", level: "Intermediate", time: "5 weeks", items: ["Edge runtimes", "Postgres + RLS", "Auth flows", "Realtime"] },
    { title: "Design Systems", level: "Advanced", time: "4 weeks", items: ["Tokens", "Radix primitives", "Motion", "Theming"] },
  ],
  "AI/ML": [
    { title: "Math + ML", level: "Beginner", time: "5 weeks", items: ["Linear algebra", "Probability", "scikit-learn", "Project: spam filter"] },
    { title: "Deep Learning", level: "Intermediate", time: "6 weeks", items: ["PyTorch", "CNNs / RNNs", "Transformers", "Fine-tuning"] },
    { title: "Frontier", level: "Advanced", time: "Ongoing", items: ["Diffusion", "RLHF", "Distributed training", "Eval harnesses"] },
  ],
  Systems: [
    { title: "Systems I", level: "Beginner", time: "4 weeks", items: ["C / pointers", "Linux internals", "Networking", "Bash + Make"] },
    { title: "Performance", level: "Intermediate", time: "5 weeks", items: ["Profiling", "Caches", "Concurrency", "Lock-free"] },
    { title: "Distributed", level: "Advanced", time: "6 weeks", items: ["Raft / Paxos", "Sharding", "Stream processing", "Storage engines"] },
  ],
  Research: [
    { title: "Reading Papers", level: "Beginner", time: "Ongoing", items: ["arXiv hygiene", "Notes pipeline", "Replication", "Critique"] },
    { title: "Writing & Reproducing", level: "Intermediate", time: "6 weeks", items: ["LaTeX", "Experiments", "Ablations", "Open peer review"] },
    { title: "Publishing", level: "Advanced", time: "Ongoing", items: ["Workshops", "Camera-ready", "Posters", "Talks"] },
  ],
};

const tracks: Track[] = ["CP", "Web Dev", "AI/ML", "Systems", "Research"];

const levelColor: Record<string, string> = {
  Beginner: "text-neon-green",
  Intermediate: "text-neon-cyan",
  Advanced: "text-[oklch(0.78_0.18_30)]",
};

export function Resources() {
  const [active, setActive] = useState<Track>("CP");
  return (
    <section id="resources" className="relative border-y border-border bg-bg-elevated/30 py-24 md:py-32">
      <div className="mx-auto max-w-6xl px-6">
        <SectionHeader
          eyebrow="resources"
          title={<>Roadmaps to go from <span className="text-gradient">curious → competent.</span></>}
          desc="Curated learning paths maintained by the club. Pick a track."
        />

        <div className="mt-10 flex flex-wrap justify-center gap-2">
          {tracks.map((t) => (
            <button
              key={t}
              onClick={() => setActive(t)}
              className={`rounded-md px-4 py-2 font-mono text-xs transition ${
                active === t
                  ? "bg-neon-cyan text-background shadow-[0_0_20px_-4px_var(--neon-cyan)]"
                  : "brutal-border bg-background/40 text-text-secondary hover:text-foreground"
              }`}
            >
              {t}
            </button>
          ))}
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={active}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.3 }}
            className="mt-10 grid grid-cols-1 gap-4 md:grid-cols-3"
          >
            {data[active].map((card) => (
              <div
                key={card.title}
                className="group rounded-xl brutal-border bg-background/60 p-5 transition hover:border-neon-cyan/40"
              >
                <div className="flex items-center justify-between">
                  <h3 className="font-display text-lg font-semibold">{card.title}</h3>
                  <span className={`font-mono text-[10px] uppercase tracking-wider ${levelColor[card.level]}`}>
                    {card.level}
                  </span>
                </div>
                <div className="mt-2 flex items-center gap-3 font-mono text-xs text-text-secondary">
                  <span className="inline-flex items-center gap-1"><Clock className="h-3 w-3" /> {card.time}</span>
                  <span className="inline-flex items-center gap-1"><Layers className="h-3 w-3" /> {card.items.length} modules</span>
                </div>
                <ul className="mt-4 space-y-2">
                  {card.items.map((it) => (
                    <li key={it} className="flex items-start gap-2 text-sm text-text-secondary">
                      <span className="mt-1.5 h-1 w-1 rounded-full bg-neon-cyan" />
                      {it}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}