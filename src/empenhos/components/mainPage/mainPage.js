import PageTitle from '../../../components/PageTitle/pageTitle'
import Filtros from '../filtros/filtros'
import useEmpenhosData from '../hooks/useEmpenhosData'
import HoverMe from '../hoverMe/hoverMe'
import EmpenhosTable from '../table/columns'

export default function MainPage() {
  const { empenhos } = useEmpenhosData()

  const onSearch = (value, _e, info) => console.log(info?.source, value)

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

      <Filtros onSearch={onSearch} />

      <h3>Informações</h3>
      <p>Para visualizar melhor as informações, arraste para a direita</p>
      {/** TODO - Fazer paginação */}
      <EmpenhosTable data={empenhos} />
    </div>
  )
}
