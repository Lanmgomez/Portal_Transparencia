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

export default function DownloadsButtons({ data }) {
  return (
    <Space style={{ marginBottom: 50 }} size='large' wrap>
      <Button
        style={{ color: 'green' }}
        size='large'
        icon={<FileExcelOutlined />}
        onClick={() => Excel_Download_Despesas(data)}
      >
        Exportar CSV
      </Button>

      <Button
        style={{ color: 'red' }}
        size='large'
        icon={<FilePdfOutlined />}
        onClick={() => PDF_Download_Despesas(data)}
      >
        Exportar PDF
      </Button>

      <Button
        style={{ color: 'blue' }}
        size='large'
        icon={<FileWordOutlined />}
        onClick={() => ODT_Download_Despesas(data)}
      >
        Exportar ODT
      </Button>

      <Button
        size='large'
        icon={<FileTextOutlined />}
        onClick={() => TXT_Download_Despesas(data)}
      >
        Exportar TXT
      </Button>
    </Space>
  )
}
