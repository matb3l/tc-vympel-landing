'use client'

import { ArrowRight, Phone } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Animate, MagneticHover } from '@/components/motion'
import { SITE_IMAGES } from '@/lib/images'

type Props = {
  data: {
    badge?: string
    title: string
    subtitle: string
    ctaText: string
    ctaSecondaryText: string
    stats: { value: string; label: string }[]
  }
  phone: string
}

const BRAND_TICKER = [
  'VISCOFAN', 'KALLE', 'SHENGUAN', 'WORLD CASING', 'VAN HEES', 'WIBERG',
  'MOGUNTIA', 'SOLINA', 'KERRY', 'ICL', 'GRIFFITH FOODS', 'DEVRO',
]

export function HeroSection({ data, phone }: Props) {
  const badge = data.badge || 'С 1995 года'

  return (
    <section className="relative min-h-[100svh] bg-charcoal grain overflow-hidden flex flex-col">
      {/* Background image — full bleed с глубоким overlay */}
      <div className="absolute inset-0 z-0">
        <img
          src={SITE_IMAGES.hero.url}
          alt={SITE_IMAGES.hero.alt}
          fetchPriority="high"
          className="absolute inset-0 w-full h-full object-cover opacity-60"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0a0604] via-[#0a0604]/85 to-[#0a0604]/20" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0a0604] via-transparent to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-b from-[#0a0604]/60 via-transparent to-transparent" />
      </div>

      {/* Vertical tag — слева */}
      <div className="hidden lg:flex absolute left-[clamp(1.5rem,3vw,2.5rem)] top-1/2 -translate-y-1/2 z-20 items-center gap-4">
        <div className="vertical-label text-fluid-xs text-white/40 font-medium">№01 / Вкус начинается здесь</div>
        <div className="w-px h-16 bg-white/20" />
      </div>

      <div className="relative z-10 container-fluid flex-1 flex items-center w-full" style={{ paddingTop: 'clamp(7rem, 15vw, 11rem)', paddingBottom: 'clamp(4rem, 8vw, 6rem)' }}>
        <div className="w-full grid lg:grid-cols-12 gap-fluid-lg items-center">
          {/* Текст — левая часть */}
          <div className="lg:col-span-7">
            <Animate delay={0.1}>
              <div className="inline-flex items-center gap-3 text-fluid-xs font-semibold text-white/70 uppercase tracking-[0.2em]" style={{ marginBottom: 'clamp(1rem, 2vw, 1.5rem)' }}>
                <span className="w-8 h-px bg-brand-500" />
                {badge}
              </div>
            </Animate>

            <Animate delay={0.2}>
              <h1 className="font-display font-black text-white" style={{ fontSize: 'clamp(2.75rem, 8vw, 6.5rem)', lineHeight: 0.98, letterSpacing: '-0.04em', marginBottom: 'clamp(1rem, 3vw, 1.75rem)' }}>
                {data.title.split(' ').slice(0, -2).join(' ')}
                <br />
                <span className="italic font-normal text-gradient">
                  {data.title.split(' ').slice(-2).join(' ')}
                </span>
              </h1>
            </Animate>

            <Animate delay={0.3}>
              <p className="text-fluid-body text-white/65 max-w-[52ch]" style={{ marginBottom: 'clamp(1.75rem, 4vw, 2.5rem)' }}>
                {data.subtitle}
              </p>
            </Animate>

            <Animate delay={0.4}>
              <div className="flex flex-col sm:flex-row gap-fluid">
                <MagneticHover strength={0.15}>
                  <Button asChild size="lg" className="bg-brand-600 hover:bg-brand-500 text-white shadow-xl shadow-brand-900/40">
                    <a href="#contact" className="group">
                      {data.ctaText}
                      <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
                    </a>
                  </Button>
                </MagneticHover>
                <MagneticHover strength={0.15}>
                  <Button asChild variant="glass" size="lg">
                    <a href={`tel:${phone.replace(/\D/g, '')}`} className="flex items-center gap-2">
                      <Phone className="w-4 h-4" />
                      {phone}
                    </a>
                  </Button>
                </MagneticHover>
              </div>
            </Animate>
          </div>

          {/* Stats — правая часть, вертикальный стек с большими цифрами */}
          <div className="lg:col-span-5 lg:pl-8">
            <Animate delay={0.5}>
              <div className="flex flex-col divide-y divide-white/10 border-y border-white/10 backdrop-blur-sm">
                {data.stats.map((stat) => (
                  <div key={stat.label} className="flex items-baseline justify-between py-4 lg:py-5 group hover:bg-white/[0.03] transition-colors px-4 -mx-4">
                    <div className="font-display font-black text-white tracking-tight" style={{ fontSize: 'clamp(2rem, 4.5vw, 3.5rem)', lineHeight: 1 }}>
                      {stat.value}
                    </div>
                    <div className="text-white/55 text-right text-fluid-sm max-w-[55%] leading-tight">
                      {stat.label}
                    </div>
                  </div>
                ))}
              </div>
            </Animate>
          </div>
        </div>
      </div>

      {/* Brand ticker — внизу hero, бесконечный marquee */}
      <div className="relative z-10 border-t border-white/10 bg-black/30 backdrop-blur-sm overflow-hidden">
        <div className="flex marquee whitespace-nowrap py-4">
          {[...BRAND_TICKER, ...BRAND_TICKER].map((brand, i) => (
            <span key={i} className="mx-8 text-fluid-xs text-white/40 font-semibold tracking-[0.25em]">
              {brand} <span className="ml-8 text-white/15">·</span>
            </span>
          ))}
        </div>
      </div>
    </section>
  )
}
