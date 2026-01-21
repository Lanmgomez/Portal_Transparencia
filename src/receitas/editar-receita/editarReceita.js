import { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { Form, Skeleton } from 'antd'
import { useMutation } from '@tanstack/react-query'
import Container from '../../components/Container/container'
import ReceitaForm from '../components/formulario/formulario'
import useReceitaDataById from '../components/hooks/useReceitaDataById'
import {
  ErrorMessage,
  HttpRequest,
  mouthOption,
  parseBRMoneyToNumber,
  receita_transp_url,
  toast,
} from '../../components/commons/utils'
import dayjs from 'dayjs'
import customParseFormat from 'dayjs/plugin/customParseFormat'

dayjs.extend(customParseFormat)

export default function EditarReceita() {
  const { id } = useParams()
  const [form] = Form.useForm()

  const {
    ano,
    mes,
    descricao,
    data_recebimento,
    receita_acumulada,
    receita_mensal_prevista,
    receita_extra_orcamentaria,
    receita_realizada,
    unidade_recebedora,
    acumulada_com_extra_orcamentaria,
    isLoading,
    isError,
  } = useReceitaDataById(id)

  const editReceita = useMutation({
    mutationFn: (values) =>
      HttpRequest('PUT', `${receita_transp_url}/${id}`, values),
    onSuccess: () => toast('Receita editada!'),
    onError: (error) => ErrorMessage(error),
  })

  const onFinish = (values) => {
    const data_recebimento = values.data_recebimento?.format('YYYY-MM-DD')
    const mensal_prevista = values.receita_mensal_prevista
    const extra = values.receita_extra_orcamentaria
    const receita_realizada = values.receita_realizada

    const mes = mouthOption.find((m) => m.label === values.mes)?.value ?? '-'

    const data = {
      ...values,
      mes,
      data_recebimento,
      receita_realizada,
      receita_mensal_prevista: mensal_prevista,
      receita_extra_orcamentaria: extra,
    }

    return editReceita.mutate(data)
  }

  useEffect(() => {
    if (id) {
      form.setFieldsValue({
        ano,
        mes,
        descricao,
        data_recebimento: data_recebimento
          ? dayjs(data_recebimento, 'DD/MM/YYYY')
          : null,
        receita_acumulada: parseBRMoneyToNumber(receita_acumulada),
        receita_mensal_prevista: parseBRMoneyToNumber(receita_mensal_prevista),
        receita_extra_orcamentaria: parseBRMoneyToNumber(
          receita_extra_orcamentaria,
        ),
        receita_realizada: parseBRMoneyToNumber(receita_realizada),
        unidade_recebedora,
        acumulada_com_extra_orcamentaria,
      })
    }
  }, [
    form,
    id,
    ano,
    mes,
    descricao,
    data_recebimento,
    receita_acumulada,
    receita_mensal_prevista,
    receita_extra_orcamentaria,
    receita_realizada,
    unidade_recebedora,
    acumulada_com_extra_orcamentaria,
    isLoading,
    isError,
  ])

  return (
    <Container>
      <h1>Edite as Informações da receita ou transferência</h1>

      {isError && <p>Ops! Algo deu errado...</p>}

      {isLoading ? (
        <Skeleton />
      ) : (
        <ReceitaForm
          form={form}
          saving={editReceita.isPending}
          onFinish={onFinish}
        />
      )}
    </Container>
  )
}
