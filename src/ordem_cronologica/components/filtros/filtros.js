import { Form, Button, Radio, DatePicker, Select } from 'antd'
import dayjs from 'dayjs'
import './filtros.css'

export const CATEGORY_OPTIONS = [
  { label: 'Fornecimento de bens', value: '30,39,14' },
  { label: 'Locações', value: 38 },
  { label: 'Prestação de serviços', value: 37 },
  { label: 'Obras e Edificações', value: 51 },
]

const generateYears = () => {
  const currentYear = new Date().getFullYear()
  return Array.from({ length: 5 }, (_, i) => ({
    label: currentYear - i,
    value: currentYear - i,
  }))
}

/* 
Fornecimento de bens
30 — Material de Consumo
32 — Material, Bem ou Serviço para Distribuição Gratuita
52 — Equipamentos e Material Permanente

Locações
38 — Arrendamento Mercantil

Prestação de serviços
35 — Serviços de Consultoria
36 — Outros Serviços de Terceiros – Pessoa Física
37 — Locação de Mão-de-Obra
39 — Outros Serviços de Terceiros – Pessoa Jurídica
40 — Serviços de Tecnologia da Informação e Comunicação – Pessoa Jurídica

Obras e Edificações
51 — Obras e Instalações
*/

export default function Filtros({ onSearch, setFilters }) {
  const [form] = Form.useForm()

  const handleChange = (e) => {
    const value = e.target.value

    const currentValues = form.getFieldsValue()

    const formatted = {
      ...currentValues,
      elementos: value,
      data_ini: currentValues.data_ini
        ? dayjs(currentValues.data_ini).format('YYYY-MM-DD')
        : null,
      data_fim: currentValues.data_fim
        ? dayjs(currentValues.data_fim).format('YYYY-MM-DD')
        : null,
    }

    form.setFieldsValue({ elemento_despesa: value })

    setFilters(formatted)
    onSearch(formatted)
  }

  const handleFinish = (values) => {
    const formatted = {
      ...values,
      data_ini: values.data_ini
        ? dayjs(values.data_ini).format('YYYY-MM-DD')
        : null,
      data_fim: values.data_fim
        ? dayjs(values.data_fim).format('YYYY-MM-DD')
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

      {/* Data inicial */}
      <Form.Item label='Data Inicial' name='data_ini'>
        <DatePicker format='DD/MM/YYYY' />
      </Form.Item>

      {/* Data final */}
      <Form.Item label='Data Final' name='data_fim'>
        <DatePicker format='DD/MM/YYYY' />
      </Form.Item>

      <Form.Item
        label='Categoria'
        name='elementos'
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
              elementos: null,
              ano: null,
              data_ini: null,
              data_fim: null,
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
