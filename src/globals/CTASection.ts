import type { GlobalConfig } from 'payload'

export const CTASection: GlobalConfig = {
  slug: 'cta-section',
  label: 'Блок «Призыв к действию»',
  access: { read: () => true },
  fields: [
    { name: 'title', type: 'text', label: 'Заголовок', defaultValue: 'Готовы оптимизировать закупки?' },
    { name: 'subtitle', type: 'textarea', label: 'Подзаголовок', defaultValue: 'Более 500 предприятий уже экономят с нами до 20% на ингредиентах. Присоединяйтесь.' },
    { name: 'ctaText', type: 'text', label: 'Текст кнопки', defaultValue: 'Получить предложение' },
    {
      name: 'benefits',
      type: 'array',
      label: 'Преимущества',
      fields: [
        { name: 'text', type: 'text', label: 'Текст', required: true },
      ],
    },
  ],
}
