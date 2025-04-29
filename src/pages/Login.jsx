import React from 'react'
import {Link} from "@tanstack/react-router"
const Login = () => {
  return (
    <div className='w-full h-[100vh] flex justify-center items-center '>
        <div className='w-3/12 h-fit p-10 bg-white shadow-xl rounded-xl'>
            <h1 className='font-semibold text-xl'>Login</h1>
            <div className='flex flex-col gap-8'>
              <div className='flex flex-col gap-1 mt-8'>
                <label className='text-xs text-neutral-500'>Email</label>
                <input type='email' className='px-2 py-2 text-sm rounded-md border border-neutral-300' placeholder='your@example.com'/>
              </div>
              <div className='flex flex-col gap-1 '>
                <label className='text-xs text-neutral-500'>Password</label>
                <input type='password' className='px-2 py-2 text-sm rounded-md border border-neutral-300' placeholder='Enter your password'/>
              </div>
              <Link to="/orders" className='font-semibold text-center text-white text-sm bg-black py-2 rounded-md'>Submit</Link>
            </div>
    </div>
    </div>
  )
}

export default Login