import type { Payload } from 'payload'

let cachedClient: Payload | null = null
let initFailed = false

async function getPayloadClient(): Promise<Payload | null> {
  if (initFailed) return null
  if (cachedClient) return cachedClient
  try {
    const { getPayload } = await import('payload')
    const { default: config } = await import('@payload-config')
    cachedClient = await getPayload({ config })
    return cachedClient
  } catch {
    initFailed = true
    return null
  }
}

function resolveImage(field: any, fallback?: { url: string; alt: string } | null): { url: string; alt: string } | null {
  if (!field) return fallback ?? null
  if (typeof field === 'object' && field.url) {
    return { url: field.url, alt: field.alt || '' }
  }
  return fallback ?? null
}

// Верифицированные Unsplash фото — все ID проверены через search.
// Тёмная цветовая гамма, кинематографичное освещение, мясная тематика.
const IMG = {
  // Hero — сырое мясо на стальном подносе, драматичный свет (Kyle Mackie)
  hero: 'https://images.unsplash.com/photo-1606677661991-446cea8ee182?w=2400&q=90&auto=format&fit=crop',
  // About — прилавок мясной лавки (tommao wang)
  about: 'https://images.unsplash.com/photo-1625643269470-5d3e7b69fa34?w=1600&q=90&auto=format&fit=crop',
  // CTA — драматичный мясной кадр
  cta: 'https://images.unsplash.com/photo-1597417321971-45e034f7a993?w=2400&q=85&auto=format&fit=crop',
  products: {
    // Натуральная оболочка — мастер-мясник с деревянной ручкой (традиционный look)
    natural: 'https://images.unsplash.com/photo-1601790189147-a6213f4feb9b?w=900&q=90&auto=format&fit=crop',
    // Искусственная оболочка — готовые колбаски на стальном подносе
    artificial: 'https://images.unsplash.com/photo-1624772398061-bbfa87ec6b5a?w=900&q=90&auto=format&fit=crop',
    // Специи — тёмный кадр со специями
    spices: 'https://images.unsplash.com/photo-1601379759871-f7cc12d04be4?w=900&q=90&auto=format&fit=crop',
    // Пищевые добавки — пищевые компоненты на разделочной доске
    additives: 'https://images.unsplash.com/photo-1553025934-296397db4010?w=900&q=90&auto=format&fit=crop',
    // Белки — гриль-колбаски
    proteins: 'https://images.unsplash.com/photo-1598401863352-3de5501f4890?w=900&q=90&auto=format&fit=crop',
    // Инвентарь — мясо на бумаге с инструментами
    inventory: 'https://images.unsplash.com/photo-1632154023554-c2975e9be348?w=900&q=90&auto=format&fit=crop',
  },
}

// ──────────────────────── HERO ────────────────────────

const HERO_MOCK = {
  badge: 'Надёжный поставщик с 1995 года',
  title: 'Ингредиенты, из которых рождается вкус',
  subtitle: 'Оболочки, специи, фосфаты, белки — всё, что нужно для колбас, деликатесов и полуфабрикатов премиум-класса. Прямые поставки от Viscofan, Kalle, Van Hees, Kerry. Отгрузка со склада в Москве в день заказа.',
  ctaText: 'Получить прайс-лист',
  ctaSecondaryText: 'Позвонить технологу',
  backgroundImage: { url: IMG.hero, alt: 'Мясоперерабатывающее производство' } as { url: string; alt: string } | null,
  stats: [
    { value: '30', label: 'лет на рынке' },
    { value: '500+', label: 'мясоперерабатывающих цехов' },
    { value: '1500+', label: 'артикулов на складе' },
    { value: '70+', label: 'регионов доставки' },
  ],
}

export async function getHeroData() {
  try {
    const payload = await getPayloadClient()
    if (!payload) return HERO_MOCK
    const data = await payload.findGlobal({ slug: 'hero-section' }) as any
    if (!data?.title) return HERO_MOCK
    return {
      badge: HERO_MOCK.badge,
      title: data.title || HERO_MOCK.title,
      subtitle: data.subtitle || HERO_MOCK.subtitle,
      ctaText: data.ctaText || HERO_MOCK.ctaText,
      ctaSecondaryText: data.ctaSecondaryText || HERO_MOCK.ctaSecondaryText,
      backgroundImage: resolveImage(data.backgroundImage, HERO_MOCK.backgroundImage),
      stats: data.stats?.length
        ? data.stats.map((s: any) => ({ value: s.value, label: s.label }))
        : HERO_MOCK.stats,
    }
  } catch {
    return HERO_MOCK
  }
}

// ──────────────────────── ABOUT ────────────────────────

