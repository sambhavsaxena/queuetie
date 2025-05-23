import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";

const plans = [
  {
    name: "Free",
    price: "₹0",
    mails: "50 mails/month",
    features: ["Dashboard access", "Basic email support", "Community support"],
    cta: "Get Started",
    url: "/dashboard",
  },
  {
    name: "Beginner",
    price: "₹1,000",
    mails: "10k mails/month",
    features: [
      "Dashboard access",
      "API access",
      "Basic analytics",
      "Priority support",
    ],
    cta: "Subscribe",
    url: "/checkout?plan=Beginner",
  },
  {
    name: "Professional",
    price: "₹10,000",
    mails: "100k mails/month",
    features: [
      "Dashboard access",
      "API access",
      "Advanced analytics",
      "Custom integrations",
      "Dedicated support",
    ],
    cta: "Subscribe",
    url: "/checkout?plan=Professional",
  },
  {
    name: "Enterprise",
    price: "₹xxxx",
    mails: "Upto 10M mails/month",
    features: [
      "Dashboard access",
      "API access",
      "Advanced analytics",
      "Custom integrations",
      "Dedicated support",
      "Feature requests",
      "SLAs",
    ],
    cta: "Contact Sales",
    url: "/contact",
  },
];

export default function Plans() {
  return (
    <main className="flex-1 py-20 px-4 md:px-10 min-h-screen">
      <h1 className="text-4xl font-bold text-center mb-4">Choose Your Plan</h1>
      <p className="text-center mb-12">
        Simple pricing for everyone. <br />
        No hidden fees.
      </p>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
        {plans.map((plan) => (
          <Card key={plan.name} className="border border-gray-800">
            <CardContent className="p-6 flex flex-col h-full">
              <div>
                <h2 className="text-2xl font-semibold mb-2">{plan.name}</h2>
                <p className="text-3xl font-bold mb-1">{plan.price}</p>
                <p className="text-sm text-gray-400 mb-4">{plan.mails}</p>
                <ul className="mb-6 space-y-2 flex flex-col justify-center align-middle">
                  {plan.features.map((feature, index) => (
                    <li key={index} className="flex items-center">
                      <Check className="w-4 h-4 text-green-500 mr-2" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
              <Link href={plan.url} className="mt-auto">
                <Button className="w-full">{plan.cta}</Button>
              </Link>
            </CardContent>
          </Card>
        ))}
      </div>
      <div className="mt-20 lg:px-60">
        <div className="text-center text-sm text-gray-600 leading-relaxed pt-6">
          * Each plan includes a specific mail sending limit per month. If you
          exceed your plan&apos;s mail limit, your API capabilities may be
          temporarily suspended until the next billing cycle or plan upgrade.
          Details on overage charges, if any, will be separately communicated.
        </div>
        <div className="text-center text-sm text-gray-600 leading-relaxed pt-6">
          * Service Level Agreements are exclusively offered to Enterprise
          subscribers, outlining guaranteed service levels and performance
          metrics.
        </div>
        <div className="text-center text-sm text-gray-600 leading-relaxed pt-6">
          * You may upgrade or downgrade your plan at any time through your
          dashboard. Changes to your plan may result in pro-rata billing
          adjustments.
        </div>
      </div>
    </main>
  );
}
