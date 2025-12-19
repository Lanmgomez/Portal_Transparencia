import { LockOutlined, UserOutlined } from '@ant-design/icons'
import { Button, Checkbox, Flex, Form, Input } from 'antd'
import './login.css'

export function LoginPage() {
  const onFinish = (values) => {
    console.log('login', values)
  }
  return (
    <div className='login-container'>
      <div className='login-img' />

      <div className='login-div'>
        <div className='titles'>
          <h1> Bem-vindo</h1>
          <p>Acesso claro e seguro às informações públicas</p>
        </div>

        <div>
          <h2>Faça login</h2>
        </div>

        <Form
          name='login'
          className='login-form'
          layout='vertical'
          initialValues={{ remember: true }}
          onFinish={onFinish}
        >
          <Form.Item
            name='email'
            label='Email'
            className='label-title'
            rules={[{ message: 'Email é obirgatório!', required: true }]}
          >
            <Input
              className='form-input'
              placeholder='Digite seu email...'
              prefix={<UserOutlined className='form-icon' />}
            />
          </Form.Item>

          <Form.Item
            name='password'
            label='Senha'
            className='label-title'
            rules={[{ message: 'Senha é obrigatória!', required: true }]}
          >
            <Input
              type='password'
              className='form-input'
              placeholder='Digite sua senha...'
              prefix={<LockOutlined className='form-icon' />}
            />
          </Form.Item>

          <Form.Item>
            <Flex justify='space-between' align='center'>
              <Form.Item name='remember' valuePropName='checked' noStyle>
                <Checkbox>Lembrar</Checkbox>
              </Form.Item>

              <a href='/forgot-passsword'>Esqueci a senha</a>
            </Flex>
          </Form.Item>

          <Form.Item>
            <Button block type='primary' htmlType='submit' className='btn'>
              Login
            </Button>
            ou <a href='/make-new-account'>Faça uma conta!</a>
          </Form.Item>
        </Form>
      </div>
    </div>
  )
}
