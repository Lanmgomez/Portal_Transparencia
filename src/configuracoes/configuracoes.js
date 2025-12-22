import { Switch, Card, ColorPicker } from 'antd'
import { useTheme } from '../components/theme'
import Container from '../components/Container/container'
import './configuracoes.css'

export default function ConfiguracoesPage() {
  const { isDarkMode, toggleTheme, primaryColor, setPrimaryColor } = useTheme()

  return (
    <Container>
      <h1>Configurações</h1>

      <Card title='Tema' className='card'>
        <span className='span'>Modo Claro / Escuro</span>
        <Switch checked={isDarkMode} onChange={toggleTheme} />
      </Card>

      <Card title='Cor dos Menus e Botões' className='card'>
        <ColorPicker
          value={primaryColor}
          onChange={(color) => setPrimaryColor(color.toHexString())}
          showText
        />
      </Card>
    </Container>
  )
}
