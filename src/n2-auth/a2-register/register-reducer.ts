import {Dispatch} from "redux";


const initialState = {}


export const registerReducer = (state: loginStateType = initialState, action: any) => {
    switch (action.type) {
        case "auth":
            return {...state, isAuth: action.value}
        default:
            return state
    }
}

// action
// const login = (value: boolean) => ({
//     type: "auth",
//     value
// } as const)

// thunk

// export const loginTC = (data: dataType) => (dispatch: Dispatch<any>) => {
//     loginApi.login(data).then(res => {
//         try {
//             console.log(res)
//             dispatch(login(res.data.value))
//         } catch (e: any) {
//             const err = e.responce ? e.responce.data.error : (e.message + "more details in the console")
//         }
//     })
// }

// type
export
type loginStateType = {}
// type actionType = ReturnType<typeof login>