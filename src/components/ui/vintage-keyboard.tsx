"use client";

import { memo, useCallback, useMemo, useRef, useState } from "react";
import type { CSSProperties, PointerEvent as ReactPointerEvent } from "react";
import { Volume2, VolumeX } from "lucide-react";

interface KeyConfig {
  id: string;
  label: string;
  value?: string;
  shiftLabel?: string;
  width?: number;
  small?: boolean;
}

export interface VintageKeyboardProps {
  activeKey?: string | null;
  onKey?: (value: string, id: string) => void;
  soundEnabled?: boolean;
  onSoundEnabledChange?: (enabled: boolean) => void;
  className?: string;
}

const ROWS: KeyConfig[][] = [
  [
    { id: "Escape", label: "Esc", small: true },
    ..."1234567890".split("").map((label, index) => ({
      id: `Digit${label}`,
      label,
      shiftLabel: "!@#$%^&*()"[index],
    })),
    { id: "Minus", label: "-", shiftLabel: "_" },
    { id: "Equal", label: "=", shiftLabel: "+" },
    { id: "Backspace", label: "Backspace", value: "BACKSPACE", width: 2, small: true },
  ],
  [
    { id: "Tab", label: "Tab", value: "TAB", width: 1.5, small: true },
    ..."QWERTYUIOP"
      .split("")
      .map((label) => ({ id: `Key${label}`, label, value: label.toLowerCase() })),
    { id: "BracketLeft", label: "[", shiftLabel: "{" },
    { id: "BracketRight", label: "]", shiftLabel: "}" },
    { id: "Backslash", label: "\\", shiftLabel: "|", width: 1.5 },
  ],
  [
    { id: "CapsLock", label: "Caps", width: 1.75, small: true },
    ..."ASDFGHJKL"
      .split("")
      .map((label) => ({ id: `Key${label}`, label, value: label.toLowerCase() })),
    { id: "Semicolon", label: ";", shiftLabel: ":" },
    { id: "Quote", label: "'", shiftLabel: '"' },
    { id: "Enter", label: "Enter", value: "ENTER", width: 2.25, small: true },
  ],
  [
    { id: "ShiftLeft", label: "Shift", width: 2.25, small: true },
    ..."ZXCVBNM"
      .split("")
      .map((label) => ({ id: `Key${label}`, label, value: label.toLowerCase() })),
    { id: "Comma", label: ",", shiftLabel: "<" },
    { id: "Period", label: ".", shiftLabel: ">" },
    { id: "Slash", label: "/", shiftLabel: "?" },
    { id: "ShiftRight", label: "Shift", width: 2.75, small: true },
  ],
  [
    { id: "ControlLeft", label: "Ctrl", width: 1.25, small: true },
    { id: "MetaLeft", label: "Win", width: 1.25, small: true },
    { id: "AltLeft", label: "Alt", width: 1.25, small: true },
    { id: "Space", label: "", value: " ", width: 6.25 },
    { id: "AltRight", label: "Alt", width: 1.25, small: true },
    { id: "MetaRight", label: "Win", width: 1.25, small: true },
    { id: "Function", label: "Fn", width: 1.25, small: true },
  ],
];

let audioContext: AudioContext | null = null;

