import { Table } from 'antd'

const columns = () => [
  {
    title: 'Data Liquidação',
    dataIndex: 'data_liquidacao',
    key: 'data_liquidacao',
  },
  {
    title: 'Data Pagamento',
    dataIndex: 'data_pagamento',
    key: 'data_pagamento',
  },
  {
    title: 'Beneficiário',
    dataIndex: 'beneficiario',
    key: 'beneficiario',
    width: 120,
  },
  {
    title: 'Empenho',
    dataIndex: 'numero_empenho',
    key: 'numero_empenho',
    width: 120,
  },
  {
    title: 'Parcela',
    dataIndex: 'numero_parcela',
    key: 'numero_parcela',
    align: 'center',
  },
  {
    title: 'Valor Pago',
    dataIndex: 'valor_pago',
    key: 'valor_pago',
    align: 'center',
  },
  {
    title: 'Unidade Orçamentária',
    dataIndex: 'unidade_orcamentaria',
    key: 'unidade_orcamentaria',
    align: 'center',
  },
  {
    title: 'Origem Recurso',
    dataIndex: 'fonte_recurso_descricao',
    key: 'fonte_recurso_descricao',
    align: 'center',
  },
  {
    title: 'Elemento',
    dataIndex: 'elemento',
    key: 'elemento',
    align: 'center',
  },
]

export default function OrdemCronologicaTable({ data, loading, onChange }) {
  return (
    <Table
      style={{ marginBottom: 30 }}
      dataSource={data}
      columns={columns()}
      loading={loading}
      scroll={{ x: 'max-content', y: 600 }}
      onChange={onChange}
      pagination={false}
    />
  )
}
