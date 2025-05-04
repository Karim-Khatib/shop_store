import { Dialog, CircularProgress, Typography, Box } from '@mui/material';
import React, { createContext, useState } from 'react';

 const LoadingContext = createContext();
function useLoading() {
  return React.useContext(LoadingContext);
}
function LoadingProvider({ children }) {
  const [loadingConfig, setLoading] = useState({loading: false,title:null});
  const showDialog=(title)=>{
    setLoading({loading:true,title:title})
  }
  const closeDialog=()=>{
    setLoading({loading:false,title:null})
  }
  return (
    <LoadingContext.Provider value={{  showDialog,closeDialog }}>
      {children}
     
      <Dialog open={loadingConfig.loading}>
        <Box sx={{ p: 4, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <CircularProgress size={60} sx={{ mb: 2 }} />
          <Typography variant="h6">{loadingConfig.title||"جاري التحميل..."}</Typography>
        </Box>
      </Dialog>
    </LoadingContext.Provider>
  );
}
export  default LoadingProvider;
// eslint-disable-next-line react-refresh/only-export-components
export {LoadingContext,useLoading};
