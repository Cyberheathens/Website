import { Github, Linkedin, Mail, Twitter } from "lucide-react";

export function Footer() {
  return (
    <footer className="border-t border-border bg-bg-elevated/40">
      <div className="mx-auto max-w-7xl px-6 py-14">
        <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
          <div className="col-span-2">
            <div className="flex items-center gap-2">
              <div className="grid h-8 w-8 place-items-center rounded-md brutal-border bg-background">
                <span className="font-mono text-sm text-neon-cyan">{`{}`}</span>
              </div>
              <div>
                <div className="font-display text-sm font-semibold">IISERB Coding Club</div>
                <div className="font-mono text-[11px] text-text-secondary">Indian Institute of Science Education and Research, Bhopal</div>
              </div>
            </div>
            <p className="mt-5 max-w-sm text-sm text-text-secondary">
              A student-run developer community. We build in the open, share what we learn, and push each other to ship.
            </p>
            <p className="mt-6 font-mono text-xs text-neon-green">
              <span className="text-text-secondary">{">"}</span> system.status = <span className="text-neon-green">"online"</span>
            </p>
          </div>

          <div>
            <h4 className="font-mono text-[11px] uppercase tracking-wider text-text-secondary">Explore</h4>
            <ul className="mt-4 space-y-2 text-sm">
              <li><a href="#about" className="text-foreground hover:text-neon-cyan transition">About</a></li>
              <li><a href="#projects" className="text-foreground hover:text-neon-cyan transition">Projects</a></li>
              <li><a href="#events" className="text-foreground hover:text-neon-cyan transition">Events</a></li>
              <li><a href="#resources" className="text-foreground hover:text-neon-cyan transition">Resources</a></li>
              <li><a href="#team" className="text-foreground hover:text-neon-cyan transition">Team</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-mono text-[11px] uppercase tracking-wider text-text-secondary">Connect</h4>
            <ul className="mt-4 space-y-2 text-sm">
              <li><a href="#" className="inline-flex items-center gap-2 text-foreground hover:text-neon-cyan transition"><Github className="h-3.5 w-3.5" /> github.com/iiserb</a></li>
              <li><a href="#" className="inline-flex items-center gap-2 text-foreground hover:text-neon-cyan transition"><Twitter className="h-3.5 w-3.5" /> @iiserb_code</a></li>
              <li><a href="#" className="inline-flex items-center gap-2 text-foreground hover:text-neon-cyan transition"><Linkedin className="h-3.5 w-3.5" /> /company/iiserb</a></li>
              <li><a href="mailto:hello@codingclub.iiserb.ac.in" className="inline-flex items-center gap-2 text-foreground hover:text-neon-cyan transition"><Mail className="h-3.5 w-3.5" /> hello@codingclub.iiserb.ac.in</a></li>
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-start justify-between gap-3 border-t border-border pt-6 text-xs text-text-secondary md:flex-row md:items-center">
          <p className="font-mono">© {new Date().getFullYear()} IISERB Coding Club · Built by IISERB students.</p>
          <p className="font-mono">made with <span className="text-neon-cyan">&lt;curiosity /&gt;</span> in bhopal, india</p>
        </div>
      </div>
    </footer>
  );
}