import { Link } from 'react-router-dom'
import { Dropdown, Space } from 'antd'
import { PlusOutlined, DownOutlined } from '@ant-design/icons'
import '../../../receitas/components/hoverMe/hoverMe.css'

const items = [
  {
    key: '1',
    icon: <PlusOutlined />,
    label: <Link to='/criar-fornecedores'>Cadastrar novo Fornecedor</Link>,
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
