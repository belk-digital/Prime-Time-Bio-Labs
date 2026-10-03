"use client";

import { useState, useTransition } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Star } from "lucide-react";
import { submitReview } from "@/app/product/[slug]/reviewActions";

type Props = {
  familyProductIds: Array<number | string>;
  eligibility: "ok" | "login_required" | "not_purchased" | "already_reviewed";
};

/** Star-rating form. Only customers with a paid order for the product see the form itself. */
export default function ReviewForm({ familyProductIds, eligibility }: Props) {
  const pathname = usePathname() || "/shop";
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);
  const [comment, setComment] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [done, setDone] = useState(false);
  const [isPending, startTransition] = useTransition();

  if (done) {
    return (
      <p className="text-sm text-emerald-700 bg-emerald-50 border border-emerald-200 rounded-xl px-4 py-3">
        Thank you! Your review was submitted and will appear once approved.
      </p>
    );
  }
  if (eligibility === "login_required") {
    return (
      <p className="text-sm text-gray-500">
        <Link href={`/login?callbackUrl=${encodeURIComponent(pathname)}`} className="underline text-gray-900">
          Sign in
        </Link>{" "}
        to review products you've purchased.
      </p>
    );
  }
  if (eligibility === "not_purchased") {
    return <p className="text-sm text-gray-500">Reviews are open to customers who have purchased this product.</p>;
  }
  if (eligibility === "already_reviewed") {
    return <p className="text-sm text-gray-500">You've already reviewed this product — thank you!</p>;
  }

  function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (rating < 1) {
      setError("Please choose a star rating.");
      return;
    }
    setError(null);
    startTransition(async () => {
      const result = await submitReview({ familyProductIds, rating, comment, path: pathname });
      if (result.ok) setDone(true);
      else setError(result.error);
    });
  }

  return (
    <form onSubmit={onSubmit} className="flex flex-col gap-4">
      <div className="flex items-center gap-1" role="radiogroup" aria-label="Rating">
        {[1, 2, 3, 4, 5].map((n) => (
          <button
            key={n}
            type="button"
            role="radio"
            aria-checked={rating === n}
            aria-label={`${n} star${n > 1 ? "s" : ""}`}
            onMouseEnter={() => setHover(n)}
            onMouseLeave={() => setHover(0)}
            onClick={() => setRating(n)}
            className="p-0.5"
          >
            <Star
              className={`w-7 h-7 transition-colors ${
                n <= (hover || rating) ? "fill-amber-400 text-amber-400" : "text-gray-300"
              }`}
            />
          </button>
        ))}
      </div>
      <textarea
        value={comment}
        onChange={(e) => setComment(e.target.value)}
        maxLength={1000}
        rows={4}
        placeholder="Share your experience (optional)"
        className="font-inter w-full bg-gray-50 border border-black/10 rounded-xl px-4 py-3 text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none focus:border-indigo-500/50"
      />
      {error && <p className="text-xs text-red-500">{error}</p>}
      <button
        type="submit"
        disabled={isPending}
        className="self-start h-11 px-6 rounded-full bg-indigo-600 hover:bg-indigo-500 disabled:opacity-50 text-white text-xs font-bold uppercase tracking-widest transition-colors"
      >
        {isPending ? "Submitting…" : "Submit review"}
      </button>
    </form>
  );
}
