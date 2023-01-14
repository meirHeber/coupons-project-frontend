import axios from 'axios';
import React, { ChangeEvent, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ActionType } from '../../../redux/action-type';
import { AppState } from '../../../redux/app-state';
import Button from '../../buttons/generic-button/Button';
import '../generic-modal/GenericModal.css'
import TextInput from '../../generic-utils-components/input-card/Text-input';
import InputLabel from '../../generic-utils-components/input-label/InputLabel';
import './MakePurchaseModal.css'
import GenericModal from '../generic-modal/GenericModal';
import CatchFunction from '../../../utils/catchFuncion';
import { ICoupon } from '../../../models/ICoupon';
import { UsersType } from '../../../enums/UsersType';
import { ErrorTypes } from '../../../enums/ErrorTypes';

function MakePurchaseModal() {

  const dispatch = useDispatch();
  const [amount, setAmount] = useState(1);

  const isModalOpen: boolean = useSelector((state: AppState) => state.openBuyModal)
  const couponForBuy: ICoupon = useSelector((state: AppState) => state.couponForBuy)
  const userType:string = useSelector((state: AppState) => state.userType)

  function closeModal() {
    dispatch({ type: ActionType.SelectedCouponForBuy })
  }

  const onBuyClicked = async () => {
    try {
      buyCouponValidations();
      await axios.post("http://localhost:8080/purchases", { coupon: couponForBuy.id, amount });
      closeModal();
      alert("Good luck!!! You bought " + amount + " coupons")
    }
    catch (error: any) {
      CatchFunction(error);
    };
  }

  function buyCouponValidations() {
    if (userType != UsersType.customer) {
      throw new Error(ErrorTypes.NO_AUTHORIZED);
    }
    if (!amount || amount < 1) {
      throw new Error('Quantity of coupons per purchase must be more than 1.');
    }
    if (amount > couponForBuy.amount) {
      throw new Error('Not enough coupons in stock. you can buy up to ' + couponForBuy.amount + ' units.');
    }
  }

  return (
    <GenericModal
      isOpen={isModalOpen}
      onAfterOpen={undefined}
      onRequestClose={undefined}
      closeModal={closeModal}
      insideHteml={
        <div className='make-pirchase'>
          <h1 className='text-over-input'>buy</h1>
          <InputLabel labelText={'enter amount coupons you want to buy:'} className={''} />
          <TextInput inputType='number' onInputChanged={(event: ChangeEvent<HTMLInputElement>) => setAmount(+event.target.value)} placeholder={'amount . . .'} />
          <Button className={undefined} onButtenClicked={onBuyClicked} buttenText={'Buy!'} />
        </div>
      } />
  )
}

export default MakePurchaseModal


