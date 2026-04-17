import type { CollectionConfig } from 'payload'
import ExcelJS from 'exceljs'

const STATUS_MAP: Record<string, string> = {
  new: 'Новая',
  in_progress: 'В работе',
  done: 'Завершена',
}

const STATUS_COLORS: Record<string, string> = {
  new: 'FFFEF3C7',         // amber-100
  in_progress: 'FFBFDBFE', // blue-200
  done: 'FFBBF7D0',        // green-200
}

const STATUS_FONT: Record<string, string> = {
  new: 'FF92400E',         // amber-800
  in_progress: 'FF1E40AF', // blue-800
  done: 'FF166534',        // green-800
}

export const ContactSubmissions: CollectionConfig = {
  slug: 'contact-submissions',
  labels: { singular: 'Заявка', plural: 'Заявки' },
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['name', 'phone', 'company', 'status', 'createdAt'],
    description: 'Все входящие заявки с сайта. Для выгрузки в Excel — кнопка над таблицей.',
    components: {
      beforeListTable: ['/components/admin/ExportButton#ExportButton'],
    },
  },
  access: {
    read: ({ req }) => Boolean(req.user),
    create: () => true,
    update: ({ req }) => Boolean(req.user),
    delete: ({ req }) => Boolean(req.user),
  },
  endpoints: [
    {
      path: '/export-xlsx',
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

        const workbook = new ExcelJS.Workbook()
        workbook.creator = 'ТЦ Вымпел — CRM'
        workbook.created = new Date()

        const sheet = workbook.addWorksheet('Заявки', {
          views: [{ state: 'frozen', ySplit: 1 }],
          properties: { defaultRowHeight: 22 },
        })

        sheet.columns = [
          { header: '№',        key: 'idx',       width: 6 },
          { header: 'Дата',      key: 'date',      width: 18 },
          { header: 'Имя',       key: 'name',      width: 22 },
          { header: 'Телефон',   key: 'phone',     width: 22 },
          { header: 'Email',     key: 'email',     width: 28 },
          { header: 'Компания',  key: 'company',   width: 26 },
          { header: 'Сообщение', key: 'message',   width: 50 },
          { header: 'Статус',    key: 'status',    width: 16 },
        ]

        const headerRow = sheet.getRow(1)
        headerRow.height = 32
        headerRow.eachCell((cell) => {
          cell.fill = {
            type: 'pattern',
            pattern: 'solid',
            fgColor: { argb: 'FF7F1D1D' },
          }
          cell.font = {
            name: 'Calibri',
            size: 11,
            bold: true,
            color: { argb: 'FFFFFFFF' },
          }
          cell.alignment = { vertical: 'middle', horizontal: 'left', indent: 1 }
          cell.border = {
            bottom: { style: 'medium', color: { argb: 'FF450A0A' } },
          }
        })

        docs.forEach((d: any, i: number) => {
          const rowData = {
            idx: i + 1,
            date: new Date(d.createdAt),
            name: d.name || '',
            phone: d.phone || '',
            email: d.email || '',
            company: d.company || '',
            message: (d.message || '').replace(/[\r\n]+/g, ' '),
            status: STATUS_MAP[d.status] || d.status || '',
          }
          const row = sheet.addRow(rowData)
          row.height = 24

          row.eachCell({ includeEmpty: true }, (cell, colNum) => {
            cell.alignment = { vertical: 'middle', horizontal: 'left', indent: 1, wrapText: true }
            cell.font = { name: 'Calibri', size: 11, color: { argb: 'FF1F2937' } }
            cell.border = {
              bottom: { style: 'thin', color: { argb: 'FFE5E7EB' } },
            }
            if (i % 2 === 1) {
              cell.fill = {
                type: 'pattern',
                pattern: 'solid',
                fgColor: { argb: 'FFFAFAF9' },
              }
            }
          })

          const dateCell = row.getCell('date')
          dateCell.numFmt = 'dd.mm.yyyy  hh:mm'

          const statusCell = row.getCell('status')
          const rawStatus: string = d.status || 'new'
          statusCell.fill = {
            type: 'pattern',
            pattern: 'solid',
            fgColor: { argb: STATUS_COLORS[rawStatus] || 'FFE5E7EB' },
          }
          statusCell.font = {
            name: 'Calibri',
            size: 11,
            bold: true,
            color: { argb: STATUS_FONT[rawStatus] || 'FF374151' },
          }
          statusCell.alignment = { vertical: 'middle', horizontal: 'center' }
        })

        sheet.autoFilter = {
          from: { row: 1, column: 1 },
          to:   { row: 1, column: sheet.columns.length },
        }

        const totalRow = sheet.addRow({
          idx: '',
          date: '',
          name: `Всего заявок: ${docs.length}`,
          phone: '',
          email: '',
          company: '',
          message: '',
          status: '',
        })
        totalRow.height = 28
        totalRow.eachCell({ includeEmpty: true }, (cell) => {
          cell.fill = {
            type: 'pattern',
            pattern: 'solid',
            fgColor: { argb: 'FFF3F4F6' },
          }
          cell.font = { name: 'Calibri', size: 11, bold: true, color: { argb: 'FF111827' } }
          cell.alignment = { vertical: 'middle', horizontal: 'left', indent: 1 }
          cell.border = { top: { style: 'medium', color: { argb: 'FF7F1D1D' } } }
        })

        const buffer = await workbook.xlsx.writeBuffer()
        const filename = `zayavki_${new Date().toISOString().slice(0, 10)}.xlsx`

        return new Response(buffer as unknown as ArrayBuffer, {
          headers: {
            'Content-Type': 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
            'Content-Disposition': `attachment; filename="${filename}"`,
            'Cache-Control': 'no-store',
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
