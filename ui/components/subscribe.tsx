"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useToast } from "@/hooks/use-toast";

declare global {
  interface Window {
    Razorpay: any;
  }
}

const loadRazorpayScript = (): Promise<boolean> => {
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
  subscription_id: string,
  subscription_plan: string,
  transaction: any
) => {
  try {
    const res = await fetch("/api/subscription/razorpay", {
      method: "PUT",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ subscription_id, subscription_plan, transaction }),
    });
    return await res.json();
  } catch (err) {
    return { error: "Failed to activate subscription" };
  }
};

export default function Payment({ plan }: PaymentProps) {
  const router = useRouter();
  const [status, setStatus] = useState("");
  const { toast } = useToast();

  useEffect(() => {
    const handlePayment = async (plan: string) => {
      const razorpayLoaded = await loadRazorpayScript();
      if (!razorpayLoaded) {
        toast({
          title: "Error",
          description: "Failed to load Razorpay SDK",
          variant: "destructive",
        });
        router.push("/pricing");
        return;
      }

      let data: any;

      try {
        const res = await fetch("/api/subscription/razorpay", {
          method: "POST",
          credentials: "include",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ plan }),
        });

        data = await res.json();
        if (
          !res.ok ||
          !data ||
          !data.order_id ||
          !data.amount ||
          !data.currency
        ) {
          throw new Error(data?.error || "Invalid response from server");
        }
      } catch (err: any) {
        toast({
          title: "Error",
          description: err.message || "Something went wrong",
          variant: "destructive",
        });
        router.push("/pricing");
        return;
      }

      const user = data.user || {};
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

          const result = await activate_order(data._id, plan, response);
          if (result.error) {
            toast({
              title: "Subscription Activation Failed",
              description: result.error,
              variant: "destructive",
            });
          } else {
            toast({
              title: "Subscription Activated",
              description: result.message || "Your subscription is now active.",
              variant: "success",
            });
          }

          setStatus("success");
        },
        prefill: {
          name: user.id || "",
          email: user.email || "",
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
          description: response?.error?.description || "Transaction failed.",
          variant: "destructive",
        });
        setStatus("failed");
        router.push("/pricing");
      });

      paymentObject.open();
    };

    handlePayment(plan);
  }, [router, toast, plan]);

  useEffect(() => {
    if (status === "success") {
      router.push("/dashboard");
    }
  }, [status, router]);

  return (
    <div className="min-h-screen flex items-center justify-center">
      {status === "" && <p>Awaiting payment confirmation...</p>}
      {status === "cancelled" && <p>Payment cancelled by user.</p>}
      {status === "failed" && <p>Payment failed. Please try again.</p>}
      {status === "success" && <p>Redirecting to dashboard...</p>}
    </div>
  );
}
