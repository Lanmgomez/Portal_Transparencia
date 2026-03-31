import { Space, Button } from 'antd'
import { Excel_Download_Ordem_Cronologica } from './excel-download'
import { PDF_Download_Ordem_Cronologica } from './pdf-download'
import { ODT_Download_Ordem_Cronologica } from './word-download'
import { TXT_Download_Ordem_Cronologica } from './txt-download'
import {
  FileExcelOutlined,
  FilePdfOutlined,
  FileTextOutlined,
  FileWordOutlined,
} from '@ant-design/icons'

export default function DownloadsButtons({ data }) {
  return (
    <Space style={{ marginBottom: 50 }} size='large' wrap>
      <Button
        style={{ color: 'green' }}
        size='large'
        icon={<FileExcelOutlined />}
        onClick={() => Excel_Download_Ordem_Cronologica(data)}
      >
        Exportar CSV
      </Button>

      <Button
        style={{ color: 'red' }}
        size='large'
        icon={<FilePdfOutlined />}
        onClick={() => PDF_Download_Ordem_Cronologica(data)}
      >
        Exportar PDF
      </Button>

      <Button
        style={{ color: 'blue' }}
        size='large'
        icon={<FileWordOutlined />}
        onClick={() => ODT_Download_Ordem_Cronologica(data)}
      >
        Exportar ODT
      </Button>

      <Button
        size='large'
        icon={<FileTextOutlined />}
        onClick={() => TXT_Download_Ordem_Cronologica(data)}
      >
        Exportar TXT
      </Button>
    </Space>
  )
}
