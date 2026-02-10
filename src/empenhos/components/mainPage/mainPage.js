import { useMemo, useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import {
  empenhos_api,
  HttpRequest,
  mapEmpenhos,
} from '../../../components/commons/utils'
import PageTitle from '../../../components/PageTitle/pageTitle'
import Filtros from '../filtros/filtros'
import useEmpenhosData from '../hooks/useEmpenhosData'
import HoverMe from '../hoverMe/hoverMe'
import EmpenhosTable from '../table/columns'

export default function MainPage() {
  const [page, setPage] = useState(1)
  const [perPage, setPerPage] = useState(20)
  const [filters, setFilters] = useState({ q: null })

  const { empenhos, total, isLoading } = useEmpenhosData(page, perPage)

  const handleTableChange = (pagination) => {
    const nextPage = pagination.current
    const nextPerPage = pagination.pageSize

    if (nextPerPage !== perPage) {
      setPerPage(nextPerPage)
      setPage(1)
      return
    }

    setPage(nextPage)
  }

  // search
  const query = useMemo(() => {
    const params = new URLSearchParams()

    if (filters.q) params.set('q', filters.q)

    const q = params.toString()
    return q ? `?${q}` : ''
  }, [filters])

  const { data, isLoading: searchLoading } = useQuery({
    queryKey: ['search_empenho', filters.q],
    queryFn: () => HttpRequest('GET', `${empenhos_api}${query}`),
    enabled: !!filters.q && String(filters.q).trim().length > 0, // ativa só se tiver busca
  })

  const onSearch = (values) => {
    if (!values) return

    setFilters({
      q: values.q || null,
    })
    setPage(1) // sempre voltar pra página 1 quando pesquisar
  }

  const hide = window.location.pathname === '/public-empenhos' ? true : false

  const searchedRaw = data?.data?.data || []
  const searched = useMemo(() => mapEmpenhos(searchedRaw), [searchedRaw])

  const isSearching = !!filters.q

  const tableData = isSearching ? searched : empenhos

  const tableTotal = isSearching ? searched : total

  return (
    <div>
      {!hide && <HoverMe />}
      <PageTitle title='Empenhos' />

      <h4>
        Para acessar mais informações vá até o final da página, existe uma barra
        de rolagem horizontal para mais detalhes sobre cada informação
        pesquisada
      </h4>

      <Filtros onSearch={onSearch} setFilters={setFilters} />

      <h3>Informações</h3>
      <p>Para visualizar melhor as informações, arraste para a direita</p>

      <EmpenhosTable
        data={tableData}
        loading={isLoading || searchLoading}
        page={page}
        perPage={perPage}
        total={tableTotal}
        onChange={handleTableChange}
      />
    </div>
  )
}
