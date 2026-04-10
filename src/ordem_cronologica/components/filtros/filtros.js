import { Form, Button, Radio, DatePicker, Select } from 'antd'
import dayjs from 'dayjs'
import './filtros.css'

const generateYears = () => {
  const currentYear = new Date().getFullYear()
  return Array.from({ length: 5 }, (_, i) => ({
    label: currentYear - i,
    value: currentYear - i,
  }))
}

/* 
CÓDIGOS TABELA INTERNA 04

Fornecimento de bens
52 — Equipamentos e Material Permanente

Locações
36 — Outros Serviços de Terceiros – Pessoa Física
37 — Locação de Mão-de-Obra
38 — Arrendamento Mercantil
39 — Outros Serviços de Terceiros – Pessoa Jurídica

Prestação de serviços
35 — Serviços de Consultoria
36 — Outros Serviços de Terceiros – Pessoa Física
39 — Outros Serviços de Terceiros – Pessoa Jurídica

Obras e Edificações
51 — Obras e Instalações

Consumo
30 — Material de Consumo
*/

export const CATEGORY_OPTIONS = [
  { label: 'Fornecimento de bens', value: '52' },
  { label: 'Locações', value: '36,37,39' },
  { label: 'Prestação de serviços', value: '35,36,39' },
  { label: 'Obras e Edificações', value: '51' },
  { label: 'Consumo', value: '30' },
]

export default function Filtros({ onSearch, setFilters }) {
  const [form] = Form.useForm()

  const handleChange = (e) => {
    const value = e.target.value

    const currentValues = form.getFieldsValue()

    const formatted = {
      ...currentValues,
      elemento_despesa: value,
      data_liquidacao_ini: currentValues.data_liquidacao_ini
        ? dayjs(currentValues.data_liquidacao_ini).format('YYYY-MM-DD')
        : null,
      data_liquidacao_fim: currentValues.data_liquidacao_fim
        ? dayjs(currentValues.data_liquidacao_fim).format('YYYY-MM-DD')
        : null,
    }

    form.setFieldsValue({ elemento_despesa: value })

    setFilters(formatted)
    onSearch(formatted)
  }

  const handleFinish = (values) => {
    const formatted = {
      ...values,
      data_liquidacao_ini: values.data_liquidacao_ini
        ? dayjs(values.data_liquidacao_ini).format('YYYY-MM-DD')
        : null,
      data_liquidacao_fim: values.data_liquidacao_fim
        ? dayjs(values.data_liquidacao_fim).format('YYYY-MM-DD')
        : null,
    }

    setFilters(formatted)
    onSearch(formatted)
  }

  return (
    <Form
      form={form}
      onFinish={handleFinish}
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
      {/* Ano */}
      <Form.Item label='Ano' name='ano'>
        <Select
          placeholder='Ano'
          style={{ width: 120 }}
          options={generateYears()}
          allowClear
        />
      </Form.Item>

      {/* Data liquidação inicial */}
      <Form.Item label='Data Inicial' name='data_liquidacao_ini'>
        <DatePicker format='DD/MM/YYYY' />
      </Form.Item>

      {/* Data final */}
      <Form.Item label='Data Final' name='data_liquidacao_fim'>
        <DatePicker format='DD/MM/YYYY' />
      </Form.Item>

      <Form.Item
        label='Categoria'
        name='elemento_despesa'
        style={{ minWidth: '100%' }}
      >
        <Radio.Group
          options={CATEGORY_OPTIONS}
          optionType='button'
          buttonStyle='solid'
          onChange={handleChange}
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
          style={{ width: 140, height: 40 }}
          onClick={() => {
            form.resetFields()

            const cleared = {
              elemento_despesa: null,
              ano: null,
              data_liquidacao_ini: null,
              data_liquidacao_fim: null,
            }

            setFilters(cleared)
            onSearch(cleared)
          }}
        >
          Limpar Filtros
        </Button>
      </div>
    </Form>
  )
}
