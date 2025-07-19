import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib';

const cardVariants = cva(
  'rounded-lg border bg-surface text-text shadow-sm transition-all duration-200',
  {
    variants: {
      variant: {
        default: 'hover:shadow-md',
        elevated: 'shadow-md hover:shadow-lg',
        ghost: 'border-none hover:bg-accent/50',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  }
);

const cardHeaderVariants = cva('flex flex-col space-y-1.5 p-6');
const cardTitleVariants = cva('text-2xl font-semibold leading-none tracking-tight');
const cardDescriptionVariants = cva('text-sm text-muted');
const cardContentVariants = cva('p-6 pt-0');
const cardFooterVariants = cva('flex items-center p-6 pt-0');

export type CardVariant = NonNullable<VariantProps<typeof cardVariants>['variant']>;

export interface CardProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof cardVariants> {
  variant?: CardVariant;
}

function Card({ className, variant, ...props }: CardProps) {
  return (
    <div className={cn(cardVariants({ variant }), className)} {...props} />
  );
}

function CardHeader({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cn(cardHeaderVariants(), className)} {...props} />;
}

function CardTitle({ className, ...props }: React.HTMLAttributes<HTMLHeadingElement>) {
  return <h3 className={cn(cardTitleVariants(), className)} {...props} />;
}

function CardDescription({ className, ...props }: React.HTMLAttributes<HTMLParagraphElement>) {
  return <p className={cn(cardDescriptionVariants(), className)} {...props} />;
}

function CardContent({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cn(cardContentVariants(), className)} {...props} />;
}

function CardFooter({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cn(cardFooterVariants(), className)} {...props} />;
}

export { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter }; 