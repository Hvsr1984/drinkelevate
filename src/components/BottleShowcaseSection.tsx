import { lazy, Suspense } from "react";
import { useScrollReveal } from "@/hooks/useScrollReveal";

const BottleShowcase3D = lazy(() =>
  import("./BottleShowcase3D").then((m) => ({ default: m.BottleShowcase3D }))
);

export const BottleShowcaseSection = () => {
  const { ref, isVisible } = useScrollReveal<HTMLDivElement>(0.15);

  return (
    <section className="relative py-20 sm:py-28 px-4 sm:px-6 overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,hsl(var(--primary)/0.08),transparent_60%)] pointer-events-none" />
      <div ref={ref} className="container mx-auto max-w-6xl relative z-10">
        <div
          className={`grid grid-cols-1 lg:grid-cols-2 gap-10 items-center transition-all duration-700 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <div className="order-2 lg:order-1">
            <p className="text-primary font-body text-xs sm:text-sm tracking-[0.3em] uppercase mb-3">
              Crafted in 3D
            </p>
            <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold text-gradient-gold mb-5">
              Hold it in your hand.
            </h2>
            <p className="text-muted-foreground font-body text-sm sm:text-base leading-relaxed mb-6 max-w-md">
              Inspect every curve. Premium hard-plastic body, gold cap, crystal-clear hydration —
              rotate freely to feel the build before you order.
            </p>
            <ul className="space-y-2 text-sm font-body text-foreground/80">
              <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-primary" /> Food-grade premium plastic</li>
              <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-primary" /> Sealed gold cap finish</li>
              <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-primary" /> Studio-realistic reflections</li>
            </ul>
          </div>
          <div className="order-1 lg:order-2">
            <Suspense fallback={<div className="h-[460px] sm:h-[560px] flex items-center justify-center text-muted-foreground font-body text-sm">Loading 3D…</div>}>
              <BottleShowcase3D />
            </Suspense>
          </div>
        </div>
      </div>
    </section>
  );
};
