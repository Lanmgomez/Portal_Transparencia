export function TXT_Download(data) {
  const texto = data
    .map((item, index) => {
      return `
Registro ${index + 1}
--------------------
Ano: ${item.ano}
Mês: ${item.mes}
Unidade: ${item.unidade_recebedora}
Descrição: ${item.descricao}
Data Recebimento: ${item.data_recebimento}
Receita Mensal Prevista: ${item.receita_mensal_prevista}
Receita Extra-Orçamentária: ${item.receita_extra_orcamentaria}
Receita Realizada: ${item.receita_realizada}
Receita Acumulada: ${item.receita_acumulada}
Acum. c/ Extra: ${item.acumulada_com_extra_orcamentaria}
`.trim()
    })
    .join('\n\n')

  const blob = new Blob([texto], { type: 'text/plain;charset=utf-8' })
  const link = document.createElement('a')
  link.href = URL.createObjectURL(blob)
  link.download = 'relatorio.txt'
  link.click()
}
