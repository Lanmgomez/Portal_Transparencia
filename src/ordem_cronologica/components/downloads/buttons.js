import { Space, Button } from 'antd'
import { Excel_Download_Ordem_Cronologica } from './excel-download'
import { PDF_Download_Ordem_Cronologica } from './pdf-download'
import { ODT_Download_Ordem_Cronologica } from './word-download'
import { TXT_Download_Ordem_Cronologica } from './txt-download'
import { useOrdemCronologicaExport } from '../hooks/useOrdemCronologicaExport'
import {
  FileExcelOutlined,
  FilePdfOutlined,
  FileTextOutlined,
  FileWordOutlined,
} from '@ant-design/icons'

export default function DownloadsButtons({ filters }) {
  const { export_data } = useOrdemCronologicaExport(filters)

  const handleExport = async (type, export_data) => {
    switch (type) {
      case 'csv':
        Excel_Download_Ordem_Cronologica(export_data)
        break
      case 'pdf':
        PDF_Download_Ordem_Cronologica(export_data)
        break
      case 'odt':
        ODT_Download_Ordem_Cronologica(export_data)
        break
      case 'txt':
        TXT_Download_Ordem_Cronologica(export_data)
        break
    }
  }

  return (
    <Space style={{ marginBottom: 50 }} size='large' wrap>
      <span>Exportar arquivo para:</span>

      <Button
        style={{
          backgroundColor: '#1D6F42',
          borderColor: '#1D6F42',
          color: 'white',
        }}
        size='large'
        icon={<FileExcelOutlined />}
        onClick={() => handleExport('csv', export_data)}
      >
        Formato .CSV
      </Button>

      <Button
        style={{
          backgroundColor: '#FF0000',
          borderColor: '#FF0000',
          color: 'white',
        }}
        size='large'
        icon={<FilePdfOutlined />}
        onClick={() => handleExport('pdf', export_data)}
      >
        Formato .PDF
      </Button>

      <Button
        style={{
          backgroundColor: '#4472C4',
          borderColor: '#4472C4',
          color: 'white',
        }}
        size='large'
        icon={<FileWordOutlined />}
        onClick={() => handleExport('odt', export_data)}
      >
        Formato .ODT
      </Button>

      <Button
        style={{
          backgroundColor: 'lightgray',
          borderColor: 'lightgray',
        }}
        size='large'
        icon={<FileTextOutlined />}
        onClick={() => handleExport('txt', export_data)}
      >
        Formato .TXT
      </Button>
    </Space>
  )
}
