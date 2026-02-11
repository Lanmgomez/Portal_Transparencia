import { Button, Table, Space } from 'antd'
import { BarsOutlined } from '@ant-design/icons'

const columns = ({ setId, openModal }) => [
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
    title: 'N° Empenho',
    dataIndex: 'numero_empenho',
    key: 'numero_empenho',
    align: 'center',
  },
  {
    title: 'Beneficiário',
    dataIndex: 'beneficiario',
    key: 'beneficiario',
    align: 'center',
  },
  {
    title: 'CPF/CNPJ',
    dataIndex: 'cpf_cnpj_credor',
    key: 'cpf_cnpj_credor',
    align: 'center',
  },
  {
    title: 'Histórico',
    dataIndex: 'descricao',
    key: 'descricao',
    align: 'center',
    width: 400,
    render: (text) => (
      <div
        style={{
          textAlign: 'justify',
          textJustify: 'inter-word',
          whiteSpace: 'normal',
          wordBreak: 'break-word',
        }}
      >
        {text}
      </div>
    ),
  },
  {
    title: 'Valor Empenhado',
    dataIndex: 'valor_empenhado',
    key: 'valor_empenhado',
    align: 'center',
  },
  {
    title: 'Data/Empenho',
    dataIndex: 'data_empenho',
    key: 'data_empenho',
    align: 'center',
  },
  {
    title: 'Liquidação',
    dataIndex: 'liquidacao',
    key: 'liquidacao',
    align: 'center',
  },
  {
    title: 'Data/Pagamento',
    dataIndex: 'dataPagamento',
    key: 'dataPagamento',
    align: 'center',
  },
  {
    title: 'Valor/Pagamento',
    dataIndex: 'pagamento',
    key: 'pagamento',
    align: 'center',
  },
  {
    title: 'Identificação/Licitação',
    dataIndex: 'licitacao',
    key: 'licitacao',
    align: 'center',
  },
  {
    title: 'Elemento',
    dataIndex: 'elemento',
    key: 'elemento',
    align: 'center',
  },
  {
    title: 'Função',
    dataIndex: 'funcao',
    key: 'funcao',
    align: 'center',
  },
  {
    title: 'Sub-Função',
    dataIndex: 'subFuncao',
    key: 'subFuncao',
    align: 'center',
  },
  {
    title: 'Fonte/Recursos',
    dataIndex: 'fonte_recurso',
    key: 'fonte_recurso',
    align: 'center',
  },
  {
    title: 'Grupo/Natureza',
    dataIndex: 'natureza_despesa',
    key: 'natureza_despesa',
    align: 'center',
  },
  {
    title: 'Categoria Econômica',
    dataIndex: 'categoriaEconomica',
    key: 'categoriaEconomica',
    align: 'center',
  },
  {
    title: 'Unidade Orçamentária',
    dataIndex: 'unidade_codigo',
    key: 'unidade_codigo',
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

export default function EmpenhosTable({
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
      scroll={{ x: 'max-content' }}
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
