import { PrivateRoutesAuth } from './privateRoutesAuth'
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom'
import { LoginPage } from '../login/login'
import { isPublicRoute } from '../components/commons/utils'
import HomePage from '../home/home'
import SideBarMenu from '../components/SideBarMenu/sidebarMenu'
import ConfiguracoesPage from '../configuracoes/configuracoes'
import MeuPerfilPage from '../meuPerfil/MeuPerfil'
import DespesasPage from '../despesas/despesas'
import UsuariosCadastrados from '../usuariosCadastrados/usuariosCadastrados'
import CriarUsuario from '../criarUsuario/criarUsuario'
import EditarUsuario from '../editar-usuario/editarUsuario'
import ReceitasPage from '../receitas/receitas'
import ReceitasPublicPage from '../receitas/public-route/publicRoute'
import CadastrarReceitasPage from '../receitas/cadastrar-nova-receita/cadastrarReceita'

function SidebarWrapper() {
  const location = useLocation()

  if (isPublicRoute(location.pathname)) {
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
        <Route
          path='/public-receitas-transferencias'
          element={<ReceitasPublicPage />}
        />

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
          path='/receitas-transferencias'
          element={
            <PrivateRoutesAuth>
              <ReceitasPage />
            </PrivateRoutesAuth>
          }
        />
        <Route
          path='/cadastrar-nova-receita-transferencia'
          element={
            <PrivateRoutesAuth>
              <CadastrarReceitasPage />
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
        <Route
          path='/editar-usuario/:id'
          element={
            <PrivateRoutesAuth>
              <EditarUsuario />
            </PrivateRoutesAuth>
          }
        />
      </Routes>

      <SidebarWrapper />
    </BrowserRouter>
  )
}
