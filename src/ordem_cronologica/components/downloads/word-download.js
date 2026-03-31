import { normalizeData } from '../../../components/commons/utils'
import { columns } from './utils'

function formatValue(key, value) {
  if (value == null) return ''
  return String(value)
}

export function ODT_Download_Ordem_Cronologica(data) {
  const rowsData = normalizeData(data)

  const lines = []

  lines.push('Relatório de Despesas\n')

  lines.push(columns.map((c) => c.header).join('\t'))

  rowsData.forEach((row) => {
    const line = columns
      .map((c) => {
        let value = row?.[c.key]

        if (c.key === 'beneficiario' && !value) {
          value = 'Cadastrar beneficiário'
        }

        return formatValue(c.key, value)
      })
      .join('\t')

    lines.push(line)
  })

  const content = lines.join('\n')

  const blob = new Blob([content], {
    type: 'application/vnd.oasis.opendocument.text',
  })

  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')

  a.href = url
  a.download = 'ordem_cronologica.odt'
  a.click()

  URL.revokeObjectURL(url)
}
