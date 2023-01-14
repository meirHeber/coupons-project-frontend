import axios, { AxiosResponse } from 'axios';
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import IPurchase from '../../models/IPurchase';
import { AppState } from '../../redux/app-state';
import PurchaseRow from './PurchaseRow';
import GenericTable from '../tables/GenericTable';
import { UsersType } from '../../enums/UsersType';
import catchFunction from '../../utils/catchFuncion';
import { ErrorTypes } from '../../enums/ErrorTypes';

function Purchases() {

  const userType: string = useSelector((state: AppState) => state.userType);
  const [purchases, setPurchases] = useState<IPurchase[]>([]);

  useEffect(() => {
    getAllPurchases();
  }, []);

  const getAllPurchases = async () => {
    try {
      getPurchasesValidations();
      let serverResponse: AxiosResponse;
      if (userType == UsersType.admin) {
        serverResponse = await axios.get("http://localhost:8080/purchases/");
      }
      else if (userType == UsersType.company) {
        serverResponse = await axios.get("http://localhost:8080/purchases/byCompanyId/");
      }
      else if (userType == UsersType.customer) {
        serverResponse = await axios.get("http://localhost:8080/purchases/byUserId");
      }
      setPurchases(serverResponse.data)
    }
    catch (error: any) {
      catchFunction(error);
    };
  }

  function getPurchasesValidations() {
    if(userType != UsersType.admin && userType != UsersType.company && userType != UsersType.customer){
      throw new Error(ErrorTypes.NO_AUTHORIZED);
    }
  }

  return (
    <div>
   <GenericTable
    headHtml={
      <thead >
      {userType != UsersType.customer && <td>user full name</td>}
      <td>coupon title</td>
      <td>coupon description</td>
      <td>amount items</td>
      <td>company</td>
      <td>category</td>
      <td>total price</td>
      <td>time stamp</td>
    </thead>
    } 
    bodyHtml={purchases.map(purchase => (<PurchaseRow key={purchase.id} purchase={purchase} />))}
    />
    </div>
  )
}
export default Purchases

