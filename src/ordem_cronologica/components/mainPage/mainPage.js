import { useState } from 'react'
import PageTitle from '../../../components/PageTitle/pageTitle'
import HoverMe from '../../../empenhos/components/hoverMe/hoverMe'
import OrdemCronologicaTable from '../table/columns'
import useOrdemCronologicaData from '../hooks/useOrdemCronologicaData'
import Filtros from '../filtros/filtros'
import { Skeleton } from 'antd'

export default function MainPage() {
  const [filters, setFilters] = useState({
    elemento_despesa: null,
  })

  const { ordem_cronologica, isLoading } = useOrdemCronologicaData({
    filters,
  })

  const hide =
    window.location.pathname === '/public-ordem-cronologica' ? true : false

  return (
    <div>
      {!hide && <HoverMe />}
      <PageTitle title='Ordem Cronológica' />

      <Filtros
        onSearch={(values) => {
          setFilters(values)
        }}
        setFilters={setFilters}
        data={ordem_cronologica}
      />

      {isLoading ? (
        <Skeleton />
      ) : (
        <OrdemCronologicaTable data={ordem_cronologica} />
      )}
    </div>
  )
}
