import { useEffect, useRef, useState } from "react";
import { ArrowUp, Github, Linkedin, Mail, Twitter } from "lucide-react";
import { gsap, useGSAP, prefersReducedMotion } from "@/lib/gsap";
import { scrollToTarget } from "@/components/providers/SmoothScroll";
import { Magnetic } from "./Magnetic";
import { Logo } from "./Logo";

function useISTClock() {
  const [time, setTime] = useState("--:--:--");
  useEffect(() => {
    const fmt = new Intl.DateTimeFormat("en-IN", {
      timeZone: "Asia/Kolkata",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: false,
    });
    const tick = () => setTime(fmt.format(new Date()));
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);
  return time;
}

const explore = [
  ["About", "#about"],
  ["Terminal", "#terminal"],
  ["Projects", "#projects"],
  ["Events", "#events"],
  ["Roadmaps", "#resources"],
  ["Team", "#team"],
] as const;

export function Footer() {
  const time = useISTClock();
  const rootRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      if (prefersReducedMotion()) return;
      gsap.fromTo(
        "[data-footer-cols] > *",
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 0.85,
          stagger: 0.1,
          ease: "power4.out",
          scrollTrigger: { trigger: rootRef.current, start: "top 85%" },
        },
      );
      gsap.fromTo(
        "[data-wordmark]",
        { opacity: 0, yPercent: 30 },
        {
          opacity: 1,
          yPercent: 0,
          duration: 1.1,
          ease: "power4.out",
          scrollTrigger: { trigger: "[data-wordmark]", start: "top 92%" },
          onComplete: () => gsap.set("[data-wordmark]", { clearProps: "all" }),
        },
      );
    },
    { scope: rootRef },
  );

  return (
    <footer ref={rootRef} className="relative overflow-hidden">
      <div className="mx-auto max-w-7xl px-6 pb-10 pt-20">
        <div data-footer-cols className="grid grid-cols-2 gap-10 md:grid-cols-4">
          <div className="col-span-2">
            <div className="flex items-center gap-2.5">
              <Logo size={36} />
              <span className="font-display text-base font-semibold tracking-tight">
                Cyber<span className="text-ramp">heathens</span>
              </span>
            </div>
            <p className="mt-5 max-w-sm text-sm leading-relaxed text-text-secondary">
              A student-run developer community. We build in the open, share what we learn, and push
              each other to ship.
            </p>
            <p className="mt-6 font-mono text-xs text-text-secondary">
              bhopal · <span className="tabular-nums text-flame">{time}</span> IST
            </p>
          </div>

          <nav aria-label="Explore">
            <h4 className="font-mono text-[11px] uppercase tracking-[0.25em] text-text-secondary">
              Explore
            </h4>
            <ul className="mt-4 space-y-2.5 text-sm">
              {explore.map(([label, href]) => (
                <li key={href}>
                  <a
                    href={href}
                    className="link-line text-foreground/85 transition hover:text-foreground"
                  >
                    {label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <nav aria-label="Connect">
            <h4 className="font-mono text-[11px] uppercase tracking-[0.25em] text-text-secondary">
              Connect
            </h4>
            <ul className="mt-4 space-y-2.5 text-sm">
              <li>
                <a
                  href="#"
                  className="inline-flex items-center gap-2 text-foreground/85 transition hover:text-flame"
                >
                  <Github className="h-3.5 w-3.5" /> github.com/cyberheathens
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="inline-flex items-center gap-2 text-foreground/85 transition hover:text-coral"
                >
                  <Twitter className="h-3.5 w-3.5" /> @cyberheathens
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="inline-flex items-center gap-2 text-foreground/85 transition hover:text-magenta"
                >
                  <Linkedin className="h-3.5 w-3.5" /> /company/cyberheathens
                </a>
              </li>
              <li>
                <a
                  href="mailto:hello@cyberheathens.club"
                  className="inline-flex items-center gap-2 text-foreground/85 transition hover:text-flame"
                >
                  <Mail className="h-3.5 w-3.5" /> hello@cyberheathens.club
                </a>
              </li>
            </ul>
          </nav>
        </div>

        {/* Giant interactive wordmark */}
        <a
          href="#top"
          aria-label="Back to top"
          onClick={(e) => {
            e.preventDefault();
            scrollToTarget("#top");
          }}
          className="group mt-16 block select-none"
        >
          <span
            data-wordmark
            className="block bg-[linear-gradient(90deg,#ff8359_0%,#f3586c_50%,#e63e7a_100%)] bg-[length:220%_100%] bg-left bg-clip-text text-center font-display text-[clamp(2.6rem,9.2vw,9rem)] font-bold leading-none tracking-[-0.02em] text-transparent opacity-25 transition-all duration-700 ease-out [background-position:left] group-hover:opacity-100 group-hover:[background-position:right]"
          >
            CYBERHEATHENS
          </span>
        </a>

        <div className="mt-12 flex flex-col items-start justify-between gap-4 border-t border-white/10 pt-6 md:flex-row md:items-center">
          <p className="font-mono text-xs text-text-secondary">
            © {new Date().getFullYear()} Cyberheathens · Built by the community.
          </p>
          <p className="font-mono text-xs text-text-secondary">
            made with <span className="text-coral">&lt;curiosity /&gt;</span> in bhopal, india
          </p>
          <Magnetic strength={0.3}>
            <button
              onClick={() => scrollToTarget("#top")}
              aria-label="Scroll to top"
              className="grid h-11 w-11 place-items-center rounded-full border border-white/15 text-text-secondary transition hover:border-coral/60 hover:text-foreground"
            >
              <ArrowUp className="h-4 w-4" />
            </button>
          </Magnetic>
        </div>
      </div>
    </footer>
  );
}
