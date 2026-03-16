import { useQuery } from '@tanstack/react-query'
import {
  fornecedores_api,
  HttpRequest,
} from '../../../components/commons/utils'

export default function useFornecedorDataByID({ id }) {
  const { data, isLoading, isError } = useQuery({
    queryKey: ['fornecedor_id', id],
    queryFn: () => HttpRequest('GET', `${fornecedores_api}/${id}`),
  })

  const fornecedor = data?.data

  const cpf_cnpj = fornecedor?.cpf_cnpj
  const nome = fornecedor?.nome
  const tipo_pessoa = fornecedor?.tipo_pessoa

  return {
    cpf_cnpj,
    nome,
    tipo_pessoa,
    isLoading,
    isError,
  }
}
