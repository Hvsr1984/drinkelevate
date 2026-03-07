import { Link } from "react-router-dom";
import { CartDrawer } from "./CartDrawer";
import { Droplets } from "lucide-react";

export const Navbar = () => {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-xl border-b border-border">
      <div className="container mx-auto px-6 h-16 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2">
          <Droplets className="h-6 w-6 text-primary" />
          <span className="font-display text-xl tracking-wider text-gradient-gold font-bold">ELEVATE</span>
        </Link>
        <div className="flex items-center gap-6">
          <a href="#products" className="text-sm font-body text-muted-foreground hover:text-foreground transition-colors tracking-wide uppercase">
            Collection
          </a>
          <a href="#about" className="text-sm font-body text-muted-foreground hover:text-foreground transition-colors tracking-wide uppercase">
            About
          </a>
          <CartDrawer />
        </div>
      </div>
    </nav>
  );
};
