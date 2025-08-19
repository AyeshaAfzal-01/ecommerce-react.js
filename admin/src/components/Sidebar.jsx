import React from 'react'
import { NavLink } from 'react-router-dom'
import { assets } from '../assets/assets'

const Sidebar = () => {
    return (
       <div className='w-[18%] min-h-screen border-r-2'>
        <div className='pl-[20%] flex flex-col gap-4 pt-6 text-[15px]'>
            <NavLink to='/add' className='flex gap-3 items-center border border-gray-300 px-3 py-2'>
            <img className='h-5 w-5' src={assets.add_icon} alt="" />
            <p className='hidden md:block'>Add Item</p>
            </NavLink>

            <NavLink to='/list' className='flex gap-3 items-center border border-gray-300 px-3 py-2'>
            <img className='h-5 w-5' src={assets.order_icon} alt="" />
            <p className='hidden md:block'>List Items</p>
            </NavLink>

            <NavLink to='/orders' className='flex gap-3 items-center border border-gray-300 px-3 py-2'>
            <img className='h-5 w-5' src={assets.order_icon} alt="" />
            <p className='hidden md:block'>Orders</p>
            </NavLink>
        </div>
       </div>
    )
}

export default Sidebar
