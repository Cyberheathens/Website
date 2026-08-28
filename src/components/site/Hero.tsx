import { useEffect, useRef, useState } from "react";
import { ArrowRight, Code2 } from "lucide-react";
import { gsap, useGSAP, prefersReducedMotion, ScrollTrigger } from "@/lib/gsap";
import { useVantaNet } from "@/hooks/use-vanta";
import { ENTERED_EVENT } from "./Preloader";
import { Magnetic } from "./Magnetic";
import { Logo } from "./Logo";

const taglines = [
  "Build. Break. Learn. Repeat.",
  "Research to production, with intent and craft.",
  "Student-led, global, shipping weekly.",
];

const stats = [
  { value: 500, suffix: "+", label: "Builders" },
  { value: 50, suffix: "+", label: "Repos shipped" },
  { value: 20, suffix: "+", label: "Hackathons" },
  { value: 10, suffix: "K+", label: "Commits" },
];

function splitChars(el: HTMLElement) {
  const text = el.textContent ?? "";
  el.textContent = "";
  const frag = document.createDocumentFragment();
  for (const word of text.split(" ")) {
    const wrap = document.createElement("span");
    wrap.style.display = "inline-block";
    wrap.style.whiteSpace = "pre";
    for (const ch of word) {
      const inner = document.createElement("span");
      inner.textContent = ch;
      inner.style.display = "inline-block";
      wrap.appendChild(inner);
    }
    frag.appendChild(wrap);
    frag.appendChild(document.createTextNode(" "));
  }
  el.appendChild(frag);
  return el.querySelectorAll("span span");
}

