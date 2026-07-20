import { useMemo } from 'react'
import { useQuery } from '@tanstack/react-query'
import {
  empenhos_api,
  buildEmpenhosQuery,
  HttpRequest,
  mapEmpenhos,
} from '../../../components/commons/utils'

export default function useEmpenhosData(filters, page, perPage) {
  const query = useMemo(
    () => buildEmpenhosQuery(filters, page, perPage),
    [filters, page, perPage],
  )

  const { data, isLoading, isError, refetch } = useQuery({
    queryKey: ['empenhos', query],
    queryFn: () => HttpRequest('GET', `${empenhos_api}?${query}`),
    keepPreviousData: true,
  })

  const empenhos = useMemo(() => mapEmpenhos(data?.data?.data || []), [data])

  return {
    empenhos,
    total: data?.data?.total || 0,
    isLoading,
    isError,
    refetch,
  }
}
