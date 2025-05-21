import { HeroSection } from "@/components/landing/hero-section";
import { FeatureSection } from "@/components/landing/feature-section";
import { Footer } from "@/components/layout/footer";
import { cookies } from "next/headers";
import { Header } from "@/components/header";

export default function Home() {
  const token = cookies().get("token")?.value ?? "";
  return (
    <div className="flex min-h-screen flex-col">
      <Header token={token} />
      <main className="flex-1 container mx-auto">
        <HeroSection />
        <FeatureSection />
      </main>
      <Footer />
    </div>
  );
}
