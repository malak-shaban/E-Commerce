import { Button } from '@/components/ui/button'
import React from 'react'

export default function Footer() {
  return (
     <div>
            <div className=" bg-gray-100 p-3 mt-6 font-serif">
                <div className="container mx-auto ">
                    <p className='text-2xl my-1'>Get the FrechCart app</p>
                    <p className='text-gray-500'>We will send you a link, Open it on your phone to download the app.</p>
                    <div className="container mx-auto my-3">
                        <div className='flex justify-between items-center'>
                            <input type="email" placeholder='Email...' className='w-[85%] bg-white border-[1px] p-2' />
                            <Button className='!w-[13%] font-serif'>Share Add Link</Button>
                        </div>
                    </div>
                </div>

            </div>
        </div>
  )
}
