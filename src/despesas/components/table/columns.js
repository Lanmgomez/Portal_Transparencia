import { Table } from 'antd'

const columns = [
  {
    title: 'Ano',
    dataIndex: 'ano',
    key: 'ano',
  },
  {
    title: 'Mês',
    dataIndex: 'mes',
    key: 'mes',
  },
  {
    title: 'N° Empenho',
    dataIndex: 'empenho',
    key: 'emprenho',
  },
  {
    title: 'Beneficiário',
    dataIndex: 'beneficiario',
    key: 'beneficiario',
  },
  {
    title: 'CPF/CNPJ',
    dataIndex: 'cpfCnpj',
    key: 'cpfCnpj',
  },
  {
    title: 'Histórico',
    dataIndex: 'historico',
    key: 'historico',
  },
  {
    title: 'Valor Empenhado',
    dataIndex: 'valorEmpenhado',
    key: 'valorEmpenhado',
  },
  {
    title: 'Data/Empenho',
    dataIndex: 'dataEmpenho',
    key: 'dataEmpenho',
  },
  {
    title: 'Liquidação',
    dataIndex: 'liquidacao',
    key: 'liquidacao',
  },
  {
    title: 'Data/Pagamento',
    dataIndex: 'dataPagamento',
    key: 'dataPagamento',
  },
  {
    title: 'Valor/Pagamento',
    dataIndex: 'pagamento',
    key: 'pagamento',
  },
  {
    title: 'Identificação/Licitação',
    dataIndex: 'licitacao',
    key: 'licitacao',
  },
  {
    title: 'Elemento',
    dataIndex: 'elemento',
    key: 'elemento',
  },
  {
    title: 'Função',
    dataIndex: 'funcao',
    key: 'funcao',
  },
  {
    title: 'Sub-Função',
    dataIndex: 'subFuncao',
    key: 'subFuncao',
  },
  {
    title: 'Fonte/Recursos',
    dataIndex: 'recursos',
    key: 'recursos',
  },
  {
    title: 'Grupo/Natureza',
    dataIndex: 'grupoNatureza',
    key: 'grupoNatureza',
  },
  {
    title: 'Categoria Econômica',
    dataIndex: 'categoriaEconomica',
    key: 'categoriaEconomica',
  },
  {
    title: 'Unidade Orçamentária',
    dataIndex: 'unidadeOrcamentaria',
    key: 'unidadeOrcamentaria',
  },
]

export default function DespesasTable({ data }) {
  return (
    <Table
      dataSource={data}
      columns={columns}
      scroll={{ x: 'max-content' }}
      pagination={{ pageSize: 20 }}
    />
  )
}
