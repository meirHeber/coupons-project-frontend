import { Axios, AxiosResponse } from 'axios';
import React, { useEffect } from 'react'
import { createRoot } from 'react-dom/client';
import Categories from '../components/categories/Categories';
import { AlertGroupToast } from '../components/generic-utils-components/alerts/alert';
import TestModal from './TestModal';
import { UsersType } from '../enums/UsersType'
import { useSelector } from 'react-redux';
import { AppState } from '../redux/app-state';

function TestLayout() {
  const coupon = useSelector((state: AppState) => state.couponForDelete);


  useEffect(()=>{
   
  })

  function onClick() {
   console.log(coupon);
   
  
  }

  return (
    <div>
      <button className='button-test' style={{background: "red", height:"100px", width:"100px"}} onClick={() => onClick()} >test</button>
      {/* <AlertGroupToast/> */}
    </div>
  )
}

export default TestLayout