'use client'

import { ArrowUpRight, ArrowRight } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Animate, Stagger, StaggerItem, MagneticHover } from '@/components/motion'
import { getProductImage } from '@/lib/images'

type Product = { id: string; title: string; description: string }
type Props = { data: Product[] }

type CardProduct = Product & { _index: number }

export function ProductsSection({ data }: Props) {
  const indexed: CardProduct[] = data.map((p, i) => ({ ...p, _index: i }))
  const [feature, ...rest] = indexed

  return (
    <section id="products" className="min-h-screen flex flex-col justify-center bg-bone" style={{ padding: 'clamp(4rem, 10vw, 8rem) 0' }}>
      <div className="container-fluid">
        <Animate>
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6" style={{ marginBottom: 'clamp(2.5rem, 5vw, 4rem)' }}>
            <div className="max-w-2xl">
              <div className="flex items-center gap-3 text-fluid-xs font-semibold text-brand-700 uppercase tracking-[0.2em]" style={{ marginBottom: 'clamp(1rem, 2vw, 1.5rem)' }}>
                <span className="w-8 h-px bg-brand-600" />
                Продукция
              </div>
              <h2 className="font-display font-black text-dark-900 leading-[0.95]" style={{ fontSize: 'clamp(2.25rem, 5.5vw, 4.5rem)', letterSpacing: '-0.03em' }}>
                Всё, что нужно{' '}
                <span className="italic font-normal text-gradient">вашему цеху</span>
              </h2>
            </div>
            <p className="text-fluid-body text-dark-500 max-w-md">
              От черевы до фосфатов — 1500+ артикулов на складе в Москве. Прямые контракты с мировыми брендами.
            </p>
          </div>
        </Animate>

        {/* Bento grid: первая карточка крупная (col-span-2, высокая), остальные стандарт */}
        <Stagger className="grid grid-cols-1 md:grid-cols-6 gap-fluid" staggerDelay={0.08}>
          {/* Feature — крупная карточка */}
          {feature && (
            <StaggerItem className="md:col-span-3 md:row-span-2">
              <ProductCard product={feature} tall />
            </StaggerItem>
          )}

          {/* Правая колонка — первые 2 обычных */}
          {rest.slice(0, 2).map((p) => (
            <StaggerItem key={p.id} className="md:col-span-3">
              <ProductCard product={p} wide />
            </StaggerItem>
          ))}

          {/* Нижний ряд — 3 карточки */}
          {rest.slice(2).map((p) => (
            <StaggerItem key={p.id} className="md:col-span-2">
              <ProductCard product={p} />
            </StaggerItem>
          ))}
        </Stagger>

        <Animate>
          <div className="text-center" style={{ marginTop: 'clamp(2.5rem, 5vw, 3.5rem)' }}>
            <MagneticHover strength={0.15}>
              <Button asChild size="lg" className="bg-[#0a0604] hover:bg-brand-600 text-white">
                <a href="#contact">
                  Запросить прайс с ценами
                  <ArrowRight className="w-4 h-4" />
                </a>
              </Button>
            </MagneticHover>
          </div>
        </Animate>
      </div>
    </section>
  )
}

function ProductCard({ product, tall, wide }: { product: CardProduct; tall?: boolean; wide?: boolean }) {
  const image = getProductImage(product._index)
  return (
    <a
      href="#contact"
      className="group relative block overflow-hidden bg-[#0a0604] h-full"
      style={{ borderRadius: 'clamp(0.75rem, 2vw, 1.25rem)', minHeight: tall ? 'clamp(20rem, 40vw, 34rem)' : wide ? 'clamp(10rem, 18vw, 14rem)' : 'clamp(14rem, 22vw, 18rem)' }}
    >
      <img
        src={image.url}
        alt={image.alt}
        loading="lazy"
        className="absolute inset-0 w-full h-full object-cover opacity-80 transition-all duration-700 group-hover:scale-105 group-hover:opacity-95"
      />

      {/* Dark gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-black/20" />

      {/* Content */}
      <div className="absolute inset-0 flex flex-col justify-between" style={{ padding: 'clamp(1.25rem, 2.5vw, 2rem)' }}>
        <div className="flex justify-end">
          <div className="w-10 h-10 rounded-full bg-white/10 backdrop-blur-md border border-white/15 flex items-center justify-center group-hover:bg-brand-600 group-hover:border-brand-600 transition-all duration-500">
            <ArrowUpRight className="w-4 h-4 text-white transition-transform duration-500 group-hover:rotate-45" />
          </div>
        </div>

        <div>
          <h3 className="font-display font-bold text-white leading-[1.05]" style={{ fontSize: tall ? 'clamp(1.75rem, 3.5vw, 2.75rem)' : 'clamp(1.25rem, 2vw, 1.625rem)', letterSpacing: '-0.02em', marginBottom: '0.5rem' }}>
            {product.title}
          </h3>
          <p className="text-white/70 text-fluid-sm leading-relaxed" style={{ maxWidth: tall ? '40ch' : '36ch' }}>
            {product.description}
          </p>
        </div>
      </div>
    </a>
  )
}
