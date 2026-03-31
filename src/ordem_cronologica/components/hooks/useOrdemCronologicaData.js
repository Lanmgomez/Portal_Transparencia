import { useQuery } from '@tanstack/react-query'
import {
  empenhos_api,
  formatDateBR,
  formatCurrencyBR,
  HttpRequest,
} from '../../../components/commons/utils'

export default function useOrdemCronologicaData({ filters }) {
  const { data, isLoading, isError, refetch } = useQuery({
    queryKey: ['ordem_cronologica', filters],
    queryFn: () => {
      const params = new URLSearchParams()

      if (
        filters?.elemento_despesa !== null &&
        filters?.elemento_despesa !== undefined &&
        filters?.elemento_despesa !== ''
      ) {
        params.set('elemento_despesa', String(filters.elemento_despesa))
      }

      const url = params.toString()
        ? `${empenhos_api}?${params.toString()}`
        : empenhos_api

      // api/empenhos?elemento_despesa={numero_elemento}
      return HttpRequest('GET', url)
    },
    enabled: true,
    keepPreviousData: true,
  })

  const raw = data?.data?.data ?? []

  const ordem_cronologica = raw.flatMap((item) => {
    const liquidacoes = item.liquidacoes ?? []
    const pagamentos = item.pagamentos ?? []

    const totalLinhas = Math.max(liquidacoes.length, pagamentos.length, 1)

    return Array.from({ length: totalLinhas }, (_, index) => {
      const liquidacao = liquidacoes[index]
      const pagamento = pagamentos[index]

      return {
        key: `${item.id}-${index}`,
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

  const total = raw.length

  return {
    ordem_cronologica,
    total,
    isLoading,
    isError,
    refetch,
  }
}
