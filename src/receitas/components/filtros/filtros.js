import { Input, Select } from 'antd'
import { CalendarOutlined, ScheduleOutlined } from '@ant-design/icons'
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
            placeholder='Pesquisar...'
            className='form-input'
            style={{ width: '150px', marginTop: '-6px' }}
            options={yearOption}
          />
        </div>

        <div className='filtro-item filtro-small'>
          <span className='search-label'>Mês</span>

          <Select
            prefix={<ScheduleOutlined className='form-icon' />}
            placeholder='Pesquisar...'
            className='form-input'
            style={{ width: '150px', marginTop: '-6px' }}
            options={mouthOption}
          />
        </div>

        <div className='filtro-item filtro-grow'>
          <span className='search-label'>Texto Livre</span>

          <Search
            allowClear
            enterButton
            placeholder='Faça uma pesquisa...'
            onSearch={onSearch}
          />
        </div>
      </div>
    </>
  )
}
