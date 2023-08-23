import { toast } from "react-toastify";
import { NOTES_LIST_REQUEST, NOTES_LIST_SUCCESS, NOTES_LIST_FAIL, NOTE_CREATE_REQUEST, NOTE_CREATE_SUCCESS,NOTE_CREATE_FAIL, NOTE_UPDATE_REQUEST, NOTE_UPDATE_SUCCESS, NOTE_UPDATE_FAIL, NOTE_DELETE_REQUEST, NOTE_DELETE_SUCCESS, NOTE_DELETE_FAIL, NOTES_LIST_REMOVE } from "../constant/noteConstant";
import axios from "axios";

export const noteList =  () => async (dispatch) =>{
    const userInfo = localStorage.getItem('token')
    try {
        dispatch({type: NOTES_LIST_REQUEST});
        const {data} = await axios.get('/api/notes',{
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${JSON.parse(userInfo).token}`
            }
        });
        if(data.status !== 201){
            dispatch({type: NOTES_LIST_SUCCESS, payload: data});
        }else{
            dispatch({type: NOTES_LIST_FAIL, payload: "Something went wrong"});
        }
    } catch (error) {
        toast.error("something went wrong");
    }
}


export const noteCreate = (content)=> async (dispatch)=>{
    const {title, value, category} = content;
    try {
        dispatch({type: NOTE_CREATE_REQUEST});
        const data = await axios.post('/api/notes/create',{
            title: title,
            content: value,
            catagory: category
        },
        {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${JSON.parse(localStorage.getItem('token')).token}`
            }
        });
        if(data.status == 201){
            dispatch({type: NOTE_CREATE_SUCCESS, payload: data});
        }else{
            dispatch({type: NOTE_CREATE_FAIL, payload: "Something went wrong"});
        }
    } catch (error) {
        // dispatch({type: NOTE_CREATE_FAIL, payload: "Something went wrong"});
        
    }
}

export const updateNote = (noteId, title, value, catagory)=> async (dispatch)=>{
    try {
        dispatch({type: NOTE_UPDATE_REQUEST});
        const {data} = await axios.put(`/api/notes/${noteId.id}`,
        {
            title: title,
            content: value,
            catagory: catagory,
          },
        {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${JSON.parse(localStorage.getItem('token')).token}`
            }
        });
        if(data.status!== 201){
            dispatch({type: NOTE_UPDATE_SUCCESS,payload: data});
        }else{
            dispatch({type: NOTE_UPDATE_FAIL, payload: "Something went wrong"});
        }
    } catch (error) {
        toast.error("something went wrong");
    }
}

export const noteDelete = (_id)=> async (dispatch) => {
    try {
        dispatch({type: NOTE_DELETE_REQUEST});
        const {data} = await axios.delete(`/api/notes/${_id}`,{
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${JSON.parse(localStorage.getItem('token')).token}`
            }
        }); 
        if(data.success){
            dispatch({type: NOTE_DELETE_SUCCESS, payload: _id});
        }
        else{
            dispatch({type: NOTE_DELETE_FAIL, payload: "Something went wrong"});
        }
    } catch (error) {
        // toast.error("something went wrong");
    }
}
 
export const noteRemovelog = () => async(dispatch) => {
    try {
        dispatch({type: NOTES_LIST_REMOVE})
    } catch (error) {
        dispatch({type: NOTES_LIST_FAIL});
    }
}