export function Hero() {
  const rootRef = useRef<HTMLElement>(null);
  const canvasRef = useRef<HTMLDivElement>(null);
  const [tagline, setTagline] = useState(0);
  useVantaNet(canvasRef);

  useEffect(() => {
    if (prefersReducedMotion()) return;
    const id = setInterval(() => setTagline((p) => (p + 1) % taglines.length), 3400);
    return () => clearInterval(id);
  }, []);

  useGSAP(
    () => {
      if (prefersReducedMotion()) return;
      const scope = rootRef.current;
      if (!scope) return;

      const headline = scope.querySelector<HTMLElement>("[data-headline]");
      const chars = headline ? splitChars(headline) : [];

      const play = () => {
        const tl = gsap.timeline({ defaults: { ease: "power4.out" } });
        tl.fromTo("[data-hero-kicker]", { opacity: 0, y: 24 }, { opacity: 1, y: 0, duration: 0.7 })
          .fromTo(
            chars,
            { opacity: 0, yPercent: 110, rotateX: -45 },
            {
              opacity: 1,
              yPercent: 0,
              rotateX: 0,
              duration: 0.9,
              stagger: 0.018,
              transformOrigin: "50% 100%",
            },
            "-=0.35",
          )
          .fromTo(
            "[data-hero-sub]",
            { opacity: 0, y: 22 },
            { opacity: 1, y: 0, duration: 0.7 },
            "-=0.55",
          )
          .fromTo(
            "[data-hero-cta] > *",
            { opacity: 0, y: 18 },
            { opacity: 1, y: 0, stagger: 0.08, duration: 0.6 },
            "-=0.45",
          )
          .fromTo(
            "[data-hero-stat]",
            { opacity: 0, y: 16 },
            { opacity: 1, y: 0, stagger: 0.07, duration: 0.5 },
            "-=0.4",
          )
          .fromTo("[data-scroll-cue]", { opacity: 0 }, { opacity: 1, duration: 0.6 }, "-=0.2");

        scope.querySelectorAll<HTMLElement>("[data-count-to]").forEach((el) => {
          const target = Number(el.dataset.countTo);
          const obj = { v: 0 };
          gsap.to(obj, {
            v: target,
            duration: 1.8,
            delay: 1.1,
            ease: "power2.out",
            onUpdate: () => {
              el.textContent = `${Math.round(obj.v)}${el.dataset.suffix ?? ""}`;
            },
          });
        });

        gsap.to("[data-hero-inner]", {
          yPercent: -14,
          opacity: 0.25,
          ease: "none",
          scrollTrigger: { trigger: scope, start: "top top", end: "bottom top", scrub: true },
        });

        gsap.to("[data-vanta-layer]", {
          scale: 1.12,
          ease: "none",
          scrollTrigger: { trigger: scope, start: "top top", end: "bottom top", scrub: true },
        });
      };

      let played = false;
      const start = () => {
        if (played) return;
        played = true;
        play();
      };
      window.addEventListener(ENTERED_EVENT, start, { once: true });
      const t = window.setTimeout(start, 2200);

      return () => {
        window.removeEventListener(ENTERED_EVENT, start);
        window.clearTimeout(t);
      };
    },
    { scope: rootRef },
  );

  useEffect(() => {
    const id = window.setTimeout(() => ScrollTrigger.refresh(), 800);
    return () => window.clearTimeout(id);
  }, []);

  return (
    <section
      ref={rootRef}
      id="top"
      className="relative isolate flex min-h-[100svh] items-center overflow-hidden"
    >
      {/* Vanta WebGL layer */}
      <div ref={canvasRef} data-vanta-layer className="absolute inset-0 z-0" aria-hidden="true" />
      {/* CSS fallback + legibility veils */}
      <div
        className="absolute inset-0 -z-10"
        aria-hidden="true"
        style={{
          background:
            "radial-gradient(120% 90% at 70% 10%, rgb(230 62 122 / 0.18), transparent 60%), radial-gradient(90% 80% at 20% 90%, rgb(255 131 89 / 0.1), transparent 55%), var(--background)",
        }}
      />
      <div
        className="pointer-events-none absolute inset-0 z-[1]"
        aria-hidden="true"
        style={{
          background:
            "linear-gradient(180deg, rgb(10 7 16 / 0.55) 0%, transparent 30%, transparent 55%, var(--background) 96%)",
        }}
      />
      <div
        className="grid-bg pointer-events-none absolute inset-0 z-[1] opacity-60"
        aria-hidden="true"
      />

      <div data-hero-inner className="relative z-10 mx-auto w-full max-w-7xl px-6 pb-24 pt-36">
        <div
          data-hero-kicker
          className="chip !text-flame"
          style={{ borderColor: "rgb(255 131 89 / 35%)", background: "rgb(255 131 89 / 8%)" }}
        >
          <Logo size={15} />
          IISER Bhopal · Est. coding club
        </div>

        <h1
          data-headline
          className="font-display mt-7 max-w-5xl text-[clamp(3rem,9vw,7.75rem)] font-semibold leading-[0.98] tracking-[-0.03em]"
          style={{ perspective: "600px" }}
        >
          We engineer the moment right before the{" "}
          <em className="not-italic text-ramp-y">breakthrough</em>.
        </h1>

        <p
          data-hero-sub
          className="mt-7 max-w-xl text-lg leading-relaxed text-text-secondary md:text-xl"
        >
          Cyberheathens is a student-led collective building open-source tools, competing globally,
          and shipping research-grade systems.
        </p>

        <div data-hero-cta className="mt-10 flex flex-wrap items-center gap-4">
          <Magnetic>
            <a href="#community" className="btn-solid group">
              Join the club
              <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
            </a>
          </Magnetic>
          <Magnetic>
            <a href="#projects" className="btn-ghost">
              <Code2 className="h-4 w-4" /> Explore projects
            </a>
          </Magnetic>
        </div>

        <dl className="mt-16 grid max-w-3xl grid-cols-2 gap-x-10 gap-y-6 border-t border-white/10 pt-8 sm:grid-cols-4">
          {stats.map((s) => (
            <div key={s.label} data-hero-stat>
              <dt className="font-display text-3xl font-semibold tabular-nums md:text-4xl">
                <span data-count-to={s.value} data-suffix={s.suffix}>
                  0{s.suffix}
                </span>
              </dt>
              <dd className="mt-1 font-mono text-[11px] uppercase tracking-[0.2em] text-text-secondary">
                {s.label}
              </dd>
            </div>
          ))}
        </dl>

        <div className="mt-14 flex h-6 items-center font-mono text-xs uppercase tracking-[0.25em] text-text-secondary">
          <span className="mr-4 h-px w-10 bg-ramp-x" />
          <span key={tagline} data-tagline className="animate-[fadein_.6s_ease_both]">
            {taglines[tagline]}
          </span>
        </div>
      </div>

      <div
        data-scroll-cue
        className="pointer-events-none absolute bottom-7 left-1/2 z-10 -translate-x-1/2"
      >
        <div className="flex h-14 w-7 items-start justify-center rounded-full border border-white/15 p-2">
          <div className="h-2.5 w-1 animate-bounce rounded-full bg-ramp-x" />
        </div>
      </div>

      <style>{`@keyframes fadein { from { opacity: 0; transform: translateY(8px); } to { opacity: 1; transform: none; } }`}</style>
    </section>
  );
}
