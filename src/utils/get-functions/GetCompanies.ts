import axios from 'axios';
import { ICompany } from '../../models/ICompany';
import catchFunction from '../catchFuncion';

export default function GetCompanies() {
  try {
    return axios.get<ICompany[]>('http://localhost:8080/companies/').then(((response) => response.data));
  }
  catch (error: any) {
    catchFunction(error);
  }
}




