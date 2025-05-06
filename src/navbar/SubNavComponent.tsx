import React from 'react'
import { NavBarData } from './NavBarData';
import Image from 'next/image';
import search from '../assets/search.svg';


import SubNaveListTileComponent from './SubNaveListTileComponent';
export default  function SideNavComponent({
  item,
} :{item?:NavBarData}) {
  return (
    <div className='w-3xs border-e-2  bg-[#F6F6F9] border-[#DCDCE4] h-full'>
      {HeaderSideNave(item)}
      {item?.items?.map((item) => <SubNaveListTileComponent key={item.link || item.title} item={item}/>)}
      
    </div>
  )
}
const HeaderSideNave=(item:NavBarData|undefined)=> (<div className='ps-4 pt-6 pe-6 h-16  mb-4'>
  <div className='flex flex-row justify-between items-center'>
    <h1 className='text-lg'>
    {item?.dashboardTitle||"Dashboard"}
    </h1>
    <div className='bg-white p-3 rounded-[4px] border-2 border-[#DCDCE4]'>
      <Image src={search} alt='search' width={10} height={10}></Image>
    </div>
  </div>

</div>);
