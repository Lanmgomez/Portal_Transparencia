import { Card, Col, Row, Table, Typography } from 'antd'
import { formatCurrencyBR } from '../../../components/commons/utils'

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

export default function PagamentosTable({ data }) {
  const totalPago = data.reduce(
    (acc, item) => acc + Number(item.valor_pago || 0),
    0,
  )

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
            dataSource={data}
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
