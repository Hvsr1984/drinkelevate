import { useState } from "react";
import { X, Sparkles } from "lucide-react";

export const PromoBanner = () => {
  const [dismissed, setDismissed] = useState(false);

  if (dismissed) return null;

  return (
    <div className="fixed top-14 sm:top-16 left-0 right-0 z-40 bg-gradient-gold text-primary-foreground">
      <div className="container mx-auto px-4 py-2 flex items-center justify-center gap-2 text-center relative">
        <Sparkles className="w-3.5 h-3.5 flex-shrink-0 hidden sm:block" />
        <p className="font-body text-xs sm:text-sm font-medium tracking-wide">
          First order? Use code{" "}
          <span className="font-bold tracking-widest bg-primary-foreground/15 px-1.5 py-0.5 rounded text-xs sm:text-sm">
            WELCOME15
          </span>{" "}
          for 15% off
        </p>
        <button
          onClick={() => setDismissed(true)}
          className="absolute right-3 top-1/2 -translate-y-1/2 p-1 hover:bg-primary-foreground/10 rounded transition-colors"
          aria-label="Dismiss banner"
        >
          <X className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
};
