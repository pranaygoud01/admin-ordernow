import React from 'react'

const CustomerOrder = () => {
  return (
    <div className='p-10 rounded-xl h-fit flex  bg-white shadow-xl  '>
      <div className='flex justify-between w-full '>
      <div className='flex flex-col gap-3 '>
     <h1 className='font-semibold'>ID:H12P9</h1>
     <h1 className='font-semibold text-3xl'>John Deo</h1>
     <p>+91 79172828289</p>
     <p>admin@gmail.com</p>
     <p>Adresss 7-393 Aruta village Manchal MANDAL tEAANAJBAAJKK</p>
     <p>Total number Items Ordered: 9</p>
     <div className=' w-full'>
      <h1 className='font-semibold'>Ordered Items</h1>
       <ul className='text-sm px-2 mt-2 flex flex-col gap-2'>
        <li>Biriyani</li>
        <li>Mutton Biriyani</li>
       </ul>
     </div>
     </div>
     <div className='flex flex-col gap-2 items-end'>
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
