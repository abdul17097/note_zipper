import { USER_LOGIN_FAIL, USER_LOGIN_REQUEST, USER_LOGIN_SUCCESS, USER_LOGOUT, USER_REGISTER_REQUEST, USER_REGISTER_SUCCESS, USER_UPDATE_FAIL, USER_UPDATE_REQUEST, USER_UPDATE_SUCCESS } from "../constant/userLoginConstant";
import axios from "axios";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const userLogin = (email, password) => async (dispatch) => {
  try {
    dispatch({ type: USER_LOGIN_REQUEST });
    axios.defaults.withCredentials = true
    const { data } = await axios.post(
      "https://note-zipper-zeta.vercel.app/api/users/login",
      {
        email,
        password,
      },
      { headers: { "Content-Type": "application/json", "Access-Control-Allow-Origin": '*' } }
    );
  localStorage.setItem("token", JSON.stringify(data));
    toast.success("Login Success");
    dispatch({ type: USER_LOGIN_SUCCESS, payload: data});
    if (data.status === "401") {
      toast.error("User not found");
    }
  } catch (error) {
    toast.error("Invalid credentials");
    dispatch({ type: USER_LOGIN_FAIL });
  }
};

export const userRegister = (name, email, password, confirmPassword, imageUrl ) => async (dispatch) => {
  try {
    dispatch({ type: USER_REGISTER_REQUEST});
    axios.defaults.withCredentials = true
    const { data } = await axios.post(
      "https://note-zipper-zeta.vercel.app/api/users/register",
      {
        name,
        email,
        password,
        confirmPassword,
        imageUrl: imageUrl
      },
      { headers: { "Content-Type": "application/json", "Access-Control-Allow-Origin": "*" } }
    );
    dispatch({ type: USER_REGISTER_SUCCESS, payload: data});
    localStorage.setItem("token", JSON.stringify(data));

    toast.success("Register Success");
    if(data.status === 409){
      toast.error("User already exists");
    }else if(data.status === 201){
      toast.success("User created");
    }else{
      toast.error("Something went wrong");
    }
  } catch (error) {
    toast.error("Something went wrong");
  }
}

export const userLogout = () => async (dispatch) => {
  try {
    localStorage.removeItem("token");
    dispatch({ type: USER_LOGOUT });
  } catch (error) {
    toast.error("Something went wrong");
  }
}

export const userUpdate = (name, email, password, confirmPassword, imageUrl) => async (dispatch) => {
  const token = JSON.parse(localStorage.getItem('token')).token;
  try {
    dispatch({ type: USER_UPDATE_REQUEST });
    // const  { data }  = await axios.post(
    //   "/api/users/profile",
    //   {
    //     name,
    //     email,
    //     password,
    //     confirmPassword,
    //     imageUrl
    //   },
    //   {
    //      headers: { 
    //     "Content-Type": "application/json",
    //     "Authorization": `Bearer ${JSON.parse(localStorage.getItem('token')).token}`  
    //   } }
    // );
    const response = await fetch("/api/users/profile",
      {
        method: "PUT",
        body: JSON.stringify( {
          name,
          email,
          password,
          confirmPassword,
          imageUrl
        }),
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${JSON.parse(localStorage.getItem('token')).token}`
        }
      
      }
    )
    const request = await response.json()
    if(request._id){
      toast.success("User updated");
      dispatch({ type: USER_UPDATE_SUCCESS, payload: request});
      dispatch({ type: USER_LOGIN_SUCCESS, payload: request})
      localStorage.setItem("token", JSON.stringify(request));
    }else{
      dispatch({ type: USER_UPDATE_FAIL});
    }
      

    
  } catch (error) {
    // toast.error("Something went wrong");
    dispatch({ type: USER_UPDATE_FAIL});

  }
}