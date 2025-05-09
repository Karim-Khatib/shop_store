"use client";
import React from 'react'
import {  NaveBarItem } from './NavBarData';
import {  usePathname } from 'next/navigation';
import Link from 'next/link';
import { FaCircle } from 'react-icons/fa';

export default function SubNaveListTileComponent({item}:{item?:NaveBarItem}) {
    const currentPath=usePathname();
    const isSelected = currentPath === item?.link;
    if(item?.isHeader==true){
      return <div key={item.link||item.title} className='pt-2 pb-2 ps-3 h-8 w-full '>
          <h3 className='text-[11px] text-[#666687]'>
            {item.title||"title"}
          </h3>
      </div>
    }
    return (
    <Link key={item?.link||item?.title} href={item?.link??""}>
    <div className={`pt-2 pb-2 ps-4 h-8 w-full flex flex-row items-center ${isSelected?"bg-[#D9E5FF] border-s-2 border-s-primary-600":""}`}>
      <FaCircle size={5}  color='#666687'/>
    <h1 className={`text-sm ${isSelected?"text-primary-600":"text-[#979797]"}  ms-3`}>{item?.title}</h1></div>
    </Link>
    );
}
