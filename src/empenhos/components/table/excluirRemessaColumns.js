import { Button, Popconfirm, Space, Table, Tag } from 'antd'
import { DeleteOutlined } from '@ant-design/icons'
import { formatYearMonth } from '../../../components/commons/utils'

const columns = ({ setId, onDelete }) => [
  {
    title: 'Ano',
    dataIndex: 'ano',
    key: 'ano',
    width: 80,
  },
  {
    title: 'Mês',
    dataIndex: 'mes',
    key: 'mes',
    width: 120,
  },
  {
    title: 'Competência',
    dataIndex: 'competencia',
    key: 'competencia',
    width: 120,
    render: (competencia) => formatYearMonth(competencia),
  },
  {
    title: 'Status',
    dataIndex: 'status',
    key: 'status',
    render: (status) => {
      const map = {
        imported: { label: 'Importado', color: 'green' },
        error: { label: 'Erro', color: 'red' },
      }

      const item = map[status] || { label: status, color: 'default' }
      return <Tag color={item.color}>{item.label}</Tag>
    },
  },
  {
    title: 'Arquivos Detectados',
    dataIndex: 'arquivos_detectados',
    key: 'arquivos_detectados',
    align: 'center',
  },
  {
    title: 'Data Criação',
    dataIndex: 'created_at',
    key: 'created_at',
  },
  {
    title: 'Ações',
    dataIndex: 'updated_at',
    key: 'updated_at',
    render: (_, record) => (
      <Space>
        <Popconfirm
          title='Tem certeza que deseja excluir?'
          okText='Sim'
          cancelText='Cancelar'
          onConfirm={() => {
            setId?.(record.id)
            onDelete()
          }}
        >
          <Button danger icon={<DeleteOutlined />}>
            Excluir
          </Button>
        </Popconfirm>
      </Space>
    ),
  },
]

export default function ExcluirRemessaTable({
  data,
  loading,
  page,
  perPage,
  total,
  onChange,
  onDelete,
  setId,
}) {
  return (
    <Table
      dataSource={data}
      columns={columns({ setId, onDelete })}
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
