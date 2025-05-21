import { Metadata } from "next";
import { ApiDocs } from "@/components/docs/api-docs";
import { Header } from "@/components/header";
import { Footer } from "@/components/layout/footer";
import { cookies } from "next/headers";

export const metadata: Metadata = {
  title: "Documentation - Queuetie",
  description:
    "API documentation for Queuetie - An open source email queueing system for your production environments.",
};

export default function DocsPage() {
  const token = cookies().get("token")?.value ?? "";
  return (
    <div className="flex min-h-screen flex-col">
      <Header token={token} />
      <main className="flex-1 container py-12">
        <ApiDocs />
      </main>
      <Footer />
    </div>
  );
}
