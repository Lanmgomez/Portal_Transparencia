import { Navigate } from 'react-router-dom'

export function PrivateRoutesAuth({ children }) {
  const user = JSON.parse(localStorage.getItem('user_logged'))

  return user?.isAuth ? children : <Navigate to='/' />
}
