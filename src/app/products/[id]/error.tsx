"use client"
import React from 'react'

export default function error() {
  return (
    <div className='flex justify-center items-center h-[90vh]'>
        <div className="text-red-800 font-sans"><strong>Something went wrong while loading the product. Please try again later</strong></div>
    </div>
  )
}
