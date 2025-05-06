import React from 'react'
import SideNavComponent from '../../navbar/SubNavComponent';

export default async function UsersDashboard({
    children,
  }: Readonly<{
    children: React.ReactNode;
  }>) {
  return (
    <div className='flex flex-row w-full'>
       <SideNavComponent  item={
        {
          dashboardTitle:"Users",
          items:[
            {
              title:"Users",
              isHeader:true
            },
            {
              
              title:"Active Users",
            
              link:"/users/active",
            },
            {
              title:"Blocked Users",
            
              link:"/users/blocked",
            }

          ]
        }
       }/>
        <div className='flex-1 w-full overflow-y-auto   bg-[#F6F6F9]'>

        {children}
        </div>
        </div>
    
  )
}
