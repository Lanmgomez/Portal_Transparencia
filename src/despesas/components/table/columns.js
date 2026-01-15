import { Table } from 'antd'

const columns = [
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
    dataIndex: 'empenho',
    key: 'emprenho',
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
    dataIndex: 'cpfCnpj',
    key: 'cpfCnpj',
    align: 'center',
  },
  {
    title: 'Histórico',
    dataIndex: 'historico',
    key: 'historico',
    align: 'center',
  },
  {
    title: 'Valor Empenhado',
    dataIndex: 'valorEmpenhado',
    key: 'valorEmpenhado',
    align: 'center',
  },
  {
    title: 'Data/Empenho',
    dataIndex: 'dataEmpenho',
    key: 'dataEmpenho',
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
    dataIndex: 'recursos',
    key: 'recursos',
    align: 'center',
  },
  {
    title: 'Grupo/Natureza',
    dataIndex: 'grupoNatureza',
    key: 'grupoNatureza',
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
    dataIndex: 'unidadeOrcamentaria',
    key: 'unidadeOrcamentaria',
    align: 'center',
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
