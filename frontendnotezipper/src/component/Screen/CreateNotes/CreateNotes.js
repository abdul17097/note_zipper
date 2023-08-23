import React, { useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { useDispatch, useSelector } from 'react-redux';
import { noteCreate } from '../../../actions/noteAction';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';

export const CreateNote = () => {
  const [content, setContent] = useState({
    title: '',
    value: '',
    category: '',
  });
  const navigate = useNavigate();
  
  const noteCreates = useSelector((state) => state.noteCreateReducer);
  const dispatch = useDispatch();
  
  const handleEditorChange = (value) => {
    setContent((prevContent) => ({ ...prevContent, value }));
  };
  
  const handleChangeEvent = (event) => {
    const { name, value } = event.target;
    setContent((prevContent) => ({ ...prevContent, [name]: value }));
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    const { title, value, category } = content;
    console.log(content);
    if(!title || !value || !category){
      toast.error('Please fill all fields');
      return;
    }
    dispatch(noteCreate( content ));
    console.log(noteCreates);
    if (noteCreates.notes) {
      toast.success('Successfully Note created');
      setTimeout(function () {
        navigate('/mynote');
      },[1000]);
      
    } else {
      toast.error('Something went wrong');
    }
  };
  
  const reset = () => {
    setContent({
      title: '',
      value: '',
      category: '',
    });
  };
  
  const current = new Date();
  
  return (
    <div>
      <ToastContainer />
      <div className='flex flex-col px-16 gap-3 mb-10'>
        <h1 className='text-4xl pt-5 pb-2 font-thin'>Create a Note</h1>
        <hr />
        <form className='border border-black border-black-black pt-5' onSubmit={handleSubmit}>
          <h2 className='w-full text-center pb-3 text-2xl font-thin'>Create a new Note</h2>
          <div className='flex flex-col px-5 gap-4'>
            <div className='flex flex-col gap-3'>
              <label>Title</label>
              <input
                onChange={handleChangeEvent}
                type='text'
                className='border border-black focus:outline-none rounded-sm h-8 pl-2 font-thin'
                name='title'
                value= {content.title}
              />
            </div>
            <div className='flex flex-col gap-3'>
              <label>Content</label>
              <ReactQuill
                value={content.value}
                className='border border-black'
                name='content'
                onChange={handleEditorChange}
              />
            </div>
            <div className='flex flex-col gap-3'>
              <label>Category</label>
              <input
                onChange={handleChangeEvent}
                type='text'
                className='border border-black focus:outline-none rounded-sm h-8 pl-2 font-thin'
                name='category'
                value= {content.category}

              />
            </div>
            <div className='flex gap-3 w-[100%] justify-between'>
              <button type='submit' className='border border-black flex p-1 justify-center rounded-sm w-[50%]'>
                Create Note
              </button>
              <button type='button' onClick={reset} className='border border-black flex p-1 justify-center rounded-sm w-[50%]'>
                Reset
              </button>
            </div>
          </div>
          <div className='border-t border-black mt-5 p-2'>Creating on - {current.toLocaleTimeString('en-US')}</div>
        </form>
      </div>
    </div>
  );
};

