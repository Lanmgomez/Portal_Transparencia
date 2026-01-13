import { message } from 'antd'
import axios from 'axios'
import Cookies from 'js-cookie'

const BASE_URL = 'https://transparencia-api.viniciusm.com.br/api'

const login_url = `${BASE_URL}/login`
export const logout_url = `${BASE_URL}/logout`
export const users_url = `${BASE_URL}/users`

const PUBLIC_ROUTES = ['/', '/despesas', '/public-receitas-transferencias']

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
  { value: '2025', label: '2025' },
  { value: '2024', label: '2024' },
  { value: '2023', label: '2023' },
  { value: '2022', label: '2022' },
]

export const mouthOption = [
  { value: 'Janeiro', label: 'Janeiro' },
  { value: 'Fevereiro', label: 'Fevereiro' },
  { value: 'Março', label: 'Março' },
  { value: 'Abril', label: 'Abril' },
  { value: 'Maio', label: 'Maio' },
  { value: 'Junho', label: 'Junho' },
  { value: 'Julho', label: 'Julho' },
  { value: 'Agosto', label: 'Agosto' },
  { value: 'Setembro', label: 'Setembro' },
  { value: 'Outubro', label: 'Outubro' },
  { value: 'Novembro', label: 'Novembro' },
  { value: 'Dezembro', label: 'Dezembro' },
]

export function formatCurrencyBR(value) {
  if (value == null) return '-'

  return value.toLocaleString('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  })
}
