import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import PageTitle from '../../../components/PageTitle/pageTitle'
import useFornecedoresData from '../hook/useFornecedorData'
import FornecedoresTable from '../table/columns'
import { useMutation } from '@tanstack/react-query'
import {
  ErrorMessage,
  fornecedores_api,
  HttpRequest,
} from '../../../components/commons/utils'

export default function MainPage() {
  const navigate = useNavigate()
  const [page, setPage] = useState(1)
  const [perPage, setPerPage] = useState(20)

  const { fornecedores, total, isLoading, isError } = useFornecedoresData(
    page,
    perPage,
  )

  const deleteFornecedor = useMutation({
    mutationFn: (id) => HttpRequest('DELETE', `${fornecedores_api}/${id}`),
    onSuccess: () => window.location.reload(),
    onError: (error) => ErrorMessage(error),
  })

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
        loading={isLoading}
        page={page}
        perPage={perPage}
        total={total}
        // total={tableTotal}
        onChange={handleTableChange}
        onEdit={navigate}
        onDelete={(id) => deleteFornecedor.mutate(id)}
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
