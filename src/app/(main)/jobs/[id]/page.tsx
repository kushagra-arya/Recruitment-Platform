import { notFound } from 'next/navigation';
import Link from 'next/link';
import { Button, SectionWrapper } from '@/components';
import { getJobById, getAllJobs } from '@/lib/jobs-data';
import type { Metadata } from 'next';

interface JobDetailPageProps {
  params: Promise<{ id: string }>;
}

export async function generateStaticParams() {
  const jobs = getAllJobs();
  return jobs.map((job) => ({
    id: job.id,
  }));
}

export async function generateMetadata({ params }: JobDetailPageProps): Promise<Metadata> {
  const { id } = await params;
  const job = getJobById(id);
  
  if (!job) {
    return {
      title: 'Job Not Found - Shree Shyam Talent Solutions',
    };
  }

  return {
    title: `${job.title} at ${job.company} - Shree Shyam Talent Solutions`,
    description: job.description,
  };
}

export default async function JobDetailPage({ params }: JobDetailPageProps) {
  const { id } = await params;
  const job = getJobById(id);

  if (!job) {
    notFound();
  }

  const typeColors: Record<string, string> = {
    'Full-time': 'bg-green-100 text-green-800',
    'Part-time': 'bg-blue-100 text-blue-800',
    Contract: 'bg-amber-100 text-amber-800',
    Remote: 'bg-purple-100 text-purple-800',
    Internship: 'bg-pink-100 text-pink-800',
  };

  return (
    <>
      <section className="relative bg-primary py-16 lg:py-20">
        <div className="absolute inset-0 bg-gradient-to-br from-primary via-primary to-slate-800" />
        <div className="relative mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-6">
            <div>
              <h1 className="font-heading text-4xl font-extrabold text-white sm:text-5xl lg:text-6xl tracking-tight drop-shadow-lg">
                {job.title}
              </h1>
              <p className="mt-4 text-2xl text-slate-300 font-medium">{job.company}</p>
              
              <div className="mt-6 flex flex-wrap items-center gap-4">
                <span className={`rounded-md px-3 py-1 text-sm font-medium ${typeColors[job.type]}`}>
                  {job.type}
                </span>
                <span className="text-slate-400 text-sm">{job.postedAt}</span>
              </div>
              
              <div className="mt-8 flex flex-wrap gap-8 text-slate-300 text-lg">
                <div className="flex items-center gap-2">
                  <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
                  </svg>
                  <span>{job.location}</span>
                </div>
                <div className="flex items-center gap-2">
                  <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v12m-3-2.818l.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span>{job.salary}</span>
                </div>
                <div className="flex items-center gap-2">
                  <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 14.15v4.25c0 1.094-.787 2.036-1.872 2.18-2.087.277-4.216.42-6.378.42s-4.291-.143-6.378-.42c-1.085-.144-1.872-1.086-1.872-2.18v-4.25m16.5 0a2.18 2.18 0 00.75-1.661V8.706c0-1.081-.768-2.015-1.837-2.175a48.114 48.114 0 00-3.413-.387m4.5 8.006c-.194.165-.42.295-.673.38A23.978 23.978 0 0112 15.75c-2.648 0-5.195-.429-7.577-1.22a2.016 2.016 0 01-.673-.38m0 0A2.18 2.18 0 013 12.489V8.706c0-1.081.768-2.015 1.837-2.175a48.111 48.111 0 013.413-.387m7.5 0V5.25A2.25 2.25 0 0013.5 3h-3a2.25 2.25 0 00-2.25 2.25v.894m7.5 0a48.667 48.667 0 00-7.5 0M12 12.75h.008v.008H12v-.008z" />
                  </svg>
                  <span>{job.experience}</span>
                </div>
              </div>
            </div>
            
            <div className="lg:shrink-0">
              <Button as="link" href="/upload-cv" size="lg">
                Apply Now
              </Button>
            </div>
          </div>
        </div>
      </section>

      <SectionWrapper className="bg-background" padding="md">
        <div className="mx-auto max-w-5xl">
          <div className="grid gap-8 lg:grid-cols-3">
            <div className="lg:col-span-2 space-y-8">
              <section className="bg-surface rounded-xl p-6 shadow-md">
                <h2 className="font-heading text-xl font-semibold text-primary mb-4">
                  About the Role
                </h2>
                <p className="text-secondary leading-relaxed">
                  {job.description}
                </p>
              </section>

              <section className="bg-surface rounded-xl p-6 shadow-md">
                <h2 className="font-heading text-xl font-semibold text-primary mb-4">
                  Key Responsibilities
                </h2>
                <ul className="space-y-3">
                  {job.responsibilities.map((item, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <svg className="h-5 w-5 text-accent shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                      <span className="text-secondary">{item}</span>
                    </li>
                  ))}
                </ul>
              </section>

              <section className="bg-surface rounded-xl p-6 shadow-md">
                <h2 className="font-heading text-xl font-semibold text-primary mb-4">
                  Requirements
                </h2>
                <ul className="space-y-3">
                  {job.requirements.map((item, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <svg className="h-5 w-5 text-primary shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      <span className="text-secondary">{item}</span>
                    </li>
                  ))}
                </ul>
              </section>

              <section className="bg-surface rounded-xl p-6 shadow-md">
                <h2 className="font-heading text-xl font-semibold text-primary mb-4">
                  Benefits & Perks
                </h2>
                <div className="grid gap-3 sm:grid-cols-2">
                  {job.benefits.map((item, index) => (
                    <div key={index} className="flex items-center gap-3 bg-background rounded-lg p-3">
                      <svg className="h-5 w-5 text-green-600 shrink-0" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      <span className="text-secondary text-sm">{item}</span>
                    </div>
                  ))}
                </div>
              </section>
            </div>

            <div className="space-y-6">
              <div className="bg-surface rounded-xl p-6 shadow-md sticky top-24">
                <h3 className="font-heading text-lg font-semibold text-primary mb-4">
                  Interested in this role?
                </h3>
                <p className="text-secondary text-sm mb-6">
                  Apply now and our recruitment team will get back to you within 48 hours.
                </p>
                <Button as="link" href="/upload-cv" className="w-full mb-3">
                  Apply Now
                </Button>
                <Button as="link" href="/jobs" variant="secondary" className="w-full">
                  View All Jobs
                </Button>
              </div>

              <div className="bg-surface rounded-xl p-6 shadow-md">
                <h3 className="font-heading text-lg font-semibold text-primary mb-4">
                  About {job.company}
                </h3>
                <p className="text-secondary text-sm leading-relaxed">
                  {job.about}
                </p>
              </div>

              <div className="bg-surface rounded-xl p-6 shadow-md">
                <h3 className="font-heading text-lg font-semibold text-primary mb-4">
                  Share this job
                </h3>
                <div className="flex gap-3">
                  <button className="flex-1 flex items-center justify-center gap-2 bg-blue-600 text-white rounded-lg py-2 px-4 hover:bg-blue-700 transition-colors">
                    <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                    </svg>
                  </button>
                  <button className="flex-1 flex items-center justify-center gap-2 bg-black text-white rounded-lg py-2 px-4 hover:bg-gray-800 transition-colors">
                    <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </SectionWrapper>

      <SectionWrapper className="bg-primary" padding="md">
        <div className="text-center">
          <h2 className="font-heading text-2xl font-bold text-white sm:text-3xl">
            Ready to Take the Next Step?
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-slate-300">
            Upload your CV and let our expert recruiters match you with the perfect opportunity.
          </p>
          <Button as="link" href="/upload-cv" size="lg" className="mt-6">
            Submit Your Application
          </Button>
        </div>
      </SectionWrapper>
    </>
  );
}
