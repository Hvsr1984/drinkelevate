import { Button } from "@/components/ui/button";
import { MessageCircle } from "lucide-react";
import { WHATSAPP_NUMBER } from "@/lib/products";

export const CartDrawer = () => {
  const handleWhatsApp = () => {
    const message = encodeURIComponent("Hi, I'd like to know more about ELEVATE Water products. Please share the catalog and pricing details.");
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${message}`, "_blank");
  };

  return (
    <Button variant="ghost" size="icon" className="h-9 w-9 relative" onClick={handleWhatsApp} aria-label="Contact on WhatsApp">
      <MessageCircle className="h-5 w-5 text-[#25D366]" />
    </Button>
  );
};
