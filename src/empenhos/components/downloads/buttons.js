import { Space, Button } from 'antd'
import { Excel_Download_Empenho } from './excel-download'
import { PDF_Download_Empenho } from './pdf-download'
import { WORD_Download_Empenho } from './word-download'
import { TXT_Download_Empenhos } from './txt-download'
import { useEmpenhoExport } from '../hooks/useEmpenhoExport'
import {
  FileExcelOutlined,
  FilePdfOutlined,
  FileTextOutlined,
  FileWordOutlined,
} from '@ant-design/icons'

export default function DownloadsButtons({ filters }) {
  const { export_data } = useEmpenhoExport(filters)

  const handleExport = async (type, export_data) => {
    switch (type) {
      case 'csv':
        Excel_Download_Empenho(export_data)
        break
      case 'pdf':
        PDF_Download_Empenho(export_data)
        break
      case 'odt':
        WORD_Download_Empenho(export_data)
        break
      case 'txt':
        TXT_Download_Empenhos(export_data)
        break
    }
  }

  return (
    <Space style={{ marginBottom: 50 }} size='large' wrap>
      <span>Exportar arquivo para:</span>

      <Button
        style={{ color: 'green' }}
        size='large'
        icon={<FileExcelOutlined />}
        onClick={() => handleExport('csv', export_data)}
      >
        Formato CSV
      </Button>

      <Button
        style={{ color: 'red' }}
        size='large'
        icon={<FilePdfOutlined />}
        onClick={() => handleExport('pdf', export_data)}
      >
        Formato PDF
      </Button>

      <Button
        style={{ color: 'blue' }}
        size='large'
        icon={<FileWordOutlined />}
        onClick={() => handleExport('odt', export_data)}
      >
        Formato ODT
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
