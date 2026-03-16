import { Button, Card, Form, Input, Radio } from 'antd'
import { mask } from 'remask'

export default function FornecedorForm({ form, onFinish, loading, saving }) {
  return (
    <>
      <Form form={form} onFinish={onFinish} disabled={loading}>
        <Card title='Dados do fornecedor'>
          <Form.Item
            name='cpf_cnpj'
            label='Cpf ou Cnpj'
            labelCol={{ span: 6 }}
            className='label-3'
            rules={[{ message: 'Campo obrigatório!', required: true }]}
          >
            <Input
              style={{ width: 300, marginLeft: '-120px' }}
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
            name='nome'
            label='Nome'
            labelCol={{ span: 6 }}
            className='label-3'
            rules={[{ message: 'Nome é obirgatório!', required: true }]}
          >
            <Input
              style={{ width: 400, marginLeft: '-120px' }}
              placeholder='Digite o nome...'
            />
          </Form.Item>

          <Form.Item
            name='tipo_pessoa'
            label='Tipo de pessoa'
            labelCol={{ span: 6 }}
            className='label-3'
            rules={[{ message: 'Email é obirgatório!', required: true }]}
          >
            <Radio.Group style={{ marginLeft: '-90px' }}>
              <Radio value='PF'>Pessoa Física - (PF)</Radio>
              <Radio value='PJ'>Pessoa Jurídica - (PJ)</Radio>
            </Radio.Group>
          </Form.Item>
        </Card>

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
            loading={saving || loading}
            disabled={saving}
          >
            Salvar
          </Button>
        </div>
      </Form>
    </>
  )
}
