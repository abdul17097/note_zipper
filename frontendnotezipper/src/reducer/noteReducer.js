import { NOTES_LIST_REQUEST, NOTES_LIST_SUCCESS, NOTES_LIST_FAIL, NOTE_CREATE_REQUEST, NOTE_CREATE_SUCCESS,NOTE_CREATE_FAIL, NOTE_UPDATE_REQUEST, NOTE_UPDATE_SUCCESS, NOTE_UPDATE_FAIL, NOTE_DELETE_REQUEST, NOTE_DELETE_SUCCESS, NOTE_DELETE_FAIL, NOTES_LIST_REMOVE } from "../constant/noteConstant"
const initialState = {
    notes: [],
    loading: false,
    error: null,
    success: false,
    noteId: ""

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
        case NOTES_LIST_REMOVE:
            return {
              ...state,
                loading: false,
                notes: []
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

export const noteCreateReducer = (state = initialState, action) =>{
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
                success: true,
                notes: [...state.notes,action.payload]
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


export const noteUpdateReducer = (state = initialState, action) =>{
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
                success: true,
                notes: [...state.notes,action.payload],
            }
        case NOTE_UPDATE_FAIL:
            return {
           ...state,
           loading: false,  
           success: false,
           error: action.payload
            }
        default: return state
    }
}

export const noteDeleteReducer = (state = initialState, action) =>{
    const updatedNotes = state.notes.filter(item => item.id !== action.payload);
    switch (action.type) {
        case NOTE_DELETE_REQUEST:
            return {
             ...state,
                loading: true
            }
        case NOTE_DELETE_SUCCESS:
            return {
             ...state,
                loading: false,
                success: true,
                notes: updatedNotes,
                noteId: action.payload
            }
        case NOTE_DELETE_FAIL:
            return {
             ...state,
                loading: false,
                success: false,
                error: action.payload
            }
        default: return state
    }
}