import { Col, Row, Skeleton, Typography } from 'antd'
import useEmpenhoDataByID from '../hooks/useEmpenhoDataByID'
import {
  formatYearMonth,
  formatDateBR,
  maskCNPJ,
  maskCPF,
} from '../../../components/commons/utils'

const { Text } = Typography

export default function ModalContent({ id }) {
  const {
    ano,
    mes,
    competencia,
    unidade_codigo,
    funcao,
    subfuncao,
    numero_empenho,
    tipo_empenho,
    modalidade_licitacao,
    empenho_key,
    data_empenho,
    valor_empenhado,
    cpf_cnpj_credor,
    proced_licitacao_ref,
    descricao,
    natureza_despesa,
    fonte_recurso,
    cpf_ordenador,
    elemento_despesa_emp,
    programa_codigo,
    acao_codigo,
    categoria_economica,
    grupo_natureza,
    modalidade_aplicacao,
    elemento_despesa,
    subelemento_despesa,
    created_at,
    isLoading,
    isError,
  } = useEmpenhoDataByID({
    id,
  })

  return (
    <div>
      {isError && <p>Ops! Algo deu errado...</p>}

      {isLoading ? (
        <Skeleton />
      ) : (
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
            <Text strong>Competência:</Text>
          </Col>
          <Col span={12}>
            <Text>{formatYearMonth(competencia)}</Text>
          </Col>

          <Col span={12}>
            <Text strong>Unidade Código:</Text>
          </Col>
          <Col span={12}>
            <Text>{unidade_codigo}</Text>
          </Col>

          <Col span={12}>
            <Text strong>Função:</Text>
          </Col>
          <Col span={12}>
            <Text>{funcao}</Text>
          </Col>

          <Col span={12}>
            <Text strong>Sub-Função:</Text>
          </Col>
          <Col span={12}>
            <Text>{subfuncao}</Text>
          </Col>

          <Col span={12}>
            <Text strong>Número Empenho:</Text>
          </Col>
          <Col span={12}>
            <Text>{numero_empenho}</Text>
          </Col>

          <Col span={12}>
            <Text strong>Tipo Empenho:</Text>
          </Col>
          <Col span={12}>
            <Text>{tipo_empenho}</Text>
          </Col>

          <Col span={12}>
            <Text strong>Modalidade Licitação:</Text>
          </Col>
          <Col span={12}>
            <Text>{modalidade_licitacao}</Text>
          </Col>

          <Col span={12}>
            <Text strong>Chave Empenho:</Text>
          </Col>
          <Col span={12}>
            <Text>{empenho_key}</Text>
          </Col>

          <Col span={12}>
            <Text strong>Data Empenho:</Text>
          </Col>
          <Col span={12}>
            <Text>{formatDateBR(data_empenho)}</Text>
          </Col>

          <Col span={12}>
            <Text strong>Valor Empenhado:</Text>
          </Col>
          <Col span={12}>
            <Text>{`R$ ${valor_empenhado}`}</Text>
          </Col>

          <Col span={12}>
            <Text strong>CPF/CNPJ:</Text>
          </Col>
          <Col span={12}>
            <Text>{maskCNPJ(cpf_cnpj_credor)}</Text>
          </Col>

          <Col span={12}>
            <Text strong>Procedência Licitação:</Text>
          </Col>
          <Col span={12}>
            <Text>{proced_licitacao_ref}</Text>
          </Col>

          <Col span={12}>
            <Text strong>Natureza Despesa:</Text>
          </Col>
          <Col span={12}>
            <Text>{natureza_despesa}</Text>
          </Col>

          <Col span={12}>
            <Text strong>Fonte Recurso:</Text>
          </Col>
          <Col span={12}>
            <Text>{fonte_recurso}</Text>
          </Col>

          <Col span={12}>
            <Text strong>CPF Ordenador:</Text>
          </Col>
          <Col span={12}>
            <Text>{maskCPF(cpf_ordenador)}</Text>
          </Col>

          <Col span={12}>
            <Text strong>Elemento Despesa:</Text>
          </Col>
          <Col span={12}>
            <Text>{elemento_despesa_emp}</Text>
          </Col>

          <Col span={12}>
            <Text strong>Programa Código:</Text>
          </Col>
          <Col span={12}>
            <Text>{programa_codigo}</Text>
          </Col>

          <Col span={12}>
            <Text strong>Ação Código:</Text>
          </Col>
          <Col span={12}>
            <Text>{acao_codigo}</Text>
          </Col>

          <Col span={12}>
            <Text strong>Categoria Econômica:</Text>
          </Col>
          <Col span={12}>
            <Text>{categoria_economica}</Text>
          </Col>

          <Col span={12}>
            <Text strong>Grupo Natureza:</Text>
          </Col>
          <Col span={12}>
            <Text>{grupo_natureza}</Text>
          </Col>

          <Col span={12}>
            <Text strong>Modalidade Aplicação:</Text>
          </Col>
          <Col span={12}>
            <Text>{modalidade_aplicacao}</Text>
          </Col>

          <Col span={12}>
            <Text strong>Elemento Despesa:</Text>
          </Col>
          <Col span={12}>
            <Text>{elemento_despesa}</Text>
          </Col>

          <Col span={12}>
            <Text strong>Sub-Elemento Despesa:</Text>
          </Col>
          <Col span={12}>
            <Text>{subelemento_despesa}</Text>
          </Col>

          <Col span={12}>
            <Text strong>Data Criação:</Text>
          </Col>
          <Col span={12}>
            <Text>{formatDateBR(created_at)}</Text>
          </Col>

          <Col span={12}>
            <Text strong>Descrição:</Text>
          </Col>
          <Col span={12}>
            <Text>{descricao}</Text>
          </Col>
        </Row>
      )}
    </div>
  )
}
