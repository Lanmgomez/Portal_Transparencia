import { useEffect } from 'react'
import { Button, Card, Form, Input, message, Select } from 'antd'
import { useMutation } from '@tanstack/react-query'
import Container from '../components/Container/container'
import useGetUserById from './hooks/useGetUserById'
import Loading from '../components/Loading/loading'
import './MeuPerfil.css'
import {
  userLoggedIn,
  users_url,
  updateData,
  toast,
} from '../components/commons/utils'
import {
  LockOutlined,
  UserOutlined,
  MailOutlined,
  UserSwitchOutlined,
} from '@ant-design/icons'

function MeuPerfilPage() {
  const [form] = Form.useForm()
  const id = String(userLoggedIn?.id)
  const { name, email, role, isLoading, isError } = useGetUserById(id)

  const updateUser = useMutation({
    mutationFn: (values) => updateData(`${users_url}/${id}`, values),
    onSuccess: () => toast('Dados do usuário salvos com sucesso!'),
    onError: (error) => message.error(`Erro ao salvar, ${error}`),
  })

  const onFinish = (values) => {
    if (!values) return

    return updateUser.mutate(values)
  }

  useEffect(() => {
    if (!userLoggedIn) return

    form.setFieldsValue({
      name: name ?? '',
      email: email ?? '',
      role: role ?? '',
    })
  }, [form, email, name, role])

  if (isLoading) return <Loading />
  if (isError) return <p>Ops! Algo deu errado...</p>

  return (
    <Container>
      <h1>Meu Perfil</h1>

      <Form form={form} onFinish={onFinish}>
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
                { value: 'usuario', label: 'usuario' },
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
            <Input
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
            <Input
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

          <Button block type='primary' htmlType='submit' className='save-btn'>
            Salvar
          </Button>
        </div>
      </Form>
    </Container>
  )
}

export default MeuPerfilPage
