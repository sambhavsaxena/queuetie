import { DashboardStats } from "@/components/dashboard/dashboard-stats";
import { RecentActivity } from "@/components/dashboard/recent-activity";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import Link from "next/link";
import { redirect } from "next/navigation";
import {cookies} from "next/headers";

export default function DashboardPage() {
  const token = cookies().get("token")?.value ?? "";
  if (!token) {
    redirect("/login");
  }
  return (
    <div className="flex flex-col gap-8">
      <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
          <p className="text-muted-foreground">
            Overview of your API usage and recent activity
          </p>
        </div>

        <Link href="/dashboard/tokens/new">
          <Button className="gap-1">
            <Plus className="h-4 w-4" />
            New API Token
          </Button>
        </Link>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <DashboardStats />
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <div className="rounded-xl border border-border/60 bg-card/30 p-6 backdrop-blur-sm">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-semibold text-lg">Recent Activity</h2>
            <Link
              href="/dashboard/activity"
              className="text-sm text-primary hover:underline"
            >
              View all
            </Link>
          </div>
          <RecentActivity />
        </div>

        <div className="rounded-xl border border-border/60 bg-card/30 p-6 backdrop-blur-sm">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-semibold text-lg">Quick Start</h2>
          </div>

          <div className="space-y-4">
            <div className="rounded-lg bg-background/70 p-4">
              <h3 className="font-medium mb-2">1. Generate an API token</h3>
              <p className="text-sm text-muted-foreground mb-3">
                Create a new API token in the Tokens section
              </p>
              <Link href="/dashboard/tokens/new">
                <Button size="sm" variant="outline">
                  Create Token
                </Button>
              </Link>
            </div>

            <div className="rounded-lg bg-background/70 p-4">
              <h3 className="font-medium mb-2">2. Test in the playground</h3>
              <p className="text-sm text-muted-foreground mb-3">
                Send a test email using our playground
              </p>
              <Link href="/dashboard/playground">
                <Button size="sm" variant="outline">
                  Go to Playground
                </Button>
              </Link>
            </div>

            <div className="rounded-lg bg-background/70 p-4">
              <h3 className="font-medium mb-2">3. Integrate with your app</h3>
              <p className="text-sm text-muted-foreground mb-3">
                View our documentation to integrate with your application
              </p>
              <Link href="/docs">
                <Button size="sm" variant="outline">
                  View Docs
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
