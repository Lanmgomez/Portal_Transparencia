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
  { header: 'Unidade', key: 'unidade_recebedora' },
  { header: 'Descrição', key: 'descricao' },
  { header: 'Data Recebimento', key: 'data_recebimento' },
  { header: 'Receita Mensal Prevista', key: 'receita_mensal_prevista' },
  { header: 'Receita Extra-Orçamentária', key: 'receita_extra_orcamentaria' },
  { header: 'Receita Realizada', key: 'receita_realizada' },
  { header: 'Receita Acumulada', key: 'receita_acumulada' },
  { header: 'Acum. c/ Extra', key: 'acumulada_com_extra_orcamentaria' },
]

export function formatValue(key, value) {
  if (moneyKeys.has(key)) return formatCurrencyBR(value)
  if (dateKeys.has(key)) return formatDateBR(value)
  return value ?? ''
}
