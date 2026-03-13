import { useState } from 'react'
import PageTitle from '../../../components/PageTitle/pageTitle'
import useFornecedoresData from '../hook/useFornecedorData'
import FornecedoresTable from '../table/columns'

export default function MainPage() {
  const [page, setPage] = useState(1)
  const [perPage, setPerPage] = useState(20)

  const { fornecedores, isLoading, isError } = useFornecedoresData(
    page,
    perPage,
  )
  const renderFornecedoresTable = () => {
    // const isSearching = Object.values(filters).some(
    //   (v) => v !== undefined && v !== null && v !== '',
    // )

    // const tableData = isSearching ? searched : empenhos
    // const tableTotal = isSearching ? searchedTotal : total

    return (
      <FornecedoresTable
        data={fornecedores}
        // loading={isLoading || searchLoading}
        // page={page}
        // perPage={perPage}
        // total={tableTotal}
        // onChange={handleTableChange}
        // openModal={setIsModalOpen}
        // openLiqPgtModal={setIsLiqPgtModal}
        // setId={setId}
      />
    )
  }

  return (
    <div>
      <PageTitle title='Fornecedores / Beneficiários' />

      <h3>Informações</h3>
      <p>Para visualizar melhor as informações, arraste para a direita</p>

      {renderFornecedoresTable()}
    </div>
  )
}
