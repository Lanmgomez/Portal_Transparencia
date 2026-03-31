import { useQuery } from '@tanstack/react-query'
import {
  HttpRequest,
  despesas_api,
  nomeMes,
  hideCpf,
  formatDateBR,
  formatCurrencyBR,
} from '../../../components/commons/utils'

export default function useDespesasData({ page, per_page, filters }) {
  const { data, isLoading, isError } = useQuery({
    queryKey: ['despesas', page, per_page, filters],
    queryFn: () => {
      const params = new URLSearchParams({
        page: String(page),
        per_page: String(per_page),
      })

      Object.entries(filters || {}).forEach(([key, value]) => {
        if (value !== null && value !== undefined && value !== '') {
          params.set(key, value)
        }
      })

      return HttpRequest('GET', `${despesas_api}&${params.toString()}`)
    },
  })

  const total = data?.data?.total ?? 0

  const despesas =
    data?.data?.data?.flatMap((item) =>
      (item.pagamentos ?? []).map((pagamento) => ({
        ...item,
        mes: nomeMes(item.mes),
        CPF: hideCpf(item.fornecedor.cpf_cnpj),
        beneficiario: item.fornecedor.nome,
        valor_empenhado: formatCurrencyBR(item.valor_empenhado),
        data_pagamento: formatDateBR(pagamento.data_pagamento),
        valor_pago: formatCurrencyBR(pagamento.valor_pago),
        elemento: item.natureza_despesa_detalhada.elemento.descricao,
      })),
    ) ?? []

  return { despesas, total, isLoading, isError }
}
