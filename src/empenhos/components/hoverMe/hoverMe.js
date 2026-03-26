import { Link } from 'react-router-dom'
import { Dropdown, Space } from 'antd'
import {
  PlusOutlined,
  DownOutlined,
  SnippetsOutlined,
  DeleteOutlined,
} from '@ant-design/icons'
import '../../../receitas/components/hoverMe/hoverMe.css'

const items = [
  {
    key: '1',
    icon: <SnippetsOutlined />,
    label: (
      <a target='_blank' rel='noopener noreferrer' href='/public-empenhos'>
        Ir para página pública - Empenhos
      </a>
    ),
  },
  {
    key: '2',
    icon: <SnippetsOutlined />,
    label: (
      <a
        target='_blank'
        rel='noopener noreferrer'
        href='/public-despesas-diarias'
      >
        Ir para página pública - Despesas Diárias
      </a>
    ),
  },
  {
    key: '3',
    icon: <PlusOutlined />,
    label: <Link to='/cadastrar-nova-remessa'>Cadastrar nova Remessa</Link>,
  },
  {
    key: '4',
    icon: <DeleteOutlined />,
    label: <Link to='/excluir-remessa'>Excluir Remessa</Link>,
  },
]

export default function HoverMe() {
  return (
    <div className='fixed-top-right'>
      <Dropdown menu={{ items }}>
        <a onClick={(e) => e.preventDefault()}>
          <Space>
            Ações
            <DownOutlined />
          </Space>
        </a>
      </Dropdown>
    </div>
  )
}
