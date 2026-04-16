export const revalidate = 60

import { HeroSection } from '@/components/HeroSection'
import { AboutSection } from '@/components/AboutSection'
import { ProductsSection } from '@/components/ProductsSection'
import { ServicesSection } from '@/components/ServicesSection'
import { PartnersSection } from '@/components/PartnersSection'
import { GeographySection } from '@/components/GeographySection'
import { CTASection } from '@/components/CTASection'
import { ContactForm } from '@/components/ContactForm'
import { StickyCard } from '@/components/StickyStack'

import {
  getHeroData,
  getAboutData,
  getProductsData,
  getServicesData,
  getPartnersData,
  getGeographyData,
  getCTAData,
  getSiteSettings,
} from '@/lib/payload-data'

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'ТЦ Вымпел',
  description: 'Поставщик товаров для мясопереработки с 1995 года.',
  url: 'https://tcvympel.ru',
  foundingDate: '1995',
  telephone: ['+7-495-787-04-76'],
  email: 'tcvympel@mail.ru',
  sameAs: ['https://www.tcvympel.ru'],
  areaServed: { '@type': 'Country', name: 'Russia' },
}

const TOTAL_SECTIONS = 8

export default async function HomePage() {
  const [hero, about, products, services, partners, geography, cta, settings] = await Promise.all([
    getHeroData(),
    getAboutData(),
    getProductsData(),
    getServicesData(),
    getPartnersData(),
    getGeographyData(),
    getCTAData(),
    getSiteSettings(),
  ])

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <StickyCard index={0} total={TOTAL_SECTIONS}>
        <HeroSection data={hero} phone={settings.phone} />
      </StickyCard>

      <StickyCard index={1} total={TOTAL_SECTIONS}>
        <AboutSection data={about} />
      </StickyCard>

      <StickyCard index={2} total={TOTAL_SECTIONS}>
        <ProductsSection data={products} />
      </StickyCard>

      <StickyCard index={3} total={TOTAL_SECTIONS}>
        <ServicesSection data={services} />
      </StickyCard>

      <StickyCard index={4} total={TOTAL_SECTIONS}>
        <PartnersSection data={partners} />
      </StickyCard>

      <StickyCard index={5} total={TOTAL_SECTIONS}>
        <GeographySection data={geography} />
      </StickyCard>

      <StickyCard index={6} total={TOTAL_SECTIONS}>
        <CTASection data={cta} />
      </StickyCard>

      <StickyCard index={7} total={TOTAL_SECTIONS}>
        <ContactForm settings={settings} />
      </StickyCard>
    </>
  )
}
