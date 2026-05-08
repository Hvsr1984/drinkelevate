import { Instagram, Heart, MessageCircle } from "lucide-react";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import pureHand from "@/assets/lifestyle/pure-hand.jpg";
import sparklingTable from "@/assets/lifestyle/sparkling-table.jpg";
import mineralsOutdoor from "@/assets/lifestyle/minerals-outdoor.jpg";
import alkalineHand from "@/assets/lifestyle/alkaline-hand.jpg";
import glacierTable from "@/assets/lifestyle/glacier-table.jpg";
import coconutOutdoor from "@/assets/lifestyle/coconut-outdoor.jpg";
import gymImg from "@/assets/lifestyle-scenes/gym.jpg";
import travelImg from "@/assets/lifestyle-scenes/travel.jpg";

const posts = [
  { src: pureHand, caption: "Pure clarity, every drop. #ElevateYourHydration", likes: 1248 },
  { src: sparklingTable, caption: "Bubbles meet brunch. ✨", likes: 982 },
  { src: gymImg, caption: "Sweat. Sip. Repeat.", likes: 2104 },
  { src: mineralsOutdoor, caption: "Minerals+ for the long haul.", likes: 760 },
  { src: alkalineHand, caption: "pH balanced, life elevated.", likes: 1523 },
  { src: travelImg, caption: "Carry-on essentials.", likes: 1810 },
  { src: glacierTable, caption: "Arctic-fresh on the table.", likes: 645 },
  { src: coconutOutdoor, caption: "Tropical hydration. 🥥", likes: 1399 },
];

export const InstagramSection = () => {
  const { ref, isVisible } = useScrollReveal<HTMLDivElement>(0.05);

  return (
    <section className="relative py-16 sm:py-24 px-4 sm:px-6">
      <div ref={ref} className="container mx-auto max-w-6xl">
        <div className={`text-center mb-10 sm:mb-14 transition-all duration-700 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
          <p className="text-primary font-body text-xs sm:text-sm tracking-[0.3em] uppercase mb-3 inline-flex items-center gap-2 justify-center">
            <Instagram className="w-3.5 h-3.5" /> @elevatewaterindia
          </p>
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold text-gradient-gold mb-3">
            Follow the moments.
          </h2>
          <p className="text-muted-foreground font-body max-w-md mx-auto text-sm sm:text-base">
            A daily feed of premium hydration moments from across India.
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-3">
          {posts.map((p, i) => (
            <a
              key={i}
              href="#"
              onClick={(e) => e.preventDefault()}
              className={`group relative aspect-square overflow-hidden rounded-lg border border-border ${
                isVisible ? "opacity-100 scale-100" : "opacity-0 scale-95"
              } transition-all duration-700`}
              style={{ transitionDelay: isVisible ? `${i * 60}ms` : "0ms" }}
            >
              <img src={p.src} alt={p.caption} loading="lazy" width={800} height={800} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
              <div className="absolute inset-0 bg-background/70 backdrop-blur-[2px] opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col items-center justify-center p-3 text-center">
                <div className="flex items-center gap-3 text-foreground mb-2">
                  <span className="flex items-center gap-1 text-xs font-body"><Heart className="w-3.5 h-3.5 text-primary" />{p.likes}</span>
                  <span className="flex items-center gap-1 text-xs font-body"><MessageCircle className="w-3.5 h-3.5 text-primary" />{Math.floor(p.likes / 12)}</span>
                </div>
                <p className="text-foreground font-body text-[11px] line-clamp-2">{p.caption}</p>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
};
