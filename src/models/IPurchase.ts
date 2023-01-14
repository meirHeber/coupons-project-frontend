import { ICoupon } from "./ICoupon";
import { IUser } from "./IUser";

export default interface IPurchase{
    id: number,
    amount: number,
    timeStamp: string,
    totalPrice: number,
    coupon: ICoupon,
    customer: IUser,
}