import { columns, normalizeData, formatValue } from './utils'

export function ODT_Download_Despesas(data = []) {
  const rowsData = normalizeData(data)

  const lines = []

  lines.push('Relatório de Despesas Consolidadas\n')

  lines.push(columns.map((c) => c.header).join('\t'))

  rowsData.forEach((row) => {
    const line = columns.map((c) => formatValue(c.key, row?.[c.key])).join('\t')

    lines.push(line)
  })

  const content = lines.join('\n')

  const blob = new Blob([content], {
    type: 'application/vnd.oasis.opendocument.text;charset=utf-8',
  })

  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')

  a.href = url
  a.download = 'despesas_consolidadas.odt'
  a.click()

  URL.revokeObjectURL(url)
}
