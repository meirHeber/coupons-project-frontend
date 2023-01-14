import axios from 'axios';
import React, { ChangeEvent, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { UsersType } from '../../enums/UsersType';
import { ICompany } from '../../models/ICompany';
import { IUser } from '../../models/IUser';
import { ActionType } from '../../redux/action-type';
import { AppState } from '../../redux/app-state';
import CatchFunction from '../../utils/catchFuncion';
import GetCompanies from '../../utils/get-functions/GetCompanies';
import Button from '../buttons/generic-button/Button';
import TextInput from '../generic-utils-components/input-card/Text-input';
import InputLabel from '../generic-utils-components/input-label/InputLabel';
import './Register.css'


function Register() {

  const [companies, setCompanies] = useState<ICompany[]>([]);

  async function getCompanies() {
    setCompanies(await GetCompanies())
  }

  useEffect(() => {
    getCompanies()
  }, [])

  const [firstName, setFirstName] = useState<string>("");
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [lastName, setLastName] = useState<string>("");
  const [userType, setUserType] = useState<string>("customer");
  const [companyId, setCompanyId] = useState<number>(null);
  const [amountOfChildren, setAmountOfChildren] = useState<number>(null);
  const [address, setAddress] = useState<string>("");

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const userTypeEnterd: string = useSelector((state: AppState) => state.userType);
  const userIdEnterd: number = useSelector((state: AppState) => state.userId);
  const userIdForUpdate: number = useSelector((state: AppState) => state.userIdForUpdate);

  const onUserTypeChanged = () => {
    let selectBox: any = document.getElementById("userTypeSelectBox");
    setUserType(selectBox.options[selectBox.selectedIndex].value);
  }
  const onCompanyChanged = () => {
    let selectBox: any = document.getElementById("companyIdSelectBox");
    setCompanyId(+selectBox.options[selectBox.selectedIndex].value);
  }
  function checkIfItIsYourself() {
    if (userIdEnterd == userIdForUpdate) {
      dispatch({ type: ActionType.LogOut })
    }
  }

  const onSaveClicked = async () => {
    try {
      validationsForAddUser();
      if (!userIdForUpdate) {
        if (userType == UsersType.admin) {
          await axios.post("http://localhost:8080/users",
            { firstName, lastName, username, password, userType });          
        }
        if (userType == UsersType.customer) {
          axios.post("http://localhost:8080/customers",
            { firstName, lastName, username, password, userType, address, amountOfChildren });
        }
        if (userType == UsersType.company) {
          let company = companyId;
          await axios.post("http://localhost:8080/users",
            { firstName, lastName, username, password, userType, company });
        }
      }
      else {
        let id = userIdForUpdate;
        if (userType == UsersType.admin) {
          await axios.put("http://localhost:8080/users",
            { id, firstName, lastName, username, password, userType });
        }
        if (userType == UsersType.customer) {
          await axios.put("http://localhost:8080/customers",
            { id, firstName, lastName, username, password, userType, address, amountOfChildren });
        }
        if (userType == UsersType.company) {
          let company = companyId;
          await axios.put("http://localhost:8080/users",
            { id, firstName, lastName, username, password, userType, company });
        }
        await checkIfItIsYourself();
        dispatch({ type: ActionType.SelectedUserForUpdate })
      }
      navigate('/home');
    }
    catch (error: any) {
     CatchFunction(error)
    };
  }

  ///////validationst---------------------------------------------------------------
  function validationsForAddUser() {
    if(!firstName || !lastName || !username || !userType || !password){
      throw new Error('One or more of the fields are empty.');
    }
    if(username.length>10 || username.length <3){
      throw new Error('Username must be between 3 and 10 letters and numbers.');
    }
    if(firstName.length>10 || firstName.length <2 || lastName.length>10 || lastName.length <2){
      throw new Error('First or last name entered is invalid. Enter a name with between 2 and 10 letters.');
    }
    if(password.length>10 || password.length <7){
      throw new Error('Password is invalid. Enter a password with between 7 and 10 letters and numbers.');
    }
    if((userType != UsersType.company && companyId != null) || (userType == UsersType.company && companyId == null) ){
      throw new Error("An attempt is being made to associate you with some company, but it is illegal.");
    }
    ///address and amount of children is optional---------
  }

  return (
    <div className='Register'>
      {userTypeEnterd != UsersType.admin && !userIdForUpdate && <h1 className='text-over-register-input'>Register</h1>}
      {userTypeEnterd == UsersType.admin && !userIdForUpdate && <h1 className='text-over-register-input'>Add user</h1>}
      {userTypeEnterd == UsersType.admin && userIdForUpdate && <h1 className='text-over-register-input'>Edit user</h1>}
      {userTypeEnterd != UsersType.admin && userIdForUpdate && <h1 className='text-over-register-input'>Edit your details</h1>}
      <div className='register-parameters-div'>
        <InputLabel labelText={'enter your first name:'} className={''} />
        <TextInput inputType='text' onInputChanged={(event: any) => setFirstName(event.target.value)} placeholder={'first name . . .'} />
        <InputLabel labelText={'enter your last name:'} className={''} />
        <TextInput inputType='text' onInputChanged={(event: any) => setLastName(event.target.value)} placeholder={'last name . . .'} />
        <InputLabel labelText={'enter your username:'} className={''} />
        <TextInput inputType='text' onInputChanged={(event: any) => setUsername(event.target.value)} placeholder={'username . . .'} />
        <InputLabel labelText={'enter your password:'} className={''} />
        <TextInput inputType='password' onInputChanged={(event: any) => setPassword(event.target.value)} placeholder={'password . . .'} />
        {userTypeEnterd === UsersType.admin && <div>
          <InputLabel labelText={'select your userType:'} className={''} />
          <select className='text-input' id="userTypeSelectBox" onChange={onUserTypeChanged}>
            <option value="Choose user type"  disabled selected>Choose user type</option>
            {Object.values(UsersType).filter((type) => isNaN(Number(type))).map((type, index) => (<option key={index} defaultValue="customer" value={type}>{type}</option>))}
          </select>
          {userType === UsersType.company && <div>
            <InputLabel labelText={'select your company:'} className={''} />
            <select className='text-input' id="companyIdSelectBox" defaultValue={"null"} onChange={onCompanyChanged}>
              <option value="Choose company" disabled selected>Choose company</option>
              {companies.map(company => (<option key={company.id} defaultValue="null" value={company.id}>{company.name}</option>))}
            </select>
          </div>}
        </div>}
        {userType === "customer" && <div>
          <InputLabel labelText={'enter your address:'} className={''} />
          <TextInput inputType='text' onInputChanged={(event: any) => setAddress(event.target.value)} placeholder={'address . . .'} />
          <InputLabel labelText={'enter your amount of children:'} className={''} />
          <TextInput inputType='number' onInputChanged={(event: any) => setAmountOfChildren(+event.target.value)} placeholder={'amount of children . . .'} /></div>}
        <Button className='Login-button' onButtenClicked={onSaveClicked} buttenText={'Save'} />
      </div>
    </div>
  )
}

export default Register;


