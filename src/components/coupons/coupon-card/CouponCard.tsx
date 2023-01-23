import './CouponCard.css';
import { useDispatch, useSelector } from 'react-redux';
import { ActionType } from '../../../redux/action-type';
import { AppState } from '../../../redux/app-state';
import { ICoupon } from '../../../models/ICoupon';
import { MdEdit } from 'react-icons/md';
import { AiTwotoneDelete } from 'react-icons/ai';
import { UsersType } from '../../../enums/UsersType';


export interface IProps {
    coupon: ICoupon;
}


function CouponCard(props: IProps) {

    const dispatch = useDispatch();
    const userType: string = useSelector((state: AppState) => state.userType);
    const isLogedIn: string = useSelector((state: AppState) => state.firstName);

    function buyIt() {
        if (isLogedIn == "") {
            dispatch({ type: ActionType.OpenLoginModal, payload: true })
        }
        else {
            dispatch({ type: ActionType.SelectedCouponForBuy, payload: props.coupon })
        }
    }

    return (
        <div className="flip-card-container" >

            <div className="flip-card">
                <div className="card-front">
                    <figure>
                        <div className="img-bg"></div>
                        <img className='img' src={props.coupon.image} ></img>
                        <figcaption>{props.coupon.category.name}</figcaption>
                    </figure>
                    <ul>
                        <li className='price'>{props.coupon.price} $</li>
                        <li>company: {props.coupon.company.name}</li>
                        <li>{props.coupon.title}</li>
                        <li>{props.coupon.description}</li>
                        <li>left in stock: <span className='numbers-in-coupon-card'>{props.coupon.amount}</span></li>
                        <li>expiration :<span className='numbers-in-coupon-card'>{props.coupon.endDate}</span> </li>
                    </ul>
                </div>

                <div className="card-back">
                    <figure>
                        <div className="img-bg"></div>
                    </figure>

                    {(userType == null || userType == UsersType.customer) && <button className='card-button' onClick={buyIt}>Buy!</button>}
                    {(userType == UsersType.admin || userType == UsersType.company) && <button className='card-delete-edit-button' onClick={() => dispatch({ type: ActionType.SelectedCouponForDelete, payload: props.coupon })}><AiTwotoneDelete className='edit-and-delete-coupon-icon' /></button>}
                    {(userType == UsersType.admin || userType == UsersType.company) && <button className='card-delete-edit-button' onClick={() => dispatch({ type: ActionType.SelectedCouponForUpdate, payload: props.coupon })}>< MdEdit className='edit-and-delete-coupon-icon' /></button>}


                    <div className="design-container">
                        <span className="design design--1"></span>
                        <span className="design design--2"></span>
                        <span className="design design--3"></span>
                        <span className="design design--4"></span>
                        <span className="design design--5"></span>
                        <span className="design design--6"></span>
                        <span className="design design--7"></span>
                        <span className="design design--8"></span>
                    </div>
                </div>

            </div>
        </div>

    );
}

export default CouponCard;