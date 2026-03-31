export function TXT_Download_Empenhos(data) {
  const texto = data
    .map((item, index) => {
      return `
Registro ${index + 1}
--------------------
Ano: ${item.ano ?? ''}
Mês: ${item.mes ?? ''}
N° Empenho: ${item.numero_empenho ?? ''}
Beneficiário: ${item.beneficiario ?? ''}
CPF/CNPJ: ${item.cpf_cnpj_credor ?? ''}
Histórico: ${item.descricao ?? ''}
Valor Empenhado: ${item.valor_empenhado ?? ''}
Liquidação: ${item.valor_liquidaçao ?? ''}
Data/Pagamento: ${item.dataPagamento ?? ''}
Valor/Pagamento: ${item.pagamento ?? ''}
Identificação/Licitação: ${item.licitacao ?? ''}
Elemento: ${item.elemento ?? ''}
Função: ${item.funcao ?? ''}
Sub-Função: ${item.subFuncao ?? ''}
Fonte/Recursos: ${item.fonte_recurso ?? ''}
Grupo/Natureza: ${item.natureza_despesa ?? ''}
Categoria Econômica: ${item.categoriaEconomica ?? ''}
Unidade Orçamentária: ${item.unidade_orcamentaria ?? ''}
`.trim()
    })
    .join('\n\n')

  const blob = new Blob([texto], { type: 'text/plain;charset=utf-8' })
  const link = document.createElement('a')
  link.href = URL.createObjectURL(blob)
  link.download = 'relatorio_empenhos.txt'
  link.click()
}
