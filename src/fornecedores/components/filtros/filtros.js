import { Input, Select, Form, Button } from 'antd'
import { mask } from 'remask'
import './filtros.css'

export const FiltersOptions = {
  cpf_cnpj: null,
  nome: null,
  tipo_pessoa: null,
  q: null,
}

const resetFilters = ['cpf_cnpj', 'nome', 'tipo_pessoa', 'q']

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
      <Form.Item
        name='cpf_cnpj'
        label='CPF / CNPJ'
        style={{ fontWeight: 'bold' }}
      >
        <Input
          style={{ minHeight: 40 }}
          placeholder='Pesquise algo...'
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

      <Form.Item name='nome' label='Nome' style={{ fontWeight: 'bold' }}>
        <Input style={{ minHeight: 40 }} placeholder='Pesquise algo...' />
      </Form.Item>

      <Form.Item
        name='tipo_pessoa'
        style={{ fontWeight: 'bold' }}
        label='Tipo de Pessoa'
      >
        <Select
          style={{ minHeight: 40, width: 165 }}
          placeholder='Escolher o tipo...'
          options={[
            { value: 'PF', label: 'PF' },
            { value: 'PJ', label: 'PJ' },
          ]}
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
