import React, { useContext, useState } from 'react'
import { assets } from '../assets/assets'
import { Link, NavLink } from 'react-router-dom'
import { ShopContext } from '../context/ShopContext'

const Navbar = () => {
    const [menuVisible, setMenuVisible] = useState(false)
    // getting setshowsearch func from context api
    const { setShowSearch, getCartCount, token, setToken, navigate, setCartItems } = useContext(ShopContext)

    const logout = () => {
      navigate('/login')
      localStorage.removeItem('token')
      setToken('')
      setCartItems({})
    }

  return (
    <div className='flex text-center justify-between font-medium py-5'>
     <Link to='/'> <img src={assets.logo} className='w-36' alt="logo-img" /></Link>

      <ul className='hidden sm:flex gap-5 text-sm text-gray-700'>
        <NavLink to='/' className='flex flex-col items-center gap-1'>
            <p>HOME</p>
            <hr className='w-2/4 border-none h-[1.5px] bg-gray-700 hidden'/>
        </NavLink>
         <NavLink to='/collection' className='flex flex-col items-center gap-1'>
            <p>COLLECTION</p>
            <hr className='w-2/4 border-none h-[1.5px] bg-gray-700 hidden'/>
        </NavLink>
         <NavLink to='/about' className='flex flex-col items-center gap-1'>
            <p>ABOUT</p>
            <hr className='w-2/4 border-none h-[1.5px] bg-gray-700 hidden'/>
        </NavLink>
         <NavLink to='/contact' className='flex flex-col items-center gap-1'>
            <p>CONTACT</p>
            <hr className='w-2/4 border-none h-[1.5px] bg-gray-700 hidden'/>
        </NavLink>
      </ul>

      <div className='flex items-center gap-6'>
        <img onClick={()=>setShowSearch(true)} src={assets.search_icon} className='w-5 cursor-pointer' alt="search-icon" />
        <div className='group relative'>
         <img onClick={() => token ? null : navigate('/login')} src={assets.profile_icon} className='w-5 cursor-pointer' alt="profile-icon" />
         {/* dropdown menu - will only appear if  the user is logged in */}
         {token && <div className='dropdown-menu group-hover:block hidden absolute right-0 pt-4'>
            <div className='flex flex-col gap-2 px-5 py-3 w-36 bg-slate-100 text-gray-500 rounded'>
                <p className='cursor-pointer hover:text-black'>My Profile</p>
                <p onClick={()=>navigate('/orders')} className='cursor-pointer hover:text-black'>Orders</p>
                <p onClick={()=>logout()} className='cursor-pointer hover:text-black'>Logout</p>
            </div>
         </div>}
         
        </div>
        <Link to='/cart' className='relative'>
        <img src={assets.cart_icon} className='w-5 min-w-5' alt="cart-icon" />
        <p className='absolute right-[-5px] bottom-[-5px] text-center w-4 leading-4 bg-black text-white aspect-square rounded-full text-[8px]'>{getCartCount()}</p>
        </Link>
        <img onClick={() => setMenuVisible(true)} src={assets.menu_icon} className='w-5 cursor-pointer sm:hidden' alt="menu-icon" />
      </div>
      {/* sidebar menu for small screens */}
      <div className={`absolute top-0 right-0 bottom-0 overflow-hidden bg-white transition-all ${ menuVisible ? 'w-full' : 'w-0' }`}>
        <div className='flex flex-col text-gray-600'>
            <div onClick={() => setMenuVisible(false)} className='flex items-center gap-4 p-3 cursor-pointer'>
                <img src={assets.dropdown_icon} className='h-4 rotate-180' alt="dropdown-icon" />
                <p>Back</p>
            </div>
            <NavLink onClick={() => setMenuVisible(false)} className='py-2 pl-6 border' to='/'>HOME</NavLink>
            <NavLink onClick={() => setMenuVisible(false)} className='py-2 pl-6 border' to='/collection'>COLLECTION</NavLink>
            <NavLink onClick={() => setMenuVisible(false)} className='py-2 pl-6 border' to='/about'>ABOUT</NavLink>
            <NavLink onClick={() => setMenuVisible(false)} className='py-2 pl-6 border' to='/contact'>CONTACT</NavLink>
        </div>
      </div>
    </div>
  )
}

export default Navbar
