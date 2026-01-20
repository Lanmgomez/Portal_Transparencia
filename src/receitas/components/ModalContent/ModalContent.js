import { Typography, Divider, Row, Col, Skeleton } from 'antd'
import useReceitaDataById from '../hooks/useReceitaDataById'

const { Text, Title } = Typography

export default function ModalContent({ id }) {
  const {
    ano,
    mes,
    descricao,
    data_recebimento,
    receita_acumulada,
    receita_mensal_prevista,
    receita_extra_orcamentaria,
    receita_realizada,
    unidade_recebedora,
    acumulada_com_extra_orcamentaria,
    isLoading,
    isError,
  } = useReceitaDataById(id)

  return (
    <div>
      {isError && <p>Ops! Algo deu errado...</p>}

      {isLoading ? (
        <Skeleton />
      ) : (
        <>
          <Row gutter={[16, 12]}>
            <Col span={12}>
              <Text strong>Ano:</Text>
            </Col>
            <Col span={12}>
              <Text>{ano}</Text>
            </Col>

            <Col span={12}>
              <Text strong>Mês:</Text>
            </Col>
            <Col span={12}>
              <Text>{mes}</Text>
            </Col>

            <Col span={12}>
              <Text strong>Descrição:</Text>
            </Col>
            <Col span={12}>
              <Text>{descricao}</Text>
            </Col>

            <Col span={12}>
              <Text strong>Unidade Recebedora:</Text>
            </Col>
            <Col span={12}>
              <Text>{unidade_recebedora}</Text>
            </Col>

            <Col span={12}>
              <Text strong>Data de Recebimento:</Text>
            </Col>
            <Col span={12}>
              <Text>{data_recebimento}</Text>
            </Col>
          </Row>

          <Divider />

          <Title level={5} style={{ marginBottom: 16 }}>
            Valores
          </Title>

          <Row gutter={[16, 12]}>
            <Col span={12}>
              <Text strong>Receita Mensal Prevista:</Text>
            </Col>
            <Col span={12}>
              <Text type='success'>{receita_mensal_prevista}</Text>
            </Col>

            <Col span={12}>
              <Text strong>Receita Extra Orçamentária:</Text>
            </Col>
            <Col span={12}>
              <Text type='warning'>{receita_extra_orcamentaria}</Text>
            </Col>

            <Col span={12}>
              <Text strong>Receita Realizada:</Text>
            </Col>
            <Col span={12}>
              <Text type='success'>{receita_realizada}</Text>
            </Col>

            <Col span={12}>
              <Text strong>Receita Acumulada:</Text>
            </Col>
            <Col span={12}>
              <Text strong>{receita_acumulada}</Text>
            </Col>

            <Col span={12}>
              <Text strong>Acumulada c/ Extra Orçamentária:</Text>
            </Col>
            <Col span={12}>
              <Text strong>{acumulada_com_extra_orcamentaria}</Text>
            </Col>
          </Row>
        </>
      )}
    </div>
  )
}
