import { useQuery } from '@tanstack/react-query'
import {
  HttpRequest,
  formatCurrencyBR,
  receitas_prevista_url,
} from '../../../components/commons/utils'

export default function useCardReceitasData() {
  const { data, isLoading, isError, refetch } = useQuery({
    queryKey: ['receitas-previstas'],
    queryFn: () => HttpRequest('GET', receitas_prevista_url),
    enabled: true,
  })

  const card_info = (data?.data || []).map((item) => ({
    id: item.id,
    ano: item.ano,
    titulo: item.titulo,
    valor_estimado: formatCurrencyBR(item.valor_estimado),
    created_at: item.created_at,
    updated_at: item.updated_at,
  }))

  const id = card_info?.[0]?.id
  const ano = card_info?.[0]?.ano
  const titulo = card_info?.[0]?.titulo
  const valor_estimado = card_info?.[0]?.valor_estimado

  return {
    id,
    ano,
    titulo,
    valor_estimado,
    isLoading,
    isError,
    refetch,
  }
}
