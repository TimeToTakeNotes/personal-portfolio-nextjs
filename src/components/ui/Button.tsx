import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@arno/lib/utils"
import { Loader2 } from "lucide-react"

const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap rounded-md font-medium transition-colors transition-transform duration-200 ease-in-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none active:scale-95 cursor-pointer",
  {
    variants: {
      variant: {
        primary: "bg-primary text-primary-foreground shadow-md hover:shadow-lg hover:scale-105 transform",
        secondary: "bg-secondary text-secondary-foreground hover:bg-primary hover:text-secondary hover:-translate-y-0.5 hover:shadow-md",
        outline: "border border-border bg-transparent text-primary relative overflow-hidden hover:bg-secondary-hover",
        error: "bg-destructive text-destructive-foreground shadow-sm hover:bg-destructive-hover hover:shadow-md hover:brightness-95",
        ghost: "bg-transparent text-foreground hover:bg-accent hover:text-accent-foreground hover:scale-101 transform",
        link: "text-link no-underline double-underline-animated",
      },
      size: {
        sm: "text-sm px-3 py-1.5",
        md: "text-base px-4 py-2",
        lg: "text-lg px-5 py-3",
        xl: "text-xl px-6 py-3.5",
        icon: "h-10 w-10 p-0",
      },
      rounded: {
        true: "rounded-full",
        false: "rounded-md",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "md",
      rounded: false,
    },
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
  loading?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, rounded, loading = false, asChild = false, children, ...props }, ref) => {
    const Comp = asChild ? Slot : "button"
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, rounded, className }))}
        ref={ref}
        disabled={loading || props.disabled}
        {...props}
      >
        {loading && (
          <Loader2 className="mr-2 h-4 w-4 animate-spin" aria-hidden="true" />
        )}
        {children}
      </Comp>
    )
  }
)
Button.displayName = "Button"

export { Button, buttonVariants }