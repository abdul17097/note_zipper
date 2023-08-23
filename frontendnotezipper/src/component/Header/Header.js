import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { NavLink, useNavigate } from 'react-router-dom'
import { noteRemovelog } from '../../actions/noteAction'
import { userLogout } from '../../actions/userAction'
  const Header = ({setSearch}) => {
    const dispatch = useDispatch()
  const navigate = useNavigate()
  const user = useSelector(state => state.userLogin)
  
  // console.log(userInfo);
  const logout = () => {
    dispatch(noteRemovelog());
    dispatch(userLogout());
    navigate('/login');
  }
  return (
    <div className='w-full h-16 flex justify-between px-10 bg-slate-600 text-white items-center'>
        {user.userInfo?
          <NavLink to='/mynote' className='text-lg'>Note Zipper</NavLink>:
          <NavLink to='/' className='text-lg'>Note Zipper</NavLink>
        }
        <div className='flex border rounded-sm'>
            <input type="text" onChange={(e)=> setSearch(e.target.value)} className='pl-1 rounded-tl-sm rounded-bl-sm text-black focus:outline-none' placeholder="Search Your Notes"/>
            {/* <div className=' p-1 px-2 bg-slate-400 rounded-tr-sm cursor-pointer text-black'>Search</div> */}
        </div>
        {user.userInfo?
        <div className='flex gap-2 items-center'>
          <NavLink to='/mynote' className='text-lg'>My Notes</NavLink>
          <p className='text-lg cursor-pointer ' onClick={()=> logout()}>Logout</p>
          <NavLink to='/profile' className='bg-gray-500 text-white w-8 h-8 rounded-[50%] flex justify-center items-center text-sm '>{user.userInfo.name.toString().charAt(0)} </NavLink>
        </div>:
        <NavLink to='/login' className='text-lg'>Login</NavLink>
        }
    </div>
  )
}

export default Header


