import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { registerValidationSchema } from '../../../util/validation';
import {useSelector, useDispatch } from 'react-redux';
import { userRegister } from '../../../actions/userAction';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {NavLink}   from 'react-router-dom';

export const Register = () => {
    const dispatch = useDispatch();
    const user = useSelector((state) => state.user);
  const initialValues = {
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    profilePicture: null,
  };


  const onSubmit = async (values) => {
    const { name, email, password, confirmPassword} = values;
    // Upload profile picture to Cloudinary
    let imageUrl;
    if (values.profilePicture) {
        const formData = new FormData();
        formData.append('file', values.profilePicture);
        formData.append('upload_preset', 'notezipper'); // Create this in Cloudinary
  
        const response = await fetch(
          `https://api.cloudinary.com/v1_1/dusob1oit/image/upload`,
          {
            method: 'POST',
            body: formData,
          }
        );
  
        const data = await response.json();
        imageUrl = data.secure_url;
        console.log(imageUrl);
        }
    dispatch(userRegister(name, email, password, confirmPassword, imageUrl));
  };

  return (
    <div className="flex items-center justify-center h-screen">
    <ToastContainer />
      <div className="w-full max-w-xs">
        <h1 className="text-3xl font-semibold mb-4">Registration</h1>
        <Formik
          initialValues={initialValues}
          validationSchema={registerValidationSchema}
          onSubmit={onSubmit}
        >
          {(formik) => (
            <Form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
              <div className="mb-4">
                <label htmlFor="name" className="block text-gray-700 text-sm font-bold mb-2">
                  Name
                </label>
                <Field
                  type="text"
                  id="name"
                  name="name"
                  className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                />
                <ErrorMessage name="name" component="div" className="text-red-500 text-xs mt-1" />
              </div>
              <div className="mb-4">
                <label htmlFor="name" className="block text-gray-700 text-sm font-bold mb-2">
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
              <div className="mb-4">
                <label htmlFor="name" className="block text-gray-700 text-sm font-bold mb-2">
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
              <div className="mb-4">
                <label htmlFor="name" className="block text-gray-700 text-sm font-bold mb-2">
                Confirm Password
                </label>
                <Field
                  type="password"
                  id="confirmPassword"
                  name="confirmPassword"
                  className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                />
                <ErrorMessage name="confirmPassword" component="div" className="text-red-500 text-xs mt-1" />
              </div>

              {/* Other Fields (Email, Password, Confirm Password) go here */}

              <div className="mb-4">
                <label htmlFor="profilePicture" className="block text-gray-700 text-sm font-bold mb-2">
                  Profile Picture
                </label>
                <input
                  type="file"
                  id="profilePicture"
                  name="profilePicture"
                  onChange={(event) => {
                    const file = event.currentTarget.files[0];
                    formik.setFieldValue('profilePicture', file); // Use 'formik' here
                  }}
                  className="border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                />
                <ErrorMessage name="profilePicture" component="div" className="text-red-500 text-xs mt-1" />
              </div>

              <button
                type="submit"
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              >
                Register
              </button>
                  <p className='mt-3'>Already Register? <NavLink className='text-underline' to = '/login'>login</NavLink></p>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

