import { ClassElement } from "typescript";
import { CouponParametersForSearch } from "../enums/CouponParamters";

export interface IDropdown {
    parameters: any,
    textOnButton: string,
    onClick: Function
}