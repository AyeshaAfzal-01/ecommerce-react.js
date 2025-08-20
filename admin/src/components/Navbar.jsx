import React from 'react'
import { assets } from '../assets/assets'

const Navbar = ({setToken}) => {
    return (
        <div className='flex justify-between px-[4%] py-2 items-center'>
            <img className='w-[max(10%,80px)]' src={assets.logo} alt="logo-image" />
            <button onClick={()=>setToken('')} className='bg-gray-600 text-white rounded-full px-5 py-2 sm:px-7 sm:py-2 text-xs sm:text-sm'>Logout</button>
        </div>
    )
}

export default Navbar
