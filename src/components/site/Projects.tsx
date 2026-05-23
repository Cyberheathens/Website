import { motion } from "motion/react";
import { ExternalLink, Github, Star } from "lucide-react";
import { SectionHeader } from "./SectionHeader";

const projects = [
  {
    title: "neuro-lab",
    desc: "Distributed training playground for student-led ML research at IISERB.",
    stack: ["PyTorch", "Triton", "CUDA"],
    stars: "1.2k",
    contributors: 14,
  },
  {
    title: "cp-arsenal",
    desc: "Curated competitive programming templates, snippets and trainers.",
    stack: ["C++", "Python", "Rust"],
    stars: "842",
    contributors: 22,
  },
  {
    title: "campus-os",
    desc: "Open-source operating layer for student life at IISER Bhopal.",
    stack: ["TanStack", "Supabase", "TS"],
    stars: "560",
    contributors: 9,
  },
  {
    title: "paper-radar",
    desc: "An AI assistant that triages arXiv preprints for research groups.",
    stack: ["Next.js", "OpenAI", "pgvector"],
    stars: "1.8k",
    contributors: 17,
  },
  {
    title: "hack-bhopal",
    desc: "Hackathon platform powering 6 regional events and counting.",
    stack: ["Go", "Postgres", "Redis"],
    stars: "430",
    contributors: 11,
  },
  {
    title: "edge-orbit",
    desc: "Tiny edge runtime experiments — push the V8 envelope.",
    stack: ["Rust", "WASM", "V8"],
    stars: "920",
    contributors: 6,
  },
];

export function Projects() {
  return (
    <section id="projects" className="relative border-y border-border bg-bg-elevated/30 py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-6">
        <SectionHeader
          eyebrow="projects"
          title={<>Code that <span className="text-gradient">ships.</span></>}
          desc="Open-source tools, research software and student startups built by club members."
        />

        <div className="mt-14 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
          {projects.map((p, i) => (
            <motion.article
              key={p.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5, delay: i * 0.06 }}
              className="group rounded-xl brutal-border bg-background/60 p-5 transition hover:-translate-y-1 hover:border-neon-cyan/40 hover:shadow-[0_20px_40px_-20px_var(--neon-cyan)]"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 font-mono text-sm">
                  <Github className="h-4 w-4 text-text-secondary" />
                  <span className="text-text-secondary">iiserb/</span>
                  <span className="text-foreground">{p.title}</span>
                </div>
                <span className="inline-flex items-center gap-1 font-mono text-xs text-text-secondary">
                  <Star className="h-3.5 w-3.5" /> {p.stars}
                </span>
              </div>
              <p className="mt-4 text-sm text-text-secondary">{p.desc}</p>
              <div className="mt-5 flex flex-wrap gap-1.5">
                {p.stack.map((t) => (
                  <span key={t} className="rounded-md brutal-border bg-bg-elevated/60 px-2 py-0.5 font-mono text-[11px] text-foreground">
                    {t}
                  </span>
                ))}
              </div>
              <div className="mt-5 flex items-center justify-between border-t border-border pt-4">
                <div className="flex -space-x-2">
                  {Array.from({ length: 4 }).map((_, k) => (
                    <div key={k} className="h-6 w-6 rounded-full border-2 border-background"
                      style={{ background: `linear-gradient(135deg, oklch(0.${5 + k} 0.15 ${180 + k * 30}), oklch(0.${4 + k} 0.2 ${145 + k * 30}))` }} />
                  ))}
                  <span className="ml-3 self-center font-mono text-[11px] text-text-secondary">+{p.contributors}</span>
                </div>
                <a href="#" className="inline-flex items-center gap-1 font-mono text-xs text-neon-cyan opacity-0 transition group-hover:opacity-100">
                  demo <ExternalLink className="h-3 w-3" />
                </a>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}