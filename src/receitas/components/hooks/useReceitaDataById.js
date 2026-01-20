import { useQuery } from '@tanstack/react-query'
import dayjs from 'dayjs'
import {
  HttpRequest,
  receita_transp_url,
  formatCurrencyBR,
  mouthOption,
} from '../../../components/commons/utils'

export default function useReceitaDataById(id) {
  const { data, isLoading, isError } = useQuery({
    queryKey: ['receitas', id],
    queryFn: () => HttpRequest('GET', `${receita_transp_url}/${id}`),
    enabled: true,
  })

  const receita = data?.data?.data

  const mes = mouthOption.find((m) => m.value === receita?.mes)?.label ?? '-'
  const ano = receita?.ano
  const descricao = receita?.descricao
  const unidade_recebedora = receita?.unidade_recebedora
  const data_recebimento = dayjs(receita?.data_recebimento).format('DD/MM/YYYY')
  const receita_acumulada = formatCurrencyBR(receita?.receita_acumulada)
  const receita_realizada = formatCurrencyBR(receita?.receita_realizada)
  const receita_mensal_prevista = formatCurrencyBR(
    receita?.receita_mensal_prevista,
  )
  const receita_extra_orcamentaria = formatCurrencyBR(
    receita?.receita_extra_orcamentaria,
  )
  const acumulada_com_extra_orcamentaria = formatCurrencyBR(
    receita?.acumulada_com_extra_orcamentaria,
  )

  return {
    ano,
    mes,
    descricao,
    data_recebimento,
    receita_acumulada,
    receita_mensal_prevista,
    receita_extra_orcamentaria,
    receita_realizada,
    unidade_recebedora,
    acumulada_com_extra_orcamentaria,
    isLoading,
    isError,
  }
}
