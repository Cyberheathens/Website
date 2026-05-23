import { useEffect, useState } from "react";
import { Github, Moon, Sun, Terminal } from "lucide-react";

const links = [
  { href: "#about", label: "About" },
  { href: "#projects", label: "Projects" },
  { href: "#events", label: "Events" },
  { href: "#resources", label: "Resources" },
  { href: "#team", label: "Team" },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [dark, setDark] = useState(true);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", !dark);
  }, [dark]);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-40 transition-all duration-300 ${
        scrolled ? "glass border-b border-border" : "bg-transparent"
      }`}
    >
      <nav className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
        <a href="#top" className="flex items-center gap-2.5 group">
          <div className="relative grid h-8 w-8 place-items-center rounded-md bg-bg-elevated brutal-border">
            <Terminal className="h-4 w-4 text-neon-cyan" />
            <span className="absolute -right-0.5 -top-0.5 h-2 w-2 rounded-full bg-neon-green shadow-[0_0_8px_var(--neon-green)] animate-pulse" />
          </div>
          <div className="leading-tight">
            <div className="font-display text-sm font-semibold tracking-tight">IISERB</div>
            <div className="font-mono text-[10px] text-text-secondary -mt-0.5">coding.club</div>
          </div>
        </a>

        <ul className="hidden items-center gap-1 md:flex">
          {links.map((l) => (
            <li key={l.href}>
              <a
                href={l.href}
                className="group relative rounded px-3 py-1.5 text-sm text-text-secondary transition-colors hover:text-foreground"
              >
                {l.label}
                <span className="absolute inset-x-3 -bottom-0.5 h-px scale-x-0 bg-neon-cyan transition-transform duration-300 group-hover:scale-x-100" />
              </a>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setDark((d) => !d)}
            aria-label="Toggle theme"
            className="grid h-9 w-9 place-items-center rounded-md brutal-border text-text-secondary hover:text-foreground hover:border-neon-cyan/40 transition"
          >
            {dark ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
          </button>
          <a
            href="https://github.com"
            target="_blank"
            rel="noreferrer"
            aria-label="GitHub"
            className="grid h-9 w-9 place-items-center rounded-md brutal-border text-text-secondary hover:text-foreground hover:border-neon-cyan/40 transition"
          >
            <Github className="h-4 w-4" />
          </a>
          <a
            href="#community"
            className="hidden sm:inline-flex h-9 items-center rounded-md bg-neon-cyan px-4 text-sm font-medium text-background hover:shadow-[0_0_24px_-4px_var(--neon-cyan)] transition"
          >
            Join Community
          </a>
        </div>
      </nav>
    </header>
  );
}