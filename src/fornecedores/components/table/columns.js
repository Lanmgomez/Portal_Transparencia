import { Button, Table, Space, Popconfirm } from 'antd'
import { DeleteOutlined, EditOutlined } from '@ant-design/icons'

const columns = ({ onEdit, onDelete }) => [
  {
    title: 'Nome',
    dataIndex: 'nome',
    key: 'nome',
    align: 'center',
  },
  {
    title: 'Cpf / CNPJ',
    dataIndex: 'cpf_cnpj',
    key: 'cpf_cnpj',
    align: 'center',
  },
  {
    title: 'Tipo Pessoa',
    dataIndex: 'tipo_pessoa',
    key: 'tipo_pessoa',
    align: 'center',
  },
  {
    title: 'Data Criação',
    dataIndex: 'created_at',
    key: 'created_at',
    align: 'center',
  },
  {
    title: 'Última Atualização',
    dataIndex: 'updated_at',
    key: 'updated_at',
    align: 'center',
  },
  {
    title: 'Ações',
    dataIndex: 'updated_at',
    key: 'updated_at',
    render: (_, record) => (
      <Space>
        <Button
          icon={<EditOutlined />}
          onClick={() => onEdit?.(`/editar-fornecedor/${record.id}`)}
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

export default function FornecedoresTable({
  data,
  loading,
  page,
  perPage,
  total,
  onChange,
  onEdit,
  onDelete,
}) {
  return (
    <Table
      dataSource={data}
      columns={columns({ onEdit, onDelete })}
      loading={loading}
      scroll={{ x: 'max-content', y: 600 }}
      onChange={onChange}
      pagination={{
        current: page,
        pageSize: perPage,
        total,
        showSizeChanger: true,
        pageSizeOptions: ['5', '10', '20', '50'],
        showTotal: (t, range) => `${range[0]}-${range[1]} de ${t}`,
      }}
    />
  )
}
