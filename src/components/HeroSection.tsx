'use client'

import { ArrowRight, ShieldCheck, Truck, Clock, Phone } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Animate, MagneticHover } from '@/components/motion'

type Props = {
  data: {
    title: string
    subtitle: string
    ctaText: string
    ctaSecondaryText: string
    backgroundImage: { url: string; alt: string } | null
    stats: { value: string; label: string }[]
  }
  phone: string
}

export function HeroSection({ data, phone }: Props) {
  return (
    <section className="relative min-h-[100svh] flex items-center gradient-dark overflow-hidden">
      <div className="absolute inset-0">
        {data.backgroundImage ? (
          <>
            <img src={data.backgroundImage.url} alt={data.backgroundImage.alt} className="absolute inset-0 w-full h-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-r from-[#0f172a]/90 via-[#0f172a]/70 to-[#0f172a]/40" />
          </>
        ) : (
          <>
            <div className="absolute top-[-20%] right-[-10%] w-[60vw] max-w-[700px] aspect-square rounded-full bg-brand-600/[0.06] blur-[100px]" />
            <div className="absolute bottom-[-10%] left-[-5%] w-[40vw] max-w-[500px] aspect-square rounded-full bg-brand-900/[0.08] blur-[80px]" />
          </>
        )}
      </div>

      <div className="relative z-10 container-fluid w-full" style={{ paddingTop: 'clamp(7rem, 15vw, 10rem)', paddingBottom: 'clamp(3rem, 8vw, 5rem)' }}>
        <div className="max-w-[clamp(28rem,60vw,48rem)]">
          <Animate delay={0.1}>
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/[0.06] border border-white/[0.08] text-fluid-sm text-white/70" style={{ marginBottom: 'clamp(1rem, 3vw, 2rem)' }}>
              <ShieldCheck className="w-4 h-4 text-brand-400 flex-shrink-0" />
              Надёжный поставщик с 1995 года
            </div>
          </Animate>

          <Animate delay={0.2}>
            <h1 className="text-fluid-hero font-black text-white tracking-tight" style={{ marginBottom: 'clamp(1rem, 3vw, 1.5rem)' }}>
              {data.title}{' '}
              <span className="text-gradient">в&nbsp;одном месте</span>
            </h1>
          </Animate>

          <Animate delay={0.3}>
            <p className="text-fluid-body text-white/60 max-w-xl" style={{ marginBottom: 'clamp(1.5rem, 4vw, 2.5rem)' }}>
              {data.subtitle}
            </p>
          </Animate>

          <Animate delay={0.4}>
            <div className="flex flex-col sm:flex-row gap-fluid" style={{ marginBottom: 'clamp(2rem, 5vw, 3rem)' }}>
              <MagneticHover strength={0.1}>
                <Button asChild size="lg">
                  <a href="#contact" className="group">
                    {data.ctaText}
                    <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
                  </a>
                </Button>
              </MagneticHover>
              <MagneticHover strength={0.1}>
                <Button asChild variant="glass" size="lg">
                  <a href={`tel:${phone.replace(/\D/g, '')}`} className="flex items-center gap-2">
                    <Phone className="w-4 h-4" />
                    {phone}
                  </a>
                </Button>
              </MagneticHover>
            </div>
          </Animate>

          <Animate delay={0.5}>
            <div className="flex flex-wrap gap-x-[clamp(1rem,3vw,1.5rem)] gap-y-2 text-white/50 text-fluid-sm" style={{ marginBottom: 'clamp(2rem, 5vw, 3.5rem)' }}>
              <span className="flex items-center gap-2"><Truck className="w-4 h-4 flex-shrink-0" /> Доставка по всей России</span>
              <span className="flex items-center gap-2"><Clock className="w-4 h-4 flex-shrink-0" /> Всегда в наличии</span>
              <span className="flex items-center gap-2"><ShieldCheck className="w-4 h-4 flex-shrink-0" /> Гибкие скидки</span>
            </div>
          </Animate>
        </div>

        <Animate delay={0.6}>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-fluid max-w-[clamp(28rem,60vw,48rem)]">
            {data.stats.map((stat) => (
              <div key={stat.label} className="rounded-[clamp(0.75rem,1.5vw,1rem)] bg-white/[0.04] border border-white/[0.08] text-center" style={{ padding: 'clamp(0.75rem, 2vw, 1.5rem)' }}>
                <div className="font-black text-white tracking-tight" style={{ fontSize: 'clamp(1.25rem, 3vw, 2rem)' }}>
                  {stat.value}
                </div>
                <div className="text-white/50" style={{ fontSize: 'clamp(0.6875rem, 0.9vw, 0.8125rem)' }}>{stat.label}</div>
              </div>
            ))}
          </div>
        </Animate>
      </div>
    </section>
  )
}
