import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { storefrontApiRequest, PRODUCT_BY_HANDLE_QUERY } from "@/lib/shopify";
import { useCartStore } from "@/stores/cartStore";
import { Button } from "@/components/ui/button";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { ArrowLeft, ShoppingCart, Loader2 } from "lucide-react";
import { toast } from "sonner";

const ProductDetail = () => {
  const { handle } = useParams<{ handle: string }>();
  const [product, setProduct] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [selectedVariantIdx, setSelectedVariantIdx] = useState(0);
  const addItem = useCartStore(state => state.addItem);
  const isLoading = useCartStore(state => state.isLoading);

  useEffect(() => {
    async function fetch_() {
      try {
        const data = await storefrontApiRequest(PRODUCT_BY_HANDLE_QUERY, { handle });
        setProduct(data?.data?.productByHandle);
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    }
    if (handle) fetch_();
  }, [handle]);

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <p className="text-muted-foreground">Product not found</p>
      </div>
    );
  }

  const variant = product.variants.edges[selectedVariantIdx]?.node;
  const image = product.images.edges[0]?.node;

  const handleAddToCart = async () => {
    if (!variant) return;
    await addItem({
      product: { node: product },
      variantId: variant.id,
      variantTitle: variant.title,
      price: variant.price,
      quantity: 1,
      selectedOptions: variant.selectedOptions || [],
    });
    toast.success("Added to cart", { description: product.title, position: "top-center" });
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
            <div className="aspect-square rounded-lg overflow-hidden bg-card border border-border">
              {image && (
                <img src={image.url} alt={image.altText || product.title} className="w-full h-full object-cover" />
              )}
            </div>
            <div className="flex flex-col justify-center">
              <p className="text-primary font-body text-sm tracking-[0.3em] uppercase mb-2">ELEVATE Water Co.</p>
              <h1 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-4">{product.title}</h1>
              <p className="text-muted-foreground font-body mb-8 leading-relaxed">{product.description}</p>

              {product.options?.length > 0 && product.options[0].name !== "Title" && (
                <div className="mb-6">
                  <label className="text-sm font-body text-muted-foreground mb-2 block">{product.options[0].name}</label>
                  <div className="flex gap-2">
                    {product.variants.edges.map((v: any, i: number) => (
                      <button
                        key={v.node.id}
                        onClick={() => setSelectedVariantIdx(i)}
                        className={`px-4 py-2 rounded-sm border font-body text-sm transition-all ${
                          i === selectedVariantIdx
                            ? 'border-primary bg-primary/10 text-primary'
                            : 'border-border text-muted-foreground hover:border-primary/30'
                        }`}
                      >
                        {v.node.title}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              <div className="flex items-center gap-6">
                <span className="text-primary font-display text-3xl font-bold">
                  ₹{variant ? parseFloat(variant.price.amount).toFixed(0) : '—'}
                </span>
                <Button
                  onClick={handleAddToCart}
                  disabled={isLoading || !variant}
                  size="lg"
                  className="bg-gradient-gold text-primary-foreground hover:opacity-90 px-8"
                >
                  {isLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : <><ShoppingCart className="w-4 h-4 mr-2" /> Add to Cart</>}
                </Button>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default ProductDetail;
