import React, { useState } from 'react'

const NewsLetterBox = () => {

  // to clear the input box after submission using usestate
  const [email, setEmail] = useState('') // state to track input
    const onSubmitHandler = (event) => {
        event.preventDefault(); // when submit form so that it will not reload the webpage
        setEmail(''); // clearing the input box
    }

  return (
    <div className='text-center'>
      <p className='text-2xl font-medium text-gray-800'>Subcribe now & get 20% off</p>
      <p className='text-gray-400 mt-3'>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Recusandae libero expedita explicabo!
      </p>
      <form onSubmit={onSubmitHandler} className='w-full  sm:w-1/2 flex items-center gap-3 mx-auto my-6 border pl-3'>
        <input value={email} onChange={(e)=>setEmail(e.target.value)} type='email' className='w-full sm:flex-1 outline-none' placeholder='Enter your Email' required/>
        <button type='submit' className='bg-black text-white text-xs px-10 py-4'>SUBSCRIBE</button>
      </form>
    </div>
  )
}

export default NewsLetterBox
