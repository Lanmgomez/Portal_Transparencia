import { Link } from 'react-router-dom'
import { Select, Form, Button, Input, Dropdown } from 'antd'
import { CalendarOutlined, DownOutlined } from '@ant-design/icons'
import { mouthOption, yearOption } from '../../../components/commons/utils'
import { filters_values } from '../mainPage/mainPage'
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

export default function Filtros({ form, onSearch, setFilters, loading }) {
  return (
    <>
      <Form
        form={form}
        onFinish={onSearch}
        layout='vertical'
        style={{
          display: 'flex',
          gap: 20,
          marginTop: 50,
          alignItems: 'center',
        }}
      >
        <Form.Item name='ano' label='Ano' style={{ fontWeight: 'bold' }}>
          <Select
            prefix={<CalendarOutlined />}
            style={{ minHeight: 40, width: 165 }}
            placeholder='Escolher ano...'
            options={yearOption}
          />
        </Form.Item>

        <Form.Item name='mes' label='Mês' style={{ fontWeight: 'bold' }}>
          <Select
            prefix={<CalendarOutlined />}
            style={{ minHeight: 40, width: 165 }}
            placeholder='Escolher mês...'
            options={mouthOption}
          />
        </Form.Item>

        <Form.Item
          name='descricao'
          label='Descrição'
          style={{ fontWeight: 'bold' }}
        >
          <Input style={{ minHeight: 40 }} placeholder='Pesquisar...' />
        </Form.Item>

        <Form.Item
          name='unidade_recebedora'
          label={
            <span style={{ whiteSpace: 'nowrap', overflow: 'visible' }}>
              Uni. Recebedora
            </span>
          }
          style={{ fontWeight: 'bold' }}
        >
          <Input style={{ minHeight: 40 }} placeholder='Pesquisar...' />
        </Form.Item>

        <div
          style={{
            display: 'flex',
            gap: 10,
            justifyContent: 'flex-end',
            marginTop: 5,
          }}
        >
          <Button
            type='primary'
            htmlType='submit'
            style={{ width: 120, height: 40 }}
            disabled={loading}
          >
            Pesquisar
          </Button>

          <Button
            htmlType='button'
            style={{ width: 120, height: 40 }}
            onClick={() => {
              form.resetFields()
              setFilters(filters_values)
            }}
          >
            Limpar Filtros
          </Button>
        </div>
      </Form>

      <div className='download-options'>
        <Dropdown menu={{ items }}>
          <a onClick={(e) => e.preventDefault()}>
            Downloads <DownOutlined />
          </a>
        </Dropdown>
      </div>
    </>
  )
}
