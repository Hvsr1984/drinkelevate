import { Droplets, Mountain, Sparkles } from "lucide-react";
import { useScrollReveal } from "@/hooks/useScrollReveal";

const features = [
  { icon: Mountain, title: "Himalayan Source", desc: "Sourced from pristine springs deep within the Himalayan mountain range." },
  { icon: Sparkles, title: "Mineral Enriched", desc: "Fortified with essential minerals — calcium, magnesium, potassium & zinc." },
  { icon: Droplets, title: "7-Stage Purification", desc: "Micro-filtered through our proprietary multi-stage purification process." },
];

export const AboutSection = () => {
  const { ref, isVisible } = useScrollReveal<HTMLDivElement>(0.15);

  return (
    <section id="about" className="py-24 px-6 bg-card/50 relative overflow-hidden">
      {/* Background water shimmer */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/[0.03] rounded-full blur-3xl animate-pulse-slow" />
        <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-primary/[0.04] rounded-full blur-3xl animate-pulse-slow" style={{ animationDelay: "2s" }} />
      </div>

      <div ref={ref} className="container mx-auto max-w-5xl relative z-10">
        <div
          className={`text-center mb-16 transition-all duration-700 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <p className="text-primary font-body text-sm tracking-[0.3em] uppercase mb-3">Why ELEVATE</p>
          <h2 className="font-display text-4xl md:text-5xl font-bold text-foreground mb-4">
            Crafted for <span className="text-gradient-gold">Excellence</span>
          </h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((f, i) => (
            <div
              key={f.title}
              className={`text-center p-8 rounded-lg border border-border bg-card/80 backdrop-blur-sm hover:border-primary/40 transition-all duration-500 group hover:shadow-gold hover:-translate-y-1 ${
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
              }`}
              style={{ transitionDelay: isVisible ? `${200 + i * 150}ms` : "0ms" }}
            >
              <div className="relative inline-block mb-4">
                <f.icon className="w-10 h-10 text-primary relative z-10 group-hover:scale-110 transition-transform duration-300" />
                <div className="absolute inset-0 w-10 h-10 bg-primary/10 rounded-full blur-lg scale-0 group-hover:scale-150 transition-transform duration-500" />
              </div>
              <h3 className="font-display text-xl text-foreground mb-2 group-hover:text-gradient-gold transition-colors duration-300">{f.title}</h3>
              <p className="text-muted-foreground font-body text-sm">{f.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
