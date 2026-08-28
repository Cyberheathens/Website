export function Logo({ size = 36, className }: { size?: number; className?: string }) {
  const src = size <= 40 ? "/logo/logo-mark-72.webp" : "/logo/logo-mark-144.webp";
  return (
    <img
      src={src}
      alt=""
      aria-hidden="true"
      width={size}
      height={size}
      decoding="async"
      className={className}
      style={{ display: "inline-block" }}
    />
  );
}
