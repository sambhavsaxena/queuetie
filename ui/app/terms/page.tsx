import { Header } from "@/components/header";
import { Footer } from "@/components/layout/footer";
import { cookies } from "next/headers";

export default function TermsPage() {
  const token = cookies().get("token")?.value ?? "";
  return (
    <div className="flex flex-col">
      <Header token={token} />
      <main className="flex-1 flex items-center min-h-screen justify-center py-12">
        <div className="w-full max-w-md px-4">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold mb-2">Terms of use</h1>
            <p className="text-muted-foreground">
              Writing terms of use soon.
            </p>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
