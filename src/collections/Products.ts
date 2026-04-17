import type { CollectionConfig } from 'payload'

export const Products: CollectionConfig = {
  slug: 'products',
  labels: { singular: 'Продукт', plural: 'Продукция' },
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'order', 'isActive'],
  },
  access: { read: () => true },
  fields: [
    { name: 'title', type: 'text', label: 'Название', required: true },
    { name: 'description', type: 'textarea', label: 'Описание', required: true },
    { name: 'features', type: 'array', label: 'Особенности', fields: [{ name: 'text', type: 'text', label: 'Текст' }] },
    { name: 'order', type: 'number', label: 'Порядок', defaultValue: 0 },
    { name: 'isActive', type: 'checkbox', label: 'Активен', defaultValue: true },
  ],
}
