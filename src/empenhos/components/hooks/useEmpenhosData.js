import { useQuery } from '@tanstack/react-query'
import { normalizeDoc, useFornecedoresData } from './useFornecedorData'
import {
  empenhos_api,
  HttpRequest,
  formatDateBR,
  maskCNPJ,
  formatCurrencyBR,
  nomeMes,
} from '../../../components/commons/utils'

export default function useEmpenhosData(page, perPage) {
  const { data, isLoading, isError, refetch } = useQuery({
    queryKey: ['empenhos', page, perPage],
    queryFn: () =>
      HttpRequest('GET', `${empenhos_api}?page=${page}&per_page=${perPage}`),
    enabled: true,
    keepPreviousData: true,
  })

  const raw = data?.data?.data || []

  // pega todos os cpfs/cnpjs da página atual
  const cpfCnpjs = raw.map((i) => i.cpf_cnpj_credor)

  // busca fornecedores em paralelo (no topo do hook, sem map chamando hook)
  const { fornecedoresById } = useFornecedoresData(cpfCnpjs)

  const empenhos = raw.map((item) => {
    const doc = normalizeDoc(item.cpf_cnpj_credor)
    const beneficiario = fornecedoresById[doc]

    return {
      ...item,
      mes: nomeMes(item.mes),
      beneficiario,
      cpf_cnpj_credor: maskCNPJ(item.cpf_cnpj_credor),
      data_empenho: formatDateBR(item.data_empenho),
      valor_empenhado: formatCurrencyBR(item.valor_empenhado),
      receita_mensal_prevista: formatCurrencyBR(item.receita_mensal_prevista),
      receita_realizada: formatCurrencyBR(item.receita_realizada),
      receita_acumulada: formatCurrencyBR(item.receita_acumulada),
      acumulada_com_extra_orcamentaria: formatCurrencyBR(
        item.acumulada_com_extra_orcamentaria,
      ),
      receita_extra_orcamentaria: formatCurrencyBR(
        item.receita_extra_orcamentaria,
      ),
    }
  })

  const total = data?.data?.total || 0

  return {
    empenhos,
    total,
    isLoading,
    isError,
    refetch,
  }
}
