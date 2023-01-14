import axios from 'axios';
import React, { ChangeEvent, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { ActionType } from '../../../redux/action-type';
import Button from '../../buttons/generic-button/Button';
import './LoginModal.css';
import { AppState } from '../../../redux/app-state';
import InputLabel from '../../generic-utils-components/input-label/InputLabel';
import TextInput from '../../generic-utils-components/input-card/Text-input';
import GenericModal from '../generic-modal/GenericModal';
import catchFunction from '../../../utils/catchFuncion';

function LoginModal() {

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const onLoginClicked = async () => {
    try {
      loginValidations();
      const serverResponse = await axios.post("http://localhost:8080/users/login", { username, password });
      const token = serverResponse.data;
      axios.defaults.headers.common['Authorization'] = token;
      localStorage.setItem('token', token);
      dispatch({ type: ActionType.Login, payload: token })
      navigate('/home')     
    }
    catch (error: any) {
      catchFunction(error);
    };
  }

  function loginValidations(){
    if(username.length < 6 || password.length <6){
      throw new Error("username or password too short", );
    }
  }
  ///===========================================================
  function closeModal() {
    dispatch({ type: ActionType.OpenLoginModal, payload: false })
  }

  function goToRegister(){
    navigate("/register");
    closeModal();
  }

  const isModalOpen: boolean = useSelector((state: AppState) => state.openLoginModal)

  ///===========================================================

  return (
    <GenericModal
      isOpen={isModalOpen}
      onAfterOpen={undefined}
      onRequestClose={undefined}
      closeModal={closeModal}
      insideHteml={
        <div className='login-modal-inside'>
          <h1 className='text-over-input'>Login</h1>
          <InputLabel labelText={'enter your username:'} className={''} />
          <TextInput inputType='text' onInputChanged={(event: ChangeEvent<HTMLInputElement>) =>setUsername(event.target.value)} placeholder={'username . . .'} />
          <InputLabel labelText={'enter your password:'} className={''} />
          <TextInput inputType='password' onInputChanged={(event: ChangeEvent<HTMLInputElement>) =>setPassword(event.target.value)} placeholder={'password . . .'} />
          { username && password && <Button className={undefined} onButtenClicked={onLoginClicked} buttenText={'Login'} disabled={false} />}
          { (!username || !password )&& <Button className={undefined} onButtenClicked={onLoginClicked} buttenText={'Login'} disabled={true} />}<br/>
          <p style={{color:'rgb(8, 43, 35)', paddingTop:'15px'}}>New client? <ins onClick={()=>goToRegister()}><b>Sign up</b></ins></p>
        </div>
      }
    />
  )
}

export default LoginModal;