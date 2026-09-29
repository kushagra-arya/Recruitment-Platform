import { SectionWrapper, CandidateForm } from "@/components";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Apply - Shree Shyam Talent Solutions",
  description: "Register with Shree Shyam Talent Solutions and let our expert recruiters match you with your perfect opportunity.",
};

export default function UploadCVPage() {
  return (
    <>
      <section className="relative bg-primary py-16 lg:py-20">
        <div className="absolute inset-0 bg-gradient-to-br from-primary via-primary to-slate-800" />
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="font-heading text-4xl font-bold tracking-tight text-white sm:text-5xl">
            Start Your Journey
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-slate-300">
            Register with Shree Shyam Talent Solutions and let our expert recruiters match you with your perfect opportunity.
          </p>
        </div>
      </section>

      <SectionWrapper className="bg-background">
        <CandidateForm />
      </SectionWrapper>
    </>
  );
}
