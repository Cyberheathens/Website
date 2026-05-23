import { useEffect, useState } from "react";

export function CursorGlow() {
  const [p, setP] = useState({ x: -200, y: -200 });
  useEffect(() => {
    const onMove = (e: MouseEvent) => setP({ x: e.clientX, y: e.clientY });
    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, []);
  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-0 z-50 hidden md:block"
      style={{
        background: `radial-gradient(400px circle at ${p.x}px ${p.y}px, color-mix(in oklab, var(--neon-cyan) 10%, transparent), transparent 60%)`,
        transition: "background 0.08s linear",
      }}
    />
  );
}