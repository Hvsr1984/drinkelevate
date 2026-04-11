import pureImg from "@/assets/products/pure.jpg";
import sparklingImg from "@/assets/products/sparkling.jpg";
import mineralsImg from "@/assets/products/minerals.jpg";
import alkalineImg from "@/assets/products/alkaline.jpg";
import glacierImg from "@/assets/products/glacier.jpg";
import coconutImg from "@/assets/products/coconut.jpg";

export interface Product {
  id: string;
  handle: string;
  title: string;
  subtitle: string;
  description: string;
  image: string;
  variants: {
    size: string;
    price: number;
  }[];
}

export const WHATSAPP_NUMBER = "919509878807";
export const OWNER_NAME = "Harshvardhan Singh Rajawat";

export function getWhatsAppOrderUrl(product: Product, variant?: { size: string; price: number }) {
  const v = variant || product.variants[0];
  const message = encodeURIComponent(
    `Hi, I'd like to order:\n\n🍶 *${product.title}* (${v.size})\n💰 ₹${v.price}\n\nPlease confirm availability and delivery details.`
  );
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${message}`;
}

export const products: Product[] = [
  {
    id: "pure",
    handle: "pure",
    title: "ELEVATE Pure",
    subtitle: "Still Water",
    description: "Crystal-clear still water sourced from pristine natural springs. Triple-filtered for absolute purity with a perfectly balanced mineral profile that delivers smooth, clean hydration.",
    image: pureImg,
    variants: [
      { size: "500ml", price: 149 },
      { size: "750ml", price: 199 },
      { size: "1L", price: 249 },
    ],
  },
  {
    id: "sparkling",
    handle: "sparkling",
    title: "ELEVATE Sparkling",
    subtitle: "Soda Water",
    description: "Fine carbonation meets premium purity. Our sparkling water delivers an effervescent experience with micro-bubbles that dance on your palate — refreshing, crisp, and sophisticated.",
    image: sparklingImg,
    variants: [
      { size: "500ml", price: 169 },
      { size: "750ml", price: 219 },
      { size: "1L", price: 269 },
    ],
  },
  {
    id: "minerals",
    handle: "minerals-plus",
    title: "ELEVATE Minerals+",
    subtitle: "Enhanced Water",
    description: "Enriched with essential minerals including calcium, magnesium, and potassium. Designed for active lifestyles, every sip replenishes what your body needs to perform at its peak.",
    image: mineralsImg,
    variants: [
      { size: "500ml", price: 189 },
      { size: "750ml", price: 249 },
      { size: "1L", price: 299 },
    ],
  },
  {
    id: "alkaline",
    handle: "alkaline",
    title: "ELEVATE Alkaline",
    subtitle: "pH Balanced",
    description: "Precision-balanced to pH 9.5+ for optimal hydration. Our alkaline water supports your body's natural balance with ionized minerals that promote vitality and wellness.",
    image: alkalineImg,
    variants: [
      { size: "500ml", price: 199 },
      { size: "750ml", price: 259 },
      { size: "1L", price: 319 },
    ],
  },
  {
    id: "glacier",
    handle: "glacier",
    title: "ELEVATE Glacier",
    subtitle: "Arctic Spring",
    description: "Sourced from ancient glacial springs untouched for millennia. This ultra-pure water carries the essence of arctic freshness — naturally cold-filtered through layers of pristine ice.",
    image: glacierImg,
    variants: [
      { size: "500ml", price: 199 },
      { size: "750ml", price: 259 },
      { size: "1L", price: 319 },
    ],
  },
  {
    id: "coconut",
    handle: "coconut",
    title: "ELEVATE Coconut",
    subtitle: "Tropical Hydration",
    description: "Premium coconut water blended with our signature purified base. Naturally rich in electrolytes, potassium, and tropical flavor — the ultimate refreshment for body and soul.",
    image: coconutImg,
    variants: [
      { size: "500ml", price: 189 },
      { size: "750ml", price: 249 },
      { size: "1L", price: 299 },
    ],
  },
];

export function getProductByHandle(handle: string): Product | undefined {
  return products.find(p => p.handle === handle);
}
