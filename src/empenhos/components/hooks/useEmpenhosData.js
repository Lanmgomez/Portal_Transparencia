import { useQuery } from '@tanstack/react-query'
import {
  empenhos_api,
  HttpRequest,
  formatDecimal,
  formatDateBR,
  maskCNPJ,
  formatCurrencyBR,
} from '../../../components/commons/utils'

export default function useEmpenhosData(page, perPage) {
  const { data, isLoading, isError, refetch } = useQuery({
    queryKey: ['empenhos', page, perPage],
    queryFn: () =>
      HttpRequest('GET', `${empenhos_api}?page=${page}&per_page=${perPage}`),
    enabled: true,
    keepPreviousData: true,
  })

  const empenhos = (data?.data?.data || []).map((item) => {
    const [ano, mes] = item.data_empenho.split('-')

    return {
      ...item,
      ano,
      mes,
      cpf_cnpj_credor: maskCNPJ(item.cpf_cnpj_credor),
      data_empenho: formatDateBR(item.data_empenho),
      valor_empenhado: formatCurrencyBR(item.valor_empenhado),
      receita_mensal_prevista: formatCurrencyBR(item.receita_mensal_prevista),
      receita_realizada: formatCurrencyBR(item.receita_realizada),
      receita_acumulada: formatCurrencyBR(item.receita_acumulada),
      acumulada_com_extra_orcamentaria: formatCurrencyBR(
        item.acumulada_com_extra_orcamentaria,
      ),
      receita_extra_orcamentaria: formatCurrencyBR(
        item.receita_extra_orcamentaria,
      ),
    }
  })

  const total = data?.data?.total || 0

  return {
    empenhos,
    total,
    isLoading,
    isError,
    refetch,
  }
}
