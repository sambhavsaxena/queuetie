"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { Copy, Check, Loader2 } from "lucide-react";

const formSchema = z.object({
  name: z.string().min(2, {
    message: "Name must be at least 2 characters.",
  }),
});

export function NewTokenForm() {
  const [isLoading, setIsLoading] = useState(false);
  const [newToken, setNewToken] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);
  const router = useRouter();
  const { toast } = useToast();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true);
    const { name } = values;
    const response = await fetch(`/api/keys/create`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ identifier: name }),
    });
    if(!response.ok) {
      setIsLoading(false);
      toast({
        title: "Token generation failed",
        description: "Failed to communicate with the server. Please try again.",
        variant: "destructive",
      });
      return;
    }
    const data = await response.json();
    if (data.error) {
      setIsLoading(false);
      toast({
        title: "Token generation failed",
        description: data.error,
        variant: "destructive",
      });
      return;
    }
    if (data.key) {
      setNewToken(data.key);
    } else {
      toast({
        title: "Token generation failed",
        description: "An unknown error occurred.",
        variant: "destructive",
      });
    }
    toast({
      title: "Success",
      description: "Token generated successfully",
      variant: "default",
    });
    form.reset();
    setIsLoading(false);
  }

  const handleCopy = () => {
    if (newToken) {
      navigator.clipboard.writeText(newToken);
      setCopied(true);
      toast({
        title: "Copied to clipboard",
        description: "The API token has been copied to your clipboard.",
      });

      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleDone = () => {
    router.push("/dashboard/tokens");
  };

  return (
    <>
      {newToken ? (
        <Card className="border-green-500/20 bg-green-500/5">
          <CardHeader>
            <CardTitle>Success! Your new API token</CardTitle>
            <CardDescription>Copy this token and keep it safe.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-2 rounded-lg bg-background/80 p-4 font-mono text-sm">
              {newToken}
              <Button
                size="icon"
                variant="ghost"
                onClick={handleCopy}
                className="ml-auto h-7 w-7 rounded-full"
              >
                {copied ? (
                  <Check className="h-4 w-4 text-green-500" />
                ) : (
                  <Copy className="h-4 w-4" />
                )}
                <span className="sr-only">Copy token</span>
              </Button>
            </div>
          </CardContent>
          <CardFooter>
            <Button onClick={handleDone} className="w-full">
              Done
            </Button>
          </CardFooter>
        </Card>
      ) : (
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Token Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Production API" {...field} />
                  </FormControl>
                  <FormDescription>
                    Give your token a descriptive name to identify its purpose.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Generating token...
                </>
              ) : (
                "Generate Token"
              )}
            </Button>
          </form>
        </Form>
      )}
    </>
  );
}
