import { Table } from 'antd'

const columns = () => [
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
    title: 'Beneficiário',
    dataIndex: 'beneficiario',
    key: 'beneficiario',
    width: 120,
  },
  {
    title: 'CPF',
    dataIndex: 'CPF',
    key: 'CPF',
    width: 120,
  },
  {
    title: 'Histórico',
    dataIndex: 'descricao',
    key: 'descricao',
    align: 'center',
    width: 400,
  },
  {
    title: 'Valor Empenhado',
    dataIndex: 'valor_empenhado',
    key: 'valor_empenhado',
    align: 'center',
  },
  {
    title: 'Data Pagamento',
    dataIndex: 'data_pagamento',
    key: 'data_pagamento',
    align: 'center',
  },
  {
    title: 'Valor Pago',
    dataIndex: 'valor_pago',
    key: 'valor_pago',
    align: 'center',
  },
  {
    title: 'Elemento',
    dataIndex: 'elemento',
    key: 'elemento',
    align: 'center',
  },
]

export default function DespesasDiariasTable({
  data,
  loading,
  page,
  per_page,
  total,
  onChange,
}) {
  return (
    <Table
      dataSource={data}
      columns={columns()}
      loading={loading}
      scroll={{ x: 'max-content', y: 600 }}
      onChange={onChange}
      pagination={{
        current: page,
        pageSize: per_page,
        total,
        showSizeChanger: true,
        pageSizeOptions: ['5', '10', '20', '50'],
        showTotal: (t, range) => `${range[0]}-${range[1]} de ${t}`,
      }}
    />
  )
}
