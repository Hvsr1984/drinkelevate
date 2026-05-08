import { ShieldCheck, Award, Sparkles, FlaskConical } from "lucide-react";
import { useScrollReveal } from "@/hooks/useScrollReveal";

const indicators = [
  { icon: FlaskConical, title: "Quality Tested", desc: "Lab-verified every batch." },
  { icon: ShieldCheck, title: "Safe Drinking Water", desc: "Meets BIS purity standards." },
  { icon: Sparkles, title: "Hygienic Packaging", desc: "Sealed in sterile environments." },
  { icon: Award, title: "Certified Purification", desc: "Multi-stage RO + UV process." },
];

export const TrustSection = () => {
  const { ref, isVisible } = useScrollReveal<HTMLDivElement>(0.1);

  return (
    <section className="relative py-16 sm:py-24 px-4 sm:px-6 bg-card/30">
      <div ref={ref} className="container mx-auto max-w-6xl">
        <div className={`text-center mb-10 sm:mb-14 transition-all duration-700 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
          <p className="text-primary font-body text-xs sm:text-sm tracking-[0.3em] uppercase mb-3">Trust & Quality</p>
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold text-gradient-gold">
            Standards that don't bend.
          </h2>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-5">
          {indicators.map((it, i) => (
            <div
              key={it.title}
              className={`text-center bg-background/40 backdrop-blur-sm border border-border rounded-xl p-5 sm:p-7 hover:border-primary/40 transition-all duration-500 ${
                isVisible ? "opacity-100 scale-100" : "opacity-0 scale-95"
              }`}
              style={{ transitionDelay: isVisible ? `${i * 100}ms` : "0ms" }}
            >
              <div className="w-12 h-12 sm:w-14 sm:h-14 mx-auto rounded-full bg-primary/10 border border-primary/30 flex items-center justify-center mb-3">
                <it.icon className="w-5 h-5 sm:w-6 sm:h-6 text-primary" />
              </div>
              <h3 className="font-display text-sm sm:text-base text-foreground mb-1">{it.title}</h3>
              <p className="text-muted-foreground font-body text-xs leading-relaxed">{it.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
