import { Input, Select, Form, Button, Dropdown } from 'antd'
import { CalendarOutlined, DownOutlined } from '@ant-design/icons'
import { mouthOption, yearOption } from '../../../components/commons/utils'
import { PDF_Download_Despesas } from '../downloads/pdf-download'
import { Excel_Download_Despesas } from '../downloads/excel-download'
import { ODT_Download_Despesas } from '../downloads/word-download'
import { TXT_Download_Despesas } from '../downloads/txt-download'
import './filtros.css'

export const FiltersOptions = {
  ano: null,
  mes: null,
  beneficiario: null,
  q: null,
}

const resetFilters = ['q', 'ano', 'mes', 'beneficiario']

export default function Filtros({ onSearch, setFilters, setPage, data }) {
  const [form] = Form.useForm()

  const items = [
    {
      key: '1',
      label: 'Baixar em .CSV',
      onClick: () => Excel_Download_Despesas(data),
    },
    {
      key: '2',
      label: 'Baixar em PDF',
      onClick: () => PDF_Download_Despesas(data),
    },
    {
      key: '3',
      label: 'Baixar em .ODT',
      onClick: () => ODT_Download_Despesas(data),
    },
    {
      key: '4',
      label: 'Baixar em .TXT',
      onClick: () => TXT_Download_Despesas(data),
    },
  ]

  return (
    <Form
      form={form}
      onFinish={onSearch}
      layout='vertical'
      style={{
        display: 'flex',
        gap: 20,
        marginTop: 30,
        marginBottom: 50,
        alignItems: 'center',
        flexWrap: 'wrap',
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
        name='beneficiario'
        style={{ fontWeight: 'bold' }}
        label='Beneficiário'
        labelCol={{ style: { width: 180 } }}
        wrapperCol={{ style: { width: 200 } }}
      >
        <Input style={{ minHeight: 40 }} placeholder='Pesquise algo...' />
      </Form.Item>

      <Form.Item name='q' style={{ fontWeight: 'bold' }} label='Texto Livre'>
        <Input
          style={{ minHeight: 40, width: 235 }}
          placeholder='Pesquise algo...'
        />
      </Form.Item>

      <div
        style={{
          display: 'flex',
          gap: 10,
          marginTop: 5,
        }}
      >
        <Button
          type='primary'
          htmlType='submit'
          style={{ width: 120, height: 40 }}
        >
          Pesquisar
        </Button>

        <Button
          htmlType='button'
          style={{ width: 120, height: 40 }}
          onClick={() => {
            form.resetFields(resetFilters)
            setFilters(FiltersOptions)
            setPage(1)
          }}
        >
          Limpar Filtros
        </Button>
      </div>

      <div>
        <Dropdown menu={{ items }}>
          <a onClick={(e) => e.preventDefault()}>
            Downloads <DownOutlined />
          </a>
        </Dropdown>
      </div>
    </Form>
  )
}
