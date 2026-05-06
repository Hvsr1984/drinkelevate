import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { getProductByHandle, getWhatsAppOrderUrl } from "@/lib/products";
import { Button } from "@/components/ui/button";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { ArrowLeft, MessageCircle, Phone } from "lucide-react";
import { WHATSAPP_NUMBER, OWNER_NAME } from "@/lib/products";

const ProductDetail = () => {
  const { handle } = useParams<{ handle: string }>();
  const product = handle ? getProductByHandle(handle) : undefined;
  const [selectedVariantIdx, setSelectedVariantIdx] = useState(0);

  if (!product) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Navbar />
        <p className="text-muted-foreground">Product not found</p>
      </div>
    );
  }

  const variant = product.variants[selectedVariantIdx];

  const handleOrder = () => {
    window.open(getWhatsAppOrderUrl(product, variant), "_blank");
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="pt-24 pb-16 px-6">
        <div className="container mx-auto max-w-5xl">
          <Link to="/" className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors mb-8 font-body text-sm">
            <ArrowLeft className="w-4 h-4" /> Back to Collection
          </Link>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div className="aspect-square rounded-lg overflow-hidden bg-gradient-to-br from-secondary via-card to-secondary border border-border flex items-center justify-center">
              <img src={product.image} alt={product.title} className="w-full h-full object-contain p-8 drop-shadow-2xl" width={1024} height={1024} />
            </div>
            <div className="flex flex-col justify-center">
              <p className="text-primary font-body text-sm tracking-[0.3em] uppercase mb-2">{product.subtitle}</p>
              <h1 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-4">{product.title}</h1>
              <p className="text-muted-foreground font-body mb-8 leading-relaxed">{product.description}</p>

              <div className="mb-6">
                <label className="text-sm font-body text-muted-foreground mb-2 block">Size</label>
                <div className="flex gap-2">
                  {product.variants.map((v, i) => (
                    <button
                      key={v.size}
                      onClick={() => setSelectedVariantIdx(i)}
                      className={`px-4 py-2 rounded-sm border font-body text-sm transition-all ${
                        i === selectedVariantIdx
                          ? 'border-primary bg-primary/10 text-primary'
                          : 'border-border text-muted-foreground hover:border-primary/30'
                      }`}
                    >
                      {v.size}
                    </button>
                  ))}
                </div>
              </div>

              <div className="flex items-center gap-6 mb-8">
                <Button
                  onClick={handleOrder}
                  size="lg"
                  className="bg-[#25D366] hover:bg-[#1da851] text-white px-8"
                >
                  <MessageCircle className="w-4 h-4 mr-2" /> Order on WhatsApp
                </Button>
              </div>

              <div className="border-t border-border pt-6">
                <p className="text-sm text-muted-foreground font-body flex items-center gap-2">
                  <Phone className="w-4 h-4 text-primary" />
                  Contact: {OWNER_NAME} — <a href={`tel:+${WHATSAPP_NUMBER}`} className="text-primary hover:underline">+91 9509878807</a>
                </p>
              </div>
            </div>
          </div>

          <section className="mt-20">
            <div className="text-center mb-8">
              <p className="text-primary font-body text-xs tracking-[0.3em] uppercase mb-2">In the Wild</p>
              <h2 className="font-display text-2xl md:text-3xl font-bold text-gradient-gold">Lifestyle Gallery</h2>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8">
              {[
                { src: product.lifestyle.hand, label: "In Hand" },
                { src: product.lifestyle.table, label: "At the Table" },
                { src: product.lifestyle.outdoor, label: "Outdoors" },
              ].map((scene, i) => (
                <div
                  key={scene.label}
                  className={`group relative aspect-[16/10] overflow-hidden rounded-xl border border-border shadow-2xl ${
                    i === 2 ? "lg:col-span-2 lg:aspect-[21/9]" : ""
                  }`}
                >
                  <img
                    src={scene.src}
                    alt={`${product.title} — ${scene.label}`}
                    loading="lazy"
                    width={1920}
                    height={1200}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-background/70 via-transparent to-transparent" />
                  <div className="absolute bottom-5 left-6 text-foreground font-display text-lg md:text-xl tracking-wide">
                    {scene.label}
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default ProductDetail;
