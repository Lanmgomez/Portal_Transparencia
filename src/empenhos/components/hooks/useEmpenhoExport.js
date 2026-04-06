import { useQuery } from '@tanstack/react-query'
import { empenhos_api, HttpRequest } from '../../../components/commons/utils'

export function useEmpenhoExport(filters) {
  const { data } = useQuery({
    queryKey: ['export-empenho', filters],
    queryFn: () => {
      const params = new URLSearchParams()
      // api para exportação: api/empenhos?export=true
      params.set('export', 'true')

      if (filters?.ano) {
        params.set('ano', filters.ano)
      }

      if (filters?.mes) {
        params.set('mes', filters.mes)
      }

      if (filters?.unidade_codigo) {
        params.set('unidade_codigo', filters.unidade_codigo)
      }

      if (filters?.numero_empenho) {
        params.set('numero_empenho', filters.numero_empenho)
      }

      if (filters?.cpf_cnpj) {
        params.set('cpf_cnpj', filters.cpf_cnpj)
      }

      if (filters?.data_ini) {
        params.set('data_ini', filters.data_ini)
      }

      if (filters?.data_fim) {
        params.set('data_fim', filters.data_fim)
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
