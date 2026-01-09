import { useEffect } from 'react'
import { Form } from 'antd'
import { useMutation } from '@tanstack/react-query'
import Container from '../components/Container/container'
import useGetUserById from './hooks/useGetUserById'
import UsuarioForm from '../criarUsuario/components/usuarioForm'
import {
  userLoggedIn,
  users_url,
  toast,
  HttpRequest,
  ErrorMessage,
} from '../components/commons/utils'
import './MeuPerfil.css'

function MeuPerfilPage() {
  const [form] = Form.useForm()
  const id = String(userLoggedIn?.id)
  const { name, email, role, isError } = useGetUserById(id)

  const updateUser = useMutation({
    mutationFn: (values) => HttpRequest('PUT', `${users_url}/${id}`, values),
    onSuccess: () => toast('Dados do usuário salvos com sucesso!'),
    onError: (error) => ErrorMessage(error),
  })

  const onFinish = (values) => updateUser.mutate(values)

  const isDataUser = !!name || !!email || !!role

  useEffect(() => {
    if (!userLoggedIn) return

    form.setFieldsValue({
      name: name ?? '',
      email: email ?? '',
      role: role ?? '',
    })
  }, [form, isDataUser, email, name, role])

  if (isError) return <p>Ops! Algo deu errado...</p>

  return (
    <Container>
      <h1>Meu Perfil</h1>

      <UsuarioForm
        form={form}
        loading={!isDataUser}
        saving={updateUser.isPending}
        onFinish={onFinish}
      />
    </Container>
  )
}

export default MeuPerfilPage
