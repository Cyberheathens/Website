import { motion } from "motion/react";
import { Calendar, Code, Mic, Rocket, Users } from "lucide-react";
import { SectionHeader } from "./SectionHeader";

const events = [
  { icon: Rocket, date: "MAR 15", title: "Hack The Hills 2026", tag: "Hackathon", desc: "48-hour campus hackathon with ₹2L in prizes and industry mentors." },
  { icon: Code, date: "MAR 02", title: "ICPC Regional Bootcamp", tag: "CP", desc: "Two weeks of targeted training for the regional rounds." },
  { icon: Mic, date: "FEB 21", title: "Fireside w/ a Vercel Engineer", tag: "Speaker", desc: "Inside the edge runtime, from monorepo to deploy." },
  { icon: Users, date: "FEB 10", title: "Open Source Sprint", tag: "OSS", desc: "Weekend sprint to ship PRs to projects we use daily." },
  { icon: Calendar, date: "JAN 28", title: "AI Reading Group · v3", tag: "AI/ML", desc: "Diffusion, mixture-of-experts, and post-training tricks." },
];

export function Events() {
  return (
    <section id="events" className="relative py-24 md:py-32">
      <div className="mx-auto max-w-6xl px-6">
        <SectionHeader
          eyebrow="events"
          title={<>A timeline of <span className="text-gradient">shipping.</span></>}
          desc="Hackathons, contests, workshops, and speaker sessions across the year."
        />

        <div className="relative mt-16">
          <div className="absolute left-6 top-0 bottom-0 w-px bg-border md:left-1/2" />
          <ul className="space-y-10">
            {events.map((e, i) => (
              <motion.li
                key={e.title}
                initial={{ opacity: 0, x: i % 2 ? 30 : -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.5 }}
                className={`relative flex md:items-center ${i % 2 ? "md:flex-row-reverse" : ""}`}
              >
                <div className="hidden md:block md:w-1/2" />
                <span className="absolute left-6 grid h-3 w-3 -translate-x-1/2 place-items-center rounded-full bg-neon-cyan shadow-[0_0_16px_var(--neon-cyan)] md:left-1/2" />
                <div className={`ml-14 w-full md:ml-0 md:w-1/2 ${i % 2 ? "md:pr-12" : "md:pl-12"}`}>
                  <div className="group rounded-xl brutal-border bg-bg-elevated/60 p-5 transition hover:border-neon-cyan/40 hover:shadow-[var(--shadow-neon)]">
                    <div className="flex items-center gap-3">
                      <div className="grid h-9 w-9 place-items-center rounded-md brutal-border bg-background/60">
                        <e.icon className="h-4 w-4 text-neon-cyan" />
                      </div>
                      <div>
                        <div className="font-mono text-xs text-text-secondary">{e.date} · {e.tag}</div>
                        <h3 className="font-display text-lg font-semibold">{e.title}</h3>
                      </div>
                    </div>
                    <p className="mt-3 text-sm text-text-secondary">{e.desc}</p>
                  </div>
                </div>
              </motion.li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}