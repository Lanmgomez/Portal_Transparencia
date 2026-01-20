import { useState } from 'react'
import { Form, Skeleton } from 'antd'
import { ReceitaPrevistaCard } from '../card/card'
import PageTitle from '../../../components/PageTitle/pageTitle'
import ReceitasTable from '../table/columns'
import Filtros from '../filtros/filtros'
import HoverMe from '../hoverMe/hoverMe'
import useReceitasData from '../hooks/useReceitasData'
import './mainPage.css'

export const filters_values = {
  ano: '',
  mes: '',
  descricao: '',
  unidade_recebedora: '',
  per_page: 10,
}

export default function MainPage() {
  const [form] = Form.useForm()
  const [filters, setFilters] = useState(filters_values)

  const { receitas, refetch, isLoading } = useReceitasData(filters)

  const onSearch = async (values) => {
    if (!values) return

    setFilters({
      ano: values.ano ?? '',
      mes: values.mes ?? '',
      descricao: values.descricao ?? '',
      unidade_recebedora: values.unidade_recebedora ?? '',
      per_page: values.per_page ?? 10,
    })

    await refetch()
  }

  const hide =
    window.location.pathname === '/public-receitas-transferencias'
      ? true
      : false

  return (
    <div>
      {!hide && <HoverMe />}

      <PageTitle title='Receitas / Transferências' />

      <ReceitaPrevistaCard hide={hide} />

      <Filtros form={form} onSearch={onSearch} setFilters={setFilters} />

      <h3>Informações</h3>
      {isLoading ? <Skeleton /> : <ReceitasTable data={receitas} />}
    </div>
  )
}
