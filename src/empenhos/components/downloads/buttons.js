import { Space, Button } from 'antd'
import { Excel_Download_Empenho } from './excel-download'
import { PDF_Download_Empenho } from './pdf-download'
import { WORD_Download_Empenho } from './word-download'
import { TXT_Download_Empenhos } from './txt-download'
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
        onClick={() => Excel_Download_Empenho(data)}
      >
        Exportar CSV
      </Button>

      <Button
        style={{ color: 'red' }}
        size='large'
        icon={<FilePdfOutlined />}
        onClick={() => PDF_Download_Empenho(data)}
      >
        Exportar PDF
      </Button>

      <Button
        style={{ color: 'blue' }}
        size='large'
        icon={<FileWordOutlined />}
        onClick={() => WORD_Download_Empenho(data)}
      >
        Exportar ODT
      </Button>

      <Button
        size='large'
        icon={<FileTextOutlined />}
        onClick={() => TXT_Download_Empenhos(data)}
      >
        Exportar TXT
      </Button>
    </Space>
  )
}
