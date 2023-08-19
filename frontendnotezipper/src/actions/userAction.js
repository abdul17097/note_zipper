import { USER_LOGIN_FAIL, USER_LOGIN_REQUEST, USER_LOGIN_SUCCESS, USER_LOGOUT, USER_REGISTER_REQUEST, USER_REGISTER_SUCCESS } from "../constant/userLoginConstant";
import axios from "axios";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const userLogin = (email, password) => async (dispatch) => {
  try {
    dispatch({ type: USER_LOGIN_REQUEST });
    const { data } = await axios.post(
      "/api/users/login",
      {
        email,
        password,
      },
      { headers: { "Content-Type": "application/json" } }
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
    const { data } = await axios.post(
      "/api/users/register",
      {
        name,
        email,
        password,
        confirmPassword,
        imageUrl: imageUrl
      },
      { headers: { "Content-Type": "application/json" } }
    );
    dispatch({ type: USER_REGISTER_SUCCESS, payload: data});
    localStorage.setItem("token", data);
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