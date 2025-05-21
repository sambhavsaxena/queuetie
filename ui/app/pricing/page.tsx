import { Header } from "@/components/header";
import { Footer } from "@/components/layout/footer";
import { cookies } from "next/headers";
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";

const plans = [
  {
    name: "Free",
    price: "$0",
    mails: "50 mails/month",
    features: [
      "Basic email support",
      "Access to dashboard",
      "Community support",
    ],
    cta: "Get Started",
    url: "/login",
  },
  {
    name: "Pro",
    price: "$20",
    mails: "5,000 mails/month",
    features: ["Priority support", "API access", "Analytics"],
    cta: "Subscribe",
    url: "/contact",
  },
  {
    name: "Enterprise",
    price: "$200",
    mails: "100,000 mails/month",
    features: ["Dedicated support", "Custom integrations", "SLAs"],
    cta: "Contact Sales",
    url: "/contact",
  },
];

export default function PricingPage() {
  const token = cookies().get("token")?.value ?? "";

  return (
    <div className="flex min-h-screen flex-col">
      <Header token={token} />
      <main className="flex-1 py-20 px-4 md:px-10">
        <h1 className="text-4xl font-bold text-center mb-4">
          Choose Your Plan
        </h1>
        <p className="text-center mb-12">
          Simple pricing for everyone. No hidden fees.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {plans.map((plan) => (
            <Card key={plan.name} className="border border-gray-800">
              <CardContent className="p-6">
                <h2 className="text-2xl font-semibold mb-2">{plan.name}</h2>
                <p className="text-3xl font-bold mb-1">{plan.price}</p>
                <p className="text-sm text-gray-400 mb-4">{plan.mails}</p>
                <ul className="mb-6 space-y-2">
                  {plan.features.map((feature, index) => (
                    <li key={index} className="flex items-center">
                      <Check className="w-4 h-4 text-green-500 mr-2" />
                      {feature}
                    </li>
                  ))}
                </ul>
                <Link href={plan.url}>
                  <Button className="w-full">{plan.cta}</Button>
                </Link>
              </CardContent>
            </Card>
          ))}
        </div>
      </main>
      <Footer />
    </div>
  );
}
