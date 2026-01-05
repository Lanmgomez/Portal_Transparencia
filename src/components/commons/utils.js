import axios from 'axios'

const BASE_URL = 'https://transparencia-api.viniciusm.com.br/api'

const login_url = `${BASE_URL}/login`
export const logout_url = `${BASE_URL}/logout`

export async function LoginRequest(email, password) {
  try {
    const response = await axios.post(login_url, {
      email,
      password,
    })

    const { token, user } = response.data

    localStorage.setItem('token', token)

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
