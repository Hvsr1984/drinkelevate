import { Navbar } from "@/components/Navbar";
import { PromoBanner } from "@/components/PromoBanner";
import { HeroSection } from "@/components/HeroSection";
import { WaveDivider } from "@/components/WaveDivider";
import { WhyElevateSection } from "@/components/WhyElevateSection";
import { BottleShowcaseSection } from "@/components/BottleShowcaseSection";
import { ProductsSection } from "@/components/ProductsSection";
import { LifestyleSection } from "@/components/LifestyleSection";
import { AboutSection } from "@/components/AboutSection";
import { TrustSection } from "@/components/TrustSection";
import { DistributorSection } from "@/components/DistributorSection";
import { InstagramSection } from "@/components/InstagramSection";
import { Footer } from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <PromoBanner />
      <HeroSection />
      <WaveDivider />
      <WhyElevateSection />
      <BottleShowcaseSection />
      <ProductsSection />
      <WaveDivider flip />
      <LifestyleSection />
      <AboutSection />
      <TrustSection />
      <DistributorSection />
      <InstagramSection />
      <Footer />
    </div>
  );
};

export default Index;
