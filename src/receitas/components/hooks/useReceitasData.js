import { useQuery } from '@tanstack/react-query'
import {
  formatDecimal,
  HttpRequest,
  receita_transp_url,
} from '../../../components/commons/utils'

export default function useReceitasData() {
  const { data, isLoading, isError } = useQuery({
    queryKey: ['users'],
    queryFn: () => HttpRequest('GET', `${receita_transp_url}`),
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

  console.log(receitas)

  return {
    receitas,
    isLoading,
    isError,
  }
}
