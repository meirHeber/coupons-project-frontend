import { ITextInput } from "../../../models/ITextInput";
import './Text-input.css';

function TextInput(props: ITextInput) {
  return (
    <input
    className='text-input' type={props.inputType} placeholder={props.placeholder} onChange={props.onInputChanged} value={props.value}>
    </input>
  )
}
export default TextInput;