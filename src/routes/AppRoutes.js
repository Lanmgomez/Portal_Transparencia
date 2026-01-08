import { PrivateRoutesAuth } from './privateRoutesAuth'
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom'
import { LoginPage } from '../login/login'
import HomePage from '../home/home'
import SideBarMenu from '../components/SideBarMenu/sidebarMenu'
import ConfiguracoesPage from '../configuracoes/configuracoes'
import MeuPerfilPage from '../meuPerfil/MeuPerfil'
import DespesasPage from '../despesas/despesas'
import UsuariosCadastrados from '../usuariosCadastrados/usuariosCadastrados'
import CriarUsuario from '../components/criarUsuario/criarUsuario'

function SidebarWrapper() {
  const location = useLocation()

  if (location.pathname === '/') {
    return null
  }

  if (location.pathname === '/despesas') {
    return null
  }

  return <SideBarMenu />
}

export default function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        {/** Public routes */}
        <Route path='/' element={<LoginPage />} />
        <Route path='/despesas' element={<DespesasPage />} />

        {/** Private routes */}
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
        <Route
          path='/usuarios-cadastrados'
          element={
            <PrivateRoutesAuth>
              <UsuariosCadastrados />
            </PrivateRoutesAuth>
          }
        />
        <Route
          path='/criar-novo/usuario'
          element={
            <PrivateRoutesAuth>
              <CriarUsuario />
            </PrivateRoutesAuth>
          }
        />
      </Routes>

      <SidebarWrapper />
    </BrowserRouter>
  )
}
