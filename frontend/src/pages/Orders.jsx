import React, { useContext, useState, useEffect } from 'react'
import Title from '../components/Title'
import { ShopContext } from '../context/ShopContext'
import { toast } from 'react-toastify'
import axios from 'axios'

const Orders = () => {
  const { products, backendUrl, token, currency } = useContext(ShopContext)
  const [orderData, setOrderData] = useState([])

  // each user has an array of orders and each order has an arr of items
  // user can place more than one order which is stored in orders arr - and each order in orders arr contain an arr of items
  const getOrderDataFromDB = async () => {
    try {
      if (!token) {
        return null
      }
      const response = await axios.post(backendUrl + '/api/order/userorders', {}, {headers:{token}})
      let allOrdersItem = []
      if (response.data.success) {
        response.data.orders.map((order) => {
          order.items.map((item) => {
            // can always add new properties to the obj like this : item.status = status -> status property will be added to this item(product) obj or can also be done like this item['status'] = status -> both methods are same
            item['status'] = order.status
            item['paymentMethod'] = order.paymentMethod
            item['payment'] = order.payment
            item['date'] = order.date
            allOrdersItem.push(item)  // item is a product obj. it holds all the properties that a product has like name,disc,price
          })
        })
      
        setOrderData(allOrdersItem.reverse())
      }
    } catch (error) {
      console.log(error)
      toast.error(error.message)
    }
  }

  useEffect(()=> {
    if (token) {
    getOrderDataFromDB()
    }
  }, [token])
  
  return (
    <div className='border-t pt-16'>
      <div className='text-2xl'>
        <Title text1={'MY'} text2={'ORDERS'}/>
      </div>

      <div>
        {
          orderData.map((item, index)=> (
            <div key={index} className='py-4 border-t border-b text-gray-700 flex flex-col md:flex-row md:items-center md:justify-between gap-4'>
              <div className='flex items-start gap-6 text-sm'>
                <img className='w-16 sm:w-20' src={item.image[0]} alt="" />
            <div>
              <p className='text-base font-medium'>{item.name}</p>
              <div className='flex items-center gap-3 mt-1 text-base text-gray-700'>
                <p>{currency}{item.price}</p>
                <p>Quantity: {item.quantity}</p>
                <p>Size: {item.size}</p>
              </div>
              <p className='mt-1'>Date: <span className='text-gray-400'>{new Date(item.date).toDateString()}</span></p>
              <p className='mt-1'>Payment: <span className='text-gray-400'>{item.paymentMethod}</span></p>
            </div>
            </div>

            <div className='md:w-1/2 flex justify-between'>
            <div className='flex items-center gap-2'>
              <p className='min-w-2 h-2 rounded-full bg-green-500'></p>
              <p className='text-sm md:text-base'>{item.status}</p>
            </div>
            <button onClick={getOrderDataFromDB} className='px-4 py-2 border text-sm font-medium rounded-sm'>Track Order</button>
            </div>
            </div>
          ))
        }
      </div>
    </div>
  )
}

export default Orders
