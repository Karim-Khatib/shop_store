import React, { useState } from 'react';
import { 
  Box,
  Button,
  Container,
  TextField,
  Typography,
  Paper,
  Link,
  FormControl,
  FormLabel,
  RadioGroup,
  Radio,
  FormControlLabel,
  InputAdornment,
  IconButton
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { Visibility, VisibilityOff ,} from '@mui/icons-material';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import { useSnackbar } from 'notistack';
import { useAuth } from './authProvider';

function CreateAccountComponent() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
    gender: 'male'
  });
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const authProvider=useAuth();
//   const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
const snagbar=useSnackbar();
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      snagbar('كلمتي المرور غير متطابقتين',{ variant: 'error'});
      return;
    }
    authProvider.signUpByEmailAndPassword(formData);

    // setIsLoading(true);
    
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };
  const toglledPassword = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };

  return (
    <Container component="main" maxWidth="sm">
      <Paper elevation={3} sx={{ 
        mt: 4, 
        p: 4, 
        display: 'flex', 
        flexDirection: 'column', 
        alignItems: 'center',
    
      }}>
        <PersonAddIcon color="primary" sx={{ fontSize: 40, mb: 2 }} />
        <Typography component="h1" variant="h5" sx={{ fontFamily: 'Tajawal, sans-serif' }}>
          إنشاء حساب جديد
        </Typography>
        <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3, width: '100%' }}>
          <Box sx={{ display: 'flex', gap: 2, flexDirection: 'row-reverse' }}>
            
            <TextField
              margin="normal"
              required
              fullWidth
              id="lastName"
              label="النسبة"
              name="lastName"
              autoComplete="family-name"
              value={formData.lastName}
              onChange={handleChange}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              id="firstName"
              label="الاسم الأول"
              name="firstName"
              autoComplete="given-name"
              value={formData.firstName}
              onChange={handleChange}
          
            />
          </Box>
          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            label="البريد الإلكتروني"
            name="email"
            autoComplete="email"
            value={formData.email}
            onChange={handleChange}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="كلمة المرور"
            type={isPasswordVisible?"text":"password"}
            
            id="password"
            autoComplete="new-password"
            value={formData.password}
            InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="تبديل رؤية كلمة المرور"
                      onClick={()=>toglledPassword()}
                      edge="end"
                    >
                      {isPasswordVisible ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                )
              }}
            onChange={handleChange}
         />
          <TextField
            margin="normal"
            required
            fullWidth
            name="confirmPassword"
            label="تأكيد كلمة المرور"
            type="password"
            id="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
          />
          <FormControl component="fieldset" sx={{ mt: 2, width: '100%' }}>
            <FormLabel component="legend">الجنس</FormLabel>
            <RadioGroup
              row
              aria-label="الجنس"
              name="gender"
              value={formData.gender}
              onChange={handleChange}
            >
              <FormControlLabel value="male" control={<Radio />} label="ذكر" />
              <FormControlLabel value="female" control={<Radio />} label="أنثى" />
            </RadioGroup>
          </FormControl>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            إنشاء حساب جديد
          </Button>
          <Box sx={{ textAlign: 'center' }}>
            <Link href="#" variant="body2" onClick={() => navigate('/login')}>
              تسجيل الدخول
            </Link>
          </Box>
        </Box>
      </Paper>
    </Container>
  );
}

export default CreateAccountComponent;