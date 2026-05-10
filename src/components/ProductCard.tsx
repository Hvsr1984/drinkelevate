import { useRef } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { MessageCircle } from "lucide-react";
import { type Product, getWhatsAppOrderUrl } from "@/lib/products";
import { playBubbleSound, playBottleOpenSound } from "@/lib/sounds";

interface ProductCardProps {
  product: Product;
}

export const ProductCard = ({ product }: ProductCardProps) => {
  const lastBubbleRef = useRef(0);

  const handleOrder = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    playBottleOpenSound();
    window.open(getWhatsAppOrderUrl(product), "_blank");
  };

  const handleHoverBubble = () => {
    const now = Date.now();
    if (now - lastBubbleRef.current < 700) return;
    lastBubbleRef.current = now;
    playBubbleSound();
  };

  const firstVariant = product.variants[0];

  return (
    <Link to={`/product/${product.handle}`} className="group block">
      <div
        onMouseEnter={handleHoverBubble}
        onTouchStart={handleHoverBubble}
        className="bg-card rounded-lg overflow-hidden border border-border hover:border-primary/40 transition-all duration-500 hover:shadow-gold-lg group-hover:-translate-y-1 relative"
      >
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
        <div className="p-2.5 sm:p-4">
          <p className="text-primary/70 text-[10px] font-body tracking-[0.18em] uppercase mb-0.5">
            {product.subtitle}
          </p>
          <h3 className="font-display text-sm sm:text-base text-foreground group-hover:text-primary transition-colors">
            {product.title}
          </h3>
          <div className="flex items-center justify-between gap-2 mt-2">
            <div>
              <p className="font-display text-sm sm:text-base text-primary">
                ₹{firstVariant.price}
              </p>
              <p className="text-[10px] text-muted-foreground font-body">
                {product.variants.map((v) => v.size).join(" · ")}
              </p>
            </div>
            <Button
              onClick={handleOrder}
              size="sm"
              className="btn-luxury h-7 px-2.5 text-[11px] rounded-md bg-[#25D366] hover:bg-[#1da851] text-white [&_svg]:size-3"
            >
              <MessageCircle className="mr-1" /> Order
            </Button>
          </div>
        </div>
      </div>
    </Link>
  );
};
