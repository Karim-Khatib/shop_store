import { Box, CircularProgress } from '@mui/material'
import React from 'react'

export default function LoadingComponent() {
  return (
   <Box 
   sx={
   { display:"flex" ,
    justifyContent:"center" ,
    alignItems:"center" ,
    minHeight:"100vh",}
   }
   > <CircularProgress size={60} sx={{ mb: 2 }} /></Box>
  )
}
