import { Button, Card, Form, Input, Select, Spin } from 'antd'
import {
  LockOutlined,
  UserOutlined,
  MailOutlined,
  UserSwitchOutlined,
} from '@ant-design/icons'

export default function UsuarioForm({ form, onFinish, loading, saving }) {
  return (
    <>
      {loading && (
        <Spin
          spinning={loading}
          style={{
            display: 'block',
            marginTop: '30vh',
            marginLeft: '35%',
            zIndex: 1,
            position: 'fixed',
          }}
        />
      )}

      <Form form={form} onFinish={onFinish} disabled={loading}>
        <Card title='Dados do usuário'>
          <Form.Item
            name='role'
            label='Perfil'
            labelCol={{ span: 6 }}
            className='label-3'
            rules={[
              { message: 'Por favor, selecione um perfil!', required: true },
            ]}
          >
            <Select
              prefix={<UserOutlined className='form-icon' />}
              placeholder='Selecione o perfil...'
              className='form-input'
              style={{ width: 300, marginLeft: '-120px' }}
              options={[
                { value: 'admin', label: 'admin' },
                // { value: 'usuario', label: 'usuario' },
              ]}
            />
          </Form.Item>

          <Form.Item
            name='name'
            label='Nome'
            labelCol={{ span: 6 }}
            className='label-3'
            rules={[{ message: 'Nome é obirgatório!', required: true }]}
          >
            <Input
              style={{ width: 300, marginLeft: '-120px' }}
              placeholder='Digite seu email...'
              prefix={<UserSwitchOutlined className='form-icon' />}
            />
          </Form.Item>

          <Form.Item
            name='email'
            label='Email'
            labelCol={{ span: 6 }}
            className='label-3'
            rules={[{ message: 'Email é obirgatório!', required: true }]}
          >
            <Input
              style={{ width: 300, marginLeft: '-120px' }}
              placeholder='Digite seu email...'
              prefix={<MailOutlined className='form-icon' />}
            />
          </Form.Item>
        </Card>

        <Card
          title='Salvar dados ou Atualizar a senha'
          className='password-card'
        >
          <Form.Item
            name='password'
            label='Senha'
            labelCol={{ span: 6 }}
            className='label-3'
            rules={[{ message: 'Senha é obrigatória!', required: true }]}
          >
            <Input.Password
              type='password'
              style={{ width: 300, marginLeft: '-100px' }}
              placeholder='Digite a nova senha...'
              prefix={<LockOutlined className='form-icon' />}
            />
          </Form.Item>

          <Form.Item
            name='password_confirmation'
            label='Confirmação'
            labelCol={{ span: 6 }}
            className='label-3'
            rules={[
              { message: 'Confirmar a senha é obrigatório!', required: true },
            ]}
          >
            <Input.Password
              type='password'
              style={{ width: 300, marginLeft: '-100px' }}
              placeholder='Confirme a nova senha...'
              prefix={<LockOutlined className='form-icon' />}
            />
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
