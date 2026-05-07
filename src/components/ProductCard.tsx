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
      <div className="bg-card rounded-lg overflow-hidden border border-border hover:border-primary/40 transition-all duration-500 hover:shadow-gold-lg group-hover:-translate-y-1 relative">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/[0.05] via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none z-10 rounded-lg" />
        <div className="aspect-square overflow-hidden bg-gradient-to-br from-secondary via-background to-secondary relative">
          {/* Soft radial spotlight */}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_30%,hsl(var(--primary)/0.18),transparent_60%)] opacity-60 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />
          {/* Sweeping shine */}
          <div className="absolute -inset-x-1/2 -top-1/2 h-[200%] w-[60%] rotate-12 bg-gradient-to-r from-transparent via-primary/20 to-transparent translate-x-[-150%] group-hover:translate-x-[250%] transition-transform duration-[1400ms] ease-out pointer-events-none" />
          <img
            src={product.image}
            alt={product.title}
            className="w-full h-full object-contain p-4 animate-bottle-zoom group-hover:[animation-play-state:paused] group-hover:scale-110 transition-transform duration-700 ease-out drop-shadow-2xl"
            loading="lazy"
            width={1024}
            height={1024}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        </div>
        <div className="p-3 sm:p-5">
          <h3 className="font-display text-base sm:text-lg text-foreground mb-0.5 group-hover:text-primary transition-colors line-clamp-1">
            {product.title}
          </h3>
          <p className="text-primary/70 text-xs font-body tracking-wider uppercase mb-1">{product.subtitle}</p>
          <p className="text-muted-foreground text-xs sm:text-sm font-body line-clamp-2 mb-3 sm:mb-4 hidden sm:block">
            {product.description}
          </p>
          <div className="flex items-center justify-end gap-2">
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
