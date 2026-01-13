import { Table } from 'antd'
import dayjs from 'dayjs'
import { formatCurrencyBR } from '../../../components/commons/utils'

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
    title: 'Unidade Recebedora',
    dataIndex: 'unidadeRecebedora',
    key: 'unidadeRecebedora',
  },
  {
    title: 'Descrição',
    dataIndex: 'descricao',
    key: 'descricao',
  },
  {
    title: 'Data Recebimento',
    dataIndex: 'dataRecebimento',
    key: 'dataRecebimento',
    render: (value) => (value ? dayjs(value).format('DD/MM/YYYY HH:mm') : '-'),
  },
  {
    title: 'Receita Mensal Prevista',
    dataIndex: 'receitaMensalPrevista',
    key: 'receitaMensalPrevista',
    render: (value) => (value ? formatCurrencyBR(value) : ''),
  },
  {
    title: 'Receita Extra-Orçamentária',
    dataIndex: 'receitaExtraOrçamentaria',
    key: 'receitaExtraOrçamentaria',
    render: (value) => (value ? formatCurrencyBR(value) : ''),
  },
  {
    title: 'Receita Realizada',
    dataIndex: 'receitaRealizada',
    key: 'receitaRealizada',
    render: (value) => (value ? formatCurrencyBR(value) : ''),
  },
  {
    title: 'Receita Acumulada',
    dataIndex: 'receitaAcumulada',
    key: 'receitaAcumulada',
    render: (value) => (value ? formatCurrencyBR(value) : ''),
  },
]

export default function ReceitasTable({ data }) {
  return (
    <Table
      dataSource={data}
      columns={columns}
      scroll={{ x: 'max-content' }}
      pagination={{ pageSize: 20 }}
    />
  )
}
