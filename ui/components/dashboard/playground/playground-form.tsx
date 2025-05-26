"use client";

import { useState, useEffect } from "react";
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
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Rocket, Mail, Loader2, X } from "lucide-react";

type Token = {
  id: string;
  identifier: string;
  key: string;
  limit: number;
  createdAt: string;
  updatedAt: string;
};

const formSchema = z.object({
  token: z.string({
    required_error: "Please select a token.",
  }),
  to: z.string().email({
    message: "Please enter a valid email address.",
  }),
  subject: z.string().min(1, {
    message: "Subject is required.",
  }),
  body: z.string().min(1, {
    message: "Email body is required.",
  }),
  attachments: z.array(z.any()).optional(),
});

export function PlaygroundForm() {
  const [isLoading, setIsLoading] = useState(false);
  const [response, setResponse] = useState<any>(null);
  const [activeTab, setActiveTab] = useState("form");
  const [attachments, setAttachments] = useState<File[]>([]);
  const [tokens, setTokens] = useState<Token[]>([]);
  const { toast } = useToast();

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

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      token: "",
      to: "",
      subject: "",
      body: "",
      attachments: [],
    },
  });

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const newFiles = Array.from(e.target.files);
      const updatedAttachments = [...attachments, ...newFiles];
      setAttachments(updatedAttachments);
      form.setValue("attachments", updatedAttachments);
    }
  };

  const removeAttachment = (index: number) => {
    const updatedAttachments = attachments.filter((_, i) => i !== index);
    setAttachments(updatedAttachments);
    form.setValue("attachments", updatedAttachments);
  };

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true);
    setActiveTab("response");
    const response = await fetch(`/api/queue/enqueue`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${values.token}`
      },
      body: JSON.stringify({
        email: values.to,
        subject: values.subject,
        body: values.body,
        attachments,
      }),
    });
    const data = await response.json();
    setResponse(data);
    setIsLoading(false);
    if (response.ok) {
      toast({
        title: "Success",
        description: `Enqueued with Job ID: ${data.id}`,
        variant: "default",
      });
    } else {
      toast({
        title: "Error",
        description: data.error || "Failed to send email.",
        variant: "destructive",
      });
    }
    setActiveTab("response");
  }

  return (
    <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
      <TabsList className="grid w-full grid-cols-2">
        <TabsTrigger value="form">
          Email Form <Mail className="ml-2 h-4 w-4" />
        </TabsTrigger>
        <TabsTrigger value="response" disabled={!response && !isLoading}>
          API Response <Rocket className="ml-2 h-4 w-4" />
        </TabsTrigger>
      </TabsList>

      <TabsContent value="form" className="space-y-6">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="token"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>API Token</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    value={field.value}
                    disabled={tokens.length === 0}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select an API token" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {tokens.map((token) => (
                        <SelectItem key={token.key} value={token.key}>
                          {token.identifier}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormDescription>
                    Select one of your API tokens for authentication.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="to"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Recipient Email</FormLabel>
                  <FormControl>
                    <Input placeholder="" {...field} />
                  </FormControl>
                  <FormDescription>
                    Enter the recipient&apos;s email address.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="subject"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email Subject</FormLabel>
                  <FormControl>
                    <Input placeholder="" {...field} />
                  </FormControl>
                  <FormDescription>
                    Enter the subject of the email.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="body"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email Body</FormLabel>
                  <FormControl>
                    <Textarea placeholder="" {...field} />
                  </FormControl>
                  <FormDescription>
                    Enter the body of the email.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="attachments"
              render={() => (
                <FormItem>
                  <FormLabel>Attachments</FormLabel>
                  <FormControl>
                    <Input
                      type="file"
                      multiple
                      onChange={handleFileChange}
                      accept=".jpg,.jpeg,.png,.pdf,.docx"
                    />
                  </FormControl>
                  <FormDescription>
                    Attach files to the email (optional).
                  </FormDescription>
                </FormItem>
              )}
            />
            {attachments.length > 0 && (
              <div className="space-y-2">
                <h3 className="text-sm font-semibold">Attachments:</h3>
                <ul className="list-disc pl-5">
                  {attachments.map((file, index) => (
                    <li key={index} className="flex items-center gap-2">
                      {file.name} ({(file.size / 1024).toFixed(2)} KB)
                      <Button
                        variant="destructive"
                        size="icon"
                        onClick={() => removeAttachment(index)}
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </li>
                  ))}
                </ul>
              </div>
            )}
            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Sending...
                </>
              ) : (
                "Send Test Email"
              )}
            </Button>
          </form>
        </Form>
      </TabsContent>
      <TabsContent value="response" className="space-y-6">
        {isLoading ? (
          <div className="flex items-center justify-center">
            <Loader2 className="h-8 w-8 animate-spin" />
          </div>
        ) : response ? (
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">API Response </h3>
            <pre className="text-green-600 p-4 rounded-md">
              {JSON.stringify(response, null, 2)}
            </pre>
          </div>
        ) : (
          <div className="flex items-center justify-center">
            <p>No response available.</p>
          </div>
        )}
      </TabsContent>
    </Tabs>
  );
}
