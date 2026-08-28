"use client";

import { useCallback, useRef, useState } from "react";
import type { FormEvent, KeyboardEvent } from "react";
import { CornerDownLeft, Search, TerminalSquare } from "lucide-react";
import { VintageKeyboard, playKeyboardSound } from "@/components/ui/vintage-keyboard";
import { gsap, useGSAP, prefersReducedMotion } from "@/lib/gsap";

const COMMANDS: Record<string, string[]> = {
  help: [
    "Available commands: about, projects, team, events, resources, alumni, join, clear",
    "You can also type a topic, such as CUDA, ICPC, React, research, or hackathon.",
  ],
  about: [
    "Cyberheathens is IISER Bhopal's student-led coding club, spanning competitive programming, open source, AI/ML, web, systems, and research engineering.",
  ],
  projects: [
    "neuro-lab · distributed ML training",
    "cp-arsenal · competitive programming toolkit",
    "campus-os · tools for student life",
    "paper-radar · research discovery",
    "hack-bhopal · hackathon infrastructure",
    "edge-orbit · Rust and WASM experiments",
  ],
  team: [
    "The club is organized across competitive programming, AI/ML, web, open source, systems, and design tracks. Jump to #team for the current roster.",
  ],
  events: [
    "Hack The Hills · campus hackathon",
    "ICPC Regional Bootcamp · contest preparation",
    "Open Source Sprint · ship your first contribution",
    "AI Reading Group · papers, replications, and critique",
  ],
  resources: [
    "Learning paths: CP, Web Development, AI/ML, Systems, and Research. Each path moves from foundations to advanced practice.",
  ],
  alumni: [
    "Verified alumni stories will appear below once names, roles, portraits, and quotations are approved by the club.",
  ],
  join: [
    "Start with an event or study group, then visit the community section for Discord and GitHub links.",
  ],
};

const SEARCH_INDEX = Object.entries(COMMANDS).flatMap(([group, lines]) =>
  lines.map((text) => ({ group, text })),
);

type LogEntry = { command: string; lines: string[] };

const KEY_TO_CODE: Record<string, string> = {
  " ": "Space",
  Enter: "Enter",
  Backspace: "Backspace",
  Tab: "Tab",
  Escape: "Escape",
};

