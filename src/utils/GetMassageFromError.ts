import React from 'react'

function GetMassageFromError(error: any):string {
    console.error(error);
    if (error.response) {
        if (error.response.status > 600) {
            return error.response.data.errorMessage;
        }
        else  {
            return error.message;
        }
    }
    else if (error instanceof Error) {
        return error.message;
    }
}

export default GetMassageFromError