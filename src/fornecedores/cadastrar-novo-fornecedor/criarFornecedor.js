import { Form } from 'antd'
import { useMutation } from '@tanstack/react-query'
import Container from '../../components/Container/container'
import FornecedorForm from '../formulario/fornecedorForm'
import {
  ErrorMessage,
  fornecedores_api,
  HttpRequest,
  toast,
} from '../../components/commons/utils'

export default function CriarFornecedor() {
  const [form] = Form.useForm()

  const createFornecedor = useMutation({
    mutationFn: (values) => HttpRequest('POST', fornecedores_api, values),
    onSuccess: () => toast('Fornecedor criado com sucesso!'),
    onError: (error) => ErrorMessage(error),
  })

  const onFinish = (values) => createFornecedor.mutate(values)

  return (
    <Container>
      <h1>Cadastre um novo fornecedor</h1>
      <p>Preencha o formulário abaixo para cadastrar um novo fornecedor</p>

      <FornecedorForm
        form={form}
        saving={createFornecedor.isPending}
        onFinish={onFinish}
      />
    </Container>
  )
}
