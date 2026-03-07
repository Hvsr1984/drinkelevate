import { Droplets } from "lucide-react";

export const Footer = () => {
  return (
    <footer className="py-12 px-6 border-t border-border">
      <div className="container mx-auto max-w-6xl flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <Droplets className="h-5 w-5 text-primary" />
          <span className="font-display text-lg tracking-wider text-gradient-gold font-bold">ELEVATE</span>
        </div>
        <p className="text-muted-foreground text-sm font-body">
          © 2026 ELEVATE Water Co. All rights reserved.
        </p>
      </div>
    </footer>
  );
};
