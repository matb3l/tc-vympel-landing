import { Phone, Mail, MapPin } from 'lucide-react'

const NAV_LINKS = [
  { label: 'О компании', href: '#about' },
  { label: 'Продукция', href: '#products' },
  { label: 'Услуги', href: '#services' },
  { label: 'Партнёры', href: '#partners' },
  { label: 'География', href: '#geography' },
  { label: 'Контакты', href: '#contact' },
]

const PRODUCTS = [
  'Натуральная оболочка',
  'Искусственная оболочка',
  'Специи и смеси',
  'Пищевые добавки',
  'Белки',
  'Сетки и шпагаты',
]

export function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="gradient-dark text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main footer */}
        <div className="py-16 grid md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand */}
          <div className="lg:col-span-1">
            <div className="flex items-center gap-3 mb-5">
              <div className="w-10 h-10 rounded-xl gradient-brand flex items-center justify-center text-white font-black text-lg">
                В
              </div>
              <div>
                <span className="font-bold text-lg tracking-tight">ТЦ ВЫМПЕЛ</span>
                <span className="block text-xs text-white/40">с 1995 года</span>
              </div>
            </div>
            <p className="text-white/40 text-sm leading-relaxed mb-6">
              Всё для мясопереработки: оболочки, специи, пищевые добавки, белки и инвентарь.
              Прямые поставки от мировых производителей.
            </p>
          </div>

          {/* Navigation */}
          <div>
            <h4 className="font-bold text-sm uppercase tracking-wider text-white/60 mb-5">
              Навигация
            </h4>
            <ul className="space-y-3">
              {NAV_LINKS.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="text-white/50 hover:text-white transition-colors text-sm"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Products */}
          <div>
            <h4 className="font-bold text-sm uppercase tracking-wider text-white/60 mb-5">
              Продукция
            </h4>
            <ul className="space-y-3">
              {PRODUCTS.map((p) => (
                <li key={p}>
                  <a href="#products" className="text-white/50 hover:text-white transition-colors text-sm">
                    {p}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contacts */}
          <div>
            <h4 className="font-bold text-sm uppercase tracking-wider text-white/60 mb-5">
              Контакты
            </h4>
            <div className="space-y-4">
              <a href="tel:+74957870476" className="flex items-center gap-3 text-white/60 hover:text-white transition-colors">
                <Phone className="w-4 h-4 flex-shrink-0" />
                <span className="text-sm">8 495 787-04-76</span>
              </a>
              <a href="tel:+74956608790" className="flex items-center gap-3 text-white/60 hover:text-white transition-colors">
                <Phone className="w-4 h-4 flex-shrink-0" />
                <span className="text-sm">8 495 660-87-90</span>
              </a>
              <a href="mailto:tcvympel@mail.ru" className="flex items-center gap-3 text-white/60 hover:text-white transition-colors">
                <Mail className="w-4 h-4 flex-shrink-0" />
                <span className="text-sm">tcvympel@mail.ru</span>
              </a>
              <div className="flex items-start gap-3 text-white/60">
                <MapPin className="w-4 h-4 flex-shrink-0 mt-0.5" />
                <span className="text-sm">г. Москва, Высоковольтный проезд, д. 13А</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="py-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-white/30 text-sm">
            &copy; 2003–{year} ТЦ ВЫМПЕЛ. Все права защищены.
          </p>
          <a href="/admin" className="text-white/20 hover:text-white/40 text-xs transition-colors">
            Управление сайтом
          </a>
        </div>
      </div>
    </footer>
  )
}
