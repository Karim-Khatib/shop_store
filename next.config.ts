
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
  //  remotePatterns:[new URL("https://biovthdsobsjaasqqeak.supabase.co")],
    domains: ["biovthdsobsjaasqqeak.supabase.co"],
        unoptimized: true,

        
  },

  //TODO: Keep this for future use
  
  // redirects: async () => {
  //   const session=await  getSession()
  //   const userId=session?.userId;
  //   let isLoggedIn= userId!==undefined;
  //   if(userId){

  //     const currentUser=await getUserById(userId??"");
  //     if(!currentUser){
  //       isLoggedIn=false;
  //     }
  //   }
  //   return [

  //     {
  //       source: RoutesName.ROOT,
  //       destination:isLoggedIn?RoutesName.LOGIN:RoutesName.ACTIVE_USERS,
  //       permanent: true,
  //     },
  //   ];
  // }
};

export default nextConfig;
