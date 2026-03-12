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
  const funcao = empenho?.funcao
  const subfuncao = empenho?.subfuncao
  const numero_empenho = empenho?.numero_empenho
  const tipo_empenho = empenho?.tipo_empenho
  const modalidade_licitacao = empenho?.modalidade_licitacao
  const empenho_key = empenho?.empenho_key
  const data_empenho = empenho?.data_empenho
  const valor_empenhado = empenho?.valor_empenhado
  const cpf_cnpj_credor = empenho?.cpf_cnpj_credor
  const proced_licitacao_ref = empenho?.proced_licitacao_ref
  const descricao = empenho?.descricao
  const natureza_despesa = empenho?.natureza_despesa
  const fonte_recurso = empenho?.fonte_recurso
  const cpf_ordenador = empenho?.cpf_ordenador
  const elemento_despesa_emp = empenho?.elemento_despesa_emp
  const programa_codigo = empenho?.programa_codigo
  const acao_codigo = empenho?.acao_codigo
  const categoria_economica = empenho?.categoria_economica
  const grupo_natureza = empenho?.grupo_natureza
  const modalidade_aplicacao = empenho?.modalidade_aplicacao
  const elemento_despesa = empenho?.elemento_despesa
  const subelemento_despesa = empenho?.subelemento_despesa
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
    empenho_key,
    data_empenho,
    valor_empenhado,
    cpf_cnpj_credor,
    proced_licitacao_ref,
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
