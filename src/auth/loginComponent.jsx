import React, {  useState } from 'react';
import { 
  Box,
  Button,
  Container,
  TextField,
  Typography,
  Paper,
  
  FormControlLabel,
  Checkbox,
  Dialog,
  CircularProgress
} from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { Link } from 'react-router-dom';
import { LoadingContext } from '../components/LoadingDialog';
import { useSnackbar } from 'notistack';
import { useAuth } from './authProvider';



export default function LoginComponent() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
//   LoadingContext?.setLoading(true);

const authProvider=useAuth();
  
const  enqueueSnackbar  = useSnackbar();
  const handleSubmit =async (e) => {
    e.preventDefault();

    if (!email || !password) {
      enqueueSnackbar('الرجاء ملئ جميع الحقول', { variant: 'error' });
      return;
    }
   await authProvider.loginViaEmailAndPassword(email,password)
    
    
  };

  return (
        
    <Container component="main" maxWidth="xs">
      <Paper elevation={3} sx={{ mt: 8, p: 4, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <LockOutlinedIcon color="primary" sx={{ fontSize: 40, mb: 2 }} />
        <Typography component="h1" variant="h5">
          تسجيل الدخول
        </Typography>
        <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3, width: '100%' }}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            label="البريد الإلكتروني"
            name="email"
            autoComplete="email"
            autoFocus
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="كلمة المرور"
            type="password"
            id="password"
            autoComplete="current-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
           
          
          <Button
            type="submit"
            fullWidth
            onClick={
             handleSubmit
            }
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
            >
            تسجيل الدخول
          </Button>
          <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
            <Link to="/create-account" style={{
              textDecoration: 'none',
             
            }} >
              <Typography component="h6" variant="body2" sx={{ color: 'primary.main' }}>
                إنشاء حساب جديد
              </Typography>
            </Link>
          
          </Box>
        </Box>
      </Paper>
    </Container>
  );
}

