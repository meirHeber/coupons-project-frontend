import { ActionType } from "./action-type";
import { Action } from "./acyion";
import { AppState } from "./app-state";
import jwt_decode from "jwt-decode";
import { UsersType } from "../enums/UsersType";


export function reduce(oldaAppState: AppState = new AppState(), action: Action): any {

    const newAppState = { ...oldaAppState };
    switch (action.type) {
        case ActionType.Login:
            let userLoginDate: any = jwt_decode(action.payload)
            newAppState.userType = userLoginDate.iss;
            newAppState.firstName = userLoginDate.sub;
            newAppState.userId = +userLoginDate.jti;            
            newAppState.openLoginModal = false;
            if (userLoginDate.iss === UsersType.company) {
                newAppState.companyId = +userLoginDate.aud;
            }                                  
            break;
        case ActionType.LogOut:
            newAppState.userType = null;
            newAppState.firstName = "";
            newAppState.userId = null;
            newAppState.companyId = null;
            localStorage.setItem('token', "")
            break;
        case ActionType.ChangedCouponParameterFoerSearch:
            newAppState.searchCouponsBy = action.payload;
            break;
        case ActionType.ChangedCouponParameterFoerSort:
            newAppState.sortCouponsBy = action.payload;
            break;
        case ActionType.OpenLoginModal:
            newAppState.openLoginModal = action.payload;
            break;
        case ActionType.SelectedCouponForBuy:
            if (action.payload != null) {
                newAppState.couponForBuy = action.payload;
                newAppState.openBuyModal = true;
            }
            else {
                newAppState.couponForBuy = null;
                newAppState.openBuyModal = false;
            }
            break;
        case ActionType.SelectedCouponForDelete:
            if (action.payload != null) {
                newAppState.openDleteCouponModal = true;
                newAppState.couponForDelete = action.payload;

            }
            else {
                newAppState.openDleteCouponModal = false;
                newAppState.couponForDelete = null;
            }
            break;
        case ActionType.SelectedCompanyForDelete:
            if (action.payload != null) {
                newAppState.openDleteCompanyModal = true;
                newAppState.companyIdForDelete = action.payload;
            }
            else {
                newAppState.openDleteCompanyModal = false;
                newAppState.companyIdForDelete = null;
            }
            break;

        case ActionType.SelectedCategoryForDelete:
            if (action.payload != null) {
                newAppState.openDleteCategoryModal = true;
                newAppState.categoryIdForDelete = action.payload;
            }
            else {
                newAppState.openDleteCategoryModal = false;
                newAppState.categoryIdForDelete = null;
            }
            break;

        case ActionType.SelectedCouponForUpdate:
            newAppState.couponForUpdate = action.payload;
            newAppState.openAddCouponModal = true;
            break;
        case ActionType.OpenAddCouponModal:
            newAppState.openAddCouponModal = action.payload;
            if (action.payload == false) {
                newAppState.couponForUpdate = null;
            }
            break;
        case ActionType.OpenAddCompnyModal:
            newAppState.openAddCompanyModal = action.payload;
            if (action.payload == false) {
                newAppState.companyIdForUpdate = null;
            }
            break;
        case ActionType.OpenAddCategoryModal:
            newAppState.openAddCategoryModal = action.payload;
            if (action.payload == false) {
                newAppState.categoryIdForUpdate = null;
            }
            break;
        case ActionType.SelectedCompanyForUpdate:
            newAppState.companyIdForUpdate = action.payload;
            if (action.payload) {
                newAppState.openAddCompanyModal = true;
            }
            else {
                newAppState.openAddCompanyModal = false;
            }
            break;
        case ActionType.SelectedCategoryForUpdate:
            newAppState.categoryIdForUpdate = action.payload;
            if (action.payload != null) {
                newAppState.openAddCategoryModal = true;
            }
            else {
                newAppState.openAddCategoryModal = false;
            }
            break;


        case ActionType.SelectedUserForUpdate:
            newAppState.userIdForUpdate = action.payload;
            break;
        case ActionType.SelectedUserForDelete:
            newAppState.userIdForDelete = action.payload;
            if (action.payload) {
                newAppState.openDleteUserModal = true;
            }
            else {
                newAppState.openDleteUserModal = false;
            }
            break;
        case ActionType.SelectedUserForShow:
            newAppState.userForShow = action.payload;
            if (!action.payload) {
                newAppState.openShowUserModal = false;
            }
            else{
                newAppState.openShowUserModal = true;
            }
            break;
        case ActionType.OpenShowUserModal:
            newAppState.openShowUserModal = action.payload;
            if (!action.payload) {
                newAppState.userForShow = null;
            }
            break;



    }
    return newAppState;
}