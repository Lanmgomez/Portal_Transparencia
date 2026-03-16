import { Card, Col, Row, Table, Typography } from 'antd'
import { formatCurrencyBR } from '../../../components/commons/utils'
import useEmpenhoDataByID from '../hooks/useEmpenhoDataByID'

const { Title } = Typography

const columns = [
  {
    title: 'ANO',
    dataIndex: 'ano',
    key: 'ano',
    width: 80,
  },
  {
    title: 'EMPENHO',
    dataIndex: 'empenho',
    key: 'empenho',
    width: 120,
  },
  {
    title: 'DATA PAGAMENTO',
    dataIndex: 'data_pagamento',
    key: 'data_pagamento',
    width: 160,
  },
  {
    title: 'PARCELA',
    dataIndex: 'numero_parcela',
    key: 'numero_parcela',
    width: 120,
  },
  {
    title: 'VALOR PAGO',
    dataIndex: 'valor_pago',
    key: 'valor_pago',
    render: (value) => formatCurrencyBR(value),
  },
]

export default function PagamentosTable({ data, id, setTotalPago }) {
  const { valor_parcela } = useEmpenhoDataByID({ id })

  const newData = data?.map((item, index) => ({
    ...item,
    valor_pago: valor_parcela?.[index]?.valor_pago ?? 0,
  }))

  const totalPago = newData?.reduce(
    (acc, item) => acc + Number(item.valor_pago || 0),
    0,
  )
  setTotalPago(totalPago)

  return (
    <Row>
      <Col>
        <Card
          size='small'
          title={
            <Title level={5} style={{ margin: 0 }}>
              PAGAMENTO
            </Title>
          }
        >
          <Table
            columns={columns}
            dataSource={newData}
            rowKey={(record, index) => `pag-${index}`}
            pagination={false}
            size='small'
            bordered
            summary={() => (
              <Table.Summary.Row>
                <Table.Summary.Cell index={0} colSpan={4}>
                  <strong>Total:</strong>
                </Table.Summary.Cell>

                <Table.Summary.Cell index={1}>
                  <strong>{formatCurrencyBR(totalPago)}</strong>
                </Table.Summary.Cell>
              </Table.Summary.Row>
            )}
          />
        </Card>
      </Col>
    </Row>
  )
}
