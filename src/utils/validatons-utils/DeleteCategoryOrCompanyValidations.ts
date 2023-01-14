import { ErrorTypes } from "../../enums/ErrorTypes";
import { UsersType } from "../../enums/UsersType"

function deleteCategoryOrCompanyValidations(userType: string) {
    if(userType != UsersType.admin){
        throw new Error(ErrorTypes.NO_AUTHORIZED);
    }
}

export default deleteCategoryOrCompanyValidations