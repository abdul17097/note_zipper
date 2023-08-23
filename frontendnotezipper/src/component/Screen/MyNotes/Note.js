import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, useNavigate, Navigate } from 'react-router-dom'
import {noteDelete} from '../../../actions/noteAction'
import { toast } from 'react-toastify';
import Swal from 'sweetalert2'
export const Note = ({note}) => {
    const {_id ,title, content, catagory} = note;
    const [toggle,setToggle] = useState(false)
    const dispatch = useDispatch();
    const navigate = useNavigate()
    const removeNote = useSelector(state => state.noteDeleteReducer)
    // const noteList = useSelector(state => state.noteReducer)

    const deleteNote =async (e) => {
      e.stopPropagation();
      Swal.fire({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!'
      }).then((result) => {
        if (result.isConfirmed) {
          Swal.fire(
            'Deleted!',
            'Your file has been deleted.',
            'success'
          )
          dispatch(noteDelete(_id))
          setTimeout(()=>{
            navigate('/mynote')
          },2000)
        }
      })
    }
  return (
    <div className={`flex box-border flex-col ${toggle?'':'h-12'}`}>
        <div className={`flex justify-between  px-4 py-1 border items-center ${toggle? 'rounded-t-md': 'rounded-md'}`} onClick={()=> setToggle(!toggle)}>
        <h2 className='font-bold'>{title}</h2>
        <div className='flex gap-5  '>
            <NavLink to={`/note/${_id}`} className='border h-10 w-16 flex justify-center items-center' onClick={(e)=> e.stopPropagation()}>Edit</NavLink>
            <div  className='border h-10 w-16 flex justify-center items-center cursor-pointer' onClick={deleteNote}>Delete</div>
        </div>
        </div>
        <div className={`flex p-2 border  rounded-b-md border-t-0 ${toggle?'visible h-52 mb-3 overflow-auto':'invisible h-none'}`}>
           <div  dangerouslySetInnerHTML={{ __html: content }} />
        </div>
    </div>
  )
}
