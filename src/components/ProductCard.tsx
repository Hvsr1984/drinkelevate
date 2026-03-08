import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ShoppingCart, Loader2 } from "lucide-react";
import { useCartStore, type ShopifyProduct } from "@/stores/cartStore";
import { playBubbleSound, playBottleOpenSound } from "@/lib/sounds";
import { toast } from "sonner";

interface ProductCardProps {
  product: ShopifyProduct;
}

export const ProductCard = ({ product }: ProductCardProps) => {
  const addItem = useCartStore(state => state.addItem);
  const isLoading = useCartStore(state => state.isLoading);
  const variant = product.node.variants.edges[0]?.node;
  const image = product.node.images.edges[0]?.node;
  const price = product.node.priceRange.minVariantPrice;

  const handleAddToCart = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (!variant) return;
    await addItem({
      product,
      variantId: variant.id,
      variantTitle: variant.title,
      price: variant.price,
      quantity: 1,
      selectedOptions: variant.selectedOptions || [],
    });
    toast.success("Added to cart", {
      description: product.node.title,
      position: "top-center",
    });
  };

  return (
    <Link to={`/product/${product.node.handle}`} className="group block">
      <div className="bg-card rounded-lg overflow-hidden border border-border hover:border-primary/30 transition-all duration-500 hover:shadow-gold">
        <div className="aspect-square overflow-hidden bg-secondary">
          {image && (
            <img
              src={image.url}
              alt={image.altText || product.node.title}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
            />
          )}
        </div>
        <div className="p-5">
          <h3 className="font-display text-lg text-foreground mb-1 group-hover:text-primary transition-colors">
            {product.node.title}
          </h3>
          <p className="text-muted-foreground text-sm font-body line-clamp-2 mb-4">
            {product.node.description}
          </p>
          <div className="flex items-center justify-between">
            <span className="text-primary font-display text-xl font-semibold">
              ₹{parseFloat(price.amount).toFixed(0)}
            </span>
            <Button
              onClick={handleAddToCart}
              disabled={isLoading || !variant}
              size="sm"
              className="bg-gradient-gold text-primary-foreground hover:opacity-90"
            >
              {isLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : <><ShoppingCart className="w-4 h-4 mr-1" /> Add</>}
            </Button>
          </div>
        </div>
      </div>
    </Link>
  );
};
