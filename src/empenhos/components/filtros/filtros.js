import { Input, Select, Form, Button, DatePicker } from 'antd'
import { CalendarOutlined } from '@ant-design/icons'
import { mouthOption, yearOption } from '../../../components/commons/utils'
import { mask } from 'remask'
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

export default function Filtros({ onSearch, setFilters }) {
  const [form] = Form.useForm()

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
          }}
        >
          Limpar Filtros
        </Button>
      </div>
    </Form>
  )
}
