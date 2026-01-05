import getCurrentDate from '../commons/utils'
import './pageTitle.css'

export default function PageTitle({ title }) {
  return (
    <header className='page-title'>
      <h1>{title}</h1>
      <div>
        <span>Dados atualizados: {getCurrentDate()}</span>
      </div>
    </header>
  )
}
