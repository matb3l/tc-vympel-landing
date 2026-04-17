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
  HERO, ABOUT, PRODUCTS, SERVICES, PARTNERS, GEOGRAPHY, CTA, SETTINGS,
} from '@/lib/content'

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: SETTINGS.companyName,
  description: 'Поставщик товаров для мясопереработки с 1995 года.',
  url: 'https://tcvympel.ru',
  foundingDate: '1995',
  telephone: ['+7-495-787-04-76'],
  email: SETTINGS.email,
  sameAs: [SETTINGS.externalSite],
  areaServed: { '@type': 'Country', name: 'Russia' },
}

const TOTAL_SECTIONS = 8

export default function HomePage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <StickyCard index={0} total={TOTAL_SECTIONS}>
        <HeroSection data={HERO} phone={SETTINGS.phone} />
      </StickyCard>

      <StickyCard index={1} total={TOTAL_SECTIONS}>
        <AboutSection data={ABOUT} />
      </StickyCard>

      <StickyCard index={2} total={TOTAL_SECTIONS}>
        <ProductsSection data={PRODUCTS as any} />
      </StickyCard>

      <StickyCard index={3} total={TOTAL_SECTIONS}>
        <ServicesSection data={SERVICES as any} />
      </StickyCard>

      <StickyCard index={4} total={TOTAL_SECTIONS}>
        <PartnersSection data={PARTNERS as any} />
      </StickyCard>

      <StickyCard index={5} total={TOTAL_SECTIONS}>
        <GeographySection data={GEOGRAPHY as any} />
      </StickyCard>

      <StickyCard index={6} total={TOTAL_SECTIONS}>
        <CTASection data={CTA as any} />
      </StickyCard>

      <StickyCard index={7} total={TOTAL_SECTIONS}>
        <ContactForm />
      </StickyCard>
    </>
  )
}
