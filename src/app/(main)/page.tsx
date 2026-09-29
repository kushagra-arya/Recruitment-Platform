import Image from "next/image";
import { Button, SectionWrapper } from "@/components";

export default function Home() {
  return (
    <>
      <section className="relative bg-primary overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary via-primary to-slate-800" />
        
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-20 lg:py-32">
          <div className="grid gap-12 lg:grid-cols-2 lg:gap-16 items-center">
            <div className="text-center lg:text-left">
              <h1 className="font-heading text-4xl font-bold tracking-tight text-white sm:text-5xl lg:text-6xl">
                Connecting Talent with{" "}
                <span className="text-accent">Opportunity</span>
              </h1>
              <p className="mt-6 text-lg text-slate-300 max-w-xl mx-auto lg:mx-0">
                Whether you&apos;re seeking your next career move or searching for exceptional talent, 
                Shree Shyam Talent Solutions is your trusted partner in professional recruitment.
              </p>

            </div>

            <div className="relative hidden lg:block">
              <div className="grid grid-cols-2 gap-4">
                <div className="relative h-80 rounded-lg overflow-hidden shadow-2xl transform translate-y-8">
                  <Image
                    src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&h=500&fit=crop"
                    alt="Professional recruiter"
                    fill
                    className="object-cover"
                  />
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-4">
                    <p className="text-white text-sm font-medium">Expert Recruiters</p>
                  </div>
                </div>
                <div className="relative h-80 rounded-lg overflow-hidden shadow-2xl transform -translate-y-8">
                  <Image
                    src="https://images.unsplash.com/photo-1560250097-0b93528c311a?w=400&h=500&fit=crop"
                    alt="Successful candidate"
                    fill
                    className="object-cover"
                  />
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-4">
                    <p className="text-white text-sm font-medium">Top Candidates</p>
                  </div>
                </div>
              </div>
              <div className="absolute -bottom-4 left-1/2 transform -translate-x-1/2 bg-surface rounded-lg shadow-xl p-4 flex gap-8">
                <div className="text-center">
                  <p className="text-2xl font-bold text-primary">1000+</p>
                  <p className="text-sm text-muted">Placements</p>
                </div>
                <div className="text-center border-l border-background pl-8">
                  <p className="text-2xl font-bold text-primary">98%</p>
                  <p className="text-sm text-muted">Success Rate</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <SectionWrapper className="bg-surface">
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-16 items-center">
          <div className="relative h-80 lg:h-[420px] rounded-2xl overflow-hidden shadow-xl">
            <Image
              src="https://images.unsplash.com/photo-1521791136064-7986c2920216?w=800&h=600&fit=crop"
              alt="Business handshake"
              fill
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-tr from-primary/40 to-transparent" />
          </div>
          <div>
            <h2 className="font-heading text-3xl font-bold text-primary sm:text-4xl">
              We Help Companies Hire the Right Talent - Faster &amp; Smarter
            </h2>
            <p className="mt-6 text-secondary text-lg leading-relaxed">
              Shree Shyam Talent Solutions connects skilled professionals with growing companies across India. We make hiring simple, efficient, and stress-free.
            </p>
            <div className="mt-8 flex flex-col gap-4 sm:flex-row">
              <Button as="link" href="/contact" size="lg">
                Hire Talent
              </Button>
              <Button as="link" href="/upload-cv" variant="secondary" size="lg">
                Submit Your Resume
              </Button>
            </div>
          </div>
        </div>
      </SectionWrapper>

      <SectionWrapper>
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-16 items-center">
          <div>
            <span className="text-accent font-semibold text-sm uppercase tracking-wider">About Us</span>
            <h2 className="mt-3 font-heading text-3xl font-bold text-primary sm:text-4xl">
              Who We Are
            </h2>
            <div className="mt-6 space-y-5 text-secondary text-lg leading-relaxed">
              <p>
                Shree Shyam Talent Solutions is a dedicated recruitment agency focused on connecting the right people with the right opportunities.
              </p>
              <p>
                We understand that hiring is not just about filling a position - it&apos;s about building strong teams. That&apos;s why we carefully screen, evaluate, and match candidates according to company needs and culture.
              </p>
              <p>
                Whether you are a company looking for reliable talent or a candidate searching for the right opportunity, we are here to support you.
              </p>
            </div>
          </div>
          <div className="relative h-80 lg:h-[420px] rounded-2xl overflow-hidden shadow-xl">
            <Image
              src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=800&h=600&fit=crop"
              alt="Our team collaborating"
              fill
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-bl from-accent/20 to-transparent" />
          </div>
        </div>
      </SectionWrapper>

      <SectionWrapper className="bg-surface">
        <div className="text-center">
          <span className="text-accent font-semibold text-sm uppercase tracking-wider">Our Expertise</span>
          <h2 className="mt-3 font-heading text-3xl font-bold text-primary sm:text-4xl">
            Industries &amp; Roles We Hire For
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-secondary">
            We provide hiring solutions across multiple industries, including:
          </p>
        </div>

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {[
            { title: 'Sales & Marketing', icon: (
              <svg className="h-7 w-7" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75zM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V8.625zM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V4.125z" />
              </svg>
            )},
            { title: 'HR & Recruitment', icon: (
              <svg className="h-7 w-7" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z" />
              </svg>
            )},
            { title: 'IT & Technical Roles', icon: (
              <svg className="h-7 w-7" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 17.25v1.007a3 3 0 01-.879 2.122L7.5 21h9l-.621-.621A3 3 0 0115 18.257V17.25m6-12V15a2.25 2.25 0 01-2.25 2.25H5.25A2.25 2.25 0 013 15V5.25A2.25 2.25 0 015.25 3h13.5A2.25 2.25 0 0121 5.25z" />
              </svg>
            )},
            { title: 'Retail & FMCG', icon: (
              <svg className="h-7 w-7" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 21v-7.5a.75.75 0 01.75-.75h3a.75.75 0 01.75.75V21m-4.5 0H2.36m11.14 0H18m0 0h3.64m-1.39 0V9.349m-16.5 11.65V9.35m0 0a3.001 3.001 0 003.75-.615A2.993 2.993 0 009.75 9.75c.896 0 1.7-.393 2.25-1.016a2.993 2.993 0 002.25 1.016c.896 0 1.7-.393 2.25-1.016A3.001 3.001 0 0021 9.349m-18 0a2.999 2.999 0 00.621-1.846L4.25 3h15.5l.628 4.503A2.999 2.999 0 0021 9.35z" />
              </svg>
            )},
            { title: 'Back Office & Operations', icon: (
              <svg className="h-7 w-7" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 21h19.5m-18-18v18m10.5-18v18m6-13.5V21M6.75 6.75h.75m-.75 3h.75m-.75 3h.75m3-6h.75m-.75 3h.75m-.75 3h.75M6.75 21v-3.375c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21M3 3h12m-.75 4.5H21m-3.75 3.75h.008v.008h-.008v-.008zm0 3h.008v.008h-.008v-.008zm0 3h.008v.008h-.008v-.008z" />
              </svg>
            )},
            { title: 'Entry-Level & Mid-Level Positions', icon: (
              <svg className="h-7 w-7" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M4.26 10.147a60.436 60.436 0 00-.491 6.347A48.627 48.627 0 0112 20.904a48.627 48.627 0 018.232-4.41 60.46 60.46 0 00-.491-6.347m-15.482 0a50.57 50.57 0 00-2.658-.813A59.905 59.905 0 0112 3.493a59.902 59.902 0 0110.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.697 50.697 0 0112 13.489a50.702 50.702 0 017.74-3.342M6.75 15a.75.75 0 100-1.5.75.75 0 000 1.5zm0 0v-3.675A55.378 55.378 0 0112 8.443m-7.007 11.55A5.981 5.981 0 006.75 15.75v-1.5" />
              </svg>
            )},
          ].map((industry, index) => (
            <div key={index} className="flex items-start gap-4 bg-white rounded-xl p-6 shadow-sm border border-slate-100">
              <div className="flex-shrink-0 inline-flex items-center justify-center w-14 h-14 rounded-full bg-accent/10 text-accent">
                {industry.icon}
              </div>
              <div>
                <h3 className="font-heading text-lg font-semibold text-primary">{industry.title}</h3>
              </div>
            </div>
          ))}
        </div>

        <p className="mt-10 text-center text-secondary">
          If you don&apos;t see your industry listed, feel free to{' '}
          <a href="/contact" className="text-accent font-semibold hover:underline">contact us</a>{' '}
          - we are always ready to help.
        </p>
      </SectionWrapper>

      <SectionWrapper>
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-16 items-center">
          <div>
            <span className="text-accent font-semibold text-sm uppercase tracking-wider">For Employers</span>
            <h2 className="mt-3 font-heading text-3xl font-bold text-primary sm:text-4xl">
              Looking to Hire?
            </h2>
            <p className="mt-4 text-secondary text-lg leading-relaxed">
              We simplify your hiring process in 3 easy steps:
            </p>
            <div className="mt-8 space-y-6">
              {[
                { step: '01', text: 'Share your hiring requirement' },
                { step: '02', text: 'We screen and shortlist qualified candidates' },
                { step: '03', text: 'You interview and hire the best fit' },
              ].map((item, index) => (
                <div key={index} className="flex items-start gap-4">
                  <span className="flex-shrink-0 inline-flex items-center justify-center w-10 h-10 rounded-full bg-accent text-white text-sm font-bold">
                    {item.step}
                  </span>
                  <p className="text-secondary text-lg pt-1.5">{item.text}</p>
                </div>
              ))}
            </div>
            <p className="mt-8 text-secondary text-lg">
              Our goal is to save your time and provide quality candidates quickly.
            </p>
            <div className="mt-8">
              <Button as="link" href="/contact" size="lg">
                Contact Us Today
              </Button>
            </div>
          </div>
          <div className="bg-accent/5 rounded-2xl p-8 lg:p-12 border border-accent/10">
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-accent/10 text-accent mb-6">
                <svg className="h-10 w-10" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 14.15v4.25c0 1.094-.787 2.036-1.872 2.18-2.087.277-4.216.42-6.378.42s-4.291-.143-6.378-.42c-1.085-.144-1.872-1.086-1.872-2.18v-4.25m16.5 0a2.18 2.18 0 00.75-1.661V8.706c0-1.081-.768-2.015-1.837-2.175a48.114 48.114 0 00-3.413-.387m4.5 8.006c-.194.165-.42.295-.673.38A23.978 23.978 0 0112 15.75c-2.648 0-5.195-.429-7.577-1.22a2.016 2.016 0 01-.673-.38m0 0A2.18 2.18 0 013 12.489V8.706c0-1.081.768-2.015 1.837-2.175a48.111 48.111 0 013.413-.387m7.5 0V5.25A2.25 2.25 0 0013.5 3h-3a2.25 2.25 0 00-2.25 2.25v.894m7.5 0a48.667 48.667 0 00-7.5 0M12 12.75h.008v.008H12v-.008z" />
                </svg>
              </div>
              <p className="text-3xl font-bold text-primary">1000+</p>
              <p className="text-muted text-sm mt-1">Successful Placements</p>
              <div className="mt-6 grid grid-cols-2 gap-4">
                <div className="bg-white rounded-lg p-4 shadow-sm">
                  <p className="text-2xl font-bold text-primary">50+</p>
                  <p className="text-muted text-sm">Partner Companies</p>
                </div>
                <div className="bg-white rounded-lg p-4 shadow-sm">
                  <p className="text-2xl font-bold text-primary">98%</p>
                  <p className="text-muted text-sm">Client Satisfaction</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </SectionWrapper>

      <SectionWrapper className="bg-surface">
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-16 items-center">
          <div className="order-2 lg:order-1 bg-primary/5 rounded-2xl p-8 lg:p-12 border border-primary/10">
            <div className="space-y-5">
              {[
                'Verified job opportunities',
                'Guidance during the hiring process',
                'Professional support',
              ].map((item, index) => (
                <div key={index} className="flex items-center gap-4 bg-white rounded-xl p-5 shadow-sm">
                  <div className="flex-shrink-0 inline-flex items-center justify-center w-10 h-10 rounded-full bg-green-100 text-green-600">
                    <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                    </svg>
                  </div>
                  <p className="text-primary font-medium text-lg">{item}</p>
                </div>
              ))}
            </div>
          </div>
          <div className="order-1 lg:order-2">
            <span className="text-accent font-semibold text-sm uppercase tracking-wider">For Job Seekers</span>
            <h2 className="mt-3 font-heading text-3xl font-bold text-primary sm:text-4xl">
              Searching for the Right Opportunity?
            </h2>
            <p className="mt-4 text-secondary text-lg leading-relaxed">
              We work closely with companies to bring you genuine job openings that match your skills and career goals.
            </p>
            <div className="mt-8">
              <Button as="link" href="/upload-cv" size="lg">
                Submit Your Resume
              </Button>
            </div>
          </div>
        </div>
      </SectionWrapper>

      <SectionWrapper>
        <div className="text-center">
          <span className="text-accent font-semibold text-sm uppercase tracking-wider">Our Promise</span>
          <h2 className="mt-3 font-heading text-3xl font-bold text-primary sm:text-4xl">
            Why Choose Us?
          </h2>
        </div>
        <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {[
            { title: 'Personalized Approach', description: 'Recruitment tailored to your specific needs and goals.' },
            { title: 'Fast Response', description: 'Quick turnaround time so you never miss an opportunity.' },
            { title: 'Quality Over Quantity', description: 'We focus on the right match, not just filling numbers.' },
            { title: 'Client Satisfaction', description: 'Strong commitment to exceeding expectations every time.' },
          ].map((item, index) => (
            <div key={index} className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-accent/10 text-accent mb-4">
                <svg className="h-7 w-7" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                </svg>
              </div>
              <h3 className="font-heading text-xl font-semibold text-primary">{item.title}</h3>
              <p className="mt-3 text-secondary max-w-xs mx-auto">{item.description}</p>
            </div>
          ))}
        </div>
        <p className="mt-12 text-center text-secondary text-lg max-w-2xl mx-auto">
          At Shree Shyam Talent Solutions, we believe the right hire can transform a business.
        </p>
      </SectionWrapper>

      <SectionWrapper className="bg-primary">
        <div className="text-center">
          <h2 className="font-heading text-3xl font-bold text-white sm:text-4xl">
            Ready to Take the Next Step?
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-slate-300">
            Whether you&apos;re hiring or job searching, Shree Shyam Talent Solutions is here to help.
          </p>
          <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Button as="link" href="/upload-cv" size="lg">
              Submit Your Resume
            </Button>
            <Button as="link" href="/contact" variant="text" size="lg" className="text-white hover:text-accent">
              Contact Our Team
            </Button>
          </div>
        </div>
      </SectionWrapper>
    </>
  );
}
