'use client'

import Image from 'next/image'
import { ArrowRight, Check } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Animate, MagneticHover } from '@/components/motion'
import { SITE_IMAGES } from '@/lib/images'

type Props = {
  data: { title: string; subtitle: string; ctaText: string; benefits: string[] }
}

export function CTASection({ data }: Props) {
  // Извлекаем главный стат из заголовка (напр. "15–20%") для giant display
  const match = data.title.match(/(\d+[–-]?\d*\s*%?)/)
  const bigNumber = match ? match[0] : '–20%'

  return (
    <section className="min-h-screen flex items-center relative overflow-hidden bg-charcoal grain" style={{ padding: 'clamp(4rem, 10vw, 8rem) 0' }}>
      <div className="absolute inset-0">
        <Image
          src={SITE_IMAGES.cta.url}
          alt=""
          aria-hidden
          fill
          sizes="100vw"
          quality={70}
          className="object-cover opacity-30"
        />
        <div className="absolute inset-0 bg-gradient-to-br from-[#7f1d1d]/80 via-[#0a0604]/90 to-[#0a0604]" />
      </div>

      <div className="container-fluid relative w-full z-10">
        <div className="grid lg:grid-cols-12 gap-fluid-lg items-center">
          {/* Giant number */}
          <div className="lg:col-span-6">
            <Animate>
              <div className="flex items-center gap-3 text-fluid-xs font-semibold text-brand-300 uppercase tracking-[0.25em]" style={{ marginBottom: 'clamp(1rem, 2vw, 1.5rem)' }}>
                <span className="w-8 h-px bg-brand-400" />
                Экономия для вас
              </div>
            </Animate>
            <Animate delay={0.1}>
              <div className="font-display font-black text-white leading-[0.85] text-gradient" style={{ fontSize: 'clamp(6rem, 18vw, 16rem)', letterSpacing: '-0.05em' }}>
                {bigNumber}
              </div>
            </Animate>
            <Animate delay={0.15}>
              <p className="text-fluid-body text-white/70 max-w-md" style={{ marginTop: 'clamp(1rem, 2vw, 1.5rem)' }}>
                снижение себестоимости ингредиентов за счёт оптимизации закупок и прямых контрактов с производителями
              </p>
            </Animate>
          </div>

          {/* Правая часть — оффер + бенефиты */}
          <div className="lg:col-span-6 lg:pl-8">
            <Animate delay={0.2}>
              <h2 className="font-display font-bold text-white leading-[1.05]" style={{ fontSize: 'clamp(1.75rem, 3.5vw, 2.75rem)', letterSpacing: '-0.025em', marginBottom: 'clamp(1rem, 2.5vw, 1.5rem)' }}>
                {data.title}
              </h2>
            </Animate>

            <Animate delay={0.25}>
              <p className="text-fluid-body text-white/70" style={{ marginBottom: 'clamp(1.75rem, 3.5vw, 2.25rem)' }}>
                {data.subtitle}
              </p>
            </Animate>

            <Animate delay={0.3}>
              <ul className="space-y-3" style={{ marginBottom: 'clamp(2rem, 4vw, 2.75rem)' }}>
                {data.benefits.map((b) => (
                  <li key={b} className="flex items-start gap-3 text-white/90 text-fluid-sm">
                    <span className="flex-shrink-0 w-5 h-5 rounded-full bg-brand-600 flex items-center justify-center mt-0.5">
                      <Check className="w-3 h-3 text-white" strokeWidth={3} />
                    </span>
                    {b}
                  </li>
                ))}
              </ul>
            </Animate>

            <Animate delay={0.35}>
              <MagneticHover strength={0.15}>
                <Button asChild size="lg" className="bg-white text-[#0a0604] hover:bg-brand-50 shadow-2xl shadow-brand-900/50">
                  <a href="#contact" className="group">
                    {data.ctaText}
                    <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
                  </a>
                </Button>
              </MagneticHover>
            </Animate>
          </div>
        </div>
      </div>
    </section>
  )
}
