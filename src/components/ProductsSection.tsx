import { useEffect, useState } from "react";
import { storefrontApiRequest, STOREFRONT_QUERY, type ShopifyProduct } from "@/lib/shopify";
import { ProductCard } from "./ProductCard";
import { Loader2 } from "lucide-react";

export const ProductsSection = () => {
  const [products, setProducts] = useState<ShopifyProduct[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchProducts() {
      try {
        const data = await storefrontApiRequest(STOREFRONT_QUERY, { first: 20 });
        setProducts(data?.data?.products?.edges || []);
      } catch (error) {
        console.error("Failed to fetch products:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchProducts();
  }, []);

  return (
    <section id="products" className="relative py-16 sm:py-24 px-4 sm:px-6">
      <WaterBubbles count={8} />
      <div className="container mx-auto max-w-6xl relative z-10">
        <div className="text-center mb-10 sm:mb-16">
          <p className="text-primary font-body text-xs sm:text-sm tracking-[0.3em] uppercase mb-3">The Collection</p>
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold text-gradient-gold mb-4">
            Our Premium Range
          </h2>
          <p className="text-muted-foreground font-body max-w-lg mx-auto text-sm sm:text-base">
            Each bottle is a testament to purity — sourced, enriched, and bottled to perfection.
          </p>
        </div>

        {loading ? (
          <div className="flex justify-center py-20">
            <Loader2 className="w-8 h-8 animate-spin text-primary" />
          </div>
        ) : products.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-muted-foreground text-lg">No products found</p>
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6">
            {products.map((product) => (
              <ProductCard key={product.node.id} product={product} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
};
