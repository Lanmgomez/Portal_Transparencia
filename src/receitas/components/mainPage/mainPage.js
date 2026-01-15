import { Form } from 'antd'
import { ReceitaPrevistaCard } from '../card/card'
import useReceitasData from '../hooks/useReceitasData'
import PageTitle from '../../../components/PageTitle/pageTitle'
import ReceitasTable from '../table/columns'
import Filtros from '../filtros/filtros'
import HoverMe from '../hoverMe/hoverMe'
import './mainPage.css'

export default function MainPage() {
  const [form] = Form.useForm()
  const { mockData } = useReceitasData()

  const onSearch = (value, _e, info) => console.log(info?.source, value)

  const hide =
    window.location.pathname === '/public-receitas-transferencias'
      ? true
      : false

  return (
    <div>
      {!hide && <HoverMe />}

      <PageTitle title='Receitas / Transferências' />

      <ReceitaPrevistaCard hide={hide} />

      <Filtros form={form} onSearch={onSearch} />

      <h3>Informações</h3>
      <ReceitasTable data={mockData} />
    </div>
  )
}
