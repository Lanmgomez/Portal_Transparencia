import { Empty, Table } from 'antd'
import { useRef, useEffect } from 'react'
import getCurrentDate, {
  formatCurrencyBR,
  formatDateBR,
} from '../../../components/commons/utils'

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
    render: (value) => formatDateBR(value),
  },
  {
    title: 'Data Pagamento',
    dataIndex: 'data_pagamento',
    key: 'data_pagamento',
    render: (value) => formatDateBR(value),
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
    dataIndex: 'parcela',
    key: 'parcela',
    align: 'center',
  },
  {
    title: 'Valor Pago',
    dataIndex: 'valor_pago',
    key: 'valor_pago',
    align: 'center',
    render: (value) => formatCurrencyBR(value),
  },
  {
    title: 'Unidade Orçamentária',
    dataIndex: 'unidade_orcamentaria',
    key: 'unidade_orcamentaria',
    align: 'center',
    width: 120,
  },
  {
    title: 'Origem Recurso',
    dataIndex: 'origem_recurso',
    key: 'origem_recurso',
    align: 'center',
  },
  {
    title: 'Elemento',
    dataIndex: ['elemento_despesa', 'elemento', 'descricao'],
    key: 'elemento_despesa',
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
  const tableRef = useRef(null)

  useEffect(() => {
    const el = tableRef.current?.querySelector('.ant-table-body')

    if (!el) return

    const handleScroll = (e) => {
      const { scrollTop, scrollHeight, clientHeight } = e.target

      const isBottom = scrollTop + clientHeight >= scrollHeight - 50

      if (isBottom && hasNextPage && !isFetchingNextPage) {
        fetchNextPage()
      }
    }

    el.addEventListener('scroll', handleScroll)

    return () => el.removeEventListener('scroll', handleScroll)
  }, [hasNextPage, isFetchingNextPage, fetchNextPage])

  return (
    <div ref={tableRef} style={{ marginBottom: '50px' }}>
      <Table
        dataSource={data}
        columns={columns()}
        loading={loading || isFetchingNextPage}
        pagination={false}
        scroll={{ y: 600 }}
        locale={{
          emptyText: (
            <span>
              <Empty description={false} />
              Não há despesas nessa dotação no período informado - dados
              atualizados em {getCurrentDate()}
            </span>
          ),
        }}
      />
    </div>
  )
}
