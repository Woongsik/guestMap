import { combineReducers } from "redux";
import messageReducer from './saveMessageReducer'

export default combineReducers({
    getMessage: messageReducer
})