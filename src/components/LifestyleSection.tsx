import { useScrollReveal } from "@/hooks/useScrollReveal";
import gymImg from "@/assets/lifestyle-scenes/gym.jpg";
import collegeImg from "@/assets/lifestyle-scenes/college.jpg";
import travelImg from "@/assets/lifestyle-scenes/travel.jpg";
import sportsImg from "@/assets/lifestyle-scenes/sports.jpg";
import carImg from "@/assets/lifestyle-scenes/car.jpg";

const scenes = [
  { src: gymImg, label: "Gym", caption: "Push harder. Hydrate harder." },
  { src: collegeImg, label: "College", caption: "Class-to-class essentials." },
  { src: travelImg, label: "Travel", caption: "Wherever the next flight goes." },
  { src: sportsImg, label: "Sports", caption: "Match-day fuel." },
  { src: carImg, label: "On the Move", caption: "Always within reach." },
];

export const LifestyleSection = () => {
  const { ref, isVisible } = useScrollReveal<HTMLDivElement>(0.1);

  return (
    <section className="relative py-16 sm:py-24 px-4 sm:px-6">
      <div ref={ref} className="container mx-auto max-w-6xl">
        <div className={`text-center mb-10 sm:mb-14 transition-all duration-700 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
          <p className="text-primary font-body text-xs sm:text-sm tracking-[0.3em] uppercase mb-3">Lifestyle</p>
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold text-gradient-gold mb-3">
            Made for the way you live.
          </h2>
          <p className="text-muted-foreground font-body max-w-lg mx-auto text-sm sm:text-base">
            Gym sessions, campus runs, weekend getaways — Elevate fits every chapter.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-3 sm:gap-4">
          {scenes.map((s, i) => (
            <div
              key={s.label}
              className={`group relative aspect-[4/5] md:aspect-[3/4] overflow-hidden rounded-xl border border-border ${
                i === 0 ? "row-span-2 aspect-auto md:aspect-[3/5]" : ""
              } ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"} transition-all duration-700`}
              style={{ transitionDelay: isVisible ? `${i * 90}ms` : "0ms" }}
            >
              <img src={s.src} alt={`Elevate water — ${s.label}`} loading="lazy" width={1280} height={896} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
              <div className="absolute inset-0 bg-gradient-to-t from-background via-background/30 to-transparent" />
              <div className="absolute bottom-3 left-3 right-3 sm:bottom-5 sm:left-5">
                <p className="text-primary text-[10px] sm:text-xs font-body tracking-[0.25em] uppercase mb-0.5">{s.label}</p>
                <p className="font-display text-sm sm:text-lg text-foreground leading-tight">{s.caption}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
