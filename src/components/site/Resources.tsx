import { useEffect, useRef, useState } from "react";
import { Clock, ExternalLink, Layers, Youtube } from "lucide-react";
import { gsap, prefersReducedMotion } from "@/lib/gsap";

export type Track = "CP" | "Web Dev" | "AI/ML" | "Systems" | "Research";

export interface ResourceItem {
  name: string;
  url?: string;
}

export interface ResourceCard {
  title: string;
  level: string;
  time: string;
  playlistUrl?: string;
  items: (string | ResourceItem)[];
}

const data: Record<Track, ResourceCard[]> = {
  CP: [
    {
      title: "Foundations",
      level: "Beginner",
      time: "4 weeks",
      playlistUrl:
        "https://youtube.com/playlist?list=PLauivoElc3ggagradg8MfOZreCMmXMmJ-&si=pgTtu3FbnfJ0hA3q",
      items: [
        { name: "STL & ad-hoc", url: "" },
        { name: "Two pointers", url: "" },
        { name: "Binary search", url: "" },
        { name: "Greedy patterns", url: "" },
      ],
    },
    {
      title: "Algorithms II",
      level: "Intermediate",
      time: "6 weeks",
      playlistUrl: "",
      items: [
        { name: "DP on trees", url: "" },
        { name: "Segment trees", url: "" },
        { name: "Graph theory", url: "" },
        { name: "Number theory", url: "" },
      ],
    },
    {
      title: "ICPC Prep",
      level: "Advanced",
      time: "8 weeks",
      playlistUrl:
        "https://www.youtube.com/watch?v=-uTbPFSFogo&list=PLqf9emQRQrnJ-S8PTYTQegcIWTJXAcdV4&index=1&t=9s",
      items: [
        { name: "Heavy-light", url: "" },
        { name: "Flows", url: "" },
        { name: "FFT", url: "" },
        { name: "Geometry", url: "" },
      ],
    },
  ],
  "Web Dev": [
    {
      title: "Modern React",
      level: "Beginner",
      time: "3 weeks",
      playlistUrl: "",
      items: [
        { name: "TS fundamentals", url: "" },
        { name: "Routing & data", url: "" },
        { name: "Forms & validation", url: "" },
        { name: "Testing", url: "" },
      ],
    },
    {
      title: "Full Stack",
      level: "Intermediate",
      time: "5 weeks",
      playlistUrl: "",
      items: [
        { name: "Edge runtimes", url: "" },
        { name: "Postgres + RLS", url: "" },
        { name: "Auth flows", url: "" },
        { name: "Realtime", url: "" },
      ],
    },
    {
      title: "Design Systems",
      level: "Advanced",
      time: "4 weeks",
      playlistUrl: "",
      items: [
        { name: "Tokens", url: "" },
        { name: "Primitives", url: "" },
        { name: "Motion craft", url: "" },
        { name: "Theming", url: "" },
      ],
    },
  ],
  "AI/ML": [
    {
      title: "Math + ML",
      level: "Beginner",
      time: "5 weeks",
      playlistUrl: "https://youtube.com/playlist?list=PLKnIA16_Rmvbr7zKYQuBfsVkjoLcJgxHH&si=t1c_Ipr7170hIusl",
      items: [
        { name: "Linear algebra", url: "" },
        {
          name: "Probability",
          url: "https://youtube.com/playlist?list=PLKnIA16_RmvbYFaaeLY28cWeqV-3vADST&si=PpHTydBNkwbaFyd1",
        },
        { name: "scikit-learn", url: "" },
        { name: "Project: spam filter", url: "" },
      ],
    },
    {
      title: "Deep Learning",
      level: "Intermediate",
      time: "6 weeks",
      playlistUrl:
        "https://youtube.com/playlist?list=PLKnIA16_RmvYuZauWaPlRTC54KxSNLtNn&si=vNy7WxB9djaMCf7O",
      items: [
        { name: "PyTorch", url: "" },
        { name: "CNNs / RNNs", url: "" },
        { name: "Transformers", url: "" },
        { name: "Fine-tuning", url: "" },
      ],
    },
    {
      title: "Frontier",
      level: "Advanced",
      time: "Ongoing",
      playlistUrl: "",
      items: [
        { name: "Diffusion", url: "" },
        { name: "RLHF", url: "" },
        { name: "Distributed training", url: "" },
        { name: "Eval harnesses", url: "" },
      ],
    },
  ],
  Systems: [
    {
      title: "Systems I",
      level: "Beginner",
      time: "4 weeks",
      playlistUrl: "",
      items: [
        { name: "C / pointers", url: "" },
        { name: "Linux internals", url: "" },
        { name: "Networking", url: "" },
        { name: "Bash + Make", url: "" },
      ],
    },
    {
      title: "Performance",
      level: "Intermediate",
      time: "5 weeks",
      playlistUrl: "",
      items: [
        { name: "Profiling", url: "" },
        { name: "Caches", url: "" },
        { name: "Concurrency", url: "" },
        { name: "Lock-free", url: "" },
      ],
    },
    {
      title: "Distributed",
      level: "Advanced",
      time: "6 weeks",
      playlistUrl: "",
      items: [
        { name: "Raft / Paxos", url: "" },
        { name: "Sharding", url: "" },
        { name: "Stream processing", url: "" },
        { name: "Storage engines", url: "" },
      ],
    },
  ],
  Research: [
    {
      title: "Reading Papers",
      level: "Beginner",
      time: "Ongoing",
      playlistUrl: "",
      items: [
        { name: "arXiv hygiene", url: "" },
        { name: "Notes pipeline", url: "" },
        { name: "Replication", url: "" },
        { name: "Critique", url: "" },
      ],
    },
    {
      title: "Writing & Reproducing",
      level: "Intermediate",
      time: "6 weeks",
      playlistUrl: "",
      items: [
        { name: "LaTeX", url: "" },
        { name: "Experiments", url: "" },
        { name: "Ablations", url: "" },
        { name: "Open peer review", url: "" },
      ],
    },
    {
      title: "Publishing",
      level: "Advanced",
      time: "Ongoing",
      playlistUrl: "",
      items: [
        { name: "Workshops", url: "" },
        { name: "Camera-ready", url: "" },
        { name: "Posters", url: "" },
        { name: "Talks", url: "" },
      ],
    },
  ],
};

