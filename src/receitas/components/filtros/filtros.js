import { Link } from 'react-router-dom'
import { Select, Form, Button, Input, Dropdown } from 'antd'
import { CalendarOutlined, DownOutlined } from '@ant-design/icons'
import { mouthOption, yearOption } from '../../../components/commons/utils'
import './filtros.css'
import '../hoverMe/hoverMe.css'

const items = [
  {
    key: '1',
    label: <Link to='#'>Baixar em Excel (.CSV)</Link>,
  },
  {
    key: '2',
    label: <Link to='#'>Baixar em PDF</Link>,
  },
  {
    key: '3',
    label: <Link to='#'>Baixar em Word (.docx)</Link>,
  },
]

export default function Filtros({ form, onFinish, loading }) {
  return (
    <Form
      form={form}
      onFinish={onFinish}
      layout='vertical'
      style={{ display: 'flex', gap: 20, marginTop: 50 }}
    >
      <Form.Item name='ano' label='Ano' style={{ fontWeight: 'bold' }}>
        <Select
          prefix={<CalendarOutlined />}
          style={{ minHeight: 40, width: 165 }}
          placeholder='Escolha o ano...'
          options={yearOption}
        />
      </Form.Item>

      <Form.Item name='mes' label='Mês' style={{ fontWeight: 'bold' }}>
        <Select
          prefix={<CalendarOutlined />}
          style={{ minHeight: 40, width: 165 }}
          placeholder='Escolha o mês...'
          options={mouthOption}
        />
      </Form.Item>

      <Form.Item
        name='textoLivre'
        label='Texto Livre'
        style={{ fontWeight: 'bold' }}
      >
        <Input style={{ minHeight: 40 }} placeholder='Faça uma pesquisa...' />
      </Form.Item>

      <Button
        block
        type='primary'
        htmlType='submit'
        style={{ width: 100, marginTop: 30 }}
        disabled={loading}
      >
        Pesquisar
      </Button>

      <Button
        block
        type='secondary'
        htmlType='button'
        style={{ width: 100, marginTop: 30 }}
        onClick={() => form.resetFields()}
      >
        Limpar Filtros
      </Button>

      <div className='download-options'>
        <Dropdown menu={{ items }}>
          <a onClick={(e) => e.preventDefault()}>
            Downloads <DownOutlined />
          </a>
        </Dropdown>
      </div>
    </Form>
  )
}
