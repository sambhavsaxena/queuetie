"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ModeToggle } from "@/components/mode-toggle";
import { Crown, Menu } from "lucide-react";
import { useRouter } from "next/navigation";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

interface HeaderProps {
  token: string;
}

export function Header({ token }: HeaderProps) {
  const router = useRouter();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [subscription, setSubscription] = useState<string | null>(null);
  useEffect(() => {
    if (token) {
      fetch("/api/user/get", { credentials: "include" })
        .then((res) => res.json())
        .then((data) => {
          setSubscription(data?.user?.subscription);
        })
        .catch((err) => console.error("Failed to fetch user", err));
    }
  }, [router, token]);

  const handleLogout = () => {
    fetch("/api/user/logout", {
      method: "POST",
      credentials: "include",
    })
      .then((res) => {
        if (res.ok) {
          router.refresh();
          router.push("/");
        }
      })
      .catch((err) => {
        console.error("Logout failed", err);
      });
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-2">
          <Link href="/" className="flex items-center gap-2">
            <span className="text-xl font-bold">
              {(subscription && subscription !== "Free") && <Crown height={15} width={15} className="text-yellow-500"/>}Queuetie
            </span>
          </Link>
        </div>
        <nav className="hidden md:flex items-center gap-6">
          <Link
            href="/docs"
            className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
          >
            Documentation
          </Link>
          <Link
            href="/dashboard"
            className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
          >
            Dashboard
          </Link>
        </nav>
        <div className="flex items-center gap-4">
          {!token ? (
            <div className="hidden md:flex items-center gap-4">
              <Link href="/login">
                <Button variant="outline">Log in</Button>
              </Link>
            </div>
          ) : (
            <div className="hidden md:flex items-center gap-4">
              <Button onClick={handleLogout} variant="outline">
                Log Out
              </Button>
            </div>
          )}
          <ModeToggle />
          <Sheet open={isMenuOpen} onOpenChange={setIsMenuOpen}>
            <SheetTrigger asChild className="md:hidden">
              <Button variant="outline" size="icon">
                <Menu className="h-6 w-6" />
                <span className="sr-only">Toggle menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[80%] sm:w-[350px]">
              <div className="flex flex-col gap-4 py-4">
                <Link
                  href="/docs"
                  className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Documentation
                </Link>
                <Link
                  href="/dashboard"
                  className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Dashboard
                </Link>
                {token ? (
                  <div className="mt-4 flex flex-col gap-2">
                    <Button
                      onClick={handleLogout}
                      variant="outline"
                      className="w-full"
                    >
                      Log Out
                    </Button>
                  </div>
                ) : (
                  <div className="mt-4 flex flex-col gap-2">
                    <Link href="/login" onClick={() => setIsMenuOpen(false)}>
                      <Button variant="outline" className="w-full">
                        Log in
                      </Button>
                    </Link>
                  </div>
                )}
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
