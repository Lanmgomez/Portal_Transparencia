import { useQuery } from '@tanstack/react-query'
import {
  empenhos_api,
  HttpRequest,
  formatDecimal,
  formatDateBR,
  maskCNPJ,
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
      valor_empenhado: `R$ ${item.valor_empenhado}`,
      receita_mensal_prevista: `R$ ${item.receita_mensal_prevista}`,
      receita_realizada: formatDecimal(item.receita_realizada),
      receita_acumulada: formatDecimal(item.receita_acumulada),
      acumulada_com_extra_orcamentaria: formatDecimal(
        item.acumulada_com_extra_orcamentaria,
      ),
      receita_extra_orcamentaria: formatDecimal(
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
