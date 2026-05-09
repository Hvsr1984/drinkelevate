import { ProductCard } from "./ProductCard";
import { WaterBubbles } from "./WaterBubbles";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { products } from "@/lib/products";

export const ProductsSection = () => {
  const { ref: sectionRef, isVisible } = useScrollReveal<HTMLDivElement>(0.1);

  return (
    <section id="products" className="relative py-16 sm:py-24 px-4 sm:px-6">
      <WaterBubbles count={8} />
      <div ref={sectionRef} className="container mx-auto max-w-6xl relative z-10">
        <div
          className={`text-center mb-8 sm:mb-12 transition-all duration-700 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <p className="text-primary font-body text-xs sm:text-sm tracking-[0.3em] uppercase mb-3">
            The Collection
          </p>
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold text-gradient-gold mb-4">
            Discover Pure Luxury
          </h2>
          <p className="text-muted-foreground font-body max-w-lg mx-auto text-sm sm:text-base">
            Six curated hydration experiences crafted for the discerning palate.
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-5">
          {products.map((product, i) => (
            <div
              key={product.id}
              className={`transition-all duration-500 ${
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
              }`}
              style={{ transitionDelay: isVisible ? `${100 + i * 60}ms` : "0ms" }}
            >
              <ProductCard product={product} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
