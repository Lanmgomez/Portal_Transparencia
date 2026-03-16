import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useMutation } from '@tanstack/react-query'
import HoverMe from '../hoverMe/hoverMe'
import PageTitle from '../../../components/PageTitle/pageTitle'
import useFornecedoresData from '../hook/useFornecedorData'
import FornecedoresTable from '../table/columns'
import useSearchQuery from '../hook/useSearchQuery'
import Filtros, { FiltersOptions } from '../filtros/filtros'
import {
  ErrorMessage,
  fornecedores_api,
  HttpRequest,
} from '../../../components/commons/utils'

export default function MainPage() {
  const navigate = useNavigate()
  const [page, setPage] = useState(1)
  const [perPage, setPerPage] = useState(20)
  const [filters, setFilters] = useState(FiltersOptions)

  const { fornecedores, total, isLoading } = useFornecedoresData(page, perPage)

  const { searched, searchLoading, searchedTotal } = useSearchQuery(
    filters,
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

  const onSearch = (values) => {
    if (!values) return

    setFilters((prev) => ({
      ...prev,
      ...values,
    }))

    setPage(1)
  }

  const renderFornecedoresTable = () => {
    const isSearching = Object.values(filters).some(
      (v) => v !== undefined && v !== null && v !== '',
    )

    const tableData = isSearching ? searched : fornecedores
    const tableTotal = isSearching ? searchedTotal : total

    return (
      <FornecedoresTable
        data={tableData}
        loading={isLoading || searchLoading}
        page={page}
        perPage={perPage}
        total={tableTotal}
        onChange={handleTableChange}
        onEdit={navigate}
        onDelete={(id) => deleteFornecedor.mutate(id)}
      />
    )
  }

  return (
    <div>
      <HoverMe />
      <PageTitle title='Fornecedores / Beneficiários' />

      <h3>Informações</h3>
      <p>Para visualizar melhor as informações, arraste para a direita</p>

      <Filtros onSearch={onSearch} setFilters={setFilters} />

      {renderFornecedoresTable()}
    </div>
  )
}
