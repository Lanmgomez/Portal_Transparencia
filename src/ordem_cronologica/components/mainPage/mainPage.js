import { useState } from 'react'
import { Skeleton } from 'antd'
import DownloadsButtons from '../downloads/buttons'
import PageTitle from '../../../components/PageTitle/pageTitle'
import HoverMe from '../../../empenhos/components/hoverMe/hoverMe'
import OrdemCronologicaTable from '../table/columns'
import useOrdemCronologicaData from '../hooks/useOrdemCronologicaData'
import Filtros from '../filtros/filtros'

export default function MainPage() {
  const [filters, setFilters] = useState({
    elementos: null,
    ano: null,
    data_ini: null,
    data_fim: null,
  })

  const {
    ordem_cronologica,
    isLoading,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useOrdemCronologicaData({
    filters,
  })

  const hide =
    window.location.pathname === '/public-ordem-cronologica' ? true : false

  return (
    <div>
      {!hide && <HoverMe />}
      <PageTitle title='Ordem Cronológica de Pagamentos' />

      <Filtros
        onSearch={(values) => {
          setFilters(values)
        }}
        setFilters={setFilters}
      />

      <DownloadsButtons filters={filters} />

      {isLoading ? (
        <Skeleton />
      ) : (
        <OrdemCronologicaTable
          data={ordem_cronologica}
          loading={isLoading}
          fetchNextPage={fetchNextPage}
          hasNextPage={hasNextPage}
          isFetchingNextPage={isFetchingNextPage}
        />
      )}
    </div>
  )
}
