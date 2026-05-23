import { useEffect, useState } from "react";
import { motion } from "motion/react";
import { ArrowRight, Code2, Sparkles } from "lucide-react";

const taglines = [
  "Build. Break. Learn. Repeat.",
  "Where Research Meets Engineering.",
  "Code Beyond Classrooms.",
  "Open Source • CP • AI",
];

const stats = [
  { v: "500+", l: "Members" },
  { v: "50+", l: "Projects" },
  { v: "20+", l: "Hackathons" },
  { v: "10K+", l: "GH Commits" },
];

export function Hero() {
  const [i, setI] = useState(0);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const id = setInterval(() => setI((p) => (p + 1) % taglines.length), 2800);
    return () => clearInterval(id);
  }, []);

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      const x = (e.clientX / window.innerWidth - 0.5) * 8;
      const y = (e.clientY / window.innerHeight - 0.5) * 8;
      setTilt({ x, y });
    };
    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, []);

  return (
    <section
      id="top"
      className="relative isolate overflow-hidden pt-32 pb-24 md:pt-44 md:pb-32"
    >
      {/* background layers */}
      <div className="absolute inset-0 -z-10 grid-bg opacity-60" />
      <div
        className="absolute inset-0 -z-10"
        style={{ background: "var(--gradient-hero)" }}
      />
      <div className="absolute -z-10 left-1/4 top-1/3 h-72 w-72 rounded-full blur-3xl opacity-30"
        style={{ background: "var(--neon-cyan)" }} />
      <div className="absolute -z-10 right-1/4 top-1/2 h-72 w-72 rounded-full blur-3xl opacity-20"
        style={{ background: "var(--neon-green)" }} />

      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-12 px-6 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
        <div>
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 rounded-full brutal-border bg-bg-elevated/60 px-3 py-1 font-mono text-xs text-text-secondary"
          >
            <span className="h-1.5 w-1.5 rounded-full bg-neon-green shadow-[0_0_8px_var(--neon-green)]" />
            <span>IISER Bhopal • Student-led • est. 2019</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.05 }}
            style={{ transform: `translate3d(${tilt.x}px, ${tilt.y}px, 0)` }}
            className="font-display mt-6 text-5xl font-semibold leading-[1.02] tracking-tight md:text-7xl"
          >
            Empowering the next generation of{" "}
            <span className="text-gradient">IISERB developers.</span>
          </motion.h1>

          <p className="mt-6 max-w-xl text-base text-text-secondary md:text-lg">
            We build projects, compete globally, explore AI, and create the
            future of technology at IISER Bhopal.
          </p>

          <div className="mt-4 font-mono text-sm text-neon-cyan">
            <span className="text-text-secondary">~ $</span>{" "}
            <motion.span
              key={taglines[i]}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="cursor-blink"
            >
              {taglines[i]}
            </motion.span>
          </div>

          <div className="mt-8 flex flex-wrap gap-3">
            <a
              href="#community"
              className="group inline-flex h-11 items-center gap-2 rounded-md bg-neon-cyan px-5 text-sm font-medium text-background transition hover:shadow-[0_0_28px_-4px_var(--neon-cyan)]"
            >
              Join the Club
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
            </a>
            <a
              href="#projects"
              className="inline-flex h-11 items-center gap-2 rounded-md brutal-border bg-bg-elevated/40 px-5 text-sm font-medium text-foreground hover:border-neon-cyan/50 transition"
            >
              <Code2 className="h-4 w-4" /> Explore Projects
            </a>
          </div>

          <dl className="mt-12 grid grid-cols-2 gap-x-6 gap-y-4 sm:grid-cols-4 max-w-xl">
            {stats.map((s) => (
              <div key={s.l}>
                <dt className="font-display text-2xl font-semibold text-foreground">{s.v}</dt>
                <dd className="font-mono text-[11px] uppercase tracking-wider text-text-secondary">{s.l}</dd>
              </div>
            ))}
          </dl>
        </div>

        {/* Right: terminal card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          style={{ transform: `translate3d(${-tilt.x}px, ${-tilt.y}px, 0)` }}
          className="relative"
        >
          <div className="absolute -inset-6 -z-10 rounded-3xl opacity-40 blur-3xl"
            style={{ background: "var(--gradient-accent)" }} />
          <div className="rounded-xl brutal-border bg-bg-elevated/80 shadow-[var(--shadow-neon)] backdrop-blur">
            <div className="flex items-center gap-2 border-b border-border px-4 py-2.5">
              <span className="h-2.5 w-2.5 rounded-full bg-[#FF5F56]" />
              <span className="h-2.5 w-2.5 rounded-full bg-[#FFBD2E]" />
              <span className="h-2.5 w-2.5 rounded-full bg-[#27C93F]" />
              <span className="ml-2 font-mono text-xs text-text-secondary">~/iiserb-coding-club — zsh</span>
              <Sparkles className="ml-auto h-3.5 w-3.5 text-neon-cyan" />
            </div>
            <div className="p-5 font-mono text-[13px] leading-relaxed">
              <p><span className="text-text-secondary">$</span> <span className="text-neon-green">git clone</span> github.com/iiserb/club.git</p>
              <p className="text-text-secondary">Cloning into 'club'...</p>
              <p className="text-text-secondary">remote: 500 contributors • 50 repos</p>
              <p className="mt-2"><span className="text-text-secondary">$</span> <span className="text-neon-green">cd</span> club && <span className="text-neon-green">npm run</span> ship</p>
              <p className="text-neon-cyan">▸ booting hackathon engine...</p>
              <p className="text-neon-cyan">▸ compiling neurons...</p>
              <p className="text-foreground">✓ ready in <span className="text-neon-green">0.42s</span></p>
              <p className="mt-3 text-text-secondary">// next event: Hack The Hills · 2 weeks</p>
              <p className="mt-1"><span className="text-text-secondary">$</span> <span className="cursor-blink" /></p>
            </div>
          </div>

          {/* floating chips */}
          <div className="float absolute -left-6 -bottom-6 rounded-lg brutal-border bg-background/80 px-3 py-2 font-mono text-xs backdrop-blur">
            <span className="text-neon-green">●</span> <span className="text-text-secondary">build</span> passing
          </div>
          <div className="float absolute -right-4 -top-4 rounded-lg brutal-border bg-background/80 px-3 py-2 font-mono text-xs backdrop-blur" style={{ animationDelay: "1.5s" }}>
            <span className="text-neon-cyan">λ</span> <span className="text-text-secondary">edge.ai</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}