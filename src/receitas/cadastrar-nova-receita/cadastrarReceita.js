import { Form } from 'antd'
import { useMutation } from '@tanstack/react-query'
import Container from '../../components/Container/container'
import ReceitaForm from '../components/formulario/formulario'
import {
  ErrorMessage,
  HttpRequest,
  parseBRMoneyToNumber,
  receita_transp_url,
  toast,
} from '../../components/commons/utils'

export default function CadastrarReceitasPage() {
  const [form] = Form.useForm()

  const createReceita = useMutation({
    mutationFn: (values) => HttpRequest('POST', receita_transp_url, values),
    onSuccess: () => toast('Receita criada com sucesso!'),
    onError: (error) => ErrorMessage(error),
  })

  const onFinish = (values) => {
    const data_recebimento = values.data_recebimento?.format('YYYY-MM-DD')
    const mensal_prevista = parseBRMoneyToNumber(values.receita_mensal_prevista)
    const extra = parseBRMoneyToNumber(values.receita_extra_orcamentaria)
    const receita_realizada = parseBRMoneyToNumber(values.receita_realizada)

    const data = {
      ...values,
      data_recebimento,
      receita_realizada,
      receita_mensal_prevista: mensal_prevista,
      receita_extra_orcamentaria: extra,
    }

    return createReceita.mutate(data)
  }

  return (
    <Container>
      <h1>Cadastre uma nova receita ou transferência</h1>

      <ReceitaForm
        form={form}
        saving={createReceita.isPending}
        onFinish={onFinish}
      />
    </Container>
  )
}
