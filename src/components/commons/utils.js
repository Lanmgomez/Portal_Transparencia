import { message } from 'antd'
import dayjs from 'dayjs'
import axios from 'axios'
import Cookies from 'js-cookie'

export const BASE_URL = 'https://transparencia-api.iguaracy.pe.leg.br'
/* :
api teste: https://transparencia-api.viniciusm.com.br/api

em prod:
api iguaracy https://transparencia-api.iguaracy.pe.leg.br
api itacuruba: https://transparencia-api.itacuruba.pe.leg.br
*/

const login_url = `${BASE_URL}/login`
export const logout_url = `${BASE_URL}/logout`
export const users_url = `${BASE_URL}/users`
export const receita_transp_url = `${BASE_URL}/receitas-transferencias`
export const receitas_prevista_url = `${BASE_URL}/receitas-previstas`
export const remessas_api = `${BASE_URL}/remessas`
export const empenhos_api = `${BASE_URL}/empenhos`
export const fornecedores_api = `${BASE_URL}/fornecedores`
export const despesas_api = `${BASE_URL}/empenhos?somente_diarias=1`
export const ordem_cronologica_api = `${BASE_URL}/empenhos/ordem-cronologica-pagamentos`

const PUBLIC_ROUTES = [
  '/',
  '/despesas',
  '/public-receitas-transferencias',
  '/public-empenhos',
  '/public-despesas-diarias',
  '/public-ordem-cronologica',
]

export function isPublicRoute(pathname) {
  return PUBLIC_ROUTES.includes(pathname)
}

export function setAuthCookies({ token, id, name, email, role }) {
  const expires = new Date(new Date().getTime() + 3 * 60 * 60 * 1000) // 3 horas

  Cookies.set('token', token, {
    expires,
    secure: true,
    sameSite: 'Strict',
  })

  Cookies.set('user', JSON.stringify({ id, name, email, role }), {
    expires,
    secure: true,
    sameSite: 'Strict',
  })
}

export const userLoggedIn = Cookies.get('user')
  ? JSON.parse(Cookies.get('user'))
  : null

export async function LoginRequest(email, password) {
  try {
    const response = await axios.post(login_url, {
      email,
      password,
    })

    const { token, user } = response.data

    setAuthCookies({
      token,
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
    })

    return user
  } catch (error) {
    throw error
  }
}

export default function getCurrentDate() {
  const hoje = new Date()

  const dia = String(hoje.getDate()).padStart(2, '0')
  const mes = String(hoje.getMonth() + 1).padStart(2, '0')
  const ano = hoje.getFullYear()

  const dataAtual = `${dia}/${mes}/${ano}`

  return dataAtual
}

export function HttpRequest(request_method, url, values) {
  const token = Cookies.get('token')

  const Headers = {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  }

  const methods = {
    GET: () => axios.get(url, Headers),
    POST: () => axios.post(url, values, Headers),
    PUT: () => axios.put(url, values, Headers),
    PATCH: () => axios.patch(url, values, Headers),
    DELETE: () => axios.delete(url, Headers),
  }

  if (!methods[request_method]) {
    throw new Error(`Método HTTP não suportado: ${request_method}`)
  }

  return methods[request_method]()
}

export function postFormData(url, values) {
  const token = Cookies.get('token')

  const Headers = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }

  return axios.post(url, values, Headers)
}

export function toast(msg) {
  message.success(msg)
  window.history.back()
}

export function ErrorMessage(err) {
  // Se for erro do axios
  if (axios.isAxiosError(err)) {
    const data = err.response?.data

    // 1) Preferir a message do backend
    if (data?.message) {
      message.error(data.message)
      return
    }

    // 2) Se vier errors por campo, mostrar a primeira mensagem
    const firstFieldError = data?.errors
      ? Object.values(data.errors).flat()[0]
      : undefined

    if (firstFieldError) {
      message.error(firstFieldError)
      return
    }

    // 3) Fallback
    message.error(err.message)
    return
  }

  // Se não for axios, fallback genérico
  message.error('Erro inesperado ao processar a requisição.')
}

export const yearOption = [
  { value: 2026, label: '2026' },
  { value: 2025, label: '2025' },
  { value: 2024, label: '2024' },
  { value: 2023, label: '2023' },
  { value: 2022, label: '2022' },
]

export const mouthOption = [
  { value: 1, label: 'Janeiro' },
  { value: 2, label: 'Fevereiro' },
  { value: 3, label: 'Março' },
  { value: 4, label: 'Abril' },
  { value: 5, label: 'Maio' },
  { value: 6, label: 'Junho' },
  { value: 7, label: 'Julho' },
  { value: 8, label: 'Agosto' },
  { value: 9, label: 'Setembro' },
  { value: 10, label: 'Outubro' },
  { value: 11, label: 'Novembro' },
  { value: 12, label: 'Dezembro' },
]

