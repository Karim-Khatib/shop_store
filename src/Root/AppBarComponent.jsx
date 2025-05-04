import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import AdbIcon from '@mui/icons-material/Adb';
import userPng from './assets/user.jpg';
import { useAuth } from '../auth/authProvider';


function AppBarComponent() {


    const authProvider= useAuth();
    const currenctUser = authProvider.authState.currentUser;
    console.log(authProvider);

    return (
             <AppBar position="static" color="primary" enableColorOnDark>
            <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>

                <Avatar alt="عبدالكريم" src={userPng}></Avatar>

                <Typography variant="h6" sx={{ flexGrow: 1, textAlign: 'left',padding:"0px 10px" }}>
                   { (currenctUser?.firstName &&currenctUser?.lastName) ?(currenctUser?.firstName+" " +currenctUser?.lastName): "لوحة التحكم"}
                </Typography>

               
                <Button color="inherit" onClick={() => {
                    authProvider.logout();
                }}>تسجيل الخروج</Button>

            </Toolbar>
        </AppBar>
    );



}
export default AppBarComponent;
