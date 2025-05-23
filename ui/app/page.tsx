import { HeroSection } from "@/components/landing/hero-section";
import { FeatureSection } from "@/components/landing/feature-section";
import { Footer } from "@/components/layout/footer";
import { cookies } from "next/headers";
import { Header } from "@/components/header";
import Contact from "@/components/contact";
import Plans from "@/components/plans";

export default function Home() {
  const token = cookies().get("token")?.value ?? "";
  return (
    <div className="flex flex-col">
      <Header token={token} />
      <main className="flex-1 min-h-screen container mx-auto">
        <HeroSection />
        <FeatureSection />
        {!token && <Plans />}
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
