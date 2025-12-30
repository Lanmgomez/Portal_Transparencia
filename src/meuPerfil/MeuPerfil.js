import { Button, Card, Form, Input, message, Select } from 'antd'
import Container from '../components/Container/container'
import './MeuPerfil.css'
import {
  LockOutlined,
  UserOutlined,
  MailOutlined,
  UserSwitchOutlined,
} from '@ant-design/icons'

function MeuPerfilPage() {
  const onFinish = (values) => {
    console.log(values)
  }

  return (
    <Container>
      <h1>Meu Perfil</h1>

      <Form onFinish={onFinish}>
        <Card title='Dados do usuário'>
          <Form.Item
            name='profile'
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
              options={[
                { value: 'administrador', label: 'Administrador' },
                { value: 'usuario', label: 'Usuário' },
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
              className='form-input'
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
              className='form-input'
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
            <Input
              type='password'
              className='form-input'
              placeholder='Digite a nova senha...'
              prefix={<LockOutlined className='form-icon' />}
            />
          </Form.Item>

          <Form.Item
            name='password'
            label='Confirmação'
            labelCol={{ span: 6 }}
            className='label-3'
            rules={[
              { message: 'Confirmar a senha é obrigatório!', required: true },
            ]}
          >
            <Input
              type='password'
              className='form-input'
              placeholder='Confirme a nova senha...'
              prefix={<LockOutlined className='form-icon' />}
            />
          </Form.Item>
        </Card>

        <div className='btns'>
          <Button block type='secondary' htmlType='button' className='save-btn'>
            Voltar
          </Button>

          <Button block type='primary' htmlType='submit' className='save-btn'>
            Salvar
          </Button>
        </div>
      </Form>
    </Container>
  )
}

export default MeuPerfilPage
