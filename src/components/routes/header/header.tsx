import axios, { Axios, AxiosHeaders, AxiosResponse } from 'axios';
import { useEffect } from 'react';
import { BiUserCircle } from 'react-icons/bi';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { UsersType } from '../../../enums/UsersType';
import { ActionType } from '../../../redux/action-type';
import { AppState } from '../../../redux/app-state';
import ButtonInHeader from '../../buttons/buttons-in-header/ButtonInHeader';
import CouponsLogo from '../../coupons/coupons-logo/CouponsLogo';
import SearchCouponBy from '../../dropdwons/search-by/SearchCouponsBy';
import SortCouponBy from '../../dropdwons/sort-by/SortCouponsBy';
import ModalContainer from '../../modals/ModalContainer';
import AddButton from '../../buttons/add-button/AddButton';
import './header.css'
import { PathNames } from '../../../enums/PathNames';
import { FaUserCircle } from 'react-icons/fa';
import catchFunction from '../../../utils/catchFuncion';
import { IUser } from '../../../models/IUser';

function Header() {

  const userType: string = useSelector((state: AppState) => state.userType);
  const firstName: string = useSelector((state: AppState) => state.firstName);
  const userIdForUpdate: number = useSelector((state: AppState) => state.userIdForUpdate);
  const userId: number = useSelector((state: AppState) => state.userId);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem('token') !== "" && userId == null) {
      axios.defaults.headers.common['Authorization'] = localStorage.getItem('token');
      dispatch({ type: ActionType.Login, payload: localStorage.getItem('token') })
      navigate('/home')
    }
  }, [])

  useEffect(() => {
    if (window.location.pathname != PathNames.register && userIdForUpdate != null) {
      dispatch({ type: ActionType.SelectedUserForUpdate })
    }
  })

  async function editYourDetails() {
    try {
      let serverResponse: AxiosResponse = null;
      if (userType == UsersType.customer) {
        serverResponse = await axios.get<IUser>(`http://localhost:8080/customers/${userId}`);
      }
      else {
        serverResponse = await axios.get<IUser>(`http://localhost:8080/users/${userId}`);
      }
      const userDetails = serverResponse.data;
      console.log(true);
      dispatch({ type: ActionType.SelectedUserForShow, payload: userDetails })
      dispatch({ type: ActionType.OpenShowUserModal, payload: true })
    }
    catch (error: any) {
      catchFunction(error);
    };
  }

  let onLogOutButtonClicked = (): void => {
    dispatch({ type: ActionType.LogOut })
    navigate('/home')
    alert("goodbye " + firstName);
  }

  return (
    <div className='header'>
      <ModalContainer />
      <div className='buttons-in-header-div'>
        {userType == null && <ButtonInHeader buttenText={'Login'} onButtenClicked={() => dispatch({ type: ActionType.OpenLoginModal, payload: true })} />}
        {userType != null && <ButtonInHeader buttenText={'Log out'} onButtenClicked={onLogOutButtonClicked} />}
        {userType == null && <ButtonInHeader buttenText={'Register'} onButtenClicked={() => navigate('/register')} />}
        {userType == UsersType.admin && <ButtonInHeader buttenText={'Users'} onButtenClicked={() => navigate('/users')} />}
        {userType && <ButtonInHeader buttenText={'Purchases'} onButtenClicked={() => navigate('/purchases')} />}
        <ButtonInHeader buttenText={'Companies'} onButtenClicked={() => navigate('/companies')} />
        <ButtonInHeader buttenText={'Categories'} onButtenClicked={() => navigate('/categories')} />
        <ButtonInHeader buttenText={'Home'} onButtenClicked={() => navigate('/home')} id={"selectedButtonInHeader"} />
        {userId != null && <div className='div-user-icon'><FaUserCircle className='user-icon' size={'4vh'} onClick={() => editYourDetails()} /><br />Hello, {firstName}</div>}
      </div>
      <CouponsLogo />
      {window.location.pathname == "/home" && <span>
        <SortCouponBy />
        <SearchCouponBy />
      </span>}
      {(userType == UsersType.admin || userType == UsersType.company) && window.location.pathname == PathNames.home &&
        <AddButton textOnButton={'Add coupon'} onButtonClicke={() => dispatch({ type: ActionType.OpenAddCouponModal, payload: true })} />}
      {userType == UsersType.admin && <span>
        {window.location.pathname == PathNames.companies && <AddButton textOnButton={'Add company'} onButtonClicke={() => dispatch({ type: ActionType.OpenAddCompnyModal, payload: true })} />}
        {window.location.pathname == PathNames.users && <AddButton textOnButton={'Add user'} onButtonClicke={() => navigate('/register')} />}
        {window.location.pathname == PathNames.categories && <AddButton textOnButton={'Add category'} onButtonClicke={() => dispatch({ type: ActionType.OpenAddCategoryModal, payload: true })} />}
      </span>}
    </div>
  )
}

export default Header;