import Image from "next/image";
import { Button, SectionWrapper } from "@/components";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Our Services - Shree Shyam Talent Solutions",
  description: "Discover our comprehensive recruitment services including Executive Search, Contract Staffing, and HR Consulting.",
};

const services = [
  {
    id: "executive-search",
    title: "Executive Search",
    subtitle: "Finding Leaders Who Transform",
    description: "Our executive search service identifies and attracts top-tier leadership talent for your organization. We leverage our extensive network and rigorous assessment methodologies to find executives who not only have the right skills but also align with your company culture and vision.",
    features: [
      "C-suite and board-level recruitment",
      "Confidential search processes",
      "Comprehensive candidate assessment",
      "Market mapping and talent intelligence",
      "Succession planning support",
    ],
    image: "https://images.unsplash.com/photo-1551836022-d5d88e9218df?w=800&h=600&fit=crop",
    imageAlt: "Executive in a modern office",
  },
  {
    id: "contract-staffing",
    title: "Contract Staffing",
    subtitle: "Flexible Talent Solutions",
    description: "Whether you need to scale up for a project, cover parental leave, or access specialized skills, our contract staffing solutions provide the flexibility your business needs. We handle everything from sourcing to onboarding, allowing you to focus on what matters most.",
    features: [
      "Temporary and interim placements",
      "Project-based staffing",
      "Temp-to-perm options",
      "Rapid deployment capabilities",
      "Full compliance management",
    ],
    image: "https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=800&h=600&fit=crop",
    imageAlt: "Team working on a project",
  },
  {
    id: "consulting",
    title: "HR Consulting",
    subtitle: "Strategic People Solutions",
    description: "Beyond recruitment, we offer comprehensive HR consulting services to help you build and maintain a high-performing workforce. From organizational design to talent management strategies, our consultants bring decades of combined experience to your challenges.",
    features: [
      "Talent strategy development",
      "Compensation benchmarking",
      "Organizational restructuring",
      "Employer branding",
      "Diversity & inclusion programs",
    ],
    image: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&h=600&fit=crop",
    imageAlt: "Consulting session",
  },
];

const industries = [
  "Technology",
  "Finance & Banking",
  "Healthcare",
  "Manufacturing",
  "Retail",
  "Legal",
  "Marketing",
  "Engineering",
];

export default function ServicesPage() {
  return (
    <>
      <section className="relative bg-primary py-16 lg:py-20">
        <div className="absolute inset-0 bg-gradient-to-br from-primary via-primary to-slate-800" />
        <div className="relative mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="font-heading text-4xl font-bold tracking-tight text-white sm:text-5xl">
            Our Services
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg md:text-xl text-slate-200 italic font-medium text-center">
            &ldquo;Choose a job you love, and you will never have to work a day in your life.&rdquo;
          </p>
        </div>
      </section>

      {services.map((service, index) => (
        <SectionWrapper 
          key={service.id} 
          className={index % 2 === 0 ? "bg-surface" : "bg-background"}
          id={service.id}
        >
          <div className={`grid gap-12 lg:grid-cols-2 lg:gap-16 items-center ${
            index % 2 === 1 ? "lg:grid-flow-dense" : ""
          }`}>
            <div className={index % 2 === 1 ? "lg:col-start-2" : ""}>
              <span className="text-accent font-semibold text-sm uppercase tracking-wider">
                {service.subtitle}
              </span>
              <h2 className="mt-3 font-heading text-3xl font-bold text-primary sm:text-4xl">
                {service.title}
              </h2>
              <p className="mt-6 text-secondary leading-relaxed">
                {service.description}
              </p>
              
              <ul className="mt-8 space-y-3">
                {service.features.map((feature, featureIndex) => (
                  <li key={featureIndex} className="flex items-start gap-3">
                    <svg 
                      className="h-6 w-6 text-accent flex-shrink-0 mt-0.5" 
                      fill="none" 
                      viewBox="0 0 24 24" 
                      strokeWidth={2} 
                      stroke="currentColor"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span className="text-secondary">{feature}</span>
                  </li>
                ))}
              </ul>

              <div className="mt-8">
                <Button as="link" href="/contact">
                  Contact Us
                </Button>
              </div>
            </div>

            <div className={`relative ${index % 2 === 1 ? "lg:col-start-1 lg:row-start-1" : ""}`}>
              <div className="relative h-96 lg:h-[500px] rounded-lg overflow-hidden shadow-xl">
                <Image
                  src={service.image}
                  alt={service.imageAlt}
                  fill
                  className="object-cover"
                />
              </div>
              <div className={`absolute -z-10 w-72 h-72 rounded-full bg-accent/10 blur-3xl ${
                index % 2 === 0 ? "-bottom-10 -right-10" : "-bottom-10 -left-10"
              }`} />
            </div>
          </div>
        </SectionWrapper>
      ))}

      <SectionWrapper className="bg-primary">
        <div className="text-center">
          <h2 className="font-heading text-3xl font-bold text-white sm:text-4xl">
            Industries We Serve
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-slate-300">
            Our expertise spans across diverse sectors, enabling us to understand and meet 
            the unique talent needs of each industry.
          </p>
        </div>

        <div className="mt-12 flex flex-wrap justify-center gap-4">
          {industries.map((industry) => (
            <div 
              key={industry}
              className="px-6 py-3 bg-white/10 backdrop-blur-sm rounded-lg text-white font-medium hover:bg-accent transition-colors duration-200"
            >
              {industry}
            </div>
          ))}
        </div>
      </SectionWrapper>

      <SectionWrapper className="bg-surface">
        <div className="bg-background rounded-2xl p-8 lg:p-12 text-center">
          <h2 className="font-heading text-3xl font-bold text-primary sm:text-4xl">
            Not Sure Which Service Is Right for You?
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-secondary">
            Let&apos;s have a conversation. Our team will help you identify the best approach 
            for your specific recruitment and talent needs.
          </p>
          <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Button as="link" href="/contact" size="lg">
              Schedule a Consultation
            </Button>
            <Button as="link" href="/about" variant="secondary" size="lg">
              Learn About Us
            </Button>
          </div>
        </div>
      </SectionWrapper>
    </>
  );
}
