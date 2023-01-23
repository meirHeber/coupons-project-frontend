
export default function CatchFunction(error: any) {

    console.error(error);

    if (error.response) {
        if (error.response.status > 600) {
            alert(error.response.data.errorMessage);
        }
        else if (error.response.status == 401) {
            alert(error.message)

        }
        else if (error.response.status == 600) {
            alert(error.message)
        }
    }
    else if (error instanceof Error) {
        alert(error.message)
    }
}