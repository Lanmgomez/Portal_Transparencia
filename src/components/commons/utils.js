import { message } from 'antd'
import axios from 'axios'
import Cookies from 'js-cookie'

const BASE_URL = 'https://transparencia-api.viniciusm.com.br/api'

const login_url = `${BASE_URL}/login`
export const logout_url = `${BASE_URL}/logout`
export const users_url = `${BASE_URL}/users`

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

export async function getData(url) {
  const token = Cookies.get('token')

  const data = await axios.get(url, {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  })

  return data
}

export async function updateData(url, values) {
  const token = Cookies.get('token')

  const data = await axios.put(url, values, {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  })

  return data
}

export function toast(msg) {
  message.success(msg)
  window.history.back()
}
