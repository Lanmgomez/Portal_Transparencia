import { Form } from 'antd'
import { useMutation } from '@tanstack/react-query'
import Container from '../../components/Container/container'
import ReceitaForm from '../components/formulario/formulario'
import {
  ErrorMessage,
  HttpRequest,
  toast,
} from '../../components/commons/utils'

export default function CadastrarReceitasPage() {
  const [form] = Form.useForm()

  const createReceita = useMutation({
    mutationFn: (values) => HttpRequest('POST', 'users_url', values),
    onSuccess: () => toast('Receita criada com sucesso!'),
    onError: (error) => ErrorMessage(error),
  })

  const onFinish = (values) => createReceita.mutate(values)

  return (
    <Container>
      <h1>Cadastre uma nova receita ou transferência</h1>

      <ReceitaForm form={form} onFinish={onFinish} />
    </Container>
  )
}
