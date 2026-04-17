'use client'

import { useState } from 'react'

export function ExportButton() {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleClick = async () => {
    setLoading(true)
    setError(null)
    try {
      const res = await fetch('/api/contact-submissions/export-xlsx', {
        credentials: 'include',
      })
      if (!res.ok) {
        throw new Error(res.status === 401 ? 'Нужна авторизация' : `Ошибка ${res.status}`)
      }
      const blob = await res.blob()
      const url = URL.createObjectURL(blob)
      const filename = `zayavki_${new Date().toISOString().slice(0, 10)}.xlsx`
      const a = document.createElement('a')
      a.href = url
      a.download = filename
      document.body.appendChild(a)
      a.click()
      a.remove()
      URL.revokeObjectURL(url)
    } catch (e: any) {
      setError(e?.message || 'Не удалось выгрузить')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: 12,
        padding: '16px 20px',
        marginBottom: 16,
        background: 'linear-gradient(135deg, #fef2f2 0%, #fff7ed 100%)',
        border: '1px solid #fecaca',
        borderRadius: 12,
      }}
    >
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ fontSize: 14, fontWeight: 700, color: '#7f1d1d', marginBottom: 2 }}>
          Экспорт заявок в Excel
        </div>
        <div style={{ fontSize: 12, color: '#991b1b', opacity: 0.85 }}>
          Скачайте все заявки одним файлом .xlsx с форматированием, фильтрами и цветными статусами.
        </div>
        {error && (
          <div style={{ fontSize: 12, color: '#b91c1c', marginTop: 4, fontWeight: 600 }}>
            {error}
          </div>
        )}
      </div>
      <button
        type="button"
        onClick={handleClick}
        disabled={loading}
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: 8,
          padding: '10px 18px',
          background: loading ? '#9ca3af' : 'linear-gradient(135deg, #b91c1c 0%, #7f1d1d 100%)',
          color: '#fff',
          fontWeight: 700,
          fontSize: 13,
          border: 'none',
          borderRadius: 8,
          cursor: loading ? 'wait' : 'pointer',
          boxShadow: loading ? 'none' : '0 4px 12px rgba(127, 29, 29, 0.25)',
          transition: 'transform 0.15s ease, box-shadow 0.15s ease',
          whiteSpace: 'nowrap',
        }}
        onMouseEnter={(e) => {
          if (!loading) {
            e.currentTarget.style.transform = 'translateY(-1px)'
            e.currentTarget.style.boxShadow = '0 6px 16px rgba(127, 29, 29, 0.35)'
          }
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.transform = 'translateY(0)'
          e.currentTarget.style.boxShadow = loading ? 'none' : '0 4px 12px rgba(127, 29, 29, 0.25)'
        }}
      >
        {loading ? (
          <>
            <Spinner /> Готовим файл…
          </>
        ) : (
          <>
            <DownloadIcon /> Скачать Excel
          </>
        )}
      </button>
    </div>
  )
}

function DownloadIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
      <polyline points="7 10 12 15 17 10" />
      <line x1="12" y1="15" x2="12" y2="3" />
    </svg>
  )
}

function Spinner() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" style={{ animation: 'spin 0.8s linear infinite' }}>
      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
      <path d="M21 12a9 9 0 1 1-6.219-8.56" />
    </svg>
  )
}

export default ExportButton
