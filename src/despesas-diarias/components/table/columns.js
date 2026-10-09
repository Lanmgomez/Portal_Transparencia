import { Empty, Table, Button } from 'antd'
import { EditOutlined, PlusOutlined } from '@ant-design/icons'
import getCurrentDate, {
  formatarQuantidade,
} from '../../../components/commons/utils'
import dayjs from 'dayjs'
import TableProvider from '../../../components/Providers/tableProvider'

const columns = (onCadastrar) => {
  const isPaginaPublica =
    window.location.pathname === '/public-despesas-diarias'

  const renderVazio = (record) => (
    <div style={{ textAlign: 'center' }}>
      {isPaginaPublica ? (
        '-'
      ) : (
        <Button type='link' size='small' onClick={() => onCadastrar?.(record)}>
          Cadastrar
        </Button>
      )}
    </div>
  )

  const colunaHistorico = {
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
  }

  const colunaAcoes = {
    title: 'Ações',
    key: 'acoes',
    align: 'center',
    width: 120,
    render: (_, record) => {
      const temDiaria = !!record.diaria

      return (
        <Button
          type={temDiaria ? 'default' : 'primary'}
          size='small'
          icon={temDiaria ? <EditOutlined /> : <PlusOutlined />}
          onClick={() => {
            onCadastrar?.(record)
            console.log(record)
          }}
        >
          {temDiaria ? 'Editar' : 'Cadastrar'}
        </Button>
      )
    },
  }

  return [
    {
      title: 'Ano',
      dataIndex: 'ano',
      key: 'ano',
      width: 80,
    },
    {
      title: 'Mês',
      dataIndex: 'mes',
      key: 'mes',
      width: 120,
    },
    {
      title: 'Beneficiário',
      dataIndex: 'beneficiario',
      key: 'beneficiario',
      width: 200,
    },
    {
      title: 'Cargo/Função',
      key: 'cargo',
      width: 200,
      render: (_, record) =>
        record.diaria?.cargo || record.fornecedor?.cargo || renderVazio(record),
    },
    {
      title: 'CPF',
      dataIndex: 'CPF',
      key: 'CPF',
      width: 150,
    },
    {
      title: 'N° Diárias',
      dataIndex: ['diaria', 'quantidade_diarias'],
      key: 'quantidade_diarias',
      align: 'center',
      width: 100,
      render: (qtd) => formatarQuantidade(qtd) ?? renderVazio(),
    },
    {
      title: 'Período',
      key: 'afastamento',
      align: 'center',
      width: 200,
      render: (_, record) => {
        const inicio = record.diaria?.data_inicio
        const fim = record.diaria?.data_fim

        if (!inicio && !fim) return renderVazio(record)

        const formatar = (data) =>
          data ? dayjs(String(data).slice(0, 10)).format('DD/MM/YYYY') : '?'

        return `${formatar(inicio)} à ${formatar(fim)}`
      },
    },
    ...(isPaginaPublica ? [] : [colunaHistorico]),
    {
      title: 'Data Pagamento',
      dataIndex: 'data_pagamento',
      key: 'data_pagamento',
      align: 'center',
    },
    {
      title: 'Valor Pago',
      dataIndex: 'valor_pago',
      key: 'valor_pago',
      align: 'center',
    },
    {
      title: 'Elemento',
      dataIndex: 'elemento',
      key: 'elemento',
      align: 'center',
      width: 150,
    },
    {
      title: 'Local',
      dataIndex: ['diaria', 'local'],
      key: 'local',
      align: 'center',
      width: 200,
      render: (local, record) => local || renderVazio(record),
    },
    {
      title: 'Motivo',
      dataIndex: ['diaria', 'motivo'],
      key: 'motivo',
      align: 'center',
      width: 400,
      render: (motivo, record) => motivo || renderVazio(record),
    },
    ...(isPaginaPublica ? [] : [colunaAcoes]),
  ]
}

export default function DespesasDiariasTable({
  data,
  loading,
  page,
  per_page,
  total,
  onChange,
  onCadastrar,
}) {
  return (
    <TableProvider>
      <Table
        bordered
        dataSource={data}
        columns={columns(onCadastrar)}
        loading={loading}
        scroll={{ x: 'max-content', y: 600 }}
        onChange={onChange}
        pagination={{
          current: page,
          pageSize: per_page,
          total,
          showSizeChanger: true,
          pageSizeOptions: ['5', '10', '20', '50'],
          showTotal: (t, range) => `${range[0]}-${range[1]} de ${t}`,
        }}
        locale={{
          emptyText: (
            <span>
              <Empty description={false} />
              Não houve diárias para o período consultado - dados atualizados em{' '}
              {getCurrentDate()}
            </span>
          ),
        }}
      />
    </TableProvider>
  )
}
