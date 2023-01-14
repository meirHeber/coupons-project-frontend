import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { ICategory } from '../../models/ICategory';
import catchFunction from '../catchFuncion';


export default  function GetCategories() {

    try {
     return axios.get<ICategory[]>('http://localhost:8080/categories/').then(((response) => response.data));      
    }
    catch (error: any) {
      catchFunction(error);
    }
  }




