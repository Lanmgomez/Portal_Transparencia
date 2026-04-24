import { useState } from 'react'
import { Skeleton } from 'antd'
import PageTitle from '../../../components/PageTitle/pageTitle'
import HoverMe from '../../../empenhos/components/hoverMe/hoverMe'
import Filtros, { FiltersOptions } from '../filtros/filtros'
import DashboardCards from '../dashboard-cards/dashboardCards'
import DownloadsButtons from '../downloads/buttons'
import useDespesasConsolidadasData from '../hooks/useDespesasConsilidadasData'

export default function MainPage() {
  const [filters, setFilters] = useState(FiltersOptions)

  const {
    despesas_consolidadas,
    unidade_orcamentaria,
    valor_total_empenhado,
    valor_total_liquidado,
    valor_total_pago,
    saldo_a_liquidar,
    saldo_a_pagar,
    isLoading,
  } = useDespesasConsolidadasData({
    filters,
  })

  const export_data = despesas_consolidadas
    ? [
        {
          unidade_orcamentaria,
          ...despesas_consolidadas,
        },
      ]
    : []

  const onSearch = (values) => {
    if (!values) return
    const [dataInicial, dataFinal] = values.periodo || []

    const newFilters = {
      ...values,
      data_ini: dataInicial ? dataInicial.format('YYYY-MM-DD') : null,
      data_fim: dataFinal ? dataFinal.format('YYYY-MM-DD') : null,
    }
    delete newFilters.periodo

    setFilters((prev) => ({
      ...prev,
      ...newFilters,
    }))
  }

  const hide =
    window.location.pathname === '/public-despesas-consolidadas' ? true : false

  return (
    <div>
      {!hide && <HoverMe />}
      <PageTitle title='Despesas Consolidadas' />

      <Filtros
        onSearch={onSearch}
        setFilters={setFilters}
        // data={despesas}
      />

      <DownloadsButtons filters={filters} export_data={export_data} />

      {isLoading ? (
        <Skeleton />
      ) : (
        <DashboardCards
          despesas_consolidadas={despesas_consolidadas}
          unidade_orcamentaria={unidade_orcamentaria}
          valor_total_empenhado={valor_total_empenhado}
          valor_total_liquidado={valor_total_liquidado}
          valor_total_pago={valor_total_pago}
          saldo_a_liquidar={saldo_a_liquidar}
          saldo_a_pagar={saldo_a_pagar}
          isLoading={isLoading}
        />
      )}
    </div>
  )
}
