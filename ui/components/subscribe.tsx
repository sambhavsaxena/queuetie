"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useToast } from "@/hooks/use-toast";

declare global {
  interface Window {
    Razorpay: any;
  }
}

const loadRazorpayScript = () => {
  return new Promise((resolve) => {
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.onload = () => resolve(true);
    script.onerror = () => resolve(false);
    document.body.appendChild(script);
  });
};

export interface PaymentProps {
  plan: string;
}

const activate_order = async (
  subscription_id: String,
  subscription_plan: String,
  transaction: any
) => {
  const data = await fetch("/api/subscription/razorpay", {
    method: "PUT",
    credentials: "include",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ subscription_id, subscription_plan, transaction }),
  }).then((t) => t.json());
  return data;
};

export default function Payment({ plan }: PaymentProps) {
  const router = useRouter();
  const [status, setStatus] = useState("");
  const { toast } = useToast();

  useEffect(() => {
    const handlePayment = async (plan: string) => {
      const res = await loadRazorpayScript();
      if (!res) return alert("Razorpay SDK failed to load");

      const data = await fetch("/api/subscription/razorpay", {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ plan }),
      }).then((t) => t.json());

      const options = {
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
        currency: data.currency,
        amount: data.amount,
        order_id: data.order_id,
        name: `Queuetie ${plan} plan`,
        description: `Payment for ${plan} plan`,
        image: "/queuetie.png",
        handler: async function (response: any) {
          toast({
            title: "Success",
            description: `Payment successful. Transaction ID: ${response.razorpay_payment_id}`,
            variant: "default",
          });
          const res = await activate_order(data._id, plan, response);
          if (res.error) {
            toast({
              title: "Activating subscription failed",
              description: `${res.error}`,
              variant: "destructive",
            });
          } else {
            toast({
              title: "Subscription activated",
              description: `${res.message}`,
              variant: "success",
            });
          }
          setStatus("success");
        },
        prefill: {
          name: data.user.id,
          email: data.user.email,
          contact: "",
        },
        modal: {
          ondismiss: function () {
            toast({
              title: "Cancelled",
              description: "Payment popup was closed.",
              variant: "destructive",
            });
            setStatus("cancelled");
            router.push("/pricing");
          },
        },
      };
      const paymentObject = new window.Razorpay(options);
      paymentObject.on("payment.failed", function (response: any) {
        toast({
          title: "Payment Failed",
          description: response.error.description || "Transaction failed.",
          variant: "destructive",
        });
        setStatus("failed");
        router.push("/pricing");
      });

      paymentObject.open();
    };

    handlePayment(plan);
  }, [router, toast, plan]);

  if (status === "success") {
    router.push("/dashboard");
  }

  return (
    <div className="min-h-screen flex items-center justify-center">
      {status === "" ? (
        <p>Awaiting payment confirmation...</p>
      ) : status === "cancelled" ? (
        <p>Payment cancelled by user.</p>
      ) : status === "failed" ? (
        <p>Payment failed. Please try again.</p>
      ) : (
        <p>Redirecting...</p>
      )}
    </div>
  );
}