export function playKeyboardSound(id: string, enabled = true) {
  if (!enabled || typeof window === "undefined") return;
  const AudioContextCtor =
    window.AudioContext ||
    (window as typeof window & { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;
  if (!AudioContextCtor) return;

  audioContext ??= new AudioContextCtor();
  const ctx = audioContext;
  if (ctx.state === "suspended") void ctx.resume();

  const now = ctx.currentTime;
  const duration = id === "Space" ? 0.09 : 0.055;
  const buffer = ctx.createBuffer(1, Math.ceil(ctx.sampleRate * duration), ctx.sampleRate);
  const data = buffer.getChannelData(0);
  for (let i = 0; i < data.length; i++) {
    const decay = Math.pow(1 - i / data.length, id === "Space" ? 2.2 : 3.8);
    data[i] = (Math.random() * 2 - 1) * decay;
  }

  const source = ctx.createBufferSource();
  source.buffer = buffer;
  const filter = ctx.createBiquadFilter();
  filter.type = "bandpass";
  filter.frequency.value =
    id === "Space" ? 540 : id.includes("Shift") || id === "Enter" ? 820 : 1150;
  filter.Q.value = 0.9;
  const gain = ctx.createGain();
  gain.gain.setValueAtTime(id === "Space" ? 0.24 : 0.16, now);
  gain.gain.exponentialRampToValueAtTime(0.001, now + duration);
  source.connect(filter);
  filter.connect(gain);
  gain.connect(ctx.destination);
  source.start(now);
  source.stop(now + duration);
}

function keyValue(key: KeyConfig) {
  if (key.value !== undefined) return key.value;
  return key.label.length === 1 ? key.label : "";
}

const Key = memo(function Key({
  config,
  pressed,
  soundEnabled,
  onKey,
}: {
  config: KeyConfig;
  pressed: boolean;
  soundEnabled: boolean;
  onKey?: (value: string, id: string) => void;
}) {
  const [pointerPressed, setPointerPressed] = useState(false);
  const releaseTimer = useRef<number | null>(null);
  const isPressed = pressed || pointerPressed;
  const variance = useMemo(() => {
    let hash = 0;
    for (const character of config.id) hash = (hash * 31 + character.charCodeAt(0)) | 0;
    return ((Math.abs(hash) % 9) - 4) / 18;
  }, [config.id]);

  const release = useCallback(() => {
    if (releaseTimer.current) window.clearTimeout(releaseTimer.current);
    releaseTimer.current = window.setTimeout(() => setPointerPressed(false), 55);
  }, []);

  const press = (event: ReactPointerEvent<HTMLButtonElement>) => {
    event.currentTarget.setPointerCapture(event.pointerId);
    setPointerPressed(true);
    playKeyboardSound(config.id, soundEnabled);
    const value = keyValue(config);
    if (value) onKey?.(value, config.id);
  };

  return (
    <button
      type="button"
      aria-label={config.label || "Space"}
      onPointerDown={press}
      onPointerUp={release}
      onPointerCancel={release}
      onPointerLeave={release}
      className={`relative h-11 min-w-0 select-none outline-none transition-[transform,filter] duration-180 [touch-action:none] [transform:translateY(0)_rotate(var(--key-tilt))] hover:brightness-[1.035] focus-visible:ring-2 focus-visible:ring-[var(--hero-accent)] md:h-13 ${isPressed ? "translate-y-1 scale-[.985]" : ""}`}
      data-pressed={isPressed}
      style={
        {
          flexGrow: config.width ?? 1,
          flexBasis: 0,
          "--key-tilt": `${variance}deg`,
        } as CSSProperties
      }
    >
      <span className="absolute inset-0 rounded-[7px] bg-[#8d7359] shadow-[inset_0_-2px_2px_rgba(30,18,8,.32),0_4px_5px_rgba(0,0,0,.3)]" />
      <span className="absolute inset-x-[3px] top-[3px] bottom-[7px] rounded-[5px] border border-[#967c62]/45 bg-[radial-gradient(circle_at_28%_12%,#f5eadb,#d9c9b6_52%,#b8a38b)] shadow-[inset_0_1px_rgba(255,255,255,.55),inset_0_-1px_1px_rgba(55,34,17,.15)]" />
      <span className="pointer-events-none absolute inset-x-[5px] top-[5px] bottom-[9px] rounded-[4px] bg-[url('data:image/svg+xml,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 width=%2280%22 height=%2280%22%3E%3Cfilter id=%22n%22%3E%3CfeTurbulence baseFrequency=%22.8%22 numOctaves=%222%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23n)%22 opacity=%22.055%22/%3E%3C/svg%3E')] mix-blend-multiply" />
      {config.shiftLabel && (
        <span className="absolute left-[22%] top-[17%] text-[8px] font-medium leading-none text-[#776f65] md:text-[9px]">
          {config.shiftLabel}
        </span>
      )}
      <span
        className={`absolute bottom-[21%] leading-none text-[#3f3a34] ${config.small ? "left-[14%] text-[8px] font-semibold md:text-[10px]" : "left-1/2 -translate-x-1/2 text-[11px] font-bold md:text-sm"}`}
      >
        {config.label}
      </span>
    </button>
  );
});

export function VintageKeyboard({
  activeKey,
  onKey,
  soundEnabled = true,
  onSoundEnabledChange,
  className = "",
}: VintageKeyboardProps) {
  return (
    <div className={className}>
      <div className="mb-3 flex items-center justify-between gap-4 px-1">
        <p className="font-mono text-[11px] text-[#a9967f]">walnut / tactile switch / 75 dB</p>
        <button
          type="button"
          aria-pressed={soundEnabled}
          onClick={() => onSoundEnabledChange?.(!soundEnabled)}
          className="inline-flex items-center gap-2 rounded-full border border-[#b8976c]/25 bg-[#20170f]/70 px-3 py-1.5 font-mono text-[11px] text-[#d6c2a7] transition hover:border-[#d1a86e]/50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--hero-accent)]"
        >
          {soundEnabled ? <Volume2 className="h-3.5 w-3.5" /> : <VolumeX className="h-3.5 w-3.5" />}
          Sound {soundEnabled ? "on" : "off"}
        </button>
      </div>
      <div className="overflow-x-auto pb-2 [scrollbar-color:#76502c_transparent]">
        <div className="min-w-[650px] rounded-xl border border-[#cb9b62]/20 bg-[#754323] p-3 shadow-[inset_0_1px_rgba(255,235,204,.35),inset_0_-3px_4px_rgba(27,13,5,.58),0_8px_8px_rgba(0,0,0,.28)] md:p-4">
          <div className="rounded-lg bg-[#0c0a08] p-1.5 shadow-[inset_0_3px_9px_rgba(0,0,0,.8)]">
            <div className="flex flex-col gap-[3px]">
              {ROWS.map((row, rowIndex) => (
                <div key={rowIndex} className="flex gap-[3px]">
                  {row.map((key) => (
                    <Key
                      key={key.id}
                      config={key}
                      pressed={activeKey === key.id}
                      soundEnabled={soundEnabled}
                      onKey={onKey}
                    />
                  ))}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export const Component = VintageKeyboard;