const tracks: Track[] = ["CP", "Web Dev", "AI/ML", "Systems", "Research"];

const levelClass: Record<string, string> = {
  Beginner: "text-text-secondary",
  Intermediate: "text-flame",
  Advanced: "text-magenta",
};

export function Resources() {
  const [active, setActive] = useState<Track>("CP");
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (prefersReducedMotion() || !gridRef.current) return;
    gsap.fromTo(
      gridRef.current.children,
      { opacity: 0, y: 26 },
      { opacity: 1, y: 0, duration: 0.55, stagger: 0.07, ease: "power4.out" },
    );
  }, [active]);

  return (
    <section
      id="resources"
      className="relative border-y border-white/5 bg-bg-elevated/30 py-28 md:py-36"
    >
      <div className="mx-auto max-w-6xl px-6">
        <p className="chip">Roadmaps</p>
        <h2 className="font-display mt-6 max-w-3xl text-[clamp(2.25rem,5vw,4rem)] font-semibold leading-[1.02] tracking-[-0.02em]">
          Curious <span className="text-ramp-y">→ competent.</span>
        </h2>
        <p className="mt-5 max-w-xl text-lg text-text-secondary">
          Curated learning paths maintained by the club. Pick a track.
        </p>

        <div className="mt-10 flex flex-wrap gap-2" role="tablist" aria-label="Learning tracks">
          {tracks.map((t) => (
            <button
              key={t}
              role="tab"
              aria-selected={active === t}
              onClick={() => setActive(t)}
              className={`rounded-full px-5 py-2.5 font-mono text-xs uppercase tracking-[0.12em] transition-all duration-300 ${active === t
                  ? "bg-ramp-x text-[#14060e] shadow-[var(--glow-ramp)]"
                  : "border border-white/15 text-text-secondary hover:border-flame/50 hover:text-foreground"
                }`}
            >
              {t}
            </button>
          ))}
        </div>

        <div ref={gridRef} className="mt-10 grid grid-cols-1 gap-4 md:grid-cols-2">
          {data[active].map((card, i) => (
            <div
              key={`${active}-${card.title}`}
              className={`panel group rounded-2xl p-6 ${i === 2 ? "md:col-span-2" : ""}`}
            >
              <div className="flex items-center justify-between">
                <h3 className="font-display text-xl font-semibold tracking-tight">{card.title}</h3>
                <div className="flex items-center gap-2.5">
                  {card.playlistUrl && (
                    <a
                      href={card.playlistUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 rounded-full border border-red-500/30 bg-red-500/10 px-2.5 py-0.5 font-mono text-[11px] text-red-400 transition-colors hover:border-red-500/60 hover:bg-red-500/20"
                    >
                      <Youtube className="h-3 w-3" />
                      <span>Playlist</span>
                    </a>
                  )}
                  <span
                    className={`font-mono text-[10px] uppercase tracking-[0.18em] ${levelClass[card.level]}`}
                  >
                    {card.level}
                  </span>
                </div>
              </div>
              <div className="mt-2 flex items-center gap-4 font-mono text-xs text-text-secondary">
                <span className="inline-flex items-center gap-1.5">
                  <Clock className="h-3 w-3" /> {card.time}
                </span>
                <span className="inline-flex items-center gap-1.5">
                  <Layers className="h-3 w-3" /> {card.items.length} modules
                </span>
              </div>
              <ul className="mt-4 space-y-1.5">
                {card.items.map((it, idx) => {
                  const item = typeof it === "string" ? { name: it, url: "" } : it;
                  const hasLink = Boolean(item.url && item.url.trim() !== "");

                  return (
                    <li
                      key={`${item.name}-${idx}`}
                      className="text-sm text-text-secondary transition-colors"
                    >
                      {hasLink ? (
                        <a
                          href={item.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="group/link -mx-2 flex items-center justify-between rounded-lg px-2 py-1.5 transition-colors hover:bg-white/5 hover:text-foreground"
                        >
                          <div className="flex min-w-0 items-center gap-2.5">
                            <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-ramp-x transition-transform group-hover/link:scale-125" />
                            <span className="truncate group-hover/link:text-foreground">
                              {item.name}
                            </span>
                          </div>
                          <span className="ml-2 inline-flex shrink-0 items-center gap-1.5 font-mono text-[11px] text-text-secondary/70 transition-colors group-hover/link:text-red-400">
                            <Youtube className="h-3.5 w-3.5 text-red-500/90" />
                            <span>Watch</span>
                            <ExternalLink className="h-3 w-3 opacity-60" />
                          </span>
                        </a>
                      ) : (
                        <div className="-mx-2 flex items-center gap-2.5 px-2 py-1.5">
                          <span className="mt-[1px] h-1 w-3 shrink-0 rounded-full bg-ramp-x opacity-70" />
                          <span className="group-hover:text-foreground/80">{item.name}</span>
                        </div>
                      )}
                    </li>
                  );
                })}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
