// ─────────────────────────────────────────────────────────────────────────────
// Изображения сайта. Управляются напрямую через этот файл (не через Payload).
// Чтобы сменить картинку — замени URL на свою (можно Unsplash, можно свою
// загруженную через /public/images/).
// ─────────────────────────────────────────────────────────────────────────────

export const SITE_IMAGES = {
  // Hero — фон главного экрана. Тёмный драматичный кадр с мясом.
  // Kyle Mackie · https://unsplash.com/photos/MEnlQv-EQvY
  hero: {
    url: 'https://images.unsplash.com/photo-1606677661991-446cea8ee182?w=2400&q=90&auto=format&fit=crop',
    alt: 'Сырое мясо на производстве',
  },

  // About — фото мясного прилавка / цеха.
  // tommao wang · https://unsplash.com/photos/kqytZ3VFb_o
  about: {
    url: 'https://images.unsplash.com/photo-1625643269470-5d3e7b69fa34?w=1600&q=90&auto=format&fit=crop',
    alt: 'Мясной цех / прилавок',
  },

  // CTA — декоративный фон под блоком призыва.
  // Kyle Mackie · https://unsplash.com/photos/qgfjZUXup1M
  cta: {
    url: 'https://images.unsplash.com/photo-1597417321971-45e034f7a993?w=2400&q=85&auto=format&fit=crop',
    alt: '',
  },

  // Продуктовые карточки: по названию продукта (slug).
  products: {
    // Натуральная оболочка — мясник с деревянной ручкой (craft)
    'natural': {
      url: 'https://images.unsplash.com/photo-1601790189147-a6213f4feb9b?w=900&q=90&auto=format&fit=crop',
      alt: 'Натуральная колбасная оболочка',
    },
    // Искусственная оболочка — колбаски на стальном подносе
    'artificial': {
      url: 'https://images.unsplash.com/photo-1624772398061-bbfa87ec6b5a?w=900&q=90&auto=format&fit=crop',
      alt: 'Искусственная оболочка',
    },
    // Специи — тёмный кадр со специями
    'spices': {
      url: 'https://images.unsplash.com/photo-1601379759871-f7cc12d04be4?w=900&q=90&auto=format&fit=crop',
      alt: 'Специи для мясопереработки',
    },
    // Пищевые добавки — компоненты на разделочной доске
    'additives': {
      url: 'https://images.unsplash.com/photo-1553025934-296397db4010?w=900&q=90&auto=format&fit=crop',
      alt: 'Пищевые добавки',
    },
    // Белки — гриль-колбаски
    'proteins': {
      url: 'https://images.unsplash.com/photo-1598401863352-3de5501f4890?w=900&q=90&auto=format&fit=crop',
      alt: 'Пищевые белки',
    },
    // Инвентарь — мясо с инструментами
    'inventory': {
      url: 'https://images.unsplash.com/photo-1632154023554-c2975e9be348?w=900&q=90&auto=format&fit=crop',
      alt: 'Производственный инвентарь',
    },
  },
} as const

// Порядок ключей для fallback-матчинга по индексу в products (если в Payload
// добавили пункт, для которого мы не завели картинку — возьмём по порядку).
const PRODUCT_IMAGE_KEYS: (keyof typeof SITE_IMAGES.products)[] = [
  'natural', 'artificial', 'spices', 'additives', 'proteins', 'inventory',
]

/** Возвращает картинку для продукта по индексу (круговая подстановка). */
export function getProductImage(index: number) {
  const key = PRODUCT_IMAGE_KEYS[index % PRODUCT_IMAGE_KEYS.length]
  return SITE_IMAGES.products[key]
}
