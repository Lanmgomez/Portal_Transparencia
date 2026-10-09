import { useEffect, useRef, useState } from 'react'
import { Button, Table, Space, Empty } from 'antd'
import { BarsOutlined } from '@ant-design/icons'
import { Link } from 'react-router-dom'
import getCurrentDate from '../../../components/commons/utils'
import TableProvider from '../../../components/Providers/tableProvider'

function TableWithTopScroll(props) {
  const wrapperRef = useRef(null)
  const topScrollRef = useRef(null)
  const [scrollWidth, setScrollWidth] = useState(0)
  const [showTop, setShowTop] = useState(false)

  useEffect(() => {
    const body = wrapperRef.current?.querySelector('.ant-table-body')
    const top = topScrollRef.current
    if (!body || !top) return

    const updateWidth = () => {
      setScrollWidth(body.scrollWidth)
      setShowTop(body.scrollWidth > body.clientWidth)
    }
    updateWidth()

    const ro = new ResizeObserver(updateWidth)
    ro.observe(body)
    const innerTable = body.querySelector('table')
    if (innerTable) ro.observe(innerTable)

    // Quem está sendo usado pelo usuário no momento
    let source = null
    const setTop = () => {
      source = 'top'
    }
    const setBody = () => {
      source = 'body'
    }

    const onTopScroll = () => {
      if (source !== 'top') return
      body.scrollLeft = top.scrollLeft
    }
    const onBodyScroll = () => {
      if (source !== 'body') return
      top.scrollLeft = body.scrollLeft
    }

    ;['mouseenter', 'pointerdown', 'touchstart', 'wheel'].forEach((evt) => {
      top.addEventListener(evt, setTop, { passive: true })
      body.addEventListener(evt, setBody, { passive: true })
    })
    top.addEventListener('scroll', onTopScroll, { passive: true })
    body.addEventListener('scroll', onBodyScroll, { passive: true })

    return () => {
      ro.disconnect()
      ;['mouseenter', 'pointerdown', 'touchstart', 'wheel'].forEach((evt) => {
        top.removeEventListener(evt, setTop)
        body.removeEventListener(evt, setBody)
      })
      top.removeEventListener('scroll', onTopScroll)
      body.removeEventListener('scroll', onBodyScroll)
    }
  }, [props.dataSource, props.loading])

  return (
    <div ref={wrapperRef}>
      <div
        ref={topScrollRef}
        style={{
          overflowX: 'auto',
          overflowY: 'hidden',
          display: showTop ? 'block' : 'none',
        }}
      >
        <div style={{ width: scrollWidth, height: 1 }} />
      </div>
      <Table {...props} />
    </div>
  )
}

const MODALIDADE_DISPENSADA =
  'Processo licitatório dispensado Art.95, §2º da Lei 14.133/2021'

const normalize = (v) => String(v).replace(/\s+/g, ' ').trim()

