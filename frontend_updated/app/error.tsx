"use client";

import { useEffect } from "react";
import Link from "next/link";

interface ErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function Error({ error, reset }: ErrorProps) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error);
  }, [error]);

  return (
    <div className="container">
      <div className="mt-5 text-center">
        <h1 data-aos="fade-up">Something went wrong!</h1>
        <div className="mt-3" data-aos="fade-up" data-aos-delay="100">
          <p>An error occurred while loading this page. Please try again.</p>
          <div className="mt-3 flex gap-2 justify-center">
            <button onClick={reset}>Try again</button>
            <Link href="/">
              <button>Go Home</button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
