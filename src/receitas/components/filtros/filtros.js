import { Select, Form, Button, Input, Dropdown } from 'antd'
import { CalendarOutlined, DownOutlined } from '@ant-design/icons'
import { mouthOption, yearOption } from '../../../components/commons/utils'
import { filters_values } from '../mainPage/mainPage'
import { PDFDownload } from '../downloads/pdf-download'
import { ExcelDownload } from '../downloads/excel-download'
import { WORD_Download } from '../downloads/word-download'
import { TXT_Download } from '../downloads/txt-download'
import './filtros.css'
import '../hoverMe/hoverMe.css'

export default function Filtros({ form, onSearch, setFilters, loading, data }) {
  const items = [
    {
      key: '1',
      label: 'Baixar em .CSV',
      onClick: () => ExcelDownload(data),
    },
    {
      key: '2',
      label: 'Baixar em PDF',
      onClick: () => PDFDownload(data),
    },
    {
      key: '3',
      label: 'Baixar em .ODT',
      onClick: () => WORD_Download(data),
    },
    {
      key: '4',
      label: 'Baixar em .TXT',
      onClick: () => TXT_Download(data),
    },
  ]

  return (
    <>
      <Form
        form={form}
        onFinish={onSearch}
        layout='vertical'
        style={{
          display: 'flex',
          gap: 20,
          marginTop: 50,
          alignItems: 'center',
        }}
      >
        <Form.Item name='ano' label='Ano' style={{ fontWeight: 'bold' }}>
          <Select
            prefix={<CalendarOutlined />}
            style={{ minHeight: 40, width: 165 }}
            placeholder='Escolher ano...'
            options={yearOption}
          />
        </Form.Item>

        <Form.Item name='mes' label='Mês' style={{ fontWeight: 'bold' }}>
          <Select
            prefix={<CalendarOutlined />}
            style={{ minHeight: 40, width: 165 }}
            placeholder='Escolher mês...'
            options={mouthOption}
          />
        </Form.Item>

        <Form.Item
          name='descricao'
          label='Descrição'
          style={{ fontWeight: 'bold' }}
        >
          <Input style={{ minHeight: 40 }} placeholder='Pesquisar...' />
        </Form.Item>

        <Form.Item
          name='unidade_recebedora'
          label={
            <span style={{ whiteSpace: 'nowrap', overflow: 'visible' }}>
              Uni. Recebedora
            </span>
          }
          style={{ fontWeight: 'bold' }}
        >
          <Input style={{ minHeight: 40 }} placeholder='Pesquisar...' />
        </Form.Item>

        <div
          style={{
            display: 'flex',
            gap: 10,
            justifyContent: 'flex-end',
            marginTop: 5,
          }}
        >
          <Button
            type='primary'
            htmlType='submit'
            style={{ width: 120, height: 40 }}
            disabled={loading}
          >
            Pesquisar
          </Button>

          <Button
            htmlType='button'
            style={{ width: 120, height: 40 }}
            onClick={() => {
              form.resetFields()
              setFilters(filters_values)
            }}
          >
            Limpar Filtros
          </Button>
        </div>
      </Form>

      <div className='download-options'>
        <Dropdown menu={{ items }}>
          <a onClick={(e) => e.preventDefault()}>
            Downloads <DownOutlined />
          </a>
        </Dropdown>
      </div>
    </>
  )
}
