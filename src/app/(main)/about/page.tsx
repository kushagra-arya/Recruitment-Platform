import Image from "next/image";
import { Button, SectionWrapper } from "@/components";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About Us - Shree Shyam Talent Solutions",
  description: "Learn about our mission, values, and the dedicated team behind Shree Shyam Talent Solutions recruitment agency.",
};

const teamMembers = [
  {
    name: "Jitender Goyal",
    role: "Founder & CEO",
    image: "/images/founders/founder1.png",
    bio: "Founder and CEO of Shree Shyam Talent Solutions",
    linkedin: "https://in.linkedin.com/in/jitender-goyal",
  },
];



export default function AboutPage() {
  return (
    <>
      <section className="relative bg-primary py-16 lg:py-20">
        <div className="absolute inset-0 bg-gradient-to-br from-primary via-primary to-slate-800" />
        <div className="relative mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="font-heading text-4xl font-bold tracking-tight text-white sm:text-5xl">
            About Us
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg md:text-xl text-slate-200 italic font-medium text-center">
            &ldquo;Find out what you like doing best, and get someone to pay you for it.&rdquo;
          </p>
        </div>
      </section>

      <SectionWrapper className="bg-surface">
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-16 items-center">
          <div className="relative">
            <div className="relative h-96 rounded-lg overflow-hidden shadow-xl">
              <Image
                src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800&h=600&fit=crop"
                alt="Team collaboration"
                fill
                className="object-cover"
              />
            </div>
            <div className="absolute -bottom-6 -right-6 bg-accent text-white p-6 rounded-lg shadow-xl max-w-xs hidden md:block">
              <p className="text-3xl font-bold">18+</p>
              <p className="text-sm mt-1">Months of Excellence in Recruitment</p>
            </div>
          </div>

          <div>
            <span className="text-accent font-semibold text-sm uppercase tracking-wider">Our Mission</span>
            <h2 className="mt-3 font-heading text-3xl font-bold text-primary sm:text-4xl">
              Empowering Careers, Building Teams
            </h2>
            <p className="mt-6 text-secondary leading-relaxed">
              Shree Shyam Talent Solutions was founded with a clear mission - to bridge the gap between talented professionals and companies seeking the right workforce.
            </p>
            <p className="mt-4 text-secondary leading-relaxed">
              We believe recruitment is more than just matching resumes with job descriptions. It is about understanding company culture, long-term goals, and candidate potential.
            </p>
            <p className="mt-4 text-secondary leading-relaxed">
              Our approach is simple:
            </p>
            <ul className="mt-3 space-y-2 text-secondary">
              {[
                'Understand client requirements clearly',
                'Screen candidates carefully',
                'Ensure the right cultural and skill fit',
                'Deliver timely hiring solutions',
              ].map((item, i) => (
                <li key={i} className="flex items-start gap-2">
                  <span className="mt-1 flex-shrink-0 w-5 h-5 inline-flex items-center justify-center rounded-full bg-accent/10 text-accent">
                    <svg className="h-3 w-3" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                    </svg>
                  </span>
                  {item}
                </li>
              ))}
            </ul>
            <p className="mt-4 text-secondary leading-relaxed">
              We work with startups, growing businesses, and established organizations across various industries.
            </p>
            <p className="mt-4 text-secondary leading-relaxed">
              Our commitment is to build long-term relationships based on trust, transparency, and performance.
            </p>
            <p className="mt-4 text-secondary leading-relaxed">
              Whether you are hiring or job searching, we aim to make the recruitment process smooth, efficient, and reliable.
            </p>
            <div className="mt-8 grid grid-cols-2 gap-6">
              <div>
                <p className="text-3xl font-bold text-primary">1,000+</p>
                <p className="text-muted text-sm">Successful Placements</p>
              </div>
              <div>
                <p className="text-3xl font-bold text-primary">50+</p>
                <p className="text-muted text-sm">Partner Companies</p>
              </div>
              <div>
                <p className="text-3xl font-bold text-primary">98%</p>
                <p className="text-muted text-sm">Client Satisfaction</p>
              </div>
              <div>
                <p className="text-3xl font-bold text-primary">24hrs</p>
                <p className="text-muted text-sm">Average Response Time</p>
              </div>
            </div>
          </div>
        </div>
      </SectionWrapper>

      <SectionWrapper className="bg-surface">
        <div className="text-center">
          <span className="text-accent font-semibold text-sm uppercase tracking-wider">Leadership</span>
          <h2 className="mt-3 font-heading text-3xl font-bold text-primary sm:text-4xl">
            Meet Our Founder
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-secondary">
            Driven by passion and commitment to connect talent with the right opportunities.
          </p>
        </div>

        <div className="mt-12 flex justify-center">
          {teamMembers.map((member, index) => (
            <div key={index} className="max-w-sm w-full bg-white rounded-lg shadow-lg overflow-hidden">
              <div className="relative h-96 w-full bg-slate-100">
                <Image
                  src={member.image}
                  alt={member.name}
                  fill
                  className="object-contain"
                />
              </div>
              <div className="p-6 text-center">
                <h3 className="font-heading text-2xl font-bold text-primary">{member.name}</h3>
                <p className="text-accent font-semibold mt-1">{member.role}</p>
                <p className="text-secondary mt-3">{member.bio}</p>
                {'linkedin' in member && member.linkedin && (
                  <a 
                    href={member.linkedin} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 mt-4 px-4 py-2 bg-primary text-white rounded-lg hover:bg-accent transition-colors"
                  >
                    <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                    </svg>
                    <span>LinkedIn</span>
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>
      </SectionWrapper>

      <SectionWrapper className="bg-primary">
        <div className="text-center">
          <h2 className="font-heading text-3xl font-bold text-white sm:text-4xl">
            Want to Join Our Team?
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-slate-300">
            We&apos;re always looking for passionate individuals to join our growing team. 
            Check out our open positions or send us your CV.
          </p>
          <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Button as="link" href="/jobs" size="lg">
              View Open Positions
            </Button>
            <Button as="link" href="/contact" variant="text" size="lg" className="text-white hover:text-accent">
              Get in Touch
            </Button>
          </div>
        </div>
      </SectionWrapper>
    </>
  );
}
