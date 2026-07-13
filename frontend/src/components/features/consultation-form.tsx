"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { motion } from "framer-motion";
import { Calendar, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { services } from "@/data/services";
import { toast } from "sonner";

const consultationSchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  phone: z.string().min(8),
  company: z.string().min(2),
  service: z.string().min(1),
  budget: z.string().min(1),
  timeline: z.string().min(1),
  description: z.string().min(20),
});

type ConsultationFormValues = z.infer<typeof consultationSchema>;

export function ConsultationForm() {
  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ConsultationFormValues>({
    resolver: zodResolver(consultationSchema),
  });

  async function onSubmit(data: ConsultationFormValues) {
    try {
      await new Promise((resolve) => setTimeout(resolve, 1500));
      toast.success("Consultation request submitted! We'll contact you within 24 hours.");
      reset();
    } catch {
      toast.error("Failed to submit. Please try again.");
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
          <Input id="email" type="email" placeholder="john@company.com" {...register("email")} />
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
          <Label htmlFor="company">Company *</Label>
          <Input id="company" placeholder="Your Company Ltd" {...register("company")} />
          {errors.company && <p className="text-xs text-danger">{errors.company.message}</p>}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        <div className="space-y-2">
          <Label>Service *</Label>
          <Select onValueChange={(value) => setValue("service", value)}>
            <SelectTrigger>
              <SelectValue placeholder="Select service" />
            </SelectTrigger>
            <SelectContent>
              {services.map((service) => (
                <SelectItem key={service.id} value={service.title}>{service.title}</SelectItem>
              ))}
            </SelectContent>
          </Select>
          {errors.service && <p className="text-xs text-danger">{errors.service.message}</p>}
        </div>
        <div className="space-y-2">
          <Label>Budget Range *</Label>
          <Select onValueChange={(value) => setValue("budget", value)}>
            <SelectTrigger>
              <SelectValue placeholder="Select budget" />
            </SelectTrigger>
            <SelectContent>
              {["Under $10K", "$10K - $25K", "$25K - $50K", "$50K - $100K", "$100K+"].map((b) => (
                <SelectItem key={b} value={b}>{b}</SelectItem>
              ))}
            </SelectContent>
          </Select>
          {errors.budget && <p className="text-xs text-danger">{errors.budget.message}</p>}
        </div>
        <div className="space-y-2">
          <Label>Timeline *</Label>
          <Select onValueChange={(value) => setValue("timeline", value)}>
            <SelectTrigger>
              <SelectValue placeholder="Select timeline" />
            </SelectTrigger>
            <SelectContent>
              {["ASAP (1-2 months)", "3-6 months", "6-12 months", "12+ months", "Not sure"].map((t) => (
                <SelectItem key={t} value={t}>{t}</SelectItem>
              ))}
            </SelectContent>
          </Select>
          {errors.timeline && <p className="text-xs text-danger">{errors.timeline.message}</p>}
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="description">Project Description *</Label>
        <Textarea
          id="description"
          placeholder="Describe your project, goals, and requirements..."
          rows={4}
          {...register("description")}
        />
        {errors.description && <p className="text-xs text-danger">{errors.description.message}</p>}
      </div>

      <Button type="submit" size="lg" disabled={isSubmitting}>
        {isSubmitting ? (
          <><Loader2 className="mr-2 h-4 w-4 animate-spin" /> Submitting...</>
        ) : (
          <><Calendar className="mr-2 h-4 w-4" /> Book Free Consultation</>
        )}
      </Button>
    </motion.form>
  );
}
