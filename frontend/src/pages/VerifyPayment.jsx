import React, { useContext, useEffect } from 'react'
import { ShopContext } from '../context/ShopContext'
import { useSearchParams } from 'react-router-dom'
import axios from 'axios'
import { toast } from 'react-toastify'

const VerifyPayment = () => {
    const { navigate, token, setCartItems, backendUrl } = useContext(ShopContext)
    // using the params from the session url having success = true + orderId etc like this ->http://localhost:5173/verify?success=true&orderId=68a8a5e45e079f071dddf79a
    const [searchParams, setSearchParams] = useSearchParams()
    // getting success and orderId
    const success = searchParams.get('success')
    const orderId = searchParams.get('orderId')

    const verifyPayment = async (req, res) => {
        try {
            if (!token) return null
            const response = await axios.post(backendUrl + '/api/order/verifyStripe', {success, orderId}, {headers: {token}})
            if (response.data.success) {
                setCartItems({})
                navigate('/orders')
            } else { // payment false -> send user to cart page
                navigate('/cart')
            }
        } catch (error) {
            console.log(error)
            toast.error(error.message)
        }
    }

    useEffect(() => {
        verifyPayment()
    }, [token])

    return (
        <div>
            verify
        </div>
    )
}

export default VerifyPayment
