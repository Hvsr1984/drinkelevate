import { Droplets, Mountain, Sparkles } from "lucide-react";

const features = [
  { icon: Mountain, title: "Himalayan Source", desc: "Sourced from pristine springs deep within the Himalayan mountain range." },
  { icon: Sparkles, title: "Mineral Enriched", desc: "Fortified with essential minerals — calcium, magnesium, potassium & zinc." },
  { icon: Droplets, title: "7-Stage Purification", desc: "Micro-filtered through our proprietary multi-stage purification process." },
];

export const AboutSection = () => {
  return (
    <section id="about" className="py-24 px-6 bg-card/50">
      <div className="container mx-auto max-w-5xl">
        <div className="text-center mb-16">
          <p className="text-primary font-body text-sm tracking-[0.3em] uppercase mb-3">Why ELEVATE</p>
          <h2 className="font-display text-4xl md:text-5xl font-bold text-foreground mb-4">
            Crafted for <span className="text-gradient-gold">Excellence</span>
          </h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((f) => (
            <div key={f.title} className="text-center p-8 rounded-lg border border-border bg-card hover:border-primary/30 transition-all duration-300">
              <f.icon className="w-10 h-10 text-primary mx-auto mb-4" />
              <h3 className="font-display text-xl text-foreground mb-2">{f.title}</h3>
              <p className="text-muted-foreground font-body text-sm">{f.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
