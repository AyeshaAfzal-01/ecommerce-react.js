import React, { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../context/ShopContext'
import Title from './Title'
import ProductItem from './ProductItem'

const BestSeller = () => {
    // first getting all best seller data using context api
    const {products} = useContext(ShopContext);
    // data where best seller property is true
    const [bestSeller, setBestSeller] = useState([])
  
    useEffect(() => {
const bestProduct = products.filter((item)=>(item.bestseller)) // passing individual item.. if item.bestseller true then this filter method will store that product in this bestProduct variable
 setBestSeller(bestProduct.slice(0, 5)) // we will display only 5 products that's why using slice method

    }, [])
    return (
    <div className='my-10'>
      <div className='text-center text-3xl py-8'>
        <Title text1={'BEST'} text2={'SELLER'}/>
        <p className='w-3/4 m-auto text-xs sm:text-sm md:text-base text-gray-600'>
        Lorem ipsum dolor sit, amet consectetur adipisicing elit. Fuga numquam omnis aut. Ducimus, eligendi dolorem.</p>
      </div>

      <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 gap-y-6'>
        {
            bestSeller.map((item, index) => {
                return <ProductItem key={index} id={item._id} name={item.name} image={item.image} price={item.price}/>
            })
        }
      </div>
    </div>
  )
}

export default BestSeller
