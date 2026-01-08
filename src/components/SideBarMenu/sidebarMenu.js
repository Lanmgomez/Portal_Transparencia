import { useState } from 'react'
import { Button, Menu, message } from 'antd'
import { useNavigate } from 'react-router-dom'
import { useTheme } from '../theme'
import { logout_url } from '../commons/utils'
import axios from 'axios'
import Cookies from 'js-cookie'
import './sidebarMenu.css'
import {
  UserOutlined,
  DollarOutlined,
  MailOutlined,
  SettingOutlined,
  LogoutOutlined,
} from '@ant-design/icons'

const items = [
  {
    key: 'sub1',
    label: 'Página Inicial',
    icon: <MailOutlined />,
    children: [{ key: '1', label: 'Home', url: '/home' }],
  },
  {
    key: 'sub2',
    label: 'Despesas',
    icon: <DollarOutlined />,
    children: [{ key: '2', label: 'Empenhos', url: '/despesas' }],
  },
  {
    key: 'sub3',
    label: 'Usuários',
    icon: <UserOutlined />,
    children: [
      { key: '5', label: 'Meu Perfil', url: '/meu-perfil' },
      { key: '6', label: 'Usuários Cadastrados', url: '/usuarios-cadastrados' },
      // {
      //   key: 'sub3',
      //   label: 'Submenu',
      //   children: [
      //     { key: '7', label: 'Option 7' },
      //     { key: '8', label: 'Option 8' },
      //   ],
      // },
    ],
  },
  {
    key: 'sub4',
    label: 'Configurações',
    icon: <SettingOutlined />,
    children: [{ key: '9', label: 'Aparência e Temas', url: '/configuracoes' }],
  },
]

export default function SideBarMenu() {
  const navigate = useNavigate()
  const [current, setCurrent] = useState('1')

  const { primaryColor } = useTheme()

  const onClick = (e) => {
    setCurrent(e.key)

    const itemClicado = items
      .flatMap((item) => item.children || item)
      .find((child) => child.key === e.key)

    if (itemClicado && itemClicado.url) {
      navigate(itemClicado.url)
    }
    return
  }

  const handleLogout = () => {
    try {
      const token = Cookies.get('token')

      axios.post(
        logout_url,
        {},
        {
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        },
      )

      Cookies.remove('token')
      Cookies.remove('user')
      navigate('/')
    } catch (error) {
      message.error('Ops, algo deu errado', error)
    }
  }

  return (
    <div className='sidebar-menu' style={{ backgroundColor: primaryColor }}>
      <Menu
        onClick={onClick}
        defaultOpenKeys={['sub1']}
        selectedKeys={[current]}
        mode='inline'
        items={items}
      />

      <div style={{ padding: '0 16px 20px 16px' }}>
        <Button
          className='btn-sair'
          onClick={handleLogout}
          icon={<LogoutOutlined />}
        >
          Fazer Log Out / Sair
        </Button>
      </div>
    </div>
  )
}
