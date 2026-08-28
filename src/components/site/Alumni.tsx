import { useEffect, useRef, useState } from "react";
import { ArrowUpRight } from "lucide-react";
import { gsap, useGSAP, prefersReducedMotion } from "@/lib/gsap";

interface AlumniTestimonial {
  name: string;
  graduation: string;
  role: string;
  quote: string;
}

const PLACEHOLDERS: AlumniTestimonial[] = [
  {
    name: "Alumni voice · reserved",
    graduation: "Verification pending",
    role: "Archive slot 01",
    quote:
      "This space is reserved for a verified Cyberheathens alumnus. Their approved words, current role, and graduation year will appear here.",
  },
  {
    name: "Alumni voice · reserved",
    graduation: "Verification pending",
    role: "Archive slot 02",
    quote:
      "The layout is ready. The club replaces this note with a real memory about projects, mentorship, contests, or community.",
  },
  {
    name: "Alumni voice · reserved",
    graduation: "Verification pending",
    role: "Archive slot 03",
    quote:
      "No endorsement is invented. A card publishes only after the alumnus approves their quotation and attribution.",
  },
];

export function Alumni({ testimonials = PLACEHOLDERS }: { testimonials?: AlumniTestimonial[] }) {
  const [index, setIndex] = useState(0);
  const rootRef = useRef<HTMLElement>(null);
  const quoteRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (prefersReducedMotion()) return;
    const id = setInterval(() => setIndex((p) => (p + 1) % testimonials.length), 6500);
    return () => clearInterval(id);
  }, [testimonials.length]);

  useEffect(() => {
    if (prefersReducedMotion() || !quoteRef.current) return;
    gsap.fromTo(
      quoteRef.current,
      { opacity: 0, y: 26, filter: "blur(8px)" },
      { opacity: 1, y: 0, filter: "blur(0px)", duration: 0.7, ease: "power3.out" },
    );
  }, [index]);

  useGSAP(
    () => {
      if (prefersReducedMotion()) return;
      gsap.fromTo(
        "[data-alumni-head]",
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 0.9,
          ease: "power4.out",
          scrollTrigger: { trigger: rootRef.current, start: "top 80%" },
        },
      );
    },
    { scope: rootRef },
  );

  const active = testimonials[index];

  return (
    <section ref={rootRef} id="alumni" className="relative overflow-hidden py-28 md:py-36">
      <div className="pointer-events-none absolute left-1/2 top-0 h-px w-2/3 -translate-x-1/2 bg-gradient-to-r from-transparent via-magenta/50 to-transparent" />
      <div
        className="pointer-events-none absolute -right-40 top-24 h-96 w-96 rounded-full opacity-25 blur-[120px]"
        style={{ background: "var(--ramp-x)" }}
        aria-hidden="true"
      />

      <div className="mx-auto max-w-5xl px-6">
        <div data-alumni-head>
          <p className="chip">Alumni archive</p>
          <h2 className="font-display mt-6 max-w-2xl text-[clamp(2.25rem,5vw,4rem)] font-semibold leading-[1.02] tracking-[-0.02em]">
            The people who kept <span className="text-ramp-y">building.</span>
          </h2>
        </div>

        <div ref={quoteRef} className="mt-14">
          <span
            aria-hidden="true"
            className="font-display block text-8xl leading-[0.5] text-coral/30"
          >
            &ldquo;
          </span>
          <blockquote className="font-display mt-6 max-w-4xl text-2xl font-medium leading-snug tracking-tight md:text-4xl">
            {active.quote}
          </blockquote>
          <figcaption className="mt-8 flex flex-wrap items-center gap-x-4 gap-y-2">
            <span className="h-px w-10 bg-ramp-x" />
            <span className="font-semibold">{active.name}</span>
            <span className="font-mono text-xs text-text-secondary">
              {active.graduation} · {active.role}
            </span>
            <a
              href="#community"
              className="link-line ml-auto inline-flex items-center gap-1 text-sm text-text-secondary hover:text-foreground"
            >
              Share your story <ArrowUpRight className="h-3.5 w-3.5" />
            </a>
          </figcaption>

          <div className="mt-10 flex gap-2" role="tablist" aria-label="Alumni entries">
            {testimonials.map((_, i) => (
              <button
                key={i}
                role="tab"
                aria-selected={i === index}
                aria-label={`Entry ${i + 1}`}
                onClick={() => setIndex(i)}
                className={`h-1 rounded-full transition-all duration-500 ${
                  i === index ? "w-12 bg-ramp-x" : "w-6 bg-white/15 hover:bg-white/30"
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
