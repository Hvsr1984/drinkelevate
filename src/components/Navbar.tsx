import { useState } from "react";
import { Link } from "react-router-dom";
import { CartDrawer } from "./CartDrawer";
import { Droplets, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";

export const Navbar = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const { toggle, isDark } = useSystemTheme();

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-xl border-b border-border">
      <div className="container mx-auto px-4 sm:px-6 h-14 sm:h-16 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2">
          <Droplets className="h-5 w-5 sm:h-6 sm:w-6 text-primary" />
          <span className="font-display text-lg sm:text-xl tracking-wider text-gradient-gold font-bold">ELEVATE</span>
        </Link>
        <div className="flex items-center gap-2 sm:gap-6">
          <div className="hidden sm:flex items-center gap-6">
            <a href="#products" className="text-sm font-body text-muted-foreground hover:text-foreground transition-colors tracking-wide uppercase">
              Collection
            </a>
            <a href="#about" className="text-sm font-body text-muted-foreground hover:text-foreground transition-colors tracking-wide uppercase">
              About
            </a>
            <Link to="/purity-report" className="text-sm font-body text-muted-foreground hover:text-foreground transition-colors tracking-wide uppercase">
              Purity
            </Link>
          </div>
          <Button variant="ghost" size="icon" className="h-9 w-9" onClick={toggle} aria-label="Toggle theme">
            {isDark ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
          </Button>
          <CartDrawer />
          <Button variant="ghost" size="icon" className="sm:hidden h-9 w-9" onClick={() => setMobileOpen(!mobileOpen)}>
            {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
        </div>
      </div>
      {mobileOpen && (
        <div className="sm:hidden border-t border-border bg-background/95 backdrop-blur-xl px-4 py-4 space-y-3">
          <a href="#products" onClick={() => setMobileOpen(false)} className="block text-sm font-body text-muted-foreground hover:text-foreground transition-colors tracking-wide uppercase py-2">
            Collection
          </a>
          <a href="#about" onClick={() => setMobileOpen(false)} className="block text-sm font-body text-muted-foreground hover:text-foreground transition-colors tracking-wide uppercase py-2">
            About
          </a>
          <Link to="/purity-report" onClick={() => setMobileOpen(false)} className="block text-sm font-body text-muted-foreground hover:text-foreground transition-colors tracking-wide uppercase py-2">
            Purity
          </Link>
        </div>
      )}
    </nav>
  );
};
