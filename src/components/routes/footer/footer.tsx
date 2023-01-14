import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { UsersType } from '../../../enums/UsersType';
import { AppState } from '../../../redux/app-state';
import './footer.css'
import { FaRegCopyright } from 'react-icons/fa';
import { ICoupon } from '../../../models/ICoupon';
import CatchFunction from '../../../utils/catchFuncion';
import axios from 'axios';

function Footer() {

  const couponForDelete:ICoupon = useSelector((state: AppState) => state.couponForDelete);
  const userType: string = useSelector((state: AppState) => state.userType)
  const [coupnsSize, setCouponsSize] = useState<number>(null);

  async function getCouponsSize() {
    try {
      if (userType != UsersType.company) {
        setCouponsSize((await axios.get<number>('http://localhost:8080/coupons/size')).data)
      }
      else {
        setCouponsSize((await axios.get<number>('http://localhost:8080/coupons/size/byCompany')).data)
      }
    }
    catch (error: any) {
      CatchFunction(error);
    }
  }

  useEffect(() => {
    getCouponsSize();
  }, [userType, couponForDelete])

  return (
    <div className='footer'>
      <div className='text-in-footer'>

        {coupnsSize > 0 &&
          <span>
            {userType != UsersType.company && <span>We have {coupnsSize}
            </span>}
            {userType == UsersType.company && <span>to your company have {coupnsSize}
            </span>} coupons in stock || </span>}

        All rights reserved <FaRegCopyright />
      </div>
    </div>
  )
}

export default Footer


