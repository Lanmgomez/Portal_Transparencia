import { Outlet } from 'react-router-dom'
import SideBarMenu from '../SideBarMenu/sidebarMenu'

export function MainLayout() {
  return (
    <div style={{ display: 'flex' }}>
      <SideBarMenu />

      <main style={{ flex: 1 }}>
        <Outlet />
      </main>
    </div>
  )
}
