import { useState } from 'react'
import PageTitle from '../../../components/PageTitle/pageTitle'
import Filtros from '../filtros/filtros'
import useEmpenhosData from '../hooks/useEmpenhosData'
import HoverMe from '../hoverMe/hoverMe'
import EmpenhosTable from '../table/columns'
import useSearchQuery from '../hooks/useSearchQuery'

export default function MainPage() {
  const [page, setPage] = useState(1)
  const [perPage, setPerPage] = useState(20)
  const [filters, setFilters] = useState({ q: null })

  const { empenhos, total, isLoading } = useEmpenhosData(page, perPage)
  const { searched, searchLoading } = useSearchQuery(filters)

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

  const onSearch = (values) => {
    if (!values) return

    setFilters({
      q: values.q || null,
    })
    setPage(1) // sempre voltar pra página 1 quando pesquisar
  }

  const renderEmpenhosTable = () => {
    const isSearching = !!filters.q
    const tableData = isSearching ? searched : empenhos
    const tableTotal = isSearching ? searched : total

    return (
      <EmpenhosTable
        data={tableData}
        loading={isLoading || searchLoading}
        page={page}
        perPage={perPage}
        total={tableTotal}
        onChange={handleTableChange}
      />
    )
  }

  const hide = window.location.pathname === '/public-empenhos' ? true : false

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

      {renderEmpenhosTable()}
    </div>
  )
}
