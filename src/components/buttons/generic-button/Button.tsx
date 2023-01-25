import IButten from '../../../models/IButoon';
import './Bottun.css';

function Button(props: IButten) {
      return (
            <button className="Button" onClick={() => props.onButtenClicked()} id={props.id} disabled={props.disabled}>{props.buttenText}</button>
      )
}
export default Button;