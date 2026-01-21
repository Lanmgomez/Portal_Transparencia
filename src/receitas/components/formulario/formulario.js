import { Button, Card, DatePicker, Form, Input, Select } from 'antd'
import { mouthOption, yearOption } from '../../../components/commons/utils'

const formItemLayout = {
  labelCol: { xs: { span: 24 }, sm: { span: 6 } },
  wrapperCol: { xs: { span: 24 }, sm: { span: 18 } },
  labelWrap: true,
  colon: false, // tira os ":" padrão do AntD
}

export default function ReceitaForm({ form, onFinish, saving }) {
  return (
    <Card title='Preencha o formulário abaixo'>
      <Form
        {...formItemLayout}
        form={form}
        onFinish={onFinish}
        disabled={saving}
      >
        <Form.Item
          name='ano'
          label='Ano'
          style={{ fontWeight: 'bold' }}
          rules={[{ message: 'Campo obirgatório!', required: true }]}
        >
          <Select
            style={{ width: '200px' }}
            placeholder='Escolha o ano...'
            options={yearOption}
          />
        </Form.Item>

        <Form.Item
          name='mes'
          label='Mês'
          style={{ fontWeight: 'bold' }}
          rules={[{ message: 'Campo obirgatório!', required: true }]}
        >
          <Select
            style={{ width: '200px' }}
            placeholder='Escolha o mês...'
            options={mouthOption}
          />
        </Form.Item>

        <Form.Item
          name='descricao'
          label='Descrição'
          style={{ fontWeight: 'bold' }}
          rules={[{ message: 'Campo obirgatório!', required: true }]}
        >
          <Input
            style={{ width: '400px' }}
            placeholder='Faça uma descrição...'
          />
        </Form.Item>

        <Form.Item
          name='unidade_recebedora'
          label='Unidade Recebedora'
          style={{ fontWeight: 'bold' }}
          rules={[{ message: 'Campo obirgatório!', required: true }]}
        >
          <Input
            style={{ width: '400px' }}
            placeholder='Ex: Secretaria de Finanças...'
          />
        </Form.Item>

        <Form.Item
          name='data_recebimento'
          label='Data Recebimento'
          style={{ fontWeight: 'bold' }}
          rules={[
            { type: 'object', required: true, message: 'Escolha uma data!' },
          ]}
        >
          <DatePicker format='DD/MM/YYYY' style={{ width: '200px' }} />
        </Form.Item>

        <Form.Item
          name='receita_mensal_prevista'
          label='Receita Mensal Prevista'
          style={{ fontWeight: 'bold' }}
          rules={[{ required: true, message: 'Campo obrigatório!' }]}
        >
          <Input
            type='number'
            style={{ width: '250px' }}
            addonBefore={<Select style={{ width: 60 }} value='R$' disabled />}
          />
        </Form.Item>

        <Form.Item
          name='receita_extra_orcamentaria'
          label='Receita Extra-Orçamentária'
          style={{ fontWeight: 'bold' }}
          rules={[{ required: true, message: 'Campo obrigatório!' }]}
        >
          <Input
            type='number'
            style={{ width: '250px' }}
            addonBefore={<Select style={{ width: 60 }} value='R$' disabled />}
          />
        </Form.Item>

        <Form.Item
          name='receita_realizada'
          label='Receita Realizada'
          style={{ fontWeight: 'bold' }}
          rules={[{ required: true, message: 'Campo obrigatório!' }]}
        >
          <Input
            type='number'
            style={{ width: '250px' }}
            addonBefore={<Select style={{ width: 60 }} value='R$' disabled />}
          />
        </Form.Item>

        <div className='btns'>
          <Button
            block
            type='secondary'
            htmlType='button'
            className='save-btn'
            onClick={() => window.history.back()}
          >
            Voltar
          </Button>

          <Button
            block
            type='primary'
            htmlType='submit'
            className='save-btn'
            loading={saving}
            disabled={saving}
          >
            Salvar
          </Button>
        </div>
      </Form>
    </Card>
  )
}
