"use client";

import { useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { Button } from "@arno/components/ui/Button";
import { StatusPage } from "@arno/components/layout/StatusPage";

export default function NotFound() {
  const router = useRouter();

  return (
    <StatusPage
      code="404"
      title="Page not found."
      description="The page you are looking for does not exist or has been moved."
      actions={
        <>
          <Button size="lg" onClick={() => router.push("/")}>
            Take Me Home
          </Button>
          <Button variant="outline" size="lg" onClick={() => router.back()} className="group">
            <ArrowLeft aria-hidden="true" className="h-4 w-4 transition-transform group-hover:-translate-x-0.5" />
            Go Back
          </Button>
        </>
      }
    />
  );
}
