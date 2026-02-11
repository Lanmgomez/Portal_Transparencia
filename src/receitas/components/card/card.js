import { useEffect, useState } from 'react'
import { useMutation } from '@tanstack/react-query'
import { ArrowUpOutlined, CalendarOutlined } from '@ant-design/icons'
import useCardReceitasData from '../hooks/useCardReceitasData.js'
import {
  ErrorMessage,
  parseBRMoneyToNumber,
  HttpRequest,
  receitas_prevista_url,
} from '../../../components/commons/utils.js'
import {
  Card,
  Statistic,
  Typography,
  Space,
  Tag,
  Button,
  Form,
  Input,
  message,
} from 'antd'
import {
  cardStyles,
  divBtn,
  divStyles,
  tagStyles,
  textStyles,
} from './styles.js'

const { Text } = Typography

export function ReceitaPrevistaCard({ hide }) {
  const [form] = Form.useForm()
  const [openForm, setOpenForm] = useState(false)
  const [btnMsg, setBtnMsg] = useState('Editar')

  const { id, ano, titulo, valor_estimado } = useCardReceitasData()

  const createTitleReceita = useMutation({
    mutationFn: (values) =>
      HttpRequest('PUT', `${receitas_prevista_url}/${id}`, values),
    onSuccess: () => message.success('Salvo com sucesso!'),
    onError: (err) => ErrorMessage(err),
  })

  const onFinish = (values) => {
    setOpenForm(false)
    return createTitleReceita.mutate(values)
  }

  const ButtonAction = () => {
    if (!openForm) {
      setOpenForm(true)
      setBtnMsg('Cancelar')
    } else {
      setOpenForm(false)
      setBtnMsg('Editar')
    }
  }

  useEffect(() => {
    if (id) {
      form.setFieldsValue({
        ano,
        titulo,
        valor_estimado: parseBRMoneyToNumber(valor_estimado),
      })
    }
  }, [form, id, ano, titulo, valor_estimado])

  return (
    <div>
      {!hide && (
        <div style={divBtn}>
          <Button
            block
            type={!openForm ? 'primary' : 'secondary'}
            htmlType='button'
            style={{ width: 100 }}
            onClick={ButtonAction}
          >
            {btnMsg}
          </Button>
        </div>
      )}

      {openForm && (
        <Card styles={{ body: { padding: 20 } }} style={cardStyles}>
          <Form
            form={form}
            style={{ display: 'flex', gap: 20 }}
            layout='vertical'
            onFinish={onFinish}
          >
            <Form.Item
              name='ano'
              label='Ano'
              style={{ fontWeight: 'bold' }}
              rules={[{ message: 'Campo obirgatório!', required: true }]}
            >
              <Input style={{ minHeight: 40 }} />
            </Form.Item>

            <Form.Item
              name='titulo'
              label='Título'
              style={{ fontWeight: 'bold' }}
              rules={[{ message: 'Campo obirgatório!', required: true }]}
            >
              <Input style={{ minHeight: 40, width: 300 }} />
            </Form.Item>

            <Form.Item
              name='valor_estimado'
              label='Valor'
              style={{ fontWeight: 'bold' }}
              rules={[{ message: 'Campo obirgatório!', required: true }]}
            >
              <Input type='number' style={{ minHeight: 40, width: 300 }} />
            </Form.Item>

            <Button
              block
              type='primary'
              htmlType='submit'
              style={{ width: 100, marginTop: 30 }}
            >
              Salvar
            </Button>
          </Form>
        </Card>
      )}

      {!openForm && (
        <Card styles={{ body: { padding: 20 } }} style={cardStyles}>
          <div style={divStyles}>
            <Space direction='vertical' size={6}>
              <Space size={8} align='center'>
                <Tag icon={<CalendarOutlined />} style={tagStyles}>
                  {ano}
                </Tag>
                <Text>Receita prevista</Text>
              </Space>

              <Text style={textStyles}>{titulo}</Text>

              <Text>Total consolidado das transferências e receitas</Text>
            </Space>

            <div style={{ textAlign: 'right' }}>
              <Statistic value={valor_estimado} precision={2} />

              <Text>
                <ArrowUpOutlined /> atualizado hoje
              </Text>
            </div>
          </div>
        </Card>
      )}
    </div>
  )
}
