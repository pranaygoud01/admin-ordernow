import React from 'react'
import CustomerOrder from '../components/customerOrder'

const Orders = () => {
  return (
    <div className='w-full h-[100vh] flex justify-center'>
        <div className='max-w-[1400px] p-5 w-full mt-4'>
        <h1 className='font-bold  text-2xl'>
            Orders 
        </h1>
        <div className='w-full  mt-5'>
        <CustomerOrder />
        </div>
        </div>
    </div>
  )
}

export default Orders