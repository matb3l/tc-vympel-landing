import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'ТЦ Вымпел — Всё для мясопереработки с 1995 года',
  description:
    'Оболочки, специи, пищевые добавки, белки и технологический инвентарь для мясоперерабатывающих предприятий. Доставка по всей России.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ru">
      <body>{children}</body>
    </html>
  )
}
