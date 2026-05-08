import { useState } from "react";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { WHATSAPP_NUMBER } from "@/lib/products";
import { TrendingUp, Truck, Handshake, MessageCircle } from "lucide-react";
import { toast } from "@/hooks/use-toast";

const inquirySchema = z.object({
  name: z.string().trim().min(2, "Name must be at least 2 characters").max(80),
  business: z.string().trim().min(2, "Business name required").max(120),
  city: z.string().trim().min(2, "City required").max(80),
  phone: z.string().trim().regex(/^[+\d\s-]{8,16}$/, "Enter a valid phone"),
  quantity: z.string().trim().min(1, "Quantity required").max(40),
  notes: z.string().trim().max(500).optional(),
});

const benefits = [
  { icon: TrendingUp, title: "Healthy Margins", desc: "Competitive retail margins, transparent pricing." },
  { icon: Truck, title: "Delivery Support", desc: "Reliable supply chain across cities." },
  { icon: Handshake, title: "Partnership First", desc: "Marketing assets and onboarding included." },
];

export const DistributorSection = () => {
  const { ref, isVisible } = useScrollReveal<HTMLDivElement>(0.1);
  const [form, setForm] = useState({ name: "", business: "", city: "", phone: "", quantity: "", notes: "" });

  const update = (k: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setForm((p) => ({ ...p, [k]: e.target.value }));

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const parsed = inquirySchema.safeParse(form);
    if (!parsed.success) {
      const first = Object.values(parsed.error.flatten().fieldErrors)[0]?.[0] ?? "Please check the form";
      toast({ title: "Form incomplete", description: first, variant: "destructive" });
      return;
    }
    const d = parsed.data;
    const msg = encodeURIComponent(
      `Hello ELEVATE Team,\n\nI'd like to become a distributor.\n\n*Name:* ${d.name}\n*Business:* ${d.business}\n*City:* ${d.city}\n*Phone:* ${d.phone}\n*Bulk Quantity:* ${d.quantity}\n${d.notes ? `*Notes:* ${d.notes}\n` : ""}\nPlease share details.`
    );
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${msg}`, "_blank");
    toast({ title: "Opening WhatsApp", description: "We'll continue your inquiry there." });
  };

  return (
    <section id="distributor" className="relative py-16 sm:py-24 px-4 sm:px-6">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,hsl(var(--primary)/0.08),transparent_60%)] pointer-events-none" />
      <div ref={ref} className="container mx-auto max-w-6xl relative z-10">
        <div className={`text-center mb-10 sm:mb-14 transition-all duration-700 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
          <p className="text-primary font-body text-xs sm:text-sm tracking-[0.3em] uppercase mb-3">Become a Distributor</p>
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold text-gradient-gold mb-3">
            Build with us.
          </h2>
          <p className="text-muted-foreground font-body max-w-lg mx-auto text-sm sm:text-base">
            Premium positioning, reliable supply, and a partner who picks up the phone.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 lg:gap-10 items-start">
          <div className="lg:col-span-2 space-y-3">
            {benefits.map((b) => (
              <div key={b.title} className="bg-card/60 backdrop-blur-sm border border-border rounded-xl p-4 sm:p-5 flex gap-4 hover:border-primary/40 transition-colors">
                <div className="w-10 h-10 rounded-lg bg-primary/10 border border-primary/20 flex-shrink-0 flex items-center justify-center">
                  <b.icon className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <h3 className="font-display text-base text-foreground">{b.title}</h3>
                  <p className="text-muted-foreground font-body text-xs sm:text-sm mt-0.5">{b.desc}</p>
                </div>
              </div>
            ))}
            <Button
              onClick={() => window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent("Hi, I want to discuss a distributor partnership for ELEVATE.")}`, "_blank")}
              className="w-full bg-[#25D366] hover:bg-[#1da851] text-white"
              size="lg"
            >
              <MessageCircle className="w-4 h-4 mr-2" /> Quick Chat on WhatsApp
            </Button>
          </div>

          <form onSubmit={submit} className="lg:col-span-3 bg-card/60 backdrop-blur-sm border border-border rounded-xl p-5 sm:p-7 space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <Label htmlFor="d-name" className="font-body text-xs">Your Name</Label>
                <Input id="d-name" maxLength={80} value={form.name} onChange={update("name")} placeholder="Rahul Sharma" />
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="d-business" className="font-body text-xs">Business Name</Label>
                <Input id="d-business" maxLength={120} value={form.business} onChange={update("business")} placeholder="Sharma Beverages" />
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="d-city" className="font-body text-xs">City</Label>
                <Input id="d-city" maxLength={80} value={form.city} onChange={update("city")} placeholder="Jaipur" />
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="d-phone" className="font-body text-xs">Phone</Label>
                <Input id="d-phone" type="tel" maxLength={16} value={form.phone} onChange={update("phone")} placeholder="+91 98765 43210" />
              </div>
              <div className="space-y-1.5 sm:col-span-2">
                <Label htmlFor="d-qty" className="font-body text-xs">Estimated Bulk Quantity / month</Label>
                <Input id="d-qty" maxLength={40} value={form.quantity} onChange={update("quantity")} placeholder="e.g. 500 cases" />
              </div>
              <div className="space-y-1.5 sm:col-span-2">
                <Label htmlFor="d-notes" className="font-body text-xs">Notes (optional)</Label>
                <Textarea id="d-notes" maxLength={500} rows={3} value={form.notes} onChange={update("notes")} placeholder="Anything we should know" />
              </div>
            </div>
            <Button type="submit" size="lg" className="w-full bg-primary text-primary-foreground hover:bg-primary/90">
              <MessageCircle className="w-4 h-4 mr-2" /> Send Inquiry via WhatsApp
            </Button>
            <p className="text-[10px] text-muted-foreground font-body text-center">
              Submitting opens WhatsApp with your details pre-filled.
            </p>
          </form>
        </div>
      </div>
    </section>
  );
};
