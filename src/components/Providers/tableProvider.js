import { ConfigProvider } from 'antd'

export default function TableProvider({ children }) {
  return (
    <ConfigProvider
      theme={{
        components: {
          Table: {
            borderColor: '#bfbfbf', // cor das linhas (padrão é bem clara)
            headerSplitColor: '#bfbfbf', // divisória entre colunas do cabeçalho
            headerBg: '#fafafa',
          },
        },
      }}
    >
      {children}
    </ConfigProvider>
  )
}
