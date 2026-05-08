import { Droplets, Shield, Sparkles, Lock, Zap, Backpack } from "lucide-react";
import { useScrollReveal } from "@/hooks/useScrollReveal";

const features = [
  { icon: Droplets, title: "RO + UV Purified", desc: "Multi-stage purification for absolute clarity." },
  { icon: Shield, title: "Food-Grade Bottle", desc: "Premium hard-plastic, BPA-safe, built to last." },
  { icon: Sparkles, title: "Affordable Luxury", desc: "Five-star feel at an everyday price." },
  { icon: Lock, title: "Fresh Sealed", desc: "Tamper-proof gold cap on every bottle." },
  { icon: Zap, title: "Made for Indian Youth", desc: "Designed for the lives we actually live." },
  { icon: Backpack, title: "Gym · Travel · College", desc: "Hydration that goes wherever you go." },
];

export const WhyElevateSection = () => {
  const { ref, isVisible } = useScrollReveal<HTMLDivElement>(0.1);

  return (
    <section className="relative py-16 sm:py-24 px-4 sm:px-6">
      <div ref={ref} className="container mx-auto max-w-6xl">
        <div className={`text-center mb-10 sm:mb-14 transition-all duration-700 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
          <p className="text-primary font-body text-xs sm:text-sm tracking-[0.3em] uppercase mb-3">Why Elevate</p>
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold text-gradient-gold">
            Built different. By design.
          </h2>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-3 sm:gap-5">
          {features.map((f, i) => (
            <div
              key={f.title}
              className={`group relative bg-card/60 backdrop-blur-sm border border-border rounded-xl p-4 sm:p-6 hover:border-primary/40 hover:-translate-y-1 transition-all duration-500 overflow-hidden ${
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
              }`}
              style={{ transitionDelay: isVisible ? `${i * 80}ms` : "0ms" }}
            >
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_0%,hsl(var(--primary)/0.12),transparent_60%)] opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="relative z-10">
                <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-lg bg-primary/10 border border-primary/20 flex items-center justify-center mb-3 group-hover:bg-primary/20 transition-colors">
                  <f.icon className="w-5 h-5 sm:w-6 sm:h-6 text-primary" />
                </div>
                <h3 className="font-display text-base sm:text-lg text-foreground mb-1">{f.title}</h3>
                <p className="text-muted-foreground font-body text-xs sm:text-sm leading-relaxed">{f.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
