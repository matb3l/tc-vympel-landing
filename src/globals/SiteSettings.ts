import type { GlobalConfig } from 'payload'

export const SiteSettings: GlobalConfig = {
  slug: 'site-settings',
  label: 'Настройки сайта',
  access: { read: () => true },
  fields: [
    {
      name: 'companyName',
      type: 'text',
      label: 'Название компании',
      defaultValue: 'ТЦ ВЫМПЕЛ',
    },
    {
      name: 'phone',
      type: 'text',
      label: 'Телефон',
      defaultValue: '8 495 787-04-76',
    },
    {
      name: 'phoneSecondary',
      type: 'text',
      label: 'Доп. телефон',
      defaultValue: '8 495 660-87-90',
    },
    {
      name: 'email',
      type: 'email',
      label: 'Email',
      defaultValue: 'tcvympel@mail.ru',
    },
    {
      name: 'address',
      type: 'text',
      label: 'Адрес (основной)',
      defaultValue: 'г. Москва, Высоковольтный проезд, д. 13А',
    },
    {
      name: 'logo',
      type: 'upload',
      relationTo: 'media',
      label: 'Логотип',
    },
    {
      name: 'offices',
      type: 'array',
      label: 'Офисы и филиалы',
      fields: [
        { name: 'city', type: 'text', label: 'Город' },
        { name: 'address', type: 'text', label: 'Адрес' },
        { name: 'phone', type: 'text', label: 'Телефон' },
      ],
    },
  ],
}
