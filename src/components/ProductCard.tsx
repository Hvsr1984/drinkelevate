import { Link } from "react-router-dom";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ShoppingCart, Loader2, Check } from "lucide-react";
import { useCartStore, type ShopifyProduct } from "@/stores/cartStore";
import { playBubbleSound, playBottleOpenSound } from "@/lib/sounds";
import { toast } from "sonner";

interface ProductCardProps {
  product: ShopifyProduct;
}

export const ProductCard = ({ product }: ProductCardProps) => {
  const addItem = useCartStore(state => state.addItem);
  const isLoading = useCartStore(state => state.isLoading);
  const [justAdded, setJustAdded] = useState(false);
  const variant = product.node.variants.edges[0]?.node;
  const image = product.node.images.edges[0]?.node;
  const price = product.node.priceRange.minVariantPrice;

  const handleAddToCart = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (!variant) return;
    playBottleOpenSound();
    playBubbleSound();
    await addItem({
      product,
      variantId: variant.id,
      variantTitle: variant.title,
      price: variant.price,
      quantity: 1,
      selectedOptions: variant.selectedOptions || [],
    });
    setJustAdded(true);
    setTimeout(() => setJustAdded(false), 1500);
    toast.success("Added to cart", {
      description: product.node.title,
      position: "top-center",
    });
  };

  return (
    <Link to={`/product/${product.node.handle}`} className="group block">
      <div className="bg-card rounded-lg overflow-hidden border border-border hover:border-primary/30 transition-all duration-500 hover:shadow-gold group-hover:-translate-y-1 relative">
        {/* Hover glow effect */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary/[0.03] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none z-10 rounded-lg" />
        <div className="aspect-square overflow-hidden bg-secondary relative">
          {image && (
            <img
              src={image.url}
              alt={image.altText || product.node.title}
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
              loading="lazy"
            />
          )}
          {/* Water shimmer overlay on hover */}
          <div className="absolute inset-0 bg-gradient-to-t from-background/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        </div>
        <div className="p-3 sm:p-5">
          <h3 className="font-display text-base sm:text-lg text-foreground mb-1 group-hover:text-primary transition-colors line-clamp-1">
            {product.node.title}
          </h3>
          <p className="text-muted-foreground text-xs sm:text-sm font-body line-clamp-2 mb-3 sm:mb-4 hidden sm:block">
            {product.node.description}
          </p>
          <div className="flex items-center justify-between gap-2">
            <span className="text-primary font-display text-lg sm:text-xl font-semibold">
              ₹{parseFloat(price.amount).toFixed(0)}
            </span>
            <Button
              onClick={handleAddToCart}
              disabled={isLoading || !variant}
              size="sm"
              className={`transition-all duration-300 ${
                justAdded
                  ? 'bg-accent text-accent-foreground scale-110'
                  : 'bg-gradient-gold text-primary-foreground hover:opacity-90 hover:scale-105 active:scale-95'
              }`}
            >
              {isLoading ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : justAdded ? (
                <><Check className="w-4 h-4 mr-1" /> Added</>
              ) : (
                <><ShoppingCart className="w-4 h-4 mr-1" /> Add</>
              )}
            </Button>
          </div>
        </div>
      </div>
    </Link>
  );
};
