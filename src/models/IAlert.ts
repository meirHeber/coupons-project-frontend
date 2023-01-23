import { AlertTypes } from "../enums/AlertTypes";

export default interface IAlert{
    type: AlertTypes,
    text: string
}