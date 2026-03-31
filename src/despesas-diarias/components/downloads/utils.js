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
  { header: 'Beneficiário', key: 'beneficiario' },
  { header: 'CPF', key: 'CPF' },
  { header: 'Histórico', key: 'descricao' },
  { header: 'Valor Empenhado', key: 'valor_empenhado' },
  { header: 'Data Pagamento', key: 'data_pagamento' },
  { header: 'Valor Pago', key: 'valor_pago' },
  { header: 'Elemento', key: 'elemento' },
]

export function formatValue(key, value) {
  if (moneyKeys.has(key)) return formatCurrencyBR(value)
  if (dateKeys.has(key)) return formatDateBR(value)
  return value ?? ''
}
