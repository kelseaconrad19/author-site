"use client";

import { useState } from "react";

export default function NewsletterForm() {
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [message, setMessage] = useState("");

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    setStatus("loading");
    setMessage("");

    const formData = new FormData(form);
    const payload = {
      firstName: String(formData.get("firstName") || ""),
      lastName: String(formData.get("lastName") || ""),
      email: String(formData.get("email") || ""),
    };

    try {
      const res = await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data?.error || "Unable to subscribe. Please try again.");
      }

      setStatus("success");
      setMessage("You're in! Check your inbox for a confirmation email.");
      form.reset();
    } catch (error) {
      setStatus("error");
      setMessage(error instanceof Error ? error.message : "Something went wrong.");
    }
  }

  return (
    <form className="newsletter-form" onSubmit={handleSubmit}>
      <div className="field-grid">
        <label className="field">
          <span>First name</span>
          <input name="firstName" type="text" autoComplete="given-name" />
        </label>
        <label className="field">
          <span>Last name</span>
          <input name="lastName" type="text" autoComplete="family-name" />
        </label>
      </div>
      <label className="field">
        <span>Email address</span>
        <input name="email" type="email" required autoComplete="email" />
      </label>
      <button className="button" type="submit" disabled={status === "loading"}>
        {status === "loading" ? "Submitting..." : "Get the writing toolkit"}
      </button>
      {message ? <p className={`form-message ${status}`}>{message}</p> : null}
    </form>
  );
}
