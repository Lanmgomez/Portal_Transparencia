import { useQuery } from '@tanstack/react-query'
import {
  formatDateBR,
  fornecedores_api,
  hideCpf,
  HttpRequest,
} from '../../../components/commons/utils'

export default function useSearchQuery(filters, page, perPage) {
  const params = new URLSearchParams()

  Object.entries(filters).forEach(([key, value]) => {
    if (!value) return
    params.set(key, value)
  })

  const query = params.toString()

  const { data, isLoading: searchLoading } = useQuery({
    queryKey: ['search_fornecedor', query, page, perPage],
    queryFn: () =>
      HttpRequest(
        'GET',
        `${fornecedores_api}?${query}&page=${page}&per_page=${perPage}`,
      ),
    enabled: Object.values(filters).some((v) => v),
  })

  const searchedRaw = data?.data?.data || []

  const searched = searchedRaw?.map((item) => {
    return {
      ...item,
      cpf_cnpj: hideCpf(item.cpf_cnpj),
      created_at: formatDateBR(item.created_at),
      updated_at: formatDateBR(item.updated_at),
    }
  })

  const searchedTotal = data?.data?.total || 0

  return { searched, searchLoading, searchedTotal }
}
