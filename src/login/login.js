import { useNavigate, useLocation, Navigate } from 'react-router-dom'
import { LockOutlined, UserOutlined } from '@ant-design/icons'
import { Button, Checkbox, Flex, Form, Input, message } from 'antd'
import db from '../api/db.json'
import './login.css'

export function LoginPage() {
  const navigate = useNavigate()

  const onFinish = (values) => {
    const { email, password } = values

    const user = db.users.find(
      (u) => u.email === email && u.password === password,
    )

    if (user) {
      localStorage.setItem(
        'user_logged',
        JSON.stringify({
          id: user.id,
          name: user.name,
          isAuth: true,
        }),
      )
      message.success(`Bem-vindo, ${user.name}!`)

      navigate('/home')
    } else {
      message.error('Usuário ou senha inválidos!')
    }
  }

  function RedirectIfAuthenticated() {
    const location = useLocation()
    const isLoggedIn = localStorage.getItem('user_logged')

    if (location.pathname === '/' && isLoggedIn) return <Navigate to='/home' />
  }

  return (
    <div className='login-container'>
      <RedirectIfAuthenticated />

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
