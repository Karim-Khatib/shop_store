"use server"

import { getSession } from '@/backend/auth/Session'


export default async function UserEmailText() {
  
    const session=await getSession();
    const email=session?.email||"-";

  return (
    
    <div>{email}</div>
  )
}
