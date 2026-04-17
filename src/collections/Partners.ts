import type { CollectionConfig } from 'payload'

export const Partners: CollectionConfig = {
  slug: 'partners',
  labels: { singular: 'Партнёр', plural: 'Партнёры' },
  admin: { useAsTitle: 'name', defaultColumns: ['name', 'country', 'order'] },
  access: { read: () => true },
  fields: [
    { name: 'name', type: 'text', label: 'Название компании', required: true },
    { name: 'country', type: 'text', label: 'Страна', required: true },
    { name: 'description', type: 'textarea', label: 'Описание' },
    { name: 'website', type: 'text', label: 'Сайт' },
    { name: 'order', type: 'number', label: 'Порядок', defaultValue: 0 },
  ],
}
