import * as React from 'react'
import { Slot } from '@radix-ui/react-slot'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/lib/utils'

const buttonVariants = cva(
  'inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-2xl text-sm font-semibold transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-600/50 disabled:pointer-events-none disabled:opacity-50',
  {
    variants: {
      variant: {
        default:
          'bg-brand-600 text-white hover:bg-brand-500 hover:shadow-xl hover:shadow-brand-600/25',
        secondary:
          'bg-dark-50 text-dark-700 hover:bg-dark-100',
        outline:
          'border border-dark-200 bg-white text-dark-700 hover:bg-dark-50',
        ghost:
          'text-dark-600 hover:bg-dark-50',
        link:
          'text-brand-600 underline-offset-4 hover:underline p-0 h-auto',
        glass:
          'bg-white/10 backdrop-blur-md text-white border border-white/10 hover:bg-white/20',
      },
      size: {
        sm: 'h-10 px-5 text-sm',
        default: 'h-12 px-7 text-sm',
        lg: 'h-14 px-8 text-base',
        xl: 'h-16 px-10 text-lg',
        icon: 'h-10 w-10',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  },
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : 'button'
    return <Comp className={cn(buttonVariants({ variant, size, className }))} ref={ref} {...props} />
  },
)
Button.displayName = 'Button'

export { Button, buttonVariants }
