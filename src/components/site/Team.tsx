import { motion } from "motion/react";
import { Github, Linkedin } from "lucide-react";
import { SectionHeader } from "./SectionHeader";

const team = [
  { name: "Aarav Mehta", role: "President", stack: ["Rust", "Distributed"], hue: 180 },
  { name: "Diya Sharma", role: "Vice President", stack: ["PyTorch", "Research"], hue: 200 },
  { name: "Kabir Singh", role: "CP Lead", stack: ["C++", "ICPC"], hue: 145 },
  { name: "Ishita Rao", role: "AI/ML Lead", stack: ["JAX", "Diffusion"], hue: 250 },
  { name: "Rohan Iyer", role: "Web Lead", stack: ["TanStack", "Edge"], hue: 30 },
  { name: "Saanvi Patel", role: "OSS Lead", stack: ["Go", "K8s"], hue: 300 },
  { name: "Vihaan Joshi", role: "Systems Lead", stack: ["Linux", "Perf"], hue: 90 },
  { name: "Meher Khan", role: "Design Engineer", stack: ["Figma", "Motion"], hue: 340 },
];

export function Team() {
  return (
    <section id="team" className="relative py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-6">
        <SectionHeader
          eyebrow="team"
          title={<>The humans behind the <span className="text-gradient">commits.</span></>}
          desc="A rotating cast of students leading tracks, events and open-source efforts."
        />

        <div className="mt-14 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
          {team.map((m, i) => (
            <motion.div
              key={m.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.45, delay: i * 0.04 }}
              className="group relative rounded-xl brutal-border bg-bg-elevated/50 p-5 transition hover:-translate-y-1 hover:border-neon-cyan/40 hover:shadow-[var(--shadow-neon)]"
            >
              <div
                className="mx-auto h-20 w-20 rounded-full border-2 border-border transition group-hover:border-neon-cyan"
                style={{
                  background: `radial-gradient(circle at 30% 30%, oklch(0.7 0.18 ${m.hue}), oklch(0.3 0.1 ${m.hue + 40}))`,
                }}
              />
              <div className="mt-4 text-center">
                <h3 className="font-display text-base font-semibold">{m.name}</h3>
                <p className="font-mono text-[11px] uppercase tracking-wider text-text-secondary">{m.role}</p>
              </div>
              <div className="mt-3 flex flex-wrap justify-center gap-1">
                {m.stack.map((s) => (
                  <span key={s} className="rounded brutal-border bg-background/50 px-1.5 py-0.5 font-mono text-[10px] text-text-secondary">{s}</span>
                ))}
              </div>
              <div className="mt-4 flex justify-center gap-2 opacity-0 transition group-hover:opacity-100">
                <a href="#" aria-label="GitHub" className="grid h-7 w-7 place-items-center rounded brutal-border text-text-secondary hover:text-neon-cyan"><Github className="h-3.5 w-3.5" /></a>
                <a href="#" aria-label="LinkedIn" className="grid h-7 w-7 place-items-center rounded brutal-border text-text-secondary hover:text-neon-cyan"><Linkedin className="h-3.5 w-3.5" /></a>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}