import { useInfiniteQuery } from '@tanstack/react-query'
import {
  empenhos_api,
  formatDateBR,
  formatCurrencyBR,
  HttpRequest,
} from '../../../components/commons/utils'

export default function useOrdemCronologicaData({ filters }) {
  const query = useInfiniteQuery({
    queryKey: ['ordem_cronologica', filters],
    queryFn: async ({ pageParam = 1 }) => {
      const params = new URLSearchParams()

      params.set('page', pageParam)

      if (
        filters?.elementos !== null &&
        filters?.elementos !== undefined &&
        filters?.elementos !== ''
      ) {
        params.set('elementos', String(filters.elementos))
      }

      const url = `${empenhos_api}?${params.toString()}`
      console.log(url)
      return HttpRequest('GET', url)
    },

    getNextPageParam: (lastPage, allPages) => {
      const currentPage = lastPage?.data?.current_page
      const lastPageNumber = lastPage?.data?.last_page

      if (currentPage < lastPageNumber) {
        return currentPage + 1
      }

      return undefined
    },

    keepPreviousData: true,
  })

  // Junta todas as páginas
  const raw = query.data?.pages.flatMap((page) => page?.data?.data ?? []) ?? []

  const ordem_cronologica = raw.flatMap((item) => {
    const liquidacoes = item.liquidacoes ?? []
    const pagamentos = item.pagamentos ?? []

    const totalLinhas = Math.max(liquidacoes.length, pagamentos.length, 1)

    return Array.from({ length: totalLinhas }, (_, index) => {
      const liquidacao = liquidacoes[index]
      const pagamento = pagamentos[index]

      return {
        key: `${item.id}-${index}`,
        ano: liquidacao?.ano,
        data_liquidacao: liquidacao?.data_liquidacao
          ? formatDateBR(liquidacao.data_liquidacao)
          : '-',

        data_pagamento: pagamento?.data_pagamento
          ? formatDateBR(pagamento.data_pagamento)
          : '-',

        beneficiario: item.fornecedor?.nome ?? '-',
        numero_empenho: item.numero_empenho ?? '-',
        numero_parcela: pagamento?.numero_parcela ?? '-',

        valor_pago: pagamento?.valor_pago
          ? formatCurrencyBR(pagamento.valor_pago)
          : formatCurrencyBR(0),

        unidade_orcamentaria: item.unidade_orcamentaria?.denominacao ?? '-',
        fonte_recurso_descricao: item.fonte_recurso_descricao ?? '-',
        elemento: item.natureza_despesa_detalhada?.elemento?.descricao ?? '-',
      }
    })
  })

  return {
    ordem_cronologica,
    isLoading: query.isLoading,
    isError: query.isError,
    fetchNextPage: query.fetchNextPage,
    hasNextPage: query.hasNextPage,
    isFetchingNextPage: query.isFetchingNextPage,
  }
}
