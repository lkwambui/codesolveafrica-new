"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { motion } from "framer-motion";
import { Send, Loader2, Upload } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";

const applicationSchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  phone: z.string().min(8),
  position: z.string().min(2),
  portfolio: z.string().url("Invalid URL").optional().or(z.literal("")),
  coverLetter: z.string().min(50, "Cover letter must be at least 50 characters"),
});

type ApplicationFormValues = z.infer<typeof applicationSchema>;

export function ApplicationForm({ position }: { position?: string }) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ApplicationFormValues>({
    resolver: zodResolver(applicationSchema),
    defaultValues: { position: position || "" },
  });

  async function onSubmit(data: ApplicationFormValues) {
    try {
      await new Promise((resolve) => setTimeout(resolve, 1500));
      toast.success("Application submitted successfully! We'll review and get back to you.");
      reset();
    } catch {
      toast.error("Failed to submit application. Please try again.");
    }
  }

  return (
    <motion.form
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-5"
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <div className="space-y-2">
          <Label htmlFor="name">Full Name *</Label>
          <Input id="name" placeholder="John Doe" {...register("name")} />
          {errors.name && <p className="text-xs text-danger">{errors.name.message}</p>}
        </div>
        <div className="space-y-2">
          <Label htmlFor="email">Email *</Label>
          <Input id="email" type="email" placeholder="john@email.com" {...register("email")} />
          {errors.email && <p className="text-xs text-danger">{errors.email.message}</p>}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <div className="space-y-2">
          <Label htmlFor="phone">Phone *</Label>
          <Input id="phone" placeholder="+254 700 000 000" {...register("phone")} />
          {errors.phone && <p className="text-xs text-danger">{errors.phone.message}</p>}
        </div>
        <div className="space-y-2">
          <Label htmlFor="position">Position *</Label>
          <Input id="position" placeholder="Software Engineer" {...register("position")} />
          {errors.position && <p className="text-xs text-danger">{errors.position.message}</p>}
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="portfolio">Portfolio / LinkedIn URL</Label>
        <Input id="portfolio" placeholder="https://linkedin.com/in/..." {...register("portfolio")} />
        {errors.portfolio && <p className="text-xs text-danger">{errors.portfolio.message}</p>}
      </div>

      <div className="space-y-2">
        <Label htmlFor="coverLetter">Cover Letter *</Label>
        <Textarea
          id="coverLetter"
          placeholder="Tell us why you're a great fit for this role..."
          rows={6}
          {...register("coverLetter")}
        />
        {errors.coverLetter && <p className="text-xs text-danger">{errors.coverLetter.message}</p>}
      </div>

      <div className="space-y-2">
        <Label>Resume / CV</Label>
        <div className="flex items-center justify-center border-2 border-dashed border-border rounded-lg p-8 hover:border-primary-blue/50 transition-colors cursor-pointer">
          <div className="text-center">
            <Upload className="mx-auto h-8 w-8 text-secondary-text mb-2" />
            <p className="text-sm text-secondary-text">
              Drop your resume here or click to browse
            </p>
            <p className="text-xs text-secondary-text mt-1">PDF, DOC (Max 10MB)</p>
          </div>
        </div>
      </div>

      <Button type="submit" size="lg" disabled={isSubmitting}>
        {isSubmitting ? (
          <><Loader2 className="mr-2 h-4 w-4 animate-spin" /> Submitting...</>
        ) : (
          <><Send className="mr-2 h-4 w-4" /> Submit Application</>
        )}
      </Button>
    </motion.form>
  );
}
