import React from 'react'
import { NavLink } from 'react-router-dom'

export const LandingPage = () => {
  return (
    <div className='h-[80vh] border w-full flex justify-center items-center flex-col gap-5'>
        <h1 className='text-6xl w-2/5 text-center mb-5'>Welcome to Note Zipper</h1>
        <p className='text-xl'>On Safe place for all your note</p>
        <div className='flex gap-2'>
            <NavLink to="/login" className='border w-24 text-center py-1 bg-black text-white cursor-pointer rounded-sm'>Login</NavLink>
            <NavLink to="/register" className='border w-24 text-center py-1 bg-black text-white cursor-pointer rounded-sm'>Register</NavLink>
        </div>
    </div>
  )
}
