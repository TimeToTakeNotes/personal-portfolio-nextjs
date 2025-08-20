import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@arno/lib/utils"

const badgeVariants = cva(
  "inline-flex items-center justify-center font-semibold focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 transition-all duration-200 ease-in-out cursor-default",
  {
    variants: {
      variant: {
        default: "border-transparent bg-primary text-primary-foreground hover:bg-primary/90",
        secondary: "border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/90",
        tag: "border border-border text-foreground bg-transparent hover:bg-primary hover:text-background hover:scale-105",
        destructive: "border-transparent bg-destructive text-destructive-foreground hover:bg-destructive/90",
        outline: "border border-border text-foreground bg-transparent hover:bg-foreground/5",
        icon: "border-transparent bg-primary text-primary-foreground hover:bg-primary/90 p-2",
      },
      size: {
        sm: "px-2 py-0.5 text-xs",
        md: "px-3 py-1 text-sm",
        lg: "px-4 py-1.5 text-base",
        icon: "px-2 py-0.5 text-xs h-6 w-6",
      },
      rounded: {
        true: "rounded-full",
        false: "rounded-md",
      },
      animation: {
        none: "", // no animation
        pulse: "hover:animate-pulse", // subtle scaling pulse
        bounce: "hover:-translate-y-1 hover:animate-bounce", // lift & bounce
        glow: "hover:shadow-[0_0_10px_rgba(59,130,246,0.5)]", // glowing hover
        tilt: "hover:rotate-1 hover:scale-[1.05]", // slight tilt effect
      },
    },
    defaultVariants: {
      variant: "default",
      size: "md",
      rounded: true,
      animation: "none",
    },
  }
)

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

const Badge = React.forwardRef<HTMLDivElement, BadgeProps>(
  ({ className, variant, size, rounded, animation, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(badgeVariants({ variant, size, rounded, animation }), className)}
      {...props}
    />
  )
)
Badge.displayName = "Badge"

export { Badge, badgeVariants }
