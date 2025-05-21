import { LoginForm } from "@/components/auth/login-form";
import { Header } from "@/components/header";
import { Footer } from "@/components/layout/footer";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export default function LoginPage() {
  const token = cookies().get("token")?.value ?? "";
  if(token) {
    redirect("/dashboard");
  }
  return (
    <div className="flex min-h-screen flex-col">
      <Header token={token} />
      <main className="flex-1 flex items-center justify-center py-12">
        <div className="w-full max-w-md px-4">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold mb-2">Namaste 🙏🏻</h1>
            <p className="text-muted-foreground">
              Access your Queuetie account
            </p>
          </div>
          <LoginForm />
        </div>
      </main>
      <Footer />
    </div>
  );
}
