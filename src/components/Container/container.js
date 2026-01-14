import { useLocation } from 'react-router-dom'
import { isPublicRoute } from '../commons/utils'
import './container.css'

export default function Container({ children }) {
  const location = useLocation()

  const routeClass = isPublicRoute(location.pathname)
    ? 'public-layout'
    : 'private-layout'

  return <div className={routeClass}>{children}</div>
}
