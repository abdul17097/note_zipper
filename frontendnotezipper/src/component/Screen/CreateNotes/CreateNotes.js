import React, { useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { useDispatch, useSelector } from 'react-redux';
import { noteCreate } from '../../../actions/noteAction';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const CreateNote = () =>{
  const [content, setContent] = useState({});
  const noteCreates = useSelector((state)=> state.noteCreateReducer)

  const dispatch = useDispatch()
  const handleEditorChange = (value) =>{
    setContent({...content,value});
  };
  const handleChangeEvent = (event) => {
    const {name, value} = event.target;
    setContent({...content, [name]: value});
  };

  const handleSubmit = (e) => {
    const {title, value, catagory} = content;
    console.log(title, value, catagory);
    e.preventDefault();
    dispatch(noteCreate({title, value, catagory}))
    if(noteCreates.notes){
      toast.success("Successfully Note created")
    }else{
      toast.error("Something went wrong")
    }

  };
  const current = new Date();
  return (
    <div>
    <ToastContainer />
      <div className='flex flex-col px-16  gap-3 mb-10'>
        <h1 className='text-4xl pt-5 pb-2 font-thin'>Create a Note</h1>
        <hr/>
        <form className='border border-black  border-black-black pt-5' onSubmit={handleSubmit} >
          <h2 className='w-full text-center pb-3 text-2xl font-thin '>Create a new Note</h2>
          <div className='flex flex-col px-5  gap-4'>
          <div className='flex flex-col gap-3  '>
            <label>Title</label>
            <input onChange={(event)=>handleChangeEvent(event)} type="text" className='border border-black focus:outline-none rounded-sm h-8 pl-2 font-thin' name="title"/>
          </div>
          <div className='flex flex-col gap-3  '>
            <label>Content</label>
            {/* <input type="text" className='border border-black focus:outline-none rounded-sm h-8 pl-2 font-thin' name="content"/> */}
            <ReactQuill value={content.value} className='border border-black' name='content' onChange={handleEditorChange} />

          </div>
          <div className='flex flex-col gap-3  '>
            <label>Catagory</label>
            <input onChange={(event)=>handleChangeEvent(event)}  type="text" className='border border-black focus:outline-none rounded-sm h-8 pl-2 font-thin' name="catagory"/>
          </div>
          <div className='flex gap-3 w-[100%]  justify-between '>
            <button type='submit' className='border border-black flex p-1 justify-center rounded-sm w-[50%]'>Create Note</button>
            <button className='border border-black flex p-1 justify-center rounded-sm w-[50%] '>Reset</button>
          </div>
          </div>
          <div className='border-t border-black mt-5 p-2'>Creating on - {current.toLocaleTimeString("en-US")}</div>

        </form>
      </div>  
    </div>
    // <div>
    
    //   <ReactQuill value={content} onChange={handleEditorChange} />
    //   <button onClick={handleSubmit}>Submit</button>
    //   {/* <pre>{content}</pre> */}
    // </div>
  );
}

