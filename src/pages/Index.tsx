import { Navbar } from "@/components/Navbar";
import { PromoBanner } from "@/components/PromoBanner";
import { HeroSection } from "@/components/HeroSection";
import { WaveDivider } from "@/components/WaveDivider";
import { ProductsSection } from "@/components/ProductsSection";
import { AboutSection } from "@/components/AboutSection";
import { Footer } from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <PromoBanner />
      <HeroSection />
      <WaveDivider />
      <ProductsSection />
      <WaveDivider flip />
      <AboutSection />
      <Footer />
    </div>
  );
};

export default Index;
