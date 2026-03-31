import { Form, Button, Radio, Dropdown } from 'antd'
import { DownOutlined } from '@ant-design/icons'
import { Excel_Download_Ordem_Cronologica } from '../downloads/excel-download'
import { PDF_Download_Ordem_Cronologica } from '../downloads/pdf-download'
import { ODT_Download_Ordem_Cronologica } from '../downloads/word-download'
import { TXT_Download_Ordem_Cronologica } from '../downloads/txt-download'
import './filtros.css'

export const CATEGORY_OPTIONS = [
  {
    label: 'Fornecimento de bens',
    value: 30,
  },
  {
    label: 'Locações',
    value: 38,
  },
  {
    label: 'Prestação de serviços',
    value: 37,
  },
  {
    label: 'Obras e Edificações',
    value: 51,
  },
]

/* 
Fornecimento de bens
30 — Material de Consumo
32 — Material, Bem ou Serviço para Distribuição Gratuita
52 — Equipamentos e Material Permanente

Locações
38 — Arrendamento Mercantil

Prestação de serviços
35 — Serviços de Consultoria
36 — Outros Serviços de Terceiros – Pessoa Física
37 — Locação de Mão-de-Obra
39 — Outros Serviços de Terceiros – Pessoa Jurídica
40 — Serviços de Tecnologia da Informação e Comunicação – Pessoa Jurídica

Obras e Edificações
51 — Obras e Instalações
*/

export default function Filtros({ onSearch, setFilters, data }) {
  const [form] = Form.useForm()

  const items = [
    {
      key: '1',
      label: 'Baixar em .CSV',
      onClick: () => Excel_Download_Ordem_Cronologica(data),
    },
    {
      key: '2',
      label: 'Baixar em PDF',
      onClick: () => PDF_Download_Ordem_Cronologica(data),
    },
    {
      key: '3',
      label: 'Baixar em .ODT',
      onClick: () => ODT_Download_Ordem_Cronologica(data),
    },
    {
      key: '4',
      label: 'Baixar em .TXT',
      onClick: () => TXT_Download_Ordem_Cronologica(data),
    },
  ]

  return (
    <Form
      form={form}
      onFinish={onSearch}
      layout='vertical'
      style={{
        display: 'flex',
        gap: 20,
        marginTop: 30,
        marginBottom: 50,
        alignItems: 'center',
        flexWrap: 'wrap',
      }}
    >
      <Form.Item
        label='Categoria'
        name='elemento_despesa'
        style={{ minWidth: '100%' }}
      >
        <Radio.Group
          options={CATEGORY_OPTIONS}
          optionType='button'
          buttonStyle='solid'
        />
      </Form.Item>

      <div
        style={{
          display: 'flex',
          gap: 10,
          marginTop: 5,
        }}
      >
        <Button
          type='primary'
          htmlType='submit'
          style={{ width: 120, height: 40 }}
        >
          Pesquisar
        </Button>

        <Button
          htmlType='button'
          style={{ width: 120, height: 40 }}
          onClick={() => {
            form.resetFields(['elemento_despesa'])
            setFilters({
              elemento_despesa: null,
            })
          }}
        >
          Limpar Filtros
        </Button>
      </div>

      <div>
        <Dropdown menu={{ items }}>
          <a onClick={(e) => e.preventDefault()}>
            Downloads <DownOutlined />
          </a>
        </Dropdown>
      </div>
    </Form>
  )
}
