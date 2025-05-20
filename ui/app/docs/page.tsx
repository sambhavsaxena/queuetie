import { Metadata } from "next";
import { ApiDocs } from "@/components/docs/api-docs";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";

export const metadata: Metadata = {
  title: "Documentation - Queuetie",
  description:
    "API documentation for Queuetie - An open source email queueing system for your production environments.",
};

export default function DocsPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="flex-1 container py-12">
        <ApiDocs />
      </main>
      <Footer />
    </div>
  );
}
