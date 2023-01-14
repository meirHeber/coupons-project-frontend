import axios from 'axios';
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { ErrorTypes } from '../../../enums/ErrorTypes';
import { UsersType } from '../../../enums/UsersType';
import { ActionType } from '../../../redux/action-type';
import { AppState } from '../../../redux/app-state'
import catchFunction from '../../../utils/catchFuncion';
import GenericAreYouSureModal from './generic-are-you-sure-modal/GenericAreYouSureModal'

function DeleteCouponModal() {

    const dispatch = useDispatch();


    const coupon = useSelector((state: AppState) => state.couponForDelete);

    const isModalOpen:boolean = useSelector((state: AppState) => state.openDleteCouponModal);
    const userType:string = useSelector((state: AppState) => state.userType);

    const companyId:number = useSelector((state: AppState) => state.companyId);



    function closeModal() {
        dispatch({ type: ActionType.SelectedCouponForDelete, payload: null })
    }
    const onYesClick = async () => {
        try {
            console.log(coupon);

            deleteCouponValidations();
            axios.delete(`http://localhost:8080/coupons/${coupon.id}`);
            closeModal();
            console.log(coupon);
            
        }
        catch (error: any) {
            catchFunction(error);
        };
    }

    function deleteCouponValidations() {
        if((userType != UsersType.admin && userType!=UsersType.company) || (userType == UsersType.company && companyId != coupon.company.id)){
            throw new Error(ErrorTypes.NO_AUTHORIZED);
        }
    }
       


    return (
        <GenericAreYouSureModal
            isOpen={isModalOpen}
            closeModal={closeModal}
            textBeforeButtons={'Are you sure to delete this coupon?'}
            onYesClick={onYesClick}
            onCancelClick={closeModal}
        />
    )
}

export default DeleteCouponModal


