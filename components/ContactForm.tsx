"use client";

import React, { useActionState } from "react";
import { AlertCircle, CheckCircle2, Loader2 } from "lucide-react";
import { submitContactMessage, type ContactFormState } from "@/app/contact-us/actions";

const initialState: ContactFormState = { success: false };

export default function ContactForm() {
  const [state, formAction, isPending] = useActionState(submitContactMessage, initialState);

  if (state.success) {
    return (
      <div className="flex flex-col items-center text-center gap-4 py-8">
        <CheckCircle2 className="w-12 h-12 text-emerald-400" />
        <h3 className="text-xl font-michroma uppercase tracking-wider text-white">Message Sent</h3>
        <p className="text-gray-400 max-w-md">
          Thanks for reaching out. Our team will get back to you as soon as possible.
        </p>
      </div>
    );
  }

  return (
    <form action={formAction} className="space-y-5">
      {state.error && (
        <div className="flex items-center gap-2 px-4 py-3 rounded-lg bg-red-500/10 border border-red-500/30 text-red-300 text-sm">
          <AlertCircle className="w-4 h-4 shrink-0" />
          <span>{state.error}</span>
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <div>
          <label htmlFor="name" className="block text-xs font-bold uppercase tracking-widest text-gray-400 mb-2">
            Name
          </label>
          <input
            id="name"
            name="name"
            type="text"
            className="w-full px-4 py-3 bg-white/[0.03] border border-white/10 rounded-xl text-sm text-white placeholder:text-gray-600 focus:outline-none focus:border-indigo-500/50 focus:ring-1 focus:ring-indigo-500/50 transition-colors"
            placeholder="Jane Doe"
          />
        </div>
        <div>
          <label htmlFor="email" className="block text-xs font-bold uppercase tracking-widest text-gray-400 mb-2">
            Email *
          </label>
          <input
            id="email"
            name="email"
            type="email"
            required
            className="w-full px-4 py-3 bg-white/[0.03] border border-white/10 rounded-xl text-sm text-white placeholder:text-gray-600 focus:outline-none focus:border-indigo-500/50 focus:ring-1 focus:ring-indigo-500/50 transition-colors"
            placeholder="you@example.com"
          />
        </div>
      </div>

      <div>
        <label htmlFor="subject" className="block text-xs font-bold uppercase tracking-widest text-gray-400 mb-2">
          Subject
        </label>
        <input
          id="subject"
          name="subject"
          type="text"
          className="w-full px-4 py-3 bg-white/[0.03] border border-white/10 rounded-xl text-sm text-white placeholder:text-gray-600 focus:outline-none focus:border-indigo-500/50 focus:ring-1 focus:ring-indigo-500/50 transition-colors"
          placeholder="How can we help?"
        />
      </div>

      <div>
        <label htmlFor="message" className="block text-xs font-bold uppercase tracking-widest text-gray-400 mb-2">
          Message *
        </label>
        <textarea
          id="message"
          name="message"
          required
          rows={5}
          className="w-full px-4 py-3 bg-white/[0.03] border border-white/10 rounded-xl text-sm text-white placeholder:text-gray-600 focus:outline-none focus:border-indigo-500/50 focus:ring-1 focus:ring-indigo-500/50 transition-colors resize-none"
          placeholder="Tell us more about your inquiry..."
        />
      </div>

      <button
        type="submit"
        disabled={isPending}
        className="w-full flex items-center justify-center gap-2 px-6 py-3.5 mt-2 text-sm font-bold uppercase tracking-widest text-white bg-indigo-600 hover:bg-indigo-500 disabled:opacity-60 disabled:cursor-not-allowed rounded-xl transition-colors"
      >
        {isPending ? (
          <>
            <Loader2 className="w-4 h-4 animate-spin" />
            Sending
          </>
        ) : (
          "Send Message"
        )}
      </button>
    </form>
  );
}
