import React, { useState } from 'react'
import ITestModel from './ITestModul';
import GenericModal from '../components/modals/generic-modal/GenericModal';
import './TestModal.css'


function TestModal(props:ITestModel) {

const [isOpen, setIsOpen] = useState(false);

function close(){
    setIsOpen(false);
}

  return (
    <div className='test-modal'>
        <button style={{backgroundColor: "blue"}} onClick={()=>setIsOpen(true)}>test</button>
    <GenericModal
    isOpen={isOpen}
    onAfterOpen={undefined}
    onRequestClose={undefined}
    closeModal={close}
    insideHteml={<div>test!!! {props.test}</div>}
        
   
   />
    </div>
  )
}

export default TestModal