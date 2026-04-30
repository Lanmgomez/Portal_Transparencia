import { useQuery } from '@tanstack/react-query'
import {
  empenhos_api,
  HttpRequest,
  formatDateBR,
  hideCpf,
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

  const empenhos = raw.map((item) => {
    return {
      ...item,
      mes: nomeMes(item.mes),
      cpf_cnpj_credor: hideCpf(item.fornecedor.cpf_cnpj),
      beneficiario: item.fornecedor.nome,
      data_empenho: formatDateBR(item.data_empenho),
      valor_empenhado: formatCurrencyBR(item.valor_empenhado),
      pagamento: formatCurrencyBR(item.resumo_pagamento.total_pago),
      dataPagamento: formatDateBR(item.pagamentos[0]?.data_pagamento),
      licitacao: item.modalidade_licitacao_descricao,
      elemento: item.natureza_despesa_detalhada.elemento.descricao,
      funcao: item.funcao_descricao,
      subFuncao: item.subfuncao_descricao,
      fonte_recurso: item.fonte_recurso_descricao,
      natureza_despesa: item.natureza_despesa_detalhada.grupo.descricao,
      categoriaEconomica: item.natureza_despesa_detalhada.categoria.descricao,
      receita_mensal_prevista: formatCurrencyBR(item.receita_mensal_prevista),
      valor_liquidaçao: formatCurrencyBR(
        item.resumo_liquidacao.total_liquidado,
      ),
      receita_realizada: formatCurrencyBR(item.receita_realizada),
      receita_acumulada: formatCurrencyBR(item.receita_acumulada),
      acumulada_com_extra_orcamentaria: formatCurrencyBR(
        item.acumulada_com_extra_orcamentaria,
      ),
      receita_extra_orcamentaria: formatCurrencyBR(
        item.receita_extra_orcamentaria,
      ),
      unidade_orcamentaria: item.unidade_orcamentaria.denominacao,
      unidade_orcamentaria_codigo: item.unidade_orcamentaria.codigo,
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
