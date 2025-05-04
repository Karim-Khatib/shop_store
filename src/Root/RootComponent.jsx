import React from 'react'
import { Outlet, useLocation, useNavigate } from 'react-router-dom'
import AppBarComponent from './AppBarComponent'
import AuthProvider, { useAuth } from '../auth/authProvider'
import { useSnackbar } from 'notistack'
import { AuthStatus } from '../supabase/user_auth_service'
import LoadingComponent from '../components/LoadingComponent'

export default function RootComponent() {
  const location = useLocation()
  const authProvider = useAuth()
  const navigate = useNavigate()
  const { enqueueSnackbar } = useSnackbar()
  console.log(
    authProvider
  );
  if (authProvider.authState.state === AuthStatus.Init) {
    return <LoadingComponent />
  }
  if (authProvider.authState.state === AuthStatus.Auth) {
    if (location.pathname === '/login' || location.pathname === '/create-account') {
      enqueueSnackbar('انت مسجل بالفعل', { variant: 'error' })
      navigate("/")
    }
  }

  if (authProvider.authState.state === AuthStatus.NotAuth) {
    if (location.pathname === '/') {
      enqueueSnackbar('الرجاء تسجيل الدخول', { variant: 'error' })
      navigate("/login")
    }
  }

  return (


    location.pathname === '/login' || location.pathname === '/create-account' ? <Outlet /> :
      <div>
        <AppBarComponent />
        <Outlet />
      </div>


  )
}
