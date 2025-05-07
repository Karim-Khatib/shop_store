"use client"
import React from 'react'
import logo from "../assets/logo.png";
import Image from 'next/image';
import { usePathname } from 'next/navigation';
 function NotFoundPage() {
  const pathName = usePathname();
  return (
    <div className='w-full h-screen flex justify-center items-center bg-gray-50'>
        <div className='flex flex-col justify-center items-center'>

   <Image  src={logo.src} alt='logo' width={logo.width} height={logo.height} className='w-20 h-20 rounded-full'></Image>
   <h1> <span className='text-red-600 font-extrabold'>{pathName}</span>  is Not Founded</h1>
        </div>
        </div>
  )
}

export default NotFoundPage