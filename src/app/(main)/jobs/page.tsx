'use client';

import { useState } from "react";
import { JobCard, SectionWrapper, Button } from "@/components";
import { jobsData } from "@/lib/jobs-data";

const locations = ["All Locations", "Bangalore", "Hyderabad", "Gurugram", "Pune", "Delhi"];
const industries = ["All Industries", "Technology", "E-commerce", "Fintech", "IT Services", "Food Tech"];
const jobTypes = ["All Types", "Full-time", "Part-time", "Contract", "Remote", "Internship"];

export default function JobsPage() {
  const [selectedLocation, setSelectedLocation] = useState("All Locations");
  const [selectedType, setSelectedType] = useState("All Types");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredJobs = jobsData.filter((job) => {
    const matchesLocation = selectedLocation === "All Locations" || job.location.includes(selectedLocation);
    const matchesType = selectedType === "All Types" || job.type === selectedType;
    const matchesSearch = searchQuery === "" || 
      job.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      job.company.toLowerCase().includes(searchQuery.toLowerCase());
    
    return matchesLocation && matchesType && matchesSearch;
  });

  const clearFilters = () => {
    setSelectedLocation("All Locations");
    setSelectedType("All Types");
    setSearchQuery("");
  };

  return (
    <>
      <section className="relative bg-primary py-16 lg:py-20">
        <div className="absolute inset-0 bg-gradient-to-br from-primary via-primary to-slate-800" />
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="font-heading text-4xl font-bold tracking-tight text-white sm:text-5xl">
              Job Openings
            </h1>
            <p className="mx-auto mt-4 max-w-2xl text-lg text-slate-300">
              Discover your next opportunity from our curated selection of roles across India.
            </p>
          </div>

          <div className="mt-8 max-w-2xl mx-auto">
            <div className="relative">
              <input
                type="text"
                placeholder="Search jobs by title or company..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full rounded-lg bg-white px-5 py-4 pl-12 text-primary placeholder:text-muted shadow-lg focus:outline-none focus:ring-2 focus:ring-accent"
              />
              <svg
                className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2}
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
              </svg>
            </div>
          </div>
        </div>
      </section>

      <SectionWrapper className="bg-background" padding="md">
        <div className="grid gap-8 lg:grid-cols-4">
          <aside className="lg:col-span-1">
            <div className="sticky top-24 rounded-lg bg-surface p-6 shadow-md">
              <div className="flex items-center justify-between mb-6">
                <h2 className="font-heading text-lg font-semibold text-primary">Filters</h2>
                <button
                  onClick={clearFilters}
                  className="text-sm text-accent hover:text-amber-700 transition-colors"
                >
                  Clear all
                </button>
              </div>

              <div className="mb-6">
                <label className="block text-sm font-medium text-primary mb-2">
                  Location
                </label>
                <select
                  value={selectedLocation}
                  onChange={(e) => setSelectedLocation(e.target.value)}
                  className="w-full rounded-lg border border-slate-300 bg-white px-4 py-2.5 text-slate-900 focus:border-amber-500 focus:outline-none focus:ring-2 focus:ring-amber-500 cursor-pointer appearance-none"
                  style={{ backgroundImage: `url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%236b7280' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='M6 8l4 4 4-4'/%3e%3c/svg%3e")`, backgroundPosition: 'right 0.5rem center', backgroundRepeat: 'no-repeat', backgroundSize: '1.5em 1.5em', paddingRight: '2.5rem' }}
                >
                  {locations.map((location) => (
                    <option key={location} value={location}>
                      {location}
                    </option>
                  ))}
                </select>
              </div>

              <div className="mb-6">
                <label className="block text-sm font-medium text-primary mb-2">
                  Job Type
                </label>
                <div className="space-y-2">
                  {jobTypes.map((type) => (
                    <label key={type} className="flex items-center gap-3 cursor-pointer">
                      <input
                        type="radio"
                        name="jobType"
                        checked={selectedType === type}
                        onChange={() => setSelectedType(type)}
                        className="h-4 w-4 text-accent border-secondary focus:ring-accent"
                      />
                      <span className="text-secondary text-sm">{type}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div className="mt-8 p-4 bg-accent/10 rounded-lg">
                <h3 className="font-semibold text-primary text-sm">Job Alerts</h3>
                <p className="text-muted text-xs mt-1">Get notified when new jobs match your criteria.</p>
                <Button as="link" href="/upload-cv" size="sm" className="mt-3 w-full">
                  Sign Up
                </Button>
              </div>
            </div>
          </aside>

          <main className="lg:col-span-3">
            <div className="flex items-center justify-between mb-6">
              <p className="text-secondary">
                Showing <span className="font-semibold text-primary">{filteredJobs.length}</span> jobs
              </p>
              <select className="rounded-lg border border-background bg-white px-4 py-2 text-sm text-secondary focus:border-accent focus:outline-none">
                <option>Most Recent</option>
                <option>Highest Salary</option>
                <option>A-Z</option>
              </select>
            </div>

            {filteredJobs.length > 0 ? (
              <div className="grid gap-6 md:grid-cols-2">
                {filteredJobs.map((job) => (
                  <JobCard 
                    key={job.id} 
                    id={job.id}
                    title={job.title}
                    company={job.company}
                    location={job.location}
                    type={job.type}
                    salary={job.salary}
                    postedAt={job.postedAt}
                  />
                ))}
              </div>
            ) : (
              <div className="text-center py-16 bg-surface rounded-lg">
                <svg
                  className="mx-auto h-12 w-12 text-muted"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 14.15v4.25c0 1.094-.787 2.036-1.872 2.18-2.087.277-4.216.42-6.378.42s-4.291-.143-6.378-.42c-1.085-.144-1.872-1.086-1.872-2.18v-4.25m16.5 0a2.18 2.18 0 00.75-1.661V8.706c0-1.081-.768-2.015-1.837-2.175a48.114 48.114 0 00-3.413-.387m4.5 8.006c-.194.165-.42.295-.673.38A23.978 23.978 0 0112 15.75c-2.648 0-5.195-.429-7.577-1.22a2.016 2.016 0 01-.673-.38m0 0A2.18 2.18 0 013 12.489V8.706c0-1.081.768-2.015 1.837-2.175a48.111 48.111 0 013.413-.387m7.5 0V5.25A2.25 2.25 0 0013.5 3h-3a2.25 2.25 0 00-2.25 2.25v.894m7.5 0a48.667 48.667 0 00-7.5 0M12 12.75h.008v.008H12v-.008z" />
                </svg>
                <h3 className="mt-4 font-heading text-lg font-semibold text-primary">No jobs found</h3>
                <p className="mt-2 text-muted">Try adjusting your filters or search terms.</p>
                <Button onClick={clearFilters} variant="secondary" className="mt-4">
                  Clear Filters
                </Button>
              </div>
            )}
          </main>
        </div>
      </SectionWrapper>

      <SectionWrapper className="bg-primary" padding="md">
        <div className="text-center">
          <h2 className="font-heading text-2xl font-bold text-white sm:text-3xl">
            Can&apos;t Find What You&apos;re Looking For?
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-slate-300">
            Upload your CV and let our recruiters find the perfect opportunity for you.
          </p>
          <Button as="link" href="/upload-cv" size="lg" className="mt-6">
            Upload Your CV
          </Button>
        </div>
      </SectionWrapper>
    </>
  );
}
