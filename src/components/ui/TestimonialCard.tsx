import Image from 'next/image';

export interface TestimonialCardProps {
  quote: string;
  authorName: string;
  authorRole: string;
  authorImage?: string;
  companyName?: string;
  className?: string;
}

export default function TestimonialCard({
  quote,
  authorName,
  authorRole,
  authorImage,
  companyName,
  className = '',
}: TestimonialCardProps) {
  return (
    <article
      className={`rounded-lg bg-surface p-8 shadow-md ${className}`}
    >
      <div className="mb-4">
        <svg
          className="h-8 w-8 text-accent/30"
          fill="currentColor"
          viewBox="0 0 24 24"
        >
          <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
        </svg>
      </div>

      <blockquote className="text-secondary leading-relaxed">
        &ldquo;{quote}&rdquo;
      </blockquote>

      <div className="mt-6 flex items-center gap-4">
        <div className="relative h-12 w-12 shrink-0 overflow-hidden rounded-full bg-background">
          {authorImage ? (
            <Image
              src={authorImage}
              alt={authorName}
              fill
              className="object-cover"
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center bg-accent/10 text-accent font-semibold text-lg">
              {authorName.charAt(0).toUpperCase()}
            </div>
          )}
        </div>

        <div>
          <p className="font-semibold text-primary">{authorName}</p>
          <p className="text-sm text-muted">
            {authorRole}
            {companyName && (
              <>
                {' '}
                <span className="text-secondary">at</span> {companyName}
              </>
            )}
          </p>
        </div>
      </div>
    </article>
  );
}
