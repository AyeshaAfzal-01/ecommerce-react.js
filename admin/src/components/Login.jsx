import React, { useState } from 'react'
import { backendUrl } from '../App'
import axios from 'axios'
import { toast } from 'react-toastify'

const Login = ({setToken}) => {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const onSubmitHandler = async (e) => {
        try { 
        e.preventDefault()
        const response = await axios.post(backendUrl + '/api/user/admin', {email, password})
        // console.log(response)
        if (response.data.success) { // if success is true
            setToken(response.data.token)
        }
        else {
            toast.error(response.data.message)
        }
        } catch (error){
            console.log(error)
            toast.error(error.message)
        }
    }
    return (
        <div className='w-full min-h-screen flex items-center justify-center'>
       <div className='max-w-md shadow-md px-8 py-6 bg-white rounded-lg'>
        <h1 className='text-2xl mb-4 font-bold'>Admin Login</h1>
        <form onSubmit={onSubmitHandler}>
            <div className='mb-3 min-w-72'>
                <p className='text-sm font-medium text-gray-700 mb-2'>Your Email</p>
                <input onChange={(e)=>setEmail(e.target.value)} value={email} className='border border-gray-300 w-full rounded-md px-3 py-2 outline-none' type="email" placeholder='you@example.com'  required/>
            </div>
            <div className='mb-3 min-w-72'>
                <p className='text-sm font-medium text-gray-700 mb-2'>Your Password</p>
                <input onChange={(e)=>setPassword(e.target.value)} value={password} className='border border-gray-300 w-full rounded-md px-3 py-2 outline-none' type="password" placeholder='password' required />
            </div>
            <button className='bg-black w-full mt-2 text-white px-4 py-2 rounded-md' type='submit'>Login</button>
        </form>
       </div>
       </div>
    )
}

export default Login
