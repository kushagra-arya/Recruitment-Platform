import { ReactNode } from 'react';

type PaddingSize = 'sm' | 'md' | 'lg';

interface SectionWrapperProps {
  children: ReactNode;
  className?: string;
  padding?: PaddingSize;
  as?: 'section' | 'div' | 'article';
  id?: string;
}

const paddingStyles: Record<PaddingSize, string> = {
  sm: 'py-8 lg:py-12',
  md: 'py-12 lg:py-16',
  lg: 'py-16 lg:py-24',
};

export default function SectionWrapper({
  children,
  className = '',
  padding = 'lg',
  as: Component = 'section',
  id,
}: SectionWrapperProps) {
  return (
    <Component id={id} className={`${paddingStyles[padding]} ${className}`}>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {children}
      </div>
    </Component>
  );
}
