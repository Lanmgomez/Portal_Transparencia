import { useState } from 'react'
import { useMutation } from '@tanstack/react-query'
import { Button, Menu, Modal } from 'antd'
import { useNavigate } from 'react-router-dom'
import { useTheme } from '../theme'
import { logout_url, HttpRequest, ErrorMessage } from '../commons/utils'
import {
  UserOutlined,
  DollarOutlined,
  MailOutlined,
  SettingOutlined,
  LogoutOutlined,
} from '@ant-design/icons'
import Cookies from 'js-cookie'
import './sidebarMenu.css'

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
    label: 'Receitas',
    icon: <DollarOutlined />,
    children: [
      {
        key: '3',
        label: 'Receitas / Transferências',
        url: '/receitas-transferencias',
      },
    ],
  },
  {
    key: 'sub4',
    label: 'Usuários',
    icon: <UserOutlined />,
    children: [
      {
        key: '5',
        label: 'Meu Perfil',
        url: '/meu-perfil',
      },
      {
        key: '6',
        label: 'Usuários Cadastrados',
        url: '/usuarios-cadastrados',
        public: false,
      },
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
    key: 'sub5',
    label: 'Configurações',
    icon: <SettingOutlined />,
    children: [
      {
        key: '9',
        label: 'Aparência e Temas',
        url: '/configuracoes',
      },
    ],
  },
]

export default function SideBarMenu() {
  const navigate = useNavigate()
  const [current, setCurrent] = useState('1')
  const [isModalOpen, setIsModalOpen] = useState(false)

  const { primaryColor } = useTheme()

  const onClick = (e) => {
    setCurrent(e.key)

    const itemClicado = items
      .flatMap((item) => item.children || item)
      .find((child) => child.key === e.key)

    if (itemClicado) return navigate(itemClicado.url)
  }

  const logout = useMutation({
    mutationFn: () => HttpRequest('POST', logout_url, {}),
    onSuccess: () => {
      Cookies.remove('token')
      Cookies.remove('user')
      navigate('/')
      setIsModalOpen(false)
    },
    onError: (error) => ErrorMessage(error),
  })

  const handleLogout = () => logout.mutate()

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
          onClick={() => setIsModalOpen(true)}
          icon={<LogoutOutlined />}
        >
          Fazer Log Out / Sair
        </Button>
      </div>

      <Modal
        title='Tem certeza que deseja sair?'
        open={isModalOpen}
        onOk={handleLogout}
        onCancel={() => setIsModalOpen(false)}
        confirmLoading={logout.isPending}
        cancelText='Cancelar'
        okText='Sair'
      >
        <p>Clique em 'Sair' para fazer logout.</p>
      </Modal>
    </div>
  )
}
