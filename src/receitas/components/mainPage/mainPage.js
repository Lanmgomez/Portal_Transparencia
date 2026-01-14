import { Card } from 'antd'
import useReceitasData from '../hooks/useReceitasData'
import PageTitle from '../../../components/PageTitle/pageTitle'
import ReceitasTable from '../table/columns'
import Filtros from '../filtros/filtros'
import HoverMe from '../hoverMe/hoverMe'
import './mainPage.css'

export default function MainPage() {
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

      <Card className='receita-card'>
        <div className='receita-card-content'>
          <div>Receita Prevista em 2026</div>
          <span>R$ 2.964.088,32</span>
        </div>
      </Card>

      <Filtros onSearch={onSearch} />

      <h3>Informações</h3>
      <ReceitasTable data={mockData} />
    </div>
  )
}
