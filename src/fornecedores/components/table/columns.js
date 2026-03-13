import { Button, Table, Space } from 'antd'
import { BarsOutlined } from '@ant-design/icons'

const columns = ({ setId, openModal }) => [
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
          icon={<BarsOutlined />}
          onClick={() => {
            setId?.(record.id)
            openModal?.(true)
          }}
        >
          Ver mais
        </Button>
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
  setId,
  openModal,
}) {
  return (
    <Table
      dataSource={data}
      columns={columns({ setId, openModal })}
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
