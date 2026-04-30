import { Space, Button } from 'antd'
import { Excel_Download_Despesas } from './excel-download'
import { PDF_Download_Despesas } from './pdf-download'
import { ODT_Download_Despesas } from './word-download'
import { TXT_Download_Despesas } from './txt-download'
import {
  FileExcelOutlined,
  FilePdfOutlined,
  FileTextOutlined,
  FileWordOutlined,
} from '@ant-design/icons'

export default function DownloadsButtons({ filters, export_data }) {
  const handleExport = async (type, export_data) => {
    switch (type) {
      case 'csv':
        Excel_Download_Despesas(export_data)
        break
      case 'pdf':
        PDF_Download_Despesas(export_data)
        break
      case 'odt':
        ODT_Download_Despesas(export_data)
        break
      case 'txt':
        TXT_Download_Despesas(export_data)
        break
    }
  }

  return (
    <Space style={{ marginBottom: 50 }} size='large' wrap>
      <span>Exportar arquivo para:</span>
      <Button
        style={{ color: '#1D6F42', borderColor: '#1D6F42' }}
        size='large'
        icon={<FileExcelOutlined />}
        onClick={() => handleExport('csv', export_data)}
      >
        Formato .CSV
      </Button>

      <Button
        style={{ color: '#FF0000', borderColor: '#FF0000' }}
        size='large'
        icon={<FilePdfOutlined />}
        onClick={() => handleExport('pdf', export_data)}
      >
        Formato .PDF
      </Button>

      <Button
        style={{ color: '#4472C4', borderColor: '#4472C4' }}
        size='large'
        icon={<FileWordOutlined />}
        onClick={() => handleExport('odt', export_data)}
      >
        Formato .ODT
      </Button>

      <Button
        size='large'
        icon={<FileTextOutlined />}
        onClick={() => handleExport('txt', export_data)}
      >
        Formato TXT
      </Button>
    </Space>
  )
}
