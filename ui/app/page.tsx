import { HeroSection } from "@/components/landing/hero-section";
import { FeatureSection } from "@/components/landing/feature-section";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="flex-1 container mx-auto">
        <HeroSection />
        <FeatureSection />
      </main>
      <Footer />
    </div>
  );
}
