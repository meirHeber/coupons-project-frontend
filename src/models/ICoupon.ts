import { ICategory } from "./ICategory";
import { ICompany } from "./ICompany";

export interface ICoupon {
    id: number,
    company: ICompany,
    category: ICategory,
    title: string,
    description: string,
    startDate: string,
    endDate: string,
    amount: number,
    price: number,
    impage: string,
    image: string
}