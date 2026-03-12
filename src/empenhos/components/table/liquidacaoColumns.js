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
    title: 'NÚMERO',
    dataIndex: 'numero',
    key: 'numero',
    width: 120,
  },
  {
    title: 'DATA LIQUIDAÇÃO',
    dataIndex: 'data_liquidacao',
    key: 'data_liquidacao',
    width: 180,
  },
  {
    title: 'VALOR LIQUIDADO',
    dataIndex: 'valor_liquidado',
    key: 'valor_liquidado',
    render: (value) => formatCurrencyBR(value),
  },
]

export default function LiquidacaoTable({ data }) {
  const totalLiquidado = data?.reduce(
    (acc, item) => acc + Number(item.valor_liquidado || 0),
    0,
  )

  return (
    <Row>
      <Col>
        <Card
          size='small'
          title={
            <Title level={5} style={{ margin: 0 }}>
              LIQUIDAÇÃO
            </Title>
          }
        >
          <Table
            columns={columns}
            dataSource={data}
            rowKey={(record, index) => `liq-${index}`}
            pagination={false}
            size='small'
            bordered
            summary={() => (
              <Table.Summary.Row>
                <Table.Summary.Cell index={0} colSpan={3}>
                  <strong>Total:</strong>
                </Table.Summary.Cell>

                <Table.Summary.Cell index={1}>
                  <strong>{formatCurrencyBR(totalLiquidado)}</strong>
                </Table.Summary.Cell>
              </Table.Summary.Row>
            )}
          />
        </Card>
      </Col>
    </Row>
  )
}