const ABOUT_MOCK = {
  title: 'Партнёр мясопереработчиков России',
  description: 'ТЦ ВЫМПЕЛ — это не просто поставщик. Мы работаем с теми, кто превращает мясо в искусство. Наши технологи знают, как сделать колбасу с идеальным откусом, сохранить сочность деликатеса, добиться стабильного цвета варёнки. От небольших крафтовых цехов до крупнейших комбинатов страны — нам доверяют 30 лет.',
  image: { url: IMG.about, alt: 'Мясоперерабатывающий цех' } as { url: string; alt: string } | null,
  advantages: [
    { title: 'ГОСТ и ТР ТС', description: 'Вся продукция сертифицирована и соответствует требованиям ЕАЭС', icon: 'award' },
    { title: 'Персональный технолог', description: 'Разработаем рецептуру под ваш продукт — бесплатно', icon: 'users' },
    { title: 'Прямые контракты', description: 'Цены напрямую от Viscofan, Kalle, Van Hees, Kerry, ICL', icon: 'globe' },
    { title: 'Отгрузка день в день', description: 'Склад 3000 м² — позиции всегда в наличии', icon: 'headset' },
  ],
}

export async function getAboutData() {
  try {
    const payload = await getPayloadClient()
    if (!payload) return ABOUT_MOCK
    const data = await payload.findGlobal({ slug: 'about-section' })
    if (!data?.title) return ABOUT_MOCK
    return {
      title: data.title || ABOUT_MOCK.title,
      description: data.description || ABOUT_MOCK.description,
      image: resolveImage(data.image, ABOUT_MOCK.image),
      advantages: data.advantages?.length
        ? data.advantages.map((a: any) => ({ title: a.title, description: a.description, icon: a.icon }))
        : ABOUT_MOCK.advantages,
    }
  } catch {
    return ABOUT_MOCK
  }
}

// ──────────────────────── PRODUCTS ────────────────────────

const PRODUCTS_MOCK = [
  {
    id: '1',
    title: 'Натуральная оболочка',
    description: 'Черевы свиные 38–46 мм, говяжьи круга и синюги, бараньи — премиум отбор из Польши и Беларуси. Идеальная проницаемость, равномерная толщина, работает на любом шприце.',
    image: { url: IMG.products.natural, alt: 'Натуральная колбасная оболочка' } as { url: string; alt: string } | null,
  },
  {
    id: '2',
    title: 'Искусственная оболочка',
    description: 'Целлюлоза, коллаген, фиброуз, полиамид — Kalle, Viscofan, ATLAS. Варёные, полукопчёные, сырокопчёные — под любую рецептуру и диаметр.',
    image: { url: IMG.products.artificial, alt: 'Искусственная оболочка для колбас' },
  },
  {
    id: '3',
    title: 'Специи и смеси',
    description: 'Монопряности и функциональные смеси Wiberg, Moguntia, Van Hees. Ручной помол, свежие партии — тот самый аромат, который узнают ваши покупатели.',
    image: { url: IMG.products.spices, alt: 'Специи для мясопереработки' },
  },
  {
    id: '4',
    title: 'Пищевые добавки',
    description: 'Фосфаты ICL, красители Kerry, нитритная соль, стабилизаторы, консерванты. То, что превращает мясное сырьё в стабильный продукт с предсказуемым вкусом.',
    image: { url: IMG.products.additives, alt: 'Пищевые добавки' },
  },
  {
    id: '5',
    title: 'Белки',
    description: 'Соевые изоляты, коллагеновые и плазменные белки. Выход +10–15%, лучший откус, сочность, которую клиенты чувствуют с первого кусочка.',
    image: { url: IMG.products.proteins, alt: 'Пищевые белки' },
  },
  {
    id: '6',
    title: 'Инвентарь и сетки',
    description: 'Формовочные сетки, шпагат, ножи, термометры, клипсаторы. Всё, что нужно цеху, — одним заказом с доставкой за 24 часа.',
    image: { url: IMG.products.inventory, alt: 'Производственный инвентарь' },
  },
]

export async function getProductsData() {
  try {
    const payload = await getPayloadClient()
    if (!payload) return PRODUCTS_MOCK
    const { docs } = await payload.find({ collection: 'products', sort: 'order', where: { isActive: { equals: true } }, limit: 20 })
    if (!docs?.length) return PRODUCTS_MOCK
    return docs.map((d: any, i: number) => ({
      id: String(d.id),
      title: d.title,
      description: d.description,
      image: resolveImage(d.image, PRODUCTS_MOCK[i % PRODUCTS_MOCK.length]?.image || null),
    }))
  } catch {
    return PRODUCTS_MOCK
  }
}

// ──────────────────────── SERVICES ────────────────────────

const SERVICES_MOCK = [
  { id: '1', title: 'Маркировка оболочки', description: 'Нанесём ваш логотип, состав, сроки годности на любую оболочку за 3 дня.' },
  { id: '2', title: 'Гофрирование', description: 'Современные немецкие линии. Идеальная калибровка для высокоскоростных шприцев.' },
  { id: '3', title: 'Флексопечать', description: 'Этикетка и плёнка с полной полиграфией. От эскиза до готовой партии — 7 дней.' },
  { id: '4', title: 'Технологическое сопровождение', description: 'Технолог с 20-летним стажем подберёт рецептуру, оптимизирует себестоимость, исправит дефекты.' },
  { id: '5', title: 'Документация и ТУ', description: 'Декларация соответствия, ТУ, протоколы испытаний — поможем оформить под ключ.' },
  { id: '6', title: 'Спецзаказ', description: 'Редкий диаметр, нестандартная смесь специй, индивидуальная фасовка — найдём или закажем напрямую.' },
]

