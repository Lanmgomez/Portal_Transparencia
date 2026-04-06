import { formatDateBR } from '../../../components/commons/utils'

export function TXT_Download_Ordem_Cronologica(data) {
  const texto = data
    .map((item, index) => {
      return `
Registro ${index + 1}
--------------------
Data Liquidação: ${formatDateBR(item.liquidacoes?.[0]?.data_liquidacao ?? '')}
Data Pagamento: ${formatDateBR(item.pagamentos?.[0]?.data_pagamento ?? '')}
Beneficiário: ${item.fornecedor?.nome ?? ''}
Empenho: ${item.tipo_empenho_descricao ?? ''}
Parcela: ${item.pagamentos?.[0]?.numero_parcela ?? ''}
Valor Pago: ${item.valor_empenhado ?? ''}
Unidade Orçamentária: ${item.unidade_orcamentaria?.denominacao ?? ''}
Origem Recurso: ${item.fonte_recurso_descricao ?? ''}
Elemento: ${item.natureza_despesa_detalhada?.elemento?.descricao ?? ''}
`.trim()
    })
    .join('\n\n')

  const blob = new Blob([texto], { type: 'text/plain;charset=utf-8' })
  const link = document.createElement('a')
  link.href = URL.createObjectURL(blob)
  link.download = 'ordem_cronologica.txt'
  link.click()
}
