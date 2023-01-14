import React from 'react';
import IInputLabel from '../../../models/IInputLabel';
import './InputLabel.css'

function InputLabel(props: IInputLabel) {
  return (
    <div className='div-on-lable'>
    <label className='input-label'>{props.labelText}</label>
    </div>
    )
}

export default InputLabel;