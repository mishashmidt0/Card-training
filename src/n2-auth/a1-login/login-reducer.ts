import {Dispatch} from "redux";
import {dataType, loginApi} from "./loginApi";

const initialState = {
    isAuth: false
}


export const loginReducer = (state: loginStateType = initialState, action: actionType) => {
    switch (action.type) {
        case "auth":
            return {...state, isAuth: action.value}
        default:
            return state
    }
}

// action
const login = (value: boolean) => ({
    type: "auth",
    value
} as const)

// thunk

export const loginTC = (data: dataType) => (dispatch: Dispatch<any>) => {
    loginApi.login(data).then(res => {
        try {
            console.log(res)
            dispatch(login(res.data.value))
        } catch (e: any) {
            const err = e.responce ? e.responce.data.error : (e.message + "more details in the console")
        }
    })
}

// type
export
type loginStateType = {
    isAuth: boolean
}
type actionType = ReturnType<typeof login>