export function TXT_Download_Ordem_Cronologica(data) {
  const texto = data
    .map((item, index) => {
      return `
Registro ${index + 1}
--------------------
Data Liquidação: ${item.data_liquidacao ?? ''}
Data Pagamento: ${item.data_pagamento ?? ''}
Beneficiário: ${item.beneficiario ?? ''}
Empenho: ${item.numero_empenho ?? ''}
Parcela: ${item.numero_parcela ?? ''}
Valor Pago: ${item.valor_pago ?? ''}
Unidade Orçamentária: ${item.unidade_orcamentaria ?? ''}
Origem Recurso: ${item.fonte_recurso_descricao ?? ''}
Elemento: ${item.elemento ?? ''}
`.trim()
    })
    .join('\n\n')

  const blob = new Blob([texto], { type: 'text/plain;charset=utf-8' })
  const link = document.createElement('a')
  link.href = URL.createObjectURL(blob)
  link.download = 'ordem_cronologica.txt'
  link.click()
}
