import { Form } from 'antd'
import { useMutation } from '@tanstack/react-query'
import {
  toast,
  users_url,
  HttpRequest,
  ErrorMessage,
} from '../components/commons/utils'
import Container from '../components/Container/container'
import UsuarioForm from './components/usuarioForm'

export default function CriarUsuario() {
  const [form] = Form.useForm()

  const createUser = useMutation({
    mutationFn: (values) => HttpRequest('POST', users_url, values),
    onSuccess: () => toast('Usuário criado com sucesso!'),
    onError: (error) => ErrorMessage(error),
  })

  const onFinish = (values) => createUser.mutate(values)

  return (
    <Container>
      <h1>Cadastre um novo usuário</h1>
      <p>Preencha o formulário abaixo para cadastrar um novo usuário</p>

      <UsuarioForm form={form} onFinish={onFinish} />
    </Container>
  )
}
