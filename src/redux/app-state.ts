import { AlertTypes } from "../enums/AlertTypes";
import { UsersType } from "../enums/UsersType";
import IAlert from "../models/IAlert";
import { ICategory } from "../models/ICategory";
import { ICompany } from "../models/ICompany";
import { ICoupon } from "../models/ICoupon";
import IPurchase from "../models/IPurchase";
import { IUser } from "../models/IUser";
export class AppState{
    public userType: UsersType= null;
    public userId: number = null;
    public companyId: number = null;
    public firstName: string="";

    public currentPageCoupons: ICoupon[] = [];
    public searchCouponsBy: string="title";
    public sortCouponsBy: string="id";
    public openLoginModal: boolean=false;
    public openBuyModal: boolean = false;
    public openDleteCouponModal: boolean = false;
    public openAddCouponModal: boolean = false;
    public openAddCompanyModal: boolean = false;
    public openAddCategoryModal: boolean = false;
    public couponForBuy: ICoupon = null;
    public couponForUpdate: ICoupon = null;
    public couponForDelete: ICoupon = null;
    public companyIdForUpdate:number = null;
    public companyIdForDelete:number = null;
    public categoryIdForUpdate:number = null;
    public categoryIdForDelete:number = null;
    public openDleteCompanyModal: boolean = false;
    public openDleteCategoryModal: boolean = false;
    public openDleteUserModal: boolean = false;
    public userIdForUpdate: number = null;
    public userIdForDelete: IUser = null;
    public openShowUserModal: boolean = false;
    public userForShow: IUser = null;
    public showAlert:boolean = false;
    public alertValue: IAlert = {
        type: AlertTypes.success,
        text: "test"
    };
}