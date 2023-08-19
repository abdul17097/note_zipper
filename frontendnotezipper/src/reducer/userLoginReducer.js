import { USER_LOGIN_REQUEST, USER_LOGOUT, USER_LOGIN_FAIL, USER_LOGIN_SUCCESS, USER_REGISTER_SUCCESS, USER_REGISTER_FAIL, USER_REGISTER_REQUEST } from "../constant/userLoginConstant"
const initialState = {
    userInfo: null,
    error: null,
    loading: false
}

export const userLoginReducer = (state = initialState, action) =>{
    switch(action.type){
        case USER_LOGIN_SUCCESS:
            return {
              ...state,
                userInfo: action.payload
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