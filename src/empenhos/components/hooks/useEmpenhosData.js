import { useQuery } from '@tanstack/react-query'
import {
  empenhos_api,
  HttpRequest,
  formatDecimal,
} from '../../../components/commons/utils'

export default function useEmpenhosData() {
  const { data, isLoading, isError, refetch } = useQuery({
    queryKey: ['empenhos' /*, url*/],
    queryFn: () => HttpRequest('GET', empenhos_api /*url*/),
    enabled: true,
  })

  const empenhos = (data?.data?.data || []).map((item) => ({
    id: item.id,
    remessa_id: item.remessa_id,
    competencia: item.competencia,
    unidade_codigo: item.unidade_codigo,
    numero_empenho: item.numero_empenho,
    empenho_key: item.empenho_key,
    data_empenho: item.data_empenho,
    valor_empenhado: formatDecimal(item.valor_empenhado),
    cpf_cnpj_credor: item.cpf_cnpj_credor,
    descricao: item.descricao,
    natureza_despesa: item.natureza_despesa,
    fonte_recurso: formatDecimal(item.fonte_recurso),
    programa_codigo: item.programa_codigo,
    acao_codigo: item.acao_codigo,
    receita_mensal_prevista: formatDecimal(item.receita_mensal_prevista),
    receita_extra_orcamentaria: formatDecimal(item.receita_extra_orcamentaria),
    receita_realizada: formatDecimal(item.receita_realizada),
    receita_acumulada: formatDecimal(item.receita_acumulada),
    acumulada_com_extra_orcamentaria: formatDecimal(
      item.acumulada_com_extra_orcamentaria,
    ),
    created_at: item.created_at,
    updated_at: item.updated_at,
  }))

  return {
    empenhos,
    isLoading,
    isError,
    refetch,
  }
}
