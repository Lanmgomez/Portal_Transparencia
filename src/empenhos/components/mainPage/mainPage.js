import { useState } from 'react'
import { Modal } from 'antd'
import PageTitle from '../../../components/PageTitle/pageTitle'
import Filtros, { FiltersOptions } from '../filtros/filtros'
import useEmpenhosData from '../hooks/useEmpenhosData'
import HoverMe from '../hoverMe/hoverMe'
import EmpenhosTable from '../table/columns'
import useSearchQuery from '../hooks/useSearchQuery'
import ModalContent from '../modalContent/modalContent'
import LiquidacaoPagamentoModal from '../modalContent/LiquidacaoPagamentoModal'

export default function MainPage() {
  const [page, setPage] = useState(1)
  const [perPage, setPerPage] = useState(20)
  const [filters, setFilters] = useState(FiltersOptions)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [liqPgtModal, setIsLiqPgtModal] = useState(false)
  const [id, setId] = useState('')

  const { empenhos, total, isLoading } = useEmpenhosData(page, perPage)
  const { searched, searchLoading, searchedTotal } = useSearchQuery(
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

    setFilters((prev) => ({
      ...prev,
      ...values,
    }))

    setPage(1)
  }

  const renderEmpenhosTable = () => {
    const isSearching = Object.values(filters).some(
      (v) => v !== undefined && v !== null && v !== '',
    )

    const tableData = isSearching ? searched : empenhos
    const tableTotal = isSearching ? searchedTotal : total

    return (
      <EmpenhosTable
        data={tableData}
        loading={isLoading || searchLoading}
        page={page}
        perPage={perPage}
        total={tableTotal}
        onChange={handleTableChange}
        openModal={setIsModalOpen}
        openLiqPgtModal={setIsLiqPgtModal}
        setId={setId}
      />
    )
  }

  const hide = window.location.pathname === '/public-empenhos' ? true : false

  return (
    <div>
      {!hide && <HoverMe />}
      <PageTitle title='Empenhos' />

      <h4>
        Para acessar mais informações vá até o final da página, existe uma barra
        de rolagem horizontal para mais detalhes sobre cada informação
        pesquisada
      </h4>

      <Filtros
        onSearch={onSearch}
        setFilters={setFilters}
        data={empenhos || searched}
      />

      <h3>Informações</h3>
      <p>Para visualizar melhor as informações, arraste para a direita</p>

      {renderEmpenhosTable()}

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
