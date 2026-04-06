import { columns, normalizeData } from './utils'

function downloadBlob(filename, content, mime) {
  const blob = new Blob([content], { type: mime })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = filename
  a.click()
  URL.revokeObjectURL(url)
}

function escapeCSV(value) {
  if (value == null) return ''
  const str = String(value)

  if (str.includes(';') || str.includes('\n') || str.includes('"')) {
    return `"${str.replace(/"/g, '""')}"`
  }

  return str
}

function convertToExcel(data) {
  const rowsData = normalizeData(data)
  const sep = ';'

  const header = columns.map((c) => c.header).join(sep)

  const rows = rowsData.map((row) =>
    columns
      .map((c) => {
        let value = row?.[c.key]

        if (c.key === 'beneficiario' && !value) {
          value = 'Cadastrar beneficiário'
        }

        return escapeCSV(value)
      })
      .join(sep),
  )

  return '\uFEFF' + [header, ...rows].join('\n')
}

export const Excel_Download_Ordem_Cronologica = (data) => {
  const csv = convertToExcel(data)
  downloadBlob('ordem_cronologica.csv', csv, 'text/csv;charset=utf-8;')
}
