import { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { useMutation } from '@tanstack/react-query'
import { Form } from 'antd'
import {
  ErrorMessage,
  HttpRequest,
  toast,
  users_url,
} from '../components/commons/utils'
import UsuarioForm from '../criarUsuario/components/usuarioForm'
import Container from '../components/Container/container'
import useGetUserById from '../meuPerfil/hooks/useGetUserById'

export default function EditarUsuario() {
  const [form] = Form.useForm()
  const { id } = useParams()
  const { name, email, role, isError } = useGetUserById(id)

  const updateUser = useMutation({
    mutationFn: (values) => HttpRequest('PUT', `${users_url}/${id}`, values),
    onSuccess: () => toast('Dados do usuário salvos com sucesso!'),
    onError: (error) => ErrorMessage(error),
  })

  const onFinish = (values) => updateUser.mutate(values)

  const isDataUser = !!name || !!email || !!role

  useEffect(() => {
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
