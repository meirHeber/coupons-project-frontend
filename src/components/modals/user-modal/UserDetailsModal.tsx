import React from 'react'
import { BiRadioCircleMarked } from 'react-icons/bi';
import { FaUserEdit } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom';
import { UsersType } from '../../../enums/UsersType';
import { IUser } from '../../../models/IUser';
import { ActionType } from '../../../redux/action-type';
import { AppState } from '../../../redux/app-state'
import GenericModal from '../generic-modal/GenericModal'
import './UserDetailsModal.css'

function UserDetailsModal() {

  const navigate = useNavigate();

  const dispatch = useDispatch();

  const userId: number = useSelector((state: AppState) => state.userId);
  const isOpen: boolean = useSelector((state: AppState) => state.openShowUserModal);
  const user: IUser = useSelector((state: AppState) => state.userForShow);

  function closeModal() {
    dispatch({ type: ActionType.OpenShowUserModal, payload: false })
  }
  function onEditClock() {
    navigate('/register')
    dispatch({ type: ActionType.SelectedUserForUpdate, payload: user.id })
    dispatch({ type: ActionType.OpenShowUserModal, payload: false })
  }

  return (
    <GenericModal
      isOpen={isOpen}
      onAfterOpen={undefined}
      onRequestClose={undefined}
      closeModal={closeModal}
      insideHteml={
        <div>
          {user && <div className='show-user-details-inside'>
            {userId != user.id && <h1>User details</h1>}
            {userId == user.id && <h1>Your details</h1>}
            {user.id != userId && <BiRadioCircleMarked className='icon-in-user-modal' />}
            {user.id == userId && <div><div className='edit-user-icon-in-modal'><FaUserEdit onClick={() => onEditClock()} /></div></div>}
            <div className='add-coupon-modal-inside'>
              <div className='input-and-label-div'>
                <p><span>first name:</span> {user.firstName}</p>
                <hr />
              </div>
              <div className='input-and-label-div'>
                <p><span>last name:</span> {user.lastName}</p>
                <hr />
              </div>
              <div className='input-and-label-div'>
                <p><span>username:</span> {user.username}</p>
                <hr />
              </div>
              <div className='input-and-label-div'>
                <p><span>user type:</span> {user.userType}</p>
                <hr />
              </div>
              {user.userType == UsersType.company && <div className='input-and-label-div'>
                <p><span>company name:</span> {user.company.name}</p>
                <hr />
              </div>}
              {user.userType == UsersType.customer && <span><div className='input-and-label-div'>
                <p><span>address: </span>{user.address}</p>
                <hr />
              </div>
                <div className='input-and-label-div'>
                  <p><span>amount of children:</span> {+user.amountOfChildren}</p>
                  <hr />
                </div>
              </span>}
            </div>
          </div>}
        </div>
      } />
  )
}

export default UserDetailsModal