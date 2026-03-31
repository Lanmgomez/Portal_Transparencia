import { Table } from 'antd'
import { useRef } from 'react'

const columns = () => [
  {
    title: 'Ano',
    dataIndex: 'ano',
    key: 'ano',
  },
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

export default function OrdemCronologicaTable({
  data,
  loading,
  fetchNextPage,
  hasNextPage,
  isFetchingNextPage,
}) {
  const containerRef = useRef(null)

  const handleScroll = (e) => {
    const { scrollTop, scrollHeight, clientHeight } = e.currentTarget

    const isBottom = scrollTop + clientHeight >= scrollHeight - 50

    if (isBottom && hasNextPage && !isFetchingNextPage) {
      fetchNextPage()
    }
  }

  return (
    <div
      ref={containerRef}
      onScroll={handleScroll}
      style={{ height: 600, overflow: 'auto', marginBottom: 50 }}
    >
      <Table
        style={{ marginBottom: 30 }}
        dataSource={data}
        columns={columns()}
        loading={loading || isFetchingNextPage}
        pagination={false}
      />
    </div>
  )
}
