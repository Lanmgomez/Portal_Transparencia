import { useQuery } from '@tanstack/react-query'
import {
  HttpRequest,
  despesas_consolidadas_api,
  nomeMes,
  hideCpf,
  formatDateBR,
  formatCurrencyBR,
} from '../../../components/commons/utils'

export default function useDespesasConsolidadasData({ filters }) {
  const { data, isLoading, isError } = useQuery({
    queryKey: ['despesas_consolidadas', filters],
    queryFn: () => {
      const params = new URLSearchParams()

      Object.entries(filters || {}).forEach(([key, value]) => {
        if (value !== null && value !== undefined && value !== '') {
          params.set(key, value)
        }
      })

      return HttpRequest(
        'GET',
        `${despesas_consolidadas_api}?${params.toString()}`,
      )
    },
  })

  const despesas_consolidadas = data?.data?.total_geral
  const unidade_orcamentaria = data?.data?.unidade_orcamentaria

  const valor_total_empenhado = formatCurrencyBR(
    despesas_consolidadas?.valor_total_empenhado,
  )

  const valor_total_liquidado = formatCurrencyBR(
    despesas_consolidadas?.valor_total_liquidado,
  )

  const valor_total_pago = formatCurrencyBR(
    despesas_consolidadas?.valor_total_pago,
  )

  const saldo_a_liquidar = formatCurrencyBR(
    despesas_consolidadas?.saldo_a_liquidar,
  )

  const saldo_a_pagar = formatCurrencyBR(despesas_consolidadas?.saldo_a_pagar)

  return {
    despesas_consolidadas,
    unidade_orcamentaria,
    valor_total_empenhado,
    valor_total_liquidado,
    valor_total_pago,
    saldo_a_liquidar,
    saldo_a_pagar,
    isLoading,
    isError,
  }
}
