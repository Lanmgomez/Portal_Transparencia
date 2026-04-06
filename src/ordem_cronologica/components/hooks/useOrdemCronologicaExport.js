import { useQuery } from '@tanstack/react-query'
import { empenhos_api, HttpRequest } from '../../../components/commons/utils'

export function useOrdemCronologicaExport(filters) {
  const { data } = useQuery({
    queryKey: ['export', filters],
    queryFn: () => {
      const params = new URLSearchParams()
      // api para exportação: /api/empenhos?export=true
      params.set('export', 'true')

      if (filters?.elementos) {
        params.set('elementos', String(filters.elementos))
      }

      if (filters?.ano) {
        params.set('ano', filters.ano)
      }

      if (filters?.data_ini) {
        params.set('data_ini', filters.data_ini)
      }

      if (filters?.data_fim) {
        params.set('data_fim', filters.data_fim)
      }

      const url = `${empenhos_api}?${params.toString()}`
      return HttpRequest('GET', url)
    },
    enabled: true,
    keepPreviousData: true,
  })

  const export_data = data?.data?.dados || []

  return { export_data }
}
