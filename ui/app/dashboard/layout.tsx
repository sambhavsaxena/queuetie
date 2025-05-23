import { Metadata } from "next";
import { DashboardNav } from "@/components/dashboard/dashboard-nav";
import { Header } from "@/components/header";
import { cookies } from "next/headers";
import { Footer } from "@/components/layout/footer";

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
    <div className="flex flex-col">
      <Header token={token} />
      <div className="container flex-1 items-start md:grid md:grid-cols-[220px_1fr] md:gap-6 lg:grid-cols-[240px_1fr] lg:gap-10 py-6">
        <aside className="fixed top-20 z-30 -ml-2 hidden h-[calc(100vh-5rem)] w-full shrink-0 md:sticky md:block">
          <DashboardNav />
        </aside>
        <main className="flex w-full flex-col overflow-hidden">{children}</main>
      </div>
      <Footer/>
    </div>
  );
}
