import type { Metadata } from "next";
import { Container } from "@/components/ui/container";
import { SectionHeader } from "@/components/ui/section-header";
import { ContactForm } from "@/components/features/contact-form";
import { ConsultationForm } from "@/components/features/consultation-form";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Mail, Phone, MapPin, Clock } from "lucide-react";
import { COMPANY } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Contact Us",
  description: "Get in touch with CodeSolveAfrica. Start your digital transformation journey today.",
};

export default function ContactPage() {
  return (
    <>
      <section className="pt-32 pb-20 bg-gradient-to-b from-surface to-white dark:from-primary dark:to-primary-800">
        <Container>
          <SectionHeader
            subtitle="Contact Us"
            title="Let's Build Something Great Together"
            description="Have a project in mind? We'd love to hear from you. Send us a message and we'll respond within 24 hours."
          />

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 mt-12">
            <div className="lg:col-span-2">
              <Tabs defaultValue="contact" className="w-full">
                <TabsList className="mb-8">
                  <TabsTrigger value="contact">Send a Message</TabsTrigger>
                  <TabsTrigger value="consultation">Book a Consultation</TabsTrigger>
                </TabsList>
                <TabsContent value="contact">
                  <ContactForm />
                </TabsContent>
                <TabsContent value="consultation">
                  <ConsultationForm />
                </TabsContent>
              </Tabs>
            </div>

            <div className="space-y-8">
              <div className="rounded-2xl border border-border dark:border-white/10 bg-white dark:bg-primary-900 p-8">
                <h3 className="font-heading text-lg font-semibold text-primary-text dark:text-white mb-6">
                  Contact Information
                </h3>
                <div className="space-y-5">
                  <div className="flex items-start gap-3">
                    <Mail className="h-5 w-5 text-primary-blue mt-0.5" />
                    <div>
                      <p className="text-sm font-medium text-primary-text dark:text-white">Email</p>
                      <a href={`mailto:${COMPANY.email}`} className="text-sm text-secondary-text dark:text-white/60 hover:text-primary-blue dark:hover:text-primary-blue transition-colors">
                        {COMPANY.email}
                      </a>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Phone className="h-5 w-5 text-primary-blue mt-0.5" />
                    <div>
                      <p className="text-sm font-medium text-primary-text dark:text-white">Phone</p>
                      <a href={`tel:${COMPANY.phone}`} className="text-sm text-secondary-text dark:text-white/60 hover:text-primary-blue dark:hover:text-primary-blue transition-colors">
                        {COMPANY.phone}
                      </a>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <MapPin className="h-5 w-5 text-primary-blue mt-0.5" />
                    <div>
                      <p className="text-sm font-medium text-primary-text dark:text-white">Location</p>
                      <p className="text-sm text-secondary-text dark:text-white/60">{COMPANY.address}</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Clock className="h-5 w-5 text-primary-blue mt-0.5" />
                    <div>
                      <p className="text-sm font-medium text-primary-text dark:text-white">Hours</p>
                      <p className="text-sm text-secondary-text dark:text-white/60">Mon-Fri: 8:00 AM - 6:00 PM EAT</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="rounded-2xl border border-border dark:border-white/10 bg-white dark:bg-primary-900 p-8">
                <h3 className="font-heading text-lg font-semibold text-primary-text dark:text-white mb-4">
                  Office
                </h3>
                <div className="space-y-4">
                  <div>
                    <p className="text-sm font-medium text-primary-text dark:text-white">Nairobi, Kenya</p>
                    <p className="text-xs text-secondary-text dark:text-white/60">Headquarters</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
