import { USER_LOGIN_REQUEST,
    USER_LOGOUT, USER_LOGIN_FAIL,
    USER_LOGIN_SUCCESS,
    USER_REGISTER_SUCCESS, 
    USER_REGISTER_FAIL, 
    USER_REGISTER_REQUEST, 
    USER_UPDATE_SUCCESS, 
    USER_UPDATE_FAIL, 
    USER_UPDATE_REQUEST
 } from "../constant/userLoginConstant"
const initialState = {
    userInfo: null,
    error: null,
    loading: false,
    success: false,
}

export const userLoginReducer = (state = initialState, action) =>{
    switch(action.type){
        case USER_LOGIN_SUCCESS:
            return {
              ...state,
                userInfo: action.payload,
                success: true,
            }
        case USER_LOGIN_FAIL:
            return {
              ...state,
                error: action.payload,
                loading:true
            }
        case USER_LOGOUT:
            return {
             ...state,
                userInfo: null
            }
        case USER_LOGIN_REQUEST:
            return {
              ...state,
                loading: true
            }
        default:
            return state
        };
}

export const userRegisterReducer = (state = initialState, action) =>{
    switch(action.type){
        case USER_REGISTER_SUCCESS:
            return {
              ...state,
                userInfo: action.payload
            }
        case USER_REGISTER_FAIL:
            return {
              ...state,
                error: action.payload,
                loading:true
            }
        case USER_REGISTER_REQUEST:
            return {
              ...state,
                loading: true
            }
        default:
            return state
        };
}


export const userUpdateReducer = (state = initialState, action) =>{
    switch(action.type){
        case USER_UPDATE_SUCCESS:
            return {
             ...state,
                userInfo: action.payload,
                success: true
            }
        case USER_UPDATE_FAIL:
            return {
             ...state,
                error: action.payload,
                loading:true,
                success: false
            }
        case USER_UPDATE_REQUEST:
            return {
             ...state,
                loading: true
            }
        default:
            return state
        };
}

// export const userLogoutReducer = (state, action) =>{
//     switch(action.type){
//         case USER_LOGOUT_REQUEST:
//             return {
//               ...state,
//               loading: true
//             }
//         case USER_LOGOUT_SUCCESS:
//             return {
//               ...state,
//                 loading: false,
//                 userInfo: []
//             }
//         case USER_LOGOUT_FAIL:
//             return {
//             ...state,
//             error: action.payload,
//             loading:true
//                 }
//         default:
//             return state
//         };
// }