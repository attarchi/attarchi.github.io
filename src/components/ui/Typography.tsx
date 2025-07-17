import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib';

const headingVariants = cva('font-bold tracking-tight', {
  variants: {
    size: {
      h1: 'text-4xl md:text-5xl lg:text-6xl',
      h2: 'text-3xl md:text-4xl lg:text-5xl',
      h3: 'text-2xl md:text-3xl lg:text-4xl',
      h4: 'text-xl md:text-2xl lg:text-3xl',
      h5: 'text-lg md:text-xl lg:text-2xl',
      h6: 'text-base md:text-lg lg:text-xl',
    },
  },
  defaultVariants: {
    size: 'h1',
  },
});

const textVariants = cva('', {
  variants: {
    variant: {
      default: 'text-foreground',
      muted: 'text-muted-foreground',
      subtle: 'text-muted-foreground/80',
    },
    size: {
      xs: 'text-xs',
      sm: 'text-sm',
      base: 'text-base',
      lg: 'text-lg',
      xl: 'text-xl',
    },
    weight: {
      normal: 'font-normal',
      medium: 'font-medium',
      semibold: 'font-semibold',
      bold: 'font-bold',
    },
  },
  defaultVariants: {
    variant: 'default',
    size: 'base',
    weight: 'normal',
  },
});

export type HeadingSize = NonNullable<VariantProps<typeof headingVariants>['size']>;
export type TextVariant = NonNullable<VariantProps<typeof textVariants>['variant']>;
export type TextSize = NonNullable<VariantProps<typeof textVariants>['size']>;
export type TextWeight = NonNullable<VariantProps<typeof textVariants>['weight']>;

export interface HeadingProps
  extends React.HTMLAttributes<HTMLHeadingElement>,
    VariantProps<typeof headingVariants> {
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
  size?: HeadingSize;
}

export interface TextProps
  extends React.HTMLAttributes<HTMLParagraphElement>,
    VariantProps<typeof textVariants> {
  variant?: TextVariant;
  size?: TextSize;
  weight?: TextWeight;
}

function Heading({
  className,
  size,
  as: Component = 'h1',
  ...props
}: HeadingProps) {
  return (
    <Component
      className={cn(headingVariants({ size }), className)}
      {...props}
    />
  );
}

function Text({
  className,
  variant,
  size,
  weight,
  ...props
}: TextProps) {
  return (
    <p
      className={cn(textVariants({ variant, size, weight }), className)}
      {...props}
    />
  );
}

export { Heading, Text }; 