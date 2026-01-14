import { Input, Select } from 'antd'
import { CalendarOutlined } from '@ant-design/icons'
import { mouthOption, yearOption } from '../../../components/commons/utils'
import './filtros.css'

export default function Filtros({ onSearch }) {
  const { Search } = Input

  return (
    <>
      <div className='filtros'>
        <div className='filtro-item filtro-small'>
          <span className='search-label'>Ano</span>

          <Select
            prefix={<CalendarOutlined className='form-icon' />}
            placeholder='ano...'
            className='form-input'
            options={yearOption}
          />
        </div>

        <div className='filtro-item filtro-small'>
          <span className='search-label'>Mês</span>

          <Select
            prefix={<CalendarOutlined className='form-icon' />}
            placeholder='mês...'
            className='form-input'
            options={mouthOption}
          />
        </div>

        <div className='filtro-item filtro-grow'>
          <span className='search-label'>Texto Livre</span>

          <Search
            allowClear
            enterButton
            style={{ width: '300px' }}
            placeholder='Faça uma pesquisa...'
            onSearch={onSearch}
          />
        </div>
      </div>
    </>
  )
}
