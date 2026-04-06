import {
  formatCurrencyBR,
  formatDateBR,
} from '../../../components/commons/utils'

export const moneyKeys = new Set([
  'receita_mensal_prevista',
  'receita_extra_orcamentaria',
  'receita_realizada',
  'receita_acumulada',
  'acumulada_com_extra_orcamentaria',
])

export const dateKeys = new Set([
  'data_recebimento',
  'created_at',
  'updated_at',
])

export const columns = [
  { header: 'Ano', key: 'ano' },
  { header: 'Mês', key: 'mes' },
  { header: 'N° Empenho', key: 'numero_empenho' },
  { header: 'Beneficiário', key: 'beneficiario' },
  { header: 'CPF/CNPJ', key: 'cpf_cnpj_credor' },
  { header: 'Histórico', key: 'descricao' },
  { header: 'Valor Empenhado', key: 'valor_empenhado' },
  { header: 'Liquidação', key: 'valor_liquidacao' },
  { header: 'Data/Pagamento', key: 'dataPagamento' },
  { header: 'Valor/Pagamento', key: 'pagamento' },
  { header: 'Licitação', key: 'licitacao' },
  { header: 'Elemento', key: 'elemento' },
  { header: 'Função', key: 'funcao' },
  { header: 'Sub-Função', key: 'subFuncao' },
  { header: 'Fonte/Recursos', key: 'fonte_recurso' },
  { header: 'Grupo/Natureza', key: 'natureza_despesa' },
  { header: 'Categoria Econômica', key: 'categoriaEconomica' },
  { header: 'Unidade Orçamentária', key: 'unidade_orcamentaria' },
]

export function formatValue(key, value) {
  if (moneyKeys.has(key)) return formatCurrencyBR(value)
  if (dateKeys.has(key)) return formatDateBR(value)
  return value ?? ''
}

export function normalizeData(data) {
  return data.map((item) => {
    const pagamento = item.pagamentos?.[0] || {}

    return {
      ano: item.ano,
      mes: item.mes,
      numero_empenho: item.numero_empenho || '',
      beneficiario: item.fornecedor?.nome || '',
      cpf_cnpj_credor: item.fornecedor?.cpf_cnpj || '',
      descricao: item.descricao || '',
      valor_empenhado: formatCurrencyBR(item.valor_empenhado || ''),
      valor_liquidaçao: formatCurrencyBR(
        item.resumo_liquidacao?.total_liquidado || '',
      ),
      dataPagamento: formatDateBR(pagamento.data_pagamento) || '',
      pagamento: formatCurrencyBR(item.valor_empenhado || ''),
      licitacao: item.modalidade_licitacao_descricao || '',
      elemento: item.natureza_despesa_detalhada?.elemento?.descricao || '',
      funcao: item.funcao_descricao || '',
      subFuncao: item.subfuncao_descricao || '',
      fonte_recurso: item.fonte_recurso_descricao || '',
      natureza_despesa: item.natureza_despesa_detalhada?.grupo?.descricao || '',
      categoriaEconomica:
        item.natureza_despesa_detalhada?.categoria?.descricao || '',
      unidade_orcamentaria: item.unidade_orcamentaria?.denominacao || '',
    }
  })
}
