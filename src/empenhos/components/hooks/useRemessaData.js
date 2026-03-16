import { useQuery } from '@tanstack/react-query'
import {
  HttpRequest,
  formatDateBR,
  nomeMes,
  remessas_api,
} from '../../../components/commons/utils'

export default function useRemessaData(page, perPage) {
  const { data, isLoading, isError, refetch } = useQuery({
    queryKey: ['remessa', page, perPage],
    queryFn: () =>
      HttpRequest('GET', `${remessas_api}?page=${page}&per_page=${perPage}`),
    enabled: true,
    keepPreviousData: true,
  })

  const raw = data?.data || []

  const remessas = raw?.map((item) => {
    return {
      ...item,
      mes: nomeMes(item.mes),
      created_at: formatDateBR(item.created_at),
    }
  })

  const total = data?.data?.total || 0

  return {
    remessas,
    total,
    isLoading,
    isError,
    refetch,
  }
}
