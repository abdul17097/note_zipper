import { NOTES_LIST_REQUEST, NOTES_LIST_SUCCESS, NOTES_LIST_FAIL, NOTE_CREATE_REQUEST, NOTE_CREATE_SUCCESS,NOTE_CREATE_FAIL, NOTE_UPDATE_REQUEST, NOTE_UPDATE_SUCCESS, NOTE_UPDATE_FAIL } from "../constant/noteConstant"
const initialState = {
    notes: [],
    loading: false,
    error: null
}
export const noteReducer = (state = initialState, action)=>{
    switch (action.type) {
        case NOTES_LIST_REQUEST:
            return {
                ...state,
                loading: true
            }
        case NOTES_LIST_SUCCESS:
            return {
               ...state,
                 loading: false,
                 notes: action.payload
            }
        case NOTES_LIST_FAIL:
            return {
              ...state,
                loading: false,
                error: action.payload
            }
        default: return state
    }

}

export const noteCreateReducer = (state = {loading: false, notes: [], error: ''}, action) =>{
    switch (action.type) {
        case NOTE_CREATE_REQUEST:
            return {
              ...state,
                loading: true
            }
        case NOTE_CREATE_SUCCESS:
            return {
              ...state,
                loading: false,
                notes: action.payload
            }
        case NOTE_CREATE_FAIL:
            return {
              ...state,
                loading: false,
                error: action.payload
            }
        default: return state
    }
}


export const noteUpdateReducer = (state, action) =>{
    switch (action.type) {
        case NOTE_UPDATE_REQUEST:
            return {
             ...state,
                loading: true
            }
        case NOTE_UPDATE_SUCCESS:
            return {
            ...state,
                loading: false,
                notes: action.payload
            }
        case NOTE_UPDATE_FAIL:
            return {
           ...state,
            }
        default: return state
    }
}