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
