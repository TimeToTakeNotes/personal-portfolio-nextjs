import * as React from "react"
import { tv, type VariantProps } from "tailwind-variants"
import { cn } from "@arno/lib/utils"

const card = tv({
  base: "rounded-2xl border shadow-sm transition-all duration-300 ease-in-out",
  variants: {
    variant: {
      default:
        "bg-card text-card-foreground border-border shadow-md hover:shadow-lg",
      outline:
        "bg-background text-foreground border-2 border-border shadow-none hover:border-primary/50 hover:shadow-sm",
      flat: "border-none shadow-none bg-transparent",
      glass:
        "bg-white/10 backdrop-blur-md border-white/20 text-white shadow-lg",
      interactive:
        "cursor-pointer bg-card text-card-foreground border-border hover:shadow-lg hover:scale-[1.01] active:scale-[0.99] transition-transform",
    },
    padding: {
      sm: "p-4",
      md: "p-6",
      lg: "p-8",
    },
    animation: {
      none: "",
      "hover-lift": "hover:-translate-y-1 hover:shadow-xl",
      "hover-glow": "hover:shadow-[0_0_20px_rgba(59,130,246,0.5)]",
      tilt: "hover:rotate-1 hover:scale-[1.01]",
      pulse: "hover:animate-pulse",
    },
    size: {
      auto: "max-w-md mx-auto", // fits content
      full: "w-full",           // stretches
      lg: "max-w-4xl mx-auto",  // large centered card
    },
  },
  defaultVariants: {
    variant: "default",
    padding: "md",
    animation: "none",
    size: "full",
  },
})

type CardVariants = VariantProps<typeof card>

interface CardProps
  extends React.HTMLAttributes<HTMLDivElement>,
    CardVariants {}

const Card = React.forwardRef<HTMLDivElement, CardProps>(
  (
    { className, variant, padding, animation, size, ...props },
    ref
  ) => (
    <div
      ref={ref}
      className={cn(
        card({ variant, padding, animation, size }),
        className
      )}
      {...props}
    />
  )
)
Card.displayName = "Card"

const CardHeader = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn("flex flex-col space-y-1.5 pb-4", className)}
      {...props}
    />
  )
)
CardHeader.displayName = "CardHeader"

const CardTitle = React.forwardRef<HTMLHeadingElement, React.HTMLAttributes<HTMLHeadingElement>>(
  ({ className, ...props }, ref) => (
    <h3
      ref={ref}
      className={cn(
        "text-xl sm:text-2xl md:text-3xl font-semibold tracking-tight",
        className
      )}
      {...props}
    />
  )
)
CardTitle.displayName = "CardTitle"

const CardDescription = React.forwardRef<HTMLParagraphElement, React.HTMLAttributes<HTMLParagraphElement>>(
  ({ className, ...props }, ref) => (
    <p
      ref={ref}
      className={cn("text-sm sm:text-base text-muted-foreground", className)}
      {...props}
    />
  )
)
CardDescription.displayName = "CardDescription"

const CardContent = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn("flex-1", className)} {...props} />
  )
)
CardContent.displayName = "CardContent"

const CardFooter = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn("flex items-center pt-4", className)} {...props} />
  )
)
CardFooter.displayName = "CardFooter"

export {
  Card,
  CardHeader,
  CardFooter,
  CardTitle,
  CardDescription,
  CardContent,
}
