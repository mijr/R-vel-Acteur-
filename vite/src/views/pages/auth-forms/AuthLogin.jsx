import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { gql, useMutation } from '@apollo/client';
import {
  Box, Button, Checkbox, FormControl, FormControlLabel, Grid, IconButton,
  InputAdornment, InputLabel, OutlinedInput, Typography
} from '@mui/material';
import { useTheme } from '@mui/material/styles';
import AnimateButton from 'ui-component/extended/AnimateButton';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import Swal from 'sweetalert2';

const LOGIN_MUTATION = gql`
  mutation Login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        id
        email
        firstName
        lastName
      }
    }
  }
`;

export default function AuthLogin() {
  const theme = useTheme();
  const navigate = useNavigate();

  const [checked, setChecked] = useState(true);
  const [showPassword, setShowPassword] = useState(false);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [login] = useMutation(LOGIN_MUTATION);

  const handleLogin = async () => {
    try {
      const { data } = await login({ variables: { email, password } });
      localStorage.setItem('token', data.login.token);
      Swal.fire({
        icon: 'success',
        title: 'Connexion réussie',
        text: `Bienvenue ${data.login.user.firstName || ''} !`
      }).then(() => {
        navigate('/dashboard/default');
      });
    } catch (err) {
      Swal.fire({
        icon: 'error',
        title: 'Erreur de connexion',
        text: err.message || 'Identifiants incorrects',
      });
    }
  };

  return (
    <>
      <FormControl fullWidth sx={{ ...theme.typography.customInput }}>
        <InputLabel htmlFor="login-email">Email</InputLabel>
        <OutlinedInput
          id="login-email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          label="Email"
        />
      </FormControl>

      <FormControl fullWidth sx={{ ...theme.typography.customInput }}>
        <InputLabel htmlFor="login-password">Password</InputLabel>
        <OutlinedInput
          id="login-password"
          type={showPassword ? 'text' : 'password'}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          endAdornment={
            <InputAdornment position="end">
              <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
                {showPassword ? <Visibility /> : <VisibilityOff />}
              </IconButton>
            </InputAdornment>
          }
          label="Password"
        />
      </FormControl>

      <Grid container justifyContent="space-between">
        <FormControlLabel
          control={<Checkbox checked={checked} onChange={(e) => setChecked(e.target.checked)} />}
          label="Keep me logged in"
        />
        <Typography component={Link} to="/pages/forgot-password" variant="subtitle2" color="secondary">
          Forgot Password?
        </Typography>
      </Grid>

      <Box mt={2}>
        <AnimateButton>
          <Button fullWidth color="secondary" variant="contained" onClick={handleLogin}>
            Sign In
          </Button>
        </AnimateButton>
      </Box>
    </>
  );
}
