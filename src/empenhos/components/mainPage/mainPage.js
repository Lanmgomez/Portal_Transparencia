import { useState } from 'react'
import { Modal } from 'antd'
import { formatCurrencyBR } from '../../../components/commons/utils'
import PageTitle from '../../../components/PageTitle/pageTitle'
import Filtros, { FiltersOptions } from '../filtros/filtros'
import useEmpenhosData from '../hooks/useEmpenhosData'
import HoverMe from '../hoverMe/hoverMe'
import EmpenhosTable from '../table/columns'
import ModalContent from '../modalContent/modalContent'
import LiquidacaoPagamentoModal from '../modalContent/LiquidacaoPagamentoModal'
import DownloadsButtons from '../downloads/buttons'
import DashboardCards from '../dashboardCards/dashboard'

export default function MainPage() {
  const [page, setPage] = useState(1)
  const [perPage, setPerPage] = useState(100)
  const [filters, setFilters] = useState(FiltersOptions)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [liqPgtModal, setIsLiqPgtModal] = useState(false)
  const [id, setId] = useState('')

  const { empenhos, total, totais, isLoading } = useEmpenhosData(
    filters,
    page,
    perPage,
  )

  const handleTableChange = (pagination) => {
    const nextPage = pagination.current
    const nextPerPage = pagination.pageSize

    if (nextPerPage !== perPage) {
      setPerPage(nextPerPage)
      setPage(1)
      return
    }

    setPage(nextPage)
  }

  const onSearch = (values) => {
    if (!values) return
    setFilters(values)
    setPage(1)
  }

  const hide = window.location.pathname === '/public-empenhos' ? true : false

  return (
    <div>
      {!hide && <HoverMe />}

      <PageTitle title='Empenhos' />

      <Filtros onSearch={onSearch} setFilters={setFilters} />

      <DashboardCards
        total_empenhado={formatCurrencyBR(totais?.total_empenhado)}
        total_liquidado={formatCurrencyBR(totais?.total_liquidado)}
        total_pago={formatCurrencyBR(totais?.total_pago)}
      />

      <DownloadsButtons filters={filters} />

      <h3>Informações</h3>
      <p>
        Para acessar todas as informações disponíveis, utilize as barras de
        rolagem horizontais localizadas na parte superior e inferior da tela de
        detalhamento do empenho. Deslize a barra para os lados para visualizar
        integralmente os dados de cada informação pesquisada.
      </p>

      <EmpenhosTable
        data={empenhos}
        loading={isLoading}
        page={page}
        perPage={perPage}
        total={total || totais}
        onChange={handleTableChange}
        openModal={setIsModalOpen}
        openLiqPgtModal={setIsLiqPgtModal}
        setId={setId}
      />

      <Modal
        title='Informações Gerais'
        open={isModalOpen}
        onOk={() => setIsModalOpen(false)}
        onCancel={() => setIsModalOpen(false)}
        cancelButtonProps={{ style: { display: 'none' } }}
        okText='Fechar'
        style={{ top: 24 }}
        width={820}
        bodyStyle={{
          maxHeight: '70vh', // 👈 limita altura
          overflowY: 'auto', // 👈 scroll interno
          padding: 16,
        }}
      >
        <ModalContent id={id} />
      </Modal>

      <Modal
        title='Registro de Liquidação e Pagamento'
        open={liqPgtModal}
        onOk={() => setIsLiqPgtModal(false)}
        onCancel={() => setIsLiqPgtModal(false)}
        cancelButtonProps={{ style: { display: 'none' } }}
        okText='Fechar'
        style={{ top: 24 }}
        width={820}
        bodyStyle={{
          maxHeight: '70vh', // 👈 limita altura
          overflowY: 'auto', // 👈 scroll interno
          padding: 16,
        }}
      >
        <LiquidacaoPagamentoModal id={id} />
      </Modal>
    </div>
  )
}
