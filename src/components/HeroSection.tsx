import heroBg from "@/assets/hero-bg.jpg";
import { WaterBubbles } from "./WaterBubbles";
import { WaterRipple } from "./WaterRipple";

export const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${heroBg})` }}
      />
      <div className="absolute inset-0 bg-background/70" />
      <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-background/50" />
      <WaterBubbles count={20} />
      <WaterRipple />

      {/* Floating gold particles */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden" aria-hidden="true">
        {Array.from({ length: 6 }).map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 rounded-full bg-primary/30 animate-float-particle"
            style={{
              left: `${15 + i * 14}%`,
              top: `${20 + (i % 3) * 25}%`,
              animationDelay: `${i * 1.2}s`,
              animationDuration: `${4 + i * 0.8}s`,
            }}
          />
        ))}
      </div>

      <div className="relative z-10 text-center px-6 max-w-4xl mx-auto">
        <p className="text-primary font-body text-sm tracking-[0.4em] uppercase mb-6 animate-fade-in-up">
          Premium Drinking Water
        </p>
        <h1
          className="font-display text-5xl md:text-7xl lg:text-8xl font-bold mb-6 text-gradient-gold animate-fade-in-up hero-title-glow"
          style={{ animationDelay: "0.2s", opacity: 0 }}
        >
          ELEVATE
        </h1>
        <p
          className="font-display text-xl md:text-2xl text-foreground/80 mb-4 animate-fade-in-up"
          style={{ animationDelay: "0.4s", opacity: 0 }}
        >
          Purity Refined. Excellence Bottled.
        </p>
        <p
          className="font-body text-muted-foreground max-w-xl mx-auto mb-10 animate-fade-in-up"
          style={{ animationDelay: "0.6s", opacity: 0 }}
        >
          From the heart of the Himalayas to your glass — crafted with minerals,
          carbonated with precision, bottled with purpose.
        </p>
        <a
          href="#products"
          className="group inline-block relative bg-gradient-gold text-primary-foreground font-body font-semibold px-10 py-4 rounded-sm tracking-wider uppercase text-sm hover:opacity-90 transition-all duration-300 shadow-gold animate-fade-in-up hover:shadow-gold-lg hover:scale-105 active:scale-95"
          style={{ animationDelay: "0.8s", opacity: 0 }}
        >
          <span className="relative z-10">Explore Collection</span>
          <div className="absolute inset-0 bg-gradient-gold opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-sm animate-shimmer bg-[length:200%_100%]" />
        </a>
      </div>
    </section>
  );
};
