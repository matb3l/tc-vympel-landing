import { ArrowRight, ShieldCheck, Truck, Clock, Sparkles } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Animate, Stagger, StaggerItem, FloatingElement } from '@/components/motion'

interface HeroProps {
  title?: string
  subtitle?: string
  ctaText?: string
  ctaSecondaryText?: string
  stats?: Array<{ value: string; label: string }>
}

const DEFAULT_STATS = [
  { value: '30+', label: 'лет на рынке' },
  { value: '500+', label: 'клиентов по России' },
  { value: '1000+', label: 'товаров в каталоге' },
  { value: '5', label: 'стран-поставщиков' },
]

export function HeroSection({
  title = 'Всё для мясопереработки',
  subtitle = 'Натуральные и искусственные оболочки, специи, пищевые добавки, белки и технологический инвентарь. Прямые поставки от ведущих мировых производителей.',
  ctaText = 'Получить каталог',
  ctaSecondaryText = '8 495 787-04-76',
  stats = DEFAULT_STATS,
}: HeroProps) {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden">
      {/* Background layers */}
      <div className="absolute inset-0 gradient-dark" />
      <div className="absolute inset-0 bg-[url('/placeholder/hero-bg.jpg')] bg-cover bg-center opacity-15 mix-blend-luminosity" />

      {/* Animated gradient orbs */}
      <FloatingElement className="absolute top-20 right-10 w-[500px] h-[500px] rounded-full bg-brand-600/8 blur-[100px]" y={30} duration={8} />
      <FloatingElement className="absolute bottom-20 left-10 w-[400px] h-[400px] rounded-full bg-brand-900/15 blur-[80px]" y={20} duration={10} />
      <FloatingElement className="absolute top-1/2 left-1/2 w-[300px] h-[300px] rounded-full bg-violet-900/10 blur-[80px]" y={25} duration={7} />

      {/* Grid overlay */}
      <div
        className="absolute inset-0 opacity-[0.02]"
        style={{
          backgroundImage: 'linear-gradient(rgba(255,255,255,.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.5) 1px, transparent 1px)',
          backgroundSize: '80px 80px',
        }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32 md:py-40 w-full">
        <div className="max-w-4xl">
          <Animate variant="fadeUp" delay={0.2}>
            <Badge variant="glass" className="mb-8">
              <Sparkles className="w-3.5 h-3.5 text-brand-400" />
              Надёжный поставщик с 1995 года
            </Badge>
          </Animate>

          <Animate variant="fadeUp" delay={0.3}>
            <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black text-white leading-[1.05] tracking-tight mb-8">
              Всё для
              <br />
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-brand-400 via-brand-500 to-brand-600">
                мясопереработки
              </span>
            </h1>
          </Animate>

          <Animate variant="fadeUp" delay={0.4}>
            <p className="text-lg sm:text-xl text-white/50 max-w-2xl mb-12 leading-relaxed font-light">
              {subtitle}
            </p>
          </Animate>

          <Animate variant="fadeUp" delay={0.5}>
            <div className="flex flex-col sm:flex-row gap-4 mb-20">
              <Button asChild size="xl">
                <a href="#contact" className="group">
                  {ctaText}
                  <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
                </a>
              </Button>
              <Button asChild variant="glass" size="xl">
                <a href="tel:+74957870476">{ctaSecondaryText}</a>
              </Button>
            </div>
          </Animate>

          <Animate variant="fadeIn" delay={0.6}>
            <div className="flex flex-wrap gap-x-8 gap-y-3 text-white/30 text-sm">
              <span className="flex items-center gap-2"><Truck className="w-4 h-4" /> Доставка по всей России</span>
              <span className="flex items-center gap-2"><Clock className="w-4 h-4" /> Всегда в наличии на складах</span>
              <span className="flex items-center gap-2"><ShieldCheck className="w-4 h-4" /> Гибкая система скидок</span>
            </div>
          </Animate>
        </div>

        {/* Stats */}
        <Stagger className="mt-24 grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6" staggerDelay={0.1}>
          {stats.map((stat) => (
            <StaggerItem key={stat.label}>
              <div className="group relative p-6 md:p-8 rounded-3xl bg-white/[0.03] backdrop-blur-sm border border-white/[0.06] text-center hover:bg-white/[0.08] hover:border-white/[0.12] transition-all duration-700 cursor-default">
                <div className="text-3xl md:text-5xl font-black text-white mb-2 tracking-tight">
                  {stat.value}
                </div>
                <div className="text-sm text-white/40 font-medium">{stat.label}</div>
              </div>
            </StaggerItem>
          ))}
        </Stagger>
      </div>

      {/* Bottom gradient fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-white to-transparent" />
    </section>
  )
}
