import { Container } from "@/components/ui/container";
import { SectionHeader } from "@/components/ui/section-header";
import { TimelineItem } from "@/components/features/timeline-item";
import { processSteps } from "@/data/process";

export function ProcessTimeline() {
  return (
    <section className="py-20 dark:bg-primary">
      <Container>
        <SectionHeader
          subtitle="Our Process"
          title="How We Deliver Excellence"
          description="A proven methodology that ensures predictable, high-quality results for every engagement."
        />
        <div className="max-w-4xl mx-auto space-y-12 md:space-y-0 md:relative">
          {processSteps.map((step, index) => (
            <TimelineItem key={step.step} {...step} index={index} />
          ))}
        </div>
      </Container>
    </section>
  );
}
