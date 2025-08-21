import React, { useEffect, useState } from 'react'
import axios from 'axios'
import {backendUrl} from '../App'
import { toast } from 'react-toastify'
import { currency } from '../App'

const List = ({token}) => {
    const [list, setList] = useState([])

    const fetchDataFromDB = async () => {
        try {
             const response = await axios.get(backendUrl + '/api/product/list')
            if (response.data.success) {
                 setList(response.data.products)
            } else {
                toast.error(response.data.message)
            }
        } catch (error) {
            console.log(error)
            toast.error(error.message)
        }
    }

    useEffect(()=> {
        fetchDataFromDB()
    }, [])

    const removeProduct = async (id) => {
        try {
            const response = await axios.post(backendUrl + '/api/product/remove', {id}, {headers:{token}})
            if(response.data.success) {
                 toast.success(response.data.message)
                await fetchDataFromDB()
            } else {
                toast.error(response.data.message)
            }
           
        } catch (error) {
            console.log(error)
            toast.error(error.message)
        }
    }
    
    return (
        <>
        <p className='mb-2'>All Products List</p>
        <div className='flex flex-col gap-2'>
            <div className='hidden sm:grid grid-cols-[1fr_3fr_1fr_1fr_1fr] items-center border border-gray-200 bg-gray-100 px-2 py-1 text-sm'>
                <b>Image</b>
                <b>Name</b>
                <b>Price</b>
                <b>Category</b>
                <b className='text-center'>Action</b>
            </div>

            {/* list products */}
            {
                list.map((item, index) => (
                    <div className='grid gird-cols-[1fr_3fr_1fr] md:grid-cols-[1fr_3fr_1fr_1fr_1fr] gap-2 px-2 py-1 text-sm border border-gray-300 items-center' key={index}>
                        <img className='w-12' src={item.image[0]} alt="" />
                        <p>{item.name}</p>
                        <p>{currency}{item.price}</p>
                         <p>{item.category}</p>
                        <p onClick={()=>removeProduct(item._id)} className='text-lg text-right md:text-center cursor-pointer'>X</p>
                    </div>
                ))
            }
        </div>
        </>
    )
}

export default List
