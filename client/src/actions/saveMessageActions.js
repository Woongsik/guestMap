export const GET_MESSAGE_SUCCESS = "GET_MESSAGE_SUCCESS";
export const GET_MESSAGE_FAILED = "GET_MESSAGE_FAILED";

export const SAVE_MESSAGE_SUCCESS = "SAVE_MESSAGE_SUCCESS";
export const SAVE_MESSAGE_FAILED = "SAVE_MESSAGE_FAILED";

export const LOADING = "LOADING";

//RETURN

const saveMessageSuccess = () => ({
    type: SAVE_MESSAGE_SUCCESS
})

const saveMessageFailed = (error) => ({
    type: SAVE_MESSAGE_FAILED,
    error: error
})

const loading = () => ({
    type: LOADING
})

export const saveMessage = ( item ) => {
    console.log("saveMessage request")
    return dispatch => {
        const postObject = {
            method: "POST",
            mode: "cors",
            credentials: "include",
            headers: {"Content-Type":"application/json"},
            body: JSON.stringify(item)
        }
        
        dispatch(loading())

        fetch('/api/saveMessage', postObject).then( response => {
            if(response.ok){ 
                dispatch(saveMessageSuccess())
                alert("Your message saved well")
            }else{
                dispatch(saveMessageFailed("response error"))
            }
        }).catch( err => {
            dispatch(saveMessageFailed("server error "+err))
        })
    }
}
