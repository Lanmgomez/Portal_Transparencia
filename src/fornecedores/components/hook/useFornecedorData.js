import { useQuery } from '@tanstack/react-query'
import {
  fornecedores_api,
  HttpRequest,
  formatDateBR,
  hideCpf,
} from '../../../components/commons/utils'

export default function useFornecedoresData(page, perPage) {
  const { data, isLoading, isError, refetch } = useQuery({
    queryKey: ['fornecedores', page, perPage],
    queryFn: () =>
      HttpRequest(
        'GET',
        `${fornecedores_api}?page=${page}&per_page=${perPage}`,
      ),
    enabled: true,
    keepPreviousData: true,
  })

  const raw = data?.data?.data || []

  const fornecedores = raw.map((item) => {
    return {
      ...item,
      cpf_cnpj: hideCpf(item.cpf_cnpj),
      created_at: formatDateBR(item.created_at),
      updated_at: formatDateBR(item.updated_at),
    }
  })

  const total = data?.data?.total || 0

  return {
    fornecedores,
    total,
    isLoading,
    isError,
    refetch,
  }
}
