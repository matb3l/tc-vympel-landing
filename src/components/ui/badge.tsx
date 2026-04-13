import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/lib/utils'

const badgeVariants = cva(
  'inline-flex items-center gap-1.5 rounded-full px-4 py-1.5 text-sm font-semibold transition-colors',
  {
    variants: {
      variant: {
        default: 'bg-brand-50 text-brand-600',
        dark: 'bg-dark-100 text-dark-600',
        glass: 'bg-white/10 backdrop-blur-md text-white/80 border border-white/10',
        success: 'bg-emerald-50 text-emerald-600',
      },
    },
    defaultVariants: { variant: 'default' },
  },
)

interface BadgeProps extends React.HTMLAttributes<HTMLDivElement>, VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return <div className={cn(badgeVariants({ variant }), className)} {...props} />
}

export { Badge, badgeVariants }
