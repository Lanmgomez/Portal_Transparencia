import { Input, Select, Form, Button, DatePicker, Dropdown } from 'antd'
import { CalendarOutlined, DownOutlined } from '@ant-design/icons'
import { mouthOption, yearOption } from '../../../components/commons/utils'
import { mask } from 'remask'
import { TXT_Download_Empenhos } from '../downloads/txt-download'
import { WORD_Download_Empenho } from '../downloads/word-download'
import { PDF_Download_Empenho } from '../downloads/pdf-download'
import { Excel_Download_Empenho } from '../downloads/excel-download'
import './filtros.css'

export const FiltersOptions = {
  ano: null,
  mes: null,
  unidade_codigo: null,
  numero_empenho: null,
  cpf_cnpj: null,
  data_ini: null,
  data_fim: null,
  q: null,
}

const resetFilters = [
  'q',
  'ano',
  'mes',
  'unidade_codigo',
  'numero_empenho',
  'cpf_cnpj',
  'data_ini',
  'data_fim',
]

export default function Filtros({ onSearch, setFilters, data }) {
  const [form] = Form.useForm()

  const items = [
    {
      key: '1',
      label: 'Baixar em .CSV',
      onClick: () => Excel_Download_Empenho(data),
    },
    {
      key: '2',
      label: 'Baixar em PDF',
      onClick: () => PDF_Download_Empenho(data),
    },
    {
      key: '3',
      label: 'Baixar em .ODT',
      onClick: () => WORD_Download_Empenho(data),
    },
    {
      key: '4',
      label: 'Baixar em .TXT',
      onClick: () => TXT_Download_Empenhos(data),
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
        name='unidade_codigo'
        style={{ fontWeight: 'bold' }}
        label='Unidade Código'
        labelCol={{ style: { width: 180 } }}
        wrapperCol={{ style: { width: 200 } }}
      >
        <Input style={{ minHeight: 40 }} placeholder='Pesquise algo...' />
      </Form.Item>

      <Form.Item
        name='numero_empenho'
        style={{ fontWeight: 'bold' }}
        label='N° Empenho'
        wrapperCol={{ style: { width: 300 } }}
      >
        <Input style={{ minHeight: 40 }} placeholder='Pesquise algo...' />
      </Form.Item>

      <Form.Item
        name='cpf_cnpj'
        style={{ fontWeight: 'bold' }}
        label='CPF ou CNPJ'
      >
        <Input
          style={{ minHeight: 40 }}
          placeholder='Pesquise...'
          onChange={(e) => {
            const digits = e.target.value.replace(/\D/g, '')

            const masked = mask(
              digits,
              digits.length <= 11 ? '999.999.999-99' : '99.999.999/9999-99',
            )

            form.setFieldValue('cpf_cnpj', masked)
          }}
        />
      </Form.Item>

      <Form.Item
        name='data_ini'
        style={{ fontWeight: 'bold' }}
        label='Data Inicial'
      >
        <DatePicker
          style={{ minHeight: 40 }}
          format='DD/MM/YYYY'
          placeholder='Pesquisar...'
        />
      </Form.Item>

      <Form.Item
        name='data_fim'
        style={{ fontWeight: 'bold' }}
        label='Data Final'
      >
        <DatePicker
          style={{ minHeight: 40 }}
          format='DD/MM/YYYY'
          placeholder='Pesquisar...'
        />
      </Form.Item>

      <Form.Item name='q' style={{ fontWeight: 'bold' }} label='Histórico'>
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
