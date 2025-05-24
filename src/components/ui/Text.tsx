import { cn } from "@/lib/utils";
import { VariantProps, cva } from "class-variance-authority";
import { forwardRef } from "react";

const textVariants = cva("", {
  variants: {
    size: {
      xs: "text-xs",
      sm: "text-sm",
      base: "text-base",
      lg: "text-lg",
      xl: "text-xl",
    },
    variant: {
      default: "text-text",
      muted: "text-muted",
      subtle: "text-subtle",
    },
    weight: {
      normal: "font-normal",
      medium: "font-medium",
      semibold: "font-semibold",
      bold: "font-bold",
    },
  },
  defaultVariants: {
    size: "base",
    variant: "default",
    weight: "normal",
  },
});

interface TextProps
  extends React.HTMLAttributes<HTMLParagraphElement>,
    VariantProps<typeof textVariants> {}

const Text = forwardRef<HTMLParagraphElement, TextProps>(
  ({ className, size, variant, weight, ...props }, ref) => {
    return (
      <p
        className={cn(textVariants({ size, variant, weight, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);

Text.displayName = "Text";

export { Text, textVariants }; 