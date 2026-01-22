import { formatDateBR, normalizeData } from '../../../components/commons/utils'
import { columns, dateKeys, moneyKeys } from './utils'

function downloadBlob(filename, content, mime) {
  const blob = new Blob([content], { type: mime })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = filename
  a.click()
  URL.revokeObjectURL(url)
}

function convertToExcel(data) {
  const rowsData = normalizeData(data)
  const sep = ';' // Excel pt-BR

  const header = columns.map((c) => c.header).join(sep)

  const rows = rowsData.map((row) =>
    columns
      .map((c) => {
        let value = row?.[c.key] ?? ''

        // 👉 moeda como NÚMERO (sem R$)
        if (moneyKeys.has(c.key)) {
          return Number(value).toString().replace('.', ',')
        }

        // 👉 data no padrão brasileiro
        if (dateKeys.has(c.key)) {
          return formatDateBR(value)
        }

        return value
      })
      .join(sep),
  )

  // BOM UTF-8 (essencial!)
  return '\uFEFF' + [header, ...rows].join('\n')
}

export const ExcelDownload = (data) => {
  const csv = convertToExcel(data)
  downloadBlob('receitas-transferencias.csv', csv, 'text/csv;charset=utf-8;')
}
