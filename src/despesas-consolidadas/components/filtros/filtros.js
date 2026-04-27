import { Input, Select, Form, Button, DatePicker } from 'antd'
import { mouthOption, yearOption } from '../../../components/commons/utils'
import { CalendarOutlined } from '@ant-design/icons'
import './filtros.css'

const { RangePicker } = DatePicker

export const FiltersOptions = {
  ano: 2026,
  mes: null,
  periodo: null,
  data_ini: null,
  data_fim: null,
}

const resetFilters = ['ano', 'mes', 'periodo', 'data_ini', 'data_fim']

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

      <Form.Item name='periodo' style={{ fontWeight: 'bold' }} label='Período'>
        <RangePicker
          style={{ minHeight: 40 }}
          format='DD/MM/YYYY'
          placeholder={['data inicial', 'data final']}
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
