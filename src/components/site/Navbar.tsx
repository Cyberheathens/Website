import { useEffect, useRef, useState } from "react";
import { Github, Menu, X } from "lucide-react";
import { gsap, prefersReducedMotion } from "@/lib/gsap";
import { getLenis } from "@/components/providers/SmoothScroll";
import { Magnetic } from "./Magnetic";
import { Logo } from "./Logo";

const links = [
  { href: "#about", label: "About" },
  { href: "#terminal", label: "Terminal" },
  { href: "#projects", label: "Projects" },
  { href: "#events", label: "Events" },
  { href: "#resources", label: "Roadmaps" },
  { href: "#team", label: "Team" },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 32);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const root = document.documentElement;
    root.classList.toggle("lenis-stopped", open);
    getLenis()?.[open ? "stop" : "start"]();

    if (!open || !menuRef.current) return;
    const items = menuRef.current.querySelectorAll("[data-menu-item]");
    if (prefersReducedMotion()) {
      gsap.set(items, { opacity: 1, y: 0 });
      return;
    }
    gsap.fromTo(
      items,
      { opacity: 0, y: 42 },
      { opacity: 1, y: 0, duration: 0.7, stagger: 0.06, ease: "power4.out", delay: 0.1 },
    );
  }, [open]);

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-[80] transition-all duration-500 ${
          scrolled ? "glass border-b border-white/5 py-3" : "bg-transparent py-5"
        }`}
      >
        <nav className="mx-auto flex max-w-7xl items-center justify-between px-6">
          <a
            href="#top"
            className="group flex items-center gap-2.5"
            aria-label="Cyberheathens home"
          >
            <Logo
              size={36}
              className="transition-transform duration-300 group-hover:rotate-[-8deg]"
            />
            <span className="font-display text-base font-semibold tracking-tight">
              Cyber<span className="text-ramp">heathens</span>
            </span>
          </a>

          <ul className="hidden items-center gap-7 lg:flex">
            {links.map((l) => (
              <li key={l.href}>
                <a
                  href={l.href}
                  className="link-line font-mono text-[12px] uppercase tracking-[0.16em] text-text-secondary transition-colors hover:text-foreground"
                >
                  {l.label}
                </a>
              </li>
            ))}
          </ul>

          <div className="flex items-center gap-2.5">
            <a
              href="https://github.com"
              target="_blank"
              rel="noreferrer"
              aria-label="GitHub"
              className="grid h-9 w-9 place-items-center rounded-full border border-white/10 text-text-secondary transition hover:border-coral/50 hover:text-foreground"
            >
              <Github className="h-4 w-4" />
            </a>
            <Magnetic strength={0.25} className="hidden sm:block">
              <a href="#community" className="btn-solid !h-10 !px-5 !text-[13px]">
                Join us
              </a>
            </Magnetic>
            <button
              onClick={() => setOpen(true)}
              aria-label="Open menu"
              className="grid h-9 w-9 place-items-center rounded-full border border-white/10 text-text-secondary lg:hidden"
            >
              <Menu className="h-4 w-4" />
            </button>
          </div>
        </nav>
      </header>

      {/* Fullscreen menu */}
      <div
        ref={menuRef}
        className={`fixed inset-0 z-[110] flex flex-col bg-background/95 backdrop-blur-xl lg:hidden ${
          open ? "" : "pointer-events-none opacity-0"
        }`}
        role="dialog"
        aria-modal="true"
        aria-label="Menu"
      >
        <div className="flex items-center justify-between px-6 py-5">
          <span className="font-display text-base font-semibold">
            Cyber<span className="text-ramp">heathens</span>
          </span>
          <button
            onClick={() => setOpen(false)}
            aria-label="Close menu"
            className="grid h-9 w-9 place-items-center rounded-full border border-white/10"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
        <nav className="flex flex-1 flex-col justify-center gap-1 px-8">
          {links.map((l, i) => (
            <a
              key={l.href}
              data-menu-item
              href={l.href}
              onClick={() => setOpen(false)}
              className="group flex items-baseline gap-4 py-2"
            >
              <span className="font-mono text-xs text-coral">0{i + 1}</span>
              <span className="font-display text-4xl font-semibold tracking-tight transition group-hover:bg-ramp-x group-hover:bg-clip-text group-hover:text-transparent">
                {l.label}
              </span>
            </a>
          ))}
          <a
            data-menu-item
            href="#community"
            onClick={() => setOpen(false)}
            className="btn-solid mt-8 self-start"
          >
            Join the club
          </a>
        </nav>
      </div>
    </>
  );
}
