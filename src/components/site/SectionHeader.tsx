export function SectionHeader({
  eyebrow,
  title,
  desc,
}: {
  eyebrow: string;
  title: React.ReactNode;
  desc?: string;
}) {
  return (
    <div className="mx-auto max-w-2xl text-center">
      <p className="font-mono text-xs uppercase tracking-[0.2em] text-neon-cyan">
        // {eyebrow}
      </p>
      <h2 className="font-display mt-3 text-4xl font-semibold tracking-tight md:text-5xl">
        {title}
      </h2>
      {desc && <p className="mt-4 text-text-secondary">{desc}</p>}
    </div>
  );
}