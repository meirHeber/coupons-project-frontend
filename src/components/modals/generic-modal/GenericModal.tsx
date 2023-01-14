import React from 'react';
import { IoMdCloseCircle } from 'react-icons/io';
import Modal from 'react-modal';
import IModal from '../../../models/IModal';
import './GenericModal.css';



function GenericModal(props: IModal) {
  return (
    <Modal
    className='modal-outside'
      isOpen={props.isOpen}
      onAfterOpen={props.onAfterOpen}
      onRequestClose={props.onRequestClose}
      appElement={document.getElementById('root') as HTMLElement}
    >
      <IoMdCloseCircle className='close-modal-icon' onClick={props.closeModal} />
      {props.insideHteml}
    </Modal>
  )
}

export default GenericModal