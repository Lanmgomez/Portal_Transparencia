import { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { Form } from 'antd'
import { useMutation } from '@tanstack/react-query'
import Container from '../../components/Container/container'
import FornecedorForm from '../formulario/fornecedorForm'
import useFornecedorDataByID from '../components/hook/useFornecedorDataByID'
import {
  ErrorMessage,
  fornecedores_api,
  HttpRequest,
  toast,
} from '../../components/commons/utils'

export default function EditarFornecedor() {
  const [form] = Form.useForm()

  const { id } = useParams()

  const { nome, cpf_cnpj, tipo_pessoa, isLoading } = useFornecedorDataByID({
    id,
  })

  const editFornecedor = useMutation({
    mutationFn: (values) =>
      HttpRequest('PATCH', `${fornecedores_api}/${id}`, values),
    onSuccess: () => toast('Fornecedor editado com sucesso!'),
    onError: (error) => ErrorMessage(error),
  })

  const onFinish = (values) => editFornecedor.mutate(values)

  useEffect(() => {
    form.setFieldsValue({
      cpf_cnpj: cpf_cnpj ?? '',
      nome: nome ?? '',
      tipo_pessoa: tipo_pessoa ?? '',
    })
  }, [id, form, cpf_cnpj, nome, tipo_pessoa])

  return (
    <Container>
      <h1>Edite os dados do fornecedor</h1>
      <p>Preencha o formulário abaixo para cadastrar um novo fornecedor</p>

      <FornecedorForm
        form={form}
        onFinish={onFinish}
        loading={isLoading}
        saving={editFornecedor.isPending}
      />
    </Container>
  )
}
