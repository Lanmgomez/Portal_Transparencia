import { mouthOption, yearOption } from '../../../components/commons/utils'
import { Button, Card, DatePicker, Form, Input, Select, Space } from 'antd'

export default function ReceitaForm({ form, onFinish, loading }) {
  const formItemLayout = {
    labelCol: { xs: { span: 24 }, sm: { span: 6 } },
    wrapperCol: { xs: { span: 24 }, sm: { span: 18 } },
    labelWrap: true,
  }

  const config = {
    rules: [{ type: 'object', required: true, message: 'Escolha uma data!' }],
  }

  return (
    <Card title='Preencha o formulário abaixo'>
      <Form
        {...formItemLayout}
        form={form}
        onFinish={onFinish}
        disabled={loading}
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
          name='unidadeRecebedora'
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
          name='dataRecebimento'
          label='Data Recebimento'
          style={{ fontWeight: 'bold' }}
          {...config}
        >
          <DatePicker style={{ width: '200px' }} />
        </Form.Item>

        <Form.Item
          name='receitaMensalPrevista'
          label='Receita Mensal Prevista'
          style={{ fontWeight: 'bold' }}
          rules={[{ required: true, message: 'Campo obrigatório!' }]}
        >
          <Space.Compact block>
            <Form.Item name='prefix' noStyle>
              <Select style={{ width: 60 }} defaultValue={'R$'} disabled />
            </Form.Item>

            <Input style={{ width: '200px' }} />
          </Space.Compact>
        </Form.Item>

        <Form.Item
          name='receitaExtraOrcamentaria'
          label='Receita Extra-Orçamentária'
          style={{ fontWeight: 'bold' }}
          rules={[{ required: true, message: 'Campo obrigatório!' }]}
        >
          <Space.Compact block>
            <Form.Item name='prefix' noStyle>
              <Select style={{ width: 60 }} defaultValue={'R$'} disabled />
            </Form.Item>

            <Input style={{ width: '200px' }} />
          </Space.Compact>
        </Form.Item>

        <Form.Item
          name='receitaRealizada'
          label='Receita Realizada'
          style={{ fontWeight: 'bold' }}
          rules={[{ required: true, message: 'Campo obrigatório!' }]}
        >
          <Space.Compact block>
            <Form.Item name='prefix' noStyle>
              <Select style={{ width: 60 }} defaultValue={'R$'} disabled />
            </Form.Item>

            <Input style={{ width: '200px' }} />
          </Space.Compact>
        </Form.Item>

        <Form.Item
          name='receitaAcumulada'
          label='Receita Acumulada'
          style={{ fontWeight: 'bold' }}
          rules={[{ required: true, message: 'Campo obrigatório!' }]}
        >
          <Space.Compact block>
            <Form.Item name='prefix' noStyle>
              <Select style={{ width: 60 }} defaultValue={'R$'} disabled />
            </Form.Item>

            <Input style={{ width: '200px' }} />
          </Space.Compact>
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
            // loading={saving || loading}
            // disabled={saving}
          >
            Salvar
          </Button>
        </div>
      </Form>
    </Card>
  )
}
