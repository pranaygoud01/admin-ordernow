import React from 'react'

const CustomerOrder = () => {
  return (
    <div className='p-10 rounded-xl max-lg:p-8  h-fit flex  bg-white shadow-xl  '>
      <div className='flex justify-between max-lg:gap-5 max-lg:flex-col w-full '>
      <div className='flex flex-col gap-3   max-lg:gap-2'>
     <h1 className='font-semibold max-lg:text-sm'>ID:H12P9</h1>
     <h1 className='font-semibold text-3xl max-lg:text-xl'>John Deo</h1>
     <p className='max-lg:text-xs'>+91 79172828289</p>
     <p className='max-lg:text-xs'>admin@gmail.com</p>
     <p className='max-lg:text-sm'>Adresss 7-393 Aruta village Manchal MANDAL tEAANAJBAAJKK</p>
     <p className='font-semibold'>Total number Items Ordered: 9</p>
     <div className=' w-full'>
      <h1 className='font-semibold'>Ordered Items</h1>
       <ul className='text-sm  mt-2 flex flex-col gap-2'>
        <li>Biriyani</li>
        <li>Mutton Biriyani</li>
       </ul>
     </div>
     </div>
     <div className='flex flex-col gap-2 items-end max-lg:items-start'>
      <h1 className='font-semibold text-3xl'>$3.99</h1>
      <h1 className='font-semibold text-xl text-green-400'>Paid</h1>
      <h1 className='font-semibold text-[#333]'>10/11/2006</h1>
      <p className='font-semibold'>Monday 6:00UST</p>
      <h1 className='font-semibold text-[#333]'>Transaction Id:141145146541</h1>
     </div>
     </div>
    </div>
  )
}

export default CustomerOrder;
