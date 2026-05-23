import { motion } from "motion/react";
import { ArrowUpRight, Binary, Cpu, GitBranch, Globe, Microscope, Trophy } from "lucide-react";
import { SectionHeader } from "./SectionHeader";

const features = [
  { icon: Trophy, title: "Competitive Programming", desc: "ICPC, Codeforces rounds, weekly contests, and dedicated training squads.", span: "md:col-span-2" },
  { icon: GitBranch, title: "Open Source", desc: "Ship merged PRs to projects used by millions.", span: "" },
  { icon: Cpu, title: "AI & ML", desc: "From transformers to diffusion — research-grade study groups.", span: "" },
  { icon: Globe, title: "Web Development", desc: "Modern stacks: Next, Tanstack, Edge runtimes, design systems.", span: "md:col-span-2" },
  { icon: Microscope, title: "Research Engineering", desc: "Engineering systems that power IISERB labs.", span: "md:col-span-2" },
  { icon: Binary, title: "Hackathons", desc: "Build weekends. Real shipping. Real prizes.", span: "" },
];

export function Features() {
  return (
    <section id="about" className="relative py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-6">
        <SectionHeader
          eyebrow="what we do"
          title={<>Six disciplines. <span className="text-gradient">One community.</span></>}
          desc="An asymmetric atlas of how IISERB engineers learn, ship, and compete."
        />

        <div className="mt-14 grid grid-cols-1 gap-4 md:grid-cols-3">
          {features.map((f, i) => (
            <motion.a
              key={f.title}
              href="#"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.5, delay: i * 0.05 }}
              className={`group relative overflow-hidden rounded-xl brutal-border bg-bg-elevated/40 p-6 transition hover:border-neon-cyan/40 hover:bg-bg-elevated/70 ${f.span}`}
            >
              <div className="absolute inset-0 -z-10 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                style={{ background: "radial-gradient(400px circle at 50% 0%, color-mix(in oklab, var(--neon-cyan) 14%, transparent), transparent 70%)" }} />
              <div className="flex items-start justify-between">
                <div className="grid h-10 w-10 place-items-center rounded-md brutal-border bg-background/40">
                  <f.icon className="h-5 w-5 text-neon-cyan" />
                </div>
                <ArrowUpRight className="h-5 w-5 text-text-secondary transition-all group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-neon-cyan" />
              </div>
              <h3 className="font-display mt-6 text-xl font-semibold">{f.title}</h3>
              <p className="mt-2 text-sm text-text-secondary">{f.desc}</p>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
}