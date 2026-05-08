import { useRef } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { MessageCircle } from "lucide-react";
import { type Product, getWhatsAppOrderUrl } from "@/lib/products";
import { playBubbleSound, playBottleOpenSound } from "@/lib/sounds";

export const ProductRow = ({ product }: { product: Product }) => {
  const lastBubbleRef = useRef(0);

  const handleOrder = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    playBottleOpenSound();
    window.open(getWhatsAppOrderUrl(product), "_blank");
  };

  const handleHover = () => {
    const now = Date.now();
    if (now - lastBubbleRef.current < 700) return;
    lastBubbleRef.current = now;
    playBubbleSound();
  };

  const minPrice = Math.min(...product.variants.map((v) => v.price));

  return (
    <Link to={`/product/${product.handle}`} className="group block">
      <div
        onMouseEnter={handleHover}
        onTouchStart={handleHover}
        className="flex items-center gap-3 sm:gap-5 bg-card rounded-lg border border-border hover:border-primary/40 transition-all duration-300 hover:shadow-gold p-3 sm:p-4"
      >
        <div className="relative flex-shrink-0 w-20 h-20 sm:w-28 sm:h-28 rounded-md overflow-hidden bg-gradient-to-br from-secondary via-background to-secondary">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_30%,hsl(var(--primary)/0.18),transparent_60%)] opacity-70" />
          <img
            src={product.image}
            alt={product.title}
            loading="lazy"
            width={512}
            height={512}
            className="w-full h-full object-contain p-2 group-hover:scale-110 transition-transform duration-500 drop-shadow-xl"
          />
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-2">
            <div className="min-w-0">
              <p className="text-primary/70 text-[10px] sm:text-xs font-body tracking-[0.18em] uppercase">
                {product.category} · {product.subtitle}
              </p>
              <h3 className="font-display text-base sm:text-lg text-foreground group-hover:text-primary transition-colors truncate">
                {product.title}
              </h3>
              <p className="hidden sm:block text-muted-foreground text-xs font-body line-clamp-1 mt-0.5">
                {product.description}
              </p>
            </div>
            <div className="text-right flex-shrink-0">
              <p className="text-[10px] text-muted-foreground uppercase tracking-wider">From</p>
              <p className="font-display text-base sm:text-lg text-primary">₹{minPrice}</p>
            </div>
          </div>

          <div className="flex items-center justify-between gap-2 mt-2">
            <div className="flex gap-1 flex-wrap">
              {product.variants.map((v) => (
                <span
                  key={v.size}
                  className="text-[10px] font-body px-1.5 py-0.5 rounded border border-border text-muted-foreground"
                >
                  {v.size}
                </span>
              ))}
            </div>
            <Button
              onClick={handleOrder}
              size="sm"
              className="h-7 px-2.5 text-[11px] rounded-md bg-[#25D366] hover:bg-[#1da851] text-white [&_svg]:size-3"
            >
              <MessageCircle className="mr-1" /> Order
            </Button>
          </div>
        </div>
      </div>
    </Link>
  );
};
