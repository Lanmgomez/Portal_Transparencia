import {
  formatCurrencyBR,
  formatDateBR,
} from '../../../components/commons/utils'

export function TXT_Download_Empenhos(data) {
  const texto = data
    .map((item, index) => {
      return `
Registro ${index + 1}
--------------------
Ano: ${item.ano ?? ''}
Mês: ${item.mes ?? ''}
N° Empenho: ${item.numero_empenho ?? ''}
Beneficiário: ${item.fornecedor?.nome ?? ''}
CPF/CNPJ: ${item.cpf_cnpj_credor ?? ''}
Histórico: ${item.descricao ?? ''}
Valor Empenhado: ${formatCurrencyBR(item.valor_empenhado ?? '')}
Liquidação: ${item.liquidacoes[0]?.valor_liquidado ?? ''}
Data/Pagamento: ${formatDateBR(item.pagamentos?.[0]?.data_pagamento ?? '')}
Valor/Pagamento: ${formatCurrencyBR(item.valor_empenhado ?? '')}
Identificação/Licitação: ${item.modalidade_licitacao_descricao ?? ''}
Elemento: ${item.natureza_despesa_detalhada?.elemento?.descricao ?? ''}
Função: ${item.funcao_descricao ?? ''}
Sub-Função: ${item.subfuncao_descricao ?? ''}
Fonte/Recursos: ${item.fonte_recurso_descricao ?? ''}
Grupo/Natureza: ${item.natureza_despesa_detalhada?.grupo?.descricao ?? ''}
Categoria Econômica: ${item.natureza_despesa_detalhada?.categoria?.descricao ?? ''}
Unidade Orçamentária: ${item.unidade_orcamentaria?.denominacao ?? ''}
`.trim()
    })
    .join('\n\n')

  const blob = new Blob([texto], { type: 'text/plain;charset=utf-8' })
  const link = document.createElement('a')
  link.href = URL.createObjectURL(blob)
  link.download = 'relatorio_empenhos.txt'
  link.click()
}
