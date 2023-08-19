import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { loginValidationSchema } from '../../../util/validation';
import { useSelector, useDispatch } from 'react-redux';
import { userLogin } from '../../../actions/userAction';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {NavLink, useNavigate}   from 'react-router-dom';

export const Login = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate()
;    const user = useSelector((state)=> state.userLogin)
    const { userInfo } = user;
    
  const initialValues = {
    email: '',
    password: '',
  };


  const onSubmit = (values) => {
    dispatch(userLogin(values.email, values.password));
    const user = localStorage.getItem('token');
    if(user){
        navigate('/mynote')
    }else{
      navigate('/login');
    }
  };

  return (
    <div className="flex items-center justify-center h-screen">
    <ToastContainer/>
      <div className="w-full max-w-xs">
        <h1 className="text-3xl font-semibold mb-4">Login</h1>
        <Formik
          initialValues={initialValues}
          validationSchema={loginValidationSchema}
          onSubmit={onSubmit}
        >
          <Form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
            <div className="mb-4">
              <label htmlFor="email" className="block text-gray-700 text-sm font-bold mb-2">
                Email
              </label>
              <Field
                type="email"
                id="email"
                name="email"
                className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />
              <ErrorMessage name="email" component="div" className="text-red-500 text-xs mt-1" />
            </div>

            <div className="mb-6">
              <label htmlFor="password" className="block text-gray-700 text-sm font-bold mb-2">
                Password
              </label>
              <Field
                type="password"
                id="password"
                name="password"
                className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />
              <ErrorMessage name="password" component="div" className="text-red-500 text-xs mt-1" />
            </div>

            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              Login
            </button>
            <p className='mt-3'>you're not register? <NavLink className='text-underline' to = '/register'>register</NavLink></p>

          </Form>
        </Formik>
      </div>
    </div>
  );
};
