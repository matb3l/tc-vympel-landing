'use client'

import { Award, Users, Globe, Headset, ArrowRight } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Animate, Stagger, StaggerItem } from '@/components/motion'

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
    <section id="about" className="min-h-screen flex items-center bg-white" style={{ padding: 'clamp(3rem, 8vw, 7rem) 0' }}>
      <div className="container-fluid w-full">
        <div className="grid lg:grid-cols-2 gap-fluid-lg items-center">
          <div>
            <Animate>
              <span className="inline-block text-fluid-sm font-semibold text-brand-600 uppercase tracking-wider" style={{ marginBottom: 'clamp(0.5rem, 1vw, 0.75rem)' }}>О компании</span>
            </Animate>
            <Animate delay={0.1}>
              <h2 className="text-fluid-h2 font-black text-dark-900 leading-tight" style={{ marginBottom: 'clamp(1rem, 3vw, 1.5rem)' }}>
                Более <span className="text-gradient">30 лет</span> на рынке России
              </h2>
            </Animate>
            <Animate delay={0.15}>
              <p className="text-fluid-body text-dark-500" style={{ marginBottom: 'clamp(1.5rem, 4vw, 2rem)' }}>
                {data.description}
              </p>
            </Animate>
            <Animate delay={0.2}>
              <div className="flex flex-col sm:flex-row gap-fluid">
                <Button asChild size="lg"><a href="#contact">Связаться с нами <ArrowRight className="w-4 h-4" /></a></Button>
                <Button asChild variant="secondary" size="lg"><a href="#products">Смотреть продукцию</a></Button>
              </div>
            </Animate>
          </div>

          <div>
            <Animate delay={0.1}>
              <div className="relative overflow-hidden aspect-[4/3] bg-gradient-to-br from-dark-100 to-dark-200" style={{ borderRadius: 'clamp(0.75rem, 2vw, 1.25rem)', marginBottom: 'clamp(0.75rem, 2vw, 1.25rem)' }}>
                <div className="absolute inset-0 flex items-center justify-center text-dark-400">
                  <div className="text-center p-6">
                    <Award className="w-12 h-12 mx-auto mb-3 text-dark-300" />
                    <p className="font-semibold text-dark-500">Фото компании</p>
                    <p className="text-fluid-sm text-dark-400 mt-1">Замените через CMS</p>
                  </div>
                </div>
                <div className="absolute bottom-4 left-4 px-5 py-3 bg-white/90 backdrop-blur-lg shadow-lg" style={{ borderRadius: 'clamp(0.5rem, 1vw, 0.75rem)' }}>
                  <div className="text-2xl font-black text-dark-900">1995</div>
                  <div className="text-xs text-dark-500 font-medium">год основания</div>
                </div>
              </div>
            </Animate>

            <Stagger className="grid grid-cols-2 gap-fluid" staggerDelay={0.08}>
              {data.advantages.map((item) => {
                const Icon = ICON_MAP[item.icon] || Award
                return (
                  <StaggerItem key={item.title}>
                    <div className="hover:bg-white hover:shadow-lg hover:shadow-dark-900/[0.04] border border-transparent hover:border-dark-100 bg-dark-50 transition-all duration-500" style={{ padding: 'clamp(0.75rem, 1.5vw, 1rem)', borderRadius: 'clamp(0.5rem, 1.5vw, 0.75rem)' }}>
                      <Icon className="w-5 h-5 text-brand-600 mb-2" />
                      <h3 className="font-bold text-dark-900 mb-1" style={{ fontSize: 'clamp(0.8125rem, 1vw, 0.875rem)' }}>{item.title}</h3>
                      <p className="text-dark-500 leading-relaxed" style={{ fontSize: 'clamp(0.6875rem, 0.85vw, 0.75rem)' }}>{item.description}</p>
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
