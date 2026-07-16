import { Link } from "react-router-dom";
import { useDocumentTitle } from "@/lib/use-document-title";
import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

export default function NotFound() {
  useDocumentTitle("404 - Page Not Found");
  return (
    <div className="min-h-screen flex items-center justify-center">
      <Container>
        <div className="max-w-md mx-auto text-center">
          <div className="font-heading text-8xl font-bold text-primary-blue/20 mb-4">
            404
          </div>
          <h1 className="font-heading text-3xl font-bold text-primary-text mb-3">
            Page Not Found
          </h1>
          <p className="text-secondary-text mb-8">
            Sorry, we couldn&apos;t find the page you&apos;re looking for. It might have been
            moved or doesn&apos;t exist.
          </p>
          <Button asChild>
            <Link to="/">
              <ArrowLeft className="mr-2 h-4 w-4" /> Back to Home
            </Link>
          </Button>
        </div>
      </Container>
    </div>
  );
}
