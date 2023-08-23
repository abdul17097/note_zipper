import React, { useEffect } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { updateValidationSchema } from '../../../util/validation';
import {useSelector, useDispatch } from 'react-redux';
import { userRegister, userUpdate } from '../../../actions/userAction';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {NavLink , useNavigate}   from 'react-router-dom';

export const Profile = () => {
    const dispatch = useDispatch();
    const user = useSelector((state) => state.userLogin);
    const navigate = useNavigate();

    const initialValues = {
        name: '',
        email: '',
        password: '',
        confirmPassword: '',
        profilePicture: '',
      };
    useEffect(()=>{
        if(!user.userInfo){
            navigate('/');
        }else{
          initialValues.name = user.userInfo.name;
          initialValues.email = user.userInfo.email;
        }
    },[])
  


  const onSubmit = async (values) => {
    const { name, email, password, confirmPassword} = values;
    // Upload profile picture to Cloudinary
    let imageUrl;
    if (values.profilePicture) {
        const formData = new FormData();
        formData.append('file', values.profilePicture);
        formData.append('upload_preset', process.env.REACT_APP_UPLOAD_PRECET); // Create this in Cloudinary
  
        const response = await fetch(
          `https://api.cloudinary.com/v1_1/${process.env.REACT_APP_CLOUD_NAME}/image/upload`,
          {
            method: 'POST',
            body: formData,
          }
        );
  
        const data = await response.json();
        imageUrl = data.secure_url;
        console.log(imageUrl);
        }
    dispatch(userUpdate(name, email, password, confirmPassword, imageUrl));
  };
  return (
    <div className="flex flex-col justify-center mt-4 ">
    <ToastContainer />
    <h1 className="text-4xl font-thin mb-4 text-center">Edit Profile</h1>
    <hr className='mx-10 mb-10'/>
    <div className='flex justify-around h-screen'>
      <div className="w-full max-w-[50%] ">
        <Formik
          initialValues={   initialValues}
          validationSchema={updateValidationSchema}
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
                Update
              </button>
            </Form>
          )}
        </Formik>
      </div>
      <div className='w-[35%] h-[85vh] border  rounded-md'>
        <img src={user.userInfo.imageUrl} className='w-[100%] rounded-md h-[100%]' alt='asdfa'/>
      </div>
    </div>
    </div>
  );
};

