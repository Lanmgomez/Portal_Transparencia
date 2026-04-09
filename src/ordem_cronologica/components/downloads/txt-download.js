import {
  formatCurrencyBR,
  formatDateBR,
} from '../../../components/commons/utils'

export function TXT_Download_Ordem_Cronologica(data) {
  const texto = data
    .map((item, index) => {
      return `
Registro ${index + 1}
--------------------
Ano: ${item.ano}
Data Liquidação: ${formatDateBR(item.data_liquidacao)}
Data Pagamento: ${formatDateBR(item.data_pagamento)}
Beneficiário: ${item.beneficiario}
Empenho: ${item.numero_empenho}
Parcela: ${item.parcela}
Valor Pago: ${formatCurrencyBR(item.valor_pago)}
Unidade Orçamentária: ${item.unidade_orcamentaria}
Origem Recurso: ${item.origem_recurso}
Elemento: ${item.elemento_despesa?.elemento?.descricao}
`.trim()
    })
    .join('\n\n')

  const blob = new Blob([texto], { type: 'text/plain;charset=utf-8' })
  const link = document.createElement('a')
  link.href = URL.createObjectURL(blob)
  link.download = 'ordem_cronologica.txt'
  link.click()
}