const columns = ({ setId, openModal, openLiqPgtModal }) => [
  {
    title: 'Ações',
    dataIndex: 'updated_at',
    key: 'updated_at',
    render: (_, record) => (
      <Space>
        <Button
          icon={<BarsOutlined />}
          onClick={() => {
            setId?.(record.id)
            openModal?.(true)
          }}
        >
          Ver mais
        </Button>
      </Space>
    ),
  },
  {
    title: 'Ano',
    dataIndex: 'ano',
    key: 'ano',
    align: 'center',
  },
  {
    title: 'Mês',
    dataIndex: 'mes',
    key: 'mes',
    align: 'center',
  },
  {
    title: 'N° Empenho',
    dataIndex: 'numero_empenho',
    key: 'numero_empenho',
    align: 'center',
  },
  {
    title: 'Beneficiário',
    dataIndex: 'beneficiario',
    key: 'beneficiario',
    align: 'center',
    width: 300,
    render: (_, record) =>
      record.beneficiario === null &&
      window.location.pathname !== '/public-empenhos' ? (
        <Link to='/criar-fornecedores' style={{ padding: 0 }}>
          Cadastrar beneficiário
        </Link>
      ) : (
        record.beneficiario
      ),
  },
  {
    title: 'CPF/CNPJ',
    dataIndex: 'cpf_cnpj_credor',
    key: 'cpf_cnpj_credor',
    align: 'center',
  },
  {
    title: 'Histórico',
    dataIndex: 'descricao',
    key: 'descricao',
    align: 'center',
    width: 400,
    render: (text) => (
      <div
        style={{
          textAlign: 'justify',
          textJustify: 'inter-word',
          whiteSpace: 'normal',
          wordBreak: 'break-word',
        }}
      >
        {text}
      </div>
    ),
  },
  {
    title: 'Valor Empenhado',
    dataIndex: 'valor_empenhado',
    key: 'valor_empenhado',
    align: 'center',
  },
  // {
  //   title: 'Data/Empenho',
  //   dataIndex: 'data_empenho',
  //   key: 'data_empenho',
  //   align: 'center',
  // },
  {
    width: 120,
    dataIndex: 'updated_at',
    key: 'updated_at',
    render: (_, record) => (
      <a
        style={{ color: '#8B0000', fontWeight: 'bold' }}
        onClick={() => {
          setId?.(record.id)
          openLiqPgtModal?.(true)
        }}
      >
        Ver registro Liquidação e Pagamento
      </a>
    ),
  },
  {
    title: 'Liquidação',
    dataIndex: 'valor_liquidaçao',
    key: 'valor_liquidaçao',
    align: 'center',
  },
  {
    title: 'Data/Pagamento',
    dataIndex: 'dataPagamento',
    key: 'dataPagamento',
    align: 'center',
  },
  {
    title: 'Valor/Pagamento',
    dataIndex: 'pagamento',
    key: 'pagamento',
    align: 'center',
  },
  {
    title: 'N° do Processo Licitatório',
    dataIndex: 'numero_procedimento',
    key: 'numero_procedimento',
    align: 'center',
  },
  {
    title: 'Modalidade',
    dataIndex: 'licitacao',
    key: 'licitacao',
    align: 'center',
    render: (value) => {
      if (!value) return <span style={{ color: 'rgba(0,0,0,.45)' }}>—</span>

      if (normalize(value) !== normalize(MODALIDADE_DISPENSADA)) {
        return <span>{value}</span>
      }

      return (
        <div style={{ lineHeight: 1.4, textAlign: 'center' }}>
          <div>Processo licitatório dispensado</div>
          <div style={{ fontWeight: 600 }}>Art. 95, §2º - Lei 14.133/2021</div>
        </div>
      )
    },
  },
  {
    title: 'Elemento',
    dataIndex: 'elemento',
    key: 'elemento',
    align: 'center',
  },
  {
    title: 'Função',
    dataIndex: 'funcao',
    key: 'funcao',
    align: 'center',
  },
  {
    title: 'Sub-Função',
    dataIndex: 'subFuncao',
    key: 'subFuncao',
    align: 'center',
  },
  {
    title: 'Fonte/Recursos',
    dataIndex: 'fonte_recurso',
    key: 'fonte_recurso',
    align: 'center',
  },
  {
    title: 'Grupo/Natureza',
    dataIndex: 'natureza_despesa',
    key: 'natureza_despesa',
    align: 'center',
  },
  {
    title: 'Categoria Econômica',
    dataIndex: 'categoriaEconomica',
    key: 'categoriaEconomica',
    align: 'center',
  },
  {
    title: 'Unidade Orçamentária',
    dataIndex: 'unidade_orcamentaria',
    key: 'unidade_orcamentaria',
    align: 'center',
  },
]

export default function EmpenhosTable({
  data,
  loading,
  page,
  perPage,
  total,
  onChange,
  setId,
  openModal,
  openLiqPgtModal,
}) {
  return (
    <TableProvider>
      <TableWithTopScroll
        bordered
        dataSource={data}
        columns={columns({ setId, openModal, openLiqPgtModal })}
        loading={loading}
        scroll={{ x: 'max-content', y: 700 }}
        onChange={onChange}
        pagination={{
          current: page,
          pageSize: perPage,
          total,
          showSizeChanger: true,
          pageSizeOptions: ['5', '10', '20', '50'],
          showTotal: (t, range) => `${range[0]}-${range[1]} de ${t}`,
        }}
        locale={{
          emptyText: (
            <span>
              <Empty description={false} />
              Não houve empenhos/liquidação/pagamentos para o período consultado
              - dados atualizados em {getCurrentDate()}
            </span>
          ),
        }}
      />
    </TableProvider>
  )
}
