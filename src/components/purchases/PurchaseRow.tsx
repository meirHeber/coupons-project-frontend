import IPurchase from '../../models/IPurchase';
import { useSelector } from 'react-redux';
import { AppState } from '../../redux/app-state';
import { UsersType } from '../../enums/UsersType';

export interface IProps {
    purchase: IPurchase;
}

function PurchaseRow(props: IProps) {

const userType: string = useSelector((state: AppState)=>state.userType);

    return (
        <tr className='user-row'>
            {userType != UsersType.customer && <td>{props.purchase.customer.firstName + " " + props.purchase.customer.lastName }</td>}
            <td>{props.purchase.coupon.title}</td>
            <td>{props.purchase.coupon.description}</td>
            <td>{props.purchase.amount}</td>
            <td>{props.purchase.coupon.company.name}</td>
            <td>{props.purchase.coupon.category.name}</td>
            <td><b>{props.purchase.totalPrice}$</b></td>
            <td>{props.purchase.timeStamp}</td>
        </tr>
    )
}

export default PurchaseRow
