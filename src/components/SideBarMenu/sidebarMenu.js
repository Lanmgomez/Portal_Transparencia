import { useState } from 'react'
import { Button, Menu } from 'antd'
import { useNavigate } from 'react-router-dom'
import { useTheme } from '../theme'
import './sidebarMenu.css'
import {
  UserOutlined,
  MailOutlined,
  SettingOutlined,
  LogoutOutlined,
} from '@ant-design/icons'

const items = [
  {
    key: 'sub1',
    label: 'Página Inicial',
    icon: <MailOutlined />,
    children: [
      { key: '1', label: 'Home', url: '/home' },
      { key: '2', label: 'Option 2' },
      { key: '3', label: 'Option 3' },
      { key: '4', label: 'Option 4' },
    ],
  },
  {
    key: 'sub2',
    label: 'Usuários',
    icon: <UserOutlined />,
    children: [
      { key: '5', label: 'Meu Perfil', url: '/meu-perfil' },
      { key: '6', label: 'Option 6' },
      {
        key: 'sub3',
        label: 'Submenu',
        children: [
          { key: '7', label: 'Option 7' },
          { key: '8', label: 'Option 8' },
        ],
      },
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
    localStorage.removeItem('user_logged')
    navigate('/')
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
