import React, { useState } from 'react'
import { NavLink } from 'react-router-dom'

export const Note = ({note}) => {
    const {title, content, catagory} = note;
    const [toggle,setToggle] = useState(false)
  return (
    <div className={`flex box-border flex-col  ${toggle?'':'h-12'}`}>
        <div className={`flex justify-between  px-4 py-1 border items-center ${toggle? 'rounded-t-md': 'rounded-md'}`} onClick={()=> setToggle(!toggle)}>
        <h2 className='font-bold'>{title}</h2>
        <div className='flex gap-5  '>
            <NavLink className='border h-10 w-16 flex justify-center items-center' onClick={(e)=> e.stopPropagation()}>Edit</NavLink>
            <NavLink className='border h-10 w-16 flex justify-center items-center' onClick={(e)=> e.stopPropagation()}>Delete</NavLink>
        </div>
        </div>
        <div className={`flex p-2 border rounded-b-md border-t-0 ${toggle?'visible h-32':'invisible h-none'}`}>
           <div dangerouslySetInnerHTML={{ __html: content }} />
        </div>
    </div>
  )
}
