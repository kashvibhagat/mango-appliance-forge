import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-xl text-sm font-medium ring-offset-background transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 focus-ring relative overflow-hidden touch-manipulation",
  {
    variants: {
      variant: {
        default: "bg-[hsl(var(--mango-orange))] text-white shadow-lg hover:bg-[hsl(38_100%_48%)] hover:shadow-xl active:scale-[0.98] font-semibold transition-all duration-300",
        destructive:
          "bg-destructive text-destructive-foreground shadow-md hover:shadow-lg active:scale-[0.98] font-semibold",
        outline:
          "border-2 border-input bg-background hover:bg-accent/10 hover:border-accent hover:text-accent-foreground shadow-sm hover:shadow-md active:scale-[0.98]",
        secondary:
          "btn-secondary",
        ghost: "btn-ghost",
        link: "text-primary underline-offset-4 hover:underline active:scale-[0.98]",
        hero: "bg-[hsl(var(--mango-orange))] text-white shadow-lg hover:bg-[hsl(38_100%_48%)] hover:shadow-xl active:scale-[0.98] font-semibold transition-all duration-300",
        "outline-glow": "btn-outline-glow",
        floating: "btn-floating bg-[hsl(var(--mango-orange))] text-white hover:bg-[hsl(38_100%_48%)]",
      },
      size: {
        default: "h-11 px-5 py-2.5",
        sm: "h-9 rounded-lg px-3.5 text-xs",
        lg: "h-12 rounded-xl px-8 text-base font-semibold",
        xl: "h-14 rounded-2xl px-10 text-lg font-bold",
        icon: "h-11 w-11",
        "icon-sm": "h-9 w-9",
        "icon-lg": "h-12 w-12",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button"
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    )
  }
)
Button.displayName = "Button"

export { Button, buttonVariants }
