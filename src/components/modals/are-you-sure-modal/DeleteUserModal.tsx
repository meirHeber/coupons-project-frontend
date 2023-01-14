import axios from 'axios';
import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { UsersType } from '../../../enums/UsersType';
import { IUser } from '../../../models/IUser';
import { ActionType } from '../../../redux/action-type';
import { AppState } from '../../../redux/app-state';
import catchFunction from '../../../utils/catchFuncion';
import GenericAreYouSureModal from './generic-are-you-sure-modal/GenericAreYouSureModal'

function DeleteUserModal() {

  const dispatch = useDispatch();
  const userForDelete:IUser = useSelector((state: AppState) => state.userIdForDelete);
  const isModalOpen:boolean = useSelector((state: AppState) => state.openDleteUserModal);
  function closeModal() {
    dispatch({ type: ActionType.SelectedUserForDelete })
  }
  const onYesClick = async () => {
    try {
      if(userForDelete.userType == UsersType.customer){
        await axios.delete(`http://localhost:8080/customers/${userForDelete.id}`);
      }
      else{
        await axios.delete(`http://localhost:8080/users/${userForDelete.id}`);
      }
      closeModal();
    }
    catch (error: any) {
      catchFunction(error);
    };

  }

  return (
    <GenericAreYouSureModal
      isOpen={isModalOpen}
      closeModal={closeModal}
      onYesClick={onYesClick}
      onCancelClick={closeModal}
      textBeforeButtons={'Are you sure to delete this user?'} />
  )
}


export default DeleteUserModal