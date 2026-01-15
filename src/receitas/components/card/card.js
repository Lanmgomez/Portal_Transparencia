import { useState } from 'react'
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

  return (
    <div>
      {!hide && (
        <div style={divBtn}>
          <Button
            block
            type='primary'
            htmlType='button'
            style={{ width: 100 }}
            onClick={() => setOpenForm(true)}
          >
            Editar
          </Button>
        </div>
      )}

      {openForm && (
        <Card styles={{ body: { padding: 20 } }} style={cardStyles}>
          <Form layout='vertical' style={{ display: 'flex', gap: 20 }}>
            <Form.Item
              name='titulo'
              label='Título do card'
              style={{ fontWeight: 'bold' }}
            >
              <Input style={{ minHeight: 40, width: 300 }} />
            </Form.Item>

            <Form.Item
              name='valor'
              label='Valor estimado'
              style={{ fontWeight: 'bold' }}
            >
              <Input style={{ minHeight: 40, width: 300 }} />
            </Form.Item>

            <Button
              block
              type='primary'
              htmlType='submit'
              style={{ width: 100, marginTop: 30 }}
              onClick={() => setOpenForm(false)}
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
