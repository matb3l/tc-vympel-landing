'use client'

import { ArrowUpRight, ArrowRight } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Animate, Stagger, StaggerItem, MagneticHover } from '@/components/motion'

const GRADIENTS = [
  'from-amber-50 to-orange-50', 'from-blue-50 to-sky-50', 'from-red-50 to-rose-50',
  'from-emerald-50 to-teal-50', 'from-violet-50 to-purple-50', 'from-slate-50 to-gray-100',
]
const ACCENTS = ['bg-amber-500', 'bg-blue-500', 'bg-red-500', 'bg-emerald-500', 'bg-violet-500', 'bg-slate-500']

type Product = { id: string; title: string; description: string; image?: any }
type Props = { data: Product[] }

export function ProductsSection({ data }: Props) {
  return (
    <section id="products" className="min-h-screen flex flex-col justify-center bg-[#f8fafc]" style={{ padding: 'clamp(3rem, 8vw, 7rem) 0' }}>
      <div className="container-fluid">
        <Animate>
          <div className="text-center max-w-2xl mx-auto" style={{ marginBottom: 'clamp(2rem, 5vw, 3.5rem)' }}>
            <span className="inline-block text-fluid-sm font-semibold text-brand-600 uppercase tracking-wider" style={{ marginBottom: 'clamp(0.5rem, 1vw, 0.75rem)' }}>Продукция</span>
            <h2 className="text-fluid-h2 font-black text-dark-900 leading-tight" style={{ marginBottom: 'clamp(0.75rem, 2vw, 1rem)' }}>
              Полный ассортимент для <span className="text-gradient">производства</span>
            </h2>
            <p className="text-fluid-body text-dark-500">
              Всё необходимое для мясоперерабатывающего предприятия. Всегда на складе в Москве.
            </p>
          </div>
        </Animate>

        <Stagger className="grid sm:grid-cols-2 lg:grid-cols-3 gap-fluid" staggerDelay={0.08}>
          {data.map((product, i) => (
            <StaggerItem key={product.id}>
              <div className="group bg-white overflow-hidden border border-dark-200/60 hover:border-dark-300 hover:shadow-xl hover:shadow-dark-900/[0.05] transition-all duration-500 h-full flex flex-col" style={{ borderRadius: 'clamp(0.75rem, 2vw, 1.25rem)' }}>
                <div className={`relative bg-gradient-to-br ${GRADIENTS[i % GRADIENTS.length]}`} style={{ height: 'clamp(7rem, 12vw, 10rem)' }}>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <p className="text-xs font-medium text-dark-400">Фото товара</p>
                  </div>
                  <div className={`absolute top-3 left-3 w-2.5 h-2.5 rounded-full ${ACCENTS[i % ACCENTS.length]}`} />
                </div>
                <div className="flex-1 flex flex-col" style={{ padding: 'clamp(1rem, 2vw, 1.25rem)' }}>
                  <div className="flex items-start justify-between mb-2">
                    <h3 className="text-fluid-h3 font-bold text-dark-900">{product.title}</h3>
                    <div className="w-7 h-7 rounded-lg bg-dark-100 group-hover:bg-brand-50 flex items-center justify-center transition-all flex-shrink-0 ml-2">
                      <ArrowUpRight className="w-3.5 h-3.5 text-dark-400 group-hover:text-brand-600 transition-colors" />
                    </div>
                  </div>
                  <p className="text-dark-500 text-fluid-sm flex-1">{product.description}</p>
                </div>
              </div>
            </StaggerItem>
          ))}
        </Stagger>

        <Animate>
          <div className="text-center" style={{ marginTop: 'clamp(2rem, 4vw, 2.5rem)' }}>
            <MagneticHover strength={0.1}>
              <Button asChild size="lg"><a href="#contact">Запросить каталог с ценами <ArrowRight className="w-4 h-4" /></a></Button>
            </MagneticHover>
          </div>
        </Animate>
      </div>
    </section>
  )
}