export async function getServicesData() {
  try {
    const payload = await getPayloadClient()
    if (!payload) return SERVICES_MOCK
    const { docs } = await payload.find({ collection: 'services', sort: 'order', limit: 20 })
    if (!docs?.length) return SERVICES_MOCK
    return docs.map((d: any) => ({ id: String(d.id), title: d.title, description: d.description }))
  } catch {
    return SERVICES_MOCK
  }
}

// ──────────────────────── PARTNERS ────────────────────────

const PARTNERS_MOCK = [
  'Viscofan', 'Kalle', 'Shenguan', 'World Casing',
  'Van Hees', 'Wiberg', 'Moguntia', 'Solina',
  'Kerry', 'ICL', 'Griffith Foods', 'Devro',
]

export async function getPartnersData() {
  try {
    const payload = await getPayloadClient()
    if (!payload) return PARTNERS_MOCK.map((name, i) => ({ id: String(i), name, logo: null as { url: string; alt: string } | null }))
    const { docs } = await payload.find({ collection: 'partners', sort: 'order', limit: 50 })
    if (!docs?.length) return PARTNERS_MOCK.map((name, i) => ({ id: String(i), name, logo: null }))
    return docs.map((d: any) => ({ id: String(d.id), name: d.name, logo: resolveImage(d.logo) }))
  } catch {
    return PARTNERS_MOCK.map((name, i) => ({ id: String(i), name, logo: null }))
  }
}

// ──────────────────────── GEOGRAPHY ────────────────────────

const GEOGRAPHY_MOCK = {
  title: 'Работаем по всей России',
  subtitle: 'Собственный склад 3000 м² в Москве. Отгрузка в день заказа. Транспортные компании доставят в любой регион за 1–5 дней.',
  stats: [
    { value: 70, suffix: '+', label: 'регионов доставки', icon: 'map-pin', primary: true },
    { value: 3000, suffix: ' м²', label: 'площадь склада', icon: 'building', primary: false },
    { value: 24, suffix: ' ч', label: 'отгрузка после заказа', icon: 'truck', primary: false },
    { value: 12, suffix: '', label: 'стран-производителей', icon: 'globe', primary: false },
  ],
}

export async function getGeographyData() {
  try {
    const payload = await getPayloadClient()
    if (!payload) return GEOGRAPHY_MOCK
    const data = await payload.findGlobal({ slug: 'geography-section' }) as any
    if (!data?.title) return GEOGRAPHY_MOCK
    return {
      title: data.title || GEOGRAPHY_MOCK.title,
      subtitle: data.subtitle || GEOGRAPHY_MOCK.subtitle,
      stats: data.stats?.length
        ? data.stats.map((s: any) => ({
            value: s.value ?? 0,
            suffix: s.suffix || '',
            label: s.label || '',
            icon: s.icon || 'map-pin',
            primary: Boolean(s.primary),
          }))
        : GEOGRAPHY_MOCK.stats,
    }
  } catch {
    return GEOGRAPHY_MOCK
  }
}

// ──────────────────────── CTA ────────────────────────

const CTA_MOCK = {
  title: 'Снизим себестоимость на 15–20%',
  subtitle: 'Проведём аудит ваших закупок и покажем, где можно сэкономить без потери качества. Бесплатно, под NDA.',
  ctaText: 'Запросить аудит закупок',
  benefits: [
    'Бесплатный аудит текущих закупок',
    'Прайс с персональными скидками',
    'Консультация технолога — 1 час',
    'Пробная партия без предоплаты',
  ],
}

export async function getCTAData() {
  try {
    const payload = await getPayloadClient()
    if (!payload) return CTA_MOCK
    const data = await payload.findGlobal({ slug: 'cta-section' }) as any
    if (!data?.title) return CTA_MOCK
    return {
      title: data.title || CTA_MOCK.title,
      subtitle: data.subtitle || CTA_MOCK.subtitle,
      ctaText: data.ctaText || CTA_MOCK.ctaText,
      benefits: data.benefits?.length
        ? data.benefits.map((b: any) => b.text || '')
        : CTA_MOCK.benefits,
    }
  } catch {
    return CTA_MOCK
  }
}

// ──────────────────────── SITE SETTINGS ────────────────────────

const SETTINGS_MOCK = {
  companyName: 'ТЦ ВЫМПЕЛ',
  phone: '8 (495) 787-04-76',
  email: 'info@tcvympel.ru',
  address: 'г. Москва, ул. Докукина, д.16, стр.2',
}

export async function getSiteSettings() {
  try {
    const payload = await getPayloadClient()
    if (!payload) return SETTINGS_MOCK
    const data = await payload.findGlobal({ slug: 'site-settings' })
    return {
      companyName: data?.companyName || SETTINGS_MOCK.companyName,
      phone: data?.phone || SETTINGS_MOCK.phone,
      email: data?.email || SETTINGS_MOCK.email,
      address: data?.address || SETTINGS_MOCK.address,
    }
  } catch {
    return SETTINGS_MOCK
  }
}
