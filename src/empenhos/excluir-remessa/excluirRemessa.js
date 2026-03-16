import { useState } from 'react'
import { useMutation } from '@tanstack/react-query'
import Container from '../../components/Container/container'
import ExcluirRemessaTable from '../components/table/excluirRemessaColumns'
import useRemessaData from '../components/hooks/useRemessaData'
import {
  ErrorMessage,
  HttpRequest,
  remessas_api,
  toast,
} from '../../components/commons/utils'

export default function ExcluirRemessa() {
  const [page, setPage] = useState(1)
  const [perPage, setPerPage] = useState(20)
  const [id, setId] = useState('')

  const { remessas, total, isLoading } = useRemessaData(page, perPage)

  const deleteRemessas = useMutation({
    mutationFn: () => HttpRequest('DELETE', `${remessas_api}/${id}`),
    onSuccess: () => {
      toast('Remessa deletada com sucesso!')
    },
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

  return (
    <Container>
      <h1>Excluir remessa</h1>

      <ExcluirRemessaTable
        data={remessas}
        loading={isLoading}
        page={page}
        perPage={perPage}
        total={total}
        onChange={handleTableChange}
        onDelete={() => deleteRemessas.mutate()}
        setId={setId}
      />
    </Container>
  )
}
