import { useQuery } from '@tanstack/react-query'
import { useMemo } from 'react'
import {
  empenhos_api,
  HttpRequest,
  mapEmpenhos,
} from '../../../components/commons/utils'

export default function useSearchQuery(filters) {
  const query = useMemo(() => {
    const params = new URLSearchParams()

    // TODO - adicionar mais filtros
    if (filters.q) params.set('q', filters.q)

    const q = params.toString()
    return q ? `?${q}` : ''
  }, [filters])

  const { data, isLoading: searchLoading } = useQuery({
    queryKey: ['search_empenho', filters.q],
    queryFn: () => HttpRequest('GET', `${empenhos_api}${query}`),
    enabled: !!filters.q && String(filters.q).trim().length > 0, // ativa só se tiver busca
  })

  const searchedRaw = data?.data?.data || []
  const searched = useMemo(() => mapEmpenhos(searchedRaw), [searchedRaw])

  return { searched, searchLoading }
}
