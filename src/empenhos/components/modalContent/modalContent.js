import { Skeleton, Typography, Descriptions, Divider, Space } from 'antd'
import LiquidacaoTable from '../table/liquidacaoColumns'
import useEmpenhoDataByID from '../hooks/useEmpenhoDataByID'
import PagamentosTable from '../table/pagamentoColumns'
import {
  formatYearMonth,
  formatDateBR,
  maskCNPJ,
  maskCPF,
  formatCurrencyBR,
} from '../../../components/commons/utils'

const { Text, Paragraph } = Typography

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
    liquidacao,
    pagamentos,
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
        <Space direction='vertical' size={20} style={{ width: '100%' }}>
          <Descriptions
            title='Dados principais'
            bordered
            size='middle'
            column={1}
            labelStyle={{
              width: 190,
              fontWeight: 600,
              color: '#bfbfbf',
            }}
            contentStyle={{
              color: '#f5f5f5',
            }}
          >
            <Descriptions.Item label='Ano'>{ano || '-'}</Descriptions.Item>
            <Descriptions.Item label='Mês'>{mes || '-'}</Descriptions.Item>
            <Descriptions.Item label='Número Empenho'>
              {numero_empenho || '-'}
            </Descriptions.Item>

            <Descriptions.Item label='Beneficiário'>-</Descriptions.Item>
            <Descriptions.Item label='CPF/CNPJ'>
              {cpf_cnpj_credor ? maskCNPJ(cpf_cnpj_credor) : '-'}
            </Descriptions.Item>

            <Descriptions.Item label='Descrição'>
              <Paragraph
                style={{ marginBottom: 0, color: 'inherit' }}
                ellipsis={{ rows: 4, expandable: true, symbol: 'ver mais' }}
              >
                {descricao || '-'}
              </Paragraph>
            </Descriptions.Item>

            <Descriptions.Item label='Valor Empenhado'>
              {valor_empenhado ? formatCurrencyBR(valor_empenhado) : '-'}
            </Descriptions.Item>

            <Descriptions.Item label='Data Empenho'>
              {data_empenho ? formatDateBR(data_empenho) : '-'}
            </Descriptions.Item>

            <Descriptions.Item label='Liquidação'>-</Descriptions.Item>
            <Descriptions.Item label='Data de Pagamento'>-</Descriptions.Item>
            <Descriptions.Item label='Valor do Pagamento'>-</Descriptions.Item>
            <Descriptions.Item label='Identificação da Licitação'>
              -
            </Descriptions.Item>
          </Descriptions>

          <Divider style={{ margin: 0 }} />

          <Descriptions
            title='Informações complementares'
            bordered
            size='middle'
            column={1}
            labelStyle={{
              width: 190,
              fontWeight: 600,
              color: '#bfbfbf',
            }}
            contentStyle={{
              color: '#f5f5f5',
            }}
          >
            <Descriptions.Item label='Competência'>
              {competencia ? formatYearMonth(competencia) : '-'}
            </Descriptions.Item>

            <Descriptions.Item label='Unidade Código'>
              {unidade_codigo || '-'}
            </Descriptions.Item>

            <Descriptions.Item label='Função'>
              {funcao || '-'}
            </Descriptions.Item>

            <Descriptions.Item label='Sub-Função'>
              {subfuncao || '-'}
            </Descriptions.Item>

            <Descriptions.Item label='Tipo Empenho'>
              {tipo_empenho || '-'}
            </Descriptions.Item>

            <Descriptions.Item label='Modalidade Licitação'>
              {modalidade_licitacao || '-'}
            </Descriptions.Item>

            <Descriptions.Item label='Chave Empenho'>
              <Text copyable>{empenho_key || '-'}</Text>
            </Descriptions.Item>

            <Descriptions.Item label='Procedência Licitação'>
              {proced_licitacao_ref || '-'}
            </Descriptions.Item>

            <Descriptions.Item label='Natureza Despesa'>
              {natureza_despesa || '-'}
            </Descriptions.Item>

            <Descriptions.Item label='Fonte Recurso'>
              {fonte_recurso || '-'}
            </Descriptions.Item>

            <Descriptions.Item label='CPF Ordenador'>
              {cpf_ordenador ? maskCPF(cpf_ordenador) : '-'}
            </Descriptions.Item>

            <Descriptions.Item label='Elemento Despesa'>
              {elemento_despesa_emp || '-'}
            </Descriptions.Item>

            <Descriptions.Item label='Programa Código'>
              {programa_codigo || '-'}
            </Descriptions.Item>

            <Descriptions.Item label='Ação Código'>
              {acao_codigo || '-'}
            </Descriptions.Item>

            <Descriptions.Item label='Categoria Econômica'>
              {categoria_economica || '-'}
            </Descriptions.Item>

            <Descriptions.Item label='Grupo Natureza'>
              {grupo_natureza || '-'}
            </Descriptions.Item>

            <Descriptions.Item label='Modalidade Aplicação'>
              {modalidade_aplicacao || '-'}
            </Descriptions.Item>

            <Descriptions.Item label='Elemento Despesa'>
              {elemento_despesa || '-'}
            </Descriptions.Item>

            <Descriptions.Item label='Sub-Elemento Despesa'>
              {subelemento_despesa || '-'}
            </Descriptions.Item>

            <Descriptions.Item label='Data Criação'>
              {created_at ? formatDateBR(created_at) : '-'}
            </Descriptions.Item>
          </Descriptions>

          {/** Tables */}
          <LiquidacaoTable data={liquidacao} />

          <PagamentosTable data={pagamentos} />
        </Space>
      )}
    </div>
  )
}
