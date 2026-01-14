"use client";

import { useEffect } from "react";
import Link from "next/link";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-950">
      <div className="text-center px-4">
        <h1 className="text-6xl font-bold text-white mb-4">Error</h1>
        <h2 className="text-2xl font-semibold text-slate-300 mb-4">
          Something went wrong!
        </h2>
        <p className="text-slate-400 mb-8 max-w-md mx-auto">
          An unexpected error occurred. Please try again.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button
            onClick={reset}
            className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-lg bg-cyan-500 hover:bg-cyan-400 text-slate-900 font-semibold transition-all duration-200"
          >
            Try Again
          </button>
          <Link
            href="/en"
            className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-lg border border-slate-600 text-slate-300 hover:bg-slate-800 font-semibold transition-all duration-200"
          >
            Go to Homepage
          </Link>
        </div>
      </div>
    </div>
  );
}
