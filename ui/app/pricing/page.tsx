import { Header } from "@/components/header";
import { Footer } from "@/components/layout/footer";
import Plans from "@/components/plans";
import { cookies } from "next/headers";

export default function PricingPage() {
  const token = cookies().get("token")?.value ?? "";

  return (
    <div className="flex flex-col text-center">
      <Header token={token} />
      <Plans />
      <Footer />
    </div>
  );
}
