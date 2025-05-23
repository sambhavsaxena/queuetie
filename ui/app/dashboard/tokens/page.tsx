import { TokensList } from "@/components/dashboard/tokens/tokens-list";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import Link from "next/link";

export default function TokensPage() {
  return (
    <div className="flex flex-col gap-8">
      <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">API Tokens</h1>
          <p className="text-muted-foreground">
            Create and manage your API tokens
          </p>
        </div>
        <Link href="/dashboard/tokens/new">
          <Button className="gap-1">
            <Plus className="h-4 w-4" />
            New API Token
          </Button>
        </Link>
      </div>
      <div className="rounded-xl border border-border/60 bg-card/30 p-6 backdrop-blur-sm">
        <TokensList />
      </div>
    </div>
  );
}
