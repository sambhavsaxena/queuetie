"use client";

import { useEffect, useState, useRef } from "react";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
import { LockKeyholeOpen } from "lucide-react";
import Image from "next/image";

export default function VerifyPage() {
  const router = useRouter();
  const [status, setStatus] = useState<
    "idle" | "loading" | "success" | "error"
  >("loading");
  const [message, setMessage] = useState<string>("Verifying your email...");

  const hasRun = useRef(false);

  useEffect(() => {
    if (hasRun.current) return;
    hasRun.current = true;

    let token: string | null = null;
    if (typeof window !== "undefined") {
      token = new URL(window.location.href).searchParams.get("token");
    }

    const verify = async () => {
      if (!token) {
        setStatus("error");
        setMessage("No token found in URL.");
        return;
      }

      setStatus("loading");
      setMessage("Verifying your email");

      try {
        const res = await fetch(`/api/user/verify?token=${token}`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
          body: JSON.stringify({ token }),
        });

        const data = await res.json();

        if (res.ok) {
          if (data.token) {
            Cookies.set("token", data.token, {
              expires: 30,
              secure: true,
              sameSite: "strict",
            });
          }

          setStatus("success");
          setMessage(data.message + " Redirecting to dashboard");

          setTimeout(() => {
            router.push("/dashboard");
          }, 3000);
        } else {
          setStatus("error");
          setMessage(data.error || "Verification failed.");
        }
      } catch (error) {
        setStatus("error");
        setMessage("Error: " + (error as Error).message);
      }
    };

    verify();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const spinner = (
    <span className="relative flex items-center">
      <LockKeyholeOpen className="animate-spin h-4 w-4" />
    </span>
  );
  const successIcon = (
    <span className="relative flex items-center">
      <LockKeyholeOpen className="h-4 w-4 text-green-500" />
    </span>
  );
  const errorIcon = (
    <span className="relative flex items-center">
      <LockKeyholeOpen className="h-4 w-4 text-red-500" />
    </span>
  );

  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
        <div className="text-center">
          <div className="flex items-center justify-center">
            <Image
              src="/queuetie.png"
              alt="Queuetie Logo"
              width={150}
              height={150}
            />
          </div>
          <p className="text-muted-foreground flex items-center justify-center gap-2">
            {status === "loading" && spinner}
            {status === "success" && successIcon}
            {status === "error" && errorIcon}
            {status === "error" ? (
              message
            ) : (
              <>
                {message}
                <span className="inline-block animate-pulse">.</span>
                <span
                  className="inline-block animate-pulse"
                  style={{ animationDelay: "0.2s" }}
                >
                  .
                </span>
                <span
                  className="inline-block animate-pulse"
                  style={{ animationDelay: "0.4s" }}
                >
                  .
                </span>
              </>
            )}
          </p>
        </div>
      </div>
    </div>
  );
}
