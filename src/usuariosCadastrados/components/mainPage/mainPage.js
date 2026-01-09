import { useNavigate } from 'react-router-dom'
import { useMutation } from '@tanstack/react-query'
import { Button, Skeleton } from 'antd'
import PageTitle from '../../../components/PageTitle/pageTitle'
import UsuariosTable from '../table/columns'
import useGetUsers from '../../../meuPerfil/hooks/useGetUsers'
import {
  ErrorMessage,
  HttpRequest,
  users_url,
} from '../../../components/commons/utils'
import './mainPage.css'

export default function UsuariosPage() {
  const navigate = useNavigate()
  const { users, isLoading, isError } = useGetUsers()

  const deleteUser = useMutation({
    mutationFn: (id) => HttpRequest('DELETE', `${users_url}/${id}`),
    onSuccess: () => window.location.reload(),
    onError: (error) => ErrorMessage(error),
  })

  const renderTable = () => {
    if (isLoading) return <Skeleton />
    if (isError) return <p>Ops! {isError}</p>

    return (
      <UsuariosTable
        data={users}
        loading={isLoading}
        onEdit={navigate}
        onDelete={(id) => deleteUser.mutate(id)}
      />
    )
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
