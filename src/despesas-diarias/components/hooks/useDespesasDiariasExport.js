import { useQuery } from '@tanstack/react-query'
import { empenhos_api, HttpRequest } from '../../../components/commons/utils'

export function useDespesasDiariasExport(filters) {
  const { data } = useQuery({
    queryKey: ['export-despesas', filters],
    queryFn: () => {
      const params = new URLSearchParams()
      // api para exportação: api/empenhos?somente_diarias=1&export=true
      params.set('somente_diarias', '1')
      params.set('export', 'true')

      if (filters?.ano) {
        params.set('ano', filters.ano)
      }

      if (filters?.mes) {
        params.set('mes', filters.mes)
      }

      if (filters?.beneficiario) {
        params.set('beneficiario', filters.beneficiario)
      }

      if (filters?.q) {
        params.set('q', filters.q)
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
