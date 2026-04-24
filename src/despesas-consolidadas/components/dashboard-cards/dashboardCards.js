import { Card, Row, Col } from 'antd'
import { DollarOutlined } from '@ant-design/icons'

const CardResumo = ({ titulo, valor, cor, porcentagem }) => {
  return (
    <Card
      style={{
        borderRadius: 10,
        position: 'relative',
      }}
      bodyStyle={{ display: 'flex', alignItems: 'center', gap: 16 }}
    >
      {/* badge percentual */}
      {porcentagem && (
        <div
          style={{
            position: 'absolute',
            top: 0,
            right: 0,
            background: '#f0f0f0',
            padding: '4px 8px',
            borderBottomLeftRadius: 8,
            fontSize: 12,
            color: cor,
            fontWeight: 'bold',
          }}
        >
          {porcentagem}
        </div>
      )}

      {/* ícone */}
      <div
        style={{
          width: 50,
          height: 50,
          borderRadius: '50%',
          background: `${cor}20`,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <DollarOutlined style={{ fontSize: 24, color: cor }} />
      </div>

      {/* conteúdo */}
      <div>
        <div style={{ fontSize: 14, color: '#555' }}>{titulo}</div>
        <div style={{ fontSize: 20, fontWeight: 'bold' }}>{valor}</div>
      </div>
    </Card>
  )
}

export default function DashboardCards({
  despesas_consolidadas,
  unidade_orcamentaria,
  valor_total_empenhado,
  valor_total_liquidado,
  valor_total_pago,
  saldo_a_liquidar,
  saldo_a_pagar,
}) {
  return (
    <>
      <Row
        style={{
          width: '100%',
          marginBottom: '30px',
          //   display: 'flex',
          //   justifyContent: 'center',
        }}
      >
        <Col span={8}>
          <CardResumo
            titulo='Unidade Orçamentária'
            valor={unidade_orcamentaria}
            cor='#e6e9fa'
          />
        </Col>
      </Row>

      <Row gutter={16}>
        <Col span={8}>
          <CardResumo
            titulo='EMPENHADO'
            valor={valor_total_empenhado}
            cor='#3f51b5'
          />
        </Col>

        <Col span={8}>
          <CardResumo
            titulo='LIQUIDADO'
            valor={valor_total_liquidado}
            cor='#fa8c16'
          />
        </Col>

        <Col span={8}>
          <CardResumo titulo='PAGO' valor={valor_total_pago} cor='#52c41a' />
        </Col>
      </Row>
    </>
  )
}
