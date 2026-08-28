declare module "vanta/dist/vanta.net.min" {
  interface VantaEffect {
    destroy: () => void;
    pause?: () => void;
    resume?: () => void;
  }
  const VantaNet: (options: Record<string, unknown>) => VantaEffect;
  export default VantaNet;
}
