import axios, { AxiosResponse } from 'axios';
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { IUser } from '../../models/IUser';
import { ActionType } from '../../redux/action-type';
import { AppState } from '../../redux/app-state';
import UserRow from './UserRow';
import GenericTable from '../tables/GenericTable';
import catchFunction from '../../utils/catchFuncion';
import { UsersType } from '../../enums/UsersType';
import { ErrorTypes } from '../../enums/ErrorTypes';
import GetMassageFromError from '../../utils/GetMassageFromError';
import { AlertTypes } from '../../enums/AlertTypes';

function Users() {
  const dispatch = useDispatch();

  const [users, setUsers] = useState<IUser[]>([])

  // const users: IUser[] = useSelector((state: AppState) => state.allUsers);
  const userForDelete:IUser = useSelector((state: AppState) => state.userIdForDelete);
  const userType:string = useSelector((state: AppState)=>state.userType);

  useEffect(() => {
    getAllUsers();
  }, [userForDelete]);

  const getAllUsers = async () => {
    try {
      getUserValidations();
      let serverResponse: AxiosResponse = await axios.get<IUser>("http://localhost:8080/customers/");
      let customers: IUser[] = serverResponse.data;
      serverResponse = await axios.get<IUser>("http://localhost:8080/users/");
      let usersData: IUser[] = serverResponse.data;
      usersData.map((user, index) => { if (user.userType == UsersType.customer) { usersData[index] = customers.find(customer => customer.id == user.id) } })
      setUsers(usersData)
    }
    catch (error: any) {
      dispatch({type: ActionType.OpenAlert, payload: {type: AlertTypes.error, text: GetMassageFromError(error)}})      
    };

    function getUserValidations() {
      if(userType != UsersType.admin){
        throw new Error(ErrorTypes.NO_AUTHORIZED);
      }
    }

  }
  return (
    <GenericTable
      headHtml={
        <thead>
          <td>First name</td>
          <td>Last name</td>
          <td>Username</td>
          <td>Type</td>
          <td>More details</td>
          <td>Edit</td>
          <td>Delete</td>
        </thead>
      }
      bodyHtml={users.map(user => (<UserRow key={user.id} user={user} />))} />
  )
}
export default Users


