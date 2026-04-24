import {
  formatCurrencyBR,
  formatDateBR,
} from '../../../components/commons/utils'

export function TXT_Download_Despesas(data) {
  const texto = data
    .map((item, index) => {
      return `
Registro ${index + 1}
--------------------
Unidade Orçamentária: ${item.unidade_orcamentaria ?? 'Não informado'}
Valor Empenhado: ${formatCurrencyBR(item.valor_total_empenhado ?? '')}
Valor Liquidado: ${formatCurrencyBR(item.valor_total_liquidado ?? '')}
Valor Pago: ${formatCurrencyBR(item.valor_total_pago ?? '')}
`.trim()
    })
    .join('\n\n')

  const blob = new Blob([texto], { type: 'text/plain;charset=utf-8' })
  const link = document.createElement('a')
  link.href = URL.createObjectURL(blob)
  link.download = 'despesas_diarias.txt'
  link.click()
}
