"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { useToast } from "@/hooks/use-toast";
import { Copy, Search, Trash2, Key, Plus } from "lucide-react";

type Token = {
  id: string;
  identifier: string;
  key: string;
  createdAt: string;
  updatedAt: string;
};

export function TokensList() {
  const router = useRouter();
  const { toast } = useToast();
  const [tokens, setTokens] = useState<Token[]>([]);
  const [search, setSearch] = useState("");
  const [deleteId, setDeleteId] = useState<string | null>(null);

  useEffect(() => {
    (async () => {
      try {
        const res = await fetch("/api/keys", { credentials: "include" });
        if (res.ok) {
          const { tokens } = await res.json();
          setTokens(tokens);
        }
      } catch {
        setTokens([]);
      }
    })();
  }, []);

  const handleDelete = (id: string) => {
    setDeleteId(id);
  };

  const confirmDelete = async () => {
    if (!deleteId) return;
    const res = await fetch(`/api/keys/${deleteId}`, {
      method: "DELETE",
      credentials: "include",
    });
    if (res.ok) {
      setTokens(tokens.filter((t) => t.id !== deleteId));
      toast({
        title: "Token deleted",
        description: "The API token has been deleted successfully.",
      });
    } else {
      toast({
        title: "Failed to delete",
        description: "Something went wrong.",
        variant: "destructive",
      });
    }
    setDeleteId(null);
  };

  const cancelDelete = () => {
    setDeleteId(null);
  };

  const handleCopy = (token: string) => {
    navigator.clipboard.writeText(token);
    toast({
      title: "Copied to clipboard",
      description: "The API token has been copied to your clipboard.",
    });
  };

  const filteredTokens = search
    ? tokens.filter(
        (t) =>
          t.identifier.toLowerCase().includes(search.toLowerCase()) ||
          t.key.toLowerCase().includes(search.toLowerCase())
      )
    : tokens;

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search tokens..."
            className="pl-10"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      </div>

      {Array.isArray(filteredTokens) && filteredTokens.length === 0 ? (
        <div className="flex flex-col items-center justify-center rounded-lg border border-dashed p-8 text-center">
          <Key className="h-8 w-8 text-muted-foreground mb-2" />
          <h3 className="font-medium">No tokens found</h3>
          <p className="text-sm text-muted-foreground mb-4">
            {search
              ? "No tokens match your search criteria"
              : "Create your first API token to get started"}
          </p>
          <Button
            onClick={() => router.push("/dashboard/tokens/new")}
            className="gap-1"
          >
            <Plus className="h-4 w-4" />
            New Token
          </Button>
        </div>
      ) : (
        <div className="rounded-md border border-border/60">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Token</TableHead>
                <TableHead>Created At</TableHead>
                <TableHead className="w-[100px]">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {(filteredTokens ?? []).map((token) => (
                <TableRow key={token.id}>
                  <TableCell className="font-medium">
                    {token.identifier}
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-xs">
                        {token.key.slice(0, 8)}••••••••••••
                      </span>
                      <Button
                        size="icon"
                        variant="ghost"
                        onClick={() => handleCopy(token.key)}
                        className="h-6 w-6 rounded-full"
                      >
                        <Copy className="h-3 w-3" />
                        <span className="sr-only">Copy token</span>
                      </Button>
                    </div>
                  </TableCell>
                  <TableCell>{token.createdAt}</TableCell>
                  <TableCell>
                    <Button
                      size="icon"
                      variant="ghost"
                      onClick={() => handleDelete(token.id)}
                      className="h-7 w-7 text-destructive"
                    >
                      <Trash2 className="h-4 w-4" />
                      <span className="sr-only">Delete token</span>
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      )}

      <AlertDialog
        open={deleteId !== null}
        onOpenChange={(open) => {
          if (!open) cancelDelete();
        }}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete API Token</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete the API
              token and any applications using it will no longer be able to
              authenticate.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={confirmDelete}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
