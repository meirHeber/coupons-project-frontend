import { ICompany } from "./ICompany";

export interface IUser {
    id: number,
    firstName: string,
    lastName: string,
    userType: string,
    username: string,
    company?: ICompany,
    address?: string,
    amountOfChildren?: Number
}