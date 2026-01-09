import { useLocation } from 'react-router-dom'
import './container.css'

export default function Container({ children }) {
  const location = useLocation()

  const route =
    location.pathname === '/despesas' ? 'public-layout' : 'private-layout'

  return <div className={`${route}`}>{children}</div>
}
