'use client'

import { Award, Users, Globe, Headset, ArrowRight } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Animate, Stagger, StaggerItem } from '@/components/motion'
import { SITE_IMAGES } from '@/lib/images'

const ICON_MAP: Record<string, any> = { award: Award, users: Users, globe: Globe, headset: Headset }

type Props = {
  data: {
    title: string
    description: string
    advantages: { title: string; description: string; icon: string }[]
  }
}

export function AboutSection({ data }: Props) {
  return (
    <section id="about" className="relative min-h-screen flex items-center bg-bone overflow-hidden" style={{ padding: 'clamp(4rem, 10vw, 8rem) 0' }}>
      {/* Giant watermark number */}
      <div className="absolute pointer-events-none select-none right-[-2vw] top-[2vw] font-display font-black text-[#0a0604]/[0.04]" style={{ fontSize: 'clamp(12rem, 28vw, 28rem)', lineHeight: 0.85, letterSpacing: '-0.05em' }}>
        30
      </div>

      <div className="container-fluid w-full relative">
        <div className="grid lg:grid-cols-12 gap-fluid-lg items-start">
          {/* Левая колонка — текст */}
          <div className="lg:col-span-5 lg:sticky lg:top-24">
            <Animate>
              <div className="flex items-center gap-3 text-fluid-xs font-semibold text-brand-700 uppercase tracking-[0.2em]" style={{ marginBottom: 'clamp(1rem, 2vw, 1.5rem)' }}>
                <span className="w-8 h-px bg-brand-600" />
                О компании
              </div>
            </Animate>
            <Animate delay={0.1}>
              <h2 className="font-display font-black text-dark-900 leading-[0.95]" style={{ fontSize: 'clamp(2.25rem, 5.5vw, 4.5rem)', letterSpacing: '-0.03em', marginBottom: 'clamp(1.25rem, 3vw, 1.75rem)' }}>
                {data.title.split(' ').slice(0, -2).join(' ')}{' '}
                <span className="italic font-normal text-gradient">{data.title.split(' ').slice(-2).join(' ')}</span>
              </h2>
            </Animate>
            <Animate delay={0.15}>
              <p className="text-fluid-body text-dark-600" style={{ marginBottom: 'clamp(1.75rem, 4vw, 2.25rem)' }}>
                {data.description}
              </p>
            </Animate>
            <Animate delay={0.2}>
              <div className="flex flex-col sm:flex-row gap-fluid">
                <Button asChild size="lg" className="bg-[#0a0604] hover:bg-brand-600 text-white">
                  <a href="#contact">Связаться с технологом <ArrowRight className="w-4 h-4" /></a>
                </Button>
                <Button asChild variant="ghost" size="lg"><a href="#products">Смотреть продукцию</a></Button>
              </div>
            </Animate>
          </div>

          {/* Правая колонка — фото + преимущества */}
          <div className="lg:col-span-7">
            <Animate delay={0.1}>
              <div className="relative overflow-hidden group" style={{ borderRadius: 'clamp(1rem, 2.5vw, 1.75rem)', marginBottom: 'clamp(1rem, 2.5vw, 1.5rem)' }}>
                <div className="aspect-[16/10] relative bg-gradient-to-br from-dark-200 to-dark-300">
                  <img
                    src={SITE_IMAGES.about.url}
                    alt={SITE_IMAGES.about.alt}
                    loading="lazy"
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-[1.03]"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent" />

                  {/* Floating badge — editorial style */}
                  <div className="absolute bottom-5 left-5 flex items-stretch gap-0 shadow-2xl" style={{ borderRadius: 'clamp(0.5rem, 1vw, 0.75rem)' }}>
                    <div className="bg-white px-4 py-3 rounded-l-lg">
                      <div className="text-fluid-xs text-dark-500 font-semibold uppercase tracking-wider">Основано</div>
                      <div className="font-display font-black text-dark-900" style={{ fontSize: 'clamp(1.5rem, 2.5vw, 2rem)', lineHeight: 1 }}>1995</div>
                    </div>
                    <div className="bg-brand-600 px-4 py-3 rounded-r-lg flex flex-col justify-center">
                      <div className="text-fluid-xs text-white/80 font-semibold uppercase tracking-wider">Клиентов</div>
                      <div className="font-display font-black text-white" style={{ fontSize: 'clamp(1.5rem, 2.5vw, 2rem)', lineHeight: 1 }}>500+</div>
                    </div>
                  </div>
                </div>
              </div>
            </Animate>

            <Stagger className="grid sm:grid-cols-2 gap-fluid" staggerDelay={0.08}>
              {data.advantages.map((item) => {
                const Icon = ICON_MAP[item.icon] || Award
                return (
                  <StaggerItem key={item.title}>
                    <div className="group relative bg-white border border-dark-200/50 hover:border-brand-500 hover:shadow-xl hover:shadow-brand-900/[0.06] transition-all duration-500 h-full" style={{ padding: 'clamp(1.25rem, 2.25vw, 1.75rem)', borderRadius: 'clamp(0.75rem, 1.5vw, 1rem)' }}>
                      <div className="w-11 h-11 rounded-xl bg-brand-50 group-hover:bg-brand-600 flex items-center justify-center mb-3 transition-colors">
                        <Icon className="w-5 h-5 text-brand-600 group-hover:text-white transition-colors" />
                      </div>
                      <h3 className="font-bold text-dark-900 mb-1.5" style={{ fontSize: 'clamp(0.9375rem, 1.15vw, 1.0625rem)' }}>{item.title}</h3>
                      <p className="text-dark-500 leading-relaxed text-fluid-sm">{item.description}</p>
                    </div>
                  </StaggerItem>
                )
              })}
            </Stagger>
          </div>
        </div>
      </div>
    </section>
  )
}
