import { useNavigate } from 'react-router-dom'
import { Button, Skeleton } from 'antd'
import PageTitle from '../../../components/PageTitle/pageTitle'
import UsuariosTable from '../table/columns'
import useGetUsers from '../../../meuPerfil/hooks/useGetUsers'
import './mainPage.css'

export default function UsuariosPage() {
  const navigate = useNavigate()
  const { users, isLoading, isError } = useGetUsers()

  const renderTable = () => {
    if (isLoading) return <Skeleton />
    if (isError) return <p>Ops! {isError}</p>

    return <UsuariosTable data={users} loading={isLoading} />
  }

  return (
    <div>
      <PageTitle title='Usuários cadastrados' />

      <div className='criar-usuario-btn'>
        <Button
          block
          type='primary'
          htmlType='button'
          className='save-btn'
          onClick={() => navigate('/criar-novo/usuario')}
        >
          Criar Usuário
        </Button>
      </div>

      <h3>Registros</h3>
      {renderTable()}
    </div>
  )
}
