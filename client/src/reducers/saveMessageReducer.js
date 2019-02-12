import {
    GET_MESSAGE_SUCCESS,
    GET_MESSAGE_FAILED,
    SAVE_MESSAGE_SUCCESS, 
    SAVE_MESSAGE_FAILED, 
    LOADING
} from '../actions/saveMessageActions'

const initialState = {
    item: [],
    error: "",
    loading: false
}

export default function saveMessageReducer(state=initialState, action){
    switch(action.type){

        case GET_MESSAGE_SUCCESS:
            return {
                ...state,
                loading: false,
                item: action.item
            }
        
        case GET_MESSAGE_FAILED:
            return {
                ...state,
                loading: false,
                error: action.error
            }

        case SAVE_MESSAGE_SUCCESS:
            return {
                ...state,
                loading: false
            }
        case SAVE_MESSAGE_FAILED:
            return {
                ...state,
                error: action.error,
                loading: false
            }
        case LOADING:
            return {
                ...state,
                loading: true
            }
        default:
            return state;
    }
}