export function TerminalExplorer() {
  const [input, setInput] = useState("");
  const [logs, setLogs] = useState<LogEntry[]>([
    {
      command: "welcome",
      lines: ["Type help to see commands, or search for anything the club works on."],
    },
  ]);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [activeKey, setActiveKey] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const sectionRef = useRef<HTMLElement>(null);

  const execute = useCallback((raw: string) => {
    const command = raw.trim().toLowerCase();
    if (!command) return;
    if (command === "clear") {
      setLogs([]);
      setInput("");
      return;
    }

    const direct = COMMANDS[command];
    const matches = SEARCH_INDEX.filter(({ group, text }) =>
      `${group} ${text}`.toLowerCase().includes(command),
    ).slice(0, 5);
    const lines =
      direct ??
      (matches.length
        ? matches.map(({ group, text }) => `${group.padEnd(10, " ")} ${text}`)
        : [`No club entry matched “${raw.trim()}”. Try help, projects, AI, ICPC, or research.`]);

    setLogs((current) => [...current.slice(-4), { command: raw.trim(), lines }]);
    setInput("");
  }, []);

  const submit = (event: FormEvent) => {
    event.preventDefault();
    execute(input);
  };

  const handleVirtualKey = (value: string) => {
    inputRef.current?.focus();
    if (value === "ENTER") return execute(input);
    if (value === "BACKSPACE") return setInput((current) => current.slice(0, -1));
    if (value === "TAB") return setInput((current) => `${current}  `);
    setInput((current) => `${current}${value}`);
  };

  const handlePhysicalKey = (event: KeyboardEvent<HTMLInputElement>) => {
    const code = event.code || KEY_TO_CODE[event.key];
    if (!code) return;
    setActiveKey(code);
    playKeyboardSound(code, soundEnabled);
    window.setTimeout(() => setActiveKey((current) => (current === code ? null : current)), 70);
  };

  useGSAP(
    () => {
      if (prefersReducedMotion()) return;
      gsap.fromTo(
        "[data-terminal-head] > *",
        { opacity: 0, y: 36 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.09,
          ease: "power4.out",
          scrollTrigger: { trigger: sectionRef.current, start: "top 78%" },
        },
      );
      gsap.fromTo(
        "[data-terminal-panel]",
        { opacity: 0, y: 64, scale: 0.97 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 1,
          ease: "power4.out",
          scrollTrigger: { trigger: "[data-terminal-panel]", start: "top 82%" },
        },
      );
    },
    { scope: sectionRef },
  );

  return (
    <section
      ref={sectionRef}
      id="terminal"
      className="relative overflow-hidden border-y border-white/5 bg-bg-elevated/40 py-28 md:py-36"
    >
      <div className="pointer-events-none absolute inset-0 grid-bg opacity-35" />
      <div className="pointer-events-none absolute left-1/2 top-0 h-80 w-[60rem] -translate-x-1/2 bg-[radial-gradient(ellipse_at_top,rgba(243,88,108,.14),transparent_68%)]" />
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6">
        <div data-terminal-head>
          <p className="chip">Try the club terminal</p>
          <h2 className="font-display mt-6 max-w-3xl text-[clamp(2.25rem,5vw,4rem)] font-semibold leading-[1.02] tracking-[-0.02em]">
            Explore by <span className="text-ramp-y">typing.</span>
          </h2>
          <p className="mt-5 max-w-xl text-lg text-text-secondary">
            Use your keyboard or tap the walnut keycaps. Search projects, events, tracks, and people
            while getting familiar with a terminal prompt.
          </p>
        </div>

        <div data-terminal-panel className="mt-12">
          <div className="overflow-hidden rounded-xl border border-white/10 bg-[#0b0712] shadow-[0_8px_8px_rgba(0,0,0,.26)]">
            <div className="flex items-center gap-2 border-b border-white/10 bg-white/[0.035] px-4 py-3">
              <span className="h-2.5 w-2.5 rounded-full bg-[#ff685f]" />
              <span className="h-2.5 w-2.5 rounded-full bg-[#f5bd4f]" />
              <span className="h-2.5 w-2.5 rounded-full bg-[#61c454]" />
              <TerminalSquare className="ml-2 h-3.5 w-3.5 text-text-secondary" />
              <span className="font-mono text-[11px] text-text-secondary">
                visitor@cyberheathens:~
              </span>
            </div>

            <div
              className="min-h-64 p-4 font-mono text-xs leading-6 sm:p-6 sm:text-sm"
              aria-live="polite"
            >
              {logs.map((entry, index) => (
                <div key={`${entry.command}-${index}`} className="mb-4">
                  <p>
                    <span className="text-flame">visitor@club</span>
                    <span className="text-text-secondary">:</span>
                    <span className="text-magenta">~</span>
                    <span className="text-text-secondary">$</span> {entry.command}
                  </p>
                  {entry.lines.map((line) => (
                    <p key={line} className="whitespace-pre-wrap text-text-secondary">
                      {line}
                    </p>
                  ))}
                </div>
              ))}
              <form onSubmit={submit} className="flex items-center gap-2">
                <span className="shrink-0 text-flame">visitor@club</span>
                <span className="text-text-secondary">:</span>
                <span className="text-magenta">~</span>
                <span className="text-text-secondary">$</span>
                <input
                  ref={inputRef}
                  value={input}
                  onChange={(event) => setInput(event.target.value)}
                  onKeyDown={handlePhysicalKey}
                  onKeyUp={() => setActiveKey(null)}
                  aria-label="Club terminal command"
                  autoComplete="off"
                  spellCheck={false}
                  className="min-w-0 flex-1 bg-transparent text-foreground caret-[var(--coral)] outline-none"
                />
                <button
                  type="submit"
                  aria-label="Run command"
                  className="grid h-8 w-8 shrink-0 place-items-center rounded-md text-text-secondary transition hover:bg-white/5 hover:text-coral focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-coral/60"
                >
                  <CornerDownLeft className="h-4 w-4" />
                </button>
              </form>
            </div>
          </div>

          <div className="mt-6 flex items-center gap-2 px-1 text-xs text-text-secondary sm:hidden">
            <Search className="h-3.5 w-3.5" /> Swipe sideways to reach every key.
          </div>
          <VintageKeyboard
            className="mt-3"
            activeKey={activeKey}
            onKey={handleVirtualKey}
            soundEnabled={soundEnabled}
            onSoundEnabledChange={setSoundEnabled}
          />
        </div>
      </div>
    </section>
  );
}
