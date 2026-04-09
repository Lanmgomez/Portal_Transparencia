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
  { header: 'Data Liquidação', key: 'data_liquidacao' },
  { header: 'Data Pagamento', key: 'data_pagamento' },
  { header: 'Beneficiário', key: 'beneficiario' },
  { header: 'Empenho', key: 'numero_empenho' },
  { header: 'Parcela', key: 'parcela' },
  { header: 'Valor Pago', key: 'valor_pago' },
  { header: 'Unidade Orçamentária', key: 'unidade_orcamentaria' },
  { header: 'Origem Recurso', key: 'origem_recurso' },
  { header: 'Elemento', key: 'elemento' },
]

export function formatValue(key, value) {
  if (moneyKeys.has(key)) return formatCurrencyBR(value)
  if (dateKeys.has(key)) return formatDateBR(value)
  return value ?? ''
}

export function normalizeData(data) {
  return data.map((item) => {
    return {
      ...item,
      data_liquidacao: formatDateBR(item.data_liquidacao),
      data_pagamento: formatDateBR(item.data_pagamento),
      valor_pago: formatCurrencyBR(item.valor_pago),
      elemento: item.elemento_despesa?.elemento?.descricao,
    }
  })
}
