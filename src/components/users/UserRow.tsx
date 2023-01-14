import { IUser } from '../../models/IUser';
import { AiTwotoneDelete } from 'react-icons/ai';
import { CgMoreO } from 'react-icons/cg'
import './UserRow.css'
import { useDispatch } from 'react-redux';
import { ActionType } from '../../redux/action-type';
import { useNavigate } from 'react-router-dom';
import { MdEdit } from 'react-icons/md';
import { UsersType } from '../../enums/UsersType';

export interface IProps {
    user: IUser;
}

function UserRow(props: IProps) {

    const navigate = useNavigate();
    const dispatch = useDispatch();

    function onEditClick() {
        navigate('/register')
        dispatch({ type: ActionType.SelectedUserForUpdate, payload: props.user.id })
    }

    return (
        <tr>
            <td>{props.user.firstName}</td>
            <td>{props.user.lastName}</td>
            <td>{props.user.username}</td>
            <td>{props.user.userType}</td>
            <td><CgMoreO className='user-icon icon' onClick={()=>dispatch({ type: ActionType.SelectedUserForShow, payload: props.user })} /></td>
            {props.user.userType != UsersType.customer && <td> <MdEdit className='user-icon icon' onClick={() => onEditClick()} /></td>}
            {props.user.userType == UsersType.customer && <td>  </td>}

            <td> <AiTwotoneDelete className='user-icon icon' onClick={() => dispatch({ type: ActionType.SelectedUserForDelete, payload: props.user })} /> </td>
        </tr>
    )
}

export default UserRow
