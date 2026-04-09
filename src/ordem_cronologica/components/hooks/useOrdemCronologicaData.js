import { useMemo } from 'react'
import { useInfiniteQuery } from '@tanstack/react-query'
import {
  HttpRequest,
  ordem_cronologica_api,
} from '../../../components/commons/utils'

export default function useOrdemCronologicaData({ filters }) {
  const query = useInfiniteQuery({
    queryKey: ['ordem_cronologica', filters],
    queryFn: async () => {
      const params = new URLSearchParams()

      if (
        filters?.elementos !== null &&
        filters?.elementos !== undefined &&
        filters?.elementos !== ''
      ) {
        params.set('elementos', String(filters.elementos))
      }

      if (filters?.ano) {
        params.set('ano', filters.ano)
      }

      if (filters?.data_liquidacao_ini) {
        params.set('data_liquidacao_ini', filters.data_liquidacao_ini)
      }

      if (filters?.data_liquidacao_fim) {
        params.set('data_liquidacao_fim', filters.data_liquidacao_fim)
      }

      const url = `${ordem_cronologica_api}?${params.toString()}`
      return HttpRequest('GET', url)
    },

    getNextPageParam: (lastPage) => {
      const currentPage = lastPage?.data?.current_page
      const lastPageNumber = lastPage?.data?.last_page

      if (currentPage < lastPageNumber) {
        return currentPage + 1
      }

      return undefined
    },
  })

  const ordem_cronologica = useMemo(() => {
    return (
      query.data?.pages.reduce((acc, page) => {
        return [...acc, ...(page?.data?.data ?? [])]
      }, []) ?? []
    )
  }, [query.data])

  return {
    ordem_cronologica,
    isLoading: query.isLoading,
    isError: query.isError,
    fetchNextPage: query.fetchNextPage,
    hasNextPage: query.hasNextPage,
    isFetchingNextPage: query.isFetchingNextPage,
  }
}
