import { Metadata } from "next";
import { DashboardNav } from "@/components/dashboard/dashboard-nav";
import { UserNav } from "@/components/dashboard/user-nav";
import { ModeToggle } from "@/components/mode-toggle";
import Link from "next/link";
import { cookies } from "next/headers";

export const metadata: Metadata = {
  title: "Dashboard - Queuetie",
  description: "Manage your email sending API",
};

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const token = cookies().get("token")?.value ?? "";
  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between">
          <div className="flex items-center gap-2">
            <Link href="/" className="flex items-center gap-2">
              <span className="text-xl font-bold">Queuetie</span>
            </Link>
          </div>

          <div className="flex items-center gap-4">
            <ModeToggle />
            <UserNav token={token} />
          </div>
        </div>
      </header>

      <div className="container flex-1 items-start md:grid md:grid-cols-[220px_1fr] md:gap-6 lg:grid-cols-[240px_1fr] lg:gap-10 py-6">
        <aside className="fixed top-20 z-30 -ml-2 hidden h-[calc(100vh-5rem)] w-full shrink-0 md:sticky md:block">
          <DashboardNav />
        </aside>
        <main className="flex w-full flex-col overflow-hidden">{children}</main>
      </div>
    </div>
  );
}
