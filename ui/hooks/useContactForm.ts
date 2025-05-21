"use client";

import { useState, FormEvent, ChangeEvent } from "react";

const URL = "https://ikigai-p9nl.onrender.com/api/email/create";

type ContactForm = {
  name: string;
  email: string;
  company: string;
  message: string;
  isCareer: boolean;
  position: string;
  resumeUrl: string;
};

type FormErrors = Partial<Record<keyof ContactForm, string>>;

export function useContactForm() {
  const [formData, setFormData] = useState<ContactForm>({
    name: "",
    email: "",
    company: "",
    message: "",
    isCareer: false,
    position: "",
    resumeUrl: "",
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    if (errors[name as keyof ContactForm]) {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[name as keyof ContactForm];
        return newErrors;
      });
    }
  };

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    // Basic validation for common fields
    if (!formData.name || formData.name.length < 2) {
      newErrors.name = "Name must be at least 2 characters";
    }

    if (!formData.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Please enter a valid email address";
    }

    // Conditional validation based on form type
    if (formData.isCareer) {
      if (!formData.position || formData.position.trim() === "") {
        newErrors.position = "Position is required for career applications";
      }

      if (!formData.resumeUrl) {
        newErrors.resumeUrl = "Resume URL is required";
      } else if (!/^https?:\/\/\S+$/.test(formData.resumeUrl)) {
        newErrors.resumeUrl = "Must be a valid URL";
      }
    } else {
      if (!formData.message || formData.message.length < 10) {
        newErrors.message = "Message must be at least 10 characters";
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitError(null);

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    try {
      const bodyContent = formData.isCareer
        ? `
      Name: ${formData.name} <br /><br />
      Email: ${formData.email} <br /><br />
      Applying for: ${formData.position} <br /><br />
      Resume: ${formData.resumeUrl} <br /><br />`
        : `
      Name: ${formData.name} <br /><br />
      Email: ${formData.email} <br /><br />
      Company: ${formData.company || "Not provided"} <br /><br />
      Message: ${formData.message}`;

      const response = await fetch(URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: "pingvistara@gmail.com",
          subject: formData.isCareer
            ? `New Career Application from ${formData.name}`
            : `Vistara has been approached by ${formData.name}`,
          body: bodyContent,
        }),
      });

      if (!response.ok) {
        throw new Error("Server responded with an error");
      }

      setIsSubmitted(true);
    } catch (error) {
      setSubmitError("An error occurred. Please try again later.");
      console.error("Form submission error:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const resetForm = () => {
    setFormData({
      name: "",
      email: "",
      company: "",
      message: "",
      isCareer: false,
      position: "",
      resumeUrl: "",
    });
    setIsSubmitted(false);
    setErrors({});
    setSubmitError(null);
  };

  return {
    formData,
    errors,
    isSubmitting,
    isSubmitted,
    submitError,
    handleChange,
    handleSubmit,
    resetForm,
  };
}
