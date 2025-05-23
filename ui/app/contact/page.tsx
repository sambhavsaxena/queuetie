import { Header } from "@/components/header";
import { Footer } from "@/components/layout/footer";
import { cookies } from "next/headers";
import Contact from "@/components/contact";

export default function LoginPage() {
  const token = cookies().get("token")?.value ?? "";
  return (
    <div className="flex min-h-screen flex-col">
      <Header token={token} />
      <main className="flex-1 flex items-center min-h-screen justify-center py-12">
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
