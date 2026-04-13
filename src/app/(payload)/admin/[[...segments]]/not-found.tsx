import type { AdminViewProps } from 'payload'
import { NotFoundPage } from '@payloadcms/next/views'
import { importMap } from '../importMap'

type Args = {
  params: Promise<{ segments: string[] }>
  searchParams: Promise<{ [key: string]: string | string[] }>
}

const NotFound = async ({ params, searchParams }: Args) => {
  return NotFoundPage({ params, searchParams, importMap } as AdminViewProps)
}

export default NotFound
