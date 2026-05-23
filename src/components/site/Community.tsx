import { Calendar, Github, MessageSquare } from "lucide-react";

export function Community() {
  return (
    <section id="community" className="relative overflow-hidden py-24 md:py-32">
      <div className="absolute inset-0 -z-10 grid-bg opacity-40" />
      <div className="absolute inset-x-0 top-1/2 -z-10 mx-auto h-72 max-w-3xl -translate-y-1/2 rounded-full blur-3xl opacity-40"
        style={{ background: "var(--gradient-accent)" }} />

      <div className="mx-auto max-w-3xl px-6 text-center">
        <p className="font-mono text-xs uppercase tracking-[0.2em] text-neon-cyan">// join us</p>
        <h2 className="font-display mt-3 text-4xl font-semibold tracking-tight md:text-6xl">
          Build with the <span className="text-gradient">brightest minds</span> at IISER Bhopal.
        </h2>
        <p className="mt-5 text-text-secondary">
          Open to every IISERB student. No gatekeeping, no prerequisites — only curiosity required.
        </p>

        <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
          <a href="#" className="inline-flex h-11 items-center gap-2 rounded-md bg-neon-cyan px-5 text-sm font-medium text-background hover:shadow-[0_0_28px_-4px_var(--neon-cyan)] transition">
            <MessageSquare className="h-4 w-4" /> Join Discord
          </a>
          <a href="#" className="inline-flex h-11 items-center gap-2 rounded-md brutal-border bg-background/40 px-5 text-sm font-medium hover:border-neon-cyan/50 transition">
            <Github className="h-4 w-4" /> View GitHub
          </a>
          <a href="#events" className="inline-flex h-11 items-center gap-2 rounded-md brutal-border bg-background/40 px-5 text-sm font-medium hover:border-neon-cyan/50 transition">
            <Calendar className="h-4 w-4" /> Next Event
          </a>
        </div>
      </div>
    </section>
  );
}