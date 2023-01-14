import React from 'react';
import IAddButton from '../../../models/IAddButton';
import './AddButton.css'

function AddButton(props: IAddButton) {
  return (
    <button className='add-button' onClick={()=>props.onButtonClicke()}>{props.textOnButton}</button>
  )
}

export default AddButton