import { useQuery } from '@tanstack/react-query'
import {
  empenhos_api,
  formatDateBR,
  HttpRequest,
} from '../../../components/commons/utils'

export default function useEmpenhoDataByID({ id }) {
  const { data, isLoading, isError } = useQuery({
    queryKey: ['empenhos_id', id],
    queryFn: () => HttpRequest('GET', `${empenhos_api}/${id}`),
  })

  const empenho = data?.data
  const ano = empenho?.ano
  const mes = empenho?.mes
  const fornecedor = empenho?.fornecedor?.nome
  const competencia = empenho?.competencia
  const unidade_codigo = empenho?.unidade_codigo
  const funcao = empenho?.funcao_descricao
  const subfuncao = empenho?.subfuncao_descricao
  const numero_empenho = empenho?.numero_empenho
  const tipo_empenho = empenho?.tipo_empenho_descricao
  const modalidade_licitacao = empenho?.modalidade_licitacao_descricao
  const data_empenho = empenho?.data_empenho
  const valor_empenhado = empenho?.valor_empenhado
  const cpf_cnpj_credor = empenho?.cpf_cnpj_credor
  const descricao = empenho?.descricao
  const natureza_despesa =
    empenho?.natureza_despesa_detalhada?.categoria?.descricao
  const fonte_recurso = empenho?.fonte_recurso_descricao
  const cpf_ordenador = empenho?.cpf_ordenador
  const elemento_despesa_emp =
    empenho?.natureza_despesa_detalhada?.elemento?.descricao
  const programa_codigo = empenho?.programa_codigo
  const acao_codigo = empenho?.acao_codigo
  const categoria_economica = empenho?.categoria_economica
  const grupo_natureza = empenho?.natureza_despesa_detalhada?.grupo?.descricao
  const modalidade_aplicacao =
    empenho?.natureza_despesa_detalhada?.modalidade?.descricao
  const elemento_despesa =
    empenho?.natureza_despesa_detalhada?.elemento?.descricao
  const subelemento_despesa =
    empenho?.natureza_despesa_detalhada?.subelemento?.descricao
  const created_at = empenho?.created_at

  const total_liquidado = empenho?.liquidacoes?.reduce(
    (acc, item) => acc + Number(item.valor_liquidado || 0),
    0,
  )

  // liquidação
  const liquidacao = empenho?.liquidacoes?.map((item) => ({
    ano: item.ano,
    numero: item.numero_liquidacao,
    data_liquidacao: formatDateBR(item.data_liquidacao),
    valor_liquidado: item.valor_liquidado,
  }))

  // pagamentos
  const pagamentos = empenho?.pagamentos?.map((item) => ({
    ano: item.ano,
    empenho: item.numero_empenho,
    data_pagamento: formatDateBR(item.data_pagamento),
    numero_parcela: item.numero_parcela,
    valor_pago: item.valor_pago,
  }))

  // items_pagamento
  const valor_parcela = empenho?.itens_pagamento?.map((item) => ({
    valor_pago: item.valor_pagamento,
  }))

  return {
    ano,
    mes,
    competencia,
    fornecedor,
    unidade_codigo,
    funcao,
    subfuncao,
    numero_empenho,
    tipo_empenho,
    modalidade_licitacao,
    data_empenho,
    valor_empenhado,
    cpf_cnpj_credor,
    descricao,
    natureza_despesa,
    fonte_recurso,
    cpf_ordenador,
    elemento_despesa_emp,
    programa_codigo,
    acao_codigo,
    categoria_economica,
    grupo_natureza,
    modalidade_aplicacao,
    elemento_despesa,
    subelemento_despesa,
    liquidacao,
    total_liquidado,
    valor_parcela,
    pagamentos,
    created_at,
    isLoading,
    isError,
  }
}
