import { useState } from 'react'
import { ConfigProvider, Menu } from 'antd'
import { useNavigate } from 'react-router-dom'
import './sidebarMenu.css'
import {
  AppstoreOutlined,
  MailOutlined,
  SettingOutlined,
} from '@ant-design/icons'

const items = [
  {
    key: 'sub1',
    label: 'Navigation One',
    icon: <MailOutlined />,
    children: [
      { key: '1', label: 'Option 1', url: '/home' },
      { key: '2', label: 'Option 2', url: '/configuracoes' },
      { key: '3', label: 'Option 3' },
      { key: '4', label: 'Option 4' },
    ],
  },
  {
    key: 'sub2',
    label: 'Navigation Two',
    icon: <AppstoreOutlined />,
    children: [
      { key: '5', label: 'Option 5' },
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
    label: 'Navigation Three',
    icon: <SettingOutlined />,
    children: [
      { key: '9', label: 'Option 9' },
      { key: '10', label: 'Option 10' },
      { key: '11', label: 'Option 11' },
      { key: '12', label: 'Option 12' },
    ],
  },
]

export default function SideBarMenu() {
  const navigate = useNavigate()
  const [current, setCurrent] = useState('1')

  const onClick = (e) => {
    setCurrent(e.key)

    const itemClicado = items
      .flatMap((item) => item.children || item)
      .find((child) => child.key === e.key)

    if (itemClicado && itemClicado.url) {
      navigate(itemClicado.url)
    }
  }

  return (
    <ConfigProvider
      theme={{
        components: {
          Menu: {
            popupBg: '#fff',
            itemSelectedBg: '#1890ff',
            itemSelectedColor: '#ffffff',
            itemColor: '#fff',
            itemHoverBg: '#1e3a8a',
            itemHoverColor: '#ffffff',
          },
        },
      }}
    >
      <div className='sidebar-menu'>
        <Menu
          onClick={onClick}
          style={{ width: 256, backgroundColor: '#0B285C' }}
          defaultOpenKeys={['sub1']}
          selectedKeys={[current]}
          mode='inline'
          items={items}
        />
      </div>
    </ConfigProvider>
  )
}
