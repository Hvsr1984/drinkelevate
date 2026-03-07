import heroBg from "@/assets/hero-bg.jpg";

export const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${heroBg})` }}
      />
      <div className="absolute inset-0 bg-background/70" />
      <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-background/50" />

      <div className="relative z-10 text-center px-6 max-w-4xl mx-auto">
        <p className="text-primary font-body text-sm tracking-[0.4em] uppercase mb-6 animate-fade-in-up">
          Premium Drinking Water
        </p>
        <h1 className="font-display text-5xl md:text-7xl lg:text-8xl font-bold mb-6 text-gradient-gold animate-fade-in-up" style={{ animationDelay: '0.2s', opacity: 0 }}>
          ELEVATE
        </h1>
        <p className="font-display text-xl md:text-2xl text-foreground/80 mb-4 animate-fade-in-up" style={{ animationDelay: '0.4s', opacity: 0 }}>
          Purity Refined. Excellence Bottled.
        </p>
        <p className="font-body text-muted-foreground max-w-xl mx-auto mb-10 animate-fade-in-up" style={{ animationDelay: '0.6s', opacity: 0 }}>
          From the heart of the Himalayas to your glass — crafted with minerals, carbonated with precision, bottled with purpose.
        </p>
        <a
          href="#products"
          className="inline-block bg-gradient-gold text-primary-foreground font-body font-semibold px-10 py-4 rounded-sm tracking-wider uppercase text-sm hover:opacity-90 transition-opacity shadow-gold animate-fade-in-up"
          style={{ animationDelay: '0.8s', opacity: 0 }}
        >
          Explore Collection
        </a>
      </div>
    </section>
  );
};
