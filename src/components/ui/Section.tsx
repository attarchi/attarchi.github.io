import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib';

const sectionVariants = cva('w-full', {
  variants: {
    spacing: {
      none: '',
      sm: 'py-4',
      md: 'py-8',
      lg: 'py-12',
      xl: 'py-16',
    },
    maxWidth: {
      none: '',
      sm: 'max-w-sm',
      md: 'max-w-md',
      lg: 'max-w-lg',
      xl: 'max-w-xl',
      '2xl': 'max-w-2xl',
      '3xl': 'max-w-3xl',
      '4xl': 'max-w-4xl',
      '5xl': 'max-w-5xl',
      '6xl': 'max-w-6xl',
      '7xl': 'max-w-7xl',
    },
    align: {
      left: 'text-left',
      center: 'text-center',
      right: 'text-right',
    },
    variant: {
      default: 'bg-background',
      surface: 'bg-surface',
      accent: 'bg-accent text-background',
    },
  },
  defaultVariants: {
    spacing: 'md',
    maxWidth: '7xl',
    align: 'left',
    variant: 'default',
  },
});

export type SectionSpacing = NonNullable<VariantProps<typeof sectionVariants>['spacing']>;
export type SectionMaxWidth = NonNullable<VariantProps<typeof sectionVariants>['maxWidth']>;
export type SectionAlign = NonNullable<VariantProps<typeof sectionVariants>['align']>;
export type SectionVariant = NonNullable<VariantProps<typeof sectionVariants>['variant']>;

export interface SectionProps
  extends React.HTMLAttributes<HTMLElement>,
    VariantProps<typeof sectionVariants> {
  spacing?: SectionSpacing;
  maxWidth?: SectionMaxWidth;
  align?: SectionAlign;
  variant?: SectionVariant;
}

function Section({
  className,
  spacing,
  maxWidth,
  align,
  variant,
  ...props
}: SectionProps) {
  return (
    <section
      className={cn(sectionVariants({ spacing, maxWidth, align, variant }), className)}
      {...props}
    />
  );
}

export { Section, sectionVariants }; 