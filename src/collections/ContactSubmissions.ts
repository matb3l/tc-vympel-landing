import type { CollectionConfig } from 'payload'

export const ContactSubmissions: CollectionConfig = {
  slug: 'contact-submissions',
  labels: { singular: 'Заявка', plural: 'Заявки' },
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['name', 'phone', 'company', 'status', 'createdAt'],
    description: 'Скачать все заявки: откройте /api/contact-submissions/export-csv в браузере (нужна авторизация)',
  },
  access: {
    read: ({ req }) => Boolean(req.user),
    create: () => true,
  },
  endpoints: [
    {
      path: '/export-csv',
      method: 'get',
      handler: async (req) => {
        if (!req.user) {
          return Response.json({ error: 'Unauthorized' }, { status: 401 })
        }
        const { docs } = await req.payload.find({
          collection: 'contact-submissions',
          limit: 10000,
          sort: '-createdAt',
        })

        const statusMap: Record<string, string> = {
          new: 'Новая',
          in_progress: 'В работе',
          done: 'Завершена',
        }

        const headers = ['Дата', 'Имя', 'Телефон', 'Email', 'Компания', 'Сообщение', 'Статус']
        const rows = docs.map((d: any) => [
          new Date(d.createdAt).toLocaleDateString('ru-RU'),
          d.name || '',
          d.phone || '',
          d.email || '',
          d.company || '',
          (d.message || '').replace(/[\r\n]+/g, ' '),
          statusMap[d.status] || d.status || '',
        ])

        const csvContent = [
          headers.join(';'),
          ...rows.map((r: string[]) => r.map((v) => `"${v.replace(/"/g, '""')}"`).join(';')),
        ].join('\r\n')

        return new Response('\ufeff' + csvContent, {
          headers: {
            'Content-Type': 'text/csv; charset=utf-8',
            'Content-Disposition': `attachment; filename="zayvki_${new Date().toISOString().slice(0, 10)}.csv"`,
          },
        })
      },
    },
  ],
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
