import { useQuery } from '@tanstack/react-query'
import {
  formatDecimal,
  HttpRequest,
  receita_transp_url,
} from '../../../components/commons/utils'

const buildSearchUrl = (baseUrl, params) => {
  const qr_params = new URLSearchParams()

  // só adiciona se tiver valor
  Object.entries(params).forEach(([key, value]) => {
    if (value === undefined || value === null || value === '') return
    qr_params.append(key, String(value))
  })

  const query = qr_params.toString()
  return query ? `${baseUrl}?${query}` : baseUrl
}

export default function useReceitasData(params) {
  const url = buildSearchUrl(receita_transp_url, params)

  const { data, isLoading, isError, refetch } = useQuery({
    queryKey: ['receitas', url],
    queryFn: () => HttpRequest('GET', url),
    enabled: true,
  })

  const receitas = (data?.data?.data || []).map((item) => ({
    id: item.id,
    ano: item.ano,
    mes: item.mes,
    descricao: item.descricao,
    unidade_recebedora: item.unidade_recebedora,
    data_recebimento: item.data_recebimento,
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
    receitas,
    isLoading,
    isError,
    refetch,
  }
}
