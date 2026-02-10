import { Input, Select, Form, Button } from 'antd'
import { mouthOption, yearOption } from '../../../components/commons/utils'
import {
  unidadeOrcamentariaOptions,
  elementOptions,
  funcaoOptions,
  subFuncaoOptions,
  naturezaOptions,
} from './options'
import './filtros.css'
import {
  CalendarOutlined,
  BankOutlined,
  NodeIndexOutlined,
  UserSwitchOutlined,
  UsergroupAddOutlined,
  SnippetsOutlined,
} from '@ant-design/icons'

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
        name='unidade_orcamentaria'
        style={{ fontWeight: 'bold' }}
        label='Unidade Orçamentária'
        labelCol={{ style: { width: 180 } }}
        wrapperCol={{ style: { width: 200 } }}
      >
        <Select
          prefix={<BankOutlined />}
          placeholder='Escolha uma opção...'
          style={{ minHeight: 40, width: 200 }}
          options={unidadeOrcamentariaOptions}
        />
      </Form.Item>

      <Form.Item
        name='elemento'
        style={{ fontWeight: 'bold' }}
        label='Elemento'
        wrapperCol={{ style: { width: 300 } }}
      >
        <Select
          prefix={<NodeIndexOutlined />}
          placeholder='Escolha uma opção...'
          style={{ minHeight: 40, width: 300 }}
          options={elementOptions}
        />
      </Form.Item>

      <Form.Item name='funcao' style={{ fontWeight: 'bold' }} label='Função'>
        <Select
          prefix={<UserSwitchOutlined />}
          placeholder='Escolha uma opção...'
          style={{ minHeight: 40 }}
          options={funcaoOptions}
        />
      </Form.Item>

      <Form.Item
        name='sub_funcao'
        style={{ fontWeight: 'bold' }}
        label='Sub-Função'
      >
        <Select
          prefix={<UsergroupAddOutlined />}
          placeholder='Escolha uma opção...'
          style={{ minHeight: 40 }}
          options={subFuncaoOptions}
        />
      </Form.Item>

      <Form.Item
        name='natureza'
        style={{ fontWeight: 'bold' }}
        label='Natureza'
      >
        <Select
          prefix={<SnippetsOutlined />}
          placeholder='Escolha uma opção...'
          style={{ minHeight: 40, width: 200 }}
          options={naturezaOptions}
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
            form.resetFields(['q'])
            setFilters({ q: null })
          }}
        >
          Limpar Filtros
        </Button>
      </div>
    </Form>
  )
}
