import { Header } from "@/components/header";
import { Footer } from "@/components/layout/footer";
import { cookies } from "next/headers";

export default function Status() {
  const token = cookies().get("token")?.value ?? "";
  return (
    <div className="flex min-h-screen flex-col">
      <Header token={token} />
      <main className="flex-1 flex items-center justify-center py-12">
        <div className="w-full max-w-md px-4">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold mb-2">Status</h1>
            <p className="text-muted-foreground">
              Going nowhere.
            </p>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
