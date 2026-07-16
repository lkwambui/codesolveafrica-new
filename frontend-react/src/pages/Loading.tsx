import { Container } from "@/components/ui/container";

export default function Loading() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <Container>
        <div className="flex flex-col items-center gap-4">
          <div className="h-10 w-10 rounded-full border-2 border-primary-blue border-t-transparent animate-spin" />
          <p className="text-sm text-secondary-text">Loading...</p>
        </div>
      </Container>
    </div>
  );
}
