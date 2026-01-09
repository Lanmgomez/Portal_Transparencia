import { Table, Space, Button, Tag, Tooltip, Popconfirm } from 'antd'
import { EditOutlined, DeleteOutlined } from '@ant-design/icons'
import dayjs from 'dayjs'

const columns = ({ onEdit, onDelete }) => [
  {
    title: 'Id',
    dataIndex: 'id',
    key: 'id',
    // width: 80,
    align: 'center',
  },
  {
    title: 'Tipo de Acesso',
    dataIndex: 'role',
    key: 'role',
    // width: 160,
    render: (role) => {
      const map = {
        admin: { label: 'Administrador', color: 'gold' },
        usuario: { label: 'Usuário', color: 'blue' },
      }

      const item = map[role] || { label: role, color: 'default' }
      return <Tag color={item.color}>{item.label}</Tag>
    },
  },
  {
    title: 'Nome',
    dataIndex: 'name',
    key: 'name',
    // width: 260,
    ellipsis: true,
  },
  {
    title: 'email',
    dataIndex: 'email',
    key: 'email',
    // width: 280,
    ellipsis: true,
    render: (email) => (
      <Tooltip title={email}>
        <span>{email}</span>
      </Tooltip>
    ),
  },
  {
    title: 'Data Criação',
    dataIndex: 'created_at',
    key: 'created_at',
    // width: 170,
    render: (value) => (value ? dayjs(value).format('DD/MM/YYYY HH:mm') : '-'),
  },
  {
    title: 'Última Atualização',
    dataIndex: 'updated_at',
    key: 'updated_at',
    // width: 190,
    render: (value) => (value ? dayjs(value).format('DD/MM/YYYY HH:mm') : '-'),
  },
  {
    title: 'Ações',
    dataIndex: 'updated_at',
    key: 'updated_at',
    // fixed: 'right',
    // width: 140,
    render: (_, record) => (
      <Space>
        <Button
          icon={<EditOutlined />}
          onClick={() => onEdit?.(`/editar-usuario/${record.id}`)}
        >
          Editar
        </Button>

        <Popconfirm
          title='Tem certeza que deseja excluir?'
          okText='Sim'
          cancelText='Cancelar'
          onConfirm={() => onDelete?.(record.id)}
        >
          <Button danger icon={<DeleteOutlined />}>
            Excluir
          </Button>
        </Popconfirm>
      </Space>
    ),
  },
]

export default function UsuariosTable({ data, loading, onEdit, onDelete }) {
  return (
    <Table
      rowKey='id'
      columns={columns({ onEdit, onDelete })}
      dataSource={data}
      bordered
      loading={loading}
      size='small'
      pagination={{ pageSize: 10, showSizeChanger: true }}
      scroll={{ x: 'max-content' }}
    />
  )
}
