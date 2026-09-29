"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { RotateCcw } from "lucide-react";
import { Button } from "@arno/components/ui/Button";
import { StatusPage } from "@arno/components/layout/StatusPage";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  const router = useRouter();

  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <StatusPage
      code="Error"
      title="Something went wrong."
      description="An unexpected error occurred. Please try again - if the issue persists, feel free to get in touch."
      actions={
        <>
          <Button size="lg" onClick={reset} className="group">
            <RotateCcw aria-hidden="true" className="h-4 w-4 transition-transform duration-500 group-hover:-rotate-180" />
            Try Again
          </Button>
          <Button variant="outline" size="lg" onClick={() => router.push("/")}>
            Go Home
          </Button>
        </>
      }
    />
  );
}
