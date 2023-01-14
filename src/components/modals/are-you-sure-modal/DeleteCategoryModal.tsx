import axios from 'axios';
import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { ActionType } from '../../../redux/action-type';
import { AppState } from '../../../redux/app-state';
import catchFunction from '../../../utils/catchFuncion';
import deleteCategoryOrCompanyValidations from '../../../utils/validatons-utils/DeleteCategoryOrCompanyValidations';
import GenericAreYouSureModal from './generic-are-you-sure-modal/GenericAreYouSureModal'

function DeleteCategoryModal() {

    const dispatch = useDispatch();

    const categoryId:number = useSelector((state: AppState) => state.categoryIdForDelete);
    const isModalOpen:boolean = useSelector((state: AppState) => state.openDleteCategoryModal);
    const userType:string = useSelector((state: AppState)=>state.userType);

    function closeModal() {
        dispatch({ type: ActionType.SelectedCategoryForDelete, payload: null  })
    }

    const onYesClick = async () => {
        try {
            deleteCategoryOrCompanyValidations(userType);
            await axios.delete(`http://localhost:8080/categories/${categoryId}`);
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
    textBeforeButtons={'Are you sure to delete this category?'}/>
  )
}

export default DeleteCategoryModal