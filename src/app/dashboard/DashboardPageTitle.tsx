import React from 'react'

interface DashBoardPageTitle {
    title:string,
    subtitle:string,
}
export default function DashboardPageTitle({title,subtitle}:DashBoardPageTitle) {
  return (
    <div className='flex-none'>
        <h1 className='text-3xl text-neutral-800'>
            {title}
        </h1>
        <h2 className='text-lg text-neutral-600'>
            {subtitle}
        </h2>
    </div>
  )
}
