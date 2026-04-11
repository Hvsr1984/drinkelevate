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
          className={`text-center mb-10 sm:mb-16 transition-all duration-700 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <p className="text-primary font-body text-xs sm:text-sm tracking-[0.3em] uppercase mb-3">The Collection</p>
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold text-gradient-gold mb-4">
            Our Premium Range
          </h2>
          <p className="text-muted-foreground font-body max-w-lg mx-auto text-sm sm:text-base">
            Each bottle is a testament to purity — sourced, enriched, and bottled to perfection.
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-6">
          {products.map((product, i) => (
            <div
              key={product.id}
              className={`transition-all duration-700 ${
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
              }`}
              style={{ transitionDelay: isVisible ? `${150 + i * 100}ms` : "0ms" }}
            >
              <ProductCard product={product} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
