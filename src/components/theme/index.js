import { useState, useEffect, createContext, useContext } from 'react'
import { ConfigProvider, theme } from 'antd'

const ThemeContext = createContext()
export const useTheme = () => useContext(ThemeContext)

function ThemeProvider({ children }) {
  //   const [isDarkMode, setIsDarkMode] = useState(true)
  const [isDarkMode, setIsDarkMode] = useState(() => {
    const savedMode = localStorage.getItem('theme_mode')
    // Se existir 'true', retorna true. Caso contrário, o padrão é true.
    return savedMode !== null ? JSON.parse(savedMode) : true
  })

  const [primaryColor, setPrimaryColor] = useState(() => {
    const savedColor = localStorage.getItem('theme_color')
    return savedColor || '#0b285c'
  })

  const toggleTheme = () => setIsDarkMode((prev) => !prev)

  useEffect(() => {
    localStorage.setItem('theme_mode', JSON.stringify(isDarkMode))
  }, [isDarkMode])

  useEffect(() => {
    localStorage.setItem('theme_color', primaryColor)
  }, [primaryColor])

  return (
    <ThemeContext.Provider
      value={{ isDarkMode, toggleTheme, primaryColor, setPrimaryColor }}
    >
      <ConfigProvider
        theme={{
          token: { colorPrimary: primaryColor },
          algorithm: isDarkMode ? theme.darkAlgorithm : theme.defaultAlgorithm,
          components: {
            Button: { contentLineHeight: 45 },
            Menu: {
              colorBgContainer: primaryColor,
              // Itens normais
              itemColor: '#ffffff',
              itemHoverColor: '#ffffff',
              itemSelectedColor: '#ffffff',
              itemIconColor: '#ffffff',
              itemSelectedIconColor: '#ffffff',
              itemSelectedBg: 'rgba(255,255,255,0.18)',
              itemHoverBg: 'rgba(255,255,255,0.12)',
              // Submenu title
              subMenuItemColor: '#ffffff',
              subMenuItemSelectedColor: '#ffffff',
              subMenuItemHoverColor: '#ffffff',
              // Ícone da seta
              subMenuItemArrowColor: '#ffffff',
            },
          },
        }}
      >
        <div
          style={{
            backgroundColor: isDarkMode ? '#141414' : '#fff',
            minHeight: '100vh',
            color: isDarkMode ? '#fff' : '#000',
            transition: 'all 0.3s ease',
          }}
        >
          {children}
        </div>
      </ConfigProvider>
    </ThemeContext.Provider>
  )
}

export default ThemeProvider
