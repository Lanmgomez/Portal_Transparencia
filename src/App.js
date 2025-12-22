import AppRoutes from './routes/AppRoutes'
import ThemeProvider from './components/theme'
import './App.css'

function App() {
  return (
    <ThemeProvider>
      <div className='App'>
        <AppRoutes />
      </div>
    </ThemeProvider>
  )
}

export default App
