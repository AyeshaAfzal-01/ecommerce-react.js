import React, { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../context/ShopContext'
import { assets } from '../assets/assets'
import { useLocation, useSearchParams } from 'react-router-dom'

const SearchBar = () => {
    // getting variables from the context api
    const { search, setSearch, showSearch, setShowSearch } = useContext(ShopContext)
    const [searchVisible, setSearchVisible] = useState(false)

    // whenever click on search icon it takes to collection page -> search bar will only be on collection page and all of the rest of the pages it will be hidden -> for this I'm gonna use 'Use Location Hook'
const location = useLocation()
useEffect(()=> {
    // console.log(location.pathname)
    if(location.pathname.includes('collection')) { // if these both conditions are true
        setSearchVisible(true)
    }
    else {
        setSearchVisible(false)
    }
}, [location])


  return showSearch && searchVisible ? (
    <div className='border-t border-b bg-gray-50 text-center'>
      <div className='inline-flex items-center justify-center border border-gray-400 px-5 py-2 my-5 mx-3 rounded-full w-3/4 sm:w-1/2'>
      <input value={search} onChange={(e)=>setSearch(e.target.value)} className='flex-1 outline-none bg-inherit text-sm' type="text" placeholder='Search'/>
      <img className='w-4' src={assets.search_icon} alt="search-icon" />
      </div>
        <img onClick={()=>setShowSearch(false)} className='inline w-3 cursor-pointer' src={assets.cross_icon} alt="cross-icon
        " />
    </div>
  ) : null
}

export default SearchBar
