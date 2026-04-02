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
      <span>Exportar arquivo para:</span>
      <Button
        style={{ color: 'green' }}
        size='large'
        icon={<FileExcelOutlined />}
        onClick={() => Excel_Download_Despesas(data)}
      >
        Formato CSV
      </Button>

      <Button
        style={{ color: 'red' }}
        size='large'
        icon={<FilePdfOutlined />}
        onClick={() => PDF_Download_Despesas(data)}
      >
        Formato PDF
      </Button>

      <Button
        style={{ color: 'blue' }}
        size='large'
        icon={<FileWordOutlined />}
        onClick={() => ODT_Download_Despesas(data)}
      >
        Formato ODT
      </Button>

      <Button
        size='large'
        icon={<FileTextOutlined />}
        onClick={() => TXT_Download_Despesas(data)}
      >
        Formato TXT
      </Button>
    </Space>
  )
}
