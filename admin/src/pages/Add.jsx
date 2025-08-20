import React, { useState } from 'react'
import {assets} from '../assets/assets'
import axios from 'axios'
import { backendUrl } from '../App'
import {toast} from 'react-toastify'

const Add = ({token}) => {

    const [image1, setImage1] = useState(null) // this image file will be an obj
    const [image2, setImage2] = useState(null)
    const [image3, setImage3] = useState(null)
    const [image4, setImage4] = useState(null)
    const [productName, setProductName] = useState('')
    const [description, setDescription] = useState('')
    const [price, setPrice] = useState('')
    const [category, setCategory] = useState('Men')
    const [subCategory, setSubCategory] = useState('Topwear')
    const [bestseller, setBestseller] = useState(false)
    const [sizes, setSizes] = useState([])
    const allSizes = ['XS', 'S', 'M', 'L', 'XL', 'XXL']

    const handleSizeClick = (size) => {
        if(sizes.includes(size)) {
            setSizes(sizes.filter(item => item !== size))
        } else {
            setSizes([...sizes, size])
        }
    }

    const onSubmitHandler = async (e) => {
        e.preventDefault()
        if (sizes.length === 0) {
            toast.error('Add size')
            return
        }
        try {
            const formData = new FormData()
            formData.append("name", productName)
            formData.append("description", description)
            formData.append("price", price)
            formData.append("bestseller", bestseller)
            formData.append("category", category)
            formData.append("subCategory", subCategory)
            formData.append("sizes", JSON.stringify(sizes))

            if(image1) formData.append("image1", image1)
            if(image2) formData.append("image2", image2)
            if(image3) formData.append("image3", image3)
            if(image4) formData.append("image4", image4)

            const response = await axios.post(backendUrl + '/api/product/add', formData, {headers:{token}})
            console.log(response)
        } catch (error) {

        }
    }
    

    return (
       <form onSubmit={onSubmitHandler} className='flex flex-col gap-3 w-full items-start'>
        <div>
            <p className='mb-2'>Upload Image</p>
            <div className='flex gap-2'>
                <label htmlFor="image1">
                    <img className='w-20' src={!image1 ? assets.upload_area : URL.createObjectURL(image1)} alt="" />
                    <input onChange={(e)=>setImage1(e.target.files[0])} type="file" id='image1' hidden/>
                </label>
                <label htmlFor="image2">
                    <img className='w-20' src={!image2 ? assets.upload_area : URL.createObjectURL(image2)} alt="" />
                    <input onChange={(e)=>setImage2(e.target.files[0])} type="file" id='image2' hidden/>
                </label>
                <label htmlFor="image3">
                    <img className='w-20' src={!image3 ? assets.upload_area : URL.createObjectURL(image3)} alt="" />
                    <input onChange={(e)=>setImage3(e.target.files[0])} type="file" id='image3' hidden/>
                </label>
                <label htmlFor="image4">
                    <img className='w-20' src={!image4 ? assets.upload_area : URL.createObjectURL(image4)} alt="" />
                    <input onChange={(e)=>setImage4(e.target.files[0])} type="file" id='image4' hidden/>
                </label>
            </div>
        </div>

        <div className='w-full'>
            <p className='mb-3'>Product name</p>
            <input value={productName} onChange={(e)=>setProductName(e.target.value)} className='w-full max-w-[500px] px-3 py-2' type="text" placeholder='Type here' required/>
        </div>

          <div className='w-full'>
            <p className='mb-3'>Product description</p>
            <textarea value={description} onChange={(e)=>setDescription(e.target.value)} className='w-full max-w-[500px] px-3 py-2' type="text" placeholder='write product description here' required/>
        </div>

        <div className='flex flex-col sm:flex-row gap-2 w-full sm:gap-8 '>
            <div>
                <p className='mb-2'>Product Category</p>
                <select value={category} onChange={(e)=>setCategory(e.target.value)} className='w-full px-3 py-2'>
                    <option value="Men">Men</option>
                    <option value="Women">Women</option>
                    <option value="Kids">Kids</option>
                </select>
            </div>

            <div>
                <p className='mb-2'>Sub Category</p>
                <select value={subCategory} onChange={(e)=>setSubCategory(e.target.value)} className='w-full px-3 py-2'>
                    <option value="Topwear">Topwear</option>
                    <option value="Bottomwear">Bottomwear</option>
                    <option value="Winterwear">Winterwear</option>
                </select>
            </div>

            <div>
                <p className='mb-2'>Enter price</p>
                <input value={price} onChange={(e)=>setPrice(e.target.value)} className='w-full sm:w-[120px] px-3 py-2' type="number" placeholder='25' required/>
            </div>
        </div>

        <div>
            <p className='mb-2'>Select Sizes</p>
            <div className='flex gap-3'>
               {
                allSizes.map((size) => (
                    <div onClick={()=>handleSizeClick(size)} key={size} className={`px-3 py-1 cursor-pointer rounded ${sizes.includes(size) ? "bg-[#C586A5]" : "bg-slate-200"}`}>
                        {size}
                    </div>
                ))
               }
            </div>
        </div>

        <div className='flex gap-2 mt-2'>
            <input onChange={() => setBestseller(prev => !prev)} checked={bestseller} type="checkbox" id='bestseller'/>
            <label className='cursor-pointer' htmlFor="bestseller">Add to bestseller</label>
        </div>

        <button type='submit' className='w-28 py-3 bg-black text-white mt-4'>ADD</button>
       </form>
    )
}

export default Add
