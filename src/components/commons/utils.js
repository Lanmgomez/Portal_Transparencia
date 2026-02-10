import { message } from 'antd'
import dayjs from 'dayjs'
import axios from 'axios'
import Cookies from 'js-cookie'

const BASE_URL = 'https://transparencia-api.viniciusm.com.br/api'

const login_url = `${BASE_URL}/login`
export const logout_url = `${BASE_URL}/logout`
export const users_url = `${BASE_URL}/users`
export const receita_transp_url = `${BASE_URL}/receitas-transferencias`
export const receitas_prevista_url = `${BASE_URL}/receitas-previstas`
export const remessas_api = `${BASE_URL}/remessas`
export const empenhos_api = `${BASE_URL}/empenhos`

const PUBLIC_ROUTES = [
  '/',
  '/despesas',
  '/public-receitas-transferencias',
  '/public-empenhos',
]

export function isPublicRoute(pathname) {
  return PUBLIC_ROUTES.includes(pathname)
}

export function setAuthCookies({ token, id, name, email, role }) {
  Cookies.set('token', token, {
    expires: 7,
    secure: true,
    sameSite: 'Strict',
  })

  Cookies.set('user', JSON.stringify({ id, name, email, role }), {
    expires: 7,
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
