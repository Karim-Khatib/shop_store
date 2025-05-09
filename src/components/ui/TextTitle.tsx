import React from 'react'
interface TextTitleProps {
  title:string
}
export default function TextTitle({title}:TextTitleProps) {
  return (
    <div className='text-2xl pt-8'>{title}</div>
  )
}
