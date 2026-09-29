import Link from 'next/link';

export interface JobCardProps {
  id: string;
  title: string;
  company: string;
  location: string;
  type: 'Full-time' | 'Part-time' | 'Contract' | 'Remote' | 'Internship';
  salary?: string;
  postedAt?: string;
  className?: string;
}

export default function JobCard({
  id,
  title,
  company,
  location,
  type,
  salary,
  postedAt,
  className = '',
}: JobCardProps) {
  const typeColors: Record<string, string> = {
    'Full-time': 'bg-green-100 text-green-800',
    'Part-time': 'bg-blue-100 text-blue-800',
    Contract: 'bg-amber-100 text-amber-800',
    Remote: 'bg-purple-100 text-purple-800',
    Internship: 'bg-pink-100 text-pink-800',
  };

  return (
    <article
      className={`rounded-lg bg-surface p-6 shadow-md transition-shadow duration-200 hover:shadow-lg ${className}`}
    >
      <div className="flex items-start justify-between gap-4">
        <div className="flex-1">
          <h3 className="font-heading text-lg font-semibold text-primary line-clamp-2">
            {title}
          </h3>
          <p className="mt-1 text-secondary">{company}</p>
        </div>
        <span
          className={`shrink-0 rounded-md px-2.5 py-1 text-xs font-medium ${typeColors[type]}`}
        >
          {type}
        </span>
      </div>

      <div className="mt-4 flex flex-wrap items-center gap-4 text-sm text-muted">
        <div className="flex items-center gap-1.5">
          <svg
            className="h-4 w-4"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z"
            />
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z"
            />
          </svg>
          <span>{location}</span>
        </div>

        {salary && (
          <div className="flex items-center gap-1.5">
            <svg
              className="h-4 w-4"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 6v12m-3-2.818l.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <span>{salary}</span>
          </div>
        )}

        {postedAt && (
          <div className="flex items-center gap-1.5">
            <svg
              className="h-4 w-4"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <span>{postedAt}</span>
          </div>
        )}
      </div>

      <div className="mt-6 flex items-center justify-end border-t border-background pt-4">
        <Link
          href={`/jobs/${id}`}
          className="inline-flex items-center gap-1.5 text-sm font-medium text-accent hover:text-amber-700 transition-colors duration-200"
        >
          View Details
          <svg
            className="h-4 w-4"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2}
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"
            />
          </svg>
        </Link>
      </div>
    </article>
  );
}
