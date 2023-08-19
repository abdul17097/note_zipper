import React from 'react'
import { useSelector } from 'react-redux'
import { NavLink, useNavigate } from 'react-router-dom'
  const Header = () => {
  const navigate = useNavigate()
  const user = useSelector(state => state.userLogin)
  
  // console.log(userInfo);
  const logout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  }
  return (
    <div className='w-full h-16 flex justify-between px-10 bg-slate-600 text-white items-center'>
        <NavLink to='/mynote' className='text-lg'>MyNotes</NavLink>
        <div className='flex border rounded-sm'>
            <input type="text" className='pl-1 rounded-tl-sm rounded-bl-sm text-black focus:outline-none' placeholder="Search Your Notes"/>
            <div className=' p-1 px-2 bg-slate-400 rounded-tr-sm cursor-pointer text-black'>Search</div>
        </div>
        <div className='flex gap-2 items-center'>
          <NavLink to='/' className='text-lg'>Home</NavLink>
          <NavLink to='/mynote' className='text-lg'></NavLink>
          <p className='text-lg cursor-pointer ' onClick={()=> logout()}>Logout</p>
          {
            localStorage.getItem('token') ?<p className='bg-gray-500 text-white w-8 h-8 rounded-[50%] flex justify-center items-center text-sm '>{user.userInfo.name.toString().charAt(0)} </p>  : <img className='w-8 rounded-[50%] object-fill  h-8' src='person.png'/>
          }
          
        </div>
    </div>
  )
}

export default Header


