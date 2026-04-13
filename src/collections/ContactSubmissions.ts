import type { CollectionConfig } from 'payload'

export const ContactSubmissions: CollectionConfig = {
  slug: 'contact-submissions',
  labels: { singular: 'Заявка', plural: 'Заявки' },
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['name', 'phone', 'company', 'createdAt'],
  },
  access: {
    read: () => true,
    create: () => true,
  },
  fields: [
    { name: 'name', type: 'text', label: 'Имя', required: true },
    { name: 'phone', type: 'text', label: 'Телефон', required: true },
    { name: 'email', type: 'email', label: 'Email' },
    { name: 'company', type: 'text', label: 'Компания' },
    { name: 'message', type: 'textarea', label: 'Сообщение' },
    {
      name: 'status',
      type: 'select',
      label: 'Статус',
      defaultValue: 'new',
      options: [
        { label: 'Новая', value: 'new' },
        { label: 'В работе', value: 'in_progress' },
        { label: 'Завершена', value: 'done' },
      ],
    },
  ],
}
