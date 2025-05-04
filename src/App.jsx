
import { Route, createRoutesFromElements, RouterProvider, createBrowserRouter } from 'react-router-dom'
import CreateAccountComponent from './auth/CreateAccountComponent'
import HomeComponent from './home/HomeComponent'
import LoginComponent from './auth/loginComponent';
import RootComponent from './Root/RootComponent';
import { DialogsProvider } from '@toolpad/core/useDialogs';

import LoadingProvider from './components/LoadingDialog';
import AuthProvider from './auth/authProvider';
import ProductProvider from './products/providers/ProductProvider';


const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={
    <AuthProvider> <RootComponent /> </AuthProvider>} >
      <Route index element={<HomeComponent />} />
      <Route path='login' element={<LoginComponent />} />
      <Route path='create-account' element={<CreateAccountComponent />} />
    </Route>
  )
);

function   App() {
  return (
        <LoadingProvider>
    <ProductProvider>

    <DialogsProvider>

    <RouterProvider router={router} ></RouterProvider>
   
    </DialogsProvider>
    </ProductProvider>
    </LoadingProvider>
  )
}

export default App
