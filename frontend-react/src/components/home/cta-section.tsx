import { CTABanner } from "@/components/ui/cta-banner";

export function CTASection() {
  return (
    <CTABanner
      title="Ready to Transform Your Business?"
      description="Let's discuss how we can help you achieve your technology goals. Our team is ready to partner with you."
      primaryLabel="Start Your Project"
      primaryHref="/contact"
      secondaryLabel="Book a Consultation"
      secondaryHref="/contact"
      variant="accent-warm"
    />
  );
}
