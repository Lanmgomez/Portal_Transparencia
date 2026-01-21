import { Table, Space, Button, Popconfirm } from 'antd'
import { EditOutlined, DeleteOutlined, BarsOutlined } from '@ant-design/icons'
import { formatCurrencyBR } from '../../../components/commons/utils'
import dayjs from 'dayjs'

const columns = ({ onEdit, onDelete, openModal, setId }) => [
  {
    title: 'Ano',
    dataIndex: 'ano',
    key: 'ano',
    align: 'center',
  },
  {
    title: 'Mês',
    dataIndex: 'mes',
    key: 'mes',
    align: 'center',
  },
  {
    title: 'Unidade Recebedora',
    dataIndex: 'unidade_recebedora',
    key: 'unidade_recebedora',
    align: 'center',
  },
  {
    title: 'Descrição',
    dataIndex: 'descricao',
    key: 'descricao',
    align: 'center',
  },
  {
    title: 'Data Recebimento',
    dataIndex: 'data_recebimento',
    key: 'data_recebimento',
    align: 'center',
    render: (value) => (value ? dayjs(value).format('DD/MM/YYYY') : '-'),
  },
  {
    title: 'Receita Mensal Prevista',
    dataIndex: 'receita_mensal_prevista',
    key: 'receita_mensal_prevista',
    align: 'center',
    render: (value) => (value ? formatCurrencyBR(value) : ''),
  },
  {
    title: 'Receita Extra-Orçamentária',
    dataIndex: 'receita_extra_orcamentaria',
    key: 'receita_extra_orcamentaria',
    align: 'center',
    render: (value) => (value ? formatCurrencyBR(value) : ''),
  },
  {
    title: 'Receita Realizada',
    dataIndex: 'receita_realizada',
    key: 'receita_realizada',
    align: 'center',
    render: (value) => (value ? formatCurrencyBR(value) : ''),
  },
  {
    title: 'Receita Acumulada',
    dataIndex: 'receita_acumulada',
    key: 'receita_acumulada',
    align: 'center',
    render: (value) => (value ? formatCurrencyBR(value) : ''),
  },
  {
    title: 'Acumulado com Extra-Orçamentária',
    dataIndex: 'acumulada_com_extra_orcamentaria',
    key: 'acumulada_com_extra_orcamentaria',
    align: 'center',
    render: (value) => (value ? formatCurrencyBR(value) : ''),
  },
  {
    title: 'Ações',
    dataIndex: 'updated_at',
    key: 'updated_at',
    render: (_, record) => (
      <Space>
        <Button
          icon={<BarsOutlined />}
          onClick={() => {
            setId?.(record.id)
            openModal?.(true)
          }}
        >
          Ver mais
        </Button>

        <Button
          icon={<EditOutlined />}
          onClick={() => onEdit?.(`/editar-receita-transferencia/${record.id}`)}
        >
          Editar
        </Button>

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

export default function ReceitasTable({
  data,
  loading,
  onEdit,
  onDelete,
  openModal,
  setId,
}) {
  return (
    <Table
      dataSource={data}
      columns={columns({ onEdit, onDelete, openModal, setId })}
      loading={loading}
      scroll={{ x: 'max-content' }}
      size='small'
      pagination={{ pageSize: 20 }}
    />
  )
}
