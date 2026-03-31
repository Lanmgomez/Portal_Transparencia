export function TXT_Download_Despesas(data) {
  const texto = data
    .map((item, index) => {
      return `
Registro ${index + 1}
--------------------
Ano: ${item.ano ?? ''}
Mês: ${item.mes ?? ''}
Beneficiário: ${item.beneficiario ?? ''}
CPF: ${item.cpf_cnpj_credor ?? ''}
Histórico: ${item.descricao ?? ''}
Valor Empenhado: ${item.valor_empenhado ?? ''}
Data/Pagamento: ${item.dataPagamento ?? ''}
Valor/Pagamento: ${item.pagamento ?? ''}
Elemento: ${item.elemento ?? ''}
`.trim()
    })
    .join('\n\n')

  const blob = new Blob([texto], { type: 'text/plain;charset=utf-8' })
  const link = document.createElement('a')
  link.href = URL.createObjectURL(blob)
  link.download = 'despesas_diarias.txt'
  link.click()
}
