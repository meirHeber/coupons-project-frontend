import ITable from '../../models/ITable'
import './GenericTable.css'

function GenericTable(props: ITable) {
  return (
    <div className='table'>
    <table>          
          {props.headHtml}
        <tbody>{props.bodyHtml}</tbody>
    </table>
    </div>
  )
}

export default GenericTable