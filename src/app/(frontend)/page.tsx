import { HeroSection } from '@/components/HeroSection'
import { AboutSection } from '@/components/AboutSection'
import { ProductsSection } from '@/components/ProductsSection'
import { ServicesSection } from '@/components/ServicesSection'
import { PartnersSection } from '@/components/PartnersSection'
import { GeographySection } from '@/components/GeographySection'
import { ContactForm } from '@/components/ContactForm'

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'ТЦ Вымпел',
  description:
    'Поставщик товаров для мясопереработки: оболочки, специи, пищевые добавки, белки и технологический инвентарь. С 1995 года.',
  url: 'https://tcvympel.ru',
  logo: 'https://tcvympel.ru/logo.png',
  foundingDate: '1995',
  address: [
    {
      '@type': 'PostalAddress',
      streetAddress: 'Высоковольтный проезд, д. 13А',
      addressLocality: 'Москва',
      addressCountry: 'RU',
      postalCode: '127566',
    },
    {
      '@type': 'PostalAddress',
      streetAddress: 'пр. Ленина, д. 27, корп. 1',
      addressLocality: 'Нижний Новгород',
      addressCountry: 'RU',
      postalCode: '603140',
    },
    {
      '@type': 'PostalAddress',
      streetAddress: 'ул. Крупской, д. 55',
      addressLocality: 'Санкт-Петербург',
      addressCountry: 'RU',
      postalCode: '192148',
    },
  ],
  telephone: ['+7-495-787-04-76', '+7-495-660-87-90'],
  email: 'tcvympel@mail.ru',
  sameAs: ['https://www.tcvympel.ru'],
  areaServed: { '@type': 'Country', name: 'Russia' },
  makesOffer: [
    { '@type': 'Offer', itemOffered: { '@type': 'Product', name: 'Натуральные колбасные оболочки' } },
    { '@type': 'Offer', itemOffered: { '@type': 'Product', name: 'Искусственные колбасные оболочки' } },
    { '@type': 'Offer', itemOffered: { '@type': 'Product', name: 'Специи для мясопереработки' } },
    { '@type': 'Offer', itemOffered: { '@type': 'Product', name: 'Пищевые добавки' } },
    { '@type': 'Offer', itemOffered: { '@type': 'Product', name: 'Белки для мясопереработки' } },
    { '@type': 'Offer', itemOffered: { '@type': 'Product', name: 'Технологический инвентарь' } },
  ],
}

export default function HomePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <HeroSection />
      <AboutSection />
      <ProductsSection />
      <ServicesSection />
      <PartnersSection />
      <GeographySection />
      <ContactForm />
    </>
  )
}
