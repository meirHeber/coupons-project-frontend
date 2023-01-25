import React from 'react';
import IButoonInHeader from '../../../models/IButoonInHeader';
import './ButtonInHeader.css'

function ButtonInHeader(props: IButoonInHeader) {
  function onClick(event: any) {
    let lastSelectedButton = document.getElementById("selectedButtonInHeader");
    if (lastSelectedButton != null) {
      lastSelectedButton.id = "";
    }
    event.target.id = "selectedButtonInHeader";
    if (props.onButtenClicked) {
      props.onButtenClicked();
    }
  }
  return (
    <button className='button-in-header' id={props.id} onClick={onClick}>{props.buttenText}</button>
  )
}

export default ButtonInHeader