"use client"
import Link from 'next/link';
import React from 'react'
import { NaveBarItem } from './NavBarData';
import { usePathname } from 'next/navigation';
import Image from 'next/image';

export default function NavBarListTileComponent({item}:{item?:NaveBarItem}) {
    const pathName=usePathname();
    const isActive = isActiveLink(pathName,item?.link);
    
    return(
    <Link key={item?.link}  href={item?.link||"/"}>
    <div  className={`flex  hover:text-[#5e35b175] rounded-[4px] hover:bg-[#f0f0ff85] ${isActive?"bg-[#F0F0FF] text-[#5E35B1]":"bg-white "} flex-row justify-start p-2 items-center h-8 mt-1`}>
        {getCurrentIcon(isActive,item)}
        <h3 className={`text[14px] text-[${isActive? "#5E35B1":"#666687"}]`}>
            {item?.title??"title"}
        </h3>
    </div>
    </Link>
    );
}
function getCurrentIcon(isActive:boolean,item?:NaveBarItem,):React.JSX.Element{
    if(item?.icon === undefined){
        return (<div></div>);
    }
    
    else if( item.icon ){
        return (<Image className= { `ms-2 me-3 ${isActive?"filter brightness-0 [invert]-[50%]":""}`} src={item.icon} width={16} height={16} alt={item.title??"icon"}></Image>);
    }
    return (<div></div>);
}

function isActiveLink(pathName:string,link?:string):boolean{
  
 if(link === undefined){
    return false;
 }
 return pathName.startsWith(link);
 
}