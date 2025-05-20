import { LoginForm } from "@/components/auth/login-form";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";

export default function LoginPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="flex-1 flex items-center justify-center py-12">
        <div className="w-full max-w-md px-4">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold mb-2">Namaste 🙏🏻</h1>
            <p className="text-muted-foreground">
              Log in to your Queuetie account
            </p>
          </div>
          <LoginForm />
        </div>
      </main>
      <Footer />
    </div>
  );
}
