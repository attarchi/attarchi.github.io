import { cn } from '@/lib/utils';

export interface ProjectCardProps extends React.HTMLAttributes<HTMLDivElement> {
  title: string;
  description: string;
}

export function ProjectCard({ 
  title, 
  description, 
  className, 
  ...props 
}: ProjectCardProps) {
  return (
    <div
      className={cn(
        // Background: #f6f8fa (light) / #21262d (dark)
        'bg-surface',
        // Border: 1px solid #d0d7de (light) / #30363d (dark)
        'border border-muted/20',
        // Border radius: rounded-lg
        'rounded-lg',
        // Padding: p-6
        'p-6',
        // Hover effect: shadow-lg transition-all duration-300
        'hover:shadow-lg transition-all duration-300',
        // Hover background: slightly lighter/darker
        'hover:bg-surface-light dark:hover:bg-surface-dark',
        className
      )}
      {...props}
    >
      <div className="space-y-4">
        {/* Project title: JetBrains Mono, text-xl, font-semibold */}
        <h3 className="font-mono text-xl font-semibold text-text">
          {title}
        </h3>
        
        {/* Project description: Inter, text-base, #656d76 (light) / #8b949e (dark) */}
        <p className="font-sans text-base text-muted">
          {description}
        </p>
      </div>
    </div>
  );
} 