export function formatCurrencyBR(value) {
  if (value == null) return '-'

  const valor = Number(value)

  return valor.toLocaleString('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  })
}

export function formatDateBR(value) {
  if (!value) return ''
  // ISO -> DD/MM/YYYY
  const d = dayjs(value)
  return d.isValid() ? d.format('DD/MM/YYYY') : ''
}

// seu data pode ser objeto indexado OU array:
export function normalizeData(data) {
  if (Array.isArray(data)) return data
  if (data && typeof data === 'object') return Object.values(data)
  return []
}

export const toNumber = (v) => {
  if (v == null || v === '') return 0
  // se vier como texto com "1.234,56"
  const normalized = String(v).replace(/\./g, '').replace(',', '.')
  const n = Number(normalized)
  return Number.isNaN(n) ? 0 : n
}

export const formatBR = (value) =>
  Number(value).toLocaleString('pt-BR', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })

export const formatDecimal = (value) => Number(value).toFixed(2)

export const parseBRMoneyToNumber = (value) => {
  if (value === null || value === undefined || value === '') return 0

  // Se já for number, ok:
  if (typeof value === 'number') return Number(value.toFixed(2))

  // Se for string (ex: "1.234,56" ou "1234,56" ou "1234.56")
  const str = String(value).trim()

  // remove tudo que não for número, vírgula, ponto, sinal negativo
  const cleaned = str.replace(/[^\d,.-]/g, '')

  // padrão BR: "." milhar e "," decimal
  // transforma "1.234,56" -> "1234.56"
  const normalized = cleaned.replace(/\./g, '').replace(',', '.')

  const num = Number(normalized)
  if (Number.isNaN(num)) return 0

  return Number(num.toFixed(2))
}

export function maskCNPJ(value) {
  if (!value) return ''

  const cnpj = value.replace(/\D/g, '')

  return cnpj
    .replace(/^(\d{2})(\d)/, '$1.$2')
    .replace(/^(\d{2})\.(\d{3})(\d)/, '$1.$2.$3')
    .replace(/\.(\d{3})(\d)/, '.$1/$2')
    .replace(/(\d{4})(\d)/, '$1-$2')
}

export function maskCPF(value) {
  if (!value) return ''

  const cpf = value.replace(/\D/g, '')

  return cpf
    .replace(/(\d{3})(\d)/, '$1.$2')
    .replace(/(\d{3})(\d)/, '$1.$2')
    .replace(/(\d{3})(\d{1,2})$/, '$1-$2')
}

const formatEmpenho = (item) => {
  const [ano] = item.data_empenho.split('-')

  return {
    ...item,
    ano,
    mes: nomeMes(item.mes),
    beneficiario: item.fornecedor.nome,
    cpf_cnpj_credor: hideCpf(item.cpf_cnpj_credor),
    data_empenho: formatDateBR(item.data_empenho),
    valor_empenhado: formatCurrencyBR(item.valor_empenhado),
    pagamento: formatCurrencyBR(item.resumo_pagamento.total_pago),
    dataPagamento: formatDateBR(item.pagamentos[0]?.data_pagamento),
    receita_mensal_prevista: formatCurrencyBR(item.receita_mensal_prevista),
    licitacao: item.modalidade_licitacao_descricao,
    elemento: item.natureza_despesa_detalhada.elemento.descricao,
    funcao: item.funcao_descricao,
    subFuncao: item.subfuncao_descricao,
    fonte_recurso: item.fonte_recurso_descricao,
    natureza_despesa: item.natureza_despesa_detalhada.grupo.descricao,
    categoriaEconomica: item.natureza_despesa_detalhada.categoria.descricao,
    receita_realizada: formatCurrencyBR(item.receita_realizada),
    receita_acumulada: formatCurrencyBR(item.receita_acumulada),
    valor_liquidaçao: formatCurrencyBR(item.resumo_liquidacao.total_liquidado),
    acumulada_com_extra_orcamentaria: formatCurrencyBR(
      item.acumulada_com_extra_orcamentaria,
    ),
    receita_extra_orcamentaria: formatCurrencyBR(
      item.receita_extra_orcamentaria,
    ),
    unidade_orcamentaria: item.unidade_orcamentaria.denominacao,
  }
}

export const mapEmpenhos = (list) =>
  Array.isArray(list) ? list.map(formatEmpenho) : []

export function formatYearMonth(value) {
  if (!value) return ''

  const [year, month] = value.split('-')
  return `${month}/${year}`
}

export const nomeMes = (value) => {
  if (value === 1) return 'Janeiro'
  if (value === 2) return 'Fevereiro'
  if (value === 3) return 'Março'
  if (value === 4) return 'Abril'
  if (value === 5) return 'Maio'
  if (value === 6) return 'Junho'
  if (value === 7) return 'Julho'
  if (value === 8) return 'Agosto'
  if (value === 9) return 'Setembro'
  if (value === 10) return 'Outubro'
  if (value === 11) return 'Novembro'
  if (value === 12) return 'Dezembro'

  return ''
}

export const hideCpf = (value) => {
  const onlyNumbers = String(value).replace(/\D/g, '')
  const path = window.location.pathname

  if (onlyNumbers.length === 11) {
    if (isPublicRoute(path)) {
      return onlyNumbers.replace(
        /^(\d{3})(\d{3})(\d{3})(\d{2})$/,
        '***.***.$3-**',
      )
    }

    return onlyNumbers.replace(/^(\d{3})(\d{3})(\d{3})(\d{2})$/, '$1.$2.$3-$4')
  }

  return maskCNPJ(value)
}
