import { useState } from 'react'
import { useMutation } from '@tanstack/react-query'
import { ErrorMessage, HttpRequest } from '../../../components/commons/utils.js'
import { ArrowUpOutlined, CalendarOutlined } from '@ant-design/icons'
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
  const [openForm, setOpenForm] = useState(false)
  const [btnMsg, setBtnMsg] = useState('Editar')

  const createTitleReceita = useMutation({
    mutationFn: (values) => HttpRequest('POST', 'url', values),
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
              name='valor'
              label='Valor'
              style={{ fontWeight: 'bold' }}
              rules={[{ message: 'Campo obirgatório!', required: true }]}
            >
              <Input style={{ minHeight: 40, width: 300 }} />
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
                  2026
                </Tag>
                <Text>Receita prevista</Text>
              </Space>

              <Text style={textStyles}>Receita Prevista em 2026</Text>

              <Text>Total consolidado das transferências e receitas</Text>
            </Space>

            <div style={{ textAlign: 'right' }}>
              <Statistic value='2.964.088,32' precision={2} prefix='R$' />

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
