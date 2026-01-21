import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Form, Skeleton, Modal } from 'antd'
import { ReceitaPrevistaCard } from '../card/card'
import PageTitle from '../../../components/PageTitle/pageTitle'
import ReceitasTable from '../table/columns'
import Filtros from '../filtros/filtros'
import HoverMe from '../hoverMe/hoverMe'
import useReceitasData from '../hooks/useReceitasData'
import ModalContent from '../ModalContent/ModalContent'
import './mainPage.css'
import { useMutation } from '@tanstack/react-query'
import {
  ErrorMessage,
  HttpRequest,
  receita_transp_url,
} from '../../../components/commons/utils'

export const filters_values = {
  ano: '',
  mes: '',
  descricao: '',
  unidade_recebedora: '',
  per_page: 10,
}

export default function MainPage() {
  const navigate = useNavigate()
  const [form] = Form.useForm()
  const [filters, setFilters] = useState(filters_values)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [id, setId] = useState('')

  const { receitas, refetch, isLoading } = useReceitasData(filters)

  const deleteReceita = useMutation({
    mutationFn: () => HttpRequest('DELETE', `${receita_transp_url}/${id}`),
    onSuccess: () => window.location.reload(),
    onError: (error) => ErrorMessage(error),
  })

  const onSearch = async (values) => {
    if (!values) return

    setFilters({
      ano: values.ano ?? '',
      mes: values.mes ?? '',
      descricao: values.descricao ?? '',
      unidade_recebedora: values.unidade_recebedora ?? '',
      per_page: values.per_page ?? 10,
    })

    await refetch()
  }

  const hide =
    window.location.pathname === '/public-receitas-transferencias'
      ? true
      : false

  return (
    <div>
      {!hide && <HoverMe />}

      <PageTitle title='Receitas / Transferências' />

      <ReceitaPrevistaCard hide={hide} />

      <Filtros form={form} onSearch={onSearch} setFilters={setFilters} />

      <h3>Informações</h3>
      {isLoading ? (
        <Skeleton />
      ) : (
        <ReceitasTable
          data={receitas}
          onEdit={navigate}
          onDelete={() => deleteReceita.mutate()}
          openModal={setIsModalOpen}
          setId={setId}
          hide={hide}
        />
      )}

      <Modal
        title='Informações Gerais'
        open={isModalOpen}
        onOk={() => setIsModalOpen(false)}
        cancelButtonProps={{ style: { display: 'none' } }}
        okText='Fechar'
      >
        <ModalContent id={id} />
      </Modal>
    </div>
  )
}
