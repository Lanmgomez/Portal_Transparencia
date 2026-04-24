import { formatCurrencyBR } from '../../../components/commons/utils'

export const moneyKeys = new Set([
  'valor_total_empenhado',
  'valor_total_liquidado',
  'valor_total_pago',
])

export const columns = [
  { header: 'Valor Empenhado', key: 'valor_total_empenhado' },
  { header: 'Valor Liquidado', key: 'valor_total_liquidado' },
  { header: 'Valor Pago', key: 'valor_total_pago' },
]

export function formatValue(key, value) {
  if (moneyKeys.has(key)) return formatCurrencyBR(value)
  return value ?? ''
}

export function normalizeData(data) {
  return data.map((item) => ({
    unidade_orcamentaria: item.unidade_orcamentaria ?? 'Não informado',
    valor_total_empenhado: item.valor_total_empenhado ?? '',
    valor_total_liquidado: item.valor_total_liquidado ?? '',
    valor_total_pago: item.valor_total_pago ?? '',
  }))
}
