import React from 'react'
import { useSelector } from 'react-redux';
import { AppState } from '../../redux/app-state';
import AddCategoryModal from './category-modal/AddCategoryModal';
import AddCompanyModal from './comapny-modal/AddCompanyModal';
import AddCouponModal from './coupon-modal/AddCouponModal';
import DeleteCategoryModal from './are-you-sure-modal/DeleteCategoryModal';
import DeleteCompanyModal from './are-you-sure-modal/DeleteCompanyModal';
import DeleteCouponModal from './are-you-sure-modal/DeleteCouponModal';
import DeleteUserModal from './are-you-sure-modal/DeleteUserModal';
import GenericAreYouSureModal from './are-you-sure-modal/generic-are-you-sure-modal/GenericAreYouSureModal';
import LoginModal from './login-modal/LoginModal';
import MakePurchaseModal from './make-purchase-modal/MakePurchaseModal';
import UserDetailsModal from './user-modal/UserDetailsModal';

function ModalContainer() {

  


  return (
    <div>
        <LoginModal/>        
        <MakePurchaseModal/>
        <DeleteCouponModal/>
        <AddCouponModal/>
        <AddCompanyModal/>
        <AddCategoryModal/>
        <DeleteCategoryModal/>
        <DeleteCompanyModal/>
        <DeleteUserModal/>
        <UserDetailsModal/>


    </div>
  )
}

export default ModalContainer