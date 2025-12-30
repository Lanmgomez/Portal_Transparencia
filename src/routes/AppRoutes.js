import { PrivateRoutesAuth } from './privateRoutesAuth'
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom'
import { LoginPage } from '../login/login'
import HomePage from '../home/home'
import SideBarMenu from '../components/SideBarMenu/sidebarMenu'
import ConfiguracoesPage from '../configuracoes/configuracoes'
import MeuPerfilPage from '../meuPerfil/MeuPerfil'

function SidebarWrapper() {
  const location = useLocation()

  if (location.pathname === '/') {
    return null
  }

  return <SideBarMenu />
}

export default function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<LoginPage />} />

        <Route
          path='/home'
          element={
            <PrivateRoutesAuth>
              <HomePage />
            </PrivateRoutesAuth>
          }
        />
        <Route
          path='/configuracoes'
          element={
            <PrivateRoutesAuth>
              <ConfiguracoesPage />
            </PrivateRoutesAuth>
          }
        />
        <Route
          path='/meu-perfil'
          element={
            <PrivateRoutesAuth>
              <MeuPerfilPage />
            </PrivateRoutesAuth>
          }
        />
      </Routes>

      <SidebarWrapper />
    </BrowserRouter>
  )
}
