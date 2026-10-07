import { Row, Col, Card } from 'antd'
import { DollarOutlined } from '@ant-design/icons'

const CardResumo = ({ titulo, valor, cor, porcentagem, icon }) => {
  const Icon = icon || DollarOutlined

  return (
    <Card
      style={{
        borderRadius: 10,
        position: 'relative',
      }}
      bodyStyle={{ display: 'flex', alignItems: 'center', gap: 16 }}
    >
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
        <Icon style={{ fontSize: 24, color: cor }} />
      </div>

      <div>
        <div style={{ fontSize: 14, color: '#555' }}>{titulo}</div>
        <div style={{ fontSize: 20, fontWeight: 'bold' }}>
          {valor || 'Não informado'}
        </div>
      </div>
    </Card>
  )
}

export default function DashboardCards({
  total_empenhado,
  total_liquidado,
  total_pago,
}) {
  return (
    <div>
      <Row
        style={{
          width: '100%',
          marginBottom: '30px',
        }}
      ></Row>

      <Row gutter={16}>
        <Col span={8}>
          <CardResumo
            titulo='TOTAL EMPENHADO'
            valor={total_empenhado}
            cor='#3f51b5'
          />
        </Col>

        <Col span={8}>
          <CardResumo
            titulo='TOTAL LIQUIDADO'
            valor={total_liquidado}
            cor='#fa8c16'
          />
        </Col>

        <Col span={8}>
          <CardResumo titulo='TOTAL PAGO' valor={total_pago} cor='#52c41a' />
        </Col>
      </Row>
    </div>
  )
}
