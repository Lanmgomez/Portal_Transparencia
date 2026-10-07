import { useState } from 'react'
import { Skeleton } from 'antd'
import PageTitle from '../../../components/PageTitle/pageTitle'
import HoverMe from '../../../empenhos/components/hoverMe/hoverMe'
import Filtros, { FiltersOptions } from '../filtros/filtros'
import DespesasDiariasTable from '../table/columns'
import useDespesasData from '../hooks/useDespesasData'
import DownloadsButtons from '../downloads/buttons'

export default function MainPage() {
  const [page, setPage] = useState(1)
  const [per_page, setPerPage] = useState(20)
  const [filters, setFilters] = useState(FiltersOptions)

  const { despesas, total, isLoading } = useDespesasData({
    page,
    per_page,
    filters,
  })

  const onSearch = (values) => {
    if (!values) return

    setFilters((prev) => ({
      ...prev,
      ...values,
    }))

    setPage(1)
  }

  const handleTableChange = (pagination) => {
    const nextPage = pagination.current
    const nextPerPage = pagination.pageSize

    if (nextPerPage !== per_page) {
      setPerPage(nextPerPage)
      setPage(1)
      return
    }

    setPage(nextPage)
  }

  const hide =
    window.location.pathname === '/public-despesas-diarias' ? true : false

  return (
    <div>
      {!hide && <HoverMe />}
      <PageTitle title='Despesas Diárias' />

      <Filtros
        onSearch={onSearch}
        setFilters={setFilters}
        setPage={setPage}
        data={despesas}
      />

      <DownloadsButtons filters={filters} />

      <h3>Informações</h3>
      <p>
        Para acessar todas as informações disponíveis, utilize a barra de
        rolagem horizontal localizada na parte inferior da tela de detalhamento
        do empenho. Deslize a barra para os lados para visualizar integralmente
        os dados de cada informação pesquisada.
      </p>

      {isLoading ? (
        <Skeleton />
      ) : (
        <DespesasDiariasTable
          data={despesas}
          total={total}
          page={page}
          per_page={per_page}
          onChange={handleTableChange}
        />
      )}
    </div>
  )
}
