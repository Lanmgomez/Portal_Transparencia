import { Form, message } from 'antd'
import { useMutation } from '@tanstack/react-query'
import Container from '../../components/Container/container'
import EmpenhosForm from '../components/formulario/formulario'
import {
  ErrorMessage,
  postFormData,
  remessas_api,
  toast,
} from '../../components/commons/utils'

export default function CadastrarRemessa() {
  const [form] = Form.useForm()

  const createEmpenho = useMutation({
    mutationFn: (values) => postFormData(remessas_api, values),
    onSuccess: () => toast('Empenho criado com sucesso!'),
    onError: (err) => ErrorMessage(err),
  })

  const onFinish = async (values) => {
    const fileList = values.arquivo || []
    const fileObj = fileList[0]?.originFileObj

    if (!fileObj) {
      message.error('Selecione um arquivo .zip.')
      return
    }

    const fd = new FormData()
    fd.append('ano', values.ano)
    fd.append('mes', values.mes)
    fd.append('arquivo', fileObj)

    createEmpenho.mutate(fd)
    return
  }

  return (
    <Container>
      <h1>Cadastre uma nova remessa</h1>

      <EmpenhosForm
        form={form}
        onFinish={onFinish}
        disabled={createEmpenho.isPending}
      />
    </Container>
  )
}
