import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib';
import { Loader2 } from 'lucide-react';
import React, { forwardRef } from 'react';
import { Slot } from "@radix-ui/react-slot";

const buttonVariants = cva(
  'inline-flex items-center justify-center rounded-md text-sm font-medium transition-all duration-200 ease-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50',
  {
    variants: {
      variant: {
        default: 'bg-accent text-background hover:bg-accent/90 hover:scale-[1.02] hover:shadow-lg',
        destructive: 'bg-red-500 text-background hover:bg-red-600 hover:scale-[1.02] hover:shadow-lg',
        outline: 'border border-accent bg-background hover:bg-accent hover:text-background hover:scale-[1.02] hover:shadow-lg',
        secondary: 'bg-surface text-text hover:bg-surface/80 hover:scale-[1.02] hover:shadow-lg',
        ghost: 'hover:bg-surface hover:text-accent hover:scale-[1.02]',
        link: 'text-accent underline-offset-4 hover:underline hover:scale-[1.02]',
      },
      size: {
        default: 'h-10 px-4 py-2',
        sm: 'h-9 rounded-md px-3',
        lg: 'h-11 rounded-md px-8',
        icon: 'h-10 w-10',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  }
);

export type ButtonVariant = NonNullable<VariantProps<typeof buttonVariants>['variant']>;
export type ButtonSize = NonNullable<VariantProps<typeof buttonVariants>['size']>;

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  isLoading?: boolean;
  asChild?: boolean;
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, isLoading, children, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        className={cn(buttonVariants({ variant, size }), className)}
        ref={ref}
        disabled={isLoading}
        {...props}
      >
        {isLoading ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Loading...
          </>
        ) : (
          children
        )}
      </Comp>
    );
  }
);

Button.displayName = 'Button';

export { Button, buttonVariants }; 