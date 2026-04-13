import { ArrowUpRight } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Animate, Stagger, StaggerItem } from '@/components/motion'

const PRODUCTS = [
  {
    title: 'Натуральная оболочка',
    description: 'Черевы свиные, говяжьи, бараньи. Синюги, пузыри. Для колбас, сосисок и сарделек всех видов.',
    imageAlt: 'Фото: натуральная колбасная оболочка',
    gradient: 'from-amber-500/20 via-orange-400/10 to-yellow-500/20',
    accent: 'bg-amber-500',
  },
  {
    title: 'Искусственная оболочка',
    description: 'Целлюлозные, полиамидные, коллагеновые, фиброузные. Широкий выбор калибров и цветов.',
    imageAlt: 'Фото: искусственная колбасная оболочка',
    gradient: 'from-blue-500/20 via-cyan-400/10 to-sky-500/20',
    accent: 'bg-blue-500',
  },
  {
    title: 'Специи и смеси',
    description: 'Молотые и цельные специи, готовые функциональные смеси для всех видов мясных изделий.',
    imageAlt: 'Фото: специи и смеси для мясопереработки',
    gradient: 'from-red-500/20 via-rose-400/10 to-pink-500/20',
    accent: 'bg-red-500',
  },
  {
    title: 'Пищевые добавки',
    description: 'Фосфаты, красители, стабилизаторы цвета, усилители вкуса, загустители и эмульгаторы.',
    imageAlt: 'Фото: пищевые добавки для мясной продукции',
    gradient: 'from-emerald-500/20 via-teal-400/10 to-green-500/20',
    accent: 'bg-emerald-500',
  },
  {
    title: 'Белки',
    description: 'Соевые и животные белки для текстуры, увеличения выхода и оптимизации себестоимости.',
    imageAlt: 'Фото: белковые добавки для мясопереработки',
    gradient: 'from-violet-500/20 via-purple-400/10 to-fuchsia-500/20',
    accent: 'bg-violet-500',
  },
  {
    title: 'Сетки и шпагаты',
    description: 'Эластичные и формовочные сетки, шпагаты для формовки и обвязки колбасных изделий.',
    imageAlt: 'Фото: сетки и шпагаты для колбасного производства',
    gradient: 'from-slate-400/20 via-gray-300/10 to-stone-400/20',
    accent: 'bg-slate-500',
  },
]

export function ProductsSection() {
  return (
    <section id="products" className="section-padding bg-dark-50/50 relative">
      <div className="container-narrow">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <Animate variant="fadeUp">
            <Badge className="mb-6">Продукция</Badge>
          </Animate>
          <Animate variant="fadeUp" delay={0.1}>
            <h2 className="text-4xl sm:text-5xl font-black text-dark-900 leading-tight mb-5">
              Полный ассортимент для{' '}
              <span className="text-gradient">вашего производства</span>
            </h2>
          </Animate>
          <Animate variant="fadeUp" delay={0.2}>
            <p className="text-lg text-dark-400">
              Всё, что нужно вашему предприятию — от оболочки до технологического инвентаря.
              Постоянное наличие на складах в Москве.
            </p>
          </Animate>
        </div>

        <Stagger className="grid md:grid-cols-2 lg:grid-cols-3 gap-5" staggerDelay={0.08}>
          {PRODUCTS.map((product) => (
            <StaggerItem key={product.title}>
              <div className="group relative bg-white rounded-[1.75rem] overflow-hidden border border-dark-100/80 hover:border-dark-200 hover:-translate-y-1.5 hover:shadow-2xl hover:shadow-dark-900/[0.06] transition-all duration-700">
                {/* Image area */}
                <div className={`relative aspect-[16/10] bg-gradient-to-br ${product.gradient} overflow-hidden`}>
                  <div className="absolute inset-0 flex items-center justify-center opacity-60 group-hover:opacity-80 transition-opacity duration-700">
                    <div className="text-center text-dark-400 p-4">
                      <p className="text-sm font-medium">{product.imageAlt}</p>
                      <p className="text-xs text-dark-300 mt-1">Добавьте фото через CMS</p>
                    </div>
                  </div>
                  <div className={`absolute top-4 left-4 w-3 h-3 rounded-full ${product.accent} shadow-lg`} />
                  <div className="absolute inset-0 bg-gradient-to-t from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                </div>

                {/* Content */}
                <div className="p-6">
                  <div className="flex items-start justify-between mb-3">
                    <h3 className="text-lg font-bold text-dark-900 group-hover:text-brand-600 transition-colors duration-500">
                      {product.title}
                    </h3>
                    <div className="w-8 h-8 rounded-lg bg-dark-50 group-hover:bg-brand-50 flex items-center justify-center transition-colors duration-500 flex-shrink-0 ml-3">
                      <ArrowUpRight className="w-4 h-4 text-dark-300 group-hover:text-brand-600 transition-all duration-500" />
                    </div>
                  </div>
                  <p className="text-dark-400 text-sm leading-relaxed">{product.description}</p>
                </div>
              </div>
            </StaggerItem>
          ))}
        </Stagger>

        <Animate variant="fadeUp" delay={0.4}>
          <div className="text-center mt-14">
            <Button asChild size="lg">
              <a href="#contact">
                Запросить каталог с ценами
                <ArrowUpRight className="w-4 h-4" />
              </a>
            </Button>
          </div>
        </Animate>
      </div>
    </section>
  )
}
