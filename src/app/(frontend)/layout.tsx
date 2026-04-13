import type { Metadata } from 'next'
import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'

export const metadata: Metadata = {
  title: 'ТЦ Вымпел — Всё для мясопереработки с 1995 года',
  description:
    'Оболочки, специи, пищевые добавки, белки и технологический инвентарь для мясоперерабатывающих предприятий. Прямые поставки от ведущих мировых производителей. Доставка по всей России.',
  keywords: [
    'колбасная оболочка',
    'оболочка для колбас',
    'специи для мясопереработки',
    'пищевые добавки',
    'мясопереработка',
    'натуральная оболочка',
    'искусственная оболочка',
    'ТЦ Вымпел',
    'поставщик оболочки',
    'фосфаты для мяса',
    'белки для мясопереработки',
  ],
  openGraph: {
    title: 'ТЦ Вымпел — Всё для мясопереработки с 1995 года',
    description: 'Оболочки, специи, пищевые добавки от надёжного поставщика с 30-летним опытом.',
    url: process.env.NEXT_PUBLIC_SITE_URL,
    siteName: 'ТЦ Вымпел',
    locale: 'ru_RU',
    type: 'website',
  },
  robots: { index: true, follow: true },
  alternates: { canonical: process.env.NEXT_PUBLIC_SITE_URL },
}

export default function FrontendLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Header />
      <main>{children}</main>
      <Footer />
    </>
  )
}
