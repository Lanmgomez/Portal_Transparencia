import { useQuery } from '@tanstack/react-query'
import {
  empenhos_api,
  HttpRequest,
  formatDateBR,
  maskCNPJ,
  formatCurrencyBR,
  nomeMes,
} from '../../../components/commons/utils'

export default function useEmpenhosData(page, perPage) {
  const { data, isLoading, isError, refetch } = useQuery({
    queryKey: ['empenhos', page, perPage],
    queryFn: () =>
      HttpRequest('GET', `${empenhos_api}?page=${page}&per_page=${perPage}`),
    enabled: true,
    keepPreviousData: true,
  })

  const raw = data?.data?.data || []

  const empenhos = raw.map((item) => {
    return {
      ...item,
      mes: nomeMes(item.mes),
      cpf_cnpj_credor: maskCNPJ(item.cpf_cnpj_credor),
      beneficiario: item.fornecedor.nome,
      data_empenho: formatDateBR(item.data_empenho),
      valor_empenhado: formatCurrencyBR(item.valor_empenhado),
      receita_mensal_prevista: formatCurrencyBR(item.receita_mensal_prevista),
      valor_liquidaçao: formatCurrencyBR(
        item.resumo_liquidacao.saldo_a_liquidar,
      ),
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
