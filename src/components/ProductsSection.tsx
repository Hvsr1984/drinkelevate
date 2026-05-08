import { useMemo, useState } from "react";
import { ProductCard } from "./ProductCard";
import { ProductRow } from "./ProductRow";
import { WaterBubbles } from "./WaterBubbles";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { products, PRODUCT_CATEGORIES, type ProductCategory } from "@/lib/products";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, LayoutGrid, List, X } from "lucide-react";

type SortKey = "featured" | "price-asc" | "price-desc" | "name-asc";
type View = "grid" | "list";

export const ProductsSection = () => {
  const { ref: sectionRef, isVisible } = useScrollReveal<HTMLDivElement>(0.1);
  const [query, setQuery] = useState("");
  const [activeCat, setActiveCat] = useState<ProductCategory | "All">("All");
  const [sort, setSort] = useState<SortKey>("featured");
  const [view, setView] = useState<View>("grid");

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    let list = products.filter((p) => {
      const catOk = activeCat === "All" || p.category === activeCat;
      const qOk =
        !q ||
        p.title.toLowerCase().includes(q) ||
        p.subtitle.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q) ||
        p.category.toLowerCase().includes(q);
      return catOk && qOk;
    });
    const minP = (p: (typeof products)[number]) => Math.min(...p.variants.map((v) => v.price));
    if (sort === "price-asc") list = [...list].sort((a, b) => minP(a) - minP(b));
    else if (sort === "price-desc") list = [...list].sort((a, b) => minP(b) - minP(a));
    else if (sort === "name-asc") list = [...list].sort((a, b) => a.title.localeCompare(b.title));
    return list;
  }, [query, activeCat, sort]);

  return (
    <section id="products" className="relative py-16 sm:py-24 px-4 sm:px-6">
      <WaterBubbles count={8} />
      <div ref={sectionRef} className="container mx-auto max-w-6xl relative z-10">
        <div
          className={`text-center mb-8 sm:mb-12 transition-all duration-700 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <p className="text-primary font-body text-xs sm:text-sm tracking-[0.3em] uppercase mb-3">The Catalog</p>
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold text-gradient-gold mb-4">
            Browse the Collection
          </h2>
          <p className="text-muted-foreground font-body max-w-lg mx-auto text-sm sm:text-base">
            Filter, search, and order your perfect bottle — purity in every variant.
          </p>
        </div>

        {/* Toolbar */}
        <div className="bg-card/60 backdrop-blur-sm border border-border rounded-xl p-3 sm:p-4 mb-6 space-y-3">
          <div className="flex flex-col sm:flex-row gap-2 sm:gap-3 sm:items-center">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none" />
              <Input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search waters, minerals, sparkling…"
                className="pl-9 pr-9 h-10 bg-background/60 font-body text-sm"
              />
              {query && (
                <button
                  onClick={() => setQuery("")}
                  aria-label="Clear search"
                  className="absolute right-2 top-1/2 -translate-y-1/2 p-1 text-muted-foreground hover:text-foreground"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>

            <div className="flex gap-2">
              <select
                value={sort}
                onChange={(e) => setSort(e.target.value as SortKey)}
                className="h-10 rounded-md border border-input bg-background/60 px-3 text-sm font-body text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
              >
                <option value="featured">Featured</option>
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
                <option value="name-asc">Name: A–Z</option>
              </select>

              <div className="flex rounded-md border border-input overflow-hidden">
                <button
                  onClick={() => setView("grid")}
                  aria-label="Grid view"
                  className={`px-3 h-10 flex items-center transition-colors ${
                    view === "grid" ? "bg-primary/15 text-primary" : "bg-background/60 text-muted-foreground hover:text-foreground"
                  }`}
                >
                  <LayoutGrid className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setView("list")}
                  aria-label="List view"
                  className={`px-3 h-10 flex items-center border-l border-input transition-colors ${
                    view === "list" ? "bg-primary/15 text-primary" : "bg-background/60 text-muted-foreground hover:text-foreground"
                  }`}
                >
                  <List className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>

          <div className="flex flex-wrap gap-1.5">
            {(["All", ...PRODUCT_CATEGORIES] as const).map((cat) => (
              <Button
                key={cat}
                onClick={() => setActiveCat(cat as ProductCategory | "All")}
                variant={activeCat === cat ? "default" : "outline"}
                size="sm"
                className={`h-7 px-3 text-[11px] rounded-full font-body tracking-wider uppercase ${
                  activeCat === cat ? "" : "bg-background/40"
                }`}
              >
                {cat}
              </Button>
            ))}
          </div>

          <p className="text-[11px] text-muted-foreground font-body">
            Showing <span className="text-foreground">{filtered.length}</span> of {products.length} products
          </p>
        </div>

        {filtered.length === 0 ? (
          <div className="text-center py-16 text-muted-foreground font-body">
            No products match your filters.
          </div>
        ) : view === "grid" ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-5">
            {filtered.map((product, i) => (
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
        ) : (
          <div className="flex flex-col gap-2 sm:gap-3">
            {filtered.map((product, i) => (
              <div
                key={product.id}
                className={`transition-all duration-500 ${
                  isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
                }`}
                style={{ transitionDelay: isVisible ? `${80 + i * 50}ms` : "0ms" }}
              >
                <ProductRow product={product} />
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};
