import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { MessageCircle } from "lucide-react";
import { type Product, getWhatsAppOrderUrl } from "@/lib/products";

interface ProductCardProps {
  product: Product;
}

export const ProductCard = ({ product }: ProductCardProps) => {
  const handleOrder = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    window.open(getWhatsAppOrderUrl(product), "_blank");
  };

  return (
    <Link to={`/product/${product.handle}`} className="group block">
      <div className="bg-card rounded-lg overflow-hidden border border-border hover:border-primary/30 transition-all duration-500 hover:shadow-gold group-hover:-translate-y-1 relative">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/[0.03] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none z-10 rounded-lg" />
        <div className="aspect-square overflow-hidden bg-secondary relative">
          <img
            src={product.image}
            alt={product.title}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
            loading="lazy"
            width={512}
            height={512}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        </div>
        <div className="p-3 sm:p-5">
          <h3 className="font-display text-base sm:text-lg text-foreground mb-0.5 group-hover:text-primary transition-colors line-clamp-1">
            {product.title}
          </h3>
          <p className="text-primary/70 text-xs font-body tracking-wider uppercase mb-1">{product.subtitle}</p>
          <p className="text-muted-foreground text-xs sm:text-sm font-body line-clamp-2 mb-3 sm:mb-4 hidden sm:block">
            {product.description}
          </p>
          <div className="flex items-center justify-between gap-2">
            <span className="text-primary font-display text-lg sm:text-xl font-semibold">
              ₹{product.variants[0].price}
            </span>
            <Button
              onClick={handleOrder}
              size="sm"
              className="bg-[#25D366] hover:bg-[#1da851] text-white hover:scale-105 active:scale-95 transition-all duration-300"
            >
              <MessageCircle className="w-4 h-4 mr-1" /> Order
            </Button>
          </div>
        </div>
      </div>
    </Link>
  );
};
