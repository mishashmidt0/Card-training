import {applyMiddleware, combineReducers, createStore} from "redux"
import thunk from "redux-thunk"
import {loginReducer} from "../n2-auth/a1-login/login-reducer";


const reducers = combineReducers({
    login: loginReducer
})
export const store = createStore(reducers, applyMiddleware(thunk))

//@ts-ignore
window.store = store