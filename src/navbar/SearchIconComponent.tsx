import React from 'react'
import Image from "next/image";
import search from "../assets/search.svg";
interface SearchIconComponentProps{
    onClick?: () => void
    className?:string
}
export default function SearchIconComponent({onClick,className}:SearchIconComponentProps) {
  return (
    <>
    <div onClick={onClick} className={`hover:shadow-neutral-700 hover:scale-[1.04] p-3 rounded-[4px]  bg-neutral-50 border-2 border-neutral-200 ${className??""}`}>
    <Image src={search} alt="search"  width={10} height={10}></Image>
  </div>
    </>
  )
}
