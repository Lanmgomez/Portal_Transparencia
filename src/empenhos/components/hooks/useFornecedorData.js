import { useMemo } from 'react'
import { useQueries } from '@tanstack/react-query'
import { HttpRequest, BASE_URL } from '../../../components/commons/utils'

export const normalizeDoc = (v) => String(v ?? '').replace(/\D/g, '')

export function useFornecedoresData(cpfCnpjs = []) {
  const unique = useMemo(() => {
    const normalized = cpfCnpjs.map(normalizeDoc).filter(Boolean)
    return Array.from(new Set(normalized))
  }, [cpfCnpjs])

  const results = useQueries({
    queries: unique.map((doc) => ({
      queryKey: ['fornecedor', doc],
      queryFn: async () => {
        const resp = await HttpRequest(
          'GET',
          `${BASE_URL}/empenhos/buscarFornecedorTce/${doc}`,
        )

        // ✅ se HttpRequest retorna Axios-like, o payload está em resp.data
        const payload = resp?.data ?? resp

        const nome = payload?.resposta?.conteudo?.[0]?.NOME
        return nome ?? '' //
      },
      enabled: doc.length > 0,
      staleTime: 1000 * 60 * 10,
    })),
  })

  const fornecedoresById = useMemo(() => {
    const map = {}
    unique.forEach((doc, idx) => {
      // ✅ NÃO usa ?? null aqui (deixa undefined enquanto carrega)
      map[doc] = results[idx]?.data
    })
    return map
  }, [unique, results])

  const isLoading = results.some((r) => r.isLoading)
  const isError = results.some((r) => r.isError)

  return { fornecedoresById, results, isLoading, isError }
}
