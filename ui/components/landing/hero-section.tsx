import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight, Unplug, Zap, Shield } from "lucide-react";

export function HeroSection() {
  return (
    <section className="relative py-20 md:py-28">
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute left-1/3 top-1/4 -z-10 h-[30rem] w-[30rem] rounded-full bg-gradient-to-r from-purple-600/20 to-indigo-600/20 blur-[128px]" />
        <div className="absolute right-1/3 bottom-1/4 -z-10 h-[30rem] w-[30rem] rounded-full bg-gradient-to-l from-blue-600/20 to-cyan-600/20 blur-[128px]" />
      </div>

      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-10 text-center">
          <div className="inline-flex items-center rounded-full border border-green-400 px-4 py-1 text-sm font-semibold text-green-800 backdrop-blur">
            <span className="relative flex h-2 w-2 mr-2">
              <span className="absolute inline-flex h-full w-full rounded-full bg-gradient-to-tr from-green-300 to-green-600 opacity-80 animate-ping"></span>
              <span className="relative inline-flex h-2 w-2 rounded-full bg-gradient-to-tr from-green-500 to-green-700"></span>
            </span>
            <span className="dark:text-white text-black">
              MVP launching this June
            </span>
          </div>
          <div className="space-y-4 max-w-[42rem]">
            <h1 className="font-bold text-4xl md:text-5xl lg:text-5xl">
              Seamlessly queue emails from your app with <br />
              <span className="bg-gradient-to-r from-blue-400 via-purple-500 to-indigo-600 bg-clip-text text-transparent">
                Queuetie
              </span>
            </h1>
            <p className="mx-auto max-w-[85%] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              Integrate a robust email queueing system into your applications
              with a plug and play API.
            </p>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-4">
            <Link href="/login">
                <Button
                size="lg"
                variant="default"
                className="group"
                >
                Try Queuetie
                <ArrowRight className="ml-1 h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" />
                </Button>
            </Link>
            <Link href="/docs">
              <Button size="lg" variant="outline">
                Read Documentation
              </Button>
            </Link>
          </div>

          <div className="mx-auto mt-8 grid max-w-5xl grid-cols-1 md:grid-cols-3 gap-4 md:gap-8">
            <div className="flex flex-col items-center space-y-2 rounded-xl border border-border/60 bg-card/50 p-4 backdrop-blur-sm">
              <div className="rounded-full border border-border/60 bg-background/80 p-2.5">
                <Unplug className="h-5 w-5 text-primary" />
              </div>
              <h3 className="text-sm font-medium">Simple Integration</h3>
              <p className="text-xs text-muted-foreground text-center">
                Plug and play with our easy-to-use API
              </p>
            </div>

            <div className="flex flex-col items-center space-y-2 rounded-xl border border-border/60 bg-card/50 p-4 backdrop-blur-sm">
              <div className="rounded-full border border-border/60 bg-background/80 p-2.5">
                <Zap className="h-5 w-5 text-primary" />
              </div>
              <h3 className="text-sm font-medium">Lightning Fast</h3>
              <p className="text-xs text-muted-foreground text-center">
                Emails queued in fractions of a second
              </p>
            </div>

            <div className="flex flex-col items-center space-y-2 rounded-xl border border-border/60 bg-card/50 p-4 backdrop-blur-sm">
              <div className="rounded-full border border-border/60 bg-background/80 p-2.5">
                <Shield className="h-5 w-5 text-primary" />
              </div>
              <h3 className="text-sm font-medium">Secure & Reliable</h3>
              <p className="text-xs text-muted-foreground text-center">
                Enterprise-grade security and uptime
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
