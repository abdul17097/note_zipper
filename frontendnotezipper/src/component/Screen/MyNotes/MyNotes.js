import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { noteList } from '../../../actions/noteAction';
import { NavLink, useNavigate } from 'react-router-dom';
import { Note } from './Note';

export const MyNotes = ({search}) => {
  const dispatch = useDispatch();
  const notes = useSelector((state)=> state.noteReducer);
  const user = useSelector((state)=> state.userLogin);
  const showNotes = ()=>{
    dispatch(noteList())
  }
useEffect(()=>{
  showNotes()
},[])
// .reverse().filter((selectedNote)=>{
//   return selectedNote.title.toLowerCase().includes(search.toLowerCase())
// })
  return (
    <div>
      <div className='flex flex-col px-16  gap-3'>
        <h1 className='text-4xl pt-5 pb-2 font-thin'>Welcome Back {user.userInfo?.name}</h1>
        <hr/>
        <NavLink to='/createNotes' className='border p-1 flex w-40 justify-center items-center text-xl rounded-md'>Create Note</NavLink>
        {
          notes?.notes.reverse().map((note)=>{
            return <Note key={note.id} note={note}/>
          })
        }
      </div>  
    </div>
  );
};
