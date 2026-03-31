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
