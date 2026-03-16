import { useState } from 'react'
import { Skeleton, Typography, Descriptions, Divider, Space } from 'antd'
import LiquidacaoTable from '../table/liquidacaoColumns'
import useEmpenhoDataByID from '../hooks/useEmpenhoDataByID'
import PagamentosTable from '../table/pagamentoColumns'
import {
  formatDateBR,
  formatCurrencyBR,
} from '../../../components/commons/utils'

const { Paragraph } = Typography

export default function LiquidacaoPagamentoModal({ id }) {
  const [_, setTotalPago] = useState()

  const {
    fornecedor,
    numero_empenho,
    data_empenho,
    valor_empenhado,
    descricao,
    liquidacao,
    pagamentos,
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
            }}
          >
            <Descriptions.Item label='Descrição'>
              <Paragraph
                style={{ marginBottom: 0, color: 'inherit' }}
                ellipsis={{ rows: 4, expandable: true, symbol: 'ver mais' }}
              >
                {descricao || '-'}
              </Paragraph>
            </Descriptions.Item>

            <Descriptions.Item label='Número Empenho'>
              {numero_empenho || '-'}
            </Descriptions.Item>

            <Descriptions.Item label='Beneficiário'>
              {fornecedor || '-'}
            </Descriptions.Item>

            <Descriptions.Item label='Valor Empenhado'>
              {valor_empenhado ? formatCurrencyBR(valor_empenhado) : '-'}
            </Descriptions.Item>

            <Descriptions.Item label='Data Empenho'>
              {data_empenho ? formatDateBR(data_empenho) : '-'}
            </Descriptions.Item>
          </Descriptions>

          <Divider style={{ margin: 0 }} />

          {/** Tables */}
          <LiquidacaoTable data={liquidacao} />

          <PagamentosTable
            data={pagamentos}
            id={id}
            setTotalPago={setTotalPago}
          />
        </Space>
      )}
    </div>
  )
}
