import { Table } from 'antd'
import dayjs from 'dayjs'
import { formatCurrencyBR } from '../../../components/commons/utils'

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
    title: 'Unidade Recebedora',
    dataIndex: 'unidadeRecebedora',
    key: 'unidadeRecebedora',
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
    dataIndex: 'dataRecebimento',
    key: 'dataRecebimento',
    align: 'center',
    render: (value) => (value ? dayjs(value).format('DD/MM/YYYY HH:mm') : '-'),
  },
  {
    title: 'Receita Mensal Prevista',
    dataIndex: 'receitaMensalPrevista',
    key: 'receitaMensalPrevista',
    align: 'center',
    render: (value) => (value ? formatCurrencyBR(value) : ''),
  },
  {
    title: 'Receita Extra-Orçamentária',
    dataIndex: 'receitaExtraOrçamentaria',
    key: 'receitaExtraOrçamentaria',
    align: 'center',
    render: (value) => (value ? formatCurrencyBR(value) : ''),
  },
  {
    title: 'Receita Realizada',
    dataIndex: 'receitaRealizada',
    key: 'receitaRealizada',
    align: 'center',
    render: (value) => (value ? formatCurrencyBR(value) : ''),
  },
  {
    title: 'Receita Acumulada',
    dataIndex: 'receitaAcumulada',
    key: 'receitaAcumulada',
    align: 'center',
    render: (value) => (value ? formatCurrencyBR(value) : ''),
  },
  {
    title: 'Acumulado com Extra-Orçamentária',
    dataIndex: 'receitaAcumuladaComExtraOrcamentaria',
    key: 'receitaAcumuladaComExtraOrcamentaria',
    align: 'center',
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
