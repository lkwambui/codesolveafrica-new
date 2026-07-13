"use client";

import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import { AlertTriangle, RefreshCw } from "lucide-react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <Container>
        <div className="max-w-md mx-auto text-center">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-danger/10 text-danger mb-6">
            <AlertTriangle className="h-8 w-8" />
          </div>
          <h1 className="font-heading text-3xl font-bold text-primary-text mb-3">
            Something Went Wrong
          </h1>
          <p className="text-secondary-text mb-8">
            An unexpected error occurred. Our team has been notified.
            Please try again.
          </p>
          <Button onClick={reset}>
            <RefreshCw className="mr-2 h-4 w-4" /> Try Again
          </Button>
        </div>
      </Container>
    </div>
  );
}
