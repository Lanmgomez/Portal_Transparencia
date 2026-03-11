import { useMemo } from 'react'
import { useQuery } from '@tanstack/react-query'
import {
  empenhos_api,
  HttpRequest,
  mapEmpenhos,
} from '../../../components/commons/utils'

export default function useSearchQuery(filters) {
  const query = useMemo(() => {
    const params = new URLSearchParams()

    Object.entries(filters).forEach(([key, value]) => {
      const dateType = key === 'data_ini' || key === 'data_fim'

      if (!value) return

      if (dateType && typeof value?.format === 'function') {
        params.set(key, value.format('YYYY-MM-DD'))
        return
      }

      params.set(key, value)
    })

    return params.toString()
  }, [filters])

  const { data, isLoading: searchLoading } = useQuery({
    queryKey: ['search_empenho', query],
    queryFn: () => HttpRequest('GET', `${empenhos_api}?${query}`),
    enabled: Object.values(filters).some((v) => v), // ativa se tiver algum filtro
  })

  const searchedRaw = data?.data?.data || []
  const searched = useMemo(() => mapEmpenhos(searchedRaw), [searchedRaw])

  return { searched, searchLoading }
}
