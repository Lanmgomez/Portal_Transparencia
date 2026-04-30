import { Input, Select, Form, Button, DatePicker } from 'antd'
import { CalendarOutlined } from '@ant-design/icons'
import {
  categoriaEconomica,
  gruposNatureza,
  mouthOption,
  yearOption,
} from '../../../components/commons/utils'
import { mask } from 'remask'
import './filtros.css'
import useEmpenhosData from '../hooks/useEmpenhosData'

export const FiltersOptions = {
  ano: null,
  mes: null,
  unidade_orcamentaria: null,
  numero_empenho: null,
  beneficiario: null,
  cpf_cnpj: null,
  data_ini: null,
  data_fim: null,
  categoria_economica: null,
  grupo_natureza: null,
  q: null,
}

const resetFilters = [
  'q',
  'ano',
  'mes',
  'unidade_orcamentaria',
  'numero_empenho',
  'beneficiario',
  'cpf_cnpj',
  'data_ini',
  'categoria_economica',
  'grupo_natureza',
  'data_fim',
]

export default function Filtros({ onSearch, setFilters }) {
  const [form] = Form.useForm()

  // TODO - refazer com a api quando vinicius montar
  const { empenhos } = useEmpenhosData(1, 20)
  const unidade_orcamentaria_label = empenhos[0]?.unidade_orcamentaria
  const unidade_orcamentaria_codigo = empenhos[0]?.unidade_orcamentaria_codigo

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
        name='unidade_orcamentaria'
        label={
          <span style={{ whiteSpace: 'nowrap', fontWeight: 'bold' }}>
            Uni. Orçamentária
          </span>
        }
        style={{ width: 300 }}
      >
        <Select
          style={{ minHeight: 40, width: '100%' }}
          placeholder='Escolher natureza...'
          // TODO - refazer com a api quando vinicius montar
          options={[
            {
              value: `${unidade_orcamentaria_label}`,
              label: `${unidade_orcamentaria_label}`,
            },
          ]}
        />
      </Form.Item>

      <Form.Item
        name='beneficiario'
        style={{ fontWeight: 'bold' }}
        label='Beneficiário'
      >
        <Input
          style={{ minHeight: 40, width: 235 }}
          placeholder='Pesquisar nome beneficiário...'
        />
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
        name='numero_empenho'
        style={{ fontWeight: 'bold' }}
        label='N° Empenho'
        wrapperCol={{ style: { width: 250 } }}
      >
        <Input style={{ minHeight: 40 }} placeholder='Pesquise algo...' />
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

      <Form.Item
        name='categoria_economica'
        label={
          <span style={{ whiteSpace: 'nowrap', fontWeight: 'bold' }}>
            Cat. Econômica
          </span>
        }
        style={{ width: 200 }}
      >
        <Select
          style={{ minHeight: 40, width: '100%' }}
          placeholder='Escolher categoria...'
          options={categoriaEconomica}
        />
      </Form.Item>

      <Form.Item
        name='grupo_natureza'
        label={
          <span style={{ whiteSpace: 'nowrap', fontWeight: 'bold' }}>
            Grupo/Natureza
          </span>
        }
        style={{ width: 300 }}
      >
        <Select
          style={{ minHeight: 40, width: '100%' }}
          placeholder='Escolher natureza...'
          options={gruposNatureza}
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
    </Form>
  )
}
