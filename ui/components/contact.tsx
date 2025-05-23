"use client";

import {
  Mail,
  MapPin,
  Phone,
  Send,
  Check,
  AlertCircle,
  Link,
} from "lucide-react";
import { useContactForm } from "@/hooks/useContactForm";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";

export default function Contact() {
  const {
    formData,
    errors,
    isSubmitting,
    isSubmitted,
    submitError,
    handleChange,
    handleSubmit,
    resetForm,
  } = useContactForm();

  return (
    <section
      id="contact"
      className="py-24 bg-gradient-to-b from-background/95 to-background relative"
    >
      <div className="container px-4 md:px-6 mx-auto">
        <div className="grid md:grid-cols-2 gap-10 items-center">
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">
            Get in Touch
          </h2>
          <p className="text-lg text-foreground/60 mb-8 max-w-md">
            Have a deal in mind? Leave a message.
          </p>

          <div className="space-y-6">
            <div className="flex items-start space-x-4">
              <div className="bg-primary/10 p-3 rounded-full">
                <Mail size={24} className="text-primary" />
              </div>
              <div>
                <h3 className="text-lg font-medium">Email Us</h3>
                <p className="text-foreground/60">
                  <a href="mailto:sambhavsaxena02@gmail.com">
                    sambhavsaxena02@gmail.com
                  </a>
                </p>
              </div>
            </div>
            <div className="flex items-start space-x-4">
              <div className="bg-primary/10 p-3 rounded-full">
                <Link size={24} className="text-primary" />
              </div>
              <div>
                <h3 className="text-lg font-medium">See other works</h3>
                <p className="text-foreground/60">
                  <a href="https://interpreted.vercel.app">
                    https://interpreted.vercel.app
                  </a>
                </p>
              </div>
            </div>
          </div>
          {isSubmitted ? (
            <div className="text-center py-10">
              <div className="bg-primary/10 p-4 rounded-full mx-auto w-16 h-16 flex items-center justify-center mb-6">
                <Check size={32} className="text-primary" />
              </div>
              <h3 className="text-2xl font-bold mb-2">Message Sent!</h3>
              <p className="text-foreground/60 mb-6">
                Thank you for reaching out. We&apos;ll get back to you shortly.
              </p>
              <Button onClick={resetForm}>Send Another Message</Button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              <h3 className="text-xl font-semibold mb-4">Send us a message</h3>

              {submitError && (
                <Alert variant="destructive">
                  <AlertCircle className="h-4 w-4" />
                  <AlertTitle>Error</AlertTitle>
                  <AlertDescription>{submitError}</AlertDescription>
                </Alert>
              )}

              <div className="space-y-2">
                <Label htmlFor="isCareer">Purpose</Label>
                <select
                  id="isCareer"
                  name="isCareer"
                  value={formData.isCareer ? "career" : "contact"}
                  onChange={(e) =>
                    handleChange({
                      target: {
                        name: "isCareer",
                        value: e.target.value === "career",
                      },
                    } as any)
                  }
                  className="w-full border rounded px-3 py-2"
                >
                  <option value="contact">Contact</option>
                  <option value="career">Career Application</option>
                </select>
              </div>
              {formData.isCareer && (
                <>
                  <div className="space-y-2">
                    <Label htmlFor="position">Position Applied For</Label>
                    <Input
                      id="position"
                      name="position"
                      placeholder="e.g., Product Designer"
                      value={formData.position}
                      onChange={handleChange}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="resumeUrl">Resume URL</Label>
                    <Input
                      id="resumeUrl"
                      name="resumeUrl"
                      placeholder="Public link to resume (Google Drive, Dropbox, etc.)"
                      value={formData.resumeUrl}
                      onChange={handleChange}
                      className={errors.resumeUrl ? "border-destructive" : ""}
                    />
                    {errors.resumeUrl && (
                      <p className="text-destructive text-sm">
                        {errors.resumeUrl}
                      </p>
                    )}
                  </div>
                </>
              )}

              <div className="space-y-2">
                <Label htmlFor="name">Full Name</Label>
                <Input
                  id="name"
                  name="name"
                  placeholder="John Doe"
                  value={formData.name}
                  onChange={handleChange}
                  className={errors.name ? "border-destructive" : ""}
                />
                {errors.name && (
                  <p className="text-destructive text-sm">{errors.name}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">Email Address</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="you@example.com"
                  value={formData.email}
                  onChange={handleChange}
                  className={errors.email ? "border-destructive" : ""}
                />
                {errors.email && (
                  <p className="text-destructive text-sm">{errors.email}</p>
                )}
              </div>

              {!formData.isCareer ? (
                <div className="space-y-2">
                  <Label htmlFor="company">Company (Optional)</Label>
                  <Input
                    id="company"
                    name="company"
                    placeholder="Your Company"
                    value={formData.company}
                    onChange={handleChange}
                  />
                </div>
              ) : null}

              {!formData.isCareer ? (
                <div className="space-y-2">
                  <Label htmlFor="message">Message</Label>
                  <Textarea
                    id="message"
                    name="message"
                    placeholder="Tell us about your project..."
                    rows={4}
                    value={formData.message}
                    onChange={handleChange}
                    className={errors.message ? "border-destructive" : ""}
                  />
                  {errors.message && (
                    <p className="text-destructive text-sm">{errors.message}</p>
                  )}
                </div>
              ) : null}

              <Button
                type="submit"
                className="w-full bg-gradient-to-r"
                variant={"outline"}
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <span className="flex items-center">
                    <svg
                      className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      ></path>
                    </svg>
                    Sending...
                  </span>
                ) : (
                  <span className="flex items-center">
                    Send Message
                    <Send size={16} className="ml-2" />
                  </span>
                )}
              </Button>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
