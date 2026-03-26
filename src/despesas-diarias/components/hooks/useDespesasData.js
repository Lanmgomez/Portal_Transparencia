import { useQuery } from '@tanstack/react-query'
import { HttpRequest, despesas_api } from '../../../components/commons/utils'

export default function useDespesasData({ page, per_page, filters }) {
  const { data, isLoading, isError } = useQuery({
    queryKey: ['despesas', page, per_page, filters],
    queryFn: () => {
      const params = new URLSearchParams({
        page: String(page),
        per_page: String(per_page),
      })

      Object.entries(filters || {}).forEach(([key, value]) => {
        if (value !== null && value !== undefined && value !== '') {
          params.set(key, value)
        }
      })

      return HttpRequest('GET', `${despesas_api}?${params.toString()}`)
    },
  })

  const despesas = data?.data?.data ?? []
  const total = data?.data?.total ?? 0

  return { despesas, total, isLoading, isError }
}
