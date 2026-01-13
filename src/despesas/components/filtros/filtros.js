import { Input, Select } from 'antd'
import { mouthOption, yearOption } from '../../../components/commons/utils'
import {
  unidadeOrcamentariaOptions,
  elementOptions,
  funcaoOptions,
  subFuncaoOptions,
  naturezaOptions,
} from './options'
import './filtros.css'
import {
  CalendarOutlined,
  ScheduleOutlined,
  BankOutlined,
  NodeIndexOutlined,
  UserSwitchOutlined,
  UsergroupAddOutlined,
  SnippetsOutlined,
} from '@ant-design/icons'

export default function Filtros({ onSearch }) {
  const { Search } = Input

  return (
    <>
      <h3>Filtros</h3>
      <div className='filtros'>
        <div>
          <span className='search-label'>Ano</span>

          <Select
            prefix={<CalendarOutlined className='form-icon' />}
            placeholder='Escolha o ano...'
            className='form-input'
            options={yearOption}
          />
        </div>

        <div>
          <span className='search-label'>Mês</span>

          <Select
            prefix={<ScheduleOutlined className='form-icon' />}
            placeholder='Escolha o mês...'
            className='form-input'
            options={mouthOption}
          />
        </div>

        <div className='search-wrapper'>
          <span className='search-label'>Unidade Orçamentária</span>

          <Select
            prefix={<BankOutlined className='form-icon' />}
            placeholder='Escolha uma opção...'
            className='form-input'
            options={unidadeOrcamentariaOptions}
          />
        </div>

        <div>
          <span className='search-label'>Elemento</span>

          <Select
            prefix={<NodeIndexOutlined className='form-icon' />}
            placeholder='Escolha uma opção...'
            className='form-input'
            style={{ width: 350 }}
            options={elementOptions}
          />
        </div>

        <div>
          <span className='search-label'>Função</span>

          <Select
            prefix={<UserSwitchOutlined className='form-icon' />}
            placeholder='Escolha uma opção...'
            className='form-input'
            options={funcaoOptions}
          />
        </div>

        <div>
          <span className='search-label'>Sub-Função</span>

          <Select
            prefix={<UsergroupAddOutlined className='form-icon' />}
            placeholder='Escolha uma opção...'
            className='form-input'
            options={subFuncaoOptions}
          />
        </div>

        <div>
          <span className='search-label'>Natureza</span>

          <Select
            prefix={<SnippetsOutlined className='form-icon' />}
            placeholder='Escolha uma opção...'
            style={{ width: 250 }}
            className='form-input'
            options={naturezaOptions}
          />
        </div>

        <div>
          <span className='search-label'>Texto Livre</span>

          <Search
            allowClear
            enterButton
            placeholder='Pesquisa...'
            onSearch={onSearch}
          />
        </div>
      </div>
    </>
  )
}
