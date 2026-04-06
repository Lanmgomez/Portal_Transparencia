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
Ano: ${item.ano ?? ''}
Mês: ${item.mes ?? ''}
Beneficiário: ${item.fornecedor?.nome ?? ''}
CPF: ${item.cpf_cnpj_credor ?? ''}
Histórico: ${item.descricao ?? ''}
Valor Empenhado: ${formatCurrencyBR(item.valor_empenhado ?? '')}
Data/Pagamento: ${formatDateBR(item.pagamentos?.[0]?.data_pagamento ?? '')}
Valor/Pagamento: ${formatCurrencyBR(item.valor_empenhado ?? '')}
Elemento: ${item.natureza_despesa_detalhada?.elemento?.descricao ?? ''}
`.trim()
    })
    .join('\n\n')

  const blob = new Blob([texto], { type: 'text/plain;charset=utf-8' })
  const link = document.createElement('a')
  link.href = URL.createObjectURL(blob)
  link.download = 'despesas_diarias.txt'
  link.click()
}
