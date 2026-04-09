import { useQuery } from '@tanstack/react-query'
import {
  HttpRequest,
  ordem_cronologica_api,
} from '../../../components/commons/utils'

export function useOrdemCronologicaExport(filters) {
  const { data } = useQuery({
    queryKey: ['export', filters],
    queryFn: () => {
      const params = new URLSearchParams()
      // api para exportação: GET /api/empenhos/ordem-cronologica-pagamentos?export=1
      params.set('export', '1')

      if (filters?.elementos) {
        params.set('elementos', String(filters.elementos))
      }

      if (filters?.ano) {
        params.set('ano', filters.ano)
      }

      if (filters?.data_liquidacao_ini) {
        params.set('data_liquidacao_ini', filters.data_liquidacao_ini)
      }

      if (filters?.data_liquidacao_fim) {
        params.set('data_liquidacao_fim', filters.data_liquidacao_fim)
      }

      const url = `${ordem_cronologica_api}?${params.toString()}`
      return HttpRequest('GET', url)
    },
    enabled: true,
    keepPreviousData: true,
  })

  const export_data = data?.data?.data || []

  return { export_data }
}
