import type { CollectionConfig } from 'payload'

export const Services: CollectionConfig = {
  slug: 'services',
  labels: { singular: 'Услуга', plural: 'Услуги' },
  admin: { useAsTitle: 'title', defaultColumns: ['title', 'order'] },
  access: { read: () => true },
  fields: [
    { name: 'title', type: 'text', label: 'Название', required: true },
    { name: 'description', type: 'textarea', label: 'Описание', required: true },
    { name: 'order', type: 'number', label: 'Порядок', defaultValue: 0 },
  ],
}
