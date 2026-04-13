import type { ServerComponentProps } from 'payload'
import '@payloadcms/next/css'

export const metadata = {
  title: 'ТЦ Вымпел — Админ-панель',
}

export default async function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
